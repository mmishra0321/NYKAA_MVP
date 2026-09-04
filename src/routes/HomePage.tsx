import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryChips } from "../components/layout/CategoryChips";
import { HeroCarousel } from "../components/home/HeroCarousel";
import { SavedForYouRail } from "../components/home/SavedForYouRail";
import { FeaturedGrid } from "../components/home/FeaturedGrid";
import { DemoResetButton } from "../components/home/DemoResetButton";
import { EventLogViewer } from "../components/home/EventLogViewer";
import { SizePickerSheet } from "../components/ui/SizePickerSheet";
import { useToast } from "../components/ui/Toast";
import { useConfidenceToCart } from "../context";
import { logAnalytics } from "../lib/analytics";
import type { FitBadge, Size } from "../types";

export function HomePage() {
  const { state, dispatch } = useConfidenceToCart();
  const {
    wishlist,
    products,
    badgesByProductId,
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

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const t = window.setTimeout(() => {
      document
        .getElementById(hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, []);

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
        source: "home_one_click",
      });
      dispatch({
        type: "LOG_EVENT",
        event: {
          name: "move_to_cart",
          payload: {
            productId,
            size,
            source: "home_one_click",
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

  const cardProps = {
    wishlist,
    products,
    badgesByProductId,
    highlightedProductId,
    onBadgeImpressed,
    onMoveToCart,
    onRequestSize,
  };

  return (
    <div>
      <CategoryChips />
      <HeroCarousel />
      <SavedForYouRail {...cardProps} />
      <FeaturedGrid {...cardProps} />

      <div className="mt-8 space-y-3 px-3 pb-4">
        <DemoResetButton />
        <EventLogViewer />
      </div>

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
    </div>
  );
}
