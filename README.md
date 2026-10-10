# Omar Rezk — Data & BI Portfolio

Live site: [https://omarrez2.github.io](https://omarrez2.github.io)

A multi-page, responsive portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui.

## Pages

- Home
- About
- Projects
- Dynamic project case studies
- Certificates
- Contact
- Privacy and analytics choices

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

On the prepared Windows copy, you can also double-click `START-PORTFOLIO.cmd`; the included portable Node runtime will start the production site and open it in your browser.

## Production

```bash
npm run build
npm start
```

## GitHub Pages

Every push to the `main` branch builds the static Next.js export and deploys it through GitHub Actions.

## Release checks

Use Node 22 and `npm ci`. Build with `GITHUB_PAGES=true` and the configured
`NEXT_PUBLIC_GA_MEASUREMENT_ID` (analytics remains off until visitor consent).
Then run `npm run lint`, `npm run typecheck`, `npx playwright install chromium`,
and `npm test`. The test server serves only the generated `out` directory on
127.0.0.1:4173. No real contact messages or analytics events are sent by tests.
On Windows use `npm.cmd` if PowerShell blocks npm.ps1. Optionally set
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an installed Chrome executable.

`TEST_BASE_URL=https://omarrez2.github.io` runs the same browser suite against
the deployed site. Generated reports/screenshots live in ignored
`playwright-report` and `test-results`; CI uploads them as an artifact.
See [the audit report](docs/audit/AUDIT_REPORT.md) for repair status and
[the baseline audit](docs/audit/AUDIT_BASELINE.md) for the original investigation.
[Audit evidence](docs/audit/audit-evidence/) retains baseline and release evidence.
