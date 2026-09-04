import { seedUser } from "./seedUser";
import { seedProducts, seedSizeStats } from "./seedProducts";
import { seedWishlist } from "./seedWishlist";
import { seedLookPairs } from "./seedLooks";
import { computeBadgesForWishlist } from "../lib/fitConfidence";
import { evaluateTriggers } from "../lib/triggers";
import type { AppState } from "../types";

export { seedUser, seedProducts, seedSizeStats, seedWishlist, seedLookPairs };

/** Fresh AppState from seed — used on hydrate and Reset demo. */
export function createSeedState(): AppState {
  const user = structuredClone(seedUser);
  const products = structuredClone(seedProducts);
  const sizeStats = structuredClone(seedSizeStats);
  const wishlist = structuredClone(seedWishlist);
  const badgesByProductId = computeBadgesForWishlist(
    user,
    products,
    sizeStats,
    wishlist,
  );
  const nudges = evaluateTriggers(wishlist, products, badgesByProductId, []);

  return {
    user,
    products,
    sizeStats,
    wishlist,
    badgesByProductId,
    nudges,
    cart: [],
    lastTriggerSimulated: null,
    eventLog: [],
    nudgeInboxOpenHint: false,
    justConfirmed: false,
    lastConvertedProductId: null,
    highlightedProductId: null,
    notificationOpen: false,
  };
}
