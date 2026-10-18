document.addEventListener('DOMContentLoaded', () => {

    /* --- Preloader --- */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500); // minimum loading time for visual effect
    });

    /* --- Sticky Header & Back to Top --- */
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }
    });

    /* --- Mobile Hamburger Menu --- */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    /* --- Scroll Reveal Animations --- */
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    /* --- Active Navigation Link on Scroll --- */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 300)) {
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

    /* --- Smooth Scrolling for Anchor Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    /* --- FAQ Accordion --- */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const answer = question.nextElementSibling;
            const isCurrentlyActive = question.classList.contains('active');

            if (isCurrentlyActive) {
                question.classList.remove('active');
                if (faqItem) faqItem.classList.remove('active');
                if (answer) {
                    answer.style.maxHeight = null;
                }
            } else {
                question.classList.add('active');
                if (faqItem) faqItem.classList.add('active');
                if (answer) {
                    answer.style.maxHeight = (answer.scrollHeight + 30) + "px";
                }
            }
        });
    });

    /* --- Testimonial Slider --- */
    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "CTO, FinSphere Global",
            photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
            rating: 5,
            text: "RC Techno Solution completely transformed our digital architecture. Their full-stack engineers delivered our fintech platform ahead of schedule with flawless security."
        },
        {
            name: "Michael Vance",
            role: "Founder & CEO, NexaRetail",
            photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            rating: 5,
            text: "The e-commerce and AI chatbot solutions they integrated doubled our checkout conversions in 60 days. Their communication and code quality are second to none."
        },
        {
            name: "Rajesh Kulkarni",
            role: "Head of Digital, MediPulse Healthcare",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
            rating: 5,
            text: "Exceptional cloud engineering and responsive UI. The real-time patient analytics dashboard was intuitive, fast, and HIPAA-compliant. Highly recommend RC Techno!"
        }
    ];

    const testimonialContainer = document.getElementById('testimonialContainer');
    const sliderDots = document.getElementById('sliderDots');

    if (testimonialContainer && sliderDots) {
        // Generate HTML for slides
        testimonials.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.classList.add('testimonial-slide');
            
            // Generate stars
            let stars = '';
            for(let i=0; i<item.rating; i++) stars += '<i class="fas fa-star"></i>';

            slide.innerHTML = `
                <img src="${item.photo}" alt="${item.name}" class="client-photo">
                <div class="rating">${stars}</div>
                <p class="testimonial-text">"${item.text}"</p>
                <h4>${item.name}</h4>
                <span style="color: var(--clr-primary); font-size: 0.9rem;">${item.role}</span>
            `;
            testimonialContainer.appendChild(slide);

            // Generate Dots
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });

        let currentSlide = 0;
        const allDots = document.querySelectorAll('.dot');

        function goToSlide(index) {
            currentSlide = index;
            testimonialContainer.style.transform = `translateX(-${index * 100}%)`;
            
            allDots.forEach(d => d.classList.remove('active'));
            allDots[index].classList.add('active');
        }

        // Auto slide every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            goToSlide(currentSlide);
        }, 5000);
    }

    /* --- Floating WhatsApp Button (Bottom-Left) --- */
    const waStyles = document.createElement('style');
    waStyles.innerHTML = `
        .whatsapp-float {
            position: fixed;
            width: 50px;
            height: 50px;
            bottom: 20px;
            left: 20px;
            background-color: #25d366;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            font-size: 26px;
            box-shadow: 0px 6px 18px rgba(37, 211, 102, 0.35);
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        }
        .whatsapp-float:hover {
            transform: scale(1.08);
            color: #FFF;
            box-shadow: 0px 10px 24px rgba(37, 211, 102, 0.5);
        }
        @media (max-width: 480px) {
            .whatsapp-float {
                width: 44px;
                height: 44px;
                font-size: 22px;
                bottom: 16px;
                left: 16px;
            }
        }
    `;
    document.head.appendChild(waStyles);

    const waBtn = document.createElement('a');
    waBtn.href = "https://wa.me/918780628716?text=Hello%20RC%20Techno%20Solution!%20I'm%20interested%20in%20discussing%20a%20project.";
    waBtn.target = "_blank";
    waBtn.rel = "noopener noreferrer";
    waBtn.className = "whatsapp-float";
    waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    waBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(waBtn);

    /* --- Portfolio Category Filter & Load More Logic --- */
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const loadMoreBtn = document.getElementById('loadMoreProjectsBtn');
    const loadMoreContainer = document.querySelector('.portfolio-load-more');

    const INITIAL_ITEMS = 4;
    let currentLimit = INITIAL_ITEMS;
    let currentFilter = 'all';

    function updatePortfolioDisplay() {
        let matchingCount = 0;
        let visibleCount = 0;

        portfolioCards.forEach(card => {
            const category = card.getAttribute('data-category') || '';
            const matches = (currentFilter === 'all' || category === currentFilter || category.includes(currentFilter));

            if (matches) {
                matchingCount++;
                if (matchingCount <= currentLimit) {
                    card.classList.remove('hidden');
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 30);
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                }
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(15px)';
            }
        });

        // Toggle Load More button visibility and count
        if (loadMoreContainer) {
            const remaining = matchingCount - visibleCount;
            if (remaining > 0) {
                loadMoreContainer.style.display = 'flex';
                if (loadMoreBtn) {
                    loadMoreBtn.innerHTML = `<span>Load More Projects (${remaining} more)</span> <i class="fas fa-chevron-down"></i>`;
                }
            } else {
                loadMoreContainer.style.display = 'none';
            }
        }
    }

    if (portfolioCards.length > 0) {
        updatePortfolioDisplay();

        if (filterButtons.length > 0) {
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    currentFilter = btn.getAttribute('data-filter') || 'all';
                    currentLimit = INITIAL_ITEMS; // Reset to initial count on category change
                    updatePortfolioDisplay();
                });
            });
        }

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                currentLimit += INITIAL_ITEMS;
                updatePortfolioDisplay();
            });
        }
    }

    /* --- Project Cost & Timeline Estimator Engine --- */
    const estimatorContainer = document.getElementById('project-estimator');
    if (estimatorContainer) {
        let selectedType = 'webapp';
        let selectedSpeed = 'standard';
        let baseRates = {
            'website': { usdMin: 950, usdMax: 1600, inrMin: 40000, inrMax: 70000, weeks: '2 - 3' },
            'webapp': { usdMin: 2200, usdMax: 4500, inrMin: 90000, inrMax: 180000, weeks: '4 - 6' },
            'ecommerce': { usdMin: 1800, usdMax: 3800, inrMin: 75000, inrMax: 150000, weeks: '3 - 5' },
            'ai': { usdMin: 2500, usdMax: 5500, inrMin: 110000, inrMax: 220000, weeks: '4 - 7' }
        };

        const typeCards = estimatorContainer.querySelectorAll('.type-option-card');
        const featureChecks = estimatorContainer.querySelectorAll('.feature-check-label input');
        const speedOptions = estimatorContainer.querySelectorAll('.speed-option');
        const priceDisplay = estimatorContainer.querySelector('.price-amount');
        const priceInrDisplay = estimatorContainer.querySelector('.price-inr');
        const durationDisplay = estimatorContainer.querySelector('.estimated-duration');
        const breakdownSummary = estimatorContainer.querySelector('.selected-features-summary');
        const whatsappQuoteBtn = estimatorContainer.querySelector('.btn-whatsapp-quote');
        const lockQuoteBtn = estimatorContainer.querySelector('.btn-lock-quote');

        function updateEstimator() {
            const base = baseRates[selectedType] || baseRates['webapp'];
            let addedUsdMin = 0;
            let addedUsdMax = 0;
            let addedInrMin = 0;
            let addedInrMax = 0;
            let selectedFeatureNames = [];

            featureChecks.forEach(input => {
                const label = input.closest('.feature-check-label');
                if (input.checked) {
                    label.classList.add('checked');
                    const usd = parseInt(input.getAttribute('data-usd') || '0', 10);
                    const inr = parseInt(input.getAttribute('data-inr') || '0', 10);
                    addedUsdMin += usd;
                    addedUsdMax += Math.round(usd * 1.35);
                    addedInrMin += inr;
                    addedInrMax += Math.round(inr * 1.35);
                    selectedFeatureNames.push(input.getAttribute('data-name') || input.value);
                } else {
                    label.classList.remove('checked');
                }
            });

            let multiplier = selectedSpeed === 'express' ? 1.2 : 1.0;
            let totalUsdMin = Math.round((base.usdMin + addedUsdMin) * multiplier);
            let totalUsdMax = Math.round((base.usdMax + addedUsdMax) * multiplier);
            let totalInrMin = Math.round((base.inrMin + addedInrMin) * multiplier);
            let totalInrMax = Math.round((base.inrMax + addedInrMax) * multiplier);

            if (priceDisplay) {
                priceDisplay.textContent = `$${totalUsdMin.toLocaleString()} - $${totalUsdMax.toLocaleString()}`;
            }
            if (priceInrDisplay) {
                priceInrDisplay.textContent = `₹${totalInrMin.toLocaleString()} - ₹${totalInrMax.toLocaleString()} INR`;
            }
            if (durationDisplay) {
                durationDisplay.textContent = selectedSpeed === 'express' ? '2 - 3 Weeks (Expedited)' : `${base.weeks} Weeks`;
            }
            if (breakdownSummary) {
                breakdownSummary.textContent = selectedFeatureNames.length > 0 
                    ? selectedFeatureNames.join(', ')
                    : 'Core architecture included';
            }

            // Sync with WhatsApp button
            if (whatsappQuoteBtn) {
                const msg = encodeURIComponent(
                    `Hello RC Techno Solution! I used your Project Estimator.\n\n` +
                    `• Solution: ${selectedType.toUpperCase()}\n` +
                    `• Features: ${selectedFeatureNames.join(', ') || 'Standard'}\n` +
                    `• Speed: ${selectedSpeed.toUpperCase()}\n` +
                    `• Estimated Budget: $${totalUsdMin} - $${totalUsdMax} (₹${totalInrMin} - ₹${totalInrMax})\n\n` +
                    `I would like to discuss next steps with your team.`
                );
                whatsappQuoteBtn.href = `https://wa.me/918780628716?text=${msg}`;
            }
        }

        typeCards.forEach(card => {
            card.addEventListener('click', () => {
                typeCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedType = card.getAttribute('data-type');
                updateEstimator();
            });
        });

        featureChecks.forEach(check => {
            check.addEventListener('change', updateEstimator);
        });

        speedOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                speedOptions.forEach(s => s.classList.remove('selected'));
                opt.classList.add('selected');
                selectedSpeed = opt.getAttribute('data-speed');
                updateEstimator();
            });
        });

        if (lockQuoteBtn) {
            lockQuoteBtn.addEventListener('click', () => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    const subjectInput = document.querySelector('input[name="subject"], input[placeholder*="Subject"]');
                    const messageArea = document.querySelector('textarea[name="message"], textarea[placeholder*="Message"]');
                    if (subjectInput) {
                        subjectInput.value = `Project Estimate: ${selectedType.toUpperCase()} ($${priceDisplay?.textContent || ''})`;
                    }
                    if (messageArea) {
                        messageArea.value = `Hi RC Techno team,\n\nI configured an estimate for a ${selectedType.toUpperCase()} project.\nEstimated Range: ${priceDisplay?.textContent || ''} (${priceInrDisplay?.textContent || ''})\nKey Features: ${breakdownSummary?.textContent || ''}\nTimeline: ${durationDisplay?.textContent || ''}.\n\nPlease contact me to proceed.`;
                    }
                }
                showToast("Estimate loaded into Contact Form! Complete your details below.");
            });
        }

        updateEstimator();
    }

    /* --- Modern Toast Notification Helper --- */
    function showToast(message, iconClass = 'fas fa-check-circle') {
        let toast = document.getElementById('rc-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'rc-toast';
            toast.className = 'rc-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="${iconClass}"></i><span>${message}</span>`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    }
    window.showRCToast = showToast;

    /* --- Contact Form Submission Handler --- */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.removeAttribute('onsubmit'); // Remove old static alert
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = contactForm.querySelector('input[placeholder*="Name"]');
            const emailInput = contactForm.querySelector('input[placeholder*="Email"]');
            const phoneInput = contactForm.querySelector('input[type="tel"]');
            const subjectInput = contactForm.querySelector('input[placeholder*="Subject"]');
            const messageInput = contactForm.querySelector('textarea');

            const name = nameInput ? nameInput.value.trim() : 'Client';
            const email = emailInput ? emailInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : 'Project Inquiry';
            const message = messageInput ? messageInput.value.trim() : '';

            // Construct WhatsApp direct prefilled message
            const waText = encodeURIComponent(
                `*New Inquiry via RC Techno Website*\n\n` +
                `*Name:* ${name}\n` +
                `*Email:* ${email}\n` +
                `*Phone:* ${phone || 'Not provided'}\n` +
                `*Subject:* ${subject}\n` +
                `*Message:*\n${message}`
            );

            showToast("Thank you, " + name + "! Inquiry received. Launching WhatsApp confirmation...");

            // Open WhatsApp direct contact in new tab after brief delay for smooth UX
            setTimeout(() => {
                window.open(`https://wa.me/918780628716?text=${waText}`, '_blank');
                contactForm.reset();
            }, 1200);
        });
    }

    /* --- Services Load More --- */
    const servicesGrids = document.querySelectorAll('.bento-services-grid, .services-grid');
    
    servicesGrids.forEach(grid => {
        const items = grid.querySelectorAll('.bento-service-card, .service-card');
        const loadMoreBtn = grid.nextElementSibling?.querySelector('.load-more-services-btn');
        let currentItem = 6;

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                for (let i = currentItem; i < currentItem + 3 && i < items.length; i++) {
                    items[i].classList.add('show');
                }
                currentItem += 3;
                if (currentItem >= items.length) {
                    loadMoreBtn.style.display = 'none';
                }
            });
            
            // If less than or equal to 6 items, hide the button initially
            if(items.length <= 6) {
                loadMoreBtn.style.display = 'none';
            }
        }
    });

    /* --- Gallery Lightbox and Load More --- */
    // Create Lightbox Elements
    const lightboxHTML = `
        <div id="lightbox" class="lightbox">
            <span class="lightbox-close">&times;</span>
            <span class="lightbox-prev">&#10094;</span>
            <span class="lightbox-next">&#10095;</span>
            <img class="lightbox-content" id="lightboxImg">
            <div class="lightbox-caption" id="lightboxCaption"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.querySelector('.lightbox-close');
    const prevLightbox = document.querySelector('.lightbox-prev');
    const nextLightbox = document.querySelector('.lightbox-next');

    // State for gallery
    let currentGalleryImages = [];
    let currentImageIndex = 0;

    // Attach click events for all gallery grids (in case there are multiple on the page)
    const galleryGrids = document.querySelectorAll('.gallery-grid');
    
    galleryGrids.forEach(grid => {
        // Load More Logic
        const items = grid.querySelectorAll('.gallery-item');
        const loadMoreBtn = grid.nextElementSibling?.querySelector('.load-more-btn');
        let currentItem = 3;

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                for (let i = currentItem; i < currentItem + 3 && i < items.length; i++) {
                    items[i].classList.add('show');
                }
                currentItem += 3;
                if (currentItem >= items.length) {
                    loadMoreBtn.style.display = 'none';
                }
            });
        }

        // Lightbox Logic for this grid
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                // Populate current gallery images list when opening
                currentGalleryImages = Array.from(grid.querySelectorAll('.gallery-item'))
                                            .map(el => ({
                                                src: el.querySelector('img').src,
                                                alt: el.querySelector('img').alt
                                            }));
                currentImageIndex = index;
                openLightbox(currentGalleryImages[currentImageIndex]);
            });
        });
    });

    function openLightbox(imgData) {
        lightbox.classList.add('active');
        lightboxImg.src = imgData.src;
        lightboxCaption.textContent = imgData.alt;
        document.body.style.overflow = 'hidden'; // prevent scrolling
    }

    function closeLightboxFunc() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeLightbox.addEventListener('click', closeLightboxFunc);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });

    function showImage(index) {
        if (index >= currentGalleryImages.length) {
            currentImageIndex = 0;
        } else if (index < 0) {
            currentImageIndex = currentGalleryImages.length - 1;
        } else {
            currentImageIndex = index;
        }
        openLightbox(currentGalleryImages[currentImageIndex]);
    }

    nextLightbox.addEventListener('click', () => showImage(currentImageIndex + 1));
    prevLightbox.addEventListener('click', () => showImage(currentImageIndex - 1));

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
        if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
        if (e.key === 'Escape') closeLightboxFunc();
    });

    /* --- Interactive Canvas Particle Background --- */
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let numParticles = window.innerWidth < 768 ? 20 : 60; // Optimized count
        
        let mouse = { x: null, y: null, radius: 120 };

        window.addEventListener('mousemove', (e) => {
            if (window.innerWidth >= 768) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            }
        });
        window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 20) + 1;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                if (mouse.x != null && window.innerWidth >= 768) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    if (distance < maxDistance) {
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(79, 70, 229, 0.4)';
                ctx.fill();
            }
        }

        function initCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            numParticles = window.innerWidth < 768 ? 20 : 60;
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(79, 70, 229, ${0.15 - distance/800})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', initCanvas);
        initCanvas();
        animate();
    }

    /* --- Accessibility Read Aloud (TTS) --- */
    let isTTSMode = false;
    let currentSpeech = null;
    let currentlyHighlighted = null;
    
    const enableTTSBtn = document.getElementById('enableTTSBtn');
    const ttsControlPanel = document.getElementById('ttsControlPanel');
    const closeTTSBtn = document.getElementById('closeTTSBtn');
    const ttsPauseBtn = document.getElementById('ttsPauseBtn');
    const ttsResumeBtn = document.getElementById('ttsResumeBtn');
    const ttsStopBtn = document.getElementById('ttsStopBtn');
    const ttsVoiceSelect = document.getElementById('ttsVoice');
    const ttsRateInput = document.getElementById('ttsRate');
    
    let voices = [];
    
    function populateVoices() {
        if (!window.speechSynthesis) return;
        voices = window.speechSynthesis.getVoices();
        if (ttsVoiceSelect) {
            ttsVoiceSelect.innerHTML = '';
            voices.forEach((voice, i) => {
                const option = document.createElement('option');
                option.textContent = `${voice.name} (${voice.lang})`;
                option.value = i;
                ttsVoiceSelect.appendChild(option);
            });
        }
    }
    
    populateVoices();
    if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = populateVoices;
    }
    
    if (enableTTSBtn) {
        enableTTSBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isTTSMode = true;
            document.body.classList.add('tts-mode-active');
            ttsControlPanel.classList.add('show');
        });
    }
    
    if (closeTTSBtn) {
        closeTTSBtn.addEventListener('click', () => {
            isTTSMode = false;
            document.body.classList.remove('tts-mode-active');
            ttsControlPanel.classList.remove('show');
            window.speechSynthesis.cancel();
            removeHighlight();
        });
    }
    
    function removeHighlight() {
        if (currentlyHighlighted) {
            currentlyHighlighted.classList.remove('tts-highlight');
            currentlyHighlighted = null;
        }
    }
    
    let hoverTimeout;
    
    document.addEventListener('mouseover', (e) => {
        if (!isTTSMode) return;
        
        if (ttsControlPanel.contains(e.target) || (enableTTSBtn && enableTTSBtn.contains(e.target))) return;
        
        const validTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'A', 'BUTTON', 'SPAN', 'LI', 'LABEL'];
        let targetElement = e.target;
        
        // If they hovered an icon or inner element, try to find the closest valid tag
        if (!validTags.includes(targetElement.tagName)) {
             targetElement = targetElement.closest(validTags.join(','));
        }
        
        if (!targetElement) return;
        
        const textToSpeak = targetElement.innerText || targetElement.textContent;
        if (!textToSpeak || !textToSpeak.trim()) return;
        
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
            window.speechSynthesis.cancel();
            removeHighlight();
            
            currentSpeech = new SpeechSynthesisUtterance(textToSpeak);
            
            const selectedVoice = voices[ttsVoiceSelect.value];
            if (selectedVoice) currentSpeech.voice = selectedVoice;
            currentSpeech.rate = parseFloat(ttsRateInput.value) || 1;
            
            currentSpeech.onstart = () => {
                targetElement.classList.add('tts-highlight');
                currentlyHighlighted = targetElement;
                ttsPauseBtn.style.display = 'block';
                ttsResumeBtn.style.display = 'none';
            };
            
            currentSpeech.onend = () => removeHighlight();
            currentSpeech.onerror = () => removeHighlight();
            
            window.speechSynthesis.speak(currentSpeech);
        }, 300); // 300ms delay to prevent spamming while moving mouse
    });
    
    document.addEventListener('mouseout', (e) => {
        if (!isTTSMode) return;
        clearTimeout(hoverTimeout);
    }); 
    
    if (ttsPauseBtn) {
        ttsPauseBtn.addEventListener('click', () => {
            window.speechSynthesis.pause();
            ttsPauseBtn.style.display = 'none';
            ttsResumeBtn.style.display = 'block';
        });
    }
    
    if (ttsResumeBtn) {
        ttsResumeBtn.addEventListener('click', () => {
            window.speechSynthesis.resume();
            ttsPauseBtn.style.display = 'block';
            ttsResumeBtn.style.display = 'none';
        });
    }
    
        if (ttsStopBtn) {
        ttsStopBtn.addEventListener('click', () => {
            window.speechSynthesis.cancel();
            removeHighlight();
        });
    }

    /* --- Permanent Dark Mode Enforcement (Always Dark Mode) --- */
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('rc_theme', 'dark');

    /* --- 1-Click Discovery Call Modal --- */
    const callModal = document.getElementById('callModal');
    const openCallBtns = document.querySelectorAll('.open-call-modal-btn');
    const closeCallBtn = document.getElementById('closeCallModal');
    const callSlotCards = document.querySelectorAll('.call-slot-card');
    const confirmCallBtn = document.getElementById('confirmCallBtn');
    let selectedSlot = 'Tomorrow at 3:00 PM IST (US East: 5:30 AM)';

    if (callModal) {
        openCallBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                callModal.classList.add('open');
            });
        });

        if (closeCallBtn) {
            closeCallBtn.addEventListener('click', () => callModal.classList.remove('open'));
        }

        callModal.addEventListener('click', (e) => {
            if (e.target === callModal) callModal.classList.remove('open');
        });

        callSlotCards.forEach(card => {
            card.addEventListener('click', () => {
                callSlotCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedSlot = card.getAttribute('data-slot') || card.innerText;
            });
        });

        if (confirmCallBtn) {
            confirmCallBtn.addEventListener('click', () => {
                const name = document.getElementById('callName')?.value.trim() || 'Client';
                const topic = document.getElementById('callTopic')?.value.trim() || 'Project Architecture';
                const waMsg = encodeURIComponent(
                    `*Discovery Call Request - RC Techno Solution*\n\n` +
                    `*Name:* ${name}\n` +
                    `*Requested Slot:* ${selectedSlot}\n` +
                    `*Discussion Topic:* ${topic}`
                );
                callModal.classList.remove('open');
                window.showRCToast?.("Discovery call slot reserved! Launching WhatsApp confirmation...");
                setTimeout(() => {
                    window.open(`https://wa.me/918780628716?text=${waMsg}`, '_blank');
                }, 1000);
            });
        }
    }

    /* --- Top Glow Scroll Reading Progress Bar --- */
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    if (scrollProgressBar) {
        window.addEventListener('scroll', () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (maxScroll > 0) {
                const pct = (window.scrollY / maxScroll) * 100;
                scrollProgressBar.style.width = Math.min(Math.max(pct, 0), 100) + '%';
            }
        }, { passive: true });
    }

    /* --- Free 24-Hour Digital Health & Security Audit Handler --- */
    const auditForm = document.getElementById('freeAuditForm');
    if (auditForm) {
        auditForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const urlInput = document.getElementById('auditUrl');
            const emailInput = document.getElementById('auditEmail');
            const submitBtn = auditForm.querySelector('button[type="submit"]');
            const url = urlInput?.value.trim();
            const email = emailInput?.value.trim();
            if (!url) return;

            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Running Diagnostic Scan...';
            }

            window.showRCToast?.("🔍 Analyzing SSL/TLS, Core Web Vitals, and security headers...");

            setTimeout(() => {
                window.showRCToast?.("📊 Diagnostic completed! Launching WhatsApp with audit findings...");
            }, 900);

            setTimeout(() => {
                const waMsg = encodeURIComponent(
                    `*Free 24-Hour Digital Health & Security Audit Request*\n\n` +
                    `*Target Website URL:* ${url}\n` +
                    `*Report Recipient Email:* ${email || 'Direct WhatsApp Delivery'}\n` +
                    `*Parameters:* SSL Certificate, Core Web Vitals (LCP/CLS), Cloud Latency, OWASP Top 10 Guardrails.`
                );

                window.open(`https://wa.me/918780628716?text=${waMsg}`, '_blank');
                auditForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }, 1800);
        });
    }

    /* --- Interactive FAQ Category, Live Search & View More Handler --- */
    const faqSearchInput = document.getElementById('faqSearchInput');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqCategoryBtns = document.querySelectorAll('.faq-category-btn');
    const faqToggleMoreBtn = document.getElementById('faqToggleMoreBtn');
    let currentFaqCategory = 'all';
    let isFaqExpanded = false;

    function filterFaqs() {
        const query = faqSearchInput ? faqSearchInput.value.toLowerCase().trim() : '';
        const isFiltering = (currentFaqCategory !== 'all' || query.length > 0);

        faqItems.forEach(item => {
            const category = item.getAttribute('data-category') || '';
            const matchesCategory = (currentFaqCategory === 'all' || category === currentFaqCategory);
            const questionText = item.querySelector('.faq-question h3')?.innerText.toLowerCase() || '';
            const answerText = item.querySelector('.faq-answer p')?.innerText.toLowerCase() || '';
            const matchesQuery = (!query || questionText.includes(query) || answerText.includes(query));
            const isExtra = item.classList.contains('faq-extra');

            if (matchesCategory && matchesQuery) {
                if (!isFiltering && isExtra && !isFaqExpanded) {
                    item.style.display = 'none';
                    item.classList.remove('show');
                } else {
                    item.style.display = 'block';
                    if (isExtra) item.classList.add('show');
                }
            } else {
                item.style.display = 'none';
                item.classList.remove('show');
            }
        });

        // Hide toggle button if currently filtering or searching
        if (faqToggleMoreBtn && faqToggleMoreBtn.parentElement) {
            if (isFiltering) {
                faqToggleMoreBtn.parentElement.style.display = 'none';
            } else {
                faqToggleMoreBtn.parentElement.style.display = 'block';
                faqToggleMoreBtn.innerHTML = isFaqExpanded
                    ? '<i class="fas fa-chevron-up"></i> Show Fewer Questions'
                    : '<i class="fas fa-chevron-down"></i> View More Questions';
            }
        }
    }

    if (faqToggleMoreBtn) {
        faqToggleMoreBtn.addEventListener('click', () => {
            isFaqExpanded = !isFaqExpanded;
            filterFaqs();
        });
    }

    if (faqCategoryBtns.length > 0) {
        faqCategoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                faqCategoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFaqCategory = btn.getAttribute('data-filter') || 'all';
                filterFaqs();
            });
        });
    }

    if (faqSearchInput && faqItems.length > 0) {
        faqSearchInput.addEventListener('input', filterFaqs);
    }

    if (faqItems.length > 0) {
        filterFaqs();
    }

    /* --- Executive Hero Title Full Typing Animation --- */
    const typePart1 = document.getElementById('heroTypePart1');
    const typePart2 = document.getElementById('heroTypePart2');

    if (typePart1 && typePart2) {
        const fullPart1 = "Architecting Resilient Digital Platforms &";
        const accentWords = [
            "Intelligent Systems",
            "Enterprise Cloud Architecture",
            "Mission-Critical SaaS",
            "Autonomous AI Workflows"
        ];

        // Clear text to start the live typing sequence
        typePart1.textContent = "";
        typePart2.textContent = "";

        let idx1 = 0;
        let idx2 = 0;
        let wordIdx = 0;
        let isDeleting = false;

        // Step 1: Type out "Architecting Resilient Digital Platforms &"
        function typeLine1() {
            if (idx1 < fullPart1.length) {
                typePart1.textContent += fullPart1.charAt(idx1);
                idx1++;
                setTimeout(typeLine1, 35);
            } else {
                // First line finished, pause briefly then type second line
                setTimeout(typeLine2, 220);
            }
        }

        // Step 2: Type out "Intelligent Systems" with the gradient accent and blinking cursor
        function typeLine2() {
            const currentWord = accentWords[wordIdx];

            if (isDeleting) {
                idx2--;
                typePart2.textContent = currentWord.substring(0, idx2);
            } else {
                idx2++;
                typePart2.textContent = currentWord.substring(0, idx2);
            }

            if (!isDeleting && idx2 === currentWord.length) {
                // Completed full headline: Architecting Resilient Digital Platforms & Intelligent Systems|
                // Generous pause to appreciate the full typed headline
                isDeleting = true;
                setTimeout(typeLine2, 3500);
                return;
            } else if (isDeleting && idx2 === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % accentWords.length;
                setTimeout(typeLine2, 350);
                return;
            }

            const speed = isDeleting ? 38 : 70;
            setTimeout(typeLine2, speed);
        }

        // Start typing shortly after page load
        setTimeout(typeLine1, 350);
    }

    /* --- Live Animated Impact Metric Counters --- */
    const counterElements = document.querySelectorAll('.hero-counter-num');
    if (counterElements.length > 0 && 'IntersectionObserver' in window) {
        let countersAnimated = false;
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    counterElements.forEach(counter => {
                        const target = parseFloat(counter.getAttribute('data-target'));
                        const suffix = counter.getAttribute('data-suffix') || '';
                        const decimal = parseInt(counter.getAttribute('data-decimal') || '0', 10);
                        const duration = 1800; // ms
                        const startTime = performance.now();

                        function updateCount(currentTime) {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            // Ease-out cubic curve
                            const easeProgress = 1 - Math.pow(1 - progress, 3);
                            const currentVal = (target * easeProgress).toFixed(decimal);
                            counter.textContent = currentVal + suffix;

                            if (progress < 1) {
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.textContent = (decimal > 0 ? target.toFixed(decimal) : target) + suffix;
                            }
                        }

                        requestAnimationFrame(updateCount);
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.15 });

        const metricsBar = document.querySelector('.hero-metrics-bar');
        if (metricsBar) {
            counterObserver.observe(metricsBar);
        }
    }

    /* --- Executive Pillar Cards Subtle 3D Mouse Tilt --- */
    const pillarCards = document.querySelectorAll('.pillar-card');
    pillarCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* --- Background Video Audio & Playback Controller --- */
    const heroSection = document.getElementById('home');
    const heroBgVideo = document.getElementById('heroBgVideo') || document.querySelector('.hero-bg-video');
    const soundToggle = document.getElementById('heroSoundToggle');

    if (heroBgVideo && soundToggle) {
        const soundIcon = soundToggle.querySelector('.sound-icon');
        const soundText = soundToggle.querySelector('.sound-text');
        let userWantsSound = true;
        let isScrolledAway = false;

        function updateSoundUI(isMuted) {
            if (isMuted) {
                soundToggle.classList.add('muted');
                if (soundIcon) soundIcon.className = 'fas fa-volume-mute sound-icon';
                if (soundText) soundText.textContent = 'Voice: OFF';
            } else {
                soundToggle.classList.remove('muted');
                if (soundIcon) soundIcon.className = 'fas fa-volume-up sound-icon';
                if (soundText) soundText.textContent = 'Voice: ON';
            }
        }

        // Automatic Video Play on Load (Always cleanly muted so browser never blocks or aborts video)
        function startHeroVideo() {
            if (isScrolledAway) return;
            heroBgVideo.muted = true;
            updateSoundUI(true);

            const triggerPlay = () => {
                heroBgVideo.muted = true;
                const p = heroBgVideo.play();
                if (p !== undefined) {
                    p.catch((err) => {
                        console.warn('Hero video autoplay retry:', err);
                        // Retry on next frame
                        requestAnimationFrame(() => {
                            heroBgVideo.muted = true;
                            heroBgVideo.play().catch(() => {});
                        });
                    });
                }
            };

            triggerPlay();
            heroBgVideo.addEventListener('canplay', triggerPlay, { once: true });
            heroBgVideo.addEventListener('loadeddata', triggerPlay, { once: true });

            // If user interacts anywhere, attempt to turn on voice if user wants it
            const handleFirstGesture = () => {
                ['click', 'touchstart', 'keydown'].forEach(evt => {
                    window.removeEventListener(evt, handleFirstGesture);
                });
                if (userWantsSound && !isScrolledAway) {
                    heroBgVideo.muted = false;
                    heroBgVideo.play().then(() => {
                        updateSoundUI(false);
                    }).catch(() => {
                        heroBgVideo.muted = true;
                        updateSoundUI(true);
                    });
                }
            };

            ['click', 'touchstart', 'keydown'].forEach(evt => {
                window.addEventListener(evt, handleFirstGesture, { passive: true, once: true });
            });
        }

        startHeroVideo();

        function playVoiceBriefing() {
            if (!('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel();

            const briefingText = "Welcome to RC Techno Solution. We engineer mission-critical cloud backends, custom SaaS architectures, and autonomous AI systems with guaranteed sprint velocity and 100 percent intellectual property ownership.";
            const utterance = new SpeechSynthesisUtterance(briefingText);
            utterance.rate = 1.02;
            utterance.pitch = 1.0;

            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => (v.name.includes('Google') || v.name.includes('Natural') || v.lang.startsWith('en')) && v.lang.includes('US'));
            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.onend = () => {
                userWantsSound = false;
                updateSoundUI(true);
            };

            utterance.onerror = () => {
                userWantsSound = false;
                updateSoundUI(true);
            };

            window.speechSynthesis.speak(utterance);
        }

        function stopVoiceBriefing() {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        }

        // Manual Voice Toggle Button
        soundToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (heroBgVideo.muted) {
                userWantsSound = true;
                heroBgVideo.muted = false;
                heroBgVideo.play().then(() => {
                    updateSoundUI(false);
                    playVoiceBriefing();
                    window.showRCToast?.("🎙️ Playing Executive Voice Briefing...");
                }).catch(() => {
                    heroBgVideo.muted = true;
                    updateSoundUI(true);
                    stopVoiceBriefing();
                });
            } else {
                userWantsSound = false;
                heroBgVideo.muted = true;
                updateSoundUI(true);
                stopVoiceBriefing();
            }
        });

        // Automatically turn off video & voice when user scrolls down from Home page
        function handleHeroVisibility(inView) {
            if (inView) {
                // Scrolled back up to Home page
                isScrolledAway = false;
                heroBgVideo.play().catch(() => {});
                if (userWantsSound) {
                    heroBgVideo.muted = false;
                    updateSoundUI(false);
                } else {
                    heroBgVideo.muted = true;
                    updateSoundUI(true);
                }
            } else {
                // Scrolled down from Home page -> Stop video & turn off voice immediately
                if (window.scrollY > 200) {
                    isScrolledAway = true;
                    heroBgVideo.pause();
                    heroBgVideo.muted = true;
                    updateSoundUI(true);
                    stopVoiceBriefing();
                }
            }
        }

        if (heroSection && 'IntersectionObserver' in window) {
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        handleHeroVisibility(true);
                    } else if (window.scrollY > 200) {
                        handleHeroVisibility(false);
                    }
                });
            }, {
                threshold: [0, 0.1, 0.5]
            });
            heroObserver.observe(heroSection);
        }

        // Secondary scroll listener for instantaneous performance
        window.addEventListener('scroll', () => {
            if (!heroSection) return;
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom <= 50 && window.scrollY > 200 && !isScrolledAway) {
                handleHeroVisibility(false);
            } else if (heroRect.bottom > 50 && isScrolledAway) {
                handleHeroVisibility(true);
            }
        }, { passive: true });
    }
});
