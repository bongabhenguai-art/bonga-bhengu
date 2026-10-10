"""Build one reproducible source archive without flattening module imports."""
from pathlib import Path
import hashlib,json,zipfile
ROOT=Path(__file__).resolve().parents[1]
ARCHIVE=ROOT/'project-sources/BONGA_BHENGU_APP_MASTER.zip'
METADATA=ROOT/'project-sources/master-archive.json'
PARTS_METADATA=ROOT/'project-sources/archive-parts.json'
PREFIXES={'worker','dist','db','drizzle','scripts','tests','docs','infra','jarvis-github-kit','visibility-kit','project-sources','.openai'}
ROOT_FILES={'package.json','package-lock.json','drizzle.config.ts','GITHUB-ENGINE.md'}
files=[]
for path in sorted(ROOT.rglob('*')):
    relative=path.relative_to(ROOT)
    if not path.is_file() or path in (ARCHIVE,METADATA,PARTS_METADATA):continue
    if path.parent==ARCHIVE.parent and path.name.startswith(ARCHIVE.name+'.part'):continue
    if relative.parts[0] not in PREFIXES and str(relative) not in ROOT_FILES:continue
    if any(part in {'node_modules','.git','__pycache__'} for part in relative.parts):continue
    if relative.parts[:2]==('dist','server'):continue
    if path.name=='.env' or path.name.endswith('.sqlite3'):continue
    files.append(path)
ARCHIVE.parent.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(ARCHIVE,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as bundle:
    for path in files:
        info=zipfile.ZipInfo(str(path.relative_to(ROOT)),date_time=(2026,10,10,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16
        bundle.writestr(info,path.read_bytes())
meta={'path':str(ARCHIVE.relative_to(ROOT)),'files':len(files),'bytes':ARCHIVE.stat().st_size,'sha256':hashlib.sha256(ARCHIVE.read_bytes()).hexdigest(),'scope':'Existing app source, 220 preserved project files, tests and migrations; excludes runtime secrets, node_modules and the generated Worker bundle.'}
METADATA.write_text(json.dumps(meta,indent=2)+'\n')
data=ARCHIVE.read_bytes()
parts=[]
for index,offset in enumerate(range(0,len(data),8*1024*1024),1):
    target=ARCHIVE.with_name(ARCHIVE.name+f'.part{index:02d}')
    chunk=data[offset:offset+8*1024*1024]
    target.write_bytes(chunk)
    parts.append({'path':str(target.relative_to(ROOT)),'bytes':len(chunk),'sha256':hashlib.sha256(chunk).hexdigest()})
current={part['path'] for part in parts}
for previous in ARCHIVE.parent.glob(ARCHIVE.name+'.part*'):
    if str(previous.relative_to(ROOT)) not in current:previous.unlink()
PARTS_METADATA.write_text(json.dumps({'path':meta['path'],'bytes':meta['bytes'],'sha256':meta['sha256'],'parts':parts},indent=2)+'\n')
print(json.dumps(meta))
