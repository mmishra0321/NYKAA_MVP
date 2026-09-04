import type { Product } from "../types";
import { seedLookPairs } from "../data/seedLooks";

/**
 * Returns 1–2 complementary products for Complete the Look.
 * Skips ids already in the exclude set (cart / same product).
 */
export function completeTheLook(
  productId: string,
  products: Product[],
  excludeIds: Set<string> = new Set(),
): Product[] {
  const byId = new Map(products.map((p) => [p.id, p]));
  const product = byId.get(productId);
  const pairIds =
    product?.lookPairIds?.length
      ? product.lookPairIds
      : (seedLookPairs[productId] ?? []);

  const out: Product[] = [];
  for (const id of pairIds) {
    if (excludeIds.has(id) || id === productId) continue;
    const p = byId.get(id);
    if (p) out.push(p);
    if (out.length >= 2) break;
  }
  return out;
}
