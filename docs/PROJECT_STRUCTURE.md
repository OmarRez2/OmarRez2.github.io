# Project structure

Next.js 16 (App Router) portfolio, exported statically to GitHub Pages.
Run all npm commands from the repository root.

```text
.
├─ src/                    Application code
│  ├─ app/                 Routes, layouts, metadata (robots, sitemap), global CSS
│  ├─ components/          Shared React components
│  │  └─ ui/               shadcn/base-ui primitives
│  └─ lib/                 Portfolio data, appearance settings, utilities
├─ public/                 Published assets; paths are public URLs
│  ├─ documents/           Downloadable CV
│  ├─ images/              Portraits, certificates/, projects/ (optimized WebP/JPG only)
│  └─ .nojekyll            Required by GitHub Pages
├─ assets-src/             LOCAL ONLY, git-ignored original/source files (never deployed)
│  ├─ projects/            Original project screenshots (PNG)
│  ├─ portraits/           Original portrait files (PNG)
│  └─ certificates/        Original certificate uploads, kept with their original names
├─ tests/                  Playwright browser regression tests
├─ scripts/                Maintained helpers (static-export server, performance run)
├─ docs/
│  ├─ PROJECT_STRUCTURE.md This file
│  ├─ audit/               Audit reports and retained evidence (historical)
│  └─ maintenance/         Cleanup records
├─ .github/workflows/      GitHub Pages build, checks and deployment
├─ .tools/                 Local portable Node runtime (git-ignored, used by START-PORTFOLIO.cmd)
└─ root config             package.json, next.config.ts, tsconfig.json, eslint.config.mjs,
                           postcss.config.mjs, playwright.config.ts, components.json,
                           next-env.d.ts (generated), .gitignore,
                           AGENTS.md, CLAUDE.md, START-PORTFOLIO.cmd
```

## Where new files go

| Adding… | Put it in |
| --- | --- |
| A page or route | `src/app/<route>/page.tsx` |
| A shared component | `src/components/`; shadcn primitives in `src/components/ui/` |
| Portfolio content, helpers, settings | `src/lib/` |
| A published image | `public/images/<group>/`, as optimized WebP/JPG, referenced as `/images/...` |
| A raw/original image or certificate upload | `assets-src/<group>/` (git-ignored; keep the original file) |
| A browser test | `tests/*.spec.ts` |
| A maintenance/build helper script | `scripts/` |
| Notes, reports, cleanup records | `docs/` |
| New tool config files | Repository root (frameworks expect them there) |

## Rules worth remembering

- Anything in `public/` is deployed. Keep source originals out of it; `.gitignore`
  also blocks `public/images/**/*.png` as a guard.
- `assets-src/` is not in Git. Back it up separately if the originals matter.
- Generated output (`.next/`, `out/`, `test-results/`, `playwright-report/`,
  `tsconfig.tsbuildinfo`) is git-ignored and rebuildable; see the README.
- Do not move `next-env.d.ts`, framework config files or `docs/audit/audit-evidence/`
  (ESLint ignores that folder by path).

## History

- 2026-10-10: audit files grouped under `docs/audit/`; generated output removed
  (see `docs/maintenance/cleanup-2026-10-10.md`).
- 2026-10-10: local PNG originals moved from `public/images/` and `Certifcations/`
  into `assets-src/`; `.gitignore` updated. No file was renamed or deleted.
  `docs/maintenance/cleanup-2026-10-10.md` and `docs/audit/` still mention the old
  `Certifcations/` name; they are historical and were left unchanged.
