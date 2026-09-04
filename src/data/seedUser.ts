import type { UserProfile } from "../types";

/**
 * Demo persona with enough Aurelia (Brand A) history for a personal fit path
 * on dresses: returned M in dresses, keeps M in tops → suggest L for dresses.
 */
export const seedUser: UserProfile = {
  id: "demo-user-01",
  displayName: "Ananya",
  orderHistory: [
    // Aurelia tops — kept M (habit size in tops)
    {
      productId: "hist-aurelia-tee-1",
      brand: "Aurelia",
      category: "tops",
      size: "M",
      outcome: "kept",
    },
    {
      productId: "hist-aurelia-tee-2",
      brand: "Aurelia",
      category: "tops",
      size: "M",
      outcome: "kept",
    },
    {
      productId: "hist-aurelia-blouse-1",
      brand: "Aurelia",
      category: "tops",
      size: "M",
      outcome: "kept",
    },
    // Aurelia dresses — returned M for fit (need ≥3 brand+category events)
    {
      productId: "hist-aurelia-dress-1",
      brand: "Aurelia",
      category: "dresses",
      size: "M",
      outcome: "returned_fit",
    },
    {
      productId: "hist-aurelia-dress-2",
      brand: "Aurelia",
      category: "dresses",
      size: "M",
      outcome: "returned_fit",
    },
    {
      productId: "hist-aurelia-dress-3",
      brand: "Aurelia",
      category: "dresses",
      size: "L",
      outcome: "kept",
    },
    // Unrelated brand noise (should not drive Brand B crowd path)
    {
      productId: "hist-other-sneaker",
      brand: "Neemans",
      category: "footwear",
      size: "M",
      outcome: "kept",
    },
  ],
};
