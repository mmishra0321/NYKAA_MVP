import { useEffect, useRef } from "react";
import { FitConfidenceBadge } from "./FitConfidenceBadge";
import { MoveToCartButton } from "./MoveToCartButton";
import type { FitBadge, Product, WishlistEntry } from "../../types";

interface WishlistTileProps {
  product: Product;
  entry: WishlistEntry;
  badge: FitBadge;
  highlighted?: boolean;
  onBadgeImpressed: (productId: string, badge: FitBadge) => void;
  onMoveToCart: (productId: string, badge: FitBadge) => void;
  onRequestSize: (productId: string, productName: string) => void;
}

export function WishlistTile({
  product,
  entry,
  badge,
  highlighted = false,
  onBadgeImpressed,
  onMoveToCart,
  onRequestSize,
}: WishlistTileProps) {
  const impressed = useRef(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (impressed.current) return;
    impressed.current = true;
    onBadgeImpressed(product.id, badge);
  }, [product.id, badge, onBadgeImpressed]);

  useEffect(() => {
    if (!highlighted || !articleRef.current) return;
    articleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlighted]);

  const priceLabel = `₹${product.priceInr.toLocaleString("en-IN")}`;
  const insufficient = badge.source === "insufficient";

  return (
    <article
      ref={articleRef}
      id={`wishlist-tile-${product.id}`}
      className={`overflow-hidden rounded-panel border border-nykaa-hairline bg-nykaa-surface ${
        highlighted ? "animate-tile-highlight border-nykaa-pink/50" : ""
      }`}
    >
      <div className="flex gap-3 p-3">
        <div className="shine-media h-28 w-20 shrink-0 rounded-md">
          <img
            src={product.imageUrl}
            alt=""
            className="h-full w-full object-cover bg-nykaa-canvas"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wide text-nykaa-muted">
            {product.brand}
          </p>
          <h2 className="mt-0.5 text-sm font-semibold leading-snug text-nykaa-ink">
            {product.name}
          </h2>
          <p className="mt-1 text-xs text-nykaa-muted">
            {entry.savedAtLabel}
            {entry.occasionTag ? ` · ${entry.occasionTag}` : ""}
          </p>
          <p className="mt-1 text-sm font-medium text-nykaa-ink">{priceLabel}</p>
        </div>
      </div>

      <div className="space-y-3 border-t border-nykaa-hairline px-3 py-3">
        <FitConfidenceBadge badge={badge} compact />
        <MoveToCartButton
          helperText={
            insufficient ? "Not enough data. Choose a size" : undefined
          }
          sizeLabel={
            !insufficient && badge.confidentSize
              ? badge.confidentSize
              : undefined
          }
          onClick={() => {
            if (insufficient || !badge.confidentSize) {
              onRequestSize(product.id, product.name);
              return;
            }
            onMoveToCart(product.id, badge);
          }}
        />
      </div>
    </article>
  );
}
