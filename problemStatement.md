# Problem Statement: "Confidence-to-Cart" MVP

**Nykaa Fashion — Growth Team Capstone (Deliverable 3 of 3: Deployed MVP)**

---

## 1. Role & Context

You are acting as a Product Manager on the Growth Team at **Nykaa Fashion** (India's online fashion and lifestyle marketplace — Android app ID `com.fsn.nds`, iOS app ID `1439872423`).

This MVP is the solution deliverable for a capstone project. It follows a discovery phase (AI-powered review/community analysis across App Store, Play Store, Trustpilot, MouthShut, Reddit, YouTube, Twitter, Quora) and a validation phase (5–6 user interviews), both of which pointed to the same conclusion below. This document defines **what to build, not what to research** — the problem has already been identified and validated.

---

## 2. Business Objective (top of funnel — why this matters)

**Increase the percentage of users who purchase at least one item from their wishlist within 30 days of adding it.**

**Hard constraint:** no monetary incentives. No coupons, discounts, cashback, or price-cuts as the mechanism. The solution must work by removing doubt, friction, or forgetting — not by making the item cheaper.

---

## 3. Validated Problem Statement

Users wishlist fashion items with genuine purchase intent, but the wishlist functions as a **dead end** rather than a path to purchase, for three compounding reasons:

1. **Unresolved doubt** — the user remains uncertain whether the item will actually fit them. Sizing is inconsistent across brands and categories (a size M in one brand's tops may fit like a size S in another brand's dresses), and there is no way to verify fit before buying. This uncertainty is strong enough to stall an otherwise-genuine purchase intent.

2. **Passive forgetting** — even when that doubt could eventually be resolved, the wishlist is a static list. Nothing re-surfaces the item at the moment doubt is lowest and urgency is highest (e.g. price has proven stable, the item is back in stock in the right size, a relevant occasion is approaching). The original intent decays from simple inattention, not rejection.

3. **Re-engagement friction** — when the user does revisit a wishlisted item, converting still requires multiple manual steps (re-check size, re-check stock, navigate to product page, add to cart). This residual friction is enough to lose an already-warmed-up user a second time.

**Target segment:** Wishlist-heavy users who have saved fashion items (apparel/footwear) but have not purchased within 30 days, and who have at least some order history (returns or kept items) to draw a fit signal from, or sufficient product-level buyer data to fall back on a crowd signal.

**Why this matters to the user:** removes the two real sources of anxiety and effort in online fashion shopping (will it fit, will I have to deal with a return) without pressuring them financially.

**Why this matters to the business:** converts already-acquired, high-intent demand sitting idle in wishlists, without discounting margin away.

---

## 4. The MVP: "Confidence-to-Cart"

A single connected loop across three layers. **All three are required** — they solve three different failure points in sequence, and none of them work alone (a badge without a nudge is never seen again; a nudge without resolved doubt still stalls; one-click without a trigger has nothing to act on).

### Layer 1 — Fit Confidence Badge (resolves doubt)

Every wishlisted item displays a personalized confidence signal directly on the wishlist tile (no extra click required):

- **If the user has order history:** derive a fit signal from their own kept-vs-returned pattern, ideally per brand/category (e.g. "You keep M in tops but returned M in dresses from this brand — buyers with your profile order L in dresses here").
- **If the user has no relevant order history:** fall back to product-level crowd data — how many buyers of this specific item, in a given size, kept it vs. returned it for fit reasons (e.g. "68% of buyers in size M kept this without returning").
- Badge should degrade gracefully to **"not enough data yet"** rather than showing nothing or a misleading signal, when neither personal nor crowd data is sufficient.

### Layer 2 — Trigger-Based Nudges (resolves forgetting/urgency)

The system monitors each wishlisted item for qualifying trigger events and sends a nudge only when a real trigger fires — not a generic periodic reminder:

- **Price-stability signal** — price has held steady for a meaningful period, addressing "should I wait for a drop" without ever discounting.
- **Back-in-stock in the user's confident size** — specifically the size flagged by Layer 1's badge, not just "back in stock" generically.
- **Low-stock urgency** — genuine stock scarcity in the user's size, not manufactured urgency.
- **Occasion-based reminder** — if an occasion was tagged at save-time or can be reasonably inferred (e.g. an upcoming festival/date), resurface the item ahead of it.

Nudge copy should pair the trigger with the confidence signal from Layer 1 in a single message (e.g. "Back in stock in your size — buyers with your fit profile rarely return this").

### Layer 3 — One-Click Conversion + Cross-Sell (resolves friction)

When the user acts on a nudge or revisits the wishlist:

- **One-click "Move to Cart"** — adds the item (in the confident size) directly to cart from the wishlist screen, no product-page detour.
- **"Complete the Look"** — surfaces 1–2 matched/complementary items alongside the triggered item, turning a single-item save into a slightly larger, more confident basket.

---

## 5. Functional Requirements

1. **Fit-confidence computation:**
   - Personal model: per-user, per-brand/category keep-vs-return history
   - Fallback model: per-product, per-size aggregate keep-vs-return rate across buyers
   - A confidence threshold/data-sufficiency rule for when to show a signal vs. show "not enough data"
2. Badge rendering on the wishlist screen, at the tile level (must not require a tap-through to see)
3. A trigger-detection service that evaluates each wishlisted item against the four trigger types (price stability, back-in-stock in confident size, low-stock, occasion) on a scheduled or event-driven basis
4. A notification/nudge dispatch mechanism (push/in-app) that fires only on a qualifying trigger and includes the paired confidence + trigger message
5. A one-click add-to-cart action from the wishlist screen that pre-fills the confident size
6. A "Complete the Look" recommendation call alongside the triggered item
7. Basic instrumentation/logging: which badge was shown, which trigger fired, whether the user converted — needed later for Part 6 (success metrics)

---

## 6. Constraints & Non-Goals

| Rule | Detail |
|---|---|
| **No monetary incentives** | Nowhere in the flow (no coupons, discount badges, flash-sale framing) |
| **Deployable prototype** | Must be publicly accessible and testable — graded deliverable link, not a local-only demo |
| **Graceful degradation** | Never show a fabricated or misleading fit claim when data is insufficient |
| **Nykaa Fashion only** | Scope is Nykaa Fashion only |
| **Slice is enough** | MVP does not need every product category exhaustively — a working, testable slice (e.g. one or two apparel categories with enough mock/sample data) is sufficient to demonstrate the loop end-to-end |

---

## 7. Success Criteria for This Deliverable

The MVP is considered complete when a tester can, in a live/deployed environment:

1. See a wishlist with fit-confidence badges rendered per item
2. Trigger (or simulate) at least one nudge type and receive a paired confidence + trigger message
3. Convert via one-click add-to-cart from the wishlist screen, in the confident size
4. See at least one "Complete the Look" cross-sell suggestion alongside the converted item
5. Access the whole flow via a shareable public link, without needing the builder present

---

## 8. Downstream Use

This document is intended to be handed to an AI coding assistant (Claude/Cursor) to produce a detailed technical architecture and build plan: data model for order/return history and product-level size stats, the trigger-detection service design, notification delivery approach, front-end flow for the wishlist screen (badge + one-click + cross-sell), and a deployment plan for a publicly testable link. Implementation choices (tech stack, mock vs. real data source, specific ML approach for the confidence score) are intentionally left open here for that next step to define.

See **[architecture.md](./architecture.md)** for that plan.
