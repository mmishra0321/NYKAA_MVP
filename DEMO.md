# Confidence-to-Cart — Demo script

Validate the MVP on the **live** or **localhost** URL (Nykaa **app** Home + notification sidebar).

**Live:** [https://nykaa-mvp-kappa.vercel.app](https://nykaa-mvp-kappa.vercel.app)  
**Local:** `npm run dev` → [http://127.0.0.1:5173/](http://127.0.0.1:5173/)

## Happy path

| # | Step | Expected |
|---|---|---|
| 1 | Open the live URL (or localhost) | App Home: NYKAA + search + **bell** + bag; category chips; hero; **Saved for you** |
| 2 | Point at Fit Confidence on home cards | **personal / crowd / insufficient** visible without tap-through |
| 3 | Tap **bell** | Notification **sidebar** slides in (not a separate Nudges tab) |
| 4 | **Demo · Simulate** → Back in stock (or Occasion) | Toast + paired trigger + fit copy in the panel |
| 5 | Tap **View item** on a nudge | Sidebar closes; home card highlights |
| 6 | **Move to Cart** on that / any confident card | Bag opens; size pre-filled; **Complete the Look** |
| 7 | Optional Add on look item → **Proceed** | Confirmation — no coupon/discount CTA |
| 8 | **Reset demo** | Seed restored |

## Guardrails

| # | Check | Expected |
|---|---|---|
| G1 | Bottom nav | Home · Categories · Wishlist · Bag — **no Nudges tab** |
| G2 | Hero / utility copy | No % off / flash-sale / cashback |
| G3 | `/nudges` URL | Redirects to Home and opens sidebar |
| G4 | 375–430px | No horizontal page scroll; sidebar usable |

## Success criteria checklist

- [ ] Fit-confidence badges on **Home** tiles
- [ ] ≥1 nudge via **bell → sidebar** with paired copy
- [ ] One-click add-to-cart in confident size
- [ ] ≥1 Complete the Look suggestion
- [ ] Loop works on the live URL (or localhost) without the builder
