import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_about_section = """<section class="section" id="about">
<div class="container">
    <div class="section-header reveal reveal-zoom">
        <h2 class="section-title">About Us</h2>
        <p class="section-subtitle">Innovating the Digital Future</p>
    </div>
    
    <div class="about-grid-pro reveal delay-1">
        <div class="about-text-pro">
            <h3 class="gradient-text">Who We Are</h3>
            <p>
                <strong>RatanTech Solutions</strong> is a modern IT company dedicated to delivering innovative digital solutions for businesses, startups, and individuals. We specialize in creating responsive websites, web applications, custom software, AI-powered solutions, data analytics dashboards, and business automation systems.
            </p>
            <p>
                We are a passionate team of developers, designers, and technology enthusiasts committed to transforming ideas into successful digital products. By combining creativity, modern technologies, and industry best practices, we deliver solutions that are reliable, scalable, and future-ready.
            </p>
            <div class="about-stats-mini">
                <div class="stat-mini"><span>100+</span> Projects</div>
                <div class="stat-mini"><span>50+</span> Clients</div>
                <div class="stat-mini"><span>24/7</span> Support</div>
            </div>
        </div>
        
        <div class="about-cards-pro">
            <div class="pro-card mission-card">
                <div class="card-icon"><i class="fas fa-bullseye"></i></div>
                <div>
                    <h4>Our Mission</h4>
                    <p>To empower businesses with innovative, affordable, and high-quality technology solutions that simplify operations, improve customer experiences, and accelerate digital transformation.</p>
                </div>
            </div>
            
            <div class="pro-card vision-card">
                <div class="card-icon"><i class="fas fa-eye"></i></div>
                <div>
                    <h4>Our Vision</h4>
                    <p>To become a trusted global technology partner, helping businesses achieve long-term success through innovation, quality, and continuous improvement.</p>
                </div>
            </div>
        </div>
    </div>
</div>
</section>"""

services_list = [
    ("Website Development", "fa-laptop-code", "Custom, responsive websites built with modern technologies."),
    ("Web Application Development", "fa-window-restore", "Scalable web apps tailored to your business logic."),
    ("E-Commerce Website", "fa-shopping-cart", "Secure online stores optimized for sales and growth."),
    ("AI-Powered Applications", "fa-robot", "Smart applications integrating machine learning and AI."),
    ("Data Analytics Dashboards", "fa-chart-bar", "Real-time insights and visualizations for decision making."),
    ("Database Design & Mgt", "fa-database", "Optimized, secure, and robust database architectures."),
    ("API Development & Integration", "fa-network-wired", "Seamless connectivity between platforms and services."),
    ("Cloud Deployment", "fa-cloud", "Scalable and reliable hosting on modern cloud infrastructure."),
    ("Website Security", "fa-shield-alt", "Advanced protection against cyber threats and vulnerabilities."),
    ("Website Speed Optimization", "fa-bolt", "Lightning-fast load times for better SEO and UX."),
    ("Maintenance & Support", "fa-tools", "Ongoing updates and technical assistance for your platforms."),
    ("Responsive UI/UX Design", "fa-mobile-alt", "Beautiful, user-centric interfaces that drive engagement.")
]

services_html = ""
for i, (title, icon, desc) in enumerate(services_list):
    delay = f"delay-{(i % 3) + 1}"
    services_html += f"""
    <div class="service-card-pro reveal {delay}">
        <div class="service-icon-pro"><i class="fas {icon}"></i></div>
        <div class="service-info-pro">
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    </div>
    """

new_services_section = f"""<section class="section bg-light" id="services">
<div class="container">
    <div class="section-header reveal">
        <h2 class="section-title">Our Services</h2>
        <p class="section-subtitle">What We Do Best</p>
    </div>
    <div class="services-grid-pro">
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

# Add CSS rules
css = """
/* Professional About Section */
.about-grid-pro {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: center;
    margin-top: 40px;
}
.about-text-pro p {
    margin-bottom: 20px;
    font-size: 1.05rem;
    color: var(--clr-text);
}
.about-text-pro strong { color: var(--clr-text-dark); }
.gradient-text {
    background: linear-gradient(135deg, var(--clr-text-dark), var(--clr-primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.8rem;
    margin-bottom: 20px;
}
.about-stats-mini {
    display: flex;
    gap: 30px;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(0,0,0,0.05);
}
.stat-mini {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    color: var(--clr-text);
}
.stat-mini span {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--clr-primary);
}
.about-cards-pro {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.pro-card {
    background: var(--clr-white);
    padding: 30px;
    border-radius: 16px;
    box-shadow: var(--shadow-md);
    display: flex;
    gap: 20px;
    transition: var(--transition);
    border-left: 4px solid transparent;
}
.pro-card:hover {
    transform: translateX(10px);
    box-shadow: var(--shadow-lg);
    border-left-color: var(--clr-primary);
}
.pro-card .card-icon {
    font-size: 2rem;
    color: var(--clr-primary);
    background: rgba(79, 70, 229, 0.1);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    flex-shrink: 0;
}
.pro-card h4 {
    font-size: 1.2rem;
    margin-bottom: 8px;
    color: var(--clr-text-dark);
}

/* Professional Services Section */
.services-grid-pro {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}
.service-card-pro {
    background: var(--clr-white);
    padding: 25px;
    border-radius: 12px;
    box-shadow: var(--shadow-sm);
    display: flex;
    align-items: flex-start;
    gap: 15px;
    transition: var(--transition);
    border: 1px solid rgba(0,0,0,0.03);
}
.service-card-pro:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
    border-color: rgba(79, 70, 229, 0.2);
}
.service-icon-pro {
    font-size: 1.5rem;
    color: var(--clr-primary);
    background: rgba(79, 70, 229, 0.08);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    flex-shrink: 0;
    transition: var(--transition);
}
.service-card-pro:hover .service-icon-pro {
    background: var(--clr-primary);
    color: var(--clr-white);
}
.service-info-pro h3 {
    font-size: 1.1rem;
    margin-bottom: 6px;
    color: var(--clr-text-dark);
}
.service-info-pro p {
    font-size: 0.9rem;
    color: var(--clr-text);
    line-height: 1.4;
}

@media (max-width: 768px) {
    .about-grid-pro {
        grid-template-columns: 1fr;
    }
}
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css)

print("Professional layout applied successfully.")
