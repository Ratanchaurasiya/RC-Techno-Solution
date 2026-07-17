import os

css_additions = """
/* Specific heading customizations requested by user */
#features .service-section-title {
    color: var(--clr-primary);
}
#features .service-section-title span {
    color: var(--clr-accent);
}

#features .service-section-title,
#tech .service-section-title,
#process .service-section-title {
    margin-left: 20px;
}
"""

css_path = r'd:\aman\service-detail.css'

with open(css_path, 'a', encoding='utf-8') as f:
    f.write(css_additions)

print("CSS appended to service-detail.css successfully.")
