import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  appReducer,
  initialAppState,
  type AppAction,
} from "./reducer";
import {
  computeBadgesForWishlist,
  logFitScenarioAsserts,
} from "../lib";
import { logCopyLintSweep } from "../lib/copySweep";
import {
  evaluateTriggers,
  mergeNudge,
  simulateTriggerOnProduct,
} from "../lib/triggers";
import { logAnalytics } from "../lib/analytics";
import { TRIGGER_LABELS } from "../lib/nudgeCopy";
import type { AppState, TriggerType } from "../types";

interface ConfidenceToCartContextValue {
  state: AppState;
  dispatch: Dispatch<AppAction>;
  resetDemo: () => void;
  simulateTrigger: (productId: string, trigger: TriggerType) => string;
  dismissNudge: (nudgeId: string) => void;
  markNudgeRead: (nudgeId: string) => void;
}

const ConfidenceToCartContext =
  createContext<ConfidenceToCartContextValue | null>(null);

function badgesFromState(state: AppState) {
  return computeBadgesForWishlist(
    state.user,
    state.products,
    state.sizeStats,
    state.wishlist,
  );
}

export function ConfidenceToCartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  useEffect(() => {
    if (import.meta.env.DEV) {
      logFitScenarioAsserts();
      logCopyLintSweep();
    }
    const badges = badgesFromState(initialAppState);
    dispatch({ type: "RECOMPUTE_BADGES", badgesByProductId: badges });
    dispatch({
      type: "EVALUATE_TRIGGERS",
      nudges: evaluateTriggers(
        initialAppState.wishlist,
        initialAppState.products,
        badges,
        initialAppState.nudges,
      ),
    });
  }, []);

  const resetDemo = useCallback(() => {
    dispatch({ type: "RESET_DEMO" });
  }, []);

  const simulateTrigger = useCallback(
    (productId: string, trigger: TriggerType) => {
      const badge = state.badgesByProductId[productId];
      if (!badge) {
        return "No fit badge for that item.";
      }
      const { products, nudge } = simulateTriggerOnProduct(
        state.products,
        productId,
        trigger,
        badge,
        state.nudges,
      );
      // Re-evaluate all after flag mutation, then ensure simulated nudge is present
      const badges = computeBadgesForWishlist(
        state.user,
        products,
        state.sizeStats,
        state.wishlist,
      );
      const evaluated = evaluateTriggers(
        state.wishlist,
        products,
        badges,
        state.nudges,
      );
      const nudges = mergeNudge(evaluated, nudge);

      dispatch({
        type: "SIMULATE_TRIGGER",
        trigger,
        productId,
        products,
        nudges,
      });
      dispatch({
        type: "RECOMPUTE_BADGES",
        badgesByProductId: badges,
      });
      logAnalytics("simulate_trigger", { trigger, productId });
      dispatch({
        type: "LOG_EVENT",
        event: {
          name: "simulate_trigger",
          payload: { trigger, productId },
        },
      });
      logAnalytics("nudge_shown", {
        nudgeId: nudge.id,
        trigger: nudge.trigger,
        productId: nudge.productId,
      });
      dispatch({
        type: "LOG_EVENT",
        event: {
          name: "nudge_shown",
          payload: {
            nudgeId: nudge.id,
            trigger: nudge.trigger,
            productId: nudge.productId,
          },
        },
      });

      return `${TRIGGER_LABELS[trigger]}: ${nudge.body}`;
    },
    [state],
  );

  const dismissNudge = useCallback(
    (nudgeId: string) => {
      dispatch({ type: "DISMISS_NUDGE", nudgeId });
      logAnalytics("nudge_dismissed", { nudgeId });
      dispatch({
        type: "LOG_EVENT",
        event: { name: "nudge_dismissed", payload: { nudgeId } },
      });
    },
    [],
  );

  const markNudgeRead = useCallback((nudgeId: string) => {
    dispatch({ type: "MARK_NUDGE_READ", nudgeId });
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      resetDemo,
      simulateTrigger,
      dismissNudge,
      markNudgeRead,
    }),
    [state, dispatch, resetDemo, simulateTrigger, dismissNudge, markNudgeRead],
  );

  return (
    <ConfidenceToCartContext.Provider value={value}>
      {children}
    </ConfidenceToCartContext.Provider>
  );
}

export function useConfidenceToCart() {
  const ctx = useContext(ConfidenceToCartContext);
  if (!ctx) {
    throw new Error(
      "useConfidenceToCart must be used within ConfidenceToCartProvider",
    );
  }
  return ctx;
}
