# START HERE: SETTING UP YOUR RETIREMENT PROJECT

This builds a working retirement planning system in Claude Desktop. Budget about ninety minutes for setup and the first interview. The document gathering in Step 4 takes longer than that, and it is normal. You do not need every document before you start.

You do not need to know anything about artificial intelligence to do this. Follow the steps in order.

---

## STEP 1: INSTALL CLAUDE DESKTOP

1. Go to `claude.ai/download` and install the desktop application for your computer.
2. Sign in or create an account.
3. A paid plan is required for the file and folder features used here. The Pro plan is sufficient. Max gives you more headroom on long sessions, which matters during the interview and during a monthly report run.

Turn on Cowork mode when you see it offered. Cowork is the mode that lets Claude read and write files in a folder on your computer rather than only answering in a chat window. Everything in this package depends on that.

---

## STEP 2: BUILD THE PROJECT FOLDER

Pick a real folder on your computer. Any name works, and `FERS Planning` is a reasonable default. It must be a folder on disk, not a browser tab. If you keep it in OneDrive, Google Drive, Dropbox or iCloud, install that service's desktop client so the folder appears in File Explorer or Finder.

**The fast way.** Clone or download this repository, then run the script for your platform. It creates the folder tree and copies the two templates into place.

Windows PowerShell:

```powershell
.\scripts\New-FersWorkspace.ps1 -Path "C:\Users\you\Documents\FERS Planning"
```

macOS or Linux:

```bash
bash scripts/new-fers-workspace.sh ~/Documents/"FERS Planning"
```

**The manual way.** Create these folders yourself:

```
FERS Planning/
    01 Source Documents/
        New Raw Data/
        Old Raw Data/
    02 Baseline/
    03 Monthly Reports/
    04 Analysis/
    05 Boldin/
    06 Open Items/
    07 Archive/
```

Then copy `templates/facts-register.md` into `02 Baseline/` and rename it `Facts Register.md`, and copy `templates/open-items.md` into `06 Open Items/` and rename it `Open Items.md`.

What each folder holds:

| Folder | Contents |
|---|---|
| `01 Source Documents` | Every statement, leave and earnings statement, and export exactly as you received it. Never edit anything in here. |
| `New Raw Data` | This month's bank and credit card CSV exports, waiting to be processed. |
| `Old Raw Data` | Exports already processed, renamed with a year and month prefix. |
| `02 Baseline` | Your Facts Register and your Retirement Readiness Baseline. |
| `03 Monthly Reports` | One subfolder per month. |
| `04 Analysis` | The deeper studies: date comparison, cash bridge, health care, taxes, Social Security. |
| `05 Boldin` | Boldin exports and the validation reports that check them. |
| `06 Open Items` | The running list of unanswered questions. |
| `07 Archive` | Superseded versions. Nothing is ever deleted, only archived. |

**Decide now where the raw documents live.** This workspace will hold leave and earnings statements, TSP statements, benefit estimates and tax returns, which carry account numbers and Social Security numbers. If the folder is shared with anyone, they can read all of it. If it syncs to a personal cloud account, those documents leave your machine.

If you would rather not accept either, keep `01 Source Documents` in a private local folder, connect both folders to the Claude project, and let only finished reports land in the synced or shared one. Claude works the same either way. Decide this before you load anything rather than after.

Do not place any of this on a government system, and check your agency policy before moving anything off one.

---

## STEP 3: CREATE THE PROJECT AND LOAD THE PROMPT

1. Open Claude Desktop.
2. Create a new **Project** and name it `FERS Planning`.
3. Open the project's **Instructions** field.
4. Open the file `MASTER-PROMPT.md` from this repository. Copy everything between the two lines of equals signs. Paste it into the Instructions field and save.
5. Connect your folder. Inside the project, use **Add folder** and select the workspace folder you created in Step 2. Claude can now read and write files there. If you decided to keep source documents private, add that second folder here as well.

The Instructions field is the part that matters. It loads automatically on every conversation inside that project, so you never paste it again and Claude never forgets the rules mid session. Pasting the prompt into a chat message instead is the single most common setup mistake, and the symptom is that Claude stops following the rules after twenty minutes.

---

## STEP 4: GATHER YOUR DOCUMENTS

Work through `docs/03-document-intake-checklist.md`. Put everything into `01 Source Documents`.

Start with these six. They unlock the most and they are the hardest to reconstruct from memory:

1. **Your most recent leave and earnings statement**, from your agency payroll system.
2. **A retirement annuity estimate from your agency**, run for at least two candidate separation dates. Most agencies produce this through a benefits portal. If yours does not, request it from your agency benefits officer in writing.
3. **Your official Service Computation Date for retirement purposes**, in writing from your benefits office. Note that the SCD for leave and the SCD for retirement are frequently different numbers, and only the retirement one governs eligibility.
4. **Your Social Security statement** from ssa.gov, plus a second estimate run with future earnings set to zero. The checklist explains why the second one is not optional.
5. **Your most recent TSP quarterly statement.**
6. **Twelve months of bank and credit card transaction exports**, in CSV format.

You can begin the interview with only the first five. The transaction exports are needed before the first monthly report, not before the interview.

---

## STEP 5: START THE INTERVIEW

Open a new conversation inside the project and type exactly this:

```
Begin Phase A, then start the interview at Block 1.
```

Claude will check your folders, tell you what documents are present and what is missing, then start asking questions in small groups. Answer in plain language. When you do not know something, say so. It will record the gap and move on rather than stalling.

The interview runs fourteen blocks. You can stop at any point and pick up later by typing `resume the interview`. Your answers are written into `02 Baseline\Facts Register.md` as you go, so nothing is lost between sessions.

Block 1 does something you should expect and should not fight. Before it asks when you **want** to retire, it works out when you are **first eligible**, and it derives that from your date of birth and your retirement Service Computation Date rather than taking your word for it. Four dates come out: the earliest date you could leave with an immediate annuity, the earliest date you could leave with an immediate **unreduced** annuity, the date the 1.1 percent multiplier becomes available, and your Minimum Retirement Age. If the date you have had in your head does not match the derived date, that gap is the most valuable thing this system will ever tell you, and finding it five years out is worth a great deal more than finding it five months out.

---

## STEP 6: BUILD THE BASELINE

When the interview finishes, type:

```
Build the Retirement Readiness Baseline.
```

That produces the founding document of the whole system: where you stand today, what your retirement income actually is line by line with the start date of each line, what your spending actually is, and the size of the gap between them. Everything after this is refinement.

---

## STEP 7: SET THE MONTHLY RHYTHM

Once a month, on a day you pick and keep:

1. Export the prior month's transactions from every bank and credit card account into `01 Source Documents\New Raw Data`. Wait for Google Drive to finish syncing before you start the report.
2. Update any account balance that changed, and drop in the current TSP statement if a new quarter has closed.
3. Open the project and type `run the monthly report`.

That is the entire recurring commitment. Fifteen minutes a month, and the plan tracks real spending instead of what you guessed twelve months ago.

---

## STEP 8: ADD BOLDIN

Boldin is a strong tool and it is worth the subscription. It is also a calculator, and a calculator returns exactly what you feed it. Its defaults were written for a general audience, and several of them are wrong for a FERS employee.

Set it up, then follow `docs/05-boldin-setup-and-validation.md`. The workflow is a loop: enter your data in Boldin, export the results, have Claude check the export against your own documents, correct what is wrong, re export. Boldin and your own model disagreeing is not a problem. The disagreement is the point, because it is where the errors surface.

Do not skip the validation step. A retirement plan that looks solvent because one input is wrong is worse than no plan at all, because it stops you from acting while there is still time to act.

---

## FIVE RULES THAT KEEP THIS HONEST

1. **Never let a number in without a source.** If Claude gives you a figure, ask where it came from. It is instructed to tell you, every time, and to label anything it estimated.
2. **Never build your expense base from memory.** Twelve months of real transactions, always. Remembered budgets run wrong by twenty to forty percent, and almost always low.
3. **Verify your retirement Service Computation Date before you trust any annuity figure.** It is not the same as your leave SCD. It decides your eligibility dates, your years of service in the annuity formula, and whether the 1.1 percent multiplier is reachable. Every other pension number in the plan depends on that one date.
4. **Plan from your eligibility date, not your preferred date.** Eligibility is a fact the rules decide. A preferred date is a scenario you test against it. Work the other way around and you can spend five years planning toward a date that carries a permanent reduction you never priced.
5. **Take irreversible decisions to a professional.** The survivor election, the FEGLI reduction election, postponed versus deferred retirement, the military service deposit, Social Security claiming, and any annuity purchase are all permanent. Arrive at that meeting with the arithmetic finished.

---

## IF SOMETHING GOES WRONG

| Problem | Fix |
|---|---|
| Claude cannot see your files | Re add the folder in the project settings. Confirm Google Drive has finished syncing. A file still uploading is a file Claude cannot read. |
| It forgets the rules mid conversation | The prompt went into a chat message instead of the project Instructions field. Move it. |
| It gives a number with no source | Reply: `Cite the source for that figure or label it as an estimate.` It will correct itself. |
| A report contradicts an earlier report | Ask for both figures side by side with their sources. One of the inputs changed, and finding out which one is the useful part. |
| The interview stalls on a question | Say `I do not know, record it as an open item and continue.` |
| A monthly report looks wrong | Ask for the transaction detail tab and the one time items list. Almost every bad monthly number is a miscategorized transaction or a semiannual bill landing in the wrong month. |
