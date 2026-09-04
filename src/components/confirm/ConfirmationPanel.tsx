import { Link } from "react-router-dom";
import type { CartLine, Product } from "../../types";
import { assertNoIncentiveCopy } from "../../lib/copyLint";

interface ConfirmationPanelProps {
  lines: CartLine[];
  products: Product[];
}

const HEADLINE = "You're set. Fit notes checked";
const SUB =
  "Added in your confident size where we had a signal. No codes, no pressure. Just clearer decisions.";

// Fail fast in module scope if copy regresses
assertNoIncentiveCopy(HEADLINE);
assertNoIncentiveCopy(SUB);

export function ConfirmationPanel({ lines, products }: ConfirmationPanelProps) {
  const byId = new Map(products.map((p) => [p.id, p]));

  return (
    <div className="rounded-panel border border-nykaa-hairline bg-nykaa-surface p-5">
      <p className="font-display text-2xl italic font-bold text-nykaa-pink">
        NYKAA
      </p>
      <h1 className="mt-3 font-display text-xl font-semibold text-nykaa-ink">
        {HEADLINE}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-nykaa-muted">{SUB}</p>

      <ul className="mt-5 space-y-2">
        {lines.map((line) => {
          const product = byId.get(line.productId);
          if (!product) return null;
          return (
            <li
              key={`${line.productId}-${line.size}`}
              className="flex justify-between gap-2 text-sm text-nykaa-ink"
            >
              <span className="min-w-0 truncate">
                {product.name}{" "}
                <span className="text-nykaa-muted">· {line.size}</span>
              </span>
              <span className="shrink-0 font-medium">
                ₹{product.priceInr.toLocaleString("en-IN")}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex flex-col gap-2">
        <Link
          to="/wishlist"
          className="inline-flex items-center justify-center rounded-full bg-nykaa-pink px-4 py-2.5 text-sm font-semibold text-white hover:bg-nykaa-pink-hover"
        >
          Back to wishlist
        </Link>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full border border-nykaa-hairline px-4 py-2.5 text-sm font-medium text-nykaa-ink hover:border-nykaa-pink hover:text-nykaa-pink"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
