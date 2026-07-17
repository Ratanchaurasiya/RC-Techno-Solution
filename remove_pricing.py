import os
import re

directory = 'd:\\aman'

for filename in os.listdir(directory):
    if filename.startswith('service-') and filename.endswith('.html'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # We need to find the <section ... id="pricing"> and remove it completely until the next </section>
        # The section looks like: <section class="service-section bg-light" id="pricing"> ... </section>
        
        pattern = re.compile(r'<section[^>]*id="pricing"[^>]*>.*?</section>', re.DOTALL)
        new_content = pattern.sub('', content)
        
        if content != new_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Removed pricing from {filename}")
        else:
            print(f"Pricing section not found in {filename}")
