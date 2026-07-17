import re

# Mapping of Service Titles to their specific filenames
service_links = {
    "Website Development": "service-website-development.html",
    "Web App Development": "service-web-app-development.html",
    "Web Application Development": "service-web-app-development.html",
    "E-Commerce Platforms": "service-ecommerce.html",
    "AI Applications": "service-ai-applications.html",
    "AI Integration": "service-ai-applications.html",
    "Data Analytics": "service-data-analytics.html",
    "Database Design": "service-database-design.html",
    "Database Solutions": "service-database-design.html",
    "API Integration": "service-api-integration.html",
    "Cloud Deployment": "service-cloud-deployment.html",
    "Security & Auditing": "service-security.html",
    "Performance Tuning": "service-performance.html",
    "DevOps & Support": "service-devops.html",
    "UI/UX Engineering": "service-ui-ux.html",
    "UI/UX Design": "service-ui-ux.html",
    "College Projects": "service-college-projects.html",
    "Software Development": "service-software-development.html",
    "Website Maintenance": "service-website-maintenance.html"
}

def update_file(filepath, pattern, is_bento=False):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to find <h3>Title</h3>\n<p>Desc</p> and add the button after it.
    # The pattern should capture the title and the closing </p>
    
    def replacer(match):
        title = match.group(1).strip()
        link = service_links.get(title, "#")
        
        button_html = f'\n            <a href="{link}" class="btn btn-small see-more-btn" style="margin-top: 15px; display: inline-block;">See More</a>\n        </div>'
        if not is_bento:
            button_html = f'\n       <a href="{link}" class="btn btn-small see-more-btn" style="margin-top: 15px; display: inline-block;">See More</a>\n      </div>'
            
        return f"<h3>\n{match.group(1)}</h3>\n{match.group(2)}</p>{button_html}"

    # Find <h3>...</h3>...<p>...</p>...</div>
    # match.group(1) will be the inner text of h3
    # match.group(2) will be the p tag content including spaces
    
    if is_bento:
        # For index.html bento cards
        regex = r"<h3>\s*(.*?)\s*</h3>\s*(<p>.*?</p>)\s*</div>"
        new_content = re.sub(regex, replacer, content, flags=re.DOTALL)
    else:
        # For services.html regular cards
        # <h3>\s*Website Development\s*</h3>\s*<p>\s*Custom...\s*</p>\s*</div>
        regex = r"<h3>\s*(.*?)\s*</h3>\s*(<p>.*?</p>)\s*</div>"
        new_content = re.sub(regex, replacer, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated {filepath}")

update_file("d:/aman/index.html", "", is_bento=True)
update_file("d:/aman/services.html", "", is_bento=False)

