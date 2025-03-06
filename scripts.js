// script.js
document.addEventListener('DOMContentLoaded', () => {
    // ----- Loader -----
    const loaderContainer = document.querySelector('.loader-container');
    window.addEventListener('load', () => {
      loaderContainer.classList.add('hidden');
    });
  
    // ----- Sticky Navigation -----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('sticky', window.scrollY > 100);
    });
  
    // ----- Mobile Menu Toggle -----
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
      });
    });
  
    // ----- Smooth Scroll for Internal Links -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      });
    });
  
    // ----- Active Navigation Highlighting using IntersectionObserver -----
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links ul li a');
    const observerOptions = {
      root: null,
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(id)) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
    sections.forEach(section => observer.observe(section));
  
    // ----- Project Filtering -----
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        projectCards.forEach(card => {
          const categories = card.dataset.category.split(' ');
          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  
    // ----- Skill Progress Animation -----
    const progressBars = document.querySelectorAll('.progress');
    const stats = document.querySelectorAll('.stat-number');
    const animateOnScroll = (elements, callback) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      elements.forEach(element => observer.observe(element));
    };
    animateOnScroll(progressBars, (bar) => {
      const value = bar.dataset.value;
      bar.style.width = `${value}%`;
    });
    animateOnScroll(stats, (stat) => {
      const target = parseInt(stat.dataset.count);
      const increment = target / 100;
      let current = 0;
      const updateNumber = () => {
        if (current < target) {
          current += increment;
          stat.textContent = Math.ceil(current);
          requestAnimationFrame(updateNumber);
        } else {
          stat.textContent = target;
        }
      };
      updateNumber();
    });
  
    // ----- Certifications Slider (Mouse Drag & Buttons) -----
    const slider = document.querySelector('.certifications-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    if (slider) {
      let isDown = false, startX, scrollLeft;
      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => isDown = false);
      slider.addEventListener('mouseup', () => isDown = false);
      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      });
      prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -300, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  
    // ----- Contact Form Simulation -----
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        try {
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
          submitBtn.disabled = true;
          await new Promise(resolve => setTimeout(resolve, 2000));
          formStatus.innerHTML = `
            <div class="success-message">
              <i class="fas fa-check-circle"></i> Message sent successfully!
            </div>
          `;
          contactForm.reset();
        } catch (error) {
          formStatus.innerHTML = `
            <div class="error-message">
              <i class="fas fa-times-circle"></i> Error sending message. Please try again.
            </div>
          `;
        } finally {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
        }
      });
    }
  
    // ----- Back to Top Button -----
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 500);
    });
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // ----- CV Download -----
    const downloadCV = document.getElementById('downloadCV');
    if (downloadCV) {
      downloadCV.addEventListener('click', (e) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'Pranit_Das_Resume_technical.pdf';
        link.download = 'Pranit_Das_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  
    // ----- Lazy Loading Images -----
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          lazyObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => lazyObserver.observe(img));
  });
  