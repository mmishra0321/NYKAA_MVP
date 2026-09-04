/**
 * Client-side trigger detection (MVP stand-in for a scheduled/event service).
 */

import { buildNudgeCopy } from "./nudgeCopy";
import type {
  FitBadge,
  Nudge,
  Product,
  TriggerType,
  WishlistEntry,
} from "../types";

export const TRIGGER_THRESHOLDS = {
  priceStableDays: 14,
  lowStockMax: 3,
} as const;

const ALL_TRIGGERS: TriggerType[] = [
  "price_stable",
  "back_in_stock",
  "low_stock",
  "occasion",
];

function nudgeId(productId: string, trigger: TriggerType): string {
  return `nudge-${productId}-${trigger}`;
}

function qualifies(
  trigger: TriggerType,
  product: Product,
  badge: FitBadge,
): boolean {
  const size = badge.confidentSize;
  const sizeSpecific =
    trigger === "back_in_stock" || trigger === "low_stock";

  // Prefer skip size-specific triggers when fit data is insufficient
  if (sizeSpecific && (badge.source === "insufficient" || !size)) {
    return false;
  }

  switch (trigger) {
    case "price_stable":
      return product.priceStableDays >= TRIGGER_THRESHOLDS.priceStableDays;
    case "back_in_stock": {
      if (!size) return false;
      const wasOut = product.previouslyOutOfStockSizes?.includes(size) ?? false;
      return wasOut && product.stockBySize[size] > 0;
    }
    case "low_stock": {
      if (!size) return false;
      const stock = product.stockBySize[size];
      return stock > 0 && stock <= TRIGGER_THRESHOLDS.lowStockMax;
    }
    case "occasion": {
      const tag = product.occasionTag;
      return Boolean(tag && product.occasionSoon);
    }
  }
}

function makeNudge(
  product: Product,
  badge: FitBadge,
  trigger: TriggerType,
  existing?: Nudge,
): Nudge {
  const occasion =
    product.occasionTag ??
    undefined;
  const { title, body } = buildNudgeCopy(
    trigger,
    badge,
    product.name,
    occasion,
  );
  return {
    id: nudgeId(product.id, trigger),
    productId: product.id,
    trigger,
    title,
    body,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    dismissed: existing?.dismissed ?? false,
    read: existing?.read ?? false,
  };
}

/**
 * Evaluate every wishlist item against all four trigger types.
 * Preserves dismissed/read flags when an id already exists.
 */
export function evaluateTriggers(
  wishlist: WishlistEntry[],
  products: Product[],
  badgesByProductId: Record<string, FitBadge>,
  previous: Nudge[] = [],
): Nudge[] {
  const byId = new Map(products.map((p) => [p.id, p]));
  const prevById = new Map(previous.map((n) => [n.id, n]));
  const next: Nudge[] = [];

  for (const entry of wishlist) {
    const product = byId.get(entry.productId);
    const badge = badgesByProductId[entry.productId];
    if (!product || !badge) continue;

    for (const trigger of ALL_TRIGGERS) {
      if (!qualifies(trigger, product, badge)) continue;
      const id = nudgeId(product.id, trigger);
      next.push(makeNudge(product, badge, trigger, prevById.get(id)));
    }
  }

  return next;
}

/**
 * Force-fire a trigger for demo: mutate product flags, then build that nudge.
 */
export function simulateTriggerOnProduct(
  products: Product[],
  productId: string,
  trigger: TriggerType,
  badge: FitBadge,
  previousNudges: Nudge[],
): { products: Product[]; nudge: Nudge } {
  const productsNext = products.map((p) => {
    if (p.id !== productId) return p;
    const copy: Product = {
      ...p,
      stockBySize: { ...p.stockBySize },
      previouslyOutOfStockSizes: [...(p.previouslyOutOfStockSizes ?? [])],
    };

    switch (trigger) {
      case "price_stable":
        copy.priceStableDays = Math.max(
          copy.priceStableDays,
          TRIGGER_THRESHOLDS.priceStableDays,
        );
        break;
      case "back_in_stock": {
        const size = badge.confidentSize ?? "M";
        const prev = copy.previouslyOutOfStockSizes ?? [];
        if (!prev.includes(size)) {
          copy.previouslyOutOfStockSizes = [...prev, size];
        }
        if (copy.stockBySize[size] <= 0) copy.stockBySize[size] = 4;
        break;
      }
      case "low_stock": {
        const size = badge.confidentSize ?? "M";
        copy.stockBySize[size] = 2;
        break;
      }
      case "occasion":
        copy.occasionTag = copy.occasionTag ?? "Saved occasion";
        copy.occasionSoon = true;
        break;
    }
    return copy;
  });

  const product = productsNext.find((p) => p.id === productId);
  if (!product) {
    throw new Error(`simulateTriggerOnProduct: unknown product ${productId}`);
  }

  // Never invent fit for insufficient SKUs — size-specific demos need a real confident size.
  const sizeSpecific =
    trigger === "back_in_stock" || trigger === "low_stock";
  if (
    sizeSpecific &&
    (badge.source === "insufficient" || !badge.confidentSize)
  ) {
    throw new Error(
      "Not enough fit data for this item. Pick a product with Fit Confidence, or simulate Price stable / Occasion.",
    );
  }

  const prev = previousNudges.find(
    (n) => n.id === nudgeId(productId, trigger),
  );
  const nudge = makeNudge(product, badge, trigger, prev
    ? { ...prev, dismissed: false, read: false }
    : undefined);

  return { products: productsNext, nudge };
}

export function mergeNudge(nudges: Nudge[], incoming: Nudge): Nudge[] {
  const without = nudges.filter((n) => n.id !== incoming.id);
  return [incoming, ...without];
}
