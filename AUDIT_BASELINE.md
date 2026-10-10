# Portfolio audit — 8 October 2026

## Findings, ordered by priority

No confirmed P0 critical or P1 high-impact defect was established in the tested static deployment. This is **not** a security certification or a claim that untested behavior is correct. The site builds successfully and its main journeys work; the most useful repairs concern resilient rendering, accessibility, mobile dashboard inspection, contact expectations, and loading performance.

| ID | Priority | Classification | Finding |
| --- | --- | --- | --- |
| F1 | P2 medium | Confirmed defect | Main content remains invisible without JavaScript |
| F2 | P2 medium | Confirmed accessibility defect | WhatsApp text contrast is only 1.98:1 |
| F3 | P2 medium | Confirmed mobile usability issue | Dashboard “Expand” does not provide a readable mobile view |
| F4 | P2 medium | Confirmed UX mismatch; delivery untested | “Send message” silently depends on a configured email app |
| F5 | P2 medium | Measured lab issue; causes partly inferred | Slow cold mobile content rendering under throttling |
| R1 | P2 medium | Confirmed advisory matches; exploitation not established | Dependency advisories require triage |
| R2 | P2 medium | Privacy readiness risk | Analytics enabled without visible privacy explanation or consent controls |
| R3 | P2 medium | Content attribution uncertainty | A featured notebook belongs to a different Kaggle account |
| F6 | P3 low | Confirmed semantic issues | Projects heading hierarchy and shared navigation semantics need improvement |
| F7 | P3 low | Confirmed verification gap | Deployment has no lint/test regression gate |

### F1 — P2: Main content remains invisible without JavaScript

- **Affected:** All routes using `src/app/layout.tsx:95–96`; `src/components/page-transition.tsx:11–15`, `src/components/reveal.tsx:17–22`.
- **Reproduce:** Disable JavaScript, load `/`. The DOM contains the H1 and page content, but `getComputedStyle(document.querySelector('main > div')).opacity` is `0`. The screenshot shows a nearly empty page below the navbar. A failed/blocked hydration bundle presents the same architectural risk, although deliberate partial-chunk failure was not separately tested.
- **Expected vs observed:** Static HTML should expose useful content before animation/hydration. Instead, a page-wide opacity gate and nested reveals depend on JavaScript to become visible.
- **Impact:** Visitors with disabled/failed JavaScript cannot read work or reach the main-page CTAs; slow script delivery also delays meaningful content.
- **Evidence/status:** Browser-confirmed. [No-JavaScript screenshot](audit-evidence/2026-10-08/no-javascript-home.png); `interactions.json → noJs`.
- **Recommended fix:** Render content visible by default. Enhance animation after mount without hiding the entire server-rendered page. Provide a real no-script fallback for nested reveals and static counter values; changing only the outer wrapper is insufficient.
- **Validate:** Disable JS and separately block application scripts on every core route; meaningful headings, project links and CV link must remain visible. Repeat with reduced motion and slow network.

### F2 — P2: WhatsApp label fails text contrast

- **Affected:** Global floating contact button, `src/components/whatsapp-button.tsx:13–16`.
- **Reproduce:** At desktop/tablet widths where the text is visible, inspect the white 14px label on `#25D366`.
- **Expected vs observed:** Normal-size text should meet 4.5:1 contrast; axe measured **1.98:1**, in both light and dark themes. Mobile hides the label, so the initial mobile-only checks did not detect this text failure.
- **Impact:** Reduced legibility for low-vision users on an important contact CTA.
- **Evidence/status:** Confirmed by axe-core 4.10.3 and rendered inspection; `extra-checks.json → axe`; [desktop screenshot](audit-evidence/2026-10-08/live-home-desktop.png).
- **Recommended fix:** Use a sufficiently dark foreground on the current green, or a darker green with white text. Check hover and keyboard-focus states too.
- **Validate:** Rerun contrast checks at widths above and below `sm`, in both modes. Check the icon separately; do not assume a text fix automatically validates all non-text contrast.

### F3 — P2: Dashboard “Expand” remains difficult to read on phones

- **Affected:** Project detail image viewer, `src/components/project-image.tsx:13–19`.
- **Reproduce:** At 390×844, open FinSight and press Expand. The dialog is 85dvh tall, but the landscape dashboard is still fitted into an approximately 333px-wide image area, with large empty areas above/below it.
- **Expected vs observed:** A reader should be able to inspect chart labels and values. The viewer provides another fit-to-width view, with no zoom/pan or full-image link. The image loads correctly and Escape closes the dialog; this is not a broken image or modal failure.
- **Impact:** Mobile recruiters cannot readily inspect the most important visual evidence of the work.
- **Evidence/status:** Confirmed visual usability finding. [Mobile image viewer](audit-evidence/2026-10-08/mobile-project-dialog.png); `interactions.json → projectDialog`.
- **Recommended fix:** Add an accessible “Open full-resolution image” link, as the certificate viewer already does. Optionally offer zoom/pan with keyboard controls and a clear reset. Avoid a tall empty modal where it adds no inspection value.
- **Validate:** Read representative dashboard labels on 320/390px screens, zoom without trapping scrolling, close by keyboard, and verify focus returns to Expand. Preserve desktop fitting.

### F4 — P2: Contact form does not explain its email-app dependency upfront

- **Affected:** `/contact/`, `src/components/contact-form.tsx:12–19,23,42–45`.
- **Reproduce:** Inspect the form and its submit handler. The CTA says “Send message”, but the only action is assigning a `mailto:` URL. The email-app explanation appears only after activation.
- **Expected vs observed:** The interface should describe the action accurately before the visitor composes a message. It opens an external composer rather than delivering a message. There is no acknowledgement from a delivery service or fallback for an unconfigured mail handler.
- **Impact:** A visitor without an associated email client may complete the form and still have no clear way to send it. The post-action wording does not falsely say that delivery succeeded, which is good.
- **Evidence/status:** Source-confirmed UX mismatch; required-field blocking was browser-tested. No valid message was submitted and real mail-app delivery was intentionally not tested. Form reset after a valid React action is an additional behavior to verify, not an asserted result.
- **Recommended fix:** If retaining mailto, rename the CTA to “Open email app”, explain the dependency before the form, preserve entered text, and provide a copy-message fallback. A real form service is an optional product decision, not a requirement inferred by this audit.
- **Validate:** Test invalid fields and valid synthetic values with the mailto navigation intercepted. Test missing mail handler without sending a real message. Announce status accessibly and confirm text is recoverable.

### F5 — P2: Cold mobile content rendering is slow in the measured lab setup

- **Affected:** Home/shared client UI; `src/app/layout.tsx:91–99`, `src/app/page.tsx:79–85,129–132`, `src/components/project-card.tsx:7–12`, animation wrappers in F1.
- **Reproduce:** Three cold loads of the public homepage in headless Chrome, 390×844 mobile emulation, CPU slowdown 4×, 150ms artificial latency, 200,000 B/s download and 93,750 B/s upload. GA requests blocked to avoid polluting analytics; each observation lasted 14 seconds.
- **Expected vs observed:** Primary content should appear promptly under constrained conditions. Public-site LCP observations were **5.944s, 4.716s, 4.776s** (median **4.776s**). Observed CLS was **0** in all three runs. Approximately **777 KB decoded script resources** were requested, and approximately **656 KB total resource transfer** was recorded per run, excluding the HTML navigation resource. These are lab measurements, not field Core Web Vitals, Lighthouse scores, or an INP result.
- **Impact:** Slower first impressions for visitors on constrained devices/connections.
- **Evidence/status:** Measured outcome in `performance-live-lab.json`. Exact attribution to a particular library is not proven: no CPU coverage/profile was captured. Source confirms all three below-fold featured thumbnails are marked `priority`, and content visibility depends on JS. Those are reasonable first optimization targets, not a quantified causal breakdown.
- **Recommended fix:** Address F1; stop preloading below-fold cards; review shared animation/UI code and defer nonessential customizer work where practical. Supply responsive pre-generated image variants if worthwhile on this static host. Do not enable the default server image optimizer on GitHub Pages.
- **Version-specific note:** Installed Next.js docs (`01-app/03-api-reference/02-components/image.md:291–293`) deprecate `priority` in favor of `preload`. Choose eager/fetch-priority/preload intentionally for the actual above-fold image; do not mechanically preload everything.
- **Validate:** Repeat the same three-run public-site experiment and compare medians and network bytes. Check real-user metrics separately if access becomes available; ensure deferred images remain discoverable and layout-stable.

### R1 — P2: Dependency advisories need remediation planning, not an unqualified “critical website vulnerability” label

- **Affected:** `package.json:16,20,30`, locked dependency tree in `package-lock.json`; development/build tooling and any future server deployment.
- **Trigger:** `npm audit --json` returned exit 1: **19 affected package entries: 2 critical, 14 high, 3 moderate**. These are package-level audit entries, not 19 independently exploitable website bugs.
- **Expected vs observed:** Dependencies should be maintained with advisory applicability reviewed. Installed Next **16.3.3** is in reported affected ranges; `proxy-addr@2.0.7` is another critical advisory match.
- **Reachability:** Public deployment is static; no `next/og` generation, server API, authorization or proxy-trust endpoint was found. `proxy-addr` is under `shadcn → @modelcontextprotocol/sdk → express`; it is not an implemented public web endpoint. The Next ImageResponse advisory requires attacker-controlled SVG values in Node ImageResponse, absent here. [Next advisory](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j), [proxy-addr advisory](https://github.com/advisories/GHSA-jqcg-44mw-7w3h).
- **Impact/status:** Confirmed installed advisory matches; public exploitability **not established**. Development/tooling and future hosting changes still warrant attention. No exploit attempts were made.
- **Recommended fix:** Review all entries in `npm-audit.json`, upgrade compatible packages in a separately authorized change, and assess CLI/tooling dependencies separately from shipped code. Do not use `npm audit fix --force` blindly: suggested major-version changes/downgrades can break the framework.
- **Validate:** Fresh lockfile install, repeat audit, build on Node 22, lint, types, and browser regressions. Keep dev servers private. Reassess reachability before adopting server hosting.

### R2 — P2: Analytics privacy behavior is not explained to visitors

- **Affected:** `src/app/layout.tsx:101–115`, `.github/workflows/deploy-pages.yml:38–42`; shared footer has no privacy link.
- **Trigger:** Deployment supplies a valid GA measurement ID; the root layout loads and configures GA after hydration without an in-app preference gate.
- **Expected vs observed:** Visitors should have clear information about measurement and any controls required for the intended audience. No privacy explanation/page or consent-control implementation was found.
- **Impact/status:** Confirmed configuration and missing visible disclosure; **legal applicability, account-side settings and actual collection were not verified**. This is not a legal-compliance conclusion. Analytics requests were blocked in automated browsing to avoid changing external data.
- **Recommended fix:** Document what is collected, why, retention/contact information, and determine appropriate consent behavior for the audience. Add a gate if required by the chosen policy. Never send contact-form text or email addresses as analytics events.
- **Validate:** Inspect requests/cookies for first visit, decline/accept and revoked consent, using a test analytics property. Confirm page-view behavior on client navigation and no personal form values in events.

### R3 — P2: Featured Kaggle notebook needs explicit attribution

- **Affected:** `/projects/`, `src/app/projects/page.tsx:26–36,97–114`.
- **Reproduce:** Open “Cardiovascular Disease Analysis”. Its working destination is `kaggle.com/code/ahmadbarkat/cardiovascular-disease`, unlike the owner's `omarrezk` account. The listing does not describe authorship, collaboration, a fork or a learning reference.
- **Expected vs observed:** A portfolio should make the owner's contribution clear. The current context can imply ownership without stating it.
- **Impact/status:** Confirmed destination/account mismatch and missing attribution; **actual ownership/contribution unresolved**. This is not an allegation of plagiarism.
- **Recommended fix:** Ask the owner to identify their contribution and use the corresponding notebook/fork, or clearly label and credit a reference/collaboration. Do not invent a replacement claim.
- **Validate:** Confirm the public notebook owner and agreed attribution, then check the final card and destination together.

### F6 — P3: Improve heading and navigation semantics

- **Affected:** `/projects/` list in `src/app/projects/page.tsx:64–66`; shared card `src/components/project-card.tsx:16`; nav `src/components/navbar.tsx:62–76,108–120`; floating CTA placement `src/app/layout.tsx:98–99`.
- **Reproduce:** Inspect headings on Projects: H1 jumps to card H3 without an H2 grouping the collection. axe flags `heading-order`. The active navigation item is styled visually but has no `aria-current`. axe also flags the floating WhatsApp link outside landmarks (`region`).
- **Expected vs observed:** Programmatic structure should communicate the same grouping/current page as the visual UI. These semantics are missing, although links have accessible names and are usable.
- **Impact/status:** Confirmed source/DOM and automated best-practice findings; not a claim that every item is independently a WCAG failure. Screen-reader speech was not manually tested.
- **Recommended fix:** Add a collection H2 or use a context-appropriate card heading; keep H3 on Home where a section H2 exists. Add `aria-current="page"` or an appropriate section-current indication. Place the floating contact control in a suitable named landmark.
- **Validate:** Inspect heading outline, active navigation on detail routes, and axe results; test with an actual screen reader.

### F7 — P3: Build success is not backed by regression gates

- **Affected:** `package.json:5–9`, `.github/workflows/deploy-pages.yml:35–58`.
- **Trigger:** Inspect scripts and CI. Only dev/build/start/lint scripts exist. No tracked test/spec suite was found. CI installs and builds but does not run lint or browser interactions.
- **Expected vs observed:** Important existing interactions should have repeatable checks before publication. Build/type errors are caught, but visual/behavioral regressions can ship despite a green build.
- **Impact/status:** Confirmed verification gap, not a current runtime failure. Lint and standalone TypeScript pass when executed manually.
- **Recommended fix:** Add lint and focused browser smoke tests for navigation, filtering, modal close/focus, theme persistence, CV asset and 404. Include a no-JS check and automated accessibility baseline. Keep third-party contact actions intercepted.
- **Validate:** Run the pipeline on a branch with an intentional test-only failing assertion, confirm it blocks publication, then remove that assertion before merge.

## Coverage and outcomes

| Area | Status | Evidence / boundary |
| --- | --- | --- |
| Five core pages and five project pages | Passed tested checks | All loaded locally and returned HTTP 200 publicly; one H1 per route |
| Missing route | Passed with minor metadata caveat | Public unknown URL returned 404; branded local 404 rendered. Output contains `noindex` plus inherited `index, follow`; remove conflicting directive as optional cleanup, not claimed indexing failure |
| Mobile navigation | Passed | Opens, focuses its first link, navigating to Projects closes it |
| Filters | Passed | Python gives 3 cards; All/SQL/Power BI give 5, consistent with current data |
| Card → detail, next-project links | Partially verified | Card → FinSight activated; next-project destinations mapped to existing valid routes, not every next button clicked |
| Project/certificate dialogs | Passed function; mobile usability failed | Project Escape works; certificate Tab cycles within dialog and Escape returns focus to trigger. See F3 |
| Theme | Passed sampled checks | Light/dark toggle, Ocean persistence across reload; malformed stored JSON guarded in source. All palette/custom-color combinations not exhaustively tested |
| Contact | Partial | Labels/required fields and invalid submission focus pass; copy succeeds with browser permission; mailto/tel/WhatsApp targets inspected, not sent/called |
| CV and certificate assets | Passed transport checks | Public CV is HTTP 200, PDF content type, `%PDF-` signature, 411,270 bytes. Certificate links/download attributes checked. OS save UI not exercised |
| Images | Passed loading checks | Referenced image URLs fetched successfully. Closed dialogs have deferred images; initial `brokenImages` counts for FinSight/Sales include these hidden unloaded duplicates, not missing assets |
| Responsive | Passed sampled geometry, F3 exception | All 11 routes at 390/768/1440px; Home/Projects/Contact additionally 320/360/1024px. No document overflow or sampled text/control clipping. Chromium emulation, not physical iOS/Android |
| Visual quality | Generally good; improvements identified | Inspected screenshots of desktop/mobile/tablet, project cards, certificate dialog, light mode. Consistent containers, typography and spacing; landscape dashboards intentionally contained rather than cropped |
| Accessibility | Partial / failed | WhatsApp contrast and semantics findings; visible skip-link focus, modal focus loop, labels and alt attributes checked. axe had unresolved contrast checks on layered/gradient backgrounds |
| Reduced motion | Partial pass | Media preference detected, smooth scrolling disabled, main visible; no claim that every Framer Motion layout animation is suppressed |
| Next.js / types / hydration | Passed sampled checks | Installed-version docs consulted; Promise params awaited, static params generated, server pages retain client islands; no app runtime exceptions captured during route scan |
| Performance | Measured concern | Three public cold mobile lab runs, median LCP 4.776s. CLS 0 in those runs. No INP/CrUX/Lighthouse score claimed |
| SEO/sharing | Mostly passed / partial | Unique page titles/descriptions, canonical URLs, OG/Twitter metadata, sitemap/robots and escaped Person/CreativeWork JSON-LD. Social-platform cache/rendering and search indexing not verified |
| Security | Partial | Targeted tracked-source secret scan found no matches; two static JSON-LD injections escape `<`; GA ID validated; no unsafe user-data HTML path found. Dependency warnings remain |
| Authorization, database, server forms | Not applicable | No implemented account, protected endpoint, database or server-side contact handler in this static portfolio |
| Data fetching/cache freshness | Not applicable to runtime | Portfolio content is bundled local data; updates require rebuild. No runtime data-fetch loading/error state to exercise |
| Empty results | Not applicable to current content; future risk | Every offered filter has results. No explicit empty-state UI if data later changes |
| Custom error recovery | Not implemented / not fault-injected | No `error.tsx`/`global-error.tsx`; absence alone is not an established defect on these static routes |
| Build/deployment | Passed local export and public smoke checks | Next build on Node 24 and Node 22; 15 generated outputs. Existing GitHub Actions workflow was not rerun or changed |

## Map of pages, features and integrations

- `/`: hero/portrait, CV download, three featured cards, counters, skills, experience and contact CTAs.
- `/about/`: profile, skills, five experience entries, education/languages/current learning.
- `/projects/`: five BI case studies, technology filters, professional profiles and two Kaggle notebooks.
- `/projects/{slug}/`: `finsight-finance-analysis`, `sales-intelligence-hub`, `uber-trips-analytics`, `bank-loan-analysis`, `pizza-sales-performance`; stats, decision/context/approach/outcomes/recommendations, image viewers, repository and next-case links.
- `/certificates/`: eight completed image-backed credentials/recognitions and one in-progress track; modal, full image, download.
- `/contact/`: email/phone/location, social links, clipboard and client-only mailto form.
- Shared: fixed navbar/mobile sheet, six palette presets with fine-tuning/localStorage, light/dark toggle, footer, WhatsApp CTA, motion wrappers; branded 404, robots and sitemap.
- Integrations: GitHub Pages static hosting, GA configured at build time, external GitHub/Kaggle/social URLs, OS mail/tel handlers. No backend/API/authentication was found.

## Checks executed and actual outcomes

### Baseline and preservation

- Project: `E:\Portfolio\Omar Portfolio`.
- HEAD: `b2317edf58918ebecab4aa0f6d914c7a8d43bc8b` — `Update CV with Al Farouk role and replace Pizza with FinSight`.
- Origin: `https://github.com/OmarRez2/OmarRez2.github.io.git`.
- Initial and pre-report `git status --porcelain=v1` were empty; `git diff --exit-code` passed. No Git identity/credential changes, commits, pushes or deployments were made.
- Read the applicable project `AGENTS.md`; no parent `E:\AGENTS.md` or `E:\Portfolio\AGENTS.md` existed in the checks. Nested search excluding dependencies/build outputs found no additional project instructions.
- Installed `next/package.json`: **16.3.3**; React/React DOM **19.2.8**. Did not infer framework behavior from a different Next version.
- Build/test copy: `E:\BI Projects\Sales\portfolio-audit-20261008\site`. The original `.next`, `out`, sources and dependency tree were not overwritten.

### Commands and browser checks

| Check | Outcome |
| --- | --- |
| `npm run lint` (existing `eslint` script) | Exit 0; no warnings/errors reported |
| `npx --no-install tsc --noEmit --incremental false` | Exit 0 |
| `GITHUB_PAGES=true NEXT_PUBLIC_GA_MEASUREMENT_ID=… npm run build` | Exit 0, Next 16.3.3 Turbopack, 15 generated static outputs; Node 24.19.0 |
| Node 22.22.0 running `node_modules/next/dist/bin/next build` with same env | Exit 0; matches CI Node major |
| `npm audit --json` | Exit 1, 19 package entries; saved complete advisory output |
| `npm ls next react react-dom proxy-addr @modelcontextprotocol/sdk undici --all` | Confirmed dependency paths described in R1 |
| Targeted secret-pattern scan of tracked textual files | No matches for private-key markers, AWS access IDs, GitHub token patterns or Stripe live-key patterns. Not a complete Git-history/entropy scan |
| HTTP link/asset checks | Five project repos and both notebooks HTTP 200; public pages/robots/sitemap/CV succeed; missing URL 404. LinkedIn personal profile returned 999 (automation restriction), not classified broken |
| Chromium route scan | 33 route/width combinations plus 9 additional core-page width checks; evidence JSON and screenshots saved |
| axe-core 4.10.3 | 12 mobile theme/page scans plus 8 full-page desktop scans. Confirmed contrast/heading/landmark findings; incomplete contrast results retained |
| Keyboard/manual visual review | Actual browser key events for Tab/Escape; screenshot inspection. Not equivalent to screen-reader or physical touch-device verification |
| No-JS and reduced-motion tests | No-JS invisible-main defect confirmed; reduced-motion sampled behavior passed as scoped above |

The first isolated build used a node_modules junction and failed because Turbopack disallows symlinks outside its filesystem root. This was an **audit-harness failure**, not an application defect. Replacing only that audit junction with a physical dependency copy allowed the exact default build to pass. The initial interaction harness also assumed slashless links; rendered Next links had trailing slashes. The harness selector was corrected, with no application edit.

Initial certificate Escape observation occurred before its exit animation completed; a repeat after 350ms confirmed closure and restored focus. Clipboard success required browser permission/user-gesture context; the subsequent controlled check reported “Email copied”. Neither initial observation is reported as an app defect.

### Performance interpretation

`performance-live-lab.json` contains the public-site measurements in F5. A separate local uncompressed-server run produced LCP 8.188/7.348/7.572s; **do not use those numbers as production performance**. Unthrottled local observations at 390px ranged approximately 0.4–0.864s across the core pages, with very small observed layout shifts. These different setups are not directly interchangeable.

The public image assets are already mostly WebP; the homepage portrait is about 96 KB. Global `images.unoptimized: true` is appropriate for the configured static host, although it means `sizes` alone does not produce responsive image variants. System fonts avoid a font-service round trip. Static ambient effects are not continuous canvas/particle loops. Large blurs and motion can still cost rendering time, but no GPU-specific performance fault was measured.

## Skills and installed documentation used

- **Computer Use**: read `SKILL.md`, `docs/guidance.md`, `docs/confirmations.md` and `docs/api.md`. Its contribution was the scoped browser/keyboard/visual-verification approach and avoiding real contact actions. Native `@oai/sky` and CUA startup failed with the sandbox helper error; actual browser verification used a separate headless Chrome profile via CDP instead, without accessing personal browser sessions.
- Reviewed the full available skill catalog. Data-analysis/reporting skills do not fit a code/site audit; Sites explicitly excludes existing external Next projects; document/PDF/presentation/image-generation skills would not help this Markdown/code/rendered-site audit. No unrelated skill was forced into the task.
- Read relevant installed Next.js documentation under `node_modules/next/dist/docs/`: static exports; server/client components; linking/navigation; error handling; image optimization and image API preload/priority guidance; metadata/OG images; architecture accessibility. Applied the installed guide's static-host limitations, Promise params, client boundaries, route announcements and image deprecation guidance.
- No application data fetching or runtime caching layer was found; no speculative cache revalidation changes were recommended.

## Remaining uncertainties and access limitations

- Browser plugins and ordinary sandbox shell startup failed. Approved elevated shell checks and isolated headless Chrome supplied the fallback; the project itself was readable.
- No physical mobile devices, Safari/Firefox, real screen reader, exhaustive 200–400% zoom matrix, arbitrary custom-color matrix, or full low-end-device profile was tested. Chromium viewport emulation is evidence for those tested layouts, not all devices.
- axe reports incomplete contrast checks on gradients/translucent surfaces. In particular, manually verify the green learning-track accents in light mode; no unsupported pass is claimed for them.
- No real contact email, call, WhatsApp message, analytics event submission, or external data mutation was intentionally performed. Analytics requests were blocked. GA dashboard access, consent obligations, real delivery and platform link-preview cache state remain unverified.
- Public page HTTP success does not prove account ownership. Kaggle attribution needs owner confirmation. Experience dates, learner counts, course hours and project numerical claims were checked for presentation/context, not independently authenticated or recalculated from source datasets. FinSight usefully discloses the separate Power BI/notebook cleaning policies; preserve that caveat.
- No clean `npm ci` network reinstall or GitHub workflow execution was performed; the build used a copied installed dependency tree and existing lockfile. Linux-specific deployment steps remain verified only by source/public smoke checks, not by a newly triggered action.
- No penetration testing, exhaustive secret scan of Git history, social preview validator, search-console audit or structured-data rich-result eligibility assessment was performed.
- App error injection, mail-handler failures and every possible fixed-element overlap were not exhaustively exercised. These are coverage limits, not invented failures.

## Prioritized repair plan

### Urgent / first repair batch

1. Make server-rendered content visible independently of JS (F1).
2. Correct WhatsApp foreground/background contrast (F2).
3. Triage dependency advisories and schedule a compatible update; keep the static deployment scope clear (R1).
4. Clarify mailto behavior and retain a copyable fallback (F4).

### Next improvements

1. Provide readable full-resolution mobile dashboard inspection (F3).
2. Reduce unnecessary initial work, especially below-fold preload and shared animation cost; repeat measured tests (F5).
3. Resolve Kaggle attribution and analytics privacy policy decisions (R2/R3).
4. Fix heading/current-page/landmark semantics and add CI/browser regression gates (F6/F7).

### Optional polish — not blocking defects

- Normalize sitemap entries to trailing-slash canonical URLs to avoid unnecessary redirects (`src/app/sitemap.ts:10–21`). Rendered canonical metadata itself already includes trailing slashes.
- Give About/Contact/Certificates explicit Twitter titles/descriptions; they currently inherit the generic root Twitter text despite page-specific OG metadata.
- Consider reducing hero height on mobile so the portrait/work appears sooner; the current first screen emphasizes the introduction and CTAs. This is a design choice, not overflow.
- Use clean dashboard-only exports where available; the bank-loan thumbnail includes desktop application chrome. Do not crop away useful report content.
- Replace duplicated contact/profile constants with one typed profile object; separate card-summary props from full case-study content if bundle analysis justifies it.
- Reconcile “3+ years” on Home with the looser “over two years” About wording after owner confirmation, and periodically confirm the DEPI in-progress state. Neither is proven false by this audit.
- Add empty-state/result-count feedback if filters or data become dynamic; avoid building unused states solely to add complexity.
- Remove the unused `distance` prop from the non-animated Parallax wrapper in a future cleanup, or rename the wrapper to reflect current behavior.

## Evidence and incidental files

Supporting files are in [`audit-evidence/2026-10-08/`](audit-evidence/2026-10-08/): browser scan, interaction and accessibility JSON; HTTP checks; dependency audit; build logs; performance samples; screenshots; audit-only reproduction scripts.

Incidental files were generated **outside the original application tree** in `E:\BI Projects\Sales\portfolio-audit-20261008`: copied dependencies/source, `.next`, `out`, Chrome profile, downloaded axe checker and audit scripts. The initial failed build also wrote a Next panic log in the Windows temp directory. Only this report and its supporting evidence are added to the target project. No app source/config/dependency files were changed and nothing was committed, pushed or deployed.
