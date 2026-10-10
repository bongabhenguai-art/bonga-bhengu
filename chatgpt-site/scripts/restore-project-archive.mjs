import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('../',import.meta.url));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'project-sources/archive-parts.json'),'utf8'));
const digest=data=>createHash('sha256').update(data).digest('hex');
const matches=(data,expected)=>data.length===expected.bytes&&digest(data)===expected.sha256;
const target=path.join(root,manifest.path);
if(!fs.existsSync(target)||!matches(fs.readFileSync(target),manifest)){
 const chunks=manifest.parts.map(part=>{
  const data=fs.readFileSync(path.join(root,part.path));
  if(!matches(data,part))throw new Error('Project archive part failed verification: '+part.path);
  return data;
 });
 const archive=Buffer.concat(chunks);
 if(!matches(archive,manifest))throw new Error('Combined project archive failed verification');
 fs.writeFileSync(target,archive);
}
console.log('Verified combined project archive and '+manifest.parts.length+' retained parts.');
