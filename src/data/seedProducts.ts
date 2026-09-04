import type { Product, ProductSizeStat, Size } from "../types";

const emptyStock = (): Record<Size, number> => ({
  XS: 0,
  S: 0,
  M: 0,
  L: 0,
  XL: 0,
});

/** Local fashion imagery under /public/images (reliable offline / no CDN blocks). */
const fashion = (file: string) => `/images/${file}`;

/**
 * Slice: tops + dresses under Aurelia (Brand A) and Sassafras (Brand B),
 * plus one sparse SKU for the insufficient badge path.
 */
export const seedProducts: Product[] = [
  {
    id: "aurelia-floral-dress",
    name: "Floral Tiered Midi Dress",
    brand: "Aurelia",
    category: "dresses",
    imageUrl: fashion("floral-dress.jpg"),
    priceInr: 2499,
    priceStableDays: 10,
    stockBySize: { ...emptyStock(), S: 4, M: 2, L: 6, XL: 3 },
    occasionTag: "Wedding guest · Sep",
    occasionSoon: true,
    lookPairIds: ["sassafras-rib-top", "aurelia-wrap-top"],
  },
  {
    id: "sassafras-rib-top",
    name: "Ribbed Square-Neck Top",
    brand: "Sassafras",
    category: "tops",
    imageUrl: fashion("rib-top.jpg"),
    priceInr: 1299,
    priceStableDays: 10,
    stockBySize: { ...emptyStock(), S: 8, M: 12, L: 5, XL: 2 },
    lookPairIds: ["sassafras-midi-dress"],
  },
  {
    id: "atelier-nova-slip",
    name: "Nova Satin Slip Dress",
    brand: "Atelier Nova",
    category: "dresses",
    imageUrl: fashion("satin-slip.jpg"),
    priceInr: 3199,
    priceStableDays: 5,
    stockBySize: { ...emptyStock(), S: 1, M: 1, L: 0, XL: 0 },
    lookPairIds: ["aurelia-wrap-top"],
  },
  {
    id: "aurelia-wrap-top",
    name: "Cotton Wrap Top",
    brand: "Aurelia",
    category: "tops",
    imageUrl: fashion("wrap-top.jpg"),
    priceInr: 1599,
    priceStableDays: 10,
    stockBySize: { ...emptyStock(), S: 3, M: 9, L: 7, XL: 4 },
    lookPairIds: ["aurelia-floral-dress"],
  },
  {
    id: "sassafras-midi-dress",
    name: "Belted Shirt Midi Dress",
    brand: "Sassafras",
    category: "dresses",
    imageUrl: fashion("midi-dress.jpg"),
    priceInr: 2799,
    priceStableDays: 9,
    stockBySize: { ...emptyStock(), S: 2, M: 2, L: 1, XL: 0 },
    occasionTag: "Festive dinner",
    occasionSoon: false,
    lookPairIds: ["sassafras-rib-top"],
  },
  {
    id: "aurelia-linen-co-ord",
    name: "Linen Co-ord Top",
    brand: "Aurelia",
    category: "tops",
    imageUrl: fashion("linen-top.jpg"),
    priceInr: 1899,
    priceStableDays: 10,
    stockBySize: { ...emptyStock(), S: 0, M: 1, L: 2, XL: 1 },
    lookPairIds: ["sassafras-midi-dress"],
  },
];

/**
 * Crowd stats: Sassafras rib top has strong M keep rate (≥20 samples).
 * Atelier Nova is sparse (insufficient path).
 * Aurelia dress has stats but personal path should win first.
 */
export const seedSizeStats: ProductSizeStat[] = [
  // Personal-path product — crowd available but secondary
  { productId: "aurelia-floral-dress", size: "M", keptCount: 40, returnedFitCount: 28 },
  { productId: "aurelia-floral-dress", size: "L", keptCount: 55, returnedFitCount: 12 },
  { productId: "aurelia-floral-dress", size: "S", keptCount: 22, returnedFitCount: 18 },

  // Crowd-path hero — high keep on M
  { productId: "sassafras-rib-top", size: "S", keptCount: 30, returnedFitCount: 10 },
  { productId: "sassafras-rib-top", size: "M", keptCount: 82, returnedFitCount: 18 },
  { productId: "sassafras-rib-top", size: "L", keptCount: 44, returnedFitCount: 16 },

  // Insufficient — below crowdMinSamples (20)
  { productId: "atelier-nova-slip", size: "S", keptCount: 2, returnedFitCount: 1 },
  { productId: "atelier-nova-slip", size: "M", keptCount: 3, returnedFitCount: 2 },

  { productId: "aurelia-wrap-top", size: "M", keptCount: 60, returnedFitCount: 8 },
  { productId: "aurelia-wrap-top", size: "L", keptCount: 25, returnedFitCount: 5 },

  { productId: "sassafras-midi-dress", size: "M", keptCount: 48, returnedFitCount: 20 },
  { productId: "sassafras-midi-dress", size: "L", keptCount: 36, returnedFitCount: 9 },

  { productId: "aurelia-linen-co-ord", size: "M", keptCount: 28, returnedFitCount: 6 },
  { productId: "aurelia-linen-co-ord", size: "L", keptCount: 22, returnedFitCount: 4 },
];
