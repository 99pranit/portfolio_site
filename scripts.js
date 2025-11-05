// scripts.js — merged + fixed
// Features:
// - loader hide on load (fade)
// - particles init (if present)
// - Typed.js init (if present)
// - AOS init (if present)
// - mobile nav toggle (accessible)
// - filter + debounced search (fixed)
// - lightbox (Esc & click-outside close)
// - back-to-top and simple theme toggle
// - magnetic buttons microinteraction
// - contact form fallback

(function () {
  'use strict';

  // Helpers
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const debounce = (fn, wait = 250) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };

  // Loader: fade and remove
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    if (loader) {
      loader.classList.add('loader-hidden');
      setTimeout(() => loader.style.display = 'none', 450);
    }
  });

  // Init Particles if available
  if (window.particlesJS) {
    try {
      particlesJS('particles', {
        particles: {
          number: { value: 60, density: { enable: true, value_area: 700 } },
          color: { value: "#ffab66" },
          shape: { type: "circle" },
          opacity: { value: 0.6, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 130, color: "#ffd9b8", opacity: 0.25, width: 1 },
          move: { enable: true, speed: 1.8 }
        },
        interactivity: {
          detect_on: "canvas",
          events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
          modes: { repulse: { distance: 100 } }
        },
        retina_detect: true
      });
    } catch (e) { /* fail silently */ }
  }

  // AOS
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, offset: 80 });
  }

  // Typed.js
  if (window.Typed) {
    new Typed('.typing-text', {
      strings: ['AI Engineer', 'Data Scientist', 'Machine Learning Enthusiast'],
      typeSpeed: 50,
      backSpeed: 28,
      backDelay: 1000,
      loop: true
    });
  }

  // Mobile nav toggle
  const mobileToggle = $('#mobileToggle');
  const navList = $('#navList');
  mobileToggle?.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('active');
  });

  // Close nav when link clicked (mobile)
  $$('.nav-link').forEach(a => a.addEventListener('click', () => {
    if (navList.classList.contains('active')) {
      navList.classList.remove('active');
      mobileToggle?.setAttribute('aria-expanded', 'false');
    }
  }));

  // Filters + Search (fixed and accessible)
  const filterBtns = $$('.filter-btn');
  const searchInput = $('#projectSearch');
  const projectCards = $$('#projectsGrid .project-card');

  let activeFilter = 'all';
  const applyFilters = () => {
    const q = (searchInput?.value || '').trim().toLowerCase();
    projectCards.forEach(card => {
      const cat = (card.dataset.category || '').toLowerCase();
      const text = (card.innerText || '').toLowerCase();
      const matchesFilter = activeFilter === 'all' || cat === activeFilter;
      const matchesSearch = !q || text.includes(q);
      const visible = matchesFilter && matchesSearch;
      card.style.display = visible ? '' : 'none';
      card.setAttribute('aria-hidden', visible ? 'false' : 'true');
    });
  };

  // filter button click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
      activeFilter = (btn.dataset.filter || 'all').toLowerCase();
      applyFilters();
    });
    // keyboard access
    btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } });
  });

  // search with debounce
  if (searchInput) {
    searchInput.addEventListener('input', debounce(applyFilters, 220));
  }

  // Lightbox - open when project image clicked
  const lightbox = $('#lightbox');
  const lbImg = $('#lightboxImg');
  const lbClose = $('#lightboxClose');

  const openLightbox = (src, alt = '') => {
    if (!lbImg || !lightbox) return;
    lbImg.src = src;
    lbImg.alt = alt;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lbClose?.focus();
  };
  const closeLightbox = () => {
    if (!lbImg || !lightbox) return;
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  };

  // attach openers
  $$('#projectsGrid .project-image img').forEach(img => {
    const card = img.closest('.project-card');
    const src = img.getAttribute('src') || '';
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(src, card?.querySelector('h3')?.innerText || ''));
    img.addEventListener('keydown', (e) => { if (e.key === 'Enter') openLightbox(src); });
  });
  lbClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // Back to top
  const backToTop = $('#back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 360) backToTop?.classList.add('visible');
    else backToTop?.classList.remove('visible');
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Theme toggle (simple)
  const themeToggle = $('#theme-toggle');
  if (themeToggle) {
    const saved = localStorage.getItem('darkMode') === 'true';
    if (saved) document.body.classList.add('dark-theme');
    themeToggle.addEventListener('click', () => {
      const now = document.body.classList.toggle('dark-theme');
      localStorage.setItem('darkMode', now);
    });
  }

  // Magnetic button microinteraction
  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left) - r.width / 2;
      const y = (e.clientY - r.top) - r.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    btn.addEventListener('mouseleave', () => btn.style.transform = '');
  });

  // Contact form behavior - graceful fallback
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // if action attribute present and is formspree or similar, send; else fallback to alert + reset
      const action = contactForm.getAttribute('action') || '';
      if (action && action.includes('formspree.io')) {
        contactForm.submit(); // normal POST to Formspree
      } else {
        // fallback: open mailto
        const fd = new FormData(contactForm);
        const obj = Object.fromEntries(fd.entries());
        const subject = encodeURIComponent(obj.subject || `Contact from ${obj.name || 'visitor'}`);
        const body = encodeURIComponent(`${obj.message || ''}\n\nFrom: ${obj.name || ''} <${obj.email || ''}>`);
        window.location.href = `mailto:99pranitd@gmail.com?subject=${subject}&body=${body}`;
      }
    });
  }

  // graceful image error fallback
  $$('img').forEach(img => img.addEventListener('error', () => {
    if (!img.dataset.fallbackSet) {
      img.dataset.fallbackSet = '1';
      img.src = 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22140%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23fff7ed%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%23f97316%22 font-family=%22sans-serif%22>No image</text></svg>';
    }
  }));

  // Ensure filters applied on load (in case search has value)
  window.addEventListener('DOMContentLoaded', () => {
    // set initial ARIA on filter buttons
    filterBtns.forEach(b => b.setAttribute('aria-pressed', b.classList.contains('active') ? 'true' : 'false'));
    applyFilters();
    // set year
    const yEl = document.getElementById('current-year'); if (yEl) yEl.textContent = new Date().getFullYear();
  });

})();
