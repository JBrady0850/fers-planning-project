/* FERS Planner page. Answers live in this browser only. */
(function () {
  'use strict';
  var E = window.FersEngine, P = window.FersPlan, G = window.FersGlossary, R = E.rules;
  var VERSION = '1.3.0';
  var KEY = 'fers-planner-answers-v1';
  var memory = null;
  var state = { inputs: load(), tab: 'start', step: 0 };

  /* ------------------------------------------------------------------ */
  /* Storage                                                              */
  /* ------------------------------------------------------------------ */

  function load() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) return E.upgrade(JSON.parse(raw));
    } catch (e) { /* storage unavailable: work from memory */ }
    return memory ? E.upgrade(memory) : E.blankInputs();
  }
  function save() {
    state.inputs.savedAt = new Date().toISOString();
    memory = state.inputs;
    try { window.localStorage.setItem(KEY, JSON.stringify(state.inputs)); } catch (e) { /* keep in memory */ }
  }
  function clearAll() {
    memory = null;
    try { window.localStorage.removeItem(KEY); } catch (e) { /* nothing stored */ }
    state.inputs = E.blankInputs();
  }
  function get(path) { var p = path.split('.'); return (state.inputs[p[0]] || {})[p[1]]; }
  function set(path, v) { var p = path.split('.'); state.inputs[p[0]][p[1]] = v; }
  function hasStarted() { return !!(state.inputs.person.dob || state.inputs.service.scdRetirement); }

  /* ------------------------------------------------------------------ */
  /* Small helpers                                                        */
  /* ------------------------------------------------------------------ */

  function esc(s) { return String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toast.timer); toast.timer = setTimeout(function () { t.hidden = true; }, 3200);
  }
  function term(t, label) { return '<button type="button" class="term" data-term="' + esc(t) + '">' + esc(label || t) + '</button>'; }

  var autoRe = new RegExp('(^|[^A-Za-z0-9+])(' + G.auto.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')(?![A-Za-z0-9+])', 'g');
  // Escape text, turn [[TERM]] markers into definitions, and mark the first use of each known term.
  function rich(text, seen) {
    seen = seen || {};
    var parts = String(text).split(/(\[\[[^\]]+\]\])/);
    return parts.map(function (part) {
      var m = /^\[\[([^\]]+)\]\]$/.exec(part);
      if (m) { seen[m[1]] = 1; return G.terms[m[1]] ? term(m[1]) : esc(m[1]); }
      // Links first, then definitions in the text between them.
      return esc(part).split(/(https?:\/\/[^\s<]+[^\s<.,;:)])/).map(function (seg, n) {
        if (n % 2 === 1) return '<a href="' + seg + '" rel="noopener" target="_blank">' + seg + '</a>';
        return seg.replace(autoRe, function (all, pre, t) {
          if (seen[t] || !G.terms[t]) return all;
          seen[t] = 1;
          return pre + term(t);
        });
      }).join('');
    }).join('');
  }

  /* ------------------------------------------------------------------ */
  /* Block renderer: the same blocks the Word file and the PDF use.       */
  /* ------------------------------------------------------------------ */

  function renderBlocks(blocks) {
    var seen = {};
    return blocks.map(function (b) {
      switch (b.t) {
        case 'lead': return '<p class="lead">' + rich(b.text, seen) + '</p>';
        case 'p': return '<p' + (b.bold ? ' class="lead" style="font-size:1rem"' : '') + '>' + rich(b.text, seen) + '</p>';
        case 'h3': return '<h3>' + rich(b.text, seen) + '</h3>';
        case 'list': return '<ul class="blist">' + b.items.map(function (i) { return '<li>' + rich(i, seen) + '</li>'; }).join('') + '</ul>';
        case 'steps': return '<div class="steps" role="group" aria-label="How this was worked out">' + b.lines.map(function (l) { return '<div>' + rich(l, seen) + '</div>'; }).join('') + '</div>';
        case 'note': return '<div class="note ' + esc(b.tone) + '">' + rich(b.text, seen) + '</div>';
        case 'table':
          // Tables of four or more columns stack into labeled rows on a phone.
          var stack = b.head.length >= 4;
          return '<div class="tablewrap' + (stack ? ' stackwrap' : '') + '" tabindex="0"><table class="' + (b.head.length > 6 ? 'wide' : '') + (stack ? ' stack' : '') + (b.head[0] === '#' ? ' numbered' : '') + '"><thead><tr>' + b.head.map(function (h) { return '<th scope="col">' + rich(h, seen) + '</th>'; }).join('') + '</tr></thead><tbody>' +
            b.rows.map(function (r) { return '<tr>' + r.map(function (c, n) { return '<td' + (stack ? ' data-label="' + esc(P.plain(b.head[n])) + '"' : '') + '>' + rich(c, seen) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
        default: return '';
      }
    }).join('');
  }
  function renderSections(secs, opts) {
    opts = opts || {};
    return secs.map(function (s) {
      var title = (opts.numbered && s.number ? s.number + (/^Appendix/.test(s.number) ? ': ' : '. ') : '') + s.title;
      return '<section class="card" id="sec-' + esc(s.id) + '"><h2>' + esc(title) + '</h2>' + renderBlocks(s.blocks) + '</section>';
    }).join('');
  }

  /* ------------------------------------------------------------------ */
  /* The interview                                                        */
  /* ------------------------------------------------------------------ */

  var YES_NO = [['yes', 'Yes'], ['no', 'No']];
  var STEPS = [
    { id: 'about', title: 'About you', intro: 'Eligibility comes from your date of birth and your service, not from a preferred date. Those come first.', fields: [
      { k: 'person.name', label: 'Name for the saved plan (optional)', type: 'text', help: 'Printed on the Word and PDF files only. Leave it blank to keep your name off them.' },
      { k: 'person.dob', label: 'Date of birth', type: 'date', req: true, help: 'Sets the MRA and every age-triggered date.' },
      { k: 'person.specialProvision', label: 'Is your position covered by special provisions?', type: 'radio', req: true, options: [['no', 'No, Regular FERS'], ['yes', 'Yes'], ['unsure', 'Not sure']], help: 'Special provision covers federal law enforcement officers, firefighters, air traffic controllers, nuclear materials couriers, Customs and Border Protection officers, Capitol and Supreme Court Police and military reserve technicians. This planner covers Regular FERS only.' },
      { k: 'person.married', label: 'Are you married?', type: 'radio', req: true, options: YES_NO, help: 'Drives the survivor election and whether a spouse keeps FEHB.' },
      { k: 'person.spouseDob', label: 'Spouse’s date of birth', type: 'date', show: function (i) { return i.person.married === 'yes'; } }
    ] },
    { id: 'service', title: 'Service', intro: 'The years of service in the formula are not simply the years since you were hired. Unpaid deposits and the wrong SCD are the most common errors in a FERS plan.', fields: [
      { k: 'service.scdRetirement', label: 'Retirement SCD', type: 'date', req: true, help: 'The Service Computation Date for retirement. It is not on the SF 50: Block 31 there is the leave SCD. Ask the benefits office for the retirement SCD in writing.' },
      { k: 'service.scdSource', label: 'Where did that date come from?', type: 'select', req: true, options: [['', 'Choose one'], ['written', 'A written statement from the benefits office'], ['les', 'My leave and earnings statement'], ['sf50', 'Block 31 of my SF 50'], ['unknown', 'I am not sure']] },
      { k: 'service.scdLeave', label: 'Leave SCD (optional)', type: 'date', help: 'From your leave and earnings statement or SF 50 Block 31, so the two can be compared.' },
      { k: 'dates.believedDate', label: 'What date do you believe you are first eligible to retire?', type: 'date', help: 'Recorded as you believe it. The planner checks it against the rules.' },
      { k: 'dates.believedSource', label: 'Where did that date come from?', type: 'select', options: [['', 'Choose one'], ['office', 'The benefits office'], ['own', 'My own calculation'], ['memory', 'Memory, or something I heard']] },
      { k: 'service.military', label: 'Military active duty after 1956', type: 'ymd', prefix: 'service.military', help: 'Total honorable active duty, including academy service. Leave blank if none.' },
      { k: 'service.militaryStatus', label: 'Military service deposit', type: 'select', options: [['none', 'No military service'], ['credited', 'Paid in full, already counted in my retirement SCD'], ['plan', 'Not paid yet; I plan to pay before separating'], ['no', 'Not paid and not planning to']] },
      { k: 'service.militaryRetiredPay', label: 'Do you receive military retired pay?', type: 'select', show: function (i) { return i.service.militaryStatus !== 'none'; }, options: [['none', 'No'], ['regular', 'Yes, regular military retired pay'], ['reserve', 'Yes, reserve retired pay (chapter 1223, usually from age 60)'], ['combat', 'Yes, retired pay for a disability incurred in combat or caused by an instrumentality of war'], ['crsc', 'I receive CRSC or CRDP']] },
      { k: 'service.militaryDepositAmount', label: 'Deposit amount, if known', type: 'money', show: function (i) { return i.service.militaryStatus === 'plan' || i.service.militaryStatus === 'no'; }, help: 'From the agency’s estimate after your RI 20-97 request. Used for the break-even.' },
      { k: 'service.pre89', label: 'Civilian service before 1989 with no retirement deductions', type: 'ymd', prefix: 'service.pre89', help: 'Temporary, term, seasonal or intermittent work. Leave blank if none. After 1988 such service generally cannot be credited under FERS.' },
      { k: 'service.pre89Status', label: 'Deposit for that service', type: 'select', options: [['', 'Choose one'], ['plan', 'Paid, or I plan to pay it in full'], ['no', 'Not paid and not planning to']], show: function (i) { return !!(+i.service.pre89Y || +i.service.pre89M || +i.service.pre89D); } },
      { k: 'service.refund', label: 'Federal service you took a refund for', type: 'ymd', prefix: 'service.refund', help: 'Leave blank if you never took a refund of retirement contributions.' },
      { k: 'service.refundStatus', label: 'Redeposit for that service', type: 'select', options: [['', 'Choose one'], ['plan', 'Paid, or I plan to pay it'], ['no', 'Not paid and not planning to']], show: function (i) { return !!(+i.service.refundY || +i.service.refundM || +i.service.refundD); } },
      { k: 'service.partTimeFactor', label: 'Part time proration factor', type: 'number', help: 'Leave at 1 if all your FERS service was full time. Otherwise the agency estimate shows the factor.' }
    ] },
    { id: 'pay', title: 'Pay and the high-3', intro: 'The planner builds the annuity itself and then checks it against any agency estimate.', fields: [
      { k: 'pay.currentBasic', label: 'Current annual basic pay, including locality', type: 'money', req: true, help: 'From your leave and earnings statement. Not W-2 pay: leave out overtime, awards and bonuses.' },
      { k: 'pay.currentBasicAsOf', label: 'Date that rate took effect', type: 'date' },
      { k: 'pay.raisePct', label: 'Assumed January pay adjustment each year', type: 'number', unit: 'percent', help: 'An assumption, labeled as an estimate wherever it is used. Enter 0 to assume no raises.' },
      { k: 'pay.high3Mode', label: 'How should the high-3 be found?', type: 'radio', options: [['direct', 'I will enter the high-3'], ['history', 'Work it out from my salary history']] },
      { k: 'pay.high3Direct', label: 'High-3 average salary', type: 'money', show: function (i) { return i.pay.high3Mode === 'direct'; }, help: 'Held constant for every candidate date. For a figure that changes by date, use the salary history instead.' },
      { k: 'pay.history', label: 'Salary history', type: 'history', show: function (i) { return i.pay.high3Mode === 'history'; }, help: 'Every rate of basic pay with the date it took effect: step increases, promotions and January adjustments, for at least the last four years. Your current rate above is added automatically.' },
      { k: 'pay.agencyEstimateMonthly', label: 'Agency annuity estimate, monthly (optional)', type: 'money', help: 'If the agency has given you one. The planner flags any difference over 2 percent.' },
      { k: 'pay.agencyEstimateSep', label: 'Separation date that estimate was run for', type: 'date', show: function (i) { return !!i.pay.agencyEstimateMonthly; } }
    ] },
    { id: 'dates', title: 'Your date', intro: 'These are the dates the rules give you. Choose a preferred date only after reading them.', preview: true, fields: [
      { k: 'dates.preferredSep', label: 'Preferred separation date (optional)', type: 'date', help: 'Leave blank to plan on the earliest unreduced date. The last day of a month is usually best.' },
      { k: 'dates.preferredFirmness', label: 'How firm is that date?', type: 'select', show: function (i) { return !!i.dates.preferredSep; }, options: [['', 'Choose one'], ['firm', 'Firm'], ['preferred', 'Preferred'], ['guess', 'An opening guess']] },
      { k: 'dates.postponeTo', label: 'Postpone the annuity to start on (MRA+10 only, optional)', type: 'date', help: 'A postponed annuity is reduced from its start date rather than the separation date, and starting at 62, or at 60 with 20 years, removes the reduction.' }
    ] },
    { id: 'leave', title: 'Leave', intro: 'Sick leave adds to the annuity for life. Annual leave is paid out once, at separation.', fields: [
      { k: 'leave.sickHours', label: 'Sick leave balance today', type: 'number', unit: 'hours', help: 'From your latest leave and earnings statement.' },
      { k: 'leave.sickAsOf', label: 'Date of that balance', type: 'date' },
      { k: 'leave.sickUsePerYear', label: 'Sick leave you expect to use each year', type: 'number', unit: 'hours', help: 'Full time employees earn 4 hours a pay period, 104 a year.' },
      { k: 'leave.sickAtSep', label: 'Or enter the expected balance at separation instead', type: 'number', unit: 'hours' },
      { k: 'leave.annualHours', label: 'Annual leave balance today', type: 'number', unit: 'hours' },
      { k: 'leave.annualAsOf', label: 'Date of that balance', type: 'date' },
      { k: 'leave.annualAccrual', label: 'Annual leave accrual', type: 'select', options: [['', 'Choose one'], ['4', '4 hours a pay period (under 3 years)'], ['6', '6 hours a pay period (3 to 15 years)'], ['8', '8 hours a pay period (15 years or more)']] },
      { k: 'leave.annualUsePerYear', label: 'Annual leave you expect to use each year', type: 'number', unit: 'hours' },
      { k: 'leave.annualCeiling', label: 'Carryover ceiling', type: 'number', unit: 'hours', help: '240 for most employees, 360 overseas, 720 for SES.' },
      { k: 'leave.annualAtSep', label: 'Or enter the expected balance at separation instead', type: 'number', unit: 'hours' }
    ] },
    { id: 'ss', title: 'Social Security', intro: 'Your Social Security statement assumes you keep earning your current salary until you claim. Run the estimate at ssa.gov with future earnings set to $0 from your retirement date, and enter those figures here.', fields: [
      { k: 'ss.ss62', label: 'Zero future earnings estimate at 62', type: 'money', unit: 'a month', help: 'Also sets the FERS supplement.' },
      { k: 'ss.ssFra', label: 'Zero future earnings estimate at full retirement age', type: 'money', unit: 'a month', help: 'Boldin asks for this figure.' },
      { k: 'ss.ss70', label: 'Zero future earnings estimate at 70', type: 'money', unit: 'a month' },
      { k: 'ss.estimateDate', label: 'Date of those estimates', type: 'date' },
      { k: 'ss.claimAgeY', label: 'Planned claiming age, years', type: 'number', unit: 'years' },
      { k: 'ss.claimAgeM', label: 'And months', type: 'number', unit: 'months' },
      { k: 'ss.postRetEarnings', label: 'Wages you expect to earn each year after retiring, before 62', type: 'money', unit: 'a year', help: 'Wages and self employment income reduce the supplement. Leave blank if none.' }
    ] },
    { id: 'insurance', title: 'Insurance', intro: 'These carry more permanent consequences than any other step except the dates.', fields: [
      { k: 'insurance.fehbStart', label: 'Date your FEHB coverage began without a break', type: 'date', help: 'Coverage as a family member on someone else’s FEHB counts. Medicare does not.' },
      { k: 'insurance.fehbPremium', label: 'FEHB annuitant premium, monthly', type: 'money', unit: 'a month', help: 'From OPM’s annuitant premium table for your plan and enrollment code. Not the biweekly employee premium.' },
      { k: 'insurance.fedvipPremium', label: 'FEDVIP dental and vision, monthly', type: 'money', unit: 'a month' },
      { k: 'insurance.fegliBasicStart', label: 'Date FEGLI Basic began', type: 'date' },
      { k: 'insurance.fegliAStart', label: 'Date Option A began (if enrolled)', type: 'date' },
      { k: 'insurance.fegliBStart', label: 'Date Option B began (if enrolled)', type: 'date' },
      { k: 'insurance.fegliCStart', label: 'Date Option C began (if enrolled)', type: 'date' },
      { k: 'insurance.medInflation', label: 'Medical inflation assumption', type: 'number', unit: 'percent a year', help: 'Should be higher than general inflation.' }
    ] },
    { id: 'survivor', title: 'Survivor', intro: 'The survivor election decides whether your spouse keeps FEHB after your death, not just how much they receive.', fields: [
      { k: 'survivor.election', label: 'Election to model', type: 'radio', options: [['full', 'Full: 50 percent to the survivor, costs 10 percent'], ['partial', 'Partial: 25 percent, costs 5 percent'], ['none', 'None']], show: function (i) { return i.person.married === 'yes'; } },
      { k: 'survivor.longevityRetiree', label: 'Your planning age', type: 'number', unit: 'years', help: 'For pricing the election. Leave blank to use the longevity age on the Assumptions step.' },
      { k: 'survivor.longevitySpouse', label: 'Spouse’s planning age', type: 'number', unit: 'years', show: function (i) { return i.person.married === 'yes'; } }
    ] },
    { id: 'money', title: 'Spending and savings', intro: 'Build spending from twelve months of transaction exports, not from memory. Remembered budgets are wrong by a wide margin in both directions.', fields: [
      { k: 'money.spendSource', label: 'Where do the spending figures come from?', type: 'select', options: [['', 'Choose one'], ['register', 'Twelve months of transaction exports'], ['partial', 'A few months of exports'], ['memory', 'Memory or a budget']] },
      { k: 'money.spendFull', label: 'FULL lens: everything leaving your accounts each month today', type: 'money', unit: 'a month' },
      { k: 'money.spendCurrent', label: 'CURRENT lens: FULL less one time items', type: 'money', unit: 'a month' },
      { k: 'money.spendRetired', label: 'RETIRED lens: what you will spend each month in retirement', type: 'money', unit: 'a month', req: true, help: 'CURRENT less what ends at retirement (commuting, the FERS contribution, TSP contributions, FICA) plus what begins (FEHB at the annuitant rate, travel).' },
      { k: 'money.tspTrad', label: 'TSP Traditional balance', type: 'money' },
      { k: 'money.tspRoth', label: 'TSP Roth balance', type: 'money' },
      { k: 'money.iraTrad', label: 'Traditional IRA balance', type: 'money' },
      { k: 'money.iraRoth', label: 'Roth IRA balance', type: 'money' },
      { k: 'money.taxable', label: 'Taxable brokerage balance', type: 'money' },
      { k: 'money.cash', label: 'Cash and savings', type: 'money' },
      { k: 'money.balancesAsOf', label: 'Statement date for those balances', type: 'date' },
      { k: 'money.otherIncome', label: 'Other monthly income in retirement (optional)', type: 'money', unit: 'a month', help: 'For example VA disability compensation, a spouse’s pension or rental income.' },
      { k: 'money.otherIncomeLabel', label: 'What it is', type: 'text', show: function (i) { return !!i.money.otherIncome; } },
      { k: 'money.otherIncomeStart', label: 'When it starts', type: 'date', show: function (i) { return !!i.money.otherIncome; } }
    ] },
    { id: 'assumptions', title: 'Assumptions', intro: 'Every figure that depends on one of these is labeled as an estimate.', fields: [
      { k: 'assumptions.inflation', label: 'General inflation', type: 'number', unit: 'percent a year' },
      { k: 'assumptions.dietCola', label: 'FERS annuity COLA from 62 (the diet COLA)', type: 'number', unit: 'percent a year', help: 'For 2026 it was 2.0 percent. The annuity gets nothing before 62.' },
      { k: 'assumptions.returnPct', label: 'Portfolio return', type: 'number', unit: 'percent a year', help: 'Match it to what your TSP funds actually hold.' },
      { k: 'assumptions.longevity', label: 'Longevity age to plan to', type: 'number', unit: 'years' }
    ] }
  ];
  var STEP_FOR_TAB = { dates: 'dates', annuity: 'pay', supplement: 'ss', leave: 'leave', insurance: 'insurance', survivor: 'survivor', income: 'money', boldin: 'assumptions' };

  function stepDone(st) {
    var i = state.inputs;
    var req = st.fields.filter(function (f) { return f.req && (!f.show || f.show(i)); });
    if (!req.length) return st.fields.some(function (f) { return f.type !== 'ymd' && f.type !== 'history' && get(f.k); });
    return req.every(function (f) { return !!get(f.k); });
  }

  function fieldHtml(f) {
    var i = state.inputs, id = 'f-' + f.k.replace(/\./g, '-');
    var hidden = f.show && !f.show(i) ? ' hidden' : '';
    var help = f.help ? '<span class="help" id="' + id + '-help">' + rich(f.help) + '</span>' : '';
    var desc = f.help ? ' aria-describedby="' + id + '-help"' : '';
    var v = get(f.k);
    var inner = '';
    if (f.type === 'radio') {
      return '<fieldset class="field" data-field="' + esc(f.k) + '"' + hidden + ' style="border:0;padding:0;margin:0 0 16px"><legend class="label" style="font-weight:600;padding:0;margin-bottom:4px">' + rich(f.label) + '</legend>' + help +
        '<div class="choices">' + f.options.map(function (o) { return '<label><input type="radio" name="' + id + '" data-k="' + esc(f.k) + '" value="' + esc(o[0]) + '"' + (v === o[0] ? ' checked' : '') + '> <span>' + rich(o[1]) + '</span></label>'; }).join('') + '</div></fieldset>';
    }
    if (f.type === 'ymd') {
      var pre = f.prefix;
      inner = '<div class="ymd" role="group" aria-labelledby="' + id + '-l">' + [['Y', 'Years'], ['M', 'Months'], ['D', 'Days']].map(function (u) {
        return '<label>' + u[1] + '<input type="number" inputmode="numeric" min="0" data-k="' + esc(pre + u[0]) + '" value="' + esc(get(pre + u[0]) || '') + '"></label>';
      }).join('') + '</div>';
      return '<div class="field" data-field="' + esc(f.k) + '"' + hidden + '><span class="label" id="' + id + '-l">' + rich(f.label) + '</span>' + help + inner + '</div>';
    }
    if (f.type === 'history') {
      var rows = (i.pay.history || []);
      inner = '<div class="tablewrap"><table class="hist"><thead><tr><th scope="col">Effective date</th><th scope="col">Annual basic pay</th><th scope="col"><span class="muted">Remove</span></th></tr></thead><tbody>' +
        rows.map(function (r, n) { return '<tr><td><input type="date" data-hist="' + n + '" data-col="date" value="' + esc(r.date) + '" aria-label="Effective date, row ' + (n + 1) + '"></td><td><input type="text" inputmode="decimal" data-hist="' + n + '" data-col="rate" value="' + esc(r.rate) + '" aria-label="Annual basic pay, row ' + (n + 1) + '"></td><td><button type="button" class="btn ghost" data-act="hist-del" data-n="' + n + '" aria-label="Remove row ' + (n + 1) + '">Remove</button></td></tr>'; }).join('') +
        '</tbody></table></div><button type="button" class="btn ghost" data-act="hist-add">Add a rate</button>';
      return '<div class="field" data-field="' + esc(f.k) + '"' + hidden + '><span class="label">' + rich(f.label) + '</span>' + help + inner + '</div>';
    }
    if (f.type === 'select') {
      inner = '<select id="' + id + '" data-k="' + esc(f.k) + '"' + desc + '>' + f.options.map(function (o) { return '<option value="' + esc(o[0]) + '"' + ((v || '') === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>';
    } else {
      var type = f.type === 'date' ? 'date' : 'text';
      var mode = f.type === 'money' || f.type === 'number' ? ' inputmode="decimal"' : '';
      inner = '<input id="' + id + '" type="' + type + '"' + mode + ' data-k="' + esc(f.k) + '" value="' + esc(v || '') + '"' + desc + (f.type === 'money' ? ' placeholder="$"' : '') + '>';
      if (f.unit) inner = '<div class="with-unit">' + inner + '<span class="unit">' + esc(f.unit) + '</span></div>';
    }
    return '<div class="field" data-field="' + esc(f.k) + '"' + hidden + '><label for="' + id + '">' + rich(f.label) + '</label>' + help + inner + '</div>';
  }

  function previewDates() {
    var ctx = P.context(state.inputs);
    if (!ctx.ed.ok) return '<div class="note">Enter your date of birth and retirement SCD to see your eligibility dates here.</div>';
    var secs = P.sections(ctx, ['dates']);
    return renderBlocks(secs[0].blocks.slice(0, 3));
  }

  function renderAnswers() {
    var st = STEPS[state.step];
    var html = '<div class="page-title"><h2>Answers</h2><span class="muted small">Saved in this browser as you type</span></div>';
    html += '<nav class="stepper" aria-label="Interview steps">' + STEPS.map(function (s, n) {
      return '<a href="#answers/' + s.id + '" data-step="' + n + '"' + (n === state.step ? ' aria-current="step"' : '') + ' class="' + (stepDone(s) ? 'done' : '') + '">' + (n + 1) + '. ' + esc(s.title) + '</a>';
    }).join('') + '</nav>';
    html += '<section class="card"><h2>' + (state.step + 1) + '. ' + esc(st.title) + '</h2><p class="muted">' + rich(st.intro) + '</p>';
    if (st.preview) html += '<div class="preview-box" id="preview">' + previewDates() + '</div>';
    html += '<form id="form" novalidate>' + st.fields.map(fieldHtml).join('') + '</form>';
    html += '<div class="row-actions">' + (state.step > 0 ? '<a class="btn ghost" href="#answers/' + STEPS[state.step - 1].id + '">Back</a>' : '') +
      (state.step < STEPS.length - 1 ? '<a class="btn" href="#answers/' + STEPS[state.step + 1].id + '">Next: ' + esc(STEPS[state.step + 1].title) + '</a>' : '<a class="btn" href="#plan">See the plan</a>') + '</div></section>';
    return html;
  }

  function refreshVisibility() {
    var i = state.inputs, st = STEPS[state.step];
    st.fields.forEach(function (f) {
      var el = document.querySelector('[data-field="' + f.k + '"]');
      if (el) el.hidden = !!(f.show && !f.show(i));
    });
    var pv = $('#preview');
    if (pv) pv.innerHTML = previewDates();
    $$('.stepper a').forEach(function (a, n) { a.classList.toggle('done', stepDone(STEPS[n])); });
  }

  /* ------------------------------------------------------------------ */
  /* Tabs                                                                 */
  /* ------------------------------------------------------------------ */

  var TABS = [
    ['start', 'Start'], ['answers', 'Answers'], ['dates', 'Dates'], ['annuity', 'Annuity'], ['supplement', 'Supplement'],
    ['leave', 'Leave'], ['insurance', 'Insurance'], ['survivor', 'Survivor'], ['income', 'Income'], ['boldin', 'Boldin'],
    ['plan', 'Plan'], ['help', 'Help'], ['settings', 'Settings']
  ];

  function renderTabs() {
    $('#tabs').innerHTML = TABS.map(function (t) { return '<a href="#' + t[0] + '"' + (state.tab === t[0] ? ' aria-current="page"' : '') + '>' + t[1] + '</a>'; }).join('');
    // Scroll only the tab strip, never the page, so the current tab stays in view.
    var nav = $('#tabs'), cur = $('#tabs a[aria-current="page"]');
    if (nav && cur) nav.scrollLeft = Math.max(0, cur.offsetLeft - (nav.clientWidth - cur.offsetWidth) / 2);
  }

  function stopBanner(ctx) {
    if (ctx.stop) return '<div class="note stop">Special provision coverage: this planner covers Regular FERS only, so these figures do not apply. Ask the benefits office for a special provision estimate.</div>';
    if (ctx.unsure) return '<div class="note warn">You are not sure whether your position has special provision coverage. If it does, none of these figures apply. Confirm it with the benefits office.</div>';
    return '';
  }

  function renderResultTab(tab, title) {
    var ctx = P.context(state.inputs);
    var stepId = STEP_FOR_TAB[tab];
    var html = '<div class="page-title"><h2>' + esc(title) + '</h2>' + (stepId ? '<a class="change" href="#answers/' + stepId + '">Change answers</a>' : '') + '</div>';
    if (!hasStarted()) html += '<div class="note">No answers yet. <a href="#answers/about">Start the interview</a>, or <a href="#settings">load the worked example</a> from Settings to see how this tab reads.</div>';
    html += stopBanner(ctx);
    if (state.inputs.sample) html += '<div class="note info">You are looking at the invented worked example from Part 10 of the user guide. Clear it in Settings before entering your own answers.</div>';
    html += renderSections(P.sections(ctx, P.TABS[tab]));
    if (tab === 'boldin') html += '<div class="row-actions"><button type="button" class="btn" data-act="copy-md">Copy the Entry Sheet as Markdown</button><button type="button" class="btn ghost" data-act="save-md">Save it as a .md file</button></div>';
    return html;
  }

  function renderStart() {
    var ctx = P.context(state.inputs);
    var done = STEPS.filter(stepDone).length;
    if (!hasStarted()) {
      return '<section class="card hero"><h2>Your FERS retirement, worked out from your own answers</h2>' +
        '<p>Answer ten short steps and the planner derives your eligibility dates, prices the annuity and the supplement, converts your leave, tests the insurance rules, prices the survivor election, lines up income against spending, and writes the exact values to type into Boldin. Save the whole plan as a Word file or a PDF.</p>' +
        '<div class="points">' +
        '<div class="point"><strong>Eligibility first</strong>The dates come from your date of birth and service, before any preferred date.</div>' +
        '<div class="point"><strong>Every figure shows its work</strong>Arithmetic and sources sit next to each number. Estimates are labeled.</div>' +
        '<div class="point"><strong>Private by design</strong>No account, no tracking. Your answers stay in this browser on this device.</div>' +
        '</div>' +
        '<div class="row-actions"><a class="btn" href="#answers/about">Start the interview</a><button type="button" class="btn ghost" data-act="sample">See the worked example</button><button type="button" class="btn ghost" data-act="import">Open a saved answers file</button></div>' +
        '<p class="small muted">Regular FERS voluntary retirement only. Not financial, legal or tax advice, and not affiliated with OPM. Do not use it on a government computer.</p></section>';
    }
    var html = '<div class="page-title"><h2>' + (ctx.name ? esc(ctx.name) : 'Your plan') + '</h2><a class="change" href="#plan">Save as Word or PDF</a></div>';
    html += stopBanner(ctx);
    if (state.inputs.sample) html += '<div class="note info">This is the invented worked example from Part 10 of the user guide. Clear it in Settings before entering your own answers.</div>';
    html += '<section class="card"><h2>Interview progress</h2><div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="' + STEPS.length + '" aria-valuenow="' + done + '" aria-label="Steps answered"><span style="width:' + Math.round(done / STEPS.length * 100) + '%"></span></div><p class="small">' + done + ' of ' + STEPS.length + ' steps answered. <a href="#answers/' + (STEPS.filter(function (s) { return !stepDone(s); })[0] || STEPS[0]).id + '">Continue</a></p></section>';
    html += renderSections(P.sections(ctx, P.TABS.start));
    return html;
  }

  function renderPlan() {
    var doc = P.document(state.inputs);
    var html = '<div class="page-title"><h2>Your plan</h2><span class="muted small">' + esc(doc.fileBase) + '</span></div>';
    html += '<section class="card"><h2>Save the plan</h2><p>The Word file opens in Word, Google Docs and Pages and stays editable. The PDF is fixed. Both are built here in your browser; nothing is uploaded.</p>' +
      '<div class="note warn">' + esc(doc.warning) + '</div>' +
      '<div class="row-actions"><button type="button" class="btn" data-act="docx">Download Word (.docx)</button><button type="button" class="btn" data-act="pdf">Download PDF</button><button type="button" class="btn ghost" data-act="export">Save answers file</button></div>' +
      '<p class="small muted">The plan below is word for word what the files contain.</p></section>';
    html += stopBanner(doc.ctx);
    html += '<section class="card"><h2>' + esc(doc.title) + '</h2><p class="muted">' + esc(doc.subtitle) + '</p><p class="small">' + esc(doc.disclaimer) + '</p></section>';
    html += renderSections(doc.sections, { numbered: true });
    return html;
  }

  function renderHelp() {
    var keys = Object.keys(G.terms).sort(function (a, b) { return a.toLowerCase() < b.toLowerCase() ? -1 : 1; });
    return '<div class="page-title"><h2>Help</h2></div>' +
      '<section class="card"><h2>How to use it</h2><ul class="blist">' +
      '<li>Work through the Answers steps in order. Each step saves as you type.</li>' +
      '<li>Read the Dates tab before choosing a preferred date. The dates the rules give you are the reference case; your preferred date is a scenario measured against them.</li>' +
      '<li>Each result tab shows its arithmetic and its sources. Figures labeled ESTIMATE depend on an assumption.</li>' +
      '<li>Open the Boldin tab after any change and type the rows into Boldin in order. A value counts as entered when the next Boldin export shows it.</li>' +
      '<li>Save the plan as Word or PDF from the Plan tab, and save your answers file from Settings so you can pick up on another device.</li>' +
      '<li>Hover over, tap or tab to any dotted term to see what it means.</li></ul></section>' +
      '<section class="card"><h2>What it does not do</h2><ul class="blist">' +
      '<li>Special provision retirement (law enforcement, firefighters, air traffic controllers and similar), CSRS, disability and discontinued service retirement.</li>' +
      '<li>Taxes, Roth conversions, market simulations and Chance of Success. Boldin does those; this planner makes sure Boldin is given the right numbers.</li>' +
      '<li>Advice. Confirm every figure with the benefits office and every irreversible election with a licensed fiduciary.</li></ul>' +
      '<p>For the full method, the Claude project in the repository runs a fourteen block interview against your own documents. See <a href="https://github.com/JBrady0850/fers-planning-project#readme" rel="noopener">the README</a>.</p></section>' +
      '<section class="card"><h2>Terms</h2><dl>' + keys.map(function (k) { return '<dt style="font-weight:600;margin-top:10px">' + esc(k) + '</dt><dd style="margin:2px 0 0">' + esc(G.terms[k]) + '</dd>'; }).join('') + '</dl></section>';
  }

  function renderSettings() {
    var saved = state.inputs.savedAt ? new Date(state.inputs.savedAt) : null;
    return '<div class="page-title"><h2>Settings</h2></div>' +
      '<section class="card"><h2>Your answers</h2><p>' + (saved ? 'Last saved ' + esc(saved.toLocaleString()) + ' in this browser.' : 'Nothing saved yet.') + '</p>' +
      '<div class="row-actions"><button type="button" class="btn" data-act="export">Save answers file</button><button type="button" class="btn ghost" data-act="import">Open answers file</button><button type="button" class="btn ghost" data-act="sample">Load the worked example</button><button type="button" class="btn danger" data-act="clear">Clear my answers</button></div>' +
      '<p class="small muted">The answers file is plain JSON. Keep it somewhere private: it holds your dates of birth, pay and balances. Opening it on another device carries your plan there.</p>' +
      '<input type="file" id="importFile" accept="application/json,.json" hidden></section>' +
      '<section class="card"><h2>Add it to your home screen</h2><ul class="blist">' +
      '<li><strong>iPhone or iPad (Safari):</strong> tap Share, then Add to Home Screen.</li>' +
      '<li><strong>Android (Chrome):</strong> tap the three-dot menu, then Install app or Add to Home screen.</li>' +
      '<li><strong>Windows or Mac (Chrome or Edge):</strong> click the install icon at the right end of the address bar.</li></ul>' +
      '<img class="qr" src="icons/open-app-qr.png" alt="QR code that opens the planner" width="160" height="160"></section>' +
      '<section class="card"><h2>Privacy</h2><p>There is no account, no analytics and no tracking. The page makes no network requests with your answers. The Word and PDF files are built in your browser by two open source libraries that ship with the app. Clearing your browser data clears your answers, so save an answers file.</p></section>' +
      '<section class="card"><h2>About</h2><p>FERS Planner ' + VERSION + '. Rules file: program year ' + R.programYear + ', checked ' + esc(R.checked) + '. Part of the <a href="https://github.com/JBrady0850/fers-planning-project" rel="noopener">FERS Planning Project</a>, MIT licensed.</p>' +
      '<p class="small">Word files are built with docx (MIT) and PDFs with pdfmake (MIT) using the Roboto typeface (Apache 2.0).</p></section>';
  }

  function render() {
    renderTabs();
    var m = $('#main'), html;
    switch (state.tab) {
      case 'start': html = renderStart(); break;
      case 'answers': html = renderAnswers(); break;
      case 'plan': html = renderPlan(); break;
      case 'help': html = renderHelp(); break;
      case 'settings': html = renderSettings(); break;
      default: html = renderResultTab(state.tab, (TABS.filter(function (t) { return t[0] === state.tab; })[0] || [0, ''])[1]);
    }
    m.innerHTML = html;
    $('#fresh').textContent = 'Rules: ' + R.programYear + ' figures, checked ' + E.longDate(E.parse(R.checked));
  }

  function route() {
    var h = (location.hash || '#start').slice(1).split('/');
    var tab = h[0] || 'start';
    if (!TABS.some(function (t) { return t[0] === tab; })) tab = 'start';
    var changed = tab !== state.tab;
    state.tab = tab;
    if (tab === 'answers' && h[1]) {
      var n = STEPS.findIndex(function (s) { return s.id === h[1]; });
      if (n >= 0) { changed = changed || n !== state.step; state.step = n; }
    }
    render();
    if (changed) { window.scrollTo(0, 0); }
  }

  /* ------------------------------------------------------------------ */
  /* Events                                                               */
  /* ------------------------------------------------------------------ */

  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.dataset && t.dataset.k) {
      set(t.dataset.k, t.type === 'radio' ? t.value : t.value.trim());
      if (state.inputs.sample) delete state.inputs.sample;
      save();
      if (t.type === 'radio' || t.tagName === 'SELECT') refreshVisibility();
    }
    if (t.dataset && t.dataset.hist !== undefined) {
      var row = state.inputs.pay.history[+t.dataset.hist];
      if (row) { row[t.dataset.col] = t.value.trim(); save(); }
    }
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.id === 'importFile') return importFile(t.files && t.files[0]);
    if (t.dataset && (t.dataset.k || t.dataset.hist !== undefined)) refreshVisibility();
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-act]');
    if (a) {
      var act = a.dataset.act;
      if (act === 'hist-add') { state.inputs.pay.history.push({ date: '', rate: '' }); save(); render(); }
      if (act === 'hist-del') { state.inputs.pay.history.splice(+a.dataset.n, 1); save(); render(); }
      if (act === 'sample') { state.inputs = E.upgrade(JSON.parse(JSON.stringify(window.FersSample))); state.inputs.sample = true; save(); toast('Loaded the invented worked example.'); location.hash = '#start'; route(); window.scrollTo(0, 0); }
      if (act === 'clear') { if (window.confirm('Clear every answer saved in this browser? This cannot be undone. Save an answers file first if you want to keep them.')) { clearAll(); toast('Answers cleared.'); location.hash = '#start'; route(); } }
      if (act === 'export') exportAnswers();
      if (act === 'import') { var f = $('#importFile'); if (!f) { location.hash = '#settings'; route(); f = $('#importFile'); } if (f) f.click(); }
      if (act === 'docx' || act === 'pdf') build(act, a);
      if (act === 'copy-md') copyMarkdown();
      if (act === 'save-md') saveMarkdown();
      return;
    }
    var tm = e.target.closest('.term');
    if (tm) { e.preventDefault(); showTip(tm, true); return; }
    hideTip();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideTip(); });
  document.addEventListener('mouseover', function (e) { var tm = e.target.closest && e.target.closest('.term'); if (tm) showTip(tm); });
  document.addEventListener('mouseout', function (e) { var tm = e.target.closest && e.target.closest('.term'); if (tm && !tip.pinned) hideTip(); });
  document.addEventListener('focusin', function (e) { var tm = e.target.closest && e.target.closest('.term'); if (tm) showTip(tm); });
  document.addEventListener('focusout', function (e) { var tm = e.target.closest && e.target.closest('.term'); if (tm) hideTip(); });
  window.addEventListener('hashchange', route);
  window.addEventListener('scroll', function () { if (!tip.pinned) hideTip(); }, { passive: true });

  var tip = { el: null, pinned: false };
  function showTip(el, pin) {
    var k = el.dataset.term, def = G.terms[k];
    if (!def) return;
    var t = $('#tip');
    t.innerHTML = '<strong>' + esc(k) + '</strong>' + esc(def);
    t.hidden = false;
    tip.el = el; tip.pinned = !!pin;
    var r = el.getBoundingClientRect(), w = t.offsetWidth, h = t.offsetHeight;
    var left = Math.max(12, Math.min(window.innerWidth - w - 12, r.left));
    var top = r.bottom + 8;
    if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 8);
    t.style.left = left + 'px'; t.style.top = top + 'px';
    el.setAttribute('aria-describedby', 'tip');
  }
  function hideTip() {
    var t = $('#tip'); if (t) t.hidden = true;
    if (tip.el) tip.el.removeAttribute('aria-describedby');
    tip.el = null; tip.pinned = false;
  }

  /* ------------------------------------------------------------------ */
  /* Files                                                                */
  /* ------------------------------------------------------------------ */

  function stamp() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function exportAnswers() {
    var data = JSON.parse(JSON.stringify(state.inputs));
    data.app = 'FERS Planner ' + VERSION;
    window.FersExport.saveBlob(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), 'fers-planner-answers-' + stamp() + '.json');
    toast('Answers file saved.');
  }
  function importFile(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (!data || typeof data !== 'object' || !data.person) throw new Error('not an answers file');
        state.inputs = E.upgrade(data);
        if (data.sample) state.inputs.sample = true;
        save(); toast('Answers opened.'); location.hash = '#start'; route();
      } catch (err) { toast('That file is not a FERS Planner answers file.'); }
    };
    reader.readAsText(file);
  }
  function build(kind, btn) {
    var doc = P.document(state.inputs);
    btn.disabled = true; var label = btn.textContent; btn.textContent = 'Building the file...';
    var job = kind === 'docx' ? window.FersExport.docx(doc) : window.FersExport.pdf(doc);
    job.then(function () { toast((kind === 'docx' ? 'Word file' : 'PDF') + ' saved: ' + doc.fileBase + (kind === 'docx' ? '.docx' : '.pdf')); })
      .catch(function (err) { toast('The file could not be built: ' + (err && err.message ? err.message : 'unknown error')); })
      .then(function () { btn.disabled = false; btn.textContent = label; });
  }
  function entryMarkdown() { return window.FersExport.entrySheetMarkdown(P.document(state.inputs)); }
  function copyMarkdown() {
    var md = entryMarkdown();
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(md).then(function () { toast('Entry Sheet copied.'); }, function () { saveMarkdown(); });
    else saveMarkdown();
  }
  function saveMarkdown() {
    window.FersExport.saveBlob(new Blob([entryMarkdown()], { type: 'text/markdown' }), 'Boldin Entry Sheet ' + stamp() + '.md');
    toast('Entry Sheet saved.');
  }

  /* ------------------------------------------------------------------ */
  /* Start                                                                */
  /* ------------------------------------------------------------------ */

  if (/^https?:$/.test(location.protocol) && 'serviceWorker' in navigator) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () { /* offline use is optional */ }); });
  }
  window.FersApp = { version: VERSION, state: state, render: render };
  route();
})();
