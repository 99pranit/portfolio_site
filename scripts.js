// script.js - Complete fixed version
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const currentYear = document.getElementById('current-year');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Simple typing animation (replacement for Typed.js)
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const texts = ["AI Engineer", "Data Scientist", "Machine Learning Enthusiast"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? 50 : 100);
      }
    }
    
    type();
  }

  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (mobileNavToggle && navList) {
    mobileNavToggle.addEventListener("click", () => {
      const isExpanded = mobileNavToggle.getAttribute("aria-expanded") === "true";
      mobileNavToggle.setAttribute("aria-expanded", !isExpanded);
      navList.classList.toggle("active");
    });
  }

  // Close Mobile Navigation on Link Click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navList && navList.classList.contains("active")) {
        mobileNavToggle.setAttribute("aria-expanded", false);
        navList.classList.remove("active");
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // Back to Top Button
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Dark Mode Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      const isDarkMode = body.classList.contains("dark-theme");
      localStorage.setItem("darkMode", isDarkMode);
    });
  }

  // Check for Dark Mode Preference
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "true") {
    body.classList.add("dark-theme");
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    body.classList.add("dark-theme");
  }

  // Cookie Consent
  const cookieConsent = document.getElementById("cookieConsent");
  const acceptCookies = document.getElementById("acceptCookies");

  if (cookieConsent && acceptCookies && !localStorage.getItem("cookiesAccepted")) {
    setTimeout(() => {
      cookieConsent.classList.add("show");
    }, 2000);

    acceptCookies.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", true);
      cookieConsent.classList.remove("show");
    });
  }

  // Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Simulate form submission (replace with actual API call)
      console.log("Form Data:", data);
      alert("Thank you for your message! I'll get back to you soon.");
      contactForm.reset();
    });
  }

  // Project Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        // Add active class to clicked button
        button.classList.add("active");
        
        const filterValue = button.getAttribute("data-filter");
        
        projectCards.forEach(card => {
          if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // Magnetic Button Effect
  const magneticButtons = document.querySelectorAll(".magnetic");

  magneticButtons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)";
    });
  });

  // Loading Screen
  window.addEventListener("load", () => {
    const loaderContainer = document.querySelector(".loader-container");
    if (loaderContainer) {
      loaderContainer.style.opacity = "0";
      setTimeout(() => {
        loaderContainer.style.display = "none";
      }, 500);
    }
  });

  // Simple scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section, .skill-category, .project-card, .timeline-item');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Initialize elements with initial styles
  document.querySelectorAll('.section, .skill-category, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
});