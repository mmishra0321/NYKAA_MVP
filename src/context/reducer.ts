import { createSeedState } from "../data";
import type {
  AnalyticsEvent,
  AppState,
  CartLine,
  FitBadge,
  Nudge,
  Size,
  TriggerType,
} from "../types";

export type AppAction =
  | { type: "HYDRATE_FROM_SEED" }
  | { type: "RESET_DEMO" }
  | { type: "RECOMPUTE_BADGES"; badgesByProductId: Record<string, FitBadge> }
  | { type: "EVALUATE_TRIGGERS"; nudges: Nudge[] }
  | {
      type: "SIMULATE_TRIGGER";
      trigger: TriggerType;
      productId: string;
      nudges: Nudge[];
      products?: AppState["products"];
    }
  | { type: "DISMISS_NUDGE"; nudgeId: string }
  | { type: "MARK_NUDGE_READ"; nudgeId: string }
  | {
      type: "ADD_TO_CART";
      productId: string;
      size: Size;
      fromWishlist?: boolean;
    }
  | { type: "ADD_LOOK_ITEM"; productId: string; size: Size; parentId: string }
  | { type: "CLEAR_CART" }
  | { type: "CONFIRM" }
  | { type: "LOG_EVENT"; event: Omit<AnalyticsEvent, "at"> & { at?: string } }
  | { type: "SET_NUDGE_INBOX_HINT"; value: boolean }
  | { type: "CLEAR_HIGHLIGHT" }
  | { type: "SET_HIGHLIGHT"; productId: string }
  | { type: "OPEN_NOTIFICATIONS" }
  | { type: "CLOSE_NOTIFICATIONS" };

function stampEvent(
  event: Omit<AnalyticsEvent, "at"> & { at?: string },
): AnalyticsEvent {
  return {
    name: event.name,
    payload: event.payload,
    at: event.at ?? new Date().toISOString(),
  };
}

function upsertCartLine(cart: CartLine[], line: CartLine): CartLine[] {
  const idx = cart.findIndex((c) => c.productId === line.productId);
  if (idx === -1) return [...cart, line];
  const next = [...cart];
  next[idx] = line;
  return next;
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "HYDRATE_FROM_SEED":
    case "RESET_DEMO":
      return createSeedState();

    case "RECOMPUTE_BADGES":
      return { ...state, badgesByProductId: action.badgesByProductId };

    case "EVALUATE_TRIGGERS":
      return { ...state, nudges: action.nudges };

    case "SIMULATE_TRIGGER":
      return {
        ...state,
        lastTriggerSimulated: action.trigger,
        nudges: action.nudges,
        products: action.products ?? state.products,
        nudgeInboxOpenHint: true,
        highlightedProductId: action.productId,
        notificationOpen: true,
      };

    case "DISMISS_NUDGE":
      return {
        ...state,
        nudges: state.nudges.map((n) =>
          n.id === action.nudgeId ? { ...n, dismissed: true } : n,
        ),
      };

    case "MARK_NUDGE_READ":
      return {
        ...state,
        nudges: state.nudges.map((n) =>
          n.id === action.nudgeId ? { ...n, read: true } : n,
        ),
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: upsertCartLine(state.cart, {
          productId: action.productId,
          size: action.size,
          fromWishlist: action.fromWishlist ?? true,
        }),
        justConfirmed: false,
        lastConvertedProductId:
          action.fromWishlist === false
            ? state.lastConvertedProductId
            : action.productId,
      };

    case "ADD_LOOK_ITEM":
      return {
        ...state,
        cart: upsertCartLine(state.cart, {
          productId: action.productId,
          size: action.size,
          fromWishlist: false,
        }),
      };

    case "CLEAR_CART":
      return { ...state, cart: [], justConfirmed: false };

    case "CONFIRM":
      return { ...state, justConfirmed: true };

    case "LOG_EVENT":
      return {
        ...state,
        eventLog: [...state.eventLog, stampEvent(action.event)],
      };

    case "SET_NUDGE_INBOX_HINT":
      return { ...state, nudgeInboxOpenHint: action.value };

    case "CLEAR_HIGHLIGHT":
      return { ...state, highlightedProductId: null };

    case "SET_HIGHLIGHT":
      return { ...state, highlightedProductId: action.productId };

    case "OPEN_NOTIFICATIONS":
      return { ...state, notificationOpen: true };

    case "CLOSE_NOTIFICATIONS":
      return { ...state, notificationOpen: false, nudgeInboxOpenHint: false };

    default:
      return state;
  }
}

export const initialAppState: AppState = createSeedState();
