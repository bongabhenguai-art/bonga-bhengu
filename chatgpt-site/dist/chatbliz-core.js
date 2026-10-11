export function fieldsFor(form){return [...form.elements].filter(e=>e.name&&!e.disabled&&!['hidden','password','file','submit','button','reset','checkbox','radio','color','range'].includes(e.type));}
export function labelFor(e){return (e.labels?.[0]?.textContent||e.name).trim().replace(/\s+/g,' ').slice(0,180);}
export function eligible(form){return form.id&&fieldsFor(form).length>0&&!form.querySelector('input[type=password],input[type=file]')&&!/connect|payment|bank|vault|auth|login|key/i.test(form.id);}
