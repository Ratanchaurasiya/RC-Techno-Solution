import os

files = ['about.html', 'services.html', 'portfolio.html', 'team.html', 'testimonials.html', 'faq.html', 'contact.html']

for f in files:
    path = os.path.join('d:/aman', f)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace exact class="container" and also class="container " with full-width added
        content = content.replace('class="container"', 'class="container full-width"')
        content = content.replace('class="container ', 'class="container full-width ')
        
        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)
