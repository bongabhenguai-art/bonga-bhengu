import manifest from '../project-sources/merge-manifest.json' with {type:'json'};
import masterArchive from '../project-sources/master-archive.json' with {type:'json'};
export const builderRepositories=[
 {id:'grapesjs',name:'GrapesJS',repository:'https://github.com/GrapesJS/grapesjs',license:'BSD-3-Clause',version:'0.23.6',state:'installed',role:'Visual HTML/CSS website editing',route:'/website-editor.html'},
 {id:'puck',name:'Puck',repository:'https://github.com/puckeditor/puck',license:'MIT',state:'candidate',role:'React page editing; requires a React output adapter'},
 {id:'expo',name:'Expo',repository:'https://github.com/expo/expo',license:'MIT',state:'candidate',role:'Native Android/iOS project builds; requires an Android build worker'},
 {id:'bolt-diy',name:'bolt.diy',repository:'https://github.com/stackblitz-labs/bolt.diy',license:'MIT',state:'candidate',role:'AI coding workspace; separate WebContainer runtime terms apply'},
 {id:'openhands',name:'OpenHands',repository:'https://github.com/OpenHands/OpenHands',license:'MIT core; enterprise paths have separate terms',state:'candidate',role:'Software engineering worker; requires an isolated server'},
 {id:'appsmith',name:'Appsmith',repository:'https://github.com/appsmithorg/appsmith',license:'Apache-2.0 community; commercial features have separate terms',state:'candidate',role:'Internal business applications; requires an external service'}
];
export const sourceMerge={...manifest,masterArchive,builderRepositories,implementation:{education:'Account-private classes, admissions, enrollment, attendance, assignments and human-reviewed grades saved in D1. Institution role sharing is not implemented.',visualWebsiteEditor:'GrapesJS editing, account-private save/load, sandboxed preview and CSP-protected HTML export. Export does not publish a website.',existingApp:'Existing storefront, seller, owner admin, shared AI, Studio, device and MCP routes retained.',pythonModules:'Source and original tests retained. Python backend services are not executed in the Cloudflare Worker.'},coderabbit:{localReview:'not_run',reason:'Agent login returned environment_unsupported; no authenticated local CodeRabbit review.'}};
