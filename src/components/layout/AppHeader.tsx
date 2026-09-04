import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, ShoppingBag } from "lucide-react";
import { useConfidenceToCart } from "../../context";

export function AppHeader() {
  const { state, dispatch } = useConfidenceToCart();
  const navigate = useNavigate();
  const unread = state.nudges.filter((n) => !n.dismissed && !n.read).length;
  const cartCount = state.cart.length;

  return (
    <header className="sticky top-0 z-20 border-b border-nykaa-hairline bg-nykaa-surface">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Link to="/" className="shrink-0" aria-label="Nykaa Fashion home">
          <span className="font-display text-lg italic font-bold tracking-tight text-nykaa-pink">
            NYKAA
          </span>
        </Link>

        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search on Nykaa</span>
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-nykaa-muted"
            aria-hidden
          />
          <input
            type="search"
            readOnly
            placeholder="Search on Nykaa"
            title="Demo: search is illustrative only"
            aria-description="Demo only. Search is not connected."
            className="w-full cursor-default rounded-md border-0 bg-[#F3F3F3] py-2 pl-9 pr-3 text-sm text-nykaa-ink placeholder:text-nykaa-muted focus:outline-none focus:ring-1 focus:ring-nykaa-pink/40"
            onFocus={(e) => e.currentTarget.blur()}
          />
        </label>

        <button
          type="button"
          onClick={() => dispatch({ type: "OPEN_NOTIFICATIONS" })}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-nykaa-ink hover:bg-nykaa-canvas"
          aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
          data-testid="bell-button"
        >
          <Bell size={20} strokeWidth={1.75} />
          {unread > 0 ? (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-nykaa-pink px-1 text-[9px] font-semibold text-white">
              {unread > 9 ? "9+" : unread}
            </span>
          ) : null}
        </button>

        <button
          type="button"
          onClick={() => navigate("/cart")}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-nykaa-ink hover:bg-nykaa-canvas"
          aria-label={`Bag${cartCount ? `, ${cartCount} items` : ""}`}
        >
          <ShoppingBag size={20} strokeWidth={1.75} />
          {cartCount > 0 ? (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-nykaa-pink px-1 text-[9px] font-semibold text-white">
              {cartCount}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  );
}
