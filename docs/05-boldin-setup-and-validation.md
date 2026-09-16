# BOLDIN SETUP AND VALIDATION GUIDE

Boldin is a capable planner. It is also a calculator, and a calculator returns exactly what it is fed. Every one of its defaults was written for a general audience, and several of those defaults are wrong for a federal employee under FERS.

The method here is a loop, not a setup. Enter the data, export the results, check the export against your own documents, correct what is wrong, re export. The value is in the disagreements.

**This file is one half of that loop.** It tells you what is wrong and how to test for it. `docs/07-boldin-field-map-and-entry-engine.md` is the other half, and it tells you where every value goes, screen by screen, and specifies the Entry Sheet that turns a finding here into a row you can type. Every defect class below is cited by number from that file. Read Part 1 here for the short mapping and the field map for the full one.

Everything in the defect list below came out of running this loop on a real FERS plan. The single largest correction found was Defect Class 1, and it moved projected net worth at longevity by more than three hundred thousand dollars. The second largest was Defect Class 3, a single dropdown setting, and correcting it moved the Chance of Success figure by twenty two points. Neither was visible without exporting and checking.

---

## PART 1: WHAT TO ENTER, AND FROM WHICH DOCUMENT

Enter nothing from memory. Every field traces to a document in `01 Source Documents`.

| Boldin field | Source document | Watch for |
|---|---|---|
| Date of birth | Driver license or SF 50 | Drives every age triggered event, including the Minimum Retirement Age |
| Retirement date | The eligibility date table, not preference | Enter the **earliest immediate unreduced date** as the base scenario. Build the preferred date as a separate scenario. |
| Longevity age | Your stated assumption | Boldin's default is not your decision. Set it deliberately. |
| Current salary | Leave and earnings statement, annualized on 26 pay periods | Basic pay plus locality. Not W-2 gross. |
| **Pension: monthly amount** | Agency annuity estimate for that specific date | Use the estimate run for **that** separation date, not a single estimate reused across scenarios |
| **Pension: start date** | First day of the month after separation | Not the separation date. See Defect Class 2. |
| **Pension: cost of living adjustment** | Your age at the annuity start date | **Set to 0 percent if you will be under 62.** See Defect Class 1. |
| Pension: survivor option | The election you intend to make | The 10 percent or 5 percent reduction must be reflected in the entered amount |
| **FERS Special Retirement Supplement** | Your eligibility determination from Block 4 | Enter as a **separate income line**, at 0 percent COLA, ending the month you turn 62. Enter nothing at all if you are on an MRA+10 or deferred path. See Defect Class 4. |
| Social Security | The **zero future earnings** estimate | Not the statement figure. See Defect Class 5. |
| TSP balance | TSP statement | Enter traditional and Roth separately if Boldin supports it. The tax treatment differs and so does the RMD treatment. |
| TSP contribution | Leave and earnings statement | Per pay period times 26, plus the agency automatic 1 percent and the match |
| TSP allocation | TSP statement | The expected return must match the actual allocation, not a generic 60/40 |
| IRA and Roth IRA | Custodian statements | Enter the Roth contribution basis separately if Boldin supports it |
| Expenses, working years | The FULL lens from the transaction register | Every dollar leaving the account today |
| Expenses, retired years | The RETIRED lens | Only after the exclusion table is confirmed |
| **Health insurance, pre-65** | FEHB annuitant premium at the **post tax** rate | Not the biweekly employee premium. See Defect Class 6. |
| Health insurance, 65 and after | Medicare Part B, Part D or the FEHB coordination benefit, plus any IRMAA | Boldin defaults are national averages, not your plan |
| Housing | Mortgage statement or lease | See Defect Class 9 |
| Each debt | Lender statement | Enter the balance and let Boldin amortize, then verify against your own amortization. See Defect Class 8. |
| Annual leave lump sum | Hours times the projected rate, capped by policy | A one time inflow in the retirement year or the following January. See Defect Class 7. |
| State of residence | Your actual state | State treatment of the FERS annuity varies materially. A wrong state setting taxes every income line incorrectly. |
| General inflation | Your stated assumption | |
| Medical inflation | Your stated assumption, higher than general | |
| Expected return | Set to match your actual allocation | |
| **Withdrawal strategy** | **Based on spending needs**, not a fixed percentage | See Defect Class 3. This is the highest impact single setting in the tool. |
| Required minimum distribution age | 75 if born 1960 or later, 73 if born 1951 to 1958 | See Defect Class 14 |

---

## PART 2: THE VALIDATION LOOP

Run this after the first setup, after any material entry change, and quarterly.

1. In Boldin, export the **planner summary CSV** for the scenario and download the **PDF report**. Save both to `05 Boldin` with the date in the file name.
2. Tell the assistant: `Run a Boldin validation against the export dated YYYY-MM-DD.`
3. It checks every line against the Facts Register and the source documents and produces `05 Boldin/Boldin Validation YYYY-MM-DD.md`.
4. The validation writes its defects into the next Entry Sheet in `08 Boldin Entry Sheets`, one row per field, rather than leaving them as prose to be interpreted.
5. Correct the defects in Boldin, marking each Entry Sheet row ENTERED as you go.
6. Re export and re run. Iterate until every remaining difference is explained.

A validation report is valid only against the export it was run on. Change an entry, and the prior validation is stale.

**One warning learned the hard way.** A PDF report and a CSV export can both be stale relative to the live plan. If a validation flags something you already fixed, re export before arguing with it. And the reverse: some defects are visible only by opening the entry's detail form inside Boldin rather than by reading the export. The COLA setting on a pension entry is one of them. A validation pass that reads only the export will miss it.

---

## PART 3: THE DEFECT CLASSES

Ordered by how much damage each one does. Each has a test and a fix.

### Class 1: A cost of living adjustment on the annuity before age 62

**The single largest risk in a FERS plan.** A FERS retiree who separates before age 62 receives no annuity cost of living adjustment until the adjustment following the 62nd birthday. The exceptions are law enforcement officers, firefighters, air traffic controllers, disability retirees, and survivors. Everyone else gets nothing.

**Test.** In the planner summary CSV, read the pension line across consecutive years before age 62. If it rises, a COLA is applied. Divide any year by the prior year to get the rate. Then open the pension entry's detail form inside Boldin and read the COLA field directly, because the export alone can hide it.

**Why it matters.** A tool that grows the annuity every year while growing expenses every year shows a plan that holds steady. The real plan does not hold steady during the bridge years. In one documented case, an annuity entered with a 2.54 percent historical average COLA running from the annuity start date read roughly $1,948 per month by age 62 against a correct $1,762, with the base permanently about 10.6 percent high thereafter. Correcting that field, together with the annuity start month in Class 2, accounted for eighty three percent of a $315,658 reduction in projected net worth at longevity.

**Fix.** Set the pension COLA to **None, 0 percent**.

**The refinement Boldin cannot do in one entry.** Boldin allows one COLA rate per pension entry. Setting it to zero is correct through age 62 but understates the years afterward, when the diet COLA does begin. To model it exactly, split the annuity into two pension entries: one at 0 percent from the annuity start date to the month before age 62, and a second at your assumed diet COLA rate from age 62 forward. If you do not split it, flag the understatement in the assumptions table rather than leaving it silent.

### Class 2: The annuity starting on the separation date

**Test.** Check the month the pension first appears in the CSV against the first day of the month **after** the separation date.

**Why it matters.** A FERS annuity commences the first day of the month following separation. A tool that starts it on the separation date shows no gap at all, and the months between the last paycheck and the first payment are exactly what the Cash Bridge Plan exists to cover. The error compounds with Class 1 because it gives the COLA one extra year to run.

**Fix.** Set the start date to the first of the month after separation. Then go further and model the OPM processing lag separately, because interim payments during adjudication are a fraction of the final amount.

### Class 3: Withdrawal strategy set to a fixed percentage

**The highest impact single setting in the tool.**

**Test.** Look for a withdrawal expense line that appears in years when the plan does not need it, with matching excess income flowing back into a taxable account.

**Why it matters.** A fixed percentage strategy forces a withdrawal every year whether the plan needs it or not, taxes it as ordinary income on the way out of the traditional TSP, and re saves the surplus into a taxable brokerage where the growth is taxed again. That is pure tax drag from a misconfigured setting, and it costs nothing in lifestyle to fix. In one documented case, changing this single setting moved the Chance of Success from 77 percent to 99 percent, moved net worth at longevity by more than two million dollars, and reduced lifetime income taxes by fifty seven thousand dollars.

The 4 percent rule is a **safety ceiling**, not a withdrawal mandate.

**Fix.** Set the strategy to **Based on spending needs**. Until this matches, your own model and Boldin cannot be compared at all.

**Caveat to state in every report after this fix.** A Chance of Success figure produced under a spending needs strategy is conditional on actually hitting the spending figures entered, which are a target rather than a trailing actual run rate. It is not a statement that the plan is already solvent.

### Class 4: The FERS Special Retirement Supplement entered wrongly

Four distinct errors live here. Check all four.

**4a. Entered when not eligible.** The supplement is payable only on an immediate unreduced annuity, meaning MRA with 30 years or age 60 with 20 years. It is not payable on MRA+10, on a deferred annuity, or on a disability annuity. **Test:** if the retirement scenario is MRA+10 and a supplement line exists, delete it.

**4b. Missing when eligible.** Boldin has no FERS supplement field. It must be entered as a separate income line, and it is easy to forget. **Test:** if the scenario qualifies and no separate line exists between the separation date and age 62, add it.

**4c. Given a cost of living adjustment.** The supplement never receives one. **Test:** read the line across years. If it rises, set the COLA to zero.

**4d. Not ending at 62.** It ends at the end of the month you turn 62, regardless of Social Security. **Test:** read the line past the 62nd birthday. If it continues, set the end date.

**And one more.** If you intend to work after retiring, model the supplement net of the earnings test: one dollar of reduction for every two dollars of earnings above the annual exempt amount, which was $24,480 for 2026, applied in the year after the earnings were made. Enter the reduced figure and note the assumption, or enter the gross figure and carry the reduction as a separate expense line. Either is defensible. Silently entering the gross figure while planning to work is not.

### Class 5: Social Security overstated

**Test.** Compare the Boldin Social Security line at the claiming year against your zero future earnings estimate, adjusted for cost of living increases between the estimate date and the claiming year. Any material excess is an overstatement.

**A specific trap in this test, learned by getting it wrong.** Boldin displays some figures in inflated future dollars and others in today's dollars. Comparing a COLA inflated Boldin figure against a today's dollars estimate manufactures a defect that does not exist. Before declaring an overstatement, open the Social Security entry's edit form and read the **full retirement age benefit** Boldin is deriving from, and compare that against your own full retirement age figure. That comparison is apples to apples. The claiming age figure is not.

**Cause of the real error.** The figure came from the Social Security statement, which projects current salary continuing until the claiming age. After retirement those are zero earning years.

**Fix.** Re enter Social Security using the zero future earnings estimate at full retirement age, and let Boldin apply the claiming age adjustment.

### Class 6: FEHB premium entered at the employee rate

**Test.** Compare the health insurance line in the retirement years against the FEHB **annuitant** premium table for your plan and enrollment code, and confirm the figure is treated as a post tax expense.

**Why it matters.** The government share is identical for annuitants and employees, so the sticker premium is the same. What changes is that the premium conversion plan covers current employees only, so an annuitant pays with post tax dollars. Entering the biweekly employee figure, or entering a pre tax figure, understates the real cost of the same coverage in every retirement year.

**Fix.** Enter the monthly annuitant premium for the specific plan and enrollment code, treated as an ordinary post tax expense. Then check that FEDVIP premiums are handled the same way.

**Second check in the same class.** Confirm the pre-65 and post-65 lines are separate entries with different amounts. Medicare Part B at $202.90 per month for 2026, plus any IRMAA, plus whatever FEHB premium remains, is a materially different figure from the pre-65 FEHB premium alone.

### Class 7: Annual leave lump sum at an unconfirmed figure

**Test.** Compare the one time inflow in the retirement year against hours times the projected hourly rate at separation, capped at the payable maximum.

**Why it matters.** The payment is not simply hours times the current hourly rate. The agency projects the leave forward as if you had stayed on duty, and any pay adjustment effective during that projected period is paid at the higher rate. A separation in late December therefore pays part of the lump sum at the following January's rate.

**Fix.** Compute it rather than carrying a remembered number. Confirm the payable cap in writing. Remember that the payment is ordinary wage income subject to FICA and Medicare withholding and that it **cannot** be deferred into the TSP, so the net figure is meaningfully lower than the gross.

### Class 8: Loan amortization mismatch

**Test.** Independently amortize every loan from the current balance, rate and payment. Compare year end balances against Boldin's, and compare the payoff date against what your plan assumes.

**Why it matters.** A payoff date wrong by a year moves the year in which the plan is tightest, which moves the size of the required spending cut. In one documented case an independent amortization moved a vehicle payoff nine months earlier than the plan assumed, shifted the binding year from 2030 to 2029, and reduced the required monthly cut by $132.47.

**Fix.** Whichever amortization reproduces the lender statement is correct. Correct the other one. It is common for Boldin to be right and the plan's assumption to be wrong. When that happens, say so first.

### Class 9: Housing inflated against a confirmed fixed cost

**Test.** Read the housing line across years. If it rises while the mortgage is fixed or the lease is confirmed flat, the inflation assumption is being applied to a cost that does not inflate.

**Fix.** Correct the years where the cost is confirmed. Beyond the confirmed term, an inflation assumption is an assumption rather than an error, and it runs in the conservative direction. Flag it rather than removing it. Note that Boldin applies general inflation to expenses without a per entry override in some versions, so this may require a workaround or an accepted overstatement.

### Class 10: Retired spending does not match the RETIRED lens

**Test.** Compare the Boldin retired expense total against the RETIRED lens from the most recent monthly report.

**Cause.** Usually a round number entered early and never revisited, or the FULL lens entered into the retired field.

**Fix.** Re enter from the current RETIRED lens. Re run after every material change to the exclusion table.

**Distinguish a data error from a target.** If the entered figure is higher than the sustainable figure, that is not necessarily an error. It may be a target the plan cannot yet reach. Lowering it is a decision about how hard to cut, not a data fix, and the validation report should say which one it is.

### Class 11: Starting asset base disagrees

**Test.** Sum every account in the Facts Register against the Boldin total. Agreement within half a percent is fine. Anything larger means an account is missing, duplicated, or stale.

**Fix.** Reconcile account by account. A forgotten old employer account or a duplicated rollover is the usual cause. For a federal employee, check specifically that the traditional and Roth TSP balances are entered once each and not double counted.

### Class 12: Contributions that do not stop at retirement

**Test.** Read the contribution lines past the retirement year. The FERS employee contribution, FICA and Medicare on wages, and TSP contributions all stop when the paycheck stops.

**Fix.** End every contribution at the separation date. Contributions running past retirement inflate both the ending balance and the modeled expenses, and the two errors do not cancel.

### Class 13: Medicare and IRMAA not modeled from 65

**Test.** Read the health care line from age 65 forward. If it does not step at 65, Medicare is not modeled. Then check whether any income related monthly adjustment amount appears in years where projected income crosses a threshold.

**Why it matters.** The adjustment uses income from two years prior. That means a Roth conversion at 63 raises the Part B premium at 65, and the final high earning years before separation set the premium two years into retirement. It is a planning constraint, not a surprise.

**Fix.** Enter the standard Part B premium, any Part D or FEHB coordination cost, and the IRMAA tier that projected income produces. Re check after every change to the Roth conversion plan.

### Class 14: Required minimum distribution age set wrong

**Test.** Read the year in which required distributions first appear and compare against the applicable age for the date of birth: 75 for anyone born in 1960 or later, 73 for those born 1951 through 1958.

**Why it matters.** Two extra years of no forced distributions is two more years of Roth conversion room, and the size of the balance that eventually gets forced out changes with it.

**Fix.** Set the correct age. Also confirm that the Roth balance is excluded from the required distribution calculation, because under current law the Roth TSP is not subject to lifetime required minimum distributions.

### Class 15: High-3 fed from W-2 gross pay

**Test.** Compare the salary figure driving the pension against basic pay plus locality from the leave and earnings statement, not against W-2 gross.

**Why it matters.** W-2 gross includes overtime, awards, bonuses and the annual leave lump sum, none of which are basic pay and none of which count toward the high-3. A high-3 built from W-2 gross overstates the annuity for the rest of the plan.

**Fix.** Use basic pay plus locality. If the agency annuity estimate and your own computation diverge by more than two percent, this is the first place to look.

---

## PART 4: READING THE CHANCE OF SUCCESS

Boldin reports a Chance of Success percentage. It is useful and it is not a verdict.

Three things to hold in mind:

1. **It is only as good as the inputs.** A plan showing 85 percent on an annuity that wrongly receives a COLA before age 62 is not an 85 percent plan.
2. **Direction matters more than level.** Every validation report must state which defects flatter the plan and which understate it. Two errors of similar size in opposite directions do not cancel, because they act on different years.
3. **It answers one question.** It says whether the money lasts under the modeled assumptions. It does not say whether the plan is a good idea, whether the spending level is right, or whether an extra year of work is worth what it costs in years of health.

Treat the figure as an instrument reading. Ask what the instrument is measuring before deciding whether to trust it.

---

## PART 5: THE STANDING CHECKLIST

Run this list against every new Boldin export.

- [ ] Pension COLA is 0 percent for every year before age 62
- [ ] Pension COLA from age 62 reflects the diet COLA, or the understatement is flagged
- [ ] Pension start date is the first of the month after separation
- [ ] Pension amount matches an agency estimate run for that same separation date
- [ ] Survivor election is reflected in the entered annuity amount
- [ ] FERS Special Retirement Supplement is present only if the scenario is eligible
- [ ] Supplement has 0 percent COLA and ends the month of the 62nd birthday
- [ ] Supplement is modeled net of the earnings test if post retirement work is planned
- [ ] Social Security uses the zero future earnings estimate at full retirement age
- [ ] FEHB is entered at the annuitant premium, treated as post tax
- [ ] Pre-65 and post-65 health lines are separate entries
- [ ] Medicare Part B and any IRMAA appear from age 65
- [ ] Annual leave lump sum is computed and capped, net of FICA and Medicare
- [ ] Every loan amortization reproduces the lender statement
- [ ] Housing matches the confirmed cost for the confirmed term
- [ ] Retired expenses match the current RETIRED lens, or the gap is identified as a target
- [ ] Withdrawal strategy is based on spending needs
- [ ] Total assets agree with the Facts Register within half a percent
- [ ] Traditional and Roth TSP are entered separately and not double counted
- [ ] All contributions end at the separation date
- [ ] Required minimum distribution age matches the birth year
- [ ] Roth balances are excluded from the required distribution calculation
- [ ] Salary driving the pension is basic pay plus locality, not W-2 gross
- [ ] State of residence is correct and the state tax treatment of the annuity matches that state
- [ ] General and medical inflation rates match the Facts Register
- [ ] Expected return matches the actual TSP and portfolio allocation
- [ ] Longevity age matches your stated assumption
