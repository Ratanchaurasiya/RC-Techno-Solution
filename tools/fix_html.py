def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # fix the double </p>
    new_content = content.replace('</p></p>', '</p>')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

fix_file("d:/aman/index.html")
fix_file("d:/aman/services.html")
