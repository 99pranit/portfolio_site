/* script.js — interactions for the new design */
(function(){
  'use strict';

  // Helper selectors
  const $ = (s, ctx=document) => ctx.querySelector(s);
  const $$ = (s, ctx=document) => Array.from((ctx||document).querySelectorAll(s));
  const debounce = (fn, wait=200) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), wait); }; };

  // Loader hide
  const loader = $('#loader');
  window.addEventListener('load', ()=> {
    if(loader){ loader.style.opacity = '0'; setTimeout(()=>loader.remove(), 450); }
    // init AOS after load
    if(window.AOS) AOS.init({duration:700, once:true, offset:80});
  });

  // Theme toggle (light/dark)
  const themeToggle = $('#themeToggle');
  const body = document.body;
  if(themeToggle){
    const saved = localStorage.getItem('theme');
    if(saved === 'dark'){ body.classList.add('dark'); body.classList.remove('light'); }
    themeToggle.addEventListener('click', ()=>{
      const isDark = body.classList.toggle('dark');
      if(isDark) body.classList.remove('light'); else body.classList.add('light');
      localStorage.setItem('theme', isDark ? 'dark':'light');
    });
  }

  // Mobile nav toggle
  const mobileToggle = $('#mobileToggle');
  const navList = $('#navList');
  mobileToggle?.addEventListener('click', ()=>{
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
  });

  // Typed subtitle (Typed.js if available else fallback)
  if(window.Typed){
    new Typed('#typed', { strings: ['AI Engineer','Data Scientist','TinyML tinkerer','LLM workflows'], typeSpeed:60, backSpeed:30, backDelay:1200, loop:true });
  } else {
    const el = $('#typed');
    if(el){
      const items = ['AI Engineer','Data Scientist','TinyML tinkerer','LLM workflows'];
      let i=0; el.textContent = items[0];
      setInterval(()=>{ i=(i+1)%items.length; el.textContent = items[i]; }, 1600);
    }
  }

  // Vanilla-tilt for 3D card effect
  try {
    const tiltEls = $$('.card-3d');
    if(tiltEls.length && window.VanillaTilt){
      VanillaTilt.init(tiltEls, { max: 8, speed: 400, glare: false, scale: 1.02 });
    }
  } catch(e){ /* ignore */ }

  // Counters
  const counters = $$('.stat-num');
  counters.forEach(node=>{
    const target = parseInt(node.dataset.target || '0',10);
    if(!target) return;
    let v=0; const step = Math.max(1, Math.floor(target/40));
    const iv = setInterval(()=>{ v+=step; node.textContent = v>=target ? target : v; if(v>=target) clearInterval(iv); }, 28);
  });

  // Filter & search logic (debounced)
  const filterBtns = $$('.filter-btn');
  const searchInput = $('#projectSearch');
  const projectCards = $$('#projectsGrid .project-card');

  let activeFilter = 'all';
  function applyFilter(){
    const q = (searchInput?.value || '').trim().toLowerCase();
    projectCards.forEach(card=>{
      const cat = (card.dataset.category || '').toLowerCase();
      const text = (card.innerText || '').toLowerCase();
      const matchesFilter = activeFilter === 'all' || cat === activeFilter;
      const matchesSearch = !q || text.includes(q);
      const show = matchesFilter && matchesSearch;
      card.style.display = show ? '' : 'none';
      card.setAttribute('aria-hidden', show ? 'false' : 'true');
    });
  }

  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=> {
      filterBtns.forEach(b=>{ b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
      activeFilter = (btn.dataset.filter || 'all').toLowerCase();
      applyFilter();
    });
    btn.addEventListener('keydown', (e)=> { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } });
  });

  if(filterBtns.length) filterBtns[0].click();
  if(searchInput) searchInput.addEventListener('input', debounce(applyFilter, 180));

  // Project images open in lightbox
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  const lbClose = $('#lightboxClose');

  $$('#projectsGrid .project-media img').forEach(img=>{
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e)=>{
      const src = img.getAttribute('src') || img.closest('.project-card')?.dataset.image || '';
      lightboxImg.src = src; lightbox.classList.add('show'); lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
      lbClose?.focus();
    });
  });

  function closeLightbox(){
    lightbox.classList.remove('show'); lightbox.setAttribute('aria-hidden','true'); lightboxImg.src=''; document.body.style.overflow='';
  }
  lbClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e)=> { if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeLightbox(); });

  // Back to top
  const backToTop = $('#backToTop');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 380) backToTop.classList.add('show'); else backToTop.classList.remove('show');
  });
  backToTop?.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));

  // Contact form fallback
  const contactForm = $('#contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const fd = new FormData(contactForm);
      const data = Object.fromEntries(fd.entries());
      const action = contactForm.getAttribute('action') || '';
      if(action && action.includes('formspree.io')) { contactForm.submit(); return; }
      const subject = encodeURIComponent(`Portfolio contact from ${data.name || 'visitor'}`);
      const body = encodeURIComponent(`${data.message || ''}\n\nFrom: ${data.name || ''} <${data.email || ''}>`);
      window.location.href = `mailto:99pranitd@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Safe image fallback
  $$('img').forEach(img => img.addEventListener('error', ()=> {
    if(img.dataset.fallback) return;
    img.dataset.fallback = '1';
    img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260"><rect width="100%" height="100%" fill="#fff7ed"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="18" fill="#f97316" font-family="Arial">No image</text></svg>';
  }));

  // Init AOS (if not already)
  if(window.AOS){ AOS.init({ duration:700, once:true, offset:80 }); }

  // Set year
  const yearEl = $('#year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

})();
