# Guide source

`docs/FERS-Planning-Project-User-Guide.pdf` is built from the files in this folder.

| File | Purpose |
|---|---|
| `guide.md` | The whole guide. Markdown, pipe tables, fenced code blocks. |
| `template.html` | Pandoc template. Holds the cover page and the contents shell. |
| `guide.css` | Print stylesheet. Page geometry, type scale, tables, code blocks, contents. |
| `build.py` | Runs pandoc, then WeasyPrint, and writes the PDF into `docs/`. |

## Build

```
pip install weasyprint
python3 guide-src/build.py
```

Needs pandoc on the path, WeasyPrint 70.x, and the DejaVu font family (DejaVu Serif, DejaVu Sans, DejaVu Sans Mono).

## Two things to know before editing the stylesheet

**Font sizes are in px, lengths are in pt.** WeasyPrint records font size in the PDF text matrix in px while positions are in pt. Writing sizes in px keeps the numbers in this file the same as the numbers a reader measures out of the published PDF, which is what makes a rebuild comparable to the version before it.

**Margins are dropped at a page break, padding is not.** A heading that lands at the top of a page shows its `padding-top` but not its `margin-top`. That is why `h1` and `h2` carry a small padding as well as a margin. Change one without the other and every heading moves.

## Checking a rebuild

Compare the new PDF against the previous one before publishing:

```
pdftotext -layout old.pdf old.txt
pdftotext -layout new.pdf new.txt
diff old.txt new.txt
```

Every difference should be a change you made. Page numbering is worth checking too: each Part should begin where you expect, and the contents page numbers should match the pages they point at.
