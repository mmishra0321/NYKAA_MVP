import { WishlistTile } from "./WishlistTile";
import type { FitBadge, Product, WishlistEntry } from "../../types";

interface WishlistGridProps {
  wishlist: WishlistEntry[];
  products: Product[];
  badgesByProductId: Record<string, FitBadge>;
  highlightedProductId?: string | null;
  onBadgeImpressed: (productId: string, badge: FitBadge) => void;
  onMoveToCart: (productId: string, badge: FitBadge) => void;
  onRequestSize: (productId: string, productName: string) => void;
}

export function WishlistGrid({
  wishlist,
  products,
  badgesByProductId,
  highlightedProductId,
  onBadgeImpressed,
  onMoveToCart,
  onRequestSize,
}: WishlistGridProps) {
  const byId = new Map(products.map((p) => [p.id, p]));

  if (wishlist.length === 0) {
    return (
      <div className="rounded-panel border border-dashed border-nykaa-hairline bg-nykaa-surface p-8 text-center">
        <p className="text-sm font-medium text-nykaa-ink">Wishlist is empty</p>
        <p className="mt-1 text-xs text-nykaa-muted">
          Reset the demo to restore the seeded Saved but Stuck shortlist.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid list-none grid-cols-1 gap-4 p-0">
      {wishlist.map((entry) => {
        const product = byId.get(entry.productId);
        const badge = badgesByProductId[entry.productId];
        if (!product || !badge) return null;
        return (
          <li key={entry.productId}>
            <WishlistTile
              product={product}
              entry={entry}
              badge={badge}
              highlighted={highlightedProductId === entry.productId}
              onBadgeImpressed={onBadgeImpressed}
              onMoveToCart={onMoveToCart}
              onRequestSize={onRequestSize}
            />
          </li>
        );
      })}
    </ul>
  );
}
