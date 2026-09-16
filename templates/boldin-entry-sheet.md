# BOLDIN ENTRY SHEET, BLANK TEMPLATE

Copy this file to `08 Boldin Entry Sheets/Boldin Entry Sheet YYYY-MM-DD.md` and fill it in. One sheet per date. The specification that governs it is `docs/07-boldin-field-map-and-entry-engine.md`, Part 4.

Do not delete rows from a sheet. A row that was not entered is carried forward into the next sheet with its status intact.

---

## HEADER

| Item | Value |
|---|---|
| Sheet date | YYYY-MM-DD |
| Scenario this applies to | |
| Triggered by | Document processed, monthly cycle, or analysis produced |
| Documents processed | File names |
| Prior sheet | `Boldin Entry Sheet YYYY-MM-DD.md`, or none |
| Rows carried forward from the prior sheet | Count |

---

## ROWS

Order by impact. The field that moves the plan most goes first.

| # | Screen | Sub-section | Item | Field | Enter this | Replaces | Source | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | NOT STARTED |
| 2 | | | | | | | | NOT STARTED |
| 3 | | | | | | | | NOT STARTED |
| 4 | | | | | | | | NOT STARTED |
| 5 | | | | | | | | NOT STARTED |

**Status values.** `NOT STARTED`, `ENTERED`, `BLOCKED`, `CARRIED FORWARD`.

**Column rules.**

- **Screen and Sub-section** name the Boldin location exactly as Part 1 of the field map lists it.
- **Item** names the specific entry being edited, such as `FERS Annuity pre-62` or `TSP Traditional`.
- **Enter this** carries the unit inside the value. Write `$1,762 monthly`, not `1762`. Write `0%`, not `0`.
- **Replaces** states the current value, or `unknown, read it off the screen first`.
- **Source** is a file name and page, a report name, `user-stated YYYY-MM-DD`, or a defect class number from the Boldin validation guide. No row ships without one.

---

## STRUCTURAL AND IRREVERSIBLE ROWS

List any row above that changes every downstream figure, and state the consequence in one line each. Typical members of this list are the withdrawal strategy, the scenario base date, the survivor election, and the retirement age on the Summary screen.

| Row # | Why it is structural | Consequence to expect |
|---|---|---|
| | | |

---

## BLOCKED ROWS

| Row # | Field | Document that would unblock it | Added to Open Items |
|---|---|---|---|
| | | | Yes or no |

---

## WHAT CHANGES AS A RESULT

State the expected direction of the effect before anything is entered, so that a surprise afterward is a signal rather than a mystery.

- Chance of Success: expected to rise, fall, or hold, and roughly why.
- Net worth at longevity: expected direction.
- The year the plan is tightest: expected to move or hold.

---

## RE-EXPORT INSTRUCTION

1. Enter every row above, marking each `ENTERED` as it is done.
2. Export the planner summary CSV for the scenario, and download the PDF report.
3. Save both to `05 Boldin` with the date in the file name.
4. Say: `Run a Boldin validation against the export dated YYYY-MM-DD.`
5. The validation writes `05 Boldin/Boldin Validation YYYY-MM-DD.md`.

This sheet is not finished until the validation confirms the values landed. A value is entered when the export shows it, not when the sheet says to type it.

---

## FIELD MAP CORRECTIONS FOUND

Anything on screen that did not match `docs/07-boldin-field-map-and-entry-engine.md`. Copy each line into the corrections table in that file as well.

| Screen and field | What the field map said | What the screen showed |
|---|---|---|
| | | |

---

## SIGN OFF

| Check | Result |
|---|---|
| Every row has a source | |
| Every row states what it replaces | |
| Blocked rows are in Open Items | |
| Export saved to `05 Boldin` | |
| Validation run and defects carried to the next sheet | |
