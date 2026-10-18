import os
from bs4 import BeautifulSoup

def update_hero_classes():
    with open('index.html', 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    hero_container = soup.select_one('.hero-container')
    if hero_container:
        # The first child div is the content, second is image
        divs = hero_container.find_all('div', recursive=False)
        if len(divs) >= 2:
            divs[0]['class'] = divs[0].get('class', []) + ['hero-content']
            divs[1]['class'] = divs[1].get('class', []) + ['hero-image']
            
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))
        
if __name__ == '__main__':
    update_hero_classes()
