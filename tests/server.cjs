const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
http.createServer((req,res)=>{
  const files = {'/':'index.html','/index.html':'index.html','/game.js':'game.js','/exploration.js':'exploration.js','/snake.js':'snake.js','/cutscenes.js':'cutscenes.js','/styles.css':'styles.css'};
  const pathname=req.url?.split('?')[0];
  const file = files[pathname] || (/^\/assets\/investigations\/[a-z-]+\.(mp4|jpg|json|html)$/.test(pathname)?pathname.slice(1):null);
  if(!file) {res.writeHead(404);return res.end();}
  const types={'.js':'text/javascript','.css':'text/css','.mp4':'video/mp4','.jpg':'image/jpeg','.json':'application/json','.html':'text/html'};
  res.setHeader('Content-Type',types[path.extname(file)]);
  const data=fs.readFileSync(path.join(root,file));
  res.setHeader('Accept-Ranges','bytes');
  const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),data.length-1):data.length-1;if(start>end){res.writeHead(416);return res.end();}res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${data.length}`,'Content-Length':end-start+1});return res.end(data.subarray(start,end+1));}
  res.setHeader('Content-Length',data.length);res.end(data);
}).listen(4173,'127.0.0.1');
