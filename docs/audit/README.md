# Audit archive

- [Repair and release report](AUDIT_REPORT.md): findings, fixes, checks and remaining limitations.
- [Original audit](AUDIT_BASELINE.md): historical baseline, preserved unchanged.
- [Evidence](audit-evidence/): screenshots, logs and performance samples.
  - `2026-10-08/`: original investigation and its historical reproduction scripts.
  - `release/`: reviewed local and live screenshots.
  - `performance-*.json`: retained before/after measurements.

These materials moved here together, so report-to-report and report-to-evidence
links retain their relative paths. Source paths such as `src/...` in the reports
refer to the repository root; old absolute workspace paths are historical context,
not current launch instructions. Reports describe the dates recorded in them,
not the current deployment status after future changes.

## Current tooling versus archived scripts

Run maintained commands from the repository root. Current browser tests live in
[`tests/`](../../../tests/) and maintained helpers in [`scripts/`](../../../scripts/).
The performance helper writes new evidence into this archive, resolved relative
to its script file, so it does not recreate a root-level `audit-evidence` folder.

The `.mjs` files under `audit-evidence/2026-10-08/` are provenance, not current
project scripts. They depend on the original isolated `site/out`, `evidence/`,
an external `axe.min.js` and/or a running debugging browser. Those dependencies
were not bundled in the original archive. They are deliberately preserved, not
silently rewritten, deleted or advertised as runnable from this directory.
