# Portfolio fix and release report

## Scope and provenance — 2026-10-09

The original report was absent from this checkout at the start. On 2026-10-10 it was recovered from the linked worktree `C:\Users\LOQ\.codex\worktrees\3087\Omar Portfolio`, read completely and reconciled with every finding below. Its exact text is preserved in [AUDIT_BASELINE.md](AUDIT_BASELINE.md), with all 43 baseline evidence files in `audit-evidence/2026-10-08`. That baseline contains original reproduction steps, source line references, expected/observed behavior and impact. This report records repairs and new verification; historical measurements are explicitly separated.

Baseline: clean `main`, commit `b2317ed`, upstream `origin/main`, remote `https://github.com/OmarRez2/OmarRez2.github.io.git`. Existing GitHub Pages Actions workflow retained. Installed Next.js 16.3.3; root AGENTS and installed static-export, server/client-component and image guides read before editing.

## Findings and repair status

| ID / priority | Evidence, trigger and impact | Repair / validation |
|---|---|---|
| F1 P2 | `page-transition.tsx`, `reveal.tsx`, `projects-grid.tsx`: SSR opacity zero hides content with JS off; counter starts at zero. Expected readable static content. | Fixed: static wrappers/counter, visible cards and no-JS navigation. All 11 routes passed no-JS checks. |
| F2 P2 | `whatsapp-button.tsx`: white small text on #25D366 gives about 1.98:1 contrast. | Fixed: #15803d with white, darker hover; default desktop/mobile and light-mode axe checks pass. |
| F3 P2 | `project-image.tsx`: fit-to-width modal does not expose readable full-resolution dashboards on phones. | Fixed: original-image links inside/outside modal; asset HTTP 200, Escape and restored trigger focus verified. Native image zoom uses browser controls. |
| F4 P2 | `contact-form.tsx`: Send message only launches mailto, explanation appears afterwards; React action may reset fields. | Upfront explanation, Open email app CTA, ordinary submit handler preserving values, copy/manual draft fallback. No delivery claim. |
| F5 P2 | Home prioritizes three below-fold thumbnails; shared visibility animations delay content. Historical mobile LCP median 4.776s. | Fixed measured bottlenecks: thumbnail priority and shared reveal/counter hydration removed, hero preload retained. New live median LCP 1.692s, CLS 0; lab evidence below. |
| F6 P3 | Projects H1 skips to H3, active navigation lacks aria-current, floating contact outside landmark. | Section H2, aria-current on desktop/mobile, named contact aside. |
| F7 P3 | No test/typecheck script; deploy gates only build. | Fixed: typecheck/test scripts and lint/types/Playwright gates before artifact publication. Local, GitHub Linux/Node 22 and public-site suites passed. |
| R1 P2 | Historical dependency audit reported advisories, including Next.js; exploitability of server advisories differs for static Pages. | Compatible patches applied. Runtime audit 0; 9 development-tooling advisory entries remain without compatible upstream fix (see below). |
| R2 P2 | Analytics loads with no visible privacy information. Account retention/consent settings unknown. | Added privacy disclosure, default-off consent, revoke control. Browser tests verify script absent/allowed/removed. Account settings/legal assessment still require owner input. |
| R3 P2 | Cardiovascular notebook URL uses `ahmadbarkat`, not owner's `omarrezk`. Contribution not established. | Preserve user-supplied link but label exact external account and reference; no authorship claim added. Owner may supply contribution evidence. |

## Phase log

Phase 1: functionality, accessibility and static visibility. `npm.cmd run lint`, `npx.cmd tsc --noEmit`, and `git diff --check` passed on 2026-10-09. Reviewed the eleven-file source diff. Browser/build verification follows in the regression phase.

Checkpoint: `d149fad`.

Phase 2 (2026-10-10): upgraded Next/eslint-config-next to 16.4.0, shadcn to 4.21.4 and compatible transitive security patches; shadcn is a development dependency (its CSS import is retained). No forced major downgrade. Removed page-wide reveal/counter hydration work, retained interactive motion. Added privacy page and opt-in analytics controls with revocation; added Playwright/axe regression coverage and lint/type/browser gates before deployment. The contact form cannot fall through to a native GET submission before hydration. No portfolio numerical claims were changed.

Verified: final static build (16 generated outputs), lint, standalone types, **nine browser tests** covering 11 routes at 390/768/1440, no-JS, modal Escape/focus restoration, filters, theme persistence, CV PDF integrity, light mode, clipboard-denied draft recovery, 404, and consent transitions. All passed locally (52.7s) and against the public site (1.1m). Zero axe WCAG violations in the tested default palettes/routes; automated checks do not replace screen-reader or manual gradient checks. A supplemental live axe run also returned zero `heading-order`/`region` violations and identified Projects as the current navigation item.

Security: `npm audit --omit=dev` now reports **0 vulnerabilities**. Full audit reports **9 high package entries**, all propagated from the unfixed `braces` stack-exhaustion advisory through development glob/lint/shadcn tooling. No public runtime endpoint accepts glob patterns. Upstream currently supplies no compatible fix; forcing npm's suggested framework/tooling downgrade is not safe. Avoid running build/CLI tools against untrusted patterns; revisit when a patched braces/toolchain release is available. No claim of complete security certification.

Performance baseline repeated before release: public cold mobile LCP 7.296/6.904/5.088s, median 6.904s, CLS 0, 776,940 decoded script bytes. See `audit-evidence/performance-before-release.json`. Timing varies with local contention/network; compare post-release under the same throttle as directional lab evidence, not field Core Web Vitals or an isolated causal experiment.

Checkpoint: `199c6ce`.

## Phase 3 — release verification (2026-10-10)

- Both checkpoints pushed successfully using the existing `origin/main` upstream. Remote SHA verified as `199c6ce767bcd122bd2533cc271c024d204386d7`.
- [GitHub Actions run 38041069636](https://github.com/OmarRez2/OmarRez2.github.io/actions/runs/38041069636) completed successfully: clean `npm ci`, Node 22 build, lint/types, Chromium regression tests, artifact upload and Pages deployment. Hosting provider and account configuration unchanged.
- Live website: **https://omarrez2.github.io/**. `/privacy/` returned 200 with new content; the complete nine-test suite was then run against the public site and passed. No real contact message or analytics event was sent; Google endpoints were blocked in browser tests.
- Post-release cold mobile runs: **1.692 / 1.916 / 1.576 seconds LCP**, median **1.692 seconds**, CLS **0** each. Decoded scripts **756,172 bytes**; resource transfers **463,269 bytes** (excluding HTML navigation). Same 390x844, 4x CPU, 150ms latency and 200,000 B/s download configuration as the new baseline. See `audit-evidence/performance-after-release.json`. No field CWV/INP or Lighthouse score claimed; before/after conditions may differ in background machine/network load.
- Screenshots inspected and saved under `audit-evidence/release/`, including live mobile Home and desktop Projects. Lazy images were scrolled into view and decoded before full-page capture.
- Final documentation checkpoint records these results only; no additional application changes after the successfully deployed/tested code checkpoint.

## Coverage table

| Area | Outcome | Limits |
|---|---|---|
| Core pages, all five case studies, new privacy page | Pass: 11 routes, HTTP 200, visible H1, description, local images | External social account ownership not authenticated |
| Responsive geometry | Pass: 390/768/1440 on all routes, no horizontal document overflow | Chromium emulation, not physical iOS/Android |
| No JavaScript | Pass: all routes visible; mobile navigation and five project cards present; submit disabled with direct email fallback | Appearance/filter/dialog controls need JavaScript |
| Navigation, filters, modal closure/focus, theme persistence | Pass: automated user journeys locally, CI and live | Not every palette/custom-color permutation |
| Contact | Pass: accurate CTA, fields retained, selectable draft on clipboard rejection | Actual email-handler delivery intentionally not attempted |
| CV and images | Pass: PDF signature and HTTP asset checks | OS download/save UI not exercised |
| Accessibility | Pass tested WCAG axe rules and live heading/landmark checks; keyboard Tab/Escape/focus tested | No real screen reader; gradient/custom-color combinations not exhaustively checked |
| Reduced motion | Pass: preference emulated, no smooth scroll, content visible | Not a frame-by-frame audit of every animation |
| Performance | Improved measured live lab LCP; CLS 0 | Lab only; see samples/conditions above |
| Framework/build/deploy | Pass Next 16.4.0 export, lint/types; clean Node 22 CI install/build/test/deploy | No server deployment supported by this static setup |
| Security | Runtime audit 0; static hosting retained | 9 dev advisory entries remain; not a penetration test |
| Privacy | Default-off/allow/revoke script lifecycle and disclosure pass | Account retention, legal policy and real GA payloads not verified |
| Content | External notebook explicitly marked with account name; existing factual claims preserved | Owner's actual notebook contribution and career metrics not independently authenticated |
| SEO/sharing | Existing metadata preserved; privacy metadata and sitemap entry added | Search indexing/social-preview caches not revalidated |
| Server authorization/database/runtime fetching | Not applicable: no implemented server endpoints or database | Content updates require rebuild |

## Follow-up priorities

1. **Urgent monitoring:** update development glob tooling when a compatible `braces` security patch is available; do not accept untrusted CLI patterns. Current advisory: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm. Do not force the suggested framework downgrade.
2. **Owner decisions:** confirm GA retention/data-sharing settings and appropriate privacy policy; provide notebook contribution evidence only if it should be promoted from external reference to personal work.
3. **Next improvements:** inspect with a screen reader/physical mobile device, gather real-user performance data if available, and validate custom theme colors/gradient contrast manually.
4. **Optional polish:** baseline sitemap/Twitter consistency, leaner project-card data props, cleaner dashboard exports and copy consolidation remain nonblocking suggestions, not unresolved confirmed defects.

## Incidental files and check failures

Builds generated ignored `.next`, `out` and TypeScript incremental cache; browser checks generated ignored `test-results` and `playwright-report`. Dependency installs updated only the intended manifest/lockfile and ignored node_modules. Three local screenshots, two live screenshots and before/after performance JSON are intentionally tracked as evidence. The original audit archive is preserved unchanged.

An initial privacy-copy lint failure (unescaped apostrophes) was corrected and lint rerun successfully. One supplemental standalone axe invocation required an explicit browser context; correcting the diagnostic harness produced the successful semantic check above. Neither is an unresolved application failure. The prior usage-limit interruption executed no package-install command; the resumed install completed normally. No user-owned edits were overwritten.

## Skills and access

Computer Use skill read for rendered browser verification. Native UI runtime had failed in earlier work; browser testing will use available isolated automation. Other catalog skills do not apply to this existing Next.js/GitHub Pages repair. Ordinary shell sandbox startup fails; escalated shell is functional. No credentials are printed or requested.

## Unresolved owner input

- Original report recovered; no remaining missing-report blocker.
- Evidence of contribution to the external Cardiovascular notebook, if it is to be presented as personal work.
- Analytics account retention/data-sharing settings and applicable privacy obligations cannot be established from this repository.
- Career duration and ongoing role details are preserved, not rewritten without evidence.
