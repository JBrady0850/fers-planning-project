"""Browser test of the FERS Planner.

Opens the app from a local web server and as a plain file, at phone, iPad,
Android tablet and desktop sizes, and fails on any script error, any tab that
scrolls sideways, any term without a definition, a definition that does not
open on hover, tap and keyboard focus, answers that do not survive a reload,
or a Word, PDF or Markdown file that does not contain the plan.

    pip install playwright pypdf
    python -m playwright install chromium
    python tests/ui_smoke.py

Set PW_CHANNEL=msedge or PW_CHANNEL=chrome to use an installed browser instead
of Playwright's own Chromium.
"""
import functools
import http.server
import json
import os
import pathlib
import socketserver
import sys
import tempfile
import threading
import zipfile

from playwright.sync_api import sync_playwright
from pypdf import PdfReader

APP = pathlib.Path(__file__).resolve().parent.parent / "app"
TABS = ["start", "answers", "dates", "annuity", "supplement", "leave", "insurance", "survivor", "income", "boldin", "plan", "help", "settings"]
SIZES = {"phone": (390, 844), "ipad": (820, 1180), "android-tablet": (800, 1280), "desktop": (1366, 900)}
FAILURES = []


def check(ok, msg):
    if not ok:
        FAILURES.append(msg)
        print("FAIL", msg)


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def serve():
    handler = functools.partial(Quiet, directory=str(APP))
    httpd = socketserver.TCPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, f"http://127.0.0.1:{httpd.server_address[1]}/"


def watch(page, errors):
    page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
    page.on("console", lambda m: errors.append(f"console {m.type}: {m.text}") if m.type in ("error", "warning") else None)


def tab_checks(page, base, label):
    for tab in TABS:
        page.goto(base + "#" + tab)
        page.wait_for_selector("main .page-title, main .hero", timeout=5000)
        widths = page.evaluate("[document.documentElement.scrollWidth, document.documentElement.clientWidth]")
        check(widths[0] <= widths[1] + 1, f"{label} #{tab} scrolls sideways: {widths}")
        missing = page.evaluate("Array.from(document.querySelectorAll('.term')).map(e => e.dataset.term).filter(t => !window.FersGlossary.terms[t])")
        check(not missing, f"{label} #{tab} terms without a definition: {missing}")
        current = page.evaluate("document.querySelector('#tabs a[aria-current=page]').getAttribute('href')")
        check(current == "#" + tab, f"{label} #{tab} tab not marked current: {current}")


def definitions(page, base, label, mobile):
    page.goto(base + "#dates")
    term = page.locator("main .term").first
    if mobile:
        term.tap()
    else:
        term.hover()
    page.wait_for_timeout(100)
    check(page.is_visible("#tip"), f"{label} definition does not open on {'tap' if mobile else 'hover'}")
    page.keyboard.press("Escape")
    check(not page.is_visible("#tip"), f"{label} Escape does not close the definition")
    page.evaluate("document.activeElement && document.activeElement.blur()")
    term.focus()
    page.wait_for_timeout(100)
    check(page.is_visible("#tip"), f"{label} definition does not open on keyboard focus")


def run():
    httpd, url = serve()
    file_url = (APP / "index.html").as_uri()
    out = pathlib.Path(tempfile.mkdtemp())
    with sync_playwright() as p:
        browser = p.chromium.launch(channel=os.environ.get("PW_CHANNEL") or None)
        for mode, base in (("server", url), ("file", file_url)):
            for name, (w, h) in SIZES.items():
                label = f"{mode}/{name}"
                ctx = browser.new_context(viewport={"width": w, "height": h}, has_touch=name != "desktop", accept_downloads=True)
                page = ctx.new_page()
                errors = []
                watch(page, errors)
                origin = url if mode == "server" else "file://"
                foreign = []
                page.on("request", lambda r: foreign.append(r.url) if not (r.url.startswith(origin) or r.url.startswith("blob:") or r.url.startswith("data:")) else None)
                page.goto(base)
                check(page.is_visible("text=Start the interview"), f"{label} blank start screen missing")
                tab_checks(page, base, label + " blank")
                page.goto(base)
                page.click("text=See the worked example")
                page.wait_for_selector("text=Verdict")
                check(page.is_visible("text=Verdict: Tight"), f"{label} worked example verdict missing")
                tab_checks(page, base, label + " example")
                definitions(page, base, label, name != "desktop")
                check(not errors, f"{label} script errors: {errors[:5]}")
                check(not foreign, f"{label} requests left the app's own origin: {foreign[:5]}")
                ctx.close()

        # Answers survive a reload, steps mark done, and special provision stops the plan.
        ctx = browser.new_context(viewport={"width": 390, "height": 844})
        page = ctx.new_page()
        errors = []
        watch(page, errors)
        page.goto(url + "#answers/about")
        page.fill("#f-person-dob", "1970-06-15")
        page.check("input[data-k='person.specialProvision'][value='no']")
        page.check("input[data-k='person.married'][value='no']")
        page.goto(url + "#answers/service")
        page.fill("#f-service-scdRetirement", "1996-07-01")
        page.select_option("#f-service-scdSource", "written")
        page.reload()
        page.goto(url + "#answers/about")
        check(page.input_value("#f-person-dob") == "1970-06-15", "date of birth did not survive a reload")
        check(page.locator(".stepper a.done").count() >= 2, "completed steps are not marked done")
        page.goto(url + "#dates")
        check(page.is_visible("text=15 June 2027"), "MRA date for a 1970 birth not shown")
        page.goto(url + "#answers/about")
        page.check("input[data-k='person.specialProvision'][value='yes']")
        page.goto(url + "#annuity")
        check(page.is_visible(".note.stop"), "special provision stop notice missing")
        check(not errors, f"interview script errors: {errors[:5]}")
        ctx.close()

        # Files: Word, PDF, Markdown, and the answers file round trip.
        ctx = browser.new_context(viewport={"width": 1366, "height": 900}, accept_downloads=True)
        page = ctx.new_page()
        errors = []
        watch(page, errors)
        page.goto(url)
        page.click("text=See the worked example")
        page.goto(url + "#plan")
        with page.expect_download(timeout=60000) as d:
            page.click("[data-act=docx]")
        docx = out / d.value.suggested_filename
        d.value.save_as(docx)
        check(docx.suffix == ".docx" and docx.name.startswith("FERS-Retirement-Plan-"), f"Word file name: {docx.name}")
        xml = zipfile.ZipFile(docx).read("word/document.xml").decode()
        for needle in ("Verdict: Tight", "2,912.75", "1,287.00", "Appendix A: Boldin Entry Sheet", "Based on spending needs", "Definition of done", 'w:orient="landscape"'):
            check(needle in xml, f"Word file is missing {needle!r}")
        with page.expect_download(timeout=60000) as d:
            page.click("[data-act=pdf]")
        pdf = out / d.value.suggested_filename
        d.value.save_as(pdf)
        reader = PdfReader(str(pdf))
        text = "".join(pg.extract_text() for pg in reader.pages)
        check(len(reader.pages) >= 10, f"PDF has only {len(reader.pages)} pages")
        for needle in ("Verdict: Tight", "2,912.75", "1,287.00", "Appendix A: Boldin Entry Sheet", "Personal financial information"):
            check(needle in text, f"PDF is missing {needle!r}")
        check(any(pg.mediabox.width > pg.mediabox.height for pg in reader.pages), "PDF Entry Sheet is not landscape")
        check(reader.metadata.title == "FERS Retirement Plan", f"PDF title: {reader.metadata.title}")
        page.goto(url + "#boldin")
        with page.expect_download() as d:
            page.click("[data-act=save-md]")
        md = (out / "sheet.md")
        d.value.save_as(md)
        body = md.read_text(encoding="utf-8")
        check(body.startswith("# BOLDIN ENTRY SHEET") and "| 1 | Income | Pensions |" in body and "## SIGN OFF" in body, "Markdown Entry Sheet layout")
        page.goto(url + "#settings")
        with page.expect_download() as d:
            page.click("text=Save answers file")
        answers = out / "answers.json"
        d.value.save_as(answers)
        saved = json.loads(answers.read_text(encoding="utf-8"))
        check(saved["person"]["dob"] == "1972-04-15", "answers file does not hold the answers")
        page.once("dialog", lambda dlg: dlg.accept())
        page.click("text=Clear my answers")
        page.goto(url + "#settings")
        page.set_input_files("#importFile", str(answers))
        page.wait_for_timeout(300)
        page.goto(url + "#dates")
        check(page.is_visible("text=15 April 2029"), "answers file did not open")
        check(not errors, f"file script errors: {errors[:5]}")
        ctx.close()
        browser.close()
    httpd.shutdown()
    print(f"{len(FAILURES)} failure(s)")
    return 1 if FAILURES else 0


if __name__ == "__main__":
    sys.exit(run())
