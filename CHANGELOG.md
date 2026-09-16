# Changelog

All notable changes to this project are recorded here.

Rules in this repository were verified in September 2026. Dollar figures are 2026 program year values and change annually. See `docs/06-fers-rules-reference.md` for citations and for the list of items that could not be verified.

## [1.1.0] - 2026-09-16

The Boldin loop closes. Version 1.0.0 could tell you what was wrong with a Boldin plan after you exported it. It could not tell you what to type to fix it, and it left the mapping between a document and the fields it touches in the operator's head. This release adds both halves.

### Added

- `docs/07-boldin-field-map-and-entry-engine.md`. The Boldin planner mapped screen by screen: nine screens with their URLs and sub-sections as observed in a signed-in planner on 2026-09-15, a field inventory tying every input to the document and the interview block that produce it, a reverse map from document to fields, the Entry Sheet specification, the full loop from arriving document to confirmed export, and the twelve things most likely to be wrong in a FERS plan. Six sources cited, with the observed and the documented parts of the map separated so a reader knows which is which.
- `templates/boldin-entry-sheet.md`. The Entry Sheet itself: a header, one row per field, structural and irreversible rows called out separately, blocked rows naming the document that would unblock them, the expected effect on Chance of Success stated before entry, a re-export instruction, and a field map corrections table.
- `docs/04-report-catalog.md` gains D11, the Boldin Entry Sheet, the first artifact in the catalog produced automatically rather than on request. Post-Retirement Findings moves to D12.
- A ninth workspace folder, `08 Boldin Entry Sheets`, created by both setup scripts, which now also place the Entry Sheet template.
- `guide-src/`, the markdown, template, stylesheet and build script the user guide PDF is produced from. The 1.0.0 PDF was published without its source, which made a small edit expensive. It is under version control now, and `guide-src/README.md` records the two WeasyPrint behaviours that govern the layout.

### Changed

- `MASTER-PROMPT.md`. Phase A creates and seeds the new folder. An operating rule makes the Entry Sheet automatic on any turn that changes a value Boldin holds. Block 14 closes by producing the first sheet. Phase D adds a step 12 that carries unfinished rows forward. Phase E lists the Entry Sheet. The definition of done fails a report that changed a Boldin value without producing one.
- `docs/05-boldin-setup-and-validation.md` now states plainly that it is one half of a loop and the field map is the other. Its validation sequence writes defects into the next Entry Sheet as rows rather than leaving them as prose.
- `docs/03-document-intake-checklist.md` points at the reverse map, so an arriving document produces its own list of entries.
- `docs/01-read-me-first.md`, `docs/02-setup-instructions.md` and `README.md` updated for eleven files, seventeen artifacts, the ninth folder, and the Entry Sheet workflow.

### Notes

- FERS specific mapping choices are stated in the field map rather than assumed: the annuity is entered as two pension entries so the zero COLA before 62 and the diet COLA after it can both be modeled, the Special Retirement Supplement is a third entry ending at 62 with no COLA and nothing at all on an MRA+10 or deferred path, traditional and Roth TSP are separate accounts, FEHB is the annuitant premium treated as post tax, and the annual leave lump sum is a windfall rather than income.
- `docs/FERS-Planning-Project-User-Guide.pdf` rebuilt at 72 pages. Part 9 gains sections 9.4 and 9.5 covering the field map and the Entry Sheet, Part 8 gains section 8.11, Part 1, Part 3 and Part 7 carry the ninth folder and the new workflow, and a new Appendix E records the version history. The page geometry, type scale and pagination of the 1.0.0 edition are preserved, so every Part through Part 7 still begins on the page it did before.
- One correction carried in the same rebuild: two cross references in the 1.0.0 guide pointed at a Section 5.3 that does not exist. Both now point at Section 4.3.

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
