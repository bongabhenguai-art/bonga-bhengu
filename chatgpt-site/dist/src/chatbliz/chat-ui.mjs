import {CHATBLIZ_PARTNERS,preparePartnerAction} from "./partners.mjs";
import {CHATBLIZ_SERVICES} from "./catalog.mjs";
const suggestions=[
 ["Check my business","my-brand"],["Build a website","my-website"],["Create a podcast","my-content"],["Grow my business","my-business"],
 ["Coach me on sales",null],["Help me negotiate",null]
];
// Existing routes are shared; they do not create duplicate tool instances.
const workspaceLinks=Object.freeze({
 "my-website":{href:"/website-editor.html",label:"Open existing website builder",requiresSignIn:true},
 "my-content":{href:"/digital-studio.html",label:"Open existing Digital Studio",requiresSignIn:true},
 "my-business":{href:"/app.html?module=overview#overview",label:"Open existing business dashboard",requiresSignIn:true},
 "my-brand":{href:"/app.html?module=visibility#visibility",label:"Open existing visibility workspace",requiresSignIn:true}
});
const routes=[
 {test:/website|web app|build (?:an? )?app/i,id:"my-website"},
 {test:/podcast|video|studio|livestream|content/i,id:"my-content"},
 {test:/brand|visibility|business audit/i,id:"my-brand"},
 {test:/business|sales|crm|lead/i,id:"my-business"}
];
const section=document.createElement("section");section.id="chatbliz-conversation";section.className="panel";section.setAttribute("aria-label","Chatbliz conversation");
section.innerHTML='<h2>Chatbliz — Your Business Partner in Your Hands</h2><p>Talk to your Mentor, Coach, Assistant, Advisor and Negotiator. Choose an action to prepare a workflow; external actions require connected tools and approval.</p><div id="chatbliz-thread" role="log" aria-live="polite" style="display:grid;gap:10px;max-height:420px;overflow:auto;padding:12px;background:#101010;border-radius:10px"></div><div id="chatbliz-suggestions" style="display:flex;gap:8px;flex-wrap:wrap;margin:14px 0"></div><form id="chatbliz-chat-form"><label for="chatbliz-message">Your message</label><input id="chatbliz-message" maxlength="4000" required placeholder="How can I grow my business?"><button type="submit" style="margin-top:10px">Ask Chatbliz</button></form>';
const main=document.querySelector("main");main?.insertBefore(section,main.firstChild);
const thread=section.querySelector("#chatbliz-thread");
function bubble(role,message){const p=document.createElement("p");p.style.margin="0";p.style.padding="10px";p.style.borderRadius="9px";p.style.background=role==="you"?"#19366e":"#262626";p.textContent=(role==="you"?"You: ":"Chatbliz: ")+message;thread.append(p);thread.scrollTop=thread.scrollHeight;}
async function reply(message,forcedService=null){
 const text=message.trim();if(!text)return;
 bubble("you",text);
 let serverPlan=null;
 try{
  const response=await fetch("/api/chatbliz/plan",{method:"POST",credentials:"same-origin",headers:{"content-type":"application/json"},body:JSON.stringify({message:text})});
  const data=await response.json();
  if(response.ok)serverPlan=data;
  else if(response.status===401)bubble("assistant","Sign in to save and plan actions in your private workspace. Local guidance remains available.");
  else bubble("assistant","Planning service: "+String(data.error||"temporarily unavailable")+". Showing local guidance.");
 }catch{bubble("assistant","Planning service unavailable. Showing local guidance only.");}
 const action=preparePartnerAction(text);
 const match=CHATBLIZ_SERVICES.find(s=>s.id===forcedService)||CHATBLIZ_SERVICES.find(s=>routes.some(r=>r.id===s.id&&r.test.test(text)));
 const names=(serverPlan?.partners||action.partners).map(id=>CHATBLIZ_PARTNERS.find(p=>p.id===id)?.name).filter(Boolean);
 const intro=names.length?"Your "+names.join(", ")+" "+(names.length===1?"is":"are")+" ready to help plan this. ":"I can coordinate your five AI business partners. ";
 if(match){const select=document.querySelector("#service");if(select)select.value=match.id;
 bubble("assistant",intro+"Suggested workspace: "+match.name+" (R"+match.priceZAR+"). Use the enquiry form below to prepare a request. No action has been sent or paid.");
 const target=workspaceLinks[match.id];
 if(target){const link=document.createElement("a");link.href=target.href;link.textContent=target.label+" ↗";link.style.cssText="color:#d4af37;display:inline-block;padding:8px 12px;border:1px solid #8a7433;border-radius:8px";
 link.setAttribute("aria-label",target.label+"; sign-in may be required");
 thread.append(link);thread.scrollTop=thread.scrollHeight;}
}
 else bubble("assistant",intro+"I can help structure the next steps, but live AI responses and external actions require a connected and authorized execution service. Tell me your goal and choose a package.");
}
bubble("assistant","Welcome! I'm Chatbliz, your business partner in your hands. What would you like to work on?");
for(const [label,id] of suggestions){const b=document.createElement("button");b.type="button";b.textContent=label;b.style.cssText="padding:9px;border-radius:8px;background:#252525;color:#fff;border:1px solid #666;cursor:pointer";b.addEventListener("click",()=>reply(label,id));section.querySelector("#chatbliz-suggestions").append(b);}
section.querySelector("#chatbliz-chat-form").addEventListener("submit",e=>{e.preventDefault();const input=section.querySelector("#chatbliz-message");reply(input.value);input.value="";input.focus();});
