const rooms=[
{title:'The Clockmaker’s Secret',scene:'🕰️',story:'Two haunted clocks control the museum doors. One chimes every 9 minutes; another every 12. They both chimed together at midnight. The caretaker needs to know when they will chime together next.',html:`<div class="puzzlePanel"><div class="clockface"><div>🕘<br>9 min</div><div>🕛<br>12 min</div></div><p>Find the <b>least common multiple</b> of 9 and 12. After how many minutes will they chime together again?</p><div class="board"><small>Clock A:</small> 9, 18, 27, 36, 45...<br><small>Clock B:</small> 12, 24, 36, 48...</div><label class="label" for="value1">Minutes until the chimes match</label><input id="value1" type="text" inputmode="numeric" placeholder="Number of minutes"><p class="note">The first lock takes the <b>ones digit</b> of that number.</p></div>`,hint:'Look for the first number appearing in both lists. Then take its last digit.',validate:()=>val('value1')==='36',digit:'6',reveal:'36 is the first shared multiple. The ones digit is 6.'},
{title:'The Potion of Proportions',scene:'⚗️',story:'The rescue machine uses an orange-and-purple potion. A mistake will fill the museum with pumpkin-flavoured fog. You must keep the mixture equivalent, then prepare the right number of jars.',html:`<div class="puzzlePanel"><div class="tag">Potion recipe · orange : purple = 3 : 2</div><div class="bottles"><span class="bottle orange"></span><span class="bottle orange"></span><span class="bottle orange"></span><span class="bottle"></span><span class="bottle"></span></div><p><b>Part A:</b> If the machine uses <b>12 orange drops</b>, how many purple drops keep the same ratio?</p><label class="label" for="value2a">Purple drops</label><input id="value2a" inputmode="numeric" type="text" placeholder="Enter a number"><p><b>Part B:</b> The caretaker prepared <b>12 empty jars</b>. Only <b>3/4</b> of the jars need potion. How many jars is that?</p><div class="board" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">${Array(12).fill('<span class="tile">🫙</span>').join('')}</div><label class="label" for="value2b">Jars to fill (the next lock digit)</label><input id="value2b" inputmode="numeric" type="text" placeholder="Enter a number"></div>`,hint:'For Part A multiply both parts of 3:2 by 4. For Part B, divide 12 into four equal groups and take three.',validate:()=>val('value2a')==='8'&&val('value2b')==='9',digit:'9',reveal:'The equivalent ratio is 12:8, and 3/4 of 12 = 9 jars.'},
{title:'The Gallery of Misleading Headlines',scene:'🖼️',story:'Pip was accused of stealing a priceless painting. A dramatic headline has convinced everyone—but the museum camera provides only a small piece of the story. Separate observation from inference before you judge.',html:`<div class="puzzlePanel"><div class="evidence"><div class="tile">👻<small>A ghost at the gallery door</small></div><div class="tile">🖼️<small>A painting has fallen</small></div><div class="tile">📸<small>Camera does not show the moment it fell</small></div></div><p>Camera notes: <i>“At 21:05, Pip was beside the gallery door. At 21:06, the painting was on the floor. The camera did not record anyone touching it.”</i></p><p><b>Part A:</b> Which statement is a directly supported observation rather than an inference?</p><div class="options" data-group="fact"><button class="option" onclick="choose('fact','A',this)">A · Pip deliberately pushed the painting.</button><button class="option" onclick="choose('fact','FACT',this)">B · The painting was on the floor at 21:06.</button><button class="option" onclick="choose('fact','C',this)">C · Pip wanted to frighten everyone.</button></div><p><b>Part B:</b> Which headline reports the evidence most responsibly?</p><div class="options" data-group="headline"><button class="option" onclick="choose('headline','A',this)">A · EVIL GHOST DESTROYS PRICELESS ART!</button><button class="option" onclick="choose('headline','B',this)">B · Painting falls; cause still unknown.</button><button class="option" onclick="choose('headline','C',this)">C · Museum security proves ghost is guilty.</button></div><p class="note">The responsible headline is labelled with the <b>second letter of the alphabet</b>. That gives you the next door digit: <b>its alphabet position</b>.</p></div>`,hint:'Observations describe what the evidence actually shows. A fair headline avoids claiming to know the cause when it is not visible.',validate:()=>selected.fact==='FACT'&&selected.headline==='B',digit:'2',reveal:'The camera shows the fallen painting, not who caused it. The careful headline is B, the second letter.'},
{title:'The Rescue Robot That Failed',scene:'🤖',story:'An inventor made a robot to carry the painting to safety. Its camera works in daylight, but it cannot navigate the dark museum. The inventor calls this an unexpected limitation. A good designer must use the test results.',html:`<div class="puzzlePanel"><div class="board"><div class="tag">Design-cycle checklist</div><div class="row" style="margin-top:10px"><span class="rune">1<br><small>Identify</small></span><span class="rune">2<br><small>Imagine</small></span><span class="rune">3<br><small>Build & test</small></span><span class="rune">4<br><small>Improve</small></span></div><p class="note">This numbered cycle is the museum inventor's version for the puzzle.</p></div><p><b>Part A:</b> The first test showed the camera fails in darkness. What should the designers do now?</p><div class="options" data-group="step"><button class="option" onclick="choose('step','A',this)">A · Ignore the evidence and launch it anyway.</button><button class="option" onclick="choose('step','B',this)">B · Improve the design, then test again.</button><button class="option" onclick="choose('step','C',this)">C · Claim that newer technology is always perfect.</button></div><p><b>Part B:</b> Which proposed change actually addresses the limitation?</p><div class="options" data-group="upgrade"><button class="option" onclick="choose('upgrade','A',this)">A · Give it a shinier logo.</button><button class="option" onclick="choose('upgrade','B',this)">B · Post a persuasive advert saying the robot never fails.</button><button class="option" onclick="choose('upgrade','C',this)">C · Add a low-light sensor and test it in darkness.</button></div><p class="note">Your code digit is the museum checklist number for <b>Improve</b>.</p></div>`,hint:'Testing revealed the problem. An improvement should directly address that problem, and designers should check whether it works.',validate:()=>selected.step==='B'&&selected.upgrade==='C',digit:'4',reveal:'Improve is stage 4 on the museum checklist. Low-light sensing directly addresses the failure.'},
{title:'The Poet Behind the Portrait',scene:'🎭',story:'Pip’s final message appears as spoken-word poetry. The inventor tried to persuade visitors to blame Pip without evidence. Write a stronger, fairer message to expose the trick.',html:`<div class="puzzlePanel"><p><b>Part A:</b> Which sentence would best persuade the museum director to investigate fairly? Think about audience, a clear opinion and a reason.</p><div class="options" data-group="claim"><button class="option" onclick="choose('claim','A',this)">A · Everyone MUST believe Pip. He is so awesome!</button><button class="option" onclick="choose('claim','B',this)">B · The museum should review all camera evidence because the recording does not show who caused the painting to fall.</button><button class="option" onclick="choose('claim','C',this)">C · The museum is bad and its robots are terrible.</button></div><p><b>Part B:</b> Read the slam poem aloud. What five-letter word is hidden in the first letter of every line?</p><div class="poem">Careful eyes can change the tale.<br>Headlines shout, but facts prevail.<br>Evidence helps us understand.<br>Check the truth before you stand.<br>Keep your judgement close at hand.</div><label class="label" for="value5">Hidden word</label><input type="text" id="value5" placeholder="Five-letter word"><p class="note">The final lock digit is the <b>number of letters</b> in the hidden word.</p></div>`,hint:'Sentence B uses a respectful recommendation and a supporting reason. For the poem, read the first letter of each line downward.',validate:()=>selected.claim==='B'&&val('value5').toUpperCase()==='CHECK',digit:'5',reveal:'The well-supported argument is B; the acrostic spells CHECK (five letters).'}
];
rooms.push({title:'The Serpent Arcade',scene:'🐍',story:'The museum’s security serpents guard the last digit. Two teammates must take turns at the controls. Each must clear 10 levels to power the final lock.',html:'<div class="puzzlePanel"><h3>Two players. Ten levels each.</h3><p>Collect one gold spark to clear a level. Your snake grows and speeds up with each spark. Avoid the walls and your tail. A crash costs one shared team life and resets the current player’s levels; the other player’s completed turn stays safe. Use arrow keys, WASD or the direction buttons. Pause before passing the keyboard.</p><div id="snakeGame"></div></div>',hint:'Plan wide turns and leave space around your tail. You can pause your turn to discuss your route. Both players need 10 / 10 before the lock opens.',validate:()=>Snake.complete(),digit:'7',reveal:'Both players cleared 10 levels. The security serpents release digit 7.'});
const el = id => document.getElementById(id);
const SAVE_KEY = 'midnight-museum-v2';
const TEAM_LIVES = 5;
let lives = TEAM_LIVES;
const objects = [
  [['🕰️','Inspect brass clock','The brass clock chimes every 9 minutes. Both clocks chimed at midnight.'],['🕛','Inspect silver clock','The silver clock chimes every 12 minutes. Find their first shared chime after midnight.'],['📓','Open clockmaker’s notebook','List multiples of each interval. The first shared multiple gives the minutes; its ones digit opens the lock.']],
  [['⚗️','Read the recipe','Keep orange : purple at 3 : 2. Today the machine uses 12 orange drops.'],['📦','Open jar cupboard','There are 12 jars. Fill three out of every four. You can tap the jars below to model the fraction.']],
  [['📸','Examine camera record','21:05: Pip stands beside the gallery door. 21:06: a painting lies on the floor. No recording shows anyone touching it.'],['📰','Inspect the newspaper','“EVIL GHOST DESTROYS PRICELESS ART!” The editor has claimed a cause that the camera does not show. Discuss what is observed and what is assumed.']],
  [['🤖','Read robot test log','Daylight: reaches the painting in 3 of 3 tests. Darkness: reaches it in 0 of 3 tests. Its camera cannot navigate in low light.'],['🧰','Open inventor’s toolkit','A low-light sensor may help the robot see in darkness. A shiny logo changes its appearance. Every proposed improvement needs another test.']],
  [['✉️','Read director’s letter','“Give me a clear recommendation and evidence. Tell me what the museum should do and why.”'],['🎭','Turn over the portrait','Pip’s poem hides a message in the first letter of each line. Read it aloud together, then read down its left edge.']],
  [['🕹️','Inspect arcade cabinet','Player 1 clears 10 levels, then Player 2 clears 10. Collect one gold spark per level. Both turns are required.'],['🛡️','Read safety plaque','The team shares five lives across every room. Incorrect answers, wrong rescue codes and snake crashes each cost one life. Lose all five and the entire rescue restarts.']]
];
let index = 0, code = [], remaining = 1200, running = false, timer = null;
let selected = {}, inspected = [], answers = {}, jars = [], started = false, won = false, deadline = 0;
function val(id) { return (el(id)?.value || '').trim(); }
function save() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify({index,code,remaining,running,selected,inspected,answers,jars,started,won,deadline,lives,arcade:Snake.snapshot()})); } catch {}
}
function restore() {
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!s || !Number.isInteger(s.lives) || s.lives<1 || s.lives>TEAM_LIVES || !s.started || !Number.isInteger(s.index) || s.index < 0 || s.index > rooms.length || !Array.isArray(s.code) || s.code.join('') !== rooms.slice(0,s.index).map(r=>r.digit).join('') || s.code.length !== s.index || !Number.isFinite(s.remaining) || s.remaining < 0 || s.remaining > 1200) return;
    lives=s.lives; Snake.restore(s.arcade);
    index=s.index; code=s.code; remaining=s.remaining; selected=s.selected || {}; inspected=Array.isArray(s.inspected)?s.inspected:[]; answers=s.answers || {}; jars=Array.isArray(s.jars)?s.jars:[]; started=true; won=!!s.won && index===rooms.length;
    running=!!s.running && !won; deadline=Number.isFinite(s.deadline)?s.deadline:Date.now()+remaining*1000;
    if(running) remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));
    if(!remaining) running=false;
    el('enterBtn').textContent = won ? 'Visit your rescue →' : 'Continue your rescue →';
  } catch {}
}
function show(section) {
  Snake.pause(); updateLives();
  ['home','game','final','win','vote'].forEach(x=>el(x).classList.toggle('hidden',x!==section));
  window.scrollTo({top:0,behavior:'instant'});
  el('main').focus({preventScroll:true});
}
function resumeGame() {
  if(!started) return startGame();
  if(won) return show('win');
  if(index===rooms.length) { renderFinal(); return show('final'); }
  render(); show('game');
}
function startGame() {
  Snake.reset(); lives=TEAM_LIVES; clearInterval(timer); index=0; code=[]; remaining=1200; selected={}; inspected=[]; answers={}; jars=[]; started=true; won=false; running=true; deadline=Date.now()+remaining*1000;
  el('finalCode').value=''; el('finalFeedback').textContent='';
  el('enterBtn').textContent='Continue your rescue →';
  timer=setInterval(tick,1000); render(); show('game'); save();
}
function tick() {
  if(!running) return;
  remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000)); updateClock();
  if(remaining===0) {running=false; updateClock(); const target=index===rooms.length?'finalFeedback':'feedback'; el(target).textContent='The museum bell rings! You may keep solving: the timer is for atmosphere.';}
  save();
}
function updateClock() {
  el('clock').textContent=`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`;
  el('clock').classList.toggle('low',remaining<180);
  el('pauseBtn').textContent=running?'Pause':'Resume';
  el('pauseBtn').disabled=remaining===0;
  if(el('finalClock')) el('finalClock').textContent=el('clock').textContent;
}
function togglePause() {
  if(!remaining) return;
  if(running) tick();
  if(!remaining)return;
  Snake.pause();
  running=!running; deadline=Date.now()+remaining*1000; updateClock(); save();
}
function render() {
  const r=rooms[index];
  el('roomNo').textContent=`Room ${index+1} of ${rooms.length}`;
  el('scene').textContent=r.scene; el('title').textContent=r.title; el('story').textContent=r.story;
  el('challenge').innerHTML=r.html;
  if(index===1) {
    const board=el('challenge').querySelector('.board');
    board.innerHTML=Array.from({length:12},(_,i)=>`<button class="jar" aria-label="Jar ${i+1}" aria-pressed="false" onclick="toggleJar(${i},this)">🫙</button>`).join('')+'<p id="jarCount" role="status"></p>';
    board.querySelectorAll('.jar').forEach((b,i)=>paintJar(b,i)); updateJars();
  }
  el('challenge').querySelectorAll('input').forEach(input=>{ input.value=answers[input.id] || ''; input.addEventListener('input',()=>{answers[input.id]=input.value;save();}); });
  el('challenge').querySelectorAll('.option').forEach(button=>{
    button.setAttribute('aria-pressed','false');
    const match=button.getAttribute('onclick').match(/choose\('([^']+)','([^']+)'/);
    if(match && selected[match[1]]===match[2]) {button.classList.add('selected');button.setAttribute('aria-pressed','true');}
  });
  el('feedback').textContent=remaining?'':'The bell has rung, but you may keep solving.'; el('feedback').className='feedback';
  el('progress').innerHTML=rooms.map((r,i)=>`<span class="${i<index?'done':''}" title="Room ${i+1}: ${i<index?'cleared':i===index?'current':'waiting'}"></span>`).join('');
  el('progress').setAttribute('aria-label',`${index} of ${rooms.length} rooms cleared`);
  el('codeSoFar').textContent=code.length?code.join(' · '):'None yet';
  renderObjects(); updateClock();
}
function renderObjects() {
  el('exploration').innerHTML='<p class="tag">Investigate the room</p><p>Inspect each object to collect your clues. Then try the lock below.</p><div class="objects">'+objects[index].map((o,i)=>`<button class="object ${inspected.includes(i)?'found':''}" aria-expanded="${inspected.includes(i)}" onclick="inspectObject(${i})"><span aria-hidden="true">${o[0]}</span>${o[1]}<small>${inspected.includes(i)?'Clue collected ✓':'Tap to examine'}</small></button>`).join('')+'</div><div class="cluebook" aria-live="polite">'+objects[index].filter((o,i)=>inspected.includes(i)).map(o=>`<p><b>${o[1]}:</b> ${o[2]}</p>`).join('')+'</div>';
  const ready=objects[index].every((o,i)=>inspected.includes(i));
  el('challenge').classList.toggle('hidden',!ready); el('checkBtn').disabled=!ready;
  if(index===5 && ready) Snake.mount();
}
function inspectObject(i) {
  const newlyFound=!inspected.includes(i);
  if(!inspected.includes(i)) inspected.push(i);
  renderObjects(); save();
  const object=el('exploration').querySelectorAll('.object')[i];
  if(newlyFound)object.classList.add('clue-new');
  object.focus();
}
function paintJar(button,i) { button.classList.toggle('filled',jars.includes(i)); button.setAttribute('aria-pressed',String(jars.includes(i))); }
function updateJars() { el('jarCount').textContent=`${jars.length} of 12 jars filled. Model three-fourths, then enter your answer.`; }
function toggleJar(i,button) { jars=jars.includes(i)?jars.filter(n=>n!==i):[...jars,i]; paintJar(button,i); updateJars(); save(); }
function choose(group,value,button) {
  selected[group]=value;
  document.querySelectorAll(`[data-group="${group}"] .option`).forEach(e=>{e.classList.remove('selected');e.setAttribute('aria-pressed','false');});
  button.classList.add('selected');button.setAttribute('aria-pressed','true');save();
}
function showHint() {el('feedback').className='feedback';el('feedback').textContent='👻 Pip whispers: '+rooms[index].hint;}
let lockEffectTimer=null;
function playLockEffect(success,roomIndex=index,finalRescue=false) {
  clearTimeout(lockEffectTimer);
  document.querySelector('.lock-effect')?.remove();
  const effect=document.createElement('div');
  effect.className='lock-effect';
  effect.dataset.outcome=success?'success':'failure';
  effect.dataset.room=finalRescue?'rescue':String(roomIndex);
  effect.setAttribute('aria-hidden','true');
  const r=rooms[roomIndex];
  const sparks=Array.from({length:12},(_,i)=>`<i class="lock-spark" style="--angle:${i*30}deg;--delay:${i*18}ms"></i>`).join('');
  effect.innerHTML=`<div class="lock-stage">
    <div class="lock-motif">${finalRescue?'👻':r?.scene||'🚪'}</div>
    <div class="lock-art">${sparks}<svg viewBox="0 0 120 130" focusable="false">
      <path class="lock-shackle" d="M34 57 V34 C34 0 86 0 86 34 V57"/>
      <rect class="lock-body" x="17" y="52" width="86" height="68" rx="15"/>
      <circle class="lock-keyhole" cx="60" cy="79" r="8"/><path class="lock-keyhole" d="M56 84 H64 L67 101 H53 Z"/>
    </svg></div>
    <strong>${success?(finalRescue?'Pip is free!':'Lock opened!'):'Lock sealed'}</strong>
    <span>${success?(finalRescue?'The painting releases its magic.':`Digit ${r.digit} recovered`):'One team life lost'}</span>
  </div>`;
  document.body.append(effect);
  lockEffectTimer=setTimeout(()=>effect.remove(),success?1550:950);
}
function checkAnswer() {
  if(index===5 && !Snake.complete())return;
  if(!objects[index].every((o,i)=>inspected.includes(i))) return;
  const r=rooms[index];
  if(!r.validate()) {loseLife('The lock stays closed. Revisit the clues and discuss your answers.');return;}
  playLockEffect(true);
  code.push(r.digit);index++;selected={};inspected=[];answers={};jars=[];
  if(index===rooms.length) {renderFinal();show('final');}
  else {render();show('game');el('feedback').textContent='✓ Lock opened! '+r.reveal;}
  save();
}
function updateLives() {
  el('teamStatus').classList.toggle('hidden',!started||won);
  el('lives').textContent=lives+' / '+TEAM_LIVES+' lives';
  el('lives').setAttribute('aria-label',lives+' of '+TEAM_LIVES+' team lives remaining');
}
// Returns false when the whole rescue was restarted.
function loseLife(reason,target='feedback') {
  playLockEffect(false);
  lives--;
  if(lives<=0) {
    startGame(); el('feedback').className='feedback error';
    el('feedback').textContent=reason+' No team lives remain — the whole rescue has restarted with five lives. All digits and arcade levels have been cleared.';
    return false;
  }
  updateLives();save();el(target).className='feedback error';
  el(target).textContent=reason+' One life lost. '+lives+' team '+(lives===1?'life':'lives')+' remaining.';
  return true;
}
function renderFinal() {
  el('runes').innerHTML=code.map((digit,i)=>`<span class="rune" title="Room ${i+1}">${digit}</span>`).join('');
  updateClock();
}
function unlock() {
  if(val('finalCode')===code.join('') && code.length===rooms.length) {playLockEffect(true,index,true);running=false;won=true;save();show('win');celebrate();}
  else {loseLife('The painting remains shut. Check all six digits and their order.', 'finalFeedback');}
}
function celebrate() {
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for(let i=0;i<45;i++) {const p=document.createElement('span');p.className='particle';p.setAttribute('aria-hidden','true');p.textContent=['✨','🎃','⭐','👻'][i%4];p.style.left=(Math.random()*100)+'%';p.style.animationDelay=(Math.random()*1.8)+'s';p.style.fontSize=(15+Math.random()*20)+'px';document.body.append(p);setTimeout(()=>p.remove(),6200);}
}
function requestRestart() { if(!started || window.confirm('Start a new team game? This clears the current team’s clues and timer.')) startGame(); }

// PASTE YOUR GOOGLE FORM /viewform LINK BELOW. Do not use the /edit link.
const GOOGLE_FORM_URL='';
function mountForm(){if(!GOOGLE_FORM_URL)return;let url;try{url=new URL(GOOGLE_FORM_URL);if(url.protocol!=='https:'||!(url.hostname==='docs.google.com'||url.hostname==='forms.gle'))return}catch{return}const shell=el('formShell');shell.innerHTML='';if(url.hostname==='docs.google.com'&&url.pathname.includes('/forms/')&&url.pathname.includes('/viewform')){const iframe=document.createElement('iframe');iframe.title='PYP 6 costume awards Google Form';url.searchParams.set('embedded','true');iframe.src=url.toString();iframe.loading='lazy';shell.append(iframe)}else{let p=document.createElement('p');p.textContent='Use the button below to open costume voting.';shell.append(p)}let a=document.createElement('a');a.href=GOOGLE_FORM_URL;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Open the voting form in a new tab ↗';a.style.color='#ffbb6d';shell.append(a)}document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target?.id==='finalCode')unlock()});restore();mountForm();updateClock();if(started)timer=setInterval(tick,1000);
