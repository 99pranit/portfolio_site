// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading Animation
    setTimeout(() => {
        const loader = document.querySelector('.loader-container');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

    // Sticky Navigation
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Typing Animation
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const texts = ['Data Scientist', 'AI Engineer', 'ML Enthusiast', 'Problem Solver'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before typing next word
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        setTimeout(typeText, 1000);
    }

    // Skills Progress Animation
    const progressBars = document.querySelectorAll('.progress');
    const statNumbers = document.querySelectorAll('.stat-number');

    // Function to animate counter
    function animateCounter(element, target) {
        let count = 0;
        const speed = 50;
        const increment = target / (1000 / speed);
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                clearInterval(timer);
                count = target;
            }
            element.textContent = Math.ceil(count);
        }, speed);
    }

    // Intersection Observer for skills and stats
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('progress')) {
                    const value = entry.target.getAttribute('data-value');
                    entry.target.style.width = `${value}%`;
                } else if (entry.target.classList.contains('stat-number')) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    animateCounter(entry.target, target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Observe all progress bars and stat numbers
    progressBars.forEach(bar => observer.observe(bar));
    statNumbers.forEach(stat => observer.observe(stat));

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Certifications Slider
    const certSlides = document.querySelectorAll('.cert-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideWidth = 0;
    let slidesToShow = 3;

    // Function to update slidesToShow based on screen width
    function updateSlidesToShow() {
        if (window.innerWidth < 768) {
            slidesToShow = 1;
        } else if (window.innerWidth < 992) {
            slidesToShow = 2;
        } else {
            slidesToShow = 3;
        }
    }

    // Function to update slider position
    function updateSlider() {
        const slider = document.querySelector('.certifications-slider');
        if (!slider) return;
        
        slideWidth = slider.clientWidth / slidesToShow;
        
        certSlides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
        
        slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    // Initialize slider
    updateSlidesToShow();
    updateSlider();

    // Event listeners for slider controls
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentSlide < certSlides.length - slidesToShow) {
                currentSlide++;
                updateSlider();
            }
        });
    }

    // Update slider on window resize
    window.addEventListener('resize', function() {
        updateSlidesToShow();
        currentSlide = 0; // Reset to first slide
        updateSlider();
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            
            if (formStatus) {
                formStatus.innerHTML = `
                    <div class="alert alert-success">
                        <p>Thank you ${name}! Your message has been sent successfully.</p>
                    </div>
                `;
                
                // Clear form
                contactForm.reset();
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }
        });
    }

    // Download CV Button
    const downloadCVBtn = document.getElementById('downloadCV');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would download a file
            alert('CV download functionality would be implemented here.');
        });
    }

    // Project Instructions Modal
    const showProjectInstructionsBtn = document.getElementById('showProjectInstructions');
    const projectInstructionsModal = document.getElementById('projectInstructionsModal');
    const closeModalBtn = document.querySelector('.close-btn');

    if (showProjectInstructionsBtn && projectInstructionsModal) {
        showProjectInstructionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            projectInstructionsModal.style.display = 'block';
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            projectInstructionsModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === projectInstructionsModal) {
            projectInstructionsModal.style.display = 'none';
        }
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn?.classList.add('show');
        } else {
            backToTopBtn?.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // AOS (Animate On Scroll) simulation
    // This is a simplified version of AOS functionality
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-in');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => animationObserver.observe(element));
});