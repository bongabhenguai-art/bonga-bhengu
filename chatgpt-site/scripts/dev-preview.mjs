// Local UI preview. Production authentication and services remain in the Worker.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const args=process.argv.slice(2),flag=(name,fallback)=>args.includes(name)?args[args.indexOf(name)+1]:fallback;
const host=flag('--host','0.0.0.0'),port=Number(flag('--port','4173')),root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.webmanifest':'application/manifest+json','.mp4':'video/mp4','.webm':'video/webm'};
http.createServer(async(req,res)=>{
  const url=new URL(req.url,'http://preview.local');
  if(url.pathname==='/responsive-preview'){
    const width=Math.min(1800,Math.max(320,Number(url.searchParams.get('width'))||390)),height=Math.min(1400,Math.max(500,Number(url.searchParams.get('height'))||844));
    res.writeHead(200,{'content-type':'text/html; charset=utf-8'});
    res.end(`<!doctype html><html><head><title>Studio viewport review</title></head><body style="margin:0;background:#050809"><iframe id="responsive-app" title="Responsive app preview" src="/app.html?module=digital-studio#digital-studio" style="display:block;width:${width}px;height:${height}px;border:0" allow="fullscreen"></iframe></body></html>`);return;
  }
  if(url.pathname.startsWith('/api/')){res.writeHead(503,{'content-type':'application/json'});res.end(JSON.stringify({error:'Local preview: sign in on the published app to use your saved workspace and connected services.'}));return;}
  const pathname=url.pathname==='/'?'/index.html':url.pathname==='/platform'?'/platform.html':url.pathname==='/workspace'?'/workspace.html':url.pathname;
  let file;try{file=path.resolve(root,'.'+decodeURIComponent(pathname));}catch{res.writeHead(400);res.end();return;}
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  try{const data=await fs.readFile(file);res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream','cache-control':'no-store'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}
}).listen(port,host,()=>console.log(`Studio preview listening on ${host}:${port}`));
