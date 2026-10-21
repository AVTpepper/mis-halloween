// Start node tests/server.cjs first. Captures actual game canvas movement.
const {chromium}=require('@playwright/test');
const fs=require('node:fs');
const {spawnSync}=require('node:child_process');
const path=require('node:path');
const ffmpeg=require('ffmpeg-static');
(async()=>{
  const root=path.resolve(__dirname,'..'),output=path.join(root,'assets','investigations');
  const browser=await chromium.launch({channel:'msedge'});
  try{
    const page=await browser.newPage();await page.goto(process.argv[2]||'http://127.0.0.1:4173');
    await page.evaluate(()=>{index=5;code=rooms.slice(0,5).map(r=>r.digit);started=true;running=true;deadline=Date.now()+1200000;inspected=[0,1];render();show('game');});
    await page.evaluate(()=>{
      const chunks=[],stream=document.getElementById('snakeCanvas').captureStream(24);
      const recorder=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp8'});
      recorder.ondataavailable=e=>chunks.push(e.data);
      window.stopArcadeRecording=()=>new Promise(resolve=>{recorder.onstop=async()=>{const buffer=await new Blob(chunks).arrayBuffer();resolve(Array.from(new Uint8Array(buffer)));stream.getTracks().forEach(t=>t.stop());};recorder.stop();});
      recorder.start();Snake.toggle();
    });
    const end=Date.now()+8500;
    while(Date.now()<end){
      const s=await page.evaluate(()=>Snake.snapshot());
      const queue=[{p:s.body[0],path:[]}],seen=new Set();let route;
      while(queue.length){const {p,path:steps}=queue.shift(),id=p.x+','+p.y;if(seen.has(id))continue;seen.add(id);if(p.x===s.food.x&&p.y===s.food.y){route=steps;break;}
        for(const [x,y,key] of [[1,0,'ArrowRight'],[0,1,'ArrowDown'],[-1,0,'ArrowLeft'],[0,-1,'ArrowUp']]){if(!steps.length&&x===-s.direction.x&&y===-s.direction.y)continue;const n={x:p.x+x,y:p.y+y};if(n.x<0||n.y<0||n.x>=10||n.y>=10||s.body.slice(0,-1).some(b=>b.x===n.x&&b.y===n.y))continue;queue.push({p:n,path:[...steps,key]});}}
      if(route?.length)await page.locator('#snakeCanvas').press(route[0]);
      await page.waitForTimeout(Math.max(180,320-s.cleared[s.player]*14));
    }
    const recording=Buffer.from(await page.evaluate(()=>window.stopArcadeRecording()));
    const raw=path.join(root,'artifacts','source-videos','museum-arcade.webm');fs.writeFileSync(raw,recording);
    const filter='scale=960:540:force_original_aspect_ratio=decrease,pad=960:540:(ow-iw)/2:(oh-ih)/2,setsar=1';
    for(const args of [['-i',raw,'-t','8','-an','-vf',filter,'-r','24','-c:v','libx264','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart',path.join(output,'arcade.mp4')],['-ss','1','-i',path.join(output,'arcade.mp4'),'-frames:v','1','-q:v','3',path.join(output,'arcade.jpg')]]){
      const r=spawnSync(ffmpeg,['-y','-v','error',...args],{encoding:'utf8'});if(r.status)throw new Error(r.stderr);
    }
    console.log('Recorded the actual museum Snake game as an eight-second video.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
