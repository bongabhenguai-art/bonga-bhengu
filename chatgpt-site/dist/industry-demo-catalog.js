/**
 * Industry demo presets for the EXISTING Bonga Bhengu OS GrapesJS website builder.
 * Static example content only. No backend features or payments are implied.
 */
const demo = (id, label, headline, description, sections, appModules, cta, stack) => Object.freeze({
  id, label, headline, description, sections, appModules, cta,
  previewModes: ['website','mobile-app'],
  editor: 'existing-grapesjs',
  templateLicense: 'original-bonga-bhengu-content',
  stack,
  status: 'template-only'
});
const sharedStack = Object.freeze({
  frontend: 'Existing Bonga Bhengu OS HTML/CSS/JavaScript and GrapesJS',
  backend: 'Existing Worker API; connect only implemented routes',
  data: 'Existing database layer; tenant isolation required',
  deployment: 'Existing Bonga Bhengu OS deployment pipeline',
  source: 'chatgpt-site/dist/website-builder-library.js'
});
export const industryDemos = Object.freeze([
  demo('school','School','Learning starts here','Admissions, school news and parent communication',['Home','About','Admissions','Programmes','News','Contact'],['Learner dashboard','Parent notices','Timetable','Assignments'], 'Enquire about admissions',sharedStack),
  demo('fashion','Fashion Design','Designed to be remembered','Collections, designer story and customer enquiries',['Home','Collections','Designer','Lookbook','Contact'],['Design portfolio','Product listings','Order enquiries','Studio'], 'Explore the collection',sharedStack),
  demo('salon','Hair Salon','Your next look begins here','Styles, services, price guide and booking requests',['Home','Services','Gallery','Price guide','Contact'],['Services','Appointment requests','Client notes','Offers'], 'Request an appointment',sharedStack),
  demo('tuckshop','Tuck Shop','Everyday essentials, close to home','Products, specials and pickup enquiries',['Home','Products','Specials','Pickup','Contact'],['Product catalogue','Pickup enquiries','Stock overview','Orders'], 'Ask about availability',sharedStack),
  demo('agency','Brand Agency','Build a brand people remember','Brand identity, campaigns and portfolio',['Home','Services','Portfolio','Process','Contact'],['Client briefs','Project pipeline','Campaign planner','Reports'], 'Request a proposal',sharedStack),
  demo('inyanga','Inyanga / Traditional Healing Practice','Traditional practice, clearly presented','Practice background, services and appointment enquiries',['Home','About the practitioner','Services','Ethical information','Contact'],['Appointment requests','Service information','Consent records','Enquiries'], 'Request an appointment', {...sharedStack, compliance:'South African practitioner registration and applicable health/privacy rules must be verified; no medical diagnosis, guaranteed cures or treatment claims'})
]);
export function getIndustryDemo(id) {
  const found=industryDemos.find(item=>item.id===id);
  if (!found) throw new RangeError('Unknown industry demo');
  return structuredClone(found);
}
