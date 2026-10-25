// Engine tests. Run with: node --test tests/engine.test.mjs
// Fixtures come from OPM's own worked examples (RI 83-8, Handbook Chapter 50),
// the corrected rule set in docs/06, and Part 10 of the user guide.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const E = require('../app/js/engine.js');
const R = require('../app/js/rules.js');
const SAMPLE = require('../app/js/sample.js');
const P = require('../app/js/plan.js');

const near = (a, b, tol = 0.01, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg || ''} expected ${b}, got ${a}`);
const iso = E.iso;

function dana(over) {
  const inp = E.upgrade(JSON.parse(JSON.stringify(SAMPLE)));
  for (const [path, v] of Object.entries(over || {})) {
    const [a, b] = path.split('.');
    inp[a][b] = v;
  }
  return inp;
}

test('MRA table matches OPM', () => {
  assert.deepEqual(R.mra(1947), [55, 0]);
  assert.deepEqual(R.mra(1948), [55, 2]);
  assert.deepEqual(R.mra(1952), [55, 10]);
  assert.deepEqual(R.mra(1953), [56, 0]);
  assert.deepEqual(R.mra(1964), [56, 0]);
  assert.deepEqual(R.mra(1965), [56, 2]);
  assert.deepEqual(R.mra(1969), [56, 10]);
  assert.deepEqual(R.mra(1970), [57, 0]);
  assert.deepEqual(R.mra(1985), [57, 0]);
});

test('Full retirement age table', () => {
  assert.deepEqual(R.fra(1954), [66, 0]);
  assert.deepEqual(R.fra(1955), [66, 2]);
  assert.deepEqual(R.fra(1959), [66, 10]);
  assert.deepEqual(R.fra(1960), [67, 0]);
});

test('Sick leave chart reproduces OPM examples', () => {
  const c = (h) => { const r = E.sickLeaveCredit(h); return [r.y, r.m, r.d]; };
  assert.deepEqual(c(835), [0, 4, 24]);   // RI 83-8
  assert.deepEqual(c(441), [0, 2, 16]);   // RI 83-8 and USGS
  assert.deepEqual(c(1452), [0, 8, 11]);  // RI 83-8: between figures, next higher (1455)
  assert.deepEqual(c(2000), [0, 11, 15]); // Handbook Chapter 50
  assert.deepEqual(c(2087), [1, 0, 0]);
  assert.deepEqual(c(2090), [1, 0, 1]);
  assert.deepEqual(c(0), [0, 0, 0]);
  // The day 1 row printed in RI 83-8.
  const row = [6, 180, 354, 528, 702, 875, 1049, 1223, 1397, 1571, 1745, 1919];
  row.forEach((h, m) => assert.equal(E.chartHours(m, 1), h, `month ${m} day 1`));
});

test('The copied chart rises cell by cell and stays within about an hour of the 2,087 hour basis', () => {
  let prev = -1;
  for (let n = 0; n < 360; n++) {
    const m = Math.floor(n / 30), d = n % 30;
    const h = E.chartHours(m, d);
    assert.ok(h > prev, `chart rises at month ${m} day ${d}`);
    assert.ok(Math.abs(h - E.formulaHours(m, d)) < 1.1, `month ${m} day ${d}: ${h} against ${E.formulaHours(m, d).toFixed(2)}`);
    prev = h;
  }
});

test('Sick leave days are added before leftover days are dropped', () => {
  // docs/06 and the validation report: 29y 7m 18d plus 441 hours reaches 29y 10m.
  const total = E.addSvc(E.svc(29, 7, 18), E.svc(0, 2, 16));
  assert.equal(total.y, 29); assert.equal(total.m, 10);
});

test('Service is counted inclusive of both days', () => {
  const scd = E.parse('2003-08-01');
  const s1 = E.serviceThrough(scd, E.parse('2029-04-30'));
  assert.deepEqual([s1.y, s1.m, s1.d], [25, 9, 0]);
  const s2 = E.serviceThrough(scd, E.parse('2032-04-30'));
  assert.deepEqual([s2.y, s2.m, s2.d], [28, 9, 0]);
  const s3 = E.serviceThrough(scd, E.parse('2033-07-31'));
  assert.deepEqual([s3.y, s3.m, s3.d], [30, 0, 0]);
  assert.equal(iso(E.dateServiceReaches(scd, 30)), '2033-07-31');
});

test('Part 10: the four eligibility dates without the deposit', () => {
  const ed = E.eligibilityDates(dana({ 'service.militaryStatus': 'no' }));
  assert.equal(iso(ed.mraDate), '2029-04-15');
  assert.equal(ed.earliestImmediate.key, 'mra10');
  assert.equal(iso(ed.earliestImmediate.sep), '2029-04-30');
  assert.equal(ed.earliestUnreduced.key, 'age60_20');
  assert.equal(iso(ed.earliestUnreduced.date), '2032-04-15');
  assert.equal(iso(ed.earliestUnreduced.sep), '2032-04-30');
  assert.equal(iso(ed.enhanced.date), '2034-04-15');
});

test('Part 10: the believed date prices at $1,841.85 with no supplement', () => {
  const sc = E.scenario(dana({ 'service.militaryStatus': 'no', 'pay.high3Direct': '112000', 'leave.sickAtSep': '1000' }), '2029-04-30');
  assert.equal(sc.path.key, 'mra10');
  assert.equal(iso(sc.commencing), '2029-05-01');
  assert.deepEqual([sc.combinedService.y, sc.combinedService.m], [26, 2]);
  near(sc.basicAnnual, 29306.67, 0.01);
  assert.equal(sc.reductionMonths, 59);
  near(sc.reductionPct, 24.583, 0.001);
  // The guide rounds the reduction to 24.583 percent and prints $1,841.85; unrounded it is $1,841.84.
  near(sc.netMonthly, 1841.85, 0.015);
  assert.equal(sc.supplement.eligible, false);
});

test('Part 10: the earliest unreduced date prices at $2,886.00 plus $1,486.25', () => {
  const inp = dana({ 'service.militaryStatus': 'no', 'pay.high3Direct': '118400', 'leave.sickAtSep': '1200', 'ss.ss62': '2050' });
  const sc = E.scenario(inp, '2032-04-30');
  assert.equal(sc.path.key, 'age60_20');
  assert.equal(sc.reductionPct, 0);
  near(sc.netMonthly, 2886.00);
  assert.equal(sc.supplement.eligible, true);
  assert.equal(sc.supplement.roundedYears, 29);
  near(sc.supplement.monthly, 1486.25);
  near(sc.netMonthly + sc.supplement.netMonthly, 4372.25);
});

test('Part 10: the military deposit date prices at $2,912.75 plus $1,287.00', () => {
  const sc = E.scenario(dana(), '2029-08-31');
  assert.equal(sc.path.key, 'mra30');
  assert.deepEqual([sc.eligService.y, sc.eligService.m], [30, 1]);
  assert.deepEqual([sc.civilianService.y, sc.civilianService.m], [26, 1]);
  near(sc.netMonthly, 2912.75);
  assert.equal(sc.supplement.roundedYears, 26);
  near(sc.supplement.monthly, 1287.00);
  near(sc.netMonthly + sc.supplement.netMonthly, 4199.75);
  // Five months of sick leave credit is worth $477.50 a year.
  assert.equal(sc.sickLeaveMonthsKept, 5);
  near(sc.sickLeaveAnnualValue, 477.50);
  // The pre-65 window: September 2029 through March 2037.
  assert.equal(sc.insurance.pre65Months, 91);
  assert.equal(iso(sc.insurance.medicareStart), '2037-04-01');
});

test('Part 10: the gap and the withdrawal rate', () => {
  const inp = dana();
  const sc = E.scenario(inp, '2029-08-31');
  const ip = E.incomePlan(inp, sc);
  assert.equal(ip.portfolio, 640000);
  near(ip.periods[0].gap, 1315.25);
  near(ip.periods[0].annualGap, 15783.00);
  near(ip.periods[0].rate, 2.466, 0.001);
  // The guide judges the bridge years only. The planner judges the worst period:
  // from the end of the supplement at 62 to the Social Security claim at 67.
  assert.equal(iso(ip.worst.start), '2034-05-01');
  near(ip.worst.gap, 5515 - 2912.75);
  assert.equal(ip.verdict, 'tight');
});

test('The deposit moves the earliest unreduced date four years earlier', () => {
  const ed = E.eligibilityDates(dana());
  assert.equal(ed.earliestUnreduced.key, 'mra30');
  assert.equal(iso(ed.earliestUnreduced.date), '2029-07-31');
});

test('Sick leave can reach the 20 years for 1.1 percent (BAL 18-103)', () => {
  // Age 62 at separation, 19 years 8 months of service, 1,000 hours = 5 months 23 days.
  const inp = E.blankInputs();
  inp.person.dob = '1964-06-10';
  inp.service.scdRetirement = '2006-10-11';
  inp.pay.high3Mode = 'direct'; inp.pay.high3Direct = '100000';
  inp.leave.sickAtSep = '1000';
  const sc = E.scenario(inp, '2026-06-10');
  assert.deepEqual([sc.compService.y, sc.compService.m], [19, 8]);
  assert.equal(sc.combinedService.y, 20);
  assert.equal(sc.multiplier, 0.011);
  const noSick = E.scenario(Object.assign(E.upgrade(inp), { leave: Object.assign({}, inp.leave, { sickAtSep: '0' }) }), '2026-06-10');
  assert.equal(noSick.multiplier, 0.01);
});

test('MRA+10 reduction is months under 62 at the commencing date, and the survivor base is after the age reduction', () => {
  const inp = dana({ 'service.militaryStatus': 'no', 'pay.high3Direct': '112000', 'leave.sickAtSep': '1000', 'person.married': 'yes' });
  const sc = E.scenario(inp, '2029-04-30');
  near(sc.survivorReductionAnnual, sc.afterAgeAnnual * 0.10);
  near(sc.survivorBenefitAnnual, sc.afterAgeAnnual * 0.50);
  assert.ok(sc.netAnnual < sc.afterAgeAnnual);
});

test('A postponed MRA+10 annuity starting at or after 60 with 20 years takes no reduction', () => {
  const inp = dana({ 'service.militaryStatus': 'no', 'dates.postponeTo': '2032-05-01' });
  const sc = E.scenario(inp, '2029-04-30');
  assert.equal(sc.path.key, 'mra10');
  assert.equal(sc.postponed, true);
  assert.equal(sc.reductionPct, 0);
  assert.equal(sc.supplement.eligible, false);
  assert.equal(sc.insurance.track, 'postponed');
});

test('Separating before the MRA forces the deferred path and loses insurance', () => {
  const sc = E.scenario(dana({ 'service.militaryStatus': 'no' }), '2027-12-31');
  assert.equal(sc.path.key, 'deferred');
  assert.equal(sc.insurance.track, 'deferred');
  assert.equal(sc.sick.y + sc.sick.m + sc.sick.d, 0);
  assert.equal(sc.supplement.eligible, false);
});

test('Supplement earnings test follows 5 U.S.C. 8421a: supplement months only, from the next July, capped', () => {
  // Supplement of $1,486.25 from 1 May 2032 to 30 April 2034, wages of $40,000 a year.
  const inp = dana({ 'service.militaryStatus': 'no', 'pay.high3Direct': '118400', 'leave.sickAtSep': '1200', 'ss.ss62': '2050', 'ss.postRetEarnings': '40000' });
  const s = E.scenario(inp, '2032-04-30').supplement;
  near(s.monthly, 1486.25);
  // 2032: 8 months paid, $26,666.67 earned, half the excess = $1,093.33, spread over the
  // 10 supplement months from July 2033 to April 2034. 2033's excess would start in July 2034,
  // after the supplement has ended. 2034: 4 months, under the exempt amount.
  assert.equal(s.reductions.length, 1);
  near(s.reductions[0].excess, (40000 * 8 / 12 - 24480) / 2);
  assert.equal(iso(s.reductions[0].from), '2033-07-01');
  assert.equal(s.reductions[0].months, 10);
  near(s.totalReduction, (40000 * 8 / 12 - 24480) / 2);
  assert.equal(s.schedule.length, 2);
  assert.equal(iso(s.schedule[0].end), '2033-06-30');
  near(s.schedule[0].monthly, 1486.25);
  near(s.schedule[1].monthly, 1486.25 - 109.33);
  // A large wage hits the cap: no more than the supplement paid in the year of the earnings.
  const big = E.scenario(dana({ 'service.militaryStatus': 'no', 'pay.high3Direct': '118400', 'ss.ss62': '2050', 'ss.postRetEarnings': '200000' }), '2032-04-30').supplement;
  near(big.totalReduction, 1486.25 * 8);
  near(big.schedule[1].monthly, 1486.25 - 1486.25 * 8 / 10);
  // The income plan carries the reduced months.
  const ip = E.incomePlan(inp, E.scenario(inp, '2032-04-30'));
  assert.ok(ip.periods.some((p) => iso(p.start) === '2033-07-01' && Math.abs(p.income.supplement - (1486.25 - 109.33)) < 0.01));
});

test('Earnings test cap reproduces Handbook Chapter 51 (Liza: three $500 payments cap the next reduction at $1,500)', () => {
  const inp = E.blankInputs();
  inp.person.dob = '1969-03-20'; inp.person.married = 'no';
  inp.service.scdRetirement = '1996-10-01';
  inp.pay.high3Direct = '100000';
  inp.ss.ss62 = String(500 * 40 / 30);
  inp.ss.postRetEarnings = '1000000';
  const sc = E.scenario(inp, '2026-09-30');
  assert.equal(sc.path.key, 'mra30');
  near(sc.supplement.monthly, 500);
  const first = sc.supplement.reductions[0];
  assert.equal(first.year, 2026);
  near(first.applied, 1500);
  assert.equal(iso(first.from), '2027-07-01');
});

test('The supplement ends a month early for a birthday on the 1st or 2nd (Handbook Chapter 51, 51A1.1-3 E)', () => {
  const end = (dob) => {
    const inp = E.blankInputs();
    inp.person.dob = dob; inp.person.married = 'no';
    inp.service.scdRetirement = '1997-01-01';
    inp.pay.high3Direct = '100000'; inp.ss.ss62 = '2000';
    return iso(E.scenario(inp, '2027-06-30').supplement.end);
  };
  assert.equal(end('1970-06-01'), '2032-05-31'); // Mary: becomes 62 on 31 May
  assert.equal(end('1970-06-02'), '2032-05-31'); // Sam: Social Security from 1 June
  assert.equal(end('1970-06-15'), '2032-06-30');
  // No month pays both the supplement and Social Security claimed at 62.
  const inp = E.blankInputs();
  inp.person.dob = '1970-06-02'; inp.person.married = 'no';
  inp.service.scdRetirement = '1997-01-01';
  inp.pay.high3Direct = '100000'; inp.ss.ss62 = '2000'; inp.ss.ssFra = '2800'; inp.ss.claimAgeY = '62';
  inp.money.spendRetired = '6000'; inp.money.tspTrad = '500000';
  const ip = E.incomePlan(inp, E.scenario(inp, '2027-06-30'));
  assert.equal(iso(ip.ssStart), '2032-06-01');
  assert.ok(ip.periods.every((p) => !(p.income.supplement > 0 && p.income.ss > 0)));
});

test('Military service already in the SCD stays out of the supplement numerator', () => {
  const inp = E.blankInputs();
  inp.person.dob = '1970-03-10'; inp.person.married = 'no';
  inp.service.scdRetirement = '1996-05-01';
  inp.service.militaryY = '4'; inp.service.militaryStatus = 'credited';
  inp.pay.high3Direct = '100000'; inp.ss.ss62 = '2000';
  const sc = E.scenario(inp, '2027-04-30');
  assert.equal(sc.path.key, 'mra30');
  assert.equal(sc.supplement.roundedYears, 27);
  near(sc.supplement.monthly, 1350);
});

test('Every annuity needs 5 years of civilian service (5 U.S.C. 8410)', () => {
  const inp = E.blankInputs();
  inp.person.dob = '1960-01-15'; inp.person.married = 'no';
  inp.service.scdRetirement = '2020-01-01';
  inp.service.militaryY = '4'; inp.service.militaryStatus = 'plan';
  inp.pay.high3Direct = '90000';
  // Eight years in all, four of them civilian: nothing is payable.
  const at62 = E.scenario(inp, '2023-12-31');
  assert.equal(at62.path.key, 'none');
  assert.equal(at62.priced, false);
  assert.equal(E.scenario(inp, '2021-12-31').path.key, 'none');
  // Five civilian years arrive on 31 December 2024.
  const ed = E.eligibilityDates(inp);
  assert.equal(iso(ed.paths.age62_5), '2024-12-31');
  assert.equal(E.scenario(inp, '2024-12-31').path.key, 'age62_5');
  // The same holds when the military years are already in the SCD.
  const cr = E.blankInputs();
  cr.person.dob = '1960-01-15'; cr.service.scdRetirement = '2016-01-01';
  cr.service.militaryY = '4'; cr.service.militaryStatus = 'credited'; cr.pay.high3Direct = '90000';
  assert.equal(E.scenario(cr, '2023-12-31').path.key, 'none');
});

test('The plan never throws on a partial interview, and says plainly when no annuity is payable', () => {
  const inp = E.blankInputs();
  inp.person.dob = '1970-09-15'; inp.service.scdRetirement = '2005-01-01';
  const doc = P.document(inp, new Date('2026-10-25T12:00:00Z'));
  assert.ok(doc.sections.length > 10);
  const none = E.blankInputs();
  none.person.dob = '1960-01-15'; none.service.scdRetirement = '2020-01-01';
  none.service.militaryY = '4'; none.service.militaryStatus = 'plan';
  none.pay.high3Direct = '90000'; none.dates.preferredSep = '2023-12-31';
  const d2 = P.document(none, new Date('2026-10-25T12:00:00Z'));
  assert.match(d2.sections[0].blocks[0].text, /No annuity is payable/);
  assert.ok(d2.ctx.open.some((o) => o.impact === 'Stops the plan' && /5 years of creditable civilian service/.test(o.text)));
});

test('The income plan starts at separation: postponed months with no annuity count', () => {
  const inp = dana({ 'service.militaryStatus': 'no', 'dates.postponeTo': '2032-05-01', 'dates.preferredSep': '2029-04-30' });
  const sc = E.scenario(inp, '2029-04-30');
  const ip = E.incomePlan(inp, sc);
  assert.equal(iso(ip.periods[0].start), '2029-05-01');
  assert.equal(ip.periods[0].income.annuity, 0);
  assert.equal(iso(ip.worst.start), '2029-05-01');
  near(ip.worst.rate, 5515 * 12 / 640000 * 100, 0.001);
  assert.equal(ip.verdict, 'short');
});

test('Missing Social Security answers block the verdict instead of reading as zero', () => {
  const inp = dana({ 'ss.ss62': '' });
  const ip = E.incomePlan(inp, E.scenario(inp, '2029-08-31'));
  assert.equal(ip.verdict, undefined);
  assert.ok(ip.missing.length >= 1);
  const inp2 = dana({ 'ss.claimAgeY': '' });
  assert.equal(E.incomePlan(inp2, E.scenario(inp2, '2029-08-31')).verdict, undefined);
});

test('The 1.1 percent date can fall on the month end of the 62nd birthday month', () => {
  const inp = E.blankInputs();
  inp.person.dob = '1965-05-20'; inp.service.scdRetirement = '2007-06-01';
  const ed = E.eligibilityDates(inp);
  assert.equal(iso(ed.enhanced.date), '2027-05-31');
});

test('Sick leave value counts the move to 1.1 percent when it completes the 20 years (BAL 18-103)', () => {
  const inp = E.blankInputs();
  inp.person.dob = '1965-05-20'; inp.person.married = 'no';
  inp.service.scdRetirement = '2007-09-01';
  inp.pay.high3Direct = '95000'; inp.leave.sickAtSep = '1400';
  const sc = E.scenario(inp, '2027-05-31');
  assert.deepEqual([sc.compService.y, sc.compService.m], [19, 9]);
  assert.equal(sc.multiplier, 0.011);
  near(sc.basicAnnual, 0.011 * 95000 * (20 + 5 / 12));
  near(sc.sickLeaveAnnualValue, 0.011 * 95000 * (20 + 5 / 12) - 0.01 * 95000 * 19.75);
  assert.equal(sc.sickLeaveRaisesMultiplier, true);
});

test('A deferred annuity starts on the first unreduced date the service allows, and FEHB is not costed', () => {
  const base = (dob, scd) => { const i = E.blankInputs(); i.person.dob = dob; i.person.married = 'no'; i.service.scdRetirement = scd; i.pay.high3Direct = '90000'; i.insurance.fehbPremium = '400'; i.insurance.fehbStart = scd; return i; };
  // 18 years: age 62, the first day of the month after the birthday.
  const a = E.scenario(base('1972-03-10', '2010-01-01'), '2027-12-31');
  assert.equal(a.path.key, 'deferred');
  assert.equal(iso(a.commencing), '2034-04-01');
  near(a.netMonthly, 0.01 * 90000 * 18 / 12);
  assert.equal(a.insurance.noFehb, true);
  assert.equal(a.insurance.pre65Cost, undefined);
  assert.equal(iso(a.insurance.pre65Start), '2028-01-01');
  // 22 years: age 60, unreduced (OPM Deferred Retirement).
  const b = E.scenario(base('1972-03-10', '2005-04-01'), '2027-12-31');
  assert.equal(iso(b.commencing), '2032-04-01');
  assert.equal(b.reductionPct, 0);
  // Born on the 1st: still the first day of the month after the birthday (5 U.S.C. 8464(a)(1)(A)(ii)).
  assert.equal(iso(E.scenario(base('1972-03-01', '2010-01-01'), '2027-12-31').commencing), '2034-04-01');
});

test('An annuity starting at or after 62 gets one Boldin pension entry, with its COLA', () => {
  const inp = E.blankInputs();
  inp.person.dob = '1965-05-20'; inp.person.married = 'no';
  inp.service.scdRetirement = '2000-01-01'; inp.pay.high3Direct = '90000';
  inp.assumptions.dietCola = '2';
  const sc = E.scenario(inp, '2027-05-31');
  const rows = E.boldinRows(inp, sc, null);
  assert.match(rows[0].item, /62 forward/);
  assert.equal(rows[0].field, 'Annual COLA rate');
  assert.ok(!rows.some((r) => r.field === 'End age' && /pre-62/.test(r.item)));
  assert.ok(rows.some((r) => /No entry/.test(r.enter) && /pre-62/.test(r.item)));
});

test('Unanswered deposit questions leave the service out and raise an open item', () => {
  const inp = E.blankInputs();
  inp.person.dob = '1968-04-12'; inp.person.married = 'no';
  inp.service.scdRetirement = '1997-01-01'; inp.service.pre89Y = '3';
  inp.pay.high3Direct = '100000'; inp.dates.preferredSep = '2024-12-31';
  const sm = E.serviceModel(inp);
  assert.equal(sm.pre89Included, false);
  assert.equal(sm.pre89Unanswered, true);
  const ctx = P.context(inp, new Date('2026-10-25T12:00:00Z'));
  assert.ok(ctx.open.some((o) => /Pre-1989/.test(o.text)));
  const blank = E.blankInputs();
  blank.person.dob = '1968-04-12'; blank.service.scdRetirement = '1997-01-01';
  assert.ok(P.context(blank, new Date('2026-10-25T12:00:00Z')).open.some((o) => /married is not answered/.test(o.text)));
});

test('FEHB five year rule boundary', () => {
  const pass = E.scenario(dana({ 'insurance.fehbStart': '2024-09-01' }), '2029-08-31');
  assert.equal(pass.insurance.fehb.status, 'pass');
  const fail = E.scenario(dana({ 'insurance.fehbStart': '2024-09-02' }), '2029-08-31');
  assert.equal(fail.insurance.fehb.status, 'fail');
});

test('FEGLI Basic Insurance Amount and post-retirement costs', () => {
  const f = E.fegliOptions(dana({ 'pay.currentBasic': '118400', 'pay.currentBasicAsOf': '2029-01-01', 'pay.raisePct': '0' }), null);
  assert.equal(f.bia, 121000);
  near(f.rows[0].pre65Monthly, 121 * 0.3467);
  assert.equal(f.rows[0].post65Monthly, 0);
  near(f.rows[1].post65Monthly, 121 * 0.75);
  assert.equal(f.rows[0].monthsToFloor, 38);
  assert.equal(f.rows[1].monthsToFloor, 50);
});

test('High-3 from salary history is time weighted', () => {
  const inp = dana({ 'pay.high3Mode': 'history', 'pay.currentBasic': '', 'pay.raisePct': '0' });
  inp.pay.history = [{ date: '2025-01-01', rate: '100000' }, { date: '2026-01-01', rate: '103000' }, { date: '2027-01-01', rate: '106000' }];
  const h = E.high3(inp, E.parse('2027-12-31'));
  near(h.value, 103000, 0.5);
  // Half a year at a higher rate weighs half as much.
  inp.pay.history.push({ date: '2027-07-02', rate: '110000' });
  const h2 = E.high3(inp, E.parse('2027-12-31'));
  near(h2.value, (100000 * 365 + 103000 * 365 + 106000 * 182 + 110000 * 183) / 1095, 0.5);
});

test('Social Security reduction and delayed credits', () => {
  const inp = E.blankInputs();
  inp.person.dob = '1970-03-10';
  inp.ss.ssFra = '2000';
  near(E.ssAtAge(inp, 62, 0).monthly, 1400);
  near(E.ssAtAge(inp, 70, 0).monthly, 2480);
  near(E.ssAtAge(inp, 67, 0).monthly, 2000);
});

test('Boldin Entry Sheet leads with the four highest impact rows', () => {
  const inp = dana();
  const sc = E.planScenario(inp);
  const rows = E.boldinRows(inp, sc, E.incomePlan(inp, sc));
  assert.equal(rows[0].field, 'Annual COLA rate'); assert.equal(rows[0].enter, '0%');
  assert.equal(rows[1].field, 'Strategy'); assert.equal(rows[1].enter, 'Based on spending needs');
  assert.equal(rows[2].field, 'Start age or date');
  assert.match(rows[3].item, /Supplement/);
  for (const r of rows) {
    assert.ok(r.source && r.source.length > 3, `row ${r.n} has a source`);
    assert.ok(r.replaces, `row ${r.n} says what it replaces`);
  }
  const mra10 = E.scenario(dana({ 'service.militaryStatus': 'no' }), '2029-04-30');
  const rows2 = E.boldinRows(inp, mra10, null);
  assert.ok(rows2.some((r) => /No entry/.test(r.enter)), 'MRA+10 gets an explicit no-supplement row');
});

test('A mid-month separation is flagged', () => {
  const sc = E.scenario(dana(), '2029-09-02');
  assert.equal(iso(sc.commencing), '2029-10-01');
  assert.ok(sc.notes.some((n) => /a month sooner/.test(n)));
});

test('Missing answers block rather than invent', () => {
  const inp = E.blankInputs();
  const sc = E.scenario(inp, '2030-01-31');
  assert.equal(sc.ok, false);
  inp.person.dob = '1970-01-01'; inp.service.scdRetirement = '2000-01-01';
  const sc2 = E.scenario(inp, '2030-01-31');
  assert.equal(sc2.priced, false);
  const rows = E.boldinRows(inp, sc2, null);
  assert.ok(rows.some((r) => r.status === 'BLOCKED'));
});
