# joaquinh.com

Single-page portfolio site for `joaquinh.com`.

## Stack

- Vite
- Plain HTML, CSS, and JS
- Single content source in `src/content.js`

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The static output is written to `dist/`.

## Cloudflare Pages

Recommended project settings:

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22` or newer

If you want to manage deploys with Wrangler, this repo already includes a `wrangler.toml` compatible with static output.

## Content updates

- Main page copy, stats, links, projects, and contributions live in `src/content.js`.
- Proof-strip numbers were last verified on March 17, 2026.
