The planner's rules file, `app/js/rules.js`, carries {{YEAR}} figures. The {{NEXT}} figures are being announced. Update each one from its primary source, following `CONTRIBUTING.md`, and update `docs/06-fers-rules-reference.md` first.

| Figure | Where in `app/js/rules.js` | Where it is announced |
|---|---|---|
| FERS, CSRS and Social Security COLAs | `cola2026` (rename for the year) | OPM COLA page and SSA, mid October |
| Supplement earnings test exempt amount | `supplement.earningsTestExempt`, `earningsTestYear` | SSA retirement earnings test exempt amounts, mid October |
| Medicare Part B premium, deductible and IRMAA brackets | `medicare` | CMS fact sheet, November |
| TSP elective deferral, catch-up and annual additions limits | `tsp` | IRS notice and TSP bulletin, November |
| Service credit deposit interest rate | `militaryDeposit.interest2026` | OPM Benefits Administration Letter, early in the year |
| FEGLI post-retirement Basic rates | `fegli.rates` | OPM FEGLI Program Information page, when OPM resets them |

When every figure is done:

- [ ] `programYear` and `checked` changed together
- [ ] `VERSION` in `app/sw.js` and in `app/js/app.js` bumped
- [ ] `node --test tests/engine.test.mjs` and `python tests/ui_smoke.py` pass
- [ ] `CHANGELOG.md` updated
