import { useMemo, useState } from "react";
import { TRIGGER_LABELS } from "../../lib/nudgeCopy";
import type { FitBadge, Product, TriggerType, WishlistEntry } from "../../types";

const TRIGGERS: TriggerType[] = [
  "price_stable",
  "back_in_stock",
  "low_stock",
  "occasion",
];

interface SimulateTriggerPanelProps {
  wishlist: WishlistEntry[];
  products: Product[];
  badgesByProductId: Record<string, FitBadge>;
  onSimulate: (productId: string, trigger: TriggerType) => void;
}

export function SimulateTriggerPanel({
  wishlist,
  products,
  badgesByProductId,
  onSimulate,
}: SimulateTriggerPanelProps) {
  const options = useMemo(() => {
    const byId = new Map(products.map((p) => [p.id, p]));
    return wishlist
      .map((w) => {
        const product = byId.get(w.productId);
        if (!product) return null;
        return {
          productId: product.id,
          label: `${product.brand} · ${product.name}`,
          badge: badgesByProductId[product.id],
        };
      })
      .filter(Boolean) as Array<{
      productId: string;
      label: string;
      badge: FitBadge | undefined;
    }>;
  }, [wishlist, products, badgesByProductId]);

  const [productId, setProductId] = useState(options[0]?.productId ?? "");

  if (options.length === 0) return null;

  const selected = productId || options[0].productId;
  const selectedBadge =
    options.find((o) => o.productId === selected)?.badge ??
    badgesByProductId[selected];
  const sizeTriggersBlocked =
    !selectedBadge ||
    selectedBadge.source === "insufficient" ||
    !selectedBadge.confidentSize;

  return (
    <section className="rounded-panel border border-dashed border-nykaa-pink/40 bg-nykaa-pink/[0.03] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-nykaa-pink">
        Demo only · Simulate trigger
      </p>
      <p className="mt-1 text-xs text-nykaa-muted">
        Force-fires a qualifying event (not a generic reminder). Paired fit copy
        is included. Size-based triggers need Fit Confidence.
      </p>

      <label className="mt-3 block text-xs font-medium text-nykaa-ink">
        Wishlist item
        <select
          className="mt-1 w-full rounded-lg border border-nykaa-hairline bg-nykaa-surface px-3 py-2 text-sm text-nykaa-ink"
          value={selected}
          onChange={(e) => setProductId(e.target.value)}
        >
          {options.map((o) => (
            <option key={o.productId} value={o.productId}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {TRIGGERS.map((trigger) => {
          const sizeSpecific =
            trigger === "back_in_stock" || trigger === "low_stock";
          const disabled = sizeSpecific && sizeTriggersBlocked;
          return (
            <button
              key={trigger}
              type="button"
              disabled={disabled}
              title={
                disabled
                  ? "Needs Fit Confidence size. Try Price stable or Occasion."
                  : undefined
              }
              onClick={() => onSimulate(selected, trigger)}
              className="rounded-full border border-nykaa-hairline bg-nykaa-surface px-3 py-2 text-xs font-semibold text-nykaa-ink transition hover:border-nykaa-pink hover:text-nykaa-pink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-nykaa-hairline disabled:hover:text-nykaa-ink"
            >
              {TRIGGER_LABELS[trigger]}
            </button>
          );
        })}
      </div>
    </section>
  );
}
