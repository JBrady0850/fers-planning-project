/*
 * The worked example from Part 10 of the user guide. Every figure is invented.
 * "Dana Reyes" is not a real person. The figures the guide prints are
 * reproduced exactly (see tests/engine.test.mjs); the extra figures the guide
 * does not give, such as balances and premiums, are invented here so that
 * every tab has something to show.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FersSample = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return {
    schema: 1,
    sample: true,
    person: { name: 'Dana Reyes (invented example)', dob: '1972-04-15', specialProvision: 'no', married: 'no', spouseDob: '' },
    service: {
      scdRetirement: '2003-08-01', scdSource: 'les', scdLeave: '1999-08-01',
      militaryY: '4', militaryM: '0', militaryD: '0', militaryStatus: 'plan', militaryRetiredPay: 'none', militaryDepositAmount: '3900',
      pre89Y: '', pre89M: '', pre89D: '', pre89Status: 'plan',
      refundY: '', refundM: '', refundD: '', refundStatus: 'plan',
      partTimeFactor: '1'
    },
    pay: { high3Mode: 'direct', high3Direct: '114600', currentBasic: '112000', currentBasicAsOf: '2026-01-11', raisePct: '1', history: [], agencyEstimateMonthly: '', agencyEstimateSep: '' },
    dates: { believedDate: '2029-04-15', believedSource: 'memory', preferredSep: '2029-08-31', postponeTo: '', preferredFirmness: 'preferred' },
    leave: { sickHours: '760', sickAsOf: '2026-10-01', sickUsePerYear: '', sickAtSep: '1020', annualHours: '200', annualAsOf: '2026-10-01', annualAccrual: '8', annualUsePerYear: '200', annualCeiling: '240', annualAtSep: '' },
    ss: { ss62: '1980', ssFra: '2830', ss70: '3509', claimAgeY: '67', claimAgeM: '0', estimateDate: '2026-09-30', postRetEarnings: '' },
    insurance: { fehbStart: '2003-08-01', fehbPremium: '412.50', fedvipPremium: '58.20', fegliBasicStart: '2003-08-01', fegliAStart: '', fegliBStart: '', fegliBMultiple: '', fegliCStart: '', fegliElection: '75', medInflation: '5' },
    survivor: { election: 'full', spouseOnFehb: '', longevityRetiree: '92', longevitySpouse: '' },
    money: { spendSource: 'register', spendFull: '7240', spendCurrent: '6890', spendRetired: '5515', tspTrad: '520000', tspRoth: '85000', iraTrad: '', iraRoth: '', taxable: '25000', cash: '10000', balancesAsOf: '2026-09-30', otherIncome: '', otherIncomeLabel: '', otherIncomeStart: '' },
    assumptions: { inflation: '2.5', dietCola: '2.0', returnPct: '5.5', longevity: '92' },
    boldin: { chanceOfSuccess: '', strategyNow: '' }
  };
});
