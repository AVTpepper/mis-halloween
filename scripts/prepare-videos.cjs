// Run after npm ci. The source videos are downloaded to ignored artifacts/.
const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const ffmpeg=require('ffmpeg-static');
const sources=[
  ['clock','Mechanical movement of pendulum clock.webm',0],
  ['potion','Chemical traffic light.webm',0],
  ['gallery','Freer Gallery of Art.webm',18],
  ['robot','4n robot.webm',1],
  ['poetry','Handwriting Minuscule Alphabet.webm',10]
];
const root=path.resolve(__dirname,'..');
const output=path.join(root,'assets','investigations');
const originals=path.join(root,'artifacts','source-videos');
fs.mkdirSync(output,{recursive:true});fs.mkdirSync(originals,{recursive:true});
function run(args){const result=spawnSync(ffmpeg,['-hide_banner','-loglevel','error','-y',...args],{encoding:'utf8'});if(result.status!==0)throw new Error(result.stderr);}
(async()=>{
  const credits=[];
  for(const [key,title,start] of sources){
    const api=new URL('https://commons.wikimedia.org/w/api.php');
    api.search=new URLSearchParams({action:'query',format:'json',titles:'File:'+title,prop:'imageinfo',iiprop:'url|size|extmetadata'});
    const data=await(await fetch(api)).json();
    const info=Object.values(data.query.pages)[0].imageinfo[0];
    if(info.size>150*1024*1024)throw new Error('Source too large: '+title);
    const original=path.join(originals,key+'.webm');
    if(!fs.existsSync(original)){
      let response;
      for(let attempt=0;attempt<3;attempt++){
        if(attempt)await new Promise(resolve=>setTimeout(resolve,6000));
        response=await fetch(info.url,{headers:{'User-Agent':'MidnightMuseum-Classroom-Media/1.0'}});
        if(response.ok)break;
        console.log(key+': download status '+response.status+', waiting before retry');
      }
      if(!response.ok)throw new Error('Download failed: '+title+' (HTTP '+response.status+')');
      fs.writeFileSync(original,Buffer.from(await response.arrayBuffer()));
    }
    const filter='scale=960:540:force_original_aspect_ratio=decrease,pad=960:540:(ow-iw)/2:(oh-ih)/2,setsar=1';
    run(['-ss',String(start),'-i',original,'-t','8','-an','-vf',filter,'-r','24','-c:v','libx264','-preset','fast','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart',path.join(output,key+'.mp4')]);
    run(['-ss','1','-i',path.join(output,key+'.mp4'),'-frames:v','1','-q:v','3',path.join(output,key+'.jpg')]);
    const meta=info.extmetadata;
    credits.push({key,title,source:info.descriptionurl,author:key==='robot'?'Palapa':meta.Artist?.value.replace(/<[^>]*>/g,'')||'See source',license:meta.LicenseShortName?.value,licenseUrl:meta.LicenseUrl?.value||info.descriptionurl,changes:'Excerpted, muted, scaled and letterboxed; no change to the depicted event.'});
    console.log(key+': '+Math.round(fs.statSync(path.join(output,key+'.mp4')).size/1024)+' KB');
  }
  credits.push({key:'arcade',title:'The Midnight Museum — Snake gameplay',source:'https://github.com/AVTpepper/mis-halloween',author:'The Midnight Museum project',license:'Original project recording',licenseUrl:'',changes:'Screen recording of the actual game canvas; muted and encoded as MP4.'});
  fs.writeFileSync(path.join(output,'credits.json'),JSON.stringify(credits,null,2)+'\n');
  console.log('Prepared stock investigation videos, posters and credits. Record the arcade with scripts/record-arcade.cjs.');
})().catch(error=>{console.error(error.message);process.exitCode=1;});
