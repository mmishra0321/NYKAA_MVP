/**
 * Assert table for the three required seed badge paths (architecture §7.2 / Phase 2).
 * Runs in DEV on hydrate; also exported for manual checks.
 */

import { seedProducts, seedSizeStats, seedUser, seedWishlist } from "../data";
import { computeFitConfidence } from "./fitConfidence";
import type { FitSource, Size } from "../types";

export interface FitScenarioExpect {
  productId: string;
  source: FitSource;
  confidentSize: Size | null;
  label: string;
}

/** Must ship: personal (Brand A dress), crowd (Brand B top), insufficient (sparse SKU). */
export const FIT_SCENARIO_EXPECTATIONS: FitScenarioExpect[] = [
  {
    productId: "aurelia-floral-dress",
    source: "personal",
    confidentSize: "L",
    label: "Brand A dress → personal",
  },
  {
    productId: "sassafras-rib-top",
    source: "crowd",
    confidentSize: "M",
    label: "Brand B top → crowd",
  },
  {
    productId: "atelier-nova-slip",
    source: "insufficient",
    confidentSize: null,
    label: "Sparse SKU → insufficient",
  },
];

export function assertFitScenarios(): {
  ok: boolean;
  results: Array<{
    label: string;
    expected: string;
    actual: string;
    pass: boolean;
  }>;
} {
  const byId = new Map(seedProducts.map((p) => [p.id, p]));
  const results = FIT_SCENARIO_EXPECTATIONS.map((exp) => {
    const product = byId.get(exp.productId);
    if (!product) {
      return {
        label: exp.label,
        expected: `${exp.source}/${exp.confidentSize}`,
        actual: "missing product",
        pass: false,
      };
    }
    const badge = computeFitConfidence(seedUser, product, seedSizeStats);
    const pass =
      badge.source === exp.source && badge.confidentSize === exp.confidentSize;
    return {
      label: exp.label,
      expected: `${exp.source}/${String(exp.confidentSize)}`,
      actual: `${badge.source}/${String(badge.confidentSize)}`,
      pass,
    };
  });

  // Ensure wishlist still includes all three scenario SKUs
  const wishIds = new Set(seedWishlist.map((w) => w.productId));
  for (const exp of FIT_SCENARIO_EXPECTATIONS) {
    if (!wishIds.has(exp.productId)) {
      results.push({
        label: `${exp.label} on wishlist`,
        expected: "present",
        actual: "missing",
        pass: false,
      });
    }
  }

  return { ok: results.every((r) => r.pass), results };
}

export function logFitScenarioAsserts(): void {
  const { ok, results } = assertFitScenarios();
  const lines = results.map(
    (r) => `${r.pass ? "✓" : "✗"} ${r.label}: expected ${r.expected}, got ${r.actual}`,
  );
  if (ok) {
    console.info("[fitConfidence] scenario asserts passed\n" + lines.join("\n"));
  } else {
    console.error("[fitConfidence] scenario asserts FAILED\n" + lines.join("\n"));
  }
}
