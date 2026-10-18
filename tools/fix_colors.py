import os

def update_css(filename, replacements):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

style_replacements = [
    # Fix variables
    ('--clr-primary: #0284c7;', '--clr-primary: #4f46e5;'),
    ('--clr-secondary: #0ea5e9;', '--clr-secondary: #4338ca;'),
    ('--clr-accent: #38bdf8;', '--clr-accent: #6366f1;'),
    ('--clr-white: #f4ecec;', '--clr-white: #ffffff;'),
    ('--clr-light: #4b9cee;', '--clr-light: #f8fafc;'),
    ('--clr-text-dark: #1e293b;', '--clr-text-dark: #0f172a;'),
    ('--shadow-glow: 0 0 20px rgba(2, 132, 199, 0.4);', '--shadow-glow: 0 0 20px rgba(79, 70, 229, 0.4);'),
    
    # Fix buttons
    ('color: var(--clr-dark);\n}', 'color: var(--clr-white);\n}'),
    ('color: var(--clr-dark);\n    }', 'color: var(--clr-white);\n    }'),
    ('rgba(56, 189, 248, 0.3)', 'rgba(79, 70, 229, 0.3)'),
    
    # Fix pulse-glow
    ('rgba(2, 132, 199, 0.4)', 'rgba(79, 70, 229, 0.4)'),
    ('rgba(2, 132, 199, 0)', 'rgba(79, 70, 229, 0)'),
    
    # Fix footer
    ('background: #090f1f;', 'background: #0f172a;')
]

home_replacements = [
    ('rgba(2, 132, 199, 0.08)', 'rgba(79, 70, 229, 0.08)'),
    ('rgba(56, 189, 248, 0.05)', 'rgba(99, 102, 241, 0.05)'),
    ('rgba(56, 189, 248, 0.2)', 'rgba(79, 70, 229, 0.2)'),
    ('rgba(56, 189, 248, 0.5)', 'rgba(79, 70, 229, 0.5)')
]

if os.path.exists('style.css'):
    update_css('style.css', style_replacements)
    
if os.path.exists('home.css'):
    update_css('home.css', home_replacements)

print("Colors updated successfully.")
