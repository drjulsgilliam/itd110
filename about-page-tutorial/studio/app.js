/* Make an About Page (built on the Living Web studio engine) \u2014 the app. Content lives in tasks.js; Patch (nano feedback) in patch.js. */
(function(){
'use strict';
var $ = function(s, r){ return (r || document).querySelector(s); };
var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var ROOT = window.LW_ROOT == null ? '../' : window.LW_ROOT;   /* the top of the site, from this page */
var TPL_BASE = new URL(ROOT + 'starter-template/', location.href).href;
var KEY = 'about-page-tutorial-v1';

/* ---------------- state (progress lives in this browser) ---------------- */
var S = {mode:'here', os:(/Mac|iPhone|iPad/.test(navigator.platform) ? 'mac' : 'win'), task:0, done:{}, files:{}, snap:{},
         level:false, prefs:{size:1, theme:null, calm:false, rate:1}, hint:{}, fb:[], self:{}};
try { var saved = JSON.parse(localStorage.getItem(KEY)); if(saved) S = Object.assign(S, saved); } catch(e){}
/* The tutorial is VS Code only: students work in VS Code and use this page as their instructions. (Edit here is switched off.) */
S.mode = 'vscode';
S.prefs = S.prefs || {}; S.prefs.hideSteps = false;   /* the steps always open when a tutorial loads */
var saveT = null;
/* Keeping work safe: ask the browser not to clear this site's storage, and warn when storage does not work (private windows). */
var CANSAVE = true;
try { localStorage.setItem(KEY + '-test', '1'); localStorage.removeItem(KEY + '-test'); } catch(e){ CANSAVE = false; }
try { if(navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch(e){}
function doneCount(){ return Object.keys(S.done).filter(function(k){ return S.done[k]; }).length; }
function sinceBackup(){ return doneCount() - (S.backupAt || 0); }
function backupLine(){
  if(S.mode !== 'here' || sinceBackup() < 4) return '';
  return '<p class="backupline"><i class="ph ph-shield-check" aria-hidden="true"></i> <b>Keep a backup.</b> You have finished ' + sinceBackup() + ' steps since your last download. If this browser\u2019s history is cleared, edits kept here are lost. <button type="button" class="pill sm" data-backup>Download a backup</button></p>';
}
function save(){ clearTimeout(saveT); saveT = setTimeout(function(){
  /* a separate tutorial page counts its own steps, but saves the place in the whole list, so every page reads it the same way */
  try { localStorage.setItem(KEY, JSON.stringify(PART ? Object.assign({}, S, {task:ALL_TASKS.indexOf(task())}) : S)); note('saved'); }
  catch(e){ note('full'); } }, 250); }
function note(kind){
  var n = $('#savedNote');
  if(kind === 'full') n.innerHTML = '<i class="ph-fill ph-warning" aria-hidden="true"></i> <b>This browser\u2019s storage is full.</b> Press Download my files now.';
  else if(!CANSAVE) n.innerHTML = '<i class="ph-fill ph-warning" aria-hidden="true"></i> <b>This browser is not saving</b> (a private window?). Download your files before you close it.';
  else n.innerHTML = '<i class="ph-fill ph-check-circle" aria-hidden="true"></i> <b>Progress saved on this device</b>';
}
function toast(msg){ var t = $('#toast'); t.innerHTML = msg; t.classList.add('on'); clearTimeout(toast._t); toast._t = setTimeout(function(){ t.classList.remove('on'); }, 3200); }
function isChrome(){ var b = navigator.userAgentData && navigator.userAgentData.brands; return b ? b.some(function(x){ return /Google Chrome/.test(x.brand); }) : (/Chrome\//.test(navigator.userAgent) && !/Edg\/|OPR\//.test(navigator.userAgent) && !!window.chrome); }
function isBonus(t){ return !!(SECTIONS[t.sec - 1] || {}).bonus; }
if(window.WORLD_TASKS && !TASKS.some(isBonus)) WORLD_TASKS.forEach(function(t){ TASKS.push(t); });
if(S.task >= TASKS.length) S.task = 0;
/* Separate tutorials: build_page.py sets LW_PART on each one. The page keeps only its own steps.
   Steps from another part never lock anything here, because missing() only counts steps on this page. */
var PART = window.LW_PART || null, ALL_TASKS = TASKS.slice();
if(PART){
  var wasOn = ALL_TASKS[S.task];
  TASKS = ALL_TASKS.filter(function(t){ return PART.ids ? PART.ids.indexOf(t.id) >= 0 : PART.secs.indexOf(t.sec) >= 0; });
  S.task = TASKS.indexOf(wasOn);
  if(S.task < 0) S.task = Math.max(0, TASKS.findIndex(function(t){ return !S.done[t.id] && !t.optional; }));
  var linked = TASKS.findIndex(function(t){ return '#' + t.id === location.hash; }); if(linked >= 0) S.task = linked;   /* a link can open one step */
  if(PART.secs.indexOf(8) >= 0) S.bonus = 'yes';   /* opening the bonus page is the choice */
}
TASKS.forEach(function(t){ (t.checks || []).forEach(function(c){
  if(typeof c.re === 'string') c.re = new RegExp(c.re, 'i'); if(typeof c.raw === 'string') c.raw = new RegExp(c.raw, 'i'); }); });
/* the template preview can be minimized; the choice is remembered */
function paintBefore(){ var b = $('#beforeToggle'); if(!b) return;
  /* the template view is opened from the menu (View the template); Hide closes it */
  var on = !!S.prefs.showTpl && !task().nowork && S.mode === 'vscode';
  $('#beforePanel').hidden = !on; $('#beforeBody').hidden = false; $('#beforeSeg').hidden = false; b.textContent = 'Hide';
  $$('.jtpl').forEach(function(x){ x.setAttribute('aria-pressed', String(on)); x.querySelector('.jtl').textContent = on ? 'Hide the template' : 'View the template'; }); }
function task(){ return TASKS[Math.max(0, Math.min(TASKS.length - 1, S.task))]; }
/* a task is locked until the tasks it needs are done (and the bonus until the learner chooses it) */
function missing(t){ return (t.needs || []).filter(function(id){ return !S.done[id]; }).map(function(id){ return TASKS.filter(function(x){ return x.id === id; })[0]; }).filter(Boolean); }
function locked(t){ return missing(t).length > 0 || (isBonus(t) && S.bonus !== 'yes'); }
function folderOf(t){ var s = SECTIONS[t.sec - 1] || {}; return s.folder || 'first_web_page'; }
function howOf(t){ var h = window.STEP_HOW || {}; return h[t.id + '@' + S.os] || h[t.id]; }
function shotsOf(t){ return (S.os === 'mac' && t.shotsMac) || t.shots; }   /* a code picture or a drawing for each step */
function stepsOf(t){
  var os = S.os === 'mac' ? 'Mac' : 'Win', key = S.mode === 'here' ? 'here' : 'vs';
  return t[key + os] || t[key] || [];
}
function hasOsSteps(t){ var key = S.mode === 'here' ? 'here' : 'vs'; return !!(t[key + 'Mac'] || t[key + 'Win']); }
function mod(s){ return String(s).replace(/\{mod\}/g, S.os === 'mac' ? 'Command' : 'Ctrl').replace(/\{root\}/g, ROOT); }
function findTxt(t){ return /^\s*</.test(t.find) ? t.find : strip(t.find); }
function strip(h){ var d = document.createElement('div'); d.innerHTML = h; return d.textContent.replace(/\s+/g, ' ').trim(); }
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

/* ---------------- the template files ---------------- */
var TPL = {}, FILE_LIST = [];
function cur(path){ return Object.prototype.hasOwnProperty.call(S.files, path) ? S.files[path] : TPL[path]; }
function ensureNewFile(t){ if(t.newFile && !Object.prototype.hasOwnProperty.call(S.files, t.newFile)){ S.files[t.newFile] = ''; save(); } }
function loadTemplate(){
  /* The template is built into template-data.js, so Edit here works from a file:// page too. */
  if(window.TPL_DATA){
    FILE_LIST = TPL_DATA.files.slice();
    Object.keys(TPL_DATA.text).forEach(function(p){ TPL[p] = TPL_DATA.text[p]; });
    return Promise.resolve();
  }
  return fetch(ROOT + 'studio/template-files.json').then(function(r){ return r.json(); }).then(function(list){
    FILE_LIST = list;
    var text = list.filter(function(p){ return /\.(html|css)$/.test(p); });
    return Promise.all(text.map(function(p){ return fetch(TPL_BASE + p).then(function(r){ if(!r.ok) throw new Error(p); return r.text(); }).then(function(t){ TPL[p] = t; }); }));
  });
}

/* ---------------- media the learner adds (kept in this browser, IndexedDB) ---------------- */
var DB = null, MEDIA = {}, URLS = {};
function dbOpen(){ return new Promise(function(res){
  try { var rq = indexedDB.open('ite152-studio-media', 1);
    rq.onupgradeneeded = function(){ rq.result.createObjectStore('files'); };
    rq.onsuccess = function(){ DB = rq.result; res(); }; rq.onerror = function(){ res(); };
  } catch(e){ res(); } }); }
function dbAll(){ return new Promise(function(res){
  if(!DB) return res();
  var tx = DB.transaction('files'), st = tx.objectStore('files'), rq = st.openCursor();
  rq.onsuccess = function(){ var c = rq.result; if(c){ MEDIA[c.key] = c.value; c.continue(); } else res(); };
  rq.onerror = function(){ res(); }; }); }
function dbPut(path, blob){ MEDIA[path] = blob; if(URLS[path]){ URL.revokeObjectURL(URLS[path]); delete URLS[path]; }
  if(!DB) return Promise.resolve();
  return new Promise(function(res){ var tx = DB.transaction('files', 'readwrite'); tx.objectStore('files').put(blob, path); tx.oncomplete = res; tx.onerror = res; }); }
function mediaURL(path){ if(!MEDIA[path]) return null; if(!URLS[path]) URLS[path] = URL.createObjectURL(MEDIA[path]); return URLS[path]; }

/* ---------------- editor ---------------- */
var cm = null, openPath = null, findMark = null;
function tabsFor(t){
  if(t.id === 'titles') return ['index.html','about.html','projects.html','multimedia.html','contact.html'];
  if(t.id === 'page-heroes') return ['about.html','projects.html','multimedia.html','contact.html'];
  if(t.id === 'other-pages-style') return ['css/about.css','about.html','css/projects.css','projects.html','css/multimedia.css','multimedia.html','css/contact.css','contact.html'];
  var page = t.page, css = 'css/' + page.replace('.html', '.css');
  var list = [t.file || page];
  if(t.newFile && list.indexOf(t.newFile) < 0) list.unshift(t.newFile); if(list.indexOf(page) < 0) list.push(page); if(list.indexOf(css) < 0) list.push(css);
  return list;
}
function makeEditor(){
  cm = CodeMirror($('#editor'), {lineNumbers:true, lineWrapping:true, tabSize:2, indentWithTabs:false,
    screenReaderLabel:'Your code', extraKeys:{'Ctrl-F':function(){ findIt(); }, 'Cmd-F':function(){ findIt(); }, 'Tab':false, 'Shift-Tab':false}});
  cm.on('change', function(_, ch){
    if(!openPath) return;
    var v = cm.getValue();
    if(v === TPL[openPath] && TPL[openPath] != null) delete S.files[openPath]; else S.files[openPath] = v;
    if(ch.origin === 'paste') Patch.signal('paste'); else if(ch.origin === '+input' || ch.origin === '+delete') Patch.signal('type');
    if(findMark){ findMark.clear(); findMark = null; }
    save(); schedulePreview();
  });
}
function openFile(path){
  openPath = path;
  cm.setOption('mode', /\.css$/.test(path) ? 'css' : /\.txt$/.test(path) ? 'text/plain' : 'htmlmixed');
  cm.setValue(cur(path) || ''); cm.clearHistory();
  $$('#fileTabs button').forEach(function(b){ b.setAttribute('aria-selected', String(b.dataset.path === path)); });
}
var extraPage = null;   /* a page opened from the Pages bar that this task does not use */
function renderTabs(t, keep){
  var box = $('#fileTabs'); box.innerHTML = '';
  var list = tabsFor(t).slice();
  if(extraPage && list.indexOf(extraPage) < 0){ list.push(extraPage); var css = 'css/' + extraPage.replace('.html', '.css'); if(list.indexOf(css) < 0) list.push(css); }
  list.forEach(function(p){
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role','tab'); b.dataset.path = p;
    b.innerHTML = '<i class="ph ' + (/\.css$/.test(p) ? 'ph-hash' : 'ph-file-html') + '" aria-hidden="true"></i>' + p;
    b.addEventListener('click', function(){ openFile(p); if(/\.html$/.test(p)){ previewPage = p; runPreview(); paintPages(); } });
    box.appendChild(b);
  });
  openFile(keep && list.indexOf(keep) >= 0 ? keep : list[0]);
}
/* Pages bar: open any page in Your code and Your preview */
function openPage(page){
  var t = task();
  extraPage = tabsFor(t).indexOf(page) >= 0 ? null : page;
  renderTabs(t, page);
  previewPage = page; runPreview(); paintPages();
  if(S.view === 'code' || S.view === 'prev'){ /* keep their view */ }
  toast('Showing <b>' + (PAGE_NAMES[page] || page) + '</b> in Your code and Your preview.' + (page !== t.page ? ' This task is on the ' + (PAGE_NAMES[t.page] || t.page) + '.' : ''));
}
function paintPages(){ if(typeof renderJourney === 'function' && $('#journeyList')) renderJourney(); $$('[data-page]').forEach(function(b){ var on = b.dataset.page === previewPage; b.setAttribute('aria-pressed', String(on)); if(on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); }); }
function variants(s){
  var v = [s, s.replace(/&amp;/g, '&'), s.replace(/&/g, '&amp;'), s.replace(/'/g, '&#39;'), s.replace(/'/g, '\u2019')];
  return v.filter(function(x, i){ return v.indexOf(x) === i; });
}
/* open the editor at the spot this task is about (softly marked, nothing selected) */
function showSpot(t){
  if(!t.find || !cm) return;
  var text = cm.getValue(), hit = variants(t.find).filter(function(v){ return text.indexOf(v) >= 0; })[0];
  if(!hit) return;
  var c = cm.getSearchCursor(hit);
  if(c.findNext()){ if(findMark) findMark.clear(); findMark = cm.markText(c.from(), c.to(), {className:'cm-findhl'});
    cm.scrollIntoView({from:c.from(), to:c.to()}, 140); cm.setCursor(c.from()); }
}
function findIt(){
  var t = task(); if(!t.find){ toast('Nothing to find on this one. Follow the steps above.'); return; }
  var paths = [openPath].concat(tabsFor(t).filter(function(p){ return p !== openPath; }));
  for(var i = 0; i < paths.length; i++){
    var text = cur(paths[i]) || '';
    var hit = variants(t.find).filter(function(v){ return text.indexOf(v) >= 0; })[0];
    if(hit){
      if(paths[i] !== openPath) openFile(paths[i]);
      var c = cm.getSearchCursor(hit);
      if(c.findNext()){
        if(findMark) findMark.clear();
        findMark = cm.markText(c.from(), c.to(), {className:'cm-findhl'});
        cm.setSelection(c.from(), c.to()); cm.scrollIntoView({from:c.from(), to:c.to()}, 120); cm.focus();
        showPane('code'); if(S.view === 'prev'){ S.view = 'both'; save(); applyView(); }
        return;
      }
    }
  }
  toast('I can\u2019t find <b>' + esc(t.find) + '</b> any more. You may have already changed it. Tick the boxes when you\u2019re done.');
}

/* ---------------- preview ---------------- */
var previewPage = 'index.html', prevT = null;
function schedulePreview(){ clearTimeout(prevT); prevT = setTimeout(runPreview, 700); }
function runPreview(){
  if(S.mode !== 'here') return;
  drawPage(cur, previewPage, $('#preview'));
}
/* draw a page into an iframe; get(path) gives the text of each file (the learner's files, or the template) */
function drawPage(get, page, fr){
  var html = get(page); if(!html) return;
  var doc = new DOMParser().parseFromString(html, 'text/html');
  $$('link[rel="stylesheet"]', doc).forEach(function(l){
    var href = l.getAttribute('href') || '';
    if(/^css\//.test(href) && get(href) != null){ var st = doc.createElement('style'); st.textContent = get(href); l.replaceWith(st); }
  });
  ['src','poster','data-full','href'].forEach(function(a){
    $$('[' + a + ']', doc).forEach(function(el){
      var v = (el.getAttribute(a) || '').split('#')[0];
      if(!v || /^[a-z]+:/i.test(v)) return;
      var u = get === cur ? mediaURL(v) : null; if(u){ el.setAttribute(a, u); return; }
      /* a song or video the learner has not added yet: leave the player empty instead of showing an error */
      if(a === 'src' && /^(VIDEO|AUDIO|SOURCE)$/.test(el.tagName) && FILE_LIST.indexOf(v) < 0) el.removeAttribute('src');
    });
  });
  var base = doc.createElement('base'); base.href = TPL_BASE; doc.head.insertBefore(base, doc.head.firstChild);
  var sc = doc.createElement('script');
  sc.textContent = "document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a');if(!a)return;var h=a.getAttribute('href')||'';" +
    "if(/^(index|about|projects|multimedia|contact)\\.html/.test(h)){e.preventDefault();parent.postMessage({lwNav:h.split('#')[0]},'*');}" +
    "else if(h.charAt(0)==='#'){e.preventDefault();var t=document.querySelector(h);if(t)t.scrollIntoView();}" +
    "else if(/^https?:/.test(h)){e.preventDefault();window.open(h,'_blank','noopener');}},true);" +
    "document.addEventListener('submit',function(e){e.preventDefault();e.stopImmediatePropagation();alert('In the preview the form does not send. It sends from your live site once it is connected to Formspree.');},true);";
  doc.body.appendChild(sc);
  fr.onload = function(){ focusPreview(fr, page); };
  fr.srcdoc = '<!DOCTYPE html>' + doc.documentElement.outerHTML;
}
function tplGet(p){ return TPL[p]; }
/* Use VS Code: the page as it looks before any change (the template), at the spot this task changes */
function runBefore(){ var t = task(); if(S.mode !== 'vscode' || t.nowork || !S.prefs.showTpl) return; drawPage(tplGet, t.page, $('#beforeFrame')); fitFrame($('#beforeWrap'), $('#beforeFrame'), $('#beforeNote'), S.devB || autoDev()); }
/* the preview is drawn at the device's real width, then scaled to fit the panel */
var DEV_W = {desk:1280, tablet:820, phone:390};
/* until the learner picks a size, start at the size of the screen they are on */
function autoDev(){ var w = window.innerWidth; return w < 700 ? 'phone' : w < 1000 ? 'tablet' : 'desk'; }
function fitFrame(fw, fr, note, dev){
  if(!fw){ fw = $('#frameWrap'); fr = $('#preview'); note = $('#devNote'); dev = S.dev || autoDev(); }
  if(!fw || !fr || fw.offsetParent === null) return;
  var w = DEV_W[dev], avail = fw.clientWidth || w, sc = Math.min(1, avail / w);
  var shown = Math.min(w * sc, avail);
  fr.style.width = w + 'px'; fr.style.height = Math.round(460 / sc) + 'px';
  fr.style.transform = 'scale(' + sc + ')'; fr.style.transformOrigin = 'top left';
  fr.style.left = Math.max(0, Math.round((avail - shown) / 2)) + 'px';
  fw.style.height = '460px';
  note.textContent = (dev === 'phone' ? 'Phone' : dev === 'tablet' ? 'Tablet' : 'Desktop') + ' \u00b7 ' + w + ' pixels wide' + (sc < 1 ? ', shown at ' + Math.round(sc * 100) + '% to fit' : '');
}
window.addEventListener('resize', function(){ clearTimeout(fitFrame._t); fitFrame._t = setTimeout(function(){ fitFrame(); if(S.mode === 'vscode') fitFrame($('#beforeWrap'), $('#beforeFrame'), $('#beforeNote'), S.devB || autoDev()); }, 120); });
/* show the part of the page this task changes, with a soft highlight */
function focusPreview(fr, page){
  var t = task(); if((page || previewPage) !== t.page) return;
  var c = (t.checks || []).filter(function(x){ return x.sel && !x.file; })[0];
  var d = fr.contentDocument; if(!c || !d) return;
  var el = d.querySelector(c.sel); if(!el) return;
  if(el.tagName === 'TITLE') return;
  var box = el.closest('section, header, footer') || el;
  try { box.scrollIntoView({block:'start'}); } catch(e){}
  el.style.outline = '3px solid #e0a800'; el.style.outlineOffset = '4px'; el.style.borderRadius = '4px';
  setTimeout(function(){ try { el.style.outline = ''; } catch(e){} }, 2600);
}
window.addEventListener('message', function(e){ if(e.data && e.data.lwNav && TPL[e.data.lwNav]){ var pg = e.data.lwNav, t = task();
  extraPage = tabsFor(t).indexOf(pg) >= 0 ? null : pg; renderTabs(t, pg); previewPage = pg; runPreview(); paintPages(); } });

/* ---------------- checks: real checks on the learner's code ---------------- */
function parse(html){ return new DOMParser().parseFromString(html || '', 'text/html'); }
function norm(s){ return String(s || '').replace(/\s+/g, ' ').trim(); }
function cssVar(css, name){ var m = new RegExp(name.replace(/[-]/g, '\\-') + '\\s*:\\s*([^;]+);').exec(css || ''); return m ? norm(m[1]) : null; }
function lum(hex){ var m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex || ''); if(!m) return null; var h = m[1]; if(h.length === 3) h = h.replace(/./g, '$&$&');
  return [0,2,4].map(function(i){ var c = parseInt(h.substr(i, 2), 16) / 255; return c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); })
    .reduce(function(a, c, i){ return a + c * [.2126,.7152,.0722][i]; }, 0); }
function ratio(a, b){ var x = lum(a), y = lum(b); if(x == null || y == null) return null; return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }

/* src: where the code comes from. Edit here: the files in this browser. VS Code: only what was pasted. */
function runChecks(t, src){
  var out = [];
  var pageHTML = src.get(t.page), tplDoc = parse(TPL[t.page]);
  var doc = pageHTML != null ? parse(pageHTML) : null;
  (t.checks || []).forEach(function(c){
    var r = {label:c.label, ok:false, msg:''};
    var file = c.file || c.path || t.page;
    var isCss = /\.css$/.test(file);
    var text = src.get(file);
    if(text == null){ r.skip = true; r.msg = 'I can\u2019t check ' + c.label + ' yet: paste <b>' + file + '</b> to let me see it.'; out.push(r); return; }
    var d = isCss ? null : (file === t.page ? doc : parse(text));
    if(c.t === 'text'){
      var el = $(c.sel, d), tp = $(c.sel, tplDoc);
      if(!el){ r.msg = 'I can\u2019t find ' + c.label + '. A tag may have been deleted: press <b>Undo</b> or <b>Reset step</b>.'; }
      else if(!norm(el.textContent)){ r.msg = c.label.charAt(0).toUpperCase() + c.label.slice(1) + ' is empty. Type your own words between the tags.'; }
      else if(tp && norm(el.textContent) === norm(tp.textContent)){ r.msg = c.label.charAt(0).toUpperCase() + c.label.slice(1) + ' still has the template\u2019s words. Change them to yours.'; }
      else { r.ok = true; r.msg = c.label.charAt(0).toUpperCase() + c.label.slice(1) + ' is in your own words.'; }
    } else if(c.t === 'gone'){
      var hay = c.raw ? text : (c.flat ? norm(d.body.textContent).replace(/\s/g, '') : norm(d.body ? d.body.textContent : text) + ' ' + norm(d.title));
      var needle = c.flat ? c.text.replace(/\s/g, '') : (c.raw ? c.text : norm(strip(c.text)));
      r.ok = hay.indexOf(needle) < 0;
      r.msg = r.ok ? strip(c.label).replace(/^./, function(x){ return x.toUpperCase(); }) + ' is gone.' : '<b>' + esc(strip(c.text)) + '</b> is still on the page. Replace it with your own words.';
    } else if(c.t === 'count'){
      var n = $$(c.sel, d).length; r.ok = n === c.n;
      r.msg = r.ok ? 'You have ' + c.label + ', as there should be.' : 'I found ' + n + ' where there should be ' + c.n + ' (' + c.label + '). Did the old one stay as well? Delete the extra.';
    } else if(c.t === 'has'){
      r.ok = c.raw ? c.raw.test(text) : !!$(c.sel, d);
      r.msg = r.ok ? 'I can see ' + c.label + '.' : 'I can\u2019t find ' + c.label + '. Look at the example.';
    } else if(c.t === 'attr' || c.t === 'src'){
      var e2 = $(c.sel, d), attr = c.attr || 'src', v = e2 ? (e2.getAttribute(attr) || '') : null;
      if(v == null){ r.msg = 'I can\u2019t find ' + c.label + '. A tag may have been deleted.'; }
      else { r.ok = c.re.test(v); r.msg = r.ok ? strip(c.label).replace(/^./, function(x){ return x.toUpperCase(); }) + ': done.' : 'Not yet: ' + c.label + '. Right now <code>' + attr + '</code> says <code>' + esc(v.length > 60 ? v.slice(0, 57) + '\u2026' : v) + '</code>.'; }
    } else if(c.t === 'alt'){
      var e3 = $(c.sel, d), a = e3 ? norm(e3.getAttribute('alt')) : '';
      r.ok = a.length >= 5 && !/placeholder/i.test(a) && !(e3 && e3.getAttribute('aria-hidden') === 'true');
      r.msg = r.ok ? 'Good alt text: \u201c' + esc(a) + '\u201d.' :
        (a.length >= 5 && e3 && e3.getAttribute('aria-hidden') === 'true') ? 'Good alt text, but the tag still has <code>aria-hidden="true"</code>, which hides it from screen readers. Delete that part.' :
        'Describe the picture in <code>alt</code>: what someone would see, in a few words.';
    } else if(c.t === 'fileHas'){
      var ft = norm(src.get(c.path) || '');
      r.ok = ft.length >= (c.min || 1); r.msg = r.ok ? strip(c.label).replace(/^./, function(x){ return x.toUpperCase(); }) + ' is written.' : 'Write ' + c.label + ' in <b>' + c.path + '</b>: a few sentences.';
    } else if(c.t === 'altAll'){
      /* every picture the learner put in (src starts with images/) needs real alt text */
      var mine = $$('img', d).filter(function(i){ var sr = i.getAttribute('src') || ''; return /^images\//i.test(sr) && FILE_LIST.indexOf(sr) < 0; });
      var bad = mine.filter(function(i){ var a = norm(i.getAttribute('alt')); return a.length < 5 || /placeholder|^image \d|^photo$|^picture$/i.test(a) || i.getAttribute('aria-hidden') === 'true'; });
      if(!mine.length){ r.ok = true; r.msg = 'No pictures of yours on this page yet.'; r.quiet = true; }
      else if(!bad.length){ r.ok = true; r.msg = 'All ' + mine.length + ' of your pictures on this page have alt text.'; }
      else { var b1 = bad[0].getAttribute('src');
        var a0 = norm(bad[0].getAttribute('alt'));
        var hasAlt = a0.length >= 5 && !/placeholder|^image \d|^photo$|^picture$/i.test(a0) && bad[0].getAttribute('aria-hidden') === 'true';
        r.msg = (hasAlt ? 'Your picture <code>' + esc(b1) + '</code> has alt text, but its tag still says <code>aria-hidden="true"</code>, which hides it from screen readers. Delete that part.'
                        : 'Your picture <code>' + esc(b1) + '</code> needs alt text. Between the quotes after <code>alt=</code>, say what is in it, in a few words.' +
          (bad[0].getAttribute('aria-hidden') === 'true' ? ' Then delete <code>aria-hidden="true"</code> from that tag, so screen readers can read it.' : '')) +
          (bad.length > 1 ? ' (' + bad.length + ' pictures still need alt text.)' : ''); }
    } else if(c.t === 'file'){
      if(S.mode !== 'here'){ r.skip = true; r.msg = 'I can\u2019t see your folder from here. In VS Code, check <b>' + c.path + '</b> is in your capstone folder.'; }
      else { r.ok = !!MEDIA[c.path] || FILE_LIST.indexOf(c.path) >= 0; r.msg = r.ok ? '<b>' + c.path + '</b> is in your files.' : 'Add your file: press <b>Add</b> under Your code. It saves as <b>' + c.path + '</b>.'; }
    } else if(c.t === 'noemail'){
      r.ok = !/[\w.+-]+@[\w-]+\.[\w.]+/.test(d.body.textContent) && !/mailto:/i.test(text);
      r.msg = r.ok ? 'No email address on the page. Good: the form keeps it private.' : 'There is an email address on the page. Take it out: people reach you through the form.';
    } else if(c.t === 'noplaceholder'){
      var left = $$('img', d).filter(function(i){ return /placehold\.co/.test(i.getAttribute('src') || ''); }).length;
      r.ok = left === 0; r.msg = r.ok ? 'No gray placeholder pictures left on this page.' : left + ' gray placeholder picture' + (left > 1 ? 's are' : ' is') + ' still on this page.';
    } else if(c.t === 'cssvar'){
      var mine = cssVar(text, c.name), was = cssVar(TPL[file], c.name);
      r.ok = !!mine && mine !== was;
      r.msg = !mine ? 'I can\u2019t find the <code>' + c.name + '</code> line in ' + file + '. Did it get deleted? Press <b>Undo</b>.' :
              r.ok ? '<code>' + c.name + '</code> is your color: <code>' + esc(mine) + '</code>.' : '<code>' + c.name + '</code> is still the template\u2019s color. Change its value.';
    } else if(c.t === 'contrast'){
      var col = cssVar(text, c.name), rr = ratio(col, c.on);
      if(rr == null){ r.skip = true; r.msg = 'I can only measure contrast for hex colors like <code>#1f6f78</code>.'; }
      else { r.ok = rr >= c.min; r.msg = (r.ok ? 'White text on your color is ' : 'White text on your color is only ') + rr.toFixed(2) + ' : 1' + (r.ok ? ', which passes.' : '. It needs ' + c.min + ' : 1: pick a darker color.'); }
    } else if(c.t === 'cssHas'){
      r.ok = c.re.test(text); r.msg = r.ok ? 'I can see ' + c.label + '.' : 'I can\u2019t find ' + c.label + ' in ' + file + '.';
    } else if(c.t === 'fontsUsed'){
      var link = /fonts\.googleapis\.com\/css2\?([^"'>\s]+)/.exec(src.get(t.page) || '');
      var fams = link ? link[1].split('&').filter(function(x){ return /^family=/.test(x); }).map(function(x){ return decodeURIComponent(x.slice(7).split(':')[0]).replace(/\+/g, ' '); }) : [];
      var used = fams.filter(function(f){ return text.indexOf(f) >= 0; });
      if(!fams.length){ r.msg = 'Add your Google Fonts link first, then use those font names in ' + file + '.'; }
      else { r.ok = used.length === fams.length; r.msg = r.ok ? 'Your fonts (' + fams.join(', ') + ') are used in ' + file + '.' : 'Use ' + fams.filter(function(f){ return used.indexOf(f) < 0; }).map(function(f){ return '<code>"' + esc(f) + '"</code>'; }).join(' and ') + ' in a <code>font-family</code> rule in ' + file + '.'; }
    } else if(c.t === 'icons'){
      /* any Phosphor icon name that is not in the template counts as the learner's own */
      var names = function(h){ var o = {}, m, re = /class="ph(?:-bold|-fill)? ph-([a-z0-9-]+)"/g; while((m = re.exec(h || ''))) o[m[1]] = 1; return o; };
      var mineI = names(text), tplI = names(TPL[file]), fresh = Object.keys(mineI).filter(function(n){ return !tplI[n]; });
      if(!fresh.length){ r.msg = 'All the icons on this page are still the template\u2019s. Pick one on <b>phosphoricons.com</b> and change the name after <code>ph-</code>.'; }
      else {
        r.ok = true; r.msg = 'Your own icon' + (fresh.length > 1 ? 's' : '') + ': ' + fresh.map(function(n){ return '<code>ph-' + esc(n) + '</code>'; }).join(', ') + '.';
        var blank = iconBlank(fresh);
        if(blank){ r.ok = false; r.msg = 'I can\u2019t draw <code>ph-' + esc(blank) + '</code> in your preview, so the name may be misspelled. Copy the name exactly from phosphoricons.com.'; }
      }
    } else if(c.t === 'hasText'){
      var e4 = $(c.sel, d); r.ok = !!e4 && c.re.test(e4.textContent);
      r.msg = r.ok ? 'I can see ' + c.label + '.' : 'Add ' + c.label + '.';
    }
    out.push(r);
  });
  return out;
}
/* In Edit here, ask the preview whether an icon actually drew (an unknown name draws nothing). */
function iconBlank(list){
  if(S.mode !== 'here') return null;
  try {
    var d = $('#preview').contentDocument; if(!d) return null;
    var w = d.defaultView, ok = $$('i[class*="ph-"]', d).some(function(i){ var c = w.getComputedStyle(i, '::before').content; return c && c !== 'none' && c !== 'normal' && c !== '""'; });
    if(!ok) return null;   // icons not loaded yet: say nothing rather than guess
    for(var k = 0; k < list.length; k++){ var el = d.querySelector('i.ph-' + list[k]); if(!el) continue;
      var cc = w.getComputedStyle(el, '::before').content; if(!cc || cc === 'none' || cc === 'normal' || cc === '""') return list[k]; }
  } catch(e){}
  return null;
}
function srcHere(){ return {get:function(p){ return cur(p); }}; }
function srcPaste(t){
  var txt = $('#pasteBox').value;
  return {get:function(p){
    if(!txt.trim()) return null;
    var wantCss = /\.css$/.test(p), looksCss = !/<\w/.test(txt) && /\{[^}]*:/.test(txt);
    if(wantCss !== looksCss) return null;
    if(!wantCss && p !== t.page) return null;
    if(wantCss && p !== (t.file || '')) return looksCss ? txt : null;
    return txt; }};
}

/* ---------------- Patch: the feedback panel ---------------- */
function say(html, opts){
  opts = opts || {};
  if(opts.nudge && say.lastReal && Date.now() - say.lastReal < 60000) return;   // never cover fresh feedback
  if(!opts.nudge) say.lastReal = Date.now();
  $('#patchMsg').innerHTML = html;
  $('#patchSource').textContent = opts.src === 'checks' ? 'I checked the code in this browser. Nothing was sent anywhere.' :
    opts.src === 'paste' ? 'I checked only the code you pasted. Nothing was sent anywhere.' :
    opts.src === 'model' ? 'Written on this device by ' + opts.model + '. It did not check your code. Nothing left this computer.' :
    opts.src === 'on-device coach' ? 'A nudge from Patch\u2019s on-device coach. Nothing is sent anywhere.' :
    'From the lesson. Nothing is sent anywhere.';
  $('#rateRow').hidden = !!opts.nudge;
  if(opts.nudge){ var pr = $('#patch').getBoundingClientRect(); if(pr.bottom < 0 || pr.top > innerHeight){
    toast('<i class="ph ph-chat-circle-dots" aria-hidden="true"></i> Patch has a tip for you. <button type="button" class="pill sm" id="seeTip">See it</button>');
    var st = $('#seeTip'); if(st) st.onclick = function(){ $('#patch').scrollIntoView({behavior: calm() ? 'auto' : 'smooth', block:'center'}); $('#patchMsg').focus && $('#patchMsg').setAttribute('tabindex', '-1'); $('#patchMsg').focus(); }; } }
}
/* ---------------- Common slips: what students really get wrong ----------------
   Run on the learner's own code (Edit here) or the code they pasted (VS Code).
   Each slip names the exact problem in plain words. Check my edit shows the first one before anything else;
   I'm stuck looks here first, so its answer is about the student's code, not a generic hint. */
var BALANCE_TAGS = ['h1','h2','h3','p','a','span','div','section','ul','ol','li','button','figure','figcaption','header','footer','nav','main','article','form','label','strong','em'];
function tagCount(h, tag){ var o = (h.match(new RegExp('<' + tag + '(?=[\\s>])', 'gi')) || []).length, c = (h.match(new RegExp('</' + tag + '\\s*>', 'gi')) || []).length; return o - c; }
function exampleBits(t){
  /* words and values that belong to the example, not the template: if they turn up in the code, the example was copied */
  if(!t.ex || t.noExTrap) return [];
  var tpl = Object.keys(TPL).map(function(k){ return TPL[k]; }).join('\n');
  var after = t.ex.after.replace(/\/\*[\s\S]*?\*\//g, ' ');
  var bits = [];
  (after.match(/#[0-9a-f]{6}\b/gi) || []).forEach(function(x){ bits.push(x); });
  (after.match(/alt="([^"]{8,})"/g) || []).forEach(function(x){ bits.push(x.slice(5, -1)); });
  (after.match(/formspree\.io\/f\/(\w+)/) || []).slice(1).forEach(function(x){ bits.push(x); });
  after.replace(/<[^>]+>/g, '\n').split('\n').forEach(function(x){ x = x.trim(); if(x.length >= 8 && !/[{};:=]/.test(x)) bits.push(x); });
  var keep = /^(stop \d of \d|admit one|now showing|pause|play)$/i, bonus = isBonus(t);
  return bits.filter(function(b, i){ return bits.indexOf(b) === i && tpl.indexOf(b) < 0 && t.ex.before.indexOf(b) < 0 && !keep.test(b.trim()) && !(bonus && /^#[0-9a-f]{6}$/i.test(b)); });
}
function slips(t, src){
  var out = [], files = [t.page].concat(t.file && t.file !== t.page ? [t.file] : []);
  (t.checks || []).forEach(function(c){ if(c.file && files.indexOf(c.file) < 0) files.push(c.file); });
  files.forEach(function(f){
    var h = src.get(f); if(h == null) return;
    var tp = TPL[f] || '', isCss = /\.css$/.test(f), name = '<b>' + f + '</b>';
    if(!isCss){
      // curly quotes inside a tag
      var cq = /<[a-z][^>]*[\u201c\u201d\u2018\u2019][^>]*>/i.exec(h);
      if(cq) out.push({hard:true, msg:'A tag in ' + name + ' has curly quotes (\u201c \u201d). Code needs straight quotes ("). Retype the quotes in <code>' + esc(cq[0].slice(0, 60)) + '</code>.' + (S.mode === 'vscode' ? ' (This happens when code is typed in Word, Notes or Google Docs.)' : '')});
      // a tag that never closes its >
      var bt = /<([a-z][a-z0-9]*)\b[^<>]*(?=<)/i.exec(h.replace(/<!--[\s\S]*?-->/g, '').replace(/<script[\s\S]*?<\/script>/gi, ''));
      if(bt) out.push({hard:true, msg:'A <code>&lt;' + esc(bt[1]) + '</code> tag in ' + name + ' is missing its closing <code>&gt;</code>. Look at the end of that tag.'});
      // opening and closing tags out of step, compared with the template
      for(var k = 0; k < BALANCE_TAGS.length; k++){
        var g = BALANCE_TAGS[k], d = tagCount(h, g) - tagCount(tp, g);
        if(d > 0){ out.push({hard:true, msg:'A closing <code>&lt;/' + g + '&gt;</code> seems to be missing in ' + name + '. Every <code>&lt;' + g + '&gt;</code> needs one. Press <b>Undo</b>, or compare your line with the example.'}); break; }
        if(d < 0){ out.push({hard:true, msg:'An opening <code>&lt;' + g + '&gt;</code> seems to be missing in ' + name + ' (or there is an extra <code>&lt;/' + g + '&gt;</code>). Keep the tags; change only the words between them.'}); break; }
      }
      // a picture address on the student's own computer
      var lp = /(?:src|href|poster)="((?:file:|[a-z]:\\|[a-z]:\/|\/users\/|\/home\/|~\/|onedrive|desktop\/|downloads\/)[^"]*)"/i.exec(h);
      if(lp) out.push({hard:true, msg:'<code>' + esc(lp[1].slice(0, 50)) + '</code> points to a file on your own computer, so it will be broken online. Put the file in your <b>images</b> (or <b>media</b>) folder and write <code>images/name.jpg</code>.'});
      // wrong folder name
      var wf = /(?:src|poster|data-full)="(image|img|pictures?|photos?)\/([^"]*)"/i.exec(h);
      if(wf) out.push({hard:true, msg:'The folder is called <b>images</b>, with an s: write <code>images/' + esc(wf[2]) + '</code>, not <code>' + esc(wf[1]) + '/' + esc(wf[2]) + '</code>.'});
      // capitals or spaces in a file name
      var cs = /(?:src|poster|data-full)="((?:images|media)\/[^"]*(?:[A-Z]|\s|%20)[^"]*)"/.exec(h);
      if(cs && tp.indexOf(cs[1]) < 0) out.push({hard:true, msg:'<code>' + esc(cs[1]) + '</code> has capital letters or spaces. Online, names must match exactly, so use lowercase with dashes (<code>my-photo.jpg</code>) and rename the file the same way.'});
      // Edit here: the code points at a file that was never added
      if(S.mode === 'here'){
        var re = /(?:src|poster|data-full)="((?:images|media)\/[^"]+)"/g, m, miss = null;
        while((m = re.exec(h))){ if(!MEDIA[m[1]] && FILE_LIST.indexOf(m[1]) < 0 && tp.indexOf(m[1]) < 0){ miss = m[1]; break; } }
        if(miss) out.push({hard:true, msg:'Your code points to <code>' + esc(miss) + '</code>, but there is no file with that name yet. Press <b>Add</b> under Your code, or check the name letter by letter (the ending too: <code>.jpg</code>, <code>.png</code>).'});
      }
      // icons without the ph at the start
      var ic = /class="(ph-(?!bold|fill|light|thin|duotone)[a-z0-9-]+)"/.exec(h);
      if(ic) out.push({hard:true, msg:'The icon <code>class="' + esc(ic[1]) + '"</code> needs <code>ph</code> in front: <code>class="ph ' + esc(ic[1]) + '"</code>.'});
      // an email address on the page
      var em = /mailto:|[\w.+-]+@[\w-]+\.(?:com|edu|org|net|us|io)\b/i.exec(h.replace(/<!--[\s\S]*?-->/g, ''));
      if(em && tp.indexOf(em[0]) < 0) out.push({hard:true, msg:'There is an email address in ' + name + '. Take it out: spam programs collect them. Your Contact form keeps your address private.'});
      // Google Fonts link in the body instead of the head
      if(/<\/head>[\s\S]*fonts\.googleapis\.com\/css2/i.test(h) && !/fonts\.googleapis\.com\/css2[\s\S]*<\/head>/i.test(h)) out.push({hard:true, msg:'Your Google Fonts <code>&lt;link&gt;</code> is below <code>&lt;/head&gt;</code>. Move it up, into the <code>&lt;head&gt;</code>, just above your stylesheet link.'});
      // alt text that will not help anyone (a tip, not a blocker)
      var al = /<img\b[^>]*alt="([^"]*)"/gi, a2;
      while((a2 = al.exec(h))){ var av = a2[1].trim();
        if(/\.(jpe?g|png|gif|webp|svg)$/i.test(av)){ out.push({hard:false, msg:'Tip: alt text <code>' + esc(av) + '</code> is a file name. Describe what is in the picture instead.'}); break; }
        if(/^(an? )?(image|picture|photo) of /i.test(av)){ out.push({hard:false, msg:'Tip: alt text doesn\u2019t need \u201c' + esc(av.split(' of ')[0]) + ' of\u201d. Screen readers already say it is an image: start with what is in it.'}); break; } }
    } else {
      if(/<link\b|<style\b|<\/?head>/i.test(h)) out.push({hard:true, msg:'HTML was pasted into ' + name + '. The Google Fonts <code>&lt;link&gt;</code> lines go in the page\u2019s <code>&lt;head&gt;</code> (the .html file). In the CSS, only the <code>font-family</code> rules go.'});
      var nh = /(--[a-z-]+)\s*:\s*([0-9a-f]{6}|[0-9a-f]{3})\s*;/i.exec(h);
      if(nh) out.push({hard:true, msg:'<code>' + esc(nh[1]) + ': ' + esc(nh[2]) + '</code> needs a <code>#</code> in front: <code>#' + esc(nh[2]) + '</code>.'});
      var bl = /#(?:[0-9a-f]{7,}|[0-9a-f]{4,5})\b(?![0-9a-f])/i.exec(h.replace(/\/\*[\s\S]*?\*\//g, ''));
      if(bl && tp.indexOf(bl[0]) < 0) out.push({hard:true, msg:'<code>' + esc(bl[0]) + '</code> is not a color: a hex color has 6 characters after the <code>#</code>, like <code>#1f6f78</code>.'});
      var ns = /(--[a-z-]+\s*:\s*[^;{}\n]+)\n\s*--/i.exec(h);
      if(ns) out.push({hard:true, msg:'The line <code>' + esc(ns[1].replace(/\/\*[\s\S]*?\*\//g, '').trim()) + '</code> needs a <code>;</code> at the end. Every line in <code>:root</code> ends with one.'});
      var br = (h.match(/\{/g) || []).length - (h.match(/\}/g) || []).length, bt2 = (tp.match(/\{/g) || []).length - (tp.match(/\}/g) || []).length;
      if(br !== bt2) out.push({hard:true, msg:'A curly bracket is ' + (br > bt2 ? 'missing: a <code>{</code> has no <code>}</code>' : 'extra: there is a <code>}</code> with no <code>{</code>') + ' in ' + name + '. Each rule needs one of each.'});
      var fq = /font-family\s*:\s*([A-Z][a-z]+(?: [A-Z][a-z]+)+)\s*[,;]/.exec(h);
      if(fq) out.push({hard:true, msg:'The font name <code>' + esc(fq[1]) + '</code> has a space, so it needs quotes: <code>font-family: "' + esc(fq[1]) + '", Arial, sans-serif;</code>.'});
    }
  });
  // the example was copied instead of the learner's own words
  var all = files.map(function(f){ return src.get(f) || ''; }).join('\n');
  var cp = exampleBits(t).filter(function(b){ return all.indexOf(b) >= 0; })[0];
  if(cp) out.push({hard:true, msg:'<code>' + esc(cp.length > 50 ? cp.slice(0, 47) + '\u2026' : cp) + '</code> is from the example. Examples show the shape of the change: use your own words, pictures and colors.'});
  return out;
}
function checkEdit(){
  var t = task();
  if(!t.checks || !t.checks.length || S.mode !== 'here'){
    if(selfList(t).every(function(_, i){ return S.self[t.id + ':' + i]; }) && selfList(t).length){ S.done[t.id] = true; renderJourney(); save(); say('<p><b>All done.</b> Press <b>Next step</b> when you\u2019re ready.</p>'); renderSelfCheck(false); return; }
    say('<p>Tick the boxes under <b>Check it yourself</b> when they are true for you. Stuck? Press <b>I\u2019m stuck</b>.</p>', {});
    renderSelfCheck(true); return;
  }
  var src = S.mode === 'here' ? srcHere() : srcPaste(t);
  if(S.mode !== 'here' && !$('#pasteBox').value.trim()){
    say('<p>I can only check code you paste. Copy your whole <b>' + (t.file || t.page) + '</b> from VS Code and paste it under <b>Want Patch to check it?</b></p>' +
        '<p class="todo1">Or check it yourself: does your page in the browser show the change after you save and refresh?</p>', {});
    return;
  }
  var rs = runChecks(t, src), ok = rs.filter(function(r){ return r.ok && !r.quiet; }), miss = rs.filter(function(r){ return !r.ok && !r.skip; }), skip = rs.filter(function(r){ return r.skip; });
  var sl = slips(t, src), hardS = sl.filter(function(x){ return x.hard; }), tipS = sl.filter(function(x){ return !x.hard; });
  if(hardS.length) miss.unshift({msg:hardS[0].msg});
  var h = '';
  if(ok.length) h += '<p class="ok"><i class="ph-fill ph-check-circle" aria-hidden="true"></i> What\u2019s right</p><ul>' + ok.map(function(r){ return '<li>' + r.msg + '</li>'; }).join('') + '</ul>';
  if(miss.length) h += '<p class="todo1"><b>One thing to do next:</b> ' + miss[0].msg + '</p>' + (miss.length > 1 ? '<p class="muted small">Then press Check my edit again.</p>' : '');
  if(skip.length) h += skip.map(function(r){ return '<p class="muted small">' + r.msg + '</p>'; }).join('');
  if(tipS.length && !hardS.length) h += '<p class="muted small">' + tipS[0].msg + '</p>';
  if(!miss.length && !skip.length){ S.done[t.id] = true; h += '<p><b>All done.</b> Press <b>Next step</b> when you\u2019re ready.</p>' + backupLine(); Patch.signal('right'); Patch.signal('complete'); renderJourney(); }
  else if(miss.length){ Patch.signal('wrong'); }
  save();
  say(h, {src:S.mode === 'here' ? 'checks' : 'paste'});
}
function hint(next){
  var t = task(), hs = ((S.os === 'mac' && t.hintsMac) || t.hints || []).slice();
  if(!next && !locked(t) && (t.checks || []).length){
    var src = S.mode === 'here' ? srcHere() : ($('#pasteBox').value.trim() ? srcPaste(t) : null);
    var sl = src ? slips(t, src).filter(function(x){ return x.hard; }) : [];
    if(sl.length){ say('<p><b>I looked at your code and spotted something:</b> ' + sl[0].msg + '</p><p class="muted small">Fixed it? Press <b>Check my edit</b>. Not it? Press <b>Another hint</b>.</p>', {src:S.mode === 'here' ? 'checks' : 'paste'}); return; }
    if(src){ var rs = runChecks(t, src).filter(function(r){ return !r.ok && !r.skip; });
      if(rs.length && S.hint[t.id] == null){ S.hint[t.id] = -1; save(); say('<p><b>Here\u2019s where you are:</b> ' + rs[0].msg + '</p><p class="muted small">Need more? Press <b>Another hint</b>.</p>', {src:S.mode === 'here' ? 'checks' : 'paste'}); return; } }
  }
  // the slips every student hits, after the task's own hints
  if(S.mode === 'vscode' && !t.file){ /* setup steps: no page to save yet */ }
  else if(S.mode === 'vscode') hs.push('Not seeing your change? Save first: a dot on the file\u2019s tab in VS Code means it isn\u2019t saved. Then look at your page in the browser.', 'Still nothing? Check that VS Code has <b>your folder</b> open (click File, then Open Folder), not just one file, and that you are editing the same file you are looking at.');
  else if((t.checks || []).length) hs.push('Not seeing your change? Press <b>Run preview</b>. Made a mess? <b>Undo</b> takes back one change; <b>Reset step</b> puts this step back the way it started.');
  if(!hs.length){ say('<p>Try <b>Show me</b> to watch it done.</p>'); return; }
  var i = S.hint[t.id] == null ? 0 : (next ? S.hint[t.id] + 1 : Math.max(0, S.hint[t.id]));
  if(i >= hs.length){ say('<p>That\u2019s all my hints for this one. Press <b>Show me</b> and watch the edit, then try it yourself.</p>'); S.hint[t.id] = hs.length - 1; save(); return; }
  S.hint[t.id] = i; save();
  say('<p><b>Hint ' + (i + 1) + ' of ' + hs.length + ':</b> ' + mod(hs[i]) + '</p>' + (i < hs.length - 1 ? '<p class="muted small">Still stuck? Press <b>Another hint</b>.</p>' : '<p class="muted small">Still stuck? Press <b>Show me</b>.</p>'), {});
}

/* ---------------- Watch: a captioned demonstration of the exact edit ---------------- */
var W = {frames:[], i:0, playing:false, rate:1, timer:null};
function watchFrames(t){
  var f = [], file = t.file || t.page, os = S.mode === 'vscode';
  f.push({cap:(os ? 'In VS Code, open ' : 'In Your code, open ') + file + '.', code:t.ex ? t.ex.before : '', mark:''});
  if(t.find) f.push({cap:os ? 'Press ' + (S.os === 'mac' ? 'Command' : 'Ctrl') + ' F and search for ' + findTxt(t) + '.' : 'Press Find it for me. The spot lights up.', code:t.ex ? t.ex.before : '', mark:t.find});
  if(t.ex){
    var dp = diffPart(t.ex.before, t.ex.after);
    if(dp.from){ f.push({cap:'Select the part to change.', code:t.ex.before, mark:dp.from});
      f.push({cap:'Type your own. This example is only an example: use your words.', code:t.ex.after, type:dp}); }
    else { /* new code, nothing to replace: click the spot, then watch it typed */
      f.push({cap:'Click where the new code goes.', code:t.ex.before, mark:''});
      f.push({cap:'Type the new code. Use your own words: this is only an example.', code:t.ex.after, type:dp}); }
  } else {
    stepsOf(t).forEach(function(s){ f.push({cap:strip(mod(s)), code:'', mark:''}); });
  }
  if(t.ex) f.push({cap:os ? 'Press ' + (S.os === 'mac' ? 'Command' : 'Ctrl') + ' S to save your page.' : 'Press Run preview and check the change on your page.', code:t.ex ? t.ex.after : '', mark:''});
  return f;
}
function diffPart(a, b){
  var i = 0; while(i < a.length && i < b.length && a[i] === b[i]) i++;
  var j = 0; while(j < a.length - i && j < b.length - i && a[a.length - 1 - j] === b[b.length - 1 - j]) j++;
  return {pre:b.slice(0, i), from:a.slice(i, a.length - j), to:b.slice(i, b.length - j), post:b.slice(b.length - j)};
}
function openWatch(){
  var t = task(), p = $('#watchPanel');
  Patch.signal('video');
  var hw = howOf(t);
  /* code steps: watch the code being typed. Other steps: the step pictures play with captions. */
  /* Watch follows the steps: every step's picture, with that step as the caption. Code steps then show the new code typed. */
  if(t.shots){ W.frames = stepsOf(t).map(function(s, i){ return {cap:'Step ' + (i + 1) + ': ' + strip(mod(s)), shot:shotsOf(t)[i] || ''}; }); hw = null; }
  else W.frames = hw ? hw.map(function(h, i){ return {img:h[0], cap:'Step ' + (i + 1) + ': ' + strip(mod(stepsOf(t)[i]))}; }) : watchFrames(t);
  if(hw && t.ex && !t.shots){ var dp = diffPart(t.ex.before, t.ex.after);
    W.frames.push({cap:'Now watch the new code being typed. Use your own words: this is only an example.', code:t.ex.after, type:dp});
    W.frames.push({cap:'Press ' + (S.os === 'mac' ? 'Command' : 'Ctrl') + ' S to save, then look at your browser.', code:t.ex.after, mark:''}); }
  W.i = 0; W.playing = true;
  p.hidden = false; $('#watchBody').hidden = true;
  p.innerHTML = '<div class="wplayer"><div class="phead"><h2>Watch: ' + esc(t.title) + '</h2><span class="spacer"></span>' +
    '<button type="button" class="iconbtn" id="wClose" aria-label="Close the demonstration"><i class="ph ph-x" aria-hidden="true"></i></button></div>' +
    '<div class="wstage" id="wStage" aria-hidden="true"></div>' +
    '<div class="wcap" id="wCap" aria-live="polite"></div>' +
    '<div class="wctl"><button type="button" class="primary sm" id="wPlay"></button>' +
    '<button type="button" class="pill sm" id="wReplay"><i class="ph ph-arrow-counter-clockwise" aria-hidden="true"></i> Replay</button>' +
    '<label class="small">Speed <select id="wRate"><option value="0.75">0.75\u00d7</option><option value="1" selected>1\u00d7</option><option value="1.5">1.5\u00d7</option></select></label>' +
    '<button type="button" class="pill sm" id="wTrans" aria-expanded="false">Transcript</button>' +
    '<span class="spacer"></span><span class="muted small">Captions on \u00b7 ' + W.frames.length + ' steps</span></div>' +
    '<ol class="wtrans" id="wTransList" hidden>' + W.frames.map(function(f){ return '<li>' + esc(f.cap) + '</li>'; }).join('') + '</ol></div>';
  $('#wRate').value = String(W.rate);
  $('#wClose').onclick = function(){ stopWatch(); p.hidden = true; $('#watchBody').hidden = !!S.prefs.hideWatch; $('#watchBtn').focus(); };
  $('#wPlay').onclick = function(){ W.playing = !W.playing; if(W.playing){ if(W.i >= W.frames.length - 1) W.i = 0; showFrame(); } else { clearTimeout(W.timer); paintPlay(); } };
  $('#wReplay').onclick = function(){ W.i = 0; W.playing = true; showFrame(); };
  $('#wRate').onchange = function(){ W.rate = +this.value; };
  $('#wTrans').onclick = function(){ var l = $('#wTransList'); l.hidden = !l.hidden; this.setAttribute('aria-expanded', String(!l.hidden)); };
  showFrame();
  $('#wPlay').focus({preventScroll:true});
  var r = p.getBoundingClientRect(); if(r.top < 0 || r.bottom > innerHeight) p.scrollIntoView({behavior:calm() ? 'auto' : 'smooth', block:'nearest'});
}
function paintPlay(){ var b = $('#wPlay'); if(b) b.innerHTML = W.playing ? '<i class="ph-fill ph-pause" aria-hidden="true"></i> Pause' : '<i class="ph-fill ph-play" aria-hidden="true"></i> Play'; }
function calm(){ return S.prefs.calm || matchMedia('(prefers-reduced-motion: reduce)').matches; }
function showFrame(){
  clearTimeout(W.timer);
  var f = W.frames[W.i], st = $('#wStage'), file = task().file || task().page;
  if(!f || !st) return;
  $('#wCap').textContent = f.cap;
  $$('#wTransList li').forEach(function(li, k){ li.classList.toggle('on', k === W.i); });
  paintPlay();
  if(f.shot != null){ st.innerHTML = f.shot || '<span style="color:#e8eaf0">' + esc(f.cap) + '</span>';
    if(W.playing) W.timer = setTimeout(nextFrame, (4000 + f.cap.length * 55) / W.rate); return; }
  if(f.img){ st.innerHTML = '<img class="wimg" src="' + ROOT + 'images/steps/' + f.img + '" alt="">';
    if(W.playing) W.timer = setTimeout(nextFrame, (3500 + f.cap.length * 45) / W.rate); return; }
  var headH = '<span class="file">' + esc(file) + '</span>';
  if(f.type && !calm()){
    var d = f.type, k = 0;
    (function step(){
      st.innerHTML = headH + esc(d.pre) + '<mark>' + esc(d.to.slice(0, k)) + '</mark><span class="cur"></span>' + esc(d.post);
      if(k++ < d.to.length){ W.timer = setTimeout(step, 55 / W.rate); }
      else if(W.playing) W.timer = setTimeout(nextFrame, 1600 / W.rate);
    })();
    return;
  }
  var code = esc(f.code || '');
  if(f.mark){ var m = esc(f.mark), alt = variants(f.mark).map(esc).filter(function(x){ return code.indexOf(x) >= 0; })[0]; if(alt) code = code.replace(alt, '<mark>' + alt + '</mark>'); }
  if(f.type && calm()) code = esc(f.type.pre) + '<mark>' + esc(f.type.to) + '</mark>' + esc(f.type.post);
  st.innerHTML = headH + (code || '<span style="color:#a9b1c3">' + esc(f.cap) + '</span>');
  if(W.playing) W.timer = setTimeout(nextFrame, (2600 + f.cap.length * 25) / W.rate);
}
function nextFrame(){ if(W.i < W.frames.length - 1){ W.i++; showFrame(); } else { W.playing = false; paintPlay(); } }
function stopWatch(){ clearTimeout(W.timer); W.playing = false; }

/* ---------------- Listen: read the instructions aloud ---------------- */
var L = {on:false, paused:false};
function speak(text, done){
  if(!window.speechSynthesis){ toast('Read-aloud needs Chrome, Edge or Safari.'); return; }
  speechSynthesis.cancel();
  var u = new SpeechSynthesisUtterance(text); u.rate = S.prefs.rate || 1;
  u.onend = function(){ L.on = false; $('#listenBar').hidden = true; if(done) done(); };
  L.on = true; L.paused = false; speechSynthesis.speak(u);
  $('#listenBar').hidden = false; $('#listenState').textContent = 'Reading aloud\u2026'; $('#listenPause').innerHTML = '<i class="ph ph-pause" aria-hidden="true"></i> Pause';
}
function listenTask(){
  var t = task(), steps = stepsOf(t);
  var extra = $('#learnBox').open ? ' More about this. ' + strip($('#learnText').innerHTML) : '';
  speak(t.title + ' ' + t.sub + ' ' + (t.why ? 'Why: ' + t.why + ' ' : '') + steps.map(function(s, i){ return 'Step ' + (i + 1) + '. ' + strip(mod(s)); }).join(' ') + extra);
}

/* ---------------- rendering a task ---------------- */
function onPage(x, page){ return (x.pages || [x.page]).indexOf(page) >= 0; }
function menuPage(){ return S.allTasks ? null : (previewPage || task().page); }
function renderJourney(){
  /* The left menu: every section opens to show all of its tasks, and any task can be clicked.
     The current section is open; others open and close with their heading. */
  var ol = $('#journeyList'); ol.innerHTML = '';
  var t = task(); S.open = S.open || {};
  var mp = null, jf = $('#jFilter'); jf.hidden = true;
  jf.innerHTML = mp ? '<span>Showing <b>' + (PAGE_NAMES[mp] || mp) + '</b> tasks</span> <button type="button" class="linkish" id="jAll">Show all</button>'
                    : '<span>Showing <b>all</b> tasks</span> <button type="button" class="linkish" id="jPage">Only this page</button>';
  if($('#jAll')) $('#jAll').onclick = function(){ S.allTasks = true; save(); renderJourney(); $('#jPage').focus(); };
  if($('#jPage')) $('#jPage').onclick = function(){ S.allTasks = false; save(); renderJourney(); $('#jAll').focus(); };
  SECTIONS.forEach(function(sec){
    var all = TASKS.filter(function(x){ return x.sec === sec.n; });
    if(PART && !all.length) return;
    var ts = mp ? all.filter(function(x){ return onPage(x, mp) || x === t; }) : all;
    var req = ts.filter(function(x){ return !x.optional; }); if(!req.length) req = ts;   /* a part made only of 'for some learners' tasks still counts them */
    var doneN = req.filter(function(x){ return S.done[x.id]; }).length, allDone = req.length && doneN === req.length;
    var shown = previewPage && sec.page === PAGE_NAMES[previewPage] && S.mode === 'here';
    var open = sec.n === t.sec || !!S.open[sec.n] || shown;
    var li = document.createElement('li');
    var b = document.createElement('button'); b.type = 'button'; b.className = 'jsec';
    b.setAttribute('aria-expanded', String(open)); b.setAttribute('aria-controls', 'jtasks' + sec.n);
    if(sec.n === t.sec) b.setAttribute('aria-current', 'step');
    b.innerHTML = '<span class="num' + (allDone ? ' done' : '') + '">' + (allDone ? '<i class="ph ph-check" aria-hidden="true"></i><span class="sr">done</span>' : (PART ? PART.secs.indexOf(sec.n) + 1 : sec.n)) + '</span>' +
      '<span class="jt">' + (sec.cap ? '<span class="jcap">' + sec.cap + '</span>' : '') + sec.t + '<span class="jcount">' + (sec.bonus ? 'Extra \u00b7 ' : '') + doneN + ' of ' + req.length + '</span></span>' +
      '<i class="ph ph-caret-' + (open ? 'up' : 'down') + ' jcaret" aria-hidden="true"></i>';
    b.addEventListener('click', function(){
      if(sec.n === t.sec){ S.open[sec.n] = !open; }   // the current section can close too
      else S.open[sec.n] = !S.open[sec.n];
      save(); renderJourney();
      var again = $('#journeyList button.jsec[aria-controls="jtasks' + sec.n + '"]'); if(again) again.focus();
    });
    li.appendChild(b);
    var sub = document.createElement('ul'); sub.className = 'tasks'; sub.id = 'jtasks' + sec.n;
    sub.hidden = !(open && !(sec.n === t.sec && S.open[sec.n] === false));
    if(sec.n === t.sec && S.open[sec.n] === false){ b.setAttribute('aria-expanded', 'false'); b.querySelector('.jcaret').className = 'ph ph-caret-down jcaret'; }
    if(sec.n === t.sec && sec.cap && !t.nowork){
      var lt = document.createElement('li'), bt = document.createElement('button'); bt.type = 'button'; bt.className = 'jtpl';
      bt.innerHTML = '<i class="ph ph-browser" aria-hidden="true"></i><span class="jtl">View the template</span>';
      bt.addEventListener('click', function(){ S.prefs.showTpl = !S.prefs.showTpl; save(); paintBefore();
        if(S.prefs.showTpl){ runBefore(); closeJourney(); $('#beforePanel').scrollIntoView({behavior:calm() ? 'auto' : 'smooth', block:'start'}); } });
      lt.appendChild(bt); sub.appendChild(lt);
    }
    ts.forEach(function(x){
      var l2 = document.createElement('li'), b2 = document.createElement('button'); b2.type = 'button';
      if(x === t) b2.setAttribute('aria-current', 'true');
      var lk = !S.done[x.id] && locked(x);
      b2.innerHTML = (S.done[x.id] ? '<i class="ph ph-check tick" aria-hidden="true"></i>' : lk ? '<i class="ph ph-lock-simple dot" aria-hidden="true"></i>' : '<i class="ph ph-circle dot" aria-hidden="true"></i>') +
        '<span>' + esc(x.title.replace(/ \(optional\)\.?$/, '').replace(/\.$/, '')) + (x.optional ? ' <span class="opt">optional</span>' : '') + '</span>' + (S.done[x.id] ? '<span class="sr"> (done)</span>' : lk ? '<span class="sr"> (locked: finish the basics first)</span>' : '');
      b2.addEventListener('click', function(){ S.open[sec.n] = true; goTask(TASKS.indexOf(x)); closeJourney(); });
      l2.appendChild(b2); sub.appendChild(l2);
    });
    if(!ts.length){ var none = document.createElement('li'); none.className = 'none'; none.textContent = 'Nothing on this page'; sub.appendChild(none); }
    li.appendChild(sub);
    ol.appendChild(li);
  });
  paintBefore();
}
/* VS Code only, no paste box: every step ends with tick boxes. Tasks with code checks get three short ones. */
function selfList(t){
  if(t.selfcheck) return t.selfcheck;
  if(!t.checks || !t.checks.length) return [];
  var l = ['I made this change in VS Code and saved.', 'I can see the change on my page in the browser.'];
  if(t.ex && !t.noExTrap) l.push('I used my own words, pictures or colors, not the example\u2019s.');
  return l;
}
function renderSelfCheck(focus){
  var t = task(), box = $('#selfCheck'), list = selfList(t);
  var host = S.mode === 'here' ? $('#selfHere') : box;
  box.innerHTML = '';
  if(!list.length){ if(S.mode !== 'here') box.innerHTML = '<p class="muted small">Or check it yourself: save, refresh, and look at your page.</p>'; return; }
  var html = '<p><b>Check it yourself</b></p>' + list.map(function(s, i){ var id = t.id + ':' + i;
    return '<label><input type="checkbox" data-self="' + id + '"' + (S.self[id] ? ' checked' : '') + '> ' + s + '</label>'; }).join('');
  var div = document.createElement('div'); div.className = 'selfcheck'; div.innerHTML = html;
  if(S.mode === 'here'){ host.hidden = false; host.innerHTML = ''; host.appendChild(div); } else box.appendChild(div);
  $$('input[data-self]', div).forEach(function(c){ c.onchange = function(){ S.self[c.dataset.self] = c.checked;
    if(list.every(function(_, i){ return S.self[t.id + ':' + i]; })){ S.done[t.id] = true; renderJourney(); say('<p><b>All done.</b> Press <b>Next step</b> when you\u2019re ready.</p>'); }
    save(); }; });
  if(focus){ var f = $('input', div); if(f) f.focus(); }
}
function renderMedia(t){
  var bar = $('#mediaBar'); bar.innerHTML = ''; bar.hidden = true;
  if(S.mode !== 'here') return;
  var m = t.media, paths = [];
  if(m){
    if(m.list) paths = m.list.slice();
    else if(m.multi){ for(var i = 1; i <= m.multi; i++) paths.push(m.base + i + m.ext); }
    else { [m.path, m.path2, m.path3].forEach(function(p){ if(p) paths.push(p); }); }
  }
  if(paths.length){
    bar.hidden = false;
    var lab = document.createElement('div'); lab.className = 'mhead';
    var kind = paths.every(function(p){ return /^images\//.test(p); }) ? 'pictures' : 'files';
    lab.innerHTML = '<i class="ph ph-image-square" aria-hidden="true"></i><div><h2>Add your ' + kind + '</h2>' +
      '<p class="muted small">' + esc(m.what.charAt(0).toUpperCase() + m.what.slice(1)) + '. Each one is saved with the right name for you, in this browser. Then put that name in your code.</p></div>';
    bar.appendChild(lab);
    paths.forEach(function(p){
      var name = p.split('/').pop();
      var b = document.createElement('label'); b.className = 'pill sm'; b.style.cursor = 'pointer';
      var what = /\.mp4$/.test(p) ? 'video' : /\.mp3$/.test(p) ? 'song' : 'picture';
      b.innerHTML = MEDIA[p] ? '<span class="have"><i class="ph-fill ph-check-circle" aria-hidden="true"></i> ' + esc(name) + ' added</span> <span class="muted small">(change)</span>'
                             : '<span><i class="ph ph-plus-circle" aria-hidden="true"></i> Add ' + what + ': <code>' + esc(name) + '</code></span>';
      var inp = document.createElement('input'); inp.type = 'file'; inp.accept = /\.mp4$/.test(p) ? 'video/mp4' : /\.mp3$/.test(p) ? 'audio/*' : 'image/*';
      inp.className = 'sr'; inp.setAttribute('aria-label', 'Add ' + name);
      inp.addEventListener('change', function(){
        var f = inp.files[0]; if(!f) return;
        if(/\.mp4$/.test(p) && f.size > 25 * 1024 * 1024) toast('That video is ' + Math.round(f.size / 1048576) + ' MB. GitHub takes 25 MB at most: export it smaller before you publish.');
        else if(f.size > 1024 * 1024 && /^image/.test(f.type)) toast('Saved. That picture is over 1 MB: a smaller copy will load faster online.');
        else toast('Saved as <b>' + esc(p) + '</b>.');
        dbPut(p, f).then(function(){ renderMedia(t); runPreview(); });
      });
      b.appendChild(inp); bar.appendChild(b);
    });
  }
  if(selfList(t).length) renderSelfCheck(false);
}
function renderVS(t){
  var file = t.file || t.page;
  var dl = $('#vsWhere'); dl.hidden = !t.file;
  dl.innerHTML = '<dt>File</dt><dd><code>' + esc(file) + '</code> in your <b>' + folderOf(t) + '</b> folder</dd>' +
    (t.find ? '<dt>Search</dt><dd><kbd>' + (S.os === 'mac' ? 'Command' : 'Ctrl') + '</kbd>+<kbd>F</kbd> then <code>' + esc(findTxt(t)) + '</code></dd>' : '') +
    '<dt>Save</dt><dd><kbd>' + (S.os === 'mac' ? 'Command' : 'Ctrl') + '</kbd>+<kbd>S</kbd> saves your page.</dd>';
  $('#vsExample').innerHTML = exampleHTML(t); $('#vsExample').hidden = !t.ex;
  renderSelfCheck(false);
}
function exampleHTML(t){
  if(!t.ex) return '';
  /* left: what needs to change (the template). right: what it looks like changed (an example) */
  var noTpl = (SECTIONS[t.sec - 1] || {}).noTemplate;
  return '<div class="exgrid"><div class="excol"><p class="lab b">' + (noTpl ? 'Before <span class="tagex">your code now</span>' : 'Change this <span class="tagex">from the template</span>') + '</p><pre>' + esc(t.ex.before) + '</pre></div>' +
         '<span class="exarrow" aria-hidden="true"><i class="ph ph-arrow-right"></i></span>' +
         '<div class="excol"><p class="lab a">' + (noTpl ? 'After' : 'Changed') + ' <span class="tagex">Example: use your own</span></p><pre>' + esc(t.ex.after) + '</pre></div></div>';
}
/* "Choose how you will work": two big cards. Clicking one switches the mode, so the choice and the screen always match. */
function renderChooser(t){
  var box = $('#chooser'); box.hidden = t.visual !== 'choose';
  var hs = !!S.prefs.hideSteps;
  $('#todo').hidden = t.visual === 'choose' || !!S.level || hs;
  if($('#stepFigs')) $('#stepFigs').hidden = $('#todo').hidden || !$('#stepFigs').innerHTML;
  $('#todoHead').hidden = t.visual === 'choose';
  $('#stepsToggle').textContent = hs ? 'Show' : 'Minimize'; $('.steps').classList.toggle('min', hs); $('#stepsToggle').setAttribute('aria-expanded', String(!hs));
  if(t.visual !== 'choose') return;
  function card(mode, icon, name, who, what){
    var on = S.mode === mode;
    return '<button type="button" class="ccard' + (on ? ' on' : '') + '" data-pick="' + mode + '" aria-pressed="' + on + '">' +
      '<span class="cico"><i class="ph ph-' + icon + '" aria-hidden="true"></i></span>' +
      '<span class="cwho">' + who + '</span><span class="cname">' + name + '</span><span class="cwhat">' + what + '</span>' +
      '<span class="cstate">' + (on ? '<i class="ph-fill ph-check-circle" aria-hidden="true"></i> You are using this' : 'Choose this') + '</span></button>';
  }
  box.innerHTML = '<div class="cards2">' +
    card('vscode', 'code', 'Use VS Code', 'Going into coding or web design?', 'How real web pages are made. This page is your instructions; you do the work in VS Code on a computer.') +
    card('here', 'browser', 'Edit here', 'Not planning to code again?', 'A stepping stone. Change the template right on this page, with a live preview, hints and checks.') +
    '</div>' +
    '<div class="cflow" role="img" aria-label="You can switch later. Download my files takes your Edit here work to VS Code. Import my files brings your VS Code work into Edit here.">' +
    '<span class="cpill"><i class="ph ph-code" aria-hidden="true"></i> VS Code</span>' +
    '<span class="carrows"><span><i class="ph ph-arrow-left" aria-hidden="true"></i> Download my files</span><span>Import my files <i class="ph ph-arrow-right" aria-hidden="true"></i></span></span>' +
    '<span class="cpill"><i class="ph ph-browser" aria-hidden="true"></i> Edit here</span></div>' +
    '<p class="muted small cnote">Change your mind any time: your work comes with you. On a phone or tablet? Use <b>Edit here</b>: VS Code needs a computer. We recommend <b>Google Chrome</b> to receive feedback from Patch.</p>';
  $$('[data-pick]', box).forEach(function(b){ b.onclick = function(){
    S.mode = b.dataset.pick; S.done[t.id] = true; save(); render();
    say('<p class="ok"><i class="ph-fill ph-check-circle" aria-hidden="true"></i> You chose <b>' + (S.mode === 'here' ? 'Edit here' : 'Use VS Code') + '</b>. The screen has changed to match. Press <b>Next step</b>.</p>', {});
    var again = $('[data-pick="' + S.mode + '"]'); if(again) again.focus(); }; });
}
function renderLock(t){
  var card = $('#lockCard'), m = missing(t);
  if(isBonus(t) && S.bonus !== 'yes'){
    card.innerHTML = '<h2><i class="ph ph-globe-hemisphere-west" aria-hidden="true"></i> The WORLD bonus</h2>' +
      '<p>Turn your finished portfolio into a place: place names in your menu, a Stop sign on each page, a welcome stage, tickets to your pages and a Now showing strip. ' +
      'See it: <a href="' + ROOT + 'world-before-after.html" target="_blank" rel="noopener">Rosa\u2019s site, before and after</a>.</p>' +
      '<p class="todo1"><b>Anyone can do it, and it is extra.</b> It suits you if the basics feel easy. Still getting the hang of things? <b>Stick with the basics:</b> they are the full grade, and doing them well matters more.</p>' +
      '<div class="row"><button type="button" class="primary" id="bonusYes">I\u2019m ready: open the bonus</button><button type="button" class="pill" id="bonusNo">Stay with the basics</button></div>';
    $('#bonusYes').onclick = function(){ S.bonus = 'yes'; save(); render(); toast('The WORLD bonus is open. Each part opens when that page\u2019s basics are done.'); };
    $('#bonusNo').onclick = function(){ S.bonus = 'no'; save(); var first = TASKS.findIndex(function(x){ return !S.done[x.id] && !isBonus(x) && !x.optional; }); goTask(first < 0 ? 0 : first); };
    return;
  }
  card.innerHTML = '<h2><i class="ph ph-lock-simple" aria-hidden="true"></i> Finish the basics on this page first</h2>' +
    '<p>' + (t.optional ? 'Colors, fonts and icons come after this page\u2019s words and pictures are done, so you can choose a look that suits your own pictures. Or wait and do every page at the end, in Test &amp; share.' : 'This bonus builds on your finished page, so it opens when that page\u2019s basics are done.') + '</p>' +
    '<p><b>' + m.length + ' task' + (m.length > 1 ? 's' : '') + ' left:</b></p><ul class="locklist">' +
    m.map(function(x){ return '<li><button type="button" class="linkish" data-go="' + TASKS.indexOf(x) + '">' + esc(x.title.replace(/\.$/, '')) + '</button></li>'; }).join('') + '</ul>' +
    '<p class="muted small">A task is done when you tick its boxes.</p>';
  $$('[data-go]', card).forEach(function(b){ b.onclick = function(){ goTask(+b.dataset.go); }; });
}
function render(){
  var t = task(), sec = SECTIONS[t.sec - 1];
  var isLocked = locked(t);
  $('#lockCard').hidden = !isLocked;
  ['.steps', '#modeSeg', '#modeHelp', '.bottomrow'].forEach(function(s){ var e = $(s); if(e) e.style.display = isLocked || (t.visual === 'choose' && s !== '.steps') ? 'none' : ''; });
  if(isLocked){ renderLock(t); }
  document.title = t.title.replace(/\.$/, '') + (PART ? ' \u00b7 ' + PART.name : '') + ' \u00b7 Make an About Page';
  $('#crumbPage').innerHTML = '<i class="ph ph-house" aria-hidden="true"></i> ' + (sec.cap || (sec.bonus ? 'Extra' : 'All pages'));
  $('#crumbSec').textContent = sec.t;
  var inSec = TASKS.filter(function(x){ return x.sec === t.sec; });
  $('#crumbCount').textContent = 'Task ' + (inSec.indexOf(t) + 1) + ' of ' + inSec.length;
  /* Go to: every part with every task in it, so a learner can open exactly what they want to learn, at any time */
  var pk = $('#partPick');
  if(pk){
    if(!pk.options.length){
      SECTIONS.forEach(function(x){ var mine = TASKS.filter(function(y){ return y.sec === x.n; }); if(!mine.length) return;
        var g = document.createElement('optgroup'); g.label = 'Part ' + x.n + ': ' + x.t;
        mine.forEach(function(y){ var o = document.createElement('option'); o.value = y.id; o.textContent = y.title.replace(/\.$/, '') + (y.optional ? ' (extra)' : ''); g.appendChild(o); });
        pk.appendChild(g); });
      pk.addEventListener('change', function(){ var k = TASKS.findIndex(function(y){ return y.id === pk.value; }); if(k >= 0){ S.open[TASKS[k].sec] = true; goTask(k); var h = $('#main h1'); if(h){ h.setAttribute('tabindex', '-1'); h.focus(); } } });
    }
    pk.value = t.id;
  }
  $('#taskTitle').textContent = t.title;
  $('#taskSub').textContent = t.sub;
  $('#whyTile').hidden = !t.why; $('#taskWhy').textContent = t.why || '';
  var mi = !!S.prefs.hideIntro; $('#introBody').hidden = mi; $('#introToggle').textContent = mi ? 'Show' : 'Minimize'; $('#introToggle').setAttribute('aria-expanded', String(!mi)); $('#introSec').classList.toggle('min', mi);
  var ob = $('#optBar'); ob.hidden = !t.optional || isLocked;
  if(t.optional) ob.innerHTML = '<span><b>' + (t.only ? 'For some learners.' : 'Optional.') + '</b> ' + (t.only ? t.only : t.later ? 'Do it now, or skip it: at the end, <b>Test &amp; share</b> has a step for every page at once.' : 'It is extra: skip it if you like, and come back any time.') + '</span> <button type="button" class="pill sm" id="skipOpt">Skip for now</button>';
  if(t.optional && !isLocked) $('#skipOpt').onclick = function(){ var n = TASKS.findIndex(function(x, i){ return i > S.task && !x.optional; }); goTask(n < 0 ? S.task + 1 : n); };
  renderChooser(t);
  var mw = !!S.prefs.hideWatch; $('#watchSec').hidden = t.visual === 'choose' || isLocked; $('#watchBody').hidden = mw;
  $('#watchToggle').textContent = mw ? 'Show' : 'Minimize'; $('#watchToggle').setAttribute('aria-expanded', String(!mw)); $('#watchSec').classList.toggle('min', mw);
  var steps = stepsOf(t);
  /* three ways to learn each step: the video, Watch (the pictures or the code being typed), or step by step */
  var vid = t.video || (SECTIONS[t.sec - 1] || {}).video;
  $('#waysRow').hidden = isLocked || t.visual === 'choose' || !!S.prefs.hideWatch;
  $('#wayVideo').hidden = !vid;
  $('#wayWatchT').textContent = 'Watch it step by step';
  $('#waySteps').hidden = !howOf(t); $('#waySteps').setAttribute('aria-pressed', String(!!S.prefs.pics)); $('#wayStepsT').textContent = S.prefs.pics ? 'Hide the pictures' : 'See a picture for every step';
  $('#wayWatchS').textContent = t.shots ? (t.ex ? 'Each step plays with its code picture: see exactly where the cursor goes' : 'Each step plays with its picture and words') : t.ex ? 'Each step plays with its picture, then the code is typed' : 'Each step plays with its picture and words';
  var how = howOf(t);
  $('#todo').innerHTML = steps.map(function(s, i){ var h = how && how[i];
    return '<li><span><span class="sr">Step ' + (i + 1) + ': </span>' + mod(s) + ((shotsOf(t) || [])[i] || '') + ((h && S.prefs.pics) ? '<a class="stephow" href="' + ROOT + 'images/steps/' + h[0] + '" target="_blank" rel="noopener"><img src="' + ROOT + 'images/steps/' + h[0] + '" alt="' + esc(h[1]) + '" loading="lazy"><span class="sr"> (opens larger in a new tab)</span></a>' : '') + '</span></li>'; }).join('');
  var figs = t[S.os === 'mac' ? 'figMac' : 'figWin'], fb = $('#stepFigs');
  var shot = (window.STEP_SHOTS || {})[t.id];
  fb.hidden = !(figs || shot) || $('#todo').hidden;
  fb.innerHTML = figs ? '<p class="figh">' + (S.os === 'mac' ? '<i class="ph ph-apple-logo" aria-hidden="true"></i> Unzip on a Mac' : '<i class="ph ph-windows-logo" aria-hidden="true"></i> Unzip on Windows') + '</p><ol class="figrow">' +
    figs.map(function(f){ return '<li><figure><img src="' + ROOT + 'images/setup/' + f[0] + '" alt="' + esc(f[1]) + '" width="360" height="250"><figcaption>' + f[2] + '</figcaption></figure></li>'; }).join('') + '</ol>' :
    shot ? '<figure class="stepshot' + (t.id === 'phone-test' ? ' tall' : '') + '"><a href="' + ROOT + 'images/steps/' + shot[0] + '" target="_blank" rel="noopener"><img src="' + ROOT + 'images/steps/' + shot[0] + '" alt="' + esc(shot[1]) + '" loading="lazy"><span class="sr"> (opens larger in a new tab)</span></a><figcaption>' + esc(shot[2]) + '</figcaption></figure>' : '';
  var vsp = (window.STEP_VS || {})[t.id];
  if(vsp){ fb.hidden = $('#todo').hidden;
    var vh = '<figure class="stepshot"><a href="' + ROOT + 'images/steps/' + vsp[0] + '" target="_blank" rel="noopener"><img src="' + ROOT + 'images/steps/' + vsp[0] + '" alt="' + esc(vsp[1]) + '" loading="lazy"><span class="sr"> (opens larger in a new tab)</span></a><figcaption>' + esc(vsp[2]) + '</figcaption></figure>';
    fb.innerHTML = figs ? fb.innerHTML + vh : vh + fb.innerHTML; }
  if(how){ fb.innerHTML = ''; fb.hidden = true; }   /* these steps carry their pictures inside the list */
  var q = $('#quickLine'); q.hidden = !S.level;
  q.innerHTML = '<b>Level up:</b> ' + mod(t.quick || t.sub) + ' <button type="button" class="pill sm" id="showSteps">Show the steps</button>';
  $('#moreLine').innerHTML = t.more ? mod(t.more) : ''; $('#moreLine').hidden = !t.more;
  var lt = (window.LEARN || {})[t.id]; $('#learnBox').hidden = !lt; $('#learnBox').open = false; $('#learnText').innerHTML = lt ? mod(lt) : '';
  if(S.level) $('#showSteps').onclick = function(){ $('#todo').hidden = !$('#todo').hidden; this.textContent = $('#todo').hidden ? 'Show the steps' : 'Hide the steps'; };
  $('#watchMeta').textContent = (t.ex ? 'Click the play icon to watch how to change the code.' : 'Click the play icon to watch the steps.') + ' Captions are on.';
  // modes
  $$('#modeSeg button').forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.mode === S.mode)); });
  $('#modeHelp').innerHTML = (S.mode === 'here'
    ? 'A stepping stone: edit right here, with support. Your edits stay in this browser until you press <b>Download my files</b>. Going into coding? Use VS Code: it is how real web pages are made.'
    : 'How real web pages are made: edit your own files in VS Code and use this page as your instructions. Tick the boxes when the change shows on your page.') +
    ' <span class="osnote">' + (S.os === 'mac' ? '<i class="ph ph-apple-logo" aria-hidden="true"></i> Mac steps: <kbd>Command</kbd> shortcuts' : '<i class="ph ph-windows-logo" aria-hidden="true"></i> Windows steps: <kbd>Ctrl</kbd> shortcuts') +
    (hasOsSteps(t) ? (S.os === 'mac' ? ', and Finder in this task.' : ', and File Explorer in this task.') : '.') + '</span>';
  /* once a way is chosen, the switch folds into one line; it opens again with one click */
  var mini = !!S.done['which-way'] && !render.showModes && t.visual !== 'choose';
  $('#modeSeg').hidden = mini; $('#modeHelp').hidden = mini; $('#modeMini').hidden = !mini || isLocked;
  $('#modeIco').className = 'ph ph-' + (S.mode === 'here' ? 'browser' : 'code');
  $('#modeTile').classList.toggle('wide', !mini); $('#modeTile').hidden = true;
  $('#modeMini').innerHTML = '<span><b>' + (S.mode === 'here' ? 'Edit here' : 'VS Code') + '</b> ' + (S.mode === 'here' ? '(a stepping stone)' : '(how real pages are made)') + '</span> <button type="button" class="linkish" id="showModes">Switch</button>';
  $('#showModes').onclick = function(){ render.showModes = true; render(); $('#modeSeg [aria-pressed="true"]').focus(); };
  if(!mini && S.done['which-way'] && t.visual !== 'choose') $('#modeHelp').insertAdjacentHTML('beforeend', ' <button type="button" class="linkish" id="hideModes">Hide this</button>');
  if($('#hideModes')) $('#hideModes').onclick = function(){ render.showModes = false; render(); $('#showModes').focus(); };
  $('#workHere').hidden = isLocked || S.mode !== 'here' || !!t.nowork;
  $('#viewBar').hidden = isLocked || S.mode !== 'here' || !!t.nowork;
  applyView();
  $('#workVS').hidden = isLocked || S.mode !== 'vscode' || t.visual === 'choose';
  /* steps with no code to change (setting up, publishing) show only the tick boxes, not File / Save / paste */
  $('#workVS').classList.toggle('nocode', !(t.checks && t.checks.length));
  $('#beforePanel').hidden = true;
  $('#saveHelp').innerHTML = S.mode === 'here'
    ? 'Your progress and edits are kept in this browser. They are not on your computer until you press <b>Download my files</b>. ' +
      (!S.backedUp ? '<b>No backup yet.</b> Download one after each page, and keep the zip.' : sinceBackup() > 0 ? 'Last backup: ' + sinceBackup() + ' step' + (sinceBackup() > 1 ? 's' : '') + ' ago.' : '<b>Backed up.</b> If anything happens to this browser, press <b>Import my files</b> and choose your zip.')
    : 'Your progress (which steps are done) is kept in this browser. Your real work is in your ' + folderOf(t) + ' folder: save it in VS Code.';
  $('#findBtn').hidden = !t.find;
  $('#downloadBtn').innerHTML = '<i class="ph ph-download-simple" aria-hidden="true"></i> ' + (S.mode === 'here' ? 'Download my files' : 'Download the template');
  $('#footLine').innerHTML = S.mode === 'here'
    ? '<i class="ph ph-browser" aria-hidden="true"></i> Your work stays in this browser as you go. Press <b>Download my files</b> to keep a copy on your computer and to hand it in.'
    : '<i class="ph ph-lock-simple" aria-hidden="true"></i> Your ticks are kept in this browser only. Nothing is sent anywhere.';
  $$('[data-dev]').forEach(function(x){ x.setAttribute('aria-pressed', String(x.dataset.dev === (S.dev || autoDev()))); });
  setTimeout(fitFrame, 0);
  $('#selfHere').innerHTML = ''; $('#selfHere').hidden = true;
  if(S.mode === 'here' && t.nowork){ renderSelfCheck(false); }
  else if(isLocked){ $('#mediaBar').hidden = true; previewPage = t.page; }
  else if(S.mode === 'here'){ ensureNewFile(t); extraPage = null; renderTabs(t); previewPage = t.page; runPreview(); paintPages(); renderMedia(t); showSpot(t); }
  else if(!isLocked){ previewPage = t.page; $('#pasteBox').value = ''; renderVS(t); $('#beforePanel').hidden = !!t.nowork; paintBefore();
    $$('[data-devb]').forEach(function(x){ x.setAttribute('aria-pressed', String(x.dataset.devb === (S.devB || autoDev()))); });
    setTimeout(runBefore, 0); }
  // patch
  $('#otherWayBtn').hidden = !Patch.aiAvailable();
  var inC = isChrome(), cn = $('#chromeNote'); cn.hidden = inC && t.id !== 'setup-here';
  cn.innerHTML = '<i class="ph ph-info" aria-hidden="true"></i> ' + (inC
    ? 'Good: you\u2019re in <b>Google Chrome</b>. Keep using it. Patch\u2019s helper runs on Chrome\u2019s built-in AI (Gemini Nano).'
    : 'Use <b>Google Chrome</b> for this tutorial. Patch\u2019s helper runs on Chrome\u2019s built-in AI (Gemini Nano). <b>Microsoft Edge</b> looks the same but is not: Patch gives less help there. Patch\u2019s checks still work in any browser.');
  say(S.done[t.id] ? '<p class="ok"><i class="ph-fill ph-check-circle" aria-hidden="true"></i> You finished this one. Press <b>Next step</b> when you\u2019re ready.</p>'
                   : '<p>' + 'Follow the steps, then tick the boxes.' + ' Stuck? I\u2019ll give you one hint at a time.</p>', {nudge:false});
  $('#rateRow').hidden = true;
  // nav
  $('#prevBtn').disabled = S.task === 0;
  var nx = TASKS[S.task + 1];
  $('#nextBtn').innerHTML = nx ? 'Next step <i class="ph ph-arrow-right" aria-hidden="true"></i>' : 'Finish <i class="ph ph-flag-checkered" aria-hidden="true"></i>';
  $('#nextBtn').title = nx ? 'Next: ' + nx.title : '';
  $('#watchPanel').hidden = true; stopWatch();
  $$('kbd.mod').forEach(function(k){ k.textContent = S.os === 'mac' ? 'Command' : 'Ctrl'; });
  $$('[data-os]').forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.os === S.os)); });
  renderJourney();
}
function goTask(i){
  if(i < 0 || i >= TASKS.length) return;
  if(i < S.task) Patch.signal('back');
  S.task = i; snapshot(); save(); render(); Patch.signal('enter');
  if(window.speechSynthesis) speechSynthesis.cancel(); $('#listenBar').hidden = true;
  $('#main').focus({preventScroll:true}); window.scrollTo({top:0, behavior:calm() ? 'auto' : 'smooth'});
}
function snapshot(){ var t = task(); if(S.snap[t.id]) return; var o = {}; tabsFor(t).forEach(function(p){ o[p] = cur(p); }); S.snap[t.id] = o; }

/* ---------------- download my files (a real zip of the capstone folder) ---------------- */
function download(){
  if(typeof JSZip === 'undefined'){ toast('The download tool did not load. Check your internet connection and try again.'); return; }
  var changed = Object.keys(S.files).filter(function(p){ return S.files[p] !== TPL[p] && (TPL[p] != null || S.files[p]); });
  var pics = Object.keys(MEDIA);
  toast('Making your zip\u2026');
  var zip = new JSZip(), root = zip.folder('capstone'), missing = [];
  root.folder('media');
  var jobs = FILE_LIST.map(function(p){
    if(MEDIA[p]) return Promise.resolve();
    if(TPL[p] != null){ root.file(p, cur(p)); return Promise.resolve(); }
    return fetch(TPL_BASE + p).then(function(r){ return r.blob(); }).then(function(b){ root.file(p, b); }, function(){ missing.push(p); });
  });
  Object.keys(MEDIA).forEach(function(p){ root.file(p, MEDIA[p]); });
  Object.keys(S.files).forEach(function(p){ if(FILE_LIST.indexOf(p) < 0 && S.files[p]) root.file(p, S.files[p]); });
  Promise.all(jobs).then(function(){ return zip.generateAsync({type:'blob'}); }).then(function(blob){
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'capstone.zip';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(a.href); }, 4000);
    S.backupAt = doneCount(); S.backedUp = true; save(); if($('#saveHelp')) render();
    var what = (changed.length || pics.length)
      ? 'It has your changes to ' + changed.map(function(p){ return '<b>' + esc(p) + '</b>'; }).join(', ') + (changed.length && pics.length ? ', and ' : '') + (pics.length ? pics.length + ' file' + (pics.length > 1 ? 's' : '') + ' you added' : '') + '.'
      : (S.mode === 'vscode' ? 'In VS Code mode your work is in your own capstone folder, so this zip is the original template.' : 'You have not changed anything in Edit here yet, so this zip is the original template.');
    say('<p class="ok"><i class="ph-fill ph-check-circle" aria-hidden="true"></i> Downloaded <b>capstone.zip</b>.</p><p>' + what + '</p><p class="muted small">Downloaded more than once? Your browser may name the newest one <b>capstone (1).zip</b>. Open the newest one.</p>', {});
    toast('Downloaded <b>capstone.zip</b>. ' + what +
      (missing.length ? ' (' + missing.length + ' template picture' + (missing.length > 1 ? 's' : '') + ' could not be added because this page was opened as a file: they are in the template download.)' : ''));
  }, function(){ toast('The download did not work. Try again in a moment.'); });
}

/* ---------------- import: bring VS Code work into Edit here ---------------- */
function importFiles(files){
  var known = Object.keys(TPL), n = 0, jobs = [];
  function place(name, getText, getBlob){
    var clean = name.replace(/\\/g, '/').replace(/^.*?(?=(css\/|images\/|media\/|[^\/]+\.html$))/, '');
    if(/\.(html|css)$/.test(clean)){
      var hit = known.indexOf(clean) >= 0 ? clean : known.filter(function(k){ return k.split('/').pop() === clean.split('/').pop(); })[0];
      if(!hit) return;
      jobs.push(getText().then(function(t){ if(t === TPL[hit]) delete S.files[hit]; else S.files[hit] = t; n++; }));
    } else if(/^(images|media)\//.test(clean)){
      jobs.push(getBlob().then(function(b){ n++; return dbPut(clean, b); }));
    } else if(/\.(jpe?g|png|webp|gif|svg)$/i.test(clean)){
      jobs.push(getBlob().then(function(b){ n++; return dbPut('images/' + clean.split('/').pop().toLowerCase(), b); }));
    }
  }
  Array.prototype.forEach.call(files, function(f){
    if(/\.zip$/i.test(f.name) && typeof JSZip !== 'undefined'){
      jobs.push(JSZip.loadAsync(f).then(function(z){
        var inner = [];
        z.forEach(function(path, entry){ if(entry.dir || /(^|\/)(\.|__MACOSX)/.test(path)) return;
          place(path, function(){ return entry.async('string'); }, function(){ return entry.async('blob'); }); });
        return Promise.all(inner);
      }));
    } else place(f.name, function(){ return f.text(); }, function(){ return Promise.resolve(f); });
  });
  var settle = function(){ return Promise.all(jobs).then(function(){ var more = jobs.length; return more; }); };
  // zip entries add jobs while loading, so wait twice
  return Promise.all(jobs).then(function(){ return Promise.all(jobs); }).then(function(){
    save(); render();
    toast(n ? 'Imported ' + n + ' file' + (n > 1 ? 's' : '') + '. Your preview now shows your files.' : 'No capstone files found. Choose your capstone zip, or files like index.html and css/index.css.');
  });
}

/* ---------------- small screens: Code / Preview tabs ---------------- */
function showPane(which){
  var w = $('#workHere');
  w.classList.toggle('show-code', which === 'code'); w.classList.toggle('show-prev', which === 'prev');
  $('#tabCode').setAttribute('aria-selected', String(which === 'code')); $('#tabPrev').setAttribute('aria-selected', String(which === 'prev'));
  if(which === 'code' && cm) cm.refresh();
  if(which === 'prev'){ runPreview(); setTimeout(fitFrame, 0); }
}
function applyView(){
  var v = S.view || 'both', w = $('#workHere');
  w.classList.toggle('only-code', v === 'code'); w.classList.toggle('only-prev', v === 'prev');
  $$('[data-view]').forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.view === v)); });
  if(cm) setTimeout(function(){ cm.refresh(); }, 0);
  setTimeout(fitFrame, 0);
}
function closeJourney(){ $('#journey').classList.remove('open'); $('#journeyBtn').setAttribute('aria-expanded', 'false'); }

/* ---------------- display & audio ---------------- */
var FONT_CSS = {dys:['https://cdn.jsdelivr.net/npm/@fontsource/opendyslexic@5.2.5/400.css','https://cdn.jsdelivr.net/npm/@fontsource/opendyslexic@5.2.5/700.css'],
  easy:['https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap']};
function loadFont(f){ (FONT_CSS[f] || []).forEach(function(u){ if(document.querySelector('link[href="' + u + '"]')) return;
  var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = u; document.head.appendChild(l); }); }
function applyPrefs(){
  var p = S.prefs, h = document.documentElement;
  h.style.setProperty('--fs', p.size || 1);
  if(p.theme) h.setAttribute('data-theme', p.theme); else h.removeAttribute('data-theme');
  h.setAttribute('data-calm', p.calm ? '1' : '0');
  h.setAttribute('data-font', p.font || 'std'); loadFont(p.font);
  var fn = {dys:'OpenDyslexic', easy:'Easy to read'}[p.font]; $('#fontChip').hidden = !fn; $('#fontChipName').textContent = fn || '';
  $$('[data-font]').forEach(function(b){ if(b.tagName === 'BUTTON') b.setAttribute('aria-pressed', String(b.dataset.font === (p.font || 'std'))); });
  $$('[data-size]').forEach(function(b){ b.setAttribute('aria-pressed', String(+b.dataset.size === +(p.size || 1))); });
  var th = p.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  $$('[data-theme]').forEach(function(b){ if(b.tagName === 'BUTTON') b.setAttribute('aria-pressed', String(b.dataset.theme === th)); });
  $('#watchBox').checked = !p.hideWatch;
  $('#calmBox').checked = !!p.calm; $('#rateSel').value = String(p.rate || 1);
  if(cm) cm.refresh();
}

/* ---------------- wiring ---------------- */
function wire(){
  $$('#modeSeg button').forEach(function(b){ b.addEventListener('click', function(){
    if(S.mode === b.dataset.mode) return;
    var to = b.dataset.mode; S.mode = to; save(); render();
    toast(to === 'vscode' ? 'Using VS Code. Your Edit here changes stay in this browser: press <b>Download my files</b> to take them to VS Code.'
                          : 'Editing here. This page can\u2019t open your VS Code files by itself: press <b>Import my files</b> to bring them in.');
  }); });
  $$('[data-os]').forEach(function(b){ b.addEventListener('click', function(){ S.os = b.dataset.os; save(); render();
    toast(S.os === 'mac' ? 'Showing Mac steps: <b>Command</b> shortcuts, Finder and Preview.' : 'Showing Windows steps: <b>Ctrl</b> shortcuts and File Explorer.'); }); });
  $('#findBtn').addEventListener('click', findIt);
  $$('[data-devb]').forEach(function(b){ b.addEventListener('click', function(){ S.devB = b.dataset.devb; save();
    $$('[data-devb]').forEach(function(x){ x.setAttribute('aria-pressed', String(x === b)); }); runBefore(); }); });
  $('#beforeFull').addEventListener('click', function(){ var html = $('#beforeFrame').srcdoc; if(!html) return;
    var u = URL.createObjectURL(new Blob([html], {type:'text/html'})); if(!window.open(u, '_blank')) toast('Your browser blocked the new window. Allow pop-ups for this page.'); setTimeout(function(){ URL.revokeObjectURL(u); }, 60000); });
  $$('[data-page]').forEach(function(b){ b.addEventListener('click', function(){ openPage(b.dataset.page); }); });
  $$('[data-view]').forEach(function(b){ b.addEventListener('click', function(){ S.view = b.dataset.view; save(); applyView(); if(S.view !== 'code') runPreview(); }); });
  $('#undoBtn').addEventListener('click', function(){ if(cm){ cm.undo(); cm.focus(); } });
  $('#resetBtn').addEventListener('click', function(){
    var t = task(), sn = S.snap[t.id]; if(!sn) return;
    if(!confirm('Put ' + Object.keys(sn).join(', ') + ' back the way they were when you started this task?')) return;
    Object.keys(sn).forEach(function(p){ if(sn[p] === TPL[p]) delete S.files[p]; else S.files[p] = sn[p]; });
    save(); openFile(openPath); runPreview(); toast('This task\u2019s files are back to how they were when you started it.');
  });
  $('#runBtn').addEventListener('click', function(){ runPreview(); showPane('prev'); });
  $('#fullBtn').addEventListener('click', function(){
    /* the same page the preview shows, in its own window at full size (it is not your files on your computer) */
    var html = $('#preview').srcdoc; if(!html) return;
    var u = URL.createObjectURL(new Blob([html], {type:'text/html'}));
    var w = window.open(u, '_blank');
    if(!w) toast('Your browser blocked the new window. Allow pop-ups for this page, then try again.');
    setTimeout(function(){ URL.revokeObjectURL(u); }, 60000);
  });
  $$('[data-dev]').forEach(function(b){ b.addEventListener('click', function(){
    $$('[data-dev]').forEach(function(x){ x.setAttribute('aria-pressed', String(x === b)); });
    S.dev = b.dataset.dev; save(); fitFrame(); }); });
  $('#tabCode').addEventListener('click', function(){ showPane('code'); });
  $('#tabPrev').addEventListener('click', function(){ showPane('prev'); });
  $('#checkBtn').addEventListener('click', checkEdit);
  $('#downloadBtn').addEventListener('click', download);
  document.addEventListener('click', function(e){ var b = e.target.closest && e.target.closest('[data-backup]'); if(b) download(); });
  note('saved');
  $('#importInput').addEventListener('change', function(){ if(this.files.length){ importFiles(this.files); this.value = ''; } });
  $('#stuckBtn').addEventListener('click', function(){ hint(false); });
  $('#hintBtn').addEventListener('click', function(){ hint(true); });
  $('#showBtn').addEventListener('click', openWatch);
  $('#watchBtn').addEventListener('click', openWatch);
  $('#askPatch').addEventListener('click', function(){ $('#patch').scrollIntoView({behavior:calm() ? 'auto' : 'smooth', block:'center'}); var b = $('#stuckBtn'); if(b) b.focus({preventScroll:true}); });
  $('#wayWatch').addEventListener('click', function(){ var s = $('#watchSec'); $('#watchBody').hidden = true; openWatch(); s.scrollIntoView({behavior:calm() ? 'auto' : 'smooth', block:'start'}); });
  $('#waySteps').addEventListener('click', function(){ S.prefs.pics = !S.prefs.pics; S.prefs.hideSteps = false; save(); render();
    toast(S.prefs.pics ? 'Pictures are on: one under each step.' : 'Pictures are off.');
    $('#todoH').scrollIntoView({behavior:calm() ? 'auto' : 'smooth', block:'start'}); });
  $('#wayListen').addEventListener('click', function(){ $('#listenBtn').click(); });
  $('#wayVideo').addEventListener('click', function(){ var t = task(), v = t.video || (SECTIONS[t.sec - 1] || {}).video; if(!v) return;
    Patch.signal('video'); $('#videoFrame').src = v; $('#videoH').textContent = 'Watch the video: ' + t.title.replace(/\.$/, '');
    var d = $('#videoDlg'); if(d.showModal) d.showModal(); else window.open(v, '_blank', 'noopener'); });
  $('#videoClose').addEventListener('click', function(){ $('#videoFrame').src = 'about:blank'; $('#videoDlg').close(); $('#wayVideo').focus(); });
  $('#videoDlg').addEventListener('close', function(){ $('#videoFrame').src = 'about:blank'; });
  $('#otherWayBtn').addEventListener('click', function(){
    var t = task(); say('<p>Thinking\u2026</p>', {});
    Patch.anotherWay(t, 'In short: ' + strip(t.sub) + ' Find the spot, change one thing, then check your page.').then(function(r){
      if(!r) return;
      say('<p>' + esc(r.text).replace(/\n/g, '<br>') + '</p>', r.src === 'lesson' ? {} : {src:'model', model:r.src});
    });
  });
  $$('[data-rate]').forEach(function(b){ b.addEventListener('click', function(){
    S.fb.push({task:task().id, helpful:b.dataset.rate === 'yes'}); S.fb = S.fb.slice(-100); save();
    toast(b.dataset.rate === 'yes' ? 'Thanks. Glad that helped.' : 'Thanks for telling me. Try <b>Another hint</b> or <b>Show me</b>.'); $('#rateRow').hidden = true; }); });
  $('#patchListen').addEventListener('click', function(){ speak(strip($('#patchMsg').innerHTML)); });
  $('#listenBtn').addEventListener('click', listenTask);
  $('#listenPause').addEventListener('click', function(){
    if(!window.speechSynthesis) return;
    if(L.paused){ speechSynthesis.resume(); L.paused = false; this.innerHTML = '<i class="ph ph-pause" aria-hidden="true"></i> Pause'; $('#listenState').textContent = 'Reading aloud\u2026'; }
    else { speechSynthesis.pause(); L.paused = true; this.innerHTML = '<i class="ph ph-play" aria-hidden="true"></i> Resume'; $('#listenState').textContent = 'Paused.'; } });
  $('#listenStop').addEventListener('click', function(){ if(window.speechSynthesis) speechSynthesis.cancel(); $('#listenBar').hidden = true; });
  $('#prevBtn').addEventListener('click', function(){ goTask(S.task - 1); });
  $('#nextBtn').addEventListener('click', function(){ if(S.task < TASKS.length - 1) goTask(S.task + 1); else toast(PART ? PART.end : 'That is the last step. Your About page is done. Well done!'); });
  $('#journeyBtn').addEventListener('click', function(){ var j = $('#journey'), o = !j.classList.contains('open'); j.classList.toggle('open', o); this.setAttribute('aria-expanded', String(o)); if(o){ var f = $('button[aria-current]', j); if(f) f.focus(); } });
  $('#displayBtn').addEventListener('click', function(){
    $('#aiStatus').innerHTML = Patch.aiAvailable()
      ? 'Your browser has a built-in AI model. Patch can use it to <b>say it another way</b>, on this device only. It never grades your work.'
      : 'Your browser does not offer a built-in AI model (Chrome\u2019s on-device model, the Prompt API, is not available or not switched on). Patch still works: checks, hints and nudges come from the lesson, in this browser.';
    $('#displayDlg').showModal(); });
  $$('[data-size]').forEach(function(b){ b.addEventListener('click', function(){ S.prefs.size = +b.dataset.size; save(); applyPrefs(); }); });
  $$('button[data-theme]').forEach(function(b){ b.addEventListener('click', function(){ S.prefs.theme = b.dataset.theme; save(); applyPrefs(); }); });
  $$('button[data-font]').forEach(function(b){ b.addEventListener('click', function(){ S.prefs.font = b.dataset.font; save(); applyPrefs(); if(cm) setTimeout(function(){ cm.refresh(); }, 400); }); });
  $('#introToggle').addEventListener('click', function(){ S.prefs.hideIntro = !S.prefs.hideIntro; save(); var mi = !!S.prefs.hideIntro; $('#introBody').hidden = mi; this.textContent = mi ? 'Show' : 'Minimize'; this.setAttribute('aria-expanded', String(!mi)); $('#introSec').classList.toggle('min', mi); });
  $('#beforeToggle').addEventListener('click', function(){ S.prefs.showTpl = false; save(); paintBefore(); });
  $('#watchToggle').addEventListener('click', function(){ S.prefs.hideWatch = !S.prefs.hideWatch; save(); applyPrefs(); var mw = !!S.prefs.hideWatch; $('#watchBody').hidden = mw; stopWatch(); $('#watchPanel').hidden = true; this.textContent = mw ? 'Show' : 'Minimize'; this.setAttribute('aria-expanded', String(!mw)); $('#watchSec').classList.toggle('min', mw); });
  $('#watchBox').addEventListener('change', function(){ S.prefs.hideWatch = !this.checked; save(); render(); });
  $('#fontChip').addEventListener('click', function(){ S.prefs.font = 'std'; save(); applyPrefs(); if(cm) setTimeout(function(){ cm.refresh(); }, 200); toast('Standard font is back. Change it any time in <b>Display &amp; audio</b>.'); $('#displayBtn').focus(); });
  $('#stepsToggle').addEventListener('click', function(){ S.prefs.hideSteps = !S.prefs.hideSteps; save(); renderChooser(task()); var hs = !!S.prefs.hideSteps; this.textContent = hs ? 'Show' : 'Minimize'; this.setAttribute('aria-expanded', String(!hs)); $('.steps').classList.toggle('min', hs); });
  $('#calmBox').addEventListener('change', function(){ S.prefs.calm = this.checked; save(); applyPrefs(); });
  $('#rateSel').addEventListener('change', function(){ S.prefs.rate = +this.value; save(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeJourney(); });
}

/* ---------------- start ---------------- */
function start(){
  applyPrefs(); wire();
  if(typeof CodeMirror === 'undefined'){ $('#editor').innerHTML = '<p style="padding:1rem">The code editor did not load. Check your internet connection and reload, or switch to <b>Use VS Code</b>.</p>'; }
  else makeEditor();
  if(matchMedia('(max-width:980px)').matches) showPane('code');
  Promise.all([loadTemplate(), dbOpen().then(dbAll)]).then(function(){
    Patch.init({state:function(){ return S; }, save:save, say:say, task:task});
    snapshot(); render(); Patch.signal('enter');
  }, function(err){
    $('#taskTitle').textContent = 'The template did not load.';
    $('#taskSub').textContent = 'Reload the page. If it still does not load, open it from the course website. Details: ' + err.message;
  });
}
start();
})();
