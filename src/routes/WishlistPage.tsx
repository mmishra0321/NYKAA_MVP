import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistGrid } from "../components/wishlist";
import { SizePickerSheet } from "../components/ui/SizePickerSheet";
import { useToast } from "../components/ui/Toast";
import { useConfidenceToCart } from "../context";
import { logAnalytics } from "../lib/analytics";
import type { FitBadge, Size } from "../types";

export function WishlistPage() {
  const { state, dispatch } = useConfidenceToCart();
  const {
    wishlist,
    products,
    badgesByProductId,
    eventLog,
    highlightedProductId,
  } = state;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [sizePicker, setSizePicker] = useState<{
    productId: string;
    productName: string;
  } | null>(null);

  useEffect(() => {
    if (!highlightedProductId) return;
    const id = window.setTimeout(() => {
      dispatch({ type: "CLEAR_HIGHLIGHT" });
    }, 3600);
    return () => window.clearTimeout(id);
  }, [highlightedProductId, dispatch]);

  const addAndGo = useCallback(
    (productId: string, size: Size) => {
      dispatch({
        type: "ADD_TO_CART",
        productId,
        size,
        fromWishlist: true,
      });
      logAnalytics("move_to_cart", {
        productId,
        size,
        source: "wishlist_one_click",
      });
      dispatch({
        type: "LOG_EVENT",
        event: {
          name: "move_to_cart",
          payload: {
            productId,
            size,
            source: "wishlist_one_click",
          },
        },
      });
      showToast("Complete the look ready in bag");
      navigate("/cart");
    },
    [dispatch, navigate, showToast],
  );

  const onBadgeImpressed = useCallback(
    (productId: string, badge: FitBadge) => {
      const payload = {
        productId,
        source: badge.source,
        confidentSize: badge.confidentSize,
      };
      logAnalytics("badge_impressed", payload);
      dispatch({
        type: "LOG_EVENT",
        event: { name: "badge_impressed", payload },
      });
    },
    [dispatch],
  );

  const onMoveToCart = useCallback(
    (productId: string, badge: FitBadge) => {
      if (!badge.confidentSize) {
        const product = products.find((p) => p.id === productId);
        setSizePicker({
          productId,
          productName: product?.name ?? "this item",
        });
        return;
      }
      addAndGo(productId, badge.confidentSize);
    },
    [addAndGo, products],
  );

  const onRequestSize = useCallback(
    (productId: string, productName: string) => {
      setSizePicker({ productId, productName });
    },
    [],
  );

  const badgeEvents = eventLog.filter((e) => e.name === "badge_impressed").length;

  return (
    <section className="px-4 py-6">
      <div className="mb-5">
        <h1 className="font-display text-xl font-semibold text-nykaa-ink">
          Wishlist
        </h1>
        <p className="mt-1 text-sm text-nykaa-muted">
          Fit confidence on every tile. One-click moves your confident size.
        </p>
      </div>

      <WishlistGrid
        wishlist={wishlist}
        products={products}
        badgesByProductId={badgesByProductId}
        highlightedProductId={highlightedProductId}
        onBadgeImpressed={onBadgeImpressed}
        onMoveToCart={onMoveToCart}
        onRequestSize={onRequestSize}
      />

      <p className="mt-6 text-center text-[11px] text-nykaa-muted">
        Demo events: {badgeEvents} badge impressions
      </p>

      <SizePickerSheet
        open={Boolean(sizePicker)}
        productName={sizePicker?.productName ?? ""}
        onClose={() => setSizePicker(null)}
        onSelect={(size) => {
          if (!sizePicker) return;
          const id = sizePicker.productId;
          setSizePicker(null);
          addAndGo(id, size);
        }}
      />
    </section>
  );
}
