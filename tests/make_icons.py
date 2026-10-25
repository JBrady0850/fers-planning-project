"""Draws the planner's PNG icons and the QR code from the same geometry as app/icons/icon.svg.

Run only after changing the icon:  pip install pillow qrcode  then  python tests/make_icons.py
"""
import pathlib

import qrcode
from PIL import Image, ImageDraw

ICONS = pathlib.Path(__file__).resolve().parent.parent / "app" / "icons"
APP_URL = "https://jbrady0850.github.io/fers-planning-project/"


def draw(size, maskable=False):
    s = size / 64.0
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    off = 0
    if maskable:
        # Full bleed background with the artwork inside the 80 percent safe zone.
        d.rectangle([0, 0, size, size], fill="#0f2942")
        k = 0.78
        off = size * (1 - k) / 2
        s = s * k
    else:
        d.rounded_rectangle([0, 0, size - 1, size - 1], radius=14 * s, fill="#0f2942")

    def box(x0, y0, x1, y1):
        return [off + x0 * s, off + y0 * s, off + x1 * s, off + y1 * s]

    d.rounded_rectangle(box(13, 16, 51, 51), radius=5 * s, fill="#ffffff")
    d.rounded_rectangle(box(13, 16, 51, 26), radius=5 * s, fill="#c8922a")
    d.rectangle(box(13, 21, 51, 26), fill="#c8922a")
    d.rounded_rectangle(box(21, 11, 25, 21), radius=2 * s, fill="#dce6f0")
    d.rounded_rectangle(box(39, 11, 43, 21), radius=2 * s, fill="#dce6f0")
    for cx, cy in [(21, 33), (29, 33), (37, 33), (45, 33), (21, 41), (29, 41), (45, 41)]:
        d.ellipse(box(cx - 2.2, cy - 2.2, cx + 2.2, cy + 2.2), fill="#9fb3c6")
    d.ellipse(box(37 - 4.6, 41 - 4.6, 37 + 4.6, 41 + 4.6), fill="#14395c")
    width = max(1, int(round(1.6 * s)))
    d.line([(off + 34.8 * s, off + 41.2 * s), (off + 36.4 * s, off + 42.8 * s), (off + 39.4 * s, off + 39.6 * s)], fill="#ffffff", width=width, joint="curve")
    return img


def main():
    big = draw(1024)
    for n in (192, 512):
        big.resize((n, n), Image.LANCZOS).save(ICONS / f"icon-{n}.png")
    draw(1024, maskable=True).resize((512, 512), Image.LANCZOS).save(ICONS / "icon-maskable-512.png")
    apple = Image.new("RGB", (180, 180), "#0f2942")
    apple.paste(draw(1024, maskable=True).resize((180, 180), Image.LANCZOS))
    apple.save(ICONS / "apple-touch-icon.png")
    q = qrcode.QRCode(border=2, box_size=10, error_correction=qrcode.constants.ERROR_CORRECT_M)
    q.add_data(APP_URL)
    q.make(fit=True)
    q.make_image(fill_color="#0f2942", back_color="white").convert("RGB").resize((320, 320), Image.NEAREST).save(ICONS / "open-app-qr.png")
    print("icons written to", ICONS)


if __name__ == "__main__":
    main()
