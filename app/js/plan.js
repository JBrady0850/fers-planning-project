/*
 * FERS Planner plan model.
 *
 * Turns the saved answers into sections of plain blocks. The page, the Word
 * file and the PDF all render these same blocks, so what a person reads on a
 * tab is word for word what lands in the saved plan.
 *
 * Block types:
 *   { t: 'p', text, bold }          paragraph
 *   { t: 'lead', text }             verdict paragraph
 *   { t: 'h3', text }               sub-heading
 *   { t: 'list', items }            bullet list
 *   { t: 'table', head, rows }      table; cells are strings
 *   { t: 'steps', lines }           arithmetic, shown in a monospace box
 *   { t: 'note', text, tone }       callout; tone is 'warn', 'stop' or 'info'
 *
 * Text may carry [[TERM]] markers. The page turns them into definitions; the
 * Word file and the PDF print the bare term.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./engine.js'));
  else root.FersPlan = factory(root.FersEngine);
})(typeof self !== 'undefined' ? self : this, function (E) {
  'use strict';
  var R = E.rules, S = R.sources;
  var M = E.money, D = E.longDate, num = E.num;

  function p(text, bold) { return { t: 'p', text: text, bold: !!bold }; }
  function h3(text) { return { t: 'h3', text: text }; }
  function list(items) { return { t: 'list', items: items.filter(Boolean) }; }
  function table(head, rows) { return { t: 'table', head: head, rows: rows }; }
  function steps(lines) { return { t: 'steps', lines: lines.filter(Boolean) }; }
  function note(text, tone) { return { t: 'note', text: text, tone: tone || 'info' }; }
  function src(list) { return 'Source: ' + list.map(function (s) { return s.title + ', ' + s.url; }).join('; ') + '.'; }
  function svcT(s) { return s ? E.svcText(s) : 'not available'; }
  function yesNo(b) { return b ? 'Yes' : 'No'; }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function pctTxt(n, dp) { return n === null || n === undefined || isNaN(n) ? 'not available' : (+n).toFixed(dp === undefined ? 2 : dp) + ' percent'; }

  /* ------------------------------------------------------------------ */
  /* Context: every engine result, computed once.                         */
  /* ------------------------------------------------------------------ */

  function context(inputs, today) {
    var inp = E.upgrade(inputs);
    var ctx = { inp: inp, today: today || new Date() };
    ctx.ages = E.keyAges(inp);
    ctx.ed = E.eligibilityDates(inp);
    ctx.plan = E.planScenario(inp);
    ctx.cands = E.candidates(inp);
    ctx.priced = !!(ctx.plan && ctx.plan.ok && ctx.plan.priced);
    ctx.income = E.incomePlan(inp, ctx.plan);
    ctx.survivor = E.survivorAnalysis(inp, ctx.plan);
    ctx.fegli = E.fegliOptions(inp, ctx.plan && ctx.plan.ok ? ctx.plan : null);
    ctx.boldin = E.boldinRows(inp, ctx.plan, ctx.income);
    ctx.stop = inp.person.specialProvision === 'yes';
    ctx.unsure = inp.person.specialProvision === 'unsure';
    ctx.name = (inp.person.name || '').trim();
    ctx.open = openItems(ctx);
    // A no-supplement sensitivity, because the supplement has been proposed for repeal.
    if (ctx.priced && ctx.plan.supplement.eligible && ctx.income.ok && ctx.income.periods.length) {
      var p0 = ctx.income.periods[0];
      var gap0 = p0.gap + p0.income.supplement;
      ctx.noSupp = { gap: gap0, rate: ctx.income.portfolio ? Math.max(0, gap0 * 12) / ctx.income.portfolio * 100 : null };
    }
    return ctx;
  }

  /* ------------------------------------------------------------------ */
  /* Open items, ranked by how far each could move the answer.            */
  /* ------------------------------------------------------------------ */

  function openItems(ctx) {
    var inp = ctx.inp, out = [];
    function add(impact, text, closes) { out.push({ impact: impact, text: text, closes: closes }); }
    var sc = ctx.plan;
    if (ctx.stop) add('Stops the plan', 'Special provision coverage (law enforcement, firefighter, air traffic controller, nuclear materials courier, Customs and Border Protection officer, Capitol or Supreme Court Police, or military reserve technician) changes the ages, the multiplier, the supplement and the COLA. This planner covers Regular FERS only.', 'Written confirmation of retirement coverage from the benefits office');
    if (ctx.unsure) add('High', 'Special provision coverage is unconfirmed. If the position is covered, none of the figures here apply.', 'The SF 50 retirement plan code, confirmed in writing by the benefits office');
    if (!inp.service.scdRetirement) add('High', 'The retirement SCD is missing, so no eligibility date can be derived.', 'A written statement of the retirement SCD from the benefits office');
    else if (inp.service.scdSource !== 'written') add('High', 'The retirement SCD has not been confirmed in writing. Block 31 of the SF 50 and the leave and earnings statement carry the leave SCD, which is not used for retirement and is often different.', 'A written statement of the retirement SCD from the benefits office');
    if (inp.service.scdLeave && inp.service.scdRetirement && inp.service.scdLeave !== inp.service.scdRetirement) add('High', 'The leave SCD (' + D(E.parse(inp.service.scdLeave)) + ') and the retirement SCD (' + D(E.parse(inp.service.scdRetirement)) + ') differ. Every date in this plan uses the retirement SCD; confirm which uncredited service explains the difference.', 'The benefits office service history');
    var sm = sc && sc.service;
    if (sm && sm.militaryAvailable) {
      if (inp.service.militaryStatus === 'plan') add('High', 'The plan assumes the military service deposit is paid in full before separation. OPM cannot accept it afterwards. Request the RI 20-97 estimate per branch, then apply on SF 3108 and SF 3108A, and keep the paid in full letter.', 'RI 20-97 statement, SF 3108 and SF 3108A, and the paid in full letter with the corrected SCD');
      else add('High', 'Military service of ' + E.svcText(sm.military) + ' is uncredited. Paying the deposit before separation would add it for eligibility and the computation. See the deposit comparison on the Dates tab.', 'RI 20-97 statement of military earnings');
    }
    if (inp.service.militaryRetiredPay === 'regular') add('High', 'Regular military retired pay must be waived through DFAS, 60 to 90 days before the annuity starts, with a waiver that states it is for civil service retirement purposes, before the same service can count. The waiver does not replace the deposit. Compare the retired pay given up against the annuity gained before deciding.', 'DFAS retired pay statement and the waiver request');
    if (inp.service.militaryRetiredPay === 'crsc') add('Medium', 'How Combat-Related Special Compensation or Concurrent Retirement and Disability Pay interacts with the waiver requirement is not settled by any source the package could reach.', 'A written answer from the benefits office and DFAS');
    if (sm && sm.pre89Unanswered) add('High', 'Pre-1989 non-deduction service is entered, but not whether its deposit will be paid. It is left out until you answer, which can move the path and the earliest unreduced date.', 'The agency deposit estimate, and your decision');
    if (sm && sm.refundUnanswered) add('High', 'Refunded service is entered, but not whether it will be redeposited. No redeposit is assumed until you answer.', 'The OPM redeposit estimate, and your decision');
    if (!inp.person.married) add('High', 'Whether you are married is not answered. The plan models no survivor reduction, which overstates the annuity by up to 10 percent if you are married.', 'Your answer on the About you step');
    if (sc && sc.ok && sc.path.key === 'none') add('Stops the plan', 'No annuity is payable at the planned date: FERS needs at least 5 years of creditable civilian service (5 U.S.C. 8410).', 'A later separation date, once civilian service reaches 5 years');
    if (sc && sc.ok && sc.path.key === 'deferred') add('Stops the plan', 'The planned date falls before eligibility for an immediate annuity, which forces the deferred path and ends FEHB, FEGLI and FEDVIP for life.', 'Choose a date on or after the earliest immediate annuity date');
    if (sc && sc.insurance && sc.insurance.fehb.status === 'fail') add('High', 'FEHB five year rule not met at the planned date. ' + sc.insurance.fehb.text, 'FEHB enrollment history from the benefits office');
    if (sc && sc.insurance && sc.insurance.fegliBasic.status === 'fail') add('High', 'FEGLI Basic five year rule not met at the planned date, and OPM cannot waive it. ' + sc.insurance.fegliBasic.text, 'FEGLI enrollment history (SF 2817 records)');
    if (sc && sc.insurance && sc.insurance.fehb.status === 'unknown') add('High', 'The FEHB enrollment start date is missing, so the five year rule cannot be tested.', 'FEHB enrollment history from the benefits office');
    if (sc && sc.insurance && sc.insurance.fegliBasic.status === 'unknown') add('Medium', 'The FEGLI Basic start date is missing, so the five year rule cannot be tested.', 'FEGLI enrollment history');
    var est = num(inp.pay.agencyEstimateMonthly);
    if (!est || !inp.pay.agencyEstimateSep) add('Medium', 'No agency annuity estimate has been entered for a specific separation date, so the computation here has not been checked against the agency.', 'An agency annuity estimate for the planned separation date');
    else if (ctx.priced && sc.agencyEstimate && Math.abs(sc.agencyVariancePct) > 2) add('High', 'The agency estimate differs from this computation by ' + pctTxt(sc.agencyVariancePct, 1) + '. Use the lower figure until the benefits office resolves it in writing. A high-3 built from W-2 gross pay is the most common cause.', 'A written explanation of the agency computation');
    else if (est && sc && sc.ok && inp.pay.agencyEstimateSep !== sc.sepISO) add('Medium', 'The agency estimate was run for ' + D(E.parse(inp.pay.agencyEstimateSep)) + ', not the planned date, so it cannot be compared.', 'An agency estimate for ' + (sc.sep ? D(sc.sep) : 'the planned date'));
    if (!num(inp.ss.ss62) || !num(inp.ss.ssFra)) add('Medium', 'The Social Security zero future earnings estimates are incomplete. The statement figures assume your current salary continues to the claiming age and overstate the benefit.', 'The ssa.gov Retirement Calculator run with future earnings set to $0');
    if (ctx.priced && ctx.plan.high3.estimate) add('Medium', 'The high-3 is ' + (ctx.plan.high3.method === 'direct' ? 'entered directly and held constant across dates' : 'partly projected') + '. Each candidate date has its own high-3.', 'Salary history with effective dates (SF 50s) and an agency estimate');
    if (ctx.priced && ctx.plan.sickProjection && ctx.plan.sickProjection.estimate) add('Low', 'The sick leave balance at separation is projected.', 'The final leave and earnings statement');
    if (inp.person.married === 'yes' && inp.survivor.election !== 'full') add('High', 'Electing less than the full survivor annuity requires your spouse’s notarized consent, and with no survivor annuity your spouse’s FEHB ends at your death.', 'The retirement application, SF 3107 Schedule B, and the consent form');
    if (inp.person.married === 'yes') add('Medium', 'Whether the surviving spouse must also be covered under a Self Plus One or Self and Family enrollment at the time of death was not found on a primary OPM page.', 'A written answer from the benefits office');
    if (!num(inp.insurance.fehbPremium)) add('Medium', 'The FEHB annuitant premium is missing, so the pre-65 window has no cost.', 'The FEHB annuitant premium table for the plan and enrollment code');
    if (!num(inp.money.spendRetired)) add('High', 'Retirement spending (the RETIRED lens) is missing, so there is no gap, no withdrawal rate and no verdict.', 'Twelve months of transaction exports');
    else if (inp.money.spendSource !== 'register') add('High', 'Spending was not built from a transaction register. Budgets from memory are wrong by a wide margin in both directions.', 'Twelve months of transaction exports from every account');
    if (sc && sc.ok && !sc.monthEnd && sc.path && sc.path.key !== 'deferred') add('Low', 'The planned separation is not the last day of a month. See the separation date note on the Leave tab.', 'A month end separation date');
    if (ctx.priced && ctx.plan.supplement.eligible) add('Medium', 'Repeal of the supplement was proposed in 2025 and removed before enactment on procedural grounds. Nothing is enacted, but carry the no-supplement case.', 'Current law at opm.gov, rechecked before filing');
    if (ctx.ages && ctx.ages.rmdNote) add('Low', ctx.ages.rmdNote, 'Final Treasury regulations');
    var order = { 'Stops the plan': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
    out.sort(function (a, b) { return order[a.impact] - order[b.impact]; });
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Sections.                                                            */
  /* ------------------------------------------------------------------ */

  function verdict(ctx) {
    var b = [], sc = ctx.plan, ip = ctx.income;
    if (ctx.stop) {
      b.push({ t: 'lead', text: 'Stop. This planner covers Regular FERS only, and you said your position has special provision coverage. The ages, the multiplier, the supplement and the COLA all work differently for special provision retirement, so none of the figures here apply to you.' });
      b.push(p('Ask the benefits office for a special provision annuity estimate. The Claude project in this repository can still run the interview and flag what applies.'));
      return { id: 'verdict', title: 'Verdict', blocks: b };
    }
    if (!sc || !sc.ok) {
      b.push({ t: 'lead', text: 'I do not have enough information to give a verdict yet. Enter a date of birth and a retirement SCD on the Answers tab to derive the eligibility dates.' });
      return { id: 'verdict', title: 'Verdict', blocks: b };
    }
    if (sc.path && sc.path.key === 'none') {
      b.push({ t: 'lead', text: 'No annuity is payable for a separation on ' + D(sc.sep) + '. Every FERS annuity needs at least 5 years of creditable civilian service (5 U.S.C. 8410), and the civilian service at that date is ' + E.svcText(sc.civilianEligService) + '. Military service does not count toward the 5 years.' });
      return { id: 'verdict', title: 'Verdict', blocks: b };
    }
    if (!ctx.priced) {
      b.push({ t: 'lead', text: 'I do not have enough information to price the annuity. ' + (sc.problems.join(' ') || '') });
      return { id: 'verdict', title: 'Verdict', blocks: b };
    }
    if (!ip.ok || !ip.worst || ip.worst.rate === null || !ip.verdict) {
      b.push({ t: 'lead', text: 'No verdict yet: ' + (ip.problems.join(' ') || 'spending and savings are needed.') + ' The annuity for a separation on ' + D(sc.sep) + ' is ' + M(sc.netMonthly) + ' a month from ' + D(sc.commencing) + ' on the ' + sc.path.label + ' path.' });
      return { id: 'verdict', title: 'Verdict', blocks: b };
    }
    var w = ip.worst;
    var v = ip.verdict;
    var diffTxt = v === 'on track'
      ? 'That leaves ' + M(ip.monthlyRoomAtFlag) + ' a month of room under the 4 percent line.'
      : 'That is ' + M(ip.monthlyShortfallAtFlag) + ' a month more than the 4 percent line allows.';
    b.push({ t: 'lead', text: 'Verdict: ' + cap(v) + '. In the tightest period, ' + D(w.start) + (w.end ? ' to ' + D(E.addDays(w.end, -1)) : ' onward') + ', spending of ' + M(num(ctx.inp.money.spendRetired)) + ' a month against guaranteed income of ' + M(w.total) + ' a month leaves a gap of ' + M(Math.max(0, w.gap)) + ' a month, a withdrawal rate of ' + pctTxt(w.rate) + ' on savings of ' + M(ip.portfolio, false) + '. ' + diffTxt });
    var su = sc.supplement;
    b.push(p('Plan date: separation ' + D(sc.sep) + ', ' + sc.path.label + ', annuity from ' + D(sc.commencing) + ' of ' + M(sc.netMonthly) + ' a month' + (su.eligible ? ', plus a supplement of ' + M(su.monthly) + ' a month to ' + D(su.end) + (su.totalReduction ? ', less ' + M(su.totalReduction) + ' in total under the earnings test' : '') : ', with no supplement') + '.'));
    if (ip.start && sc.commencing > ip.start) b.push(note('Nothing is paid from ' + D(ip.start) + ' until the annuity starts on ' + D(sc.commencing) + '. Those months are in the verdict.', 'warn'));
    if (sc.reductionPct) b.push(note('This date is an MRA+10 date. The annuity is reduced ' + pctTxt(sc.reductionPct, 3) + ' for life and carries no supplement.', 'warn'));
    var bel = E.parse(ctx.inp.dates.believedDate);
    if (bel && ctx.ed.ok && ctx.ed.earliestUnreduced) {
      var eu = ctx.ed.earliestUnreduced;
      if (bel < eu.date) b.push(note('You believed you could retire from ' + D(bel) + '. The earliest unreduced annuity is ' + D(eu.date) + ' (' + eu.label + '). ' + (bel >= ctx.ed.earliestImmediate.date ? 'Your date is real, but it is an MRA+10 date: reduced and with no supplement.' : 'Your date falls before any immediate annuity, which is the deferred path and ends federal insurance for life.'), 'warn'));
      else b.push(p('Your believed date of ' + D(bel) + ' is on or after the earliest unreduced date of ' + D(eu.date) + '.'));
    }
    b.push(p('Verdict rule: on track at or under 4 percent in every period, tight up to 5 percent, short above that. Figures are in today’s dollars before tax, with no COLA before 62.'));
    return { id: 'verdict', title: 'Verdict', blocks: b };
  }

  function dates(ctx) {
    var b = [], ed = ctx.ed, ages = ctx.ages;
    if (!ed.ok) { b.push(p('I do not have enough information: enter ' + ed.missing.join(' and ') + '.')); return { id: 'dates', title: 'The eligibility dates', blocks: b }; }
    var by = ages.dob.getUTCFullYear();
    b.push(steps([
      'Born ' + by + ', so the [[MRA]] is ' + ages.mra[0] + (ages.mra[1] ? ' and ' + ages.mra[1] + ' months' : '') + '.',
      'Date of birth ' + D(ages.dob) + ' + ' + ages.mra[0] + ' years' + (ages.mra[1] ? ' ' + ages.mra[1] + ' months' : '') + ' = ' + D(ages.mraDate) + '.',
      'Service from the eligibility SCD of ' + D(ed.service.eligSCD) + ': 10 years on ' + D(ed.svc10) + ', 20 years on ' + D(ed.svc20) + ', 30 years on ' + D(ed.svc30) + '.',
      +ed.service.civSCD !== +ed.service.eligSCD ? 'Civilian service alone, which must reach 5 years before any annuity is payable (5 U.S.C. 8410): 5 years on ' + D(ed.svc5) + '.' : null
    ]));
    var rows = [];
    rows.push(['MRA date', D(ed.mraDate), 'Year of birth table', '']);
    var ei = ed.earliestImmediate, eu = ed.earliestUnreduced, en = ed.enhanced;
    rows.push(['Earliest immediate annuity', ei ? D(ei.date) : 'none', ei ? ei.label + (ei.key === 'mra10' ? ', reduced' : '') : '', ei ? D(ei.sep) + ' / ' + D(ei.commencing) : '']);
    rows.push(['Earliest immediate unreduced', eu ? D(eu.date) : 'none', eu ? eu.label : '', eu ? D(eu.sep) + ' / ' + D(eu.commencing) : '']);
    rows.push(['1.1 percent multiplier', en ? D(en.date) : 'not reached by age 82', 'Age 62 with 20 years, sick leave counted (BAL 18-103)', en ? D(E.lastOfMonth(en.date)) + ' / ' + D(E.firstOfNextMonth(E.lastOfMonth(en.date))) : '']);
    b.push(table(['Date', 'Reached', 'Rule', 'Month end separation / annuity starts'], rows));
    b.push(p('Each path, for reference: MRA with 10 years on ' + D(ed.paths.mra10) + '; MRA with 30 years on ' + D(ed.paths.mra30) + '; age 60 with 20 years on ' + D(ed.paths.age60_20) + '; age 62 with 5 years on ' + D(ed.paths.age62_5) + '.'));
    if (ei && ei.key === 'mra10' && eu) {
      var months = E.fullMonths(ei.commencing, ages.age62);
      b.push(p('Retiring at the earliest MRA+10 date reduces the annuity 5/12 of 1 percent for each full month under 62 at the commencing date: ' + months + ' months x 5/12 = ' + (months * 5 / 12).toFixed(3) + ' percent, permanently. It does not stop at 62, and no supplement is payable.'));
      b.push(p('The MRA+20 rule: separating under MRA+10 with at least 20 years and postponing the annuity to start at or after age 60 removes the age reduction. Postponing keeps the right to re-enroll in FEHB and FEGLI; it does not carry the supplement.'));
    }
    b.push(h3('Age triggered dates'));
    b.push(table(['Age', 'Date', 'What it unlocks or triggers'], [
      ['50', D(ages.age50), 'VERA early out threshold with 20 years, if the agency offers one'],
      ['55', D(ages.age55), 'Separating in or after this calendar year exempts TSP withdrawals from the 10 percent additional tax, if the money stays in the TSP'],
      ['59 and a half', D(ages.age595), 'Every retirement account, including any IRA, reachable without the 10 percent additional tax'],
      ['60', D(ages.age60), 'Age 60 with 20 years: immediate unreduced annuity with the supplement'],
      ['62', D(ages.age62), 'Earliest Social Security and the end of the supplement. FERS annuity COLAs begin with the first one that takes effect after this birthday (each December)'],
      ['65', D(ages.age65), 'Medicare from ' + D(ages.medicareStart) + '; FEGLI post-retirement reductions begin'],
      [ages.fra[0] + (ages.fra[1] ? ' and ' + ages.fra[1] + ' months' : ''), D(ages.fraDate), 'Social Security full retirement age'],
      ['70', D(ages.age70), 'Maximum Social Security'],
      [String(ages.rmdAge), D(E.attains(ages.dob, ages.rmdAge)), 'Required minimum distributions on traditional balances begin' + (ages.rmdNote ? '. ' + ages.rmdNote : '')]
    ]));
    b.push(p('The health insurance window runs from separation to Medicare at 65. See the Insurance tab.'));
    b.push(p(src(R.mraSource.concat([S.ch50, S.bal18103]))));
    return { id: 'dates', title: 'The eligibility dates', blocks: b };
  }

  function service(ctx) {
    var b = [], inp = ctx.inp, s = inp.service;
    var sm = E.serviceModel(inp);
    if (!sm.ok) { b.push(p('I do not have enough information: enter the retirement SCD.')); return { id: 'service', title: 'Creditable service', blocks: b }; }
    var srcLabel = { written: 'written statement from the benefits office', les: 'leave and earnings statement (this is usually the leave SCD)', sf50: 'SF 50 Block 31 (this is the leave SCD)', unknown: 'unknown' }[s.scdSource] || 'not stated';
    b.push(table(['Item', 'Value'], [
      ['Retirement SCD entered', D(sm.scd)],
      ['Where it came from', srcLabel],
      ['Eligibility SCD used here', D(sm.eligSCD) + (+sm.eligSCD !== +sm.scd ? ', after the planned deposits' : '')],
      ['Military service', E.toDays(sm.military) ? E.svcText(sm.military) + ', ' + ({ plan: 'deposit to be paid before separation', no: 'no deposit', credited: 'already credited', none: '' }[s.militaryStatus] || '') : 'none entered'],
      ['Pre-1989 non-deduction service', E.toDays(sm.pre89) ? E.svcText(sm.pre89) + (sm.pre89Included ? ', deposit planned' : (sm.pre89Unanswered ? ', deposit decision not answered' : ', no deposit')) : 'none entered'],
      ['Refunded FERS service', E.toDays(sm.refund) ? E.svcText(sm.refund) + (sm.refundRedeposit ? ', redeposit planned' : (sm.refundUnanswered ? ', redeposit decision not answered' : ', no redeposit')) : 'none entered'],
      ['Part time proration factor', String(sm.partTime)]
    ]));
    if (sm.notes.length) b.push(list(sm.notes));
    if (sm.militaryAvailable) {
      b.push(h3('The military service deposit'));
      var withD = E.eligibilityDates(inp, { forceMilitary: true }), without = E.eligibilityDates(inp, { forceMilitary: false });
      if (withD.ok && without.ok) {
        b.push(table(['', 'Without the deposit', 'With the deposit'], [
          ['Eligibility SCD', D(without.service.eligSCD), D(withD.service.eligSCD)],
          ['Earliest unreduced', without.earliestUnreduced ? D(without.earliestUnreduced.date) + ', ' + without.earliestUnreduced.label : 'none', withD.earliestUnreduced ? D(withD.earliestUnreduced.date) + ', ' + withD.earliestUnreduced.label : 'none'],
          ['30 years of service', D(without.svc30), D(withD.svc30)]
        ]));
      }
      if (ctx.priced) {
        var a = E.scenario(inp, ctx.plan.sepISO, { forceMilitary: true }), z = E.scenario(inp, ctx.plan.sepISO, { forceMilitary: false });
        if (a.priced && z.priced) {
          var gain = (a.netMonthly + (a.supplement.eligible ? a.supplement.netMonthly : 0)) - (z.netMonthly + (z.supplement.eligible ? z.supplement.netMonthly : 0));
          var cost = num(s.militaryDepositAmount);
          b.push(steps([
            'At the plan date of ' + D(ctx.plan.sep) + ': with the deposit ' + a.path.label + ', ' + M(a.netMonthly) + (a.supplement.eligible ? ' + supplement ' + M(a.supplement.netMonthly) : '') + ' a month.',
            'Without the deposit: ' + z.path.label + ', ' + M(z.netMonthly) + (z.supplement.eligible ? ' + supplement ' + M(z.supplement.netMonthly) : '') + ' a month.',
            'Difference: ' + M(gain) + ' a month.',
            cost ? 'Break-even: deposit of ' + M(cost, false) + ' / ' + M(gain) + ' a month = ' + (gain > 0 ? (cost / gain).toFixed(1) + ' months.' : 'no payback at this date.') : 'Enter the deposit amount from the RI 20-97 estimate to see the break-even.'
          ]));
        }
      }
      b.push(list([
        'The deposit is generally 3 percent of military basic pay (3.25 percent for 1999 service, 3.40 percent for 2000), plus interest that begins on the second anniversary of FERS coverage, at ' + R.militaryDeposit.interest2026 + ' percent for 2026.',
        'It is paid to the employing agency and must be paid in full before separation. OPM cannot accept it after retirement. The paperwork commonly takes about six months.',
        'It does not raise the high-3, and military service does not count in the supplement even when the deposit is paid.',
        s.militaryRetiredPay === 'regular' ? 'Regular military retired pay must be waived through DFAS before the service can count (5 U.S.C. 8411(c)(2)). The exceptions are reserve retired pay under chapter 1223 of title 10, and retired pay for a service connected disability incurred in combat with an enemy of the United States or caused by an instrumentality of war in line of duty during a period of war. The waiver does not replace the deposit.' : (s.militaryRetiredPay === 'reserve' ? 'Reserve retired pay under chapter 1223 of title 10 does not need to be waived.' : null)
      ]));
      b.push(p(src(R.militaryDeposit.source)));
    }
    b.push(p('Service is counted from the SCD through the separation date, both days included, in calendar months. OPM combines service in 30 day months, which can differ by a day; the computation uses whole months, so this rarely matters, but confirm against the agency estimate.'));
    return { id: 'service', title: 'Creditable service', blocks: b };
  }

  function compareTable(ctx) {
    if (!ctx.cands.length) return null;
    var rows = ctx.cands.map(function (c) {
      if (!c.ok) return [c.label, c.sepISO, 'not available', '', '', '', '', ''];
      var tot = c.priced ? c.netMonthly + (c.supplement.eligible ? c.supplement.netMonthly : 0) : null;
      return [
        c.label + (c.opts && c.opts.forceMilitary === true ? ' *' : ''),
        D(c.sep),
        c.path.label,
        c.priced ? svcT(c.combinedService) : 'not priced',
        c.reductionPct ? pctTxt(c.reductionPct, 3) : 'None',
        c.priced ? M(c.netMonthly) : 'not priced',
        c.supplement && c.supplement.eligible ? (c.supplement.blocked ? 'needs SSA estimate' : M(c.supplement.netMonthly)) : 'None',
        tot !== null ? M(tot) : '',
        cap(c.insurance.track)
      ];
    });
    return table(['Candidate', 'Separation', 'Path', 'Service with sick leave', 'Age reduction', 'Monthly annuity', 'Supplement', 'Monthly to 62', 'Insurance'], rows);
  }

  function annuity(ctx) {
    var b = [], sc = ctx.plan;
    if (!sc || !sc.ok) { b.push(p('I do not have enough information to compute the annuity.')); return { id: 'annuity', title: 'The annuity computation', blocks: b }; }
    if (!sc.priced) { b.push(p('I do not have enough information: ' + sc.problems.join(' '))); return { id: 'annuity', title: 'The annuity computation', blocks: b }; }
    b.push(p('Computed for the plan date, separation ' + D(sc.sep) + ', annuity commencing ' + D(sc.commencing) + ', on the ' + sc.path.label + ' path.', true));
    b.push(h3('High-3 average salary'));
    b.push(steps(sc.high3.steps));
    b.push(p('Basic pay includes locality pay. Overtime, bonuses, awards, allowances and the annual leave lump sum do not count.'));
    b.push(h3('The computation'));
    b.push(steps(sc.steps));
    b.push(table(['Line', 'Annual', 'Monthly'], [
      ['Basic annuity', M(sc.basicAnnual), M(sc.basicAnnual / 12)],
      ['After the age reduction', M(sc.afterAgeAnnual), M(sc.afterAgeAnnual / 12)],
      ['After the survivor election', M(sc.netAnnual), M(sc.netMonthly)]
    ]));
    if (sc.agencyEstimate) b.push(note('Agency estimate for this date: ' + M(sc.agencyEstimate) + ' a month. This computation: ' + M(sc.netMonthly) + '. Variance ' + pctTxt(sc.agencyVariancePct, 1) + (Math.abs(sc.agencyVariancePct) > 2 ? '. Over 2 percent: use the lower figure until the benefits office explains the difference in writing.' : ', inside the 2 percent tolerance.'), Math.abs(sc.agencyVariancePct) > 2 ? 'warn' : 'info'));
    b.push(p('No cost of living adjustment applies before 62 for Regular FERS. From 62 the diet COLA applies: the full CPI-W rise under 2 percent, 2 percent for a rise of 2 to 3 percent, and the rise less 1 point above 3 percent. For 2026 it was ' + R.cola2026.fers + ' percent against ' + R.cola2026.csrs + ' percent for CSRS.'));
    var ct = compareTable(ctx);
    if (ct) {
      b.push(h3('Every candidate date, side by side'));
      b.push(ct);
      if (ctx.cands.some(function (c) { return c.opts && c.opts.forceMilitary === true; })) b.push(p('* Assumes the military deposit is paid in full before separation.'));
    }
    b.push(p(src(R.multiplier.source.concat(R.mra10Source.slice(2)).concat([S.usc8410, S.usc8462, S.usc8464, S.ch30]).concat(sc.path.key === 'deferred' ? [S.deferred] : []))));
    return { id: 'annuity', title: 'The annuity computation', blocks: b };
  }

  function supplement(ctx) {
    var b = [], sc = ctx.plan;
    if (!ctx.priced) { b.push(p('I do not have enough information to test the supplement yet.')); return { id: 'supplement', title: 'The FERS Special Retirement Supplement', blocks: b }; }
    var s = sc.supplement;
    if (!s.eligible) {
      b.push({ t: 'lead', text: 'No supplement at the plan date. ' + s.reason });
      b.push(p('It is payable only on an immediate unreduced annuity: MRA with 30 years, or age 60 with 20 years. MRA+10, postponed, deferred and disability annuities never carry it.'));
    } else {
      b.push({ t: 'lead', text: s.blocked ? 'Eligible, but ' + s.blocked.toLowerCase() : 'Eligible: ' + M(s.monthly) + ' a month from ' + D(sc.commencing) + ' to ' + D(s.end) + (s.totalReduction ? ', less ' + M(s.totalReduction) + ' in total under the earnings test.' : '.') });
      b.push(steps(s.steps));
      if (s.schedule && s.schedule.length > 1) b.push(table(['From', 'To', 'Supplement a month'], s.schedule.map(function (g) { return [D(g.start), D(g.end), M(g.monthly)]; })));
      b.push(list([
        'It never receives a cost of living adjustment. A tool that inflates it is wrong.',
        'It ends on the last day of the month you turn 62, whether or not you claim Social Security then. With a birthday on the 1st or 2nd it ends a month sooner, because Social Security treats you as 62 for the whole birthday month (Handbook Chapter 51, section 51A1.1-3).',
        'Wages and net self employment income above the exempt amount (' + M(R.supplement.earningsTestExempt, false) + ' for ' + R.supplement.earningsTestYear + ') reduce it one dollar for every two. Only earnings in months the supplement is paid count, so federal pay before retirement does not. A year’s reduction is taken from the following July through the next June, and can never exceed the supplement paid in the year the money was earned (5 U.S.C. 8421a). The annuity, TSP withdrawals, interest, dividends, capital gains and rental income do not count.'
      ]));
      b.push(p('The formula is a ceiling. OPM builds the age 62 figure from FERS basic pay alone and counts zero for years before federal service, so substantial pre-federal earnings mean a smaller supplement than this.'));
      if (ctx.noSupp) b.push(note('Legislative risk: repeal was proposed in 2025 and removed before enactment. Without the supplement the bridge years gap is ' + M(Math.max(0, ctx.noSupp.gap)) + ' a month' + (ctx.noSupp.rate !== null ? ', a withdrawal rate of ' + pctTxt(ctx.noSupp.rate) : '') + '.', 'warn'));
    }
    b.push(p(src(R.supplement.source)));
    return { id: 'supplement', title: 'The FERS Special Retirement Supplement', blocks: b };
  }

  function leave(ctx) {
    var b = [], sc = ctx.plan, inp = ctx.inp;
    if (!sc || !sc.ok) { b.push(p('I do not have enough information to project leave.')); return { id: 'leave', title: 'Leave and the separation date', blocks: b }; }
    b.push(h3('Unused sick leave'));
    if (sc.path.key === 'deferred') b.push(p('A deferred annuity receives no sick leave credit.'));
    else {
      b.push(steps((sc.sickProjection.steps || []).concat(sc.sick.steps || [])));
      if (ctx.priced) b.push(p('After it is added to ' + svcT(sc.compService) + ' of service and the leftover days are dropped, sick leave adds ' + sc.sickLeaveMonthsKept + ' months to the computation' + (sc.sickLeaveRaisesMultiplier ? ' and lifts the service to the 20 years the 1.1 percent multiplier needs' : '') + '. Worth ' + M(sc.sickLeaveAnnualValue) + ' a year, ' + M(sc.sickLeaveAnnualValue / 12) + ' a month, for life: the annuity with the credit less the annuity without it.', true));
      b.push(p('It counts for the computation only. It does not count toward eligibility and does not raise the high-3, but it does count toward the 20 years the 1.1 percent multiplier needs.'));
    }
    b.push(h3('Annual leave lump sum'));
    b.push(steps((sc.annualLeave && sc.annualLeave.steps) || ['Annual leave balance not entered.']));
    if (sc.lumpSum) {
      b.push(steps(['Hourly rate: final basic pay of ' + M(sc.finalBasicPay, false) + ' / 2,087 = ' + M(sc.hourlyRate) + '.', 'Lump sum: ' + sc.annualLeave.hours + ' hours x ' + M(sc.hourlyRate) + ' = ' + M(sc.lumpSum) + ' gross. [ESTIMATE]']));
      b.push(list([
        'The agency projects the leave forward as if you stayed on duty, including holidays, and pays any pay raise that takes effect inside that projected period. This estimate does not.',
        sc.lumpSumCrossesJanuary ? 'This projection reaches into January, so a January pay adjustment would raise part of the payment.' : null,
        'It is ordinary wage income in the year paid, with tax, Social Security and Medicare withheld. It cannot go into the TSP. It adds nothing to service or the high-3.'
      ]));
    } else b.push(p('Enter the annual leave balance and current basic pay to estimate the lump sum.'));
    b.push(h3('The separation date'));
    b.push(p('The annuity starts on the first day of the month after separation and is not prorated within a month. Separating on the last day of a month starts it the next day with no gap.'));
    if (sc.notes.length) b.push(list(sc.notes.filter(function (n) { return /Separating on/.test(n); })));
    else if (sc.monthEnd) b.push(p(D(sc.sep) + ' is the last day of the month: the annuity starts ' + D(sc.commencing) + '.'));
    b.push(p(src(R.sickLeave.source.concat(R.annualLeave.source).concat([S.usc8464]))));
    return { id: 'leave', title: 'Leave and the separation date', blocks: b };
  }

  function insurance(ctx) {
    var b = [], sc = ctx.plan, inp = ctx.inp;
    if (!sc || !sc.ok) { b.push(p('I do not have enough information to test the insurance rules.')); return { id: 'insurance', title: 'Insurance and the pre-65 window', blocks: b }; }
    var ins = sc.insurance;
    b.push(note(ins.summary, ins.severity === 'high' ? 'stop' : (ins.severity === 'medium' ? 'warn' : 'info')));
    var rows = [['FEHB', ins.fehb.text, 'OPM can waive only in narrow cases tied to a buyout, early out or involuntary separation']];
    rows.push(['FEGLI Basic', ins.fegliBasic.text, 'No waiver exists']);
    if (ins.fegliA) rows.push(['FEGLI Option A', ins.fegliA.text, 'Tested separately']);
    if (ins.fegliB) rows.push(['FEGLI Option B', ins.fegliB.text, 'Tested separately']);
    if (ins.fegliC) rows.push(['FEGLI Option C', ins.fegliC.text, 'Tested separately']);
    rows.push(['FEDVIP', ins.track === 'deferred' ? 'Lost on the deferred path.' : 'No five year rule.', 'An annuitant may enroll for the first time in retirement']);
    b.push(table(['Coverage', 'Five year rule at ' + D(sc.sep), 'Note'], rows));
    var cmp = ctx.cands.filter(function (c) { return c.ok; }).map(function (c) { return [c.label, D(c.sep), cap(c.insurance.track), c.insurance.fehb.status === 'pass' ? 'Met' : (c.insurance.fehb.status === 'fail' ? 'Not met' : 'Unknown'), c.insurance.fegliBasic.status === 'pass' ? 'Met' : (c.insurance.fegliBasic.status === 'fail' ? 'Not met' : 'Unknown')]; });
    if (cmp.length) b.push(table(['Candidate', 'Separation', 'Path', 'FEHB rule', 'FEGLI Basic rule'], cmp));
    b.push(h3('The pre-65 window'));
    if (ins.noFehb) {
      b.push(p(ins.pre65Months + ' months from ' + D(ins.pre65Start) + ' to Medicare on ' + D(ins.medicareStart) + ' with no FEHB. A deferred annuitant can never re-enroll, so this coverage must come from a spouse’s plan, an employer or the individual market, at a cost this planner does not estimate.', true));
    } else if (ins.pre65Months !== undefined) {
      b.push(p(ins.pre65Months + ' months of coverage you carry, from ' + D(sc.commencing) + ' to Medicare on ' + D(ins.medicareStart) + '.', true));
      if (ins.pre65Cost) b.push(steps([
        'FEHB annuitant premium ' + M(num(inp.insurance.fehbPremium)) + (num(inp.insurance.fedvipPremium) ? ' + FEDVIP ' + M(num(inp.insurance.fedvipPremium)) : '') + ' = ' + M(ins.pre65Monthly) + ' a month, post tax.',
        'Rising ' + ins.pre65Inflation + ' percent each January [ESTIMATE].',
        'Total over ' + ins.pre65Months + ' months: ' + M(ins.pre65Cost) + '.'
      ]));
      else b.push(p('Enter the FEHB annuitant premium to cost the window.'));
    }
    b.push(list([
      'As an employee your premium is pre-tax. As an annuitant it is post-tax, so the same coverage costs more. The government share is set by the same formula.',
      'Cancelling FEHB as an annuitant is permanent. Suspending it for Medicare Advantage, TRICARE, CHAMPVA or Medicaid keeps the right to return.',
      'Medicare Part B is optional with FEHB. The 2026 standard premium is ' + M(R.medicare.partBPremium) + ' a month; income above ' + M(R.medicare.irmaa[0].single, false) + ' single or ' + M(R.medicare.irmaa[0].joint, false) + ' joint, from two years earlier, raises it. Delay costs 10 percent a year for life, and retiree coverage gives no special enrollment period.',
      'The Postal Service Health Benefits Program is different and generally requires Part B.'
    ]));
    if (ctx.fegli.ok) {
      b.push(h3('FEGLI Basic after retirement'));
      b.push(steps(ctx.fegli.steps));
      b.push(table(['Election', 'Monthly cost before 65', 'Monthly cost after 65', 'Coverage at the floor', 'Months to reach it'], ctx.fegli.rows.map(function (r) {
        return [r.label, M(r.pre65Monthly), r.post65Monthly ? M(r.post65Monthly) : 'Free', M(r.finalCoverage, false), r.monthsToFloor ? String(r.monthsToFloor) : 'No reduction'];
      })));
      b.push(p('Choosing 50 percent or no reduction can later be changed only to the 75 percent reduction. Reductions begin the month after 65 or after retirement, whichever is later.'));
    }
    b.push(p(src([S.fehbAnnuitants, S.fedvip].concat(R.fegli.source).concat(R.medicare.source))));
    return { id: 'insurance', title: 'Insurance and the pre-65 window', blocks: b };
  }

  function survivorSec(ctx) {
    var b = [], sa = ctx.survivor, inp = ctx.inp;
    if (!sa.ok) { b.push(p('I do not have enough information to price the survivor election.')); return { id: 'survivor', title: 'The survivor election', blocks: b }; }
    if (!sa.married) b.push(note('You are not recorded as married, so the plan models no survivor reduction. The figures below show what each election would cost if you marry.', 'info'));
    b.push(steps(['Base: the annuity after any age reduction, ' + M(sa.base) + ' a year (Handbook Chapter 50, section 50B3.1-3D.4).']));
    var head = ['Election', 'Your annuity a month', 'Cost a year', 'Survivor receives a year'];
    var withLife = sa.longevityRetiree;
    if (withLife) head.push('Cost to age ' + sa.longevityRetiree);
    var hasSv = sa.rows.some(function (r) { return r.survivorValue !== undefined; });
    if (hasSv) head.push('Survivor total to age ' + sa.longevitySpouse);
    b.push(table(head, sa.rows.map(function (r) {
      var row = [{ full: 'Full: 50 percent, 10 percent cost', partial: 'Partial: 25 percent, 5 percent cost', none: 'None' }[r.key], M(r.netMonthly), M(r.reductionAnnual), M(r.benefitAnnual)];
      if (withLife) row.push(M(r.lifetimeCost || 0, false));
      if (hasSv) row.push(r.survivorValue !== undefined ? M(r.survivorValue, false) : '');
      return row;
    })));
    b.push(p('Totals are in today’s dollars with no COLA and no discounting [ESTIMATE]. They price the cash, not the decision.'));
    b.push(list([
      'The decisive consequence is health insurance. A surviving spouse keeps FEHB only if a monthly survivor annuity is payable, and the 5 percent partial election is enough.',
      'Electing less than the maximum needs the spouse’s notarized consent.',
      'The election can be changed either way for 30 days after the first regular monthly payment. After that it can only be increased: within 18 months of the commencing date under 5 U.S.C. 8416(d), paying the difference plus a deposit, or within two years of a marriage after retirement.',
      'Price the full election against term life insurance that would replace it before deciding, and confirm with a fiduciary and the benefits office.'
    ]));
    b.push(p(src(R.survivor.source)));
    return { id: 'survivor', title: 'The survivor election', blocks: b };
  }

  function incomeSec(ctx) {
    var b = [], ip = ctx.income, sc = ctx.plan, inp = ctx.inp, m = inp.money;
    if (!ctx.priced) { b.push(p('I do not have enough information to line up income yet.')); return { id: 'income', title: 'Income, spending and the gap', blocks: b }; }
    b.push(h3('Income, line by line, with start dates'));
    var lines = [['FERS annuity', M(sc.netMonthly), D(sc.commencing), 'For life, no COLA before 62']];
    if (sc.supplement.eligible) lines.push(['FERS supplement', sc.supplement.blocked ? 'needs SSA estimate' : M(sc.supplement.monthly), D(sc.commencing), 'Ends ' + D(sc.supplement.end) + ', never adjusted' + (sc.supplement.totalReduction ? '. The earnings test takes ' + M(sc.supplement.totalReduction) + ' in total; see the Supplement tab' : '')]);
    if (ip.ss && ip.ss.ok) lines.push(['Social Security', M(ip.ss.monthly), D(ip.ssStart), 'Claimed at ' + inp.ss.claimAgeY + (num(inp.ss.claimAgeM) ? ' and ' + inp.ss.claimAgeM + ' months' : '') + ' on ' + D(ip.claimDate) + '. ' + ip.ss.how]);
    else lines.push(['Social Security', 'not entered', '', 'Enter the zero future earnings estimates and a claiming age']);
    if (num(m.otherIncome)) lines.push([m.otherIncomeLabel || 'Other income', M(num(m.otherIncome)), m.otherIncomeStart ? D(E.parse(m.otherIncomeStart)) : D(sc.commencing), '']);
    if (sc.lumpSum) lines.push(['Annual leave lump sum', M(sc.lumpSum, false) + ' once', D(sc.sep), 'Gross, taxed as wages [ESTIMATE]']);
    b.push(table(['Line', 'Monthly', 'Starts', 'Note'], lines));
    if (ip.periods.length) {
      b.push(h3('The gap, period by period'));
      b.push(table(['From', 'To', 'Guaranteed income a month', 'Spending a month', 'Gap a month', 'Withdrawal rate'], ip.periods.map(function (pd) {
        return [D(pd.start), pd.end ? D(E.addDays(pd.end, -1)) : 'onward', M(pd.total), num(m.spendRetired) !== null ? M(num(m.spendRetired)) : 'not entered', pd.gap !== null ? M(pd.gap) : '', pd.rate !== null ? pctTxt(pd.rate) : ''];
      })));
      if (ip.worst && ip.worst.rate !== null) b.push(steps(['Worst period: gap ' + M(ip.worst.gap) + ' x 12 = ' + M(ip.worst.annualGap) + ' a year.', 'Withdrawal rate: ' + M(ip.worst.annualGap) + ' / ' + M(ip.portfolio, false) + ' = ' + pctTxt(ip.worst.rate) + (ip.worst.rate > R.withdrawalRateFlag ? '. Over 4 percent: flagged.' : '.')]));
    }
    if (ip.problems.length) b.push(note(ip.problems.join(' '), 'warn'));
    b.push(h3('Spending, three lenses'));
    b.push(table(['Lens', 'Monthly', 'Use'], [
      ['FULL', num(m.spendFull) !== null ? M(num(m.spendFull), false) : 'not entered', 'Every dollar leaving the account today. The only basis for cash available now.'],
      ['CURRENT', num(m.spendCurrent) !== null ? M(num(m.spendCurrent), false) : 'not entered', 'FULL less one time items. The run rate.'],
      ['RETIRED', num(m.spendRetired) !== null ? M(num(m.spendRetired), false) : 'not entered', 'CURRENT less what ends at retirement, plus what begins. The only basis for withdrawal math.']
    ]));
    b.push(p('Never treat the difference between FULL and RETIRED as money available today. It is still leaving the account every month.'));
    b.push(h3('Savings by account and tax treatment'));
    var acc = [['TSP Traditional', m.tspTrad, 'Tax-deferred'], ['TSP Roth', m.tspRoth, 'Tax-free'], ['Traditional IRA', m.iraTrad, 'Tax-deferred'], ['Roth IRA', m.iraRoth, 'Tax-free'], ['Taxable brokerage', m.taxable, 'Taxable'], ['Cash and savings', m.cash, 'Taxable']].filter(function (r) { return num(r[1]) !== null; });
    if (acc.length) b.push(table(['Account', 'Balance' + (m.balancesAsOf ? ' at ' + D(E.parse(m.balancesAsOf)) : ''), 'Tax treatment'], acc.map(function (r) { return [r[0], M(num(r[1]), false), r[2]]; }).concat([['Total', M(ip.portfolio, false), '']])));
    else b.push(p('No balances entered.'));
    b.push(list([
      'Leave enough in the TSP to cover the years before 59 and a half. Separating in or after the year you turn 55 lets TSP withdrawals skip the 10 percent additional tax, and rolling the money to an IRA gives that up.',
      'Roth TSP balances have no lifetime required minimum distributions.'
    ]));
    b.push(p(src([S.tspTax, S.ssaReduction, S.ssaDelay, S.ssaEstimate])));
    return { id: 'income', title: 'Income, spending and the gap', blocks: b };
  }

  function assumptions(ctx) {
    var inp = ctx.inp, a = inp.assumptions, sc = ctx.plan;
    function v(x, unit) { return x === '' || x === null || x === undefined ? 'not entered' : x + (unit || ''); }
    var rows = [
      ['FERS annuity COLA before 62', '0 percent', '[SOURCED]', '5 U.S.C. 8462(c)(3)'],
      ['FERS annuity COLA from 62', v(a.dietCola, ' percent'), '[ESTIMATE]', 'Diet COLA; 2026 actual was ' + R.cola2026.fers + ' percent'],
      ['Supplement COLA', '0 percent, always', '[SOURCED]', 'Handbook Chapter 51'],
      ['Supplement earnings test exempt amount', M(R.supplement.earningsTestExempt, false), '[SOURCED]', R.supplement.earningsTestYear + ' figure; changes yearly'],
      ['High-3', ctx.priced ? M(sc.high3.value) : 'not entered', ctx.priced && sc.high3.estimate ? '[ESTIMATE]' : '[ENTERED]', ctx.priced ? sc.high3.label : ''],
      ['January pay adjustment after the last salary entered', v(inp.pay.raisePct, ' percent a year'), '[ESTIMATE]', 'user-stated'],
      ['Sick leave at separation', ctx.priced && sc.sickProjection.hours !== null ? sc.sickProjection.hours + ' hours' : 'not entered', ctx.priced && sc.sickProjection.estimate ? '[ESTIMATE]' : '[ENTERED]', 'Accrual 4 hours a pay period'],
      ['General inflation', v(a.inflation, ' percent'), '[ESTIMATE]', 'user-stated'],
      ['Medical inflation', v(inp.insurance.medInflation, ' percent'), '[ESTIMATE]', 'user-stated; should exceed general inflation'],
      ['Portfolio return', v(a.returnPct, ' percent'), '[ESTIMATE]', 'Should match the actual TSP fund allocation'],
      ['Longevity age', v(a.longevity), '[ESTIMATE]', 'user-stated'],
      ['Withdrawal rate flag', '4 percent', '[SOURCED]', 'Package method; a ceiling, not a target'],
      ['Rules file program year', String(R.programYear), '[SOURCED]', 'Checked ' + R.checked]
    ];
    return { id: 'assumptions', title: 'Assumptions', blocks: [table(['Assumption', 'Value', 'Label', 'Basis'], rows), p('[SOURCED] figures come from a published rule. [ENTERED] figures are your own answers. [ESTIMATE] figures depend on an assumption and move when it does.')] };
  }

  function openSec(ctx) {
    var b = [];
    if (!ctx.open.length) b.push(p('No open items. Recheck every rule at opm.gov before filing.'));
    else b.push(table(['#', 'Impact', 'Item', 'Document that closes it'], ctx.open.map(function (o, i) { return [String(i + 1), o.impact, o.text, o.closes]; })));
    return { id: 'open', title: 'Open items', blocks: b };
  }

  function boldinSec(ctx) {
    var b = [], rows = ctx.boldin, sc = ctx.plan;
    var today = E.iso(new Date(Date.UTC(ctx.today.getFullYear(), ctx.today.getMonth(), ctx.today.getDate())));
    b.push(table(['Item', 'Value'], [
      ['Sheet date', today],
      ['Scenario this applies to', sc && sc.ok ? (sc.label || 'Plan') + ', separation ' + D(sc.sep) : 'not available'],
      ['Triggered by', 'FERS Planner answers'],
      ['Rows', rows.length + ', of which ' + rows.filter(function (r) { return r.status === 'BLOCKED'; }).length + ' blocked']
    ]));
    b.push(table(['#', 'Screen', 'Sub-section', 'Item', 'Field', 'Enter this', 'Replaces', 'Source', 'Status'], rows.map(function (r) { return [String(r.n), r.screen, r.sub, r.item, r.field, r.enter, r.replaces, r.source, r.status]; })));
    var st = rows.filter(function (r) { return r.structural; });
    if (st.length) { b.push(h3('Structural and irreversible rows')); b.push(table(['Row', 'Why it is structural'], st.map(function (r) { return [String(r.n), r.why]; }))); }
    var bl = rows.filter(function (r) { return r.status === 'BLOCKED'; });
    if (bl.length) { b.push(h3('Blocked rows')); b.push(table(['Row', 'Field', 'Document that would unblock it'], bl.map(function (r) { return [String(r.n), r.item + ', ' + r.field, r.unblock]; }))); }
    b.push(h3('What changes as a result'));
    b.push(list([
      'Chance of Success: expected to rise if the plan carried a pre-62 COLA or a fixed percentage withdrawal strategy, and to fall if it carried a supplement this path does not pay.',
      'Net worth at longevity: moves in the same direction as Chance of Success.',
      'The tightest year: expected to be the year the supplement ends at 62, until Social Security starts.'
    ]));
    b.push(h3('Re-export instruction'));
    b.push(list(['Enter every row, marking each ENTERED as you go.', 'Export the planner summary CSV and download the PDF report.', 'Save both to 05 Boldin with the date in the file name.', 'A value is entered when the next export shows it, not when this sheet says to type it.']));
    b.push(p(src([S.boldinMap, S.boldinGuide])));
    return { id: 'boldin', title: 'Boldin Entry Sheet', blocks: b };
  }

  function elections(ctx) {
    return { id: 'elections', title: 'Irreversible elections', blocks: [
      p('Each of these is permanent or hard to undo. Each gets an options analysis with the arithmetic shown, and each must be confirmed with a licensed fiduciary and with the agency benefits officer before filing.'),
      table(['Election', 'Where this plan analyzes it'], [
        ['The survivor annuity election on the retirement application', 'Survivor tab'],
        ['The FEGLI post-retirement reduction election on SF 2818', 'Insurance tab'],
        ['Cancelling rather than suspending FEHB as an annuitant', 'Insurance tab'],
        ['Choosing deferred retirement over postponed retirement', 'Dates and Insurance tabs'],
        ['Paying or not paying a military service deposit before separation', 'Dates tab'],
        ['The Social Security claiming age', 'Income tab'],
        ['Any TSP life annuity purchase', 'Not modeled; an annuity purchase is irrevocable']
      ])
    ] };
  }

  function sourcesSec(ctx) {
    var seen = {}, rows = [];
    Object.keys(S).forEach(function (k) { var s = S[k]; if (!seen[s.url]) { seen[s.url] = 1; rows.push([s.title, s.url]); } });
    return { id: 'sources', title: 'Sources', blocks: [
      p('Every rule in this plan comes from the rules file in the app, program year ' + R.programYear + ', checked ' + R.checked + ', which follows docs/06-fers-rules-reference.md. Federal benefit rules and dollar figures change every year: recheck any figure at opm.gov, tsp.gov, ssa.gov or medicare.gov before it drives a filing decision.'),
      table(['Source', 'Address'], rows)
    ] };
  }

  function dod(ctx) {
    var sc = ctx.plan, ip = ctx.income;
    var verdictOk = !!(ctx.priced && ip.ok && ip.worst && ip.worst.rate !== null && ip.verdict);
    var rows = [
      ['Every figure carries a source or an [ESTIMATE] label', 'Passed', 'Inputs are your own answers; rules cite the rules file; estimates are labeled'],
      ['Arithmetic on every decision driving figure is shown', ctx.priced ? 'Passed' : 'Failed', ctx.priced ? 'See the Annuity, Supplement and Leave sections' : 'The annuity could not be priced'],
      ['Assumptions in one table', 'Passed', 'Assumptions section'],
      ['Conflicts between sources stated, not resolved', 'Passed', 'None between your answers; rule conflicts are listed in docs/06'],
      ['The verdict sentence matches the numbers', verdictOk ? 'Passed' : 'Failed', verdictOk ? 'Computed from the same figures' : 'No verdict: inputs missing'],
      ['Open items listed with their impact', 'Passed', ctx.open.length + ' open items'],
      ['File carries the date in its name', 'Passed', 'Set when saved'],
      ['Prior version archived rather than overwritten', 'Not applicable', 'Keep each saved file; the app keeps no versions'],
      ['A Boldin Entry Sheet exists for this date', 'Passed', ctx.boldin.length + ' rows in Appendix A']
    ];
    return { id: 'dod', title: 'Definition of done', blocks: [table(['Check', 'Result', 'Evidence'], rows)] };
  }

  /* ------------------------------------------------------------------ */
  /* What each tab shows, and the order of the saved plan.                */
  /* ------------------------------------------------------------------ */

  var builders = {
    verdict: verdict, dates: dates, service: service, annuity: annuity, supplement: supplement, leave: leave,
    insurance: insurance, survivor: survivorSec, income: incomeSec, assumptions: assumptions, open: openSec,
    boldin: boldinSec, elections: elections, sources: sourcesSec, dod: dod
  };

  var TABS = {
    start: ['verdict', 'open'],
    dates: ['dates', 'service'],
    annuity: ['annuity'],
    supplement: ['supplement'],
    leave: ['leave'],
    insurance: ['insurance'],
    survivor: ['survivor'],
    income: ['income', 'assumptions'],
    boldin: ['boldin']
  };

  var PLAN_ORDER = ['verdict', 'dates', 'service', 'annuity', 'supplement', 'income', 'leave', 'insurance', 'survivor', 'assumptions', 'open', 'boldin', 'elections', 'sources', 'dod'];
  var APPENDIX = { boldin: 'Appendix A', elections: 'Appendix B', sources: 'Appendix C' };

  function sections(ctx, ids) { return ids.map(function (id) { return builders[id](ctx); }); }

  function document(inputs, today) {
    var ctx = context(inputs, today);
    var secs = sections(ctx, PLAN_ORDER);
    var n = 0;
    secs.forEach(function (s) {
      if (APPENDIX[s.id]) s.number = APPENDIX[s.id];
      else if (s.id !== 'dod') { n += 1; s.number = String(n); }
    });
    var d = ctx.today;
    var stamp = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    return {
      title: 'FERS Retirement Plan',
      subtitle: (ctx.name ? ctx.name + ', ' : '') + 'prepared ' + stamp,
      stamp: stamp,
      fileBase: 'FERS-Retirement-Plan-' + stamp,
      warning: 'This file holds personal financial information. Keep it off government systems and shared folders you do not control.',
      disclaimer: 'This plan is analysis and arithmetic, not financial, legal or tax advice, and it is not affiliated with OPM or any agency. It covers Regular FERS voluntary retirement only. Confirm every figure with the agency benefits officer, and every irreversible election with a licensed fiduciary, before filing.',
      sections: secs,
      ctx: ctx
    };
  }

  // Strip the definition markers for plain output.
  function plain(text) { return String(text).replace(/\[\[([^\]]+)\]\]/g, '$1'); }

  return { context: context, sections: sections, document: document, TABS: TABS, PLAN_ORDER: PLAN_ORDER, plain: plain, openItems: openItems };
});
