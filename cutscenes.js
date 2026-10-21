const Cutscene=(()=>{
  let timer=null, resumeCountdown=false, returnFocus=null;
  const films=[
    {file:'clock-animated',description:'Original animated clocks with turning hands, swinging pendulums, rotating gears and glowing chimes.',credit:'The Midnight Museum · Original animation',source:null},
    {file:'potion',description:'Laboratory footage showing a colour-changing liquid reaction.',credit:'Junsuda.dha · CC BY-SA 4.0',source:'Chemical_traffic_light.webm'},
    {file:'gallery',description:'Camera footage of the Freer Gallery of Art.',credit:'OkMonika · CC BY-SA 3.0',source:'Freer_Gallery_of_Art.webm'},
    {file:'robot',description:'Test footage of a small four-legged walking robot.',credit:'Palapa · Public domain',source:'4n_robot.webm'},
    {file:'poetry',description:'Close-up footage of handwritten letter forms.',credit:'Peter Unbehauen · CC BY 3.0',source:'Handwriting_Minuscule_Alphabet.webm'},
    {file:'arcade',description:'A screen recording of this museum’s Snake game demonstrating movement on the board.',credit:'The Midnight Museum · Original gameplay recording',source:null}
  ];
  const stories=[
    ['The doors are closing…','Pip calls from inside a painting. Follow the chimes into the Clockmaker’s room before the museum seals itself.','🕰️'],
    ['The clocks fall silent','A hidden doorway slides open. Beyond it, orange and purple potions bubble beneath a cloud of pumpkin fog.','⚗️'],
    ['The potion lights the way','The mixture glows and reveals a gallery of suspicious headlines. Pip’s story may not be what it seems.','🖼️'],
    ['The evidence changes everything','A mechanical clatter echoes down the corridor. The rescue robot is waiting in the dark, unable to find its way.','🤖'],
    ['The workshop wakes up','A beam of light reaches a forgotten portrait. Behind its frame, Pip has left a poem with one last message.','🎭'],
    ['The arcade comes alive','The portrait swings aside to reveal two sleeping security serpents. Two teammates must wake the cabinet and clear ten levels each.','🐍'],
    ['The final painting awaits','Six recovered digits shimmer on the frame. Assemble the rescue code and bring Pip home.','🖼️'],
    ['Pip is free!','The frame breaks its spell. Pip floats into the moonlight, the museum doors swing open, and your team’s rescue is complete.','👻']
  ];
  function finish(){
    clearTimeout(timer);timer=null;
    const dialog=document.getElementById('cutscene');
    if(!dialog.open)return;
    const video=document.getElementById('investigationVideo');
    video.pause();video.removeAttribute('src');video.load();
    dialog.close();
    if(resumeCountdown&&remaining>0&&!won){running=true;deadline=Date.now()+remaining*1000;updateClock();save();}
    resumeCountdown=false;
    if(returnFocus?.isConnected&&!returnFocus.closest('.hidden'))returnFocus.focus({preventScroll:true});
    else document.getElementById('main').focus({preventScroll:true});
  }
  function play(stage){
    finish();
    document.getElementById('investigationFilm').classList.add('hidden');
    document.querySelector('.museum-portal').classList.remove('hidden');
    const dialog=document.getElementById('cutscene');
    const story=stories[stage];
    returnFocus=document.activeElement;
    resumeCountdown=running;
    if(running){tick();running=false;updateClock();save();}
    document.getElementById('cutsceneTitle').textContent=story[0];
    document.getElementById('cutsceneStory').textContent=story[1];
    document.getElementById('cutsceneSymbol').textContent=story[2];
    document.getElementById('cutsceneChapter').textContent=stage===0?'Your rescue begins':stage===7?'Mission complete':`Room ${stage} cleared · digit ${rooms[stage-1].digit} recovered`;
    dialog.dataset.stage=String(stage);
    dialog.showModal();
    timer=setTimeout(finish,5000);
  }
  function investigate(room,object){
    finish();
    const dialog=document.getElementById('cutscene'),film=films[room];
    returnFocus=document.activeElement;resumeCountdown=running;
    if(running){tick();running=false;updateClock();save();}
    document.querySelector('.museum-portal').classList.add('hidden');
    document.getElementById('investigationFilm').classList.remove('hidden');
    document.getElementById('cutsceneChapter').textContent=`Investigation · ${rooms[room].title}`;
    document.getElementById('cutsceneTitle').textContent=objects[room][object][1];
    document.getElementById('cutsceneStory').textContent=objects[room][object][2];
    document.getElementById('filmDescription').textContent=film.description+' Illustrative scene; the museum story and clue are fictional.';
    const credit=document.getElementById('filmCredit');
    credit.textContent=film.credit+' · trimmed, muted and resized';
    credit.href=film.source?'https://commons.wikimedia.org/wiki/File:'+film.source:'https://github.com/AVTpepper/mis-halloween';
    const video=document.getElementById('investigationVideo');
    video.poster=`assets/investigations/${film.file}.jpg`;
    video.src=`assets/investigations/${film.file}.mp4`;
    dialog.dataset.stage='investigation';dialog.showModal();
    document.getElementById('filmError').classList.add('hidden');
    video.onended=()=>{document.getElementById('filmDescription').textContent=film.description+' Clip finished — replay with the video controls, or continue with your clue.';};
    video.onerror=()=>{document.getElementById('filmError').classList.remove('hidden');};
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)video.play().catch(()=>{});
    // Clues remain available until Continue/Escape; no reading-time limit.
  }
  document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('cutscene').addEventListener('cancel',e=>{e.preventDefault();finish();});
  });
  return {play,investigate,finish};
})();
