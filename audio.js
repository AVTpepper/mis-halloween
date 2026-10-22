/* All audio is generated locally and starts only after a student opts in. */
const MuseumAudio=(()=>{
  let context=null,musicNodes=[],effects=false,music=false,sceneActive=false;
  try{const saved=JSON.parse(localStorage.getItem('museum-audio')||'{}');effects=saved.effects===true;music=saved.music===true;}catch{}
  function store(){try{localStorage.setItem('museum-audio',JSON.stringify({effects,music}));}catch{}render();}
  function render(){for(const [id,on,label] of [['soundToggle',effects,'Sound'],['musicToggle',music,'Music']]){const button=document.getElementById(id);if(button){button.textContent=`${label}: ${on?'on':'off'}`;button.setAttribute('aria-pressed',String(on));}}}
  function stopMusic(){musicNodes.forEach(({oscillator,gain})=>{try{oscillator.stop();oscillator.disconnect();gain.disconnect();}catch{}});musicNodes=[];}
  function unlock(){
    if(!effects&&!music||document.hidden)return;
    try{
      context??=new (window.AudioContext||window.webkitAudioContext)();
      context.resume().catch(()=>{});
      if(music&&sceneActive&&!musicNodes.length){
        for(const frequency of [110,164.81,220]){const oscillator=context.createOscillator(),gain=context.createGain();oscillator.type='sine';oscillator.frequency.value=frequency;gain.gain.value=.012;oscillator.connect(gain).connect(context.destination);oscillator.start();musicNodes.push({oscillator,gain});}
      }
    }catch{effects=false;music=false;stopMusic();store();}
  }
  function play(kind='clue'){
    if(!effects||!context||context.state!=='running'||document.hidden)return;
    const notes={clue:[523.25,659.25],success:[523.25,659.25,783.99],failure:[196],brass:[440,554.37],silver:[659.25,830.61]};
    (notes[kind]||notes.clue).forEach((frequency,i)=>{const oscillator=context.createOscillator(),gain=context.createGain(),start=context.currentTime+i*.13;oscillator.frequency.value=frequency;gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(.055,start+.015);gain.gain.exponentialRampToValueAtTime(.001,start+.32);oscillator.connect(gain).connect(context.destination);oscillator.start(start);oscillator.stop(start+.34);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};});
  }
  function toggle(kind){if(kind==='music'){music=!music;if(!music)stopMusic();}else effects=!effects;unlock();store();}
  document.addEventListener('pointerdown',unlock);
  document.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' ')unlock();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stopMusic();context?.suspend().catch(()=>{});}});
  function setSceneActive(active){sceneActive=active;if(active)unlock();else stopMusic();}
  return {play,toggle,render,setSceneActive,status:()=>({effects,music,contextState:context?.state||'not-created',musicVoices:musicNodes.length})};
})();
