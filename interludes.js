/* Short, optional changes of pace. They never cost lives or award code digits. */
const Interludes=(()=>{
  const fresh=()=>({pending:null,completed:[],cards:[0,1,2,1,0,2],matched:[],open:[],moves:0,caught:0});
  let state=fresh();
  function restore(saved){
    state=fresh();if(!saved||typeof saved!=='object')return;
    state.pending=[2,4].includes(saved.pending)?saved.pending:null;
    state.completed=Array.isArray(saved.completed)?saved.completed.filter(n=>[2,4].includes(n)):[];
    if(Array.isArray(saved.cards)&&saved.cards.length===6&&[0,1,2].every(n=>saved.cards.filter(c=>c===n).length===2))state.cards=[...saved.cards];
    if(Array.isArray(saved.matched))state.matched=[...new Set(saved.matched.filter(n=>[0,1,2].includes(n)))];
    if(Array.isArray(saved.open))state.open=[...new Set(saved.open.filter(n=>Number.isInteger(n)&&n>=0&&n<6))].slice(0,2);
    state.moves=Number.isInteger(saved.moves)?Math.max(0,saved.moves):0;
    state.caught=Number.isInteger(saved.caught)?Math.max(0,Math.min(5,saved.caught)):0;
  }
  function begin(room){
    if(![2,4].includes(room)||state.completed.includes(room))return false;
    state.pending=room;
    if(room===2){for(let i=state.cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[state.cards[i],state.cards[j]]=[state.cards[j],state.cards[i]];}}
    render();return true;
  }
  function complete(){return state.pending===2?state.matched.length===3:state.caught===5;}
  function render(){
    const memory=state.pending===2,done=complete();
    document.getElementById('breakTitle').textContent=memory?'The lantern alcove':'The firefly corridor';
    document.getElementById('breakInstructions').textContent=memory?'Turn over two lanterns at a time. Find all three matching pairs. A different kind of puzzle before the gallery.':'Catch five fireflies to light the corridor. Click, tap or press Enter on each glowing firefly. Take your time: there is no penalty for missing.';
    document.getElementById('breakStatus').textContent=done?'Break complete! Continue your rescue.':memory?`${state.matched.length} / 3 pairs found · ${state.moves} turns`:`${state.caught} / 5 fireflies caught`;
    const host=document.getElementById('breakGame');
    if(memory){
      const labels=['Moon','Star','Pumpkin'],symbols=['☾','★','🎃'];
      host.innerHTML=`<div class="lantern-grid">${state.cards.map((value,i)=>{const matched=state.matched.includes(value),visible=matched||state.open.includes(i);return `<button class="lantern-card ${visible?'revealed':''}" aria-label="Lantern ${i+1}${visible?`: ${labels[value]}`:''}" aria-pressed="${visible}" ${matched?'disabled':''} onclick="Interludes.flip(${i})"><span aria-hidden="true">${visible?symbols[value]:'?'}</span><small>${matched?'Pair found':visible?labels[value]:'Turn over'}</small></button>`;}).join('')}</div>`;
    }else host.innerHTML=done?'<div class="firefly-finished" aria-hidden="true">✦ ✦ ✦ ✦ ✦</div>':`<div class="firefly-field"><button id="firefly" style="--x:${[18,72,42,80,27][state.caught]}%;--y:${[25,67,42,22,74][state.caught]}%" aria-label="Catch firefly ${state.caught+1}" onclick="Interludes.catchOne()">✦</button></div>`;
    document.getElementById('breakContinue').disabled=!done;
    document.getElementById('breakSkip').classList.toggle('hidden',done);
  }
  function flip(i){
    if(state.pending!==2||state.matched.includes(state.cards[i])||state.open.includes(i))return;
    if(state.open.length===2)state.open=[];
    state.open.push(i);
    if(state.open.length===2){state.moves++;if(state.cards[state.open[0]]===state.cards[state.open[1]]){state.matched.push(state.cards[i]);state.open=[];MuseumAudio.play('success');}}
    render();save();
    const next=document.querySelectorAll('.lantern-card')[i];if(!next.disabled)next.focus({preventScroll:true});else document.getElementById(complete()?'breakContinue':'breakStatus').focus({preventScroll:true});
  }
  function catchOne(){if(state.pending!==4||complete())return;state.caught++;MuseumAudio.play('clue');render();save();document.getElementById(complete()?'breakContinue':'firefly').focus({preventScroll:true});}
  function finish(){
    if(!state.pending)return;
    state.completed.push(state.pending);state.pending=null;
    renderRoomAfterBreak();save();
  }
  return {begin,render,flip,catchOne,finish,restore,pending:()=>state.pending,reset:()=>{state=fresh();},snapshot:()=>structuredClone(state)};
})();
