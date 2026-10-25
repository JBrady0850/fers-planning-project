# THE FERS PLANNER APP

**Open it:** https://jbrady0850.github.io/fers-planning-project/

The planner is a free web app that works out a Regular FERS retirement from a person's own answers: the four eligibility dates, the annuity with its arithmetic, the FERS Special Retirement Supplement and its earnings test, the sick leave credit and the annual leave lump sum, the FEHB and FEGLI five year rules, the survivor election, income against spending, and a Boldin Entry Sheet. The whole plan saves as a Word file or a PDF, built in the browser.

There is no account, no sign-in, no key and no tracking. Answers stay in the browser on the device that entered them. The app is plain HTML, CSS and JavaScript in `app/`, so it also opens straight from a downloaded copy.

It is analysis and arithmetic, not financial, legal or tax advice, and it is not affiliated with OPM or any agency. See `DISCLAIMER.md`.

---

## WHO IT FITS

| Fits | Does not fit |
|---|---|
| Regular FERS employees planning a voluntary retirement | Special provision retirement: law enforcement officers, firefighters, air traffic controllers, nuclear materials couriers, Customs and Border Protection officers, Capitol and Supreme Court Police, military reserve technicians |
| Anyone who wants the dates and the annuity worked out before talking to the benefits office | CSRS, CSRS Offset, or a FERS annuity with a CSRS component |
| Anyone who wants Boldin given the right numbers | Disability retirement, discontinued service retirement and VERA early outs, which have their own thresholds and start dates |

A person who answers yes to special provision coverage sees a stop notice on every result tab and in the saved plan, because the ages, the multiplier, the supplement and the COLA all work differently for them. A person who answers "not sure" sees a warning.

---

## HOW IT RELATES TO THE CLAUDE PROJECT

The Claude project in this repository reads a person's own documents and runs a fourteen block interview against them. The planner asks the same core questions in ten short steps and needs no setup, no Claude account and no documents in a folder.

They work together. The planner's answers file is plain JSON a Claude session can read, and the Boldin tab copies the Entry Sheet as Markdown in the exact layout of `templates/boldin-entry-sheet.md`, ready to drop into `08 Boldin Entry Sheets`. The planner does not replace the document checks the Claude project does: every figure it uses is one the person typed, so a wrong answer produces a wrong plan.

| Planner step | What it asks | Interview block |
|---|---|---|
| 1. About you | Date of birth, special provision coverage, marital status | Block 1 |
| 2. Service | Retirement SCD and where it came from, leave SCD, the believed eligibility date, military service and its deposit, retired pay, pre-1989 non-deduction service, refunds, part time | Blocks 1 and 2 |
| 3. Pay and the high-3 | Current basic pay, raise assumption, the high-3 directly or from salary history, any agency estimate | Block 3 |
| 4. Your date | The derived eligibility dates first, then a preferred date and an optional postponed start | Blocks 1 and 5 |
| 5. Leave | Sick and annual leave balances, accrual, expected use, carryover ceiling | Block 5 |
| 6. Social Security | Zero future earnings estimates at 62, full retirement age and 70, claiming age, post-retirement wages | Blocks 4 and 7 |
| 7. Insurance | FEHB and FEGLI start dates, the annuitant premiums, medical inflation | Block 10 |
| 8. Survivor | The election to model and the planning ages | Block 11 |
| 9. Spending and savings | The three expense lenses and every balance | Blocks 6 and 9 |
| 10. Assumptions | Inflation, the diet COLA, return, longevity | Block 13 |

---

## WHAT EACH TAB SHOWS

| Tab | What you see |
|---|---|
| **Start** | The verdict in the first three sentences, interview progress, and the open items ranked by impact |
| **Answers** | The ten steps, saved as you type |
| **Dates** | The MRA, the four eligibility dates with their rules and month end separation dates, every age-triggered date, the creditable service audit, and the military deposit comparison with its break-even |
| **Annuity** | The high-3, the computation line by line, the age and survivor reductions, the agency estimate check, and every candidate date side by side |
| **Supplement** | Eligibility stated before any arithmetic, the computation, its three properties, the earnings test, and the no-supplement case |
| **Leave** | The sick leave projection and conversion with its value in dollars, the annual leave lump sum, and the separation date rule |
| **Insurance** | The FEHB and FEGLI five year rules at every candidate date, postponed versus deferred, the pre-65 window costed month by month, Medicare, and the FEGLI reduction elections |
| **Survivor** | Full, partial and none priced, the FEHB consequence, consent, and the change windows |
| **Income** | Income line by line with start dates, the gap and withdrawal rate period by period, the three lenses, savings by tax treatment, and the assumptions table |
| **Boldin** | The Entry Sheet: one row per field, ordered by impact, with what it replaces and its source |
| **Plan** | The whole plan, word for word what the files contain, with the Word and PDF buttons |
| **Help** | How to use it, what it does not do, and every term defined |
| **Settings** | Save and open the answers file, load the worked example, clear answers, install steps, privacy |

Hover over, tap, or tab to any dotted term to see its definition.

---

## HOW THE NUMBERS ARE WORKED OUT

Every rule lives in `app/js/rules.js` with its source, and every calculation in `app/js/engine.js`. The rule statements follow `docs/06-fers-rules-reference.md`. The points below are the choices the code makes that a reader should know about.

**Service is counted inclusive of both days.** Service from an SCD through a separation date counts the SCD and the separation date, in calendar months, so an SCD of 1 August 2003 reaches 30 years on 31 July 2033. OPM combines service in 30 day months, which can differ by a day. The annuity uses whole months, so the difference rarely matters, and the app says so on the Dates tab.

**The SCD the app uses for eligibility** is the retirement SCD entered, moved earlier by any military service or pre-1989 non-deduction service whose deposit is planned. Refunded FERS service is assumed to be inside the retirement SCD already, because it counts toward eligibility, and is removed from the computation unless a redeposit is planned. A deposit or redeposit question left unanswered is treated as not paid and raised as an open item.

**Five years of civilian service** must be reached before any path opens, 5 U.S.C. 8410. The app tracks civilian service separately, taking military service back out whether a planned deposit adds it or it is already inside the SCD, and shows no annuity below 5 civilian years.

**Sick leave uses OPM's own table, copied cell for cell from RI 83-8**, not a formula. The table is built on the 2,087 hour, 360 day basis, but a handful of its cells differ from the computed figure by about an hour (4 months 1 day is 702 hours on the table, 701.5 by formula). Balances that fall between two figures take the next higher figure, as RI 83-8 instructs. Sick leave days are added to service before leftover days are dropped. The test suite checks the table against every example OPM publishes.

**The high-3** is either entered directly and held constant across candidate dates, or computed from salary history as a time weighted average over every three year window, with an assumed January raise after the last rate entered. Either way it is labeled when it is an estimate.

**The 1.1 percent multiplier** applies at age 62 or older at separation with 20 years including sick leave credit, per OPM BAL 18-103.

**The MRA+10 reduction** is 5/12 of 1 percent for each full month under 62 at the commencing date. A postponed annuity is reduced from its own start date, and the MRA+20 rule removes the reduction when the annuity starts at or after 60 with 20 years.

**The survivor reduction** is 10 or 5 percent of the annuity after the age reduction, and the survivor benefit is 50 or 25 percent of that same base, per CSRS/FERS Handbook Chapter 50, section 50B3.1-3D.4.

**The supplement** is the zero future earnings estimate at 62 times FERS civilian years rounded to the nearest whole year, over 40. Military service and sick leave are not counted, including military service already inside the SCD. It ends on the last day of the month of the 62nd birthday, or the month before for a birthday on the 1st or 2nd (Handbook Chapter 51, section 51A1.1-3 E), and never receives a COLA.

**The earnings test** follows 5 U.S.C. 8421a month by month. The planned yearly wage counts only for the months the supplement is paid in each calendar year. Half the excess over the exempt amount, capped at that year's supplement, is spread over the supplement months of the following July through June, and no month loses more than its supplement. The exempt amount is held at the 2026 figure for every year, which overstates the reduction slightly in later years.

**A deferred annuity** is modeled from the first day of the month after the earliest age at which it carries no reduction: the MRA with 30 years, 60 with 20, otherwise 62. It carries no sick leave credit, no supplement and no FEHB, so the pre-65 window is counted from separation and left uncosted.

**The pre-65 window** runs from the annuity commencing date (from separation on the deferred path) to Medicare, which starts on the first day of the month of the 65th birthday, or the month before when the birthday is on the first.

**The verdict** is set by the worst period, not only the bridge years: on track at or under 4 percent in every period, tight up to 5 percent, short above that. The periods start the month after separation, so the months before a postponed or deferred annuity count with no annuity, and they break where the supplement ends or changes and where Social Security starts. Social Security is counted from the first month the person is the claiming age throughout, an age being reached the day before the birthday; at 62 that is the first month of entitlement, and at later ages SSA can pay from a month earlier. A missing Social Security estimate or claiming age blocks the verdict rather than counting as zero. Income is in today's dollars with no COLA before 62 and none modeled after it, which understates later years slightly.

**FEGLI** uses a Basic Insurance Amount of annual basic pay rounded up to the next $1,000, plus $2,000, and the post-retirement rates from OPM's Program Information page.

---

## WHAT IT DOES NOT MODEL

- Income tax, state tax, Roth conversions, required minimum distribution amounts and the income-related Medicare adjustment beyond stating the thresholds
- Market returns, sequence risk and Chance of Success. Boldin does those, and the Entry Sheet gives it the right inputs.
- The diet COLA after 62 inside the income periods, the first year COLA proration, and a CSRS component
- Discontinued service retirement, where the annuity starts the day after separation, VERA, disability retirement and death in service
- A TSP life annuity purchase, which is irrevocable and listed as an election to take to a fiduciary
- The annual leave projection the agency actually runs, which applies hours to workdays and holidays and pays any raise inside the projected period

---

## SAVING THE PLAN

| Button | What you get |
|---|---|
| **Download Word (.docx)** | The whole plan as an editable Word file, built by the docx library. Opens in Word, Google Docs and Pages. The Entry Sheet appendix is landscape. |
| **Download PDF** | The same plan as a fixed PDF, built by pdfmake with the Roboto typeface |
| **Copy the Entry Sheet as Markdown** | The Entry Sheet in the layout of `templates/boldin-entry-sheet.md`, for the Claude project's `08 Boldin Entry Sheets` folder |
| **Save answers file** | Every answer as JSON, to carry the plan to another device or into a Claude session |

The plan document follows Phase C of the master prompt: the verdict, the eligibility dates, creditable service, the annuity, the supplement, income and the gap, leave, insurance and the pre-65 window, the survivor election, assumptions, and open items, then the Entry Sheet, the irreversible elections and the sources as appendices, and the definition of done checklist at the end.

Every saved file says on its first page that it holds personal financial information.

---

## PRIVACY

The app makes no network request with anyone's answers. The browser test fails if any request leaves the app's own site. The two libraries that build the files ship inside `app/vendor/` and load only when a file is requested. Answers are kept in the browser's local storage on that device only, so clearing browser data clears them, and the answers file is the way to keep a copy. Do not use the app on a government computer.

---

## FILES

| Path | What it is |
|---|---|
| `app/index.html` | The page |
| `app/css/app.css` | Styles, light and dark |
| `app/js/rules.js` | Every rule and 2026 figure, with its source. The one file to update each year. |
| `app/js/engine.js` | The calculations: dates, service, sick leave, high-3, annuity, supplement, leave, insurance, survivor, income, the Entry Sheet rows. No page code. |
| `app/js/plan.js` | Turns the answers into sections of plain blocks. The tabs, the Word file and the PDF all render these same blocks. |
| `app/js/export.js` | The Word, PDF and Markdown builders |
| `app/js/app.js` | The interview, the tabs, storage and the buttons |
| `app/js/glossary.js` | Every term definition |
| `app/js/sample.js` | The invented worked example from Part 10 of the user guide |
| `app/sw.js`, `app/manifest.webmanifest`, `app/icons/` | Offline use and home screen install |
| `app/vendor/` | docx and pdfmake, with `LICENSES.md` |
| `tests/engine.test.mjs` | Engine tests against OPM's own examples and Part 10 |
| `tests/ui_smoke.py` | Browser test of every tab and every file |
| `tests/make_screenshots.py` | Rewrites the README screenshots |
| `tests/make_icons.py` | Redraws the PNG icons and the QR code from the icon geometry |

---

## UPDATING THE RULES EACH YEAR

Figures change between October and December. The **Annual figures reminder** workflow opens an issue each November and December when `app/js/rules.js` is behind.

1. Confirm each new figure against its primary source, as `CONTRIBUTING.md` requires, and update `docs/06-fers-rules-reference.md` first.
2. In `app/js/rules.js`, change the figure, `programYear` and `checked` together. The page header shows them, so a stale file is visible to every reader.
3. Bump `VERSION` in `app/sw.js` so returning visitors get the new file, and the version in `app/js/app.js`.
4. Run both test suites and fix any expectation that moved because a figure moved.
5. Record the change in `CHANGELOG.md`.

---

## TESTING

```
node --test tests/engine.test.mjs
pip install playwright pypdf
python -m playwright install chromium
python tests/ui_smoke.py
```

The engine tests reproduce RI 83-8's conversion examples, the validation report's combined service example, and every figure in Part 10 of the guide, and they test the 1.1 percent rule and its date, MRA+20, the 5 civilian year floor, the deferred start dates, the earnings test against 5 U.S.C. 8421a and Handbook Chapter 51's own example, the supplement end for birthdays on the 1st and 2nd, the FEHB boundary, FEGLI, the high-3 weighting, Social Security reductions, the income periods before a postponed annuity, missing answers that block rather than invent, and the Entry Sheet order. A separate reviewer rebuilt about fifty scenarios by hand from `docs/06` before the first release; each defect it found has a test.

The browser test opens the app from a web server and as a plain file at phone, iPad, Android tablet and desktop sizes, and fails on any script error, any tab that scrolls sideways, any term without a definition, a definition that does not open on hover, tap and keyboard focus, any request that leaves the app's own site, answers that do not survive a reload, a missing special provision stop notice, or a Word, PDF or Markdown file that does not contain the plan.

---

## PUBLISHING

`.github/workflows/pages.yml` publishes the `app` folder to GitHub Pages on every push to `main` that touches it. It needs one repository setting, made once: **Settings, Pages, Source: GitHub Actions**. `.github/workflows/tests.yml` runs both test suites on every push and pull request.

---

## KNOWN DIFFERENCES FROM THE USER GUIDE

- **Part 10, section 10.5.** With the military deposit paid, Dana's service reaches 30 years on 31 July 2029, by the same counting the guide's own table uses for 31 July 2033. The planner therefore shows MRA+30 available from 31 July 2029, one month before the 31 August 2029 date the guide prices. The guide's figures for 31 August 2029 are reproduced exactly; only its statement that 31 August is the earliest MRA+30 date is a month late.
- **Part 10, section 10.8.** The guide judges the bridge years only and calls them on track. The planner judges every period, and for the worked example the tightest one runs from the end of the supplement at 62 to a Social Security claim at 67, at 4.88 percent, so its verdict is tight. Section 10.8 itself points at that transition as the next thing to price.
- **Section 2.8 and section 2.10.** The guide says the supplement ends at the end of the month of the 62nd birthday and describes a deferred annuity as payable at 62 or at the MRA reduced. The planner follows the fuller rules in `docs/06`: a birthday on the 1st or 2nd ends the supplement a month sooner, and a deferred annuity with 20 years starts unreduced at 60, or with 30 years at the MRA.
