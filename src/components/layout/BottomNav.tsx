import { NavLink } from "react-router-dom";
import { Home, LayoutGrid, Heart, ShoppingBag } from "lucide-react";
import { useConfidenceToCart } from "../../context";

const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/categories", label: "Categories", icon: LayoutGrid, end: false },
  { to: "/wishlist", label: "Wishlist", icon: Heart, end: false },
  { to: "/cart", label: "Bag", icon: ShoppingBag, end: false },
] as const;

export function BottomNav() {
  const { state } = useConfidenceToCart();
  const cartCount = state.cart.length;

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2 border-t border-nykaa-hairline bg-nykaa-surface pb-[env(safe-area-inset-bottom,0px)]"
      aria-label="Bottom"
    >
      <ul className="grid grid-cols-4 px-2 py-2">
        {items.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1 text-[10px] font-medium transition-colors ${
                  isActive
                    ? "text-nykaa-pink"
                    : "text-nykaa-muted hover:text-nykaa-ink"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon
                      size={20}
                      strokeWidth={isActive ? 2.25 : 1.75}
                      aria-hidden
                    />
                    {to === "/cart" && cartCount > 0 ? (
                      <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-nykaa-pink px-1 text-[9px] font-semibold text-white">
                        {cartCount}
                      </span>
                    ) : null}
                  </span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
