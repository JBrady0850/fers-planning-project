# REPORT CATALOG AND SPECIFICATIONS

Seventeen artifacts. Two are living registers that are never finished. Two run monthly. One is produced automatically every time a Boldin input changes. The rest are built on request and rebuilt when an input changes.

To request any of them, name it. The assistant reads this file for the specification.

---

## A. LIVING REGISTERS

### A1. Facts Register

`02 Baseline/Facts Register.md`

The single source of truth for every input. Nothing enters a report that is not here first.

**Format.** One fact per line: `[YYYY-MM-DD] | [fact] | [source] | [SOURCED or ESTIMATE]`

**Sections.** Identity and eligibility dates, creditable service audit, high-3 and annuity computation, FERS supplement, leave balances, income, accounts and balances, expenses by lens, insurance, debts, assumptions.

**Rules.** Append, never overwrite. When a fact changes, add the new line and mark the old one superseded with the date. The history of a changed assumption is itself evidence, and it is the only way to answer the question "why did this number move" six months later.

### A2. Open Items

`06 Open Items/Open Items.md`

Every unanswered question, each with the document that would close it and an estimate of how much the answer could move the plan. Ranked by impact, not by age. Reviewed at the end of every monthly cycle.

---

## B. THE FOUNDATION

### B1. Retirement Readiness Baseline

`02 Baseline/Retirement Readiness Baseline YYYY-MM-DD.md`

**Purpose.** Where you stand today, and the size of the gap.

**Cadence.** Once at the start. Rebuilt only when a foundational fact changes: an eligibility date moves, a deposit is paid, a candidate separation date is added or dropped, or a material asset revision lands. Not rebuilt monthly.

**Inputs.** Completed interview, retirement SCD confirmation, agency annuity estimate, Social Security zero earnings estimate, TSP statement, FEHB and FEGLI enrollment histories, all account statements, twelve months of transactions.

**Structure.** The thirteen point structure in Phase C of the master prompt. Two items in it are specific to FERS and must not be dropped for brevity: the eligibility date table with the reduction and supplement eligibility priced at each candidate date, and the insurance findings stating the FEHB and FEGLI five year rule results and whether each candidate date lands on the postponed or the deferred path.

---

## C. THE MONTHLY CYCLE

### C1. Monthly Budget and Retirement Report

`03 Monthly Reports/YYYY-MM/Monthly Report YYYY-MM.md` plus `Monthly Report YYYY-MM.xlsx`

**Purpose.** Replace modeled spending with measured spending, every month, so the plan tracks reality.

**Cadence.** Monthly. Trigger phrase: `run the monthly report`.

**Method.**

1. Classify every CSV in `New Raw Data` by header signature, not file name. Report anything unclassifiable rather than skipping it.
2. Categorize transactions into fixed and discretionary groups.
3. Separate one time items, each with vendor, amount, and the reason it is non recurring.
4. Compute all three lenses: FULL, CURRENT, RETIRED.
5. Update balances and month over month change.
6. Recompute the gap and the required withdrawal rate.
7. Compare to prior month and to baseline. Explain every variance above 10 percent.
8. Update the trailing three month average burn.

**Workbook tabs.** Summary, Portfolio, Sustainability, Transaction Detail.

**Schema requirement.** The Sustainability tab must contain a cell labeled exactly `Trailing 3-Month RETIRED Burn`. Downstream analyses locate it by exact label match. Every monthly report carries it, without exception, or the chain breaks.

**Verdict rule.** If the sustainability verdict changes in either direction, state it at the top in plain language. Never update the numbers and leave a stale verdict sentence in place.

### C2. Portfolio Holdings Snapshot

`03 Monthly Reports/YYYY-MM/Portfolio Snapshot YYYY-MM.xlsx`

Every holding across every account: ticker or fund, shares, price, value, expense ratio, and asset class. TSP funds are listed by fund rather than by ticker. Aggregate allocation by stock, bond, and cash against the target allocation, and state the traditional, Roth and taxable split separately, because that split is what tax planning acts on.

Weighted expense ratio expressed in dollars per year, because a fee stated in basis points does not feel like money and a fee stated in dollars does.

Flag any single position above 10 percent of the total, and any allocation drift beyond 5 percentage points from target.

---

## D. THE ANALYSIS SET

### D1. Income vs Burn Gap and Safe Withdrawal Rate

`04 Analysis/Income vs Burn Gap YYYY-MM-DD.md` plus a charts PDF

**Purpose.** Whether the money lasts, and at what spending level it lasts.

**Method.** Project year by year from the separation date to the longevity age. Model each income line starting on its own date, which for a FERS retiree means at least four different start dates: the annuity, the supplement, Social Security, and portfolio withdrawals. Apply general inflation to expenses and medical inflation to health costs.

**Three FERS rules that must be applied correctly or the whole projection is wrong:**

- Apply **no** cost of living adjustment to the annuity before age 62 unless the user is a special provision retiree, a disability retiree, or a survivor.
- From age 62 apply the **diet COLA**: the full CPI-W increase when it is under 2 percent, a flat 2 percent when it is between 2 and 3 percent, and the CPI-W increase minus one percentage point when it is above 3 percent.
- Apply **no** cost of living adjustment to the FERS Special Retirement Supplement, ever, and end it at the end of the month the user turns 62.

Run at minimum: average return, pessimistic return, and a sequence of returns stress case that front loads the poor years.

**Output.** For each scenario, the terminal balance at the longevity age and the depletion year if any. Then the number that matters most: the maximum sustainable monthly spend that keeps every scenario solvent, and the difference between that figure and current spending.

**Charts.** Balance over time by scenario, income versus expense by year, withdrawal rate by year against the 4 percent line, and the composition of income by source over time. The last of these is the one that makes the bridge years visible.

### D2. Retirement Date Comparison

`04 Analysis/Retirement Date Comparison YYYY-MM-DD.md` plus a workbook and charts

**Purpose.** Price each candidate date rather than arguing about them.

**Candidate dates.** The earliest immediate annuity date, the earliest immediate unreduced annuity date, each intervening December 31, the 1.1 percent multiplier date if reachable, and one year past the earliest unreduced date.

**Per date, compute.** Creditable service at that date including sick leave credit, high-3 at that date, the multiplier that applies, the gross and net monthly annuity, the age reduction percentage if any, whether the FERS Special Retirement Supplement is payable and at what amount, the FEHB and FEGLI five year rule results, whether the date lands on the postponed or the deferred path, Social Security at each claiming age, the annual leave lump sum, months of self funded health insurance before 65, the required withdrawal rate, and lifetime income to the longevity age in both nominal and present value terms.

**Output.** One comparison table, then the crossover analysis: at what age does the later date overtake the earlier one in cumulative income, and what is the cost per year of leaving earlier. State plainly that lifetime dollars are not the only consideration and that years of health are worth something the model cannot price.

**One specific check.** If any candidate date falls short of the FEHB five year rule or lands on the deferred path, that date is not merely worse, it is categorically different, and the table must say so rather than showing it as a slightly lower number.

### D3. Cash Bridge Plan

`04 Analysis/Cash Bridge Plan YYYY-MM-DD.md` plus a workbook

**Purpose.** Cover the gap between the last paycheck and the first full annuity payment.

**Why this matters more under FERS than under most systems.** OPM processes retirement applications over a period that is routinely measured in months, and pays **interim annuity payments** during processing at a fraction of the final amount, with the balance trued up retroactively once the claim is adjudicated. The annuity also commences the first day of the month after separation, not the day after separation. Nothing about the first year is a steady state.

**Method.** Map the income ramp month by month for the first twelve months of retirement. For each month, list: interim annuity payment received, final annuity once adjudicated, the retroactive true up when it lands, the FERS Special Retirement Supplement if payable, Social Security if claimed, the annual leave lump sum, the final paycheck, other income, total expenses, and the shortfall.

Size the cash reserve on the **cumulative shortfall of the unfunded months**, not on an annual average.

**Rules.**

- Ask the agency benefits office for the current expected processing timeline in writing. Do not plan against a rule of thumb.
- Remember that FEHB and FEDVIP premiums during the interim period may be handled differently than in steady state, and confirm how.
- Hold the bridge in cash or a money market fund. The entire purpose of the reserve is to remove the need to sell into a down market, so an instrument with a market price defeats it.
- Any instrument with a maturity date must mature **before** the separation date. A bill maturing in month four locks money away across exactly the months it is needed.
- Fund it from redirected contributions across the calendar year before retirement, and show the month by month accumulation schedule.
- Never treat the RETIRED lens surplus as the funding source. Use the FULL lens.
- If the user is under 59 and a half at separation, state explicitly that the bridge should be funded from taxable savings or from the TSP under the age 55 separation exception, and that rolling the TSP to an IRA first would forfeit that exception.

### D4. Health Care Bridge to 65

`04 Analysis/Health Care Bridge YYYY-MM-DD.md`

**Purpose.** For anyone retiring before 65 this is usually the largest single unmodeled cost in the plan.

**Method.** Count the months from the separation date to the 65th birthday. Cost each option across that window:

- FEHB carried into retirement at the **annuitant post tax rate**, which is the base case if the five year rule is satisfied.
- Temporary Continuation of Coverage at 102 percent of the full premium for up to 18 months, which is the fallback if the five year rule fails or if the user is on the postponed path.
- A spouse's employer plan if one exists.
- The ACA marketplace, which is relevant only if FEHB is unavailable.

Apply medical inflation at the user's stated rate.

**Then model Medicare from 65.** Part B is optional for an FEHB annuitant. Price both paths:

1. FEHB alone, with no Part B and the permanent late enrollment penalty of 10 percent of the standard premium for each full 12 month period of delay if Part B is taken later. Note that retiree coverage does not create a special enrollment period, so the general enrollment period is the fallback.
2. FEHB plus Part B, with the plan's Medicare coordination benefits from Section 9 of the plan brochure, and any Part B premium reimbursement the plan offers.

Include the income related monthly adjustment amount if projected income crosses a threshold, and state that it uses income from two years prior. That two year lookback makes it a Roth conversion planning constraint rather than a surprise, and it means the final high earning years before separation set the premium two years later.

**Do not confuse FEHB with the Postal Service Health Benefits Program.** PSHB requires Part B enrollment for most Medicare eligible annuitants. FEHB does not. The requirement circulating in federal retirement discussion is a Postal rule.

**Output.** Total pre-65 cost by option, the cheapest viable option and its risks, the post-65 comparison, and the monthly figure to carry into every other report.

### D5. Creditable Service and Deposit Analysis

`04 Analysis/Creditable Service and Deposits YYYY-MM-DD.md`

**Purpose.** Establish the years of service figure that every annuity calculation uses, and price every deposit decision with a deadline attached.

**Method.**

1. Reconstruct the full service history from SF 50s. Identify every period, its appointment type, and whether retirement deductions were withheld.
2. Compute total creditable service at each candidate separation date in years, months and days from the retirement SCD.
3. For each period of non deduction service, state whether a deposit is possible under FERS, the amount, and what the service buys. Remember that service performed on or after January 1, 1989 generally cannot be made creditable under FERS at all, and that a partial deposit for a distinct period buys nothing.
4. For any refunded service, state the redeposit amount and note that unredeposited refunded service counts toward eligibility but not toward the computation.
5. For military service, state the deposit amount, the interest accrued, and **the deadline, which is separation from federal service.** OPM cannot accept the deposit afterward.
6. Compute the part time proration factor if any part time service exists.
7. Add sick leave credit at the projected balance on each candidate date.

**Output.** A single table of creditable service at each candidate date, then a decision table for each deposit showing the cost, the annual annuity increase it buys, the payback period in years, and whether it moves any eligibility date. Moving an eligibility date is worth far more than the annuity increase and must be called out separately.

### D6. Social Security Claiming Analysis

`04 Analysis/Social Security Claiming YYYY-MM-DD.md`

**Purpose.** Price 62 against full retirement age against 70, on real numbers.

**Method.** Use the **zero future earnings** figures as the primary case and the statement figures as the optimistic case. Show both. Compute cumulative benefits by age for each claiming age, find the breakeven ages, and apply a cost of living adjustment assumption consistently.

Then model the three interactions that actually drive the decision for a FERS retiree:

1. **The supplement cliff at 62.** The FERS Special Retirement Supplement ends at 62 whether or not Social Security is claimed. Claiming at 62 replaces it, usually at a lower amount because the supplement is a fraction of the age 62 benefit and Social Security at 62 is reduced. Delaying past 62 means the supplement ends and nothing replaces it, so portfolio withdrawals rise sharply in exactly those years.
2. **The withdrawal rate consequence.** Delaying Social Security means larger portfolio withdrawals in the interim, which changes both the withdrawal rate and the taxable income in the years that matter most for Roth conversions.
3. **The survivor benefit consequence** if married, because the higher earner's claiming age sets the survivor benefit for the rest of the surviving spouse's life.

**Output.** Cumulative benefit curves, breakeven ages, the effect on portfolio depletion under each choice, and the survivor consequence. State the conclusion as a recommendation to review with a fiduciary, not as an instruction.

### D7. Tax Strategy and the Roth Conversion Window

`04 Analysis/Tax Strategy YYYY-MM-DD.md`

**Purpose.** Find the low income years between retirement and required minimum distributions, and use them.

**Method.** Project taxable income by year from the separation date to the required beginning date. The FERS annuity is fully taxable at ordinary rates apart from the small return of the employee contribution. Identify the years when total income is lowest, which for a FERS retiree is typically after the paycheck stops and before Social Security and required minimum distributions begin. Size the traditional TSP balance that will be forced out later, and model conversions that fill a target bracket in the low years.

**Constraints to model explicitly.**

- The taxable portion of Social Security rises with other income up to 85 percent, so a conversion can push a second dollar of tax onto Social Security that is easy to miss. The provisional income thresholds are $25,000 and $34,000 for single filers and $32,000 and $44,000 for joint filers, and they are **not indexed to inflation**, which means they capture more income every year by design.
- The Medicare income related monthly adjustment uses income from two years prior, so conversions at 63 and 64 set premiums at 65 and 66.
- The required minimum distribution age is 75 for anyone born in 1960 or later and 73 for those born 1951 through 1958. Under current law the Roth TSP balance is not subject to lifetime required minimum distributions, and Roth distributions do not count toward satisfying the traditional RMD.
- The senior deduction of $6,000 per qualifying individual, or $12,000 where both spouses are 65 or older, applies for tax years 2025 through 2028 with a phase out beginning at $75,000 of modified adjusted gross income for single filers and $150,000 for joint filers. It expires after 2028, so it is a window rather than a permanent feature.
- State income tax treatment of the FERS annuity varies by state. If relocation is on the table, model both states.

**Output.** Conversion amount by year, tax cost by year, and lifetime tax saved or lost against doing nothing. Flag every figure as planning analysis requiring confirmation by a tax professional before any conversion is executed.

### D8. Survivor Election Analysis

`04 Analysis/Survivor Election YYYY-MM-DD.md`

**Purpose.** Price an irreversible election before it is made.

**Method.** Compute the retiree's annuity under all three elections: full survivor at a 10 percent reduction producing 50 percent to the survivor, partial at a 5 percent reduction producing 25 percent, and none. Project the cost of the reduction over the retiree's life expectancy and the value of the benefit over the survivor's, using both spouses' ages.

**Then state the insurance consequence in its own section, because it usually decides the question.** A surviving spouse can continue FEHB coverage only if a monthly survivor annuity is payable. Electing none ends the spouse's FEHB at the retiree's death. The 5 percent partial election is sufficient to keep it alive.

**Then compare against the alternative.** Price the term or permanent life insurance that would replace the survivor annuity, at the retiree's current age and health, and note that no insurance policy replicates the FEHB eligibility.

**Output.** A three column comparison, the insurance consequence stated separately, the arithmetic for both paths, and an explicit instruction that spousal consent is required for anything less than the maximum and that the election is irreversible after final adjudication.

### D9. FEGLI Reduction Election Analysis

`04 Analysis/FEGLI Election YYYY-MM-DD.md`

**Purpose.** Price the SF 2818 election, which is made once at retirement and is one way thereafter.

**Method.** Take the Basic Insurance Amount in effect at retirement. Model the three Basic elections:

| Election | Coverage after 65 | Monthly cost per $1,000 before 65 | Monthly cost per $1,000 after 65 |
|---|---|---|---|
| 75 percent reduction | Floors at 25 percent of the BIA | $0.3467 | Free |
| 50 percent reduction | Floors at 50 percent of the BIA | $1.0967 | $0.75 |
| No reduction | 100 percent of the BIA for life | $2.5967 | $2.25 |

Re verify those rates at opm.gov before relying on them. The rate schedule dates to October 2021 and OPM re sets it periodically. OPM's FEGLI calculator page and its program information page have carried different figures, so cite whichever one is current at the time of the analysis and say which.

Model Options A, B and C separately. Option A reduces 2 percent per month after 65 to a 25 percent floor and has no no reduction choice. Options B and C offer full reduction, which is premium free after 65 but ends coverage after 50 months, or no reduction, which carries premiums for life.

**Output.** Total premium cost to the longevity age under each election, against the death benefit each produces, compared to the cost of equivalent private term coverage purchased before retirement while the user is still insurable. State that the five year rule for FEGLI is tested separately for Basic and each Option and that **OPM has no authority to waive it**.

### D10. Boldin Validation Report

`05 Boldin/Boldin Validation YYYY-MM-DD.md`

**Purpose.** Check Boldin against your own documents. Full method in `docs/05-boldin-setup-and-validation.md`.

**Cadence.** After the first Boldin setup, after any material entry change, and quarterly.

**Structure.** What Boldin gets right, in a table. Then each defect as its own numbered section with the Boldin figure, the vault figure, the arithmetic that proves which is correct, the direction of the error, and the corrective action. Then the net effect on the Chance of Success figure, stating which errors flatter the plan and which understate it.

**Rule.** When Boldin is right and your own model is wrong, say so first and correct the model. That result is common, and it is the strongest evidence the validation loop works.

### D11. Boldin Entry Sheet

`08 Boldin Entry Sheets/Boldin Entry Sheet YYYY-MM-DD.md`

**Purpose.** Turn processed data into instructions precise enough to type into Boldin without thinking. Full specification in `docs/07-boldin-field-map-and-entry-engine.md`, Part 4. Template in `templates/boldin-entry-sheet.md`.

**Cadence.** Automatic, not on request. Any turn that processes a source document, runs the monthly cycle, or produces an analysis that changes a Boldin input also produces or appends to the Entry Sheet for that date.

**Structure.** A header naming the scenario and what triggered the sheet. One table row per field, carrying screen, sub-section, item, field, the value to type with its unit, what it replaces, the source, and a status. Then the structural and irreversible rows, the blocked rows, the expected effect on Chance of Success stated before entry, the re-export instruction, and any field map corrections found on screen.

**Rules.** One field per row. Never bundle two fields. Every row cites a source or it does not ship. Order by impact so a session that stops halfway still captured the important half. A missing input produces a `BLOCKED` row naming the document that would close it, never an invented value.

**Definition of done.** The Entry Sheet is not finished when the rows are written. It is finished when the next Boldin export shows the values, confirmed by a Boldin Validation Report run against that export. Open rows carry forward into the next sheet rather than being abandoned.

### D12. Post-Retirement Findings

`04 Analysis/Post-Retirement Findings.md`

A running register of everything learned that changes the plan: rule changes, corrected assumptions, discovered accounts, decisions made and why. Appended, never rewritten. In three years this is the file that explains why the plan looks the way it does.

---

## E. CROSS-CUTTING RULES

**Naming.** Every generated file carries a date in `YYYY-MM-DD` form. Superseded versions move to `07 Archive` with the date they were superseded. Nothing is deleted.

**Charts.** Every analysis producing a projection gets a companion PDF of charts. A table of thirty annual balances is unreadable. The same data as a line is understood in two seconds.

**Definition of done.** Applies to every artifact in this catalog:

- Every figure carries a source citation or an `[ESTIMATE]` label with its assumption.
- Decision driving arithmetic is shown and reproducible.
- Assumptions sit in one table, not scattered through the prose.
- Source conflicts are stated and left unresolved rather than papered over.
- The verdict sentence matches the numbers in the body.
- Open items are listed with the size of their potential impact.
- The prior version was archived rather than overwritten.
