// The same three interfaces wrap the storefront, seller tools and owner tools.
(()=>{
  const nav=document.querySelector('.os-interfaces');if(!nav)return;
  const app=document.body.classList.contains('bbapp');
  // Chatbliz is a customer-facing product, not a replacement for Mall/Seller/Admin.
  const tabs=nav.querySelector('.os-interface-tabs');
  if(tabs&&!tabs.querySelector('[data-chatbliz-link]')){
    const link=document.createElement('a');link.href='/chatbliz.html';link.textContent='CHATBLIZ';
    link.setAttribute('data-chatbliz-link','');link.setAttribute('aria-label','Open Chatbliz business builder');
    tabs.append(link);
  }
  if(new URLSearchParams(location.search).get('embedded')==='1')nav.hidden=true;
  function update(){
    const admin=app&&['admin','workroom'].includes(location.hash.slice(1));
    const mall=app?(!location.hash||location.hash==='#home'):location.pathname==='/';
    const active=admin?'admin':mall?'mall':'seller';
    const chatbliz=nav.querySelector('[data-chatbliz-link]');
    if(chatbliz){location.pathname==='/chatbliz.html'?chatbliz.setAttribute('aria-current','page'):chatbliz.removeAttribute('aria-current');}
    for(const link of nav.querySelectorAll('[data-os-interface]')){
      link.dataset.osInterface===active?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current');
      if(app&&link.dataset.osInterface==='mall')link.href='#home';
    }
  }
  window.addEventListener('hashchange',update);update();
})();
