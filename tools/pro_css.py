css = """
/* ==========================================================================
   PRO-LEVEL FULLSTACK BENTO & DARK MODE STYLES
   ========================================================================== */

/* --- BENTO GRID: ABOUT US --- */
.bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto;
    gap: 20px;
    margin-top: 40px;
}

.bento-card {
    background: var(--clr-white);
    border-radius: 24px;
    padding: 35px;
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(0,0,0,0.04);
    position: relative;
    overflow: hidden;
    transition: var(--transition);
}

.bento-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.bento-main {
    grid-column: span 2;
    grid-row: span 2;
    background: linear-gradient(145deg, #ffffff, #f8fafc);
}

.bento-terminal {
    grid-column: span 2;
    grid-row: span 1;
    background: #1e293b; /* Dark MacOS terminal color */
    color: #e2e8f0;
    padding: 0;
    display: flex;
    flex-direction: column;
}

.bento-mission, .bento-vision {
    grid-column: span 1;
    grid-row: span 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.bento-title {
    font-size: 2.2rem;
    margin-bottom: 20px;
    color: var(--clr-text-dark);
}

.tech-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
}

.badge {
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--clr-light);
    color: var(--clr-text-dark);
    border: 1px solid rgba(0,0,0,0.05);
}

.badge-react i { color: #61dafb; }
.badge-node i { color: #68a063; }
.badge-python i { color: #3776ab; }
.badge-aws i { color: #ff9900; }
.badge-docker i { color: #2496ed; }

/* Terminal Styles */
.terminal-header {
    background: #0f172a;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.term-btn {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}
.term-close { background: #ff5f56; }
.term-min { background: #ffbd2e; }
.term-max { background: #27c93f; }

.term-title {
    margin-left: auto;
    margin-right: auto;
    font-size: 0.8rem;
    color: #94a3b8;
    font-family: monospace;
}

.terminal-body {
    padding: 25px;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
}

.term-prompt { color: #4ade80; } /* Green */
.term-output { color: #94a3b8; }
.cursor-blink {
    display: inline-block;
    width: 8px;
    height: 15px;
    background: #e2e8f0;
    animation: blink 1s step-end infinite;
}

@keyframes blink { 50% { opacity: 0; } }

.bento-icon {
    font-size: 2.5rem;
    color: var(--clr-primary);
    margin-bottom: 20px;
}

/* --- GLOWING DARK MODE: SERVICES --- */
.section-dark {
    background: #0f172a;
    color: var(--clr-white);
}

.section-dark .section-title {
    color: var(--clr-white);
}

.text-glow {
    text-shadow: 0 0 20px rgba(79, 70, 229, 0.5);
}

.subtitle-dark {
    color: #94a3b8 !important;
}

.bento-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
}

.bento-service-card {
    background: rgba(30, 41, 59, 0.7); /* Slate 800 with opacity */
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px;
    padding: 1px; /* Magic border technique */
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;
}

.bento-service-card:hover {
    transform: translateY(-5px);
}

.bento-service-content {
    background: #1e293b;
    border-radius: 19px; /* Inner radius */
    padding: 30px;
    height: 100%;
    position: relative;
    z-index: 2;
}

/* Hover Glow Effect */
.service-glow-blob {
    position: absolute;
    width: 150px;
    height: 150px;
    background: var(--clr-primary);
    filter: blur(60px);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
}

.bento-service-card:hover .service-glow-blob {
    opacity: 0.6;
}

.bento-service-icon {
    font-size: 2rem;
    color: #a5f3fc; /* Bright cyan */
    margin-bottom: 20px;
}

.bento-service-content h3 {
    color: var(--clr-white);
    margin-bottom: 10px;
    font-size: 1.25rem;
}

.bento-service-content p {
    color: #94a3b8;
    font-size: 0.95rem;
    line-height: 1.5;
}

/* Responsive Grid */
@media (max-width: 992px) {
    .bento-grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }
    .bento-main, .bento-terminal, .bento-mission, .bento-vision {
        grid-column: span 1;
        grid-row: span 1;
    }
}
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css)

print("Pro CSS appended successfully.")
