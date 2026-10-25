/*
 * FERS Planner calculation engine.
 *
 * Pure functions only: no page, no storage, no network. Every function takes
 * the saved answers (see blankInputs) and returns figures together with the
 * arithmetic that produced them and the rule sources behind them, so the page,
 * the Word file and the PDF can all show their work.
 *
 * Scope: Regular FERS, voluntary retirement. Special provision retirement
 * (law enforcement, firefighter, air traffic controller and similar), CSRS and
 * CSRS components, disability and discontinued service retirement are out of
 * scope and the engine says so rather than computing them.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./rules.js'));
  else root.FersEngine = factory(root.FersRules);
})(typeof self !== 'undefined' ? self : this, function (R) {
  'use strict';

  var DAY = 86400000;
  var S = R.sources;

  /* ------------------------------------------------------------------ */
  /* Dates. All dates are UTC midnight, parsed from YYYY-MM-DD.           */
  /* ------------------------------------------------------------------ */

  function parse(s) {
    if (!s || typeof s !== 'string') return null;
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
    if (!m) return null;
    var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    if (d.getUTCDate() !== +m[3] || d.getUTCMonth() !== +m[2] - 1) return null;
    return d;
  }
  function iso(d) {
    if (!d) return '';
    var y = d.getUTCFullYear(), m = d.getUTCMonth() + 1, dd = d.getUTCDate();
    return y + '-' + (m < 10 ? '0' : '') + m + '-' + (dd < 10 ? '0' : '') + dd;
  }
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function longDate(d) {
    if (!d) return '';
    return d.getUTCDate() + ' ' + MONTHS[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
  }
  function daysInMonth(y, m) { return new Date(Date.UTC(y, m + 1, 0)).getUTCDate(); }
  function addDays(d, n) { return new Date(d.getTime() + n * DAY); }
  function addMonths(d, n) {
    var y = d.getUTCFullYear(), m = d.getUTCMonth(), day = d.getUTCDate();
    var t = m + n;
    var ny = y + Math.floor(t / 12);
    var nm = ((t % 12) + 12) % 12;
    return new Date(Date.UTC(ny, nm, Math.min(day, daysInMonth(ny, nm))));
  }
  function lastOfMonth(d) { return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)); }
  function firstOfMonth(d) { return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)); }
  function firstOfNextMonth(d) { return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1)); }
  function isLastOfMonth(d) { return d.getUTCDate() === daysInMonth(d.getUTCFullYear(), d.getUTCMonth()); }
  function maxDate() {
    var best = null;
    for (var i = 0; i < arguments.length; i++) if (arguments[i] && (!best || arguments[i] > best)) best = arguments[i];
    return best;
  }
  function minDate() {
    var best = null;
    for (var i = 0; i < arguments.length; i++) if (arguments[i] && (!best || arguments[i] < best)) best = arguments[i];
    return best;
  }
  function daysBetween(a, b) { return Math.round((b - a) / DAY); }

  // Whole calendar months and leftover days from start up to, not including, end.
  function diff(start, endExclusive) {
    var tm = (endExclusive.getUTCFullYear() - start.getUTCFullYear()) * 12 + (endExclusive.getUTCMonth() - start.getUTCMonth());
    if (addMonths(start, tm) > endExclusive) tm -= 1;
    if (tm < 0) return { y: 0, m: 0, d: 0, months: 0, negative: true };
    var anchor = addMonths(start, tm);
    return { y: Math.floor(tm / 12), m: tm % 12, d: daysBetween(anchor, endExclusive), months: tm };
  }
  // Age in completed years, months and days on a date.
  function ageOn(dob, date) { return diff(dob, date); }
  // Date a person attains an age (the birthday itself).
  function attains(dob, years, months) { return addMonths(dob, years * 12 + (months || 0)); }
  // Creditable service from the SCD through a separation date, both days included.
  function serviceThrough(scd, date) { return diff(scd, addDays(date, 1)); }
  // The date on which service from the SCD reaches a whole number of years.
  function dateServiceReaches(scd, years) { return addDays(addMonths(scd, years * 12), -1); }
  // Whole months from a to b, never exceeding b.
  function fullMonths(a, b) { if (b <= a) return 0; return diff(a, b).months; }

  /* ------------------------------------------------------------------ */
  /* Service arithmetic on the 360 day retirement year (30 day months).   */
  /* ------------------------------------------------------------------ */

  function svc(y, m, d) { return norm({ y: +y || 0, m: +m || 0, d: +d || 0 }); }
  function toDays(s) { return ((s.y || 0) * 12 + (s.m || 0)) * 30 + (s.d || 0); }
  function fromDays(n) {
    if (n < 0) n = 0;
    var months = Math.floor(n / 30);
    return { y: Math.floor(months / 12), m: months % 12, d: n % 30 };
  }
  function norm(s) { return fromDays(toDays(s)); }
  function addSvc(a, b) { return fromDays(toDays(a) + toDays(b)); }
  function subSvc(a, b) { return fromDays(toDays(a) - toDays(b)); }
  function svcYears(s) { return (s.y || 0) + (s.m || 0) / 12; } // whole months only
  function svcText(s) {
    var parts = [s.y + (s.y === 1 ? ' year' : ' years'), s.m + (s.m === 1 ? ' month' : ' months')];
    if (s.d) parts.push(s.d + (s.d === 1 ? ' day' : ' days'));
    return parts.join(' ');
  }
  function subtractFromDate(date, s) { return addDays(addMonths(date, -((s.y || 0) * 12 + (s.m || 0))), -(s.d || 0)); }
  function addToDate(date, s) { return addDays(addMonths(date, (s.y || 0) * 12 + (s.m || 0)), s.d || 0); }

  /* ------------------------------------------------------------------ */
  /* Money and number formatting.                                         */
  /* ------------------------------------------------------------------ */

  function round2(n) { return Math.round((n + Number.EPSILON) * 100) / 100; }
  function money(n, cents) {
    if (n === null || n === undefined || isNaN(n)) return 'not entered';
    var neg = n < 0; n = Math.abs(n);
    var s = (cents === false ? Math.round(n) : round2(n)).toFixed(cents === false ? 0 : 2);
    var parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (neg ? '-$' : '$') + parts.join('.');
  }
  function pct(n, places) {
    if (n === null || n === undefined || isNaN(n)) return 'not entered';
    return (+n).toFixed(places === undefined ? 3 : places).replace(/\.?0+$/, function (z) { return z.indexOf('.') === 0 ? '' : z; }) + ' percent';
  }
  function num(v) {
    if (v === null || v === undefined || v === '') return null;
    var n = typeof v === 'number' ? v : parseFloat(String(v).replace(/[$,\s]/g, ''));
    return isNaN(n) ? null : n;
  }

  /* ------------------------------------------------------------------ */
  /* The answers.                                                         */
  /* ------------------------------------------------------------------ */

  function blankInputs() {
    return {
      schema: 1,
      savedAt: '',
      person: { name: '', dob: '', specialProvision: '', married: '', spouseDob: '' },
      service: {
        scdRetirement: '', scdSource: '', scdLeave: '',
        militaryY: '', militaryM: '', militaryD: '', militaryStatus: 'none', militaryRetiredPay: 'none', militaryDepositAmount: '',
        pre89Y: '', pre89M: '', pre89D: '', pre89Status: '',
        refundY: '', refundM: '', refundD: '', refundStatus: '',
        partTimeFactor: '1'
      },
      pay: { high3Mode: 'direct', high3Direct: '', currentBasic: '', currentBasicAsOf: '', raisePct: '', history: [], agencyEstimateMonthly: '', agencyEstimateSep: '' },
      dates: { believedDate: '', believedSource: '', preferredSep: '', postponeTo: '', preferredFirmness: '' },
      leave: { sickHours: '', sickAsOf: '', sickUsePerYear: '', sickAtSep: '', annualHours: '', annualAsOf: '', annualAccrual: '', annualUsePerYear: '', annualCeiling: '240', annualAtSep: '' },
      ss: { ss62: '', ssFra: '', ss70: '', claimAgeY: '', claimAgeM: '', estimateDate: '', postRetEarnings: '' },
      insurance: { fehbStart: '', fehbPremium: '', fedvipPremium: '', fegliBasicStart: '', fegliAStart: '', fegliBStart: '', fegliBMultiple: '', fegliCStart: '', fegliElection: '75', medInflation: '' },
      survivor: { election: 'full', spouseOnFehb: '', longevityRetiree: '', longevitySpouse: '' },
      money: { spendSource: '', spendFull: '', spendCurrent: '', spendRetired: '', tspTrad: '', tspRoth: '', iraTrad: '', iraRoth: '', taxable: '', cash: '', balancesAsOf: '', otherIncome: '', otherIncomeLabel: '', otherIncomeStart: '' },
      assumptions: { inflation: '', dietCola: '', returnPct: '', longevity: '' },
      boldin: { chanceOfSuccess: '', strategyNow: '' }
    };
  }

  // Fill any missing keys from the blank shape so older saved files keep working.
  function upgrade(saved) {
    var base = blankInputs();
    if (!saved || typeof saved !== 'object') return base;
    Object.keys(base).forEach(function (k) {
      if (base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) {
        var src = saved[k] && typeof saved[k] === 'object' ? saved[k] : {};
        Object.keys(base[k]).forEach(function (f) {
          if (src[f] !== undefined) base[k][f] = src[f];
        });
      } else if (saved[k] !== undefined) base[k] = saved[k];
    });
    if (!Array.isArray(base.pay.history)) base.pay.history = [];
    base.pay.history = base.pay.history.filter(function (r) { return r && typeof r === 'object'; }).map(function (r) { return { date: String(r.date || ''), rate: String(r.rate || '') }; });
    if (saved.sample === true) base.sample = true;
    return base;
  }

  /* ------------------------------------------------------------------ */
  /* Sick leave on OPM's 2,087 hour chart.                                */
  /* ------------------------------------------------------------------ */

  var CHART = R.sickLeave.chart.map(function (row) { return row.split(' ').map(Number); });
  // Hours OPM's table shows for a number of months and days.
  function chartHours(months, days) { return CHART[days][months]; }
  // The same figure computed from the 2,087 hour, 360 day basis, for checking the table.
  function formulaHours(months, days) {
    return months * R.sickLeave.hoursPerYear / 12 + days * R.sickLeave.hoursPerYear / R.sickLeave.daysPerYear;
  }

  // Converts hours to years, months and days of credit. When the hours fall
  // between two chart figures OPM uses the next higher figure (RI 83-8).
  function sickLeaveCredit(hours) {
    var h = num(hours);
    var out = { hours: h || 0, y: 0, m: 0, d: 0, chartFigure: 0, steps: [] };
    if (!h || h <= 0) { out.steps.push('No unused sick leave entered, so no credit.'); return out; }
    var years = Math.floor(h / R.sickLeave.hoursPerYear);
    var rem = h - years * R.sickLeave.hoursPerYear;
    var found = null;
    if (rem > 0) {
      for (var n = 1; n < 360; n++) {
        var mm = Math.floor(n / 30), dd = n % 30;
        if (chartHours(mm, dd) >= rem) { found = { m: mm, d: dd, figure: chartHours(mm, dd) }; break; }
      }
      if (!found) { years += 1; found = { m: 0, d: 0, figure: R.sickLeave.hoursPerYear }; }
    } else found = { m: 0, d: 0, figure: 0 };
    out.y = years; out.m = found.m; out.d = found.d; out.chartFigure = found.figure;
    if (years) out.steps.push(h + ' hours includes ' + years + ' full year' + (years > 1 ? 's' : '') + ' of 2,087 hours, leaving ' + (Math.round(rem * 100) / 100) + ' hours.');
    if (rem > 0) {
      out.steps.push((years ? 'The remaining ' : '') + (Math.round(rem * 100) / 100) + ' hours fall at or below the chart figure of ' + found.figure + ' hours, which is ' + found.m + ' months ' + found.d + ' days. OPM uses the next higher figure when the hours fall between two.');
    }
    out.steps.push('Credit: ' + svcText({ y: out.y, m: out.m, d: out.d }) + '. The chart runs on the 360 day retirement year, so a day is 2,087 / 360 = 5.797 hours, not 8.');
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Service: the SCD, deposits and redeposits.                           */
  /* ------------------------------------------------------------------ */

  function serviceModel(inp, opts) {
    opts = opts || {};
    var s = inp.service;
    var scd = parse(s.scdRetirement);
    var military = svc(s.militaryY, s.militaryM, s.militaryD);
    var pre89 = svc(s.pre89Y, s.pre89M, s.pre89D);
    var refund = svc(s.refundY, s.refundM, s.refundD);
    var hasMil = toDays(military) > 0 && (s.militaryStatus === 'plan' || s.militaryStatus === 'no');
    var milIncluded = hasMil && (opts.forceMilitary === true || (opts.forceMilitary !== false && s.militaryStatus === 'plan'));
    var milCreditedAlready = s.militaryStatus === 'credited' && toDays(military) > 0;
    var pre89Included = toDays(pre89) > 0 && s.pre89Status === 'plan';
    var refundRedeposit = toDays(refund) > 0 && s.refundStatus === 'plan';
    var notes = [];
    if (!scd) return { ok: false, notes: ['Retirement SCD not entered.'] };
    var eligSCD = scd;
    if (milIncluded) eligSCD = subtractFromDate(eligSCD, military);
    if (pre89Included) eligSCD = subtractFromDate(eligSCD, pre89);
    if (milIncluded) notes.push('Military service of ' + svcText(military) + ' is added by moving the SCD back, which assumes the deposit is paid in full before separation.');
    if (hasMil && !milIncluded) notes.push('Military service of ' + svcText(military) + ' is left out because no deposit is assumed. Post-1956 military service counts for neither eligibility nor the computation without the deposit.');
    if (pre89Included) notes.push('Pre-1989 non-deduction service of ' + svcText(pre89) + ' is added, which assumes the full deposit is paid. Partial payment buys nothing.');
    if (toDays(pre89) > 0 && !pre89Included) notes.push('Pre-1989 non-deduction service of ' + svcText(pre89) + ' is left out. Without the full deposit it counts for nothing under FERS.');
    if (toDays(refund) > 0 && !refundRedeposit) notes.push('Refunded service of ' + svcText(refund) + ' counts toward eligibility but is removed from the computation because no redeposit is assumed.');
    if (refundRedeposit) notes.push('Refunded service of ' + svcText(refund) + ' counts in full, which assumes the redeposit is paid.');
    var pre89Unanswered = toDays(pre89) > 0 && !s.pre89Status;
    var refundUnanswered = toDays(refund) > 0 && !s.refundStatus;
    if (pre89Unanswered) notes.push('Whether the pre-1989 deposit will be paid is not answered, so that service is left out until it is.');
    if (refundUnanswered) notes.push('Whether the refunded service will be redeposited is not answered, so no redeposit is assumed until it is.');
    // Civilian service, for the five year rule of 5 U.S.C. 8410: military service is
    // taken back out whether it is added by a planned deposit or already in the SCD.
    var civSCD = scd;
    if (pre89Included) civSCD = subtractFromDate(civSCD, pre89);
    if (milCreditedAlready) civSCD = addToDate(civSCD, military);
    var pt = num(s.partTimeFactor);
    if (pt === null || pt <= 0 || pt > 1) pt = 1;
    return {
      ok: true, scd: scd, eligSCD: eligSCD, civSCD: civSCD, military: military, militaryIncluded: milIncluded,
      militaryCredited: milCreditedAlready, militaryAvailable: hasMil,
      pre89: pre89, pre89Included: pre89Included, refund: refund, refundRedeposit: refundRedeposit,
      pre89Unanswered: pre89Unanswered, refundUnanswered: refundUnanswered,
      partTime: pt, notes: notes
    };
  }

  /* ------------------------------------------------------------------ */
  /* High-3.                                                              */
  /* ------------------------------------------------------------------ */

  function payTimeline(inp) {
    var p = inp.pay;
    var rows = (p.history || []).map(function (r) { return { date: parse(r.date), rate: num(r.rate) }; })
      .filter(function (r) { return r.date && r.rate; })
      .sort(function (a, b) { return a.date - b.date; });
    var cur = num(p.currentBasic), curAsOf = parse(p.currentBasicAsOf);
    if (cur && curAsOf && !rows.some(function (r) { return +r.date === +curAsOf; })) {
      rows.push({ date: curAsOf, rate: cur });
      rows.sort(function (a, b) { return a.date - b.date; });
    } else if (cur && !curAsOf && !rows.length) {
      rows.push({ date: new Date(Date.UTC(new Date().getUTCFullYear(), 0, 1)), rate: cur });
    }
    return rows;
  }

  function rateFunction(inp, untilDate) {
    var rows = payTimeline(inp);
    if (!rows.length) return null;
    var raise = num(inp.pay.raisePct) || 0;
    var segs = rows.slice();
    var last = segs[segs.length - 1];
    var y = last.date.getUTCFullYear() + 1;
    var rate = last.rate;
    while (untilDate && Date.UTC(y, 0, 1) <= untilDate.getTime()) {
      rate = rate * (1 + raise / 100);
      segs.push({ date: new Date(Date.UTC(y, 0, 1)), rate: rate, projected: true });
      y += 1;
    }
    return { segs: segs, raise: raise, at: function (d) {
      var r = segs[0].rate;
      for (var i = 0; i < segs.length; i++) if (segs[i].date <= d) r = segs[i].rate;
      return r;
    } };
  }

  function windowAverage(rf, endExclusive) {
    var start = addMonths(endExclusive, -36);
    var total = 0, days = daysBetween(start, endExclusive);
    var points = [start].concat(rf.segs.map(function (s) { return s.date; }).filter(function (d) { return d > start && d < endExclusive; })).concat([endExclusive]);
    for (var i = 0; i < points.length - 1; i++) total += rf.at(points[i]) * daysBetween(points[i], points[i + 1]);
    return total / days;
  }

  function high3(inp, sepDate) {
    var p = inp.pay;
    if (p.high3Mode === 'direct') {
      var v = num(p.high3Direct);
      if (!v) return { ok: false, reason: 'High-3 not entered.' };
      return { ok: true, value: v, method: 'direct', steps: ['High-3 entered directly: ' + money(v) + '. It is held at this figure for every candidate date.'], estimate: true, label: 'user-entered' };
    }
    var end = addDays(sepDate, 1);
    var rf = rateFunction(inp, sepDate);
    if (!rf) return { ok: false, reason: 'No salary entered.' };
    var first = rf.segs[0].date;
    var steps = [];
    var extended = first > addMonths(end, -36);
    var candidates = [end];
    rf.segs.forEach(function (s) {
      var a = s.date, b = addMonths(s.date, 36);
      if (a <= end && a >= addMonths(first, 36)) candidates.push(a);
      if (b <= end && b >= addMonths(first, 36)) candidates.push(b);
    });
    var best = null, bestEnd = null;
    candidates.forEach(function (c) {
      var avg = windowAverage(rf, c);
      if (best === null || avg > best + 0.005) { best = avg; bestEnd = c; }
    });
    var anyProjected = rf.segs.some(function (s) { return s.projected && s.date <= sepDate; });
    steps.push('Time weighted average of the rates of basic pay in effect over three consecutive years, each rate weighted by the days it was in effect.');
    steps.push('Highest three year window: ' + longDate(addMonths(bestEnd, -36)) + ' through ' + longDate(addDays(bestEnd, -1)) + ', average ' + money(best) + '.');
    if (extended) steps.push('The salary history starts less than three years before separation, so the earliest rate entered is assumed to have applied before it.');
    if (anyProjected) steps.push('Includes an assumed January pay adjustment of ' + rf.raise + ' percent a year after the last rate entered.');
    return { ok: true, value: best, method: 'history', steps: steps, estimate: extended || anyProjected, label: (extended || anyProjected) ? 'ESTIMATE' : 'from salary history', finalRate: rf.at(sepDate) };
  }

  function finalBasicPay(inp, sepDate) {
    var rf = rateFunction(inp, sepDate);
    if (!rf) return null;
    return rf.at(sepDate);
  }

  /* ------------------------------------------------------------------ */
  /* Eligibility.                                                         */
  /* ------------------------------------------------------------------ */

  var PATHS = {
    age62_5: { key: 'age62_5', label: 'Age 62 with 5 years', reduced: false, supplement: false },
    age60_20: { key: 'age60_20', label: 'Age 60 with 20 years', reduced: false, supplement: true },
    mra30: { key: 'mra30', label: 'MRA with 30 years', reduced: false, supplement: true },
    mra10: { key: 'mra10', label: 'MRA with 10 years (MRA+10)', reduced: true, supplement: false },
    deferred: { key: 'deferred', label: 'Deferred (separated before eligibility)', reduced: false, supplement: false },
    none: { key: 'none', label: 'No annuity (under 5 years of civilian service)', reduced: false, supplement: false }
  };

  function keyAges(inp) {
    var dob = parse(inp.person.dob);
    if (!dob) return null;
    var by = dob.getUTCFullYear();
    var mra = R.mra(by);
    var fra = R.fra(by);
    var age65 = attains(dob, 65);
    // Medicare starts the first day of the month of the 65th birthday, or the month before when the birthday is the 1st.
    var medicare = dob.getUTCDate() === 1 ? firstOfMonth(addMonths(age65, -1)) : firstOfMonth(age65);
    return {
      dob: dob, mra: mra, mraDate: attains(dob, mra[0], mra[1]),
      age50: attains(dob, 50), age55: attains(dob, 55), age595: attains(dob, 59, 6), age60: attains(dob, 60),
      age62: attains(dob, 62), age65: age65, medicareStart: medicare, fra: fra, fraDate: attains(dob, fra[0], fra[1]), age70: attains(dob, 70),
      rmdAge: by >= 1960 ? 75 : (by >= 1951 && by <= 1958 ? 73 : (by === 1959 ? 73 : 72)),
      rmdNote: by === 1959 ? 'Treasury proposed age 73 for the 1959 cohort in July 2024 and has not finalized it. Plan on 73 and confirm.' : ''
    };
  }

  // civSCD: every FERS annuity needs 5 years of creditable civilian service (5 U.S.C. 8410).
  function pathAt(ages, eligSCD, sepDate, civSCD) {
    var years = serviceThrough(eligSCD, sepDate).months / 12;
    if (serviceThrough(civSCD || eligSCD, sepDate).months < 60) return PATHS.none;
    if (sepDate >= ages.age62 && years >= 5) return PATHS.age62_5;
    if (sepDate >= ages.age60 && years >= 20) return PATHS.age60_20;
    if (sepDate >= ages.mraDate && years >= 30) return PATHS.mra30;
    if (sepDate >= ages.mraDate && years >= 10) return PATHS.mra10;
    if (years >= 5) return PATHS.deferred;
    return PATHS.none;
  }

  /* ------------------------------------------------------------------ */
  /* Leave projection.                                                    */
  /* ------------------------------------------------------------------ */

  function payPeriodsBetween(a, b) { return b > a ? Math.floor(daysBetween(a, b) / 14) : 0; }

  function sickHoursAt(inp, sepDate) {
    var l = inp.leave;
    var override = num(l.sickAtSep);
    if (override !== null && l.sickAtSep !== '') return { hours: override, steps: ['Balance at separation entered directly: ' + override + ' hours.'], estimate: true };
    var h = num(l.sickHours);
    if (h === null) return { hours: null, steps: ['Sick leave balance not entered.'] };
    if (!parse(l.sickAsOf)) return { hours: h, steps: [h + ' hours entered with no as-of date, so it is treated as the balance at separation with nothing added.'], estimate: true };
    var asOf = parse(l.sickAsOf);
    var pp = payPeriodsBetween(asOf, sepDate);
    var use = num(l.sickUsePerYear) || 0;
    var years = Math.max(0, daysBetween(asOf, sepDate) / 365.25);
    var add = pp * R.sickLeave.accrualHoursPerPayPeriod;
    var hours = Math.max(0, h + add - use * years);
    var steps = [h + ' hours on ' + longDate(asOf) + '.'];
    if (pp) steps.push('Plus ' + pp + ' pay periods to separation at 4 hours each: ' + add + ' hours.');
    if (use && pp) steps.push('Less an expected ' + use + ' hours a year used: ' + Math.round(use * years) + ' hours.');
    steps.push('Projected balance at separation: ' + Math.round(hours) + ' hours.');
    return { hours: Math.round(hours), steps: steps, estimate: pp > 0 };
  }

  function annualLeaveAt(inp, sepDate) {
    var l = inp.leave;
    var override = num(l.annualAtSep);
    if (override !== null && l.annualAtSep !== '') return { hours: override, steps: ['Balance at separation entered directly: ' + override + ' hours.'], estimate: true };
    var h = num(l.annualHours);
    if (h === null) return { hours: null, steps: ['Annual leave balance not entered.'] };
    var asOf = parse(l.annualAsOf) || sepDate;
    var acc = num(l.annualAccrual) || 0;
    var use = num(l.annualUsePerYear) || 0;
    var ceiling = num(l.annualCeiling) || R.annualLeave.ceilingHours;
    var steps = [h + ' hours on ' + longDate(asOf) + '.'];
    var bal = h, cursor = asOf, ppSoFar = 0;
    var y = asOf.getUTCFullYear();
    while (true) {
      var yearEnd = new Date(Date.UTC(y + 1, 0, 1));
      var segEnd = sepDate < yearEnd ? addDays(sepDate, 1) : yearEnd;
      var ppTotal = payPeriodsBetween(asOf, segEnd);
      var pp = Math.max(0, ppTotal - ppSoFar);
      ppSoFar = ppTotal;
      var frac = Math.max(0, daysBetween(cursor, segEnd)) / 365.25;
      bal = Math.max(0, bal + pp * acc - use * frac);
      if (segEnd < yearEnd || +segEnd === +addDays(sepDate, 1)) break;
      if (bal > ceiling) { steps.push('End of ' + y + ': ' + Math.round(bal) + ' hours, cut to the ' + ceiling + ' hour carryover ceiling.'); bal = ceiling; }
      cursor = yearEnd; y += 1;
      if (y > sepDate.getUTCFullYear() + 1) break;
    }
    if (!acc) steps.push('No accrual rate entered, so no accrual is projected.');
    else steps.push('Accruing ' + acc + ' hours a pay period' + (use ? ', less ' + use + ' hours a year used' : '') + ', with the leave year treated as the calendar year.');
    steps.push('Projected balance at separation: ' + Math.round(bal) + ' hours. Leave accrued in the final leave year above the ceiling is still payable.');
    return { hours: Math.round(bal), steps: steps, estimate: true };
  }

  /* ------------------------------------------------------------------ */
  /* One separation date, fully priced.                                   */
  /* ------------------------------------------------------------------ */

  function scenario(inp, sepISO, opts) {
    opts = opts || {};
    var out = { ok: false, sepISO: sepISO, problems: [], notes: [], steps: [] };
    var ages = keyAges(inp);
    var sep = parse(sepISO);
    if (!ages) { out.problems.push('Date of birth not entered.'); return out; }
    if (!sep) { out.problems.push('Separation date not entered.'); return out; }
    var sm = serviceModel(inp, opts);
    if (!sm.ok) { out.problems = out.problems.concat(sm.notes); return out; }
    out.ok = true;
    out.sep = sep; out.ages = ages; out.service = sm;

    var path = pathAt(ages, sm.eligSCD, sep, sm.civSCD);
    out.path = path;
    var eligService = serviceThrough(sm.eligSCD, sep);
    out.eligService = { y: eligService.y, m: eligService.m, d: eligService.d };
    var civAtSep = serviceThrough(sm.civSCD, sep);
    out.civilianEligService = { y: civAtSep.y, m: civAtSep.m, d: civAtSep.d };
    var ageSep = ageOn(ages.dob, sep);
    out.ageAtSep = ageSep;

    // Annuity commencing date. A deferred annuity starts on the first day of the
    // month after the age and service requirements are met (5 U.S.C. 8464(a)(1)(A)(ii)).
    var postponed = false, commencing;
    if (path.key === 'deferred') {
      var yrs = eligService.months / 12;
      var startAge = yrs >= 30 ? ages.mraDate : (yrs >= 20 ? ages.age60 : ages.age62);
      commencing = maxDate(firstOfNextMonth(startAge), firstOfNextMonth(sep));
      out.deferredStart = yrs >= 30 ? 'mra30' : (yrs >= 20 ? 'age60' : 'age62');
      out.notes.push('Deferred annuity modeled from the earliest date it carries no age reduction: ' + (yrs >= 30 ? 'the MRA, with 30 or more years' : (yrs >= 20 ? 'age 60, with 20 or more years' : 'age 62')) + '. ' + (yrs >= 10 && yrs < 30 ? 'With 10 or more years it can instead start as early as the first day of the month after the MRA, reduced 5/12 of 1 percent for each month under 62. ' : '') + 'A deferred annuity carries no sick leave credit and no supplement, and a deferred annuitant can never re-enroll in FEHB, FEGLI or FEDVIP.');
    } else if (path.key === 'none') {
      commencing = null;
    } else {
      commencing = firstOfNextMonth(sep);
      var pp = parse(inp.dates.postponeTo || '');
      if (opts.postponeTo !== undefined) pp = parse(opts.postponeTo || '');
      if (path.key === 'mra10' && pp && pp > commencing) {
        commencing = pp.getUTCDate() === 1 ? pp : firstOfNextMonth(pp);
        postponed = true;
      }
    }
    out.commencing = commencing; out.postponed = postponed;
    out.monthEnd = isLastOfMonth(sep);
    if (!out.monthEnd && commencing && !postponed && path.key !== 'deferred') {
      out.notes.push('Separating on ' + longDate(sep) + ' starts the annuity ' + longDate(commencing) + '. Separating on ' + longDate(lastOfMonth(sep)) + ' starts it on the same date with ' + daysBetween(sep, lastOfMonth(sep)) + ' more days of pay. Separating on ' + longDate(addDays(firstOfMonth(sep), -1)) + ' would start it a month sooner.');
    }

    // Computation service.
    var comp = { y: eligService.y, m: eligService.m, d: eligService.d };
    if (toDays(sm.refund) > 0 && !sm.refundRedeposit) comp = subSvc(comp, sm.refund);
    out.compService = comp;
    // The supplement counts civilian service only: military service comes out whether
    // a planned deposit adds it or it is already inside the SCD.
    var civilian = (sm.militaryIncluded || sm.militaryCredited) ? subSvc(comp, sm.military) : comp;
    out.civilianService = civilian;

    // Sick leave credit.
    var sick = { y: 0, m: 0, d: 0, hours: 0, steps: [path.key === 'none' ? 'No annuity is payable, so there is no sick leave credit.' : 'No sick leave credit on a deferred annuity.'] };
    var sickProj = { hours: null, steps: [] };
    if (path.key !== 'deferred' && path.key !== 'none') {
      sickProj = sickHoursAt(inp, sep);
      sick = sickLeaveCredit(sickProj.hours);
    }
    out.sickProjection = sickProj; out.sick = sick;
    var combinedRaw = addSvc(comp, sick);
    var combined = { y: combinedRaw.y, m: combinedRaw.m, d: 0 };
    out.combinedService = combined; out.combinedDroppedDays = combinedRaw.d;

    // High-3 and the multiplier.
    var h3 = high3(inp, sep);
    out.high3 = h3;
    var mult = R.multiplier.standard;
    var enhanced = ageSep.y >= R.multiplier.enhancedAge && svcYears(combined) >= R.multiplier.enhancedYears;
    if (path.key === 'deferred') enhanced = false;
    if (enhanced) mult = R.multiplier.enhanced;
    out.multiplier = mult; out.enhanced = enhanced;

    // The annual leave lump sum is paid at any separation, priced or not.
    var al = annualLeaveAt(inp, sep);
    var finalRate = finalBasicPay(inp, sep);
    out.annualLeave = al;
    out.finalBasicPay = finalRate;
    if (al.hours !== null && finalRate) {
      var hourly = finalRate / R.hoursPerWorkYear;
      out.lumpSum = al.hours * hourly;
      out.hourlyRate = hourly;
      var workdays = al.hours / 8, calendarDays = Math.ceil(workdays * 7 / 5);
      out.lumpSumCrossesJanuary = addDays(sep, calendarDays).getUTCFullYear() > sep.getUTCFullYear();
    }

    if (!h3.ok || !commencing) {
      if (!h3.ok) out.problems.push(h3.reason);
      out.priced = false;
      return finishInsurance(inp, out);
    }
    out.priced = true;
    var years = svcYears(combined);
    var basic = mult * h3.value * years * sm.partTime;
    out.basicAnnual = basic;
    out.steps.push('Service for the computation: ' + svcText(comp) + ' of creditable service' + (sick.y || sick.m || sick.d ? ' plus ' + svcText(sick) + ' of sick leave credit = ' + svcText(combinedRaw) + ', leftover days dropped' : '') + ' = ' + svcText(combined) + ' = ' + years.toFixed(4) + ' years.');
    out.steps.push('Multiplier: ' + (mult * 100).toFixed(1) + ' percent' + (enhanced ? ', because the separation is at age 62 or older with at least 20 years including sick leave credit (BAL 18-103).' : '.'));
    out.steps.push('Basic annuity: ' + (mult * 100).toFixed(1) + '% x ' + money(h3.value) + ' x ' + years.toFixed(4) + (sm.partTime < 1 ? ' x part time factor ' + sm.partTime : '') + ' = ' + money(basic) + ' a year = ' + money(basic / 12) + ' a month.');

    // Age reduction.
    var redMonths = 0, redPct = 0;
    if (path.key === 'mra10') {
      var mra20 = svcYears(eligService) >= 20 && commencing >= ages.age60;
      if (commencing < ages.age62 && !mra20) {
        redMonths = fullMonths(commencing, ages.age62);
        redPct = redMonths * 5 / 12;
      }
      if (mra20) out.steps.push('No age reduction: MRA+10 with at least 20 years, and the annuity commences at or after age 60 (the MRA+20 rule).');
    }
    out.reductionMonths = redMonths; out.reductionPct = redPct;
    var afterAge = basic * (1 - redPct / 100);
    out.afterAgeAnnual = afterAge;
    if (redPct) out.steps.push('Age reduction: ' + redMonths + ' full months under 62 on ' + longDate(commencing) + ' x 5/12 of 1 percent = ' + redPct.toFixed(3) + ' percent, permanent. ' + money(basic / 12) + ' x (1 - ' + (redPct / 100).toFixed(5) + ') = ' + money(afterAge / 12) + ' a month.');

    // Survivor election. The base is the annuity after the age reduction (Handbook Chapter 50, 50B3.1-3D.4).
    var elect = opts.survivor || inp.survivor.election || 'full';
    if (inp.person.married !== 'yes' && !opts.survivor) elect = 'none';
    var sv = R.survivor[elect] || R.survivor.none;
    var survRed = afterAge * sv.reduction;
    out.survivorElection = elect;
    out.survivorReductionAnnual = survRed;
    out.survivorBenefitAnnual = afterAge * sv.benefit;
    out.netAnnual = afterAge - survRed;
    out.netMonthly = out.netAnnual / 12;
    if (sv.reduction) out.steps.push('Survivor election (' + elect + '): ' + (sv.reduction * 100) + ' percent of ' + money(afterAge) + ' = ' + money(survRed) + ' a year. Annuity after the election: ' + money(out.netAnnual) + ' a year = ' + money(out.netMonthly) + ' a month.');
    else out.steps.push('No survivor reduction modeled' + (inp.person.married === 'yes' ? '. Electing less than the maximum needs the spouse’s notarized consent.' : (inp.person.married ? '.' : ', because whether you are married is not answered. If you are, the full election costs 10 percent.')));
    out.grossMonthlyBeforeSurvivor = afterAge / 12;

    // Sick leave as money: the annuity with the credit less the annuity without it.
    // Without it the multiplier can fall back to 1.0 percent (BAL 18-103).
    var sickMonthsKept = (combined.y * 12 + combined.m) - (comp.y * 12 + comp.m);
    out.sickLeaveMonthsKept = sickMonthsKept;
    var multNoSick = (path.key !== 'deferred' && ageSep.y >= R.multiplier.enhancedAge && svcYears(comp) >= R.multiplier.enhancedYears) ? R.multiplier.enhanced : R.multiplier.standard;
    var withoutSick = multNoSick * h3.value * svcYears(comp) * sm.partTime * (1 - redPct / 100);
    out.sickLeaveAnnualValue = afterAge - withoutSick;
    out.sickLeaveRaisesMultiplier = multNoSick !== mult;

    // Supplement.
    out.supplement = supplementFor(inp, out);

    // The agency estimate check.
    var est = num(inp.pay.agencyEstimateMonthly), estSep = inp.pay.agencyEstimateSep;
    if (est && estSep && estSep === sepISO) {
      out.agencyEstimate = est;
      var gross = out.netMonthly;
      out.agencyVariancePct = (gross - est) / est * 100;
    }
    return finishInsurance(inp, out);
  }

  function supplementFor(inp, sc) {
    var r = { eligible: false, reason: '', monthly: 0, netMonthly: 0, steps: [] };
    var ages = sc.ages;
    if (!sc.path.supplement || sc.postponed) {
      r.reason = sc.postponed ? 'A postponed MRA+10 annuity does not carry the supplement.' : (sc.path.key === 'age62_5' ? 'Separation at 62 or older: the supplement ends at 62, so none is payable.' : 'The supplement is payable only on an immediate unreduced annuity (MRA with 30 years, or age 60 with 20 years). This path is ' + sc.path.label + '.');
      return r;
    }
    r.end = supplementEnd(ages);
    if (sc.commencing >= ages.age62 || sc.commencing > r.end) { r.reason = 'The annuity commences at or after age 62, when the supplement would already have ended.'; return r; }
    r.eligible = true;
    r.schedule = [];
    r.at = function (d) {
      for (var i = 0; i < r.schedule.length; i++) if (d >= r.schedule[i].start && d <= r.schedule[i].end) return r.schedule[i].monthly;
      return 0;
    };
    var ss62 = num(inp.ss.ss62);
    var civYears = sc.civilianService.y + sc.civilianService.m / 12 + sc.civilianService.d / 360;
    var rounded = Math.min(40, Math.round(civYears));
    r.civilianYears = civYears; r.roundedYears = rounded;
    var months = [];
    for (var mth = firstOfMonth(sc.commencing); mth <= r.end; mth = addMonths(mth, 1)) months.push(mth);
    r.payments = months.length;
    if (!ss62) { r.blocked = 'Zero future earnings Social Security estimate at age 62 not entered.'; r.steps.push(r.blocked); return r; }
    r.monthly = ss62 * rounded / 40;
    r.netMonthly = r.monthly;
    r.steps.push('FERS civilian service: ' + svcText(sc.civilianService) + ', rounded to the nearest whole year: ' + rounded + '. Military service is not counted even when the deposit is paid, and sick leave is not counted.');
    r.steps.push('Supplement: ' + money(ss62) + ' x ' + rounded + ' / 40 = ' + money(r.monthly) + ' a month.');
    r.steps.push('Paid from ' + longDate(sc.commencing) + ' to ' + longDate(r.end) + ', ' + r.payments + ' payments, with no cost of living adjustment ever.' + (ages.age62.getUTCDate() <= 2 ? ' A birthday on the 1st or 2nd ends it a month early: Social Security treats you as 62 for the whole birthday month.' : ''));

    // The earnings test, 5 U.S.C. 8421a. Only earnings in months the supplement is
    // paid count. Half the excess over the exempt amount, capped at that year's
    // supplement, is spread over the supplement months from the next July through
    // the June after, never more in a month than the supplement itself.
    var earn = num(inp.ss.postRetEarnings) || 0;
    var exempt = R.supplement.earningsTestExempt;
    r.earnings = earn; r.exempt = exempt; r.reductions = []; r.totalReduction = 0;
    var cut = {}, byYear = {};
    months.forEach(function (d) { var y = d.getUTCFullYear(); byYear[y] = (byYear[y] || 0) + 1; });
    if (earn) {
      r.steps.push('Earnings test: planned wages of ' + money(earn, false) + ' a year, counted only for the months the supplement is paid, against the ' + R.supplement.earningsTestYear + ' exempt amount of ' + money(exempt, false) + ' (held at that figure for every year; it rises each year).');
      Object.keys(byYear).forEach(function (ys) {
        var y = +ys, n = byYear[y];
        var earned = earn * n / 12;
        var excess = Math.min(Math.max(0, earned - exempt) * R.supplement.reductionPerDollarOver, r.monthly * n);
        var line = y + ': ' + n + ' month' + (n > 1 ? 's' : '') + ' paid, earnings ' + money(earned, false);
        if (!excess) { r.steps.push(line + ', under the exempt amount: no reduction.'); return; }
        var from = new Date(Date.UTC(y + 1, 6, 1)), to = new Date(Date.UTC(y + 2, 6, 1));
        var win = months.filter(function (d) { return d >= from && d < to; });
        if (!win.length) { r.steps.push(line + '. Half the excess, ' + money(excess) + ', would come off from July ' + (y + 1) + ', but the supplement has ended by then: no reduction.'); return; }
        var per = excess / win.length, applied = 0;
        win.forEach(function (d) { var c = Math.min(per, r.monthly - (cut[+d] || 0)); cut[+d] = (cut[+d] || 0) + c; applied += c; });
        r.totalReduction += applied;
        r.reductions.push({ year: y, earned: earned, excess: excess, from: win[0], to: lastOfMonth(win[win.length - 1]), months: win.length, applied: applied });
        r.steps.push(line + '. Half the excess, capped at that year’s supplement: ' + money(excess) + ', spread over ' + win.length + ' supplement month' + (win.length > 1 ? 's' : '') + ' from ' + longDate(win[0]) + ': ' + money(Math.min(per, r.monthly)) + ' a month' + (per > r.monthly ? ' (the whole supplement; the rest cannot be taken)' : '') + '.');
      });
      if (r.totalReduction) r.steps.push('Total taken by the earnings test: ' + money(r.totalReduction) + '.');
    } else r.steps.push('No post-retirement wages entered, so the earnings test takes nothing.');
    months.forEach(function (d) {
      var amt = round2(r.monthly - (cut[+d] || 0));
      var last = r.schedule[r.schedule.length - 1];
      if (last && Math.abs(last.monthly - amt) < 0.005) last.end = lastOfMonth(d);
      else r.schedule.push({ start: d, end: lastOfMonth(d), monthly: amt });
    });
    return r;
  }

  // Handbook Chapter 51, section 51A1.1-3 E. An age is attained the day before the
  // birthday. The supplement is payable through the earlier of the last day of the
  // month the retiree becomes 62 and the last day of the month before the first month
  // of Social Security entitlement, the first month the retiree is 62 throughout.
  function supplementEnd(ages) {
    var attained = addDays(ages.age62, -1);
    var end1 = lastOfMonth(attained);
    var firstSS = attained.getUTCDate() === 1 ? attained : firstOfNextMonth(attained);
    var end2 = addDays(firstSS, -1);
    return end1 < end2 ? end1 : end2;
  }

  // Social Security is counted from the first month the person is the claiming age
  // throughout, an age being attained the day before the birthday. At 62 this is the
  // first month of entitlement; at later ages SSA can start a month earlier.
  function ssStartDate(inp, ages) {
    var y = num(inp.ss.claimAgeY), m = num(inp.ss.claimAgeM) || 0;
    if (!y || !ages) return null;
    var attained = addDays(attains(ages.dob, y, m), -1);
    return attained.getUTCDate() === 1 ? attained : firstOfNextMonth(attained);
  }

  /* ------------------------------------------------------------------ */
  /* Insurance.                                                           */
  /* ------------------------------------------------------------------ */

  function fiveYear(startISO, sep) {
    var start = parse(startISO);
    if (!start) return { status: 'unknown', text: 'Start date not entered.' };
    var passDate = addDays(addMonths(start, 60), -1);
    var ok = passDate <= sep;
    return { status: ok ? 'pass' : 'fail', passDate: passDate, text: ok ? 'Met: five continuous years by ' + longDate(passDate) + '.' : 'Not met until ' + longDate(passDate) + ', after this separation date.' };
  }

  function finishInsurance(inp, sc) {
    var ins = inp.insurance;
    var r = { notes: [] };
    var p = sc.path ? sc.path.key : 'none';
    r.track = p === 'deferred' ? 'deferred' : (sc.postponed ? 'postponed' : (p === 'none' ? 'none' : 'immediate'));
    r.fehb = fiveYear(ins.fehbStart, sc.sep);
    r.fegliBasic = fiveYear(ins.fegliBasicStart, sc.sep);
    r.fegliA = ins.fegliAStart ? fiveYear(ins.fegliAStart, sc.sep) : null;
    r.fegliB = ins.fegliBStart ? fiveYear(ins.fegliBStart, sc.sep) : null;
    r.fegliC = ins.fegliCStart ? fiveYear(ins.fegliCStart, sc.sep) : null;
    if (r.track === 'deferred') {
      r.summary = 'Deferred path. FEHB, FEGLI and FEDVIP end at separation and can never be re-enrolled. This is permanent.';
      r.severity = 'high';
    } else if (r.track === 'postponed') {
      r.summary = 'Postponed path. FEHB and FEGLI end at separation; Temporary Continuation of Coverage is available for up to 18 months at 102 percent of the full premium; FEHB and FEGLI can be re-enrolled when the postponed annuity begins, provided the five year rules were met at separation.';
      r.severity = 'medium';
    } else if (r.track === 'immediate') {
      r.summary = 'Immediate annuity. FEHB and FEGLI continue into retirement where each five year rule is met.';
      r.severity = r.fehb.status === 'fail' || r.fegliBasic.status === 'fail' ? 'high' : 'low';
    } else {
      r.summary = 'No annuity is payable, so no insurance continues.';
      r.severity = 'high';
    }
    // Pre-65 window. On the deferred path FEHB is gone for good, so there is no FEHB
    // premium to cost: the window runs from separation and must be covered privately.
    if (r.track === 'deferred' && sc.ages && sc.sep) {
      r.noFehb = true;
      r.pre65Start = firstOfNextMonth(sc.sep);
      r.pre65Months = fullMonths(r.pre65Start, sc.ages.medicareStart);
      r.medicareStart = sc.ages.medicareStart;
    } else if (sc.commencing && sc.ages) {
      var startCover = sc.commencing;
      r.pre65Months = fullMonths(startCover, sc.ages.medicareStart);
      r.medicareStart = sc.ages.medicareStart;
      var prem = num(ins.fehbPremium), vip = num(ins.fedvipPremium) || 0;
      var mi = num(ins.medInflation);
      if (prem && r.pre65Months > 0) {
        var total = 0, cursor = startCover, k = 0, m = prem + vip;
        var startYear = startCover.getUTCFullYear();
        while (cursor < sc.ages.medicareStart) {
          var yi = cursor.getUTCFullYear() - startYear;
          total += m * Math.pow(1 + (mi || 0) / 100, yi);
          cursor = addMonths(cursor, 1); k++;
        }
        r.pre65Cost = total;
        r.pre65Monthly = m;
        r.pre65Inflation = mi || 0;
      }
    }
    sc.insurance = r;
    return sc;
  }

  function fegliOptions(inp, sc) {
    var pay = sc && sc.finalBasicPay ? sc.finalBasicPay : num(inp.pay.currentBasic);
    if (!pay) return { ok: false, reason: 'Current annual basic pay not entered.' };
    var bia = Math.ceil(pay / R.fegli.biaRoundTo) * R.fegli.biaRoundTo + R.fegli.biaAdd;
    var rows = ['75', '50', 'none'].map(function (k) {
      var rt = R.fegli.rates[k];
      var months = rt.reducePerMonth ? Math.ceil((1 - rt.floor) / rt.reducePerMonth) : 0;
      return {
        key: k, label: rt.label,
        pre65Monthly: bia / 1000 * rt.pre65,
        post65Monthly: bia / 1000 * rt.post65,
        finalCoverage: bia * rt.floor,
        monthsToFloor: months
      };
    });
    return { ok: true, bia: bia, pay: pay, rows: rows, steps: ['Basic Insurance Amount: annual basic pay of ' + money(pay, false) + ' rounded up to the next $1,000, plus $2,000 = ' + money(bia, false) + '.'] };
  }

  /* ------------------------------------------------------------------ */
  /* The eligibility date table.                                          */
  /* ------------------------------------------------------------------ */

  function eligibilityDates(inp, opts) {
    var ages = keyAges(inp);
    var sm = serviceModel(inp, opts);
    if (!ages || !sm.ok) return { ok: false, missing: (!ages ? ['date of birth'] : []).concat(sm.ok ? [] : ['retirement SCD']) };
    var e = sm.eligSCD;
    // Five years of civilian service is a floor under every path (5 U.S.C. 8410).
    var svc5 = dateServiceReaches(sm.civSCD, 5), svc10 = dateServiceReaches(e, 10), svc20 = dateServiceReaches(e, 20), svc30 = dateServiceReaches(e, 30);
    var dates = {
      mra10: maxDate(ages.mraDate, svc10, svc5),
      mra30: maxDate(ages.mraDate, svc30, svc5),
      age60_20: maxDate(ages.age60, svc20, svc5),
      age62_5: maxDate(ages.age62, svc5)
    };
    var earliestImmediate = minDate(dates.mra10, dates.mra30, dates.age60_20, dates.age62_5);
    var immKey = Object.keys(dates).filter(function (k) { return +dates[k] === +earliestImmediate; })[0];
    var earliestUnreduced = minDate(dates.mra30, dates.age60_20, dates.age62_5);
    var unrKey = ['mra30', 'age60_20', 'age62_5'].filter(function (k) { return +dates[k] === +earliestUnreduced; })[0];
    // 1.1 percent: age 62 or older at separation with 20 years including sick leave.
    var enh = null, probe = ages.age62;
    for (var i = 0; i < 12 * 20; i++) {
      // The birthday itself, then each month end from the birthday month on.
      var sepTry = i === 0 ? probe : lastOfMonth(addMonths(probe, i - 1));
      var comp = serviceThrough(e, sepTry);
      var c = { y: comp.y, m: comp.m, d: comp.d };
      if (toDays(sm.refund) > 0 && !sm.refundRedeposit) c = subSvc(c, sm.refund);
      var sl = sickLeaveCredit(sickHoursAt(inp, sepTry).hours);
      var tot = addSvc(c, sl);
      if (tot.y >= 20 && sepTry >= svc5) { enh = sepTry; break; }
    }
    function pack(d, key) {
      if (!d) return null;
      var sep = lastOfMonth(d);
      return { date: d, key: key, label: key ? PATHS[key].label : '', sep: sep, commencing: firstOfNextMonth(sep), serviceAt: serviceThrough(e, d) };
    }
    return {
      ok: true, ages: ages, service: sm,
      svc5: svc5, svc10: svc10, svc20: svc20, svc30: svc30,
      paths: dates,
      mraDate: ages.mraDate,
      earliestImmediate: pack(earliestImmediate, immKey),
      earliestUnreduced: pack(earliestUnreduced, unrKey),
      enhanced: enh ? pack(enh, null) : null
    };
  }

  /* ------------------------------------------------------------------ */
  /* Candidate dates side by side.                                        */
  /* ------------------------------------------------------------------ */

  function candidates(inp) {
    var ed = eligibilityDates(inp);
    if (!ed.ok) return [];
    var list = [];
    function add(label, iso, opts, why) {
      if (!iso) return;
      var same = list.filter(function (x) { return x.sepISO === iso && JSON.stringify(x.opts || {}) === JSON.stringify(opts || {}); })[0];
      if (same) { same.label += ' and ' + label.charAt(0).toLowerCase() + label.slice(1); return; }
      var sc = scenario(inp, iso, opts);
      sc.label = label; sc.why = why; sc.opts = opts;
      list.push(sc);
    }
    if (inp.dates.preferredSep) add('Preferred date', inp.dates.preferredSep, null, 'Your stated date');
    if (ed.earliestImmediate) add('Earliest immediate annuity', iso(ed.earliestImmediate.sep), null, ed.earliestImmediate.label);
    if (ed.earliestUnreduced) add('Earliest unreduced', iso(ed.earliestUnreduced.sep), null, ed.earliestUnreduced.label);
    if (ed.enhanced) add('1.1 percent multiplier', iso(lastOfMonth(ed.enhanced.date)), null, 'Age 62 with 20 years');
    if (ed.service.militaryAvailable && !ed.service.militaryIncluded) {
      var withMil = eligibilityDates(inp, { forceMilitary: true });
      if (withMil.ok && withMil.earliestUnreduced) add('Earliest unreduced, with military deposit paid', iso(withMil.earliestUnreduced.sep), { forceMilitary: true }, withMil.earliestUnreduced.label + ', if the deposit is paid before separation');
    }
    if (ed.service.militaryAvailable && ed.service.militaryIncluded) {
      var noMil = eligibilityDates(inp, { forceMilitary: false });
      if (noMil.ok && noMil.earliestUnreduced) add('Earliest unreduced, if the military deposit is not paid', iso(noMil.earliestUnreduced.sep), { forceMilitary: false }, noMil.earliestUnreduced.label + ', without the deposit');
    }
    list.sort(function (a, b) { return (a.sep || 0) - (b.sep || 0); });
    return list;
  }

  /* The scenario the plan is written around: the preferred date if one was
     given, otherwise the earliest unreduced date. */
  function planScenario(inp) {
    if (inp.dates.preferredSep && parse(inp.dates.preferredSep)) {
      var s = scenario(inp, inp.dates.preferredSep); s.label = 'Preferred date'; return s;
    }
    var ed = eligibilityDates(inp);
    if (ed.ok && ed.earliestUnreduced) { var r = scenario(inp, iso(ed.earliestUnreduced.sep)); r.label = 'Earliest unreduced'; return r; }
    return { ok: false, problems: ['Enter a date of birth and a retirement SCD to build the plan.'] };
  }

  /* ------------------------------------------------------------------ */
  /* Social Security at a claiming age.                                   */
  /* ------------------------------------------------------------------ */

  function ssAtAge(inp, years, months) {
    var ages = keyAges(inp);
    var pia = num(inp.ss.ssFra);
    years = +years; months = +months || 0;
    if (!ages || !years) return { ok: false };
    var key = years * 12 + months;
    var fraM = ages.fra[0] * 12 + ages.fra[1];
    if (key === 62 * 12 && num(inp.ss.ss62)) return { ok: true, monthly: num(inp.ss.ss62), how: 'Your zero future earnings estimate at 62.' };
    if (key === fraM && pia) return { ok: true, monthly: pia, how: 'Your zero future earnings estimate at full retirement age.' };
    if (key === 70 * 12 && num(inp.ss.ss70)) return { ok: true, monthly: num(inp.ss.ss70), how: 'Your zero future earnings estimate at 70.' };
    if (!pia) return { ok: false };
    var early = fraM - key, factor;
    if (early > 0) {
      factor = 1 - (Math.min(36, early) * 5 / 9 + Math.max(0, early - 36) * 5 / 12) / 100;
    } else {
      var late = Math.min(70 * 12, key) - fraM;
      factor = 1 + late * (2 / 3) / 100;
    }
    return { ok: true, monthly: pia * factor, estimate: true, how: 'Full retirement age estimate of ' + money(pia) + ' x ' + factor.toFixed(4) + ' for claiming ' + (early > 0 ? early + ' months early' : (-early) + ' months late') + '. [ESTIMATE]' };
  }

  /* ------------------------------------------------------------------ */
  /* Income against spending.                                             */
  /* ------------------------------------------------------------------ */

  function incomePlan(inp, sc) {
    var m = inp.money;
    var out = { ok: false, periods: [], problems: [] };
    if (!sc || !sc.ok || !sc.priced) { out.problems.push('The annuity could not be priced yet.'); return out; }
    var spend = num(m.spendRetired);
    var portfolio = ['tspTrad', 'tspRoth', 'iraTrad', 'iraRoth', 'taxable', 'cash'].reduce(function (a, k) { return a + (num(m[k]) || 0); }, 0);
    out.portfolio = portfolio;
    // The plan runs from the month after separation. On a postponed or deferred
    // path nothing is paid until the annuity commences, and those months count.
    var start = firstOfNextMonth(sc.sep);
    out.start = start;
    var other = num(m.otherIncome) || 0;
    var otherStart = parse(m.otherIncomeStart) || start;
    var claimY = num(inp.ss.claimAgeY), claimM = num(inp.ss.claimAgeM) || 0;
    var ss = claimY ? ssAtAge(inp, claimY, claimM) : { ok: false };
    var ages = sc.ages;
    var claimDate = claimY ? attains(ages.dob, claimY, claimM) : null;
    out.ss = ss; out.claimDate = claimDate;
    out.ssStart = ssStartDate(inp, ages);
    var sup = sc.supplement;
    var boundaries = [start, sc.commencing];
    if (sup.eligible) (sup.schedule || []).forEach(function (seg) { boundaries.push(seg.start); boundaries.push(addDays(seg.end, 1)); });
    if (ss.ok && out.ssStart) boundaries.push(out.ssStart);
    if (other) boundaries.push(otherStart);
    boundaries = boundaries.filter(function (d) { return d && d >= start; })
      .filter(function (d, i, a) { return a.findIndex(function (x) { return +x === +d; }) === i; }).sort(function (a, b) { return a - b; });
    boundaries.forEach(function (b, i) {
      var end = boundaries[i + 1] || null;
      var inc = {
        annuity: b >= sc.commencing ? sc.netMonthly : 0,
        supplement: sup.eligible && sup.at ? sup.at(b) : 0,
        ss: (ss.ok && out.ssStart && b >= out.ssStart) ? ss.monthly : 0,
        other: (other && b >= otherStart) ? other : 0
      };
      var total = inc.annuity + inc.supplement + inc.ss + inc.other;
      var gap = spend !== null ? spend - total : null;
      out.periods.push({ start: b, end: end, income: inc, total: total, gap: gap, annualGap: gap !== null ? gap * 12 : null, rate: (gap !== null && portfolio) ? Math.max(0, gap * 12) / portfolio * 100 : null });
    });
    if (sc.commencing > start) out.problems.push('Nothing is paid from ' + longDate(start) + ' until the annuity commences on ' + longDate(sc.commencing) + '; savings carry those months.');
    // A missing income line would make the verdict look worse than it is, so it blocks the verdict.
    out.missing = [];
    if (sup.eligible && sup.blocked) out.missing.push('the zero future earnings Social Security estimate at 62, which sets the supplement');
    if (!claimY) out.missing.push('a Social Security claiming age');
    else if (!ss.ok) out.missing.push('the zero future earnings Social Security estimate for the claiming age');
    if (spend === null) { out.problems.push('Retirement monthly spending (the RETIRED lens) not entered.'); return out; }
    if (!portfolio) out.problems.push('No savings balances entered, so no withdrawal rate can be computed.');
    if (out.missing.length) out.problems.push('Missing: ' + out.missing.join('; ') + '. Those months show no income from it, so no verdict is given.');
    var worst = out.periods.reduce(function (a, p) { return (p.rate !== null && (a === null || p.rate > a.rate)) ? p : a; }, null);
    out.worst = worst;
    out.ok = true;
    var flag = R.withdrawalRateFlag;
    if (worst && worst.rate !== null && !out.missing.length) {
      if (worst.rate <= flag) out.verdict = 'on track';
      else if (worst.rate <= flag + 1) out.verdict = 'tight';
      else out.verdict = 'short';
      var allowed = portfolio * flag / 100 / 12;
      out.monthlyShortfallAtFlag = Math.max(0, worst.gap - allowed);
      out.monthlyRoomAtFlag = Math.max(0, allowed - Math.max(0, worst.gap));
    }
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Survivor election analysis.                                          */
  /* ------------------------------------------------------------------ */

  function survivorAnalysis(inp, sc) {
    if (!sc || !sc.priced) return { ok: false };
    var ages = sc.ages;
    var lr = num(inp.survivor.longevityRetiree) || num(inp.assumptions.longevity);
    var ls = num(inp.survivor.longevitySpouse);
    var spouseDob = parse(inp.person.spouseDob);
    var base = sc.afterAgeAnnual;
    var rows = ['full', 'partial', 'none'].map(function (k) {
      var sv = R.survivor[k];
      var row = { key: k, reductionAnnual: base * sv.reduction, benefitAnnual: base * sv.benefit, netMonthly: (base - base * sv.reduction) / 12 };
      if (lr) {
        var death = attains(ages.dob, lr);
        var yearsPaid = Math.max(0, daysBetween(sc.commencing, death) / 365.25);
        row.lifetimeCost = row.reductionAnnual * yearsPaid;
        row.yearsPaid = yearsPaid;
        if (spouseDob && ls) {
          var spouseEnd = attains(spouseDob, ls);
          var survYears = Math.max(0, daysBetween(death, spouseEnd) / 365.25);
          row.survivorYears = survYears;
          row.survivorValue = row.benefitAnnual * survYears;
        }
        if (row.benefitAnnual) row.breakEvenYears = row.lifetimeCost / row.benefitAnnual;
      }
      return row;
    });
    return { ok: true, base: base, rows: rows, longevityRetiree: lr, longevitySpouse: ls, married: inp.person.married === 'yes' };
  }

  /* ------------------------------------------------------------------ */
  /* The Boldin Entry Sheet.                                              */
  /* ------------------------------------------------------------------ */

  function boldinRows(inp, sc, income) {
    var rows = [];
    var today = new Date();
    var unknown = 'unknown, read it off the screen first';
    function add(r) { r.status = r.status || 'NOT STARTED'; r.replaces = r.replaces || unknown; rows.push(r); }
    function blocked(r, doc) { r.status = 'BLOCKED'; r.enter = 'Not available: ' + doc; r.unblock = doc; add(r); }
    var sepTxt = sc && sc.sep ? iso(sc.sep) : '';
    var nameA = 'FERS Annuity pre-62, ' + sepTxt;
    var nameB = 'FERS Annuity 62 forward, ' + sepTxt;
    var priced = sc && sc.ok && sc.priced;
    var ages = sc && sc.ages;
    // An annuity that starts at or after 62 has no pre-62 stretch: one pension entry, COLA from the start.
    var pre62 = !(priced && ages && sc.commencing >= ages.age62);
    var dc = num(inp.assumptions.dietCola);
    var hasDc = dc !== null && inp.assumptions.dietCola !== '';
    function colaB() {
      if (hasDc) add({ screen: 'Income', sub: 'Pensions', item: nameB, field: 'Annual COLA rate', enter: dc + '% [ESTIMATE: diet COLA assumption]', source: 'user-stated assumption; 5 U.S.C. 8462(b)' });
      else blocked({ screen: 'Income', sub: 'Pensions', item: nameB, field: 'Annual COLA rate', source: 'Assumptions step' }, 'a diet COLA assumption on the Assumptions step');
    }
    var startWhy = sc && sc.path && sc.path.key === 'deferred' ? ' (deferred annuity start)' : (sc && sc.postponed ? ' (postponed annuity start)' : ' (first day of the month after separation)');

    if (pre62) add({ screen: 'Income', sub: 'Pensions', item: nameA, field: 'Annual COLA rate', enter: '0%', source: 'Defect Class 1, docs/05; 5 U.S.C. 8462(c)(3)', structural: false });
    else colaB();
    add({ screen: 'Money Flows', sub: 'Withdrawal strategy', item: 'Plan', field: 'Strategy', enter: 'Based on spending needs', source: 'Defect Class 3, docs/05', structural: true, why: 'Changes every withdrawal, tax and growth figure downstream.' });
    if (priced) add({ screen: 'Income', sub: 'Pensions', item: pre62 ? nameA : nameB, field: 'Start age or date', enter: longDate(sc.commencing) + startWhy, source: 'Defect Class 2, docs/05; 5 U.S.C. 8464' });
    else blocked({ screen: 'Income', sub: 'Pensions', item: nameA, field: 'Start age or date', source: 'Planner Dates tab' }, 'date of birth, retirement SCD and a separation date');

    if (priced && sc.supplement.eligible && !sc.supplement.blocked) {
      var red = sc.supplement.totalReduction;
      add({ screen: 'Income', sub: 'Pensions', item: 'FERS Supplement, ends at 62', field: 'Monthly pre-tax income', enter: money(sc.supplement.monthly) + ' monthly', source: 'Planner Supplement tab; Handbook Chapter 51', note: red ? 'The earnings test takes ' + money(red) + ' in total from ' + longDate(sc.supplement.reductions[0].from) + '. This field holds one amount, so that reduction is not in it; the Planner Income tab carries it.' : '' });
      add({ screen: 'Income', sub: 'Pensions', item: 'FERS Supplement, ends at 62', field: 'Start age or date', enter: longDate(sc.commencing), source: 'Planner Supplement tab' });
      add({ screen: 'Income', sub: 'Pensions', item: 'FERS Supplement, ends at 62', field: 'End age', enter: '62 (payments end ' + longDate(sc.supplement.end) + ')', source: 'Defect Class 4d, docs/05; Handbook Chapter 51' });
      add({ screen: 'Income', sub: 'Pensions', item: 'FERS Supplement, ends at 62', field: 'Annual COLA rate', enter: '0%', source: 'Defect Class 4c, docs/05; Handbook Chapter 51' });
    } else if (priced && sc.supplement.eligible) {
      blocked({ screen: 'Income', sub: 'Pensions', item: 'FERS Supplement, ends at 62', field: 'Monthly pre-tax income', source: 'Planner Supplement tab' }, 'the SSA zero future earnings estimate at 62');
    } else if (priced) {
      add({ screen: 'Income', sub: 'Pensions', item: 'FERS Supplement', field: 'Entry', enter: 'No entry. Delete any supplement pension. Not payable on this path (' + sc.path.label + ')', source: 'Defect Class 4a, docs/05' });
    }

    if (priced) {
      var h3Tag = sc.high3.estimate ? ' [ESTIMATE: high-3 ' + sc.high3.label + ']' : '';
      if (pre62) {
        add({ screen: 'Income', sub: 'Pensions', item: nameA, field: 'Monthly pre-tax income', enter: money(sc.netMonthly) + ' monthly', source: 'Planner Annuity tab' + h3Tag, note: 'The survivor reduction is already inside this figure.' });
        add({ screen: 'Income', sub: 'Pensions', item: nameA, field: 'End age', enter: 'The month before the 62nd birthday (' + longDate(addDays(firstOfMonth(ages.age62), -1)) + ')', source: 'docs/07 section 2.4' });
        add({ screen: 'Income', sub: 'Pensions', item: nameB, field: 'Monthly pre-tax income', enter: money(sc.netMonthly) + ' monthly (no adjustment before 62)', source: 'Planner Annuity tab; 5 U.S.C. 8462(c)(3)' });
        add({ screen: 'Income', sub: 'Pensions', item: nameB, field: 'Start age', enter: '62', source: 'docs/07 section 2.4' });
        colaB();
      } else {
        add({ screen: 'Income', sub: 'Pensions', item: nameB, field: 'Monthly pre-tax income', enter: money(sc.netMonthly) + ' monthly', source: 'Planner Annuity tab' + h3Tag, note: 'The annuity starts at or after 62, so there is no pre-62 entry. The survivor reduction is already inside this figure.' });
        add({ screen: 'Income', sub: 'Pensions', item: 'FERS Annuity pre-62', field: 'Entry', enter: 'No entry. Delete any pre-62 FERS pension: nothing is paid before 62 on this date', source: 'Planner Annuity tab' });
      }
      var svLabel = { full: 'Full, 50 percent', partial: 'Partial, 25 percent', none: 'None' }[sc.survivorElection];
      add({ screen: 'Income', sub: 'Pensions', item: pre62 ? nameA + ' and ' + nameB : nameB, field: 'Survivor benefit', enter: svLabel, source: 'Planner Survivor tab', structural: true, why: 'The survivor election is irreversible after the 30 day window and the amount fields already carry its reduction.' });
    }

    var pia = num(inp.ss.ssFra);
    if (pia) add({ screen: 'Income', sub: 'Social Security', item: 'Social Security', field: 'Primary Insurance Amount', enter: money(pia) + ' monthly at full retirement age (zero future earnings estimate)', source: 'SSA zero future earnings estimate' + (inp.ss.estimateDate ? ' ' + inp.ss.estimateDate : '') + '; Defect Class 5' });
    else blocked({ screen: 'Income', sub: 'Social Security', item: 'Social Security', field: 'Primary Insurance Amount', source: 'Social Security step' }, 'the SSA zero future earnings estimate at full retirement age');
    if (num(inp.ss.claimAgeY)) add({ screen: 'Income', sub: 'Social Security', item: 'Social Security', field: 'Claiming age', enter: inp.ss.claimAgeY + (num(inp.ss.claimAgeM) ? ' and ' + inp.ss.claimAgeM + ' months' : ''), source: 'user-stated' });
    add({ screen: 'Income', sub: 'Social Security', item: 'Social Security', field: 'Benefit entry method', enter: 'Manual entry (turn off the automatic estimate)', source: 'docs/07 section 2.4' });

    if (priced) {
      add({ screen: 'Summary', sub: 'Retirement age', item: 'Plan', field: 'Retirement age', enter: sc.ageAtSep.y + ' years ' + sc.ageAtSep.m + ' months (separation ' + longDate(sc.sep) + ')', source: 'Planner Dates tab', structural: true, why: 'Moves every age-triggered event in the plan.' });
      add({ screen: 'Income', sub: 'Work', item: 'Salary', field: 'Work stop date', enter: longDate(sc.sep), source: 'Planner Dates tab' });
      add({ screen: 'Money Flows', sub: 'Recurring contributions', item: 'TSP contributions', field: 'End date', enter: longDate(sc.sep), source: 'Defect Class 12, docs/05' });
      if (sc.lumpSum) add({ screen: 'Income', sub: 'Windfalls', item: 'Annual leave lump sum', field: 'Amount', enter: money(sc.lumpSum, false) + ' gross [ESTIMATE]', source: 'Planner Leave tab', note: 'Ordinary wage income. It cannot be deferred into the TSP.' });
      else blocked({ screen: 'Income', sub: 'Windfalls', item: 'Annual leave lump sum', field: 'Amount', source: 'Leave step' }, 'the annual leave balance and current basic pay');
      if (sc.lumpSum) add({ screen: 'Income', sub: 'Windfalls', item: 'Annual leave lump sum', field: 'Date', enter: longDate(sc.lumpSumCrossesJanuary ? new Date(Date.UTC(sc.sep.getUTCFullYear() + 1, 0, 15)) : sc.sep).replace(/^\d+ /, '') + (sc.lumpSumCrossesJanuary ? ' (the projection crosses into January)' : ''), source: 'Planner Leave tab' });
    }

    var tt = num(inp.money.tspTrad), tr = num(inp.money.tspRoth);
    var asOf = inp.money.balancesAsOf ? ' as of ' + inp.money.balancesAsOf : '';
    if (tt !== null) add({ screen: 'Assets and Debts', sub: 'Savings', item: 'TSP Traditional', field: 'Current balance', enter: money(tt, false) + asOf, source: 'TSP statement' + asOf + '; Defect Class 11' });
    else blocked({ screen: 'Assets and Debts', sub: 'Savings', item: 'TSP Traditional', field: 'Current balance', source: 'Money step' }, 'the TSP statement');
    if (tr !== null) add({ screen: 'Assets and Debts', sub: 'Savings', item: 'TSP Roth', field: 'Current balance', enter: money(tr, false) + asOf, source: 'TSP statement' + asOf + '; Defect Class 11', note: 'A separate account from TSP Traditional.' });
    var rr = num(inp.assumptions.returnPct);
    if (rr !== null && inp.assumptions.returnPct !== '') add({ screen: 'Assets and Debts', sub: 'Savings', item: 'TSP Traditional and TSP Roth', field: 'Rate of return', enter: rr + '% [ESTIMATE: match the actual fund allocation]', source: 'user-stated assumption; docs/07 section 2.2' });

    var fp = num(inp.insurance.fehbPremium);
    if (fp) add({ screen: 'Expenses and Healthcare', sub: 'Medical expenses before 65', item: 'FEHB annuitant premium', field: 'Monthly amount', enter: money(fp) + ' monthly, post tax' + (num(inp.insurance.fedvipPremium) ? ' plus FEDVIP ' + money(num(inp.insurance.fedvipPremium)) + ' monthly' : ''), source: 'FEHB annuitant premium table; Defect Class 6' });
    else blocked({ screen: 'Expenses and Healthcare', sub: 'Medical expenses before 65', item: 'FEHB annuitant premium', field: 'Monthly amount', source: 'Insurance step' }, 'the FEHB annuitant premium for the plan and enrollment code');
    var sr = num(inp.money.spendRetired);
    if (sr !== null) add({ screen: 'Expenses and Healthcare', sub: 'Recurring expenses', item: 'Retired years spending', field: 'Monthly amount', enter: money(sr, false) + ' monthly (RETIRED lens)', source: 'user-stated RETIRED lens; Defect Class 10' });
    else blocked({ screen: 'Expenses and Healthcare', sub: 'Recurring expenses', item: 'Retired years spending', field: 'Monthly amount', source: 'Money step' }, 'twelve months of transaction exports for the RETIRED lens');
    var mi = num(inp.insurance.medInflation), gi = num(inp.assumptions.inflation);
    if (gi !== null && inp.assumptions.inflation !== '') add({ screen: 'Rate Assumptions', sub: 'General inflation', item: 'Plan', field: 'Rate', enter: gi + '% [ESTIMATE]', source: 'user-stated assumption' });
    if (mi !== null && inp.insurance.medInflation !== '') add({ screen: 'Rate Assumptions', sub: 'Medical inflation', item: 'Plan', field: 'Rate', enter: mi + '% [ESTIMATE]', source: 'user-stated assumption' });
    var lg = num(inp.assumptions.longevity);
    if (lg) add({ screen: 'Summary', sub: 'Longevity age', item: 'Plan', field: 'Longevity age', enter: String(lg), source: 'user-stated assumption' });
    // The sheet has no notes column, so a row's note rides in its Source cell.
    rows.forEach(function (r, i) { r.n = i + 1; if (r.note) r.source += '. ' + r.note; });
    return rows;
  }

  return {
    rules: R,
    parse: parse, iso: iso, longDate: longDate, addDays: addDays, addMonths: addMonths, lastOfMonth: lastOfMonth,
    firstOfNextMonth: firstOfNextMonth, isLastOfMonth: isLastOfMonth, diff: diff, ageOn: ageOn, attains: attains,
    serviceThrough: serviceThrough, dateServiceReaches: dateServiceReaches, fullMonths: fullMonths,
    svc: svc, addSvc: addSvc, subSvc: subSvc, svcText: svcText, svcYears: svcYears, toDays: toDays,
    money: money, pct: pct, num: num, round2: round2,
    blankInputs: blankInputs, upgrade: upgrade,
    chartHours: chartHours, formulaHours: formulaHours, sickLeaveCredit: sickLeaveCredit,
    serviceModel: serviceModel, high3: high3, keyAges: keyAges, pathAt: pathAt, PATHS: PATHS,
    sickHoursAt: sickHoursAt, annualLeaveAt: annualLeaveAt,
    scenario: scenario, eligibilityDates: eligibilityDates, candidates: candidates, planScenario: planScenario,
    ssAtAge: ssAtAge, incomePlan: incomePlan, survivorAnalysis: survivorAnalysis, fegliOptions: fegliOptions,
    boldinRows: boldinRows
  };
});
