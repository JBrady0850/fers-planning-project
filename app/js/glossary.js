/* Plain-language definitions for every term the planner shows. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FersGlossary = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var G = {
    'MRA': 'Minimum Retirement Age. Between 55 and 57 depending on your year of birth; 57 for anyone born in 1970 or later.',
    'SCD': 'Service Computation Date. A date set as if all your creditable service ran without a break. There are several, and only the retirement SCD governs retirement.',
    'Retirement SCD': 'The SCD used for retirement eligibility and the annuity. It is not printed on the SF 50; request it in writing from the benefits office.',
    'Leave SCD': 'The SCD that sets your annual leave accrual rate. It is in Block 31 of the SF 50 and on the leave and earnings statement, and it is often earlier than the retirement SCD.',
    'High-3': 'The highest average of your rates of basic pay over any three consecutive years, weighted by how long each rate was in effect.',
    'Basic pay': 'Your base rate plus locality pay. Overtime, bonuses, awards, allowances and the annual leave lump sum are not basic pay.',
    'Locality pay': 'The geographic adjustment added to base pay. It is part of basic pay and counts toward the high-3.',
    'MRA+10': 'Retiring at the MRA with 10 to 29 years. The annuity is reduced 5/12 of 1 percent for each month you are under 62 when it starts, for life, and there is no supplement.',
    'MRA+20': 'Separating under MRA+10 with at least 20 years and postponing the annuity to start at or after 60, which removes the age reduction.',
    'Postponed retirement': 'Separating after reaching MRA+10 and choosing to start the annuity later. FEHB and FEGLI can be picked up again when the annuity starts.',
    'Deferred retirement': 'Separating before you are eligible for an immediate annuity. The annuity starts later, and FEHB, FEGLI and FEDVIP can never be re-enrolled.',
    'Immediate annuity': 'An annuity that starts within 31 days of separation, the first day of the month after a voluntary separation.',
    'Commencing date': 'The date the annuity starts. For a voluntary retirement, the first day of the month after separation.',
    'Supplement': 'The FERS Special Retirement Supplement. A monthly payment from an immediate unreduced retirement until 62 that stands in for the Social Security earned during FERS service. It is never adjusted for inflation.',
    'Earnings test': 'Wages earned while the supplement is paid, above the yearly exempt amount, reduce it one dollar for every two, from the following July, never by more than that year’s supplement.',
    'COLA': 'Cost of living adjustment. Regular FERS retirees receive none on the annuity until they are 62.',
    'Diet COLA': 'The FERS COLA rule: the full CPI-W rise under 2 percent, 2 percent for a rise of 2 to 3 percent, and the rise less 1 point above 3 percent.',
    'CPI-W': 'The Consumer Price Index for Urban Wage Earners and Clerical Workers, the measure COLAs are based on.',
    'FEHB': 'Federal Employees Health Benefits. To keep it in retirement you need an immediate annuity and five continuous years of coverage right before it starts.',
    'FEGLI': 'Federal Employees’ Group Life Insurance. The five year rule applies to Basic and to each Option separately, and OPM cannot waive it.',
    'BIA': 'Basic Insurance Amount for FEGLI: annual basic pay rounded up to the next $1,000, plus $2,000.',
    'FEDVIP': 'Federal Employees Dental and Vision Insurance Program. No five year rule, but not available on a deferred annuity.',
    'TCC': 'Temporary Continuation of Coverage. Up to 18 months of FEHB after separation at 102 percent of the full premium.',
    'PSHB': 'The Postal Service Health Benefits Program, for Postal employees and annuitants. Unlike FEHB, it generally requires Medicare Part B.',
    'IRMAA': 'Income-related monthly adjustment amount. A Medicare premium surcharge based on income from two years earlier.',
    'Part B': 'Medicare Part B, medical insurance. Optional for an FEHB annuitant, but delaying it costs 10 percent a year for life.',
    'TSP': 'The Thrift Savings Plan. Traditional and Roth balances are taxed differently and are entered as two accounts.',
    'RMD': 'Required minimum distribution from traditional balances. Age 75 for anyone born in 1960 or later, 73 for 1951 through 1958.',
    'FRA': 'Social Security full retirement age. 67 for anyone born in 1960 or later.',
    'PIA': 'Primary Insurance Amount: the Social Security benefit at full retirement age. Boldin asks for this figure.',
    'Zero future earnings estimate': 'A Social Security estimate run at ssa.gov with future earnings set to $0 from your retirement date, instead of the statement that assumes you keep working.',
    'Survivor annuity': 'A monthly annuity for your spouse after your death. The full election pays 50 percent of the base and costs 10 percent; the partial pays 25 percent and costs 5 percent.',
    'Deposit': 'A payment that makes service creditable when no retirement deductions were taken.',
    'Redeposit': 'Repaying a refund of retirement contributions, with interest, so the refunded service counts in the computation.',
    'Military deposit': 'The payment that lets post-1956 military service count. Generally 3 percent of military basic pay plus interest, paid in full before separation.',
    'RI 20-97': 'The form used to get your military earnings from your branch, which prices the military deposit.',
    'SF 3108': 'The application to make a service credit payment for military service, used with SF 3108A.',
    'SF 50': 'Notification of Personnel Action. Block 31 carries the leave SCD, not the retirement SCD.',
    'LES': 'Leave and earnings statement, your pay stub.',
    'Sick leave credit': 'Unused sick leave added to your service for the computation only, converted on OPM’s 2,087 hour chart.',
    'Lump sum': 'Payment for unused annual leave at separation. Taxed as wages and not eligible for the TSP.',
    'Part time proration': 'A factor that scales the annuity by the share of full time hours you actually worked across all FERS service.',
    'VERA': 'Voluntary Early Retirement Authority, an agency early out offer with lower age and service thresholds.',
    'Withdrawal rate': 'The yearly gap between spending and guaranteed income, divided by savings. Over 4 percent is flagged.',
    'RETIRED lens': 'Your current spending less what ends at retirement, plus what begins. The only basis for withdrawal math.',
    'FULL lens': 'Every dollar leaving your accounts today. The only basis for what cash is available now.',
    'CURRENT lens': 'The FULL lens less one time items.',
    'Entry Sheet': 'One row per Boldin field: what to type, where, what it replaces and where the value came from.',
    'Chance of Success': 'Boldin’s share of simulated market paths in which the plan does not run out of money.',
    'Special provision': 'Retirement coverage for law enforcement officers, firefighters, air traffic controllers and a few other groups, with different ages and rules. Not covered by this planner.',
    'Five year rule': 'The requirement to have been covered for the five years right before the annuity starts in order to keep FEHB or FEGLI.',
    'BAL 18-103': 'OPM Benefits Administration Letter 18-103: unused sick leave can complete the 20 years the 1.1 percent multiplier needs.',
    'ESTIMATE': 'A figure that depends on an assumption. It moves when the assumption does.',
    'SOURCED': 'A figure from a published rule, cited in the Sources section.',
    'ENTERED': 'A figure from your own answers.',
    'DFAS': 'Defense Finance and Accounting Service, which handles military retired pay and waivers of it.',
    'Path': 'The rule under which you retire: age 62 with 5 years, age 60 with 20, MRA with 30, MRA with 10, or deferred. Every path needs 5 years of civilian service.'
  };
  // Terms that are marked automatically wherever they appear in the planner's text.
  var AUTO = ['MRA+10', 'MRA+20', 'MRA', 'SCD', 'High-3', 'FEHB', 'FEGLI', 'FEDVIP', 'TCC', 'PSHB', 'IRMAA', 'COLA', 'TSP', 'RMD', 'BIA', 'DFAS', 'RI 20-97', 'SF 3108', 'SF 50', 'BAL 18-103', 'ESTIMATE', 'SOURCED', 'ENTERED', 'CPI-W', 'VERA'];
  return { terms: G, auto: AUTO };
});
