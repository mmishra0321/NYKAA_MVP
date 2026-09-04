/**
 * Fit confidence engine (client MVP).
 *
 * Production: replace with a service reading order/return warehouse + product
 * size aggregates. Thresholds below should become remote config.
 */

import type {
  FitBadge,
  OrderHistoryItem,
  Product,
  ProductSizeStat,
  Size,
  UserProfile,
  WishlistEntry,
} from "../types";

/** Tunable gates — see architecture.md §8 */
export const FIT_THRESHOLDS = {
  /** Min brand+category history rows before personal path is allowed */
  personalMinEvents: 3,
  /** Min kept+returned samples for a size before crowd path is allowed */
  crowdMinSamples: 20,
} as const;

const SIZE_ORDER: Size[] = ["XS", "S", "M", "L", "XL"];

function keepRate(kept: number, returned: number): number {
  const total = kept + returned;
  return total === 0 ? 0 : kept / total;
}

function nextSizeUp(size: Size): Size | null {
  const i = SIZE_ORDER.indexOf(size);
  if (i < 0 || i >= SIZE_ORDER.length - 1) return null;
  return SIZE_ORDER[i + 1];
}

function formatPct(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

function tryPersonal(
  history: OrderHistoryItem[],
  product: Product,
): FitBadge | null {
  const slice = history.filter(
    (h) => h.brand === product.brand && h.category === product.category,
  );

  if (slice.length < FIT_THRESHOLDS.personalMinEvents) return null;

  const bySize: Record<
    Size,
    { kept: number; returned: number }
  > = {
    XS: { kept: 0, returned: 0 },
    S: { kept: 0, returned: 0 },
    M: { kept: 0, returned: 0 },
    L: { kept: 0, returned: 0 },
    XL: { kept: 0, returned: 0 },
  };

  for (const row of slice) {
    if (row.outcome === "kept") bySize[row.size].kept += 1;
    else bySize[row.size].returned += 1;
  }

  // Prefer size with highest keep rate among sizes that have any signal
  let bestSize: Size | null = null;
  let bestRate = -1;
  let bestN = 0;
  for (const size of SIZE_ORDER) {
    const { kept, returned } = bySize[size];
    const n = kept + returned;
    if (n === 0) continue;
    const rate = keepRate(kept, returned);
    if (rate > bestRate || (rate === bestRate && n > bestN)) {
      bestRate = rate;
      bestSize = size;
      bestN = n;
    }
  }

  // Seed rule: if M was returned for fit and L (or next size) was kept, prefer that
  const returnedM = bySize.M.returned > 0 && bySize.M.kept === 0;
  if (returnedM && bySize.L.kept > 0) {
    bestSize = "L";
    bestRate = keepRate(bySize.L.kept, bySize.L.returned);
  } else if (returnedM && bestSize === "M") {
    const bumped = nextSizeUp("M");
    if (bumped) bestSize = bumped;
  }

  if (!bestSize) return null;

  // Cross-category hint: most-kept size in same brand, other categories
  const otherCats = history.filter(
    (h) =>
      h.brand === product.brand &&
      h.category !== product.category &&
      h.outcome === "kept",
  );
  const otherKeptCounts: Partial<Record<Size, number>> = {};
  for (const row of otherCats) {
    otherKeptCounts[row.size] = (otherKeptCounts[row.size] ?? 0) + 1;
  }
  let topsHintSize: Size | null = null;
  let topsHintN = 0;
  for (const size of SIZE_ORDER) {
    const n = otherKeptCounts[size] ?? 0;
    if (n > topsHintN) {
      topsHintN = n;
      topsHintSize = size;
    }
  }

  const shortLabel =
    topsHintSize && topsHintSize !== bestSize
      ? `Keep ${topsHintSize} · ${bestSize} here`
      : `Your size · ${bestSize}`;

  const detail =
    returnedM && bestSize === "L"
      ? `You returned M in ${product.brand} ${product.category} for fit and kept L. We suggest ${bestSize} here.`
      : `Based on your keep vs return history for ${product.brand} ${product.category}, size ${bestSize} fits your profile best.`;

  return {
    source: "personal",
    confidentSize: bestSize,
    shortLabel,
    detail,
  };
}

function tryCrowd(
  product: Product,
  sizeStats: ProductSizeStat[],
): FitBadge | null {
  const rows = sizeStats.filter((s) => s.productId === product.id);
  let best: { size: Size; rate: number; samples: number } | null = null;

  for (const row of rows) {
    const samples = row.keptCount + row.returnedFitCount;
    if (samples < FIT_THRESHOLDS.crowdMinSamples) continue;
    const rate = keepRate(row.keptCount, row.returnedFitCount);
    if (
      !best ||
      rate > best.rate ||
      (rate === best.rate && samples > best.samples)
    ) {
      best = { size: row.size, rate, samples };
    }
  }

  if (!best) return null;

  return {
    source: "crowd",
    confidentSize: best.size,
    shortLabel: `${formatPct(best.rate)} kept ${best.size}`,
    detail: `Across ${best.samples} buyers of this item in size ${best.size}, ${formatPct(best.rate)} kept it without a fit return.`,
    keepRate: best.rate,
  };
}

function insufficientBadge(): FitBadge {
  return {
    source: "insufficient",
    confidentSize: null,
    shortLabel: "Not enough data yet",
    detail:
      "We need more keep/return signal for your profile or this product’s sizes before showing a fit claim.",
  };
}

/**
 * Personal → crowd → insufficient. Never invents a fit claim.
 */
export function computeFitConfidence(
  user: UserProfile,
  product: Product,
  sizeStats: ProductSizeStat[],
): FitBadge {
  return (
    tryPersonal(user.orderHistory, product) ??
    tryCrowd(product, sizeStats) ??
    insufficientBadge()
  );
}

/** Build badge map for every wishlist entry (skip unknown product ids). */
export function computeBadgesForWishlist(
  user: UserProfile,
  products: Product[],
  sizeStats: ProductSizeStat[],
  wishlist: WishlistEntry[],
): Record<string, FitBadge> {
  const byId = new Map(products.map((p) => [p.id, p]));
  const badges: Record<string, FitBadge> = {};

  for (const entry of wishlist) {
    const product = byId.get(entry.productId);
    if (!product) continue;
    badges[entry.productId] = computeFitConfidence(user, product, sizeStats);
  }

  return badges;
}
