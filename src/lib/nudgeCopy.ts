import type { FitBadge, TriggerType } from "../types";

const BAN =
  /\b(coupon|discount|cashback|flash\s*sale|%\s*off|extra\s*off)\b/i;

function confidenceFragment(badge: FitBadge): string {
  if (badge.source === "personal") {
    return badge.confidentSize
      ? `buyers with your fit profile rarely return this. Your confident size is ${badge.confidentSize}`
      : "buyers with your fit profile rarely return this";
  }
  if (badge.source === "crowd" && badge.keepRate != null) {
    const pct = Math.round(badge.keepRate * 100);
    return `${pct}% of buyers in this size kept it without a fit return`;
  }
  if (badge.source === "crowd") {
    return "most buyers in this size kept it without a fit return";
  }
  return "we'll keep watching fit signal for this piece";
}

function triggerFact(
  trigger: TriggerType,
  badge: FitBadge,
  occasionLabel?: string,
): string {
  const size = badge.confidentSize;
  switch (trigger) {
    case "price_stable":
      return "Price has held steady for a meaningful stretch";
    case "back_in_stock":
      return size
        ? `Back in stock in your size (${size})`
        : "Back in stock";
    case "low_stock":
      return size
        ? `Only a few left in your size (${size})`
        : "Only a few left in stock";
    case "occasion":
      return occasionLabel
        ? `${occasionLabel} is coming up`
        : "Your saved occasion is coming up";
  }
}

export function buildNudgeCopy(
  trigger: TriggerType,
  badge: FitBadge,
  productName: string,
  occasionLabel?: string,
): { title: string; body: string } {
  const fact = triggerFact(trigger, badge, occasionLabel);
  const confidence = confidenceFragment(badge);
  const title = `${productName}`;
  const body = `${fact}. ${confidence.charAt(0).toUpperCase()}${confidence.slice(1)}.`;

  if (BAN.test(body) || BAN.test(title)) {
    throw new Error("nudgeCopy: incentive language banned");
  }

  return { title, body };
}

export const TRIGGER_LABELS: Record<TriggerType, string> = {
  price_stable: "Price stable",
  back_in_stock: "Back in stock",
  low_stock: "Low stock",
  occasion: "Occasion",
};
