import glob
import re

html_files = glob.glob('*.html')

for path in html_files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    # Standardize email
    content = re.sub(r'hello@r[cC]tech\.com', 'hello@rctechsolutions.com', content)
    # Standardize address
    content = content.replace('Innovation City, 10001', 'Vastral, Ahmedabad, Gujarat, India')
    # Standardize copyright year
    content = content.replace('&copy; 2024 RC Tech Solutions', '&copy; 2026 RC Tech Solutions')
    content = content.replace('&copy; 2025 RC Tech Solutions', '&copy; 2026 RC Tech Solutions')
    content = content.replace('© 2024 RC Tech Solutions', '© 2026 RC Tech Solutions')
    content = content.replace('© 2025 RC Tech Solutions', '© 2026 RC Tech Solutions')

    # Add Terms and Privacy to Quick Links if missing
    if 'terms.html' not in content:
        # Match Contact link inside Quick Links
        contact_pattern = re.compile(r'(<a\s+[^>]*href=["\'](?:index\.html)?#?contact(?:\.html)?["\'][^>]*>\s*Contact\s*</a>\s*</li>)', re.IGNORECASE)
        if contact_pattern.search(content):
            replacement = r'\1\n                        <li><a href="terms.html">Terms &amp; Conditions</a></li>\n                        <li><a href="privacy.html">Privacy Policy</a></li>'
            content = contact_pattern.sub(replacement, content, count=1)
        elif '</ul>' in content and 'Quick Links' in content:
            # Alternate fallback for service detail pages
            content = content.replace('<li><a href="contact.html">Contact</a></li>', '<li><a href="contact.html">Contact</a></li>\n                    <li><a href="terms.html">Terms &amp; Conditions</a></li>\n                    <li><a href="privacy.html">Privacy Policy</a></li>')

    # Add Terms & Privacy to footer bottom if not already linked
    if 'Terms' not in content and '&copy; 2026 RC Tech Solutions. All Rights Reserved.' in content:
        content = content.replace('&copy; 2026 RC Tech Solutions. All Rights Reserved.', '&copy; 2026 RC Tech Solutions. All Rights Reserved. &bull; <a href="terms.html" style="color: inherit;">Terms</a> &bull; <a href="privacy.html" style="color: inherit;">Privacy</a>')

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {path}")

print("Done syncing footers and terms across all HTML files.")
