# Changelog

All notable changes to this project are recorded here.

Rules in this repository were verified in September 2026. Dollar figures are 2026 program year values and change annually. See `docs/06-fers-rules-reference.md` for citations and for the list of items that could not be verified.

## [1.3.0] - 2026-10-25

The FERS Planner: a free web app that runs the core of this method in a browser, with no setup, and saves the whole plan as a Word file or a PDF.

### Added, the planner app

- **`app/`**, published at https://jbrady0850.github.io/fers-planning-project/. Plain HTML, CSS and JavaScript with no build step and no network calls with anyone's answers. It installs to a home screen, works offline, and opens from a downloaded copy.
- **A ten step interview** that mirrors Blocks 1 through 13 of the master prompt and asks for eligibility facts before any preferred date. Answers save in the browser as they are typed, and an answers file carries them to another device or into a Claude session.
- **Eight calculators, each showing its arithmetic and its sources:** the MRA and the four eligibility dates with every age-triggered date; the creditable service audit with the military deposit compared both ways and its break-even; the high-3, entered or computed from salary history, and the annuity with the age and survivor reductions, checked against any agency estimate; the supplement with its earnings test and a no-supplement case; sick leave on OPM's own chart and the annual leave lump sum; the FEHB and FEGLI five year rules at every candidate date, postponed versus deferred, the pre-65 window and the FEGLI reduction elections; the survivor election priced three ways; and income against spending period by period with the withdrawal rate and a verdict.
- **The Boldin Entry Sheet** generated from the answers, ordered by impact with the annuity COLA, the withdrawal strategy, the annuity start date and the supplement first, every row citing its source and naming what it replaces, and missing inputs written as BLOCKED rows that name the document that would unblock them. It copies as Markdown in the layout of `templates/boldin-entry-sheet.md`.
- **Word and PDF output** built in the browser by docx and pdfmake, which ship in `app/vendor/` with their MIT licences. The saved plan follows Phase C of the master prompt, carries the Entry Sheet as a landscape appendix, and ends with the definition of done checklist. The page, the Word file and the PDF render the same plan model, so they cannot disagree.
- **A stop notice for special provision coverage.** The app covers Regular FERS voluntary retirement only and says so wherever its figures would mislead.
- **`app/js/rules.js`**, every rule and 2026 figure the app uses in one file with its source, and **`docs/08-planner-app.md`**, the app's scope, method, files, testing and publishing.
- **An independent check.** A separate reviewer rebuilt about fifty scenarios by hand from `docs/06` before release. The ten defects it found are fixed and each has an engine test: military service already in the SCD counted in the supplement, the 5 civilian year rule, a plan that failed on a partial interview, an income plan that skipped the months before a postponed or deferred annuity, the earnings test timing and cap, a 1.1 percent date a month late, sick leave value that ignored the 1.1 percent step, the supplement end for birthdays on the 1st and 2nd, FEHB costed on the deferred path, and Boldin rows for annuities that start at 62.
- **Tests.** `tests/engine.test.mjs` reproduces OPM's RI 83-8 conversion examples, the 1.1.1 validation report's combined service example and every figure in Part 10 of the guide. `tests/ui_smoke.py` opens every tab at phone, iPad, Android tablet and desktop sizes, from a server and as a plain file, and builds and opens the Word, PDF and Markdown files.
- **Workflows.** `pages.yml` publishes the app, `tests.yml` runs both suites, and `annual-figures.yml` opens an issue each November and December when the rules file is behind the calendar.
- README section with screenshots and a QR code, and a note in `docs/01-read-me-first.md` that the app is optional and not one of the eleven package files.

### Clarified, rules reference

- **The survivor base.** `docs/06-fers-rules-reference.md` section 12 and `MASTER-PROMPT.md` Block 11 said the survivor percentage applies to "the unreduced annuity." Where an age reduction applies, as on MRA+10, the base for both the survivor benefit and the survivor reduction is the annuity after the age reduction, per CSRS/FERS Handbook Chapter 50, section 50B3.1-3D.4, and the order of FERS reductions is age, then survivor, per section 50B3.1-3A.
- **Five years of civilian service under every path.** Section 2 now quotes 5 U.S.C. 8410: military service bought back with the deposit counts toward 10, 20 and 30 years, never toward the 5.
- **Deferred annuity start dates.** Section 3 said a deferred annuity is payable at 62, or at the MRA reduced. OPM's Deferred Retirement page adds that with 20 or more years it starts unreduced at 60, and with 30 or more at the MRA, and 5 U.S.C. 8464(a)(1)(A)(ii) sets the start on the first day of the month after the age is reached.
- **When the supplement ends.** Section 8 now follows 5 U.S.C. 8421(a)(3)(B) and Handbook Chapter 51, section 51A1.1-3 E: for a 62nd birthday on the 1st or 2nd of a month the supplement ends on the last day of the month before, whether or not the retiree claims Social Security.
- **How the earnings test is applied.** Section 8 now quotes 5 U.S.C. 8421a: only earnings in months the supplement is paid count, so pay before retirement does not; each year's reduction is capped at that year's supplement and spread over the supplement months from the next July through June; earnings in the year the supplement ends reduce nothing. The rules reference grew from 100 citations to 103.
- **The sick leave table is the authority, not the formula.** Section 6 now records that a few cells of OPM's RI 83-8 table differ from the 2,087 hour computation by about an hour, and gives the three worked examples RI 83-8 publishes, including 1,452 hours as 8 months 11 days by the next higher figure.

### Known, for the next guide rebuild

The PDF guide was not rebuilt in this release. Six items are recorded for the next rebuild:

- Section 2.15's survivor table carries the same "unreduced annuity" wording corrected above.
- Section 10.5 says MRA+30 becomes available on 31 August 2029 with the deposit. By the guide's own service table, 30 years arrive on 31 July 2029, so the earliest MRA+30 month end date is a month earlier. The figures priced for 31 August 2029 are correct.
- Section 2.10 describes the deferred annuity as payable at 62, or at the MRA reduced; add the unreduced starts at 60 with 20 years and at the MRA with 30, and the 5 civilian year floor.
- Section 2.8 says the supplement ends at the end of the month you turn 62; add that a birthday on the 1st or 2nd ends it a month sooner.
- Section 2.8 on the earnings test should say that only earnings after retirement count, and that a year's reduction is capped at that year's supplement.
- Section 10.8 judges the bridge years only. The worked example's tightest period is from the end of the supplement at 62 to a Social Security claim at 67, at a withdrawal rate of 4.88 percent, which the planner reports as tight.

## [1.2.0] - 2026-09-16

Service Computation Dates and the military service credit deposit are now covered properly, and the expense aggregator guidance was corrected. Every new claim was validated at the same standard as 1.1.1: three independent authoritative sources per claim, none accepted from a page that was not fetched. The rules reference grew from 82 citations to 100.

### Added, Service Computation Dates

- **`docs/06-fers-rules-reference.md` section 7.1** names the four standard SCDs, leave, retirement, reduction in force and TSP, and states which one governs.
- **Block 31 of the SF 50 carries the leave SCD. The retirement SCD is not printed on the SF 50 at all.** Earlier versions said only that the two are "frequently different," which is true but gave a reader no way to tell which one they were holding. OPM's leave accrual guidance states directly that the leave SCD is not used for retirement benefit calculations.
- The mechanism of divergence is now named: the leave SCD credits honorable active duty with no payment, the retirement SCD credits post-1956 military service only after a deposit, so four years of uncredited active duty makes every eligibility date read four years early.
- The 5 USC 6303 restriction on leave accrual credit for retired uniformed service members is recorded, with a note that it governs the leave SCD only.

### Added, the military service credit deposit

- **`docs/06-fers-rules-reference.md` section 7.2** replaces a five line summary with the full rule: what counts as military service, the amount, the interest mechanics, where and by when it is paid, the forms, the retired pay waiver, what the deposit does not buy, and the break-even.
- **What counts.** Academy service at West Point, Annapolis, the Air Force Academy and the Coast Guard Academy, creditable since the 2008 National Defense Authorization Act, with the Merchant Marine Academy excluded. Reserve active duty for training counts; drill does not. National Guard service counts only when federalized.
- **Interest.** It begins on the second anniversary of the FERS coverage start date and compounds annually at a rate the Treasury sets each year, 4.250 percent for 2026 per OPM BAL 26-301. Individual accounts are charged a composite rate around the Interest Accrual Date recorded on the SF 3108A.
- **The deposit is paid to the employing agency, not to OPM**, and must be paid in full before the separation on which the retirement is based.
- **The forms, in order:** DD Form 214, then RI 20-97 to price the service, then SF 3108 with SF 3108A to apply. Standard Form 180 and eVetRecs are the route to a missing DD-214. An official estimated earnings statement takes about 60 business days and the whole sequence commonly runs about six months.
- **The military retired pay waiver, which nothing in 1.0.0 through 1.1.1 mentioned.** Regular military retired pay must be waived under 5 USC 8411(c)(2) before the same service can count toward a FERS annuity. Reserve retired pay under chapter 1223 of title 10 is not waived, and neither is retired pay awarded for a service connected disability incurred in combat with an enemy or caused by an instrumentality of war and incurred in line of duty during a period of war. The waiver goes to DFAS rather than OPM, 60 to 90 days before the annuity commencing date, and must state on its face that it is for civil service retirement purposes. **A waiver does not replace the deposit.** A military retiree following the earlier text could have paid a deposit that bought nothing.
- **Three limits on what the deposit buys** are now stated plainly: it does not raise the high-3, which averages civilian rates of basic pay only; it does not raise the FERS Special Retirement Supplement, whose numerator excludes military service even when the deposit is paid; and it is refundable only inside a full refund of FERS deductions, after which a FERS employee has no right to pay it again.
- **A break-even formula**, so the deposit decision is a number rather than an intuition.

### Fixed, expense aggregators and burn rate

The advice to use an aggregator such as Empower or Monarch was accurate but incomplete in ways that produce a wrong burn rate. Verified against the vendor's own documentation and corrected in `MASTER-PROMPT.md` Block 9, `docs/03-document-intake-checklist.md`, `docs/02-setup-instructions.md` and guide section 4.6:

- The product is the **Empower Personal Dashboard**, the former Personal Capital. It is free and it does export transactions to CSV.
- **The export obeys the filter on screen and defaults to the last 90 days.** A user who presses the button without widening the date range exports a quarter and files it as a year.
- **A newly linked account backfills only one to three months**, sometimes up to a year depending on the institution, and there is no manual import. The package asks for twelve months, so accounts must be linked early and the older months pulled from each institution directly.
- **Transfers, credit card payments, loan payments and retirement contributions are excluded from the built in Cash Flow view to avoid double counting, but they are present in the raw CSV.** A burn rate summed from the raw export without replicating that exclusion counts a credit card payment alongside the charges it paid.
- Cash spending never appears, because an aggregator only ever sees linked accounts.
- Monarch and Quicken Simplifi also export CSV and are paid rather than free.

### Changed

- `MASTER-PROMPT.md` Block 1 question 2 now names Block 31 as the leave SCD. Block 2 question 4 asks the branch, the Interest Accrual Date, whether the service was academy, reserve active duty for training or federalized Guard duty, and **under what authority any military retired pay was awarded**. The analyst instruction now requires the break-even and a waiver determination.
- `docs/03-document-intake-checklist.md` gained the RI 20-97 estimated earnings statement, SF 3108 and SF 3108A, the paid in full letter with the corrected retirement SCD, and the military retirement order, plus a note on military service.
- `templates/facts-register.md` gained rows for the Interest Accrual Date, the retired pay authority and whether a waiver is required.
- `templates/open-items.md` gained a ninth standing question on the retired pay authority.
- `docs/07-boldin-field-map-and-entry-engine.md` no longer implies the SF 50 carries the retirement SCD, and the reverse map gained the military deposit status letter.
- The guide is rebuilt at 79 pages. Parts 1 and 2 still begin on their 1.0.0 pages.

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
