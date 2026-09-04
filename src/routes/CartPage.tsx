import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CartLineItem,
  CompleteTheLookRow,
  ProceedButton,
} from "../components/cart";
import { useToast } from "../components/ui/Toast";
import { useConfidenceToCart } from "../context";
import { completeTheLook } from "../lib/completeTheLook";
import { logAnalytics } from "../lib/analytics";
import { assertNoIncentiveCopy } from "../lib/copyLint";

const LOOK_BLURB = "Pairs well. Finishes the look.";
assertNoIncentiveCopy(LOOK_BLURB);

export function CartPage() {
  const { state, dispatch } = useConfidenceToCart();
  const { cart, products, badgesByProductId, lastConvertedProductId } = state;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const byId = useMemo(
    () => new Map(products.map((p) => [p.id, p])),
    [products],
  );

  const exclude = useMemo(
    () => new Set(cart.map((c) => c.productId)),
    [cart],
  );

  const focusId =
    lastConvertedProductId ??
    cart.find((c) => c.fromWishlist)?.productId ??
    cart[0]?.productId ??
    null;

  const focusProduct = focusId ? byId.get(focusId) : undefined;
  const lookItems = focusId
    ? completeTheLook(focusId, products, exclude)
    : [];
  const lookSize =
    (focusId && badgesByProductId[focusId]?.confidentSize) || "M";

  const total = cart.reduce((sum, line) => {
    const p = byId.get(line.productId);
    return sum + (p?.priceInr ?? 0);
  }, 0);

  if (cart.length === 0) {
    return (
      <section className="px-4 py-6">
        <h1 className="font-display text-xl font-semibold text-nykaa-ink">Bag</h1>
        <p className="mt-2 text-sm text-nykaa-muted">
          Your bag is empty. Move something from wishlist in your confident size.
        </p>
        <Link
          to="/wishlist"
          className="mt-6 inline-flex rounded-full bg-nykaa-pink px-5 py-2.5 text-sm font-semibold text-white hover:bg-nykaa-pink-hover"
        >
          Open wishlist
        </Link>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <h1 className="font-display text-xl font-semibold text-nykaa-ink">Bag</h1>
      <p className="mt-1 text-sm text-nykaa-muted">
        Size pre-filled from fit confidence where available.
      </p>

      <ul className="mt-5 space-y-3">
        {cart.map((line) => {
          const product = byId.get(line.productId);
          if (!product) return null;
          return (
            <li key={`${line.productId}-${line.size}`}>
              <CartLineItem line={line} product={product} />
            </li>
          );
        })}
      </ul>

      {focusProduct ? (
        <CompleteTheLookRow
          parentName={focusProduct.name}
          items={lookItems}
          defaultSize={lookSize}
          onAdd={(productId, size) => {
            dispatch({
              type: "ADD_LOOK_ITEM",
              productId,
              size,
              parentId: focusProduct.id,
            });
            logAnalytics("look_add", {
              parentId: focusProduct.id,
              lookProductId: productId,
            });
            dispatch({
              type: "LOG_EVENT",
              event: {
                name: "look_add",
                payload: {
                  parentId: focusProduct.id,
                  lookProductId: productId,
                },
              },
            });
            showToast("Added to finish the look");
          }}
        />
      ) : null}

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-nykaa-muted">Total</span>
        <span className="font-semibold text-nykaa-ink">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="mt-4">
        <ProceedButton
          onClick={() => {
            dispatch({ type: "CONFIRM" });
            logAnalytics("confirm", {
              cartProductIds: cart.map((c) => c.productId).join(","),
            });
            dispatch({
              type: "LOG_EVENT",
              event: {
                name: "confirm",
                payload: {
                  cartProductIds: cart.map((c) => c.productId).join(","),
                },
              },
            });
            navigate("/confirmation");
          }}
        />
      </div>
    </section>
  );
}
