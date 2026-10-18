import glob
import re

files = glob.glob('*.html')
pattern = re.compile(r'\s*<li>\s*<a\s+class="nav-link[^"]*"\s+href="testimonials\.html">\s*Testimonials\s*</a>\s*</li>', re.IGNORECASE)

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    if pattern.search(content):
        new_content = pattern.sub('', content)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Cleaned nav in {fpath}")

print("Nav cleanup completed.")
