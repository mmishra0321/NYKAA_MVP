import type { CartLine, Product } from "../../types";

interface CartLineItemProps {
  line: CartLine;
  product: Product;
  fromWishlist?: boolean;
}

export function CartLineItem({ line, product, fromWishlist }: CartLineItemProps) {
  return (
    <div className="flex gap-3 rounded-panel border border-nykaa-hairline bg-nykaa-surface p-3">
      <div className="shine-media shrink-0 rounded-md" style={{ width: 72, height: 96 }}>
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
        <h2 className="mt-0.5 text-sm font-semibold text-nykaa-ink">{product.name}</h2>
        <p className="mt-1 text-xs text-nykaa-muted">
          Size {line.size}
          {fromWishlist || line.fromWishlist ? " · from wishlist" : ""}
        </p>
        <p className="mt-1 text-sm font-medium text-nykaa-ink">
          ₹{product.priceInr.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
