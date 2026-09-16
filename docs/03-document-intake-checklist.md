# DOCUMENT INTAKE CHECKLIST

Everything here goes into `01 Source Documents`, unedited, under the file names given in the last column. If you chose to keep raw documents private, put them in your private folder instead and tell Claude which folder holds them. Consistent names let the assistant find and cite a document without asking you where it is.

Priority key:

- **P1** blocks the interview. Get these first.
- **P2** blocks the Readiness Baseline.
- **P3** blocks a specific analysis but not the baseline.

Every document below feeds specific Boldin fields. Part 3 of `docs/07-boldin-field-map-and-entry-engine.md` is the reverse map, document to fields, and it is what turns an arriving document into an Entry Sheet without anyone deciding by hand what the document touched.

---

## TIER 1: FERS SERVICE AND ELIGIBILITY (P1)

| Document | Where to get it | Why it matters | File name |
|---|---|---|---|
| **Service Computation Date for retirement purposes, in writing** | Agency benefits office or the eOPF | Decides your eligibility dates and your years of service in the annuity formula. It is frequently different from your leave SCD, and only this one governs. | `SCD Retirement Confirmation YYYY-MM-DD.pdf` |
| Most recent leave and earnings statement | Agency payroll system (Employee Express, myPay, EPP, or your agency equivalent) | Basic pay, locality, every deduction line, and the sick and annual leave balances | `LES YYYY-MM-DD.pdf` |
| Agency retirement annuity estimate, run for each candidate separation date | Agency benefits portal, or request from the benefits officer in writing | The reference figure your independent computation is checked against | `Annuity Estimate YYYY-MM-DD Sep YYYY-MM-DD.pdf` |
| SF 50 for every appointment in your federal career | eOPF, Personnel Actions | Establishes every appointment type, every break, and whether retirement deductions were withheld in each period | `SF50 YYYY-MM-DD [action].pdf` |
| Salary history for the last four years at minimum | eOPF SF 50s, or payroll records | The high-3 is time weighted across three consecutive years, so effective dates matter as much as amounts | `Salary History Basic Pay.xlsx` |
| DD-214 for every period of military service | Your records, milConnect, or the National Personnel Records Center through eVetRecs or Standard Form 180 | Post-1956 military service counts only if a deposit is paid, and only before separation | `DD214 [branch] YYYY.pdf` |
| Military service deposit status letter | Agency benefits office or payroll provider | Tells you whether the deposit is paid, in progress, or never started, and the current balance with interest | `Military Deposit Status YYYY-MM-DD.pdf` |
| Estimated earnings statement from the branch of service, if the deposit is not already paid | Request it with form RI 20-97, one per branch served, addresses on the back of the form. Allow about 60 business days | The deposit is 3 percent of military basic pay, so this statement is the only thing that prices it | `RI20-97 Estimated Earnings [branch] YYYY.pdf` |
| SF 3108 and SF 3108A, if a deposit application has been filed | Your copy, or the agency benefits office | SF 3108A carries the Interest Accrual Date, which is what determines the interest you owe | `SF3108 Military Deposit YYYY.pdf` |
| Military deposit paid in full letter, and the corrected retirement SCD that follows it | Agency benefits office or payroll provider | A deposit is not proven paid until this letter exists. Keep both documents together | `Military Deposit Paid In Full YYYY-MM-DD.pdf` |
| Refund or redeposit records, if you ever took a refund of retirement contributions | Agency benefits office, OPM | Refunded FERS service counts for eligibility but not for computation unless redeposited | `FERS Refund Record YYYY.pdf` |

**Note on the Service Computation Date.** If the only SCD you can find is on your leave and earnings statement or in Block 31 of an SF 50, that is the leave SCD. The retirement SCD is not printed on the SF 50 at all. The leave SCD credits military service and certain other time that the retirement SCD does not credit until a deposit is paid. Request the retirement SCD from your benefits office in writing and file the reply here. Every annuity figure in your plan depends on it.

**Note on military service.** If you served after 1956 and have never paid the deposit, that service is currently worth nothing toward your FERS retirement, for eligibility or for the computation. Three documents close the gap, in this order: the DD-214 proves the service, the RI 20-97 estimated earnings statement prices it, and the SF 3108 with SF 3108A applies to pay it. The deposit must be paid in full before you separate, and the whole sequence commonly takes six months, so start it the day you find it open.

---

## TIER 2: SOCIAL SECURITY (P1)

| Document | Where to get it | Why it matters | File name |
|---|---|---|---|
| Social Security Statement | ssa.gov, my Social Security account | Earnings record and the benefit projection at 62, at full retirement age, and at 70 | `SSA Statement YYYY-MM-DD.pdf` |
| **Zero future earnings estimate** | ssa.gov Retirement Calculator inside your my Social Security account, with expected average future earnings set to $0 | The statement assumes you keep earning your current salary until you claim. After retirement those are zero earning years and the real benefit is lower. | `SSA Estimate Zero Earnings YYYY-MM-DD.pdf` |
| Full earnings history | Inside the statement | Confirms the 35 year computation base and catches missing years | included above |
| Spouse's Social Security statement, if married | ssa.gov, spouse's own account | Spousal and survivor benefits, and the joint claiming decision | `SSA Statement Spouse YYYY-MM-DD.pdf` |

The zero earnings run is not optional. Skipping it overstates lifetime Social Security income, and because the overstatement compounds with cost of living increases across thirty years, it is one of the largest single errors available in retirement planning. It also feeds the FERS Special Retirement Supplement computation, so the error propagates twice.

---

## TIER 3: FEDERAL INSURANCE (P1)

This tier is P1 rather than P2 because two of these documents establish eligibility tests that can fail, and a failed test changes which separation dates are viable.

| Document | Where to get it | Why it matters | File name |
|---|---|---|---|
| **FEHB enrollment history showing continuous coverage dates** | Agency benefits office or eOPF SF 2809 and SF 2810 forms | The five year rule. You must be continuously enrolled for the five years immediately before the annuity starts, or since first eligible. | `FEHB Enrollment History.pdf` |
| Current FEHB plan brochure, Section 5 and Section 9 | opm.gov/healthcare-insurance or the carrier | Section 9 states exactly how the plan coordinates with Medicare, which is the whole pre-65 versus post-65 decision | `FEHB Plan Brochure YYYY [plan].pdf` |
| **FEGLI enrollment history showing coverage dates for Basic and each Option** | Agency benefits office or eOPF SF 2817 | The FEGLI five year rule is tested separately for Basic and each Option, and OPM cannot waive it | `FEGLI Enrollment History.pdf` |
| FEGLI Basic Insurance Amount from your current LES | Leave and earnings statement | Drives the cost of every post retirement reduction election | included in LES |
| FEDVIP enrollment confirmation | BENEFEDS | No five year rule applies, but you need the premiums | `FEDVIP Enrollment YYYY.pdf` |
| Agency retiree insurance briefing materials, if your agency publishes any | Benefits office | Agency specific timing and forms | `Agency Retirement Briefing YYYY.pdf` |

---

## TIER 4: TSP AND OTHER RETIREMENT ACCOUNTS (P2)

| Document | Where to get it | Why it matters | File name |
|---|---|---|---|
| TSP quarterly statement, most recent | tsp.gov | Balance split between traditional and Roth, contribution rate, fund allocation | `TSP Statement YYYY-Qn.pdf` |
| TSP annual statement | tsp.gov | Contribution history and match capture | `TSP Annual Statement YYYY.pdf` |
| IRA and Roth IRA statements | Each custodian | Balance and allocation | `[Custodian] [Type] Statement YYYY-Qn.pdf` |
| Roth IRA contribution basis | Custodian transaction history, plus Form 5498 for each year | Contribution basis is withdrawable at any time without tax or penalty. Knowing it changes the whole pre-59 and a half liquidity picture. | `Roth IRA Contribution Basis.md` |
| Taxable brokerage statement | Custodian | Bridge liquidity, and cost basis for tax planning | `Brokerage Statement YYYY-Qn.pdf` |
| Bank statements, checking and savings | Bank portal | Cash on hand | `Bank Statement YYYY-MM.pdf` |
| Health savings account statement | Custodian | Tax free medical spending in retirement | `HSA Statement YYYY-Qn.pdf` |
| Statements for any account from employment before federal service | Each custodian | Forgotten accounts are common and material | `[Custodian] [Type] Statement YYYY-Qn.pdf` |

**Check the match.** The agency automatic contribution is 1 percent of basic pay, and the match runs to a further 4 percent on the first 5 percent you contribute. If your own contribution is under 5 percent, you are leaving agency money behind every pay period. Your TSP statement shows all three contribution types separately.

---

## TIER 5: EXPENSES (P2)

This tier is the one people skip, and skipping it is what makes retirement plans wrong.

| Document | Where to get it | Why it matters | File name |
|---|---|---|---|
| Twelve months of checking account transactions | Bank portal, export to CSV | The core of the expense base | `Bank Transactions YYYY-MM to YYYY-MM.csv` |
| Twelve months of transactions from every credit card | Each card portal, export to CSV | Cards carry the discretionary spending that memory understates | `[Card] Transactions YYYY-MM to YYYY-MM.csv` |
| Twelve month aggregated export, if you use an aggregator | Empower Personal Dashboard, free, or Monarch or Quicken Simplifi, paid. Transactions view, widen the date range, then export to CSV | Replaces a stack of individual downloads. Four cautions: the export obeys the on screen filter and defaults to 90 days; a newly linked account backfills only one to three months and cannot be backfilled by hand; transfers and credit card payments are excluded from the built in cash flow view but not from the raw CSV; cash spending never appears at all | `Aggregator Export YYYY-MM to YYYY-MM.csv` |
| Current mortgage statement or lease | Lender or landlord | Confirmed housing cost, and the payoff or renewal date | `Housing Mortgage Statement.pdf` or `Lease Agreement.pdf` |
| Every loan statement: auto, personal, student, home equity | Each lender | Balance, rate, payment, and the real payoff date | `[Lender] Loan Statement YYYY-MM.pdf` |
| Insurance policies: auto, home or renters, umbrella, life, long term care | Each carrier | Premiums, and which ones end at retirement | `[Carrier] [Type] Policy YYYY.pdf` |
| Annual property tax bill | County property appraiser | A large annual expense that monthly averaging hides | `Property Tax YYYY.pdf` |
| Any expense paid annually or semiannually | Your own records | Semiannual bills appear in roughly half of all months and are routinely misread as anomalies | `Annual Expenses List.md` |

Export CSV, not PDF, wherever the option exists. CSV can be categorized automatically. PDF cannot.

**If you use an aggregator, verify it sees everything.** An aggregator only sees the accounts linked to it. Before treating its export as complete, list every account you spend from and confirm each one appears. A missing account produces an expense base that is quietly too low, which is the direction that makes a plan look solvent when it is not.

---

## TIER 6: HEALTH CARE COSTS (P2)

| Document | Where to get it | Why it matters | File name |
|---|---|---|---|
| Current FEHB biweekly premium, self and family or self plus one | Leave and earnings statement, and the OPM premium tables | The starting point. Remember the annuitant pays the same premium with post tax dollars. | included in LES |
| FEHB annuitant premium tables for the current plan year | opm.gov/healthcare-insurance/healthcare/plan-information/premiums/ | Annuitant rates are published monthly rather than biweekly | `FEHB Annuitant Premiums YYYY.pdf` |
| Prescription list with retail costs | Pharmacy printout | Drug cost is the most variable line in retirement health care | `Prescription List YYYY-MM.md` |
| Medicare Part B premium and IRMAA tables for the current year | cms.gov | The post-65 cost, and the two year income lookback that sets it | `Medicare Part B Premiums YYYY.pdf` |
| COBRA or Temporary Continuation of Coverage rate sheet | Agency benefits office | The fallback if a five year rule test fails, at 102 percent of the full premium | `TCC Rates YYYY.pdf` |
| Spouse's employer coverage summary, if any | Spouse's employer | A materially cheaper alternative in many cases | `Spouse Health Plan YYYY.pdf` |

---

## TIER 7: TAX (P3)

| Document | Where to get it | Why it matters | File name |
|---|---|---|---|
| Last two federal tax returns, complete with schedules | Tax preparer or IRS transcript | Effective rate, deductions, filing status, and the taxable income baseline | `Tax Return YYYY.pdf` |
| State tax return, if your state levies income tax | Same | State treatment of the FERS annuity varies materially by state, and it changes if you relocate | `State Tax Return YYYY.pdf` |
| Form 1099-R for any prior distribution | Custodian | Prior withdrawal history | `1099-R YYYY.pdf` |
| Form 5498 for every IRA contribution year | Custodian | Establishes Roth basis | `5498 YYYY.pdf` |
| Form W-2 for the last two years | Payroll portal | Independent check on gross pay, and a reminder that W-2 gross is NOT the high-3 basis | `W-2 YYYY.pdf` |

---

## TIER 8: SURVIVOR, BENEFICIARY AND ESTATE (P3)

| Document | Where to get it | Why it matters | File name |
|---|---|---|---|
| Beneficiary designations on file for FERS (SF 3102), TSP (TSP-3), FEGLI (SF 2823), and unpaid compensation (SF 1152) | Agency benefits office, tsp.gov | A stale beneficiary designation overrides a will. Cheapest fix in retirement planning. | `Beneficiary Designations YYYY-MM.md` |
| Spouse's date of birth and own retirement income sources | Personal records | Drives the survivor election arithmetic and the joint life expectancy | `Spouse Retirement Profile.md` |
| Any court order affecting the annuity or the TSP from a prior marriage | Court records or the benefits office | A former spouse survivor annuity reduces what is available to elect for a current spouse | `Court Order Retirement Benefits.pdf` |
| Will, trust, powers of attorney, advance directive | Attorney or personal file | Completeness check only | `Estate [Document] YYYY.pdf` |
| Long term care insurance policy, if any | Carrier | The single largest unpriced risk in most retirement plans | `LTC Policy YYYY.pdf` |

---

## TIER 9: VETERANS BENEFITS, IF APPLICABLE (P3)

| Document | Where to get it | Why it matters | File name |
|---|---|---|---|
| VA disability rating decision and current compensation amount | va.gov | Tax free income with its own cost of living adjustment history. Model it as a separate line from the FERS annuity. | `VA Rating Decision YYYY-MM-DD.pdf` |
| VA health care enrollment and priority group | va.gov | Affects the pre-65 health care analysis and long term care planning | `VA Health Enrollment YYYY.pdf` |
| Military retired pay statement, if receiving it | myPay | Interacts with the military service deposit decision | `Military Retired Pay YYYY.pdf` |
| **Retirement order or award letter showing the authority for the retired pay** | Your records, or your branch of service | This is the document that decides whether you must waive the retired pay to get FERS credit. Reserve retired pay under chapter 1223 of title 10 is not waived, and neither is retired pay for a combat incurred or instrumentality of war disability. Regular retired pay is. | `Military Retirement Order [branch] YYYY.pdf` |

---

## TIER 10: BOLDIN (P3)

| Document | Where to get it | Why it matters | File name |
|---|---|---|---|
| Boldin planner summary CSV export | Boldin, export the scenario | Year by year projection that can be checked line by line | `Boldin Planner Summary YYYY-MM-DD.csv` |
| Boldin PDF report | Boldin, generate the report | The narrative and the Chance of Success figure | `Boldin Report YYYY-MM-DD.pdf` |

Re export both every time entries change. A validation report is only valid against the export it was run on.

---

## MINIMUM VIABLE START

Do not wait for all of it. These six start the interview:

1. Most recent leave and earnings statement
2. Retirement Service Computation Date, in writing
3. Agency annuity estimate for at least one candidate separation date
4. Social Security statement plus the zero future earnings estimate
5. Most recent TSP quarterly statement
6. FEHB enrollment history showing continuous coverage dates

Everything else can arrive as it arrives. The assistant tracks what is missing in `06 Open Items/Open Items.md` and states, in every report, which conclusions are provisional because of a missing document.

---

## THREE REQUESTS TO SEND YOUR BENEFITS OFFICE TODAY

These take the longest to come back, so send them before you start anything else. Ask for each in writing so the reply is a document rather than a recollection.

1. **My Service Computation Date for retirement purposes**, and confirmation of whether it differs from my leave SCD and why.
2. **A written statement of any federal service in my record for which retirement deductions were not withheld**, with dates, and the deposit amount required to make it creditable.
3. **The current balance and status of my military service deposit**, if I have military service, and the deadline by which it must be paid.

Add a fourth if you have ever taken a refund of retirement contributions: **a written statement of the refunded period and the redeposit amount required.**
