export function fieldsFor(form){return [...form.elements].filter(e=>e.name&&!e.disabled&&!['hidden','password','file','submit','button','reset','checkbox','radio','color','range'].includes(e.type));}
export function labelFor(e){return (e.labels?.[0]?.textContent||e.name).trim().replace(/\s+/g,' ').slice(0,180);}
export function eligible(form){return form.id&&fieldsFor(form).length>0&&!form.querySelector('input[type=password],input[type=file]')&&!/connect|payment|bank|vault|auth|login|key/i.test(form.id);}

export function businessRoute(text,modules){
 const q=String(text).trim().toLowerCase();
 const direct=modules.find(m=>m.id===q||m.name.toLowerCase()===q);if(direct)return direct;
 const rules=[[/\b(website|web site|landing page)\b/,'visual-website-editor'],[/\b(profile|identity|brand story)\b/,'designer'],[/\b(order|orders|enquiry|enquiries|customer|customers)\b/,'orders'],[/\b(task|tasks|daily work|to do)\b/,'my-work'],[/\b(investor|investors|business partner|business plan|coach)\b/,'fashion-jarvis'],[/\b(studio|record|podcast|camera)\b/,'digital-studio'],[/\b(product|products|collection|design)\b/,'catalogue']];
 for(const [pattern,id]of rules)if(pattern.test(q))return modules.find(m=>m.id===id);
 return modules.find(m=>m.name.toLowerCase().includes(q));
}
export function validAnswer(field,value){
 const check=field.cloneNode(true);check.value=value;
 // Browsers silently erase malformed number/date values; reject rather than treating them as a skip.
 if(value&&check.value==='')return {ok:false,error:field.type==='date'?'Use a date in YYYY-MM-DD format.':'Please enter a valid '+(field.type||'text')+' value.'};
 if(field.maxLength>0&&value.length>field.maxLength)return {ok:false,error:'Keep this answer under '+field.maxLength+' characters.'};
 return check.checkValidity()?{ok:true}:{ok:false,error:check.validationMessage||'Please check this answer.'};
}
