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

        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
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
            question.classList.toggle('active');
            const answer = question.nextElementSibling;
            
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.padding = "0 20px 20px";
            } else {
                answer.style.maxHeight = null;
                answer.style.padding = "0 20px";
            }
        });
    });

    /* --- Testimonial Slider --- */
    const testimonials = [
        {
            name: "Alice Williams",
            role: "Marketing Director",
            photo: "https://placehold.co/100x100/1e293b/38bdf8?text=AW",
            rating: 5,
            text: "RatanTech Solutions completely transformed our online presence. Their attention to detail and modern design approaches are unmatched. Highly recommended!"
        },
        {
            name: "David Chen",
            role: "Startup Founder",
            photo: "https://placehold.co/100x100/1e293b/38bdf8?text=DC",
            rating: 5,
            text: "The web application they built for our startup was delivered on time and exceeded our expectations in terms of performance and UI/UX."
        },
        {
            name: "Emma Stone",
            role: "E-Commerce Manager",
            photo: "https://placehold.co/100x100/1e293b/38bdf8?text=ES",
            rating: 4,
            text: "Excellent support and high-quality code. The new dashboard they integrated helped us track our sales analytics effortlessly."
        }
    ];

    const testimonialContainer = document.getElementById('testimonialContainer');
    const sliderDots = document.getElementById('sliderDots');

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

    /* --- WhatsApp & AI Chatbot Floating Widgets --- */
    const widgetStyles = document.createElement('style');
    widgetStyles.innerHTML = `
        /* WhatsApp Button */
        .whatsapp-float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 20px;
            left: 20px;
            background-color: #25d366;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            font-size: 35px;
            box-shadow: 0px 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: transform 0.3s ease;
        }
        .whatsapp-float:hover {
            transform: scale(1.1);
            color: #FFF;
        }

        /* AI Chatbot Button */
        .chatbot-btn {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--clr-primary), var(--clr-secondary));
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            font-size: 28px;
            box-shadow: 0px 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
            outline: none;
        }
        .chatbot-btn:hover {
            transform: scale(1.1);
            box-shadow: 0px 6px 20px rgba(79, 70, 229, 0.4);
        }

        /* AI Chatbot Window */
        .chatbot-window {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 500px;
            max-height: calc(100vh - 120px);
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            z-index: 1001;
            transform: translateY(20px);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            border: 1px solid rgba(0,0,0,0.05);
        }
        .chatbot-window.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }
        
        .chatbot-header {
            background: linear-gradient(135deg, var(--clr-primary), var(--clr-secondary));
            padding: 16px 20px;
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .chatbot-header h3 {
            margin: 0;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .chatbot-close {
            background: none;
            border: none;
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
        }
        
        .chatbot-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: #f8fafc;
        }
        .chat-msg {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 16px;
            font-size: 14px;
            line-height: 1.5;
        }
        .chat-msg.bot {
            background: #fff;
            color: var(--clr-text-dark);
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .chat-msg.user {
            background: var(--clr-primary);
            color: #fff;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
            box-shadow: 0 2px 5px rgba(79,70,229,0.2);
        }
        
        .chatbot-input {
            padding: 16px;
            background: #fff;
            border-top: 1px solid #e2e8f0;
            display: flex;
            gap: 10px;
        }
        .chatbot-input input {
            flex: 1;
            padding: 10px 16px;
            border: 1px solid #cbd5e1;
            border-radius: 20px;
            outline: none;
            font-size: 14px;
            transition: border-color 0.2s;
        }
        .chatbot-input input:focus {
            border-color: var(--clr-primary);
        }
        .chatbot-input button {
            background: var(--clr-primary);
            color: #fff;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }
        .chatbot-input button:hover {
            background: var(--clr-secondary);
        }

        /* Mobile Adjustments for Widgets */
        @media (max-width: 768px) {
            .whatsapp-float, .chatbot-btn {
                width: 50px;
                height: 50px;
                font-size: 24px;
                bottom: 16px;
            }
            .whatsapp-float { left: 16px; }
            .chatbot-btn { right: 16px; }
            .chatbot-window {
                right: 16px;
                left: 16px;
                bottom: 80px;
                width: auto;
                height: 450px;
            }
        }
    `;
    document.head.appendChild(widgetStyles);

    // WhatsApp Button
    const waBtn = document.createElement('a');
    waBtn.href = "https://wa.me/918780628716?text=Hello!%20I%20visited%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20services.";
    waBtn.target = "_blank";
    waBtn.className = "whatsapp-float";
    waBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(waBtn);

    // AI Chatbot UI
    const chatbotBtn = document.createElement('button');
    chatbotBtn.className = "chatbot-btn";
    chatbotBtn.innerHTML = '<i class="fas fa-robot"></i>';
    document.body.appendChild(chatbotBtn);

    const chatbotWindow = document.createElement('div');
    chatbotWindow.className = "chatbot-window";
    chatbotWindow.innerHTML = `
        <div class="chatbot-header">
            <h3><i class="fas fa-robot"></i> RC Tech AI</h3>
            <button class="chatbot-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="chatbot-messages" id="chatbotMessages">
            <div class="chat-msg bot">Hi there! 👋 I'm the RC Tech Solutions AI assistant.</div>
        </div>
        <div class="chatbot-input">
            <input type="text" id="chatbotInputText" placeholder="Type your message..." autocomplete="off">
            <button id="chatbotSendBtn"><i class="fas fa-paper-plane"></i></button>
        </div>
    `;
    document.body.appendChild(chatbotWindow);

    const chatClose = chatbotWindow.querySelector('.chatbot-close');
    const chatMessages = chatbotWindow.querySelector('#chatbotMessages');
    const chatInput = chatbotWindow.querySelector('#chatbotInputText');
    const chatSendBtn = chatbotWindow.querySelector('#chatbotSendBtn');

    chatbotBtn.addEventListener('click', () => {
        chatbotWindow.classList.toggle('open');
        if(chatbotWindow.classList.contains('open')) {
            chatInput.focus();
        }
    });

    chatClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('open');
    });

    let chatState = 0; // 0 = asking name, 1 = asking contact, 2 = free chat
    let userName = "";
    let userContact = "";

    function sendChatMessage() {
        const text = chatInput.value.trim();
        if(!text) return;
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-msg user';
        userMsg.textContent = text;
        chatMessages.appendChild(userMsg);
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate AI thinking and responding
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-msg bot';
            
            if (chatState === 0) {
                userName = text;
                botMsg.textContent = `Nice to meet you, ${userName}! Could you please provide your email or phone number so our team can reach you if we get disconnected?`;
                chatState = 1;
            } else if (chatState === 1) {
                userContact = text;
                botMsg.textContent = `Thanks! I've noted down your contact info. How can I assist you with your digital needs today?`;
                chatState = 2;
            } else {
                const lowerText = text.toLowerCase();
                if(lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('quote')) {
                    botMsg.textContent = `Pricing depends on the scope of the project, ${userName}. A typical corporate website starts at $1,000, while complex apps are custom-quoted. I can arrange a free consultation call for you if you'd like!`;
                } else if(lowerText.includes('service') || lowerText.includes('build') || lowerText.includes('app')) {
                    botMsg.textContent = "We build everything from custom web apps and mobile applications to advanced AI automations. Tell me a bit about what you're trying to build!";
                } else if(lowerText.includes('contact') || lowerText.includes('phone') || lowerText.includes('email')) {
                    botMsg.textContent = "You can reach our human team directly at hello@ratantech.com or call/WhatsApp us at +91 87806 28716.";
                } else {
                    botMsg.textContent = `That's very interesting, ${userName}. I'm an AI, so I can give you a quick overview, but would you like me to have one of our senior developers email you a detailed answer?`;
                }
            }
            
            chatMessages.appendChild(botMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }

    chatSendBtn.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') sendChatMessage();
    });

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
});
