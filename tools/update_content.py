import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_about_section = """<section class="section" id="about">
<div class="container about-container">
<div class="about-content reveal delay-1 reveal-zoom">
<h2 class="section-title">About Us</h2>
<p class="section-subtitle">Introduce your company and what you do.</p>
<p class="about-text">
    RatanTech Solutions is a modern IT company dedicated to delivering innovative digital solutions for businesses, startups, and individuals. We specialize in creating responsive websites, web applications, custom software, AI-powered solutions, data analytics dashboards, and business automation systems. Every solution is designed according to our clients' unique requirements, ensuring the best performance, user experience, and business growth.
</p>

<h3 style="margin-top: 30px; margin-bottom: 15px; color: var(--clr-primary);">Who We Are</h3>
<p class="about-text">
    We are a passionate team of developers, designers, and technology enthusiasts committed to transforming ideas into successful digital products. By combining creativity, modern technologies, and industry best practices, we deliver solutions that are reliable, scalable, and future-ready.
</p>

<div class="about-mission">
    <div class="mission-item">
        <i class="fas fa-bullseye"></i>
        <div>
            <h4>Our Mission</h4>
            <p>Our mission is to empower businesses with innovative, affordable, and high-quality technology solutions that simplify operations, improve customer experiences, and accelerate digital transformation.</p>
        </div>
    </div>
    <div class="mission-item">
        <i class="fas fa-eye"></i>
        <div>
            <h4>Our Vision</h4>
            <p>Our vision is to become a trusted global technology partner, helping businesses achieve long-term success through innovation, quality, and continuous improvement.</p>
        </div>
    </div>
</div>
</div>
</div>
</section>"""

new_services_section = """<section class="section bg-light" id="services">
<div class="container">
<div class="section-header reveal">
<h2 class="section-title">Our Services</h2>
<p class="section-subtitle">What We Do Best</p>
</div>
<div class="services-grid">

    <div class="service-card reveal">
        <div class="icon-box"><i class="fas fa-laptop-code"></i></div>
        <h3>Website Development</h3>
    </div>
    
    <div class="service-card reveal delay-1">
        <div class="icon-box"><i class="fas fa-window-restore"></i></div>
        <h3>Web Application Development</h3>
    </div>
    
    <div class="service-card reveal delay-2">
        <div class="icon-box"><i class="fas fa-shopping-cart"></i></div>
        <h3>E-Commerce Website Development</h3>
    </div>
    
    <div class="service-card reveal">
        <div class="icon-box"><i class="fas fa-robot"></i></div>
        <h3>AI-Powered Applications</h3>
    </div>
    
    <div class="service-card reveal delay-1">
        <div class="icon-box"><i class="fas fa-chart-bar"></i></div>
        <h3>Data Analytics Dashboards</h3>
    </div>
    
    <div class="service-card reveal delay-2">
        <div class="icon-box"><i class="fas fa-database"></i></div>
        <h3>Database Design & Management</h3>
    </div>

    <div class="service-card reveal">
        <div class="icon-box"><i class="fas fa-network-wired"></i></div>
        <h3>API Development & Integration</h3>
    </div>
    
    <div class="service-card reveal delay-1">
        <div class="icon-box"><i class="fas fa-cloud"></i></div>
        <h3>Cloud Deployment</h3>
    </div>
    
    <div class="service-card reveal delay-2">
        <div class="icon-box"><i class="fas fa-shield-alt"></i></div>
        <h3>Website Security</h3>
    </div>

    <div class="service-card reveal">
        <div class="icon-box"><i class="fas fa-bolt"></i></div>
        <h3>Website Speed Optimization</h3>
    </div>
    
    <div class="service-card reveal delay-1">
        <div class="icon-box"><i class="fas fa-tools"></i></div>
        <h3>Website Maintenance & Support</h3>
    </div>
    
    <div class="service-card reveal delay-2">
        <div class="icon-box"><i class="fas fa-mobile-alt"></i></div>
        <h3>Responsive UI/UX Design</h3>
    </div>

</div>
</div>
</section>"""

# Replace about section
html = re.sub(r'<section class="section" id="about">.*?</section>', new_about_section, html, flags=re.DOTALL)

# Replace services section
html = re.sub(r'<section class="section bg-light" id="services">.*?</section>', new_services_section, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Content updated successfully!")
