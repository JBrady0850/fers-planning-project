# Contributing

The most valuable contribution to this project is a **correction with a primary source**.

Federal benefit rules are detailed, they change, and published guidance about them is frequently wrong. If you find an error here, or you can close one of the unverified items, open an issue or a pull request.

## Before you open anything

**Never include personal information.** No Social Security numbers, no account numbers, no leave and earnings statements, no benefit estimates, no tax returns, no real balances, no real dates of birth. If you need to illustrate a bug with numbers, invent them and say they are invented.

## The bar for a rule change

Every change to `docs/06-fers-rules-reference.md`, or to any rule stated in `MASTER-PROMPT.md`, needs:

1. **A direct URL to a primary source.** In descending order of authority: the United States Code, the Code of Federal Regulations via eCFR, the Federal Register, OPM Benefits Administration Letters, the OPM CSRS/FERS Handbook, opm.gov program pages, then tsp.gov, ssa.gov, cms.gov and irs.gov for their own programs.
2. **The quoted text**, or the specific table and row, that establishes the rule. Not a summary of it.
3. **The date you accessed it.**

Secondary sources such as FEDweek, Government Executive, FedSmith, NARFE and MyFederalRetirement are useful for corroboration and for spotting what changed. They are not sufficient on their own for a rule statement. Where a secondary source is the only support, the reference file says so explicitly, and a contribution that replaces one of those with a primary citation is exactly what this project needs.

**Where sources genuinely conflict, say so rather than picking one.** The reference file already carries several flagged conflicts. Adding a well documented conflict is a contribution. Silently resolving one is not.

## Priority: the ten unverified items

`docs/06-fers-rules-reference.md` ends with a list of items that could not be verified or where sources disagree. Closing any of them with a primary citation is the highest value contribution available. The open ones include:

- The Self Plus One or Self and Family enrollment condition for a surviving spouse's FEHB continuation
- The General Schedule night differential and hazardous duty pay exclusion from the high-3
- The tax treatment of the annual leave lump sum payment
- The required minimum distribution applicable age for the 1959 birth year
- The current FEGLI pre-65 Basic rate, where two OPM pages disagree
- Whether an employee who retires on an immediate annuity but fails the FEHB five year rule is eligible for Temporary Continuation of Coverage

## Annual maintenance

Dollar figures in this repository are 2026 program year values. Every year the following change, and a pull request updating them with citations is welcome:

- TSP elective deferral, catch-up, and annual additions limits
- IRA contribution and catch-up limits
- The retirement earnings test exempt amount
- CSRS and FERS cost of living adjustments
- FEHB and FEDVIP premiums
- Medicare Part B premium, deductible, and IRMAA brackets
- Social Security taxation thresholds, which do not change, and saying so is itself useful

## Other contributions

**A CSRS or CSRS Offset version.** This system is FERS only and will mislead a CSRS employee. A parallel prompt would be a substantial and welcome addition.

**Deeper special provision coverage.** Law enforcement officers, firefighters, air traffic controllers, nuclear materials couriers, Customs and Border Protection officers, and military reserve technicians branch differently at almost every rule. The current coverage catches the branch but is thinner than the Regular FERS treatment.

**Validation guides for other planning tools.** `docs/05-boldin-setup-and-validation.md` is Boldin specific. The same defect classes apply to other planners with different field names.

**Report specifications.** New artifacts in `docs/04-report-catalog.md` need a purpose, a cadence, a method, an output, and the same definition of done as everything else.

**Plain language improvements.** The audience is a federal employee who has never used an AI tool. If a section assumes knowledge it should not, that is a bug.

## Writing conventions

The documents follow a deliberate house style. Match it:

- Active voice, short paragraphs, no filler, no corporate language, no cliches, no emojis
- **No em dashes.** Use commas or rewrite the sentence.
- Separate fact from inference, and label inference as inference
- Every dollar figure, date and percentage carries a source or an `[ESTIMATE]` label with the assumption behind it
- Tables for anything with more than three parallel items
- No contractions in the reference and prompt files

## Pull request checklist

- [ ] No personal information anywhere in the diff
- [ ] Every rule change carries a primary source URL and the quoted text
- [ ] Access date included for each new citation
- [ ] House style followed, including no em dashes
- [ ] If a rule in `docs/06-fers-rules-reference.md` changed, `MASTER-PROMPT.md` was checked for the same rule
- [ ] If the change affects the user guide, `docs/FERS-Planning-Project-User-Guide.pdf` was noted as needing a rebuild
- [ ] `CHANGELOG.md` updated

## What this project will not accept

- Anything that turns this into financial advice, or that softens the disclaimer
- Affiliate links, referral codes, or vendor promotion
- Rule statements without primary sources
- Guidance encouraging anyone to skip their agency benefits officer or a licensed fiduciary on an irreversible election
- Personal data of any kind, including your own
