const BAN =
  /\b(coupon|discount|cashback|flash\s*sale|%\s*off|extra\s*off|sale\s*price)\b/i;

/** Strip educational / hard-constraint negations before scanning. */
function stripAllowedNegations(text: string): string {
  return text
    .replace(
      /\b(without|no|never|not)\s+(a\s+)?(coupons?|discounts?|cashback|price-?cuts?|monetary incentives?)\b/gi,
      " ",
    )
    .replace(/\bno codes\b/gi, " ");
}

/** Returns null if clean; otherwise the matched ban term. */
export function findIncentiveCopy(text: string): string | null {
  const m = stripAllowedNegations(text).match(BAN);
  return m ? m[0] : null;
}

export function assertNoIncentiveCopy(text: string): void {
  const hit = findIncentiveCopy(text);
  if (hit) {
    throw new Error(`Incentive language banned: "${hit}" in "${text}"`);
  }
}

/** Sweep a list of UI strings (Phase 5–6 copy audit). */
export function auditCopy(strings: string[]): { ok: boolean; hits: string[] } {
  const hits: string[] = [];
  for (const s of strings) {
    const hit = findIncentiveCopy(s);
    if (hit) hits.push(`${hit} ← ${s}`);
  }
  return { ok: hits.length === 0, hits };
}
