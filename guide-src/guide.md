# Part 1: What This Is

## 1.1 The problem this solves

Most federal employees approach retirement holding three numbers they believe and cannot prove.

The first is the date they are eligible to retire. It usually comes from a colleague, a briefing attended years ago, or an assumption that the Minimum Retirement Age is 55. It is frequently wrong by two to five years, and it is wrong in the direction that costs money.

The second is what the annuity will pay. It usually comes from a single agency estimate run once, for one date, possibly under assumptions that no longer hold. Very few people have ever rebuilt it themselves from their own pay history.

The third is what they spend. It comes from memory. Memory based budgets run wrong by twenty to forty percent, and they run low far more often than they run high, because the discretionary spending people forget is exactly the spending that does not stop at retirement.

All three errors push in the same direction. They make the plan look better than it is. A retirement plan that looks solvent because one input is wrong is worse than no plan at all, because it stops you from acting while there is still time to act.

## 1.2 Where this system came from

This did not start as a product. It started as one federal employee building his own FERS plan, buying a commercial planning tool, and discovering that the tool was confidently producing wrong answers because of settings he had no reason to question.

Two of those discoveries are worth stating with their measured impact, because they establish what this system is for.

**The first.** The planning tool was applying a cost of living adjustment to the FERS annuity from the annuity start date. Regular FERS retirees who leave before age 62 receive no cost of living adjustment at all until the one following their 62nd birthday. The tool was also starting the annuity one month before it legally commences. Correcting those two settings, together, accounted for **eighty three percent of a $315,658 reduction in projected net worth at longevity**. The plan had been showing a future that was not going to happen.

**The second.** The same tool had its withdrawal strategy set to a fixed percentage rather than to actual spending needs. That setting forces a withdrawal every year whether the plan needs one or not, taxes it as ordinary income on the way out of the traditional TSP, and re-saves the surplus into a taxable brokerage where the growth is taxed a second time. Changing that single dropdown moved the Chance of Success figure from **77 percent to 99 percent**, moved projected net worth at longevity by more than two million dollars, and cut projected lifetime income taxes by **fifty seven thousand dollars**. It cost nothing in lifestyle. It was pure tax drag from a misconfigured setting.

Neither finding was visible from inside the tool. Both required exporting the plan and checking it, line by line, against source documents.

There was a third discovery, and it is the one that shaped the method more than the other two. On the first validation pass, the largest reported defect turned out to be an error in the analysis rather than in the tool. A figure expressed in future inflated dollars had been compared against a figure expressed in today’s dollars, which manufactured a defect that did not exist. Meanwhile the actual largest defect, the cost of living adjustment setting, was sitting in a detail form that the export did not show and was missed entirely.

The item led with accounted for three percent of the eventual correction. The item missed accounted for eighty three percent.

That is why this system is built the way it is: no invented numbers, every figure sourced, arithmetic shown, and a standing instruction that when the tool is right and your own model is wrong, you say so first and correct the model.

## 1.3 What you get

A folder structure, a project prompt, and a working method.

**The prompt** goes into a Claude Desktop project’s Instructions field, where it loads automatically on every conversation in that project. It never has to be pasted again and it never drifts mid session.

**The interview** runs fourteen blocks, asking at most five questions at a time, writing every answer into a permanent register as it goes. It takes about ninety minutes and can be stopped and resumed.

**The baseline** is a single document stating, in its first three sentences, whether you are on track, tight, or short, and by how much per month.

**The monthly cycle** takes fifteen minutes. You export last month’s transactions and type one sentence. The plan re-bases on measured spending instead of remembered spending.

**The analysis set** is eleven deeper studies you request by name: income versus burn, retirement date comparison, cash bridge, health care bridge to 65, creditable service and deposits, Social Security claiming, tax strategy, the survivor election, the FEGLI election, Boldin validation, and a running findings register.

**The Entry Sheet** is written for you whenever a Boldin input changes. It is a typed list: the screen, the field, the exact value with its unit, what that value replaces, and where it came from. You enter the rows and the next validation confirms they landed. You never have to work out which box a number goes in.

**The rules reference** carries eighty two citations and, more importantly, an explicit list of ten things that could not be verified.

## 1.4 What it will not do

It will not give you financial advice, legal advice, or tax advice. It produces arithmetic, source traced figures, and decision options.

Seven federal retirement elections are permanent or effectively permanent. For each of these the system produces a written options analysis with the arithmetic shown, and then instructs you to confirm with your agency benefits officer and a licensed fiduciary before you file:

1. The survivor annuity election on your retirement application
2. The FEGLI post retirement reduction election on SF 2818
3. Cancelling rather than suspending FEHB as an annuitant
4. Choosing deferred retirement over postponed retirement
5. Paying or not paying a military service deposit before you separate
6. Your Social Security claiming age
7. Any TSP life annuity purchase

Use this system to arrive at that meeting with the arithmetic already finished. Do not use it to skip the meeting.

## 1.5 Who this fits

**It fits you** if you are a current federal employee covered by FERS, roughly three to ten years from your intended retirement date, willing to gather about a dozen documents, and prepared to spend fifteen minutes a month keeping it current.

Three to ten years is the useful window. Far enough out that a finding still leaves time to act on it. Close enough in that the numbers mean something. Inside one year the analysis still applies, but several of the findings it produces have deadlines that may already have passed: an unpaid military service deposit must be paid before you separate, a FEHB or FEGLI five year shortfall cannot be fixed retroactively, and a service credit gap takes months to resolve through a benefits office.

**It does not fit you** if you are covered by CSRS or CSRS Offset. The eligibility rules, the annuity formula, the cost of living adjustment treatment and the Social Security interaction are all different, and this system will mislead you. The same is true of the Foreign Service Pension System and other separate systems.

**It fits you with a caveat** if you are a special provision employee, meaning a federal law enforcement officer, firefighter, air traffic controller, nuclear materials courier, Customs and Border Protection officer, or military reserve technician. The interview asks about this directly rather than assuming Regular FERS, and the eligibility age, multiplier, supplement timing and cost of living adjustment rules all branch on the answer. The rules reference covers the branches but is less deep on special provisions than on Regular FERS, so verify your specific thresholds with your benefits office.

## 1.6 What it costs in time

| Activity | Time | When |
|---|---|---|
| Install and set up the project | 30 minutes | Once |
| Gather the six minimum documents | 1 to 3 hours, mostly waiting on portals | Once, up front |
| The fourteen block interview | 90 minutes, splittable across sessions | Once |
| Build the Readiness Baseline | 20 minutes of your attention | Once |
| The monthly cycle | 15 minutes | Every month |
| Boldin setup and first validation | 2 hours | Once, then quarterly |

The document gathering is the part that takes real calendar time, because some of it arrives from your agency benefits office rather than from a portal. Send those requests before you do anything else. Section 4.3 gives you the exact wording. The interview does not wait on them.

## 1.7 What good looks like after thirty days

- The Facts Register holds every number that matters, each traced to a named document.
- The Readiness Baseline states in three sentences whether you are on track, tight, or short.
- Your four eligibility dates are derived, written down, and reconciled against the date you had in your head.
- One monthly report exists, built from real transactions.
- Boldin is set up and validated, and you know which of its figures to trust.
- One Entry Sheet has been worked through, every row marked `ENTERED` or `BLOCKED`, and the export that confirms it is saved.
- The Open Items list is short, and every item on it names the specific document that would close it.

Expect the first pass to produce more questions than answers. That is the system working. A retirement plan that produces no open items on its first run is a plan that guessed.

## 1.8 How to read this guide

If you want to start immediately, read **Part 3** and begin. Everything else can be read as you hit it.

If you want to understand what the system is doing before you run it, read **Part 2** first. It is a plain language FERS primer, and it is the longest part of this guide on purpose. The rules in it are the rules the whole system is built to apply correctly.

If you are setting this up for someone else, read **Part 1** and **Part 3**, then hand them the repository.

Three conventions used throughout:

- **Bold** marks something that changes an outcome or carries a deadline.
- A figure in `code formatting` is something to type exactly.
- Anything labeled `[ESTIMATE]` in a generated report is not sourced. Ask where it came from.

# Part 2: A Plain Language FERS Primer

This part explains, in order, the rules the system applies. Every rule here is cited in `docs/06-fers-rules- reference.md`. Verified September 2026. Dollar figures are 2026 program year values and change annually.

Read it once before you run the interview. You do not need to memorize any of it. You do need to recognize the moment a number surprises you, because that is the moment the system is earning its keep.

## 2.1 The one date everything hangs on

Your **Service Computation Date for retirement purposes** decides your eligibility dates and the years of service in your annuity formula.

It is frequently not the same number as your **Service Computation Date for leave purposes**, which is the one printed on your leave and earnings statement. The leave SCD credits military service and certain other time toward your annual leave accrual rate. The retirement SCD credits only service that is creditable under FERS, which is a narrower set.

If the only SCD you have is the one on your leave and earnings statement, you do not yet know your retirement SCD. Request it in writing from your benefits office. Section 4.3 gives you the wording.

Every annuity figure in your plan depends on that one date. Getting it from the wrong field is the single most common way a federal employee ends up planning toward a date they are not eligible for.

## 2.2 Your Minimum Retirement Age

The Minimum Retirement Age, universally abbreviated MRA, is set by your year of birth.

| Year of birth | MRA |
|---|---|
| Before 1948 | 55 |
| 1948 | 55 and 2 months |
| 1949 | 55 and 4 months |
| 1950 | 55 and 6 months |
| 1951 | 55 and 8 months |
| 1952 | 55 and 10 months |
| 1953 to 1964 | 56 |
| 1965 | 56 and 2 months |
| 1966 | 56 and 4 months |
| 1967 | 56 and 6 months |
| 1968 | 56 and 8 months |
| 1969 | 56 and 10 months |
| 1970 and after | 57 |

Note the shape of this table. It steps in two month increments from 1948 through 1952, holds flat at 56 for the whole twelve year band from 1953 through 1964, steps again from 1965 through 1969, and then holds at 57 forever.

Anyone born in 1970 or later has an MRA of 57. If you have been carrying 55 in your head, you are wrong by two years, and two years of planning error at the end of a career is expensive.

## 2.3 The four ways to retire immediately

“Immediate” means the annuity begins within thirty days of separation. There are four paths and they are not equivalent.

| Path | Age | Service | Annuity reduced? | FERS Supplement? |
|---|---|---|---|---|
| Age 62 | 62 | 5 years | No | No, 62 ends it |
| Age 60 | 60 | 20 years | No | Yes |
| MRA + 30 | Your MRA | 30 years | No | Yes |
| **MRA + 10** | Your MRA | 10 to 29 years | Yes, permanently | No |

The first three produce an immediate unreduced annuity. The fourth does not, and the difference between the third row and the fourth row is the largest avoidable mistake available to a federal employee.

### The MRA+10 reduction

If you leave under MRA+10, your annuity is reduced by **five twelfths of one percent for each full month you are under age 62** at the annuity commencing date. That is five percent per year, counted monthly rather than rounded to whole years.

**The reduction is permanent.** It does not stop when you turn 62. OPM’s Handbook states this explicitly.

A worked example. Suppose you reach your MRA of 57 with 24 years of service and retire. You are 60 months under 62.

```
60 months x 5/12 of 1 percent = 25 percent permanent reduction
```

A $3,000 monthly annuity becomes $2,250, for life, and it never receives a cost of living adjustment until you turn 62 anyway. You also receive no FERS Special Retirement Supplement, because that requires an unreduced annuity.

Working two more years to reach 26 years does not help. Working to reach MRA plus 30 does, and so does reaching age 60 with 20 years.

### One carve out worth knowing: MRA+20

If you separate under MRA+10 with **at least twenty years of service**, and you postpone the annuity commencing date to the first day of any month after you turn 60, the age reduction disappears entirely. This is sometimes called MRA+20.

That is a real and underused option for someone who wants to leave at 57 with 22 years and can fund the gap years from savings. The cost is that FEHB and FEGLI terminate at separation and do not resume until the annuity begins. Section 2.10 explains what that means.

## 2.4 The annuity formula

```
Basic annuity = multiplier x high-3 average salary x years and months of creditable service
```

The **multiplier** is 1.0 percent, or **1.1 percent** if, at separation, you are age 62 or older **and** have at least 20 years of creditable service.

Both conditions are required and both are tested at separation, not at the annuity commencing date. The 1.1 percent factor is a ten percent increase in your annuity for life. If you are at 61 with 19 years and considering leaving, the arithmetic of one more year is worth running.

A worked example at 1.0 percent:

```
High-3 of $110,000, 28 years of creditable service
0.01 x $110,000 x 28 = $30,800 per year = $2,566.67 per month
```

The same person at 62 with 20 or more years:

```
0.011 x $110,000 x 28 = $33,880 per year = $2,823.33 per month
```

That is $256.66 more per month, for life, from a single threshold.

## 2.5 The high-3 average salary

The high-3 is the **largest annual rate produced by averaging your rates of basic pay in effect over any three consecutive years of creditable civilian service**.

Three properties of that definition matter and are routinely missed.

**It is time weighted.** It is not the average of your three highest annual salaries. It weights each pay rate by the number of days that rate was in effect. A promotion effective in October contributes only the portion of the year it covered.

**The three years need not be your final three.** They must be consecutive, but if you took a downgrade or moved to a lower locality area, an earlier window may produce a higher figure.

**Basic pay is not gross pay.** This is the error that matters most.

| Counts as basic pay | Does not count |
|---|---|
| Base General Schedule or wage grade rate | Overtime |
| **Locality pay** | Bonuses and cash awards |
| Special salary rates | Performance awards |
| Law enforcement availability pay | Recruitment and relocation incentives |
| Administratively uncontrollable overtime | Allowances |
| Standby duty premium, within the cap | Holiday pay |
| For wage grade employees, night and environmental differential | Military pay |
|  | The annual leave lump sum payment |

**Locality pay counts.** This is frequently misstated in both directions. It is part of basic pay and it is part of your high-3. Availability pay and AUO also count where retirement deductions are withheld from them.

**Your W-2 gross pay is not your high-3 basis.** W-2 gross includes overtime, awards and the leave lump sum, none of which are basic pay. Building a high-3 from a W-2 overstates your annuity for the rest of the plan. If your own computation and your agency estimate diverge by more than two percent, this is the first place to look.

## 2.6 Unused sick leave

Since **January 1, 2014**, FERS retirees receive **one hundred percent credit** for unused sick leave. Conversion is 2,087 hours to a year, 8 hours to a day, and residual days beyond whole months are dropped.

What it does: adds to your creditable service **for the annuity computation**.

What it does not do, and all three of these are important:

- It does **not** count toward retirement eligibility. A person at 29 years and 6 months with 1,000 hours of sick leave is not eligible for MRA+30.
- It does **not** raise your high-3.
- It does **not** help you reach the 20 years needed for the 1.1 percent multiplier.

A worked example. 1,044 hours of sick leave is almost exactly six months of service.

```
1,044 / 2,087 = 0.50 years
0.01 x $110,000 x 0.50 = $550 per year = $45.83 per month, for life
```

Express your own balance that way. A balance stated in hours does not feel like money. The same balance stated as monthly annuity dollars does, and it changes how people treat sick leave in their last two years.

**A warning about one source.** OPM’s CSRS/FERS Handbook Chapter 50 is dated 1998 and still says unused sick leave is not creditable under FERS. That text predates the 2009 statute that changed it. Do not rely on Chapter 50 for sick leave.

## 2.7 Creditable service, deposits and redeposits

Your years of service figure is not simply the years since your hire date. Four things can change it, and three of them have deadlines.

### Non deduction civilian service

Federal service where retirement deductions were **not withheld** from your pay. Temporary, term, seasonal, intermittent and when-actually-employed appointments commonly fall here.

- **Performed before January 1, 1989.** You may pay a deposit of 1.3 percent of the basic pay for that service, plus interest compounded annually. **If you do not pay it, the service counts for neither eligibility nor computation.** Under FERS there is no reduced-annuity alternative as there is under CSRS. A partial payment for a distinct service period buys nothing at all: it is all or nothing per period.
- **Performed on or after January 1, 1989.** A FERS employee generally cannot make a deposit and the service is not creditable for any purpose. Narrow exceptions exist for Peace Corps, VISTA and certain Foreign Service.

### Refunded service

If you ever left federal service and took a refund of your retirement contributions, that service is affected. Since October 28, 2009 a FERS employee may redeposit the refund plus interest. **If you do not redeposit, the service counts toward eligibility but cannot be used to compute your annuity.**

Handbook Chapter 21 still says a FERS refund can never be redeposited. That text is superseded. Do not rely on it.

### Military service

- Pre-1957 military service is creditable with no deposit.
- **Post-1956 military service requires a deposit to count for either eligibility or computation.**
- The amount is generally **three percent of your military basic pay**, with variations of 3.25 percent for 1999 service and 3.40 percent for 2000 service, plus interest.
- Interest begins on the second anniversary of your FERS coverage start date and compounds annually, with an effective interest free window of roughly three years from entry on duty.
- **The deposit must be paid before you separate from federal service. OPM cannot accept it afterward.**

That deadline is absolute and it is the reason the military deposit question appears in Block 2 of the interview rather than later. If you have four years of active duty and a high-3 of $110,000, that service is worth roughly $4,400 a year in annuity for life. A deposit of a few thousand dollars pays back in well under two years. People miss it because nobody told them there was a clock.

### Part time service

If you have ever worked part time under FERS, the annuity is computed as if the service were full time on the full time high-3, then multiplied by a **proration factor**: actual hours worked across all creditable FERS service, divided by the full time hours available in the same period.

Part time service counts as **full calendar time for eligibility** but proportionally less for the computation. That asymmetry surprises people.

### Why this section matters more than it looks

Unpaid deposit service that does not count toward eligibility pushes your earliest unreduced date later by exactly as many years as the unpaid service. That is the mechanism by which someone plans for MRA plus 30, arrives at their MRA, and finds they have 28 years.

Moving an eligibility date is worth far more than the annuity increase a deposit buys. The system prices both separately for that reason.

## 2.8 The FERS Special Retirement Supplement

Also called the FERS Annuity Supplement, or in OPM’s own language the retiree annuity supplement. It approximates the Social Security benefit you earned during your FERS service, and it bridges the gap between retirement and age 62.

### Who gets it

It requires an **immediate, unreduced** annuity, at least one full calendar year of FERS service, and an age under 62.

| Retirement type | Supplement |
|---|---|
| MRA + 30 years | Yes, at retirement |
| Age 60 with 20 years | Yes, at retirement |
| MRA + 10 | No |
| Deferred | No |
| Disability | No |
| VERA or discontinued service before your MRA | Yes, but not until you reach your MRA |
| Special provision positions | Yes, immediately, even before your MRA |

OPM states it directly: if you receive a deferred benefit, a disability benefit, or an immediate MRA+10 benefit, you are not eligible for the annuity supplement.

### How it is computed

The working approximation:

```
Supplement = (your Social Security benefit estimated at age 62) x (years of FERS civilian
service / 40)
```

Use your own **zero future earnings** estimate for the first term, not the figure on your Social Security statement. See Section 2.12.

**Military service does not count in the numerator, even if you paid the deposit.** The numerator is civilian FERS service only, capped at 40 years.

A worked example. Age 62 benefit of $2,100 with 28 years of FERS civilian service:

```
$2,100 x (28 / 40) = $2,100 x 0.70 = $1,470 per month
```

### Three properties that must appear in every projection

**It never receives a cost of living adjustment.** OPM’s Handbook says so in plain words. It is fixed in nominal dollars for its entire run. A planning tool that inflates it is wrong.

**It ends at the end of the month you turn 62**, whether or not you claim Social Security at that point. If you delay Social Security to 67 or 70, the supplement still stops at 62 and nothing replaces it. Those are the years your portfolio carries the whole load, and they are easy to miss in a projection.

**It is subject to an earnings test.** If you work after retiring, the supplement is reduced by **one dollar for every two dollars** you earn above the annual exempt amount.

- The 2026 annual exempt amount is **$24,480**, which is $2,040 a month.
- The reduction is applied in the year **after** the earnings were made, in practice starting with the July payment.
- **Counted:** wages and net self employment income, including bonuses and overtime, including work not covered by Social Security.
- **Not counted:** your FERS annuity, TSP withdrawals, Social Security, interest, dividends, capital gains, most rental income, inheritances, insurance proceeds.
- Special provision retirees are exempt until they reach their MRA, then the test applies.

A post retirement job paying $45,000 erases roughly $10,260 a year of supplement. If you plan to work, model it net.

### Legislative risk

Elimination of the supplement for people not already entitled before January 2028 was proposed in 2025 reconciliation legislation and passed the House. It was **removed before enactment** when the Senate parliamentarian ruled the federal workforce provisions out of order under the Byrd rule. A proposed change from high-3 to high-5 was dropped in the same process.

**Nothing is enacted as of September 2026.** But these were defeated on procedural grounds, not on the merits, and they can return in standalone legislation. If your separation is five or more years out, model current law and run one sensitivity case with the supplement set to zero, so you know the size of the exposure.

Be careful what you read about this. At least one widely followed federal benefits outlet published an issue brief describing those provisions as enacted. That article describes the House passed version of May 2025, not the final law.

## 2.9 Cost of living adjustments

### The age 62 rule

A FERS retiree who is **under 62** receives **no cost of living adjustment** on the annuity. Not a reduced one. None. The first adjustment arrives with the one following your 62nd birthday.

The exceptions are special provision retirees, FERS disability annuitants, military reserve technicians separated due to disability, and survivor annuitants.

If you retire at 57, that is five full years of a nominally flat annuity while your expenses inflate. At three percent inflation, five flat years costs about fourteen percent of purchasing power before the first adjustment ever arrives. This is the single most important thing to get right in any projection, and it is Defect Class 1 in the Boldin guide for that reason.

### The diet COLA

Once you are 62, FERS still does not receive the full adjustment. Let C be the CPI-W increase.

| CPI-W increase | FERS receives | CSRS receives |
|---|---|---|
| Under 2.0 percent | Full C | C |
| 2.0 to 3.0 percent | **2.0 percent flat** | C |
| Above 3.0 percent | **C minus 1.0 percentage point** | C |

For 2026 the figures were **CSRS 2.8 percent, FERS 2.0 percent, Social Security 2.8 percent**. CPI- W landed inside the 2 to 3 band, so FERS was capped at 2.0 percent.

Over a thirty year retirement this gap compounds. Do not model FERS at the Social Security rate.

The Equal COLA Act, which would give FERS annuitants the CSRS adjustment, has been introduced repeatedly and remains in committee. It is proposed, not enacted.

## 2.10 The insurance rules, and the cliff nobody warns you about

This section carries more permanent consequences than any other in the primer.

### The FEHB five year rule

To carry your health insurance into retirement you must satisfy **both** of these:

1. Be entitled to retire on an immediate annuity, and
2. Have been **continuously enrolled in FEHB for the five years of service immediately before your annuity starts**, or for the full period since you first became eligible if that is less than five years.

What counts toward the five years: enrollment in your own name, coverage as a family member under someone else’s FEHB enrollment, and TRICARE or CHAMPVA coverage provided you are enrolled in FEHB on the date you retire. **Medicare does not count.**

Failing it forfeits FEHB in retirement permanently. You get a 31 day extension, the right to convert to an individual policy, and possibly Temporary Continuation of Coverage for up to eighteen months at 102 percent of the full premium.

OPM can waive the requirement, but in practice the waiver is pre-approved only in narrow circumstances tied to a buyout, an early out authority, or an involuntary separation.

**Compute the date you satisfy this rule and compare it against every separation date you are considering.** If a date fails the test, that date is not merely worse, it is categorically different.

### The FEGLI five year rule

The same five year test applies to life insurance, and it is applied **separately to Basic and to each Option**.

**OPM has no authority to waive it.** That is the sharpest contrast with FEHB, and it is worth stating in exactly those terms.

### Postponed versus deferred, which is the real cliff

Both delay your annuity. Only one preserves your insurance.

**Postponed.** Available if you separate **already eligible for MRA+10**, meaning you had reached your MRA with at least ten years at the moment you separated. FEHB and FEGLI terminate at separation, Temporary Continuation of Coverage is available for up to eighteen months, and **when the postponed annuity commences you may re-enroll in FEHB and reinstate FEGLI**, provided the five year requirement was met at separation. Filed on Form RI 92-19.

**Deferred.** What happens if you separate **before** reaching your MRA with ten years. The annuity is payable at 62 with five years, or at your MRA with ten years and reduced. And OPM states, verbatim:

“If you receive a deferred annuity, you are not eligible to reenroll in any health benefits, life insurance coverage, or dental and vision benefits.”

Ever.

That is a permanent forfeiture of federal health insurance, decided entirely by which side of one date you separate on. A person who leaves at 56 years and 10 months with 12 years of service, when their MRA is 57, has just lost FEHB for life and may not find out for years.

If you are thinking about leaving federal service before your MRA, this paragraph is the single most valuable thing in this guide.

### FEDVIP has no five year rule

Dental and vision coverage continues into retirement with no minimum enrollment period, and an annuitant may even enroll for the first time in retirement. Deferred annuitants are not eligible. A postponed annuitant loses it at separation and may enroll again when the annuity begins.

### Premiums change character in retirement

The government share is **identical** for annuitants and employees. The formula pays the lesser of 72 percent of the program wide weighted average premium or 75 percent of your plan’s total premium, either way.

What changes is that the premium conversion plan covers **current employees only**. As an employee your FEHB premium comes out pre-tax. As an annuitant it comes out **post-tax**.

The sticker premium is the same. The real cost is higher, by whatever your marginal rate is. Model the post-tax figure in every retirement year. The same applies to FEDVIP.

### Cancel versus suspend

An annuitant who **cancels** FEHB can never re-enroll. An annuitant may **suspend** coverage for Medicare Advantage, TRICARE, CHAMPVA, Medicaid or Peace Corps service, and re-enroll later during an Open Season or within the window around an involuntary loss of that coverage.

Cancel and suspend are two different forms. Know which one you are signing.

## 2.11 Medicare and FEHB at 65

**Part B is optional for an FEHB annuitant.** OPM says so directly. Your FEHB enrollment and premium are unaffected by whether you take it.

This is a genuine decision with costs on both sides.

**If you take Part B.** The 2026 standard premium is **$202.90 a month**, plus an income related adjustment if your income crosses a threshold. Medicare becomes primary and FEHB secondary. Many FEHB plans then waive deductibles, coinsurance and copayments, which for some plans effectively eliminates out of pocket costs. Some FEHB sponsored Medicare Advantage options reimburse part or all of the Part B premium.

**If you decline Part B.** You save the premium. You give up: a **permanent late enrollment penalty of ten percent of the standard premium for each full twelve month period of delay** if you take it later, eligibility for the FEHB Medicare Advantage options and their premium reimbursements, plan features that waive cost sharing when Medicare is primary, and coverage for out of network physicians Part B would have covered.

A trap inside the trap: **retiree coverage does not create a Medicare special enrollment period.** The eight month special enrollment period requires group coverage based on **current employment**. A retiree who skips Part B at 65 generally has to use the general enrollment period later, and eats the penalty.

### The income related adjustment and its two year lookback

The income related monthly adjustment amount, IRMAA, is set from your tax return **two years prior**. Your 2026 premium is set from your 2024 return.

For 2026, the standard premium applies up to $109,000 of modified adjusted gross income for a single filer and $218,000 filing jointly, and rises through five brackets to $689.90 a month at the top.

Two consequences follow. Your final high earning years before separation set your Part B premium two years into retirement. And a Roth conversion at 63 raises your premium at 65. That makes IRMAA a planning constraint rather than a surprise, and it is why the tax strategy analysis and the health care bridge analysis have to be run together.

You can appeal an adjustment on a life changing event basis, including work stoppage or work reduction, using Form SSA-44.

### Do not confuse FEHB with PSHB

The Postal Service Health Benefits Program covers Postal employees and annuitants only. It became mandatory on January 1, 2025 and it generally **requires** Medicare Part B enrollment for Medicare eligible annuitants.

The “Part B is mandatory” rule circulating in federal retirement discussion is a **Postal** rule. If you are not Postal, it does not apply to you.

## 2.12 Social Security

**Full retirement age is 67** for everyone born in 1960 or later.

Claiming at 62 with a full retirement age of 67 reduces the worker benefit by **thirty percent** and the spousal benefit by thirty five percent. Delayed retirement credits accrue at **eight percent a year** and stop at 70, so delaying from 67 to 70 produces a twenty four percent increase.

### The statement problem

Your Social Security statement projects your benefit **assuming you keep earning your current salary until you claim**. SSA confirms this in its own research: the projection assumes the worker continues to earn the same amount as in the year before the statement.

If you retire at 57 and claim at 67, those are ten zero earning years. Your real benefit is lower than the statement says, sometimes materially.

**The fix, and it takes ten minutes.** Sign in at ssa.gov, open the Retirement Calculator inside your my Social Security account, and set the expected average future annual earnings field to **0**. Save both results. The zero earnings figures are your planning basis. The statement figures are the optimistic case.

This error propagates twice, because the FERS Special Retirement Supplement is computed from the age 62 figure. Getting it wrong inflates both your Social Security line and your supplement line.

### WEP and GPO, and why they were never your problem

The Windfall Elimination Provision and the Government Pension Offset were fully repealed by the Social Security Fairness Act, signed January 5, 2025, effective for benefits payable from January 2024.

**FERS employees were never subject to either one.** FERS is a covered system. You pay Social Security payroll taxes on all federal service. WEP and GPO applied to CSRS and to non covered state and local systems. A career FERS retiree gained nothing from the repeal, because nothing was being withheld.

The exception is someone who transferred from CSRS and retains a CSRS component in their annuity, or who has non covered service from outside federal employment. That is why the interview asks about non covered employment.

### Taxation of benefits

Provisional income is your adjusted gross income, plus tax exempt interest, plus half your Social Security benefits.

| Filing status | Up to 50 percent taxable above | Up to 85 percent taxable above |
|---|---|---|
| Single | $25,000 | $34,000 |
| Married filing jointly | $32,000 | $44,000 |

**These thresholds are not indexed to inflation.** SSA states they have not changed since Congress set them in 1983, and that this was deliberate. Every year they capture more people.

For a FERS retiree this is structural rather than avoidable. Your annuity is fully taxable and counts in adjusted gross income, so most FERS retirees clear the 85 percent threshold on the annuity alone.

## 2.13 The TSP, and the rollover trap

### The age 55 rule

Withdrawals from the TSP are exempt from the ten percent additional tax if you separate from service **during or after the calendar year you reach age 55**.

It is keyed to the **calendar year**, not the date. Separating in December of the year you turn 55 qualifies. Separating in the year you turn 54 does not, no matter how close to your birthday.

Special category employees qualify at age 50, or at 25 years of service regardless of age.

### The trap

**Rolling your TSP into an IRA forfeits this exemption entirely.**

The IRS treats the age 55 separation exception as applying to qualified plans and not to IRAs. Once the money is in an IRA it is an IRA distribution, and the ten percent additional tax applies until 59 and a half unless a different exception is met.

For anyone retiring between 55 and 59, this is the highest value fact in this guide after the deferred retirement cliff. **Leave enough in the TSP to cover the bridge years before you roll anything anywhere.** The rollover pitch usually arrives within weeks of separation and rarely mentions this.

### Withdrawal mechanics

Four options, usable in combination: partial distributions with a $1,000 minimum, total distribution, installment payments with a $25 minimum, and a life annuity purchase with a $3,500 minimum.

Installments can be monthly, quarterly or annual, and **the amount and frequency can be changed at any time**. That has been true since September 15, 2019 and it replaced a much more restrictive rule that many published guides still describe.

**An annuity purchase is irrevocable.** Once made it is no longer part of your TSP account and cannot be changed or cancelled.

### 2026 limits

| Item | 2026 |
|---|---|
| Elective deferral, traditional and Roth combined | $24,500 |
| Catch up, ages 50 to 59 and 64 and over | $8,000 |
| Higher catch up, ages 60 to 63 | $11,250 |
| Annual additions, all sources | $72,000 |
| IRA contribution | $7,500 |
| IRA catch up, 50 and over | $1,100 |

The ages 60 to 63 catch up is a four year window and then it reverts. If you are inside it, or will be before you separate, that is a material and time limited opportunity.

From 2026, catch up contributions must be designated Roth for anyone whose prior year FICA wages from the employer exceeded $150,000. The TSP applies this automatically.

**Check your match.** The agency automatic contribution is one percent of basic pay, and the match runs to a further four percent on the first five percent you contribute. Contributing less than five percent leaves agency money on the table every pay period.

### Roth TSP and required minimum distributions

Under current law the Roth TSP balance is **not** subject to lifetime required minimum distributions, effective tax year 2024. Roth distributions also do not count toward satisfying the required distribution on your traditional balance.

### Required minimum distribution age

| Born | Applicable age |
|---|---|
| 1951 to 1958 | 73 |
| 1959 | Unsettled, see below |
| 1960 or later | 75 |

The 1959 birth year is genuinely unresolved. SECURE 2.0 contained a drafting conflict that assigned that cohort both 73 and 75, and the regulation leaves the subparagraph reserved. If you were born in 1959, treat this as an open item.

Note also that several IRS web pages have not been updated for the age 75 tier and still say 73 or 72. The regulation is the controlling text.

## 2.14 Leave and the separation date

### Annual leave lump sum

Not simply hours times your current hourly rate. Your agency **projects the leave forward** as if you had stayed on duty, applying hours to successive workdays and holidays, and any pay adjustment effective during that projected period is paid at the higher rate.

So a separation in late December can have part of the lump sum paid at the following January’s rate.

Included pay elements: basic pay, locality, special rate supplements, availability pay and similar. The ceiling is 240 hours for most employees, 360 overseas, 720 for SES. A retiree separating mid leave year can be paid the carried over balance **plus** the leave accrued during the final year, so the practical maximum is closer to 448 hours than to 240.

The payment is ordinary wage income in the year received, with federal and state tax, Social Security and Medicare withheld. **It cannot be deferred into the TSP.** Plan the net figure, not the gross.

Unused annual leave adds nothing to creditable service and nothing to your high-3.

### Why your separation date should be the last day of a month

Your FERS annuity **commences on the first day of the month after separation**. FERS annuities are not prorated within a month.

Separate on January 31 and your annuity accrues from February 1. Separate on January 1 and your annuity also accrues from February 1. The thirty extra days of work buy you nothing.

This is why month-end dates are the standard FERS choice. It differs from CSRS, where separation on the first, second or third of a month starts the annuity the next day.

Then look at four things at once when choosing a date: the month-end rule, the leave year boundary and what it does to your lump sum, whether a January pay adjustment falls inside the leave projection period, and whether the date crosses a service anniversary that adds a year to your computation.

## 2.15 The survivor election

| Election | Survivor receives | Your annuity reduced by |
|---|---|---|
| Full | 50 percent of the unreduced annuity | 10 percent |
| Partial | 25 percent of the unreduced annuity | 5 percent |
| None | Nothing | Nothing |

Spousal consent is required to elect anything less than the maximum, including the partial election.

**The decisive consequence is usually health insurance, not income.** OPM states that a surviving spouse can continue FEHB coverage **only if a monthly survivor annuity is payable**. Elect none, and your spouse’s FEHB ends at your death with only a one time conversion opportunity to a private policy.

The five percent partial election is sufficient to keep FEHB alive for your spouse, because it makes a monthly survivor annuity payable.

That reframes the decision. It is not only “is fifty percent of my annuity worth ten percent of it.” It is also “what does my spouse’s health coverage cost if it ends the day I die.” No life insurance policy replicates FEHB eligibility.

The election is irreversible after final adjudication of the retirement claim.

## 2.16 VERA, the early out

If your agency offers a Voluntary Early Retirement Authority, the thresholds are **age 50 with 20 years**, or **any age with 25 years**.

OPM states plainly: “There is no annuity reduction in FERS for employees who retire on an early voluntary retirement under age 55.” A CSRS component in a transferee’s annuity is reduced, but the FERS portion is not.

The supplement is payable but not until you reach your MRA. Discontinued Service Retirement, for involuntary separation by reduction in force or abolishment of position, uses the same thresholds.

## 2.17 Ten traps, collected

The master prompt carries these as a standing list and checks them in every report.

1. Applying a cost of living adjustment to the annuity before age 62.
2. Starting the annuity on the separation date rather than the first of the following month.
3. Assuming the FERS Special Retirement Supplement is payable when the path is MRA+10 or deferred.
4. Inflating the supplement, or running it past age 62.
5. Using the leave Service Computation Date instead of the retirement one.
6. Building the high-3 from W-2 gross pay.
7. Counting unused sick leave toward eligibility.
8. Missing the FEHB or FEGLI five year rule, or confusing postponed with deferred retirement.
9. Rolling the TSP to an IRA before 59 and a half and forfeiting the age 55 separation exception.
10. Using the Social Security statement figure unadjusted.

Three more that are not FERS specific but appear in nearly every plan: building the expense base from memory, accepting a stated loan payoff date without amortizing it, and mixing the FULL and RETIRED expense lenses.

# Part 3: Setup

Budget thirty minutes. You do not need to know anything about artificial intelligence to do this.

## 3.1 Install Claude Desktop

1. Go to `claude.ai/download` and install the desktop application for your computer.
2. Sign in or create an account.
3. **A paid plan is required.** The file and folder features this system depends on are not available on the free tier. Pro is sufficient. Max gives more headroom on long sessions, which matters during the interview and during a monthly report run.
4. Turn on **Cowork mode** when you see it offered. Cowork is the mode that lets Claude read and write files in a folder on your computer rather than only answering in a chat window. Everything here depends on it.

## 3.2 Get the files

Clone the repository:

```
git clone https://github.com/JBrady0850/fers-planning-project.git
```

Or open the repository page in a browser, click the green **Code** button, and choose **Download ZIP**. Unzip it anywhere. You do not need a GitHub account and you do not need to know git.

## 3.3 Build your workspace

Pick a real folder on disk. Any name works. `FERS Planning` is a reasonable default.

**It must be a folder in File Explorer or Finder, not a browser tab.** If you want it in OneDrive, Google Drive, Dropbox or iCloud, install that service’s desktop client first so the folder actually appears on disk.

### The fast way

From inside the repository folder, run the script for your platform.

Windows PowerShell:

```
.\scripts\New-FersWorkspace.ps1 -Path "C:\Users\you\Documents\FERS Planning"
```

macOS or Linux:

```
bash scripts/new-fers-workspace.sh ~/Documents/"FERS Planning"
```

The script creates the folder tree and copies the two living registers into place. It is safe to run twice: existing folders are left alone and the register files are never overwritten unless you pass `-Force` or `-- force`.

### The manual way

Create these folders yourself:

```
FERS Planning/
   01 Source Documents/
      New Raw Data/
      Old Raw Data/
   02 Baseline/
   03 Monthly Reports/
   04 Analysis/
   05 Boldin/
   06 Open Items/
   07 Archive/
   08 Boldin Entry Sheets/
```

Then copy `templates/facts-register.md` into `02 Baseline/` and rename it `Facts Register.md`, and copy `templates/open-items.md` into `06 Open Items/` and rename it `Open Items.md`. Copy `templates/boldin-entry-sheet.md` into `08 Boldin Entry Sheets/` and rename it `Boldin Entry Sheet Template.md`.

### What each folder holds

| Folder | Contents |
|---|---|
| `01 Source Documents` | Every statement, leave and earnings statement, and export exactly as you received it. Never edit anything in here. |
| `New Raw Data` | This month’s bank and credit card CSV exports, waiting to be processed |
| `Old Raw Data` | Exports already processed, renamed with a year and month prefix |
| `02 Baseline` | Your Facts Register and your Retirement Readiness Baseline |
| `03 Monthly Reports` | One subfolder per month |
| `04 Analysis` | The deeper studies |
| `05 Boldin` | Boldin exports and the validation reports that check them |
| `06 Open Items` | The running list of unanswered questions |
| `07 Archive` | Superseded versions. Nothing is ever deleted, only archived. |
| `08 Boldin Entry Sheets` | The dated sheets telling you exactly what to type into Boldin, and what each value replaces |

## 3.4 Decide where the raw documents live, before you load any

This is a decision, and it is easier to make now than to unwind later.

Your workspace will hold leave and earnings statements, TSP statements, benefit estimates and tax returns. Those documents carry account numbers and Social Security numbers.

- **If the folder is shared with anyone**, whether a spouse, a friend helping you set this up, or a work colleague, they can read all of it.
- **If it syncs to a personal cloud account**, those documents leave your machine and live wherever that service keeps them.

You have a clean alternative and it costs nothing. Keep `01 Source Documents` in a private local folder, connect **both** folders to the Claude project, and let only finished reports land in the shared or synced one. Claude works identically either way.

**Do not place any of this on a government system, and check your agency policy before moving anything off one.** Nothing in this repository is government property or an official product.

## 3.5 Create the project and load the prompt

1. Open Claude Desktop.
2. Create a new **Project** and name it `FERS Planning`.
3. Open the project’s **Instructions** field.
4. Open `MASTER-PROMPT.md` from the repository. Copy everything **between the two lines of equals signs**. Not the file header above the first `=====`, and not the design notes below the second one.
5. Paste it into the Instructions field and save.
6. Use **Add folder** and select the workspace folder you built in Section 3.3. If you kept source documents in a separate private folder, add that one too.

### The one mistake to avoid

**Paste the prompt into the project Instructions field, not into a chat message.**

Instructions load automatically on every new conversation inside that project. A chat message applies only to that one conversation, and its influence fades as the conversation gets long.

The symptom of getting this wrong is that everything works for twenty minutes and then Claude starts producing figures without sources, forgets which block it was on, or writes a report that skips the definition of done. If that happens, check where the prompt went before you troubleshoot anything else.

## 3.6 Verify the setup works

Open a new conversation inside the project and type exactly:

```
Begin Phase A, then start the interview at Block 1.
```

Phase A is a setup check. A correct response does four things:

1. Lists the top level contents of your folder, which proves the connection works
2. Confirms the eight subfolders exist, and creates any that do not
3. Inventories `01 Source Documents` and tells you which checklist items are present and which are missing
4. States what it can build today and what is blocked, by which missing document

If it cannot see your folder, re-add it in the project settings and confirm your cloud sync client has finished syncing. A file still uploading is a file Claude cannot read.

Then it starts Block 1.

## 3.7 Working habits that make this go well

**Answer in plain language.** You are not writing input for a form. “I think around 24 years but I am not certain” is a better answer than a confident wrong number, and the system is built to handle it.

**Say when you do not know.** The correct phrase is: `I do not know, record it as an open item and continue.` It records the gap, names the document that would close it, and moves on.

**Stop whenever you like.** Type `resume the interview` in a new conversation in the same project. Your answers live in the Facts Register on disk, not in the conversation, so nothing is lost.

**Challenge any figure that surprises you.** Reply: `Cite the source for that figure or label it as an estimate.` The prompt instructs Claude to provide the source and the arithmetic every time.

**Ask for arithmetic.** `Show me the calculation` is always a reasonable request, and for anything driving a decision it should already be there.

**Do not accept a stale verdict.** If the numbers changed but the summary sentence did not, say so. The prompt forbids it, and catching it is exactly the kind of check the system is designed to invite.

# Part 4: Gathering Your Documents

## 4.1 Do not wait for all of it

Six documents start the interview. The rest can arrive over the following weeks, and the system tracks what is missing and states in every report which conclusions are provisional because of a gap.

The mistake is not starting late. The mistake is waiting three months for a complete set, losing momentum, and never starting at all.

## 4.2 The minimum viable start

| # | Document | Where | Why this one |
|---|---|---|---|
| 1 | Most recent leave and earnings statement | Your agency payroll portal | Basic pay, locality, every deduction line, and your sick and annual leave balances, all in one place |
| 2 | Service Computation Date for retirement purposes, in writing | Agency benefits office | Decides every eligibility date and the years of service in your annuity formula |
| 3 | Agency annuity estimate for at least one candidate date | Agency benefits portal or benefits officer | The reference figure your independent computation is checked against |
| 4 | Social Security statement plus a zero future earnings estimate | ssa.gov | Two documents. The second is not optional. See Section 4.5. |
| 5 | Most recent TSP quarterly statement | tsp.gov | Traditional and Roth balances, contribution rate, fund allocation |
| 6 | FEHB enrollment history showing continuous coverage dates | Agency benefits office or eOPF | Tests the five year rule against every separation date you are considering |

Items 2 and 6 usually come from a person rather than a portal, which means they take the longest. Send those requests first. Section 4.3 gives you the wording.

## 4.3 Three requests to send your benefits office today

Ask in writing, so the reply is a document you can cite rather than a recollection. Copy these.

**Subject: Retirement planning records request**

I am building a retirement plan and need three items in writing.

1. My Service Computation Date for **retirement purposes**, and confirmation of whether it differs from my leave SCD and why. 2. A written statement of any federal service in my record for which **retirement deductions were not withheld**, with the dates of each period and the deposit amount required to make it creditable. 3. The current balance and status of my **military service deposit**, if applicable, and the deadline by which it must be paid.

Thank you.

Add a fourth if you have ever taken a refund of retirement contributions:

1. A written statement of the refunded service period and the **redeposit** amount required.

Why each one earns its place:

**Request 1** is the foundation. Your retirement SCD is not usually the SCD printed on your leave and earnings statement, and every annuity figure depends on it.

**Request 2** finds service that will not count. Non deduction service before January 1, 1989 can be made creditable by paying a deposit; on or after that date it generally cannot be made creditable at all under FERS. Unpaid deposit service that does not count toward eligibility pushes your earliest unreduced date later, which is how a person planning for MRA plus 30 arrives with 28 years.

**Request 3** has a hard deadline. The military service deposit must be paid **before you separate**. OPM cannot accept it afterward. If you have four years of active duty and a high-3 near $110,000, that service is worth roughly $4,400 a year in annuity for life, and the deposit typically pays back in well under two years.

## 4.4 The ten tiers, in brief

The full checklist with file naming conventions is in `docs/03-document-intake-checklist.md`. Priority key: **P1** blocks the interview, **P2** blocks the baseline, **P3** blocks a specific analysis only.

| Tier | Contents | Priority |
|---|---|---|
| 1 | FERS service and eligibility: retirement SCD, LES, annuity estimates, SF 50s, salary history, DD-214s, military deposit status, refund records | P1 |
| 2 | Social Security: statement, zero earnings estimate, earnings history, spouse’s statement | P1 |
| 3 | Federal insurance: FEHB enrollment history, plan brochure Sections 5 and 9, FEGLI enrollment history and Basic Insurance Amount, FEDVIP enrollment | P1 |
| 4 | TSP and other accounts: TSP statements, IRAs, Roth basis, brokerage, bank, HSA, prior employer accounts | P2 |
| 5 | Expenses: twelve months of transactions from every account, mortgage or lease, every loan statement, insurance policies, property tax, annual and semiannual bills | P2 |
| 6 | Health care costs: current premium, annuitant premium tables, prescription list, Medicare Part B and IRMAA tables, TCC rates, spouse coverage | P2 |
| 7 | Tax: last two federal returns, state return, 1099-Rs, 5498s, W-2s | P3 |
| 8 | Survivor and beneficiary: SF 3102, TSP-3, SF 2823, SF 1152, spouse profile, any court order | P3 |
| 9 | Veterans benefits if applicable: VA rating decision, health enrollment and priority group, military retired pay | P3 |
| 10 | Boldin: planner summary CSV export and PDF report | P3 |

## 4.5 The zero earnings estimate, and why it is mandatory

Your Social Security statement projects your benefit **assuming you keep earning your current salary until you claim**. SSA confirms this in its own published research.

If you retire at 58 and claim at 67, those are nine zero earning years. The statement is describing a future in which you never retired.

**How to produce the correct figure, in about ten minutes:**

1. Sign in at ssa.gov to your **my Social Security** account.
2. Open the **Retirement Calculator**.
3. Select your intended retirement age or date.
4. Find the field for **expected average future annual earnings** and enter **0**.
5. Record the result at 62, at full retirement age, and at 70.
6. Save both the original statement and this estimate into `01 Source Documents`.

The SSA Online Calculator at ssa.gov/oact/anypia also accepts future earnings, but it requires entering your earnings history manually. The **Quick Calculator is not suitable**, because it adjusts past earnings rather than future ones.

This error propagates twice. The FERS Special Retirement Supplement is computed from your age 62 figure, so an overstated statement figure inflates both your Social Security line and your supplement line, for every year of the projection, compounded by cost of living adjustments.

## 4.6 Expenses: the tier people skip

Twelve months of real transactions. Not a budget. Not a recollection. Not last month times twelve.

**Export CSV, not PDF.** CSV can be categorized automatically. PDF cannot, and converting it is slow and error prone.

**List every account you spend from and export each one.** Checking, savings, every credit card, and any account a bill autopays from.

**If you use an aggregator such as Empower or Monarch**, one export can replace the stack. But verify it sees everything: an aggregator only knows about accounts linked to it, and a missing account produces an expense base that is quietly too low. Too low is the direction that makes a plan look solvent when it is not.

**Do not forget the bills that do not appear monthly.** Property tax, insurance premiums paid semiannually, annual subscriptions, vehicle registration. A semiannual bill shows up in roughly half the months and gets misread as an anomaly in both directions.

Twelve months is the requirement because it captures every annual and seasonal item exactly once.

## 4.7 File naming

Use the names given in `docs/03-document-intake-checklist.md`. Consistent names let Claude find and cite a document without asking you where it is, and a report that says “per `LES 2026-08-28.pdf`” is auditable six months later in a way that “per your pay stub” is not.

The general pattern is a descriptive name plus a date in `YYYY-MM-DD` form:

```
LES 2026-08-28.pdf
SCD Retirement Confirmation 2026-09-02.pdf
Annuity Estimate 2026-08-15 Sep 2031-12-31.pdf
SSA Statement 2026-09-01.pdf
SSA Estimate Zero Earnings 2026-09-01.pdf
TSP Statement 2026-Q2.pdf
FEHB Enrollment History.pdf
Bank Transactions 2025-09 to 2026-08.csv
```

## 4.8 A realistic gathering sequence

**Day 1.** Send the three written requests to your benefits office. Download your most recent leave and earnings statement. Create your ssa.gov account if you do not have one.

**Day 2 or 3.** Run both Social Security estimates. Download your TSP statement. Request an annuity estimate through your agency portal if one exists.

**Week 1.** Export twelve months of transactions from every account. This is the longest self service task.

**Week 2.** Pull loan statements, insurance policies, and your last two tax returns.

**Whenever the benefits office replies.** File the response and tell Claude it arrived. Several open items close at once, and the eligibility dates firm up from estimates into sourced facts.

**Start the interview after Day 3.** You will have five of the six minimum documents, and the sixth arrives while you are already working.

# Part 5: The Interview, Block by Block

Fourteen blocks, about ninety minutes, stoppable at any point. Claude asks at most five questions per message and writes your answers into `02 Baseline/Facts Register.md` before moving on, so nothing lives only in the conversation.

This part tells you what each block asks, why it asks it, what to have in front of you, and what to watch for. Read it before you start, or read each section as you reach that block.

Start with:

```
Begin Phase A, then start the interview at Block 1.
```

## Block 1: Identity and the four eligibility dates

**Have ready.** Date of birth, your retirement Service Computation Date, your agency, series, grade, step and duty location.

**What it asks.** Five questions before it asks anything about what you want. The fifth is the interesting one: *what date do you believe you are first eligible to retire, and where did that date come from?* Your answer is recorded and explicitly not treated as correct yet.

**What it then does.** Derives your Minimum Retirement Age from the table in Section 2.2, shows the arithmetic, and computes four dates:

| Date | Meaning |
|---|---|
| MRA date | The calendar date you reach your Minimum Retirement Age |
| Earliest immediate annuity | The earliest date any immediate annuity is payable, normally MRA with 10 years, which is reduced |
| **Earliest immediate unreduced annuity** | The earliest of MRA with 30, age 60 with 20, or age 62 with 5. It states which one governs. |
| 1.1 percent multiplier date | Age 62 or older with at least 20 years, both at separation |

Then it builds your age trigger table: 50, 55, 59 and a half, 62, 65, 67, 70, and your required minimum distribution age.

**Only then** does it ask your preferred retirement date, and whether you understand the reduction it carries if it precedes the unreduced date.

**Why in that order.** Eligibility is a fact the rules decide. A preferred date is a scenario measured against it. Work the other way around and you can spend five years planning toward a date that carries a permanent twenty five percent reduction you never priced.

**What to watch for.** If your stated date and the derived date disagree, that gap is the most valuable output of the whole interview and it goes at the top of the baseline. The two usual causes are counting a leave SCD instead of a retirement SCD, and assuming the MRA is 55.

**The health insurance window falls out here.** Count the months from each candidate date to your 65th birthday. That is coverage you carry yourself, and it is usually the largest unmodeled line in a federal retirement plan.

## Block 2: Creditable service audit

**Have ready.** Your SF 50s, any DD-214, and whatever you know about periods when retirement deductions were not withheld.

**What it asks.** Your full employment history with appointment types, any period without retirement deductions, any refund you ever took, every period of military service and the status of the deposit, and any part time service or extended leave without pay.

**What it computes.** Total creditable service at each candidate date in years, months and days. The effect of every unpaid deposit. The military deposit amount, its deadline, and the payback period in years. The part time proration factor. And critically, **whether any of the above moves an eligibility date**.

**Why this block exists.** This is the highest variance item in a FERS plan and the one most often skipped. The trap it catches: unpaid pre-1989 deposit service that does not count toward eligibility pushes your earliest unreduced date later by exactly as many years as the unpaid service. That is how a person plans for MRA plus 30, arrives at their MRA, and discovers they have 28 years of creditable service.

**The deadline in this block.** A military service deposit must be paid **before you separate**. OPM cannot accept it afterward. If the answer here is “I never paid it,” this block just found you money with a clock on it.

**What to watch for.** Moving an eligibility date is worth far more than the annuity increase a deposit buys. The system prices those separately. Read both numbers.

## Block 3: High-3 and the annuity computation

**Have ready.** Your current leave and earnings statement, and salary history with effective dates for at least the last four years.

**What it asks.** Current annual rate of basic pay including locality, salary history with the effective date of every step increase and pay adjustment, any expected promotion before your candidate dates, whether you receive availability pay or AUO, and whether you have an agency annuity estimate.

**What it does.** Builds your high-3 **independently**, time weighted, using basic pay only. Then computes the annuity, applies sick leave credit, part time proration, any age reduction, and any survivor reduction. Then compares against your agency estimate.

**If the two diverge by more than two percent**, it writes the discrepancy up as its own note with the arithmetic shown, and uses the lower figure as the planning figure until your benefits office resolves it in writing.

**What to watch for.** The most common cause of a divergence is a high-3 built from W-2 gross pay, which includes overtime, awards and the leave lump sum. None of those are basic pay. Locality pay, on the other hand, is basic pay and does count.

**Do not treat the agency estimate as ground truth.** Estimating tools routinely fold non creditable pay into the salary base. That is not a criticism of your benefits office; it is why an independent rebuild is worth the fifteen minutes.

## Block 4: The FERS Special Retirement Supplement

**Have ready.** Your zero future earnings Social Security estimate, and an honest answer about post retirement work.

**What it asks.** Whether each candidate date produces an immediate unreduced annuity. Whether you intend to work after retiring and at roughly what earnings. Whether you are in a special provision position. What an agency estimate shows. And whether you understand that it stops at 62 regardless of Social Security.

**What it does.** States eligibility plainly before computing anything, because the rules exclude more people than they include. MRA+10 gets nothing. Deferred gets nothing. Disability gets nothing.

If eligible, it computes the supplement from your zero earnings age 62 figure times FERS civilian years divided by 40, notes that military service does not count in the numerator even if you paid the deposit, and then attaches three properties to every projection: no cost of living adjustment ever, ends at the end of the month you turn 62, and subject to the earnings test.

**If you plan to work**, it models the supplement net of the test: one dollar of reduction for every two dollars above $24,480 for 2026, applied the year after the earnings were made.

**What to watch for.** A post retirement job at $45,000 erases roughly $10,260 a year of supplement. People discover this the July after their first working year, when the payment drops. Model it in advance and it is a decision rather than a surprise.

**The sensitivity case.** Because elimination of the supplement was proposed in 2025 and removed on procedural grounds rather than on the merits, the system runs one case with the supplement set to zero so you know the size of that exposure. Ask for it if it does not appear.

## Block 5: Sick leave, annual leave, and the separation date

**Have ready.** Your leave and earnings statement with current sick and annual leave balances, and your hourly rate.

**What it asks.** Both balances and their accrual rates, your use or lose ceiling, your hourly rate of basic pay including locality, any restored leave, and whether a January pay adjustment falls between your intended separation date and the end of the lump sum projection period.

**What it computes.** Three things.

**Sick leave credit**, converted at 2,087 hours to a year, and then expressed as **additional annual annuity dollars**. That last step matters. A balance stated in hours does not feel like money. The same balance stated as “$45.83 a month for life” does, and it changes how people treat sick leave in their final two years.

**The annual leave lump sum**, projected forward the way your agency actually pays it, including any pay adjustment effective during the projected period, and then stated **net** of federal and state tax, Social Security and Medicare. It cannot be deferred into the TSP, so the net figure is meaningfully lower than the gross.

**The annuity commencement date** for each candidate separation date, applying the rule that a FERS annuity commences the first day of the month after separation.

**What to watch for.** Separating on the second of a month means working most of that month for no additional annuity. Month-end separation dates are the default for that reason. The block compares candidate dates on four axes at once: the month-end rule, the leave year boundary, whether a January pay adjustment lands inside the projection period, and whether the date crosses a service anniversary.

## Block 6: TSP and other retirement accounts

**Have ready.** Your TSP quarterly statement and statements for every other account.

**What it asks.** TSP balance split between traditional and Roth, contribution per pay period and whether you are capturing the full agency match, fund allocation, and every other account including any from employment before federal service.

**Four items it flags in writing.**

**The age 55 rule and the rollover trap.** TSP withdrawals are exempt from the ten percent additional tax if you separate during or after the calendar year you turn 55. **Rolling the TSP into an IRA forfeits that exemption entirely.** For anyone retiring before 59 and a half this is the highest value fact in the block. Keep enough in the TSP to cover the bridge years before rolling anything anywhere.

**Roth TSP and required minimum distributions.** Under current law the Roth balance is not subject to lifetime required distributions, effective tax year 2024.

**Contribution limits and the 60 to 63 window.** For 2026: $24,500 elective deferral, $8,000 catch up at 50, and **$11,250 for ages 60 through 63**. If you will be inside that four year window before you separate, it is a material and time limited opportunity and it belongs in the baseline rather than in passing.

**Withdrawal mechanics.** Installments can be changed in amount and frequency at any time, which has been true since 2019 and which many published guides still get wrong. A TSP annuity purchase is irrevocable.

**What to watch for.** Check the match. The agency automatic contribution is one percent and the match runs to four percent more on the first five percent you contribute. Contributing less than five percent leaves agency money behind every pay period.

## Block 7: Social Security

**Have ready.** Both estimates, the statement and the zero earnings run, and your spouse’s if married.

**What it asks.** Your statement figures at 62, full retirement age and 70. Your zero earnings figures at the same three ages. Marital status and spousal considerations. And any employment **not covered by Social Security** at any point in your career.

**What it does.** Uses the zero earnings figures as the planning basis and labels the statement figures as the optimistic case. Applies a full retirement age of 67 for anyone born 1960 or later, a thirty percent reduction at 62, and eight percent per year of delayed credits to 70.

**On WEP and GPO.** The block addresses them once and then drops them. Both were repealed by the Social Security Fairness Act in January 2025, and **FERS employees were never subject to either one** because FERS is a covered system. A career FERS retiree gained nothing from the repeal. The exception is someone with a CSRS component or non covered service from outside federal employment, which is why question 5 exists.

**What to watch for.** The interaction is where the real decision lives. Delaying Social Security means larger portfolio withdrawals in the interim, which changes the withdrawal rate and the taxable income in exactly the years that matter for Roth conversions and for the Medicare two year income lookback.

## Block 8: Income today

**Have ready.** An actual leave and earnings statement, not a recollection of one.

**What it asks.** Gross salary, net pay per pay period, and **every deduction line itemized**: FERS employee contribution, FICA and Medicare, federal and state withholding, FEHB, FEDVIP, FEGLI, TSP traditional and Roth, and any allotment. Then any other income. Then which of those lines stop, change, or start at retirement.

**Why the itemization matters.** That last question produces more correction than any other in the block.

Lines that **stop** at separation: the FERS employee contribution, FICA and Medicare on wages, TSP contributions, and any FEGLI Option you drop.

Lines that **change character**: FEHB and FEDVIP premiums, which are deducted pre-tax while you are employed and **post-tax as an annuitant**. The premium is the same. The real cost is higher by your marginal rate. This is routinely missed and it makes retirement look cheaper than it is.

**What to watch for.** If you receive VA disability compensation, it is recorded as tax free income with its own cost of living adjustment history and kept as a separate line from the FERS annuity, because the two adjust on different rules.

## Block 9: Expenses today

**Have ready.** Twelve months of transactions from every account, exported as CSV into `01 Source Documents/New Raw Data`.

**What it asks.** Every account you spend from. Cash expenses that never appear in an export. Which expenses are fixed and which discretionary. **Which end at retirement. Which begin or rise at retirement.**

**What it builds.** Three lenses that are never mixed.

| Lens | Definition | What it is for |
|---|---|---|
| **FULL** | Every dollar leaving the account today | Cash flow reality, and the only correct basis for any question about available cash |
| **CURRENT** | FULL less one time and non recurring items | Trend and run rate |
| **RETIRED** | CURRENT less what ends, plus what begins | The retirement burn baseline, and the only correct basis for withdrawal rate math |

**Two rules that prevent the most common error in the whole method.**

**Never quote the RETIRED lens surplus as spendable cash today.** Money stripped out of the retirement lens because it ends at retirement is still leaving your account this month. Confusing the two overstates how fast you can build a cash bridge, and it is an easy mistake to make because the RETIRED number is the one you have been staring at.

**Every exclusion needs a written reason and a confirmed end date.** They go in a table in the Facts Register. An assumed end date is an estimate and gets labeled as one.

**What to watch for.** Expenses that begin at retirement are underestimated more often than expenses that end are overestimated. Health insurance at the post-tax annuitant rate, travel in the first few years, home maintenance you have been deferring, and a second vehicle if you have been sharing a commute car.

## Block 10: FEHB, FEDVIP, FEGLI, and the pre-65 window

**This block carries more permanent consequences than any other except Block 1.**

**Have ready.** Your FEHB enrollment history with continuous coverage dates, your FEGLI enrollment history with dates for Basic and each Option, your current premiums, and your Basic Insurance Amount from your leave and earnings statement.

**What it tests, and states plainly.**

**The FEHB five year rule.** It computes the date you satisfy the rule and compares it to **every** candidate separation date. If any candidate date fails, that is a headline finding, not a footnote. A failed date is not a slightly worse date; it is a date that forfeits federal health insurance permanently.

**The FEGLI five year rule.** Tested separately for Basic and for each Option. **OPM has no authority to waive it.** The block states that contrast with FEHB explicitly, because FEHB’s rule is waivable in narrow circumstances and FEGLI’s is not.

**Postponed versus deferred.** For each candidate date it states which path you land on. Separating after your MRA with at least ten years puts you on the postponed path, where FEHB and FEGLI terminate at separation but may be re-enrolled and reinstated when the postponed annuity begins. Separating **before** your MRA puts you on the deferred path, where OPM states that you are never eligible to re-enroll in health, life, dental or vision benefits.

**The premium character change.** Government share identical, premium conversion for employees only, so annuitants pay post-tax.

**Then it costs the pre-65 window month by month**, comparing FEHB at the annuitant post-tax rate against Temporary Continuation of Coverage at 102 percent and against a spouse’s plan.

**Then it models Medicare from 65.** Both paths: FEHB alone with the permanent late enrollment penalty priced if you take Part B later, and FEHB plus Part B with your plan’s Medicare coordination benefits from Section 9 of the brochure and any Part B premium reimbursement. Including IRMAA and its two year lookback.

**What to watch for.** Do not confuse FEHB with the Postal Service Health Benefits Program. PSHB requires Part B for most Medicare eligible annuitants. FEHB does not. The “Part B is mandatory” rule circulating in federal retirement discussion is a Postal rule.

## Block 11: Survivor election and beneficiaries

**Have ready.** Your spouse’s date of birth and their own retirement income sources, and whatever you can find about beneficiary designations on file.

**What it asks.** Marital status and spouse details, your intended election, beneficiary designations on FERS (SF 3102), TSP (TSP-3), FEGLI (SF 2823) and unpaid compensation (SF 1152), any court order from a prior marriage, and your intent if long term care becomes necessary.

**What it does.** Prices all three elections as arithmetic: full at a ten percent reduction producing fifty percent to the survivor, partial at five percent producing twenty five percent, and none.

**Then it states the consequence that usually decides the question.** A surviving spouse can continue FEHB **only if a monthly survivor annuity is payable**. Elect none and your spouse’s health coverage ends at your death with a one time conversion opportunity. The five percent partial election is sufficient to keep it alive.

That reframes the decision from “is fifty percent of my annuity worth ten percent of it” to “what does my spouse’s health coverage cost if it ends the day I die.” No life insurance policy replicates FEHB eligibility.

**Then it checks beneficiary designations as a completeness item.** A stale beneficiary designation overrides a will. It is the cheapest and most frequently neglected fix in retirement planning and it takes one form per account.

**What to watch for.** Spousal consent is required to elect anything less than the maximum. The election is irreversible after final adjudication of the retirement claim. This one goes to a fiduciary.

## Block 12: Debt, housing, and one time events

**Have ready.** Every loan statement with balance, rate and payment. Your mortgage statement or lease.

**What it asks.** Every debt with its numbers, your housing cost and how long it is confirmed, expected one time inflows including the leave lump sum and your final paycheck, expected one time outflows, and whether you intend to relocate and to which state.

**What it does. Amortizes every loan independently** from the current balance, rate and payment. It does not accept a stated payoff date.

**Why that matters.** An incorrect payoff date moves the year in which the plan is tightest, which moves the size of the required spending cut. In one documented real case, an independently rebuilt amortization moved a vehicle payoff nine months earlier than the plan assumed, shifted the binding year from 2030 to 2029, and reduced the required monthly spending cut by $132.47. The planning tool was right and the hand built model was wrong.

**What to watch for.** State income tax treatment of the FERS annuity varies materially by state. If relocation is on the table, both states get modeled.

## Block 13: Assumptions and risk

**What it asks.** Longevity age, general inflation, medical inflation which should be higher than general, expected portfolio return and whether you want an average case, a pessimistic case or both, and how you would react to a thirty percent portfolio decline in your first retirement year.

**That last question sets the size of your cash bridge.** Not a risk tolerance questionnaire. What you would actually do.

**Three FERS specific assumptions recorded separately**, because these are the ones planning tools get wrong:

- **FERS annuity COLA before 62: zero.** Unless you are a special provision retiree, a disability retiree or a survivor.
- **FERS annuity COLA after 62: the diet COLA.** Full CPI-W under two percent, flat two percent between two and three, CPI-W minus one point above three.
- **FERS Supplement COLA: zero, always.**

**What to watch for.** Set the longevity age deliberately rather than accepting a default. It is one of the few assumptions that changes the answer at every horizon, and a tool’s default is not your decision.

## Block 14: Boldin

**What it asks.** Whether you have an account and have completed setup, which tier, whether you can export the planner summary CSV and download the PDF, what Chance of Success it currently shows and under which scenario, and whether you entered anything you are unsure about.

That last question is the useful one. Anything you guessed at during Boldin setup is a defect waiting to be found, and naming it now saves a validation cycle.

Then the work moves to Part 8 of this guide and to `docs/05-boldin-setup-and-validation.md`.

## After the interview

Type:

```
Build the Retirement Readiness Baseline.
```

Part 6 explains what comes back.

# Part 6: The Baseline

## 6.1 What it is

The Retirement Readiness Baseline is the founding document of the system. Everything after it is refinement.

Build it by typing:

```
Build the Retirement Readiness Baseline.
```

It lands at `02 Baseline/Retirement Readiness Baseline YYYY-MM-DD.md`.

**Build it once.** Rebuild it only when a foundational fact changes: an eligibility date moves, a deposit is paid, a candidate separation date is added or dropped, or a material asset revision lands. It is not a monthly document. That is what the monthly report is for.

## 6.2 The thirteen sections

**1. Verdict in three sentences.** On track, tight, or short, and by how much per month. If you read nothing else, read this. And if the numbers in the body do not match this sentence, say so, because the prompt forbids it.

**2. The eligibility date table.** Your MRA date, earliest immediate annuity, earliest immediate unreduced annuity, and 1.1 percent multiplier date, each with the governing rule, a citation, and the arithmetic. Your preferred date shown beside them with its reduction priced and its supplement eligibility stated. **This goes near the top, not in an appendix.**

**3. The creditable service audit.** Every unpaid deposit priced, and every eligibility date it moves identified.

**4. The annuity computation.** Built independently, compared against your agency estimate, with the variance explained.

**5. Retirement income line by line, each with its own start date.** This section is the reason the baseline exists. Your FERS annuity, the Special Retirement Supplement, Social Security, any VA compensation, and portfolio withdrawals all start on different dates. The gaps between those dates are where plans fail, and a single “retirement income” number hides them completely.

**6. The three expense lenses** with the exclusion table.

**7. Assets** by account, by tax treatment, and by allocation.

**8. The gap.** Retirement burn minus guaranteed income, monthly and annually.

**9. Required withdrawal rate.** The annual gap divided by the total portfolio. Flagged if it exceeds four percent.

**10. The insurance findings.** The FEHB five year rule result, the FEGLI five year rule result, and whether each candidate date lands on the postponed or the deferred path.

**11. The pre-65 health window**, costed month by month at the post-tax annuitant rate.

**12. Every assumption in one table**, each labeled `[SOURCED]` or `[ESTIMATE]`.

**13. Open items ranked by impact**, not by age.

## 6.3 How to read it

**Start with the verdict, then jump to section 2.** If your derived eligibility dates differ from what you believed, everything downstream is built on a different foundation than you expected, and reading the rest in order without absorbing that first will mislead you.

**Then read section 5 carefully.** Look at the start dates. A plan that is comfortable in steady state can be badly short in months four through eleven of the first year, and section 5 is where you see that.

**Then read section 12.** Every `[ESTIMATE]` label is a place the plan is resting on an assumption rather than a document. Some of those are fine. Others are the open items in section 13.

**Then read section 13 and pick two.** Open items are ranked by how much the answer could move the plan. Close the top two this month. Do not try to close all of them.

## 6.4 What a verdict actually means

**On track.** Guaranteed income plus a sustainable withdrawal rate covers your RETIRED lens burn, with margin. The work shifts from “can I” to “when, and on what terms.”

**Tight.** It works under the modeled assumptions and it does not survive much stress. A sequence of poor returns in the first years, a health cost above the modeled rate, or a spending level above the target, and it breaks. The useful response is to find margin: a later date, a lower burn, a larger cash bridge, or a deposit that raises the annuity.

**Short.** The gap exceeds what the portfolio can fund sustainably. Five to seven years is a long time and a great deal can be done with it. Five months is not. Finding this early is the whole point.

**One caution about a good verdict.** A projection that shows success is conditional on hitting the spending figures in the model, which are a **target**, not your trailing actual run rate. The monthly cycle exists to close that gap, and until three or four months of real data are in, treat a favorable verdict as provisional.

## 6.5 The definition of done

Every report this system generates ends with a checklist, stated as passed or failed:

- Every figure carries a source citation or an `[ESTIMATE]` label with its assumption
- Decision driving arithmetic is shown and reproducible
- Assumptions sit in one table, not scattered through the prose
- Source conflicts are stated and left unresolved rather than papered over
- The verdict sentence matches the numbers in the body
- Open items are listed with the size of their potential impact
- The file is in the correct subfolder with the date in the file name
- The prior version was archived rather than overwritten

If any item fails, the report says so. A report that quietly omits the checklist is a report to be suspicious of.

# Part 7: The Monthly Cycle

## 7.1 The whole commitment, in fifteen minutes

Once a month, on a day you pick and keep:

1. Export the prior month’s transactions from every bank and credit card account into `01 Source Documents/New Raw Data`. Wait for your cloud client to finish syncing.
2. Update any account balance that changed, and drop in the current TSP statement if a new quarter has closed.
3. Open the project and type `run the monthly report`.

That is it.

## 7.2 Why it exists

A retirement plan built on a remembered budget is worthless, and a plan built on a budget that was accurate eighteen months ago is on its way to worthless.

The monthly cycle replaces modeled spending with **measured** spending, and it feeds a trailing three month average burn into every sustainability calculation. That trailing actual, not the target, is what tells you whether the plan is real.

It also catches drift early. A verdict that moves from “on track” to “tight” over four months is a signal worth acting on while acting is still cheap.

## 7.3 What it produces

`03 Monthly Reports/YYYY-MM/Monthly Report YYYY-MM.md` plus a companion workbook with four tabs: Summary, Portfolio, Sustainability, and Transaction Detail.

The thirteen steps it runs:

1. Classify every CSV by **header signature, not file name**, and report anything it cannot classify rather than skipping it
2. Categorize transactions into fixed and discretionary
3. Separate one time items, each with vendor, amount, and the reason it is non recurring
4. Compute all three lenses
5. Update balances and month over month change
6. Recompute the gap and the required withdrawal rate
7. Compare to prior month and to baseline, explaining every variance above ten percent
8. Update the trailing three month average burn
9. Re-run the feasibility analysis with the new burn
10. Write the report and the workbook
11. Move processed files to `Old Raw Data` with a `YYYY-MM` prefix
12. Update the open items list
13. Produce or append to the Entry Sheet for every figure the month changed that Boldin holds, carrying forward any row still open from the prior sheet

Once a quarter it also adds your current leave balances and restates your sick leave credit in annuity dollars.

**One schema requirement worth knowing about.** The Sustainability tab must contain a cell labeled exactly `Trailing 3-Month RETIRED Burn`. Downstream analyses find it by exact label match. If a monthly report is missing it, the chain breaks quietly, so it is worth a glance.

## 7.4 The verdict rule

If the sustainability verdict changes in either direction, the report says so **at the top, in plain language**.

Never updating numbers and leaving a stale verdict sentence in place is explicitly forbidden. If you see it happen, call it out. That check is one of the most valuable things you can do as a reader.

## 7.5 Reading a monthly report

**Read the top line first.** Did the verdict move?

**Then the one time items list.** This is where almost every surprising number comes from. A month that looks terrible usually contains a semiannual insurance premium or a vehicle repair. A month that looks wonderful usually means a bill did not land in it.

**Then the variance explanations.** Anything above ten percent gets an explanation. Read whether it is a real change in behavior or a timing artifact.

**Then the trailing three month burn.** This is the number that matters. A single month is noise. Three months is a trend.

**Then the transaction detail, if anything looked wrong.** Nearly every bad monthly figure traces to one miscategorized transaction.

## 7.6 Common problems

| Symptom | Cause | Fix |
|---|---|---|
| A file was not processed | Header signature not recognized | The report names it. Tell Claude what kind of file it is. |
| Burn jumped and nothing changed | A semiannual or annual bill landed | Confirm it is in the one time list, not the recurring base |
| Burn dropped and nothing changed | An account export is missing | Check every account exported this month |
| Two months look identical | Last month’s file was re-exported | Check the date range in the export |
| Categories look wrong | First few months of categorization | Correct them once and it learns the pattern for that vendor |

## 7.7 The habit

Pick a day. The first Saturday of the month, or the day after your statements close. Keep it.

The value of this system compounds with the number of months in it. One month is a data point. Twelve months is a plan resting on measured reality, and that is an entirely different thing from a plan resting on a budget you wrote once.

# Part 8: The Analysis Set

Eleven deeper studies, built on request. Name one and Claude reads its specification from `docs/04- report-catalog.md`. They are listed in order of value for most people.

## 8.1 Income vs Burn Gap and Safe Withdrawal Rate

**The question it answers.** Does the money last, and at what spending level does it last.

Projects year by year from your separation date to your longevity age, modeling each income line from its own start date, applying general inflation to expenses and medical inflation to health costs. Runs at minimum an average return case, a pessimistic case, and a sequence of returns stress case that front loads the poor years.

**Three FERS rules it must apply correctly or the whole projection is wrong:** no annuity COLA before 62, the diet COLA after 62, and no COLA ever on the supplement, which ends at 62.

**The output that matters most** is not the terminal balance. It is the **maximum sustainable monthly spend that keeps every scenario solvent**, and the difference between that figure and what you currently spend. That difference is your required cut, and it is the most actionable number the system produces.

## 8.2 Retirement Date Comparison

**The question it answers.** What does each candidate date actually cost or buy, rather than which one feels right.

Candidate dates are your earliest immediate annuity date, your earliest unreduced date, each intervening December 31, the 1.1 percent multiplier date if reachable, and one year past the unreduced date.

For each date it computes service credit including sick leave, high-3 at that date, the multiplier that applies, gross and net monthly annuity, any age reduction, supplement eligibility and amount, **the FEHB and FEGLI five year rule results**, **whether the date lands on the postponed or deferred path**, Social Security at each claiming age, the leave lump sum, months of self funded health coverage before 65, the required withdrawal rate, and lifetime income in both nominal and present value terms.

Then the crossover analysis: at what age does the later date overtake the earlier one in cumulative income, and what does each year of leaving earlier cost.

**One check that matters more than the dollars.** If a candidate date fails the FEHB five year rule or lands on the deferred path, that date is not a slightly lower number in a column. It is categorically different, and the table says so.

And it states plainly that lifetime dollars are not the only consideration, because years of health are worth something no model can price.

## 8.3 Cash Bridge Plan

**The question it answers.** How much cash do you need on hand to get from your last paycheck to your first full annuity payment without selling into a down market.

**Why this matters more under FERS than under most systems.** OPM processes retirement applications over a period routinely measured in months, and pays **interim annuity payments** during processing at a fraction of the final amount, trued up retroactively once the claim is adjudicated. The annuity also commences the first day of the month after separation. Nothing about the first year is a steady state.

It maps the income ramp month by month for the first twelve months: interim payments, the final annuity once adjudicated, the retroactive true-up when it lands, the supplement if payable, Social Security if claimed, the leave lump sum, your final paycheck, and the shortfall in each month.

**The reserve is sized on the cumulative shortfall of the unfunded months, not on an annual average.**

Six rules it applies:

- Ask your benefits office for the current expected processing timeline **in writing**. Do not plan against a rule of thumb.
- Hold the bridge in cash or a money market fund. The entire point is to remove the need to sell into a down market, so an instrument with a market price defeats it.
- Any instrument with a maturity date must mature **before** your separation date. A bill maturing in month four locks money away across exactly the months it is needed.
- Fund it from redirected contributions across the calendar year before you retire, with a month by month accumulation schedule.
- Never treat the RETIRED lens surplus as the funding source. Use the FULL lens.
- If you are under 59 and a half at separation, fund it from taxable savings or from the TSP under the age 55 separation exception, and **do not roll the TSP to an IRA first**.

## 8.4 Health Care Bridge to 65

**The question it answers.** What does coverage cost from your separation date to Medicare, and what does it cost after.

Counts the months to your 65th birthday and costs each option across that window: FEHB at the annuitant **post-tax** rate, Temporary Continuation of Coverage at 102 percent, a spouse’s plan, and the ACA marketplace if FEHB is unavailable. Applies medical inflation.

Then models Medicare from 65 along both paths: FEHB alone with the permanent late enrollment penalty priced if you take Part B later, and FEHB plus Part B with your plan’s Section 9 coordination benefits and any Part B premium reimbursement. Including IRMAA and its two year lookback.

**The output to carry forward** is the monthly figure that feeds every other report. For anyone retiring before 65 this is usually the largest single unmodeled cost in the plan.

## 8.5 Creditable Service and Deposit Analysis

**The question it answers.** How many years do you actually have, and is any deposit worth paying.

Reconstructs your service history from SF 50s, computes creditable service at each candidate date, prices every deposit and redeposit, states the military deposit deadline, computes the part time proration factor, and adds sick leave credit at the projected balance on each date.

**The output is a decision table per deposit**: cost, annual annuity increase it buys, payback period in years, and **whether it moves an eligibility date**. That last column is called out separately because moving an eligibility date is worth far more than the annuity increase.

## 8.6 Social Security Claiming Analysis

**The question it answers.** 62, full retirement age, or 70, on your real numbers.

Uses the zero future earnings figures as the primary case and the statement figures as the optimistic case, showing both. Computes cumulative benefits by age, finds the breakeven ages, and applies a cost of living adjustment consistently.

Then models three interactions specific to a FERS retiree:

**The supplement cliff at 62.** The supplement ends at 62 whether or not you claim. Claiming at 62 replaces it, usually at a lower amount. Delaying past 62 means the supplement ends and nothing replaces it, so portfolio withdrawals rise sharply in exactly those years.

**The withdrawal rate consequence** of delaying, which changes both the rate and the taxable income in the years that matter most for Roth conversions.

**The survivor consequence** if married, because the higher earner’s claiming age sets the survivor benefit for the rest of the surviving spouse’s life.

## 8.7 Tax Strategy and the Roth Conversion Window

**The question it answers.** Are there low income years between retirement and required distributions, and how much is it worth to use them.

Projects taxable income by year from separation to your required beginning date. Your FERS annuity is fully taxable at ordinary rates apart from the small return of your own contributions. Identifies the low years, sizes the traditional TSP balance that will be forced out later, and models conversions that fill a target bracket.

**Four constraints it models explicitly:**

- The taxable portion of Social Security rises with other income to 85 percent, so a conversion can push a second dollar of tax onto Social Security. The thresholds are **not indexed to inflation**.
- Medicare IRMAA uses income from two years prior, so conversions at 63 and 64 set your premiums at 65 and 66.
- Required distributions begin at 75 for anyone born 1960 or later, and the Roth TSP is not subject to lifetime required distributions under current law.
- The senior deduction of $6,000 per qualifying individual, $12,000 where both spouses are 65 or older, applies for tax years **2025 through 2028** and phases out beginning at $75,000 of modified adjusted gross income for a single filer. It expires after 2028, so it is a window rather than a feature.

Every figure is flagged as planning analysis requiring confirmation by a tax professional before any conversion is executed.

## 8.8 Survivor Election Analysis

Prices all three elections over both life expectancies, states the FEHB consequence in its own section because it usually decides the question, and compares against the term or permanent life insurance that would replace the survivor annuity, noting that no policy replicates FEHB eligibility.

Ends with an explicit statement that spousal consent is required for anything less than the maximum and that the election is irreversible after final adjudication.

## 8.9 FEGLI Reduction Election Analysis

Prices the SF 2818 election, which is made once and is one way thereafter.

| Election | Coverage after 65 | Monthly cost per $1,000 before 65 | After 65 |
|---|---|---|---|
| 75 percent reduction | Floors at 25 percent of the BIA | $0.3467 | Free |
| 50 percent reduction | Floors at 50 percent of the BIA | $1.0967 | $0.75 |
| No reduction | 100 percent of the BIA for life | $2.5967 | $2.25 |

Re-verify those rates before relying on them. The schedule dates to October 2021, OPM re-sets it periodically, and OPM’s calculator page and its program information page have carried different figures.

Options A, B and C are modeled separately. The output compares total premium cost to your longevity age against the death benefit each produces, and against equivalent private term coverage bought before retirement while you are still insurable.

## 8.10 Boldin Validation Report

Covered in Part 9.

## 8.11 Boldin Entry Sheet

`08 Boldin Entry Sheets/Boldin Entry Sheet YYYY-MM-DD.md`

The only artifact in this catalog produced automatically rather than on request. Any turn that processes a source document, runs the monthly cycle, or produces an analysis that changes a Boldin input writes or appends to the sheet for that date.

One row per Boldin field: the screen, the field, the exact value to type with its unit, what that value replaces, and the source it came from, ordered by impact. Covered in Section 9.5.

## 8.12 Post-Retirement Findings

A running register of everything learned that changes the plan: rule changes, corrected assumptions, discovered accounts, decisions made and why. Appended, never rewritten.

In three years this is the file that explains why the plan looks the way it does. It is the least glamorous artifact in the catalog and one of the most useful.

# Part 9: Boldin and the Validation Loop

## 9.1 The premise

Boldin is a capable planner. It is also a calculator, and a calculator returns exactly what you feed it. Every one of its defaults was written for a general audience, and several are wrong for a FERS employee.

The method is a **loop**, not a setup:

1. Enter your data in Boldin
2. Export the planner summary CSV and download the PDF report into `05 Boldin`
3. Tell Claude: `Run a Boldin validation against the export dated YYYY-MM-DD.`
4. The defects come back as an **Entry Sheet** in `08 Boldin Entry Sheets`, one row per field
5. Type the rows into Boldin, marking each one `ENTERED` as you go
6. Re-export and re-run

Iterate until every remaining difference is explained. **A validation report is valid only against the export it was run on.**

Steps 4 and 5 are the half of the loop that version 1.0.0 of this system did not have. Sections 9.4 and 9.5 cover them.

## 9.2 Two warnings before you start

**A PDF and a CSV can both be stale relative to the live plan.** If a validation flags something you already fixed, re-export before arguing with it.

**Some defects are visible only inside Boldin, not in the export.** The cost of living adjustment setting on a pension entry is one of them. A validation pass that reads only the export will miss it. That is exactly how the largest defect in the source case was missed on the first pass while a defect that did not exist was reported as the headline.

## 9.3 The fifteen defect classes

Full tests and fixes are in `docs/05-boldin-setup-and-validation.md`. Summarized here in order of damage.

**Class 1: A COLA on the annuity before age 62.** The single largest risk. Read the pension line across years before 62; if it rises, a COLA is applied. Then open the entry’s detail form, because the export can hide it. **Fix: set the pension COLA to None, 0 percent.** In the source case, an annuity carrying a 2.54 percent COLA from the start date read about $1,948 a month by age 62 against a correct $1,762, with the base permanently 10.6 percent high thereafter.

To model it exactly, split the annuity into two pension entries: 0 percent from the start date to the month before 62, and your assumed diet COLA rate from 62 forward. If you do not split it, flag the understatement rather than leaving it silent.

**Class 2: The annuity starting on the separation date.** It commences the first day of the month **after** separation. A tool that starts it immediately shows no gap at all, and the gap is exactly what the cash bridge exists to cover. Class 1 and Class 2 together accounted for eighty three percent of a $315,658 correction.

**Class 3: Withdrawal strategy set to a fixed percentage.** The highest impact single setting in the tool. A fixed percentage forces a withdrawal every year whether needed or not, taxes it as ordinary income leaving the traditional TSP, and re-saves the surplus into a taxable account where growth is taxed again. **Fix: set it to Based on spending needs.** In the source case this moved Chance of Success from 77 percent to 99 percent, net worth at longevity by over two million dollars, and lifetime income taxes down $57,482. The 4 percent rule is a safety ceiling, not a withdrawal mandate.

Caveat to state in every report after this fix: the resulting figure is conditional on hitting the spending figures entered, which are a target rather than a trailing actual.

**Class 4: The FERS Supplement entered wrongly.** Four distinct errors. Entered when not eligible, on an MRA+10 or deferred path. Missing when eligible, because Boldin has no supplement field and it must be a separate income line. Given a COLA, which it never receives. Not ending at 62. Plus the earnings test if you plan to work.

**Class 5: Social Security overstated.** Compare against your zero earnings estimate. **But beware a trap in the test itself:** Boldin displays some figures in inflated future dollars and others in today’s dollars, and comparing across the two manufactures a defect that does not exist. Open the entry’s edit form and compare the **full retirement age benefit** Boldin is deriving from against your own. That comparison is apples to apples.

**Class 6: FEHB premium at the employee rate.** Annuitants pay the same premium with **post-tax** dollars, because premium conversion covers employees only. Check also that pre-65 and post-65 are separate entries with different amounts.

**Class 7: Leave lump sum at an unconfirmed figure.** Not hours times current rate. The agency projects the leave forward and any pay adjustment in that period is paid at the higher rate. It is ordinary wage income, FICA and Medicare are withheld, and it cannot be deferred into the TSP.

**Class 8: Loan amortization mismatch.** Amortize independently from balance, rate and payment. In the source case an independent amortization moved a payoff nine months earlier, shifted the binding year, and reduced the required cut by $132.47. **Boldin was right and the hand built model was wrong.** When that happens, say so first.

**Class 9: Housing inflated against a confirmed fixed cost.** Correct the confirmed years. Beyond the confirmed term, inflation is an assumption rather than an error and it runs conservative, so flag rather than remove.

**Class 10: Retired spending does not match the RETIRED lens.** Distinguish a data error from a target. If the entered figure is higher than the sustainable figure, lowering it is a decision about how hard to cut, not a data fix.

**Class 11: Starting asset base disagrees.** Half a percent is fine. More means an account is missing, duplicated or stale. Check that traditional and Roth TSP are entered once each.

**Class 12: Contributions that do not stop at retirement.** The FERS employee contribution, FICA and Medicare on wages, and TSP contributions all stop when the paycheck does. Contributions running past retirement inflate both the ending balance and the modeled expenses, and the two errors do not cancel.

**Class 13: Medicare and IRMAA not modeled from 65.** The health line should step at 65. IRMAA uses income from two years prior.

**Class 14: Required distribution age set wrong.** 75 for anyone born 1960 or later, 73 for 1951 through 1958. Two extra years is two more years of Roth conversion room. Also confirm the Roth balance is excluded from the calculation.

**Class 15: High-3 fed from W-2 gross pay.** W-2 gross includes overtime, awards and the leave lump sum, none of which are basic pay.

## 9.4 The field map: where every value goes

Everything above is the defect side of the loop. It tells you what is wrong and how to test for it. The other side is `docs/07-boldin-field-map-and-entry-engine.md`, which tells you where every value goes, screen by screen, before you enter anything.

The reason it has to be written down at all is that **Boldin has no FERS field.** There is no annuity field, no supplement field, no TSP field, no federal anything. Every FERS structure in your plan is a general purpose Boldin field carrying a federal value, and which field you pick decides whether the projection is right.

The planner is nine screens, seven of which hold data: Summary, Connections, Assets and Debts, Home and Real Estate, Income, Expenses and Healthcare, Money Flows, Estate Planning, and Rate Assumptions. The field map covers every one of them. Six mappings do most of the work, and all six are places where the obvious choice is the wrong one.

**The annuity is two pension entries, not one.** Boldin allows one cost of living adjustment rate per pension entry. FERS applies two across the life of a single annuity: nothing until the adjustment following your 62nd birthday, and the diet COLA after that. So you enter the annuity twice. Entry one runs from the first of the month after separation to the month before 62, at 0 percent. Entry two begins at 62 at your assumed diet COLA rate. If you would rather not split it, enter 0 percent and flag the post-62 understatement in your assumptions table. Do not enter a single blended rate and hope it averages out. It does not, because the two rates apply to different years.

**The supplement is a third pension entry.** 0 percent COLA, ending at 62, carrying the amount from your own computation, net of the earnings test if you plan to work. On an MRA+10 or a deferred path you enter nothing at all, because nothing is payable.

**Traditional and Roth TSP are two accounts.** Boldin totals savings by tax treatment into taxable, tax deferred and tax free. A single combined TSP balance puts Roth money in the tax deferred column and overstates every tax figure downstream. The fastest check that you got this right is to read those three totals on the Assets screen and see whether they look like your actual tax picture.

**Health insurance before 65 is the annuitant premium, taken post tax.** Not the biweekly figure on your leave and earnings statement. Premium conversion covers employees only, and that is the whole difference.

**The annual leave lump sum is a windfall, not income.** It is a one time inflow in the retirement year, or the following January if you separate late in December, and it lands in a destination account you name.

**The rate of return follows your actual fund allocation.** A G Fund heavy balance does not earn a blended equity return, and an L Fund changes its own allocation as it approaches its target year.

The file also carries the **reverse map**, document to fields. When a statement arrives, that table says which Boldin fields it touches. That is what turns an arriving document into a list of entries rather than a memory exercise.

One caution about the map itself. The navigation, the section names and the milestone events in it were observed in a live planner in September 2026. The individual field labels inside the add and edit dialogs came from Boldin's own help articles rather than from the screen, and Boldin ships changes often. The file says which is which, carries a duty to walk one dialog per section the first time you use it, and has a corrections table to record anything that differs. Never report a field as entered without seeing it on screen.

## 9.5 The Entry Sheet

Knowing where a value goes is not the same as knowing what to type. The **Entry Sheet** closes that gap, and it is the only artifact in this system produced without being asked for.

Every time Claude processes a source document, runs the monthly cycle, or produces an analysis that changes a Boldin input, it writes `08 Boldin Entry Sheets/Boldin Entry Sheet YYYY-MM-DD.md`. One row per field:

| Column | What it holds |
|---|---|
| Screen and sub-section | The Boldin location, named exactly as the planner names it |
| Item | The specific entry being edited, such as `FERS Annuity pre-62` |
| Field | The single field being changed. Never two. |
| Enter this | The value with its unit inside it. `$1,762 monthly`, not `1762`. |
| Replaces | The current value, or `unknown, read it off the screen first` |
| Source | A file name and page, a report, `user-stated` with a date, or a defect class number |
| Status | `NOT STARTED`, then `ENTERED` as you work down the sheet |

Six rules govern the sheet, and each one exists because violating it has cost somebody something:

1. **One field per row.** A row that bundles two fields cannot be verified afterward.
2. **The unit lives inside the value.** You should never be converting an annual figure to a monthly one in your head at the keyboard.
3. **Every row says what it replaces.** When the current value is unknown, the row tells you to read it off the screen and write it down before you change it.
4. **Every row cites a source.** No source, no row.
5. **Rows are ordered by impact**, so a session that stops halfway has still captured the half that matters. For a FERS plan that usually means the annuity COLA, the withdrawal strategy, the annuity start date, and the supplement, in that order.
6. **A missing input produces a `BLOCKED` row** naming the document that would unblock it. It never produces an invented value.

Rows that change every downstream figure are called out on their own before the table. The withdrawal strategy, the scenario base date, the retirement age on the Summary screen and the survivor election all belong in that group, and the sheet states the consequence of each before you touch it.

The sheet then closes with the expected direction of the effect on Chance of Success, stated **before** you enter anything. That matters more than it sounds. If you expect a figure to fall and it rises, you have learned something immediately. Without the prediction written down first, all you have is a number that moved.

**An Entry Sheet is not finished when the rows are typed.** It is finished when the next export shows the values and a validation confirms them. A value is not entered because a sheet told you to enter it. It is entered when the export proves it. Rows still open carry forward into the next sheet rather than quietly disappearing.

The template is `templates/boldin-entry-sheet.md`. The full specification is Part 4 of `docs/07-boldin-field-map-and-entry-engine.md`.


## 9.6 Reading the Chance of Success

It is useful and it is not a verdict.

**It is only as good as the inputs.** A plan showing 85 percent on an annuity that wrongly receives a COLA before 62 is not an 85 percent plan.

**Direction matters more than level.** Every validation report states which defects flatter the plan and which understate it. Two errors of similar size in opposite directions do not cancel, because they act on different years.

**It answers one question.** Whether the money lasts under the modeled assumptions. Not whether the plan is a good idea, not whether the spending level is right, and not whether an extra year of work is worth what it costs in years of health.

Treat it as an instrument reading. Ask what the instrument is measuring before deciding whether to trust it.

## 9.7 When Boldin is right and you are wrong

This happens, and it is the strongest evidence the loop is working.

The rule is: **say so first, then correct your own model.** A validation report that only ever finds fault with the tool is a validation report that is not actually validating anything.

# Part 10: A Worked Example

**Every figure in this part is invented.** “Dana Reyes” is not a real person and these numbers describe no one. The example exists to show how the arithmetic connects, not to suggest what your own numbers will look like. Do not use any figure here as an input to your own plan.

## 10.1 The starting position

Dana is a GS-13 at a civilian agency, born **15 April 1972**, hired **1 August 2003**, with four years of active duty from 1994 to 1998. Dana has never paid the military service deposit and has never thought about it.

Dana’s belief, carried for years and never checked: *“My MRA is 57, I hit it in April 2029, and that is when I can go.”*

Dana enters Block 1 with a date of birth, an SCD of 1 August 2003 read off a leave and earnings statement, and that belief.

## 10.2 What Block 1 derives

**Minimum Retirement Age.** Born 1972, which is 1970 or later, so the MRA is **57**, reached **15 April 2029**.

**Creditable service** from the retirement SCD of 1 August 2003:

| At date | Service |
|---|---|
| 30 April 2029 | 25 years 9 months |
| 30 April 2032 | 28 years 9 months |
| 31 July 2033 | 30 years 0 months |

**The four eligibility dates:**

| Date | Result |
|---|---|
| MRA date | 15 April 2029 |
| Earliest immediate annuity | 30 April 2029, MRA with 25 years, which is MRA+10 and reduced |
| Earliest immediate unreduced | 30 April 2032, age 60 with 28 years, under the age 60 with 20 years rule |
| 1.1 percent multiplier | 30 April 2034, age 62 with 30 years |

**The reconciliation, and it is not good news.** Dana’s believed date is real, but it is an MRA+10 date, not an unreduced one. Dana had been picturing an unreduced annuity.

Notice something else in that table. Dana had also assumed that reaching 30 years of service was the goal, which would be 31 July 2033. The **age 60 with 20 years** rule gets Dana to an unreduced annuity fifteen months earlier than that. Dana had never heard of the age 60 path.

## 10.3 Pricing the believed date

Separation 30 April 2029, annuity commencing 1 May 2029.

Using an illustrative high-3 of **$112,000** at that date, 25 years 9 months of service, and a projected sick leave balance of 1,000 hours:

```
Sick leave credit: 1,000 / 2,087 = 0.479 years, 5 whole months
Total for computation: 25 years 9 months + 5 months = 26 years 2 months = 26.1667

Gross annuity: 0.01 x $112,000 x 26.1667 = $29,306.67 per year
                                = $2,442.22 per month
```

Now the age reduction. On 1 May 2029 Dana is 57 years and 16 days old. Full months under age 62 at the commencing date: **59**.

```
59 months x 5/12 of 1 percent = 24.583 percent

$2,442.22 x (1 - 0.24583) = $1,841.85 per month
```

**And no FERS Special Retirement Supplement**, because MRA+10 is not an immediate unreduced annuity.

So the date Dana had been planning toward pays **$1,841.85 a month**, permanently reduced, with no supplement and no cost of living adjustment until 2034.

## 10.4 Pricing the earliest unreduced date

Separation 30 April 2032, annuity commencing 1 May 2032. Age 60. Illustrative high-3 of **$118,400**, 28 years 9 months of service, projected sick leave of 1,200 hours.

```
Sick leave credit: 1,200 / 2,087 = 0.575 years, 6 whole months
Total for computation: 28 years 9 months + 6 months = 29 years 3 months = 29.25

Annuity: 0.01 x $118,400 x 29.25 = $34,632.00 per year
                          = $2,886.00 per month, unreduced
```

And now the supplement, because this is an immediate unreduced annuity. Dana’s zero future earnings Social Security estimate at 62 is **$2,050**. FERS civilian service is 28 years 9 months, which rounds to 29.

```
Supplement: $2,050 x (29 / 40) = $2,050 x 0.725 = $1,486.25 per month
```

**Total monthly income from age 60 to 62: $2,886.00 + $1,486.25 = $4,372.25.**

Against $1,841.85 at the believed date. A difference of **$2,530.40 a month**, for three more years of work.

That comparison, and nothing else, is what Block 1 exists to produce.

## 10.5 What Block 2 finds

Block 2 asks about military service. Dana has four years, 1994 to 1998, and has never paid the deposit.

The benefits office confirms an unpaid deposit balance of roughly **$3,900**, being about three percent of military basic pay plus accrued interest.

Two things change if Dana pays it.

**The retirement SCD moves back four years, from 1 August 2003 to 1 August 1999.** Everything recomputes.

| At date | Service without deposit | Service with deposit |
|---|---|---|
| 31 August 2029 | 26 years 1 month | **30 years 1 month** |
| 30 April 2032 | 28 years 9 months | 32 years 9 months |

**Thirty years of service now arrives on 1 August 2029**, and Dana is 57 years and 3 months old on that date, which is past the MRA.

**MRA+30 becomes available on 31 August 2029.** That is four months after the date Dana believed in, and it produces an **unreduced** annuity with a supplement.

Price it. Illustrative high-3 of **$114,600** at that date, 30 years 1 month of service, projected sick leave of 1,020 hours:

```
Sick leave credit: 1,020 / 2,087 = 0.489 years, 5 whole months
Total for computation: 30 years 1 month + 5 months = 30 years 6 months = 30.5

Annuity: 0.01 x $114,600 x 30.5 = $34,953.00 per year
                         = $2,912.75 per month, unreduced
```

And the supplement. **Here is a subtlety the system catches and most people miss: military service does not count in the supplement numerator, even when the deposit has been paid.** The numerator is FERS **civilian** service only. Dana’s civilian service at that date is 26 years 1 month, which rounds to 26.

With a zero earnings age 62 estimate of **$1,980** reflecting the shorter civilian earnings record:

```
Supplement: $1,980 x (26 / 40) = $1,980 x 0.65 = $1,287.00 per month
```

**Total monthly income from 31 August 2029: $2,912.75 + $1,287.00 = $4,199.75.**

## 10.6 The three dates side by side

|  | Believed date | With military deposit | Earliest unreduced, no deposit |
|---|---|---|---|
| Separation | 30 Apr 2029 | **31 Aug 2029** | 30 Apr 2032 |
| Path | MRA+10 | **MRA+30** | Age 60 with 20 |
| Age reduction | 24.583 percent | **None** | **None** |
| Monthly annuity | $1,841.85 | **$2,912.75** | $2,886.00 |
| FERS Supplement | **None** | $1,287.00 | $1,486.25 |
| Monthly total to 62 | $1,841.85 | $4,199.75 | $4,372.25 |
| Extra time worked | baseline | 4 months | 3 years |

A deposit of about $3,900, paid before separation, moves Dana from $1,841.85 a month to $4,199.75 a month in exchange for four additional months of work.

Even measured only against the annuity increase, ignoring the supplement and the removed reduction entirely, the deposit pays for itself in months. Measured properly, it is the single most consequential thing in Dana’s plan.

**And it has a hard deadline.** OPM cannot accept a military service deposit after separation. Had Dana found this in the final year instead of five years out, the paperwork might not have cleared in time.

## 10.7 What the rest of the interview adds

**Block 5** computes Dana’s sick leave credit as annuity dollars. At the MRA+30 date, five months of credit is:

```
0.01 x $114,600 x (5/12) = $477.50 per year = $39.79 per month, for life
```

Dana had been treating sick leave as something to use up. Seeing it as $39.79 a month changed that.

It also flags that separating on **31 August** rather than 1 September matters: the annuity commences 1 September either way, so separating on 1 September would forfeit a month of annuity for one day of work.

**Block 9** produces Dana’s three expense lenses from twelve months of real transactions:

| Lens | Monthly |
|---|---|
| FULL | $7,240 |
| CURRENT | $6,890 |
| RETIRED | $5,515 |

The RETIRED lens removes the FERS employee contribution, TSP contributions, FICA and Medicare on wages, commuting and parking. It adds FEHB at the **post-tax annuitant rate** rather than the pre- tax employee rate, and adds a travel line Dana intends to spend for the first ten years.

Dana’s first instinct on seeing this was that the difference between FULL and RETIRED, $1,725 a month, was available to save toward a cash bridge. **It is not.** That money is still leaving the account every month right now. The FULL lens is what governs available cash today. This is the single most common error in the method and the system flags it explicitly.

**Block 10** tests the FEHB five year rule. Dana has been continuously enrolled since 2003, so every candidate date passes. Both the August 2029 and April 2032 dates land on the **immediate annuity** path, not deferred, so nothing is at risk.

The pre-65 window from 31 August 2029 to 15 April 2037 is **91 months** of self funded coverage at the post-tax annuitant premium, with medical inflation applied. That number goes into every subsequent report.

## 10.8 The gap

Against the MRA+30 date, with a RETIRED lens burn of $5,515 and monthly income of $4,199.75 to age 62:

```
Monthly gap: $5,515.00 - $4,199.75 = $1,315.25
Annual gap: $15,783.00
```

Against a portfolio of $640,000:

```
Required withdrawal rate: $15,783 / $640,000 = 2.47 percent
```

Comfortably under four percent. The verdict for the bridge years is **on track**.

But the bridge years are not the whole plan. At 62 the supplement stops, which removes $1,287 a month, and Social Security replaces it only if Dana claims then, at a thirty percent reduction. That transition is exactly what the Social Security Claiming Analysis exists to price, and it is invisible in any report that shows a single “retirement income” number rather than income line by line with start dates.

## 10.9 What Dana’s open items list looked like after the first pass

1. Confirm the military deposit balance and the payment deadline in writing. **Highest impact item in the plan.**
2. Confirm the retirement SCD in writing and verify it differs from the leave SCD.
3. Obtain agency annuity estimates for 31 August 2029 and 30 April 2032 specifically.
4. Re-run the zero earnings Social Security estimate for a 2029 separation rather than 2032.
5. Confirm the FEHB annuitant premium for the current plan and enrollment code.
6. Obtain the current OPM processing timeline for the cash bridge.

Six items. Every one names the document that closes it. Two of them, items 1 and 2, were worth more than everything else in the plan combined.

## 10.10 What to take from this

The interview did not find Dana a clever strategy. It found three facts Dana already had access to and had never assembled:

- The MRA is not an unreduced retirement date.
- The age 60 with 20 years path exists and nobody had mentioned it.
- Four years of military service were sitting uncredited behind a $3,900 deposit with a deadline.

None of that required sophistication. It required asking the eligibility question before the preference question, and refusing to accept a number without a source.

# Part 11: Troubleshooting

## 11.1 Setup problems

| Symptom | Cause | Fix |
|---|---|---|
| Claude cannot see your files | Folder not connected, or cloud sync incomplete | Re-add the folder in project settings. Confirm your sync client shows the folder as fully synced. A file still uploading is a file Claude cannot read. |
| It forgets the rules mid conversation | The prompt went into a chat message rather than the project Instructions field | Move it. This is the most common setup error and the symptom is that everything works for twenty minutes. |
| Phase A does not run | The trigger phrase was not used | Type exactly: Begin Phase A, then start the interview at Block 1. |
| The folder connects but is empty | You connected the repository instead of your workspace | Connect the workspace folder you built in Section 3.3. |
| Cowork mode is not available | Free plan, or an older app version | A paid plan is required. Update the app. |

## 11.2 Interview problems

| Symptom | Fix |
|---|---|
| It stalls on a question you cannot answer | Say: I do not know, record it as an open item and continue. |
| It asks too many questions at once | Say: One block at a time, five questions maximum. The prompt requires this. |
| You need to stop | Just stop. Type resume the interview in a new conversation in the same project. |
| Answers are not appearing in the Facts Register | Say: Write the answers from this block into the Facts Register before continuing. The prompt requires writing before advancing, not batching to the end. |
| You gave a wrong answer three blocks ago | Say so. It appends a corrected line and marks the old one superseded, which is the intended behavior. |
| It will not accept a figure you are certain of | It is asking for a document because money figures from memory are provisional. Say user-stated, record as provisional and move on. |

## 11.3 Output problems

| Symptom | Fix |
|---|---|
| A figure appears with no source | Cite the source for that figure or label it as an estimate. |
| You do not believe a number | Show me the arithmetic for that figure. For anything driving a decision it should already be there. |
| Two reports disagree | Show both figures side by side with their sources and dates. One input changed. Finding out which is the useful part. |
| The verdict does not match the body | Say so. The prompt forbids a stale verdict sentence. |
| A report skipped the definition of done | Restate the definition of done checklist for this report, passed or failed per item. |
| It used an em dash | The house style forbids them. Point it out and it will correct. |

## 11.4 Monthly report problems

Covered in Section 7.6. The short version: nearly every wrong monthly number is a miscategorized transaction, a missing account export, or a semiannual bill landing in the wrong month. Ask for the transaction detail tab and the one time items list before assuming anything is broken.

## 11.5 When to distrust the output

Be suspicious when:

- **A figure improves the plan and has no source.** Errors that flatter a plan deserve more scrutiny than errors that hurt it.
- **A large number appears without arithmetic.**
- **A rule is stated without a citation**, particularly anything about the supplement, COLAs, or the five year rules. Those are the rules most often gotten wrong in published guidance.
- **The verdict changed but no input did.**
- **A report contradicts an earlier one and does not mention it.**

The controls in the prompt reduce error. They do not eliminate it. A language model can make an arithmetic error and state it confidently. **Check anything that drives a decision.**

## 11.6 What to escalate to a human

Take these to your agency benefits officer:

- Your retirement Service Computation Date
- Any service where retirement deductions were not withheld
- Any deposit or redeposit amount, and the deadline
- Your FEHB and FEGLI enrollment history dates
- The current OPM retirement processing timeline
- Anything where an agency estimate and your independent computation differ by more than two percent

Take these to a licensed fiduciary:

- The survivor annuity election
- The FEGLI post retirement reduction election
- Social Security claiming
- Any Roth conversion before you execute it
- Any TSP annuity purchase
- Deferred versus postponed retirement, if that choice is live for you

The system produces the arithmetic for every one of these. It does not make the decision, and no output of it should be treated as a professional recommendation.

# Appendix A: Glossary

**AUO.** Administratively uncontrollable overtime. Premium pay for certain positions. Counts toward basic pay and the high-3 where retirement deductions are withheld.

**Availability pay.** LEAP, law enforcement availability pay. Counts toward basic pay and the high-3.

**Basic Insurance Amount, BIA.** The FEGLI Basic coverage amount, being your annual basic pay rounded up to the next $1,000 plus $2,000. Drives the cost of every post retirement reduction election.

**Basic pay.** The pay from which retirement deductions are withheld. Includes locality pay. Excludes overtime, bonuses, awards and the annual leave lump sum. Not the same as W-2 gross.

**COLA.** Cost of living adjustment. FERS retirees under 62 receive none, with narrow exceptions. Above 62 they receive the diet COLA.

**CSRS.** Civil Service Retirement System. The system that preceded FERS. **This project does not cover CSRS.**

**Deferred retirement.** An annuity claimed after separation by someone who was not eligible for an immediate annuity at separation. **A deferred annuitant may never re-enroll in FEHB, FEGLI or FEDVIP.**

**Diet COLA.** The reduced FERS cost of living adjustment. Full CPI-W under two percent, flat two percent between two and three, CPI-W minus one percentage point above three.

**DSR.** Discontinued Service Retirement. Immediate retirement following involuntary separation, at 50 with 20 years or any age with 25.

**eOPF.** Electronic Official Personnel Folder. Where your SF 50s and enrollment forms live.

**FEDVIP.** Federal Employees Dental and Vision Insurance Program. **No five year rule.**

**FEGLI.** Federal Employees’ Group Life Insurance. **Five year rule, not waivable, tested separately for Basic and each Option.**

**FEHB.** Federal Employees Health Benefits. **Five year rule, waivable only in narrow circumstances.**

**FERS Special Retirement Supplement.** Also the FERS Annuity Supplement or the retiree annuity supplement. Bridges to 62 for those retiring on an immediate unreduced annuity. No COLA. Ends at 62. Subject to an earnings test.

**High-3.** The largest annual rate produced by averaging your rates of basic pay over any three consecutive years of creditable civilian service. Time weighted.

**Immediate annuity.** An annuity beginning within thirty days of separation.

**IRMAA.** Income Related Monthly Adjustment Amount. The Medicare surcharge, set from your tax return two years prior.

**LEO.** Law enforcement officer. A special provision position with different eligibility, multiplier, supplement and COLA rules.

**LES.** Leave and Earnings Statement. Your biweekly pay statement.

**MRA.** Minimum Retirement Age. 57 for anyone born in 1970 or later.

**MRA+10.** Retiring at your MRA with 10 to 29 years. **Permanently reduced by 5/12 of one percent per month under 62, and no supplement.**

**MRA+20.** Separating under MRA+10 with at least twenty years and postponing the annuity to after age 60, which removes the age reduction entirely.

**OPM.** Office of Personnel Management. Administers federal retirement and processes retirement applications.

**Postponed retirement.** Delaying the commencing date of an MRA+10 annuity to reduce or remove the age penalty. **Preserves the ability to re-enroll in FEHB and reinstate FEGLI** when the annuity begins. Not the same as deferred.

**PSHB.** Postal Service Health Benefits Program. **Postal employees and annuitants only.** Requires Medicare Part B for most Medicare eligible annuitants. If you are not Postal, this does not apply to you.

**RMD.** Required minimum distribution. Age 75 for anyone born 1960 or later, 73 for 1951 through 1958.

**SCD.** Service Computation Date. **The retirement SCD and the leave SCD are frequently different numbers, and only the retirement one governs eligibility and the annuity.**

**SF 50.** Notification of Personnel Action. Documents every appointment, promotion and separation in your career.

**SF 2818.** The FEGLI post retirement election form. One way after you file.

**Special provision.** Law enforcement officers, firefighters, air traffic controllers, nuclear materials couriers, Customs and Border Protection officers, and military reserve technicians. Different rules at nearly every point.

**TCC.** Temporary Continuation of Coverage. Up to eighteen months of FEHB at 102 percent of the full premium after coverage would otherwise end.

**TSP.** Thrift Savings Plan. The federal defined contribution plan.

**VERA.** Voluntary Early Retirement Authority. An agency offered early out at 50 with 20 years or any age with 25 years. **No FERS age reduction.**

**WEP and GPO.** Windfall Elimination Provision and Government Pension Offset. Repealed January 2025. **FERS employees were never subject to either.**

# Appendix B: Where To Get Each Document

| Document | Source | Typical turnaround |
|---|---|---|
| Leave and earnings statement | Agency payroll portal: Employee Express, myPay, EPP or equivalent | Immediate |
| **Retirement SCD, in writing** | Agency benefits office | Days to weeks |
| **Non deduction service statement** | Agency benefits office | Days to weeks |
| **Military deposit status** | Agency benefits office or payroll provider | Days to weeks |
| Agency annuity estimate | Agency benefits portal, or the benefits officer | Immediate to weeks |
| SF 50s | eOPF, Personnel Actions | Immediate |
| DD-214 | Personal records, or milConnect | Immediate to weeks |
| Social Security statement | ssa.gov, my Social Security | Immediate |
| **Zero earnings estimate** | ssa.gov Retirement Calculator, future earnings set to 0 | Ten minutes |
| TSP statements | tsp.gov | Immediate |
| **FEHB enrollment history** | Agency benefits office or eOPF, SF 2809 and SF 2810 | Days to weeks |
| FEHB plan brochure, Sections 5 and 9 | opm.gov or the carrier | Immediate |
| **FEGLI enrollment history** | Agency benefits office or eOPF, SF 2817 | Days to weeks |
| FEDVIP enrollment | BENEFEDS | Immediate |
| FEHB annuitant premium tables | opm.gov plan information | Immediate |
| Medicare premium and IRMAA tables | cms.gov | Immediate |
| Transaction exports | Each bank and card portal | Under an hour, all accounts |
| Loan statements | Each lender | Immediate |
| Tax returns | Tax preparer, or IRS transcript | Immediate to weeks |
| Beneficiary designations | Agency benefits office and tsp.gov | Days |

Bold rows are the ones that come from a person rather than a portal. Send those requests first.

# Appendix C: 2026 Figures At A Glance

**These are 2026 program year values and they change every year.** Re-verify anything that drives a filing decision.

## Retirement

| Item | 2026 |
|---|---|
| MRA, born 1970 or later | 57 |
| FERS multiplier | 1.0 percent, or 1.1 percent at 62 with 20 years |
| MRA+10 reduction | 5/12 of 1 percent per month under 62, permanent |
| Sick leave conversion | 2,087 hours per year, 8 hours per day |
| Military deposit | Generally 3 percent of military basic pay, plus interest |
| Annual leave ceiling | 240 hours most employees, 360 overseas, 720 SES |
| Survivor election | 50 percent survivor at a 10 percent reduction, or 25 percent at 5 percent |

## Cost of living adjustments

| Program | 2026 |
|---|---|
| CSRS | 2.8 percent |
| FERS | 2.0 percent |
| Social Security | 2.8 percent |

Effective 1 December 2025, first appearing in the January 2026 payment.

## FERS Supplement earnings test

| Item | 2026 |
|---|---|
| Annual exempt amount | $24,480 |
| Monthly equivalent | $2,040 |
| Reduction rate | $1 for every $2 above |
| Applied | The year after the earnings, in practice from the July payment |

## TSP and IRA

| Item | 2026 |
|---|---|
| TSP elective deferral | $24,500 |
| Catch up, ages 50 to 59 and 64 and over | $8,000 |
| Higher catch up, ages 60 to 63 | $11,250 |
| Annual additions, all sources | $72,000 |
| IRA contribution | $7,500 |
| IRA catch up, 50 and over | $1,100 |
| Roth catch up required above prior year FICA wages of | $150,000 |

## Medicare

| Item | 2026 |
|---|---|
| Part B standard premium | $202.90 per month |
| Part B annual deductible | $283 |
| IRMAA starts above, single | $109,000 MAGI |
| IRMAA starts above, joint | $218,000 MAGI |
| Top Part B premium | $689.90 per month |
| Income lookback | Two years, so 2026 uses the 2024 return |

## Social Security

| Item | Value |
|---|---|
| Full retirement age, born 1960 or later | 67 |
| Reduction at 62 with an FRA of 67 | 30 percent |
| Delayed retirement credits | 8 percent per year to age 70 |
| Taxation thresholds, single | $25,000 and $34,000 |
| Taxation thresholds, joint | $32,000 and $44,000 |
| Thresholds indexed to inflation | **No** |

## FEGLI Basic, monthly per $1,000 of BIA

| Election | Before 65 | From 65 |
|---|---|---|
| 75 percent reduction | $0.3467 | Free |
| 50 percent reduction | $1.0967 | $0.75 |
| No reduction | $2.5967 | $2.25 |

Re-verify. OPM’s calculator page and its program information page have carried different figures for the pre-65 rate.

## Other

| Item | Value |
|---|---|
| RMD age, born 1960 or later | 75 |
| RMD age, born 1951 to 1958 | 73 |
| RMD age, born 1959 | **Unsettled in the regulation** |
| Senior deduction, per qualifying individual | $6,000, tax years 2025 to 2028 |
| Senior deduction phase out begins | $75,000 single, $150,000 joint MAGI |
| TCC premium | 102 percent of the full premium, up to 18 months |

# Appendix D: Sourcing, Gaps, and Legislative Risk

## D.1 Where the rules came from

`docs/06-fers-rules-reference.md` carries **82 citations** across 22 rule sections. Primary sources, in descending order of authority: the United States Code, the Code of Federal Regulations via eCFR, the Federal Register, OPM Benefits Administration Letters, the OPM CSRS/FERS Handbook, and the program pages of opm.gov, tsp.gov, ssa.gov, cms.gov and irs.gov.

Secondary sources such as FEDweek, Government Executive, FedSmith, NARFE and MyFederalRetirement were used for corroboration and for identifying what changed. Where a secondary source is the only support for a statement, the reference file says so.

## D.2 The ten items that could not be verified

Stated openly rather than resolved. If any of these is material to your plan, confirm it with your agency benefits officer.

1. The **Self Plus One or Self and Family enrollment condition** for a surviving spouse’s FEHB continuation. OPM confirms a survivor annuity must be payable, but the enrollment type condition was not found on a primary OPM page.
2. The **General Schedule night differential and hazardous duty pay exclusion** from the high-3. The Handbook affirms the wage grade inclusion but does not state the GS exclusion in the text retrieved.
3. The **tax treatment of the annual leave lump sum**. Supported by secondary sources only; the OPM fact sheet does not address taxation.
4. A **historical average FERS COLA**. No source states one.
5. The **2027 COLA**, not announced as of September 2026. Any figure circulating now is an estimate.
6. The **RMD applicable age for the 1959 birth year**. The regulation leaves the subparagraph reserved because of a SECURE 2.0 drafting conflict.
7. The **current FEGLI pre-65 Basic rate**, where two OPM pages disagree.
8. The **MRA+10 reduction phrasing**. OPM’s eligibility page states it annually; every other OPM source states it monthly. The monthly rule governs.
9. Whether an employee who **retires on an immediate annuity but fails the FEHB five year rule** is eligible for Temporary Continuation of Coverage as opposed to only the 31 day extension and conversion.
10. **FEGLI and FEHB premium rates for 2031 through 2033.** Only current year rates exist.

## D.3 Two stale OPM sources

**CSRS/FERS Handbook Chapter 50**, dated 1998, still states that unused sick leave is not creditable under FERS. Superseded by P.L. 111-84.

**CSRS/FERS Handbook Chapter 21**, dated 1998, still states that a FERS employee who takes a refund may not make a redeposit. Superseded by P.L. 111-84 and BAL 11-103.

Both are flagged where they appear in the reference file.

## D.4 Legislative risk

Four FERS provisions appeared in 2025 reconciliation legislation and passed the House in May 2025:

- Elimination of the **FERS Special Retirement Supplement** for individuals not already entitled before January 2028
- A change from **high-3 to high-5** for the annuity computation
- Increased employee contributions for pre-2013 hires
- An at-will employment election in exchange for avoiding a contribution increase

**All were removed before enactment.** The Senate parliamentarian ruled the federal workforce provisions out of order under the Byrd rule, and the remainder were dropped in the House. **Nothing affecting FERS eligibility, the annuity computation or the supplement is enacted as of September 2026.**

Two things follow.

**First, be careful what you read.** At least one widely followed federal benefits outlet published an issue brief describing those provisions as enacted, with effective dates. That article describes the House passed version of May 2025, not the final law. Government Executive, FedSmith, NARFE and Federal News Network all reported the Byrd rule strikes.

**Second, they were defeated on procedure, not on the merits.** They can return in standalone legislation or a future vehicle. For a separation five or more years out, the master prompt instructs the system to model current law and run one sensitivity case with the supplement set to zero, so the size of the exposure is known rather than assumed away.

The **Equal COLA Act**, which would give FERS annuitants the CSRS cost of living adjustment, has been introduced repeatedly and remains in committee. Proposed, not enacted.

## D.5 A closing note on verification

The most valuable habit this system can give you is not any particular number. It is the reflex of asking where a number came from.

Published guidance about federal retirement is frequently wrong, including guidance from sources that ought to know better, and including two of OPM’s own Handbook chapters. Agency estimates can fold non creditable pay into a salary base. Planning tools apply defaults written for a general audience. Colleagues pass along rules that were true under CSRS or true before 2014.

None of that is malice and most of it is not even carelessness. It is a complicated system that changes, described by people working from the version they learned.

Ask for the source. Check the arithmetic. When the tool is right and you are wrong, say so and fix your model. That habit, applied for five years before you separate, is worth more than any single finding in this guide.

# Appendix E: Version History

## 1.1.0, 16 September 2026

**The Boldin loop closed.** Version 1.0.0 could tell you what was wrong with a Boldin plan after you exported it. It could not tell you what to type to fix it, and the mapping from an arriving document to the fields it touches lived in the operator's head. This version adds both halves.

| Added | What it is |
|---|---|
| `docs/07-boldin-field-map-and-entry-engine.md` | The planner mapped screen by screen, the field inventory tied to documents and interview blocks, the reverse map from document to fields, and the Entry Sheet specification |
| `templates/boldin-entry-sheet.md` | The Entry Sheet template |
| `08 Boldin Entry Sheets/` | A ninth workspace folder, created and seeded by both setup scripts |
| Section 8.11 | The Boldin Entry Sheet, the first artifact in the catalog produced automatically rather than on request. Post-Retirement Findings moved to 8.12. |
| Sections 9.4 and 9.5 | The field map and the Entry Sheet, new in this guide |

The master prompt changed with it. Phase A creates and seeds the new folder, an operating rule makes the Entry Sheet automatic on any turn that changes a value Boldin holds, Block 14 closes by producing the first one, the monthly cycle gained a step that carries unfinished rows forward, and the definition of done now fails a report that changed a Boldin value without producing a sheet.

**One correction.** Two cross references in version 1.0.0 pointed at a Section 5.3 that does not exist. Both now point at Section 4.3, the three requests to send your benefits office.

**One known gap.** The field labels inside Boldin's add and edit dialogs come from Boldin's help articles rather than from the live form. Section 9.4 says so, and the field map carries a corrections table for anything you find that differs.

## 1.0.0, 14 September 2026

First public release. The project prompt, the fourteen block interview, the document intake checklist, sixteen report specifications, the monthly cycle, the fifteen Boldin defect classes, and a rules reference carrying eighty two citations with ten items explicitly marked unverified.
