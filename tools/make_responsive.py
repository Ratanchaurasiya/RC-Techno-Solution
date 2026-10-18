import os

css_patches = {
    "style.css": """
/* ==========================================================================
   UNIVERSAL RESPONSIVE OVERRIDES
   ========================================================================== */
@media (max-width: 1200px) {
    .container { max-width: 96%; padding: 0 20px; }
}
@media (max-width: 992px) {
    .bento-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .bento-main, .bento-terminal { grid-column: span 2 !important; }
    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
    .section-title { font-size: 2.5rem !important; }
}
@media (max-width: 768px) {
    .bento-grid, .stats-grid, .contact-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    .bento-main, .bento-terminal, .bento-mission, .bento-vision { grid-column: span 1 !important; grid-row: auto !important; }
    .section-title { font-size: 2rem !important; }
    .section { padding: 60px 0 !important; }
    .hero-content h1 { font-size: 2.5rem !important; }
}
@media (max-width: 576px) {
    .container { padding: 0 15px !important; }
    .section-title { font-size: 1.8rem !important; }
    .hero-buttons { flex-direction: column !important; width: 100% !important; gap: 15px !important; }
    .hero-buttons .btn { width: 100% !important; text-align: center; }
    .footer-grid { grid-template-columns: 1fr !important; }
}
""",
    "services.css": """
/* ==========================================================================
   SERVICES RESPONSIVE OVERRIDES
   ========================================================================== */
@media (max-width: 992px) {
    .services-grid, .why-us-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
}
@media (max-width: 768px) {
    .services-grid, .why-us-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    .service-card { padding: 25px !important; }
}
""",
    "service-detail.css": """
/* ==========================================================================
   SERVICE DETAIL RESPONSIVE OVERRIDES
   ========================================================================== */
@media (max-width: 992px) {
    .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 30px !important; }
    .process-timeline::before { left: 20px !important; }
    .process-step { width: 100% !important; padding-left: 50px !important; text-align: left !important; }
    .process-step:nth-child(even) { left: 0 !important; }
    .process-icon { left: 20px !important; transform: translateX(-50%) !important; }
}
@media (max-width: 768px) {
    .pricing-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    .pricing-card.popular { transform: scale(1) !important; }
    .pricing-card.popular:hover { transform: translateY(-10px) !important; }
}
""",
    "portfolio.css": """
/* ==========================================================================
   PORTFOLIO RESPONSIVE OVERRIDES
   ========================================================================== */
@media (max-width: 992px) {
    .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
}
@media (max-width: 768px) {
    .portfolio-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    .portfolio-filters { flex-wrap: wrap !important; justify-content: center !important; }
    .filter-btn { margin: 5px !important; }
}
""",
    "team.css": """
/* ==========================================================================
   TEAM RESPONSIVE OVERRIDES
   ========================================================================== */
@media (max-width: 992px) {
    .team-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 30px !important; }
}
@media (max-width: 768px) {
    .team-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
}
@media (max-width: 576px) {
    .team-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    .team-card { max-width: 350px !important; margin: 0 auto !important; }
}
""",
    "about.css": """
/* ==========================================================================
   ABOUT RESPONSIVE OVERRIDES
   ========================================================================== */
@media (max-width: 992px) {
    .about-grid, .about-grid-pro { grid-template-columns: 1fr !important; gap: 30px !important; }
    .about-img, .about-content { width: 100% !important; max-width: 100% !important; }
    .about-container { flex-direction: column !important; }
}
@media (max-width: 768px) {
    .about-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 15px !important; }
}
@media (max-width: 576px) {
    .about-stats { grid-template-columns: 1fr !important; gap: 15px !important; }
}
""",
    "contact.css": """
/* ==========================================================================
   CONTACT RESPONSIVE OVERRIDES
   ========================================================================== */
@media (max-width: 992px) {
    .contact-container, .contact-wrapper { flex-direction: column !important; gap: 40px !important; }
    .contact-info, .contact-form-container { width: 100% !important; max-width: 100% !important; }
}
@media (max-width: 768px) {
    .form-group { flex-direction: column !important; gap: 15px !important; }
    .contact-item { flex-direction: column !important; text-align: center !important; }
    .contact-icon { margin: 0 auto 15px !important; }
}
""",
    "testimonials.css": """
/* ==========================================================================
   TESTIMONIALS RESPONSIVE OVERRIDES
   ========================================================================== */
@media (max-width: 992px) {
    .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
}
@media (max-width: 768px) {
    .testimonials-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    .testimonial-card { padding: 25px !important; }
}
""",
    "faq.css": """
/* ==========================================================================
   FAQ RESPONSIVE OVERRIDES
   ========================================================================== */
@media (max-width: 768px) {
    .faq-grid, .faq-container { width: 100% !important; grid-template-columns: 1fr !important; }
    .faq-item, .faq-question { padding: 15px !important; }
}
"""
}

def main():
    directory = "d:/aman"
    for filename, css_code in css_patches.items():
        filepath = os.path.join(directory, filename)
        if os.path.exists(filepath):
            with open(filepath, "a", encoding="utf-8") as f:
                f.write("\\n" + css_code + "\\n")
            print(f"Patched {filename}")
        else:
            print(f"Skipped {filename} (Not found)")

if __name__ == "__main__":
    main()
