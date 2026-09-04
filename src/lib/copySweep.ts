import { auditCopy } from "./copyLint";

/** Static UI strings that must stay incentive-free. */
export const UI_COPY_CORPUS: string[] = [
  "Fit confidence on saved styles. No codes needed",
  "Search on Nykaa",
  "Saved for you",
  "Fit confidence on every tile. No tap needed.",
  "Featured for you",
  "Same fit signals. Denser browse.",
  "Wedding guest edits",
  "Saved looks with clearer fit signals",
  "Everyday western",
  "Size confidence before you decide",
  "Footwear favorites",
  "Revisit what you saved, without the wait-and-forget",
  "Explore →",
  "Notifications",
  "Trigger-based only, paired with fit confidence. Not a generic reminder feed.",
  "View item",
  "Dismiss",
  "Reset demo",
  "Move to Cart",
  "Not enough data. Choose a size",
  "Complete the look ready in bag",
  "Demo only · Simulate trigger",
  "Force-fires a qualifying event (not a generic reminder). Paired fit copy is included.",
  "No active nudges. Simulate a trigger below to fire one.",
  "Complete the look",
  "Pairs well. Finishes the look.",
  "Proceed",
  "You're set. Fit notes checked",
  "Added in your confident size where we had a signal. No codes, no pressure. Just clearer decisions.",
  "Categories",
  "Demo stub. Confidence-to-Cart lives on Home and Wishlist.",
];

export function runCopyLintSweep(): { ok: boolean; hits: string[] } {
  return auditCopy(UI_COPY_CORPUS);
}

export function logCopyLintSweep(): void {
  const { ok, hits } = runCopyLintSweep();
  if (ok) {
    console.info(`[copyLint] sweep passed (${UI_COPY_CORPUS.length} strings)`);
  } else {
    console.error("[copyLint] sweep FAILED\n" + hits.join("\n"));
  }
}
