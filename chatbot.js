// ==========================================================================
// RC TECHNO SOLUTION - OFFICIAL AI ASSISTANT (RC Techno AI)
// Intelligent, fast, multi-turn assistant with built-in knowledge base,
// Speech Synthesis (Voice Readout) & Speech Recognition (Voice Input).
// ==========================================================================

const RC_GEMINI_API_KEY = ''; // Optional: insert valid Gemini key if desired

const RC_COMPANY_KNOWLEDGE = {
    name: "RC Techno Solution",
    email: "hello@rctechsolutions.com",
    phone: "+91 87806 28716",
    whatsapp: "https://wa.me/918780628716",
    address: "Vastral, Ahmedabad, Gujarat, India",
    services: [
        "Custom Website Development (React, Next.js, responsive, SEO-ready)",
        "Scalable Web Applications & SaaS Platforms (Node.js, Python, PostgreSQL)",
        "E-Commerce & High-Conversion Storefronts (Stripe, Razorpay, Shopify)",
        "AI Chatbots, LLM Agents & Workflow Automation (Gemini, OpenAI, LangChain)",
        "REST & GraphQL API Integration & Microservices",
        "Cloud Infrastructure & DevOps CI/CD (AWS, GCP, Docker, Kubernetes)",
        "Database Architecture & Optimization (PostgreSQL, MongoDB, Redis)",
        "UI/UX Design Systems & WebGL 3D Interactive Experiences"
    ],
    pricing: "Our corporate websites typically start from $1,000 (approx. ₹45,000), while custom web applications, SaaS platforms, and AI automations are scoped based on your specific requirements. We offer free consultation calls to deliver a tailored proposal.",
    timelines: "Standard websites take 2–4 weeks; full-stack web applications and SaaS platforms typically take 4–8 weeks."
};

class RCTechChatbot {
    constructor() {
        this.history = [];
        this.isOpen = false;
        this.isInitialized = false;
        this.userName = '';
        this.userContact = '';
        this.chatStep = 0; // 0: greeting, 1: asking contact, 2: open inquiry
        this.isVoiceMuted = true;
        this.isListening = false;
        this.recognition = null;
        this.initSpeechRecognition();
        this.initUI();
    }

    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.isListening = true;
                if (this.micBtn) {
                    this.micBtn.classList.add('listening');
                    this.micBtn.innerHTML = '<i class="fas fa-waveform-lines fa-fade"></i>';
                }
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (transcript && this.inputField) {
                    this.inputField.value = transcript;
                    this.handleSend();
                }
            };

            this.recognition.onerror = () => {
                this.stopListening();
            };

            this.recognition.onend = () => {
                this.stopListening();
            };
        }
    }

    stopListening() {
        this.isListening = false;
        if (this.micBtn) {
            this.micBtn.classList.remove('listening');
            this.micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        }
    }

    toggleListening() {
        if (!this.recognition) {
            window.showRCToast?.("Voice input is not supported in this browser. Please use Chrome, Edge, or Safari.");
            return;
        }
        if (this.isListening) {
            this.recognition.stop();
        } else {
            try {
                this.recognition.start();
            } catch (err) {
                console.warn("Speech recognition error:", err);
            }
        }
    }

    speak(text) {
        if (this.isVoiceMuted || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); // Cancel any ongoing speech

        // Strip markdown and emojis for clean speech
        const cleanText = text
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/•/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
            .trim();

        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        
        // Prefer natural voices if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.lang.startsWith('en')) && v.lang.includes('US'));
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    }

    initUI() {
        // Prevent duplicate instances
        if (document.getElementById('rc-chat-widget')) return;

        const widgetHtml = `
            <div class="rc-chat-widget" id="rc-chat-widget">
                <button class="rc-chat-toggle" id="rc-chat-toggle" aria-label="Open AI Assistant">
                    <i class="fas fa-robot"></i>
                    <span class="rc-chat-ping"></span>
                </button>
                <div class="rc-chat-window" id="rc-chat-window">
                    <div class="rc-chat-header">
                        <div class="rc-chat-header-info">
                            <div class="rc-chat-avatar"><i class="fas fa-brain"></i></div>
                            <div>
                                <h3 class="rc-chat-title">RC Techno AI</h3>
                                <p class="rc-chat-subtitle"><span class="rc-status-dot"></span> Online &bull; Ready to help</p>
                            </div>
                        </div>
                        <div class="rc-chat-header-actions">
                            <button class="rc-chat-voice-toggle muted" id="rc-chat-voice-toggle" aria-label="Toggle Voice Readout" title="Toggle AI Voice Readout">
                                <i class="fas fa-volume-mute"></i>
                            </button>
                            <button class="rc-chat-close" id="rc-chat-close" aria-label="Close Chat">&times;</button>
                        </div>
                    </div>
                    <div class="rc-chat-messages" id="rc-chat-messages">
                        <!-- Messages dynamically rendered -->
                    </div>
                    <div class="rc-chat-quick-replies" id="rc-quick-replies">
                        <button class="rc-qr-btn" data-query="What services do you offer?">Services</button>
                        <button class="rc-qr-btn" data-query="How much does a project cost?">Pricing</button>
                        <button class="rc-qr-btn" data-query="How long does development take?">Timeline</button>
                        <button class="rc-qr-btn" data-query="How do I get a quote?">Get Quote</button>
                    </div>
                    <div class="rc-chat-input-area">
                        <input type="text" class="rc-chat-input" id="rc-chat-input" placeholder="Ask about services, pricing, tech stack..." autocomplete="off" />
                        <button class="rc-chat-mic-btn" id="rc-chat-mic-btn" aria-label="Voice Input" title="Speak question" type="button">
                            <i class="fas fa-microphone"></i>
                        </button>
                        <button class="rc-chat-send" id="rc-chat-send" aria-label="Send Message"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', widgetHtml);

        // Bind DOM elements
        this.widget = document.getElementById('rc-chat-widget');
        this.window = document.getElementById('rc-chat-window');
        this.messagesContainer = document.getElementById('rc-chat-messages');
        this.inputField = document.getElementById('rc-chat-input');
        this.sendBtn = document.getElementById('rc-chat-send');
        this.micBtn = document.getElementById('rc-chat-mic-btn');
        this.voiceToggleBtn = document.getElementById('rc-chat-voice-toggle');
        this.toggleBtn = document.getElementById('rc-chat-toggle');
        this.closeBtn = document.getElementById('rc-chat-close');
        this.quickRepliesContainer = document.getElementById('rc-quick-replies');

        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.handleSend());
        if (this.micBtn) {
            this.micBtn.addEventListener('click', () => this.toggleListening());
        }
        if (this.voiceToggleBtn) {
            this.voiceToggleBtn.addEventListener('click', () => {
                this.isVoiceMuted = !this.isVoiceMuted;
                if (this.isVoiceMuted) {
                    window.speechSynthesis?.cancel();
                    this.voiceToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    this.voiceToggleBtn.classList.add('muted');
                    window.showRCToast?.("AI Voice Readout muted");
                } else {
                    this.voiceToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                    this.voiceToggleBtn.classList.remove('muted');
                    window.showRCToast?.("AI Voice Readout enabled");
                }
            });
        }
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });

        // Quick reply listeners
        this.quickRepliesContainer.querySelectorAll('.rc-qr-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.getAttribute('data-query');
                this.inputField.value = query;
                this.handleSend();
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.window.classList.add('open');
            this.toggleBtn.classList.add('active');
            if (!this.isInitialized) {
                this.startConversation();
                this.isInitialized = true;
            }
            setTimeout(() => this.inputField.focus(), 250);
        } else {
            this.window.classList.remove('open');
            this.toggleBtn.classList.remove('active');
            window.speechSynthesis?.cancel();
        }
    }

    startConversation() {
        const welcome = "👋 Hello and welcome to **RC Techno Solution**!\n\nI am **RC Techno AI**, your software architect assistant. I can answer questions about our services, estimates, tech stack, and connect you with our engineering pod.\n\nTo get started, may I have your name?";
        this.addMessage(welcome, 'bot');
        this.speak("Hello and welcome to RC Techno Solution! I am your AI project consultant. To get started, may I have your name?");
    }

    addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `rc-msg ${sender}`;

        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>')
            .replace(/• (.*?)(<br>|$)/g, '<li>$1</li>');

        if (formattedText.includes('<li>')) {
            formattedText = formattedText.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        }

        msgDiv.innerHTML = formattedText;
        this.messagesContainer.appendChild(msgDiv);
        this.scrollToBottom();
    }

    showTyping() {
        this.hideTyping();
        const typingDiv = document.createElement('div');
        typingDiv.className = 'rc-msg bot rc-typing';
        typingDiv.id = 'rc-typing-indicator';
        typingDiv.innerHTML = `
            <span class="rc-dot"></span>
            <span class="rc-dot"></span>
            <span class="rc-dot"></span>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTyping() {
        const indicator = document.getElementById('rc-typing-indicator');
        if (indicator) indicator.remove();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    async handleSend() {
        const text = this.inputField.value.trim();
        if (!text) return;

        // Display user query
        this.addMessage(text, 'user');
        this.inputField.value = '';
        this.inputField.disabled = true;
        this.sendBtn.disabled = true;

        this.showTyping();

        // Simulate intelligent response delay
        setTimeout(async () => {
            const reply = await this.generateResponse(text);
            this.hideTyping();
            this.addMessage(reply, 'bot');
            this.speak(reply);
            this.inputField.disabled = false;
            this.sendBtn.disabled = false;
            this.inputField.focus();
        }, 550);
    }

    async generateResponse(userText) {
        const lower = userText.toLowerCase();

        // Conversation Step Management
        if (this.chatStep === 0) {
            this.userName = userText.trim();
            this.chatStep = 1;
            return `Pleased to meet you, **${this.userName}**! 😊\n\nCould you please share your **email address** or **phone number**? This ensures our senior tech team can follow up with your project specifications.`;
        }

        if (this.chatStep === 1) {
            this.userContact = userText.trim();
            this.chatStep = 2;
            return `Thank you, **${this.userName}**! I've saved your contact info.\n\nNow, how can RC Techno Solution help elevate your business today? Are you looking for a **new web app**, **e-commerce store**, **AI integration**, or **cloud deployment**?`;
        }

        // Knowledge Base Matching
        if (lower.includes('service') || lower.includes('what do you do') || lower.includes('offer')) {
            return `Here are the primary services we provide at **RC Techno Solution**:\n\n• **Modern Website Development**: High-performance, SEO-optimized business sites.\n• **SaaS & Web App Development**: Scalable full-stack apps built with React, Node.js & Python.\n• **E-Commerce Solutions**: Secure payment gateways, Shopify, and custom stores.\n• **AI Agents & Integrations**: Custom chatbots, workflow automations, and LLM integrations.\n• **Cloud Deployment & DevOps**: AWS, GCP, Docker, Kubernetes & CI/CD pipelines.\n\nWould you like a quote or details on a specific service?`;
        }

        if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('charge') || lower.includes('budget')) {
            return `💰 **Investment & Pricing Guide**:\n\n• **Corporate & Business Websites**: Starting at **$1,000** (~₹45,000).\n• **Custom Web Applications & SaaS**: Typically ranges between **$2,500 - $8,000** depending on user roles, APIs, and complexity.\n• **AI Integrations & Chatbots**: Starting at **$800**.\n\nYou can also check out our interactive **Project Cost Estimator** on this page for a live custom quote!`;
        }

        if (lower.includes('time') || lower.includes('how long') || lower.includes('duration') || lower.includes('weeks')) {
            return `⏱️ **Delivery Timelines**:\n\n• Standard Websites: **2–4 weeks**\n• Full-Stack Web Applications: **4–8 weeks**\n• MVP / Rapid Prototypes: **2–3 weeks**\n\nWe provide weekly sprint updates and a dedicated staging server so you can review real-time progress.`;
        }

        if (lower.includes('contact') || lower.includes('whatsapp') || lower.includes('call') || lower.includes('email') || lower.includes('reach')) {
            return `📞 **Direct Contact Information**:\n\n• **WhatsApp / Phone**: [+91 87806 28716](https://wa.me/918780628716)\n• **Email**: [hello@rctechsolutions.com](mailto:hello@rctechsolutions.com)\n• **Office**: Vastral, Ahmedabad, Gujarat, India\n\nFeel free to ping us on WhatsApp anytime for an instant response!`;
        }

        if (lower.includes('tech') || lower.includes('stack') || lower.includes('react') || lower.includes('python')) {
            return `💻 **Our Engineering Tech Stack**:\n\n• **Frontend**: React.js, Next.js, TypeScript, TailwindCSS, Three.js (WebGL)\n• **Backend**: Node.js, Express, Python (FastAPI/Django), REST, GraphQL\n• **Databases**: PostgreSQL, MongoDB, Redis, Supabase\n• **Cloud & DevOps**: AWS, GCP, Docker, Kubernetes, GitHub Actions, Vercel`;
        }

        if (lower.includes('hire') || lower.includes('start') || lower.includes('quote') || lower.includes('consultation')) {
            return `🚀 **Let's kick off your project!**\n\nYou can fill out our **Contact Form** below with your requirements, or chat directly with our tech lead on WhatsApp at **+91 87806 28716**. We reply within 2 business hours!`;
        }

        // Optional Gemini API Call if Key is provided
        if (RC_GEMINI_API_KEY && RC_GEMINI_API_KEY.length > 20) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${RC_GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            role: 'user',
                            parts: [{ text: `You are RC Techno AI, representative for RC Techno Solution. Company info: ${JSON.stringify(RC_COMPANY_KNOWLEDGE)}. User query: ${userText}` }]
                        }]
                    })
                });
                const data = await response.json();
                if (data.candidates && data.candidates[0].content.parts[0].text) {
                    return data.candidates[0].content.parts[0].text;
                }
            } catch (err) {
                console.warn("AI fallback active:", err);
            }
        }

        // Intelligent Default
        const nameGreeting = this.userName ? `, ${this.userName}` : '';
        return `That's a great question${nameGreeting}! At **RC Techno Solution**, our senior engineers specialize in custom digital development. Would you like us to schedule a quick 15-minute discovery call, or would you prefer a direct quote sent to your email?`;
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.rcTechChatbot = new RCTechChatbot();
});
