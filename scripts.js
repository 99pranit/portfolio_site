/* scripts.js */

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Dark Mode Toggle Implementation
  const darkModeToggle = document.getElementById('darkModeToggle');
  // Apply dark mode if previously enabled
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
  }
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });
  
  // Projects data array – update this array to add more projects or modify GitHub links
  const projects = [
    {
      title: "Indoor Sound Classification",
      description: "Collaborated in a 4-person team to execute a deep learning model for classifying indoor sounds. Quantised and pruned the model for efficient deployment on Raspberry Pi.",
      github: "https://github.com/99pranit/indoor-sound-classification"
    },
    {
      title: "Amazon Product Review Score",
      description: "Created a CNN-RNN hybrid deep learning model to classify reviews as positive or negative. Web scraped amazon product reviews and calculated aggregate scores.",
      github: "https://github.com/99pranit/amazon-product-review-score"
    },
    {
      title: "Movie Genre Classification",
      description: "Developed a CNN-based model to classify genres from posters; trained and validated on the IMDb dataset with 91% accuracy. Deployed using Streamlit and a dockerized container.",
      github: "https://github.com/99pranit/movie-genre-classification"
    }
  ];
  
  // Dynamically create and insert project cards into the page
  function loadProjects() {
    const container = document.getElementById('projects-container');
    projects.forEach(project => {
      // Create project card element
      const card = document.createElement('div');
      card.classList.add('project-card');
  
      // Project title
      const title = document.createElement('h3');
      title.textContent = project.title;
      card.appendChild(title);
  
      // Project description
      const desc = document.createElement('p');
      desc.textContent = project.description;
      card.appendChild(desc);
  
      // GitHub link button
      const link = document.createElement('a');
      link.href = project.github;
      link.textContent = "View on GitHub";
      link.classList.add('btn');
      link.target = "_blank";
      card.appendChild(link);
  
      // Append card to container
      container.appendChild(card);
    });
  }
  
  // Load projects and initialize animations once the DOM is fully loaded
  window.addEventListener('DOMContentLoaded', () => {
    loadProjects();
  
    // GSAP animation for sections using ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.animate').forEach(section => {
      gsap.fromTo(section, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", 
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  });
  
  // Handle the contact form submission (simulated response)
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formResponse = document.getElementById('form-response');
    formResponse.textContent = "Thank you for reaching out! I'll get back to you soon.";
    contactForm.reset();
  });
  