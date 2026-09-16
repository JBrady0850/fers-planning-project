# READ ME FIRST: HOW TO USE THIS PACKAGE

Eleven files. They cross-reference each other by path, so the set only works whole. Read this page, then go to `docs/02-setup-instructions.md`. Do not read the others first.

| File | Who reads it | Purpose |
|---|---|---|
| `docs/01-read-me-first.md` | You, now | Orientation. What this is, what it costs in time, and what it will not do. |
| `docs/02-setup-instructions.md` | You, first | Install, folder structure, load the prompt, run the interview. Written for someone who has never used Claude. |
| `MASTER-PROMPT.md` | You copy the middle of it | The engine. Everything between the two lines of equals signs goes into the project Instructions field. |
| `docs/03-document-intake-checklist.md` | You | Ten tiers of documents, where each one comes from, and why it matters. Six items are marked as the minimum viable start. |
| `docs/04-report-catalog.md` | Claude, mostly | Seventeen artifacts with methods and a shared definition of done. You name one, Claude reads the spec. |
| `docs/05-boldin-setup-and-validation.md` | You and Claude | Entry mapping, the validation loop, and fifteen defect classes with tests and fixes. |
| `docs/06-fers-rules-reference.md` | Both | Every FERS, TSP, FEHB, FEGLI, Social Security and Medicare rule used here, with the citation. |
| `templates/facts-register.md` | Claude writes into it | The single source of truth for every number in the plan. Copied to `02 Baseline/Facts Register.md` during setup. |
| `templates/open-items.md` | Claude writes into it | The running list of unanswered questions, seeded with the eight you should send your benefits office on day one. |
| `docs/07-boldin-field-map-and-entry-engine.md` | You and Claude | Where every value goes inside Boldin, screen by screen, and the specification for the Entry Sheet. The validation guide tells you what is wrong. This one tells you what to type. |
| `templates/boldin-entry-sheet.md` | Claude writes into it | The deliverable that turns processed documents into a typed list of Boldin entries. Copied to `08 Boldin Entry Sheets/` with the date. |

---

## WHAT THIS IS, IN ONE PARAGRAPH

It is a working retirement planning system for one federal employee, built to run in Claude Desktop with a connected folder. You get a folder structure, a project prompt, a fourteen block interview, a monthly cycle that takes fifteen minutes, and seventeen report specifications. The method came out of a federal employee running his own FERS plan for two years and finding out, the expensive way, which numbers a planning tool gets wrong. The parts that matter are the parts that took him months to learn: three separate expense lenses that never get mixed, a no invented numbers rule, a trailing actual burn rate that replaces modeled spending, and the habit of validating the planning tool against your own documents rather than trusting it.

---

## WHAT IT WILL NOT DO

It will not give you financial advice, legal advice, or tax advice. It produces arithmetic, source traced figures, and decision options. Irreversible elections get a written options analysis and a direct instruction to confirm with a licensed fiduciary and with your agency benefits officer before you file anything.

Under FERS the irreversible elections are: the survivor annuity election, the FEGLI post retirement reduction election, the decision to cancel rather than suspend FEHB, the choice between postponed and deferred retirement, whether to pay a military service deposit before you separate, the Social Security claiming age, and any TSP annuity purchase. Each of those is permanent. Use this system to walk into the meeting with the arithmetic already done. Do not use it to skip the meeting.

---

## THE FIVE THINGS THAT MOST OFTEN MAKE A FERS PLAN WRONG

These are the failure modes this package is built to catch. Each one is sourced in `docs/06-fers-rules-reference.md`.

**1. No annuity cost of living adjustment before age 62.** A FERS retiree who leaves before 62 receives no COLA at all until the adjustment that follows the 62nd birthday. Exceptions exist for law enforcement officers, firefighters, air traffic controllers, disability retirees and survivors. For everyone else the annuity is flat in nominal dollars through the whole bridge period. Planning tools default to growing a pension every year. That single default is the largest single source of false optimism in a FERS plan, and correcting it in one real case moved projected net worth at longevity by more than three hundred thousand dollars.

**2. Eligibility is not what most people think it is.** There are four ways to retire immediately under FERS and they carry very different outcomes. Leaving at your Minimum Retirement Age with between ten and twenty nine years of service is MRA+10, which reduces the annuity by five twelfths of one percent for every month you are under 62, permanently, and which makes you ineligible for the FERS Special Retirement Supplement. Block 1 of the interview derives your real eligibility dates before it ever asks what date you would prefer.

**3. Postponed and deferred retirement are not the same thing, and the difference is your health insurance for life.** If you separate after reaching your Minimum Retirement Age with at least ten years, you may postpone the annuity start date to reduce or remove the age penalty, and when the annuity begins you may re enroll in FEHB and reinstate FEGLI. If you separate before reaching your Minimum Retirement Age, you are on the deferred path, and OPM states plainly that a deferred annuitant is not eligible to re enroll in health benefits, life insurance, or dental and vision benefits. Ever. That is a permanent forfeiture decided by which side of one date you separate on.

**4. The FERS Special Retirement Supplement is narrower than people assume, never gets a COLA, and is subject to an earnings test.** It is payable only on an immediate unreduced annuity, meaning your Minimum Retirement Age with thirty years, or age 60 with twenty years. MRA+10 does not qualify. Deferred does not qualify. Disability does not qualify. It ends the month you turn 62 whether or not you claim Social Security, it is fixed in nominal dollars for its entire run, and if you work after retiring it is reduced by one dollar for every two dollars you earn above the annual exempt amount.

**5. The Social Security statement overstates what you will actually get.** The statement projects your current salary continuing until you claim. If you retire five to seven years from now and claim at 62 or later, those are zero earning years and the real benefit is lower. The fix is to re run the estimate on ssa.gov with future earnings set to zero. The checklist makes this a required document rather than an optional one.

---

## WHAT IT COSTS IN TIME

| Activity | Time | When |
|---|---|---|
| Install and set up the project | 30 minutes | Once |
| Gather the six minimum documents | 1 to 3 hours, mostly waiting on portals | Once, up front |
| The fourteen block interview | 90 minutes, and it can be split across sessions | Once |
| Build the Readiness Baseline | 20 minutes of your time, Claude does the work | Once |
| The monthly cycle | 15 minutes | Every month |
| Boldin setup and first validation | 2 hours | Once, then quarterly |

The document gathering in the middle column is the part that takes real calendar time, because some of it arrives from your agency benefits office rather than from a portal. Start the requests early. The interview does not wait on them.

---

## WHAT GOOD LOOKS LIKE AFTER THIRTY DAYS

- The Facts Register holds every number that matters, each one traced to a named document.
- The Readiness Baseline states in three sentences whether you are on track, tight, or short, and by how much per month.
- Your four eligibility dates are derived, written down, and reconciled against the date you had in your head.
- One monthly report exists, built from real transactions rather than from a remembered budget.
- Boldin is set up and validated, and you know which of its figures to trust and which to override.
- At least one Entry Sheet exists in `08 Boldin Entry Sheets`, every row on it marked ENTERED or BLOCKED, and the export that confirms those values is saved in `05 Boldin`.
- The Open Items list is short, and every item on it names the specific document that would close it.

---

## A NOTE ON WHERE YOUR DOCUMENTS LIVE

Your workspace will hold leave and earnings statements, TSP statements, benefit estimates and tax returns. Those carry account numbers and Social Security numbers.

If you put the workspace in a cloud folder that is shared with anyone, whoever has access can read every one of those documents. If you sync it to a personal cloud account, the documents leave your machine.

You have a clean alternative and it costs nothing. Keep `01 Source Documents` in a private local folder, connect both folders to the Claude project, and let only finished reports land in the shared or synced one. Claude works identically either way. Decide this before you start loading documents rather than after.

Nothing in this repository should be placed on a government system, and nothing from a government system should be placed in this workspace without checking your agency's policy first.

---

## IF YOU EXTEND IT LATER

Three pieces are deliberately left out, in the order worth adding:

1. **A monthly scheduled task**, once you have run the cycle manually three or four times and know what a correct report looks like.
2. **A scripted feasibility model**, once your burn rate has stabilized enough that scenario modeling beats a spreadsheet.
3. **A note vault**, only if you start generating enough notes that retrieval becomes the bottleneck. For one person with one project the folder structure is sufficient and a vault is overhead.
