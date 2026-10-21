const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..','assets','investigations');
const credits=JSON.parse(fs.readFileSync(path.join(root,'credits.json'),'utf8'));
const robot=credits.find(c=>c.key==='robot');robot.author='Palapa';robot.licenseUrl=robot.source;
fs.writeFileSync(path.join(root,'credits.json'),JSON.stringify(credits,null,2)+'\n');
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const cards=credits.map(c=>`<article><h2>${escape(c.key)} footage</h2><p><a href="${escape(c.source)}">${escape(c.title)}</a> by ${escape(c.author)}.</p><p>Licence: ${c.licenseUrl?`<a href="${escape(c.licenseUrl)}">${escape(c.license)}</a>`:escape(c.license)}. ${escape(c.changes)}</p><p>Adapted video excerpts retain the licence shown above; these licences apply to the clips individually.</p><a href="${c.key}.mp4">View the local clip</a></article>`).join('');
fs.writeFileSync(path.join(root,'credits.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Investigation footage credits</title><style>body{max-width:850px;margin:40px auto;padding:0 20px;background:#130e23;color:#fff8ec;font:16px/1.6 system-ui}a{color:#ffcf8a}article{padding:20px 0;border-top:1px solid #715b82}h1,h2{font-family:Georgia,serif}</style><h1>Investigation footage credits</h1><p>The Midnight Museum uses short, silent, locally hosted video excerpts. These are illustrative scenes, not recordings of the fictional museum events. Each full clue is provided in text. The arcade clip is an original screen recording of the museum’s own Snake game.</p>${cards}<p><a href="../../index.html">Return to the museum</a></p></html>`);
