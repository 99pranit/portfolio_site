// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-quart'
  });

  // Particle Background
  particlesJS('particles', {
    particles: {
      number: { value: 80 },
      color: { value: '#7F5AF0' },
      shape: { type: 'circle' },
      opacity: { value: 0.5 },
      size: { value: 3 },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      }
    },
    retina_detect: true
  });

  // Dynamic Typing Effect
  const typeText = (element, texts, speed) => {
    let count = 0;
    let index = 0;
    let currentText = '';
    
    const type = () => {
      if (count === texts.length) count = 0;
      currentText = texts[count];
      element.textContent = currentText.slice(0, ++index);
      
      if (index === currentText.length) {
        setTimeout(() => deleteText(), 2000);
      } else {
        setTimeout(type, speed);
      }
    };

    const deleteText = () => {
      element.textContent = currentText.slice(0, --index);
      if (index === 0) {
        count++;
        setTimeout(type, 500);
      } else {
        setTimeout(deleteText, speed/2);
      }
    };

    type();
  };

  const typingElement = document.querySelector('.typing-text');
  const titles = ["AI Engineer", "Data Scientist", "ML Developer"];
  typeText(typingElement, titles, 100);

  // 3D Tilt Effect
  VanillaTilt.init(document.querySelectorAll('.project-card'), {
    max: 8,
    speed: 300,
    glare: true,
    'max-glare': 0.2
  });

  // Dynamic Cursor
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--y', `${e.clientY}px`);
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Theme Toggle
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  document.body.appendChild(themeToggle);

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
  });

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      try {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        const statusDiv = document.getElementById('formStatus');
        statusDiv.innerHTML = `
          <div class="success-message">
            <i class="fas fa-check-circle"></i> Message sent successfully!
          </div>
        `;
        contactForm.reset();
      } catch (error) {
        // Show error message
        statusDiv.innerHTML = `
          <div class="error-message">
            <i class="fas fa-times-circle"></i> Error sending message
          </div>
        `;
      } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        setTimeout(() => {
          statusDiv.innerHTML = '';
        }, 5000);
      }
    });
  }
});