# BOLDIN FIELD MAP AND ENTRY ENGINE

This file does two jobs. Part 1 through Part 3 map the Boldin planner screen by screen and field by field, and tie each field to the document and the interview block that produce its value. Part 4 specifies the Entry Sheet, which is the deliverable that turns processed data into instructions precise enough to type into Boldin without thinking.

**Relationship to the Boldin validation guide.** `docs/05-boldin-setup-and-validation.md` tells you what is wrong and how to test for it. It is the defect side of the loop. This file tells you where every value goes and what to type, and it is the entry side of the loop. The validation guide runs after an export. This file runs before one. Neither replaces the other, and the fifteen defect classes in the Boldin validation guide are cited here by number rather than repeated.

## PROVENANCE, READ THIS FIRST

The Boldin product structure below was compiled on 2026-09-15, and the two halves of it carry different weight.

**Observed live** in a signed-in Boldin planner on 2026-09-15: every navigation section, every sub-section, every section URL, the attributes shown on list rows, the tax allocation categories, and the milestone events the projection engine recognizes. These are facts about the product as it stood on that date.

**From Boldin's own help documentation**, not observed in the form: the individual input labels inside the add and edit dialogs. The dialogs could not be opened reliably through browser automation during the mapping pass, so the field lists below come from Boldin Help Center articles, cited in the source log. Treat them as accurate but unconfirmed against the live form.

**First-run duty.** On the first Entry Sheet, open one add dialog per section on screen and compare it against the field list here. Correct anything that differs and record the correction with its date at the bottom of this file. From then on, the map is confirmed for the sections walked. Boldin ships changes frequently, so re-verify any field before a large entry session, and never report a field as entered without seeing it on screen.

**What is FERS specific.** Boldin has no FERS field, no supplement field, and no federal anything. Every FERS structure in this file is a general-purpose Boldin field being used to carry a federal value, which is the reason the mapping has to be written down rather than remembered.

---

## PART 1: THE STRUCTURE, AS OBSERVED

The planner is nine screens, seven of which hold data and drive a plan-completion counter.

| Screen | URL path | Sub-sections |
|---|---|---|
| Overview | `/planner/dashboard` | Dashboard only, no entry |
| Summary | `/planner/myplan/summary` | Retirement age, Longevity age, Scenario notes, My Financial Journey with Add event, plan completion counter |
| Connections | `/planner/myplan/connections` | Financial institution links, and association of linked accounts to manual entries |
| Assets and Debts | `/planner/myplan/assets` | Savings, Other assets, Non-mortgage debts |
| Home and Real Estate | `/planner/myplan/housing` | Primary residence, Future changes to primary residence, Other owned real estate, Future real estate purchases, Future real estate sales |
| Income | `/planner/myplan/income` | Work, Social Security, Passive income, Pensions, Annuities, Windfalls |
| Expenses and Healthcare | `/planner/myplan/expenses` | Recurring expenses, One-time expenses, Medical expenses before 65, Medicare expenses 65 through longevity, Long-term care |
| Money Flows | `/planner/myplan/moneyflows` | Recurring contributions, Excess income, Withdrawal strategy, Withdrawal order, Transfers |
| Estate Planning | `/planner/myplan/estate` | Financial legacy goal, Estate planning documents |
| Rate Assumptions | `/planner/myplan/assumptions` | General inflation, Medical inflation, Social Security COLA, Housing appreciation |

Header controls sit above every screen: a scenario selector, an Adjust scenario forecast control, an Assumptions control, and Ask Boldin.

Savings rows display account name, account type, current balance, and rate of return with a risk label. Savings totals break out by tax treatment into Taxable, Tax-deferred, and Tax-free. For a federal employee that means the traditional TSP, the Roth TSP, and a taxable brokerage account land in three different totals, which is the fastest visual check that the TSP was entered as two accounts rather than one.

The projection engine recognizes these milestone events: retirement age reached, pension start, windfall received, one-time expense, Social Security start, Medicare start, required minimum distributions start, longevity reached. This matters because an event that does not appear on the Summary timeline was not entered in a way the engine understood. A FERS annuity that does not produce a pension start marker, or an annual leave lump sum that does not produce a windfall marker, was entered into the wrong field.

---

## PART 2: FIELD INVENTORY AND SOURCE MAPPING

Each table gives the field, the document or process that produces its value, the interview block from `MASTER-PROMPT.md` that captures it, and the trap attached to it. Defect class numbers refer to the Boldin validation guide.

### 2.1 Summary: the plan spine

| Field | Value comes from | Block | Trap |
|---|---|---|---|
| Date of birth | SF 50 or identity document | Block 1 | Drives every age-triggered event, including the Minimum Retirement Age and the required minimum distribution age |
| Retirement age | The eligibility date table, not preference | Block 1 | Enter the **earliest immediate unreduced date** as the base scenario. Build the preferred date as a separate scenario, never as the base. |
| Longevity age | The user's stated assumption | Block 13 | Boldin seeds this from average life expectancy. Set it deliberately. |
| Scenario notes | The Entry Sheet header | Entry Sheet | Record which Entry Sheet a scenario reflects, so a stale scenario is identifiable |

### 2.2 Assets and Debts

**Savings account fields**

| Field | Value comes from | Block | Trap |
|---|---|---|---|
| Account name | Statement | Block 6 | Name it exactly as the statement does, so validation can match rows. Use `TSP Traditional` and `TSP Roth` as two separate names. |
| Account type | Statement | Block 6 | The TSP is a 401(k)-type employer plan for contribution-limit purposes. Select the specific employer plan type, not "other". The type sets the limit the engine applies, and the elective deferral limit is shared across traditional and Roth TSP. |
| Current balance | Statement, with its date | Block 6, monthly cycle | Every balance carries the as-of date it came from |
| Tax treatment | Account type and holdings | Block 6 | Traditional TSP is tax-deferred. Roth TSP is tax-free. A taxable brokerage holding bonds is ordinary income, holding equities is capital gains. See Defect Class 11. |
| Cost basis | Custodian statement | Block 6 | Taxable accounts only. Missing basis distorts both tax and growth. |
| Turnover rate | Fund documents | Block 6 | Taxable accounts only |
| Dividend yield | Fund documents | Block 6 | Taxable accounts only |
| Rate of return | The actual TSP fund allocation, not a default | Block 13 | A G Fund heavy balance must not carry a blended equity return, and an L Fund glide path changes the return over time. Set it to match what the account actually holds. |
| Roth contribution basis | Roth IRA custodian statement | Block 6 | Governs penalty-free access to contributions before age 59 and a half. Enter it separately if Boldin supports it. |

**Non-mortgage debt fields**

| Field | Value comes from | Block | Trap |
|---|---|---|---|
| Debt name, balance, interest rate, monthly payment | Lender statement | Block 12 | Amortize independently and confirm Boldin's payoff year matches. A payoff date wrong by a year moves the tightest year of the plan. See Defect Class 8. |
| TSP loan, if any | TSP statement | Block 6 | An outstanding TSP loan at separation becomes a taxable distribution if it is not repaid. Model it as a debt and as a tax event, not as a debt alone. |

### 2.3 Home and Real Estate

| Field | Value comes from | Block | Trap |
|---|---|---|---|
| Own or rent, and monthly cost | Lease or mortgage statement | Block 12 | Confirm the renewal or the fixed term. Boldin inflates housing by default. See Defect Class 9. |
| Mortgage principal, rate, term, payment | Lender statement | Block 12 | **Property tax and home insurance do not belong in the mortgage field.** Enter them as Recurring Expenses or they are double counted or lost. |
| Future changes to primary residence | The user's stated plans | Block 12 | A planned downsize or relocation is a scenario, not a base case, until the user decides. A move across state lines also changes the state tax treatment of the annuity, so it is never only a housing change. |

### 2.4 Income

**Work**

| Field | Value comes from | Block | Trap |
|---|---|---|---|
| Annual salary | Leave and earnings statement, basic pay plus locality, annualized on 26 pay periods | Block 8 | Not W-2 gross. Overtime, awards and bonuses are not basic pay and they do not belong in the figure that drives the high-3. See Defect Class 15. |
| Work stop age or date | The separation date from Block 5 | Block 5 | Must match the separation date used everywhere else, including the contribution end dates in Money Flows |
| Post-retirement work, if any | The user's stated plans | Block 4 | Earnings after retirement trigger the FERS Special Retirement Supplement earnings test. Model the reduced supplement or carry the reduction as a separate expense line, and say which. |

**Social Security**

| Field | Value comes from | Block | Trap |
|---|---|---|---|
| Do you expect to receive Social Security | Yes | Block 7 | |
| Benefit entry method | Manual entry, never the automatic estimate | Block 7 | The automatic estimate uses the income currently active in the plan, so it assumes the user keeps earning. Turn it off. |
| **Primary Insurance Amount** | The **zero future earnings** estimate figure **at full retirement age** | Block 7 | **Boldin wants the benefit at full retirement age, not the benefit at the age the user plans to claim.** Entering the age-62 figure understates the plan. Entering a statement figure that assumes continued earnings overstates it. Both errors are common and they point in opposite directions. See Defect Class 5. |
| Claiming age | The chosen claiming age | Block 7, Social Security Claiming Analysis | Boldin applies the reduction or the delayed retirement credit itself. Do not pre-reduce the Primary Insurance Amount. |
| Social Security COLA | Rate Assumptions screen | Block 13 | Set once, applies globally |

**Pensions, monthly. The FERS annuity goes here, and so does the supplement.**

The FERS annuity needs **two** pension entries, and the FERS Special Retirement Supplement needs **a third**. Boldin allows one COLA rate per pension entry, and FERS applies two different rates across the life of one annuity.

| Entry | Field | Value comes from | Block | Trap |
|---|---|---|---|---|
| 1. FERS annuity, pre-62 | Descriptive name | `FERS Annuity pre-62, [separation date]` | Block 3 | Name it so the scenario it belongs to is unmistakable |
| 1 | Monthly pre-tax income | The agency annuity estimate run for **that same separation date**, at the survivor election actually modeled | Block 3, Block 11 | Pre-tax, not net. Do not reuse one estimate across several retirement dates. The survivor reduction of 10 percent or 5 percent must already be inside this figure. |
| 1 | Start age or date | **The first day of the month after separation** | Block 5, Cash Bridge Plan | **The annuity does not begin on the separation date.** The gap between the last paycheck and the first full payment is the whole reason the Cash Bridge Plan exists, and an annuity that starts immediately hides it. See Defect Class 2. |
| 1 | End age | The month before the 62nd birthday | Block 3 | |
| 1 | Annual COLA rate | **Zero** | Block 3, Defect Class 1 | **A regular FERS retiree receives no annuity cost of living adjustment until the adjustment following the 62nd birthday.** This is the single largest error available in a FERS plan. The exceptions are law enforcement officers, firefighters, air traffic controllers, disability retirees and survivors. |
| 2. FERS annuity, 62 forward | Monthly pre-tax income | The same annuity, carried forward at the age-62 amount | Block 3 | If the two entries are not split, flag the post-62 understatement in the assumptions table rather than leaving it silent |
| 2 | Start age | 62 | Block 3 | |
| 2 | Annual COLA rate | The assumed diet COLA | Block 13 | The FERS adjustment is the Consumer Price Index increase reduced by one percentage point when that increase exceeds two percent, and it is capped at two percent when the increase is between two and three percent. Enter the assumption, label it, and do not enter the full CPI rate. |
| 3. FERS Special Retirement Supplement | Descriptive name | `FERS Supplement, ends at 62` | Block 4 | **Enter nothing at all on an MRA+10 or a deferred path.** The supplement is payable only on an immediate unreduced annuity. See Defect Class 4. |
| 3 | Monthly pre-tax income | The supplement computation from Block 4, net of the earnings test if post-retirement work is planned | Block 4 | |
| 3 | Start age or date | The annuity commencing date, except on a VERA early out where it is the Minimum Retirement Age | Block 4 | |
| 3 | End age | **62** | Block 4 | It ends at the end of the month of the 62nd birthday, regardless of whether Social Security is claimed |
| 3 | Annual COLA rate | **Zero, always** | Block 4 | The supplement never receives a cost of living adjustment |
| All three | Tax treatment | Federal taxable. State treatment varies. | Block 13, Tax Strategy | A wrong state of residence taxes every income line incorrectly |
| All three | Survivor benefit | The election from Block 11 | Block 11 | Must match the election whose reduction is already inside the amount field |

**Windfalls. The annual leave lump sum goes here.**

| Field | Value comes from | Block | Trap |
|---|---|---|---|
| Amount | Hours times the projected hourly rate at separation, capped at the payable maximum | Block 5 | Compute it. Never carry a remembered figure. The agency projects the leave forward as if the user had stayed on duty, so a pay adjustment effective inside that projected period is paid at the higher rate. See Defect Class 7. |
| Date | The retirement year, or the following January if the separation falls late in December | Block 5 | |
| Destination account | A real account with a real rate of return | Block 6 | The payment is ordinary wage income subject to FICA and Medicare withholding, and it **cannot** be deferred into the TSP. State whether the entered amount is gross or net and be consistent. |

**Pensions taken as a lump sum, and Annuities** follow the same shape, with the amount entered in **future dollars** and a destination account selected. A TSP life annuity purchase belongs here rather than in Savings, and it is one of the irreversible elections, so it is modeled as a scenario before it is modeled as a fact.

### 2.5 Expenses and Healthcare

| Field | Value comes from | Block | Trap |
|---|---|---|---|
| Recurring expenses, working years | The **FULL** lens | Block 9, monthly cycle | Every dollar leaving the account today |
| Recurring expenses, retired years | The **RETIRED** lens | Block 9, monthly cycle | Only after the exclusion table is confirmed. Re-enter after every material change to that table. See Defect Class 10. |
| Property tax and home insurance | Tax bill and policy | Block 12 | Entered here, not in the mortgage field |
| One-time expenses | The user's stated plans | Block 12 | **Enter in future dollars.** Boldin does not inflate a one-time expense for you. Confirm the funding source holds enough, or set the funding source to the withdrawal order. |
| Medical expenses before 65 | The Health Care Bridge analysis | Block 10 | Enter the FEHB **annuitant** premium at the **post tax** rate, not the biweekly employee premium. The premium conversion plan covers current employees only. Add FEDVIP the same way. See Defect Class 6. |
| Medicare expenses, 65 through longevity | Part B, plus Part D or the FEHB coordination cost | Block 10 | Include the income-related monthly adjustment if projected income crosses the threshold. It uses income from two years prior, which constrains Roth conversions at 63 and 64. See Defect Class 13. |
| Long-term care | Policy, or the absence of one | Block 12 | |

The pre-65 and post-65 health lines are always separate entries with different amounts. A single health line that does not step at 65 means Medicare was never modeled.

### 2.6 Money Flows

| Field | Value comes from | Block | Trap |
|---|---|---|---|
| Recurring contributions, TSP | Contribution per pay period times 26, plus the agency automatic 1 percent and the agency match | Block 6, Block 8 | The match is real money and it is easy to omit. Enter the employee deferral and the agency money, and state which is which. |
| Recurring contributions, IRA or Roth IRA | Custodian statement | Block 6 | |
| Contribution end date | The separation date | Block 5 | **Every contribution stops when the paycheck stops.** The TSP deferral, the agency match, the FERS employee contribution, and FICA and Medicare on wages all end. Contributions running past retirement inflate the ending balance and the modeled expenses at the same time. See Defect Class 12. |
| Excess income destination | A real account with a real rate of return | Block 6 | A default destination earning zero silently destroys projected growth |
| Withdrawal strategy | **Based on spending needs** | Block 14, Defect Class 3 | **Not a fixed percentage.** Fixed percentage forces withdrawals above need, taxes them on the way out of the traditional TSP, re-saves the surplus into a taxable account where the growth is taxed again, and makes every withdrawal rate figure incomparable with the baseline model. This is the highest impact single setting in the tool. |
| Withdrawal order | Set deliberately | Tax Strategy | Taxable first, then tax-deferred, then Roth is the common default, and it is not automatically right. The Roth conversion window between separation and the required beginning date usually argues for something else. |
| Transfers, including Roth conversions | Tax Strategy analysis | Tax Strategy | One transfer per conversion year, at the amount that fills the target bracket. Check the effect on the income-related Medicare adjustment two years later. |

### 2.7 Estate Planning and Rate Assumptions

| Field | Value comes from | Block | Trap |
|---|---|---|---|
| Financial legacy goal | The user's stated intent | Block 13 | A legacy goal changes what counts as success. Set it, or set it to zero on purpose. |
| Estate planning documents | The document inventory | Block 11 | A checklist, not a projection input. The FEGLI election and the beneficiary designations belong to Block 11, and a designation on file beats a will. |
| General inflation | The user's stated assumption | Block 13 | |
| Medical inflation | The user's stated assumption | Block 13 | Should exceed general inflation |
| Social Security COLA | The user's stated assumption | Block 13 | This is not the FERS diet COLA. They are different rates and they are entered in different places. |
| Housing appreciation | The user's stated assumption | Block 12 | Irrelevant while renting, material once owning |

---

## PART 3: THE REVERSE MAP, DOCUMENT TO FIELDS

When a document lands in `01 Source Documents`, these are the fields it touches. This is the table the Entry Sheet generator reads.

| Document | Boldin fields it updates |
|---|---|
| SF 50, most recent, plus the written retirement SCD confirmation. Block 31 of the SF 50 is the **leave** SCD and must not be used here | Date of birth, retirement age, and the creditable service that drives the annuity figure |
| Military service deposit status letter, where there is military service | The creditable service behind the annuity figure, and a one time expense for the deposit itself if it is still unpaid |
| Agency annuity estimate for a specific date | Pension monthly pre-tax income for entries 1 and 2, start date, survivor reduction |
| FERS supplement computation, Block 4 | Supplement pension entry amount, start date, end age 62 |
| Leave and earnings statement | Work annual salary, TSP contribution per pay period, agency match, FEHB premium at the employee rate for reference only |
| Leave balance and the agency lump sum policy | Windfall amount and date, and the sick leave credit that feeds the annuity figure |
| TSP statement | Account type, traditional and Roth balances entered separately, rate of return by fund allocation, contribution, any outstanding loan |
| IRA and Roth IRA custodian statements | Account balance, rate of return, contribution, and the Roth contribution basis |
| SSA zero future earnings estimate | Social Security Primary Insurance Amount at full retirement age, claiming age |
| Transaction register export | Recurring expenses under both the FULL and the RETIRED lenses |
| FEHB annuitant premium table for the plan and enrollment code | Medical expenses before 65, and the post-65 FEHB coordination cost |
| FEDVIP and FEGLI statements | Medical expenses before 65, recurring expenses, and the FEGLI post-65 reduction schedule |
| Lender statements | Non-mortgage debt balance, rate and payment, and the mortgage fields if owning |
| Lease or mortgage statement | Primary residence cost and term |
| Property tax bill and insurance policies | Recurring expenses, entered separately from the mortgage |
| Tax returns | Withdrawal order, Roth conversion transfers, and the income that sets the Medicare adjustment two years later |

---

## PART 4: THE ENTRY SHEET

**This is the deliverable that closes the loop.** Every time documents are processed or a report is produced, the output includes an Entry Sheet: the exact values to type into Boldin, where each one goes, and what it replaces.

**Location.** `08 Boldin Entry Sheets/Boldin Entry Sheet YYYY-MM-DD.md`, built from `templates/boldin-entry-sheet.md`.

**Trigger.** Automatic. Any turn that processes a source document, runs the monthly cycle, or produces an analysis that changes a Boldin input also produces or appends to the Entry Sheet for that date. The user never has to ask.

**Format.** One row per field. No prose in the table.

| # | Screen | Sub-section | Item | Field | Enter this | Replaces | Source | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | Income | Pensions | FERS Annuity pre-62 | Annual COLA rate | 0% | 2.5% | Defect Class 1, validation guide | NOT STARTED |
| 2 | Money Flows | Withdrawal strategy | Plan | Strategy | Based on spending needs | Fixed percentage | Defect Class 3, validation guide | NOT STARTED |
| 3 | Income | Social Security | Social Security | Primary Insurance Amount | $X monthly at full retirement age | $Y | SSA zero future earnings estimate YYYY-MM-DD | NOT STARTED |

**Rules for every row.**

1. **One field per row.** Never bundle two fields into one instruction.
2. **The value is typed exactly as Boldin wants it.** Monthly where Boldin asks monthly, annual where annual, percent where percent, future dollars where future dollars. Convert in the sheet, not in the user's head. State the unit inside the value itself.
3. **Name what it replaces.** If the current value is unknown, write `unknown, read it off the screen first`. A row that cannot say what it replaces cannot be verified afterward.
4. **Cite the source.** File name and page, or the report that derived it, or `user-stated` with the date, or the defect class from the Boldin validation guide. No row without a source.
5. **Order by impact.** The field that moves the plan most goes first, so a session that stops halfway still captured the important half. For a FERS plan that ordering usually starts with the annuity COLA, the withdrawal strategy, the annuity start date, and the supplement.
6. **Flag anything irreversible or structural.** Changing the withdrawal strategy, the scenario base, or the survivor election changes every downstream figure. Mark those rows and explain the consequence in a note below the table.
7. **Status column** starts at NOT STARTED, and each row is marked ENTERED as it is done. An Entry Sheet with open rows is carried into the next one rather than abandoned.
8. **Never invent a value to fill a row.** If the input is missing, write `BLOCKED` in the Status column, name the document that would unblock it, and add it to `06 Open Items/Open Items.md`.

**The sheet closes with three short sections.**

- **What changes as a result.** The expected direction of the effect on Chance of Success, stated before anything is entered, so that a surprise afterward is a signal rather than a mystery.
- **Re-export instruction.** After entering the rows, export the planner summary CSV and the PDF report to `05 Boldin`, then run a validation against the new export. An Entry Sheet is not finished until the validation confirms the values landed.
- **Field map corrections.** Anything on screen that did not match this file, recorded with the date, so the map self-corrects.

---

## PART 5: THE FULL LOOP

```
Document arrives in 01 Source Documents
        |
        v
Processed, figures extracted, written to 02 Baseline/Facts Register.md with sources
        |
        v
Reports updated where the figure changes them
        |
        v
ENTRY SHEET generated in 08 Boldin Entry Sheets
        |
        v
User types the rows into Boldin, marking each ENTERED
        |
        v
Re-export planner summary CSV and PDF to 05 Boldin
        |
        v
Boldin Validation Report run against the new export
        |
        v
Defects found go back into the next Entry Sheet
```

The loop closes. That is the point. A value is not considered entered because an Entry Sheet told the user to enter it. It is considered entered when the next export shows it.

---

## PART 6: THE TWELVE THINGS MOST LIKELY TO BE WRONG IN A FERS PLAN

Ordered by how much damage each one does. Check these first on every export. Each maps to a defect class in the Boldin validation guide.

1. **A cost of living adjustment on the annuity before age 62.** Must be zero. Defect Class 1.
2. **Withdrawal strategy left on fixed percentage** instead of based on spending needs. Defect Class 3.
3. **The annuity starting on the separation date** instead of the first of the following month, which hides the cash bridge entirely. Defect Class 2.
4. **The FERS Special Retirement Supplement entered on an MRA+10 or a deferred path**, where it is not payable at all. Defect Class 4a.
5. **The supplement missing on a path that qualifies for it**, because Boldin has no field that prompts for it. Defect Class 4b.
6. **The supplement given a COLA, or not ended at 62.** Defect Classes 4c and 4d.
7. **Social Security entered from the statement figure** rather than the zero future earnings estimate at full retirement age. Defect Class 5.
8. **FEHB entered at the biweekly employee premium** rather than the monthly annuitant premium treated as post tax. Defect Class 6.
9. **Contributions not ended at the separation date.** Defect Class 12.
10. **Traditional and Roth TSP entered as one account**, or entered twice. Defect Class 11.
11. **Rate of return that does not match the actual TSP fund allocation.**
12. **One-time expenses entered in today's dollars** where Boldin expects future dollars.

---

## FIELD MAP CORRECTIONS

Record every difference found between this map and the live product, with the date it was found. A correction recorded here is what keeps the map usable after Boldin ships a change.

| Date | Screen and field | What this file said | What the screen showed |
|---|---|---|---|
| | | | |

---

## SOURCE LOG

1. Boldin planner, signed-in session observed 2026-09-15. Navigation structure, section URLs, sub-section names, list-row attributes, tax allocation categories, and recognized milestone events. `https://www.boldin.com/planner`
2. Boldin Help Center, Social Security: How do I enter my benefit. Confirms the field is the Primary Insurance Amount at full retirement age, that claiming age is selected separately, and that the automatic estimate uses income currently active in the plan. https://help.boldin.com/en/articles/4315544-social-security-how-do-i-enter-my-benefit
3. Boldin Help Center, How to enter a pension in your plan. Monthly pension fields including recipient, type, descriptive name, monthly pre-tax income, start and end ages, annual COLA rate, tax treatment, and survivor benefit; lump-sum fields including future-dollar amount and destination account. https://help.boldin.com/en/articles/5805678-how-to-enter-a-pension-in-your-plan
4. Boldin Help Center, 10 Common Boldin Planner Mistakes and How to Fix Them. Account type and contribution limits, excess income destination, tax treatment by holding, cost basis and turnover, property tax and insurance entered separately from the mortgage, one-time expenses in future dollars, and funding-source sufficiency. https://help.boldin.com/en/articles/11478217-10-common-boldin-planner-mistakes-and-how-to-fix-them
5. Boldin Help Center, Understanding the assumptions behind your Boldin plan. The four rate assumptions and their defaults, the optimistic, average and pessimistic scenario toggle, longevity seeding, and the today's dollars versus future dollars display toggle. https://help.boldin.com/en/articles/4789289-understanding-the-assumptions-behind-your-boldin-plan
6. Boldin Help Center, Taxable Accounts Update: Checking, Savings, and Investments. Checking, savings and investment categorization, the ordinary income versus capital gains treatment toggle, and the cost basis, turnover rate and dividend yield fields it reveals. https://help.boldin.com/en/articles/12315827-taxable-accounts-update-checking-savings-and-investments

Every FERS rule cited in this file is sourced in `docs/06-fers-rules-reference.md`. Every defect class is specified in `docs/05-boldin-setup-and-validation.md`. Nothing in this file is a substitute for either.
