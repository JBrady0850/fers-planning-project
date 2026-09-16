---
created: 2026-09-13
modified: 2026-09-13
tags: [archivist, reference, retirement, fers, template]
aliases: [Facts Register Template, FERS Facts Register]
---

# FACTS REGISTER

**This file belongs at `02 Baseline/Facts Register.md` in your workspace.** The setup script puts it there. If you built the folders by hand, copy it there yourself and rename it `Facts Register.md`.

Claude writes into it as each interview block is answered. It is the single source of truth for every number in the plan. Nothing enters a report that is not here first.

**Format.** One fact per line:

```
[YYYY-MM-DD] | [fact] | [source] | [SOURCED or ESTIMATE]
```

**Rules.**

- Append, never overwrite. When a fact changes, add the new line and mark the old one `SUPERSEDED YYYY-MM-DD`. The history of a changed assumption is evidence, and it is the only way to answer "why did this number move" six months from now.
- A source is a document file name with a page or tab, or `user-stated YYYY-MM-DD`, or a URL for a published rule.
- Anything without one of those three is an `ESTIMATE` and carries the assumption that produced it.
- `UNKNOWN` is a legitimate value. Record it, open a matching item in `06 Open Items\Open Items.md`, and move on.

---

## 1. IDENTITY AND ELIGIBILITY DATES

| Fact | Value | Source | Status |
|---|---|---|---|
| Date of birth | | | |
| Minimum Retirement Age | | derived from date of birth | |
| MRA calendar date | | derived | |
| Service Computation Date, retirement purposes | | | |
| Service Computation Date, leave purposes | | | |
| Agency, series, grade and step | | | |
| Duty location and locality area | | | |
| Special provision coverage (LEO, FF, ATC, MRT, CBPO, or none) | | | |
| Earliest immediate annuity date | | derived | |
| Earliest immediate UNREDUCED annuity date | | derived | |
| Which rule produces the unreduced date (MRA+30, 60+20, or 62+5) | | derived | |
| 1.1 percent multiplier date, if reachable | | derived | |
| Age reduction at any earlier date | | derived | |
| Stated preferred retirement date | | user-stated | |
| Source of the stated preferred date | | | |
| Reconciliation of stated versus derived | | | |

**Age triggered dates**

| Age | Date | Trigger |
|---|---|---|
| 50 | | VERA threshold with 20 years, agency authority required |
| 55 | | TSP separation exception from the 10 percent additional tax |
| 59 and a half | | All retirement accounts reachable without the additional tax |
| 62 | | Earliest Social Security, first annuity COLA, end of the FERS supplement |
| 65 | | Medicare, FEGLI reductions begin |
| 67 | | Social Security full retirement age |
| 70 | | Maximum Social Security |
| 73 or 75 | | Required minimum distributions begin |

---

## 2. CREDITABLE SERVICE AUDIT

| Fact | Value | Source | Status |
|---|---|---|---|
| Total creditable service at candidate date 1 | | derived | |
| Total creditable service at candidate date 2 | | derived | |
| Non deduction service periods, dates | | | |
| Deposit required, amount and status | | | |
| Refunded service periods, dates | | | |
| Redeposit required, amount and status | | | |
| Military service periods, dates | | DD-214 | |
| Military deposit amount, status, deadline | | | |
| Military deposit Interest Accrual Date | | SF 3108A | |
| Military retired pay, and the authority it was awarded under | | Retirement order or award letter | |
| Military retired pay waiver required, yes or no | | | |
| Part time service periods and tours | | | |
| Part time proration factor | | derived | |
| Any eligibility date moved by an unpaid deposit | | derived | |

---

## 3. HIGH-3 AND THE ANNUITY COMPUTATION

| Fact | Value | Source | Status |
|---|---|---|---|
| Current annual rate of basic pay including locality | | LES | |
| Salary history, effective dates and rates | | SF 50s | |
| High-3 average salary, independently computed | | derived | |
| Three consecutive years used | | derived | |
| Multiplier that applies at each candidate date | | derived | |
| Gross monthly annuity, independently computed | | derived | |
| Agency annuity estimate figure and date | | | |
| Variance between the two, and the explanation | | derived | |
| Survivor reduction applied | | | |
| Net monthly annuity after all reductions | | derived | |

---

## 4. FERS SPECIAL RETIREMENT SUPPLEMENT

| Fact | Value | Source | Status |
|---|---|---|---|
| Eligible at candidate date 1 (yes or no, and why) | | derived | |
| Eligible at candidate date 2 (yes or no, and why) | | derived | |
| Social Security benefit at 62, zero future earnings | | SSA estimate | |
| Years of FERS civilian service for the fraction | | derived | |
| Computed monthly supplement | | derived | |
| Start date | | derived | |
| End date (month of the 62nd birthday) | | derived | |
| Post retirement work planned, and expected earnings | | user-stated | |
| Earnings test reduction, if applicable | | derived | |
| Supplement net of the earnings test | | derived | |

---

## 5. LEAVE AND THE SEPARATION DATE

| Fact | Value | Source | Status |
|---|---|---|---|
| Sick leave balance, hours | | LES | |
| Sick leave accrual rate | | | |
| Projected sick leave balance at each candidate date | | derived | |
| Sick leave credit, additional service | | derived | |
| Sick leave credit, additional annual annuity dollars | | derived | |
| Annual leave balance, hours | | LES | |
| Annual leave accrual rate per pay period | | | |
| Use or lose ceiling that applies | | | |
| Hourly rate of basic pay including locality | | LES | |
| Projected lump sum, gross | | derived | |
| Projected lump sum, net of FICA, Medicare and withholding | | derived | |
| Annuity commencement date for each candidate separation date | | derived | |

---

## 6. INCOME TODAY

| Fact | Value | Source | Status |
|---|---|---|---|
| Gross annual salary | | LES | |
| Pay periods per year | | | |
| Net pay per pay period | | LES | |
| FERS employee contribution per pay period | | LES | |
| FICA and Medicare per pay period | | LES | |
| Federal withholding per pay period | | LES | |
| State withholding per pay period | | LES | |
| FEHB premium per pay period | | LES | |
| FEDVIP premiums per pay period | | LES | |
| FEGLI premiums per pay period | | LES | |
| TSP traditional per pay period | | LES | |
| TSP Roth per pay period | | LES | |
| Other income, each line with its own row | | | |
| Which deductions stop at separation | | derived | |
| Which deductions change character at separation | | derived | |

---

## 7. ACCOUNTS AND BALANCES

| Account | Type | Balance | As of date | Source | Status |
|---|---|---|---|---|---|
| TSP traditional | Pre-tax | | | | |
| TSP Roth | Roth | | | | |
| IRA | Pre-tax | | | | |
| Roth IRA | Roth | | | | |
| Roth IRA contribution basis | Roth basis | | | | |
| Taxable brokerage | Taxable | | | | |
| Checking | Cash | | | | |
| Savings | Cash | | | | |
| Health savings account | Pre-tax medical | | | | |
| Prior employer accounts | | | | | |
| **Total** | | | | derived | |

| Allocation fact | Value | Source | Status |
|---|---|---|---|
| TSP fund allocation | | TSP statement | |
| Overall stock, bond and cash split | | derived | |
| Target allocation | | user-stated | |
| Weighted expense ratio, dollars per year | | derived | |
| Agency match fully captured (yes or no) | | derived | |

---

## 8. EXPENSES BY LENS

| Lens | Monthly | Annual | Period covered | Source | Status |
|---|---|---|---|---|---|
| FULL | | | | | |
| CURRENT | | | | | |
| RETIRED | | | | | |
| Trailing 3-month RETIRED burn | | | | monthly report | |

**Exclusion table.** Every line removed from or added to the RETIRED lens, with a reason and a confirmed end or start date.

| Item | Monthly amount | Removed or added | Reason | Confirmed end or start date | Status |
|---|---|---|---|---|---|
| | | | | | |

---

## 9. INSURANCE

| Fact | Value | Source | Status |
|---|---|---|---|
| FEHB plan and enrollment code | | | |
| FEHB continuous coverage start date | | enrollment history | |
| FEHB five year rule satisfied on this date | | derived | |
| Does each candidate date satisfy the rule | | derived | |
| FEHB employee premium, biweekly | | LES | |
| FEHB annuitant premium, monthly, post tax | | OPM premium tables | |
| FEDVIP plans and premiums | | | |
| FEGLI Basic Insurance Amount | | LES | |
| FEGLI Basic coverage start date | | enrollment history | |
| FEGLI Option A, B, C elected and start dates | | enrollment history | |
| FEGLI five year rule result for Basic and each Option | | derived | |
| Intended FEGLI reduction election | | user-stated | |
| Postponed or deferred path at each candidate date | | derived | |
| Months of self funded coverage before 65 | | derived | |
| Medicare Part B decision and projected cost | | | |

---

## 10. SOCIAL SECURITY

| Fact | Value | Source | Status |
|---|---|---|---|
| Statement figure at 62 | | SSA statement | |
| Statement figure at full retirement age | | SSA statement | |
| Statement figure at 70 | | SSA statement | |
| Zero earnings figure at 62 | | SSA estimate | |
| Zero earnings figure at full retirement age | | SSA estimate | |
| Zero earnings figure at 70 | | SSA estimate | |
| Full retirement age | | derived | |
| Intended claiming age | | user-stated | |
| Spouse figures, if applicable | | | |
| Any non covered employment | | user-stated | |

---

## 11. SURVIVOR AND BENEFICIARIES

| Fact | Value | Source | Status |
|---|---|---|---|
| Marital status | | | |
| Spouse date of birth | | | |
| Spouse own retirement income | | | |
| Intended survivor election | | user-stated | |
| Cost of the election, monthly and lifetime | | derived | |
| FEHB consequence of the election | | derived | |
| Beneficiary designation, FERS (SF 3102) | | | |
| Beneficiary designation, TSP (TSP-3) | | | |
| Beneficiary designation, FEGLI (SF 2823) | | | |
| Beneficiary designation, unpaid compensation (SF 1152) | | | |
| Any court order affecting the annuity or TSP | | | |

---

## 12. DEBTS AND HOUSING

| Debt | Balance | Rate | Payment | Stated payoff | Independently amortized payoff | Source | Status |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

| Fact | Value | Source | Status |
|---|---|---|---|
| Own or rent | | | |
| Monthly housing cost | | | |
| Confirmed through date | | | |
| Mortgage payoff date | | lender statement | |
| Relocation planned, and to which state | | user-stated | |

---

## 13. ONE TIME EVENTS

| Event | Amount | Date | Inflow or outflow | Source | Status |
|---|---|---|---|---|---|
| Annual leave lump sum | | | Inflow | | |
| Final paycheck | | | Inflow | | |
| | | | | | |

---

## 14. ASSUMPTIONS

| Assumption | Value | Basis | Status |
|---|---|---|---|
| Longevity age | | user-stated | |
| General inflation | | user-stated | |
| Medical inflation | | user-stated | |
| Expected portfolio return, average case | | user-stated | |
| Expected portfolio return, pessimistic case | | user-stated | |
| FERS annuity COLA before age 62 | 0 percent | 5 U.S.C. 8462(c)(3) | SOURCED |
| FERS annuity COLA from age 62 | diet COLA | 5 U.S.C. 8462(b) | SOURCED |
| FERS supplement COLA | 0 percent | Handbook Ch. 51 | SOURCED |
| Social Security COLA | | user-stated | |
| Federal tax treatment of the annuity | Fully taxable, less the return of the employee contribution | | |
| State tax treatment of the annuity | | | |
| Required minimum distribution age | | 26 CFR 1.401(a)(9)-2 | |
| Legislative risk case: supplement set to zero | | sensitivity case | ESTIMATE |

---

## 15. CHANGE LOG

Every superseded fact, with the date it changed and what caused the change.

| Date | Fact | Old value | New value | What caused the change |
|---|---|---|---|---|
| | | | | |
