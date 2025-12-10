# DevOps Study Hub (Next.js)

Next.js rebuild of the static DevOps study hub. The topic detail pages are served from `public/html` so the original guides remain intact while the shell is React-driven.

## Getting started

```bash
cd "/Users/pratikvairagi/Documents/devops/git clones /devops_ui/Devops_prec/devops-next"
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

- `app/page.tsx` – main UI with topic list, search, sidebar toggle, and iframe viewer.
- `app/globals.css` – styling adapted from the original static page.
- `public/html/*` – original topic HTML files, loaded in the viewer.
- `next.config.mjs` / `tsconfig.json` – standard Next.js configuration.

## Notes

- To add a new guide, drop an HTML file in `public/html` and add its entry to the `topics` array in `app/page.tsx`.
- The “Hide topics” button collapses the sidebar for a larger reading area.

