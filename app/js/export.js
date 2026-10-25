/*
 * Word, PDF and Markdown output for the FERS Planner.
 *
 * All three are built in the browser from the plan model in plan.js. The two
 * libraries load only when a file is requested, from the app's own vendor
 * folder, so they work offline and from a downloaded copy.
 */
(function (root) {
  'use strict';
  var NAVY = '0F2942', NAVY2 = '14395C', STEEL = '2C5578', ROW = 'F2F6F9', CODE = 'F5F7FA';
  var TONES = { info: ['EAF2FA', '6C97C2'], warn: ['FFF6E5', 'E3B04B'], stop: ['FDECEC', 'D24B4B'] };
  var loaded = {};
  function plain(t) { return String(t === undefined || t === null ? '' : t).replace(/\[\[([^\]]+)\]\]/g, '$1'); }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (loaded[src]) return resolve();
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { loaded[src] = true; resolve(); };
      s.onerror = function () { reject(new Error('could not load ' + src + '. Check the connection, or open the app once online so it is saved for offline use.')); };
      document.head.appendChild(s);
    });
  }

  function saveBlob(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name; a.rel = 'noopener'; a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 5000);
  }

  // Column weights from the length of what each column holds.
  function weights(head, rows) {
    return head.map(function (h, c) {
      var lens = [plain(h).length].concat(rows.map(function (r) { return plain(r[c]).length; }));
      var avg = lens.reduce(function (a, b) { return a + b; }, 0) / lens.length;
      var max = Math.max.apply(null, lens);
      return Math.max(5, Math.min(42, avg * 0.6 + Math.min(max, 60) * 0.4));
    });
  }
  function scaleTo(ws, total) { var sum = ws.reduce(function (a, b) { return a + b; }, 0); return ws.map(function (w) { return w / sum * total; }); }
  // Longest unbreakable word in each column, so no word is split mid-letter.
  function longestWords(head, rows) {
    return head.map(function (h, c) {
      return [h].concat(rows.map(function (r) { return r[c]; })).reduce(function (m, cell) {
        return plain(cell).split(/\s+/).reduce(function (mm, w) { return Math.max(mm, w.length > 24 ? 24 : w.length); }, m);
      }, 1);
    });
  }
  // Widths that give every column room for its longest word, then share the rest by weight.
  function fitWidths(head, rows, total, charWidth, padding) {
    var mins = longestWords(head, rows).map(function (n) { return n * charWidth + padding; });
    var minSum = mins.reduce(function (a, b) { return a + b; }, 0);
    if (minSum >= total) return scaleTo(mins, total);
    var extra = scaleTo(weights(head, rows), total - minSum);
    return mins.map(function (m, i) { return m + extra[i]; });
  }

  /* ------------------------------------------------------------------ */
  /* Word                                                                 */
  /* ------------------------------------------------------------------ */

  function docx(doc) {
    return loadScript('vendor/docx.min.js').then(function () {
      var D = root.docx;
      var CONTENT = 12240 - 2 * 1080, CONTENT_L = 15840 - 2 * 1080;
      function run(text, o) { o = o || {}; return new D.TextRun({ text: plain(text), bold: o.bold, color: o.color, size: o.size, font: o.font, italics: o.italics }); }
      function para(text, o) { o = o || {}; return new D.Paragraph({ children: [run(text, o)], spacing: { after: o.after === undefined ? 120 : o.after, before: o.before || 0 }, heading: o.heading, shading: o.shading, border: o.border, keepNext: o.keepNext }); }
      function tableOf(b, landscape) {
        var width = landscape ? CONTENT_L : CONTENT;
        var size = b.head.length > 6 ? 15 : 18;
        // Calibri averages about half its point size per character; sizes here are half points, widths twips.
        var cols = fitWidths(b.head, b.rows, width, size / 2 * 0.55 * 20, 200).map(function (w) { return Math.round(w); });
        function cell(text, i, header, shade) {
          return new D.TableCell({
            width: { size: cols[i], type: D.WidthType.DXA },
            shading: header ? { type: D.ShadingType.CLEAR, color: 'auto', fill: NAVY2 } : (shade ? { type: D.ShadingType.CLEAR, color: 'auto', fill: ROW } : undefined),
            margins: { top: 50, bottom: 50, left: 80, right: 80 },
            children: [new D.Paragraph({ children: [run(text, { bold: header, color: header ? 'FFFFFF' : undefined, size: size })] })]
          });
        }
        var rows = [new D.TableRow({ tableHeader: true, cantSplit: true, children: b.head.map(function (h, i) { return cell(h, i, true); }) })];
        b.rows.forEach(function (r, n) { rows.push(new D.TableRow({ cantSplit: true, children: r.map(function (c, i) { return cell(c, i, false, n % 2 === 1); }) })); });
        var line = { style: D.BorderStyle.SINGLE, size: 4, color: 'D9E0E7' };
        return new D.Table({ width: { size: width, type: D.WidthType.DXA }, columnWidths: cols, rows: rows, borders: { top: line, bottom: line, left: line, right: line, insideHorizontal: line, insideVertical: line } });
      }
      function blocks(list, landscape) {
        var out = [];
        list.forEach(function (b) {
          if (b.t === 'lead') out.push(para(b.text, { bold: true, size: 23, after: 160 }));
          else if (b.t === 'p') out.push(para(b.text, { bold: b.bold }));
          else if (b.t === 'h3') out.push(para(b.text, { heading: D.HeadingLevel.HEADING_2, keepNext: true, before: 160 }));
          else if (b.t === 'list') b.items.forEach(function (i) { out.push(new D.Paragraph({ children: [run(i)], numbering: { reference: 'bullets', level: 0 }, spacing: { after: 60 } })); });
          else if (b.t === 'steps') b.lines.forEach(function (l, n) {
            out.push(new D.Paragraph({ children: [run(l, { font: 'Consolas', size: 17 })], shading: { type: D.ShadingType.CLEAR, color: 'auto', fill: CODE }, border: { left: { style: D.BorderStyle.SINGLE, size: 18, color: STEEL, space: 8 } }, spacing: { after: n === b.lines.length - 1 ? 140 : 20 }, indent: { left: 160 } }));
          });
          else if (b.t === 'note') { var tn = TONES[b.tone] || TONES.info; out.push(new D.Paragraph({ children: [run(b.text, { bold: b.tone === 'stop' })], shading: { type: D.ShadingType.CLEAR, color: 'auto', fill: tn[0] }, border: { left: { style: D.BorderStyle.SINGLE, size: 18, color: tn[1], space: 8 } }, spacing: { before: 80, after: 140 }, indent: { left: 160 } })); }
          else if (b.t === 'table') { out.push(tableOf(b, landscape)); out.push(para('', { after: 80 })); }
        });
        return out;
      }
      var footer = new D.Footer({ children: [new D.Paragraph({ children: [run(doc.title + ', prepared ' + doc.stamp + '. Personal financial information.   ', { size: 16, color: '55636F' }), new D.TextRun({ children: ['Page ', D.PageNumber.CURRENT, ' of ', D.PageNumber.TOTAL_PAGES], size: 16, color: '55636F' })] })] });
      var portrait = { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } };
      var landscapeProps = { page: { size: { width: 12240, height: 15840, orientation: D.PageOrientation.LANDSCAPE }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } };
      var sections = [];
      var first = [
        para(doc.title, { bold: true, size: 52, color: NAVY, after: 120 }),
        para(doc.subtitle, { size: 26, color: STEEL, after: 360 }),
        new D.Paragraph({ children: [run(doc.warning, { bold: true })], shading: { type: D.ShadingType.CLEAR, color: 'auto', fill: TONES.warn[0] }, border: { left: { style: D.BorderStyle.SINGLE, size: 18, color: TONES.warn[1], space: 8 } }, spacing: { after: 200 }, indent: { left: 160 } }),
        para(doc.disclaimer, { after: 200 }),
        para('Contents', { bold: true, size: 24, color: NAVY, before: 200 })
      ];
      doc.sections.forEach(function (s) { first.push(para((s.number ? s.number + (/^Appendix/.test(s.number) ? ': ' : '. ') : '') + s.title, { after: 40 })); });
      var current = { props: portrait, children: first, landscape: false };
      sections.push(current);
      doc.sections.forEach(function (s, i) {
        var wantLand = s.id === 'boldin';
        var heading = new D.Paragraph({ children: [run((s.number ? s.number + (/^Appendix/.test(s.number) ? ': ' : '. ') : '') + s.title)], heading: D.HeadingLevel.HEADING_1, pageBreakBefore: i === 0 && !wantLand, keepNext: true, spacing: { before: 240, after: 120 } });
        if (wantLand !== current.landscape) {
          current = { props: wantLand ? landscapeProps : portrait, children: [], landscape: wantLand };
          sections.push(current);
        }
        current.children.push(heading);
        Array.prototype.push.apply(current.children, blocks(s.blocks, wantLand));
      });
      var d = new D.Document({
        creator: 'FERS Planner', title: doc.title, description: doc.subtitle,
        styles: {
          default: { document: { run: { font: 'Calibri', size: 20 } } },
          paragraphStyles: [
            { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 30, bold: true, color: NAVY, font: 'Calibri' }, paragraph: { spacing: { before: 240, after: 120 } } },
            { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 24, bold: true, color: NAVY2, font: 'Calibri' }, paragraph: { spacing: { before: 160, after: 80 } } }
          ]
        },
        numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: D.LevelFormat.BULLET, text: '•', alignment: D.AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 260 } } } }] }] },
        sections: sections.map(function (s) { return { properties: s.props, footers: { default: footer }, children: s.children }; })
      });
      return D.Packer.toBlob(d).then(function (blob) { saveBlob(blob, doc.fileBase + '.docx'); return blob; });
    });
  }

  /* ------------------------------------------------------------------ */
  /* PDF                                                                  */
  /* ------------------------------------------------------------------ */

  function pdfDefinition(doc) {
    var W = 612 - 108, WL = 792 - 108;
    function tbl(b, landscape) {
      var fs = b.head.length > 6 ? 7.5 : 9;
      // Roboto averages a little over half its size per character, plus 8 points of cell padding.
      var ws = fitWidths(b.head, b.rows, (landscape ? WL : W) - b.head.length * 8, fs * 0.56, 2);
      var body = [b.head.map(function (h) { return { text: plain(h), bold: true, color: '#ffffff', fontSize: fs }; })].concat(b.rows.map(function (r) { return r.map(function (c) { return { text: plain(c), fontSize: fs }; }); }));
      return { table: { headerRows: 1, widths: ws, body: body, dontBreakRows: true }, layout: {
        fillColor: function (i) { return i === 0 ? '#14395c' : (i % 2 === 0 ? '#f2f6f9' : null); },
        hLineColor: function () { return '#d9e0e7'; }, vLineColor: function () { return '#d9e0e7'; },
        hLineWidth: function () { return 0.5; }, vLineWidth: function () { return 0.5; },
        paddingLeft: function () { return 4; }, paddingRight: function () { return 4; }, paddingTop: function () { return 3; }, paddingBottom: function () { return 3; }
      }, margin: [0, 4, 0, 10] };
    }
    function boxed(stack, fill, line, landscape) {
      return { table: { widths: [(landscape ? WL : W) - 16], body: [[{ stack: stack, fillColor: fill }]] }, layout: {
        hLineWidth: function () { return 0; }, vLineWidth: function (i) { return i === 0 ? 3 : 0; }, vLineColor: function () { return line; },
        paddingLeft: function () { return 8; }, paddingRight: function () { return 8; }, paddingTop: function () { return 6; }, paddingBottom: function () { return 6; }
      }, margin: [0, 4, 0, 10] };
    }
    function blocks(list, landscape) {
      var out = [];
      list.forEach(function (b) {
        if (b.t === 'lead') out.push({ text: plain(b.text), bold: true, fontSize: 11.5, margin: [0, 0, 0, 8] });
        else if (b.t === 'p') out.push({ text: plain(b.text), bold: !!b.bold, margin: [0, 0, 0, 6] });
        else if (b.t === 'h3') out.push({ text: plain(b.text), style: 'h3' });
        else if (b.t === 'list') out.push({ ul: b.items.map(plain), margin: [0, 0, 0, 8] });
        else if (b.t === 'steps') out.push(boxed(b.lines.map(function (l) { return { text: plain(l), fontSize: 8.5, margin: [0, 1, 0, 1] }; }), '#f5f7fa', '#2c5578', landscape));
        else if (b.t === 'note') { var tn = TONES[b.tone] || TONES.info; out.push(boxed([{ text: plain(b.text), bold: b.tone === 'stop' }], '#' + tn[0], '#' + tn[1], landscape)); }
        else if (b.t === 'table') out.push(tbl(b, landscape));
      });
      return out;
    }
    var content = [
      { text: doc.title, fontSize: 26, bold: true, color: '#0f2942', margin: [0, 40, 0, 6] },
      { text: doc.subtitle, fontSize: 13, color: '#2c5578', margin: [0, 0, 0, 24] },
      boxed([{ text: doc.warning, bold: true }], '#fff6e5', '#e3b04b'),
      { text: doc.disclaimer, margin: [0, 6, 0, 16] },
      { text: 'Contents', fontSize: 13, bold: true, color: '#0f2942', margin: [0, 8, 0, 6] },
      { stack: doc.sections.map(function (s) { return { text: (s.number ? s.number + (/^Appendix/.test(s.number) ? ': ' : '. ') : '') + s.title, margin: [0, 1, 0, 1] }; }) }
    ];
    var land = false;
    doc.sections.forEach(function (s, i) {
      var wantLand = s.id === 'boldin';
      var h = { text: (s.number ? s.number + (/^Appendix/.test(s.number) ? ': ' : '. ') : '') + s.title, style: 'h1' };
      if (i === 0 || wantLand !== land) { h.pageBreak = 'before'; h.pageOrientation = wantLand ? 'landscape' : 'portrait'; }
      land = wantLand;
      content.push(h);
      Array.prototype.push.apply(content, blocks(s.blocks, wantLand));
    });
    return {
      pageSize: 'LETTER', pageOrientation: 'portrait', pageMargins: [54, 54, 54, 60],
      info: { title: doc.title, subject: doc.subtitle, creator: 'FERS Planner', producer: 'FERS Planner' },
      defaultStyle: { font: 'Roboto', fontSize: 9.5, lineHeight: 1.2, color: '#17212b' },
      styles: { h1: { fontSize: 15, bold: true, color: '#0f2942', margin: [0, 6, 0, 8] }, h3: { fontSize: 11, bold: true, color: '#14395c', margin: [0, 8, 0, 4] } },
      footer: function (page, pages) { return { columns: [{ text: doc.title + ', prepared ' + doc.stamp + '. Personal financial information.', fontSize: 7.5, color: '#55636f' }, { text: 'Page ' + page + ' of ' + pages, alignment: 'right', fontSize: 7.5, color: '#55636f', width: 80 }], margin: [54, 24, 54, 0] }; },
      content: content
    };
  }

  function pdf(doc) {
    return loadScript('vendor/pdfmake.min.js').then(function () { return loadScript('vendor/vfs_fonts.js'); }).then(function () {
      var pm = root.pdfMake;
      var made = pm.createPdf(pdfDefinition(doc));
      return new Promise(function (resolve, reject) {
        var r;
        try { r = made.getBlob(function (blob) { resolve(blob); }); } catch (e) { reject(e); return; }
        if (r && typeof r.then === 'function') r.then(resolve, reject);
      });
    }).then(function (blob) { saveBlob(blob, doc.fileBase + '.pdf'); return blob; });
  }

  /* ------------------------------------------------------------------ */
  /* Markdown Entry Sheet, in the template's own layout.                  */
  /* ------------------------------------------------------------------ */

  function cellMd(s) { return plain(s).replace(/\|/g, '\\|').replace(/\n/g, ' '); }
  function mdTable(head, rows) { return '| ' + head.map(cellMd).join(' | ') + ' |\n|' + head.map(function () { return '---|'; }).join('') + '\n' + rows.map(function (r) { return '| ' + r.map(cellMd).join(' | ') + ' |'; }).join('\n') + '\n'; }

  function entrySheetMarkdown(doc) {
    var ctx = doc.ctx, rows = ctx.boldin, sc = ctx.plan;
    var md = '# BOLDIN ENTRY SHEET, ' + doc.stamp + '\n\nWritten by the FERS Planner from your answers. Specification: `docs/07-boldin-field-map-and-entry-engine.md`, Part 4.\n\n## HEADER\n\n';
    md += mdTable(['Item', 'Value'], [
      ['Sheet date', doc.stamp],
      ['Scenario this applies to', sc && sc.ok ? (sc.label || 'Plan') + ', separation ' + sc.sepISO : 'not available'],
      ['Triggered by', 'FERS Planner answers'],
      ['Documents processed', 'None; values come from the answers entered in the planner'],
      ['Prior sheet', 'Carry forward any NOT STARTED or BLOCKED rows from the prior sheet'],
      ['Rows carried forward from the prior sheet', '0']
    ]);
    md += '\n## ROWS\n\nOrdered by impact. The field that moves the plan most goes first.\n\n';
    md += mdTable(['#', 'Screen', 'Sub-section', 'Item', 'Field', 'Enter this', 'Replaces', 'Source', 'Status'], rows.map(function (r) { return [String(r.n), r.screen, r.sub, r.item, r.field, r.enter, r.replaces, r.source, r.status]; }));
    var st = rows.filter(function (r) { return r.structural; });
    md += '\n## STRUCTURAL AND IRREVERSIBLE ROWS\n\n' + mdTable(['Row #', 'Why it is structural', 'Consequence to expect'], st.length ? st.map(function (r) { return [String(r.n), r.why, 'Every downstream figure moves']; }) : [['', '', '']]);
    var bl = rows.filter(function (r) { return r.status === 'BLOCKED'; });
    md += '\n## BLOCKED ROWS\n\n' + mdTable(['Row #', 'Field', 'Document that would unblock it', 'Added to Open Items'], bl.length ? bl.map(function (r) { return [String(r.n), r.item + ', ' + r.field, r.unblock, 'Add it']; }) : [['', '', '', '']]);
    md += '\n## WHAT CHANGES AS A RESULT\n\n- Chance of Success: expected to rise if the plan carried a pre-62 COLA or a fixed percentage withdrawal strategy, and to fall if it carried a supplement this path does not pay.\n- Net worth at longevity: same direction as Chance of Success.\n- The year the plan is tightest: expected to be the year the supplement ends at 62, until Social Security starts.\n';
    md += '\n## RE-EXPORT INSTRUCTION\n\n1. Enter every row above, marking each `ENTERED` as it is done.\n2. Export the planner summary CSV for the scenario, and download the PDF report.\n3. Save both to `05 Boldin` with the date in the file name.\n4. Say: `Run a Boldin validation against the export dated ' + doc.stamp + '.`\n\nThis sheet is not finished until the validation confirms the values landed.\n';
    md += '\n## FIELD MAP CORRECTIONS FOUND\n\n' + mdTable(['Screen and field', 'What the field map said', 'What the screen showed'], [['', '', '']]);
    md += '\n## SIGN OFF\n\n' + mdTable(['Check', 'Result'], [['Every row has a source', 'Yes'], ['Every row states what it replaces', 'Yes'], ['Blocked rows are in Open Items', bl.length ? 'Add them' : 'None blocked'], ['Export saved to `05 Boldin`', ''], ['Validation run and defects carried to the next sheet', '']]);
    return md;
  }

  root.FersExport = { docx: docx, pdf: pdf, pdfDefinition: pdfDefinition, entrySheetMarkdown: entrySheetMarkdown, saveBlob: saveBlob, loadScript: loadScript };
})(typeof self !== 'undefined' ? self : this);
