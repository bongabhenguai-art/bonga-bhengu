/**
 * Podcast API safety boundary.
 * Restores a missing Worker import without falsely claiming publishing or
 * persisting podcast data. Existing studio recording remains independent.
 * Replace with verified storage, media processing and publishing integration.
 */
export async function podcasts(request) {
  const url=new URL(request.url);
  if(!url.pathname.startsWith('/api/podcasts/')&&!url.pathname.startsWith('/podcasts/')){
    return new Response('Not found',{status:404});
  }
  if(url.pathname==='/api/podcasts/status'&&request.method==='GET'){
    return new Response(JSON.stringify({
      available:false,
      recording:'Use the existing Digital Studio recording interface',
      publishing:'not_configured',
      message:'Podcast publishing is not configured. No episode has been uploaded or published.'
    }),{status:200,headers:{'content-type':'application/json','cache-control':'no-store'}});
  }
  return new Response(JSON.stringify({
    error:'Podcast publishing is not configured',
    message:'This endpoint does not create, save or publish episodes. Use the existing Digital Studio for recording.'
  }),{status:503,headers:{'content-type':'application/json','cache-control':'no-store'}});
}
