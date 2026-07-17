import os

template = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>{title} | RC Tech Solutions</title>
<!-- Google Fonts: Poppins -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<!-- FontAwesome for Icons -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"/>
<!-- Custom CSS -->
<link href="style.css" rel="stylesheet"/>
<link href="service-detail.css" rel="stylesheet"/>
</head>
<body>
<div id="preloader">
    <div class="loader-circle"></div>
</div>

<header id="header">
    <div class="container nav-container">
        <a class="logo" href="index.html">
            <span class="ratan">RC</span>
            <span class="tech">Tech</span>
            <span class="solutions">Solutions</span>
        </a>
        <nav class="nav-menu">
            <ul class="nav-list">
                <li><a class="nav-link" href="index.html">Home</a></li>
                <li><a class="nav-link" href="about.html">About</a></li>
                <li><a class="nav-link active" href="services.html">Services</a></li>
                <li><a class="nav-link" href="portfolio.html">Portfolio</a></li>
                <li><a class="nav-link" href="contact.html">Contact</a></li>
            </ul>
            <a class="btn btn-nav" href="contact.html">Get a Quote</a>
        </nav>
        <div class="hamburger">
            <i class="fas fa-bars"></i>
        </div>
    </div>
</header>

<section class="service-hero">
    <i class="fas fa-code float-icon"></i>
    <i class="fas fa-rocket float-icon"></i>
    <i class="fas fa-laptop-code float-icon"></i>
    <div class="container service-hero-content reveal">
        <h1>{title}</h1>
        <p>{short_desc}</p>
        <a href="#overview" class="btn btn-primary pulse-anim">Explore Service</a>
    </div>
</section>

<section class="service-section" id="overview">
    <div class="container">
        <div class="overview-content reveal reveal-zoom">
            <div class="overview-text">
                <h2 class="service-section-title" style="text-align: left; transform: none; left: 0;">Service <span>Overview</span></h2>
                <p>{overview}</p>
                <p>Partner with RC Tech Solutions to leverage cutting-edge tools and methodologies that ensure your digital product is robust, scalable, and tailored to your exact business needs.</p>
            </div>
            <div class="overview-image">
                <img src="https://placehold.co/600x400/1e293b/38bdf8?text={title_encoded}" alt="{title} Overview" style="width:100%;">
            </div>
        </div>
    </div>
</section>

<section class="service-section bg-light" id="features">
    <div class="container">
        <h2 class="service-section-title reveal">Key <span>Features</span></h2>
        <div class="features-grid reveal delay-1">
            {features_html}
        </div>
    </div>
</section>

<section class="tech-stack-container" id="tech">
    <div class="container">
        <h2 class="service-section-title reveal">Technologies <span>Used</span></h2>
        <div class="tech-grid reveal delay-1">
            {tech_html}
        </div>
    </div>
</section>

<section class="service-section" id="process">
    <div class="container">
        <h2 class="service-section-title reveal">Development <span>Process</span></h2>
        <div class="process-timeline reveal delay-1">
            <div class="process-step">
                <div class="step-number">1</div>
                <div class="process-content">
                    <h3>Discovery & Planning</h3>
                    <p>We analyze your requirements, target audience, and business goals to outline a clear project roadmap.</p>
                </div>
            </div>
            <div class="process-step">
                <div class="step-number">2</div>
                <div class="process-content">
                    <h3>Design & Prototyping</h3>
                    <p>Creating intuitive UI/UX designs and interactive prototypes for your feedback and approval.</p>
                </div>
            </div>
            <div class="process-step">
                <div class="step-number">3</div>
                <div class="process-content">
                    <h3>Development</h3>
                    <p>Writing clean, efficient, and scalable code utilizing the latest technologies and best practices.</p>
                </div>
            </div>
            <div class="process-step">
                <div class="step-number">4</div>
                <div class="process-content">
                    <h3>Testing & QA</h3>
                    <p>Rigorous testing across multiple devices and platforms to ensure a bug-free, seamless experience.</p>
                </div>
            </div>
            <div class="process-step">
                <div class="step-number">5</div>
                <div class="process-content">
                    <h3>Deployment & Support</h3>
                    <p>Launching the project successfully and providing ongoing maintenance and optimization.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="service-section bg-light" id="pricing">
    <div class="container">
        <h2 class="service-section-title reveal">Flexible <span>Pricing</span></h2>
        <div class="pricing-grid reveal delay-1">
            <div class="pricing-card">
                <h3 class="plan-name">Basic</h3>
                <div class="plan-price">$999<span>/project</span></div>
                <ul class="plan-features">
                    <li><i class="fas fa-check"></i> Standard Features</li>
                    <li><i class="fas fa-check"></i> 1 Month Support</li>
                    <li><i class="fas fa-check"></i> Basic SEO Setup</li>
                </ul>
                <a href="contact.html" class="btn btn-secondary">Get Started</a>
            </div>
            <div class="pricing-card popular">
                <h3 class="plan-name">Professional</h3>
                <div class="plan-price">$2,499<span>/project</span></div>
                <ul class="plan-features">
                    <li><i class="fas fa-check"></i> Advanced Features</li>
                    <li><i class="fas fa-check"></i> Custom Integrations</li>
                    <li><i class="fas fa-check"></i> 3 Months Support</li>
                    <li><i class="fas fa-check"></i> Advanced SEO</li>
                </ul>
                <a href="contact.html" class="btn btn-primary">Get Started</a>
            </div>
            <div class="pricing-card">
                <h3 class="plan-name">Enterprise</h3>
                <div class="plan-price">Custom</div>
                <ul class="plan-features">
                    <li><i class="fas fa-check"></i> Full Customization</li>
                    <li><i class="fas fa-check"></i> Dedicated Team</li>
                    <li><i class="fas fa-check"></i> 24/7 Priority Support</li>
                    <li><i class="fas fa-check"></i> Scalable Infrastructure</li>
                </ul>
                <a href="contact.html" class="btn btn-secondary">Contact Us</a>
            </div>
        </div>
    </div>
</section>

<section class="service-section" id="faq">
    <div class="container">
        <h2 class="service-section-title reveal">Frequently Asked <span>Questions</span></h2>
        <div class="faq-container reveal delay-1">
            <div class="faq-item">
                <div class="faq-question">
                    <h3>What is included in the {title} service?</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>Our {title} service includes everything from initial planning and architecture to full deployment and post-launch support. We tailor our deliverables to meet your exact specifications and business goals.</p>
                </div>
            </div>
            <div class="faq-item">
                <div class="faq-question">
                    <h3>How long does the project usually take?</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>The timeline varies depending on the complexity of your requirements. Typically, standard projects take 4-6 weeks, while more complex enterprise solutions may take 3-6 months.</p>
                </div>
            </div>
            <div class="faq-item">
                <div class="faq-question">
                    <h3>Do you provide ongoing support after launch?</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>Yes, absolutely. We offer various maintenance packages to ensure your digital product remains secure, updated, and optimized long after the initial launch.</p>
                </div>
            </div>
            <div class="faq-item">
                <div class="faq-question">
                    <h3>Can we upgrade our plan later?</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>Yes, our solutions are built to be highly scalable. You can start with our Basic or Professional plans and upgrade to Enterprise whenever your business needs demand it.</p>
                </div>
            </div>
        </div>
        
        <div class="cta-section reveal reveal-zoom" style="margin-top: 80px;">
            <h2>Ready to Start Your Next Project?</h2>
            <p>Let's discuss how our {title} services can accelerate your business growth and digital transformation.</p>
            <a href="contact.html" class="btn btn-white pulse-anim">Get a Free Quote</a>
        </div>
    </div>
</section>

<footer class="footer">
    <div class="container footer-grid">
        <div class="footer-col brand-col">
            <a class="footer-logo" href="index.html">
                <span class="ratan">RC</span>
                <span class="tech">Tech</span>
            </a>
            <p>Building modern, scalable, and secure digital solutions for tomorrow's businesses.</p>
        </div>
        <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="portfolio.html">Portfolio</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2024 RC Tech Solutions. All Rights Reserved.</p>
    </div>
</footer>

<script src="script.js"></script>
</body>
</html>
"""

services = [
    {
        "id": "website-development",
        "title": "Website Development",
        "short_desc": "Custom, responsive websites built with modern technologies to elevate your brand.",
        "overview": "Our website development service focuses on creating stunning, fast, and SEO-friendly websites. We ensure your online presence perfectly encapsulates your brand identity while providing an intuitive user experience across all devices.",
        "features": [
            {"title": "Responsive Design", "icon": "fa-mobile-alt", "desc": "Flawless rendering on mobile, tablet, and desktop devices."},
            {"title": "SEO Optimized", "icon": "fa-search", "desc": "Built with technical SEO best practices to rank higher on search engines."},
            {"title": "Blazing Fast", "icon": "fa-tachometer-alt", "desc": "Optimized assets and code for minimal load times."}
        ],
        "tech": [
            {"name": "HTML5", "icon": "fa-html5"}, {"name": "CSS3", "icon": "fa-css3-alt"}, {"name": "JavaScript", "icon": "fa-js"}, {"name": "React", "icon": "fa-react"}
        ]
    },
    {
        "id": "web-app-development",
        "title": "Web App Development",
        "short_desc": "Scalable web applications tailored to streamline your complex business logic.",
        "overview": "We engineer robust, secure, and scalable web applications. From single-page applications (SPAs) to complex enterprise portals, our solutions are built to handle high traffic and complex workflows seamlessly.",
        "features": [
            {"title": "Scalable Architecture", "icon": "fa-server", "desc": "Built to grow with your business and handle increasing user loads."},
            {"title": "Secure Data", "icon": "fa-shield-alt", "desc": "Implementations follow OWASP guidelines to ensure maximum security."},
            {"title": "Custom Workflows", "icon": "fa-cogs", "desc": "Tailored features designed exactly for your operational needs."}
        ],
        "tech": [
            {"name": "React", "icon": "fa-react"}, {"name": "Node.js", "icon": "fa-node-js"}, {"name": "Express", "icon": "fa-server"}, {"name": "MongoDB", "icon": "fa-leaf"}
        ]
    },
    {
        "id": "ecommerce",
        "title": "E-Commerce Platforms",
        "short_desc": "Secure, high-converting online stores optimized for maximum sales volume.",
        "overview": "Launch your online business with our customized E-commerce solutions. We build secure, intuitive, and feature-rich platforms that drive conversions, manage inventory efficiently, and provide seamless checkout experiences.",
        "features": [
            {"title": "Secure Payments", "icon": "fa-credit-card", "desc": "Integration with trusted gateways like Stripe and PayPal."},
            {"title": "Inventory Management", "icon": "fa-boxes", "desc": "Easy-to-use dashboards for tracking stock and orders."},
            {"title": "Conversion Optimized", "icon": "fa-chart-line", "desc": "UI/UX designed to minimize cart abandonment."}
        ],
        "tech": [
            {"name": "React", "icon": "fa-react"}, {"name": "Node.js", "icon": "fa-node-js"}, {"name": "MySQL", "icon": "fa-database"}
        ]
    },
    {
        "id": "ai-applications",
        "title": "AI Applications",
        "short_desc": "Smart integrations utilizing machine learning to automate and innovate.",
        "overview": "Harness the power of Artificial Intelligence. We integrate intelligent chatbots, predictive analytics, and automated workflows into your systems to reduce manual effort and unlock new business insights.",
        "features": [
            {"title": "Machine Learning", "icon": "fa-brain", "desc": "Algorithms that learn and improve from your data over time."},
            {"title": "NLP Chatbots", "icon": "fa-robot", "desc": "Conversational AI that provides 24/7 customer support."},
            {"title": "Process Automation", "icon": "fa-magic", "desc": "Automate repetitive tasks to increase operational efficiency."}
        ],
        "tech": [
            {"name": "Python", "icon": "fa-python"}, {"name": "TensorFlow", "icon": "fa-brain"}, {"name": "OpenAI", "icon": "fa-robot"}
        ]
    },
    {
        "id": "data-analytics",
        "title": "Data Analytics",
        "short_desc": "Real-time insights and complex visualizations to drive informed decisions.",
        "overview": "Turn your raw data into actionable intelligence. We build custom dashboards and reporting tools that provide real-time visualization of your key performance indicators, enabling data-driven decision making.",
        "features": [
            {"title": "Real-time Dashboards", "icon": "fa-chart-pie", "desc": "Live monitoring of your crucial business metrics."},
            {"title": "Predictive Analysis", "icon": "fa-chart-area", "desc": "Forecast trends based on historical data patterns."},
            {"title": "Custom Reports", "icon": "fa-file-invoice", "desc": "Automated generation of detailed business reports."}
        ],
        "tech": [
            {"name": "Python", "icon": "fa-python"}, {"name": "MySQL", "icon": "fa-database"}, {"name": "React", "icon": "fa-react"}
        ]
    },
    {
        "id": "database-design",
        "title": "Database Design",
        "short_desc": "Optimized, secure, and highly robust database architectures.",
        "overview": "The foundation of any great application is a solid database. We design and optimize relational and NoSQL databases to ensure fast query times, data integrity, and high availability for your applications.",
        "features": [
            {"title": "Schema Optimization", "icon": "fa-sitemap", "desc": "Normalized structures to prevent data redundancy."},
            {"title": "High Availability", "icon": "fa-server", "desc": "Replication and clustering for zero downtime."},
            {"title": "Data Migration", "icon": "fa-exchange-alt", "desc": "Seamless transfer of data from legacy systems."}
        ],
        "tech": [
            {"name": "MySQL", "icon": "fa-database"}, {"name": "MongoDB", "icon": "fa-leaf"}, {"name": "PostgreSQL", "icon": "fa-database"}
        ]
    },
    {
        "id": "api-integration",
        "title": "API Integration",
        "short_desc": "Seamless REST & GraphQL connectivity between diverse software systems.",
        "overview": "Connect your ecosystem. We develop robust APIs and integrate third-party services (payment gateways, CRMs, ERPs) to ensure your disparate systems communicate flawlessly and securely in real-time.",
        "features": [
            {"title": "RESTful & GraphQL", "icon": "fa-network-wired", "desc": "Modern architectural styles for flexible data retrieval."},
            {"title": "Secure Endpoints", "icon": "fa-lock", "desc": "JWT and OAuth2 implementations for safe data exchange."},
            {"title": "High Performance", "icon": "fa-bolt", "desc": "Optimized routing and caching mechanisms."}
        ],
        "tech": [
            {"name": "Node.js", "icon": "fa-node-js"}, {"name": "Express", "icon": "fa-server"}, {"name": "Python", "icon": "fa-python"}
        ]
    },
    {
        "id": "cloud-deployment",
        "title": "Cloud Deployment",
        "short_desc": "Scalable and secure hosting architectures on AWS, GCP, and Azure.",
        "overview": "Move to the cloud with confidence. We architect, deploy, and manage scalable cloud infrastructures that reduce costs, improve uptime, and provide the elasticity your application needs to handle traffic spikes.",
        "features": [
            {"title": "Auto-scaling", "icon": "fa-expand-arrows-alt", "desc": "Resources automatically adjust based on current traffic."},
            {"title": "Disaster Recovery", "icon": "fa-life-ring", "desc": "Automated backups and failover mechanisms."},
            {"title": "Cost Optimization", "icon": "fa-money-bill-wave", "desc": "Auditing infrastructure to ensure you only pay for what you use."}
        ],
        "tech": [
            {"name": "AWS", "icon": "fa-aws"}, {"name": "Docker", "icon": "fa-docker"}, {"name": "Linux", "icon": "fa-linux"}
        ]
    },
    {
        "id": "security",
        "title": "Security & Auditing",
        "short_desc": "Advanced penetration testing, DDOS protection, and code audits.",
        "overview": "Protect your digital assets. Our comprehensive security audits identify vulnerabilities in your code and infrastructure. We implement industry-leading protocols to safeguard against cyber threats and data breaches.",
        "features": [
            {"title": "Vulnerability Scans", "icon": "fa-bug", "desc": "Deep code analysis to find and fix security flaws."},
            {"title": "DDoS Protection", "icon": "fa-shield-virus", "desc": "Implementation of Web Application Firewalls (WAF)."},
            {"title": "Compliance Check", "icon": "fa-clipboard-check", "desc": "Ensuring systems meet GDPR, HIPAA, or PCI-DSS standards."}
        ],
        "tech": [
            {"name": "Linux", "icon": "fa-linux"}, {"name": "Cloudflare", "icon": "fa-cloud"}, {"name": "Python", "icon": "fa-python"}
        ]
    },
    {
        "id": "performance",
        "title": "Performance Tuning",
        "short_desc": "Lightning-fast load times for superior Core Web Vitals.",
        "overview": "Speed matters. We analyze and optimize your applications to drastically reduce load times. From database query optimization to frontend asset minification, we ensure your users experience zero lag.",
        "features": [
            {"title": "Asset Optimization", "icon": "fa-compress-arrows-alt", "desc": "Minification of CSS/JS and next-gen image formats."},
            {"title": "Caching Strategies", "icon": "fa-hdd", "desc": "Implementation of Redis and CDN networks."},
            {"title": "Core Web Vitals", "icon": "fa-heartbeat", "desc": "Improving LCP, FID, and CLS scores for better SEO."}
        ],
        "tech": [
            {"name": "React", "icon": "fa-react"}, {"name": "Node.js", "icon": "fa-node-js"}, {"name": "Redis", "icon": "fa-database"}
        ]
    },
    {
        "id": "devops",
        "title": "DevOps & Support",
        "short_desc": "Automated CI/CD pipelines, ongoing updates, and proactive monitoring.",
        "overview": "Bridge the gap between development and operations. We establish CI/CD pipelines that automate testing and deployment, allowing for faster release cycles and more stable production environments.",
        "features": [
            {"title": "CI/CD Pipelines", "icon": "fa-infinity", "desc": "Automated testing and continuous delivery."},
            {"title": "Containerization", "icon": "fa-box", "desc": "Docker-based deployments for consistent environments."},
            {"title": "24/7 Monitoring", "icon": "fa-tv", "desc": "Proactive alerting for system health and uptime."}
        ],
        "tech": [
            {"name": "Docker", "icon": "fa-docker"}, {"name": "Git", "icon": "fa-git-alt"}, {"name": "AWS", "icon": "fa-aws"}
        ]
    },
    {
        "id": "ui-ux",
        "title": "UI/UX Engineering",
        "short_desc": "Interactive, user-centric interfaces utilizing modern design principles.",
        "overview": "Design is more than just looks; it's how it works. Our UI/UX experts craft intuitive, accessible, and highly engaging interfaces that guide users smoothly towards conversion goals while dazzling them visually.",
        "features": [
            {"title": "Wireframing", "icon": "fa-pencil-ruler", "desc": "Detailed blueprints of application flow and layout."},
            {"title": "Micro-interactions", "icon": "fa-mouse-pointer", "desc": "Subtle animations that enhance user engagement."},
            {"title": "Accessibility", "icon": "fa-universal-access", "desc": "Designing for all users, adhering to WCAG guidelines."}
        ],
        "tech": [
            {"name": "Figma", "icon": "fa-pen-nib"}, {"name": "CSS3", "icon": "fa-css3-alt"}, {"name": "React", "icon": "fa-react"}
        ]
    },
    {
        "id": "college-projects",
        "title": "College Projects",
        "short_desc": "Portfolios, resumes, and comprehensive academic project assistance.",
        "overview": "Kickstart your career with our specialized services for students. We assist in building standout digital portfolios, interactive resumes, and robust academic projects that impress professors and recruiters alike.",
        "features": [
            {"title": "Digital Portfolios", "icon": "fa-briefcase", "desc": "Showcase your work with a professional online presence."},
            {"title": "Code Review", "icon": "fa-code", "desc": "Expert feedback to improve your academic coding projects."},
            {"title": "Mentorship", "icon": "fa-user-graduate", "desc": "Guidance on industry best practices and modern tech stacks."}
        ],
        "tech": [
            {"name": "HTML5", "icon": "fa-html5"}, {"name": "CSS3", "icon": "fa-css3-alt"}, {"name": "JavaScript", "icon": "fa-js"}
        ]
    },
    {
        "id": "software-development",
        "title": "Software Development",
        "short_desc": "Bespoke software solutions crafted for complex enterprise operations.",
        "overview": "We build custom software that solves your unique business challenges. From ERP systems to custom CRM solutions, our bespoke software improves efficiency, automates processes, and centralizes your operations.",
        "features": [
            {"title": "Custom Architecture", "icon": "fa-cubes", "desc": "Systems built from the ground up for your exact needs."},
            {"title": "Legacy Modernization", "icon": "fa-sync-alt", "desc": "Upgrading outdated systems to modern frameworks."},
            {"title": "Enterprise Integration", "icon": "fa-plug", "desc": "Connecting new software with your existing tools."}
        ],
        "tech": [
            {"name": "Python", "icon": "fa-python"}, {"name": "Node.js", "icon": "fa-node-js"}, {"name": "React", "icon": "fa-react"}
        ]
    },
    {
        "id": "website-maintenance",
        "title": "Website Maintenance",
        "short_desc": "Ongoing support, security updates, and performance optimization.",
        "overview": "Keep your digital presence flawless. Our maintenance packages ensure your website or application stays updated, secure, and fully functional, allowing you to focus on your business rather than technical issues.",
        "features": [
            {"title": "Regular Backups", "icon": "fa-save", "desc": "Daily automated backups to prevent data loss."},
            {"title": "Security Patches", "icon": "fa-shield-alt", "desc": "Immediate application of critical security updates."},
            {"title": "Content Updates", "icon": "fa-edit", "desc": "Prompt updates to text, images, and new pages."}
        ],
        "tech": [
            {"name": "Git", "icon": "fa-git-alt"}, {"name": "Linux", "icon": "fa-linux"}, {"name": "AWS", "icon": "fa-aws"}
        ]
    }
]

for service in services:
    # generate feature cards
    features_html = ""
    for feat in service["features"]:
        features_html += f"""
            <div class="feature-card">
                <i class="fas {feat['icon']} feature-icon"></i>
                <h3>{feat['title']}</h3>
                <p>{feat['desc']}</p>
            </div>"""
    
    # generate tech stack
    tech_html = ""
    for tech in service["tech"]:
        tech_html += f"""
            <div class="tech-card">
                <i class="fab {tech['icon']}"></i>
                <span>{tech['name']}</span>
            </div>"""
            
    title_encoded = service['title'].replace(" ", "+")
    
    html_content = template.format(
        title=service['title'],
        short_desc=service['short_desc'],
        overview=service['overview'],
        title_encoded=title_encoded,
        features_html=features_html,
        tech_html=tech_html
    )
    
    filename = f"service-{service['id']}.html"
    filepath = os.path.join("d:/aman", filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html_content)

print(f"Successfully generated {len(services)} interactive service pages.")
