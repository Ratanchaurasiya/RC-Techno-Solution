import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_about_section = """<section class="section" id="about">
<div class="container">
    <div class="section-header reveal reveal-zoom">
        <h2 class="section-title">About Us</h2>
        <p class="section-subtitle">Innovating the Digital Future</p>
    </div>
    
    <div class="bento-grid reveal delay-1">
        <!-- Main Bio Box -->
        <div class="bento-card bento-main">
            <h3 class="bento-title">Who We Are</h3>
            <p><strong>RatanTech Solutions</strong> is an elite IT agency dedicated to delivering robust digital solutions. We specialize in creating high-performance web applications, AI integrations, data analytics dashboards, and enterprise systems.</p>
            <div class="tech-badges">
                <span class="badge badge-react"><i class="fab fa-react"></i> React</span>
                <span class="badge badge-node"><i class="fab fa-node-js"></i> Node.js</span>
                <span class="badge badge-python"><i class="fab fa-python"></i> Python</span>
                <span class="badge badge-aws"><i class="fab fa-aws"></i> AWS</span>
                <span class="badge badge-docker"><i class="fab fa-docker"></i> Docker</span>
            </div>
        </div>
        
        <!-- Terminal Window Box -->
        <div class="bento-card bento-terminal">
            <div class="terminal-header">
                <div class="term-btn term-close"></div>
                <div class="term-btn term-min"></div>
                <div class="term-btn term-max"></div>
                <span class="term-title">ratantech ~ bash</span>
            </div>
            <div class="terminal-body">
                <p><span class="term-prompt">ratan@macbook:~$</span> npm run build --fullstack</p>
                <p class="term-output typing-anim-1">> Compiling modern web applications...</p>
                <p class="term-output typing-anim-2">> Deploying to scalable cloud infrastructure...</p>
                <p class="term-output typing-anim-3">> System optimized. Security checks passed.</p>
                <p class="term-prompt-line typing-anim-4"><span class="term-prompt">ratan@macbook:~$</span> <span class="cursor-blink">_</span></p>
            </div>
        </div>

        <!-- Mission Box -->
        <div class="bento-card bento-mission">
            <i class="fas fa-bullseye bento-icon"></i>
            <h4>Our Mission</h4>
            <p>Empower businesses with innovative, high-performance technology solutions.</p>
        </div>

        <!-- Vision Box -->
        <div class="bento-card bento-vision">
            <i class="fas fa-eye bento-icon"></i>
            <h4>Our Vision</h4>
            <p>To be the trusted global leader in driving digital transformation.</p>
        </div>
    </div>
</div>
</section>"""

services_list = [
    ("Website Development", "fa-laptop-code", "Custom, responsive websites built with modern technologies."),
    ("Web App Development", "fa-window-restore", "Scalable web apps tailored to your business logic."),
    ("E-Commerce Platforms", "fa-shopping-cart", "Secure online stores optimized for high-volume sales."),
    ("AI Applications", "fa-robot", "Smart integrations utilizing machine learning and AI."),
    ("Data Analytics", "fa-chart-bar", "Real-time insights and complex visualizations."),
    ("Database Design", "fa-database", "Optimized, secure, and highly robust architectures."),
    ("API Integration", "fa-network-wired", "Seamless REST/GraphQL connectivity between systems."),
    ("Cloud Deployment", "fa-cloud", "Scalable hosting on AWS, GCP, and Azure infrastructures."),
    ("Security & Auditing", "fa-shield-alt", "Advanced penetration testing and DDOS protection."),
    ("Performance Tuning", "fa-bolt", "Lightning-fast load times for superior Core Web Vitals."),
    ("DevOps & Support", "fa-tools", "CI/CD pipelines, ongoing updates and monitoring."),
    ("UI/UX Engineering", "fa-mobile-alt", "Interactive, user-centric interfaces utilizing WebGL.")
]

services_html = ""
for i, (title, icon, desc) in enumerate(services_list):
    delay = f"delay-{(i % 3) + 1}"
    services_html += f"""
    <div class="bento-service-card reveal {delay}">
        <div class="service-glow-blob"></div>
        <div class="bento-service-content">
            <div class="bento-service-icon"><i class="fas {icon}"></i></div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    </div>
    """

new_services_section = f"""<section class="section section-dark" id="services">
<div class="container">
    <div class="section-header reveal">
        <h2 class="section-title text-glow">Our Expertise</h2>
        <p class="section-subtitle subtitle-dark">Fullstack Solutions</p>
    </div>
    <div class="bento-services-grid">
        {services_html}
    </div>
</div>
</section>"""

# Replace about section
html = re.sub(r'<section class="section" id="about">.*?</section>', new_about_section, html, flags=re.DOTALL)

# Replace services section
html = re.sub(r'<section class="section bg-light" id="services">.*?</section>', new_services_section, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Pro Bento Box layout injected into HTML.")
