import { useEffect, useRef } from "react";
import { FitConfidenceBadge } from "../wishlist/FitConfidenceBadge";
import { MoveToCartButton } from "../wishlist/MoveToCartButton";
import type { FitBadge, Product, WishlistEntry } from "../../types";

interface HomeProductCardProps {
  product: Product;
  entry: WishlistEntry;
  badge: FitBadge;
  highlighted?: boolean;
  compact?: boolean;
  idPrefix?: string;
  onBadgeImpressed: (productId: string, badge: FitBadge) => void;
  onMoveToCart: (productId: string, badge: FitBadge) => void;
  onRequestSize: (productId: string, productName: string) => void;
}

export function HomeProductCard({
  product,
  entry,
  badge,
  highlighted = false,
  compact = false,
  idPrefix = "home-card",
  onBadgeImpressed,
  onMoveToCart,
  onRequestSize,
}: HomeProductCardProps) {
  const impressed = useRef(false);
  const ref = useRef<HTMLElement>(null);
  const insufficient = badge.source === "insufficient";

  useEffect(() => {
    if (impressed.current) return;
    impressed.current = true;
    onBadgeImpressed(product.id, badge);
  }, [product.id, badge, onBadgeImpressed]);

  useEffect(() => {
    if (!highlighted || !ref.current) return;
    ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlighted]);

  return (
    <article
      ref={ref}
      id={`${idPrefix}-${product.id}`}
      className={`flex h-full flex-col overflow-hidden rounded-panel border border-nykaa-hairline bg-nykaa-surface ${
        highlighted ? "animate-tile-highlight border-nykaa-pink/50" : ""
      } ${compact ? "w-[200px] shrink-0" : "w-full"}`}
    >
      <div className="shine-media relative shrink-0">
        <img
          src={product.imageUrl}
          alt=""
          className="h-40 w-full object-cover bg-nykaa-canvas"
        />
        <span className="absolute left-2 top-2 z-[1] rounded bg-nykaa-pink px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
          Saved
        </span>
      </div>
      <div className="flex flex-1 flex-col p-2.5">
        <p className="text-[10px] font-medium uppercase tracking-wide text-nykaa-muted">
          {product.brand}
        </p>
        <h3 className="mt-0.5 line-clamp-2 h-10 text-sm font-semibold leading-5 text-nykaa-ink">
          {product.name}
        </h3>
        <p className="mt-1 h-4 text-xs text-nykaa-muted">{entry.savedAtLabel}</p>
        <p className="mt-1 h-5 text-sm font-medium text-nykaa-ink">
          ₹{product.priceInr.toLocaleString("en-IN")}
        </p>

        <div className="mt-2">
          <FitConfidenceBadge badge={badge} compact />
        </div>

        <div className="mt-auto pt-2">
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
      </div>
    </article>
  );
}
