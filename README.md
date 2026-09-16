# FERS Planning Project

**A complete, evidence backed retirement planning system for United States federal employees, built to run in Claude Desktop against a folder of your own documents.**

You get a project prompt, a fourteen block interview, a document intake checklist, seventeen report specifications, a monthly cycle that takes fifteen minutes, and a closed loop for Boldin that tells you exactly what to type and then checks that it landed. Every rule it uses is cited. Every number it produces is traced to a document you supplied.

> ### Read this first
>
> This is not financial, legal, or tax advice. It is not affiliated with, endorsed by, or connected to the Office of Personnel Management, the Thrift Savings Plan, the Social Security Administration, Boldin, Anthropic, or any federal agency. It produces arithmetic and decision options from your own documents. Every irreversible election listed below must be confirmed with your agency benefits officer and a licensed fiduciary before you file anything. See [DISCLAIMER.md](DISCLAIMER.md).

---

## Why this exists

Most federal employees walk into retirement planning with three numbers they believe and cannot prove: the date they are eligible, what the annuity will pay, and what they spend. All three are usually wrong, and they are wrong in the direction that makes the plan look better than it is.

This system was built by a federal employee running his own FERS plan, finding out the expensive way which figures a commercial planning tool gets wrong, and then writing the corrections down. One example, measured rather than asserted: a planning tool applying a FERS cost of living adjustment from the annuity start date rather than from age 62, together with an annuity starting one month early, accounted for **83 percent of a $315,658 swing in projected net worth at longevity**. A second example: a single withdrawal strategy dropdown set to a fixed percentage rather than to spending needs moved a Chance of Success figure from **77 percent to 99 percent** and cut projected lifetime income taxes by **$57,000**, at no cost in lifestyle.

Neither was visible without exporting the plan and checking it line by line against source documents. That checking loop is what this repository automates.

---

## The five FERS failure modes it exists to catch

| # | Failure mode | Why it matters |
|---|---|---|
| 1 | **No annuity COLA before age 62** | A regular FERS retiree who leaves before 62 receives no cost of living adjustment until the one following their 62nd birthday. Planning tools default to growing a pension every year. |
| 2 | **MRA+10 is not the same as an unreduced annuity** | Leaving at your Minimum Retirement Age with 10 to 29 years reduces the annuity by 5/12 of one percent for every month under 62, permanently, and forfeits the FERS Special Retirement Supplement. |
| 3 | **Postponed and deferred retirement are not the same thing** | Only the postponed path preserves the ability to re-enroll in FEHB and FEGLI. Separating before your MRA forces the deferred path, and OPM states plainly that a deferred annuitant may never re-enroll in health, life, dental or vision benefits. |
| 4 | **The FERS Supplement is narrower than people assume** | Immediate unreduced annuities only. It never receives a COLA. It ends at 62 whether or not you claim Social Security. It is reduced $1 for every $2 you earn above the annual exempt amount. |
| 5 | **The Social Security statement overstates your benefit** | It projects your current salary continuing until you claim. After you retire those are zero earning years. The same error propagates into the FERS Supplement, which is computed from the age 62 figure. |

Every one of these is sourced in [`docs/06-fers-rules-reference.md`](docs/06-fers-rules-reference.md).

---

## What you need

| Requirement | Notes |
|---|---|
| Claude Desktop, paid plan | Pro is sufficient. Max gives more headroom on long sessions. [claude.ai/download](https://claude.ai/download) |
| Cowork mode enabled | This is what lets Claude read and write files in a folder on your computer |
| A folder on disk | Not a browser tab. Any name works. |
| About 90 minutes | 30 for setup, 60 for the interview |
| Six documents to start | Listed below. The rest can arrive over the following weeks. |
| Boldin, optional | Recommended but not required. The validation guide assumes it. |

---

## Quick start

**1. Get the files.**

```bash
git clone https://github.com/JBrady0850/fers-planning-project.git
cd fers-planning-project
```

Or download the ZIP from the green **Code** button.

**2. Build your workspace.**

Windows PowerShell:

```powershell
.\scripts\New-FersWorkspace.ps1 -Path "C:\Users\you\Documents\FERS Planning"
```

macOS or Linux:

```bash
bash scripts/new-fers-workspace.sh ~/Documents/"FERS Planning"
```

This creates the folder tree and copies the two living registers into place.

**3. Create the Claude project.**

1. Open Claude Desktop and create a new **Project** named `FERS Planning`.
2. Open [`MASTER-PROMPT.md`](MASTER-PROMPT.md). Copy everything between the two `=====` markers.
3. Paste it into the project's **Instructions** field and save. Do not paste it as a chat message.
4. Use **Add folder** and select the workspace folder you just created.

**4. Gather six documents.** Full checklist in [`docs/03-document-intake-checklist.md`](docs/03-document-intake-checklist.md).

- Your most recent **leave and earnings statement**
- Your **Service Computation Date for retirement purposes**, in writing from your benefits office (this is often not the same as your leave SCD, and only the retirement one governs)
- An **agency annuity estimate** for at least one candidate separation date
- Your **Social Security statement**, plus a second estimate run with **future earnings set to zero**
- Your most recent **TSP quarterly statement**
- Your **FEHB enrollment history** showing continuous coverage dates

**5. Start.** Open a conversation inside the project and type:

```
Begin Phase A, then start the interview at Block 1.
```

---

## What is in this repository

```
fers-planning-project/
├── MASTER-PROMPT.md                      The engine. Goes in the project Instructions field.
├── README.md
├── DISCLAIMER.md
├── LICENSE                               MIT
├── CONTRIBUTING.md
├── CHANGELOG.md
├── docs/
│   ├── 01-read-me-first.md               Orientation, time budget, what it will not do
│   ├── 02-setup-instructions.md          Step by step, written for a first time Claude user
│   ├── 03-document-intake-checklist.md   Ten tiers, six marked minimum viable start
│   ├── 04-report-catalog.md              Seventeen artifacts with methods
│   ├── 05-boldin-setup-and-validation.md Entry map, validation loop, fifteen defect classes
│   ├── 06-fers-rules-reference.md        Twenty two rule sections, 82 citations
│   ├── 07-boldin-field-map-and-entry-engine.md
│   │                                     Boldin screen by screen, and the Entry Sheet spec
│   └── FERS-Planning-Project-User-Guide.pdf
│                                          72 page user guide
├── guide-src/                             Source the user guide is built from
│   ├── guide.md
│   ├── template.html
│   ├── guide.css
│   └── build.py
├── templates/
│   ├── facts-register.md                 The single source of truth for every number
│   ├── open-items.md                     Seeded with the eight questions to ask on day one
│   └── boldin-entry-sheet.md             One row per Boldin field, what to type and what it replaces
└── scripts/
    ├── New-FersWorkspace.ps1
    └── new-fers-workspace.sh
```

**New to this?** Read [`docs/FERS-Planning-Project-User-Guide.pdf`](docs/FERS-Planning-Project-User-Guide.pdf). It covers everything below in detail, including a plain language FERS primer, a walkthrough of every interview block, and a troubleshooting section.

---

## How it works

### Phase A, setup check
Claude inventories your folder, reports which checklist items are present and which are missing, and states what it can build today and what is blocked by which document.

### Phase B, the fourteen block interview

| Block | Subject |
|---|---|
| 1 | Identity and the four eligibility dates |
| 2 | Creditable service audit: deposits, redeposits, military service, part time proration |
| 3 | High-3 average salary and the annuity computation |
| 4 | The FERS Special Retirement Supplement and its earnings test |
| 5 | Sick leave, annual leave, and the separation date |
| 6 | TSP and other retirement accounts |
| 7 | Social Security |
| 8 | Income today, from the leave and earnings statement |
| 9 | Expenses today, three lenses, from the transaction register |
| 10 | FEHB, FEDVIP, FEGLI, and the pre-65 window |
| 11 | Survivor election and beneficiaries |
| 12 | Debt, housing, and one time events |
| 13 | Assumptions and risk |
| 14 | Boldin |

Block 1 does something you should expect and should not fight. Before it asks when you *want* to retire, it derives when you are *first eligible*, from your date of birth and your retirement Service Computation Date. If the date you have had in your head does not match the derived date, that gap is the most valuable thing this system will ever tell you.

### Phase C, the Retirement Readiness Baseline
A thirteen point document stating, in the first three sentences, whether you are on track, tight, or short, and by how much per month. Everything after this is refinement.

### Phase D, the monthly cycle
Export last month's transactions, type `run the monthly report`, and the plan re-bases on measured spending rather than remembered spending. Fifteen minutes.

### Phase E, the analysis set
Eleven deeper studies built on request: income versus burn, retirement date comparison, cash bridge, health care bridge to 65, creditable service and deposits, Social Security claiming, tax strategy and the Roth conversion window, survivor election, FEGLI reduction election, Boldin validation, and a running findings register.

One more is produced without being asked for. Every time a document is processed, the monthly cycle runs, or an analysis changes a Boldin input, Claude writes a **Boldin Entry Sheet** into `08 Boldin Entry Sheets/`: one row per field, giving the screen, the field, the exact value with its unit, what that value replaces, and the source it came from. You type the rows and mark each one ENTERED, then export and let the validation confirm the values landed. `docs/07-boldin-field-map-and-entry-engine.md` is the map behind it, and it also carries the reverse map, document to fields, so an arriving statement produces its own list of entries.

---

## The three rules that make it work

**1. No invented numbers.** Every dollar figure, date and percentage traces to a document you placed in the folder, a figure you stated with a date, or a published rule with a URL. Anything else is labeled `[ESTIMATE]` with the assumption that produced it. When a required input is missing, Claude says so and names the document that would supply it.

**2. Three expense lenses that never get mixed.**

| Lens | Definition | What it is for |
|---|---|---|
| **FULL** | Every dollar leaving the account today | Cash flow reality, and the only correct basis for any question about available cash |
| **CURRENT** | FULL less one time and non recurring items | Trend and run rate |
| **RETIRED** | CURRENT less what ends at retirement, plus what begins | The retirement burn baseline, and the only correct basis for withdrawal rate math |

Quoting the RETIRED lens surplus as spendable cash today is the most common error in this whole method, and it overstates how fast you can build a cash bridge.

**3. Validate the tool against your documents, not the other way around.** Boldin is a calculator. A calculator returns exactly what you feed it. Enter your data, export the results, check the export line by line against your own documents, correct what is wrong, re-export. The disagreements are the point. When Boldin turns out to be right and your own model wrong, say so first and fix the model. A value is not considered entered because an Entry Sheet told you to enter it. It is considered entered when the next export shows it.

---

## Irreversible elections this system will not decide for you

It produces the arithmetic. You take the arithmetic to your agency benefits officer and a licensed fiduciary.

- The survivor annuity election on your retirement application
- The FEGLI post retirement reduction election on SF 2818
- Cancelling rather than suspending FEHB as an annuitant
- Choosing deferred retirement over postponed retirement
- Paying or not paying a military service deposit before you separate
- Your Social Security claiming age
- Any TSP life annuity purchase

---

## Sourcing and known gaps

[`docs/06-fers-rules-reference.md`](docs/06-fers-rules-reference.md) carries 82 citations across 22 rule sections, drawn from opm.gov, tsp.gov, ssa.gov, cms.gov, irs.gov, eCFR, the US Code, and congressional sources. Rules verified September 2026.

It also names **ten items that could not be verified or where sources conflict**, rather than papering over them. Among them:

- The Self Plus One or Self and Family enrollment condition for a surviving spouse's FEHB, which appears in secondary sources but not on a primary OPM page
- The required minimum distribution applicable age for the **1959 birth year**, which the regulation leaves reserved because of a SECURE 2.0 drafting conflict
- The current FEGLI pre-65 Basic rate, where two OPM pages disagree
- The General Schedule night differential exclusion from the high-3, affirmed only by a secondary source

Two OPM Handbook chapters cited are flagged as carrying text that statute has since superseded.

**Dollar figures are 2026 program year values.** Contribution limits, premiums, IRMAA brackets, the earnings test exempt amount and COLA figures all change annually. Re-verify anything that drives a filing decision.

### Legislative risk

Elimination of the FERS Special Retirement Supplement and a change from high-3 to high-5 were both proposed in 2025 reconciliation legislation and removed before enactment under the Byrd rule, on procedural grounds rather than on the merits. **Nothing is enacted as of September 2026.** They can return in standalone legislation. If your separation is several years out, the master prompt instructs Claude to model current law and run one sensitivity case with the supplement set to zero.

Note also that at least one widely read federal benefits outlet published an issue brief describing those provisions as enacted. That article describes the House passed version of May 2025, not the final law.

---

## CSRS, special provisions, and who this does not fit

This is built for **FERS**. If you are covered by **CSRS** or **CSRS Offset**, the eligibility rules, the annuity formula, the COLA treatment and the Social Security interaction are all different, and this system will mislead you. A CSRS version does not exist yet.

If you are a **special provision** employee, meaning a federal law enforcement officer, firefighter, air traffic controller, nuclear materials courier, Customs and Border Protection officer, or military reserve technician, the system handles you: Block 1 asks directly rather than assuming Regular FERS, and the eligibility age, multiplier, supplement timing and COLA rules all branch on the answer. The rules reference covers the branches but is less deep on special provisions than on Regular FERS, so verify your specific thresholds with your benefits office.

If you are covered by **FSPS**, the **Foreign Service Pension System**, or another separate system, this will not fit.

---

## Privacy

Your workspace will hold leave and earnings statements, TSP statements, benefit estimates and tax returns, carrying account numbers and Social Security numbers.

- If the folder is shared with anyone, they can read all of it.
- If it syncs to a personal cloud account, those documents leave your machine.
- Keeping `01 Source Documents` in a private local folder and connecting both folders to the Claude project works identically and costs nothing.

**Do not place any of this on a government system, and check your agency policy before moving anything off one.** Nothing in this repository is government property or an official product.

---

## Contributing

Corrections to the rules reference are the most valuable contribution, especially citations that close one of the ten unverified items. See [CONTRIBUTING.md](CONTRIBUTING.md). Every rule change needs a primary source URL.

---

## License and author

MIT. See [LICENSE](LICENSE). Use it, fork it, adapt it, teach with it.

Built by **John Michael Brady** ([@JBrady0850](https://github.com/JBrady0850)), a federal employee planning his own FERS retirement, with research and drafting by Claude. Published in the hope that the next person does not have to learn Defect Class 1 the way I did.

If it helps you, the most useful thing you can send back is a correction.
