import { HomeProductCard } from "./HomeProductCard";
import type { FitBadge, Product, WishlistEntry } from "../../types";

interface SavedForYouRailProps {
  wishlist: WishlistEntry[];
  products: Product[];
  badgesByProductId: Record<string, FitBadge>;
  highlightedProductId?: string | null;
  onBadgeImpressed: (productId: string, badge: FitBadge) => void;
  onMoveToCart: (productId: string, badge: FitBadge) => void;
  onRequestSize: (productId: string, productName: string) => void;
}

export function SavedForYouRail({
  wishlist,
  products,
  badgesByProductId,
  highlightedProductId,
  onBadgeImpressed,
  onMoveToCart,
  onRequestSize,
}: SavedForYouRailProps) {
  const byId = new Map(products.map((p) => [p.id, p]));

  return (
    <section className="mt-5" aria-labelledby="saved-for-you-heading">
      <div className="mb-3 flex items-end justify-between px-3">
        <div>
          <h2
            id="saved-for-you-heading"
            className="font-display text-base font-semibold text-nykaa-ink"
          >
            Saved for you
          </h2>
          <p className="mt-0.5 text-xs text-nykaa-muted">
            Fit confidence on every tile. No tap needed.
          </p>
        </div>
      </div>
      <ul className="flex items-stretch gap-3 overflow-x-auto px-3 pb-1 scrollbar-none">
        {wishlist.map((entry) => {
          const product = byId.get(entry.productId);
          const badge = badgesByProductId[entry.productId];
          if (!product || !badge) return null;
          return (
            <li key={entry.productId} className="flex">
              <HomeProductCard
                product={product}
                entry={entry}
                badge={badge}
                compact
                highlighted={highlightedProductId === entry.productId}
                onBadgeImpressed={onBadgeImpressed}
                onMoveToCart={onMoveToCart}
                onRequestSize={onRequestSize}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
