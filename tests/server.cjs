const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
http.createServer((req,res)=>{
  const files = {'/':'index.html','/index.html':'index.html','/game.js':'game.js','/snake.js':'snake.js','/styles.css':'styles.css'};
  const file = files[req.url?.split('?')[0]];
  if(!file) {res.writeHead(404);return res.end();}
  res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');
  res.end(fs.readFileSync(path.join(root,file)));
}).listen(4173,'127.0.0.1');
