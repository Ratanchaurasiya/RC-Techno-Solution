import os
from bs4 import BeautifulSoup

def enhance_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # 1. Hero Image float
    hero_img = soup.select_one('.hero-container img')
    if hero_img:
        hero_img['class'] = hero_img.get('class', []) + ['float-anim']
    
    # 2. Add directional reveals
    # About image from left, text from right
    about_img = soup.select_one('.about-image.reveal')
    if about_img:
        about_img['class'] = about_img.get('class', []) + ['reveal-left']
    
    about_text = soup.select_one('.about-content.reveal')
    if about_text:
        about_text['class'] = about_text.get('class', []) + ['reveal-right']
        
    # Stats zoom in
    stat_cards = soup.select('.stat-card')
    for card in stat_cards:
        card['class'] = card.get('class', []) + ['reveal', 'reveal-zoom']
        
    # Buttons pulse
    primary_btns = soup.select('.btn-primary')
    for btn in primary_btns:
        btn['class'] = btn.get('class', []) + ['pulse-anim']
        
    # Add glassmorphism to form container if not present
    contact_form = soup.select_one('.contact-form-container')
    if contact_form:
        contact_form['class'] = contact_form.get('class', []) + ['glass']

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))
        
if __name__ == '__main__':
    enhance_html()
