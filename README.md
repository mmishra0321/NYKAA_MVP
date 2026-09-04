# Confidence-to-Cart — Nykaa Fashion MVP

React UI prototype for wishlist → cart conversion: **Fit Confidence** badges, trigger-based nudges, one-click Move to Cart, and Complete the Look — without monetary incentives.

## Live demo

> **Production:** [https://nykaa-mvp-kappa.vercel.app](https://nykaa-mvp-kappa.vercel.app)

Nykaa **app-format** Home with Fit Confidence on tiles, **bell → notification sidebar** (all 4 triggers), one-click cart, and Complete the Look.

## Local development

```bash
npm install
npm run dev
```

Opens [http://127.0.0.1:5173/](http://127.0.0.1:5173/).

Production-like local build:

```bash
npm run serve
```

Opens [http://127.0.0.1:4173/](http://127.0.0.1:4173/) after `vite build`.

## Deploy (Vercel)

This is a static Vite SPA. `vercel.json` sets the Vite framework, `dist` output, and SPA rewrites so React Router paths work.

### Option A — CLI (from this repo)

```bash
npm install
npx vercel login          # once
npx vercel                # preview deploy
npx vercel --prod         # production
```

### Option B — GitHub → Vercel dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import **`mmishra0321/NYKAA_MVP`**
3. Framework: **Vite** (auto). Build: `npm run build`. Output: `dist`
4. Deploy — every push to `main` updates production

No env vars required (all data is client-side mock seed).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server → http://127.0.0.1:5173 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview last build |
| `npm run serve` | Build + preview on http://127.0.0.1:4173 |
| `npm run test:e2e` | Playwright happy path against local preview |

## Demo for graders

See **[DEMO.md](./DEMO.md)** (architecture §18).

Short path:

1. Home → see Fit Confidence on Saved / Featured tiles  
2. Bell → **Notifications** → Simulate a trigger → open item  
3. **Move to Cart** → Complete the Look → **Proceed** → Confirmation  
4. **Reset demo** to replay  

## Docs

- [problemStatement.md](./problemStatement.md) — product brief  
- [architecture.md](./architecture.md) — implementation plan  
- [DEMO.md](./DEMO.md) — QA / grader script  

## Stack

React 18 · Vite · TypeScript · Tailwind · React Router · Vercel  

Repo: [github.com/mmishra0321/NYKAA_MVP](https://github.com/mmishra0321/NYKAA_MVP)
