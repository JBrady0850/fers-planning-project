# Changelog

All notable changes to this project are recorded here.

Rules in this repository were verified in September 2026. Dollar figures are 2026 program year values and change annually. See `docs/06-fers-rules-reference.md` for citations and for the list of items that could not be verified.

## [1.0.0] - 2026-09-14

First public release.

### Added

- `MASTER-PROMPT.md`, the project instructions engine: five phases, a fourteen block interview, ten named FERS traps, and a definition of done applied to every generated report.
- `docs/01-read-me-first.md`, orientation, time budget, and the five FERS failure modes the system exists to catch.
- `docs/02-setup-instructions.md`, step by step setup written for a federal employee who has never used an AI tool.
- `docs/03-document-intake-checklist.md`, ten document tiers with sources and reasons, six marked as the minimum viable start, plus three written requests to send the agency benefits office on day one.
- `docs/04-report-catalog.md`, sixteen artifact specifications: two living registers, two monthly artifacts, and eleven analyses.
- `docs/05-boldin-setup-and-validation.md`, field by field entry mapping, the export and validate loop, and fifteen defect classes each with a test and a fix.
- `docs/06-fers-rules-reference.md`, twenty two rule sections with 82 citations to opm.gov, tsp.gov, ssa.gov, cms.gov, irs.gov, eCFR, the US Code and congressional sources, plus an explicit list of ten items that could not be verified or where sources conflict.
- `docs/FERS-Planning-Project-User-Guide.pdf`, the detailed user guide.
- `templates/facts-register.md`, a fifteen section register that is the single source of truth for every number in the plan.
- `templates/open-items.md`, seeded with the eight standing questions every user should ask their benefits office first.
- `scripts/New-FersWorkspace.ps1` and `scripts/new-fers-workspace.sh`, which build the workspace folder tree and place the two living registers.
- `DISCLAIMER.md`, `LICENSE` (MIT), `CONTRIBUTING.md`, and a `.gitignore` written to keep personal retirement data out of any fork.

### Notes on scope

- Built for FERS. CSRS and CSRS Offset are explicitly out of scope and the README says so.
- Special provision positions branch correctly at every rule, but the reference is thinner on them than on Regular FERS.
- Boldin is the only planning tool with a validation guide.
