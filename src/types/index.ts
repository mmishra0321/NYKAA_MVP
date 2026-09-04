export type Category = "tops" | "dresses" | "footwear";
export type Size = "XS" | "S" | "M" | "L" | "XL";

export type FitSource = "personal" | "crowd" | "insufficient";

export type TriggerType =
  | "price_stable"
  | "back_in_stock"
  | "low_stock"
  | "occasion";

export interface OrderHistoryItem {
  productId: string;
  brand: string;
  category: Category;
  size: Size;
  outcome: "kept" | "returned_fit";
}

export interface UserProfile {
  id: string;
  displayName: string;
  orderHistory: OrderHistoryItem[];
}

export interface ProductSizeStat {
  productId: string;
  size: Size;
  keptCount: number;
  returnedFitCount: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  imageUrl: string;
  priceInr: number;
  priceStableDays: number;
  stockBySize: Record<Size, number>;
  /** Sizes that were OOS before a restock — powers back_in_stock demos */
  previouslyOutOfStockSizes?: Size[];
  occasionTag?: string;
  occasionSoon?: boolean;
  lookPairIds: string[];
}

export interface WishlistEntry {
  productId: string;
  savedAtLabel: string;
  occasionTag?: string;
}

export interface FitBadge {
  source: FitSource;
  confidentSize: Size | null;
  shortLabel: string;
  detail: string;
  keepRate?: number;
}

export interface Nudge {
  id: string;
  productId: string;
  trigger: TriggerType;
  title: string;
  body: string;
  createdAt: string;
  dismissed: boolean;
  read: boolean;
}

export interface CartLine {
  productId: string;
  size: Size;
  fromWishlist: boolean;
}

export type AnalyticsEventName =
  | "badge_impressed"
  | "nudge_shown"
  | "nudge_dismissed"
  | "simulate_trigger"
  | "move_to_cart"
  | "look_add"
  | "confirm";

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  at: string;
  payload: Record<string, string | number | boolean | null | undefined>;
}

export interface AppState {
  user: UserProfile;
  products: Product[];
  sizeStats: ProductSizeStat[];
  wishlist: WishlistEntry[];
  badgesByProductId: Record<string, FitBadge>;
  nudges: Nudge[];
  cart: CartLine[];
  lastTriggerSimulated: TriggerType | null;
  eventLog: AnalyticsEvent[];
  nudgeInboxOpenHint: boolean;
  justConfirmed: boolean;
  /** Most recent wishlist → cart product (drives Complete the Look). */
  lastConvertedProductId: string | null;
  /** Wishlist tile / home card to pulse after a simulated nudge. */
  highlightedProductId: string | null;
  /** Bell → notification sidebar open */
  notificationOpen: boolean;
}
