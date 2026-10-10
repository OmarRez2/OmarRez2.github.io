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
| F5 P2 | Home prioritizes three below-fold thumbnails; shared visibility animations delay content. Historical mobile LCP median 4.776s. | Removed thumbnail priority and shared reveal/counter hydration work; hero preload retained. Post-release lab measurement pending; no promised score. |
| F6 P3 | Projects H1 skips to H3, active navigation lacks aria-current, floating contact outside landmark. | Section H2, aria-current on desktop/mobile, named contact aside. |
| F7 P3 | No test/typecheck script; deploy gates only build. | Fixed: typecheck/test scripts and lint/types/Playwright gates before artifact publication. Local suite passed; GitHub execution pending. |
| R1 P2 | Historical dependency audit reported advisories, including Next.js; exploitability of server advisories differs for static Pages. | Compatible patches applied. Runtime audit 0; 9 development-tooling advisory entries remain without compatible upstream fix (see below). |
| R2 P2 | Analytics loads with no visible privacy information. Account retention/consent settings unknown. | Added privacy disclosure, default-off consent, revoke control. Browser tests verify script absent/allowed/removed. Account settings/legal assessment still require owner input. |
| R3 P2 | Cardiovascular notebook URL uses `ahmadbarkat`, not owner's `omarrezk`. Contribution not established. | Preserve user-supplied link but label exact external account and reference; no authorship claim added. Owner may supply contribution evidence. |

## Phase log

Phase 1: functionality, accessibility and static visibility. `npm.cmd run lint`, `npx.cmd tsc --noEmit`, and `git diff --check` passed on 2026-10-09. Reviewed the eleven-file source diff. Browser/build verification follows in the regression phase.

Checkpoint: `d149fad`.

Phase 2 (2026-10-10): upgraded Next/eslint-config-next to 16.4.0, shadcn to 4.21.4 and compatible transitive security patches; shadcn is a development dependency (its CSS import is retained). No forced major downgrade. Removed page-wide reveal/counter hydration work, retained interactive motion. Added privacy page and opt-in analytics controls with revocation; added Playwright/axe regression coverage and lint/type/browser gates before deployment. The contact form cannot fall through to a native GET submission before hydration. No portfolio numerical claims were changed.

Verified so far: final static build (16 generated outputs), lint, standalone types, eight browser tests covering 11 routes at 390/768/1440, no-JS, modal Escape/focus, filters, theme persistence, clipboard-denied draft recovery, 404, and consent transitions. Zero axe WCAG violations in the tested default palettes/routes; automated checks do not replace screen-reader or manual gradient checks. A final extended suite including CV/light-mode checks follows before push.

Security: `npm audit --omit=dev` now reports **0 vulnerabilities**. Full audit reports **9 high package entries**, all propagated from the unfixed `braces` stack-exhaustion advisory through development glob/lint/shadcn tooling. No public runtime endpoint accepts glob patterns. Upstream currently supplies no compatible fix; forcing npm's suggested framework/tooling downgrade is not safe. Avoid running build/CLI tools against untrusted patterns; revisit when a patched braces/toolchain release is available. No claim of complete security certification.

Performance baseline repeated before release: public cold mobile LCP 7.296/6.904/5.088s, median 6.904s, CLS 0, 776,940 decoded script bytes. See `audit-evidence/performance-before-release.json`. Timing varies with local contention/network; compare post-release under the same throttle as directional lab evidence, not field Core Web Vitals or an isolated causal experiment.

## Skills and access

Computer Use skill read for rendered browser verification. Native UI runtime had failed in earlier work; browser testing will use available isolated automation. Other catalog skills do not apply to this existing Next.js/GitHub Pages repair. Ordinary shell sandbox startup fails; escalated shell is functional. No credentials are printed or requested.

## Unresolved owner input

- Original report recovered; no remaining missing-report blocker.
- Evidence of contribution to the external Cardiovascular notebook, if it is to be presented as personal work.
- Analytics account retention/data-sharing settings and applicable privacy obligations cannot be established from this repository.
- Career duration and ongoing role details are preserved, not rewritten without evidence.
