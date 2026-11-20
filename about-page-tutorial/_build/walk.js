/* A check to paste into the browser console (or run from a test tool) on any tutorial page.
   It walks every step of the page on Windows and on Mac and reports anything wrong:
   a wrong title, a step without its picture, a drawing wider than its box, a leftover {token}. */
(async function () {
  const $ = s => document.querySelector(s), errs = [];
  const part = window.LW_PART, mine = part ? TASKS.filter(t => part.secs.indexOf(t.sec) >= 0) : TASKS;
  const seg = [...document.querySelectorAll('.seg button')].filter(b => /^(Mac|Windows)$/.test(b.textContent.trim()));
  let pics = 0;
  for (const osb of [seg[0], seg[1]]) {
    osb.click(); const os = osb.textContent.trim() === 'Mac' ? 'Mac' : 'Win';
    let g = 0; while (!$('#prevBtn').disabled && g++ < 200) $('#prevBtn').click();
    for (const t of mine) {
      if ($('#main h1').textContent.trim() !== t.title) errs.push(os + ' title ' + t.id + ': ' + $('#main h1').textContent.trim());
      const want = ((os === 'Mac' && t.shotsMac) || t.shots || []).filter(Boolean).length, got = [...document.querySelectorAll('#todo .shot, #todo .scene')].filter(e => !e.parentElement.closest('.scene')).length;   /* a drawing may hold a sample code picture */
      pics += got;
      if (document.querySelectorAll('#todo li').length !== t['vs' + os].length || got !== want) errs.push(os + ' counts ' + t.id);
      document.querySelectorAll('#todo .scene').forEach((s, k) => { if (s.scrollWidth > s.clientWidth + 2) errs.push(os + ' ' + t.id + ' step ' + (k + 1) + ' drawing overflows'); });
      if (/\{(enter|end|esc|mod)\}/.test($('#main').innerHTML)) errs.push('token ' + t.id);
      if ((t.video || (SECTIONS[t.sec - 1] || {}).video) && $('#wayVideo').hidden) errs.push('no video ' + t.id);
      $('#wayWatch').click(); if (!$('#wStage') || !$('#wStage').innerHTML) errs.push('watch ' + t.id); const c = $('#wClose'); if (c) c.click();
      $('#nextBtn').click(); await new Promise(r => setTimeout(r, 20));
    }
  }
  let g = 0; while (!$('#prevBtn').disabled && g++ < 200) $('#prevBtn').click();
  window.scrollTo(0, 0);
  window.WALK = { page: document.title, tasks: mine.length, pictures: pics, problems: errs.length, list: errs.slice(0, 25) };
  console.log(JSON.stringify(window.WALK));
})();
