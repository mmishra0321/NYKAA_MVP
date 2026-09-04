import { HomeProductCard } from "./HomeProductCard";
import type { FitBadge, Product, WishlistEntry } from "../../types";

interface FeaturedGridProps {
  wishlist: WishlistEntry[];
  products: Product[];
  badgesByProductId: Record<string, FitBadge>;
  highlightedProductId?: string | null;
  onBadgeImpressed: (productId: string, badge: FitBadge) => void;
  onMoveToCart: (productId: string, badge: FitBadge) => void;
  onRequestSize: (productId: string, productName: string) => void;
}

/** 2-col featured strip — first 4 wishlist items for density on Home. */
export function FeaturedGrid({
  wishlist,
  products,
  badgesByProductId,
  highlightedProductId,
  onBadgeImpressed,
  onMoveToCart,
  onRequestSize,
}: FeaturedGridProps) {
  const byId = new Map(products.map((p) => [p.id, p]));
  const slice = wishlist.slice(0, 4);

  return (
    <section className="mt-6 px-3" aria-labelledby="featured-heading">
      <h2
        id="featured-heading"
        className="font-display text-base font-semibold text-nykaa-ink"
      >
        Featured for you
      </h2>
      <p className="mt-0.5 text-xs text-nykaa-muted">
        Same fit signals. Denser browse.
      </p>
      <ul className="mt-3 grid grid-cols-2 gap-3">
        {slice.map((entry) => {
          const product = byId.get(entry.productId);
          const badge = badgesByProductId[entry.productId];
          if (!product || !badge) return null;
          return (
            <li key={`featured-${entry.productId}`} className="min-w-0">
              <HomeProductCard
                product={product}
                entry={entry}
                badge={badge}
                highlighted={highlightedProductId === entry.productId}
                idPrefix="featured-card"
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
