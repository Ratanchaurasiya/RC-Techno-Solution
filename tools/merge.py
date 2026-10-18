import os
from bs4 import BeautifulSoup

def merge():
    files = ['about.html', 'services.html', 'portfolio.html', 'team.html', 'testimonials.html', 'faq.html', 'contact.html']
    
    with open('index.html', 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # 1. Update navigation links
    nav_links = soup.select('.nav-link')
    for link in nav_links:
        text = link.text.strip().lower()
        if text == 'home':
            link['href'] = '#home'
        elif text == 'about':
            link['href'] = '#about'
        elif text == 'services':
            link['href'] = '#services'
        elif text == 'portfolio':
            link['href'] = '#portfolio'
        elif text == 'team':
            link['href'] = '#team'
        elif text == 'testimonials':
            link['href'] = '#testimonials'
        elif text == 'faq':
            link['href'] = '#faq'
        elif text == 'contact':
            link['href'] = '#contact'
    
    nav_btns = soup.select('.btn-nav')
    for btn in nav_btns:
        btn['href'] = '#contact'
        
    footer_links = soup.select('.footer-col ul li a')
    for link in footer_links:
        text = link.text.strip().lower()
        if 'home' in text:
            link['href'] = '#home'
        elif 'about' in text:
            link['href'] = '#about'
        elif 'portfolio' in text:
            link['href'] = '#portfolio'
        elif 'team' in text:
            link['href'] = '#team'
        elif 'contact' in text:
            link['href'] = '#contact'
        elif 'development' in text or 'design' in text or 'ai' in text:
            link['href'] = '#services'
            
    # Add all CSS files to head
    head = soup.find('head')
    css_files = ['about.css', 'services.css', 'portfolio.css', 'team.css', 'testimonials.css', 'faq.css', 'contact.css']
    for css in css_files:
        if not head.find('link', href=css):
            new_link = soup.new_tag('link', rel='stylesheet', href=css)
            head.append(new_link)

    # Insert sections before footer
    footer = soup.find('footer')
    
    for filename in files:
        with open(filename, 'r', encoding='utf-8') as f:
            section_soup = BeautifulSoup(f.read(), 'html.parser')
            sections = section_soup.find_all('section')
            for sec in sections:
                # Add smooth animation classes
                if not sec.has_attr('class') or 'reveal' not in sec['class']:
                    # We will handle reveal inside sections mostly, but let's leave it as is
                    pass
                footer.insert_before(sec)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))
        
if __name__ == '__main__':
    merge()
