# Third-party libraries

These files ship with the FERS Planner so the Word and PDF buttons work offline and from a downloaded copy. They load only when a file is requested.

| File | Library | Version | Licence |
|---|---|---|---|
| `docx.min.js` | docx, https://github.com/dolanmiu/docx, `dist/index.iife.js` minified with esbuild | 9.14.0 | MIT |
| `pdfmake.min.js` | pdfmake, https://github.com/bpampuch/pdfmake, `build/pdfmake.min.js` | 0.3.13 | MIT |
| `vfs_fonts.js` | pdfmake's embedded Roboto fonts, `build/vfs_fonts.js` | 0.3.13 | Roboto: Apache License 2.0; wrapper: MIT |

To update: `npm install docx pdfmake esbuild`, then `npx esbuild node_modules/docx/dist/index.iife.js --minify --outfile=app/vendor/docx.min.js` and copy `node_modules/pdfmake/build/pdfmake.min.js` and `vfs_fonts.js` here, dropping the `sourceMappingURL` line. Run the browser test afterwards: it builds both files and opens them.

## docx

```
The MIT License (MIT)

Copyright (c) 2016 Dolan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## pdfmake

```
The MIT License (MIT)

Copyright (c) 2014-2015 bpampuch
              2016-2026 liborm85

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## Roboto

Roboto is by Google and is licensed under the Apache License, Version 2.0: https://www.apache.org/licenses/LICENSE-2.0
