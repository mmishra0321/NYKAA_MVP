/**
 * Complete-the-Look pairs — mirrored from Product.lookPairIds for easy lookup.
 * Primary source of truth remains each product's lookPairIds; this map is a
 * convenience export for Phase 5 helpers.
 */
export const seedLookPairs: Record<string, string[]> = {
  "aurelia-floral-dress": ["sassafras-rib-top", "aurelia-wrap-top"],
  "sassafras-rib-top": ["sassafras-midi-dress"],
  "atelier-nova-slip": ["aurelia-wrap-top"],
  "aurelia-wrap-top": ["aurelia-floral-dress"],
  "sassafras-midi-dress": ["sassafras-rib-top"],
  "aurelia-linen-co-ord": ["sassafras-midi-dress"],
};
