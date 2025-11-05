// scripts.js - consolidated, tested logic
(function() {
  'use strict';

  // small helpers
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  const debounce = (fn, wait = 220) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(()=>fn(...a), wait); }; };

  // Loader hide on full load
  const loader = $('#loader');
  window.addEventListener('load', () => {
    if (loader) {
      loader.classList.add('loader-hidden');
      setTimeout(()=> { loader.style.display = 'none'; }, 500);
    }
  });

  // Init particles if available (fail silently)
  if (window.particlesJS) {
    try {
      particlesJS('particles', {
        particles: {
          number: { value: 50, density: { enable: true, value_area: 700 } },
          color: { value: "#ffab66" },
          shape: { type: "circle" },
          opacity: { value: 0.6, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 130, color: "#ffd9b8", opacity: 0.25, width: 1 },
          move: { enable: true, speed: 1.6 }
        },
        interactivity: {
          detect_on: "canvas",
          events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
          modes: { repulse: { distance: 100 } }
        },
        retina_detect: true
      });
    } catch(e){}
  }

  // Typed subtitle (if lib present) else fallback simple rotation
  if (window.Typed) {
    new Typed('#typed', { strings: ['AI Engineer', 'Data Scientist', 'TinyML tinkerer', 'Research-minded'], typeSpeed: 60, backSpeed: 40, backDelay: 1000, loop: true });
  } else {
    // fallback simple rotator
    const phrases = ['AI Engineer', 'Data Scientist', 'TinyML tinkerer', 'Research-minded'];
    let pi = 0;
    const typedEl = $('#typed');
    if (typedEl) {
      setInterval(()=> { typedEl.textContent = phrases[pi]; pi = (pi+1) % phrases.length; }, 1600);
      typedEl.textContent = phrases[0];
    }
  }

  // AOS init
  if (window.AOS) AOS.init({ duration: 700, once: true, offset: 80 });

  // Mobile nav toggle
  const mobileToggle = $('#mobileToggle'), navList = $('#navList');
  mobileToggle?.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    navList?.classList.toggle('open');
  });

  // counters
  $$('[data-target]').forEach(node => {
    const target = parseInt(node.getAttribute('data-target') || '0', 10);
    let val = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const iv = setInterval(()=> {
      val += step;
      node.textContent = val >= target ? String(target) : String(val);
      if (val >= target) clearInterval(iv);
    }, 28);
  });

  // Filters + Search
  const filterBtns = $$('.filter-btn');
  const searchInput = $('#projectSearch');
  const projectCards = $$('#projectsGrid .project-card');

  let activeFilter = 'all';
  const applyFilters = () => {
    const q = (searchInput?.value || '').trim().toLowerCase();
    projectCards.forEach(card => {
      const cat = (card.dataset.category || '').toLowerCase();
      const text = (card.innerText || '').toLowerCase();
      const passesFilter = activeFilter === 'all' || cat === activeFilter;
      const passesSearch = !q || text.includes(q);
      const visible = passesFilter && passesSearch;
      card.style.display = visible ? '' : 'none';
      card.setAttribute('aria-hidden', visible ? 'false' : 'true');
    });
  };

  // setup filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
      activeFilter = (btn.dataset.filter || 'all').toLowerCase();
      applyFilters();
    });
    btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } });
  });

  if (filterBtns.length) {
    // ensure a default active
    const active = filterBtns.find(b => b.classList.contains('active')) || filterBtns[0];
    active?.click();
  }

  if (searchInput) searchInput.addEventListener('input', debounce(applyFilters, 180));

  // project image click -> lightbox
  const lightbox = $('#lightbox'), lbImg = $('#lightboxImg'), lbClose = $('#lightboxClose');
  $$('#projectsGrid .project-image img').forEach(img => {
    const card = img.closest('.project-card');
    const src = img.getAttribute('src') || card?.dataset.image || '';
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(src, card?.querySelector('h3')?.innerText || ''));
  });

  function openLightbox(src, alt='') {
    if (!lightbox) return;
    lbImg.src = src;
    lbImg.alt = alt;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lbClose?.focus();
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }
  lbClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // back to top
  const backToTop = $('#back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTop?.classList.add('visible'); else backToTop?.classList.remove('visible');
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // magnetic effect for .magnetic elements
  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left) - r.width/2;
      const y = (e.clientY - r.top) - r.height/2;
      btn.style.transform = `translate(${x*0.08}px, ${y*0.08}px)`;
    });
    btn.addEventListener('mouseleave', () => btn.style.transform = '');
  });

  // contact form fallback
  const contactForm = $('#contactForm') || $('#contactForm') /*safe*/;
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const action = contactForm.getAttribute('action') || '';
      if (action && action.includes('formspree.io')) {
        contactForm.submit();
      } else {
        // mailto fallback
        const fd = new FormData(contactForm);
        const data = Object.fromEntries(fd.entries());
        const sub = encodeURIComponent(data.subject || `Contact from ${data.name || 'visitor'}`);
        const body = encodeURIComponent(`${data.message || ''}\n\nFrom: ${data.name || ''} <${data.email || ''}>`);
        window.location.href = `mailto:99pranitd@gmail.com?subject=${sub}&body=${body}`;
      }
    });
  }

  // image fallback for broken images
  $$('img').forEach(img => img.addEventListener('error', () => {
    if (!img.dataset.fallbackSet) {
      img.dataset.fallbackSet = '1';
      img.src = 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22140%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23fff7ed%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%23f97316%22 font-family=%22sans-serif%22>No image</text></svg>';
    }
  }));

  // set year in footer
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

})();
