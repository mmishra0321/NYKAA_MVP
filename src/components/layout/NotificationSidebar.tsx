import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NudgeList, SimulateTriggerPanel } from "../nudges";
import { useConfidenceToCart } from "../../context";
import { useToast } from "../ui/Toast";

export function NotificationSidebar() {
  const {
    state,
    dispatch,
    simulateTrigger,
    dismissNudge,
    markNudgeRead,
  } = useConfidenceToCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const open = state.notificationOpen;
  const {
    nudges,
    products,
    wishlist,
    badgesByProductId,
    lastTriggerSimulated,
  } = state;

  const activeCount = nudges.filter((n) => !n.dismissed).length;
  const close = () => dispatch({ type: "CLOSE_NOTIFICATIONS" });

  return (
    <div
      className={`absolute inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
      data-testid="notification-layer"
      data-open={open ? "true" : "false"}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-nykaa-ink/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close notifications"
        onClick={close}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-[min(100%,92%)] max-w-[360px] flex-col bg-nykaa-surface shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Notifications"
        data-testid="notification-sidebar"
      >
        <div className="flex items-center justify-between border-b border-nykaa-hairline px-4 py-3">
          <div>
            <h2 className="font-display text-base font-semibold text-nykaa-ink">
              Notifications
            </h2>
            <p className="text-[11px] text-nykaa-muted">
              {activeCount} active
              {lastTriggerSimulated
                ? ` · last: ${lastTriggerSimulated.split("_").join(" ")}`
                : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-nykaa-canvas"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          <p className="text-xs text-nykaa-muted">
            Trigger-based only, paired with fit confidence. Not a generic
            reminder feed.
          </p>

          <NudgeList
            nudges={nudges}
            products={products}
            onDismiss={dismissNudge}
            onOpen={(nudgeId) => {
              markNudgeRead(nudgeId);
              const nudge = nudges.find((n) => n.id === nudgeId);
              if (nudge) {
                dispatch({
                  type: "SET_HIGHLIGHT",
                  productId: nudge.productId,
                });
              }
              close();
              navigate("/");
            }}
          />

          <SimulateTriggerPanel
            wishlist={wishlist}
            products={products}
            badgesByProductId={badgesByProductId}
            onSimulate={(productId, trigger) => {
              const message = simulateTrigger(productId, trigger);
              showToast(message);
            }}
          />
        </div>
      </aside>
    </div>
  );
}
