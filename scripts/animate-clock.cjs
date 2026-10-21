const {chromium}=require('@playwright/test');
const {spawn}=require('node:child_process');
const {once}=require('node:events');
const fs=require('node:fs');
const path=require('node:path');
const ffmpeg=require('ffmpeg-static');
(async()=>{
  const root=path.resolve(__dirname,'..'),output=path.join(root,'assets','investigations');
  const browser=await chromium.launch({channel:'msedge'});
  try{
    const page=await browser.newPage();await page.setContent('<canvas width="960" height="540"></canvas>');
    await page.addScriptTag({path:path.join(__dirname,'clock-animation.js')});
    const encoder=spawn(ffmpeg,['-y','-v','error','-f','image2pipe','-framerate','24','-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',path.join(output,'clock-animated.mp4')]);
    let errors='';encoder.stderr.on('data',data=>{errors+=data;});
    const completion=once(encoder,'close');
    for(let frame=0;frame<192;frame++){
      const png=await page.evaluate(t=>{drawClockFrame(t);return document.querySelector('canvas').toDataURL('image/png').split(',')[1];},frame/24);
      if(frame===24)fs.writeFileSync(path.join(root,'artifacts','clock-animation-frame.png'),Buffer.from(png,'base64'));
      if(!encoder.stdin.write(Buffer.from(png,'base64')))await once(encoder.stdin,'drain');
    }
    encoder.stdin.end();const [exit]=await completion;if(exit)throw new Error(errors);
    const {spawnSync}=require('node:child_process');
    const poster=spawnSync(ffmpeg,['-y','-v','error','-ss','1','-i',path.join(output,'clock-animated.mp4'),'-frames:v','1','-q:v','3',path.join(output,'clock-animated.jpg')],{encoding:'utf8'});if(poster.status)throw new Error(poster.stderr);
    const credit={key:'clock-animated',title:'The Clockmaker’s Secret — animated clocks',source:'https://github.com/AVTpepper/mis-halloween',author:'The Midnight Museum project',license:'Original project animation',licenseUrl:'',changes:'Original animated clock hands, pendulums, gears and chime rings, rendered as an eight-second silent MP4.'};
    const file=path.join(output,'credits.json'),credits=JSON.parse(fs.readFileSync(file,'utf8')).filter(c=>!['clock','clock-animated'].includes(c.key));credits.unshift(credit);fs.writeFileSync(file,JSON.stringify(credits,null,2)+'\n');
    console.log('Rendered 192 original moving frames into clock-animated.mp4.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error.message);process.exitCode=1;});
