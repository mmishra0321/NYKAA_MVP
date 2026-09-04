# Confidence-to-Cart — Nykaa Fashion MVP

React UI prototype for wishlist → cart conversion: **Fit Confidence** badges, trigger-based nudges, one-click Move to Cart, and Complete the Look — without monetary incentives.

## Local URL (current deliverable)

> **Local URL:** [http://127.0.0.1:5173/](http://127.0.0.1:5173/)

Nykaa **app-format** Home with Fit Confidence on tiles, **bell → notification sidebar** (all 4 triggers), one-click cart, and Complete the Look.

```bash
npm install
npm run dev
```

Production-like local build (static preview):

```bash
npm run serve
```

Opens [http://127.0.0.1:4173/](http://127.0.0.1:4173/) after `vite build`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server → http://127.0.0.1:5173 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview last build (default Vite preview port) |
| `npm run serve` | Build + preview on http://127.0.0.1:4173 |
| `npm run test:e2e` | Playwright happy path against local preview |

## Demo for graders

See **[DEMO.md](./DEMO.md)** (architecture §18).

Short path:

1. Home → **Wishlist** — personal / crowd / not-enough-data badges  
2. **Nudges** → Simulate Back in stock → read paired copy  
3. **Move to Cart** → Complete the Look → **Proceed** → Confirmation  
4. **Reset demo** to replay  

## Docs

- [problemStatement.md](./problemStatement.md) — product brief  
- [architecture.md](./architecture.md) — implementation plan  
- [DEMO.md](./DEMO.md) — QA / grader script  

## Stack

React 18 · Vite · TypeScript · Tailwind · React Router  

Vercel config (`vercel.json`) is reserved for a later public deploy — not required for local demo.
