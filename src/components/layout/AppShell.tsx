import { Outlet, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { UtilityBar } from "./UtilityBar";
import { AppHeader } from "./AppHeader";
import { BottomNav } from "./BottomNav";
import { NotificationSidebar } from "./NotificationSidebar";
import { useConfidenceToCart } from "../../context";

export function AppShell() {
  const [params, setParams] = useSearchParams();
  const { dispatch } = useConfidenceToCart();

  useEffect(() => {
    if (params.get("notify") === "1") {
      dispatch({ type: "OPEN_NOTIFICATIONS" });
      const next = new URLSearchParams(params);
      next.delete("notify");
      setParams(next, { replace: true });
    }
  }, [params, setParams, dispatch]);

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden bg-nykaa-canvas">
      <UtilityBar />
      <AppHeader />
      <main className="flex-1 pb-safe-nav">
        <Outlet />
      </main>
      <BottomNav />
      <NotificationSidebar />
    </div>
  );
}
