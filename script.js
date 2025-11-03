// Initialize Lucide icons
lucide.createIcons();

// Data
const roles = [
    'Data Scientist',
    'AI Engineer',
    'ML Engineer',
    'Data Engineer',
    'Problem Solver'
];

const experience = [
    {
        title: 'Analyst - Data Engineer',
        company: 'Mathco',
        location: 'Bengaluru, KN',
        period: 'June 2022 – Oct 2023',
        achievements: [
            'Built sales dashboard on Tableau, improving team performance by 20%',
            'Designed ETL pipeline architecture for multiple data sources',
            'Led client calls and delivered technical presentations',
            'Developed GCP cluster recommendation tool'
        ],
        tech: ['Tableau', 'GCP', 'ETL', 'Python']
    },
    {
        title: 'Analyst Intern',
        company: 'Mathco',
        location: 'Bengaluru, KN',
        period: 'Jan 2022 – June 2022',
        achievements: [
            'Customer segmentation for credit card sales leads',
            'EDA on customer demographics and spending patterns',
            'Built KPI dashboard on Co.dx platform'
        ],
        tech: ['Python', 'Data Analysis', 'Visualization']
    }
];

const skills = {
    technical: {
        title: 'Technical Stack',
        icon: 'database',
        color: 'cyan',
        skills: ['Python', 'Java', 'SQL', 'Git', 'Jira', 'LaTeX']
    },
    ai_ml: {
        title: 'AI & ML',
        icon: 'brain',
        color: 'purple',
        skills: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'Hugging Face', 'LLMs', 'Computer Vision', 'TinyML']
    },
    cloud: {
        title: 'Cloud & Data Engineering',
        icon: 'cloud',
        color: 'pink',
        skills: ['GCP', 'BigQuery', 'Dataproc', 'Snowflake', 'Docker', 'Airflow', 'ETL']
    }
};

const projects = [
    {
        title: 'Multi-Prompt Technique Ensemble',
        category: 'AI/ML',
        tag: 'AI in Education',
        period: 'Mar 2025 – Oct 2025',
        tech: ['Python', 'TensorFlow', 'Hugging Face', 'LLM'],
        description: 'Context-aware framework with role-based reasoning to classify questions into Bloom\'s Taxonomy levels',
        metrics: [
            { label: 'Accuracy', value: 79 },
            { label: 'F1 Score', value: 77 }
        ],
        status: 'Publication Accepted',
        github: 'https://github.com/pranitdas/multi-prompt-ensemble'
    },
    {
        title: 'Human Activity Detection',
        category: 'IoT',
        tag: 'Smart Device',
        period: 'Mar 2025 – Apr 2025',
        tech: ['Python', 'TensorFlow', 'TinyML', 'IoT'],
        description: 'Hierarchical classification model using GY-91 sensor and ESP32-S3 for real-time activity recognition',
        metrics: [
            { label: 'Accuracy', value: 92 },
            { label: 'Categories', value: 7 }
        ],
        github: 'https://github.com/pranitdas/human-activity-detection'
    }
];

const projectCategories = ['all', 'AI/ML', 'IoT'];

// State
let currentRole = 0;
let typedText = '';
let projectFilter = 'all';
let activeSection = 'home';

// DOM Elements
const typingText = document.getElementById('typing-text');
const experienceTimeline = document.querySelector('.experience-timeline');
const skillsGrid = document.querySelector('.skills-grid');
const projectFilters = document.querySelector('.project-filters');
const projectsGrid = document.querySelector('.projects-grid');
const educationGrid = document.querySelector('.education-grid');

// Typing Animation
function typeWriter() {
    const currentRoleText = roles[currentRole];
    
    if (typedText.length < currentRoleText.length) {
        typedText = currentRoleText.slice(0, typedText.length + 1);
        typingText.textContent = typedText;
        setTimeout(typeWriter, 100);
    } else {
        setTimeout(() => {
            typedText = '';
            currentRole = (currentRole + 1) % roles.length;
            setTimeout(typeWriter, 500);
        }, 2000);
    }
}

// Scroll to Section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Resume Download
function downloadResume() {
    const resumeUrl = 'assets/Resume_Technical.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Pranit_Das_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize Experience Timeline
function initExperience() {
    experienceTimeline.innerHTML = experience.map(exp => `
        <div class="experience-item fade-in">
            <div class="experience-dot"></div>
            <div class="experience-content">
                <div class="experience-header">
                    <div>
                        <div class="experience-title">${exp.title}</div>
                        <div class="experience-company">${exp.company}</div>
                        <div class="experience-location">${exp.location}</div>
                    </div>
                    <div class="experience-period">${exp.period}</div>
                </div>
                <ul class="achievement-list">
                    ${exp.achievements.map(achievement => `
                        <li class="achievement-item">
                            <i data-lucide="trending-up" width="16" height="16"></i>
                            <span>${achievement}</span>
                        </li>
                    `).join('')}
                </ul>
                <div class="tech-tags">
                    ${exp.tech.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Initialize Skills
function initSkills() {
    skillsGrid.innerHTML = Object.values(skills).map(skill => `
        <div class="skill-category ${skill.color} fade-in">
            <div class="skill-header">
                <i data-lucide="${skill.icon}"></i>
                <h3>${skill.title}</h3>
            </div>
            <div class="skill-tags">
                ${skill.skills.map(skillName => `
                    <span class="skill-tag">${skillName}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Initialize Project Filters
function initProjectFilters() {
    projectFilters.innerHTML = `
        <i data-lucide="filter"></i>
        ${projectCategories.map(category => `
            <button class="filter-btn ${category === projectFilter ? 'active' : ''}" 
                    onclick="setProjectFilter('${category}')">
                ${category === 'all' ? 'All Projects' : category}
            </button>
        `).join('')}
    `;
    
    lucide.createIcons();
}

// Set Project Filter
function setProjectFilter(category) {
    projectFilter = category;
    initProjectFilters();
    renderProjects();
}

// Render Projects
function renderProjects() {
    const filteredProjects = projectFilter === 'all' 
        ? projects 
        : projects.filter(p => p.category === projectFilter);
    
    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card fade-in">
            <div class="project-header">
                ${project.status ? `
                    <div class="project-status">
                        <i data-lucide="sparkles" width="16" height="16"></i>
                        <span class="status-badge">${project.status}</span>
                    </div>
                ` : '<div></div>'}
                <a href="${project.github}" target="_blank" class="github-link">
                    <i data-lucide="github" width="20" height="20"></i>
                </a>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <div class="project-meta">
                <i data-lucide="terminal" width="14" height="14"></i>
                <span>${project.tag} • ${project.period}</span>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-metrics">
                ${project.metrics.map(metric => `
                    <div class="metric-card">
                        <div class="metric-value">${metric.value}${metric.label.includes('Accuracy') || metric.label.includes('Score') ? '%' : ''}</div>
                        <div class="metric-label">${metric.label}</div>
                    </div>
                `).join('')}
            </div>
            <div class="project-tech">
                ${project.tech.map(tech => `
                    <span class="project-tech-tag">${tech}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Initialize Education
function initEducation() {
    educationGrid.innerHTML = `
        <div class="education-card fade-in">
            <div class="education-icon">
                <i data-lucide="graduation-cap" width="32" height="32"></i>
            </div>
            <h3 class="education-degree">M.Tech. Computer Science</h3>
            <div class="education-school">National Institute of Technology, Durgapur</div>
            <div class="education-details">Data Science & AI • 2024 - Present</div>
            <div class="education-progress"></div>
        </div>
        <div class="education-card fade-in">
            <div class="education-icon">
                <i data-lucide="graduation-cap" width="32" height="32"></i>
            </div>
            <h3 class="education-degree">B.Tech. Aerospace Engineering</h3>
            <div class="education-school">Kalinga Institute of Industrial Technology</div>
            <div class="education-details">Minor: Software • 2018 - 2022</div>
            <div class="education-progress"></div>
        </div>
    `;
    
    lucide.createIcons();
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Active Section Highlight
function initSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSection = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${activeSection}`);
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    typeWriter();
    
    // Initialize sections
    initExperience();
    initSkills();
    initProjectFilters();
    renderProjects();
    initEducation();
    
    // Initialize interactions
    initScrollAnimations();
    initSectionObserver();
    initSmoothScroll();
    initNavbarScroll();
    
    // Add resume download handlers
    document.getElementById('resume-btn').addEventListener('click', downloadResume);
    document.getElementById('resume-btn-2').addEventListener('click', downloadResume);
    
    // Re-initialize icons after dynamic content
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
});