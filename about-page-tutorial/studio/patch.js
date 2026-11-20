/* ==========================================================
   Patch \u2014 the nano feedback system, carried over from the Living Web
   lesson engine (_build/engine-base.html, "Patch's coach").

   Everything runs in this browser. No student data is sent anywhere.
   Three tiers, unchanged:
     Tier 0  the nano model below \u2014 a few KB of weights and phrases.
             Always on, no download, works offline. It watches how the
             learner is working (idle, re-watching, pasting, misses) and
             picks one short nudge.
     Tier 1  the browser's own on-device model (Chrome's built-in Gemini
             Nano, the Prompt API: window.LanguageModel). Used only to say
             an idea another way. Checked for availability first; if the
             model is not downloaded and ready, Patch falls back quietly.
     Tier 2  an optional larger WebAssembly/WebGPU model (WebLLM), off by
             default because of the download size.

   "Check my edit" is NOT done by a model: app.js runs real checks on the
   learner's code and Patch only words the result. Patch never claims code
   was checked when it was not.
   ========================================================== */
var PATCH_CONFIG = {
  bigBrain: {
    enabled: false,
    label:   'Llama 3.2 1B (about 700 MB, one time)',
    module:  'https://esm.run/@mlc-ai/web-llm',
    model:   'Llama-3.2-1B-Instruct-q4f32_1-MLC'
  }
};

var Patch = (function(){
  var SIG = {t0:Date.now(), lastAct:Date.now(), lastCoach:0, typed:0, pasted:0, wrong:0, rightFirst:0, videoOpens:0, back:0, fired:{}, justDone:false, enter:Date.now()};
  var AI = {tier:0, session:null, engine:null, busy:false};
  var ctx = null;   // supplied by app.js: {state, save, say(html, opts), task()}

  /* ---------- Tier 0: the nano model ---------- */
  var NANO = [
    {id:'welcome_back', min:1.6, cool:0,    w:{daysAway:2.4}},
    {id:'stuck_idle',   min:1.5, cool:240,  w:{idle:1.4, noType:.5, back:.4}},
    {id:'rewatch',      min:1.4, cool:300,  w:{video:1.1, back:.6}},
    {id:'wrong_twice',  min:1.4, cool:180,  w:{wrongHere:1.5}},
    {id:'wrong_lots',   min:2.0, cool:600,  w:{wrongTotal:1.4, fastWrong:.9}},
    {id:'pasting',      min:1.4, cool:900,  w:{paste:1.5}},
    {id:'not_started',  min:1.5, cool:420,  w:{longNoInput:1.6}},
    {id:'confident',    min:1.8, cool:300,  w:{streak:1.3, quick:.8}},
    {id:'finished_step',min:1.2, cool:0,    w:{justDone:1.4}},
    {id:'long_haul',    min:1.7, cool:900,  w:{sessionLong:1.5, progress:.6}}
  ];
  var LINES = {
    welcome_back:['Welcome back. The work waited, and so did I. Pick up right where you left off.',
                  'There you are. Nothing here expired while you were gone.'],
    stuck_idle:['Still with me? Press <b>I\u2019m stuck</b> and I\u2019ll give you one small hint.',
                'This one is taking a while. That\u2019s allowed. Want a hint, or to watch it done?'],
    rewatch:['Watching again is what careful learners do. Ready to try it in Your code?',
             'Second look? Good instinct. Pause it at the edit and copy the idea, not the words.'],
    wrong_twice:['You\u2019re closer than you think. Want a hint that points at the spot?',
                 'Two tries so far. Usually it is one small thing, like a missing quote mark.'],
    wrong_lots:['Let\u2019s slow down. Press <b>Show me</b> and watch the edit once, then try again.',
                'A run of misses usually means one small detail. <b>Reset step</b> gives you a clean start.'],
    pasting:['I noticed some pasting. Type this one yourself: your fingers remember what your eyes skim past.',
             'Pasting gets you a page. Typing gets you a skill.'],
    not_started:['Your code is waiting. Press <b>Find it for me</b> and I\u2019ll show you where to start.',
                 'Start small: find the spot first, then change one thing.'],
    confident:['You\u2019ve got this. Keep going: the next task is waiting.',
               'Three in a row, first try. Keep that pace.'],
    finished_step:['Done. Your web page is further along than it was ten minutes ago.',
                   'Nice. On to the next one.'],
    long_haul:['You\u2019ve been at this a good while. Stretch, get water. Your progress is saved here.',
               'Long session. Five minutes away now beats an hour of fog later.']
  };

  function stepSig(){
    var st = ctx.state(), id = ctx.task().id;
    st.sig = st.sig || {};
    st.sig[id] = st.sig[id] || {visits:0, wrong:0, right:0, typed:0, pasted:0, video:0};
    return st.sig[id];
  }
  function features(){
    var now = Date.now(), st = ctx.state(), g = stepSig();
    var onStep = now - SIG.enter, days = st.coach && st.coach.lastSeen ? (now - st.coach.lastSeen) / 86400000 : 0;
    var done = Object.keys(st.done || {}).length;
    return {
      daysAway:Math.min(days / 2, 1), idle:Math.min((now - SIG.lastAct) / 120000, 1.3),
      noType:g.typed === 0 ? 1 : 0, back:Math.min(SIG.back / 3, 1), video:Math.min(g.video / 2, 1),
      wrongHere:Math.min(g.wrong / 2, 1), wrongTotal:Math.min(SIG.wrong / 4, 1),
      fastWrong:SIG.wrong >= 3 && onStep < 240000 ? 1 : 0, paste:Math.min(SIG.pasted / 2, 1),
      longNoInput:(g.typed === 0 && onStep > 180000) ? 1 : 0, streak:Math.min(SIG.rightFirst / 3, 1),
      quick:onStep > 0 && onStep < 90000 ? 1 : 0, justDone:SIG.justDone ? 1 : 0,
      sessionLong:Math.min((now - SIG.t0) / 3600000, 1.2), progress:done / TASKS.length
    };
  }
  function pick(){
    var f = features(), now = Date.now(), best = null, bestScore = 0;
    NANO.forEach(function(it){
      var last = SIG.fired[it.id] || 0;
      if(it.cool && now - last < it.cool * 1000) return;
      var sc = 0; Object.keys(it.w).forEach(function(k){ sc += it.w[k] * (f[k] || 0); });
      if(sc >= it.min && sc > bestScore){ best = it; bestScore = sc; }
    });
    return best;
  }
  function line(id){ var b = LINES[id] || ['']; var st = ctx.state(); st.coach.shown = (st.coach.shown || 0) + 1; return b[st.coach.shown % b.length]; }
  function tick(){
    var st = ctx.state(); if(!st.coach || st.coach.level === 'off') return;
    if(Date.now() - SIG.lastCoach < 100000) return;
    var p = pick(); if(!p) return;
    SIG.fired[p.id] = Date.now(); SIG.lastCoach = Date.now(); SIG.justDone = false;
    st.coach.log = (st.coach.log || []).slice(-60); st.coach.log.push({id:p.id, at:Date.now()}); ctx.save();
    ctx.say('<p>' + line(p.id) + '</p>', {nudge:true, src:'on-device coach'});
  }

  /* ---------- signals from the app ---------- */
  function signal(kind){
    SIG.lastAct = Date.now();
    var g = stepSig();
    if(kind === 'type'){ SIG.typed++; g.typed++; }
    if(kind === 'paste'){ SIG.pasted++; g.pasted++; }
    if(kind === 'video'){ SIG.videoOpens++; g.video++; }
    if(kind === 'back'){ SIG.back++; }
    if(kind === 'wrong'){ g.wrong++; SIG.wrong++; SIG.rightFirst = 0; }
    if(kind === 'right'){ g.right++; if(g.wrong === 0) SIG.rightFirst++; }
    if(kind === 'complete'){ SIG.justDone = true; }
    if(kind === 'enter'){ SIG.enter = Date.now(); g.visits++; }
    ctx.save();
  }

  /* ---------- Tier 1 / Tier 2: on-device model, only to say it another way ---------- */
  function aiAvailable(){ return (typeof window.LanguageModel !== 'undefined' || (window.ai && window.ai.languageModel)) ? 1 : 0; }
  function aiAsk(prompt){
    if(AI.engine){
      return AI.engine.chat.completions.create({messages:[{role:'user', content:prompt}], max_tokens:160})
        .then(function(r){ return r.choices[0].message.content; });
    }
    var LM = window.LanguageModel || (window.ai && window.ai.languageModel);
    if(!LM) return Promise.reject(new Error('no on-device model'));
    AI.tier = 1;
    if(AI.session) return AI.session.prompt(prompt);
    /* A browser can advertise a built-in model that is not downloaded yet. Asking it
       to create a session then blocks on a download the student never agreed to,
       so check first and fall back quietly if it is not ready now. */
    var ready = LM.availability ? Promise.resolve(LM.availability())
              : (LM.capabilities ? Promise.resolve(LM.capabilities()).then(function(c){ return c && c.available; }) : Promise.resolve('available'));
    return ready.then(function(state){
      if(state !== 'available' && state !== 'readily') throw new Error('on-device model is not ready: ' + state);
      return (LM.create ? LM.create() : LM.createTextSession());
    }).then(function(sess){ AI.session = sess; return sess.prompt(prompt); });
  }
  function anotherWay(task, fallback){
    if(AI.busy) return Promise.resolve(null);
    if(!aiAvailable() && !AI.engine) return Promise.resolve({text:fallback, src:'lesson'});
    AI.busy = true;
    var prompt = 'You are Patch, a warm, plain-spoken tutor in a first-week college multimedia class. ' +
      'The student is on this task: "' + task.title + ' ' + (task.sub || '') + '". ' +
      'Explain the idea a second way in at most three short sentences, using an everyday comparison. ' +
      'Do NOT write their code. End with one short line of encouragement.';
    var timer, settled = false;
    return new Promise(function(resolve){
      timer = setTimeout(function(){ if(settled) return; settled = true; AI.busy = false; resolve({text:fallback, src:'lesson'}); }, 6000);
      aiAsk(prompt).then(function(text){
        if(settled) return; settled = true; clearTimeout(timer); AI.busy = false;
        resolve(text && String(text).trim() ? {text:String(text).trim(), src:(AI.tier === 2 ? 'the local model' : 'your browser\u2019s built-in model')} : {text:fallback, src:'lesson'});
      }, function(){ if(settled) return; settled = true; clearTimeout(timer); AI.busy = false; resolve({text:fallback, src:'lesson'}); });
    });
  }

  function init(c){
    ctx = c;
    var st = ctx.state();
    if(!st.coach) st.coach = {level:'on', log:[], lastSeen:null, sessions:0, shown:0};
    st.coach.sessions = (st.coach.sessions || 0) + 1;
    ['pointerdown','keydown','input'].forEach(function(ev){ document.addEventListener(ev, function(){ SIG.lastAct = Date.now(); }, {passive:true}); });
    setInterval(tick, 20000);
    setTimeout(tick, 4000);   // welcome back, if it has been a while
    window.addEventListener('beforeunload', function(){ st.coach.lastSeen = Date.now(); ctx.save(); });
  }
  return {init:init, signal:signal, aiAvailable:aiAvailable, anotherWay:anotherWay};
})();
