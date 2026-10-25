"""Rewrites the planner screenshots in docs/images from the invented worked example.

Run only when the look changes:  python tests/make_screenshots.py
Set PW_CHANNEL=msedge or PW_CHANNEL=chrome to use an installed browser.
"""
import functools
import http.server
import os
import pathlib
import socketserver
import threading

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
APP = ROOT / "app"
OUT = ROOT / "docs" / "images"


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    httpd = socketserver.TCPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=str(APP)))
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    url = f"http://127.0.0.1:{httpd.server_address[1]}/"
    shots = [
        ("planner-start-phone.png", "#start", 390, 844, False),
        ("planner-dates-phone.png", "#dates", 390, 844, False),
        ("planner-annuity-desktop.png", "#annuity", 1280, 900, False),
        ("planner-boldin-desktop.png", "#boldin", 1280, 900, False),
    ]
    with sync_playwright() as p:
        browser = p.chromium.launch(channel=os.environ.get("PW_CHANNEL") or None)
        for name, tab, w, h, full in shots:
            page = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=2 if w < 600 else 1)
            page.goto(url)
            page.click("text=See the worked example")
            page.goto(url + tab)
            page.reload()
            page.evaluate("window.scrollTo(0, 0)")
            page.wait_for_timeout(300)
            page.screenshot(path=str(OUT / name), full_page=full)
            page.close()
            print("wrote", name)
        browser.close()
    httpd.shutdown()


if __name__ == "__main__":
    main()
