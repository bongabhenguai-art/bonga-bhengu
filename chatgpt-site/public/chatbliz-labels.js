/* Chatbliz is the existing Chatboard's display name; preserve routes and messaging state. */
(() => {
  const rename = value => value.replace(/chatboard/gi, 'Chatbliz');
  const allowed = 'a,button,h1,h2,h3,h4,span,label,option,[role="tab"],[aria-label],[title]';
  function update(root) {
    const elements = [];
    if (root.nodeType === 1 && root.matches?.(allowed)) elements.push(root);
    root.querySelectorAll?.(allowed).forEach(el => elements.push(el));
    for (const el of elements) {
      if (el.closest('script,style,textarea,[contenteditable="true"]')) continue;
      for (const attr of ['aria-label','title']) {
        const value = el.getAttribute(attr);
        if (value && /chatboard/i.test(value)) el.setAttribute(attr,rename(value));
      }
      for (const node of el.childNodes) {
        if (node.nodeType === 3 && /chatboard/i.test(node.nodeValue)) node.nodeValue=rename(node.nodeValue);
      }
    }
    if (/chatboard/i.test(document.title)) document.title=rename(document.title);
  }
  let queued=false;
  const schedule=()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;update(document.body);});};
  const start=()=>{
    update(document.body);
    new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['aria-label','title']});
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
