document.addEventListener('DOMContentLoaded', () => {
  const contentDiv = document.getElementById('content');
  const navLinks = document.querySelectorAll('.nav-link');

  // Function to load section content
  function loadSection(section) {
      let html = '';
      switch (section) {
          case 'home':
              html = `
                  <div class="section active" id="home">
                      <h1>Welcome to My Portfolio</h1>
                      <p>Hi, I'm Pranit Das, an aspiring Data Scientist and AI Engineer.</p>
                  </div>
              `;
              break;
          case 'about':
              html = `
                  <div class="section active" id="about">
                      <h2>About Me</h2>
                      <p>Aspiring Data Scientist and AI Engineer with a strong foundation in data analytics, machine learning, and data visualization.</p>
                      <h3>Education</h3>
                      <p>Master of Technology in Computer Science, National Institute of Technology, Durgapur, Expected Jun 2026, GPA 9.18/10</p>
                      <h3>Work Experience</h3>
                      <p>Analyst - Data Engineer at MathCo., Jun 2022 – Oct 2023</p>
                  </div>
              `;
              break;
          case 'portfolio':
              html = `
                  <div class="section active" id="portfolio">
                      <h2>Portfolio</h2>
                      <div class="portfolio-grid">
                          ${generatePortfolio()}
                      </div>
                  </div>
              `;
              break;
          case 'contact':
              html = `
                  <div class="section active" id="contact">
                      <h2>Contact Me</h2>
                      <p>Email: 99pranitd@gmail.com</p>
                      <p>Phone: +91 9348394440</p>
                      <p>LinkedIn: <a href="https://www.linkedin.com/in/pranit-das-87739a230" target="_blank">Pranit Das</a></p>
                  </div>
              `;
              break;
          default:
              html = '<p>Section not found.</p>';
      }
      contentDiv.innerHTML = html;
  }

  // Function to generate portfolio items from data.js
  function generatePortfolio() {
      return projects.map(project => `
          <div class="project">
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <a href="${project.github}" target="_blank">GitHub Link</a>
          </div>
      `).join('');
  }

  // Handle navigation clicks
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const section = link.getAttribute('href').substring(1);
          loadSection(section);
      });
  });

  // Load home section by default
  loadSection('home');
});