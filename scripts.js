// scripts.js

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true,
});

// Particles.js Configuration
particlesJS("particles", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#6366f1",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#6366f1",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
});

// Typed.js for Animated Subtitle
const typed = new Typed(".typing-text", {
  strings: ["AI Engineer", "Data Scientist", "Machine Learning Enthusiast"],
  typeSpeed: 50,
  backSpeed: 25,
  loop: true,
});

// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const navList = document.querySelector(".nav-list");

mobileNavToggle.addEventListener("click", () => {
  const isExpanded = mobileNavToggle.getAttribute("aria-expanded") === "true";
  mobileNavToggle.setAttribute("aria-expanded", !isExpanded);
  navList.classList.toggle("active");
});

// Close Mobile Navigation on Link Click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (navList.classList.contains("active")) {
      mobileNavToggle.setAttribute("aria-expanded", false);
      navList.classList.remove("active");
    }
  });
});

// Scroll Reveal for Sections
const sections = document.querySelectorAll(".section");

const revealSections = () => {
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      section.classList.add("revealed");
    }
  });
};

window.addEventListener("scroll", revealSections);
revealSections();

// Back to Top Button
const backToTop = document.getElementById("back-to-top");

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

// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  const isDarkMode = body.classList.contains("dark-theme");
  localStorage.setItem("darkMode", isDarkMode);
});

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

if (!localStorage.getItem("cookiesAccepted")) {
  setTimeout(() => {
    cookieConsent.classList.add("show");
  }, 2000);
}

acceptCookies.addEventListener("click", () => {
  localStorage.setItem("cookiesAccepted", true);
  cookieConsent.classList.remove("show");
});

// Form Submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Simulate form submission (replace with actual API call)
  console.log("Form Data:", data);
  alert("Thank you for your message! I'll get back to you soon.");
  contactForm.reset();
});

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
  loaderContainer.style.opacity = "0";
  setTimeout(() => {
    loaderContainer.style.display = "none";
  }, 500);
});