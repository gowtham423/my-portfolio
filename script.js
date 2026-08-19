document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Theme Switcher (Dark/Light Mode)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme preference, default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        themeIcon.className = 'fa-solid fa-moon';
    }
    
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });

    /* ==========================================================================
       Mobile Navigation Menu
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        if (navLinksContainer.classList.contains('active')) {
            mobileMenuIcon.className = 'fa-solid fa-xmark';
            document.body.style.overflow = 'hidden'; // Stop page scrolling
        } else {
            mobileMenuIcon.className = 'fa-solid fa-bars';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            mobileMenuIcon.className = 'fa-solid fa-bars';
            document.body.style.overflow = 'auto';
        });
    });

    /* ==========================================================================
       Navbar Scroll Effect
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       Active Link Highlighter on Scroll (Intersection Observer)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navObserverOptions = {
        root: null,
        threshold: 0.25, // Trigger when 25% of section is visible
        rootMargin: '-80px 0px 0px 0px' // Adjust for sticky navbar height
    };
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, navObserverOptions);
    
    sections.forEach(section => navObserver.observe(section));

    /* ==========================================================================
       Scroll Reveal Animation (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserverOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, revealObserverOptions);
    
    revealElements.forEach(element => revealObserver.observe(element));

    /* ==========================================================================
       Hero Typing Animation
       ========================================================================== */
    const typingText = document.getElementById('typing-text');
    const roles = [
        'Full Stack Developer.',
        'React & Node.js Developer.',
        'AWS Cloud Enthusiast.',
        'Problem Solver.'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Deleting is faster
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before starting next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000); // Start initial typing after 1s

    /* ==========================================================================
       Skills Tabs Filtering
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active class
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.getAttribute('data-tab');
            
            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    // Retrigger fading effect
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250); // Match transit timing
                }
            });
        });
    });

    /* ==========================================================================
       Projects Details Modal Injection
       ========================================================================== */
    const projectDetailsData = {
        'books-inventory': {
            title: 'Books Stock Inventory Management System',
            subtitle: 'Full Stack inventory, logging, & warning platform',
            description: 'Developed an end-to-end stock and inventory logistics system, designed to catalog stock holdings, track supplier replenishment timelines, and log transactions securely. Solved major consistency checks to prevent parallel transaction race conditions.',
            features: [
                'Built responsive inventory control panels in React styled dynamically for tablet and mobile sizes.',
                'Designed structured backend architecture with Node.js and TypeScript.',
                'Utilized MySQL relational database for transactional consistency and complex query analysis.',
                'Deployed the entire system on AWS infrastructure (S3, EC2) optimized for high availability.',
                'Configured system notifications triggering low-stock indicators and supplier dispatch alerts.'
            ],
            tech: ['React.js', 'Node.js', 'TypeScript', 'MySQL', 'AWS (EC2/S3)', 'VS Code', 'Shopify Integrations']
        },
        'dev-portfolio': {
            title: 'Personal Developer Portfolio Website',
            subtitle: 'Interactive Glassmorphism Resume Showpiece',
            description: 'A dynamic, lightweight developer showcase detailing competencies, education, and professional experience, fully optimized with glassmorphic cards, smooth page triggers, and multi-resolution responsive styles.',
            features: [
                'Engineered responsive styling accommodating laptop, tablet, and mobile displays without layout breakage.',
                'Features native light and dark toggle modes persisting user choices using localStorage.',
                'Integrated Intersection Observer triggers implementing scrolling reveal behaviors on component targets.',
                'High-fidelity custom interactive contact forms utilizing keypress and change validations.'
            ],
            tech: ['HTML5', 'CSS3 (Variables)', 'Vanilla JavaScript', 'Glassmorphism Design', 'FontAwesome Icons']
        },
        'serverless-media': {
            title: 'Serverless Media Processing Engine',
            subtitle: 'Cloud-native File Compression and Catalyst System',
            description: 'An automated background process triggered by user upload events on secure S3 buckets. Runs optimizations, converts formats, and updates logs serverlessly.',
            features: [
                'Designed automated workflow triggers via AWS S3 Object Upload Events.',
                'Constructed compute layer using Node.js executed on AWS Lambda functions.',
                'Achieved rapid compression limits, processing bulk items in parallel pipelines.',
                'Incorporated basic telemetry logging and metrics outputs for system administration.'
            ],
            tech: ['Node.js', 'AWS Lambda', 'Amazon S3', 'GCP Basics', 'TypeScript', 'Postman testing']
        }
    };

    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalDetailsContainer = document.getElementById('modal-project-details');
    const projectDetailButtons = document.querySelectorAll('.project-detail-btn');
    
    function openModal(projectId) {
        const data = projectDetailsData[projectId];
        if (!data) return;
        
        // Inject data
        modalDetailsContainer.innerHTML = `
            <div class="modal-header">
                <h3 class="modal-title">${data.title}</h3>
                <span class="modal-subtitle">${data.subtitle}</span>
            </div>
            <div class="modal-section">
                <h5>Overview</h5>
                <p>${data.description}</p>
            </div>
            <div class="modal-section">
                <h5>Key Deliverables</h5>
                <ul class="modal-bullets">
                    ${data.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-section">
                <h5>Tools & Stack Used</h5>
                <div class="modal-tech-list">
                    ${data.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    projectDetailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });
    
    modalCloseBtn.addEventListener('click', closeModal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ==========================================================================
       Contact Form Handler & Client-side Validation
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
     // Email delivery configuration
     // To enable automatic email sending from the client, create an EmailJS account
     // and fill the IDs below. Otherwise the form will fall back to opening the
     // user's email client using a `mailto:` link to deliver the message.
     const EMAILJS_USER_ID = ''; // e.g. 'user_xxx' (leave empty to disable)
     const EMAILJS_SERVICE_ID = ''; // e.g. 'service_xxx'
     const EMAILJS_TEMPLATE_ID = ''; // e.g. 'template_xxx'
     const CONTACT_RECEIVER = 'naveenkumararunachalam97@gmail.com';
    const serviceLabels = document.querySelectorAll('.services-options label');
    // Initialize chip states from checkboxes
    serviceLabels.forEach(label => {
        const checkbox = label.querySelector('input[type="checkbox"]');
        if (checkbox.checked) label.classList.add('chip--active');

        // Make label keyboard-focusable
        label.tabIndex = 0;

        // Toggle state on click
        label.addEventListener('click', (e) => {
            e.preventDefault();
            checkbox.checked = !checkbox.checked;
            label.classList.toggle('chip--active', checkbox.checked);
            label.classList.add('chip--pulse');
            setTimeout(() => label.classList.remove('chip--pulse'), 360);
        });

        // Support keyboard activation
        label.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                label.click();
            }
        });
    });
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const subject = document.getElementById('form-subject').value.trim();
        const message = document.getElementById('form-message').value.trim();
        const services = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(i => i.value);

        // Simple client validations
        if (!name || !email || !subject || !message) {
            showStatus('Please fill in all fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showStatus('Please enter a valid email address.', 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('.form-submit-btn');
        submitBtn.disabled = true;
        showStatus('Sending message...', 'info');

        const templateParams = {
            to_email: CONTACT_RECEIVER,
            from_name: name,
            from_email: email,
            subject,
            message,
            services: services.length ? services.join(', ') : 'General Inquiry'
        };

        // Helper: open user's mail client as fallback
        function openMailClient() {
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AServices: ${templateParams.services}%0D%0A%0D%0A${message}`;
            const mailto = `mailto:${CONTACT_RECEIVER}?subject=${encodeURIComponent(subject)}&body=${body}`;
            window.location.href = mailto;
            showStatus('Opened your email client. Please send the message to complete.', 'info');
            submitBtn.disabled = false;
        }

        // If EmailJS is configured, attempt to send via EmailJS
        if (EMAILJS_USER_ID && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
            try {
                // Dynamically load EmailJS SDK if needed
                if (!window.emailjs) {
                    await new Promise((resolve, reject) => {
                        const s = document.createElement('script');
                        s.src = 'https://cdn.emailjs.com/sdk/3.2.0/email.min.js';
                        s.onload = resolve;
                        s.onerror = reject;
                        document.head.appendChild(s);
                    });
                }

                window.emailjs.init(EMAILJS_USER_ID);
                const resp = await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
                console.log('EmailJS response', resp);
                showStatus('Thank you! Your message has been sent successfully. I will get back to you shortly.', 'success');
                contactForm.reset();
            } catch (err) {
                console.error('EmailJS send error', err);
                showStatus('Failed to send via EmailJS. Opening your email client as fallback.', 'error');
                openMailClient();
            } finally {
                submitBtn.disabled = false;
            }
        } else {
            // No EmailJS configured — use mailto fallback
            openMailClient();
        }
    });
        // Profile image load handling: hide decorative background when real image is present
        const profileImg = document.getElementById('profile-img');
        const profileFrame = document.querySelector('.profile-frame');
        if (profileImg) {
            if (profileImg.complete && profileImg.naturalWidth !== 0) {
                profileFrame && profileFrame.classList.add('has-image');
            } else {
                profileImg.addEventListener('load', () => {
                    profileFrame && profileFrame.classList.add('has-image');
                });
                profileImg.addEventListener('error', () => {
                    // keep decorative background if image fails
                    profileFrame && profileFrame.classList.remove('has-image');
                });
            }
        }
    
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email.toLowerCase());
    }
    
    function showStatus(msg, type) {
        formStatus.textContent = msg;
        formStatus.className = 'form-status'; // Reset classes
        
        if (type === 'success') {
            formStatus.classList.add('success');
        } else if (type === 'error') {
            formStatus.classList.add('error');
        } else {
            formStatus.style.color = 'var(--accent-color)';
        }
        
        // Clear status text after 5s if success
        if (type === 'success') {
            setTimeout(() => {
                formStatus.textContent = '';
            }, 6000);
        }
    }
});
