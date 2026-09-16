#!/usr/bin/env python3
"""Build docs/FERS-Planning-Project-User-Guide.pdf from guide.md.

Requires pandoc and WeasyPrint 70.x, and the DejaVu font family.

    pip install weasyprint
    python3 guide-src/build.py

The stylesheet reproduces the 1.0.0 design exactly: Letter, 1.8cm top and
1.6cm side margins, DejaVu Serif body at 13.2px on 14.3pt leading, DejaVu
Sans headings in navy, and a table of contents whose page numbers come from
target-counter. Font sizes are written in px on purpose, because that is the
unit WeasyPrint records in the PDF text matrix and it is what makes the
output comparable to the published version.
"""
import pathlib, subprocess, sys

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent / "docs" / "FERS-Planning-Project-User-Guide.pdf"

def main():
    html = HERE / "guide.html"
    subprocess.run([
        "pandoc", str(HERE / "guide.md"),
        "-f", "markdown+pipe_tables+backtick_code_blocks-smart",
        "-t", "html5", "--standalone",
        f"--template={HERE / 'template.html'}",
        "--toc", "--toc-depth=2",
        "-o", str(html),
    ], check=True)
    from weasyprint import HTML
    HTML(str(html), base_url=str(HERE)).write_pdf(str(OUT))
    html.unlink()
    print(f"wrote {OUT}")

if __name__ == "__main__":
    sys.exit(main())
