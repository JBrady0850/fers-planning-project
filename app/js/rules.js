/*
 * FERS Planner rules file.
 *
 * Every figure the calculators use lives here, once, with its source and the
 * date it was last checked. The figures are 2026 program year values taken
 * from docs/06-fers-rules-reference.md. Update this file each year when the
 * new figures are announced (see CONTRIBUTING.md, annual maintenance), and
 * change programYear and checked together so the app can say how fresh it is.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FersRules = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var S = {
    eligibility: { title: 'OPM, FERS Eligibility', url: 'https://www.opm.gov/retirement-center/fers-information/eligibility/' },
    computation: { title: 'OPM, FERS Computation', url: 'https://www.opm.gov/retirement-center/fers-information/computation/' },
    deferred: { title: 'OPM, Deferred Retirement', url: 'https://www.opm.gov/retirement-center/fers-information/types-of-retirement/tabs/deferred-retirement/' },
    ch42: { title: 'OPM CSRS/FERS Handbook Chapter 42, MRA+10 Retirement', url: 'https://www.opm.gov/retirement-center/publications-forms/csrsfers-handbook/c042.pdf' },
    ch50: { title: 'OPM CSRS/FERS Handbook Chapter 50, Computation of Annuity', url: 'https://www.opm.gov/retirement-center/publications-forms/csrsfers-handbook/c050.pdf' },
    ch51: { title: 'OPM CSRS/FERS Handbook Chapter 51, Retiree Annuity Supplement', url: 'https://www.opm.gov/retirement-center/publications-forms/csrsfers-handbook/c051.pdf' },
    ch52: { title: 'OPM CSRS/FERS Handbook Chapter 52, Survivor Elections', url: 'https://www.opm.gov/retirement-center/publications-forms/csrsfers-handbook/c052.pdf' },
    ch55: { title: 'OPM CSRS/FERS Handbook Chapter 55, Part-Time Computation', url: 'https://www.opm.gov/retirement-center/publications-forms/csrsfers-handbook/c055.pdf' },
    ch23: { title: 'OPM CSRS/FERS Handbook Chapter 23, Post-1956 Military Service', url: 'https://www.opm.gov/retirement-center/publications-forms/csrsfers-handbook/c023.pdf' },
    ch30: { title: 'OPM CSRS/FERS Handbook Chapter 30, Basic Pay', url: 'https://www.opm.gov/retirement-center/publications-forms/csrsfers-handbook/c030.pdf' },
    ri838: { title: 'OPM RI 83-8, Credit for Unused Sick Leave', url: 'https://www.opm.gov/retirement-center/publications-forms/pamphlets/ri83-8.pdf' },
    bal18103: { title: 'OPM BAL 18-103, sick leave and the 1.1 percent multiplier', url: 'https://www.opm.gov/retirement-center/publications-forms/benefits-administration-letters/2018/18-103.pdf' },
    bal26301: { title: 'OPM BAL 26-301, 2026 service credit interest rate', url: 'https://www.opm.gov/retirement-center/publications-forms/benefits-administration-letters/2026/26-301.pdf' },
    usc8410: { title: '5 U.S.C. 8410, Eligibility for annuity', url: 'https://www.law.cornell.edu/uscode/text/5/8410' },
    usc8421: { title: '5 U.S.C. 8421, Annuity supplement', url: 'https://www.law.cornell.edu/uscode/text/5/8421' },
    usc8421a: { title: '5 U.S.C. 8421a, Reductions for excess earnings', url: 'https://www.law.cornell.edu/uscode/text/5/8421a' },
    usc8462: { title: '5 U.S.C. 8462, FERS cost of living adjustments', url: 'https://www.law.cornell.edu/uscode/text/5/8462' },
    usc8464: { title: '5 U.S.C. 8464, Commencement of annuities', url: 'https://uscode.house.gov/view.xhtml?req=granuleid%3AUSC-prelim-title5-section8464&num=0&edition=prelim' },
    usc6307: { title: '5 U.S.C. 6307, Sick leave accrual', url: 'https://www.law.cornell.edu/uscode/text/5/6307' },
    usc6303: { title: '5 U.S.C. 6303, Annual leave accrual', url: 'https://www.law.cornell.edu/uscode/text/5/6303' },
    cfr842307: { title: '5 CFR 842.307, Deposits for military service', url: 'https://www.ecfr.gov/current/title-5/chapter-I/subchapter-B/part-842/subpart-C/section-842.307' },
    survivor: { title: 'OPM, Survivor Benefits', url: 'https://www.opm.gov/retirement-center/survivor-benefits/' },
    lumpSum: { title: 'OPM, Lump-Sum Payments for Annual Leave', url: 'https://www.opm.gov/policy-data-oversight/pay-leave/leave-administration/fact-sheets/lump-sum-payments-for-annual-leave/' },
    annualLeave: { title: 'OPM, Annual Leave Fact Sheet', url: 'https://www.opm.gov/policy-data-oversight/pay-leave/leave-administration/fact-sheets/annual-leave/' },
    fehbAnnuitants: { title: 'OPM FEHB Handbook, Annuitants', url: 'https://www.opm.gov/healthcare-insurance/healthcare/reference-materials/reference/annuitants/' },
    fedvip: { title: 'OPM, FEDVIP Eligibility', url: 'https://www.opm.gov/healthcare-insurance/dental-vision/eligibility/' },
    fegliHandbook: { title: 'OPM, FEGLI Handbook', url: 'https://www.opm.gov/healthcare-insurance/life-insurance/reference-materials/publications-forms/feglihandbook.pdf' },
    fegliRates: { title: 'OPM, FEGLI Program Information and Rates', url: 'https://www.opm.gov/healthcare-insurance/life-insurance/program-information/' },
    opmMedicare: { title: 'OPM, Medicare and FEHB', url: 'https://www.opm.gov/healthcare-insurance/healthcare/medicare/' },
    medicareStart: { title: 'Medicare.gov, When does Medicare coverage start', url: 'https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start' },
    cmsPartB: { title: 'CMS, 2026 Medicare Parts A and B premiums and deductibles', url: 'https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles' },
    ssaRtea: { title: 'SSA, Retirement Earnings Test Exempt Amounts', url: 'https://www.ssa.gov/oact/cola/rtea.html' },
    ssaReduction: { title: 'SSA, Benefit Reduction for Early Retirement', url: 'https://www.ssa.gov/benefits/retirement/planner/agereduction.html' },
    ssaDelay: { title: 'SSA, Delayed Retirement Credits', url: 'https://www.ssa.gov/benefits/retirement/planner/delayret.html' },
    ssaEstimate: { title: 'SSA, Get a Benefits Estimate', url: 'https://www.ssa.gov/prepare/get-benefits-estimate' },
    opmCola: { title: 'OPM, Cost of Living Adjustments FAQ', url: 'https://www.opm.gov/support/retirement/faq/cost-of-living-adjustments/' },
    tspLimits: { title: 'TSP Bulletin 25-3, 2026 contribution limits', url: 'https://www.tsp.gov/bulletins/25-3/' },
    tspTax: { title: 'TSP, Tax Rules about TSP Payments', url: 'https://www.tsp.gov/publications/tspbk26.pdf' },
    rulesRef: { title: 'docs/06-fers-rules-reference.md in this repository', url: 'https://github.com/JBrady0850/fers-planning-project/blob/main/docs/06-fers-rules-reference.md' },
    boldinMap: { title: 'docs/07-boldin-field-map-and-entry-engine.md in this repository', url: 'https://github.com/JBrady0850/fers-planning-project/blob/main/docs/07-boldin-field-map-and-entry-engine.md' },
    boldinGuide: { title: 'docs/05-boldin-setup-and-validation.md in this repository', url: 'https://github.com/JBrady0850/fers-planning-project/blob/main/docs/05-boldin-setup-and-validation.md' }
  };

  return {
    programYear: 2026,
    checked: '2026-09-16',
    sources: S,

    // Minimum Retirement Age by year of birth: [years, months].
    mra: function (birthYear) {
      if (birthYear < 1948) return [55, 0];
      if (birthYear <= 1952) return [55, (birthYear - 1947) * 2];
      if (birthYear <= 1964) return [56, 0];
      if (birthYear <= 1969) return [56, (birthYear - 1964) * 2];
      return [57, 0];
    },
    mraSource: [S.eligibility, S.ch42],

    // Social Security full retirement age by year of birth: [years, months].
    fra: function (birthYear) {
      if (birthYear <= 1937) return [65, 0];
      if (birthYear <= 1942) return [65, (birthYear - 1937) * 2];
      if (birthYear <= 1954) return [66, 0];
      if (birthYear <= 1959) return [66, (birthYear - 1954) * 2];
      return [67, 0];
    },
    fraSource: [S.ssaReduction],

    multiplier: { standard: 0.01, enhanced: 0.011, enhancedAge: 62, enhancedYears: 20, source: [S.computation, S.ch50, S.bal18103] },
    mra10ReductionPerMonth: 5 / 12 / 100,
    mra10Source: [S.computation, S.ch42, S.ch50],

    sickLeave: {
      hoursPerYear: 2087,
      daysPerYear: 360,
      creditPercent: 100,
      accrualHoursPerPayPeriod: 4,
      // OPM's conversion table, RI 83-8 pages 4 and 5, copied cell for cell.
      // Row = remaining days 0 to 29; columns = months 0 to 11; values are hours.
      // When a balance falls between two figures, OPM uses the next higher figure.
      chart: [
        '0 174 348 522 696 870 1044 1217 1391 1565 1739 1913',
        '6 180 354 528 702 875 1049 1223 1397 1571 1745 1919',
        '12 186 360 533 707 881 1055 1229 1403 1577 1751 1925',
        '17 191 365 539 713 887 1061 1235 1409 1583 1757 1931',
        '23 197 371 545 719 893 1067 1241 1415 1589 1762 1936',
        '29 203 377 551 725 899 1073 1246 1420 1594 1768 1942',
        '35 209 383 557 731 904 1078 1252 1426 1600 1774 1948',
        '41 215 388 562 736 910 1084 1258 1432 1606 1780 1954',
        '46 220 394 568 742 916 1090 1264 1438 1612 1786 1960',
        '52 226 400 574 748 922 1096 1270 1444 1618 1791 1965',
        '58 232 406 580 754 928 1102 1275 1449 1623 1797 1971',
        '64 238 412 586 760 933 1107 1281 1455 1629 1803 1977',
        '70 244 417 591 765 939 1113 1287 1461 1635 1809 1983',
        '75 249 423 597 771 945 1119 1293 1467 1641 1815 1989',
        '81 255 429 603 777 951 1125 1299 1473 1646 1820 1994',
        '87 261 435 609 783 957 1131 1304 1478 1652 1826 2000',
        '93 267 441 615 789 962 1136 1310 1484 1658 1832 2006',
        '99 273 446 620 794 968 1142 1316 1490 1664 1838 2012',
        '104 278 452 626 800 974 1148 1322 1496 1670 1844 2018',
        '110 284 458 632 806 980 1154 1328 1502 1675 1849 2023',
        '116 290 464 638 812 986 1160 1333 1507 1681 1855 2029',
        '122 296 470 644 817 991 1165 1339 1513 1687 1861 2035',
        '128 302 475 649 823 997 1171 1345 1519 1693 1867 2041',
        '133 307 481 655 829 1003 1177 1351 1525 1699 1873 2047',
        '139 313 487 661 835 1009 1183 1357 1531 1704 1878 2052',
        '146 319 493 667 841 1015 1189 1362 1536 1710 1884 2058',
        '151 325 499 673 846 1020 1194 1368 1542 1716 1890 2064',
        '157 331 504 678 852 1026 1200 1374 1548 1722 1896 2070',
        '162 336 510 684 858 1032 1206 1380 1554 1728 1902 2075',
        '168 342 516 690 864 1038 1212 1386 1560 1733 1907 2081'
      ],
      source: [S.ri838, S.bal18103, S.usc6307]
    },

    annualLeave: {
      accrualOptions: [4, 6, 8],
      ceilingHours: 240,
      source: [S.annualLeave, S.lumpSum, S.usc6303]
    },

    payPeriodsPerYear: 26,
    hoursPerWorkYear: 2087,

    supplement: {
      earningsTestExempt: 24480,
      earningsTestYear: 2026,
      reductionPerDollarOver: 0.5,
      source: [S.ch51, S.usc8421, S.usc8421a, S.ssaRtea]
    },

    survivor: {
      full: { reduction: 0.10, benefit: 0.50 },
      partial: { reduction: 0.05, benefit: 0.25 },
      none: { reduction: 0, benefit: 0 },
      source: [S.survivor, S.ch50, S.ch52]
    },

    cola2026: { fers: 2.0, csrs: 2.8, socialSecurity: 2.8, source: [S.opmCola, S.usc8462] },

    medicare: {
      partBPremium: 202.90,
      partBDeductible: 283,
      // Single filer MAGI ceilings and the total monthly Part B premium.
      irmaa: [
        { single: 109000, joint: 218000, premium: 202.90 },
        { single: 137000, joint: 274000, premium: 284.10 },
        { single: 171000, joint: 342000, premium: 405.80 },
        { single: 205000, joint: 410000, premium: 527.50 },
        { single: 500000, joint: 750000, premium: 649.20 },
        { single: Infinity, joint: Infinity, premium: 689.90 }
      ],
      source: [S.cmsPartB, S.medicareStart, S.opmMedicare]
    },

    fegli: {
      // Monthly cost per $1,000 of the Basic Insurance Amount at retirement.
      rates: {
        '75': { pre65: 0.3467, post65: 0, reducePerMonth: 0.02, floor: 0.25, label: '75 percent reduction' },
        '50': { pre65: 1.0967, post65: 0.75, reducePerMonth: 0.01, floor: 0.50, label: '50 percent reduction' },
        'none': { pre65: 2.5967, post65: 2.25, reducePerMonth: 0, floor: 1.0, label: 'No reduction' }
      },
      biaRoundTo: 1000,
      biaAdd: 2000,
      source: [S.fegliRates, S.fegliHandbook]
    },

    tsp: {
      electiveDeferral: 24500,
      catchUp50: 8000,
      catchUp60to63: 11250,
      annualAdditions: 72000,
      source: [S.tspLimits]
    },

    militaryDeposit: { rate: 0.03, rate1999: 0.0325, rate2000: 0.034, interest2026: 4.25, source: [S.cfr842307, S.ch23, S.bal26301] },

    withdrawalRateFlag: 4.0
  };
});
