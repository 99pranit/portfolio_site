// core interactive behavior: typed hero subtitle, counters, filters, lightbox, keyboard access
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  mobileToggle?.addEventListener('click', () => mobileNav.classList.toggle('hidden'));

  // typed subtitle
  const phrases = ['ML engineer', 'Research-minded developer', 'TinyML tinkerer', 'LLM prompter'];
  const el = document.getElementById('typedSub');
  let pi=0, ci=0;
  function typeLoop(){
    const text = phrases[pi];
    if(ci<=text.length){
      el.textContent = text.slice(0,ci++) + (ci%2? '|' : '');
      setTimeout(typeLoop, 80);
    } else {
      setTimeout(()=>{ci=0; pi=(pi+1)%phrases.length; typeLoop()}, 900);
    }
  }
  typeLoop();

  // counters
  document.querySelectorAll('[data-target]').forEach(node=>{
    const target = +node.dataset.target;
    let v=0;
    const step = Math.max(1, Math.round(target/40));
    const iv = setInterval(()=>{
      v += step;
      node.textContent = v>target? target : v;
      if(v>=target) clearInterval(iv);
    }, 28);
  });

  // filters + search
  const projects = Array.from(document.querySelectorAll('.project-card'));
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
  const search = document.getElementById('projectSearch');
  function apply(f){
    projects.forEach(p=>{
      const cat = p.dataset.category||'all';
      const text = p.innerText.toLowerCase();
      const q = search?.value.toLowerCase()||'';
      const visible = (f==='all' || cat===f) && (!q || text.includes(q));
      p.style.display = visible? '' : 'none';
    });
  }
  filterBtns.forEach(b=>{
    b.addEventListener('click', ()=>{ filterBtns.forEach(x=>x.classList.remove('active')); b.classList.add('active'); apply(b.dataset.filter) });
  });
  if(filterBtns.length) filterBtns[0].click();
  search?.addEventListener('input', ()=> apply(document.querySelector('.filter-btn.active').dataset.filter));

  // lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbClose = document.getElementById('lightboxClose');
  projects.forEach(p=>{
    const img = p.querySelector('.project-thumb');
    const src = p.dataset.image || img?.src;
    p.addEventListener('click', ()=> openLB(src, p.querySelector('h3')?.innerText));
    p.addEventListener('keydown', (e)=> { if(e.key==='Enter') openLB(src, p.querySelector('h3')?.innerText); });
  });
  function openLB(src, alt='Preview'){ lbImg.src = src; lbImg.alt = alt||''; lightbox.classList.add('show'); document.body.style.overflow='hidden'; }
  function closeLB(){ lightbox.classList.remove('show'); lbImg.src=''; document.body.style.overflow=''; }
  lbClose?.addEventListener('click', closeLB);
  lightbox?.addEventListener('click', (e)=> { if(e.target===lightbox) closeLB(); });
  document.addEventListener('keydown', (e)=> { if(e.key==='Escape') closeLB(); });

  // graceful image fallbacks
  document.querySelectorAll('img').forEach(img=>{
    img.addEventListener('error', ()=> {
      img.src = 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23fff7ed%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%23f97316%22 font-family=%22sans-serif%22>No image</text></svg>';
    });
  });
});
