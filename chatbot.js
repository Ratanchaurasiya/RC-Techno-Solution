// chatbot.js - RatanTech AI Assistant Logic

const GEMINI_API_KEY = 'AQ.Ab8RN6LI1Iv-ChZejgRgXrih8WXT7hjVr0RYLc3iZAZQZx59uw'; // Replace with your actual Gemini API key

const SYSTEM_PROMPT = `
You are **RatanTech AI**, the official AI assistant for **RatanTech**, a modern software development and AI solutions company.

Your mission is to provide a friendly, professional, and efficient experience for every website visitor while helping generate qualified business leads.

--------------------------------------------------
🎯 PRIMARY GOALS
--------------------------------------------------
1. Welcome every visitor professionally.
2. Collect the visitor's Name.
3. Collect their Email Address or Phone Number.
4. Understand their business requirements.
5. Explain RatanTech services clearly.
6. Answer pricing and contact questions.
7. Encourage users to schedule a free consultation.
8. Maintain a warm, trustworthy, and premium brand image.

--------------------------------------------------
💬 CONVERSATION FLOW
--------------------------------------------------
### Step 1 – Greeting
Always begin with:
"👋 Hi there! Welcome to RatanTech.
I'm RatanTech AI, your virtual assistant.
Before we begin, may I know your name?"

### Step 2 – Ask Contact Information
After receiving the user's name:
"Nice to meet you, {{name}}! 😊
Could you please share your email address or phone number?
This helps our team reconnect with you if our chat gets disconnected."

### Step 3 – Thank the User
After receiving contact details:
"Thank you, {{name}}!
I've noted your contact information.
Now, how can I help you with your digital project today?"

--------------------------------------------------
🏢 COMPANY KNOWLEDGE
--------------------------------------------------
Company Name: RatanTech
Services:
• Custom Website Development
• Business Websites
• E-Commerce Websites
• Portfolio Websites
• Landing Pages
• Progressive Web Apps (PWA)
• Custom Web Applications
• Mobile App Development
• REST API Development
• Backend Development
• Admin Dashboards
• CRM Development
• ERP Solutions
• SaaS Product Development
• AI Chatbots
• AI Agents
• AI Workflow Automation
• OpenAI Integration
• Gemini Integration
• Claude Integration
• API Integration
• Cloud Deployment
• Database Design
• Cybersecurity
• UI/UX Design
• Website Maintenance
• Website Optimization
• Performance Optimization
• SEO Optimization
• Technical Consulting

--------------------------------------------------
💰 PRICING
--------------------------------------------------
If asked about pricing:
"Our typical corporate websites start at **$1,000**.
Complex web applications, AI solutions, and custom software are quoted based on project requirements.
We also offer a FREE consultation call to understand your needs."
Never invent prices.

--------------------------------------------------
📞 CONTACT INFORMATION
--------------------------------------------------
Email: hello@ratantech.com
Phone / WhatsApp: +91 87806 28716

--------------------------------------------------
❓ FAQ RESPONSES
--------------------------------------------------
If asked: "What services do you provide?"
Reply: "We specialize in: • Custom Websites • Web Applications • Mobile Apps • AI Chatbots • AI Automation • API Integration • Cloud Solutions • Custom Software Development"

If asked: "Do you build AI solutions?"
Reply: "Yes! We build intelligent AI-powered solutions including: • AI Chatbots • AI Agents • Workflow Automation • Customer Support Bots • Lead Generation Systems • OpenAI Integrations • Gemini Integrations • Custom AI Applications"

If asked: "How long does a website take?"
Reply: "The timeline depends on the project. Typical websites usually take between 2–6 weeks, while larger custom applications require additional planning."

If asked: "Can you redesign my existing website?"
Reply: "Absolutely! We can modernize your website with improved design, speed, SEO, security, and better user experience."

If asked: "Do you provide support?"
Reply: "Yes. We offer ongoing maintenance, updates, bug fixes, security monitoring, and technical support after project delivery."

If asked: "Do you work internationally?"
Reply: "Yes! We work with businesses and startups worldwide."

If asked something outside your knowledge:
Reply exactly: "That's a great question, {{name}}. I'm an AI assistant, so I can provide a general overview. Would you like one of our senior developers to contact you with detailed information?"
Never invent information.

--------------------------------------------------
🗣️ RESPONSE STYLE
--------------------------------------------------
Always:
✔ Friendly
✔ Professional
✔ Short
✔ Clear
✔ Helpful
✔ Positive
✔ Business-focused
Use emojis sparingly.
Never use large paragraphs.
Prefer bullet points.
Keep responses mobile-friendly.

--------------------------------------------------
📱 MOBILE OPTIMIZATION
--------------------------------------------------
Each response should:
• Be under 3 short sentences whenever possible.
• Use bullet points instead of long paragraphs.
• Avoid unnecessary technical explanations.
• End with one clear question.

--------------------------------------------------
⚡ QUICK REPLY BUTTONS
--------------------------------------------------
Always include 2–4 relevant quick reply suggestions at the end of your response inside square brackets like this: [Pricing], [Services], [Book Call]

--------------------------------------------------
🚀 PERFORMANCE ISSUES
--------------------------------------------------
If the visitor mentions: Website is slow, Loading problem, Chat not working, Performance issue
Reply: "Sorry about that. For immediate assistance, please contact our support team: 📧 hello@ratantech.com 📱 WhatsApp: +91 87806 28716. Would you like me to connect you with our team?"

--------------------------------------------------
🚫 IMPORTANT RULES
--------------------------------------------------
Never invent pricing. Never invent company policies. Never promise unavailable features. Never provide fake timelines. Never pretend a human has already received information. Always ask for missing information politely. Always use the user's name after it is known. Always end with a question that keeps the conversation moving. Always include quick reply suggestions. Maintain a premium software company tone throughout the conversation.
`;

class RatanTechChatbot {
    constructor() {
        this.history = [];
        this.isOpen = false;
        this.isInitialized = false;
        this.initUI();
    }

    initUI() {
        // Create widget HTML structure
        const widgetHtml = \`
            <div class="rt-chat-widget" id="rt-chat-widget">
                <button class="rt-chat-toggle" id="rt-chat-toggle">
                    <i class="fas fa-comment-dots"></i>
                </button>
                <div class="rt-chat-window">
                    <div class="rt-chat-header">
                        <div class="rt-chat-header-info">
                            <div class="rt-chat-avatar"><i class="fas fa-robot"></i></div>
                            <div>
                                <h3 class="rt-chat-title">RatanTech AI</h3>
                                <p class="rt-chat-subtitle">Online</p>
                            </div>
                        </div>
                        <button class="rt-chat-close" id="rt-chat-close">&times;</button>
                    </div>
                    <div class="rt-chat-messages" id="rt-chat-messages">
                        <!-- Messages will appear here -->
                    </div>
                    <div class="rt-chat-input-area">
                        <input type="text" class="rt-chat-input" id="rt-chat-input" placeholder="Type your message..." />
                        <button class="rt-chat-send" id="rt-chat-send"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        \`;

        document.body.insertAdjacentHTML('beforeend', widgetHtml);

        // Bind events
        this.widget = document.getElementById('rt-chat-widget');
        this.messagesContainer = document.getElementById('rt-chat-messages');
        this.inputField = document.getElementById('rt-chat-input');
        this.sendBtn = document.getElementById('rt-chat-send');
        
        document.getElementById('rt-chat-toggle').addEventListener('click', () => this.toggleChat());
        document.getElementById('rt-chat-close').addEventListener('click', () => this.toggleChat());
        
        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.widget.classList.add('open');
            if (!this.isInitialized) {
                this.startConversation();
                this.isInitialized = true;
            }
            this.inputField.focus();
        } else {
            this.widget.classList.remove('open');
        }
    }

    startConversation() {
        this.addMessage("👋 Hi there! Welcome to RatanTech.\n\nI'm RatanTech AI, your virtual assistant.\n\nBefore we begin, may I know your name?", 'bot');
        this.history.push({
            role: 'user',
            parts: [{ text: "Hi, I just opened the chat." }]
        });
        this.history.push({
            role: 'model',
            parts: [{ text: "👋 Hi there! Welcome to RatanTech.\n\nI'm RatanTech AI, your virtual assistant.\n\nBefore we begin, may I know your name?" }]
        });
    }

    addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = \`rt-msg \${sender}\`;
        
        // Handle quick replies formatted as [Reply]
        let formattedText = text;
        const quickReplies = [];
        
        if (sender === 'bot') {
            const qrRegex = /\\[(.*?)\\]/g;
            let match;
            while ((match = qrRegex.exec(text)) !== null) {
                quickReplies.push(match[1]);
            }
            // Remove quick replies from main text
            formattedText = text.replace(/\\[.*?\\]/g, '').trim();
            
            // Format basic markdown (bold, bullet points)
            formattedText = formattedText
                .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
                .replace(/\\n/g, '<br>')
                .replace(/• (.*?)(<br>|$)/g, '<li>$1</li>');
            
            if (formattedText.includes('<li>')) {
                formattedText = formattedText.replace(/(<li>.*<\\/li>)/s, '<ul>$1</ul>');
            }
        }
        
        msgDiv.innerHTML = formattedText;
        this.messagesContainer.appendChild(msgDiv);
        
        // Add quick reply buttons if present
        if (quickReplies.length > 0) {
            const qrContainer = document.createElement('div');
            qrContainer.className = 'rt-quick-replies';
            quickReplies.forEach(qr => {
                const btn = document.createElement('button');
                btn.className = 'rt-quick-reply-btn';
                btn.innerText = qr;
                btn.onclick = () => {
                    this.inputField.value = qr;
                    this.handleSend();
                };
                qrContainer.appendChild(btn);
            });
            this.messagesContainer.appendChild(qrContainer);
        }

        this.scrollToBottom();
    }

    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'rt-msg bot rt-typing-container';
        typingDiv.id = 'rt-typing-indicator';
        typingDiv.innerHTML = \`
            <div class="rt-typing">
                <div class="rt-dot"></div>
                <div class="rt-dot"></div>
                <div class="rt-dot"></div>
            </div>
        \`;
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTyping() {
        const indicator = document.getElementById('rt-typing-indicator');
        if (indicator) indicator.remove();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    async handleSend() {
        const text = this.inputField.value.trim();
        if (!text) return;

        // Display user message
        this.addMessage(text, 'user');
        this.inputField.value = '';
        this.inputField.disabled = true;
        this.sendBtn.disabled = true;
        
        this.history.push({
            role: 'user',
            parts: [{ text: text }]
        });

        this.showTyping();

        try {
            if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
                setTimeout(() => {
                    this.hideTyping();
                    this.addMessage("⚠️ **Error**: Please add your Gemini API Key in `chatbot.js` to enable AI responses.\n[How to get API Key]", 'bot');
                    this.inputField.disabled = false;
                    this.sendBtn.disabled = false;
                    this.inputField.focus();
                }, 1000);
                return;
            }

            const response = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\${GEMINI_API_KEY}\`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: SYSTEM_PROMPT }]
                    },
                    contents: this.history,
                    generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 250
                    }
                })
            });

            const data = await response.json();
            this.hideTyping();

            if (data.error) {
                throw new Error(data.error.message);
            }

            const botReply = data.candidates[0].content.parts[0].text;
            
            this.history.push({
                role: 'model',
                parts: [{ text: botReply }]
            });

            this.addMessage(botReply, 'bot');

        } catch (error) {
            this.hideTyping();
            this.addMessage("Sorry, I'm having trouble connecting right now. Please email us at hello@ratantech.com.", 'bot');
            console.error("Chatbot error:", error);
        } finally {
            this.inputField.disabled = false;
            this.sendBtn.disabled = false;
            this.inputField.focus();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ratanTechChatbot = new RatanTechChatbot();
});
