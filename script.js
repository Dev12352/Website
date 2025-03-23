// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');
    const cursor = document.querySelector('.cursor');

    // Custom cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Active navigation based on scroll position
        updateActiveNavOnScroll();
    });

    // Update active navigation item on scroll
    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 300;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Project filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact form submission (just for demo)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Success message (in a real app, you'd send the data to a server)
                console.log('Form data:', formObject);
                submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                submitBtn.classList.add('success');
                
                // Reset the form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                }, 3000);
            }, 1500);
        });
    }

    // Typing animation for code window
    const codeContent = document.querySelector('.code-content code');
    if (codeContent) {
        const originalCode = codeContent.innerHTML;
        codeContent.innerHTML = '';
        
        let i = 0;
        function typeCode() {
            if (i < originalCode.length) {
                codeContent.innerHTML += originalCode.charAt(i);
                i++;
                setTimeout(typeCode, 30);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeCode, 1000);
    }

    // Add syntax highlighting for code blocks
    function applySyntaxHighlighting() {
        const codeEl = document.querySelector('.code-content code');
        if (!codeEl) return;
        
        let content = codeEl.innerHTML;
        
        // Highlight Python keywords
        const keywords = ['def', 'print', 'return', 'for', 'in'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            content = content.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        // Highlight strings
        content = content.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
        
        // Highlight function names
        content = content.replace(/(\w+)\(/g, '<span class="function">$1</span>(');
        
        codeEl.innerHTML = content;
    }
    
    // Apply syntax highlighting after typing animation completes
    setTimeout(applySyntaxHighlighting, 5000);

    // Reveal animations for sections
    const revealElements = document.querySelectorAll('.skill-item, .project-card');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.5s ease-in-out';
            }, 500);
        });
    }
    
    // Trigger progress bar animation when skills section is in view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateProgressBars();
                observer.unobserve(skillsSection);
            }
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add styles to code for animations
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.innerHTML = `
        .skill-item, .project-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-item.revealed, .project-card.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .submit-btn.success {
            background-color: var(--success-color) !important;
        }
        
        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
        
        .img-placeholder {
            background-size: 200% 200%;
            animation: gradient 5s ease infinite;
        }
    `;
    document.head.appendChild(style);
});