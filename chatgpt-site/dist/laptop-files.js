// Originals remain in place; this list owns only temporary preview URLs.
export class LaptopFiles {
  constructor({urlAPI=globalThis.URL, maxFiles=20, maxBytes=100*1024*1024, maxTotal=300*1024*1024}={}) {
    Object.assign(this,{urlAPI,maxFiles,maxBytes,maxTotal});this.items=new Map();this.sequence=0;
  }
  add(incoming) {
    let added=0, skipped=0, total=[...this.items.values()].reduce((sum,item)=>sum+item.file.size,0);
    for(const file of incoming) {
      const duplicate=[...this.items.values()].some(item=>item.file.name===file.name&&item.file.size===file.size&&item.file.lastModified===file.lastModified);
      if(duplicate||file.size>this.maxBytes||this.items.size>=this.maxFiles||total+file.size>this.maxTotal){skipped++;continue;}
      this.items.set(++this.sequence,{file,url:null});total+=file.size;added++;
    }
    return {added,skipped,count:this.items.size};
  }
  url(id) {const item=this.items.get(id);if(!item)return null;return item.url ||= this.urlAPI.createObjectURL(item.file);}
  remove(id) {const item=this.items.get(id);if(item?.url)this.urlAPI.revokeObjectURL(item.url);this.items.delete(id);}
  releaseURLs() {for(const item of this.items.values()){if(item.url)this.urlAPI.revokeObjectURL(item.url);item.url=null;}}
  clear() {this.releaseURLs();this.items.clear();}
}
