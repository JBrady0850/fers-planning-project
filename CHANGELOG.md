# Changelog

All notable changes to this project are recorded here.

Rules in this repository were verified in September 2026. Dollar figures are 2026 program year values and change annually. See `docs/06-fers-rules-reference.md` for citations and for the list of items that could not be verified.

## [1.1.1] - 2026-09-16

Every externally checkable claim in the guide and the rules reference was validated against primary sources, at a standard of three independent authoritative sources per claim, drawn from OPM, the Code of Federal Regulations, the US Code, SSA, CMS, IRS, TSP, the Federal Register and congressional sources. Twenty two items were corrected. No claim failed for want of sources.

### Fixed, arithmetic

- **Sick leave conversion.** The package said "2,087 hours to a year, 8 hours to a day." The eight hour day is wrong: OPM converts on a 360 day retirement year, so a day is about 5.8 hours and a month about 174 hours. The old figure inflated a sick leave balance by roughly 38 percent. The order of operations was also stated backwards. Sick leave days are added to actual service **before** the fractional month of the combined total is dropped, so truncating them on their own loses a month of annuity. Corrected in `docs/06-fers-rules-reference.md`, `MASTER-PROMPT.md` and the guide at 2.6 and Appendix C.
- **Sick leave and the 1.1 percent multiplier.** The package said unused sick leave does not help reach the 20 years the 1.1 percent multiplier requires. OPM Benefits Administration Letter 18-103, dated 12 September 2018, says the opposite: sick leave credit can carry a retiree aged 62 or older from under 20 years to 20, and the annuity is then computed at 1.1 percent, because the multiplier is a computation rule and not an eligibility rule. Worth about ten percent of the annuity for life to anyone near the threshold.

### Fixed, deadlines and decisions

- **The survivor election deadline.** The package said the election is irreversible after final adjudication of the retirement claim. The real deadline is 30 days after the first regular monthly payment, and three increase-only routes survive it, including an 18 month window to elect or increase a current spouse annuity by paying a deposit. That window is the most commonly missed recoverable mistake in FERS retirement.
- **The FEGLI election** is not made once either. It can be changed either way for 30 days after the first payment, then only downward, and Options B and C get one further election at 65. The 50 percent reduction also runs at 1 percent of the Basic Insurance Amount per month, not 2, so it takes 50 months to floor rather than 25.
- **"Immediate" retirement** is 31 days in 5 CFR 842.204(c)(1)(ii), not the thirty OPM's consumer pages round it to.
- **A discontinued service annuity** commences the day after separation, not the first of the following month, which the month end rule had stated as universal.

### Fixed, precision

- The COLA test is whether the retiree is 62 on 1 December, the date the adjustment takes effect, not simply past the birthday. Only military reserve technicians separated for disability are excepted. First year retirees receive a prorated adjustment.
- The FERS Supplement formula is a ceiling rather than an estimate: OPM builds a synthetic earnings record from FERS basic pay alone and enters zero for every non federal year.
- The Social Security taxation thresholds date from 1983 and 1993, not 1983 alone.
- Treasury proposed age 73 for the 1959 required minimum distribution cohort in July 2024 and has not finalized it. The guide had said only that the question was unresolved.
- Partial TSP distributions are limited to one every 30 days.
- An IRMAA life changing event request is a new initial determination, and employees still working at 65 do get the eight month special enrollment period.
- 448 hours is the end of leave year annual leave maximum at the 8 hour accrual rate, not a mid year figure.
- FEHB forfeiture is permanent only outside the waiver circumstances, and the government share is set by the same formula rather than being identical in every case.
- The supplement repeal was absent from the Senate reconciliation text rather than struck by the parliamentarian, and the high-5 proposal was dropped before the House vote.
- Two file references broken by a line wrap in the 1.1.0 rebuild were repaired.

### Verified unchanged

The 2026 figures all confirmed against primary sources: Part B premium $202.90 and deductible $283, IRMAA thresholds $109,000 and $218,000 rising to $689.90, the FERS Supplement earnings test exempt amount $24,480, the COLAs at 2.8 percent CSRS and Social Security and 2.0 percent FERS, and the TSP and IRA limits at $24,500, $8,000, $11,250, $72,000, $7,500 and $1,100. The FEGLI Basic rates were confirmed, including that two OPM pages still publish the pre-2021 schedule, which the guide already flagged.

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
