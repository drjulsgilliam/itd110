/* Make an About Page: all the steps, in the Living Web studio format (the ITE 170 method).
   Every task: title, one line under it (sub), why, Without it / How it works, ONE ACTION PER STEP with a
   drawing after each, Check it yourself, a Stuck? hint ladder and a Level up (learn).

     node _build/make_tasks.js      writes studio/tasks.js, index.html and example/   (never edit those by hand)

   THE CODE STEPS ARE TYPED BY A SMALL "EDITOR" IN THIS FILE, the way VS Code behaves: it adds the ending
   tag after >, and Enter between two tags opens an indented empty line. Each code step both DOES the edit
   in that editor and WRITES the step and its code picture from the editor's real state: the line number,
   what was just typed and exactly where the cursor is. At the end the editor's page must equal FINAL below,
   or this script stops. So the steps cannot drift away from the code. The finished page is written to
   example/ : it is the page you get by following only the steps.

   Rules this script enforces: every step has a drawing with alt text, task ids are unique, every text file
   in this folder is ASCII only, no arrow glyph (menu paths use >) and no email addresses except example.com.

   A step is [text, drawing] or [text, drawing, caption]. Any part may be a function of os ('win' or 'mac')
   when the two computers differ. No course is named anywhere, on purpose. */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.dirname(__dirname);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = s => String(s).replace(/<[^>]+>/g, '').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
const hit = c => c ? ' sc-hit' : '';
const c = s => '<code>' + esc(s) + '</code>';
const o = (os, w, m) => os === 'mac' ? m : w;

const FOLDER = 'rivera_site';           /* the example student's folder: yourlastname_site */
const FILE = 'about.html';
const NAME = 'Alex Rivera';
const TITLE = 'About ' + NAME;

const TAG = 'Student and future web designer';
const BIG = ['I am a student and a ', 'future web designer', '.'];   /* the big heading of the Hook; the middle part turns gold */
const LEAD = 'Pick one. Then tell me what you think.';
const WHO = 'Hello. My name is Alex Rivera. I am a student, and I am learning to make web pages.';
const LIKES = ['Hiking on mountain trails', 'Cooking pasta from scratch', 'Drawing logos'];
const GOAL = 'My goal is to make a web site for a small business.';
const CSSFILE = 'style.css';
/* ------------------------------------------------------------------ the two files the steps must end with */
const HTML_FINAL = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Alex Rivera</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <p class="logo">Alex Rivera</p>
        <button aria-label="Menu" aria-expanded="false">&#9776;</button>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="media.html">Media</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="profile">
            <div>
                <p class="label">About me</p>
                <h1>I am a student and a <span>future web designer</span>.</h1>
                <p>Hello. My name is Alex Rivera. I am a student, and I am learning to make web pages.</p>
                <p>
                    <a class="button" href="#story">Read my story</a>
                    <a class="button ghost" href="gallery.html">See my gallery</a>
                </p>
            </div>
            <img src="images/me.jpg" alt="Alex Rivera smiling in front of a blue wall">
        </section>
        <div class="story" id="story">
            <p class="label">My story</p>
            <h2>How I Started</h2>
            <p>I made my first web page in a class, and I was hooked.</p>
            <p>Now I build one small site every month to practice.</p>
        </div>
        <section class="timeline">
            <div>
                <p class="label">My journey</p>
                <h2>One Step at a Time</h2>
                <ol>
                    <li><strong>First class</strong>I made my first web page.</li>
                    <li><strong>Second class</strong>I learned to style pages with CSS.</li>
                    <li><strong>Now</strong>I am building a site for a local bakery.</li>
                </ol>
            </div>
            <img src="images/trail.jpg" alt="A dirt trail through green mountains on a sunny day">
        </section>
        <section class="skills">
            <div>
                <p class="label">My skills</p>
                <h2>What I Can Do</h2>
                <ul>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>Photography</li>
                    <li>Teamwork</li>
                </ul>
            </div>
            <img src="images/laptop.jpg" alt="An open laptop on a desk next to a notebook">
        </section>
        <div class="trust">
            <blockquote>
                <p>Alex listens first, and then builds exactly what you asked for.</p>
                <p class="by">Sam Lee, lab partner</p>
            </blockquote>
            <blockquote>
                <p>Alex explains things so clearly that I finally understood my own web site.</p>
                <p class="by">Dana Cho, classmate</p>
            </blockquote>
        </div>
        <div class="action">
            <div>
                <h2>Want to see what I have made?</h2>
                <p>Pick one. Then tell me what you think.</p>
            </div>
            <p>
                <a class="button" href="gallery.html">See my gallery</a>
                <a class="button ghost" href="contact.html">Send me a message</a>
            </p>
        </div>
    </main>
    <footer>
        <p>Made by Alex Rivera</p>
        <a href="#top">Back to top</a>
    </footer>
    <script src="js/menu.js"></script>
</body>
</html>`;
const CSS_FINAL = `body {
    margin: 0;
    font-family: Arial, sans-serif;
    font-size: 18px;
    line-height: 1.6;
    color: #eef1ff;
    background-color: #0b1026;
}

h1, h2 {
    font-family: Georgia, serif;
}

h1 {
    font-size: 40px;
    line-height: 1.1;
    margin: 8px 0;
}

nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

nav a {
    display: block;
    padding: 12px;
    text-align: right;
    white-space: nowrap;
    color: #ffffff;
}

header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    background-color: #05081a;
    padding: 16px;
    position: sticky;
    top: 0;
}

main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 16px;
}

footer {
    padding: 16px;
    background-color: #10163a;
    text-align: center;
}

a {
    color: #f5c84c;
}

h1 span {
    color: #f5c84c;
}

button {
    padding: 12px 16px;
    font-size: 24px;
    color: #05081a;
    background-color: #f5c84c;
    border: 0;
    border-radius: 6px;
}

nav {
    display: none;
    width: 100%;
}

nav.open {
    display: block;
}

.logo {
    flex: 1;
    margin: 0;
    font-family: Georgia, serif;
    font-size: 20px;
    font-weight: bold;
}

img {
    display: block;
    width: 100%;
    max-width: 480px;
    height: auto;
    border-radius: 6px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
}

section {
    margin-bottom: 96px;
}

.label {
    margin: 0;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #f5c84c;
}

h2 {
    margin-top: 8px;
}

@media (min-width: 800px) {
    nav ul {
        display: flex;
        gap: 16px;
    }

    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    button {
        display: none;
    }

    nav {
        display: block;
        width: auto;
    }

    header {
        flex-wrap: nowrap;
    }

    section {
        display: flex;
        align-items: center;
        gap: 48px;
    }

    section:nth-of-type(even) {
        flex-direction: row-reverse;
    }

    section div {
        flex: 1;
    }

    section img {
        width: 45%;
    }
}`;
const JSFILE = 'menu.js';
const OTHERS = ['contact.html', 'gallery.html', 'index.html', 'media.html'];   /* the other pages of the site: empty files in this tutorial */
const JS_FINAL = `const button = document.querySelector("button");
const menu = document.querySelector("nav");

button.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", isOpen);
});`;
/* contrast of two hex colors, never rounded up */
const lum = h => { const v = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(x => x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return Math.floor((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) * 100) / 100; };


/* ---------- drawings: each returns {alt, html}; the caption comes from the step ---------- */
const pic = (alt, html) => ({ alt, html });
const keys = (list, said) => pic('Keyboard keys: ' + list.join(' and ') + '.' + (said ? ' ' + said : ''), `<div class="sc-board">${list.map(k => `<span class="sc-key">${esc(k)}</span>`).join('<b>+</b>')}${said ? `<span class="sc-pad">${esc(said)}</span>` : ''}</div>`);
const note = (big, small) => pic(`A card that says: ${big}. ${small || ''}`, `<div class="sc-board sc-col"><b class="sc-big">${esc(big)}</b>${small ? `<span>${esc(small)}</span>` : ''}</div>`);
const cards = list => pic(`${list.length} cards. ` + list.map(x => x[0] + ': ' + x[1]).join('. ') + '.', `<div class="sc-board">${list.map(x => `<div class="sc-card"><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('')}</div>`);
const ticks = list => pic('A list with tick boxes: ' + list.join('; ') + '.', `<div class="sc-board sc-col">${list.map((t, i) => `<div class="sc-chk">${i === 0 ? '&#9745;' : '&#9744;'} ${esc(t)}</div>`).join('')}</div>`);
const gb = (good, bad) => pic(`Two boxes. The first, labelled ${bad[0]}: ${bad[1]}. The second, labelled ${good[0]}: ${good[1]}.`, `<div class="sc-board"><div class="sc-bad"><b>${esc(bad[0])}</b>${esc(bad[1])}</div><div class="sc-good"><b>${esc(good[0])}</b>${esc(good[1])}</div></div>`);

const svg = (d, w) => `<svg width="${w || 20}" height="${w || 20}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  ext: svg('<rect x="3" y="12" width="8" height="8"/><rect x="12" y="12" width="8" height="8"/><rect x="3" y="3" width="8" height="8"/><rect x="14.5" y="2" width="7" height="7" transform="rotate(12 18 5.5)"/>'),
  files: svg('<path d="M8 3h8l4 4v11H8z"/><path d="M8 7H4v14h11v-3"/>'),
  search: svg('<circle cx="10" cy="10" r="6"/><path d="M15 15l5 5"/>'),
  newfile: svg('<path d="M6 3h8l4 4v5"/><path d="M6 3v17h6"/><path d="M17 15v6M14 18h6"/>', 17),
  newfolder: svg('<path d="M3 6h6l2 2h9v4"/><path d="M3 6v12h9"/><path d="M17 15v6M14 18h6"/>', 17),
  refresh: svg('<path d="M19 12a7 7 0 1 1-2.1-5"/><path d="M19 4v4h-4"/>', 17),
  collapse: svg('<rect x="4" y="4" width="13" height="13" rx="2"/><path d="M8 10.5h5"/>', 17)
};
/* the example picture, drawn with plain shapes: a trail through green mountains */
const TRAIL = (w, style) => `<svg viewBox="0 0 120 80" width="${w || 108}" height="${Math.round((w || 108) * 2 / 3)}" aria-hidden="true" style="${style || ''}"><rect width="120" height="80" fill="#cfe6f5"/><circle cx="100" cy="14" r="7" fill="#f6d86b"/><path d="M0 52 L30 22 L58 48 L84 18 L120 54 L120 80 L0 80 Z" fill="#6f9a6a"/><path d="M0 58 L40 44 L80 56 L120 46 L120 80 L0 80 Z" fill="#4f7d4c"/><path d="M50 80 L75 80 L66 62 L62 54 L60 54 L60 62 Z" fill="#c9a36b"/></svg>`;
const PASTA = (w, style) => `<svg viewBox="0 0 120 80" width="${w || 108}" height="${Math.round((w || 108) * 2 / 3)}" aria-hidden="true" style="${style || ''}"><rect width="120" height="80" fill="#c8996a"/><circle cx="60" cy="42" r="32" fill="#f4f1ea"/><circle cx="60" cy="42" r="24" fill="#f1cf74"/><circle cx="60" cy="42" r="10" fill="#c0392b"/><circle cx="60" cy="40" r="3" fill="#4f7d4c"/></svg>`;
const LAPTOP = (w, style) => `<svg viewBox="0 0 120 80" width="${w || 108}" height="${Math.round((w || 108) * 2 / 3)}" aria-hidden="true" style="${style || ''}"><rect width="120" height="80" fill="#dfe7f1"/><rect y="58" width="120" height="22" fill="#b98b5e"/><rect x="24" y="16" width="52" height="38" rx="3" fill="#2f3b4c"/><rect x="28" y="20" width="44" height="30" fill="#eaf2fb"/><rect x="31" y="24" width="24" height="3" fill="#1d4e89"/><path d="M18 54 H82 L88 62 H12 Z" fill="#59677a"/><rect x="90" y="44" width="20" height="18" rx="2" fill="#f6d86b"/></svg>`;
const VSICON = '<svg viewBox="0 0 100 100" width="22" height="22" aria-hidden="true"><path d="M71 8 L92 18 V82 L71 92 L30 55 L15 67 L7 61 L20 50 L7 39 L15 33 L30 45 Z" fill="#2f9be8"/><path d="M71 8 L92 18 V82 L71 92 Z" fill="#1766b0"/><path d="M71 31 V69 L46 50 Z" fill="#ffffff"/></svg>';
const menuItems = (items, on) => items.map(m => m === '-' ? '<div class="sc-sep"></div>' : `<div class="${m === on ? 'sc-on sc-hit' : ''}">${esc(m)}</div>`).join('');
const menu = (items, on, dark) => `<div class="sc-menu${dark ? ' sc-dark' : ''} sc-static">${menuItems(items, on)}</div>`;

/* the desktop, with the Dock (Mac) or the taskbar (Windows). d: {app, hitDock, hitMenu} */
function desk(os, inner, d) {
  d = d || {};
  if (os === 'mac') {
    const menus = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];
    return `<div class="sc-desk sc-mac"><div class="sc-menubar"><b>${d.app || 'Finder'}</b>${menus.map(m => `<span class="${m === d.hitMenu ? 'sc-hit' : ''}">${m}</span>`).join('')}</div><div class="sc-area">${inner}</div>` +
      `<div class="sc-dock"><i class="sc-ico sc-finder${hit(d.hitDock === 'finder')}" title="Finder"></i><i class="sc-ico sc-web${hit(d.hitDock === 'web')}" title="Web browser"></i><i class="sc-ico sc-code${hit(d.hitDock === 'code')}" title="VS Code">${VSICON}</i></div></div>`;
  }
  return `<div class="sc-desk sc-pc"><div class="sc-area">${inner}</div>` +
    `<div class="sc-taskbar"><i class="sc-ico sc-start${hit(d.hitDock === 'start')}" title="Start"></i><i class="sc-ico sc-web${hit(d.hitDock === 'web')}" title="Web browser"></i><i class="sc-ico sc-explorer${hit(d.hitDock === 'finder')}" title="File Explorer"></i><i class="sc-ico sc-code${hit(d.hitDock === 'code')}" title="VS Code">${VSICON}</i></div></div>`;
}
function titlebar(os, title) {
  return os === 'mac' ? `<div class="sc-tb"><span class="sc-dots"><i></i><i></i><i></i></span><span>${esc(title)}</span></div>`
    : `<div class="sc-tb"><span>${esc(title)}</span><span class="sc-ctl">&#8212; &#9633; <span>&#10005;</span></span></div>`;
}
const win = (os, title, body, cls) => `<div class="sc-win ${cls || ''}">${titlebar(os, title)}${body}</div>`;
const item = (os, it) => `<div class="sc-item${hit(it.hit)}">${it.kind === 'photo' ? (it.art || TRAIL)(54) : ''}<i class="sc-pic sc-${it.kind || 'dir'}${!it.kind ? (os === 'mac' ? ' sc-dirm' : ' sc-dirw') : ''}"${it.kind === 'photo' ? ' style="display:none"' : ''}></i><span class="${it.edit ? 'sc-edit' : ''}">${esc(it.name)}${it.edit ? '<i class="sc-caret"></i>' : ''}</span></div>`;
/* File Explorer (Windows) or Finder (Mac); f.btns = [[label, isHit], ...] draws the buttons of an Open Folder window */
function files(os, f) {
  const side = os === 'mac' ? ['Applications', 'Desktop', 'Documents', 'Downloads', 'Pictures'] : ['Home', 'Desktop', 'Downloads', 'Documents', 'Pictures'];
  return win(os, f.title || f.on, `<div class="sc-body"><div class="sc-side">${side.map(n => `<div class="${n === f.on ? 'sc-on' : ''}${hit(n === f.hitSide)}">${n}</div>`).join('')}</div>` +
    `<div class="sc-main">${(f.items || []).map(it => item(os, it)).join('')}</div></div>` +
    (f.btns ? `<div class="sc-dbtns">${f.btns.map(b => `<span class="sc-btn${hit(b[1])}">${esc(b[0])}</span>`).join('')}</div>` : ''));
}
const fm = os => o(os, 'File Explorer', 'Finder');
/* VS Code. v: {panel, tabs, ed, hitMenu, title} */
function vs(os, v) {
  v = v || {};
  const act = `<div class="sc-act"><span class="${v.onAct === 'ext' ? '' : 'sc-acton'}${hit(v.hitAct === 'files')}">${I.files}</span><span>${I.search}</span><span class="${v.onAct === 'ext' ? 'sc-acton' : ''}${hit(v.hitAct === 'ext')}">${I.ext}</span></div>`;
  const tabs = (v.tabs || []).map(t => `<span class="sc-vtab${t.on ? ' sc-von' : ''}${hit(t.hit)}">${esc(t.name)}${t.dot ? ' &#9679;' : ''}</span>`).join('');
  const bar = os === 'mac' ? '' : `<div class="sc-vmenu">${['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Help'].map(m => `<span class="${m === v.hitMenu ? 'sc-hit' : ''}">${m}</span>`).join('')}</div>`;
  const body = `${bar}<div class="sc-body sc-vbody">${act}${v.panel ? `<div class="sc-vside">${v.panel}</div>` : ''}<div class="sc-ved${hit(v.hitEd)}">${tabs ? `<div class="sc-vtabs">${tabs}</div>` : ''}<div class="sc-vtext">${v.ed || ''}</div></div></div>`;
  return win(os, v.title || 'Visual Studio Code', body, 'sc-vs');
}
/* the Explorer panel of VS Code: rows = [{name, dir, open, indent, on, hit, edit}] */
function explorer(rows, x) {
  { const g = {}, rest = []; let cur = null;
    rows.forEach(r => { if (r.dir) { cur = r.name; g[cur] = [r]; } else if (r.indent && cur) g[cur].push(r); else { cur = null; rest.push(r); } });
    rows = ['css', 'images', 'js'].reduce((all, n) => all.concat(g[n] || [{ name: n, dir: true }]), []).concat(rest); }
  x = x || {};
  const btns = x.btns ? `<span class="sc-xbtns${hit(x.hitBtns)}"><span class="${hit(x.hitNewFile)}" title="New File">${I.newfile}</span><span class="${hit(x.hitNewFolder)}" title="New Folder">${I.newfolder}</span><span title="Refresh">${I.refresh}</span><span title="Collapse">${I.collapse}</span></span>` : '';
  return `<div class="sc-vhead">EXPLORER</div><div class="sc-vrow sc-vroot${hit(x.hitRoot)}"><span>&#8964; ${esc(FOLDER.toUpperCase())}</span>${btns}</div>` +
    rows.reduce((all, r) => all.concat([r], r.name === FILE && !r.solo && !r.edit ? OTHERS.map(n => ({ name: n })) : []), []).map(r => `<div class="sc-vrow${r.on ? ' sc-vsel' : ''}${hit(r.hit)}" style="padding-left:${18 + (r.indent || 0) * 14}px"><span class="sc-tw">${r.dir ? (r.open ? '&#8964;' : '&gt;') : ''}</span><i class="sc-fi sc-fi-${r.dir ? 'dir' : /\.css$/.test(r.name) ? 'css' : /\.js$/.test(r.name) ? 'js' : /\.(jpg|png)$/.test(r.name) ? 'img' : 'html'}"></i>${r.edit ? `<span class="sc-vedit">${esc(r.name)}<i class="sc-caret"></i></span>` : esc(r.name)}</div>`).join('') + (x.menu || '');
}
const ABOUT = { name: FILE }, TAB = [{ name: FILE, on: true }];
const br = (os, tab, addr, body) => win(os, tab, `<div class="sc-addr">${esc(addr)}</div><div class="sc-page sc-plain" style="text-align:left">${body}</div>`);

/* ------------------------------------------------------------------ the editor (behaves like VS Code) */
const REC = [], PEND = [];   /* a record of every key the student presses: for testing the steps in real VS Code */
const VOID = /^(area|base|br|col|hr|img|input|link|meta|source|track|wbr)$/;
class Editor {
  constructor(text) { this.L = text.split('\n'); this.r = 0; this.c = 0; this.fresh = []; }
  text() { return this.L.join('\n'); }
  find(match, last) {
    let at = -1;
    this.L.forEach((l, k) => { if (l.indexOf(match) >= 0 && (last || at < 0)) at = k; });
    if (at < 0) throw new Error('line not found: ' + match);
    return at;
  }
  /* when text goes in, anything already marked to its right moves over with it */
  shift(n) { this.fresh.forEach(f => { if (f.r === this.r && f.a >= this.c) { f.a += n; f.b += n; } }); }
  /* the student types s at the cursor */
  ins(s, kind) { if (kind !== 'auto') PEND.push({ t: s }); this.shift(s.length); const l = this.L[this.r]; this.L[this.r] = l.slice(0, this.c) + s + l.slice(this.c); this.fresh.push({ r: this.r, a: this.c, b: this.c + s.length, kind: kind || 'typed' }); this.c += s.length; }
  /* VS Code adds s after the cursor; the cursor stays in front of it */
  after(s) { this.shift(s.length); const l = this.L[this.r]; this.L[this.r] = l.slice(0, this.c) + s + l.slice(this.c); this.fresh.push({ r: this.r, a: this.c, b: this.c + s.length, kind: 'auto' }); }
  /* typing a beginning tag: VS Code adds the ending tag */
  open(tag) { if (VOID.test(tag)) throw new Error(tag + ' has no ending tag'); this.ins('<' + tag + '>'); this.after('</' + tag + '>'); }
  end() { this.c = this.L[this.r].length; }
  /* Backspace over one space */
  back() { if (this.L[this.r][this.c - 1] !== ' ') throw new Error('Backspace: no space to erase'); PEND.push({ k: 'Backspace' }); this.L[this.r] = this.L[this.r].slice(0, this.c - 1) + this.L[this.r].slice(this.c); this.c -= 1; }
  enter() {
    PEND.push({ k: 'Enter' });
    const line = this.L[this.r], before = line.slice(0, this.c), aft = line.slice(this.c), ind = /^\s*/.exec(line)[0];
    if (!line.trim()) { this.L.splice(this.r, 1, '', ind); this.r += 1; this.c = ind.length; return 'line'; }   /* VS Code clears the spaces on a line left empty */
    if (/\{$/.test(before) && aft.indexOf('}') === 0) { this.L.splice(this.r, 1, before, ind + '    ', ind + aft); this.r += 1; this.c = ind.length + 4; return 'split'; }
    const m = /<([a-zA-Z][a-zA-Z0-9]*)(\s[^<>]*)?>$/.exec(before);
    const opens = m && !VOID.test(m[1]) && m[1] !== 'html';
    if (opens && aft.indexOf('</' + m[1] + '>') === 0) {          /* Enter between <div> and </div> */
      this.L.splice(this.r, 1, before, ind + '    ', ind + aft); this.r += 1; this.c = ind.length + 4; return 'split';
    }
    if (opens) { if (aft.trim()) throw new Error('Enter in the middle of a line'); this.L.splice(this.r + 1, 0, ind + '    '); this.r += 1; this.c = ind.length + 4; return 'open'; }
    if (aft.trim()) throw new Error('Enter in the middle of a line: not used in this tutorial');
    const far = /<!-- /.test(line) ? ' ' : '';   /* tested in VS Code: after <!-- and a space, the new line starts one space too far right */
    this.L.splice(this.r + 1, 0, ind + far); this.r += 1; this.c = ind.length + far.length; return 'line';   /* Enter at the end of a line: same indent */
  }
}
const escC = s => esc(s).replace(/'/g, '&#39;');
/* one code picture: the lines around the cursor, line numbers, yellow = just typed, underlined = VS Code
   added it, blue = highlighted, and the cursor exactly where it is. opt: {noCursor, all} */
function shot(ed, file, opt) {
  opt = opt || {};
  const from = opt.all ? 0 : Math.max(0, ed.r - 5), to = opt.all ? ed.L.length - 1 : Math.min(ed.L.length - 1, ed.r + 3);
  let rows = '';
  for (let k = from; k <= to; k++) {
    const l = ed.L[k], cls = new Array(l.length).fill('');
    ed.fresh.filter(f => f.r === k).forEach(f => { for (let x = f.a; x < f.b; x++) cls[x] = f.kind; });
    let html = '', open = '';
    for (let x = 0; x <= l.length; x++) {
      if (k === ed.r && x === ed.c && !opt.noCursor) { if (open) { html += '</span>'; open = ''; } html += '<span class="cur"></span>'; }
      if (x === l.length) break;
      if (cls[x] !== open) { if (open) html += '</span>'; open = cls[x]; if (open) html += '<span class="k-' + open + '">'; }
      html += escC(l[x]);
    }
    if (open) html += '</span>';
    rows += '<span class="sl' + (k === ed.r ? ' on' : '') + '"><span class="sn">' + (k + 1) + '</span>' + html + '</span>\n';
  }
  const l = ed.L[ed.r], near = (l.slice(0, ed.c) + ' [the cursor is here] ' + l.slice(ed.c)).trim();
  const got = kind => ed.fresh.filter(f => f.kind === kind).map(f => ed.L[f.r].slice(f.a, f.b).trim()).filter(Boolean);
  const typed = got('typed').join(''), added = got('auto'), sel = got('sel').join('');
  const alt = 'Picture of the code in ' + file + (ed.L.length === 1 && !l ? '. The file is empty' : ', lines ' + (from + 1) + ' to ' + (to + 1)) + '. ' +
    (opt.noCursor ? 'Line ' + (ed.r + 1) + ' is highlighted. It says: ' + l.trim() + '.'
      : 'The cursor is on line ' + (ed.r + 1) + (l.trim() ? ', at this place: ' + near + '.' : ', which is an empty line.')) +
    (typed ? ' Just typed, in yellow: ' + typed + '.' : '') +
    (added.length ? ' Added by VS Code, underlined: ' + (added.length > 3 ? 'all ' + added.length + ' lines' : added.join(' ')) + '.' : '') +
    (sel ? ' Highlighted in blue: ' + sel + '.' : '');
  return { alt, html: '<div class="shot"><span class="shotfile">' + file + '</span><pre>' + rows + '</pre></div>' };
}

/* ---------- the journey ---------- */
const SECTIONS = ['Start here', 'Make your folders, your pictures and your files', 'Type your About page', 'See your page', 'Style your page with CSS', 'Lay out your page for every screen', 'Make your menu open and close', 'Add pictures in a zigzag', 'Style your six parts', 'Add icons to your labels']
  .map((t, i) => ({ n: i + 1, t, page: 'Part ' + (i + 1), cap: 'Part ' + (i + 1), folder: '', noTemplate: true }));

const T = [];
const task = t => T.push(t);
const enterKey = os => o(os, 'Enter', 'Return');
const backKey = os => o(os, 'Backspace', 'Delete');
const mod = os => o(os, 'Ctrl', 'Command');
const OWN = 'Use your own. The example is only an example.';

/* ---------- the example words and the small drawings of the six parts ---------- */
const ME = (w, style) => `<svg viewBox="0 0 60 60" width="${w || 60}" height="${w || 60}" aria-hidden="true" style="${style || ''}"><rect width="60" height="60" fill="#8fb8de"/><ellipse cx="30" cy="56" rx="19" ry="22" fill="#1d4e89"/><circle cx="30" cy="23" r="11" fill="#e8b98f"/><path d="M19 21 a11 11 0 0 1 22 0 Z" fill="#3b2a20"/></svg>`;
const box = inner => `<div class="sc-board"><div style="background:#0b1026;color:#eef1ff;border:2px solid #6b7587;border-radius:8px;padding:12px;width:100%;max-width:330px;text-align:left;font-family:Arial,sans-serif">${inner}</div></div>`;
const QUOTE = 'Alex listens first, and then builds exactly what you asked for.', BY = 'Sam Lee, lab partner';
const MOMENTS = ['First class: I made my first web page.', 'Second class: I learned to style pages with CSS.', 'Now: I am building a site for a local bakery.'];
const SKILLS = ['HTML', 'CSS', 'Photography', 'Teamwork'];
const TWO = 'I make simple web sites that are easy to use. I am looking for my first web design job.';
const STORY = ['I made my first web page in a class, and I was hooked.', 'Now I build one small site every month to practice.'];
const ASK = 'Want to see what I have made?', GO = 'See my gallery';
const QUOTE2 = 'Alex explains things so clearly that I finally understood my own web site.', BY2 = 'Dana Cho, classmate';
const D = {
  profile: pic('An example of a profile intro: on the left, one big sentence with a few gold words, two short lines and two buttons. On the right, a photo of Alex.', box(`<div style="display:flex;gap:10px;align-items:center"><div style="flex:1"><b style="display:block;font-family:Georgia,serif;font-size:1.15em;line-height:1.15">${BIG[0]}<span style="color:#f5c84c">${BIG[1]}</span>${BIG[2]}</b><span style="display:block;margin:4px 0">${TWO}</span><span style="display:inline-block;padding:3px 8px;border-radius:6px;background:#f5c84c;color:#05081a;font-weight:700">Read my story</span></div>${ME(84, 'border-radius:4px;display:block')}</div>`)),
  story: pic('An example of a reading column: the heading My Story and two short paragraphs in a narrow column in the middle of the page, with empty space on both sides.', box(`<div style="max-width:190px;margin:0 auto"><b style="display:block">My Story</b><span style="display:block">${STORY[0]}</span><span style="display:block;margin-top:6px">${STORY[1]}</span></div>`)),
  timeline: pic('An example of a timeline: a gold line going down the left side, with three moments next to it. First class. Second class. Now.', box(`<b style="display:block;margin-bottom:6px">My Journey</b><div style="border-left:4px solid #f5c84c;padding-left:14px">${MOMENTS.map(m => `<span style="display:block;margin-bottom:8px">${m}</span>`).join('')}</div>`)),
  skills: pic('An example of skill tags: four small rounded boxes in a row, with the words HTML, CSS, Photography and Teamwork.', box(`<b style="display:block;margin-bottom:6px">My Skills</b><div style="display:flex;flex-wrap:wrap;gap:6px">${SKILLS.map(t => `<span style="padding:3px 10px;border:2px solid #f5c84c;border-radius:999px;font-weight:600">${t}</span>`).join('')}</div>`)),
  trust: pic('An example of testimonials: two quotes side by side, each in large letters, with a name under it. The first says: ' + QUOTE + ' ' + BY + '. The second says: ' + QUOTE2 + ' ' + BY2 + '.', box(`<div style="display:flex;gap:12px">${[[QUOTE, BY], [QUOTE2, BY2]].map(q => `<div style="flex:1;font-family:Georgia,serif;font-size:1.1em"><span style="display:block">${q[0]}</span><span style="display:block;margin-top:6px;font-family:Arial,sans-serif;font-size:.8em;color:#aab3d6">${q[1]}</span></div>`).join('')}</div>`)),
  action: pic('An example of a call to action: the question ' + ASK + ' on a gold band, with two buttons: a dark one and an outlined one. One says ' + GO + '. The other says Send me a message.', box(`<div style="text-align:center;background:#f5c84c;color:#05081a;border-radius:6px;padding:10px"><b style="display:block;font-size:1.1em;margin-bottom:8px;font-family:Georgia,serif">${ASK}</b><span style="display:inline-block;padding:8px 14px;border-radius:8px;background:#05081a;color:#f5c84c;font-weight:600;margin:0 4px 4px 0">${GO}</span><span style="display:inline-block;padding:8px 14px;border-radius:8px;border:2px solid #05081a;color:#05081a;font-weight:600">Send me a message</span></div>`))
};

/* ===== 1. Start here =====  (keep this first task: it teaches the page itself) */
task({ id: 'how-it-works', sec: 1, title: 'See how this tutorial works.', sub: 'Learn the three moves you will repeat in every task: read, do, tick.',
  why: 'Small steps keep you from getting lost.',
  without: 'You skip around, miss a step and get stuck later.',
  how: 'Each task has a few steps. Each step is one action, with a drawing of what to look for.',
  steps: [
    ['At the top of this page, find <b>My computer</b>. Click <b>Mac</b> or <b>Windows</b>, to match the computer you use.', note('My computer:  Mac  |  Windows', 'The computer steps change to match your choice.')],
    ['Find <b>Go to</b>, just above the title of this task. It is a list of every part of this tutorial, with every task in it. Choose what you want to learn, at any time: look ahead, go back, or pick up where you stopped. Leave it where it is for now.', note('Go to:  See how this tutorial works', 'Choose what you want to learn, at any time.')],
    ['Read <b>one</b> step. Then do that one step. The drawing under the step shows what to look for.', cards([['1. Read', 'one step'], ['2. Do', 'that step'], ['3. Tick', 'the box when it is done']])],
    ['When the steps are done, scroll down to <b>Check it yourself</b> and tick each box that is true.', ticks(['I picked Mac or Windows.', 'I know each step is one action.'])]
  ],
  check: ['I picked Mac or Windows at the top of the page.', 'I know each step is one action.', 'I know I can open any part or task at any time with Go to.'],
  hints: ['The Mac and Windows buttons are in the bar at the very top of the page.', 'On a phone, the page is narrow. Tap <b>All steps</b> to see the whole journey.'],
  learn: '<b>Level up:</b> press <b>Listen</b> to hear a task read out loud, or open <b>Display &amp; audio</b> to make the text larger.' });

task({ id: 'six-parts', sec: 1, title: 'Meet the six parts of an About page.', sub: 'See what you will build: six parts, each with one job, in the order a visitor needs them.',
  why: 'An About page is not a list of facts about you. Each part answers one question a visitor has, in the order they ask it.',
  without: 'You write whatever comes to mind, in any order, and the visitor cannot find what they came for.',
  how: 'These steps only ask you to look. The six parts are: Hook, Story, Journey, Skills, Trust and Action. You will build all six, one at a time. The example person is Alex Rivera.',
  steps: [
    ['<b>1. Hook: the profile intro.</b> Lead with your photo and two lines on who you are. <b>Why:</b> a visitor decides in a few seconds if they are in the right place. A face and two clear lines answer the question: whose page is this?', D.profile, '<b>Hook:</b> your photo and two lines.'],
    ['<b>2. Story: the reading column.</b> Tell the longer story in a column that is easy to read. <b>Why:</b> facts say what you do, and a story says why. Lines that are too long tire the eye, so the column is narrow.', D.story, '<b>Story:</b> a longer text in a narrow column.'],
    ['<b>3. Journey: the timeline.</b> Show how you got here, one moment at a time. <b>Why:</b> people remember a path better than a list of facts, and a timeline shows that you keep growing.', D.timeline, '<b>Journey:</b> a timeline, one moment at a time.'],
    ['<b>4. Skills: the skill tags.</b> List what you can do as short tags: one or two words each. <b>Why:</b> a person who is in a hurry can read tags in one look, without reading sentences.', D.skills, '<b>Skills:</b> short tags that are read in one look.'],
    ['<b>5. Trust: the testimonials.</b> Let people who know your work speak for you. <b>Why:</b> visitors believe what others say about you more than what you say about yourself. Always ask a person before you use their words and their name.', D.trust, '<b>Trust:</b> the words of people who know your work.'],
    ['<b>6. Action: the call to action.</b> End by pointing to your gallery or your contact page. <b>Why:</b> a visitor who liked your page wants to know what to do next. Give them a clear next step, at the end of the page, where the eye stops.', D.action, '<b>Action:</b> a clear link to your gallery or your contact page.'],
    ['Say the six names out loud, in order: <b>Hook, Story, Journey, Skills, Trust, Action</b>. You will see these six names in every part of this tutorial.', ticks(['Hook', 'Story', 'Journey', 'Skills', 'Trust', 'Action']), 'Hook, Story, Journey, Skills, Trust, Action.']
  ],
  check: ['I can name the six parts in order: Hook, Story, Journey, Skills, Trust, Action.', 'I can say what question one of them answers.'],
  hints: ['A way to remember the order: first who you are (Hook, Story), then what you have done (Journey, Skills), then why to believe you (Trust), then what to do next (Action).'],
  learn: '<b>Level up:</b> look at the About page of a person or a small business you like. Which of these six parts does it use? In what order?' });

task({ id: 'plan-page', sec: 1, title: 'Plan your About page.', sub: 'Write down, on paper or in a note, the words for each of your six parts.',
  why: 'When your words are ready first, typing the code is the only new thing to think about.',
  without: 'You stop in the middle of a line of code to think of words, and you lose your place.',
  how: 'You write a few words for each part, in order. Every step shows what Alex wrote. Use your own words: the example is only an example.',
  steps: [
    ['Write your <b>name</b>, and <b>one big sentence</b> that says who you are. Your name goes in the bar at the very top of your page, like a logo. The sentence becomes the biggest words on your page. Underline the two or three words in it that matter most: they will turn gold. Alex writes <b>' + NAME + '</b> and <b>' + BIG.join('') + '</b>, and underlines <b>' + BIG[1] + '</b>.',
     note(NAME, BIG.join('')), 'Write your <b>name</b> and one big sentence that says who you are.'],
    ['<b>Hook.</b> Write <b>two short sentences</b> about who you are. Alex writes: <b>I am a student, and I am learning to make web pages.</b>',
     note('Hook: who I am', 'Hello. My name is Alex Rivera. I am a student, and I am learning to make web pages.'), '<b>Hook:</b> two short sentences about who you are.'],
    ['<b>Story.</b> Write <b>two short paragraphs</b>: how you started, and where you are now. Alex writes: <b>' + STORY[0] + '</b> and <b>' + STORY[1] + '</b>',
     ticks(STORY), '<b>Story:</b> how you started, and where you are now.'],
    ['<b>Journey.</b> Write <b>three moments</b>, oldest first. For each one: when, a colon, and what happened. Do not use dates: words like <b>First class</b> and <b>Now</b> stay true longer. Alex writes three.',
     ticks(MOMENTS), '<b>Journey:</b> three moments, oldest first.'],
    ['<b>Skills.</b> Write <b>four skills</b>, one or two words each. Alex writes: <b>' + SKILLS.join('</b>, <b>') + '</b>.',
     ticks(SKILLS), '<b>Skills:</b> four skills, one or two words each.'],
    ['<b>Trust.</b> Ask <b>two people</b> who know your work for one sentence each, and ask if you may use their names. A classmate, a teacher, a coworker or a person you helped can all say something true. Write down their words exactly.',
     ticks([QUOTE + ' ' + BY, QUOTE2 + ' ' + BY2]), '<b>Trust:</b> ask two people for one sentence each.'],
    ['<b>Action.</b> Write <b>one short question</b> that invites the visitor to do something next. Alex writes: <b>' + ASK + '</b>',
     note('Action', ASK), '<b>Action:</b> one short question that invites.'],
    ['Read your notes one time. Cross out anything <b>private</b>: your home address, your phone number, your email address, your birthday, a password. A web page can be seen by anyone, and robots collect email addresses from pages to send them spam.',
     gb(['Fine to share', 'your name, what you study, what you can do, a goal'], ['Keep private', 'home address, phone number, email address, birthday, passwords'])]
  ],
  check: ['I wrote my name and one big sentence, and I underlined two or three words in it.', 'I wrote words for all six parts: Hook, Story, Journey, Skills, Trust, Action.', 'The two quotes are real, and both people said I may use their words and names.', 'My notes have no home address, phone number, email address, birthday or password.'],
  hints: ['Not sure what to say about yourself? Answer one question: what are you learning right now?', 'No one to ask for a quote today? Send two messages now and keep going. Leave a blank line in your notes and fill it in when they answer. Never make up a quote or a name.', 'Short is good. A visitor reads an About page in less than a minute.', 'You may use only your first name if you do not want your full name on a web page.'],
  learn: '<b>Level up:</b> read your notes out loud from top to bottom. Do they sound like one person telling one story?' });

task({ id: 'open-vscode', sec: 1, title: 'Open Visual Studio Code.', sub: 'Start the program you will type your page in.',
  why: 'Visual Studio Code (VS Code for short) is a free program for writing code. It types ending tags for you and shows line numbers.',
  without: 'A writing program like Word adds hidden formatting, and the page does not work in a browser.',
  how: 'You search your computer for the program by name and open it.',
  steps: [
    [os => o(os, 'Look at the taskbar at the bottom of your screen. Click the <b>Start</b> button. The Start menu opens.', 'Press <kbd>Command</kbd>+<kbd>Space</kbd> (hold Command and press the Space bar). A search bar opens in the middle of the screen.'),
     os => o(os, pic('The Windows desktop. On the taskbar at the bottom, the Start button is outlined.', desk(os, '', { hitDock: 'start' })), keys(['Command', 'Space'], 'A search bar opens.')),
     os => o(os, 'Click the <b>Start</b> button.', 'Press <b>Command+Space</b>. A search bar opens.')],
    ['Type <b>visual studio code</b>. A list of results shows as you type.',
     os => pic('A search box with the words visual studio code typed in it. Under it, the first result is Visual Studio Code.', `<div class="sc-board sc-col"><span class="sc-btn sc-hit">visual studio code<i class="sc-caret"></i></span><span>Visual Studio Code</span></div>`)],
    [os => o(os, 'In the list of results, click <b>Visual Studio Code</b>. The VS Code window opens.', 'Press <kbd>Return</kbd>. The VS Code window opens.'),
     os => pic('The VS Code window, open. A dark window with a strip of icons down its left side.', vs(os, { ed: 'Welcome' })),
     os => o(os, 'Click <b>Visual Studio Code</b>. The window opens.', 'Press <b>Return</b>. The VS Code window opens.')]
  ],
  check: ['The VS Code window is open on my screen.'],
  hints: ['Visual Studio Code is not in the results? It is not installed yet. Go to the <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">Visual Studio Code download page (opens in a new tab)</a>, install it, and do this task again.',
    'You see <b>Visual Studio</b> with no word Code after it? That is a different program. Choose the one named <b>Visual Studio Code</b>, with a blue icon.',
    'Windows and Mac screens change from version to version. Yours may look a little different from the drawings.'],
  learn: '<b>Level up:</b> keep VS Code one click away. On Windows, right-click its icon on the taskbar and click <b>Pin to taskbar</b>. On a Mac, right-click its icon in the Dock, point to <b>Options</b> and click <b>Keep in Dock</b>.' });

/* ===== 2. Make your folders, your pictures and your files ===== */
task({ id: 'make-folder', sec: 2, title: 'Make your folder on the Desktop.', sub: 'Make one new folder and give it your name. It will hold your whole web site.',
  why: 'A web site is one folder. Every page, picture and stylesheet of the site lives inside it, so the pages can find each other.',
  without: 'Your page ends up somewhere on your computer and you cannot find it again.',
  how: 'You name the folder with your own last name, an underscore ( _ ) and the word site. Web names are all lowercase with no spaces. Alex Rivera\'s folder is ' + FOLDER + '.',
  steps: [
    [os => o(os, '<b>Right-click</b> an <b>empty</b> part of your Desktop: the big screen behind all your windows. A menu opens.', 'Click one time on an <b>empty</b> part of your Desktop: the big screen behind all your windows. The top left corner of the screen now says <b>Finder</b>.'),
     os => o(os, pic('The Windows desktop. A menu has opened on an empty part of it. The menu lists View, Sort by, Refresh and New.', desk(os, menu(['View', 'Sort by', 'Refresh', '-', 'New'], ''))),
       pic('The Mac desktop. The menu bar across the top of the screen starts with the word Finder.', desk(os, ''))),
     os => o(os, '<b>Right-click</b> an empty part of the Desktop.', 'Click an empty part of the Desktop.')],
    [os => o(os, 'In the menu, point to <b>New</b>. A second menu opens next to it.', 'At the very top of the screen, click <b>File</b>. A menu opens.'),
     os => o(os, pic('The menu on the Windows desktop. The choice New is outlined.', desk(os, menu(['View', 'Sort by', 'Refresh', '-', 'New'], 'New'))),
       pic('The Mac desktop. In the menu bar at the very top of the screen, the word File is outlined.', desk(os, '', { hitMenu: 'File' })))],
    [os => o(os, 'In the second menu, click <b>Folder</b>. A new folder appears on the Desktop, with its name highlighted.', 'In the menu, click <b>New Folder</b>. A new folder appears on the Desktop, with its name highlighted.'),
     os => o(os, pic('The second menu on the Windows desktop. It lists Folder, Shortcut and Text Document. The choice Folder is outlined.', desk(os, menu(['Folder', 'Shortcut', 'Text Document'], 'Folder'))),
       pic('The File menu on the Mac desktop. It lists New Finder Window, New Folder and New Smart Folder. The choice New Folder is outlined.', desk(os, menu(['New Finder Window', 'New Folder', 'New Smart Folder'], 'New Folder'), { hitMenu: 'File' })))],
    ['Type your folder name: your last name, an underscore ( _ ), then <b>site</b>. Use all lowercase letters and no spaces. Alex types <b>' + FOLDER + '</b>.',
     os => pic('The desktop. The new folder has a name box with ' + FOLDER + ' typed in it. The box is outlined.', desk(os, item(os, { name: FOLDER, edit: true, hit: true }))),
     'Type your last name, an underscore and <b>site</b>. Alex types <b>' + FOLDER + '</b>.'],
    [os => `Press <kbd>${enterKey(os)}</kbd>. The name is saved.`,
     os => pic('The desktop. The folder is now named ' + FOLDER + '. It is outlined.', desk(os, item(os, { name: FOLDER, hit: true })))]
  ],
  check: ['My folder is on the Desktop, not inside another folder.', 'Its name is my last name, an underscore, then site.', 'The name is all lowercase and has no spaces.'],
  hints: [os => `The name did not take? Click the folder one time and press <kbd>${o(os, 'F2', 'Return')}</kbd>. The name opens again. Type it again and press <kbd>${enterKey(os)}</kbd>.`,
    'The underscore: hold <kbd>Shift</kbd> and press the key with <b>-</b> and <b>_</b> on it, next to the number 0.',
    'Your Desktop is hidden behind windows? Make each window small, or move it to the side, until you see an empty part of the Desktop.'],
  learn: '<b>Level up:</b> why no spaces? In a web address a space turns into <b>%20</b>, so <b>my page.html</b> becomes <b>my%20page.html</b>. An underscore or a hyphen stays easy to read.' });

task({ id: 'open-folder', sec: 2, title: 'Open your folder in VS Code.', sub: 'Tell VS Code which folder you are working in.',
  why: 'You open the whole folder, not one file. Then VS Code saves your page in the right place by itself.',
  without: 'VS Code asks where to save every new file, and the file can land in the wrong folder.',
  how: 'The Explorer panel on the left side of VS Code shows the folder you opened and every file in it.',
  steps: [
    [os => o(os, 'Look at the taskbar at the bottom of your screen. Click the <b>Visual Studio Code</b> icon. VS Code comes to the front.', 'Look at the Dock at the bottom of your screen. Click the <b>Visual Studio Code</b> icon. VS Code comes to the front.'),
     os => pic(o(os, 'The Windows desktop. On the taskbar at the bottom, the VS Code icon is outlined.', 'The Mac desktop. In the Dock at the bottom, the VS Code icon is outlined.'), desk(os, '', { hitDock: 'code' })),
     'Click the <b>Visual Studio Code</b> icon.'],
    [os => o(os, 'At the top left of the VS Code window, click <b>File</b>. A menu opens.', 'At the very top of the screen, click <b>File</b>. A menu opens.'),
     os => o(os, pic('The VS Code window on Windows. In the row of menu names at its top left, File is outlined.', vs(os, { hitMenu: 'File', ed: 'Welcome' })),
       pic('The VS Code window on a Mac. In the menu bar at the very top of the screen, File is outlined.', desk(os, vs(os, { ed: 'Welcome' }), { app: 'Code', hitMenu: 'File' })))],
    ['In the menu, click <b>Open Folder\u2026</b> A window opens. Your menu has more choices than the drawing: that is fine.',
     os => pic('The File menu of VS Code. It lists New Text File, New File, New Window and Open Folder. The choice Open Folder is outlined.', `<div class="sc-board">${menu(['New Text File', 'New File\u2026', 'New Window', '-', 'Open Folder\u2026'], 'Open Folder\u2026', true)}</div>`),
     'Click <b>Open Folder\u2026</b>'],
    ['On the left side of the window that opened, click <b>Desktop</b>. The window shows what is on your Desktop.',
     os => pic(`The Open Folder window. In the list on its left side, Desktop is outlined. The right side shows the folder ${FOLDER}.`, files(os, { title: 'Open Folder', on: 'Desktop', hitSide: 'Desktop', items: [{ name: FOLDER }], btns: [['Cancel'], [o(os, 'Select Folder', 'Open')]] }))],
    ['Click your folder <b>one</b> time, so it is highlighted. Alex clicks <b>' + FOLDER + '</b>. Do not double-click it.',
     os => pic(`The Open Folder window, showing the Desktop. The folder ${FOLDER} is outlined.`, files(os, { title: 'Open Folder', on: 'Desktop', items: [{ name: FOLDER, hit: true }], btns: [['Cancel'], [o(os, 'Select Folder', 'Open')]] })),
     'Click your folder <b>one</b> time.'],
    [os => `Click the <b>${o(os, 'Select Folder', 'Open')}</b> button at the bottom of the window. The window closes.`,
     os => pic(`The Open Folder window. The folder ${FOLDER} is highlighted. At the bottom, the button ${o(os, 'Select Folder', 'Open')} is outlined.`, files(os, { title: 'Open Folder', on: 'Desktop', items: [{ name: FOLDER }], btns: [['Cancel'], [o(os, 'Select Folder', 'Open'), true]] }))],
    ['VS Code may ask <b>Do you trust the authors of the files in this folder?</b> Click <b>Yes, I trust the authors</b>. You made this folder, so it is safe. If VS Code does not ask, go on to the next step.',
     pic('A VS Code message that asks: Do you trust the authors of the files in this folder? It has two buttons. The button Yes, I trust the authors is outlined.', `<div class="sc-board sc-col"><b>Do you trust the authors of the files in this folder?</b><span><span class="sc-btn sc-hit">Yes, I trust the authors</span> <span class="sc-btn">No, I don't trust the authors</span></span></div>`),
     'If VS Code asks, click <b>Yes, I trust the authors</b>.'],
    ['Look at the left side of VS Code. This panel is called the <b>Explorer</b>. Your folder name is at its top. VS Code shows the name in capital letters: that is only how it looks. Under it are the three folders you made: <b>css</b>, <b>images</b> and <b>js</b>.',
     os => pic(`VS Code. In the Explorer panel on the left side, the folder name at the top, ${FOLDER} in capital letters, is outlined. There are no files under it yet.`, vs(os, { title: FOLDER, panel: explorer([], { hitRoot: true }) })),
     'Your folder name is at the top of the <b>Explorer</b>.']
  ],
  check: ['The Explorer shows my folder name at the top.', 'There are no files under it yet.'],
  hints: ['No Explorer panel? Click the top icon in the strip on the far left of VS Code: two sheets of paper.',
    'Opened the wrong folder? Click <b>File</b>, then <b>Close Folder</b>, and do this task again.',
    'Clicked No by mistake? The bottom left corner of VS Code says <b>Restricted Mode</b>. Click those words, then click <b>Trust</b>.'],
  learn: '<b>Level up:</b> you can also drag your folder from the Desktop and drop it on the VS Code window. It opens the same way.' });

task({ id: 'make-file', sec: 2, title: 'Make your about.html file.', sub: 'Make the empty file that will become your About page.',
  why: 'A web page is a file whose name ends in .html. The ending tells the browser, and VS Code, that the file holds HTML.',
  without: 'With the wrong ending, VS Code does not help you type tags, and the browser shows your code as plain text.',
  how: 'The name is about.html: all lowercase, no spaces, with a dot before html.',
  steps: [
    ['Move your mouse pointer over your folder name at the top of the Explorer. Do not click yet. Four small buttons appear on that line.',
     os => pic('The Explorer panel. On the line with the folder name, four small buttons now show. The four buttons are outlined.', vs(os, { title: FOLDER, panel: explorer([], { btns: true, hitBtns: true }) })),
     'Point at your folder name. Four small buttons appear.'],
    ['Click the <b>first</b> button, <b>New File</b>: a page with a plus sign. A small box opens in the Explorer, with the cursor blinking in it.',
     os => pic('The Explorer panel. On the line with the folder name, the first of the four buttons, New File, a page with a plus sign, is outlined. A small empty box has opened under the folder name.', vs(os, { title: FOLDER, panel: explorer([{ name: '', edit: true }], { btns: true, hitNewFile: true }) })),
     'Click <b>New File</b>, the first button.'],
    ['Type <b>about.html</b> in the small box. Use all lowercase letters, with a dot before <b>html</b>.',
     os => pic('The small box in the Explorer with about.html typed in it, in lowercase. The box is outlined.', vs(os, { title: FOLDER, panel: explorer([{ name: FILE, edit: true, hit: true }], { btns: true }) })),
     'Type <b>about.html</b> in lowercase.'],
    [os => `Press <kbd>${enterKey(os)}</kbd>. The file <b>about.html</b> is now in the Explorer. It also opens in the big middle part of VS Code, with a tab named <b>about.html</b> at the top. The file is empty. That is correct.`,
     os => pic('VS Code. The Explorer lists about.html under the folder name. In the big middle part, a tab named about.html is open and outlined. The file is empty.', vs(os, { title: FOLDER, panel: explorer([{ name: FILE, on: true, solo: true }]), tabs: [{ name: FILE, on: true, hit: true }], ed: '<span class="sc-ln">1</span>' })),
     os => `Press <b>${enterKey(os)}</b>. The file opens, and it is empty.`]
  ],
  check: ['about.html is listed under my folder name in the Explorer.', 'Its name is all lowercase: about.html.', 'A tab named about.html is open, and the file is empty.'],
  hints: ['The four buttons do not show? Your mouse pointer must be over the Explorer panel. Move it onto the line with your folder name.',
    os => `Wrong name? In the Explorer, right-click the file and click <b>Rename\u2026</b> Type <b>about.html</b> and press <kbd>${enterKey(os)}</kbd>.`,
    'The name is <b>about.html.txt</b> or has no dot? Rename it. The name must end in <b>.html</b> and nothing else.'],
  learn: '<b>Level up:</b> the first page of a web site is always named <b>index.html</b>. Other pages are named for what they hold: <b>about.html</b>, <b>contact.html</b>.' });

const SITEFILES = ['index.html', 'contact.html', 'gallery.html', 'media.html'];
const rowsWith = (made, extra) => [FILE].concat(made).sort().map(n => ({ name: n, solo: true })).concat(extra || []);
task({ id: 'make-pages', sec: 2, title: 'Make the other pages of your site.', sub: 'Make four more empty files: index.html, contact.html, gallery.html and media.html.',
  why: 'A web site is a set of pages that link to each other. Yours will have five: Home, About, Gallery, Media and Contact. The files must exist, so the links in your menu have somewhere to go.',
  without: 'A link to a file that does not exist shows an error page.',
  how: 'In this tutorial you build <b>only the About page</b>. The other four files stay empty for now. index.html is the home page: a browser looks for that name first.',
  steps: [].concat.apply([], SITEFILES.map((n, k) => { const made = SITEFILES.slice(0, k), nth = ['first', 'second', 'third', 'fourth'][k];
    return [
      [`Move your mouse pointer over your folder name at the top of the Explorer. Do not click yet. Four small buttons appear on that line.${k ? ' This is for your ' + nth + ' new file.' : ''}`,
       os => pic('The Explorer panel. On the line with the folder name, four small buttons show. The four buttons are outlined. The list has ' + (made.length + 1) + (made.length ? ' files.' : ' file: about.html.'), vs(os, { title: FOLDER, panel: explorer(rowsWith(made), { btns: true, hitBtns: true }), tabs: TAB })), 'Point at your folder name. Four small buttons appear.'],
      ['Click the <b>first</b> button, <b>New File</b>: a page with a plus sign. A small box opens in the Explorer.',
       os => pic('The Explorer panel. The first of the four buttons, New File, is outlined. A small empty box has opened in the list.', vs(os, { title: FOLDER, panel: explorer(rowsWith(made, [{ name: '', edit: true }]), { btns: true, hitNewFile: true }), tabs: TAB })), 'Click <b>New File</b>, the first button.'],
      [`Type <b>${n}</b> in the small box, in lowercase.${n === 'index.html' ? ' This will be your home page.' : ''}`,
       os => pic(`The small box in the Explorer with ${n} typed in it. The box is outlined.`, vs(os, { title: FOLDER, panel: explorer(rowsWith(made, [{ name: n, edit: true, hit: true }]), { btns: true }), tabs: TAB })), `Type <b>${n}</b>.`],
      [os => `Press <kbd>${enterKey(os)}</kbd>. The file <b>${n}</b> is now in the Explorer. It also opens in a new tab. Leave it empty.`,
       os => pic(`The Explorer panel now lists ${made.length + 2} files. The new file ${n} is outlined.`, vs(os, { title: FOLDER, panel: explorer(rowsWith(made.concat([n])).map(r => r.name === n ? Object.assign({ hit: true, on: true }, r) : r)), tabs: [{ name: n, on: true }] })), os => `Press <b>${enterKey(os)}</b>. <b>${n}</b> is in the list.`]
    ]; })).concat([
    [os => `Look at the tabs at the top of the big middle part of VS Code. There are five now. <b>Right-click</b> the tab named <b>about.html</b>${o(os, '', ' (hold <kbd>Control</kbd> and click, or tap the trackpad with two fingers)')}. A menu opens.`,
     os => pic('VS Code with five tabs. The tab named about.html is outlined.', vs(os, { title: FOLDER, panel: explorer([ABOUT]), tabs: [{ name: FILE, hit: true }, { name: 'index.html' }, { name: 'contact.html' }, { name: 'media.html', on: true }] })), '<b>Right-click</b> the tab named <b>about.html</b>.'],
    ['In the menu, click <b>Close Others</b>. The four empty files close, and only the <b>about.html</b> tab is left. The files are still in the Explorer: closing a tab does not delete a file.',
     os => pic('The menu of the about.html tab. It lists Close, Close Others, Close to the Right and Close All. The choice Close Others is outlined.', `<div class="sc-board">${menu(['Close', 'Close Others', 'Close to the Right', 'Close All'], 'Close Others', true)}</div>`), 'Click <b>Close Others</b>. Only the about.html tab is left.']
  ]),
  check: ['The Explorer lists five files: about.html, contact.html, gallery.html, index.html and media.html.', 'Every name is all lowercase and ends in .html.', 'All five are lined up with each other, at the top level of my folder.', 'Only the about.html tab is open.'],
  hints: [os => `A name is spelled wrong? Click the file one time in the Explorer and press <kbd>${o(os, 'F2', 'Return')}</kbd>. Type the name again and press <kbd>${enterKey(os)}</kbd>.`,
    'VS Code lists the files in ABC order, not in the order you made them. That is fine.',
    'The home page must be named <b>index.html</b>, not home.html. Web servers look for that exact name.'],
  learn: '<b>Level up:</b> when your About page is done, you can build the other four pages the same way. The header, the menu and the footer are the same on every page of a site.' });

/* ===== 3. Type your About page ===== */
/* the words task: sample pictures from a small sample page */
const demo = (lines, r, col, fresh) => { const d = new Editor(lines.join('\n')); d.r = r; d.c = col; d.fresh = fresh || []; return d; };
const DEMO = ['<body>', '    <h1>Hello</h1>', '</body>'];
task({ id: 'words', sec: 3, title: 'Learn six things before you type.', sub: 'Learn where your typing goes and how to read the code pictures.',
  why: 'Every code step tells you exactly where your cursor must be. When the cursor is in the right place, your code lands in the right place.',
  without: 'Code typed in the wrong place breaks the page, and it is hard to see why.',
  how: 'These steps only ask you to look. The pictures show a small sample page, not your page.',
  steps: [
    ['Look at the picture. The <b>cursor</b> is the thin blinking line in your code. Whatever you type appears <b>at the cursor</b>. Clicking with the mouse moves the cursor to the place you clicked.',
     shot(demo(DEMO, 1, 13), 'sample'), 'The <b>cursor</b> is where your typing goes.'],
    ['Look at the gray <b>line numbers</b> down the left side of the picture: 1, 2, 3. The steps use them to tell you which line to work on. In the picture, line 2 is highlighted.',
     shot(demo(DEMO, 1, 0), 'sample', { noCursor: true }), 'The <b>line numbers</b> are down the left side.'],
    ['Look at the two tags. A <b>beginning tag</b> is a word inside angle brackets, like ' + c('<h1>') + '. It starts a part of your page. An <b>ending tag</b> is the same word with a slash, like ' + c('</h1>') + '. It ends that part.',
     cards([['Beginning tag', '<h1>'], ['Your words', 'Hello'], ['Ending tag', '</h1>']]), 'A <b>beginning tag</b> and an <b>ending tag</b> go around your words.'],
    ['Look at the cursor in this picture. It is <b>between the tags</b>: after the ' + c('>') + ' of the beginning tag and before the ' + c('<') + ' of the ending tag. Your words go there.',
     shot(demo(['<body>', '    <h1></h1>', '</body>'], 1, 8), 'sample'), '<b>Between the tags</b> is where your words go.'],
    ['Look at the colors in this picture. <b>Yellow</b> letters are what you just typed. <b>Underlined</b> letters are what VS Code typed for you: you do <b>not</b> type those. Every code step has a picture like this under it.',
     shot(demo(['<body>', '    <p></p>', '</body>'], 1, 7, [{ r: 1, a: 4, b: 7, kind: 'typed' }, { r: 1, a: 7, b: 11, kind: 'auto' }]), 'sample'), 'Yellow: you typed it. Underlined: VS Code typed it for you.'],
    ['Look at line 2 of this picture. It is a <b>comment</b>: a note in plain words for the people who read your code. It starts with ' + c('<!--') + ' and ends with ' + c('-->') + '. The browser does not show it. In this tutorial you write a comment above each part of your code, <b>in your own words</b>. A good comment answers three questions: <b>what</b> is this part, <b>how</b> does it work, and <b>why</b> is it here? Your teacher reads your comments to see that you understand your own page.',
     shot(demo(['<body>', '    <!-- The main heading of my page -->', '    <h1>Hello</h1>', '</body>'], 1, 0), 'sample', { noCursor: true }), 'A <b>comment</b> is a note in your own words. The browser does not show it.']
  ],
  check: ['I know the cursor is where my typing goes.', 'I can find the line numbers.', 'I know what a beginning tag and an ending tag are.', 'I know that underlined letters in a code picture are typed by VS Code, not by me.', 'I know a comment is a note in my own words that says what my code does.'],
  hints: ['Come back to this task any time a word in another step is confusing.', 'The less-than sign ( &lt; ) and the greater-than sign ( &gt; ) are on the comma key and the period key. Hold <kbd>Shift</kbd> to type them.'],
  learn: '<b>Level up:</b> say the tag names out loud as you type them. h1 is "heading one". p is "paragraph". It helps you remember what each tag is for.' });

/* the code steps: every call types into an editor AND writes the step with its code picture */
const aboveMedia = () => { let r = cssEd.find('@media') - 1; while (r >= 0 && cssEd.L[r].trim() !== '}') r--; if (r < 0) throw new Error('no closing brace above the media query'); return r; };
const noComments = text => text.split('\n').filter(l => !/^\s*(<!--.*-->|\/\*.*\*\/|\/\/.*)$/.test(l)).join('\n');
const htmlEd = new Editor(''), cssEd = new Editor(''), jsEd = new Editor('');
let ed = htmlEd, FILEN = FILE;
const use = which => { ed = which === 'css' ? cssEd : which === 'js' ? jsEd : htmlEd; FILEN = which === 'css' ? CSSFILE : which === 'js' ? JSFILE : FILE; };
const ln = () => ed.r + 1;
const endKeys = os => o(os, '<kbd>End</kbd>', '<kbd>Command</kbd>+<kbd>Right Arrow</kbd> (hold Command and press the Right Arrow key)');
const endCap = os => o(os, 'End', 'Command+Right Arrow');
const CSSDIR = { name: 'css', dir: true, open: true }, STYLE = { name: CSSFILE, indent: 1 };
let TREE = [CSSDIR, STYLE, ABOUT];
let TABNAMES = [FILE, CSSFILE];
const TABS = on => TABNAMES.map(n => ({ name: n, on: on === n, hit: on === n }));

/* the finished page as a drawing, at each stage of the CSS: 0 none, 1 font, 2 nav, 3 colors, 4 space, 5 links in a row, 6 Z-pattern */
const LINKS = ['Home', 'About', 'Gallery', 'Media', 'Contact'];
/* stages: 0 none, 1 font, 2 menu on the right, 3 colors, 4 space, 5 links in a row, 6 footer corners, 7 hamburger button,
   8 button on phones only, 9 pictures, 10 pictures and labels styled, 11 zigzag rows */
function mock(st, narrow, open) {
  const side = st >= 2, col = st >= 3, sp = st >= 4, row = st >= 5 && !narrow, z = st >= 6 && !narrow, zig = st >= 11 && !narrow;
  const btn = st >= 7 && (st < 8 || narrow), shown = !btn || open;
  const lk = 'text-decoration:underline;color:' + (col ? '#ffffff' : '#0a4fa8');
  const nav = !shown ? '' : st >= 2 ? `<div style="display:${row && !btn ? 'flex' : 'block'};flex-wrap:wrap;justify-content:flex-end;${btn ? 'width:100%' : ''}">${LINKS.map(l => `<span style="display:block;padding:4px 5px;text-align:right;white-space:nowrap;${lk}">${l}</span>`).join('')}</div>`
    : `<div>${LINKS.map(l => `<span style="display:block;${lk}">&#8226; ${l}</span>`).join('')}</div>`;
  const button = btn ? `<span class="${open === undefined ? '' : 'sc-hit'}" style="display:inline-block;padding:6px 10px;border-radius:6px;background:#f5c84c;color:#05081a;font-weight:600;font-size:1.25em;line-height:1">&#9776;</span>` : '';
  const lab = t => `<span style="display:block;${st >= 10 ? 'color:#f5c84c;font-weight:700;font-size:14px;letter-spacing:1px;text-transform:uppercase;' : ''}">${t}</span>`;
  const pict = art => st >= 9 ? art(st >= 10 ? 104 : 160, 'display:block;max-width:100%;height:auto;' + (st >= 10 ? 'border-radius:4px;box-shadow:0 5px 12px rgba(0,0,0,.45);' : '')) : '';
  const gap = st >= 10 ? '14px' : '6px';
  const part = (label, head, text, art, flip) => `<div style="margin-bottom:${gap};${zig && art ? 'display:flex;align-items:center;gap:12px;flex-direction:' + (flip ? 'row-reverse' : 'row') : ''}"><div style="flex:1">${label ? lab(label) : ''}<b style="display:block;${st >= 1 ? 'font-family:Georgia,serif' : ''}">${head}</b><span style="display:block">${text}</span></div>${art ? pict(art) : ''}</div>`;
  const body = part('About me', `<span style="font-size:1.25em;line-height:1.1;display:block">${BIG[0]}<span style="color:${col ? '#f5c84c' : 'inherit'}">${BIG[1]}</span>${BIG[2]}</span>`, `Hello. My name is Alex Rivera.<span style="display:block;text-decoration:underline;color:${col ? '#f5c84c' : '#0a4fa8'}">Read my story</span>`, ME) + part('My story', 'How I Started', 'I made my first web page in a class.') + part('My journey', 'One Step at a Time', '1. First class: my first web page.', TRAIL, true) +
    part('My skills', 'What I Can Do', '&#8226; HTML &#8226; CSS', LAPTOP) + part('', 'Alex listens first.', 'Sam Lee, lab partner') + part('', 'Want to see what I have made?', `<span style="text-decoration:underline;color:${col ? '#f5c84c' : '#0a4fa8'}">See my gallery</span>`);
  return `<div style="font-family:${st >= 1 ? 'Arial,sans-serif' : 'Georgia,serif'};color:${col ? '#eef1ff' : '#1f2933'};background:${col ? '#0b1026' : '#ffffff'};text-align:left;${narrow ? 'max-width:230px;margin:0 auto;border:2px solid #6b7587;' : ''}">` +
    `<div style="background:${col ? '#05081a' : 'transparent'};color:${col ? '#ffffff' : 'inherit'};padding:${sp ? '10px' : '0'};${side ? 'display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px' : ''}"><div style="${side ? 'flex:1' : ''}"><b style="display:block;color:inherit;${st >= 1 ? 'font-family:Georgia,serif' : ''}">${NAME}</b></div>${button}${nav}</div>` +
    `<div style="padding:${sp ? '10px' : '4px 0'};${sp ? 'max-width:' + (zig ? '400px' : '340px') + ';margin:0 auto' : ''}">${body}</div>` +
    `<div style="padding:${sp ? '10px' : '0'};${z ? 'display:flex;justify-content:space-between;align-items:center' : sp ? 'text-align:center' : ''}"><span style="display:block">Made by Alex Rivera</span><span style="display:block;text-decoration:underline;color:${col ? '#f5c84c' : '#0a4fa8'}">Back to top</span></div></div>`;
}
const mockPic = (os, st, alt, narrow, open) => pic('A web browser showing the About page. ' + alt, br(os, TITLE, '127.0.0.1:5500/' + FILE, mock(st, narrow, open)));

/* what each HTML tag and attribute is, how it works and why it is used: said when it is typed */
const TAGS = {
  header: ['header is the top part of a page: the part that says whose page this is.', 'Everything between the beginning tag and the ending tag belongs to the header. The tag draws nothing by itself: it gives that part of the page a name.', 'Browsers, search engines and screen readers read the name. A person who cannot see the page can jump straight to the header, or skip it.'],
  nav: ['nav means navigation: the group of links people use to move around a site.', 'You put your menu links between the two tags. The tag marks them as the main menu.', 'A screen reader can jump straight to a nav. Your CSS and your JavaScript can also find the menu by this name.'],
  main: ['main holds the main content: the part that is only on this page.', 'Everything between the two tags is the heart of the page. A page has one main.', 'Your header and footer will be the same on every page of your site. main tells a screen reader where the new part starts, so its user can skip the menu.'],
  footer: ['footer is the bottom part of a page.', 'What you put between the two tags closes the page: who made it, and a way back to the top.', 'People look at the bottom of a page for who made it. The tag gives that part a name that screen readers can jump to.'],
  section: ['section is one part of a page that has its own heading.', 'Everything between the two tags is one topic. The tag groups a heading with the things that belong to it.', 'Your page has several parts. With each one in its own section, your CSS can style a part as one row, and turn every second row around.'],
  div: ['div means division: a plain box that holds a group of things.', 'A div says nothing about what is inside it. It only keeps those things together, so they can be moved and styled as one.', 'When two or more things must stay together and no tag with a meaning fits, you use a div. Your CSS will place this box as one piece.'],
  h1: ['h1 means heading 1: the main heading of the page.', 'The words between the two tags are the title of the whole page. Browsers show them big and bold.', 'A page has one h1. Search engines and screen readers use it to tell what the page is about.'],
  h2: ['h2 means heading 2: the heading of one part of the page.', 'It sits one level under the h1. Browsers show it a little smaller than the h1.', 'A screen reader can list all the headings of a page, so its user can jump to a part. Headings in order (h1, then h2) are the outline of your page.'],
  p: ['p means paragraph: a block of words.', 'The words between the two tags are one paragraph. The browser starts it on a new line and puts space above and below it.', 'Without p tags, all your words run together in one lump. Each thought gets its own paragraph.'],
  ul: ['ul means unordered list: a list where no item comes first.', 'The ul is the whole list. Each thing in the list goes in its own li tag, between the two ul tags. Browsers put a bullet in front of each one.', 'A screen reader says how many things are in a list, so a person knows what is coming. Use ul when the order does not matter.'],
  ol: ['ol means ordered list: a list where the order matters.', 'It works like ul, but browsers number the items: 1, 2, 3.', 'A timeline read in the wrong order makes no sense. ol tells browsers and screen readers that the order is part of the meaning.'],
  li: ['li means list item: one thing in a list.', 'An li only works between the two tags of a ul or an ol. Each one is a new line in the list.', 'One li for each thing lets the browser, your CSS and a screen reader tell the things apart.'],
  a: ['a means anchor: a link.', 'The words between the two tags are what people click. An a tag alone does nothing: it needs an href to say where the link goes.', 'Links are how people move from one page to the next. Without them, each page is a dead end.'],
  blockquote: ['blockquote means: a block of words that another person said or wrote.', 'The words between the two tags are the quote. Browsers push them in a little from both sides.', 'The tag tells a screen reader that these are not your own words. Your CSS can also give every quote the same look.'],
  link: ['link ties another file to this page.', 'It goes in the head part, it shows nothing on the page, and it has no ending tag. It needs two things: rel (what kind of file) and href (where the file is).', 'Your styles are in a separate file. Without this line, the browser never opens that file, and your page stays plain.'],
  button: ['button is something to click that does a job on the page.', 'What is between the two tags shows on the button. A button does nothing until JavaScript tells it what to do.', 'A link goes to another page. A button changes this page. A real button tag also works with the keyboard, with no extra code.'],
  script: ['script loads a file of JavaScript.', 'The browser reads the file that src names, and runs it. Nothing goes between the two tags.', 'Your JavaScript is in its own file. Without this line, the browser never runs it. The line is at the bottom of the page, so the button already exists when the code looks for it.'],
  img: ['img means image: a picture.', 'The picture is not inside your page. The tag points to a picture file with src, and the browser puts that picture in this spot. img has no ending tag.', 'This is the only way to show a picture file on a web page.'],
  span: ['span marks a few words inside a line, so that CSS can style only those words.', 'A span changes nothing by itself and starts no new line. It is a box with no meaning, like a div, but for words in the middle of a sentence.', 'You want a few words of your big heading in another color. A span lets your CSS find exactly those words.'],
  strong: ['strong marks words that are important.', 'Browsers show the words in bold. A screen reader can say them with more weight.', 'Each moment on your timeline gets a short title. strong makes the title stand out from the sentence after it.'],
  i: ['i is a small tag that icon sets use to hold one icon.', 'The tag stays empty. Its class names tell the icon set which drawing to put there.', 'The icon set you loaded looks for i tags with its class names, and draws the icon in their place.']
};
const ATTRS = {
  href: ['href is the address a tag points to.', 'The value in the quote marks is a file name, or a path to a file. A name with no folder in front of it means: a file in the same folder as this page.', 'Without href, a link goes nowhere, and a link tag loads nothing.'],
  class: ['class is a name you give to a tag.', 'You choose the name. Many tags can share one name. The name shows nowhere on the page.', 'Your CSS finds tags by their class name, with a dot in front of it. That is how you style this part without changing every other tag of the same kind.'],
  id: ['id is a name for one single tag on the page.', 'A class can be on many tags. An id must be on one tag only. A link whose href is a number sign and that name jumps straight to this tag.', 'Your Read my story button needs a place to jump to. The id marks that place.'],
  rel: ['rel means relationship: what the linked file is to this page.', 'The value stylesheet says: this file holds the styles for this page.', 'A link tag can load many kinds of files. Without rel, the browser does not know what to do with this one.'],
  src: ['src means source: where the file is.', 'The value is a path: the folder, a slash, and the file name. It must match the real names letter for letter.', 'Without src, the tag has nothing to load.'],
  alt: ['alt means alternative text: words that stand in for a picture.', 'A screen reader reads these words out loud. A browser shows them when the picture cannot load. They do not show when the picture is there.', 'A person who cannot see your picture still learns what it shows. Every picture that means something needs alt text.'],
  'aria-label': ['aria-label gives a tag a name that screen readers say out loud.', 'The value is read in place of what is inside the tag. It does not show on the page.', 'Your button shows three lines and no words. Without a label, a screen reader can only say: button.'],
  'aria-expanded': ['aria-expanded says if the thing a button opens is open (true) or closed (false).', 'It starts as false. Your JavaScript changes it each time the menu opens or closes.', 'A person who cannot see the menu appear still needs to know that it opened.'],
  'aria-hidden': ['aria-hidden tells screen readers to skip a tag.', 'With the value true, the tag is still on the page for the eye. A screen reader acts as if it is not there.', 'Your icon is decoration: the label next to it already says the words. Without this, a screen reader may read out a strange symbol.']
};
const W3 = (g, seen, name, kind) => { if (!g) throw new Error('no glossary entry for ' + name);
  return seen ? `<br><b>What it is:</b> the same ${kind} as before. ${g[0]}` : `<br><b>What it is:</b> ${g[0]}<br><b>How it works:</b> ${g[1]}<br><b>Why you need it:</b> ${g[2]}`; };
/* what each CSS property is: said every time the property is typed */
const GLOSS = {
  'margin': 'margin is the empty space <b>outside</b> a part: between it and the parts around it.',
  'margin-top': 'margin-top is the empty space outside a part, on its top side only.',
  'margin-bottom': 'margin-bottom is the empty space outside a part, on its bottom side only.',
  'margin-right': 'margin-right is the empty space outside a part, on its right side only.',
  'padding': 'padding is the empty space <b>inside</b> a part: between its edge and what it holds.',
  'padding-left': 'padding-left is the empty space inside a part, on its left side only.',
  'font-family': 'font-family is the font: the shape of the letters.',
  'font-size': 'font-size is how big the letters are.',
  'font-weight': 'font-weight is how thick the letters are.',
  'line-height': 'line-height is the distance from one line of words to the next.',
  'letter-spacing': 'letter-spacing is the space between the letters of a word.',
  'text-align': 'text-align says where words sit in their line: left, center or right.',
  'text-transform': 'text-transform changes how letters are shown: as capitals or as small letters.',
  'white-space': 'white-space says what the browser does with the spaces in a text, and if the text may break onto a new line.',
  'list-style': 'list-style is the mark in front of each list item: a bullet or a number.',
  'display': 'display says how a part is laid out on the page: as a box on its own line (block), as a row of things (flex), or not at all (none).',
  'justify-content': 'justify-content says how the things in a flex box share the space <b>along</b> the row: from left to right.',
  'align-items': 'align-items says how the things in a flex box line up <b>across</b> the row: from top to bottom.',
  'flex-wrap': 'flex-wrap says if the things in a flex box must stay on one line, or may go onto a new line.',
  'flex-direction': 'flex-direction says which way the things in a flex box line up, and in which order.',
  'flex': 'flex says how one thing <b>inside</b> a flex box shares the space with the things next to it.',
  'gap': 'gap is the space <b>between</b> the things in a flex box.',
  'color': 'color is the color of the words.',
  'background-color': 'background-color is the color behind the words: it fills the whole box of a part.',
  'width': 'width is how wide a part is.',
  'max-width': 'max-width is the widest a part is allowed to get.',
  'height': 'height is how tall a part is.',
  'border': 'border is a line drawn around the edge of a box.',
  'border-left': 'border-left is a line drawn on the left edge of a box only.',
  'border-radius': 'border-radius rounds the corners of a box.',
  'box-shadow': 'box-shadow draws a shadow behind a box.',
  'position': 'position says how a part is placed on the page, and if it moves when the page scrolls.',
  'top': 'top is a distance from the top edge. It works together with position.',
  'border-color': 'border-color is the color of the line around a box.',
  'text-decoration': 'text-decoration is a line drawn under, over or through words.'
};
function codeTask(t, fn, which) {
  use(which || 'html');
  const steps = [], before = ed.text(), file = FILEN;
  const push = (text, cap, drawing, opt) => { steps.push([text, drawing || shot(ed, file, opt), cap]); ed.fresh = [];
    const say = os => String(typeof text === 'function' ? text(os) : text);
    REC.push({ task: t.id, n: steps.length, file: FILEN, mac: say('mac'), win: say('win'), ops: PEND.splice(0), r: ed.r, c: ed.c, doc: ed.text() }); };
  const endTag = () => /<\/([a-z0-9]+)>$/.exec(ed.L[ed.r].trim());
  const lastWhat = () => { const m = endTag(); const ch = ed.L[ed.r].trim().slice(-1); return m ? `the ${c('>')} of ${c(m[0])}` : `the ${ch === ';' ? 'semicolon ' : ch === '}' ? 'closing brace ' : ''}${c(ch)}`; };
  const lastCap = () => { const m = endTag(); return c(m ? m[0] : ed.L[ed.r].trim().slice(-1)); };
  const openTag = () => /<([a-zA-Z][a-zA-Z0-9]*)(\s[^<>]*)?>$/.exec(ed.L[ed.r].slice(0, ed.c));
  let commented = false, tight = false; const seenT = {}, seenA = {};
  const explainTag = tag => { const x = W3(TAGS[tag], seenT[tag], tag, 'tag'); seenT[tag] = true; return x; };
  const explainAttr = a => { const x = W3(ATTRS[a], seenA[a], a, 'attribute'); seenA[a] = true; return x; };
  fn({
    /* a comment in the student's own words, on the empty line the cursor is on; then a new line under it */
    comment(hint, example) { commented = true; const OWNW = 'Use your own words: explaining your code is how you show that you understand it.';
      if (file === FILE) {
        ed.ins('<!--'); ed.after('-->');
        push(`On line ${ln()}, type ${c('<!--')}: a less-than sign, an exclamation mark and two hyphens. This starts a <b>comment</b>: a note for the people who read your code. The browser does not show it. VS Code adds the ending ${c('-->')} for you. Your cursor is between them.`, `Type ${c('<!--')}. VS Code adds ${c('-->')} for you.`);
        ed.ins(' ' + example + ' ');
        push(`Do not click anywhere. Type a space, a note <b>in your own words</b>, and one more space. A good comment says <b>what</b> this part is, <b>how</b> it works and <b>why</b> it is here. ${hint} Alex types <b>${esc(example)}</b>. ${OWNW}`, 'Type a comment <b>in your own words</b>.');
        ed.end(); const n = ln();
        push(os => `Press ${endKeys(os)}. The cursor jumps to the very end of line ${n}, just after ${c('-->')}.`, os => `Press <b>${endCap(os)}</b>. The cursor jumps to the end of line ${n}.`);
      } else if (file === CSSFILE) {
        const text = '/* ' + example + ' */'; ed.ins(text);
        push(`On line ${ln()}, type a <b>comment</b>: a slash and a star ( ${c('/*')} ), a space, a note <b>in your own words</b> that says what the code under it is, how it works and why it is here, a space, and a star and a slash ( ${c('*/')} ). The browser skips everything between them. ${hint} Alex types ${c(text)} ${OWNW}`, 'Type a comment <b>in your own words</b>, between ' + c('/*') + ' and ' + c('*/') + '.');
      } else {
        const text = '// ' + example; ed.ins(text);
        push(`On line ${ln()}, type a <b>comment</b>: two slashes ( ${c('//')} ), a space, and a note <b>in your own words</b> that says what the code under it does and why. JavaScript skips everything after the two slashes on that line. ${hint} Alex types ${c(text)} ${OWNW}`, 'Type a comment <b>in your own words</b>, after ' + c('//') + '.');
      }
      const was = ln(); if (ed.enter() !== 'line') throw new Error('expected a plain new line after a comment'); const n2 = ln();
      if (file === FILE) {
        push(os => `Do not click anywhere. Press <kbd>${enterKey(os)}</kbd> one time. A new empty line opens under your comment. Your cursor is on it: <b>line ${n2}</b>. Look closely at the picture: the cursor is <b>one space too far to the right</b>. It does not line up with the start of your comment. VS Code does this after a comment. You fix it in the next step.`, os => `Press <b>${enterKey(os)}</b> one time. Your cursor is on the new line ${n2}, one space too far right.`);
        ed.back();
        push(os => `Press the <kbd>${backKey(os)}</kbd> key <b>one</b> time${o(os, '', ': the key above Return that erases to the left')}. The cursor moves back one space. Now it lines up with the start of your comment. Code that lines up is easier to read, and it is easier to see which tag is inside which.`, os => `Press <b>${backKey(os)}</b> one time. The cursor lines up with your comment.`);
      } else push(os => `Do not click anywhere. Press <kbd>${enterKey(os)}</kbd> one time. A new empty line opens under your comment. Your cursor is on it: <b>line ${n2}</b>. Do not press the Space bar or the Tab key.`, os => `Press <b>${enterKey(os)}</b> one time. Your cursor is on the new line ${n2}.`); },
    push,
    /* come back to VS Code from the browser */
    toCode() { push(os => `Look at the ${o(os, 'taskbar', 'Dock')} at the bottom of your screen. Click the <b>Visual Studio Code</b> icon. VS Code comes to the front.`, 'Click the <b>Visual Studio Code</b> icon.',
      os => pic(o(os, 'The Windows desktop. On the taskbar at the bottom, the VS Code icon is outlined.', 'The Mac desktop. In the Dock at the bottom, the VS Code icon is outlined.'), desk(os, '', { hitDock: 'code' }))); },
    /* look at the page again: two steps */
    toBrowser(see, st, alt, narrow, open, draw) {
      push(os => `Look at the ${o(os, 'taskbar', 'Dock')} at the bottom of your screen. Click the icon of your <b>web browser</b>. The browser window with your About page comes to the front.`, 'Click the icon of your <b>web browser</b>.',
        os => pic(o(os, 'The Windows desktop. On the taskbar at the bottom, the web browser icon is outlined.', 'The Mac desktop. In the Dock at the bottom, the web browser icon is outlined.'), desk(os, '', { hitDock: 'web' })));
      push(`Look at your page. You do not have to load it again: <b>Live Server</b> did that when you saved. ${see}`, 'Look at your page. Live Server loaded it again when you saved.', draw || (os => mockPic(os, st, alt, narrow, open))); },
    /* choose one of the two open files */
    tab(name) { use(name === CSSFILE ? 'css' : name === JSFILE ? 'js' : 'html'); const tree = TREE, tabs = TABS(name), names = TABNAMES.join(', ');
      push(`Look at the tabs at the top of the big middle part of VS Code. Click the tab named <b>${name}</b>. ${name === CSSFILE ? 'Your CSS file shows under the tabs.' : name === JSFILE ? 'Your JavaScript file shows under the tabs.' : 'Your HTML code shows under the tabs.'}`, `Click the tab named <b>${name}</b>.`,
        os => pic(`VS Code with ${tabs.length} tabs at the top of the middle part: ${names}. The tab ${name} is outlined.`, vs(os, { title: FOLDER, panel: explorer(tree), tabs }))); },
    /* put the cursor on the empty line between two tags */
    clickEmpty(row, where) { if (ed.L[row].trim()) throw new Error('line ' + (row + 1) + ' is not empty'); ed.r = row; ed.end();
      push(`In <b>${file}</b>, find the <b>empty line</b> ${where}. It is <b>line ${ln()}</b>: the line numbers are on the left side of your code. Click one time on that empty line. The cursor (the thin blinking line) is now on line ${ln()}.`,
        `Click one time on the <b>empty line</b>, line ${ln()}.`); },
    /* put the cursor at the very end of a line. opt: {last, row, find} */
    clickEnd(match, opt) { opt = opt || {}; ed.r = opt.row != null ? (opt.row < 0 ? ed.L.length + opt.row : opt.row) : ed.find(match, opt.last); ed.end(); const l = ed.L[ed.r].trim();
      push(`In <b>${file}</b>, find ${opt.find || 'the ' + (opt.last ? '<b>last</b> ' : '') + 'line that says ' + c(l)}${/[;}]$/.test(l) && !opt.find ? '' : '.'} In the example it is <b>line ${ln()}</b>. Click one time at the <b>very end</b> of that line, just after ${lastWhat()}. The cursor is now at the end of line ${ln()}.`,
        `Click at the <b>very end</b> of line ${ln()}, just after ${lastCap()}.`); },
    /* Enter at the end of a line */
    enter(why) { const was = ln(); if (ed.enter() !== 'line') throw new Error('expected a plain new line'); const n = ln();
      push(os => `Do not click anywhere. Press <kbd>${enterKey(os)}</kbd> one time. A new empty line opens under line ${was}. Your cursor is on it: <b>line ${n}</b>. ${why || 'VS Code lines the cursor up for you. Do not press the Space bar or the Tab key.'}`,
        os => `Press <b>${enterKey(os)}</b> one time. Your cursor is on the new line ${n}.`); },
    /* Enter at the end of a line that is only a beginning tag */
    enterIn() { const was = ln(); if (ed.enter() !== 'open') throw new Error('expected Enter after a beginning tag'); const n = ln();
      push(os => `Do not click anywhere. Press <kbd>${enterKey(os)}</kbd> one time. A new empty line opens under line ${was}. Your cursor is on it: <b>line ${n}</b>. VS Code pushes the cursor in one step, so it lines up with the lines under it. If it does not line up, press the <kbd>Tab</kbd> key one time.`,
        os => `Press <b>${enterKey(os)}</b> one time. Your cursor is on the new line ${n}.`); },
    /* Down Arrow to the end of the next line (a shorter line: the cursor lands at its end) */
    downLine() { const from = ed.L[ed.r].length; ed.r += 1; if (ed.L[ed.r].length > from) throw new Error('Down Arrow would not land at the end of the line'); ed.end(); const n = ln(), what = lastWhat();
      push(`Press the <kbd>Down Arrow</kbd> key <b>one</b> time. The cursor moves down to line ${n}. It is now at the very end of that line, just after ${what}.`, `Press <b>Down Arrow</b> one time. The cursor is at the end of line ${n}.`); },
    /* put the cursor in the middle of a line, just after a tag */
    clickAfter(match, token, front) { ed.r = ed.find(match); const at = ed.L[ed.r].indexOf(token); if (at < 0) throw new Error('token not on the line: ' + token); ed.c = at + token.length;
      push(`In <b>${file}</b>, find the line that says ${c(ed.L[ed.r].trim())}. In the example it is <b>line ${ln()}</b>. Click one time just after the ${c('>')} of ${c(token)}, in front of ${front}. The cursor is now between them. Check the picture before you type.`, `Click just after ${c(token)} on line ${ln()}.`); },
    /* a beginning tag: VS Code adds the ending tag */
    open(tag, means, first) { ed.open(tag);
      push(`On line ${ln()}, type ${c('<' + tag + '>')}: a less-than sign, ${tag.length > 1 ? 'the letters' : 'the letter'} <b>${tag}</b> and a greater-than sign. As soon as you type the ${c('>')}, VS Code types the ending tag ${c('</' + tag + '>')} for you. Do <b>not</b> type the ending tag yourself. Your cursor stays <b>between</b> the two tags.${explainTag(tag)}${means && /^This /.test(means) ? '<br><b>On your page:</b> ' + means : ''}${first ? ' Check the picture: you must see both tags.' : ''}`,
        `Type ${c('<' + tag + '>')}. VS Code adds ${c('</' + tag + '>')} for you.`); },
    /* Enter between a beginning tag and its ending tag */
    split(tag) { if (ed.enter() !== 'split') throw new Error('expected Enter between two tags'); const n = ln();
      push(os => `Do not click anywhere. Your cursor is between ${c('<' + tag + '>')} and ${c('</' + tag + '>')}. Press <kbd>${enterKey(os)}</kbd> one time. VS Code moves ${c('</' + tag + '>')} down to its own line and opens an empty line between the two tags. Your cursor is on that empty line: <b>line ${n}</b>.`,
        os => `Press <b>${enterKey(os)}</b> one time. An empty line opens between the two tags.`); },
    /* words between two tags */
    words(text, say, cap) { const m = openTag(); if (!m) throw new Error('the cursor is not just after a beginning tag'); ed.ins(text);
      push(`Do not click anywhere. ${say} What you type goes between the beginning ${c('<' + m[1] + '>')} tag and ${c('</' + m[1] + '>')}.`, cap); },
    /* plain words at the cursor, after an ending tag */
    text(t, say, cap) { ed.ins(t); push('Do not click anywhere. ' + say, cap); },
    /* jump to the end of the line, past the ending tag */
    end() { ed.end(); const what = lastWhat(), n = ln();
      push(os => `Press ${endKeys(os)}. The cursor jumps to the very end of line ${n}, just after ${what}.`,
        os => `Press <b>${endCap(os)}</b>. The cursor jumps to the end of line ${n}.`); },
    /* the start of a tag with an attribute: VS Code adds the two quote marks after = */
    attr(lead, spelled, first) { if (!/=$/.test(lead)) throw new Error('attr must end with =');
      /* tested in VS Code: the two quote marks come only when the cursor is at the end of the line or in front of a space */
      const rest = ed.L[ed.r].slice(ed.c); tight = rest !== '' && !/^\s/.test(rest);
      const mm = /^(?:<([a-z0-9]+) )?([a-z-]+)=$/.exec(lead); if (!mm) throw new Error('attr: cannot read ' + lead);
      const extra = (mm[1] ? explainTag(mm[1]).replace('<b>What it is:</b>', '<b>What ' + c('<' + mm[1] + '>') + ' is:</b>') : '') + explainAttr(mm[2]).replace('<b>What it is:</b>', '<b>What ' + c(mm[2]) + ' is:</b>');
      if (tight) { ed.ins(lead + '"');
        push(`On line ${ln()}, type ${c(lead + '"')} and stop: ${spelled}, and then one quote mark (hold <kbd>Shift</kbd> and press the key with <b>'</b> and <b>"</b> on it). Here VS Code does <b>not</b> add quote marks for you, because there is code right behind your cursor. So you type them yourself: one now, and one after the words.${extra}`,
          `Type ${c(lead + '"')} and stop. You type this quote mark yourself.`); return; }
      ed.ins(lead); ed.ins('"', 'auto'); ed.after('"');
      push(`On line ${ln()}, type ${c(lead)} and stop: ${spelled}. As soon as you type the ${c('=')}, VS Code adds two quote marks ${c('""')} for you and puts your cursor <b>between</b> them. Do <b>not</b> type the quote marks yourself.${extra}`,
        `Type ${c(lead)} and stop. VS Code adds the two quote marks.`); },
    value(v, say, cap) { if (tight) { if (ed.L[ed.r][ed.c - 1] !== '"') throw new Error('no quote mark before the cursor'); ed.ins(v); push('Do not click anywhere. ' + say + ' What you type goes just after the quote mark.', cap); return; }
      if (ed.L[ed.r][ed.c] !== '"' || ed.L[ed.r][ed.c - 1] !== '"') throw new Error('the cursor is not between two quote marks'); ed.ins(v);
      push('Do not click anywhere. ' + say + ' What you type goes between the two quote marks.', cap); },
    right() { if (tight) { tight = false; ed.ins('"'); push('Type one more quote mark: ' + c('"') + '. This is the second quote mark. It closes the words you just typed. Every value needs a quote mark in front of it and one after it.', 'Type the second quote mark: ' + c('"')); return; }
      if (ed.L[ed.r][ed.c] !== '"') throw new Error('Right Arrow: no quote mark to pass'); ed.c += 1;
      push('Press the <kbd>Right Arrow</kbd> key <b>one</b> time. The cursor moves past the second quote mark. It is now just after that quote mark.', 'Press <b>Right Arrow</b> one time. The cursor moves past the second quote mark.'); },
    space() { ed.ins(' '); push('Press the <kbd>Space</kbd> bar <b>one</b> time. A space keeps the next part of the tag apart from the part you just typed.', 'Press the <b>Space</b> bar one time.'); },
    /* > at the end of a tag that has an attribute */
    close(means) { ed.ins('>'); const m = openTag(); if (!m) throw new Error('no tag to close');
      if (VOID.test(m[1])) push(`Type ${c('>')} (a greater-than sign). This finishes the tag. <b>${m[1]} has no ending tag</b>, so VS Code does not add one, and you do not type one. Line ${ln()} now says ${c(ed.L[ed.r].trim())}`, `Type ${c('>')} to finish the tag. ${m[1]} has no ending tag.`);
      else { ed.after('</' + m[1] + '>'); push(`Type ${c('>')} (a greater-than sign). This finishes the beginning tag. VS Code types the ending tag ${c('</' + m[1] + '>')} for you. Your cursor is between ${c(m[0])} and ${c('</' + m[1] + '>')}.${means ? ' ' + means : ''}`, `Type ${c('>')}. VS Code adds ${c('</' + m[1] + '>')} for you.`); } },
    /* CSS: a selector and its opening brace; VS Code adds the closing brace */
    cssOpen(sel, means, first) { ed.ins(sel + ' {'); ed.after('}');
      push(`On line ${ln()}, type ${c(sel + ' {')} and stop${first ? ': the word <b>' + sel + '</b>, a space and an opening curly brace (hold <kbd>Shift</kbd> and press the <kbd>[</kbd> key)' : ''}. As soon as you type the ${c('{')}, VS Code adds the closing curly brace ${c('}')} for you. Do <b>not</b> type the closing brace yourself. Your cursor stays <b>between</b> the two braces.<br><b>What it is:</b> ${/^@/.test(sel) ? 'a media query: a group of rules that work only when the screen fits the test in the parentheses.' : 'a selector: the words in front of the brace. They pick which parts of your page this rule styles.'}<br><b>How it works:</b> ${means}`,
        `Type ${c(sel + ' {')}. VS Code adds ${c('}')} for you.`); },
    cssSplit() { if (ed.enter() !== 'split') throw new Error('expected Enter between two braces'); const n = ln();
      push(os => `Do not click anywhere. Your cursor is between ${c('{')} and ${c('}')}. Press <kbd>${enterKey(os)}</kbd> one time. VS Code moves ${c('}')} down to its own line and opens an empty line between the two braces. Your cursor is on that empty line: <b>line ${n}</b>.`,
        os => `Press <b>${enterKey(os)}</b> one time. An empty line opens between the two braces.`); },
    /* one CSS declaration */
    decl(text, how, why, first) { if (!/^[a-z-]+: .+;$/.test(text)) throw new Error('not a declaration: ' + text);
      const prop = text.split(':')[0], what = GLOSS[prop]; if (!what) throw new Error('no glossary entry for ' + prop);
      if (typeof how !== 'string' || typeof why !== 'string' || !how || !why) throw new Error('decl needs how and why: ' + text);
      ed.ins(text);
      push(`On line ${ln()}, type ${c(text)} exactly as shown.${first ? ' Type the colon ( <b>:</b> ) after the first word and the semicolon ( <b>;</b> ) at the end. A small list may pop up while you type: keep typing every letter yourself.' : ''}<br><b>What it is:</b> ${what}<br><b>How it works:</b> ${how}<br><b>Why you need it:</b> ${why}`,
        `Type ${c(text)}`); },
    /* Down Arrow from the last declaration to the closing brace */
    down() { ed.r += 1; if (ed.L[ed.r].trim() !== '}') throw new Error('Down Arrow did not land on a closing brace'); ed.end(); const n = ln();
      push(`Press the <kbd>Down Arrow</kbd> key <b>one</b> time. The cursor moves down to line ${n}. It is now just after the ${c('}')}.`, `Press <b>Down Arrow</b> one time. The cursor is just after the ${c('}')} on line ${n}.`); },
    save(see) { push(os => `Press <kbd>${mod(os)}</kbd>+<kbd>S</kbd> (hold ${mod(os)} and press the S key). This saves your file. The white dot on the <b>${file}</b> tab goes away.${see ? ' ' + see : ''}`,
        os => `Press <b>${mod(os)}+S</b> to save. The white dot on the tab goes away.`,
        os => keys([mod(os), 'S'], 'The white dot on the ' + file + ' tab goes away.')); }
  });
  /* the lines this task added: shown as the Example */
  const A = before.split('\n'), B = ed.L; let i = 0; while (i < A.length && A[i] === B[i]) i++;
  let j = 0; while (j < A.length - i && j < B.length - i && A[A.length - 1 - j] === B[B.length - 1 - j]) j++;
  task(Object.assign({ file, ex: { before: '', after: B.slice(i, B.length - j).join('\n') }, steps }, t, !commented ? {} : {
    check: t.check.concat(['I wrote my comment in my own words. It says what this part is, how it works and why it is here.']),
    hints: t.hints.concat(['Not sure what to write in your comment? Answer three questions out loud: <b>What is this part? How does it work? Why is it here?</b> Then type your answers. Two short lines are enough. Your teacher reads your comments first.']) }));
}
const UNDO = os => `You typed in the wrong place? Press <kbd>${mod(os)}</kbd>+<kbd>Z</kbd> to undo, one press for each mistake. Then do the step again.`;
const NOEND = 'The ending tag did not appear by itself? Type it yourself: the same word with a slash in front, like <code>&lt;/h1&gt;</code>.';
const TWOEND = 'You see two ending tags, like <code>&lt;/p&gt;&lt;/p&gt;</code>? You typed one, and VS Code typed one too. Erase one of them.';
const POPUP = 'A small list popped up while you typed words? Press <kbd>Esc</kbd> to close it. Then keep typing.';
const QUOTES = 'You see too many quote marks? You typed them, and VS Code typed them too. Erase the extra ones, so there is one before the words and one after.';
const NOENDKEY = os => o(os, 'No <kbd>End</kbd> key on your laptop? Hold <kbd>Fn</kbd> and press the <kbd>Right Arrow</kbd> key. You can also click with the mouse just after the last character on the line.', 'Command+Right Arrow did not work? Click with the mouse just after the last character on the line.');
const CSSLIST = 'A small list is still open when your line is done? Press <kbd>Esc</kbd> to close it before you press the next key. If a word you did not type appeared, undo it.';
const CSSPUNC = 'A style does not show? Look at that line in your CSS. It needs a colon ( : ) after the first word and a semicolon ( ; ) at the end.';
const TWOBRACE = 'You see two closing braces, like <code>}}</code>? You typed one, and VS Code typed one too. Erase one of them.';
const NOCHANGE = os => `The page did not change? Check three things: you saved style.css (no white dot on its tab), you saved about.html, and the address at the top of the browser starts with <b>127.0.0.1:5500</b>. If the address is different, go to VS Code, right-click about.html and click <b>Open with Live Server</b>. Still the same? Click the browser and press <kbd>${mod(os)}</kbd>+<kbd>R</kbd> to load the page again by hand.`;
const NOBROWSER = 'Your browser is closed, or it says it cannot reach the page? Live Server stops when you close VS Code. In the VS Code Explorer, right-click about.html and click <b>Open with Live Server</b> again.';

const SKEL = '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Document</title>\n</head>\n<body>\n    \n</body>\n</html>';
codeTask({ id: 'skeleton', sec: 3, title: 'Start your page.', sub: 'Let VS Code type the start of a web page. Then give your page a title.',
  why: 'Every web page starts with the same lines. The head part is information for the browser. Everything people see goes between <body> and </body>.',
  without: 'The browser has to guess what kind of file it is, and special characters can show as wrong symbols.',
  how: 'One exclamation mark and the Tab key make VS Code type all eleven lines. The title is the name that shows on the browser tab.',
  check: ['Line 1 of my file says <code>&lt;!DOCTYPE html&gt;</code>.', 'My file has eleven lines.', 'My own title is between <code>&lt;title&gt;</code> and <code>&lt;/title&gt;</code>.', 'I saved: there is no white dot on the about.html tab.'],
  hints: ['Nothing happened when you pressed Tab? Erase everything in the file. Make sure the tab says <b>about.html</b>. Type the <b>!</b> again: it must be the only thing in the file.',
    'The words <b>device-width</b> on line 5 are gone, and your title is there? You typed before you double-clicked. Undo until line 5 says <code>content="width=device-width, initial-scale=1.0"</code> again. Then double-click the word Document.', 'The word Document is gone and your title is in the wrong place? Line 6 must say <code>&lt;title&gt;</code>, your title, then <code>&lt;/title&gt;</code>. Fix it to match the code picture.', UNDO],
  learn: '<b>Level up:</b> look at line 5. The <b>viewport</b> line tells a phone to show your page at the real width of its screen. Without it, a phone shows a tiny copy of a wide page. You will need this line when you make your page fit every screen.' }, b => {
  b.push(`Click one time in the big empty area under the <b>${FILE}</b> tab. The cursor (a thin blinking line) appears on <b>line 1</b>.`, 'Click in the big empty area. The cursor is on <b>line 1</b>.');
  ed.ins('!');
  b.push('On line 1, type one exclamation mark: ' + c('!') + ' (hold <kbd>Shift</kbd> and press the <kbd>1</kbd> key). A small list pops up under it. The first line of the list says <b>!</b>', 'Type one exclamation mark: ' + c('!'));
  ed.L = SKEL.split('\n'); ed.r = 4; ed.c = 53; ed.fresh = ed.L.map((l, k) => ({ r: k, a: 0, b: l.length, kind: 'auto' }));
  b.push('Do not click anywhere. Press the <kbd>Tab</kbd> key one time. VS Code types <b>eleven lines</b> for you: the start of every web page. You did not type them, so they are underlined in the picture. On <b>line 5</b>, VS Code also highlights the words <b>device-width</b>. Do <b>not</b> type anything yet: what you type now would replace those words.', 'Press <b>Tab</b> one time. VS Code types eleven lines. Do not type yet.', null, { all: true, noCursor: true });
  ed.r = 5; ed.c = 19; ed.fresh = [{ r: 5, a: 11, b: 19, kind: 'sel' }];
  b.push('Find <b>line 6</b>. It says ' + c('<title>Document</title>') + '. <b>Double-click</b> the word <b>Document</b>. Now the word Document is highlighted, and the highlight on line 5 is gone.', '<b>Double-click</b> the word <b>Document</b> on line 6.');
  ed.L[5] = '    <title></title>'; ed.c = 11; ed.ins(TITLE);
  b.push(`Do not click anywhere. Type a title for your page: the word <b>About</b>, a space, and your name. What you type replaces the highlighted word. Alex types <b>${TITLE}</b>. The title shows on the browser tab.`, `Type <b>About</b> and your name. Alex types <b>${TITLE}</b>.`);
  b.save('A white dot on a tab always means: not saved yet.');
});

codeTask({ id: 'header', sec: 3, title: 'Add your header and your name.', sub: 'Type the top part of your page: a header with your name in it.',
  why: 'header is the top part of a page: the bar that stays the same on every page of a site. Your name in it works like a logo: it tells visitors whose site they are on.',
  without: 'A visitor who lands on any page of your site cannot tell whose site it is.',
  how: 'Your name is a paragraph with the class logo. Later, your CSS makes it bold and puts it on the left side of the header, with your menu on the right. Lines inside a tag are pushed in (indented). VS Code does the indenting for you.',
  check: ['My line with my name is between <code>&lt;header&gt;</code> and <code>&lt;/header&gt;</code>.', 'It says <code>class="logo"</code>.', 'I see each ending tag one time only.', 'I saved my page.'],
  hints: [NOEND, TWOEND, POPUP, NOENDKEY, UNDO],
  learn: '<b>Level up:</b> header, nav, main and footer are called <b>semantic</b> tags: the name says what that part of the page is for. div says nothing. Use a div only when you need a box and no semantic tag fits.' }, b => {
  b.clickEmpty(8, 'between ' + c('<body>') + ' and ' + c('</body>'));
  b.comment('Hint: say which part of the page this is and what it holds.', 'The top of the page: my name, like a logo');
  b.open('header', '', true);
  b.split('header');
  b.attr('<p class=', 'a less-than sign, the letter <b>p</b>, a space, the word <b>class</b> and an equals sign');
  b.value('logo', 'Type <b>logo</b>, in lowercase. A logo is the name or the sign of a site. Yours is your name.', 'Type <b>logo</b>.');
  b.right();
  b.close();
  b.words(NAME, `Type your name. Alex types <b>${NAME}</b>.`, 'Type your name.');
  b.save();
});

const NAVLINKS = [['index.html', 'Home'], ['about.html', 'About'], ['gallery.html', 'Gallery'], ['media.html', 'Media'], ['contact.html', 'Contact']];
codeTask({ id: 'nav', sec: 3, title: 'Add your navigation links.', sub: 'Add five links at the top of your page: one for each page of your site.',
  why: 'nav means navigation: the links people use to move around a site. Every page of a site has the same menu, so visitors always know where they are and where they can go.',
  without: 'A visitor who lands on your About page cannot reach your other pages.',
  how: 'a makes a link. href says where the link goes: the name of a file in the same folder. The links go in a list, so a screen reader can say how many there are. One link points to about.html, the page you are on: that is normal, because the same menu goes on every page.',
  check: ['My <code>&lt;nav&gt;</code> starts on the line under my name. It is inside the header.', 'I have five <code>&lt;li&gt;</code> lines, and each one holds one link.', 'Each <code>href</code> is a file name that is in my Explorer: index.html, about.html, gallery.html, media.html, contact.html.', 'Each link ends with <code>&lt;/a&gt;&lt;/li&gt;</code>.', 'I saved my page.'],
  hints: [QUOTES, 'The quote marks did not appear after the = sign? Type them yourself: one before the words and one after.', 'A file name in a link must match the name in the Explorer letter for letter. Capital letters count: Index.html is not index.html.', NOENDKEY, TWOEND, UNDO],
  learn: '<b>Level up:</b> link words should say where the link goes. <b>Gallery</b> is clear. <b>Click here</b> is not: a person who hears only the links cannot tell them apart.' }, b => {
  b.clickEnd('class="logo"');
  b.enter();
  b.comment('Hint: say what these links are for.', 'The menu: links to the five pages of my site');
  b.open('nav', 'nav means navigation.');
  b.split('nav');
  b.open('ul', 'ul means unordered list: a list with no numbers.');
  b.split('ul');
  NAVLINKS.forEach((L, k) => {
    b.open('li', k === 0 ? 'li means list item.' : '');
    b.attr('<a href=', 'a less-than sign, the letter <b>a</b>, a space, the letters <b>href</b> and an equals sign', k === 0 ? 'a makes a link. href says where it goes.' : '');
    b.value(L[0], `Type the file name ${c(L[0])}, in lowercase.${k === 0 ? ' This is your home page.' : k === 1 ? ' This is the page you are making now.' : ''}`, `Type ${c(L[0])}`);
    b.right();
    b.close();
    b.words(L[1], `Type the word people will click: <b>${L[1]}</b>.`, `Type <b>${L[1]}</b>.`);
    if (k < NAVLINKS.length - 1) { b.end(); b.enter(); }
  });
  b.save();
});

/* shared moves for the six parts */
const LABEL = (b, label, first) => {
  b.attr('<p class=', 'a less-than sign, the letter <b>p</b>, a space, the word <b>class</b> and an equals sign', first ? 'A class is a name you give to a tag, so that your CSS can find it and style it.' : '');
  b.value('label', 'Type <b>label</b>, in lowercase.' + (first ? ' Later, your CSS will make every paragraph with this class small and colored.' : ''), 'Type <b>label</b>.');
  b.right();
  b.close();
  b.words(label, `Type two or three words that introduce this part. Alex types <b>${label}</b>.`, 'Type a short label for this part.');
  b.end();
  b.enter();
};
const HEAD = (b, h2, say, first) => {
  b.open('h2', first ? 'h2 means heading 2: a heading for one part of the page.' : '');
  b.words(h2, say + ` Alex types <b>${h2}</b>.`, say);
  b.end();
  b.enter();
};
/* a ROW is a section with two things in it: a div of words now, and a picture later */
const ROW = (b, cls, label, h2, say, first) => {
  b.attr('<section class=', 'a less-than sign, the word <b>section</b>, a space, the word <b>class</b> and an equals sign', first ? 'section means one part of a page, with its own heading. The class gives this part a name.' : '');
  b.value(cls, `Type <b>${cls}</b>, in lowercase. Your CSS will use this name to find this part.`, `Type <b>${cls}</b>.`);
  b.right();
  b.close();
  b.split('section');
  b.open('div', first ? 'This div holds the words of this part. Later, a picture will sit next to it, so the section will hold two things: the words and the picture.' : 'This div holds the words. The picture comes later.');
  b.split('div');
  LABEL(b, label, first);
  HEAD(b, h2, say, first);
};
/* a BLOCK is a div with a class: one column, in the middle of the page */
const BLOCK = (b, cls, first, id) => {
  b.attr('<div class=', 'a less-than sign, the letters <b>div</b>, a space, the word <b>class</b> and an equals sign', first ? 'This part is one column, so it is a plain box: a div. The class gives the box a name.' : '');
  b.value(cls, `Type <b>${cls}</b>, in lowercase. Your CSS will use this name to find this part.`, `Type <b>${cls}</b>.`);
  b.right();
  if (id) { b.space();
    b.attr('id=', 'the letters <b>id</b> and an equals sign');
    b.value(id, `Type <b>${id}</b>, in lowercase. The button in your Hook that says Read my story will jump to this name.`, `Type <b>${id}</b>.`);
    b.right(); }
  b.close();
  b.split('div');
};
/* a button link: an a tag with a class and an href */
const BTN = (b, cls, href, words, sayHref, sayWords) => {
  b.attr('<a class=', 'a less-than sign, the letter <b>a</b>, a space, the word <b>class</b> and an equals sign');
  b.value(cls, cls === 'button' ? 'Type <b>button</b>, in lowercase. Later, your CSS makes every link with this class look like a button.' : 'Type <b>button</b>, a space, and <b>ghost</b>. This link has two classes. Later, your CSS makes a ghost button see-through, with only an outline, so it is quieter than the first button.', `Type <b>${cls}</b>.`);
  b.right();
  b.space();
  b.attr('href=', 'the letters <b>href</b> and an equals sign');
  b.value(href, sayHref, 'Type ' + c(href));
  b.right();
  b.close();
  b.words(words, sayWords, 'Type the words people will click.');
};
const atEndOfMain = b => {
  b.clickEnd('', { row: htmlEd.find('</main>') - 1, find: 'the line that says ' + c('</main>') + '. Then look at the line <b>just above</b> it' });
  b.enter();
};
const PARTHINTS = [NOENDKEY, QUOTES, NOEND, TWOEND, POPUP, UNDO];

codeTask({ id: 'hook', sec: 3, title: 'Part 1, the Hook: add main and your profile intro.', sub: 'Start the main part of your page with the Hook: a small label, one big sentence, two lines on who you are, and two buttons.',
  why: 'The Hook is the first thing a visitor reads. One big sentence tells them who you are before they decide to stay or leave. It is the h1: the main heading, and a page has only one.',
  without: 'The page opens with a long story, and the visitor has to read all of it to find out who you are.',
  how: 'main holds the main content of the page. The Hook is a section with a div inside it. Your big sentence is the h1, and a span marks the two or three words that will turn gold. Two links with the class button give the visitor something to do right away. The div holds your words now. Later your photo goes after the div, so on a wide screen the words are on the left and the photo is on the right.',
  check: ['<code>&lt;main&gt;</code> starts on the line under <code>&lt;/header&gt;</code>.', 'My section says <code>class="profile"</code>, and there is a div inside it.', 'My label line says <code>class="label"</code>.', 'My big sentence is between <code>&lt;h1&gt;</code> and <code>&lt;/h1&gt;</code>, with two or three words inside a span.', 'I have two links that say <code>class="button"</code>. The second one also says <code>ghost</code>.', 'The sentences are about me, in my own words.', 'I saved my page.'],
  hints: PARTHINTS,
  learn: '<b>Level up:</b> headings go in order. h1 is the page, h2 is a part of the page, h3 is a part of an h2. Do not pick a heading for its size: CSS sets the size.' }, b => {
  b.clickEnd('</header>');
  b.enter();
  b.open('main', '');
  b.split('main');
  b.comment('Hint: say that this is the first thing a visitor reads, what it holds, and why the words come first.', 'HOOK: the first thing a visitor reads. Who I am, in one big line and two short ones. The words come first, so they are on the left');
  b.attr('<section class=', 'a less-than sign, the word <b>section</b>, a space, the word <b>class</b> and an equals sign');
  b.value('profile', 'Type <b>profile</b>, in lowercase. Your CSS will use this name to find this part.', 'Type <b>profile</b>.');
  b.right();
  b.close();
  b.split('section');
  b.open('div', 'This div holds the words of this part. Later, a picture will sit next to it, so the section will hold two things: the words and the picture.');
  b.split('div');
  LABEL(b, 'About me', true);
  b.open('h1');
  b.words(BIG[0], `Type the <b>first part</b> of your big sentence, from your plan, and stop just before the words you want to stand out. End with a space. Alex types <b>${BIG[0]}</b>and a space.`, 'Type the first part of your big sentence, then a space.');
  b.open('span');
  b.words(BIG[1], `Type the words you want to <b>stand out</b>: two or three words. Later, your CSS makes them gold. Alex types <b>${BIG[1]}</b>.`, 'Type the words you want to stand out.');
  b.clickAfter('<span>', '</span>', 'the ending ' + c('</h1>') + ' tag');
  b.text(BIG[2], `Type the rest of your sentence. Alex types one period: <b>${BIG[2]}</b> The line now reads as one sentence, with two or three words inside a span.`, 'Type the rest of your sentence.');
  b.end();
  b.enter();
  b.open('p');
  b.words(WHO, `Type your two sentences about who you are, from your plan. Alex types <b>${WHO}</b> Keep typing on one line: do not press Enter or Return in the middle.`, 'Type your two sentences about who you are.');
  b.end();
  b.enter();
  b.open('p', 'This paragraph holds your two buttons.');
  b.split('p');
  BTN(b, 'button', '#story', 'Read my story', 'Type a number sign ( <b>#</b> ) and the word <b>story</b>: ' + c('#story') + '. A link that starts with a number sign does not open another page. It jumps to the part of <b>this</b> page that has that name. You give your story that name in the next task.', 'Type the words people will click. Start with a verb. Alex types <b>Read my story</b>.');
  b.end();
  b.enter();
  BTN(b, 'button ghost', 'gallery.html', 'See my gallery', 'Type the file name ' + c('gallery.html') + ', in lowercase. This is the page that will show your work.', 'Type the words people will click. Alex types <b>See my gallery</b>.');
  b.save();
});

codeTask({ id: 'story', sec: 3, title: 'Part 2, the Story: add your reading column.', sub: 'Add the longer story: a label, a heading and two short paragraphs.',
  why: 'Facts tell a visitor what you do. A story tells them why, and people remember stories.',
  without: 'Your page lists what you can do, and nobody learns how you got started.',
  how: 'The Story is one column in the middle of the page, so it is a div, not a row with a picture. Each paragraph gets its own p tag, so the browser puts space between them. Later, your CSS will make the column narrow, so the lines are easy to read.',
  check: ['My story div is inside main, just above <code>&lt;/main&gt;</code>.', 'It says <code>class="story"</code> and <code>id="story"</code>.', 'It has a label, one h2 and two paragraphs.', 'The story is my own.', 'I saved my page.'],
  hints: ['The new part must be <b>inside</b> main: above the line that says <code>&lt;/main&gt;</code>.'].concat(PARTHINTS),
  learn: '<b>Level up:</b> a good short story has three beats: where you started, what changed, where you are now. Check that yours has all three.' }, b => {
  atEndOfMain(b);
  b.comment('Hint: say what the story tells the reader, and why this part is one column.', 'STORY: how I started making web pages. One column in the middle, so it is easy to read');
  BLOCK(b, 'story', true, 'story');
  LABEL(b, 'My story');
  HEAD(b, 'How I Started', 'Type a heading for your story.');
  b.open('p');
  b.words(STORY[0], `Type the first part of your story, from your plan. Alex types <b>${STORY[0]}</b>`, 'Type the first part of your story.');
  b.end();
  b.enter();
  b.open('p');
  b.words(STORY[1], `Type the next part of your story. Alex types <b>${STORY[1]}</b>`, 'Type the next part of your story.');
  b.save();
});

codeTask({ id: 'journey', sec: 3, title: 'Part 3, the Journey: add your timeline.', sub: 'Add a label, a heading and a list of three moments, in the order they happened.',
  why: 'A timeline shows that you keep growing. People remember a path better than a list of facts.',
  without: 'A visitor sees where you are now, and not how far you have come.',
  how: 'ol means ordered list. Use it when the order matters: a timeline read backwards makes no sense. Each moment is one li, with a short title in a strong tag and one sentence after it. The Journey is a row, like the Hook: a section with a div for the words, and a picture later.',
  check: ['My section says <code>class="timeline"</code>, and it is inside main.', 'My three moments are between <code>&lt;ol&gt;</code> and <code>&lt;/ol&gt;</code>, oldest first.', 'Every moment starts with <code>&lt;li&gt;</code> and ends with <code>&lt;/li&gt;</code>.', 'Every moment has a short title between <code>&lt;strong&gt;</code> and <code>&lt;/strong&gt;</code>.', 'The moments are my own.', 'I saved my page.'],
  hints: ['The tag is <code>&lt;ol&gt;</code>, with the letter o. <code>&lt;ul&gt;</code> is a list with no order.', 'The tag is <code>&lt;li&gt;</code> with a lowercase letter L and a letter i. It is not the number 1.'].concat(PARTHINTS),
  learn: '<b>Level up:</b> do not use dates that will look old next year. Words like <b>First class</b> and <b>Now</b> stay true longer than a year number.' }, b => {
  atEndOfMain(b);
  b.comment('Hint: say what the list shows, and why you used an ordered list.', 'JOURNEY: three moments, oldest first. The order matters, so it is an ordered list');
  ROW(b, 'timeline', 'My journey', 'One Step at a Time', 'Type a heading for your journey.');
  b.open('ol', 'ol means ordered list: a list where the order matters.');
  b.split('ol');
  MOMENTS.forEach((m, k) => { const nth = ['first', 'second', 'third'][k], when = m.split(': ')[0], what = m.split(': ')[1];
    b.open('li');
    b.open('strong');
    b.words(when, `Type a short <b>title</b> for your ${nth} moment: two or three words for when it happened. Alex types <b>${when}</b>.`, `Type a short title for your <b>${nth}</b> moment.`);
    b.clickAfter('<strong>' + when, '</strong>', 'the ending ' + c('</li>') + ' tag');
    b.text(what, `Type one sentence that says what happened. Alex types <b>${what}</b>`, 'Type one sentence that says what happened.');
    if (k < 2) { b.end(); b.enter(); } });
  b.save();
});

codeTask({ id: 'skills', sec: 3, title: 'Part 4, the Skills: add your skill tags.', sub: 'Add a label, a heading and a list of four skills, one or two words each.',
  why: 'A person who is in a hurry can read four short tags in one look. They will not read four sentences.',
  without: 'Your skills are hidden inside paragraphs, where a busy reader never finds them.',
  how: 'The skills are an unordered list, ul: no skill comes first. Keep each one to one or two words. Later, your CSS turns the list into a row of round tags.',
  check: ['My section says <code>class="skills"</code>, and it is inside main.', 'I have four <code>&lt;li&gt;</code> lines, with one skill in each.', 'Each skill is one or two words, and it is true.', 'I saved my page.'],
  hints: ['Not sure what counts as a skill? Things you can do (HTML, photography), and ways you work (teamwork, planning). Both count.'].concat(PARTHINTS),
  learn: '<b>Level up:</b> put your strongest skill first. People read the first tag and the last tag more than the ones in the middle.' }, b => {
  atEndOfMain(b);
  b.comment('Hint: say what the tags show, and why they are a list and not a sentence.', 'SKILLS: four things I can do, as short tags. A list is faster to read than a sentence');
  ROW(b, 'skills', 'My skills', 'What I Can Do', 'Type a heading for your skills.');
  b.open('ul', 'ul means unordered list: a list where no item comes first.');
  b.split('ul');
  SKILLS.forEach((t, k) => { b.open('li'); b.words(t, `Type one skill, in one or two words. Alex types <b>${t}</b>.`, 'Type one skill.'); if (k < SKILLS.length - 1) { b.end(); b.enter(); } });
  b.save();
});

codeTask({ id: 'trust', sec: 3, title: 'Part 5, the Trust: add two testimonials.', sub: 'Add two short quotes from people who know your work, each with a name.',
  why: 'People believe what others say about you more than what you say about yourself. Two voices are more convincing than one.',
  without: 'Every good thing on the page is said by you, about you.',
  how: 'blockquote is the tag for words that another person said. Each quote is its own blockquote, with the words in one paragraph and the name in a second one. Use real words from real people, and ask them first. Later, your CSS puts the two quotes side by side.',
  check: ['My trust div is inside main, just above <code>&lt;/main&gt;</code>.', 'It holds two blockquotes. Each one starts with <code>&lt;blockquote&gt;</code> and ends with <code>&lt;/blockquote&gt;</code>.', 'Each line with a name says <code>class="by"</code>.', 'Both quotes are real, and both people said I may use their words and names.', 'I saved my page.'],
  hints: ['Who can you ask? A classmate you worked with, a teacher, a person you helped, a manager. One true sentence is enough.', 'Still waiting for an answer? Type the part with the words <b>Quote to come</b>, and come back to it. Never make up a quote or a name.'].concat(PARTHINTS),
  learn: '<b>Level up:</b> the best testimonials say something specific. <b>Alex is great</b> says little. <b>Alex listens first</b> tells the reader what working with Alex is like.' }, b => {
  atEndOfMain(b);
  b.comment('Hint: say whose words these are, and why you used blockquote.', 'TRUST: what two people said about my work. I asked them both first. blockquote means someone else said it');
  BLOCK(b, 'trust');
  [[QUOTE, BY], [QUOTE2, BY2]].forEach((q, k) => {
    b.open('blockquote', k === 0 ? 'blockquote means: a block of words that another person said.' : 'This is your second quote.');
    b.split('blockquote');
    b.open('p');
    b.words(q[0], `Type the words your ${k === 0 ? 'first' : 'second'} person said, exactly. Do not type quote marks. Alex types <b>${q[0]}</b>`, `Type the words your ${k === 0 ? 'first' : 'second'} person said.`);
    b.end();
    b.enter();
    b.attr('<p class=', 'a less-than sign, the letter <b>p</b>, a space, the word <b>class</b> and an equals sign');
    b.value('by', 'Type <b>by</b>, in lowercase.' + (k === 0 ? ' This class marks the line that says who the quote is by.' : ''), 'Type <b>by</b>.');
    b.right();
    b.close();
    b.words(q[1], `Type the name of the person, a comma, and how they know you. Alex types <b>${q[1]}</b>.`, 'Type the name of the person and how they know you.');
    if (k === 0) { b.downLine(); b.enter(); }
  });
  b.save();
});

codeTask({ id: 'action', sec: 3, title: 'Part 6, the Action: add your call to action.', sub: 'End your page with one question, one short line and two buttons: to your gallery and to your contact page.',
  why: 'A visitor who liked your page wants to know what to do next. A clear link gives them the next step.',
  without: 'The reader reaches the end of your page, has nowhere to go, and leaves.',
  how: 'A call to action is a short line that invites, and a link. It goes last in main, because that is where the eye stops. The links go to other pages of your site. The second link says Send me a message: it does not show an email address, because robots collect addresses they find on web pages and send them spam.',
  check: ['My action div is the last thing inside main, just above <code>&lt;/main&gt;</code>.', 'It says <code>class="action"</code>.', 'It has one heading and one short line inside a div, and two links, to <code>gallery.html</code> and <code>contact.html</code>.', 'Both links say <code>class="button"</code>. The second one also says <code>ghost</code>.', 'The link words say where each link goes.', 'My email address is <b>not</b> on the page.', 'I saved my page.'],
  hints: ['A file name in a link must match the name in the Explorer letter for letter: gallery.html, contact.html.', 'Do not type your email address as link words. Your contact page is the place where people can reach you.'].concat(PARTHINTS),
  learn: '<b>Level up:</b> start your link words with a verb: <b>See</b> my gallery, <b>Send</b> me a message, <b>Read</b> my story. A verb tells the reader what will happen.' }, b => {
  atEndOfMain(b);
  b.comment('Hint: say what you want the visitor to do next, and why this part is last.', 'ACTION: what I want the visitor to do next. It is last, because the eye stops at the end of the page');
  BLOCK(b, 'action');
  b.open('div', 'This div keeps your question and your short line together, so they stay on the left as one piece.');
  b.split('div');
  b.open('h2');
  b.words(ASK, `Type your short question or invitation, from your plan. Alex types <b>${ASK}</b>`, 'Type your short question or invitation.');
  b.end();
  b.enter();
  b.open('p');
  b.words(LEAD, `Type one short line that tells the visitor what to do. Alex types <b>${LEAD}</b>`, 'Type one short line that tells the visitor what to do.');
  b.downLine();
  b.enter();
  b.open('p', 'This paragraph holds your two buttons.');
  b.split('p');
  BTN(b, 'button', 'gallery.html', 'See my gallery', 'Type the file name ' + c('gallery.html') + ', in lowercase. This is the page that will show your work.', 'Type the words people will click. Start with a verb. Alex types <b>See my gallery</b>.');
  b.end();
  b.enter();
  BTN(b, 'button ghost', 'contact.html', 'Send me a message', 'Type the file name ' + c('contact.html') + ', in lowercase.', 'Type <b>Send me a message</b>. Do <b>not</b> type your email address here: robots collect addresses they find on web pages and send them spam.');
  b.save();
});

codeTask({ id: 'footer', sec: 3, title: 'Add your footer.', sub: 'Finish your page with a footer: who made the page, and a link back to the top.',
  why: 'footer is the bottom part of a page. It says who made the page. A link back to the top saves a visitor on a phone a long scroll.',
  without: 'The page just stops. A visitor cannot tell who made it, and has to scroll all the way back up.',
  how: 'The footer comes after the ending tag of main, so it is not part of the main content. The link #top is special: every browser knows it means the top of the page.',
  check: ['<code>&lt;footer&gt;</code> starts on the line under <code>&lt;/main&gt;</code>.', 'My name is in the footer.', 'My footer has a link that says <code>href="#top"</code>.', 'The last two lines of my file say <code>&lt;/body&gt;</code> and <code>&lt;/html&gt;</code>.', 'I saved my page.'],
  hints: [NOEND, TWOEND, QUOTES, UNDO, 'Your lines are not lined up like the code picture? The page still works. To tidy it, right-click in your code and click <b>Format Document</b>.'],
  learn: '<b>Level up:</b> read your whole file from line 1 to the last line. Say what each tag is for. If you can, you understand your own page.' }, b => {
  b.clickEnd('</main>');
  b.enter();
  b.comment('Hint: say what is at the bottom of the page and why.', 'The bottom of the page: who made it, and a link back to the top');
  b.open('footer', 'footer is the bottom part of your page.');
  b.split('footer');
  b.open('p');
  b.words('Made by ' + NAME, `Type <b>Made by</b>, a space, and your name. Alex types <b>Made by ${NAME}</b>.`, 'Type <b>Made by</b> and your name.');
  b.end();
  b.enter();
  b.attr('<a href=', 'a less-than sign, the letter <b>a</b>, a space, the letters <b>href</b> and an equals sign');
  b.value('#top', `Type a number sign ( <b>#</b> ) and the word <b>top</b>: ${c('#top')}.`, `Type ${c('#top')}`);
  b.right();
  b.close();
  b.words('Back to top', 'Type <b>Back to top</b>.', 'Type <b>Back to top</b>.');
  b.save();
});
const HTML_BEFORE_LINK = htmlEd.text();

/* ===== 4. See your page ===== */
const RMENU = os => ['Open to the Side', 'Open with Live Server', o(os, 'Reveal in File Explorer', 'Reveal in Finder'), 'Copy', 'Rename\u2026'];
task({ id: 'live-server', sec: 4, title: 'Add Live Server to VS Code.', sub: 'Install one free add-on that shows your page in your browser and loads it again each time you save.',
  why: 'You will change your page many times. Live Server shows each change in your browser as soon as you save, so you see right away if the change worked.',
  without: 'After every change you have to go to the browser and load the page again by hand. When you forget, you look at the old page and think your code is wrong.',
  how: 'An extension is a small add-on for VS Code. Live Server is free. You install it one time, and it stays in VS Code for every web site you make.',
  steps: [
    ['Look at the narrow bar of icons on the far left side of VS Code. Click the <b>Extensions</b> icon: four small squares, with one square lifted away from the others. A panel opens, with a search box at its top.',
     os => pic('VS Code. In the narrow bar of icons on the far left, the Extensions icon, four small squares, is outlined.', vs(os, { title: FOLDER, hitAct: 'ext', panel: explorer([ABOUT]), tabs: TAB })), 'Click the <b>Extensions</b> icon: four small squares.'],
    ['Click one time in the <b>search box</b> at the top of the panel. Type <b>live server</b>. A list of results shows under the box.',
     os => pic('The Extensions panel of VS Code. The search box at the top has live server typed in it. The box is outlined.', vs(os, Object.assign({ title: FOLDER, onAct: 'ext', tabs: TAB, panel: `<div class="sc-vhead">EXTENSIONS</div><div class="sc-vrow${hit(true)}"><span class="sc-vedit" style="flex:1">live server<i class="sc-caret"></i></span></div>` }, {}))), 'Type <b>live server</b> in the search box.'],
    ['In the list, find the result named <b>Live Server</b>. Under the name it says <b>Ritwick Dey</b>: that is the person who made it. Check both names, because other add-ons have names that look almost the same. Click its blue <b>Install</b> button.',
     os => pic('The Extensions panel. The first result is Live Server, by Ritwick Dey. Its Install button is outlined.', vs(os, Object.assign({ title: FOLDER, onAct: 'ext', tabs: TAB, panel: `<div class="sc-vhead">EXTENSIONS</div><div class="sc-vrow${hit(false)}"><span class="sc-vedit" style="flex:1">live server</span></div><div class="sc-vrow" style="white-space:normal;align-items:flex-start"><span><b style="color:#fff;display:block">Live Server</b><span style="display:block">Ritwick Dey</span><span class="sc-btn${hit(true)}" style="display:inline-block;margin-top:4px">Install</span></span></div>` }, {}))), 'Find <b>Live Server</b> by Ritwick Dey. Click <b>Install</b>.'],
    ['VS Code may ask if you trust the publisher. Click <b>Trust Publisher &amp; Install</b>. If VS Code does not ask, go on to the next step.',
     os => pic('A message box from VS Code about trusting the publisher. The button Trust Publisher and Install is outlined.', `<div class="sc-board"><span class="sc-pad">Do you trust the publisher?</span><span class="sc-btn sc-hit">Trust Publisher &amp; Install</span></div>`), 'If VS Code asks, click <b>Trust Publisher &amp; Install</b>.'],
    ['Wait a few seconds. The Install button goes away, and a small <b>gear</b> shows in its place. Now look at the bottom right corner of VS Code: the words <b>Go Live</b> are there. Both mean that Live Server is installed.',
     os => pic('The Extensions panel. The Live Server result now shows a small gear where the Install button was.', vs(os, Object.assign({ title: FOLDER, onAct: 'ext', tabs: TAB, panel: `<div class="sc-vhead">EXTENSIONS</div><div class="sc-vrow${hit(false)}"><span class="sc-vedit" style="flex:1">live server</span></div><div class="sc-vrow" style="white-space:normal;align-items:flex-start"><span><b style="color:#fff;display:block">Live Server</b><span style="display:block">Ritwick Dey</span><span class="sc-btn${hit(false)}" style="display:inline-block;margin-top:4px">&#9881;</span></span></div>` }, {}))), 'Wait until you see a small <b>gear</b>, and <b>Go Live</b> at the bottom right.'],
    ['Look at the narrow bar of icons on the far left again. Click the <b>Explorer</b> icon at its top: two pages, one on top of the other. Your folder and your files come back.',
     os => pic('VS Code. In the narrow bar of icons on the far left, the Explorer icon at the top, two pages, is outlined. The panel next to it lists your folders and files again.', vs(os, { title: FOLDER, hitAct: 'files', panel: explorer([ABOUT]), tabs: TAB })), 'Click the <b>Explorer</b> icon: two pages.']
  ],
  check: ['In the Extensions list, Live Server by Ritwick Dey shows a small gear, not an Install button.', 'I see the words Go Live at the bottom right corner of VS Code.', 'I clicked the Explorer icon, and I see my folders and my files again.'],
  hints: ['The list is empty or it keeps loading? Extensions come from the internet. Check that your computer is online, and type the words again.',
    'You see many results with Live in the name? Choose the one named exactly <b>Live Server</b>, with <b>Ritwick Dey</b> under it.',
    'A tab named <b>Extension: Live Server</b> opened in the middle of VS Code? You clicked the name and not the button. That is fine: the tab has an Install button too. When you are done, close the tab with the <b>x</b> on it.',
    'The Install button is gray, or VS Code says you are not allowed? Some school and work computers block add-ons. Go on to the next task and read its hints: there is a way to see your page with no add-on.',
    'Windows and Mac screens change from version to version. Yours may look a little different from the drawings.'],
  learn: '<b>Level up:</b> the words <b>Go Live</b> at the bottom right corner of VS Code are a button. Clicking them does the same thing as Open with Live Server. While Live Server is running, they change to <b>Port : 5500</b>, and clicking that stops it.' });

task({ id: 'see-page', sec: 4, title: 'See your page in your web browser.', sub: 'Open about.html with Live Server and read your page.',
  why: 'Code is right when the page looks right. Looking at the page in a browser is how you check your own work.',
  without: 'A missing tag stays hidden in your code, and visitors are the first to see the mistake.',
  how: 'Live Server opens your page in your browser, and loads it again every time you save. A browser reads your tags and shows only your words. The page looks plain for now: black words on white. That is correct. HTML says what each part is. CSS, in the next part, says how it looks.',
  steps: [
    [os => `In the Explorer on the left side of VS Code, <b>right-click</b> the file <b>${FILE}</b>${o(os, '', ' (hold <kbd>Control</kbd> and click, or tap the trackpad with two fingers)')}. A menu opens.`,
     os => pic('The VS Code Explorer. The file about.html is outlined. A menu has opened under it.', vs(os, { title: FOLDER, panel: explorer([Object.assign({ on: true, hit: true }, ABOUT)], { menu: menu(RMENU(os), '', true) }), tabs: TAB })),
     `<b>Right-click</b> the file <b>${FILE}</b>.`],
    [`In the menu, click <b>Open with Live Server</b>. Your web browser opens and shows your page. At the bottom right corner of VS Code, the words Go Live change to <b>Port : 5500</b>: Live Server is running. Your menu has more choices than the drawing: that is fine.`,
     os => pic('The menu for about.html. The choice Open with Live Server is outlined.', vs(os, { title: FOLDER, panel: explorer([Object.assign({ on: true }, ABOUT)], { menu: menu(RMENU(os), 'Open with Live Server', true) }), tabs: TAB })),
     'Click <b>Open with Live Server</b>. Your browser opens.'],
    ['Look at the <b>address</b> at the top of the browser. It starts with <b>127.0.0.1:5500</b> and ends with <b>about.html</b>. Those numbers mean: this page comes from Live Server, on your own computer. Nobody else can see it.',
     os => pic('A web browser. The address bar is outlined. The address says 127.0.0.1:5500/about.html.', `<div class="sc-win">${titlebar(os, TITLE)}<div class="sc-addr sc-hit">127.0.0.1:5500/${FILE}</div><div class="sc-page sc-plain" style="text-align:left"><b class="sc-big" style="display:block">${TITLE}</b></div></div>`),
     'The address starts with <b>127.0.0.1:5500</b>.'],
    ['Look at the <b>tab</b> at the top of the browser. It shows your title. Alex\'s tab says <b>' + TITLE + '</b>.',
     os => pic(`A web browser. The tab at the top says ${TITLE}. The page under it starts with the name ${NAME}.`, br(os, TITLE, '127.0.0.1:5500/' + FILE, `<b class="sc-big" style="display:block">${NAME}</b>`)),
     'The browser <b>tab</b> shows your title.'],
    ['Read your page from top to bottom. You see your name, five links, your six parts one under the other, and your footer. You do not see any tags.',
     os => mockPic(os, 0, 'It is plain: black words on white. At the top: the name Alex Rivera and five links in a list with bullets. Then the six parts, one under the other: the big sentence with two links under it, How I Started, One Step at a Time, What I Can Do, the two quotes, and the question with its two links. At the bottom: Made by Alex Rivera and a link, Back to top.'),
     'Read your page from top to bottom.'],
    ['Click your first link, <b>Home</b>. A blank white page opens. That is correct: the link works, and index.html is still empty. The address at the top of the browser now ends with <b>index.html</b>.',
     os => pic('A web browser. The address bar is outlined. The address now ends with index.html. The page under it is blank.', `<div class="sc-win">${titlebar(os, 'index.html')}<div class="sc-addr sc-hit">127.0.0.1:5500/index.html</div><div class="sc-page sc-plain" style="min-height:60px"></div></div>`),
     'Click <b>Home</b>. A blank page opens: index.html is still empty.'],
    ['Click the <b>Back</b> button of your browser: the arrow that points left, at the top left of the window. Your About page comes back.',
     pic('The Back button of a web browser: an arrow that points left. It is outlined.', `<div class="sc-board"><span class="sc-btn sc-hit">&#8592; Back</span><span class="sc-pad">top left of the browser window</span></div>`),
     'Click the <b>Back</b> button. Your About page comes back.']
  ],
  check: ['My page opens in my web browser.', 'The address starts with 127.0.0.1:5500.', 'The browser tab shows my title.', 'I see five links under my name.', 'I see all six parts: Hook, Story, Journey, Skills, Trust, Action.', 'When I click Home, a blank page opens, and the Back button brings my About page back.', 'I do not see any tags, like <code>&lt;p&gt;</code>, on the page.', 'Every word on the page is my own, and nothing private is on it.'],
  hints: ['VS Code shows a small message that says <b>Live Reload is not possible without a head or body tag</b>? That is about an empty page, like index.html. It is not a mistake: close the message, or leave it.',
    'There is no <b>Open with Live Server</b> in the menu? Live Server is not installed yet. Go back one task and install it. Then close VS Code, open it again, and try once more.',
    os => `Your computer asks if VS Code may use the network? Click <b>Allow</b>. Live Server needs this to send the page to your browser.`,
    os => `You cannot install Live Server on this computer? Right-click about.html and click <b>${o(os, 'Reveal in File Explorer', 'Reveal in Finder')}</b>. Double-click the file named about: it opens in your browser. Then, each time you save, click the browser and press <kbd>${mod(os)}</kbd>+<kbd>R</kbd> to load the page again by hand.`,
    'You changed your code and the page looks the same? Save in VS Code. Live Server loads the page again only when you save.',
    'A link shows an error, like file not found? The name in <code>href</code> must match a file name in your Explorer letter for letter: index.html, not Index.html.',
    'You see a tag on the page, like <code>&lt;h2&gt;</code>? A less-than or greater-than sign is missing in your code. Compare that line with the code picture in its task.',
    'Everything after one heading is big and bold? That heading is missing its ending tag, or the ending tag has no slash.',
    'The file opened in VS Code or another program, not a browser? Right-click the file, point to <b>Open with</b>, and choose your web browser.',
],
  learn: '<b>Level up:</b> press the <kbd>Tab</kbd> key in the browser. A box appears around your first link, Home. Press <kbd>Tab</kbd> again to move to the next link. People who do not use a mouse move through your page this way.' });

/* Dr. G: students make their folders OUTSIDE VS Code, in File Explorer or Finder. Then VS Code shows them.
   name = the new folder, have = folders already there, rows = (state) => the VS Code Explorer rows, tabs = the open tabs */
const outsideFolder = (name, have) => {
  const pages = os => [];
  const inside = (os, extra) => files(os, { on: 'Desktop', title: FOLDER, items: have.map(n => ({ name: n })).concat(extra || [], pages(os)) });
  const list = have.length ? 'the ' + (have.length > 1 ? 'folders ' : 'folder ') + have.join(' and ') : 'nothing yet';
  return [
    [os => o(os, 'Look at the taskbar at the bottom of your screen. Click <b>File Explorer</b>: the yellow folder. A window comes to the front.', 'Look at the Dock at the bottom of your screen. Click <b>Finder</b>: the blue and white face at the left end. A window comes to the front.') + ' You make folders here, not in VS Code: here you can see exactly where a new folder goes.',
     os => pic(o(os, 'The Windows desktop. On the taskbar at the bottom, the yellow folder, File Explorer, is outlined.', 'The Mac desktop. In the Dock at the bottom, the blue and white face at the left end, Finder, is outlined.'), desk(os, '', { hitDock: 'finder' })), os => `Click <b>${fm(os)}</b>.`],
    [os => `On the left side of the ${fm(os)} window, click <b>Desktop</b>. The window shows what is on your Desktop.`,
     os => pic(`A ${fm(os)} window. In the list on the left side, Desktop is outlined. The right side shows the folder ${FOLDER}.`, files(os, { on: 'Desktop', hitSide: 'Desktop', items: [{ name: FOLDER }] })), 'On the left side, click <b>Desktop</b>.'],
    [`Double-click your web site folder. Alex double-clicks <b>${FOLDER}</b>. The folder opens. It is empty: you just made it.`,
     os => pic(`A ${fm(os)} window showing the Desktop. The folder ${FOLDER} is outlined.`, files(os, { on: 'Desktop', items: [{ name: FOLDER, hit: true }] })), 'Double-click your web site folder.'],
    [os => o(os, '<b>Right-click</b> an <b>empty</b> part of the window, not on a folder. A menu opens.', 'Click one time on an <b>empty</b> part of the window, not on a folder. Now nothing is highlighted, and the new folder will go in this window.'),
     os => pic(`A ${fm(os)} window showing what is inside ${FOLDER}: ${list}. ` + o(os, 'You right-click an empty part of the window.', 'You click an empty part of the window.'), inside(os)), os => o(os, '<b>Right-click</b> an empty part of the window.', 'Click an empty part of the window.')],
    [os => o(os, 'In the menu, point to <b>New</b>. A second menu opens next to it. Your menu has more choices than the drawing: that is fine.', 'At the very top of the screen, click <b>File</b>. A menu opens.'),
     os => o(os, pic('The menu that opened. It lists View, Sort by, Refresh and New. The choice New is outlined.', desk(os, menu(['View', 'Sort by', 'Refresh', '-', 'New'], 'New'))),
       pic('The Mac screen. In the menu bar at the very top of the screen, the word File is outlined.', desk(os, '', { hitMenu: 'File' }))), os => o(os, 'Point to <b>New</b>.', 'Click <b>File</b> at the top of the screen.')],
    [os => o(os, 'In the second menu, click <b>Folder</b>. A new folder appears in the window, with its name highlighted.', 'In the menu, click <b>New Folder</b>. A new folder appears in the window, with its name highlighted.'),
     os => o(os, pic('The second menu. It lists Folder, Shortcut and Text Document. The choice Folder is outlined.', desk(os, menu(['Folder', 'Shortcut', 'Text Document'], 'Folder'))),
       pic('The File menu on the Mac. It lists New Finder Window, New Folder and New Smart Folder. The choice New Folder is outlined.', desk(os, menu(['New Finder Window', 'New Folder', 'New Smart Folder'], 'New Folder'), { hitMenu: 'File' }))), os => o(os, 'Click <b>Folder</b>.', 'Click <b>New Folder</b>.')],
    [`Do not click anywhere. Type <b>${name}</b>, in lowercase${name === 'images' ? ', with an <b>s</b> at the end' : ''}. What you type replaces the highlighted name.`,
     os => pic(`The ${fm(os)} window showing what is inside ${FOLDER}. The new folder has a name box with ${name} typed in it. The box is outlined.`, inside(os, [{ name, edit: true, hit: true }])), `Type <b>${name}</b> in lowercase.`],
    [os => `Press <kbd>${enterKey(os)}</kbd>. The name is saved. The folder <b>${name}</b> is inside your web site folder.`,
     os => pic(`The ${fm(os)} window showing what is inside ${FOLDER}. The folder is now named ${name}. It is outlined.`, inside(os, [{ name, hit: true }])), os => `Press <b>${enterKey(os)}</b>. The name is saved.`]
  ];
};
task({ id: 'make-folders', sec: 2, title: 'Make three folders inside your folder.', sub: 'Inside your web site folder, make a folder for your CSS, one for your pictures and one for your JavaScript.',
  why: 'A web site keeps each kind of file in its own folder: styles in css, pictures in images, scripts in js. Then you, and your page, always know where to look.',
  without: 'Every file sits loose in one folder, and your page points to pictures and styles that are not where it expects them.',
  how: 'You make these folders now, in ' + 'File Explorer or Finder, before you open VS Code. There you can see exactly where each new folder goes. The names are short and all lowercase, because you will type them in your code.',
  steps: outsideFolder('css', []).concat(outsideFolder('images', ['css']).slice(3), outsideFolder('js', ['css', 'images']).slice(3)),
  check: ['My web site folder holds three folders: <b>css</b>, <b>images</b> and <b>js</b>.', 'The three names are all lowercase. <b>images</b> ends with an s.', 'No folder is inside another one of the three.'],
  hints: [os => `The new folder is on the Desktop, not inside your web site folder? Drag it onto your web site folder and let go.`,
    'One folder went inside another? Open that folder, drag the lost folder out onto the name of your web site folder at the top or side of the window, and let go.',
    os => `A name is spelled wrong? Click the folder one time and press <kbd>${o(os, 'F2', 'Return')}</kbd>. Type the name again and press <kbd>${enterKey(os)}</kbd>.`,
    'Windows and Mac windows change from version to version. Yours may look a little different from the drawings.'],
  learn: '<b>Level up:</b> almost every web site you will ever work on has folders with these names, or names close to them, like <b>img</b> or <b>scripts</b>. Learn this shape once and you can find your way around any site.' });
const NOSHOW = 'The new folder is not in the VS Code Explorer? Move your mouse pointer over your folder name at the top of the Explorer and click <b>Refresh</b>: the round arrow, the third small button.';
const WRONGPLACE = os => `The new folder is on the Desktop, not inside your web site folder? In the ${fm(os)} window, drag it onto your web site folder and let go.`;
/* ===== 5. Style your page with CSS ===== */
const XP = (rows, x) => os => vs(os, { title: FOLDER, panel: explorer(rows, x), tabs: (x && x.tabs) || TAB });
task({ id: 'make-css', sec: 5, title: 'Make your style.css file.', sub: 'Make a file named style.css inside your css folder.',
  why: 'CSS is the language that says how a page looks: its fonts, colors, spacing and layout. It lives in its own file, called a stylesheet.',
  without: 'With no stylesheet, your page stays black words on white, and it cannot change shape for a phone.',
  how: 'HTML says what each part is. CSS says how each part looks. Keeping them in two files means one stylesheet can style every page of a site. The file goes in the css folder you made at the start.',
  steps: [
    ['In the Explorer on the left side of VS Code, find the folder <b>css</b>. You made it at the start, with your web site folder. Click it one time. It is highlighted. This tells VS Code where your next new file goes.',
     os => pic('The Explorer panel lists the folder css and the file about.html. The css folder is highlighted and outlined.', XP([{ name: 'css', dir: true, open: true, on: true, hit: true }, ABOUT])(os)), 'Click the folder <b>css</b> one time.'],
    ['Move your mouse pointer over your folder name at the top of the Explorer. Four small buttons appear on that line. Click the <b>first</b> button, <b>New File</b>: a page with a plus sign. A small box opens <b>under css</b>, pushed in a little. That means the new file will be inside css.',
     os => pic('The Explorer panel. The first of the four buttons, New File, is outlined. A small empty box has opened under the css folder, indented.', XP([{ name: 'css', dir: true, open: true, on: true }, { name: '', edit: true, indent: 1 }, ABOUT], { btns: true, hitNewFile: true })(os)), 'Click <b>New File</b>, the first button. A box opens under css.'],
    ['Type <b>style.css</b> in the small box. Use all lowercase letters, with a dot before <b>css</b>.',
     os => pic('The small box under the css folder with style.css typed in it. The box is outlined.', XP([{ name: 'css', dir: true, open: true }, { name: CSSFILE, edit: true, indent: 1, hit: true }, ABOUT], { btns: true })(os)), 'Type <b>style.css</b> in lowercase.'],
    [os => `Press <kbd>${enterKey(os)}</kbd>. The file <b>style.css</b> is listed under <b>css</b>, pushed in a little. It also opens in the big middle part of VS Code, in a new tab next to about.html. The file is empty. That is correct.`,
     os => pic('VS Code. The Explorer lists the css folder, with style.css indented under it, and about.html. At the top of the middle part are two tabs: about.html and style.css. The style.css tab is open and outlined.', vs(os, { title: FOLDER, panel: explorer([CSSDIR, Object.assign({ on: true }, STYLE), ABOUT]), tabs: [{ name: FILE }, { name: CSSFILE, on: true, hit: true }], ed: '<span class="sc-ln">1</span>' })),
     os => `Press <b>${enterKey(os)}</b>. The file opens in a new tab, and it is empty.`]
  ],
  check: ['I see a folder named <b>css</b> in the Explorer.', '<b>style.css</b> is under css, pushed in a little. It is inside the folder.', 'about.html is <b>not</b> pushed in. It is not inside css.', 'I see two tabs: about.html and style.css.'],
  hints: [NOSHOW, 'style.css is lined up with about.html, not pushed in under css? It is outside the folder. Drag <b>style.css</b> onto <b>css</b> in the Explorer and let go. If VS Code asks, click <b>Move</b>.',
    'about.html went inside css? Drag it onto your folder name at the top of the Explorer and let go.',
    os => `A name is spelled wrong? Click it one time in the Explorer and press <kbd>${o(os, 'F2', 'Return')}</kbd>. Type the name again and press <kbd>${enterKey(os)}</kbd>.`],
  learn: '<b>Level up:</b> web sites keep each kind of file in its own folder: css for stylesheets, images for pictures. You already have the habit.' });

codeTask({ id: 'link-css', sec: 5, title: 'Link your stylesheet to your page.', sub: 'Add one line to about.html that tells the browser to use style.css.',
  why: 'A page does not know about a stylesheet until you link it. The link tag goes in the head, the part with information for the browser.',
  without: 'You can type CSS all day, and the page does not change, because the browser never opens the file.',
  how: 'rel says what the linked file is: a stylesheet. href says where it is: the folder css, a forward slash ( / ) and the file style.css.',
  check: ['My link line is under my title line, before <code>&lt;/head&gt;</code>.', 'It says <code>rel="stylesheet"</code>.', 'It says <code>href="css/style.css"</code>: the same names as my folder and my file.', 'There is no ending tag for link.', 'I saved about.html.'],
  hints: [QUOTES, 'The quote marks did not appear after the = sign? Type them yourself: one before the words and one after.', 'The forward slash ( / ) is on the same key as the question mark. Do not use the backslash ( \\ ).', UNDO],
  learn: '<b>Level up:</b> the words in <code>href</code> are a <b>path</b>: directions from this page to another file. <code>css/style.css</code> means: go into the folder css, then open style.css.' }, b => {
  b.tab(FILE);
  b.clickEnd('<title>', { find: 'the line with your title. It starts with ' + c('<title>') + ' and ends with ' + c('</title>') });
  b.enter();
  b.attr('<link rel=', 'a less-than sign, the letters <b>link</b>, a space, the letters <b>rel</b> and an equals sign', 'rel means relationship: what the linked file is to this page.');
  b.value('stylesheet', 'Type <b>stylesheet</b>: one word, in lowercase.', 'Type <b>stylesheet</b>.');
  b.right();
  b.space();
  b.attr('href=', 'the letters <b>href</b> and an equals sign', 'It is the same as before.');
  b.value('css/style.css', 'Type the folder name <b>css</b>, a forward slash ( <b>/</b> ) and the file name <b>style.css</b>: ' + c('css/style.css') + '.', 'Type ' + c('css/style.css'));
  b.right();
  b.close();
  b.save('Nothing changes in the browser yet: style.css is still empty.');
}, 'html');

const cssDemo = demo(['h1 {', '    color: #f5c84c;', '}'], 1, 19);
task({ id: 'css-words', sec: 5, title: 'Learn how a CSS rule is built.', sub: 'Learn the three parts of a rule before you type one.',
  why: 'Every line of CSS you will type has the same shape. When you know the shape, you can read any stylesheet.',
  without: 'One missing colon or semicolon stops a style from working, and it is hard to spot if you do not know what to look for.',
  how: 'These steps only ask you to look. The pictures show a small sample rule, not your file.',
  steps: [
    ['Look at line 1 of the picture. The first word, ' + c('h1') + ', is the <b>selector</b>. It says <b>which part</b> of the page the rule styles. It is the name of a tag, with no angle brackets.',
     shot(demo(['h1 {', '    color: #f5c84c;', '}'], 0, 0, [{ r: 0, a: 0, b: 2, kind: 'sel' }]), 'sample', { noCursor: true }), 'The <b>selector</b> says which part of the page to style.'],
    ['Look at the two <b>curly braces</b>: ' + c('{') + ' on line 1 and ' + c('}') + ' on line 3. Everything between them belongs to this rule. VS Code types the closing brace for you.',
     shot(demo(['h1 {', '    color: #f5c84c;', '}'], 0, 4, [{ r: 0, a: 3, b: 4, kind: 'typed' }, { r: 2, a: 0, b: 1, kind: 'auto' }]), 'sample', { noCursor: true }), 'The <b>curly braces</b> hold the rule.'],
    ['Look at line 2. It is one <b>declaration</b>: one thing to change. First the <b>property</b> (what to change: ' + c('color') + '), then a <b>colon</b>, then the <b>value</b> (what to change it to), then a <b>semicolon</b> to end the line.',
     cards([['Property', 'color'], ['Colon', ':'], ['Value', '#f5c84c'], ['Semicolon', ';']]), 'A <b>declaration</b>: property, colon, value, semicolon.'],
    ['Look at the whole rule one more time. Read it out loud this way: <b>for every h1, make the color gold</b>.',
     shot(cssDemo, 'sample', { noCursor: true }), 'Read it: for every h1, make the color gold.'],
    ['Look at line 1 of this picture. It is a <b>CSS comment</b>. It starts with ' + c('/*') + ' and ends with ' + c('*/') + '. The browser skips it. You will write one above each group of rules, in your own words, to say what the rules do.',
     shot(demo(['/* My main heading is gold */', 'h1 {', '    color: #f5c84c;', '}'], 0, 0), 'sample', { noCursor: true }), 'A <b>CSS comment</b> goes between ' + c('/*') + ' and ' + c('*/') + '.']
  ],
  check: ['I know the selector says which part of the page to style.', 'I know a declaration is a property, a colon, a value and a semicolon.', 'I know VS Code types the closing curly brace for me.', 'I know a CSS comment goes between <code>/*</code> and <code>*/</code>.'],
  hints: ['Come back to this task any time a CSS word in another step is confusing.', 'The curly braces are on the two keys to the right of the letter P. Hold <kbd>Shift</kbd> to type them.'],
  learn: '<b>Level up:</b> CSS means Cascading Style Sheets. Cascading means that when two rules style the same thing, the one that comes later in the file wins.' });

const R1 = ratio('#eef1ff', '#0b1026'), R2 = ratio('#ffffff', '#05081a');
if (R1 < 7 || R2 < 7) throw new Error('the example colors do not reach 7 : 1');

codeTask({ id: 'css-text', sec: 5, title: 'Set your font and your text size.', sub: 'Type your first rule. It makes the words on your whole page easier to read.',
  why: 'Most visitors read on a phone. Larger text and more space between the lines are easier to read on a small screen.',
  without: 'The browser uses its own small font, and long lines sit close together.',
  how: 'The rule styles body, and everything on the page is inside body, so the whole page changes. px means pixels, the small dots of a screen.',
  check: ['My rule starts with <code>body {</code> and ends with <code>}</code> on its own line.', 'It has four lines between the braces. Each one has a colon and ends with a semicolon.', 'I saved style.css.', 'In the browser, my page has a new font and larger text.'],
  hints: [NOCHANGE, 'Still no change? Open about.html and look at your link line. It must say <code>href="css/style.css"</code>, and style.css must be inside the css folder.', CSSPUNC, CSSLIST, TWOBRACE, UNDO, NOBROWSER],
  learn: '<b>Level up:</b> after Arial comes <code>sans-serif</code>. If a computer does not have Arial, the browser uses another plain font of the same kind. Always end a font list with a kind of font.' }, b => {
  b.tab(CSSFILE);
  b.push('Click one time in the big empty area under the tabs. The cursor (a thin blinking line) appears on <b>line 1</b> of style.css.', 'Click in the big empty area. The cursor is on <b>line 1</b>.');
  b.comment('Hint: say which part of the page this rule styles and what it changes.', 'The whole page: font, text size and space between lines');
  b.cssOpen('body', 'body is the selector: this rule styles the whole page.', true);
  b.cssSplit();
  b.decl('margin: 0;', '0 means no space at all. A zero needs no px after it.', 'Browsers put a small white edge around every page. Without this line, your header can never reach the sides of the screen.', true);
  b.enter();
  b.decl('font-family: Arial, sans-serif;', 'You give a list, with commas. The browser uses the first font it has. Arial is on almost every computer. sans-serif is the backup: any plain font without little feet on the letters. Type the hyphen ( - ) between font and family.', 'Plain letters are easier to read on a screen than the old-style font browsers use when you say nothing.');
  b.enter();
  b.decl('font-size: 18px;', 'px means pixels: the tiny dots a screen is made of. 18px is a little bigger than the 16 pixels browsers use when you say nothing.', 'Small letters are hard to read on a phone. You set the size one time on body, and every part of the page gets it.');
  b.enter();
  b.decl('line-height: 1.6;', '1.6 means 1.6 times the size of the letters. It has no px, so it still fits when the letter size changes.', 'Lines that sit too close together are hard to follow. A little air between them lets the eye find the start of the next line.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.comment('Hint: say which font your headings use and why it is different.', 'Headings: an old-style font, so they stand out from the other words');
  b.cssOpen('h1, h2', 'Two selectors with a comma between them. The comma means <b>and</b>: this one rule styles every h1 and every h2. Type h1, a comma, a space, h2, a space and the opening curly brace.');
  b.cssSplit();
  b.decl('font-family: Georgia, serif;', 'Georgia is a font with small feet on the ends of its letters. That kind of font is called a serif. The word serif after the comma is the backup: any font of that kind.', 'Two fonts give a page a voice: a plain one for the words people read, and one with more character for the headings. The headings now look different from the text, so the eye finds them first.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('h1', 'The big sentence at the top of your page. The rule above already gave it its font. This rule adds things that are for the h1 only.');
  b.cssSplit();
  b.decl('font-size: 40px;', '40 pixels is more than twice the size of your other words.', 'The h1 is the first thing a visitor reads. Its size says: start here.');
  b.enter();
  b.decl('line-height: 1.1;', '1.1 means the lines sit close together: only a little more than the height of the letters.', 'Big letters with the normal space between lines look like separate sentences. Close lines hold the heading together as one thought.');
  b.enter();
  b.decl('margin: 8px 0;', 'Two values: 8 pixels above and below, 0 on the left and right.', 'Browsers put a large empty space around an h1. A small one keeps your label, your heading and your words together as one group.');
  b.save();
  b.toBrowser('Your words now use a plain, clean font, and they are larger.', 1, 'The words now use a plain font and are larger. The page is still black words on white, and the links still have bullets.');
}, 'css');

codeTask({ id: 'css-nav', sec: 5, title: 'Make your mobile menu, on the right.', sub: 'Turn your list of links into a menu for a phone: big links with no bullets, on the right side of your header.',
  why: 'On a phone people tap with a finger, not a small mouse pointer. Each link needs room around it, so a finger hits the right one. Most people hold a phone in the right hand, so a menu on the right is easy to reach with a thumb.',
  without: 'Small links close together are hard to tap, and people tap the wrong one.',
  how: 'A selector with two words, like nav ul, means: every ul that is inside a nav. So your list of skills keeps its bullets for now. Your header holds two things: the div with your name, and the nav with your links. flex puts them next to each other, and space-between pushes your name to the left edge and your menu to the right edge.',
  check: ['I have three new rules. They start with <code>nav ul {</code>, <code>nav a {</code> and <code>header {</code>.', 'There is one empty line between rules.', 'In the browser, my five links have no bullets, and each link is on its own line.', 'My menu is on the <b>right</b> side of the page, next to my name.', 'My list of skills still has its bullets.', 'I saved style.css.'],
  hints: ['Your list of skills lost its bullets too? The selector must be <code>nav ul</code>, with the word nav and a space in front.', 'Your menu is under your name, not on the right? Check the three lines of your header rule, and check that the selector says <code>header</code>.', NOCHANGE, CSSPUNC, CSSLIST, TWOBRACE, UNDO],
  learn: '<b>Level up:</b> a link is normally <b>inline</b>: only as big as its words. <code>display: block</code> makes it a box with space all around it, so a person can tap near the words, not only on them. With 12 pixels of padding each link is more than 44 pixels tall: a good size for a finger.' }, b => {
  b.toCode();
  b.clickEnd('}', { last: true, find: 'the <b>last</b> line of the file. It says ' + c('}') });
  b.enter('The cursor is at the left edge. That is correct.');
  b.enter('The empty line you leave behind keeps your rules apart, so they are easy to read.');
  b.comment('Hint: say what the next rules do to your links.', 'The menu: no bullets, big links on the right');
  b.cssOpen('nav ul', 'This selector means: every ul that is inside a nav. Type nav, a space, ul, a space and the opening curly brace.');
  b.cssSplit();
  b.decl('margin: 0;', '0 takes away the space a browser puts above and below every list.', 'Your menu is a list, but it should not look like one. Without this line there is a gap above and below your links.');
  b.enter();
  b.decl('padding: 0;', '0 takes away the space a list keeps on its left side for the bullets.', 'With that space left in, your links can never line up with the edge of the page.');
  b.enter();
  b.decl('list-style: none;', 'none means: draw no bullet at all.', 'A menu is a list for a screen reader, which is good. For the eye, bullets in front of menu links look wrong.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('nav a', 'This selector means: every link that is inside a nav.');
  b.cssSplit();
  b.decl('display: block;', 'block makes each link a box that fills its whole line. Without it, a link is only as big as its words.', 'On a phone, a finger needs a big target. A link that fills the line can be tapped anywhere on that line.');
  b.enter();
  b.decl('padding: 12px;', 'One number means the same space on all four sides: 12 pixels above, below, left and right of the words.', 'This makes each link tall enough to tap without hitting the link next to it.');
  b.enter();
  b.decl('text-align: right;', 'right pushes the words to the right end of their line.', 'The Z-pattern: your name is top left, so your menu goes top right, where the eye lands next.');
  b.enter();
  b.decl('white-space: nowrap;', 'nowrap means: never break this text onto a second line.', 'On a small phone, a link with two words could split in half. This keeps every link in one piece.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('header', 'This rule styles the top part of your page.');
  b.cssSplit();
  b.decl('display: flex;', 'flex turns the header into a flex box. The things directly inside it (your name box and your menu) now line up in a row, side by side, and you get tools to space them.', 'Without it, the menu sits under your name. You want your name on the left and the menu on the right, on one line.');
  b.enter();
  b.decl('justify-content: space-between;', 'space-between puts the first thing at the left edge, the last thing at the right edge, and all the empty space between them.', 'This is the top line of the Z: name at top left, menu at top right.');
  b.enter();
  b.decl('align-items: center;', 'center lines up the middles. justify-content works along the row (left to right). align-items works across it (top to bottom).', 'Your name box and your menu are not the same height. Without this line, one of them looks like it floats too high.');
  b.save();
  b.toBrowser('Your five links have no bullets now. They sit on the right side of the page, next to your name, one on each line.', 2, 'The name is at the top left. The five links are at the top right, one on each line, with no bullets. The page is still black words on white.');
}, 'css');

codeTask({ id: 'css-colors', sec: 5, title: 'Add your colors.', sub: 'Give your page the colors of a night sky: light words on a dark page, a darker header and gold links.',
  why: 'Color makes the top of your page stand out and gives the page a look of its own.',
  without: 'With colors that are too close to each other, many people cannot read the words: in bright sun, on an old screen, or with low vision.',
  how: 'A color is written as a number sign and six characters, called a hex code. Contrast is how different two colors are, from 1 to 21. Body text needs 4.5 or more. A dark page needs light words. Measured: Alex\'s light words on the dark page are ' + R1 + ' : 1, the white words on the darker header are ' + R2 + ' : 1, and the gold links on the dark page are ' + ratio('#f5c84c', '#0b1026') + ' : 1.',
  check: ['My body rule now has six lines between its braces.', 'My <code>nav a</code> rule has a color line.', 'My header rule has a color line and a background-color line.', 'I have two new rules. They start with <code>a {</code> and <code>h1 span {</code>.', 'In the browser, two or three words of my big sentence are gold.', 'In the browser, my page is dark with light words, my header is darker with white words, and the link at the bottom is gold.', 'I saved style.css.'],
  hints: ['A color does not show? A hex code is a number sign and exactly six characters, like <code>#0b1026</code>. Count them.', 'Your links are hard to read on the header? Check the color line in your <code>nav a</code> rule.', NOCHANGE, CSSPUNC, CSSLIST, UNDO],
  learn: '<b>Level up:</b> use your own colors. Keep the page dark, and choose your own accent color in place of the gold. Test it against your page color on the <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener">WebAIM contrast checker (opens in a new tab)</a>. Keep the pair only if it says 4.5 or more.' }, b => {
  b.toCode();
  b.clickEnd('line-height');
  b.enter();
  b.comment('Hint: say which colors you chose and why they are easy to read.', 'Colors: light words on a dark page, like a night sky');
  b.decl('color: #eef1ff;', 'A color is written as a number sign ( # ) and six characters: two for red, two for green, two for blue. This one is a soft white with a touch of blue: moonlight.', 'Your page is going to be dark, like a night sky. On a dark page the words must be light. A soft white is easier on the eyes than pure white.');
  b.enter();
  b.decl('background-color: #0b1026;', 'It works like color, with the same kind of code. This code is a very dark blue, almost black: the night sky.', 'A dark page makes your pictures and your gold accent color glow. The words and the background must be far apart in lightness, or people cannot read them. This pair measures ' + R1 + ' : 1, far above the 4.5 : 1 people need.');
  b.clickEnd('white-space: nowrap;');
  b.enter();
  b.decl('color: #ffffff;', 'ffffff is the highest value for red, green and blue together: white.', 'Links are blue by default. Blue links on your dark header would be impossible to read.');
  b.clickEnd('align-items: center;');
  b.enter();
  b.decl('color: #ffffff;', 'ffffff is white. Everything inside the header gets this color, unless another rule changes it.', 'The header gets a dark background in the next step. Dark words on a dark background cannot be read.');
  b.enter();
  b.decl('background-color: #05081a;', '05081a is the deepest midnight blue: one step darker than your page. It fills the whole header box.', 'A darker band tells the eye where the top of the page is. White on this color measures ' + R2 + ' : 1 for contrast, far above the 4.5 : 1 people need.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.comment('Hint: say what color your links are and why.', 'Links: gold, so they show on the dark page');
  b.cssOpen('a', 'The letter a alone: this rule styles every link on your page. Your menu links keep their white, because the selector nav a is more exact, and the more exact rule wins.');
  b.cssSplit();
  b.decl('color: #f5c84c;', 'f5c84c is a warm gold, like starlight. It is your accent color: the one bright color of your page.', 'Links are dark blue by default. Dark blue on your dark page cannot be read. Gold on the dark page measures ' + ratio('#f5c84c', '#0b1026') + ' : 1.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('h1 span', 'This selector means: a span that is inside an h1. That is the two or three words you marked in your big sentence.');
  b.cssSplit();
  b.decl('color: #f5c84c;', 'f5c84c is your gold. Only the words inside the span get it. The rest of the heading keeps the color it inherits from body.', 'One gold phrase in a white sentence tells the reader which words matter most. This is what the span in your HTML was for.');
  b.save();
  b.toBrowser('Your page is dark, like a night sky, with light words. Your header is darker, with white words, and the link at the bottom is gold.', 3, 'The page is a very dark blue with light words. The header is darker still, with white words and white links. The links lower on the page are gold.');
}, 'css');

codeTask({ id: 'css-space', sec: 5, title: 'Add space around your words.', sub: 'Keep your words away from the edges of the screen, and keep your lines from getting too long.',
  why: 'Words that touch the edge of a phone screen are hard to read. On a wide screen, very long lines are hard to read too: the eye loses its place.',
  without: 'The words run from one edge of the screen to the other, on every size of screen.',
  how: 'max-width sets the widest a part may be. On a phone the part is as wide as the screen. On a wide screen it stops at 900 pixels, and margin: 0 auto puts equal space on its left and right, so it sits in the middle.',
  check: ['My header rule has a padding line.', 'I have a rule that starts with <code>main {</code> and a rule that starts with <code>footer {</code>.', 'In the browser, my words do not touch the edges of the window.', 'My footer words are in the middle.', 'I saved style.css.'],
  hints: [NOCHANGE, 'The page is not in the middle on a wide window? Check <code>margin: 0 auto;</code> in your main rule. There is a space between 0 and auto.', CSSPUNC, CSSLIST, TWOBRACE, UNDO],
  learn: '<b>Level up:</b> margin is space <b>outside</b> a part. padding is space <b>inside</b> it. Change the header padding to 32px, save and look. Then put it back to 16px.' }, b => {
  b.toCode();
  b.clickEnd('background-color: #05081a;');
  b.enter();
  b.decl('padding: 16px;', 'One number: 16 pixels on all four sides, between the edge of the header and what is inside.', 'Without it, your name touches the edge of the screen and is hard to read.');
  b.enter();
  b.decl('position: sticky;', 'sticky means: scroll with the page like any other part, until you reach the edge of the screen. Then stay there.', 'Your menu stays in reach while a visitor reads all the way down, so they never have to scroll back up to leave the page.');
  b.enter();
  b.decl('top: 0;', '0 means: stick when the header is 0 pixels from the top edge of the screen. sticky does nothing without it.', 'The browser needs to know which edge to stick to, and how close.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.comment('Hint: say what this rule does to the width and the space.', 'The main part: not too wide, in the middle, with space around it');
  b.cssOpen('main', 'This rule styles the main part of your page.');
  b.cssSplit();
  b.decl('max-width: 1100px;', 'max-width is a limit, not a size. The part may be narrower than 1100 pixels, and never wider. On a phone it is simply as wide as the screen.', 'On a big monitor, lines of words that run all the way across are tiring to read. A limit keeps them short.');
  b.enter();
  b.decl('margin: 0 auto;', 'Two values: the first is for above and below, the second is for left and right. auto means: share the leftover space equally. Type 0, a space, and auto.', 'Equal space on both sides puts the main part in the middle of a wide screen. Without it, the page hugs the left edge.');
  b.enter();
  b.decl('padding: 16px;', '16 pixels on all four sides, inside the main part.', 'On a phone the main part is as wide as the screen. Without padding, your words touch the glass edge.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('footer', 'This rule styles the bottom part of your page.');
  b.cssSplit();
  b.decl('padding: 16px;', '16 pixels on all four sides, inside the footer.', 'The footer needs the same breathing room as the header, so the top and the bottom of the page match.');
  b.enter();
  b.decl('background-color: #10163a;', '10163a is a night blue that is one step lighter than your page.', 'A slightly different band at the bottom shows where the page ends, the same way the darker header shows where it starts.');
  b.enter();
  b.decl('text-align: center;', 'center puts the words in the middle of their line.', 'On a narrow phone, the two footer lines sit one under the other. Centered, they look finished and not forgotten.');
  b.save();
  b.toBrowser('Your words have space around them, and your footer is in the middle.', 4, 'The dark header has space around its words. The main words have space on both sides. The footer words are in the middle.');
}, 'css');

/* ===== 6. Lay out your page for every screen ===== */
const ZSVG = `<svg viewBox="0 0 280 170" width="280" height="170" aria-hidden="true" style="max-width:100%;height:auto"><rect x="2" y="2" width="276" height="166" rx="6" fill="#ffffff" stroke="#6b7587" stroke-width="2"/><rect x="2" y="2" width="276" height="40" fill="#e3ebf6"/><rect x="2" y="128" width="276" height="40" fill="#e3ebf6"/><path d="M34 22 H246 L34 148 H246" fill="none" stroke="#6a3a96" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><g fill="#6a3a96"><circle cx="34" cy="22" r="13"/><circle cx="246" cy="22" r="13"/><circle cx="34" cy="148" r="13"/><circle cx="246" cy="148" r="13"/></g><g fill="#ffffff" font-family="Arial,sans-serif" font-size="15" font-weight="700" text-anchor="middle"><text x="34" y="27">1</text><text x="246" y="27">2</text><text x="34" y="153">3</text><text x="246" y="153">4</text></g></svg>`;
const ZPAGE = (() => { const L = (x, y, w, c2) => `<rect x="${x}" y="${y}" width="${w}" height="4" rx="2" fill="${c2 || '#eef1ff'}"/>`, P = (x, y) => `<rect x="${x}" y="${y}" width="86" height="34" rx="3" fill="#7c9cc9"/>`, dot = (x, y, n) => `<circle cx="${x}" cy="${y}" r="10" fill="#ff8fab"/><text x="${x}" y="${y + 4}" text-anchor="middle" font-size="12" font-weight="700" font-family="Arial,sans-serif" fill="#05081a">${n}</text>`;
  return `<svg viewBox="0 0 280 236" width="280" height="236" aria-hidden="true" style="max-width:100%;height:auto"><rect x="1" y="1" width="278" height="234" rx="6" fill="#0b1026" stroke="#6b7587" stroke-width="2"/>` +
    `<rect x="2" y="2" width="276" height="24" fill="#05081a"/>${L(40, 12, 46, '#ffffff')}${L(178, 12, 14, '#ffffff')}${L(198, 12, 14, '#ffffff')}${L(218, 12, 14, '#ffffff')}` +
    `${L(20, 44, 30, '#f5c84c')}${L(20, 54, 110)}${L(20, 62, 80)}${P(174, 38)}` +
    `${P(20, 86)}${L(150, 92, 30, '#f5c84c')}${L(150, 102, 100)}${L(150, 110, 80)}` +
    `${L(20, 140, 30, '#f5c84c')}${L(20, 150, 110)}${L(20, 158, 70)}${P(174, 134)}` +
    `<rect x="14" y="184" width="252" height="38" rx="4" fill="#f5c84c"/>${L(40, 200, 90, '#05081a')}<rect x="176" y="194" width="36" height="16" rx="4" fill="#05081a"/><rect x="218" y="194" width="36" height="16" rx="4" fill="none" stroke="#05081a" stroke-width="2"/>` +
    `<path d="M24 14 L256 14 L24 203 L256 203" fill="none" stroke="#ff8fab" stroke-width="3" stroke-dasharray="7 5" stroke-linejoin="round"/>${dot(24, 14, 1)}${dot(256, 14, 2)}${dot(24, 203, 3)}${dot(256, 203, 4)}</svg>`; })();
task({ id: 'z-pattern', sec: 6, title: 'Learn the Z-pattern.', sub: 'Learn the path most eyes follow on a short page, so you can put the right thing in each corner.',
  why: 'On a page with few words, most people look in the shape of the letter Z. If the important things sit on that path, people see them without trying.',
  without: 'Your name or your links sit where the eye does not go, and visitors miss them.',
  how: 'The eye starts at the top left, moves across the top to the right, slides down across the middle to the bottom left, and ends at the bottom right. Designers put who you are at the start and the next thing to do at the end. Your About page uses the Z three times: in the bar at the top, in the rows that switch sides, and in the last part, where your question is on the left and your buttons are on the right.',
  steps: [
    ['Look at the picture. Follow the purple line with your finger from <b>1</b> to <b>4</b>. It makes the letter <b>Z</b>: across the top, down through the middle, and across the bottom.',
     pic('A drawing of a page with a purple line in the shape of the letter Z. Point 1 is at the top left, point 2 at the top right, point 3 at the bottom left and point 4 at the bottom right. The line goes from 1 across to 2, down through the middle to 3, and across to 4.', `<div class="sc-board">${ZSVG}</div>`),
     'Follow the line from <b>1</b> to <b>4</b>. It makes a <b>Z</b>.'],
    ['Look at what goes on each point. <b>1</b>, top left: who you are. <b>2</b>, top right: your links. <b>3</b>, bottom left: your question. <b>4</b>, bottom right: the next thing to do. The last point is the most important one: it is where the eye stops, so it is where your buttons go.',
     cards([['1. Top left', 'your name'], ['2. Top right', 'your links'], ['3. Bottom left', 'your question'], ['4. Bottom right', 'your buttons: the next thing to do']]),
     'Each corner of the Z gets one thing.'],
    ['Look at the Z on <b>your</b> page. <b>1 to 2</b> is the bar at the top: your name, then your links. From 2 the eye slides <b>down</b> to 3. On the way it crosses your three rows, and because the pictures switch sides, each row pulls the eye across again: words, picture, picture, words, words, picture. <b>3 to 4</b> is your last part, the gold band: your question on the left, your buttons on the right.',
     pic('A drawing of the finished About page with a dashed line in the shape of the letter Z on top of it. Point 1 is on the name in the top bar. Point 2 is on the links at the right end of the bar. The line then goes down across three rows, where the picture is on the right, then on the left, then on the right. Point 3 is on the question at the left of the gold band at the bottom. Point 4 is on the two buttons at its right.', `<div class="sc-board">${ZPAGE}</div>`),
     'The Z on your page: the top bar, the rows that switch sides, and the gold band.'],
    ['Look at the three places where you build the Z. Each one uses the same tool: a flex box that puts the first thing on the left and the last thing on the right. You build them in this order.',
     cards([['Top of the Z', 'header: your name left, your links right'], ['Middle of the Z', 'the rows: words and picture switch sides'], ['Bottom of the Z', 'the gold band: question left, buttons right. The footer under it does the same in small']]),
     'Three places, one tool: a flex box.'],
    ['Look at the two pages. On a <b>phone</b> you already have the top of the Z: your name on the left and your menu on the right. Under that, everything is in one column. On a <b>wide screen</b> there is room for the whole Z, so your CSS will put the links in a row, switch the sides of your rows, and put your question and your buttons in the two bottom corners.',
     cards([['Phone', 'name left, menu right, then one column'], ['Wide screen', 'the whole Z: name left, links in a row on the right, rows that switch sides, question left and buttons right']]),
     'A phone gets the top of the Z. A wide screen gets all of it.']
  ],
  check: ['I can trace the Z: top left, top right, bottom left, bottom right.', 'I know my name goes at point 1 and my links at point 2.', 'I know my question goes at point 3 and my buttons at point 4.', 'I can name the three places where my page uses the Z: the top bar, the rows that switch sides, and the gold band.', 'I know a phone shows the top of the Z, and a wide screen shows all of it.'],
  hints: ['Think of reading a page of a book: you start at the top left and end at the bottom right. The Z is the short way between them.', 'The Z fits a page with few words, like an About page. A page full of text is read in a different way, line by line.'],
  learn: '<b>Level up:</b> open a web site you like on a computer. Where is its name? Where are its links? Where is the button it wants you to click? Many home pages follow a Z.' });

const MEDIA = '@media (min-width: 800px)';
codeTask({ id: 'css-wide', sec: 6, title: 'Put your links in a row on wide screens.', sub: 'Type a media query: a group of rules that work only when the screen is wide enough.',
  why: 'A responsive page changes its shape to fit the screen. One link on each line is right for a phone. On a wide screen, a row of links uses the space better.',
  without: 'A wide screen shows three links stacked in a tall header, with a big empty space in the middle.',
  how: 'You styled the phone first: that is called mobile first. A media query adds rules for bigger screens. min-width: 800px means: when the window is 800 pixels wide or wider. flex puts the things inside a part next to each other. gap is the space between them.',
  check: ['My file ends with a rule that starts with <code>@media (min-width: 800px) {</code>.', 'Inside it there is a <code>nav ul</code> rule, pushed in, with two lines.', 'The last two lines of my file are closing braces: one pushed in, one at the left edge.', 'I saved style.css.'],
  hints: ['You see two closing parentheses, like <code>))</code>? Erase one. VS Code adds one when you type the opening parenthesis, and your own goes on top of it when you keep typing.', 'The at sign ( @ ): hold <kbd>Shift</kbd> and press the <kbd>2</kbd> key.', CSSPUNC, CSSLIST, TWOBRACE, UNDO],
  learn: '<b>Level up:</b> 800px is called a <b>breakpoint</b>: the width where the layout changes. Change it to 900px, save, and make your browser window wider and narrower. Then put it back to 800px.' }, b => {
  b.toCode();
  b.clickEnd('}', { last: true, find: 'the <b>last</b> line of the file. It says ' + c('}') });
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.comment('Hint: say when the rules inside these braces are used.', 'Wide screens only: everything inside these braces');
  b.cssOpen(MEDIA, 'Type an at sign ( @ ), the word media, a space, an opening parenthesis, min-width, a colon, a space, 800px, a closing parenthesis, a space and the opening curly brace. When you type the opening parenthesis, VS Code adds a closing one. Keep typing: your closing parenthesis goes on top of it.');
  b.cssSplit();
  b.cssOpen('nav ul', 'This rule is inside the media query, so it is pushed in. It works on wide screens only.');
  b.cssSplit();
  b.decl('display: flex;', 'flex makes the list a flex box, so its five list items line up side by side.', 'A wide screen has room for all five links on one line. A tall stack of links wastes that room.');
  b.enter();
  b.decl('gap: 16px;', 'gap puts 16 pixels between each thing and the next. It adds nothing before the first or after the last.', 'Without it, the links touch each other and read as one long word.');
  b.save();
  b.toBrowser('If your browser window is wide, your five links are now in a row at the top right. In a narrow window they stay one on each line.', 5, 'The window is wide. In the dark header, the name is at the left and the five links are in a row at the right.');
}, 'css');

codeTask({ id: 'css-z-bottom', sec: 6, title: 'Make the bottom of the Z.', sub: 'On wide screens, put Made by at the bottom left and Back to top at the bottom right.',
  why: 'Point 4, the bottom right, is where the eye ends. It is the place for the next thing to do. On your page, that is the link back to the top.',
  without: 'The eye reaches the end of the page and finds nothing to do next.',
  how: 'Your footer holds two things: the paragraph and the link. flex and space-between send one to each side, the same way as in your header. On a phone the footer stays in the middle, where a thumb reaches it easily.',
  check: ['Inside my media query there is now a <code>footer</code> rule with three lines, pushed in like the <code>nav ul</code> rule above it.', 'The last two lines of my file are still closing braces: one pushed in, one at the left edge.', 'On a wide browser window, Made by is at the bottom left and Back to top is at the bottom right.', 'I saved style.css.'],
  hints: ['Both footer parts are still in the middle? Make the browser window wider than 800 pixels, and check that the new rule is inside the media query.', NOCHANGE, CSSPUNC, CSSLIST, UNDO],
  learn: '<b>Level up:</b> on a real site, point 4 often holds a button like <b>Contact me</b> or <b>See my work</b>. When you have more pages, change your last link to point to one of them.' }, b => {
  b.toCode();
  b.clickEnd('', { row: -2, find: 'the line just <b>above the last line</b> of the file. It says ' + c('}') + ' and it is pushed in' });
  b.enter('The cursor is pushed in, under the brace above it.');
  b.enter('This leaves one empty line between the two rules.');
  b.comment('Hint: say where the two footer parts go.', 'The bottom of the Z: footer parts in the two corners');
  b.cssOpen('footer', 'This footer rule is inside the media query: wide screens only.');
  b.cssSplit();
  b.decl('display: flex;', 'flex makes the footer a flex box, so its two paragraphs sit side by side.', 'On a wide screen you want Made by on the left and Back to top on the right: the bottom line of the Z.');
  b.enter();
  b.decl('justify-content: space-between;', 'space-between sends the first thing to the left edge and the last thing to the right edge.', 'The Z ends at the bottom right. That is where the eye stops, so that is where the link to go back up belongs.');
  b.enter();
  b.decl('align-items: center;', 'center lines up the middles of the two parts, from top to bottom.', 'If one part is taller than the other, they still sit level.');
  b.save();
  b.toBrowser('On a wide window, your page now makes a Z: name, links, Made by, Back to top.', 6, 'The window is wide. The page makes a Z: the name at the top left, the links in a row at the top right, Made by Alex Rivera at the bottom left and the link Back to top at the bottom right.');
}, 'css');

task({ id: 'test-sizes', sec: 6, title: 'Test your page at phone size and with the keyboard.', sub: 'Run three checks yourself: a narrow window, a wide window and the keyboard only.',
  why: 'You cannot know a page is responsive until you see it change. You are your own tester.',
  without: 'A layout that works on your screen can be broken on a phone, and you never find out.',
  how: 'Making the browser window narrow shows what a phone shows. The Tab key shows what a person who does not use a mouse can reach.',
  steps: [
    [os => `Look at the ${o(os, 'taskbar', 'Dock')} at the bottom of your screen. Click the icon of your <b>web browser</b>. The browser window with your About page comes to the front.`,
     os => pic(o(os, 'The Windows desktop. On the taskbar at the bottom, the web browser icon is outlined.', 'The Mac desktop. In the Dock at the bottom, the web browser icon is outlined.'), desk(os, '', { hitDock: 'web' })), 'Click the icon of your <b>web browser</b>.'],
    ['Move your mouse pointer to the <b>right edge</b> of the browser window, until the pointer turns into a two-way arrow. Drag the edge to the <b>left</b> until the window is as narrow as it will go. Your links change from a row to a menu on the right, one on each line, and your footer moves to the middle. This is your phone layout.',
     os => mockPic(os, 6, 'The window is narrow, like a phone. The name is at the top left. The menu is at the top right: five links, one on each line. Under the header, the words are in one column, and Made by Alex Rivera and Back to top are in the middle.', true),
     'Drag the right edge to the <b>left</b>. The menu stacks on the right: your phone layout.'],
    ['Drag the right edge of the window back to the <b>right</b>, slowly. Watch for the moment the layout changes: your links jump into a row, and your footer parts move to the two corners. That moment is 800 pixels, your breakpoint.',
     os => mockPic(os, 6, 'The window is wide again. The page makes a Z: the name at the top left, the links in a row at the top right, Made by Alex Rivera at the bottom left and Back to top at the bottom right.'),
     'Drag the edge back to the <b>right</b>. The Z layout comes back.'],
    ['Take your hand off the mouse. Press the <kbd>Tab</kbd> key one time. A box, called the focus ring, appears around your first link.',
     keys(['Tab'], 'A box appears around your first link.'), 'Press <b>Tab</b> one time. A box appears around your first link.'],
    ['Keep pressing the <kbd>Tab</kbd> key, slowly, until the box is on <b>Back to top</b>. The box visits each of your five menu links on the way. All six links can be reached with no mouse.',
     cards([['Tab', 'Home'], ['Tab', 'About'], ['Tab', 'the next links'], ['Last', 'Back to top']]), 'Keep pressing <b>Tab</b> until the box is on <b>Back to top</b>.'],
    [os => `With the box on <b>Back to top</b>, press <kbd>${enterKey(os)}</kbd>. The link works from the keyboard: the address at the top of the browser now ends with <b>#top</b>.`,
     os => pic('A web browser. The address bar is outlined. The address now ends with about.html#top.', `<div class="sc-win">${titlebar(os, TITLE)}<div class="sc-addr sc-hit">${FOLDER}/${FILE}#top</div><div class="sc-page sc-plain" style="text-align:left"><b style="display:block">${TITLE}</b></div></div>`),
     os => `Press <b>${enterKey(os)}</b>. The address now ends with <b>#top</b>.`]
  ],
  check: ['In a narrow window, my menu is on the right, with each link on its own line, and the rest of the page is one column.', 'In a wide window, my page makes a Z: name top left, links top right, Made by bottom left, Back to top bottom right.', 'No words are cut off at any width, and I never have to scroll sideways.', 'I can reach all six links with the Tab key, and I can see which one I am on.', 'A link works when I press Enter or Return.'],
  hints: ['The window will not get narrow enough to change? Zoom in: hold Ctrl (Windows) or Command (Mac) and press the plus key two or three times. Zooming in acts like a smaller screen.',
    'The layout never changes? Open about.html and check line 5: the viewport line must be there. Then check that your media query says <code>min-width: 800px</code>.',
    'You have to scroll sideways? Something is too wide. Check that <code>max-width</code> is spelled with a hyphen in your main rule.',
    os => o(os, 'Tab does nothing? Click one time on an empty part of the page first, then press Tab.', 'Tab skips your links in Safari? Hold <kbd>Option</kbd> and press <kbd>Tab</kbd>. Safari uses Option+Tab to move from link to link.')],
  learn: '<b>Level up:</b> see your page on a pretend phone. In Chrome or Edge, right-click the page and click <b>Inspect</b>. Then click the small icon of a phone and a tablet at the top of the panel that opens. Choose a phone from the list above your page.' });

/* ===== 7. Make your menu open and close ===== */
const PHONE = (st, alt, open) => os => mockPic(os, st, alt, true, open);
task({ id: 'menu-plan', sec: 7, title: 'Plan your hamburger menu.', sub: 'See what you will build: a button with three lines that opens and closes your menu on a phone.',
  why: 'Five links take a lot of room at the top of a small screen. A hamburger button keeps the top short, and the links are one tap away.',
  without: 'On a phone, your visitor sees mostly menu and has to scroll to reach your words.',
  how: 'You need all three languages. HTML makes the button. CSS hides the links on a phone and styles the button. JavaScript, a new language, listens for a tap and shows or hides the links. JavaScript says what a page does when something happens.',
  steps: [
    ['Look at the picture. On a phone, the menu is <b>closed</b> at first. Your name is on the left and a button with <b>three lines</b> is on the right. It is called a <b>hamburger button</b>, because the three lines look like a bun, a burger and a bun.',
     PHONE(8, 'The window is narrow, like a phone. In the dark header, the name is at the left and a gold button with three lines is at the right. No links show.'), 'Closed: your name on the left, the <b>hamburger button</b> on the right.'],
    ['Look at this picture. After one tap on the hamburger button, the menu is <b>open</b>: your five links show under your name, lined up on the right. One more tap closes it again.',
     PHONE(8, 'The window is narrow, like a phone. The hamburger button is outlined. Under the name and the button, five links now show, one on each line, lined up on the right.', true), 'Open: one tap shows your five links.'],
    ['Look at the three jobs. Each language does one. You will do them in this order.',
     cards([['1. HTML', 'makes the button'], ['2. CSS', 'hides the links, styles the button'], ['3. JavaScript', 'opens and closes on a tap']]), 'Three languages, three jobs.'],
    ['Look at the wide screen. There is room for the links there, so the button is hidden and the links are always in a row. Your Z-pattern stays the same.',
     os => mockPic(os, 8, 'The window is wide. There is no hamburger button. The name is at the top left and the five links are in a row at the top right.'), 'Wide screen: no button, and the links are always in a row.']
  ],
  check: ['I know the menu is closed at first on a phone.', 'I know one tap opens it and one more tap closes it.', 'I know which language does which job.', 'I know a wide screen shows no button.'],
  hints: ['Think of a light switch. HTML is the switch on the wall. CSS is the lamp being off or on. JavaScript is the wire between them.'],
  learn: '<b>Level up:</b> the three lines have no words, so a screen reader would only say "button". That is why you will add <code>aria-label="Menu"</code>: it gives the button a name that is said out loud.' });

codeTask({ id: 'menu-button', sec: 7, title: 'Add the hamburger button to your HTML.', sub: 'Add a button to your header, and one line at the bottom that loads your JavaScript file.',
  why: 'button makes a real button. It works with a mouse, a finger and the keyboard, with no extra work from you. Three lines, one above the other, are called a hamburger icon: people know it means menu.',
  without: 'A div made to look like a button cannot be reached with the Tab key, so some people can never open your menu.',
  how: 'An icon has no words, so aria-label gives the button a name for people who cannot see it. aria-expanded tells a screen reader if the menu is open: false means closed, true means open. Your JavaScript will change it. The script tag loads a JavaScript file. It goes at the very bottom of body, so the button and the links already exist when the script starts.',
  check: ['My button line is between the line with my name and <code>&lt;nav&gt;</code>, inside the header.', 'It says <code>aria-label="Menu"</code>, <code>aria-expanded="false"</code> and the code <code>&amp;#9776;</code> between the tags.', 'My script line is under <code>&lt;/footer&gt;</code> and above <code>&lt;/body&gt;</code>.', 'It says <code>src="js/menu.js"</code> and ends with <code>&lt;/script&gt;</code>.', 'I saved about.html.'],
  hints: [QUOTES, 'aria-label and aria-expanded each have a hyphen ( - ) in the middle and no spaces.', 'The ampersand ( &amp; ): hold <kbd>Shift</kbd> and press the <kbd>7</kbd> key. The code must end with a semicolon.', 'script is not like link: it <b>has</b> an ending tag, and VS Code types it for you. Nothing goes between the two tags.', TWOEND, UNDO],
  learn: '<b>Level up:</b> ARIA is a set of extra words for HTML that tell screen readers things a person would see. Use them only when no plain HTML tag can say the same thing.' }, b => {
  b.tab(FILE);
  b.clickEnd('class="logo"');
  b.enter();
  b.comment('Hint: say what the button does and on which screens.', 'A hamburger button that opens and closes the menu on phones');
  b.attr('<button aria-label=', 'a less-than sign, the word <b>button</b>, a space, the word <b>aria-label</b> (with a hyphen) and an equals sign', 'aria-label gives the button a name that screen readers say out loud. Your button will show three lines and no words, so it needs this name.');
  b.value('Menu', 'Type <b>Menu</b>, with a capital M. A screen reader will say: Menu, button.', 'Type <b>Menu</b>.');
  b.right();
  b.space();
  b.attr('aria-expanded=', 'the word <b>aria-expanded</b> (with a hyphen) and an equals sign', 'aria-expanded says if the menu is open.');
  b.value('false', 'Type <b>false</b>, in lowercase. It means: the menu is closed.', 'Type <b>false</b>.');
  b.right();
  b.close();
  b.words('&#9776;', 'Type ' + c('&#9776;') + ': an ampersand ( &amp; ), a number sign ( # ), the numbers 9776 and a semicolon ( ; ). This is the code for the <b>hamburger icon</b>: three lines, one above the other. The browser shows the icon, not the code.', 'Type ' + c('&#9776;') + ', the code for the hamburger icon.');
  b.clickEnd('</footer>');
  b.enter();
  b.attr('<script src=', 'a less-than sign, the word <b>script</b>, a space, the letters <b>src</b> and an equals sign', 'src means source: where the JavaScript file is.');
  b.value('js/menu.js', 'Type the folder name <b>js</b>, a forward slash ( <b>/</b> ) and the file name <b>menu.js</b>: ' + c('js/menu.js') + '. You will make this folder and this file in the next task.', 'Type ' + c('js/menu.js'));
  b.right();
  b.close('Leave the space between the two tags empty.');
  b.save();
}, 'html');

const JSDIR = { name: 'js', dir: true, open: true }, MENUJS = { name: JSFILE, indent: 1 };
const CSSROWS = [CSSDIR, STYLE];
task({ id: 'make-js', sec: 7, title: 'Make your menu.js file.', sub: 'Make a file named menu.js inside your js folder.',
  why: 'JavaScript lives in its own file, the same way CSS does. The file name ends in .js.',
  without: 'Your script line in about.html points to a file that does not exist, and the button does nothing.',
  how: 'These are the same moves you used for style.css. The file goes in the js folder you made at the start.',
  steps: [
    ['In the Explorer on the left side of VS Code, find the folder <b>js</b>. You made it at the start. Click it one time. It is highlighted. Your next new file will go inside it.',
     os => pic('The Explorer panel lists the folders css and js, and the file about.html. The js folder is highlighted and outlined.', vs(os, { title: FOLDER, panel: explorer(CSSROWS.concat([{ name: 'js', dir: true, open: true, on: true, hit: true }, ABOUT])), tabs: [{ name: FILE }, { name: CSSFILE, on: true }] })), 'Click the folder <b>js</b> one time.'],
    ['Move your mouse pointer over your folder name at the top of the Explorer. Four small buttons appear on that line. Click the <b>first</b> button, <b>New File</b>: a page with a plus sign. A small box opens <b>under js</b>, pushed in a little.',
     os => pic('The Explorer panel. The first of the four buttons, New File, is outlined. A small empty box has opened under the js folder, indented.', vs(os, { title: FOLDER, panel: explorer(CSSROWS.concat([{ name: 'js', dir: true, open: true, on: true }, { name: '', edit: true, indent: 1 }, ABOUT]), { btns: true, hitNewFile: true }), tabs: [{ name: FILE }, { name: CSSFILE, on: true }] })), 'Click <b>New File</b>, the first button. A box opens under js.'],
    ['Type <b>menu.js</b> in the small box. Use all lowercase letters, with a dot before <b>js</b>.',
     os => pic('The small box under the js folder with menu.js typed in it. The box is outlined.', vs(os, { title: FOLDER, panel: explorer(CSSROWS.concat([JSDIR, { name: JSFILE, edit: true, indent: 1, hit: true }, ABOUT]), { btns: true }), tabs: [{ name: FILE }, { name: CSSFILE, on: true }] })), 'Type <b>menu.js</b> in lowercase.'],
    [os => `Press <kbd>${enterKey(os)}</kbd>. The file <b>menu.js</b> is listed under <b>js</b>, pushed in a little. It also opens in a new tab, next to style.css. The file is empty. That is correct.`,
     os => pic('VS Code. The Explorer lists the css folder with style.css, the js folder with menu.js indented under it, and about.html. At the top of the middle part are three tabs: about.html, style.css and menu.js. The menu.js tab is open and outlined.', vs(os, { title: FOLDER, panel: explorer(CSSROWS.concat([JSDIR, Object.assign({ on: true }, MENUJS), ABOUT])), tabs: [{ name: FILE }, { name: CSSFILE }, { name: JSFILE, on: true, hit: true }], ed: '<span class="sc-ln">1</span>' })),
     os => `Press <b>${enterKey(os)}</b>. The file opens in a new tab, and it is empty.`]
  ],
  check: ['I see a folder named <b>js</b> in the Explorer, lined up with css.', '<b>menu.js</b> is under js, pushed in a little. It is inside the folder.', 'I see three tabs: about.html, style.css and menu.js.'],
  hints: [NOSHOW, 'The js folder went inside css? Drag <b>js</b> onto your folder name at the top of the Explorer and let go. If VS Code asks, click <b>Move</b>.',
    'menu.js is not pushed in under js? Drag <b>menu.js</b> onto <b>js</b> and let go.',
    os => `A name is spelled wrong? Click it one time in the Explorer and press <kbd>${o(os, 'F2', 'Return')}</kbd>. Type the name again and press <kbd>${enterKey(os)}</kbd>.`],
  learn: '<b>Level up:</b> your site now has the three files of the web: one HTML file, one CSS file and one JavaScript file. Almost every web site is built from these three kinds.' });
TREE = [CSSDIR, STYLE, JSDIR, MENUJS, ABOUT]; TABNAMES = [FILE, CSSFILE, JSFILE];

const R3 = ratio('#05081a', '#f5c84c');
codeTask({ id: 'menu-css', sec: 7, title: 'Style the button and hide the links.', sub: 'Make the hamburger button look like a button, and hide your links until the menu is open.',
  why: 'A closed menu shows no links. CSS hides them, and shows them again when the nav has a class named open.',
  without: 'The button would sit next to links that are always there, and tapping it would change nothing.',
  how: 'display: none hides a part completely. A dot in a selector means a class: nav.open means a nav that has the class open. Your JavaScript will add and remove that class. flex-wrap lets the links drop to a new line under your name and the button. The button is gold with dark lines: the same gold as your links, with a contrast of ' + R3 + ' : 1.',
  check: ['My header rule has a line that says <code>flex-wrap: wrap;</code>.', 'I have four new rules above my media query. They start with <code>button {</code>, <code>nav {</code>, <code>nav.open {</code> and <code>.logo {</code>.', 'In the browser, my links are gone and a gold hamburger button is at the top right.', 'I saved style.css.'],
  hints: ['The hamburger button is under your name, not on the right? Check your <code>.logo</code> rule: it needs <code>flex: 1;</code>.', 'Your links still show? Check the rule that starts with <code>nav {</code>: it needs <code>display: none;</code>. Check that you saved, and that the browser loaded the page again.', 'There is no space in <code>nav.open</code>: the word nav, a dot and the word open.', NOCHANGE, CSSPUNC, CSSLIST, TWOBRACE, UNDO],
  learn: '<b>Level up:</b> <code>border-radius</code> rounds the corners of a box. Change 6px to 20px, save and look. Keep the one you like.' }, b => {
  b.tab(CSSFILE);
  b.clickEnd('display: flex;', { find: 'the <b>first</b> line that says ' + c('display: flex;') + ' It is in your header rule' });
  b.enter();
  b.decl('flex-wrap: wrap;', 'wrap means: when the things do not fit on one line, the next one drops to a new line. Without it, a flex box squeezes everything onto one line.', 'The open menu is as wide as the header. It can only sit under your name and the button if the header is allowed to wrap.');
  b.clickEnd('', { row: aboveMedia(), find: 'the line that starts with ' + c('@media') + '. Then go <b>up</b> from it to the first line that says ' + c('}') + '. That line ends your footer rule' });
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.comment('Hint: say what the next rules do to the button and to the links.', 'The hamburger button, and the menu hidden until it is open');
  b.cssOpen('button', 'This rule styles your hamburger button.');
  b.cssSplit();
  b.decl('padding: 12px 16px;', 'Two numbers: the first is above and below (12 pixels), the second is left and right (16 pixels).', 'A button on a phone should be about as big as a fingertip. The space makes the target big without making the icon big.');
  b.enter();
  b.decl('font-size: 24px;', 'The hamburger icon is a character, like a letter, so font-size makes it bigger. 24 pixels is larger than your 18 pixel words.', 'At the normal size the three lines are tiny and easy to miss.');
  b.enter();
  b.decl('color: #05081a;', 'color colors characters, and the icon is a character. 05081a is the dark color of your header.', 'Dark lines on a gold button are easy to see. Dark on gold measures ' + R3 + ' : 1.');
  b.enter();
  b.decl('background-color: #f5c84c;', 'f5c84c is your gold. It fills the button box.', 'A bright button stands out on your dark header, so people can find the menu. It uses the accent color the page already has.');
  b.enter();
  b.decl('border: 0;', '0 means: no line.', 'Browsers draw an old-fashioned gray line around every button. It does not match your page.');
  b.enter();
  b.decl('border-radius: 6px;', 'The number is how far the curve reaches into each corner. 6 pixels is a soft, small curve.', 'Round corners make a box look like something you can press.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('nav', 'This rule styles the whole nav: the box that holds your links.');
  b.cssSplit();
  b.decl('display: none;', 'none means: do not show this part at all, and leave no empty space for it.', 'On a phone, five links fill half the screen. Hidden links leave room for your page. This is the closed menu.');
  b.enter();
  b.decl('width: 100%;', 'A percent is measured against the box the part is in. 100% means: as wide as the header.', 'A full-width menu cannot fit next to your name, so it drops to its own line under it. That is where an open phone menu belongs.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('nav.open', 'Type nav, a dot and open, with no spaces between them. It means: a nav that has the class named open.');
  b.cssSplit();
  b.decl('display: block;', 'block shows the part again, as a box on its own line. This rule works only while the nav has the class open, so it beats the display: none above.', 'This is the open menu. Your JavaScript adds and removes the class open, and this rule does the showing.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('.logo', 'A dot and the word logo. The dot means class: this rule styles the tag that says class="logo". That is your name in the header.');
  b.cssSplit();
  b.decl('flex: 1;', 'flex is three settings in one: how much a box may grow, how much it may shrink, and its starting size. The single number 1 means: grow to fill all the space that is left over, and shrink when there is not enough.', 'Your name takes the leftover space, so the button is pushed to the right edge. On a small phone your name shrinks, and a long name goes onto two lines, so the button never drops under it.');
  b.enter();
  b.decl('margin: 0;', '0 takes away the space a browser puts above and below every paragraph.', 'Your name is a paragraph. That space would make the header taller than it needs to be.');
  b.enter();
  b.decl('font-family: Georgia, serif;', 'Georgia is the font of your headings.', 'Your name is your logo. The heading font makes it look like a name plate and not like a sentence.');
  b.enter();
  b.decl('font-size: 20px;', '20 pixels is a little larger than your 18 pixel words.', 'A logo should be easy to find, and still small enough to share the bar with your menu.');
  b.enter();
  b.decl('font-weight: bold;', 'bold makes the letters thicker.', 'Thick letters make your name the strongest thing in the header.');
  b.save();
  b.toBrowser('Your links are gone, and a white <b>hamburger button</b> is at the top right. The button does nothing yet: that is correct.', 7, 'In the dark header, the name is at the left and a gold button with three lines is at the right. No links show.');
}, 'css');

codeTask({ id: 'menu-css-wide', sec: 7, title: 'Keep the links showing on wide screens.', sub: 'Add three small rules to your media query: no button, links always there.',
  why: 'A wide screen has room for the links. Hiding them behind a button there would only add a click.',
  without: 'On a computer your visitors see a hamburger button and no links, and your Z-pattern loses its top right corner.',
  how: 'Rules inside your media query come later in the file, so on wide screens they win over the rules you just typed. auto gives the nav back its own width, and nowrap keeps your name and your links on one line.',
  check: ['Inside my media query there are now five rules: <code>nav ul</code>, <code>footer</code>, <code>button</code>, <code>nav</code> and <code>header</code>.', 'The last two lines of my file are closing braces: one pushed in, one at the left edge.', 'On a wide browser window, there is no hamburger button and my links are in a row at the top right.', 'I saved style.css.'],
  hints: ['The button still shows on a wide window? The new rules must be <b>inside</b> the media query: above the last closing brace of the file, and pushed in.', NOCHANGE, CSSPUNC, CSSLIST, TWOBRACE, UNDO],
  learn: '<b>Level up:</b> this is the <b>cascade</b>: when two rules style the same thing, the later one wins. That is why the media query is at the bottom of the file.' }, b => {
  b.toCode();
  b.clickEnd('', { row: -2, find: 'the line just <b>above the last line</b> of the file. It says ' + c('}') + ' and it is pushed in' });
  b.enter('The cursor is pushed in, under the brace above it.');
  b.enter('This leaves one empty line between the two rules.');
  b.comment('Hint: say what changes on a wide screen.', 'Wide screens: no button, links always showing');
  b.cssOpen('button', 'Inside the media query, this rule is for wide screens only.');
  b.cssSplit();
  b.decl('display: none;', 'none hides the button and leaves no gap where it was.', 'A wide screen shows all five links. A button that opens a menu that is already open would only confuse people.');
  b.down();
  b.enter('The cursor is pushed in.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('nav', 'This rule shows the links again on wide screens.');
  b.cssSplit();
  b.decl('display: block;', 'block shows the nav. Because this rule is inside the media query and comes later in the file, it beats the display: none you typed for phones.', 'On a wide screen the links must always show, whether the menu was left open or closed.');
  b.enter();
  b.decl('width: auto;', 'auto means: let the browser choose. A nav then is only as wide as its links need.', 'The 100% you set for phones would push the nav onto its own line. auto lets it sit next to your name again.');
  b.down();
  b.enter('The cursor is pushed in.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('header', 'One more header rule, for wide screens only.');
  b.cssSplit();
  b.decl('flex-wrap: nowrap;', 'nowrap means: keep everything on one line. It undoes the wrap you set for phones.', 'On a wide screen there is room for your name and the links side by side: the top of the Z.');
  b.save();
  b.toBrowser('If your browser window is wide, the hamburger button is gone and your links are back in a row at the top right.', 8, 'The window is wide. There is no hamburger button. The name is at the top left and the five links are in a row at the top right.');
}, 'css');

const JL = JS_FINAL.split('\n');
const KEEP = 'When you type an opening quote mark or an opening parenthesis, VS Code adds the closing one. Keep typing every character you see: yours goes on top of the one VS Code added.';
codeTask({ id: 'menu-js', sec: 7, title: 'Make the button work with JavaScript.', sub: 'Type a few lines of JavaScript: when the button is clicked, open or close the menu.',
  why: 'HTML and CSS cannot react to a tap by themselves. JavaScript can: it waits for something to happen, then changes the page.',
  without: 'The button is on the page, and nothing happens when a visitor taps it.',
  how: 'The first two lines of code find the button and the nav on your page and give each one a name. The next line waits for a click on the button. Inside its braces, one line adds the class open to the nav if it is not there, and takes it away if it is: that is what toggle means. The last line tells screen readers if the menu is now open.',
  check: ['My file has two comments, six lines of code and one empty line.', 'Every line of code ends with a semicolon, except the one that ends with an opening curly brace.', 'Every opening quote mark and parenthesis has one closing partner, not two.', 'Capital letters match the code picture: querySelector, addEventListener, classList, setAttribute, isOpen.', 'I saved menu.js.'],
  hints: ['You see two closing quote marks or two closing parentheses, like <code>"")</code> or <code>))</code>? Erase the extra one, so the line matches the code picture.',
    'A word changed by itself while you typed? VS Code took a word from its list. Undo it, press <kbd>Esc</kbd> to close the list, and type the word yourself.',
    'JavaScript cares about capital letters: <code>queryselector</code> does not work, <code>querySelector</code> does.',
    'A line is a mess? Click on it, erase the whole line and type it again slowly. Compare it with the code picture, one character at a time.', UNDO],
  learn: '<b>Level up:</b> read the line with toggle out loud: for the menu, in its list of classes, toggle the class open. A lot of JavaScript reads like a sentence when you say the dots as "its".' }, b => {
  b.tab(JSFILE);
  b.push('Click one time in the big empty area under the tabs. The cursor (a thin blinking line) appears on <b>line 1</b> of menu.js.', 'Click in the big empty area. The cursor is on <b>line 1</b>.');
  b.comment('Hint: say what the next two lines look for on your page.', 'Find the hamburger button and the menu on the page');
  ed.ins(JL[0]);
  b.push(`On line ${ln()}, type ${c(JL[0])} exactly as shown. ${KEEP}<br><b>What it is:</b> a line that finds your hamburger button and gives it a name.<br><b>How it works:</b> Read it from right to left. <b>document</b> is your whole page. <b>querySelector</b> looks through the page for the first thing that matches the words in the quote marks, the same words you would use as a CSS selector. <b>const button =</b> stores what it found under the name button. const means: this name will not point to anything else later.<br><b>Why you need it:</b> JavaScript cannot change something it has not found. With a name, the lines below can say button and mean this one button.`, `Type line ${ln()}, exactly as the picture shows.`);
  b.enter('The cursor is at the left edge.');
  ed.ins(JL[1]);
  b.push(`On line ${ln()}, type ${c(JL[1])} exactly as shown. It is almost the same as the line above it.<br><b>What it is:</b> a line that finds your nav and gives it the name menu.<br><b>How it works:</b> querySelector looks for the first <b>nav</b> tag on your page. <b>const menu =</b> stores it under the name menu.<br><b>Why you need it:</b> The nav is the part that must open and close. The lines below need a name for it.`, `Type line ${ln()}, exactly as the picture shows.`);
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line, so the code is easy to read.');
  b.comment('Hint: say what happens when someone clicks the button.', 'When the button is clicked, open or close the menu');
  const lead = JL[3]; ed.ins(lead); ed.after('})');
  b.push(`On line ${ln()}, type ${c(lead)} and <b>stop</b> after the opening curly brace. Mind the capital E and L in addEventListener, and the space between ${c('function')} and ${c('()')}. VS Code adds ${c('}')} and ${c(')')} after your cursor: do <b>not</b> type them.<br><b>What it is:</b> an event listener: a line that waits for something to happen.<br><b>How it works:</b> <b>addEventListener</b> tells the button to listen. The word in quote marks, <b>click</b>, is what it listens for. <b>function () {</b> starts the list of things to do each time it happens. That list goes between the two curly braces.<br><b>Why you need it:</b> Code normally runs one time, when the page loads. Your menu must open later, each time a person clicks. A listener is how code waits.`, `Type line ${ln()} and stop after the ${c('{')}.`);
  b.cssSplit();
  const in1 = JL[4].trim(); ed.ins(in1);
  b.push(`On line ${ln()}, type ${c(in1)} exactly as shown.<br><b>What it is:</b> the line that opens or closes the menu.<br><b>How it works:</b> <b>menu.classList</b> is the list of classes on your nav. <b>toggle</b> is a switch: if the class open is not there, it adds it, and if it is there, it takes it away. toggle also answers true (added) or false (taken away), and <b>const isOpen =</b> stores that answer.<br><b>Why you need it:</b> Your CSS already says: a nav with the class open is shown, and a nav without it is hidden. So JavaScript only has to switch one class, and your CSS does the showing and hiding.`, `Type line ${ln()}, exactly as the picture shows.`);
  b.enter();
  const in2 = JL[5].trim(); ed.ins(in2);
  b.push(`On line ${ln()}, type ${c(in2)} exactly as shown.<br><b>What it is:</b> the line that tells a screen reader if the menu is open.<br><b>How it works:</b> <b>setAttribute</b> changes an attribute in your HTML while the page is running. Here it sets <b>aria-expanded</b> on the button to the answer stored in isOpen: true or false.<br><b>Why you need it:</b> A person who cannot see the menu appear still needs to know that it opened. A screen reader reads aria-expanded out loud as expanded or collapsed.`, `Type line ${ln()}, exactly as the picture shows.`);
  ed.r += 1; if (ed.L[ed.r] !== '})') throw new Error('Down Arrow did not land on })'); ed.end();
  b.push(`Press the <kbd>Down Arrow</kbd> key <b>one</b> time. The cursor moves down to line ${ln()}. It is now at the end of the line, just after ${c('})')}.`, `Press <b>Down Arrow</b> one time. The cursor is at the end of line ${ln()}.`);
  ed.ins(';');
  b.push(`Type one semicolon: ${c(';')} Line ${ln()} now says ${c('});')} The semicolon ends the instruction that started with ${c('button.addEventListener')}.`, `Type one semicolon: ${c(';')}`);
  b.save();
}, 'js');

task({ id: 'test-menu', sec: 7, title: 'Test your hamburger button.', sub: 'Open and close your menu with the mouse and with the keyboard, at phone size and at wide size.',
  why: 'A menu that does not open locks visitors out of your page. Test it every way a visitor might use it.',
  without: 'You find out the menu is broken when someone on a phone tells you, or never.',
  how: 'You test with a narrow window for the phone, with the keyboard for people who do not use a mouse, and with a wide window to check that the Z-pattern is still there.',
  steps: [
    [os => `Look at the ${o(os, 'taskbar', 'Dock')} at the bottom of your screen. Click the icon of your <b>web browser</b>. The browser window with your About page comes to the front.`,
     os => pic(o(os, 'The Windows desktop. On the taskbar at the bottom, the web browser icon is outlined.', 'The Mac desktop. In the Dock at the bottom, the web browser icon is outlined.'), desk(os, '', { hitDock: 'web' })), 'Click the icon of your <b>web browser</b>.'],
    ['Look at your page. Live Server loaded it again when you saved, so it already has your new JavaScript. The address at the top still starts with <b>127.0.0.1:5500</b>.',
     os => mockPic(os, 11, 'The address at the top starts with 127.0.0.1:5500. The page has its colors, its pictures and its six parts.'), 'Look at your page. Live Server loaded it again.'],
    ['Drag the <b>right edge</b> of the browser window to the <b>left</b> until the window is as narrow as it will go. Your links are hidden, and the <b>hamburger button</b> is at the top right.',
     PHONE(8, 'The window is narrow, like a phone. The name is at the top left and a gold hamburger button is at the top right. No links show.'), 'Make the window narrow. You see the <b>hamburger button</b>.'],
    ['Click the <b>hamburger button</b> one time. Your five links appear under your name, lined up on the right.',
     PHONE(8, 'The window is narrow, like a phone. The hamburger button is outlined. Under the name and the button, five links show, one on each line, lined up on the right.', true), 'Click the hamburger button. Your five links appear.'],
    ['Click the <b>hamburger button</b> one more time. The links are hidden again.',
     PHONE(8, 'The window is narrow, like a phone. The hamburger button is outlined. No links show: the menu is closed again.', false), 'Click the hamburger button again. The links are hidden.'],
    ['Take your hand off the mouse. Press the <kbd>Tab</kbd> key until a box, the focus ring, is around the <b>hamburger button</b>.',
     keys(['Tab'], 'Press it until a box is around the hamburger button.'), 'Press <b>Tab</b> until a box is around the <b>hamburger button</b>.'],
    [os => `Press <kbd>${enterKey(os)}</kbd>. The menu opens from the keyboard.`,
     PHONE(8, 'The window is narrow, like a phone. The hamburger button is outlined. The five links show under it: the menu was opened with the keyboard.', true), os => `Press <b>${enterKey(os)}</b>. The menu opens.`],
    ['Press the <kbd>Tab</kbd> key one more time. The box moves from the button to your <b>first link</b>. The open menu can be used with no mouse.',
     cards([['Tab', 'hamburger button'], ['Tab again', 'Home'], ['Tab again', 'About']]), 'Press <b>Tab</b>. The box moves to your first link.'],
    ['Drag the right edge of the window back to the <b>right</b> until it is wide. The hamburger button is gone, your links are in a row at the top right, and your page makes its Z again.',
     os => mockPic(os, 8, 'The window is wide. There is no hamburger button. The page makes a Z: the name at the top left, the links in a row at the top right, Made by Alex Rivera at the bottom left and Back to top at the bottom right.'), 'Make the window wide. No button, and the Z is back.']
  ],
  check: ['In a narrow window, I see the hamburger button and no links.', 'One click on the hamburger button shows my links. One more click hides them.', 'I can open the menu with the Tab key and Enter or Return, with no mouse.', 'In a wide window, there is no hamburger button and my links are always in a row.', 'My page still makes a Z on a wide screen.'],
  hints: ['The button does nothing? In the browser, right-click the page, click <b>Inspect</b>, then click <b>Console</b>. A line of red text names the problem and the line number in menu.js.',
    'Red text says <b>null</b>? JavaScript could not find your button or your nav. Check that the script line in about.html is at the bottom, under <code>&lt;/footer&gt;</code>.',
    'Red text says a file was <b>not found</b>? Check the names: the folder is <b>js</b>, the file is <b>menu.js</b>, and about.html says <code>src="js/menu.js"</code>.',
    'Still nothing? Check that the word between the quote marks after toggle in menu.js is <b>open</b>, the same word as in <code>nav.open</code> in your CSS.',
    os => `You changed a file and nothing changed? Save all three files. Live Server loads the page again each time you save. Still nothing? Click the browser and press <kbd>${mod(os)}</kbd>+<kbd>R</kbd>.`],
  learn: '<b>Level up:</b> change the word on the button when the menu opens. Under the line with setAttribute in menu.js, add this line: <code>button.setAttribute("aria-label", isOpen ? "Close menu" : "Menu");</code> It means: if the menu is open, name the button Close menu. If not, name it Menu.' });

/* ===== 8. Add pictures in a zigzag ===== */
const R4 = ratio('#f5c84c', '#0b1026');
if (R4 < 4.5) throw new Error('the label color does not reach 4.5 : 1');
const PICS = [
  { pic: 'me.jpg', base: 'me', orig: 'IMG_2041', alt: 'Alex Rivera smiling in front of a blue wall', art: ME, part: 'Hook', row: 'Hook, your profile intro' },
  { pic: 'trail.jpg', base: 'trail', orig: 'IMG_2042', alt: 'A dirt trail through green mountains on a sunny day', art: TRAIL, part: 'Journey', row: 'Journey, your timeline' },
  { pic: 'laptop.jpg', base: 'laptop', orig: 'IMG_2043', alt: 'An open laptop on a desk next to a notebook', art: LAPTOP, part: 'Skills', row: 'Skills, your skill tags' }];
const NTH = ['first', 'second', 'third'];
const IMGDIR = { name: 'images', dir: true }, TREE7 = [CSSDIR, STYLE, JSDIR, MENUJS, ABOUT];
const ZIG = `<svg viewBox="0 0 280 190" width="280" height="190" aria-hidden="true" style="max-width:100%;height:auto"><rect x="2" y="2" width="276" height="186" rx="6" fill="#ffffff" stroke="#6b7587" stroke-width="2"/>${[0, 1, 2].map(k => { const y = 14 + k * 58, left = k % 2 === 0; return `<rect x="${left ? 16 : 150}" y="${y}" width="114" height="46" rx="10" fill="#cfe6f5" stroke="#6b7587"/><rect x="${left ? 150 : 16}" y="${y + 6}" width="50" height="6" fill="#b08a1e"/><rect x="${left ? 150 : 16}" y="${y + 18}" width="100" height="9" fill="#1f2933"/><rect x="${left ? 150 : 16}" y="${y + 33}" width="86" height="5" fill="#6b7587"/>`; }).join('')}<path d="M73 37 H207 L73 95 H207 L73 153 H207" fill="none" stroke="#6a3a96" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 9"/></svg>`;
const LAB = '<a href="https://drjulsgilliam.github.io/HTML-CSS-Visual-Playground/profile-picture-lab.html" target="_blank" rel="noopener">Profile Picture Lab (opens in a new tab)</a>';
task({ id: 'pick-picture', sec: 2, title: 'Choose three pictures.', sub: 'See the layout you will build, and choose a picture for your Hook, your Journey and your Skills.',
  why: 'A picture next to a part makes a page feel like a person made it. When the pictures switch sides from one row to the next, the eye moves down the page in a zigzag: the Z-pattern again, all the way down.',
  without: 'Your page is all text, and nothing on it catches the eye.',
  how: 'Three of your six parts become rows: the Hook, the Journey and the Skills. Each row has a picture on one side and words on the other, and the sides switch. The Story, the Trust and the Action stay one column, between the rows. Words that describe a picture are called alt text. A screen reader reads them out loud to a person who cannot see the picture.',
  steps: [
    ['Look at the picture. Each row has a <b>picture</b> on one side and <b>words</b> on the other. In the next row, they switch sides. Follow the dotted line: it goes from side to side, in a <b>zigzag</b>.',
     pic('A drawing of a page with three rows. Row 1: a picture on one side and words on the other. Row 2: the sides are switched. Row 3: the sides are switched back. A dotted line joins them in a zigzag.', `<div class="sc-board">${ZIG}</div>`), 'Each row has a picture on one side and words on the other. The sides switch.'],
    ['Choose <b>three</b> pictures that are <b>yours</b>: pictures you took or made. One is a <b>photo of you</b> for the Hook: your profile picture. The other two go with your Journey and your Skills. Do not use pictures from the web. Alex chooses a photo of themselves, a mountain trail and a laptop on a desk. Not sure what makes a good profile picture? Open the ' + LAB + ' first. It shows what to do and what to avoid: face the camera, use soft light, a plain background, head and shoulders, and a real smile.',
     pic('The three example pictures: a photo of Alex for the Hook, a trail through green mountains for the Journey, and a laptop on a desk for the Skills.', `<div class="sc-board">${PICS.map(p => `<div class="sc-card">${p.art(84)}<span>${esc(p.part)}</span></div>`).join('')}</div>`), 'Choose <b>three</b> pictures that are yours.'],
    ['Look at each picture one more time before you use it. Make sure it shows <b>nothing private</b>: no home address, no car license plate, no ID card, and no other person who did not say yes.',
     gb(['Fine to share', 'you, a pet, a place you like, something you made'], ['Keep private', 'your address, a license plate, an ID card, other people who did not say yes']), 'Check that each picture shows <b>nothing private</b>.'],
    ['Check the <b>ending</b> of each file name. It must be <b>.jpg</b> or <b>.png</b>. These two kinds of picture work in every web browser.',
     cards([['.jpg', 'photos'], ['.png', 'drawings and screenshots'], ['.heic', 'does not work on web pages']]), 'Each ending must be <b>.jpg</b> or <b>.png</b>.'],
    ['On paper or in a note, write a few words for <b>each</b> picture that say what a person sees in it. Do not start with "picture of". For the photo of themselves, Alex writes <b>' + PICS[0].alt + '</b>.',
     ticks(PICS.map(p => p.alt)), 'Write a few words that describe <b>each</b> picture.']
  ],
  check: ['I chose three pictures that I took or made. One is a photo of me.', 'My photo of me shows my face clearly: good light, a plain background, head and shoulders.', 'They show nothing private.', 'Each name ends in .jpg or .png.', 'I wrote words that describe each picture.'],
  hints: ['Your photo of you is dark, blurry, or cut out of a group photo? Take a new one. The ' + LAB + ' shows how, with a phone and a window for light.', 'Do not want your face on a web page? Use a drawing of you, or something you made. It still says something about you. For a page you will show to employers, a real photo works best.', 'You have only one or two pictures? Take a new one with your phone now: your desk, your shoes, your coffee cup. Simple pictures work well.', 'A picture ends in <b>.heic</b>? That is how an iPhone saves photos. Choose another picture, or send the photo to yourself by email: it often arrives as a .jpg.'],
  learn: '<b>Level up:</b> pictures that are wider than they are tall, like a TV screen, fit this layout best. If you can, choose three pictures with the same shape.' });

task({ id: 'find-pictures', sec: 8, title: 'Find your pictures in VS Code.', sub: 'Look in your images folder in VS Code, and read the full name of each picture.',
  why: 'A web page does not hold a picture. It points to a picture file by its name. One wrong letter in the name, and the page cannot find the picture.',
  without: 'You type a name from memory, it is a little different from the real one, and your page shows a broken-picture icon.',
  how: 'You put your three pictures in images at the start. VS Code shows everything that is in your web site folder, so the pictures are already in the Explorer.',
  steps: [
    [os => `Look at the ${o(os, 'taskbar', 'Dock')} at the bottom of your screen. Click the <b>Visual Studio Code</b> icon. VS Code comes to the front.`,
     os => pic(o(os, 'The Windows desktop. On the taskbar at the bottom, the VS Code icon is outlined.', 'The Mac desktop. In the Dock at the bottom, the VS Code icon is outlined.'), desk(os, '', { hitDock: 'code' })), 'Click the <b>Visual Studio Code</b> icon.'],
    [`In the Explorer on the left side of VS Code, click <b>images</b> one time. The folder opens, and your three pictures are listed under it, pushed in a little. Read each <b>full name</b>, with its ending. Alex's pictures are <b>${PICS.map(p => p.pic).join('</b>, <b>')}</b>. You will type these exact names in the next tasks.`,
     os => pic(`The VS Code Explorer. The images folder is open, and three pictures are listed under it, indented: ${PICS.map(p => p.pic).sort().join(', ')}. They are outlined.`, vs(os, { title: FOLDER, panel: explorer([CSSDIR, STYLE, Object.assign({ open: true }, IMGDIR)].concat(PICS.map(p => ({ name: p.pic, indent: 1, hit: true })).sort((a, b2) => a.name < b2.name ? -1 : 1), [JSDIR, MENUJS, ABOUT])), tabs: TABS('') })), 'In VS Code, click <b>images</b>. Read the full names of your pictures.']
  ],
  check: ['I can see all three pictures under images in the VS Code Explorer.', 'I know the full name of each one, with its ending (.jpg or .png).'],
  hints: ['A picture is not listed in VS Code? Move your mouse pointer over your folder name in the Explorer and click <b>Refresh</b>: the round arrow, the third small button.',
    'A picture is missing from images? Go back to Part 2 and do the task that puts that picture in your images folder.',
    'The ending is in capital letters, like <b>.JPG</b>? That works. Type it the very same way in your code: capital letters count on the web.'],
  learn: '<b>Level up:</b> in the Explorer, right-click <b>images</b>. On Windows, click <b>Reveal in File Explorer</b>. On a Mac, click <b>Reveal in Finder</b>. You see the folder you made: the Explorer in VS Code and the window on your computer are two views of one place.' });

const INFOLDER = os => [{ name: 'css' }, { name: 'images', hit: true }, { name: 'js' }];
const copyTask = (P, k, extra) => { const nth = extra ? 'profile' : NTH[k], O = P.orig + '.jpg', before = (extra ? PICS : PICS.slice(0, k)).map(q => ({ name: q.pic, kind: 'photo', art: q.art }));
  task(Object.assign({}, extra || {}, { id: extra ? 'copy-profile' : 'copy-picture-' + (k + 1), sec: extra ? 9 : 2, title: `Put your ${nth} picture in your images folder.`, sub: `Copy your ${nth} picture into images, and give the copy a short, web-safe name.`,
    why: k === 0 ? 'The picture file must be inside images, with a lowercase name and no spaces, or your page cannot find it.' : 'Each picture needs its own copy inside images, with its own short name.',
    without: 'The page looks for the picture, does not find it, and shows a small broken-picture icon.',
    how: k === 0 ? 'You copy the file, paste the copy into images, and give the copy a short name. Your first picture stays where it was.' : 'These are the same moves as for your first picture. Only the picture and its new name change.',
    steps: [
      [os => o(os, 'Look at the taskbar at the bottom of your screen. Click <b>File Explorer</b>: the yellow folder. A window comes to the front.', 'Look at the Dock at the bottom of your screen. Click <b>Finder</b>: the blue and white face at the left end. A window comes to the front.'),
       os => pic(o(os, 'The Windows desktop. On the taskbar at the bottom, the yellow folder, File Explorer, is outlined.', 'The Mac desktop. In the Dock at the bottom, the blue and white face at the left end, Finder, is outlined.'), desk(os, '', { hitDock: 'finder' })), os => `Click <b>${fm(os)}</b>.`],
      [os => `On the left side of the ${fm(os)} window, click the folder that holds your ${nth} picture. Many pictures are in <b>Pictures</b> or in <b>Downloads</b>. Alex clicks <b>Pictures</b>.`,
       os => pic(`A ${fm(os)} window. In the list on the left side, Pictures is outlined. The right side shows a picture file named ${O}.`, files(os, { on: 'Pictures', hitSide: 'Pictures', items: [{ name: O, kind: 'photo', art: P.art }] })), 'On the left side, click the folder that holds your picture.'],
      [`Click your ${nth} picture <b>one</b> time. It is highlighted. Do not double-click it.`,
       os => pic(`A ${fm(os)} window showing the Pictures folder. The picture file ${O} is outlined.`, files(os, { on: 'Pictures', items: [{ name: O, kind: 'photo', art: P.art, hit: true }] })), 'Click your picture <b>one</b> time.'],
      [os => `Press <kbd>${mod(os)}</kbd>+<kbd>C</kbd> (hold ${mod(os)} and press the C key). This copies the picture. Nothing changes on the screen: that is correct.`,
       os => keys([mod(os), 'C'], 'This copies the picture.'), os => `Press <b>${mod(os)}+C</b> to copy the picture.`],
      [os => `On the left side of the ${fm(os)} window, click <b>Desktop</b>. The window shows what is on your Desktop.`,
       os => pic(`A ${fm(os)} window. In the list on the left side, Desktop is outlined. The right side shows the folder ${FOLDER}.`, files(os, { on: 'Desktop', hitSide: 'Desktop', items: [{ name: FOLDER }] })), 'On the left side, click <b>Desktop</b>.'],
      [`Double-click your web site folder. Alex double-clicks <b>${FOLDER}</b>. The folder opens.`,
       os => pic(`A ${fm(os)} window showing the Desktop. The folder ${FOLDER} is outlined.`, files(os, { on: 'Desktop', items: [{ name: FOLDER, hit: true }] })), 'Double-click your web site folder.'],
      [`Double-click <b>images</b>. The folder opens. ${k === 0 ? 'It is empty.' : 'It holds the ' + (k === 1 && !extra ? 'picture' : 'pictures') + ' you already put there.'}`,
       os => pic(`A ${fm(os)} window showing what is inside ${FOLDER}: three folders, css, images and js. The images folder is outlined.`, files(os, { on: 'Desktop', title: FOLDER, items: INFOLDER(os) })), 'Double-click <b>images</b>.'],
      [os => `Press <kbd>${mod(os)}</kbd>+<kbd>V</kbd> (hold ${mod(os)} and press the V key). This pastes the copy. Your ${nth} picture appears in <b>images</b>.`,
       os => pic(`A ${fm(os)} window showing the images folder. The picture ${O} is now in it. It is outlined.`, files(os, { on: 'Desktop', title: 'images', items: before.concat([{ name: O, kind: 'photo', art: P.art, hit: true }]) })), os => `Press <b>${mod(os)}+V</b> to paste. Your picture appears in <b>images</b>.`],
      ['In the <b>images</b> window, click the picture you just pasted <b>one</b> time. It is highlighted.',
       os => pic(`A ${fm(os)} window showing the images folder. The pasted picture ${O} is outlined.`, files(os, { on: 'Desktop', title: 'images', items: before.concat([{ name: O, kind: 'photo', art: P.art, hit: true }]) })), 'Click the pasted picture <b>one</b> time.'],
      [os => `Press <kbd>${o(os, 'F2', 'Return')}</kbd>. The name of the picture opens for typing, with the old name highlighted.${o(os, ' On a small laptop, hold <kbd>Fn</kbd> and press <kbd>F2</kbd>.', '')}`,
       os => pic(`The ${o(os, 'F2', 'Return')} key. Next to it, the picture in the images folder: its name is now a box you can type in.`, `<div class="sc-board"><span class="sc-key">${o(os, 'F2', 'Return')}</span>${item(os, { name: P.orig, kind: 'photo', art: P.art, edit: true })}</div>`), os => `Press <b>${o(os, 'F2', 'Return')}</b>. The name opens for typing.`],
      [`Type a short new name: one word, in <b>lowercase</b>, with <b>no spaces</b>. Do <b>not</b> type a dot or an ending: the ending (.jpg or .png) stays by itself. Alex types <b>${P.base}</b>.`,
       os => pic(`The picture in the images folder. Its name box now says ${P.base}, in lowercase with no spaces. The box is outlined.`, `<div class="sc-board">${item(os, { name: P.base, kind: 'photo', art: P.art, edit: true, hit: true })}<span class="sc-pad">lowercase, no spaces, no dot</span></div>`), `Type a short name in lowercase. Alex types <b>${P.base}</b>.`],
      [os => `Press <kbd>${enterKey(os)}</kbd>. The new name is saved.${k < 2 ? '' : ' All three pictures are now in <b>images</b>.'}`,
       os => pic(`A ${fm(os)} window showing the images folder. The picture is now named ${P.pic}. It is outlined.`, files(os, { on: 'Desktop', title: 'images', items: before.concat([{ name: P.pic, kind: 'photo', art: P.art, hit: true }]) })), os => `Press <b>${enterKey(os)}</b>. The new name is saved.`]
    ],
    check: [`My ${nth} picture is inside my images folder.`, 'Its name is all lowercase, with no spaces.', 'I know its full name, with its ending (.jpg or .png).'],
    hints: [os => `The picture went to the wrong place? In the ${fm(os)} window, drag it onto <b>images</b> and let go.`,
      'The ending is in capital letters, like <b>.JPG</b>? That works. Type it the very same way in your code: capital letters count on the web.',
      'Windows and Mac windows change from version to version. Yours may look a little different from the drawings.'],
    learn: k === 0 ? '<b>Level up:</b> good picture names say what is in the picture, like <b>trail.jpg</b> or <b>my-dog.jpg</b>. Use a hyphen ( - ) between two words.' : k === 1 ? '<b>Level up:</b> you can also drag a picture from one window and drop it on the images folder in another. Copy and paste is safer: nothing gets moved by mistake.' : '<b>Level up:</b> very large photos make a page slow. If a picture is more than 1 MB, send it to yourself by email at a smaller size, and use that copy.' }));
};
PICS.forEach((P, k) => copyTask(P, k));
TREE = [CSSDIR, STYLE, Object.assign({ open: true }, IMGDIR)].concat(PICS.map(p => ({ name: p.pic, indent: 1 })).sort((a, b2) => a.name < b2.name ? -1 : 1), [JSDIR, MENUJS, ABOUT]);

PICS.forEach((P, k) => { const nth = NTH[k];
  codeTask({ id: 'img-' + (k + 1), sec: 8, title: `Add your ${nth} picture to your page.`, sub: `Type one line of code that puts your ${nth} picture in your ${P.row}, with words that describe it.`,
    why: k === 0 ? 'img shows a picture. src says where the picture file is. alt describes the picture in words, for people who cannot see it.' : 'Each section gets its own picture, so each row of your zigzag has a picture and words.',
    without: 'With no src, the page has no picture to show. With no alt, a person who uses a screen reader cannot know what the picture is.',
    how: 'The img line goes inside the section, after the div that holds the words. So each section holds two things: the words and the picture. Later, your CSS puts those two things side by side.' + (k === 2 ? ' The pictures may look very big in the browser at first: your CSS will fix that in the next task.' : ''),
    check: [`My ${nth} img line is between <code>&lt;/div&gt;</code> and the ${k === 2 ? 'last' : nth} <code>&lt;/section&gt;</code>.`, 'The words after <code>src=</code> are <code>images/</code> and then the exact name of my picture.', 'My alt words say what is in the picture. They are not a file name.', 'My tag ends with <code>&gt;</code>. There is no ending tag for img.', 'I saved about.html.'].concat(k === 2 ? ['In the browser, I see my three pictures.'] : []),
    hints: ['You see a small broken-picture icon and your alt words? The name in <code>src</code> does not match the file. Compare it, letter by letter, with the name under <b>images</b> in the Explorer: capital letters, hyphens and the ending must all match.',
      'Still broken? In the Explorer, check that your picture is pushed in under <b>images</b>. It must not be next to about.html.', QUOTES, UNDO].concat(k === 2 ? [NOBROWSER] : []),
    learn: k === 0 ? '<b>Level up:</b> alt text is for people, not for search engines. Say what matters in the picture, in a few words, the way you would tell a friend on the phone. This picture is your profile picture, the first thing people look at: check it against the ' + LAB + '.' : k === 1 ? '<b>Level up:</b> a picture that is only decoration can have empty alt text: <code>alt=""</code>. Then a screen reader skips it. Your three pictures say something about you, so they get words.' : '<b>Level up:</b> see what alt text does. Change one letter of a file name in <code>src</code> and save. The browser shows your alt words where the picture was. Then fix the letter and save again.' }, b => {
    if (k === 0) b.tab(FILE);
    const ends = htmlEd.L.map((l, n) => l.trim() === '</section>' ? n : -1).filter(n => n >= 0);
    if (htmlEd.L[ends[k] - 1].trim() !== '</div>') throw new Error('the line above </section> is not </div>');
    b.clickEnd('', { row: ends[k] - 1, find: `the <b>${k === 2 ? 'last' : nth}</b> line that says ${c('</section>')}. Then look at the line <b>just above</b> it. It says ${c('</div>')}` });
    b.enter();
    b.attr('<img src=', 'a less-than sign, the letters <b>img</b>, a space, the letters <b>src</b> and an equals sign', k === 0 ? 'img means image. src means source: where the picture file is.' : '');
    b.value('images/' + P.pic, `Type the folder name <b>images</b>, a forward slash ( <b>/</b> ), and then the <b>full name of your ${nth} picture</b>, exactly as the Explorer shows it. Alex types <b>images/${P.pic}</b>.`, `Type <b>images/</b> and the full name of your ${nth} picture.`);
    b.right();
    b.space();
    b.attr('alt=', 'the letters <b>alt</b> and an equals sign', k === 0 ? 'It is the same as before.' : '');
    b.value(P.alt, `Type the words you wrote that describe this picture. Alex types <b>${P.alt}</b>.${k === 0 ? ' These words are the alt text.' : ''}`, 'Type the words that describe this picture.');
    b.right();
    b.close();
    b.save();
    if (k === 2) b.toBrowser('Your three pictures show, one under each part. They may be very big: that is fine for now.', 9, 'There are now three large pictures: a photo under the Hook, a trail under the Journey and a laptop under the Skills.');
  }, 'html');
});

codeTask({ id: 'css-pictures', sec: 8, title: 'Style your pictures and your labels.', sub: 'Make your pictures fit every screen, with round corners and a soft shadow, and make your labels small and colored.',
  why: 'Round corners and a soft shadow make a picture look like a card lifted off the page. A small colored label above each heading tells the eye where a new part starts.',
  without: 'A big photo is wider than a phone screen, so the page scrolls sideways. And your labels look like any other paragraph.',
  how: 'width: 100% lets a picture shrink with the screen, and max-width stops it from growing past 480 pixels. height: auto keeps its shape. A selector that starts with a dot, like .label, means: every tag with that class. Measured: the gold labels on the dark page are ' + R4 + ' : 1.',
  check: ['I have four new rules above my media query. They start with <code>img {</code>, <code>section {</code>, <code>.label {</code> and <code>h2 {</code>.', 'In the browser, my pictures have round corners and a soft shadow.', 'My four labels are small, gold and in capital letters.', 'In a narrow window, my pictures get smaller, and I never have to scroll sideways.', 'I saved style.css.'],
  hints: ['A picture is squashed or stretched? Check <code>height: auto;</code> in your img rule.', 'The shadow does not show? <code>box-shadow</code> needs every space and comma: <code>0 8px 24px rgba(0, 0, 0, 0.45)</code>. You see two closing parentheses? Erase one.', 'Your labels did not change? The selector needs the dot: <code>.label</code>. Check that your three label lines in about.html say <code>class="label"</code>.', NOCHANGE, CSSPUNC, CSSLIST, TWOBRACE, UNDO],
  learn: '<b>Level up:</b> you typed the label words in normal letters, and CSS shows them in capitals. A screen reader still reads them as words, not letter by letter. That is why <code>text-transform</code> is better than typing in capitals.' }, b => {
  b.toCode();
  b.tab(CSSFILE);
  b.clickEnd('', { row: aboveMedia(), find: 'the line that starts with ' + c('@media') + '. Then go <b>up</b> from it to the first line that says ' + c('}') + '. That line ends your ' + c('.logo') + ' rule' });
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.comment('Hint: say how your pictures will look.', 'Pictures: fit the screen, round corners, a shadow');
  b.cssOpen('img', 'This rule styles every picture on your page.');
  b.cssSplit();
  b.decl('display: block;', 'block makes the picture a box on its own line. By default a picture sits in a line of text, like a big letter.', 'A picture treated like a letter gets a small gap under it, and it is harder to place.');
  b.enter();
  b.decl('width: 100%;', '100% means: as wide as the box the picture is in, never its own full size.', 'A photo from a phone is thousands of pixels wide. Without this line it sticks out of the screen, and the page scrolls sideways.');
  b.enter();
  b.decl('max-width: 480px;', 'max-width is a limit. width says 100%, and this adds: but never more than 480 pixels.', 'On a wide screen a full-width photo would fill everything and push your words far down.');
  b.enter();
  b.decl('height: auto;', 'auto means: work out the height from the width, keeping the shape of the picture.', 'When only the width changes, a picture gets squashed or stretched. auto keeps faces looking like faces.');
  b.enter();
  b.decl('border-radius: 6px;', 'The number is how far the curve reaches into each corner. 6 pixels is a small, crisp curve.', 'Slightly round corners look neat and match your button. Sharp corners look hard on a dark page.');
  b.enter();
  b.decl('box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);', 'Four parts: how far the shadow moves sideways (0), how far it moves down (8 pixels), how blurry it is (24 pixels), and its color. rgba(0, 0, 0, 0.45) is black that is partly see-through: the last number, 0.45, is how solid it is. When you type the opening parenthesis, VS Code adds the closing one: keep typing, and yours goes on top of it.', 'A shadow makes a picture look lifted off the page. On a dark page a shadow must be strong, or nobody sees it.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('section', 'This rule styles your three rows: the Hook, the Journey and the Skills.');
  b.cssSplit();
  b.decl('margin-bottom: 96px;', 'margin-bottom is margin on one side only: under the part. 96 pixels is a very wide band of empty space.', 'Empty space is how the eye knows where one part stops and the next starts.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('.label', 'Type a dot and the word label, with no space between them. The dot means class: this rule styles every tag that says class="label".');
  b.cssSplit();
  b.decl('margin: 0;', '0 takes away the space a browser puts above and below every paragraph.', 'The label belongs to the heading under it. Things that belong together sit close together.');
  b.enter();
  b.decl('font-size: 15px;', '15 pixels is a little smaller than your 18 pixel words.', 'The label is a small signpost. The heading under it should be the thing the eye reads first.');
  b.enter();
  b.decl('font-weight: bold;', 'bold makes every letter thicker.', 'Small letters are easy to miss. Thick ones are still easy to read at a small size.');
  b.enter();
  b.decl('letter-spacing: 2px;', '2px adds 2 pixels of space after every letter.', 'Capital letters set close together are hard to read. A little air between them fixes that.');
  b.enter();
  b.decl('text-transform: uppercase;', 'uppercase shows the letters as capitals. Your HTML does not change: it still says About me.', 'You get the look of a label, and a screen reader still reads normal words, not one letter at a time.');
  b.enter();
  b.decl('color: #f5c84c;', 'f5c84c is your gold: the same color as your links and your button.', 'This is your accent color: one color, used only for small things, that leads the eye to the start of each part.');
  b.down();
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('h2', 'This rule styles your three headings.');
  b.cssSplit();
  b.decl('margin-top: 8px;', 'margin-top is margin on one side only: above the heading. 8 pixels is a small gap.', 'Browsers put a big gap above a heading. A small one keeps the label and its heading together as one group.');
  b.save();
  b.toBrowser('Your pictures are smaller, with round corners and a soft shadow, and your labels are small, gold and in capital letters.', 10, 'The labels are small, gold and in capital letters. The three pictures have round corners and a soft shadow, and each one sits under the words of its part.');
}, 'css');

codeTask({ id: 'css-zigzag', sec: 8, title: 'Make the zigzag on wide screens.', sub: 'Put each picture next to its words, and switch the sides from one row to the next.',
  why: 'Side by side, a picture and its words read as one thing. Switching sides keeps the eye moving down the page.',
  without: 'On a wide screen your page is one narrow column with a lot of empty space next to it.',
  how: 'flex puts the two things in a section next to each other: the words and the picture. row-reverse turns a row around, so the picture comes first. nth-of-type(even) picks every even section, counting only sections: the second one, your Journey. So your Hook has the words on the left and the photo on the right, your Journey is turned around, and your Skills has the words on the left again. On a phone none of this applies: the picture stays under its words.',
  check: ['Inside my media query there are four new rules. They start with <code>section {</code>, <code>section:nth-of-type(even) {</code>, <code>section div {</code> and <code>section img {</code>.', 'The last two lines of my file are closing braces: one pushed in, one at the left edge.', 'On a wide window, each picture is next to its words, and the pictures switch sides: right, left, right.', 'On a narrow window, each picture is under its words, and the hamburger button is back.', 'I saved style.css.'],
  hints: ['All pictures are on the same side? Check the rule <code>section:nth-of-type(even)</code>: a colon after section, the hyphens in nth-of-type, and the word even in parentheses.', 'You see two closing parentheses, like <code>(even))</code>? Erase one.', 'The pictures are still under the words on a wide window? The new rules must be <b>inside</b> the media query: above the last closing brace of the file, and pushed in.', NOCHANGE, CSSPUNC, CSSLIST, TWOBRACE, UNDO],
  learn: '<b>Level up:</b> change <code>even</code> to <code>odd</code>, save and look. Now the first and third rows are turned around, and the zigzag starts on the other side. Keep the one you like best.' }, b => {
  b.toCode();
  b.clickEnd('', { row: -2, find: 'the line just <b>above the last line</b> of the file. It says ' + c('}') + ' and it is pushed in' });
  b.enter('The cursor is pushed in, under the brace above it.');
  b.enter('This leaves one empty line between the two rules.');
  b.comment('Hint: say how the pictures and the words are placed.', 'The zigzag: picture next to words, sides switch from row to row');
  b.cssOpen('section', 'Inside the media query, this rule is for wide screens only.');
  b.cssSplit();
  b.decl('display: flex;', 'flex makes each section a flex box. The two things directly inside it (the div with your words, and the picture) line up side by side. The first one in your HTML goes on the left.', 'On a wide screen there is room for words and a picture next to each other. Stacked, they leave half the screen empty.');
  b.enter();
  b.decl('align-items: center;', 'center lines up the middle of the words with the middle of the picture, from top to bottom.', 'The words and the picture are never the same height. Without this line, the short one hangs at the top.');
  b.enter();
  b.decl('gap: 48px;', 'gap puts 48 pixels between the two things in the row, and nothing on the outside edges.', 'Words that touch a picture are hard to read.');
  b.down();
  b.enter('The cursor is pushed in.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('section:nth-of-type(even)', 'Type section, a colon, nth-of-type, and the word even in parentheses, with no spaces. It means: the second section, the fourth section, and every other even one. On your page that is the Journey. When you type the opening parenthesis, VS Code adds the closing one: keep typing.');
  b.cssSplit();
  b.decl('flex-direction: row-reverse;', 'A flex box lines things up in a row, from left to right, in the order of your HTML. That is the value row, and you get it without typing it. row-reverse keeps the row and turns the order around: the last thing comes first. So the picture goes to the left and the words go to the right.', 'This is what makes the zigzag. Your HTML stays the same in every row (words, then picture), so a phone and a screen reader always get the words first. Only the look changes.');
  b.down();
  b.enter('The cursor is pushed in.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('section div', 'This selector means: the div inside a section. That is the box with your words.');
  b.cssSplit();
  b.decl('flex: 1;', 'flex is three settings in one: how much a box may grow, how much it may shrink, and its starting size. The single number 1 means: grow to fill all the space that is left over, and shrink when there is not enough.', 'The picture takes its share of the row, and the words fill the rest. Without this line, the box of words is only as wide as its longest line, and the row looks lopsided.');
  b.down();
  b.enter('The cursor is pushed in.');
  b.enter('This leaves one empty line between the two rules.');
  b.cssOpen('section img', 'This selector means: a picture inside a section.');
  b.cssSplit();
  b.decl('width: 45%;', '45% is measured against the row: a little less than half of it. Your max-width of 480 pixels still applies.', 'A little less than half leaves more room for the words, which are the part people read.');
  b.save();
  b.toBrowser('If your browser window is wide, each picture is now next to its words, and the pictures switch sides: right, left, right.', 11, 'The window is wide. The rows make a zigzag. The Hook has words on the left and the photo on the right. The Journey has the trail picture on the left and words on the right. The Skills has words on the left and the laptop picture on the right. The Story, the quotes and the call to action are one column each, between the rows.');
  b.push('Drag the <b>right edge</b> of the browser window to the <b>left</b> until the window is as narrow as it will go. Each picture moves under its words, in one column, and your <b>hamburger button</b> comes back. This is your finished phone layout.', 'Make the window narrow. Each picture moves under its words.',
    os => mockPic(os, 11, 'The window is narrow, like a phone. The name is at the top left and the hamburger button at the top right. Under the header, everything is in one column: the six parts one under the other, with a picture under the Hook, the Journey and the Skills.', true));
}, 'css');
if (process.env.DUMP_HTML) fs.writeFileSync(process.env.DUMP_HTML, noComments(htmlEd.text()));
if (noComments(htmlEd.text()) !== HTML_FINAL) { const A = noComments(htmlEd.text()).split('\n'), B = HTML_FINAL.split('\n'); let k = 0; while (A[k] === B[k]) k++; throw new Error('the HTML steps did not make HTML_FINAL. First different line ' + (k + 1) + ':\n  steps: ' + A[k] + '\n  FINAL: ' + B[k]); }
if (process.env.DUMP_CSS) fs.writeFileSync(process.env.DUMP_CSS, noComments(cssEd.text()));
if (noComments(cssEd.text()) !== CSS_FINAL) { const A = noComments(cssEd.text()).split('\n'), B = CSS_FINAL.split('\n'); let k = 0; while (A[k] === B[k]) k++; throw new Error('the CSS steps did not make CSS_FINAL. First different line ' + (k + 1) + ':\n  steps: ' + JSON.stringify(A[k]) + '\n  FINAL: ' + JSON.stringify(B[k])); }
if (noComments(jsEd.text()) !== JS_FINAL) { const A = noComments(jsEd.text()).split('\n'), B = JS_FINAL.split('\n'); let k = 0; while (A[k] === B[k]) k++; throw new Error('the JavaScript steps did not make JS_FINAL. First different line ' + (k + 1) + ':\n  steps: ' + JSON.stringify(A[k]) + '\n  FINAL: ' + JSON.stringify(B[k])); }
const HTML8 = htmlEd.text(), CSS8 = cssEd.text();   /* the page as Parts 1 to 8 make it */

/* ===== 9. Style your six parts ===== */
const EXTRA = { optional: true, only: 'Extra. Your About page is finished without it.' };
const cssStart = (b, hint, example) => { b.toCode(); b.tab(CSSFILE);
  b.clickEnd('', { row: aboveMedia(), find: 'the line that starts with ' + c('@media') + '. Then go <b>up</b> from it to the first line that says ' + c('}') });
  b.enter('The cursor is at the left edge.');
  b.enter('This leaves one empty line between the two rules.');
  b.comment(hint, example); };
const RULES = (b, list) => list.forEach((R, k) => {
  if (k) { b.down(); b.enter('The cursor is at the left edge.'); b.enter('This leaves one empty line between the two rules.'); }
  b.cssOpen(R[0], R[1]); b.cssSplit();
  R[2].forEach((d2, j) => { if (j) b.enter(); b.decl(d2[0], d2[1], d2[2]); }); });
const WIDTH = [['max-width: 600px;', 'max-width is a limit. The column may be narrower than 600 pixels on a phone, and never wider.', 'People read best when a line holds about ten to fifteen words. 600 pixels gives lines of about that length.'], ['margin: 0 auto 96px;', 'Three values: the first is above (0), the second is left and right (auto: share the leftover space equally), the third is below (96 pixels).', 'auto puts the narrow column in the middle of the page. The 96 pixels below keep it apart from the next part.']];
const ENDCHECK = ['I saved style.css.', 'In a narrow window, this part still fits, and I never have to scroll sideways.'];
const CSSHINTS = ['The new rules must be <b>above</b> the line that starts with <code>@media</code>, at the left edge. They are not inside the media query.', 'A class selector starts with a dot, and the word after the dot must match the class in about.html, letter for letter.', NOCHANGE, CSSPUNC, CSSLIST, TWOBRACE, UNDO];
const HTMLHINTS = ['The new part must be <b>inside</b> main: above the line that says <code>&lt;/main&gt;</code>.', QUOTES, NOENDKEY, TWOEND, UNDO];

codeTask({ id: 'buttons-css', sec: 9, title: 'Style your buttons.', sub: 'Make every link with the class button look like a button: one filled with gold, and one with only an outline.',
  why: 'A link that looks like a button says: this is the thing to do. Two kinds of button tell the visitor which choice comes first.',
  without: 'Your most important links look like any other underlined links, and people miss them.',
  how: 'One rule, .button, makes the box: space, a line around it, round corners. It fills the box with gold. A second rule, .ghost, changes only two things for the quieter button: it takes the fill away and makes the words gold. A tag with both classes gets both rules, and where they disagree, the later rule wins.',
  check: ['I have two new rules. They start with <code>.button {</code> and <code>.ghost {</code>.', 'In the browser, my first button is gold with dark words.', 'My second button is see-through, with a gold line around it and gold words.', 'The four links in my two pairs of buttons all changed.'].concat(ENDCHECK),
  hints: ['A button has no room around its words? Check <code>display: inline-block;</code> in your <code>.button</code> rule.', 'The ghost button is filled with gold? The <code>.ghost</code> rule must come <b>after</b> the <code>.button</code> rule in your file.'].concat(CSSHINTS),
  learn: '<b>Level up:</b> one class, many uses. Any link on any page of your site becomes a button when you add <code>class="button"</code> to it. You wrote the look one time.' }, b => {
  cssStart(b, 'Hint: say what makes a link look like a button, and how the two kinds differ.', 'BUTTONS: a filled gold one for the main choice, and an outlined one for the second choice');
  RULES(b, [['.button', 'A dot and the word button: every tag with the class button. You have four of them: two in your Hook and two at the end of your page.', [['display: inline-block;', 'A link is inline: it sits in a line of text, and space above and below it does not push anything away. inline-block keeps the link in the line, and lets it have real space on all four sides, like a box.', 'A button needs space all around its words. Without this line, the space above and below would overlap the lines next to it.'], ['margin: 0 8px 8px 0;', 'Four values go clockwise from the top: above (0), right (8 pixels), below (8 pixels), left (0).', 'The space on the right keeps two buttons apart. The space below keeps them apart when the second one drops under the first on a phone.'], ['padding: 12px 16px;', 'Two numbers: above and below (12 pixels), then left and right (16 pixels).', 'This makes each button big enough for a finger, with a wide, easy shape.'], ['border: 2px solid #f5c84c;', 'border draws a line on all four sides: 2 pixels thick, solid, in your gold.', 'On a gold button you do not see a gold line. The ghost button needs it, and giving it to both keeps the two buttons exactly the same size.'], ['border-radius: 8px;', '8 pixels is a small, soft curve.', 'Round corners make a box look like something you can press.'], ['color: #05081a;', '05081a is the dark color of your header.', 'The button is about to turn gold, and light words on gold cannot be read. Dark on gold measures ' + R3 + ' : 1.'], ['background-color: #f5c84c;', 'f5c84c is your gold. It fills the box of the link.', 'A filled box is what makes a link look like a button. Gold is your accent color, so the eye goes to it.'], ['font-weight: bold;', 'bold makes the letters thicker.', 'The buttons are what you most want people to click. Thick letters make them hard to miss.'], ['text-decoration: none;', 'none takes away the line that browsers draw under every link.', 'The box already says: click me. A line under the words inside a box is clutter.']]],
    ['.ghost', 'A dot and the word ghost: every tag with the class ghost. Your second button in each pair has both classes, so it gets this rule and the rule above.', [['color: #f5c84c;', 'f5c84c is your gold.', 'The ghost button is about to lose its gold fill. Dark words on your dark page cannot be read, so the words become gold: ' + R4 + ' : 1.'], ['background-color: transparent;', 'transparent means: no color at all. You see the page through the button.', 'An outline with nothing inside is quieter than a filled box. It says: this is the second choice.']]]]);
  b.save();
  b.toBrowser('Your links with the class button look like buttons: one gold, and one with only a gold outline.', 0, '', false, undefined,
    pic('Two buttons side by side on a dark page. The first, Read my story, is filled with gold and has dark words. The second, See my gallery, is see-through with a gold outline and gold words.', box(`<span style="display:inline-block;padding:8px 12px;border-radius:8px;border:2px solid #f5c84c;background:#f5c84c;color:#05081a;font-weight:700;margin:0 6px 6px 0">Read my story</span><span style="display:inline-block;padding:8px 12px;border-radius:8px;border:2px solid #f5c84c;color:#f5c84c;font-weight:700">See my gallery</span>`)));
}, 'css');

codeTask({ id: 'story-css', sec: 9, title: 'Style the Story: a column that is easy to read.', sub: 'Put your story in a narrow column in the middle of the page.',
  why: 'When a line of words is too long, the eye loses its place on the way back to the start of the next line. A narrow column fixes that.',
  without: 'On a wide screen your story runs in long lines from side to side.',
  how: 'Designers aim for about 60 to 75 letters in a line: a rule of thumb. At your text size, 600 pixels is close to that. On a phone the column is simply as wide as the screen.',
  check: ['I have a new rule that starts with <code>.story {</code>.', 'On a wide window, my story is a narrow column in the middle of the page.'].concat(ENDCHECK),
  hints: CSSHINTS,
  learn: '<b>Level up:</b> count the letters in one full line of your story in the browser. Is it between 60 and 75? Change 600px a little until it is.' }, b => {
  cssStart(b, 'Hint: say why this column is narrow.', 'STORY: a narrow column, because short lines are easier to read');
  RULES(b, [['.story', 'A dot and the word story: the box with class="story".', WIDTH]]);
  b.save();
  b.toBrowser('On a wide window, your story is a narrow column in the middle of the page.', 0, '', false, undefined, D.story);
}, 'css');

codeTask({ id: 'timeline-css', sec: 9, title: 'Style the Journey: a line down the side.', sub: 'Draw a line down the left side of your moments, so the list looks like a path.',
  why: 'A line that runs past every moment shows, without words, that they belong to one path.',
  without: 'Your timeline looks like any numbered list.',
  how: 'border-left draws a line on the left edge of the list. padding-left moves the words away from the line. list-style: none takes the numbers away: the line shows the order now, from top to bottom.',
  check: ['I have two new rules. They start with <code>.timeline ol {</code> and <code>.timeline li {</code>.', 'In the browser, a gold line runs down the left side of my three moments.', 'There is space between the moments.'].concat(ENDCHECK),
  hints: ['No line? <code>border-left</code> needs three things with spaces between them: a width, the word solid and a color.'].concat(CSSHINTS),
  learn: '<b>Level up:</b> make the first words of each moment stand out. In about.html, put <code>&lt;strong&gt;</code> and <code>&lt;/strong&gt;</code> around <b>First class:</b> and the others. strong means important, and it shows bold.' }, b => {
  cssStart(b, 'Hint: say what makes this list look like a path.', 'JOURNEY: a line down the left side, so the moments read as one path');
  RULES(b, [['.timeline ol', 'This selector means: the ordered list inside the part with class="timeline".', [['margin: 0;', '0 takes away the space a browser puts above and below a list.', 'The heading already has space under it. Extra space would push the timeline away from its heading.'], ['padding-left: 24px;', 'padding-left is padding on one side only: the left. 24 pixels sit between the left edge of the list and its words.', 'The next step draws a line on that left edge. Without padding, the words would touch the line.'], ['border-left: 4px solid #f5c84c;', 'border-left draws a line on the left side only. It needs three things: how thick (4px), what kind (solid: one unbroken line) and what color (your gold).', 'One line that runs past every moment is what makes a list look like a timeline: a path with stops on it.'], ['list-style: disc;', 'disc means: draw a round dot in front of each item, in place of the numbers. The list is still an ordered list in your HTML.', 'A dot for each moment looks like a stop on a path. A screen reader still says first, second, third, because the tag is still ol.']]],
    ['.timeline li', 'This selector means: each moment in the timeline.', [['margin-bottom: 16px;', 'margin-bottom puts 16 pixels of empty space under each list item.', 'Each moment is a stop on the path. Space between the stops lets the eye count them.']]],
    ['.timeline li::marker', 'Type li, two colons and the word marker, with no spaces. The marker is the dot (or the number) that a list draws in front of an item. Two colons mean: a piece of the tag that is not in your HTML.', [['color: #f5c84c;', 'f5c84c is your gold. Only the dot gets it: the words keep their own color.', 'Gold dots next to the gold line look like stops on one path.']]],
    ['.timeline strong', 'This selector means: a strong tag inside the timeline. That is the short title of each moment.', [['display: block;', 'block puts the title on its own line. A strong tag normally sits in the line of text.', 'A title on its own line, with the sentence under it, is easier to scan than one long line.'], ['font-family: Georgia, serif;', 'Georgia is the font of your headings.', 'The titles are small headings, so they get the heading font.'], ['font-size: 20px;', '20 pixels is a little larger than your 18 pixel words.', 'A slightly bigger title tells the eye where each moment starts.']]]]);
  b.save();
  b.toBrowser('A gold line runs down the left side of your three moments.', 0, '', false, undefined, D.timeline);
}, 'css');

codeTask({ id: 'skills-css', sec: 9, title: 'Style the Skills: a row of round tags.', sub: 'Turn your list of skills into a row of round tags.',
  why: 'Tags in a row take little room and are read in one look. The round shape tells the eye: these are labels, not sentences.',
  without: 'Your skills are a plain list with bullets, one under the other.',
  how: 'flex puts the items in a row, and flex-wrap lets them go onto a second row on a small screen. A very large border-radius, like 999px, makes the ends of each tag fully round.',
  check: ['I have two new rules. They start with <code>.skills ul {</code> and <code>.skills li {</code>.', 'In the browser, my skills are in a row, each in a round gold outline.', 'In a narrow window, the tags go onto a second row. None is cut off.'].concat(ENDCHECK),
  hints: ['The tags are still one under the other? Check <code>display: flex;</code> in the <code>.skills ul</code> rule.'].concat(CSSHINTS),
  learn: '<b>Level up:</b> fill the tags with color. In the <code>.skills li</code> rule, change nothing else and add two lines: <code>color: #05081a;</code> and <code>background-color: #f5c84c;</code>. Dark on gold has a contrast of ' + R3 + ' : 1.' }, b => {
  cssStart(b, 'Hint: say how the skills are shown, and why.', 'SKILLS: a row of round tags that can be read in one look');
  RULES(b, [['.skills ul', 'This selector means: the list inside the part with class="skills".', [['display: flex;', 'flex makes the list a flex box, so the skills line up side by side.', 'Four short words in a row can be read in one look. Four lines take four looks.'], ['flex-wrap: wrap;', 'wrap means: when the next thing does not fit on the line, it drops to a new line.', 'On a phone, four tags do not fit on one line. Without wrap they are squeezed, or they stick out of the screen.'], ['gap: 8px;', 'gap puts 8 pixels between the tags, side to side and between the rows.', 'Tags that touch look like one long bar.'], ['padding: 0;', '0 takes away the space a list keeps on its left side for bullets.', 'With it gone, the first tag lines up with the heading above it.'], ['list-style: none;', 'none means: draw no bullets.', 'Each skill is about to become a tag with its own outline. A bullet in front of a tag is clutter.']]],
    ['.skills li', 'This selector means: each skill.', [['padding: 4px 14px;', 'Two numbers: above and below (4 pixels), then left and right (14 pixels).', 'More space at the sides than at the top and bottom gives the long, low shape of a tag.'], ['border: 2px solid #f5c84c;', 'border draws a line on all four sides. It needs how thick (2px), what kind (solid) and what color (your gold).', 'The outline is what turns a plain word into a tag.'], ['border-radius: 999px;', 'The curve can never be bigger than half the height of the box. A number that is far too big, like 999, gives the roundest shape there is: two half circles at the ends.', 'This shape is often called a pill. People know it as a tag when they see it.'], ['font-weight: bold;', 'bold makes the letters thicker.', 'A tag holds one or two words. Thick letters keep short words from looking lost.']]]]);
  b.save();
  b.toBrowser('Your skills are in a row, each in a round gold outline.', 0, '', false, undefined, D.skills);
}, 'css');

codeTask({ id: 'trust-css', sec: 9, title: 'Style the Trust: two quotes, side by side.', sub: 'Put your two quotes next to each other, each in large letters in my heading font.',
  why: 'A quote has to look different from your own words, so the reader knows at once that someone else is speaking. Side by side, two quotes are read as a pair.',
  without: 'The quotes look like two more paragraphs, and readers think you wrote them about yourself.',
  how: 'flex puts the two quotes in a row. flex: 1 1 260px tells each quote to share the row equally, but never to be narrower than 260 pixels. On a phone there is no room for two of them, so the second quote drops under the first by itself: no media query needed.',
  check: ['I have three new rules. They start with <code>.trust {</code>, <code>blockquote {</code> and <code>.by {</code>.', 'On a wide window, my two quotes are side by side, each in large letters in my heading font.', 'On a narrow window, the second quote is under the first.', 'Each name is under its quote, in bold.'].concat(ENDCHECK),
  hints: ['The selector <code>blockquote</code> has no dot: it is the name of a tag, not a class.', 'The quotes are one under the other on a wide window? Check <code>display: flex;</code> in the <code>.trust</code> rule.'].concat(CSSHINTS),
  learn: '<b>Level up:</b> show the quotes in a slanted style. In the blockquote rule, add <code>font-style: italic;</code> and look. Keep it only if it is still easy to read.' }, b => {
  cssStart(b, 'Hint: say how a reader can tell that these are quotes, and what puts them side by side.', 'TRUST: two quotes side by side, in large letters and their own font, so they look different from my own words');
  RULES(b, [['.trust', 'A dot and the word trust: the box that holds your two quotes.', [['display: flex;', 'flex makes the trust box a flex box, so the two blockquotes inside it sit side by side.', 'Two voices next to each other look like a group of people who agree. One under the other, they look like a list.'], ['flex-wrap: wrap;', 'wrap means: when the second quote does not fit next to the first, it drops under it.', 'A phone is too narrow for two quotes side by side. Without wrap, each quote would be squeezed into a thin strip.'], ['gap: 32px;', 'gap puts 32 pixels between the two quotes, and between the rows when they wrap.', 'The space shows where one person stops talking and the other starts.'], ['margin-bottom: 96px;', 'margin-bottom puts 96 pixels of empty space under this part.', 'It is the same space you put under your other parts, so the whole page has one rhythm.']]],
    ['blockquote', 'No dot this time: this rule styles the blockquote tag.', [['flex: 1 1 260px;', 'flex with three values: may grow (1), may shrink (1), and starting size (260px). Each quote starts at 260 pixels wide. Then the two share the leftover space equally.', 'Because of the 260 pixels, two quotes fit side by side only on a screen that is wide enough. On a phone they do not fit, so wrap puts one under the other. You get both layouts with no media query.'], ['margin: 0;', '0 takes away the space a browser puts on all four sides of a blockquote.', 'That space would push your quotes in from both edges, so they would not line up with the rest of your page.'], ['font-family: Georgia, serif;', 'Georgia is the font of your headings. serif is the backup.', 'The quotes are another person talking. A different font from your own words makes that clear before anyone reads a word.'], ['font-size: 24px;', '24 pixels is clearly larger than your 18 pixel words.', 'The quotes are the proof on your page. A bigger size makes people stop and read them.'], ['line-height: 1.3;', '1.3 means the lines sit closer together than in your normal text.', 'Large letters need less space between lines, or a quote falls apart into separate lines.']]],
    ['.by', 'A dot and the word by: the line with the name of the person.', [['font-family: Arial, sans-serif;', 'Arial is the plain font of your normal words.', 'The name is not part of what the person said. Your blockquote rule gave everything inside it the heading font, and a child inherits that. This line gives the name its plain font back.'], ['font-size: 16px;', '16 pixels is smaller than the 24 pixels of the quote.', 'The words of the quote matter most. The name is a small line under them.'], ['font-weight: bold;', 'bold makes the letters thicker.', 'A quote with no clear name looks made up. Thick letters make the name easy to find.'], ['color: #aab3d6;', 'aab3d6 is a soft gray-blue: quieter than your main words. On the dark page it measures ' + ratio('#aab3d6', '#0b1026') + ' : 1.', 'The quote is the loud part. A quieter color for the name keeps the eye on the words that person said.']]]]);
  b.save();
  b.toBrowser('Your two quotes are side by side, each in large letters in your heading font, with a name under it.', 0, '', false, undefined, D.trust);
}, 'css');

codeTask({ id: 'action-css', sec: 9, title: 'Style the Action: the end of the Z.', sub: 'Turn this part into a gold band, with your question on the left and two dark buttons on the right.',
  why: 'The bottom right corner is where the eye stops. A button there is the strongest signal on a page that says: this is what to do next.',
  without: 'Your most important links look like any other underlined links, and people miss them.',
  how: 'flex puts the question and the links in one row, and space-between sends the question to the left edge and the links to the right edge: the same move as in your header. The whole part becomes a gold band, and the buttons turn their colors around so they still show. Dark words on gold, and gold words on the dark buttons, both have a contrast of ' + R3 + ' : 1. The links keep their underline, so they still look like links to people who cannot tell colors apart.',
  check: ['I have three new rules. They start with <code>.action {</code>, <code>.action .button {</code> and <code>.action .ghost {</code>.', 'On a wide window, my question is on the left and my two buttons are on the right.', 'This part is a gold band. My first button is dark with gold words, and my second one is see-through with a dark line around it.', 'I traced the Z on my finished page with my finger: my name, my links, down across my three rows, my question, my buttons.', 'When I click a button, an empty page opens. The Back button brings me back.'].concat(ENDCHECK),
  hints: ['The buttons are under the question, not on the right? The row needs room for both. Make your browser window as wide as your screen. With a long question, the buttons stay underneath, and that is fine.', 'The buttons have no room around their words? Check <code>display: inline-block;</code> in your <code>.button</code> rule.', 'A button opens an empty white page? That is correct: gallery.html and contact.html are still empty.'].concat(CSSHINTS),
  learn: '<b>Level up:</b> make the buttons react when a mouse is over them. Add a new rule above your media query: <code>.action .button:hover { background-color: #141b3a; }</code> It is a lighter night blue.' }, b => {
  cssStart(b, 'Hint: say where the question and the buttons sit, and why.', 'ACTION: the question on the left and the buttons on the right, where the eye stops');
  RULES(b, [['.action', 'A dot and the word action: the box with your question and your links.', [['display: flex;', 'flex makes the action box a flex box, so the question and the paragraph with your two links sit side by side.', 'This is the last line of the Z: the question on the left, and the thing to click on the right.'], ['flex-wrap: wrap;', 'wrap means: when the links do not fit next to the question, they drop under it.', 'On a phone there is no room for both on one line.'], ['justify-content: space-between;', 'space-between sends the first thing to the left edge and the last thing to the right edge.', 'The eye ends its Z at the bottom right. Your buttons are waiting exactly there.'], ['align-items: center;', 'center lines up the middle of the question with the middle of the buttons, from top to bottom.', 'The heading is taller than the buttons. Without this line the buttons hang at the top.'], ['gap: 16px;', 'gap keeps at least 16 pixels between the question and the links.', 'When they wrap on a phone, the gap also keeps the links from touching the question above them.'], ['margin-bottom: 96px;', 'margin-bottom puts 96 pixels of empty space under this part.', 'It is the same space you put under your other parts, so the whole page has one rhythm.'], ['padding: 24px;', '24 pixels on all four sides, inside the box.', 'The next step fills this box with gold. Without padding, your words would touch the edge of the gold.'], ['border-radius: 6px;', '6 pixels: the same small curve as your pictures and your button.', 'One corner shape on the whole page looks planned.'], ['color: #05081a;', '05081a is the dark color of your header.', 'The box is about to turn gold. Light words on gold cannot be read, so the words here must be dark. Dark on gold measures ' + R3 + ' : 1.'], ['background-color: #f5c84c;', 'f5c84c is your gold. It fills the whole box.', 'Until now gold was only for small things. One big gold band at the very end of the page is the loudest thing on it: it tells visitors what to do next.']]],
    ['.action .button', 'Two classes with a space between them. It means: a tag with the class button that is <b>inside</b> the action box. The buttons in your Hook do not change.', [['color: #f5c84c;', 'f5c84c is your gold.', 'On the gold band a gold button would vanish. Here the colors turn around: gold words on a dark button. Gold on this dark color measures ' + R3 + ' : 1.'], ['background-color: #05081a;', '05081a is the dark color of your header. It fills the button.', 'A dark button is the strongest thing on a gold band, so the eye goes straight to it.'], ['border-color: #05081a;', 'The line around the button gets the same dark color.', 'Your button rule gave every button a gold line. On gold that line cannot be seen, and on a dark button it would look like a mistake.']]],
    ['.action .ghost', 'A tag with the class ghost that is inside the action box: your second button.', [['color: #05081a;', '05081a is your dark color.', 'The ghost button is see-through, so the gold band shows inside it. Its words must be dark to be read on gold: ' + R3 + ' : 1.'], ['background-color: transparent;', 'transparent means: no color at all. You see what is behind the button.', 'The rule above just made every button in this box dark. This rule comes later and is just as exact, so it wins for the ghost button.']]]]);
  b.save();
  b.toBrowser('With your browser window as wide as your screen, your question is on the left and your two dark buttons are on the right, on a gold band. Your About page has all six parts.', 0, '', false, undefined, D.action);
  b.push('Scroll to the top of your page. Now trace the <b>Z</b> with your finger on the screen. Start on your <b>name</b>. Go across to your <b>links</b>. Slide down across your three rows: words, picture, picture, words, words, picture. End on the gold band: your <b>question</b> on the left, then your <b>buttons</b> on the right. That path is the plan of your whole page.', 'Trace the <b>Z</b> on your finished page.', pic('A drawing of the finished About page with a dashed line in the shape of the letter Z on top of it: from the name to the links in the top bar, down across the three rows, and from the question to the buttons in the gold band.', `<div class="sc-board">${ZPAGE}</div>`));
}, 'css');

/* ===== 10. Extra: add icons ===== */
const ICONURL = 'https://unpkg.com/@phosphor-icons/web@2.1.1';
const ICONS = [['About me', 'user-circle', 'user', 'a person in a circle'], ['My story', 'book-open-text', 'book', 'an open book'], ['My journey', 'path', 'path', 'a winding path'], ['My skills', 'star-four', 'star', 'a star with four points']];
const ICONCODE = n => '<i class="ph ph-' + n + '"></i>';
const PH = (os, body) => br(os, 'Phosphor Icons', 'phosphoricons.com', body);
const PHROW = (q, names, on) => `<div style="border:2px solid #6b7587;border-radius:6px;padding:4px 8px;margin-bottom:8px" class="${on === 'search' ? 'sc-hit' : ''}">${esc(q || 'Search')}</div><div style="display:flex;gap:8px;flex-wrap:wrap">${names.map(n => `<span class="sc-card${on === n ? ' sc-hit' : ''}" style="min-width:0"><b>&#9711;</b><span>${esc(n)}</span></span>`).join('')}</div>`;
task({ id: 'icons-find', sec: 10, title: 'Find your icons on the Phosphor Icons site.', sub: 'Look up one small icon for each of your four labels, and write down its name.',
  why: 'An icon set has thousands of icons, and each one has an exact name. You need that name to put the icon on your page.',
  without: 'You guess a name, it is not a real one, and an empty space shows where the icon should be.',
  how: 'Phosphor Icons is a free icon set. Its web site lets you search by a word, and shows the code for each icon. The code is always the same shape: an i tag with the class ph, and a second class that is ph, a hyphen, and the name of the icon.',
  steps: [
    [os => `Click your web browser. Press <kbd>${mod(os)}</kbd>+<kbd>T</kbd> (hold ${mod(os)} and press the T key). A new, empty tab opens. Your About page stays open in its own tab.`,
     os => keys([mod(os), 'T'], 'A new browser tab opens.'), os => `Press <b>${mod(os)}+T</b> to open a new browser tab.`],
    [os => `Type <b>phosphoricons.com</b> and press <kbd>${enterKey(os)}</kbd>. The Phosphor Icons site opens: a page full of small drawings.`,
     os => pic('A web browser. The address says phosphoricons.com. The page shows a search box and rows of small icons, each with its name under it.', PH(os, PHROW('', ['user', 'book', 'path', 'star']))), 'Go to <b>phosphoricons.com</b>.'],
    [`Click the <b>Search</b> box at the top of the page. Type one word for your first label. Alex's first label is About me, so Alex types <b>${ICONS[0][2]}</b>. The page now shows only the icons that match, each with its <b>name</b> under it.`,
     os => pic('The Phosphor Icons site. The search box has the word user typed in it and is outlined. Under it are the matching icons: user, user-circle, user-plus and users.', PH(os, PHROW('user', ['user', 'user-circle', 'user-plus', 'users'], 'search'))), 'Type one word in the <b>Search</b> box.'],
    [`Click the icon you like best. A panel opens under it. Alex clicks <b>${ICONS[0][1]}</b>: ${ICONS[0][3]}.`,
     os => pic('The Phosphor Icons site. Among the matching icons, user-circle is outlined.', PH(os, PHROW('user', ['user', 'user-circle', 'user-plus', 'users'], 'user-circle'))), 'Click the icon you like best.'],
    [`In the panel, find the row of small tabs: Tags, React, Web, Vue. Click <b>Web</b>. The panel shows one line of code. For Alex it says ${c(ICONCODE(ICONS[0][1]))}`,
     os => pic('The panel for the icon user-circle. The tab Web is outlined. Under it is one line of code: an i tag with the class ph ph-user-circle.', PH(os, `<div style="display:flex;gap:8px;margin-bottom:8px"><span class="sc-btn">Tags</span><span class="sc-btn">React</span><span class="sc-btn sc-hit">Web</span><span class="sc-btn">Vue</span></div><code>${esc(ICONCODE(ICONS[0][1]))}</code>`)), 'Click the tab <b>Web</b>. It shows the code for the icon.'],
    [`Read the code. The part in the quote marks is two classes: <b>ph</b>, and <b>ph-</b> with the name of the icon. On paper or in a note, write down the second one. Alex writes <b>ph-${ICONS[0][1]}</b>.`,
     cards([['ph', 'this is a Phosphor icon'], ['ph-' + ICONS[0][1], 'which icon: the name you looked up']]), 'Write down the name: <b>ph-</b> and the name of the icon.'],
    [`Do the same for your other three labels: search, click, click <b>Web</b>, write down the name. For your two quotes you do not need to search: that icon is named <b>ph-quotes</b>. Alex's four names are <b>${ICONS.map(i => 'ph-' + i[1]).join('</b>, <b>')}</b>.`,
     ticks(ICONS.map(i => i[0] + ': ph-' + i[1])), 'Find a name for each of your <b>four</b> labels.'],
    ['Click the tab of your <b>About page</b> at the top of the browser. Your page comes back. You can leave the Phosphor tab open.',
     os => mockPic(os, 11, 'The About page tab is in front again.'), 'Click the tab of your <b>About page</b>.']
  ],
  check: ['I wrote down four icon names, one for each label.', 'Each name starts with <b>ph-</b> and is spelled exactly as the site shows it.', 'My About page is in front again in my browser.'],
  hints: ['No icon matches your word? Try a simpler word, or a thing you can draw: book, star, heart, map, camera.',
    'You do not see the tab named Web? Make the browser window wider, or scroll to the right in the row of tabs.',
    'An icon name has two or three words? They are joined with hyphens, like <b>book-open-text</b>. Write the hyphens down too.',
    'Web sites change. If the site looks different from the drawings, look for the same three things: a search box, the icons, and the code for the web.'],
  learn: '<b>Level up:</b> at the top left of the site is a list that says <b>Regular</b>. It has other styles: Thin, Light, Bold, Fill and Duotone. Each style has its own first class and needs its own line in your head, so this tutorial uses Regular only.' });
codeTask({ id: 'icons-html', sec: 10, title: 'Load the icons and add your first one.', sub: 'Add one line that loads the Phosphor icon set, and put your first icon in front of your first label.',
  why: 'A small icon next to a label helps the eye find the start of each part. Icons are decoration: the words still carry the meaning.',
  without: 'Your labels are plain words. The page still works: icons are a finishing touch.',
  how: 'Phosphor Icons is a free icon set. One line in the head of your page loads every icon. An icon is an i tag with two classes: ph, and the name of the icon. aria-hidden="true" tells screen readers to skip it, because your label already says the words. The icons need the internet: offline, your page reads the same with no icons.',
  check: ['My script line is in the head, under my link line.', 'My first label has an <code>&lt;i&gt;</code> tag in front of its words, inside the paragraph.', 'The i tag says <code>aria-hidden="true"</code>.', 'I saved about.html.'],
  hints: ['The icon does not show? Check the address in <code>src</code>, letter by letter, and check that you are on the internet.', 'The class has two words with a space between them: <code>ph ph-user-circle</code>.', QUOTES, TWOEND, UNDO],
  learn: '<b>Level up:</b> read your new tag out loud: an i tag, with the classes ph and ph-user-circle, hidden from screen readers. If you can say what each piece does, you can add any icon to any page.' }, b => {
  b.toCode(); b.tab(FILE);
  b.clickEnd('<link rel=', { find: 'the line that starts with ' + c('<link rel="stylesheet"') });
  b.enter();
  b.comment('Hint: say what this line loads and where the icons come from.', 'Phosphor Icons: one line loads the whole free icon set');
  b.attr('<script src=', 'a less-than sign, the word <b>script</b>, a space, the letters <b>src</b> and an equals sign');
  b.value(ICONURL, 'Type this address exactly: ' + c(ICONURL) + ' It has no spaces. The at sign ( @ ) is Shift and the 2 key.', 'Type the address of the icon set.');
  b.right();
  b.close('Leave the space between the two tags empty.');
  b.clickAfter('class="label">About me', '<p class="label">', 'the first word of your label');
  b.attr('<i class=', 'a less-than sign, the letter <b>i</b>, a space, the word <b>class</b> and an equals sign', 'An icon is an i tag.');
  b.value('ph ph-user-circle', 'Type <b>ph</b>, a space, and the name you wrote down for your first label. Alex types <b>ph-user-circle</b>. The first class says: this is a Phosphor icon. The second class says which one.', 'Type <b>ph</b>, a space, and your icon name.');
  b.right();
  b.space();
  b.attr('aria-hidden=', 'the word <b>aria-hidden</b> (with a hyphen) and an equals sign', 'aria-hidden tells screen readers to skip the icon.');
  b.value('true', 'Type <b>true</b>, in lowercase.', 'Type <b>true</b>.');
  b.right();
  b.close('The icon has no words inside it. Leave the space between the two tags empty.');
  b.save();
}, 'html');
codeTask({ id: 'icons-more', sec: 10, title: 'Add your other icons.', sub: 'Put the icons you looked up in front of your other three labels, and a quote mark in front of each quote.',
  why: 'One icon on one label looks like a mistake. An icon on every label looks like a plan.',
  without: 'Your first part has an icon and the others do not, and the page looks unfinished.',
  how: 'Each icon is the same tag you already typed: an i tag with two classes and aria-hidden. Only the second class changes. Your script line in the head already loads every icon, so you do not add it again.',
  check: ['Each of my four labels has an <code>&lt;i&gt;</code> tag in front of its words, inside the paragraph.', 'Each of my two quotes starts with an <code>&lt;i&gt;</code> tag that says <code>ph ph-quotes</code>.', 'Each icon has <b>ph</b>, a space, and its own name that starts with <b>ph-</b>.', 'Each i tag says <code>aria-hidden="true"</code>.', 'I saved about.html.'],
  hints: ['One icon shows as an empty space? Its name is not a real one. Look it up again on the Phosphor Icons site and compare letter by letter.', 'The class has two words with a space between them, like <code>ph ph-path</code>.', QUOTES, TWOEND, UNDO],
  learn: '<b>Level up:</b> you can put an icon anywhere words go: in a link, a heading or a button. If an icon stands alone, with no words next to it, do not hide it: give it words a screen reader can say.' }, b => {
  ICONS.slice(1).forEach((I2, k) => {
    b.clickAfter('class="label">' + I2[0], '<p class="label">', 'the first word of your label');
    b.attr('<i class=', 'a less-than sign, the letter <b>i</b>, a space, the word <b>class</b> and an equals sign');
    b.value('ph ph-' + I2[1], `Type <b>ph</b>, a space, and the name you wrote down for this label. Alex types <b>ph-${I2[1]}</b>: ${I2[3]}.`, 'Type <b>ph</b>, a space, and your icon name.');
    b.right();
    b.space();
    b.attr('aria-hidden=', 'the word <b>aria-hidden</b> (with a hyphen) and an equals sign');
    b.value('true', 'Type <b>true</b>, in lowercase.', 'Type <b>true</b>.');
    b.right();
    b.close('The icon has no words inside it. Leave the space between the two tags empty.');
  });
  [QUOTE, QUOTE2].forEach((q, k) => {
    b.clickAfter('<p>' + q, '<p>', 'the first word of the quote');
    b.attr('<i class=', 'a less-than sign, the letter <b>i</b>, a space, the word <b>class</b> and an equals sign');
    b.value('ph ph-quotes', `Type <b>ph</b>, a space, and <b>ph-quotes</b>: a pair of quote marks. ${k === 0 ? 'This icon goes in front of each of your two quotes. Later, your CSS makes it big and puts it above the words.' : 'This is the same icon, for your second quote.'}`, 'Type <b>ph ph-quotes</b>.');
    b.right();
    b.space();
    b.attr('aria-hidden=', 'the word <b>aria-hidden</b> (with a hyphen) and an equals sign');
    b.value('true', 'Type <b>true</b>, in lowercase.', 'Type <b>true</b>.');
    b.right();
    b.close('The icon has no words inside it. Leave the space between the two tags empty.');
  });
  b.save();
}, 'html');
codeTask({ id: 'icons-css', sec: 10, title: 'Style your icons.', sub: 'Give the label icons a little room, and make the quote marks big and gold.',
  why: 'An icon that touches the first letter of a word looks like a mistake.',
  without: 'The icon is pressed against your label.',
  how: 'An icon is text, so it takes the color and the size of the words around it: your icon is already gold and small, like your label. It only needs a little space on its right.',
  check: ['I have two new rules. They start with <code>.label i {</code> and <code>.trust i {</code>.', 'A large gold quote mark sits above each of my two quotes.', 'In the browser, a small icon sits in front of each of my four labels, with a little space after it.', 'Each icon is the same color as its label.'].concat(ENDCHECK),
  hints: ['No icon in the browser? Check that you are on the internet, and that you saved about.html.'].concat(CSSHINTS),
  learn: '<b>Level up:</b> make the icon a little bigger. In the <code>.label i</code> rule, add <code>font-size: 20px;</code> and look.' }, b => {
  cssStart(b, 'Hint: say what this rule changes about the icon.', 'ICONS: a little space between an icon and the words after it');
  RULES(b, [['.label i', 'This selector means: an i tag inside a tag with the class label. That is your icon.', [['margin-right: 6px;', 'margin-right is margin on one side only: the right. 6 pixels sit between the icon and the words.', 'Without it, the icon touches the first letter of your label.']]],
    ['.trust i', 'This selector means: an i tag inside the trust box. Those are your two quote marks.', [['display: block;', 'block puts the icon on its own line, above the words of the quote.', 'A quote mark above a quote is a sign people know from magazines: someone is speaking.'], ['margin-bottom: 8px;', '8 pixels of empty space under the icon.', 'Without it, the quote mark sits on top of the first line of words.'], ['font-size: 40px;', 'An icon is text, so font-size makes it bigger. 40 pixels is much larger than the words.', 'A big mark is seen before the words are read. It tells the eye: these two blocks are quotes.'], ['color: #f5c84c;', 'f5c84c is your gold.', 'The quote marks join your labels, your dots and your buttons: one accent color for everything that guides the eye.']]]]);
  b.save();
  b.toBrowser('A small gold icon sits in front of each of your four labels.', 0, '', false, undefined,
    pic('The label About me in small gold capital letters, with a small gold icon of a person in a circle in front of it.', box(`<span style="display:block;color:#f5c84c;font-weight:700;font-size:14px;letter-spacing:1px;text-transform:uppercase"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" style="vertical-align:-3px;margin-right:6px" fill="none" stroke="#f5c84c" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3.5"/><path d="M5.5 19 a7 7 0 0 1 13 0"/></svg>About me</span><b style="display:block;font-family:Georgia,serif">${BIG.join('')}</b>`)));
}, 'css');

/* ---------- build ---------- */
const sc = (p, cap) => `<div class="scene" role="img" aria-label="${esc('Drawing. ' + p.alt)}"><div class="sc-stage">${p.html}</div><div class="sc-cap">${cap}</div></div>`;
const capOf = text => { const p = plain(text).replace(/\s+/g, ' ').trim(); const m = p.match(/^.*?[.!?](?=\s|$)/); let cp = m ? m[0] : p; if (cp.length > 110) cp = cp.slice(0, 107).replace(/\s+\S*$/, '') + '...'; return esc(cp); };
const val = (v, os) => typeof v === 'function' ? v(os) : v;

/* ===== concept tasks: one idea each, taught just before the task that first uses it ===== */
const BX = (label, inner, st) => `<div style="border:2px solid #6b7587;border-radius:6px;padding:6px 8px;text-align:left;${st || ''}"><b style="display:block;font-size:12px;letter-spacing:.5px">${label}</b>${inner || ''}</div>`;
const BOARD = inner => `<div class="sc-board"><div style="width:100%;max-width:340px;font-family:Arial,sans-serif;color:#1f2933;text-align:left">${inner}</div></div>`;
const FBOX = (st, items) => `<div style="border:2px dashed #6b7587;border-radius:6px;padding:6px;display:flex;${st}">${items.map(i => `<span style="background:#cfe0f5;border:2px solid #0b3d91;border-radius:4px;padding:4px 8px;${i[1] || ''}">${i[0]}</span>`).join('')}</div>`;
const CONCEPT = { nowork: true };
task({ id: 'html-ideas', sec: 3, title: 'Learn how HTML works.', sub: 'Learn four ideas that every line of your page uses: elements, nesting, attributes and tags with a meaning.',
  why: 'When you know these four ideas, a page of HTML stops being a wall of symbols. You can read any line and say what it is for.',
  without: 'You can copy code, but you cannot fix it when it breaks, and you cannot explain it.',
  how: 'HTML does one job: it says what each part of a page <b>is</b>. It does not say how the part looks. That is the job of CSS, later.',
  steps: [
    ['Look at the picture. A beginning tag, the words, and an ending tag make one <b>element</b>. An element is one part of your page: one heading, one paragraph, one link. Here the tag is h2: a heading. The tag name says what kind of part it is.',
     pic('One element, in three pieces: the beginning tag h1, the words How I Started, and the ending tag h2. A bracket under all three says: one element.', BOARD(`<div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center"><code>&lt;h2&gt;</code><span>How I Started</span><code>&lt;/h2&gt;</code></div><div style="border:2px solid #0b3d91;border-top:0;height:8px;margin-top:4px"></div><b style="display:block;text-align:center">one element</b>`)), 'A beginning tag, words and an ending tag make one <b>element</b>.'],
    ['Look at the boxes. Elements go <b>inside</b> other elements, like boxes inside boxes. This is called <b>nesting</b>. The outside element is the <b>parent</b>. The ones inside it are its <b>children</b>. In your code, a child is pushed in (indented) under its parent, so you can see who is inside whom.',
     pic('Boxes inside boxes. The outside box is header. Inside it is a box div. Inside the div are two boxes: h1 and p.', BOARD(BX('header (parent)', BX('div (child of header)', `<div style="display:flex;gap:6px;margin-top:4px">${BX('h1')}${BX('p')}</div>`, 'margin-top:4px;background:#eef4fb')))), 'Elements go inside elements: <b>parent</b> and <b>children</b>.'],
    ['Look at the picture. An <b>attribute</b> is extra information inside a beginning tag. It has a <b>name</b>, an equals sign, and a <b>value</b> in quote marks. Here the name is href and the value is the file the link opens. A tag can have several attributes, with a space between them.',
     cards([['Tag', '<a ...>'], ['Attribute name', 'href'], ['Value, in quote marks', '"gallery.html"']]), 'An <b>attribute</b> is a name, an equals sign and a value in quote marks.'],
    ['Look at the map of a page. Some tags have names that say what a part is <b>for</b>: header, nav, main, footer, section. These are called <b>semantic</b> tags. They look like nothing special on the screen. Their value is the meaning: a screen reader, a search engine and your own CSS can all find the parts by name.',
     pic('A map of a page, as four boxes one under the other: header at the top, with nav inside it; main in the middle, with two sections inside it; footer at the bottom.', BOARD(BX('header', BX('nav', '', 'margin-top:4px;background:#eef4fb')) + BX('main', `<div style="display:flex;gap:6px;margin-top:4px">${BX('section')}${BX('section')}</div>`, 'margin-top:6px') + BX('footer', '', 'margin-top:6px'))), '<b>Semantic</b> tags say what each part of the page is for.'],
    ['Look at the two cards. A <b>div</b> is the opposite: a box with <b>no</b> meaning. Use a semantic tag when one fits. Use a div only when you need a box to keep things together and no tag with a meaning fits.',
     cards([['Tags with a meaning', 'header, nav, main, section, footer, h1, p, ul, blockquote'], ['Only a box', 'div: use it when nothing else fits']]), 'A <b>div</b> is a box with no meaning.']
  ],
  check: ['I can say what an element is.', 'I can point to a parent and a child in a picture of code.', 'I can say what an attribute is made of: a name, an equals sign and a value in quote marks.', 'I can name three semantic tags and say what each is for.'],
  hints: ['Mixed up tag and element? The tag is only the part in angle brackets. The element is the whole thing: beginning tag, what is inside, and ending tag.'],
  learn: '<b>Level up:</b> HTML stands for HyperText Markup Language. Markup means: marks you add to words to say what they are. That is all a tag is.' });

task({ id: 'flex-ideas', sec: 5, title: 'Learn how flexbox works.', sub: 'Learn the one layout idea you will use again and again: a flex box and the things inside it.',
  why: 'Flexbox is how you put things side by side on a web page. You will use it for your header, your links, your zigzag rows, your skill tags, your quotes and your call to action.',
  without: 'Everything on a page sits one under the other, and you have no way to put two things next to each other.',
  how: 'Flexbox always has two levels. The <b>flex box</b> is the parent: you turn it on with display: flex. The <b>flex items</b> are its children: the things directly inside it. Some properties go on the box, and some go on an item.',
  steps: [
    ['Look at the two pictures. Without flex, the things inside a box sit one under the other. With <code>display: flex;</code> on the box, its children line up in a <b>row</b>, side by side, in the order of your HTML.',
     pic('Two dashed boxes. In the first, with no flex, three items sit one under the other. In the second, with display flex, the same three items sit side by side in a row.', BOARD('<b>no flex</b>' + FBOX('flex-direction:column;gap:4px;margin-bottom:8px', [['one'], ['two'], ['three']]) + '<b>display: flex;</b>' + FBOX('gap:4px', [['one'], ['two'], ['three']]))), '<code>display: flex;</code> puts the children of a box in a row.'],
    ['Look at the arrows. A row has two directions. <b>Along</b> the row is left to right. <b>Across</b> the row is top to bottom. <code>justify-content</code> moves things <b>along</b> the row. <code>align-items</code> lines them up <b>across</b> it. Remember: justify goes with the row, align goes against it.',
     pic('A dashed flex box with two items. A long arrow from left to right is labelled justify-content, along the row. A short arrow from top to bottom is labelled align-items, across the row.', BOARD(FBOX('justify-content:space-between;align-items:center;height:64px', [['name', 'padding:12px 8px'], ['menu']]) + '<span style="display:block;margin-top:6px">&#8594; <b>justify-content</b>: along the row</span><span style="display:block">&#8595; <b>align-items</b>: across the row</span>')), '<b>justify-content</b> works along the row. <b>align-items</b> works across it.'],
    ['Look at the picture. <code>justify-content: space-between;</code> sends the first thing to the left edge and the last thing to the right edge, with all the empty space between them. This one line makes the top of your Z: name on the left, menu on the right.',
     pic('A dashed flex box. The item name is at the left edge and the item menu is at the right edge. The space between them is empty.', BOARD(FBOX('justify-content:space-between', [['name'], ['menu']]))), '<code>space-between</code>: first thing left, last thing right.'],
    ['Look at the two boxes. <code>gap</code> puts space <b>between</b> the items, and none on the outside. <code>flex-wrap: wrap;</code> lets items drop to a new line when they do not fit. Without wrap, a flex box squeezes everything onto one line.',
     pic('Two dashed flex boxes. In the first, three items have equal gaps between them. In the second, narrow box, four items wrap: three on the first line and one on a second line.', BOARD('<b>gap</b>' + FBOX('gap:14px;margin-bottom:8px', [['HTML'], ['CSS'], ['Photo']]) + '<b>flex-wrap: wrap;</b>' + `<div style="max-width:210px">${FBOX('gap:6px;flex-wrap:wrap', [['HTML'], ['CSS'], ['Photography'], ['Teamwork']])}</div>`)), '<b>gap</b> is the space between items. <b>wrap</b> lets them drop to a new line.'],
    ['Look at the picture. <code>flex: 1;</code> goes on an <b>item</b>, not on the box. It means: grow to fill the space that is left over. Here the words take everything the picture does not need.',
     pic('A dashed flex box with two items. The first, labelled words flex 1, is wide and fills the leftover space. The second, labelled picture, is only as wide as it needs.', BOARD(FBOX('gap:6px', [['words &#8212; flex: 1;', 'flex:1'], ['picture']]))), '<code>flex: 1;</code> on an item: fill the space that is left.'],
    ['Look at the two rows. <code>flex-direction</code> sets the order. <b>row</b> is what you get without typing it: left to right, in the order of your HTML. <b>row-reverse</b> turns the same row around. Your HTML does not change: only the look does. This is how you will make your zigzag.',
     pic('Two dashed flex boxes. In the first, labelled row, the item words is on the left and picture on the right. In the second, labelled row-reverse, picture is on the left and words on the right.', BOARD('<b>row</b>' + FBOX('gap:6px;margin-bottom:8px', [['words', 'flex:1'], ['picture']]) + '<b>row-reverse</b>' + FBOX('gap:6px;flex-direction:row-reverse', [['words', 'flex:1'], ['picture']]))), '<b>row-reverse</b> turns the row around. Your HTML stays the same.']
  ],
  check: ['I can say which is the flex box and which are the flex items.', 'I know justify-content works along the row and align-items works across it.', 'I can say what gap, flex-wrap and flex: 1 do.', 'I know row-reverse changes the look and not my HTML.'],
  hints: ['Flex seems to do nothing? display: flex goes on the <b>parent</b>: the box around the things you want side by side, not on the things themselves.', 'Only the <b>direct</b> children of a flex box become flex items. Children of those children are not affected.'],
  learn: '<b>Level up:</b> there is also <code>flex-direction: column;</code>, which lines things up from top to bottom. Then justify-content works top to bottom and align-items works left to right: they follow the direction.' });

task({ id: 'cascade-ideas', sec: 5, title: 'Learn which rule wins.', sub: 'Learn three ideas about color and about rules that disagree: hex colors, inheritance and the cascade.',
  why: 'You are about to write two rules that both set the color of your links. You need to know which one the browser obeys, and why.',
  without: 'A color does not change when you expect it to, and you cannot tell why.',
  how: 'CSS stands for Cascading Style Sheets. The cascade is the set of rules the browser uses to choose one value when several rules give different ones.',
  steps: [
    ['Look at the picture. A <b>hex color</b> is a number sign and six characters. They are three pairs: how much <b>red</b>, how much <b>green</b>, how much <b>blue</b>. Each pair goes from 00 (none) to ff (the most). All none is black. All the most is white.',
     cards([['#000000', 'no red, no green, no blue: black'], ['#ffffff', 'all three at the most: white'], ['#f5c84c', 'a lot of red, a lot of green, little blue: gold']]), 'A <b>hex color</b>: three pairs for red, green and blue.'],
    ['Look at the two boxes. <b>Contrast</b> is how far apart two colors are in lightness, from 1 (the same) to 21 (black on white). Body text needs <b>4.5 or more</b>. You measure it with a checker. You never guess, and you never round up.',
     pic('Two boxes. The first has dark gray words on a dark page: contrast 1.6 to 1, hard to read. The second has soft white words on the same dark page: contrast 16.71 to 1, easy to read.', BOARD(`<div style="background:#0b1026;color:#3a4160;padding:8px;border-radius:6px;margin-bottom:6px">Hard to read: 1.6 : 1</div><div style="background:#0b1026;color:#eef1ff;padding:8px;border-radius:6px">Easy to read: ${ratio('#eef1ff', '#0b1026')} : 1</div>`)), '<b>Contrast</b>: body text needs 4.5 : 1 or more.'],
    ['Look at the boxes. Some properties are <b>inherited</b>: a child gets them from its parent. Color and font are inherited. So when you set the color on body, every heading, paragraph and list inside body gets it, with no extra rule. Space and borders are <b>not</b> inherited.',
     pic('A box labelled body, color soft white. Inside it are boxes h1, p and li. An arrow says: they all get the color from body.', BOARD(BX('body { color: #eef1ff; }', `<div style="display:flex;gap:6px;margin-top:4px">${BX('h1')}${BX('p')}${BX('li')}</div><span style="display:block;margin-top:4px">&#8595; all three get the color from body</span>`))), 'Children <b>inherit</b> color and font from their parent.'],
    ['Look at the two rules. Both set the color of a link in your menu. The browser must choose. Rule one of the cascade: <b>the more exact selector wins</b>. <code>nav a</code> (a link inside a nav) is more exact than <code>a</code> (any link). So your menu links are white, and all your other links are gold.',
     shot(demo(['a {', '    color: #f5c84c;', '}', '', 'nav a {', '    color: #ffffff;', '}'], 4, 5), 'sample', { noCursor: true }), 'The <b>more exact</b> selector wins.'],
    ['Look at the two rules. They have the <b>same</b> selector. Rule two of the cascade: when two rules are just as exact, <b>the later one wins</b>. The browser reads your file from top to bottom, and a later line replaces an earlier one. This is why the order of your rules matters.',
     shot(demo(['nav {', '    display: none;', '}', '', 'nav {', '    display: block;', '}'], 4, 5), 'sample', { noCursor: true }), 'Just as exact? The <b>later</b> rule wins.']
  ],
  check: ['I can say what the three pairs in a hex color stand for.', 'I know body text needs a contrast of 4.5 : 1 or more.', 'I know a child inherits color and font from its parent.', 'I can say which rule wins: the more exact one, and if they are equal, the later one.'],
  hints: ['A rule seems to be ignored? Look for another rule lower in the file, or one with a more exact selector, that sets the same property.'],
  learn: '<b>Level up:</b> a class selector, like <code>.label</code>, is more exact than a tag selector, like <code>p</code>. That is why a rule for .label can change a paragraph that another rule already styled.' });

task({ id: 'box-ideas', sec: 5, title: 'Learn the box model.', sub: 'Learn the idea behind all spacing in CSS: every part of a page is a box with four layers.',
  why: 'Margin and padding both make empty space, and they are easy to mix up. The box model tells you which one to use.',
  without: 'You add space, it shows up in the wrong place, and your colors stop where you did not expect.',
  how: 'The browser draws every element as a box, even when you see no edges. From the inside out, a box has its content, its padding, its border and its margin.',
  steps: [
    ['Look at the picture. Every element is a <b>box</b> with four layers. In the middle is the <b>content</b>: your words or your picture. Around it is the <b>padding</b>: empty space inside the box. Then the <b>border</b>: a line around the box. Outside that is the <b>margin</b>: empty space that keeps other boxes away.',
     pic('Four boxes, one inside the other. From the outside in: margin, drawn with a dashed line; border, a solid line; padding, a light area; and content, in the middle.', BOARD(`<div style="border:2px dashed #6b7587;padding:10px"><b>margin</b><div style="border:4px solid #0b3d91;margin-top:4px"><div style="background:#cfe0f5;padding:10px"><b>padding</b><div style="background:#ffffff;border:1px solid #6b7587;padding:6px;margin-top:4px"><b>content</b></div></div></div><span style="display:block;margin-top:4px">the solid line is the <b>border</b></span></div>`)), 'Every element is a box: content, padding, border, margin.'],
    ['Look at the two cards. A <b>background color fills the content and the padding</b>, and stops at the border. Margin is always see-through. So: want space <b>inside</b> the color? Use padding. Want space <b>between</b> this box and the next one? Use margin.',
     cards([['padding', 'space inside the box: the background color fills it'], ['margin', 'space outside the box: always see-through']]), '<b>Padding</b> is inside the color. <b>Margin</b> is outside it.'],
    ['Look at the cards. Spacing values can have one, two or four numbers. <b>One</b> number means all four sides. <b>Two</b> numbers mean: top and bottom, then left and right. <b>Four</b> numbers go around like a clock: top, right, bottom, left.',
     cards([['padding: 16px;', 'all four sides'], ['padding: 12px 16px;', 'top and bottom, then left and right'], ['margin: 0 8px 8px 0;', 'top, right, bottom, left: like a clock']]), 'One number, two numbers or four: which sides they mean.'],
    ['Look at the two units. <b>px</b> (pixels) is a fixed size: 16px is the same on every screen. <b>%</b> (percent) is a share of the box the part is in: 100% is all of it, 45% is a little less than half. Use px for small spaces. Use % when a part must grow and shrink with the screen.',
     cards([['px', 'a fixed size: the same on every screen'], ['%', 'a share of the parent box: changes with the screen'], ['auto', 'let the browser work it out']]), '<b>px</b> is fixed. <b>%</b> is a share of the parent box.'],
    ['Look at the two kinds of box. A <b>block</b> box starts on a new line and fills the whole line: headings, paragraphs, sections, divs. An <b>inline</b> box sits inside a line of text and is only as big as its words: links and icons. The <code>display</code> property changes one into the other.',
     pic('Two examples. A block box: a paragraph that fills the whole line. An inline box: one link, sitting in the middle of a line of text, only as wide as its words.', BOARD(`<div style="border:2px solid #0b3d91;padding:4px;margin-bottom:8px"><b>block:</b> fills the whole line</div><div>words <span style="border:2px solid #0b3d91;padding:0 4px"><b>inline</b></span> more words</div>`)), '<b>Block</b> boxes fill the line. <b>Inline</b> boxes sit in the text.']
  ],
  check: ['I can name the four layers of a box, from the inside out.', 'I know a background color fills the padding and not the margin.', 'I can say what one, two and four spacing numbers mean.', 'I know px is fixed and % is a share of the parent box.'],
  hints: ['Not sure which one to use? Ask: should the background color fill this space? Yes means padding. No means margin.'],
  learn: '<b>Level up:</b> max-width is a limit, not a size. A box with <code>max-width: 1100px;</code> may be narrower than 1100 pixels, and never wider. That one idea is what makes a page fit both a phone and a wide screen.' });

task({ id: 'media-ideas', sec: 6, title: 'Learn how a page changes with the screen.', sub: 'Learn the idea behind a page that fits a phone and a wide screen: start small, then add rules for wide.',
  why: 'People open your page on phones, tablets and wide monitors. One layout cannot fit them all. A media query lets one page have more than one layout.',
  without: 'You pick one layout. It is cramped on a phone, or it wastes most of a wide screen.',
  how: 'This way of working is called mobile first. The rules you have typed so far are for the smallest screen, and they work everywhere. A media query then adds rules that work only when the screen is wide enough.',
  steps: [
    ['Look at the two pages. They are the <b>same</b> HTML file and the <b>same</b> CSS file. On a phone, everything is in one column. On a wide screen, things sit side by side. A page that changes shape like this is called <b>responsive</b>.',
     os => pic('The same page twice. On the left, at phone width: one column. On the right, at full width: the name and links in a row, and the parts side by side.', `<div class="sc-board" style="align-items:flex-start">${mock(4, true)}</div>`), 'One page, two shapes: that is a <b>responsive</b> page.'],
    ['Look at the picture of code. A <b>media query</b> is a group of rules with a test in front of it. The test here is <code>(min-width: 800px)</code>: the screen is 800 pixels wide <b>or more</b>. The rules between its braces work only when the test is true. On a phone the browser skips them.',
     shot(demo(['@media (min-width: 800px) {', '    nav ul {', '        display: flex;', '    }', '}'], 0, 0), 'sample', { noCursor: true }), 'A <b>media query</b>: rules that work only when the test is true.'],
    ['Look at the cards. This is <b>mobile first</b>. The rules <b>outside</b> the media query are for every screen, and you write them for the phone. The rules <b>inside</b> it add to them, or change them, for wide screens. The number 800 is called the <b>breakpoint</b>: the width where the layout changes.',
     cards([['Outside @media', 'every screen: written for the phone'], ['Inside @media', 'wide screens only: adds or changes'], ['Breakpoint', '800px: where the layout changes']]), '<b>Mobile first</b>: phone rules outside, wide rules inside.'],
    ['Look at where the media query sits: at the <b>bottom</b> of your CSS file. You learned why: when two rules are just as exact, the later one wins. The wide-screen rules must come after the phone rules, so that they can change them. That is why you always add new phone rules <b>above</b> the media query.',
     shot(demo(['nav {', '    display: none;', '}', '', '@media (min-width: 800px) {', '    nav {', '        display: block;', '    }', '}'], 4, 0), 'sample', { noCursor: true }), 'The media query goes at the <b>bottom</b>, so its rules win.']
  ],
  check: ['I can say what responsive means.', 'I can read <code>(min-width: 800px)</code> out loud: the screen is 800 pixels wide or more.', 'I know which rules are for every screen and which are for wide screens only.', 'I can say why the media query is at the bottom of the file.'],
  hints: ['min-width sounds backwards? Read it as: at least this wide. The rules inside work on screens that are at least 800 pixels wide.'],
  learn: '<b>Level up:</b> the line <code>&lt;meta name="viewport" ...&gt;</code> in your head is what makes this work on a real phone. Without it, a phone pretends to be a wide screen and shows a tiny copy of the wide layout.' });

task({ id: 'js-ideas', sec: 7, title: 'Learn what JavaScript does on your page.', sub: 'Learn the three moves behind almost every script: find a thing, wait for something to happen, change a class.',
  why: 'HTML and CSS are fixed once the page has loaded. JavaScript is the only one of the three that can change the page while a person is using it.',
  without: 'Your hamburger button looks right and does nothing when it is clicked.',
  how: 'Your script is nine lines, and it makes three moves. It does not hide or show anything itself: it only adds and removes one class, and the CSS you already typed does the rest.',
  steps: [
    ['Look at the three cards. Each language has one job. HTML says what each part <b>is</b>. CSS says how it <b>looks</b>. JavaScript says what <b>happens</b> when a person does something.',
     cards([['HTML', 'what it is: a button, a menu'], ['CSS', 'how it looks: hidden, or shown'], ['JavaScript', 'what happens: on a click, switch']]), 'HTML: what it is. CSS: how it looks. JavaScript: what happens.'],
    ['Look at move one: <b>find</b>. JavaScript cannot change a thing it has not found. <code>document.querySelector</code> looks through your page for the first thing that matches a selector: the same kind of selector you use in CSS. Then you give what it found a <b>name</b>, so the next lines can use it.',
     shot(demo(['const button = document.querySelector("button");'], 0, 0), 'sample', { noCursor: true }), 'Move one: <b>find</b> a thing and give it a name.'],
    ['Look at move two: <b>wait</b>. Something a person does is called an <b>event</b>: a click, a key press, a scroll. A <b>listener</b> waits for one event on one thing. The lines between its curly braces run every time the event happens, and not before.',
     shot(demo(['button.addEventListener("click", function () {', '    ', '});'], 1, 4), 'sample', { noCursor: true }), 'Move two: <b>wait</b> for an event, like a click.'],
    ['Look at move three: <b>change a class</b>. <b>toggle</b> is a switch: it adds the class open when it is missing, and removes it when it is there. Your CSS already says that a nav <b>with</b> the class open is shown and a nav <b>without</b> it is hidden. So one small switch in JavaScript opens and closes the whole menu.',
     cards([['nav has the class open', 'the rule nav.open shows it: display: block'], ['nav has no class open', 'the rule nav hides it: display: none']]), 'Move three: <b>switch a class</b>, and let your CSS do the rest.']
  ],
  check: ['I can say the one job of each language.', 'I can name the three moves: find, wait, change a class.', 'I can say what an event is and give an example.', 'I know JavaScript only switches the class, and my CSS does the showing and hiding.'],
  hints: ['Why not hide the menu from JavaScript directly? Keeping the look in CSS means there is one place to change how the open menu looks, and your media query can still overrule it on wide screens.'],
  learn: '<b>Level up:</b> the same three moves build a dark-mode switch, an image gallery and a pop-up message. Only the thing you find, the event you wait for and the class you switch are different.' });

{ const order = ['make-folders', 'pick-picture', 'copy-picture-1', 'copy-picture-2', 'copy-picture-3']; let at = T.findIndex(t => t.id === 'make-folder');
  order.forEach(id => { const k = T.findIndex(t => t.id === id); if (k < 0) throw new Error('no task ' + id); const t = T.splice(k, 1)[0]; at = T.findIndex(x => x.id === (order[order.indexOf(id) - 1] || 'make-folder')); T.splice(at + 1, 0, t); }); }
[['html-ideas', 'skeleton'], ['flex-ideas', 'css-nav'], ['cascade-ideas', 'css-colors'], ['box-ideas', 'css-space'], ['media-ideas', 'css-wide'], ['js-ideas', 'menu-js']].forEach(m => {
  const k = T.findIndex(t => t.id === m[0]); if (k < 0) throw new Error('no task ' + m[0]); const t = T.splice(k, 1)[0]; const at = T.findIndex(x => x.id === m[1]); if (at < 0) throw new Error('no task ' + m[1]); T.splice(at, 0, t); });
const TASKS = T.map(t => {
  const out = { id: t.id, sec: t.sec, page: 'index.html', nowork: true, title: t.title, sub: t.sub, why: t.why };
  if (t.file) out.file = t.file;
  if (t.optional) { out.optional = true; if (t.only) out.only = t.only; }
  ['win', 'mac'].forEach(os => {
    const steps = val(t.steps, os).map(s => [val(s[0], os), val(s[1], os), val(s[2], os)]);
    steps.forEach((s, i) => { if (!s[1] || !s[1].html || !s[1].alt) throw new Error(t.id + ' step ' + (i + 1) + ' has no drawing or no alt text'); });
    out[os === 'mac' ? 'vsMac' : 'vsWin'] = steps.map(s => s[0]);
    out[os === 'mac' ? 'shotsMac' : 'shots'] = steps.map(s => sc(s[1], s[2] || capOf(s[0])));
    out[os === 'mac' ? 'hintsMac' : 'hints'] = t.hints.map(h => val(h, os));
  });
  if (t.ex) out.ex = t.ex;
  out.selfcheck = t.check;
  out.more = '<b>Without it:</b> ' + esc(t.without) + ' <b>How it works:</b> ' + esc(t.how);
  out.learnText = t.learn;
  return out;
});
const ids = TASKS.map(t => t.id); if (new Set(ids).size !== ids.length) throw new Error('two tasks share an id');
const LEARN = {}; TASKS.forEach(t => { LEARN[t.id] = '<p>' + t.learnText + '</p>'; delete t.learnText; });

/* curly apostrophes for readers; everything outside ASCII is written as a \u escape so the file stays ASCII */
const curl = s => s.replace(/(\w)'(\w)/g, '$1\u2019$2');
const safe = o2 => curl(JSON.stringify(o2)).replace(/[\u0080-\uffff]/g, ch => '\\u' + ('000' + ch.charCodeAt(0).toString(16)).slice(-4));
const js = '/* GENERATED by _build/make_tasks.js. Do not edit: change that file and run it again. */\n' +
  'var SECTIONS = ' + safe(SECTIONS) + ';\nvar PAGE_NAMES = {"index.html":"Make an About Page"};\nvar FINAL_PAGE = "";\nvar TASKS = ' + safe(TASKS) + ';\nwindow.LEARN = ' + safe(LEARN) + ';\n';
if (/\u203a|&#8250;|&rsaquo;/.test(js) || /@(?!([a-z0-9-]+\.)*example\.(com|net|org))[a-z0-9-]+\.[a-z]/i.test(js)) throw new Error('an arrow glyph or an email address got in');
if (/\b(19|20)\d\d\b/.test(plain(js))) throw new Error('a year got in');
fs.writeFileSync(path.join(ROOT, 'studio', 'tasks.js'), js);

/* the page: studio/index.html with its paths pointed at studio/ */
const V = Date.now().toString(36);
let page = fs.readFileSync(path.join(ROOT, 'studio', 'index.html'), 'utf8');
['studio.css', 'template-data.js', 'tasks.js', 'patch.js', 'app.js'].forEach(f => { page = page.replace(new RegExp('(href|src)="' + f.replace('.', '\\.') + '"'), '$1="studio/' + f + '?v=' + V + '"'); });
page = page.split('src="../images/').join('src="images/').replace("window.LW_ROOT = '../';", "window.LW_ROOT = '';");
if (page.indexOf("window.LW_ROOT = ''") < 0) throw new Error('could not set LW_ROOT');
fs.writeFileSync(path.join(ROOT, 'index.html'), page);

/* the example: the site you get by following only the steps */
const EX = path.join(ROOT, 'example', FOLDER);
fs.mkdirSync(path.join(EX, 'css'), { recursive: true });
fs.writeFileSync(path.join(EX, FILE), htmlEd.text() + '\n');
fs.writeFileSync(path.join(EX, 'css', CSSFILE), cssEd.text() + '\n');
fs.mkdirSync(path.join(EX, 'js'), { recursive: true });
fs.mkdirSync(path.join(EX, 'images'), { recursive: true });
PICS.forEach(P => fs.copyFileSync(path.join(__dirname, 'example-pictures', P.pic), path.join(EX, 'images', P.pic)));
OTHERS.forEach(n => fs.writeFileSync(path.join(EX, n), ''));   /* the other pages: empty, as in the tutorial */
fs.writeFileSync(path.join(EX, 'js', JSFILE), jsEd.text() + '\n');
/* grade the example the way the tasks ask */
(() => {
  const s = noComments(HTML8), css = CSS8, n = re => (s.match(re) || []).length;
  const need = (ok, what) => { if (!ok) throw new Error('example: ' + what); };
  need(/^<!DOCTYPE html>\n<html lang="en">/.test(s), 'no doctype or lang');
  need(/<meta name="viewport"/.test(s) && /<link rel="stylesheet" href="css\/style\.css">/.test(s), 'no viewport line or no stylesheet link');
  need(n(/<h1>/g) === 1 && n(/<h2>/g) === 4 && n(/class="logo"/g) === 1 && n(/<span>/g) === 1 && n(/<strong>/g) === 3 && n(/class="button( ghost)?"/g) === 4 && n(/<section /g) === 3 && n(/class="label"/g) === 4 && n(/<blockquote>/g) === 2, 'wrong number of headings');
  need(n(/<li>/g) === 12, 'the menu does not have five links, or the timeline and the skills do not have their items');
  need(/href="gallery\.html">See my gallery/.test(s) && /href="contact\.html">Send me a message/.test(s) && /id="story"/.test(s) && !/mailto:/.test(s), 'the call to action is wrong, or an email address is on the page');
  (s.match(/href="([a-z]+\.html)"/g) || []).forEach(h => { const f = /"(.+)"/.exec(h)[1]; need(f === FILE || OTHERS.indexOf(f) >= 0, 'the link ' + f + ' has no file'); });
  (s.match(/href="#([a-z]+)"/g) || []).forEach(h => { const id = /#([a-z]+)/.exec(h)[1]; need(id === 'top' || s.indexOf('id="' + id + '"') > 0, 'the link #' + id + ' has no matching id'); });
  need(/<header>[\s\S]*<nav>[\s\S]*<\/nav>\s*<\/header>\s*<main>[\s\S]*<h1>[\s\S]*<\/main>\s*<footer>[\s\S]*<\/footer>\s*<script[^>]*><\/script>\s*<\/body>/.test(s), 'header, nav, main and footer are not in order');
  ['header', 'nav', 'main', 'footer', 'section', 'div', 'button', 'script', 'ol', 'blockquote', 'h1', 'h2', 'p', 'ul', 'li', 'a', 'span', 'strong', 'title', 'head', 'body', 'html'].forEach(g => need(n(new RegExp('<' + g + '[ >]', 'g')) === n(new RegExp('</' + g + '>', 'g')), g + ' beginning and ending tags do not match'));
  need((css.match(/\{/g) || []).length === (css.match(/\}/g) || []).length, 'CSS braces do not match');
  css.split('\n').forEach((l, k) => need(!l.trim() || /^\s*\/\*.*\*\/$/.test(l) || /^\s*([a-z-]+: [^;{}]+;|[a-z0-9 ,.@():-]+ \{|\})$/.test(l), 'CSS line ' + (k + 1) + ' is not a rule, a declaration or a brace: ' + l));
  need(/<button aria-label="Menu" aria-expanded="false">&#9776;<\/button>/.test(s) && /<script src="js\/menu\.js"><\/script>\s*<\/body>/.test(s), 'no hamburger button or no script line at the end of body');
  const ims = s.match(/<img src="(images\/[a-z0-9_-]+\.(?:jpg|png))" alt="([^"]+)">/g) || [];
  need(ims.length === 3 && !/<\/img>/.test(s), 'there are not three img tags');
  ims.forEach(t => { const im = /src="([^"]+)" alt="([^"]+)"/.exec(t); need(fs.existsSync(path.join(EX, im[1])) && im[2].split(' ').length >= 4 && !/\.(jpg|png)|^(image|picture|photo)\b/i.test(im[2]), 'an img file or its alt text is wrong: ' + t); });
  new Function('document', jsEd.text());   /* the script must at least be valid JavaScript */
  need(/@media \(min-width: 800px\)/.test(css) && /display: flex/.test(css), 'no media query or no flex');
})();

/* the finished files, with the extra parts: tags and braces must still match */
(() => { const s = htmlEd.text(), css = cssEd.text();
  ['div', 'section', 'p', 'h2', 'ul', 'ol', 'li', 'a', 'i', 'blockquote', 'main', 'script'].forEach(g => { const o1 = (s.match(new RegExp('<' + g + '[ >]', 'g')) || []).length, c1 = (s.match(new RegExp('</' + g + '>', 'g')) || []).length; if (o1 !== c1) throw new Error('finished page: ' + g + ' beginning and ending tags do not match'); });
  if ((css.match(/\{/g) || []).length !== (css.match(/\}/g) || []).length) throw new Error('finished CSS: braces do not match'); })();

/* every text file in this folder must be ASCII, with no arrow glyph */
(function walk(dir) { fs.readdirSync(dir, { withFileTypes: true }).forEach(e => { const p = path.join(dir, e.name);
  if (e.isDirectory()) return walk(p);
  if (!/\.(js|html|css|txt|md)$/.test(e.name)) return;
  const s = fs.readFileSync(p, 'utf8'), bad = /[^\x00-\x7f]/.exec(s);
  if (bad) throw new Error(path.relative(ROOT, p) + ' is not ASCII: found ' + JSON.stringify(bad[0]) + ' at ' + bad.index); }); })(ROOT);
const nSteps = TASKS.reduce((n, t) => n + t.vsWin.length, 0);
console.log('wrote studio/tasks.js, index.html and example/' + FOLDER + ':', TASKS.length, 'tasks,', nSteps, 'steps, a drawing for each. The code steps make HTML_FINAL (' + htmlEd.L.length + ' lines), CSS_FINAL (' + cssEd.L.length + ' lines) and JS_FINAL (' + jsEd.L.length + ' lines). Contrast ' + R1 + ', ' + R2 + ', ' + R3 + ' and ' + R4 + ' : 1.');
if (process.env.REC_OUT) fs.writeFileSync(process.env.REC_OUT, JSON.stringify(REC));
