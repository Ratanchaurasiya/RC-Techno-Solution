import re
import os

# 1. Update index.html About section content and tech grid classes
index_path = r'd:\aman\index.html'
with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add more details in About section
old_about = '<p><strong>RC Tech Solutions</strong> is an elite IT agency dedicated to delivering robust digital solutions. We specialize in creating high-performance web applications, AI integrations, data analytics dashboards, and enterprise systems.</p>'
new_about = '<p><strong>RC Tech Solutions</strong> is a premier technology partner specializing in high-performance web applications, AI integrations, data analytics dashboards, and enterprise-grade software systems. With a strong commitment to quality and innovation, we transform complex business challenges into elegant digital solutions. Our team of seasoned developers, designers, and strategists work collaboratively to ensure every project exceeds expectations. We believe in building long-term relationships with our clients through transparency, dedication, and unparalleled technical expertise.</p>'
content = content.replace(old_about, new_about)

# Write back index.html
with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)


# 2. Update style.css
style_path = r'd:\aman\style.css'
with open(style_path, 'r', encoding='utf-8') as f:
    style = f.read()

# Fix Navbar color combination
style = style.replace('background: transparent;\n}', 'background: rgba(15, 23, 42, 0.7);\n    backdrop-filter: blur(10px);\n}')

old_logo = '''.logo {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--clr-text-dark);
}'''
new_logo = '''.logo {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--clr-white);
}'''
style = style.replace(old_logo, new_logo)

old_tech_logo = '.logo .tech { color: var(--clr-text-dark); }'
new_tech_logo = '.logo .tech { color: var(--clr-white); }'
style = style.replace(old_tech_logo, new_tech_logo)

old_nav_link = '''.nav-link {
    font-size: 1rem;
    font-weight: 500;
    position: relative;
    color: var(--clr-text-dark);
}'''
new_nav_link = '''.nav-link {
    font-size: 1rem;
    font-weight: 500;
    position: relative;
    color: var(--clr-white);
}'''
style = style.replace(old_nav_link, new_nav_link)

old_hamburger = '''.hamburger {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-text-dark);
}'''
new_hamburger = '''.hamburger {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-white);
}'''
style = style.replace(old_hamburger, new_hamburger)

# Add .see-more-btn styling for better color combination and mobile fix
# Also make sure .bento-grid is responsive
css_additions = '''

/* Fix See More Button */
.see-more-btn {
    background: var(--clr-primary);
    color: var(--clr-white) !important;
    border: 2px solid transparent;
    transition: var(--transition);
    text-align: center;
    border-radius: 8px;
    font-weight: 600;
}
.see-more-btn:hover {
    background: transparent;
    color: var(--clr-primary) !important;
    border-color: var(--clr-primary);
    transform: translateY(-3px);
}

@media (max-width: 1024px) {
    .bento-grid {
        grid-template-columns: repeat(2, 1fr) !important;
    }
    .bento-main {
        grid-column: span 2 !important;
    }
    .bento-terminal {
        grid-column: span 2 !important;
    }
}

@media (max-width: 768px) {
    .see-more-btn {
        display: block !important;
        width: 100%;
        margin-top: 20px !important;
        padding: 12px 20px;
    }
    .bento-grid {
        grid-template-columns: 1fr !important;
    }
    .bento-main, .bento-terminal, .bento-mission, .bento-vision {
        grid-column: span 1 !important;
    }
}
'''

if '/* Fix See More Button */' not in style:
    style += css_additions

with open(style_path, 'w', encoding='utf-8') as f:
    f.write(style)


# 3. Update services.css to ensure technology grid is centered
services_path = r'd:\aman\services.css'
with open(services_path, 'r', encoding='utf-8') as f:
    services_css = f.read()

old_tech_grid = '''.tech-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}'''
new_tech_grid = '''.tech-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;
    gap: 20px;
}'''
services_css = services_css.replace(old_tech_grid, new_tech_grid)

with open(services_path, 'w', encoding='utf-8') as f:
    f.write(services_css)

print("Updated index.html, style.css, and services.css successfully.")
