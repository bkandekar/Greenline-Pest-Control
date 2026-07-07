# Greenline Pest Control — Static Frontend Website

A modern, highly professional, fully responsive, and SEO-optimized static website built using **pure HTML5, CSS3, and Vanilla JavaScript** — with no frameworks, external build tools, or backend. Designed specifically for direct deployment on **GitHub Pages**.

## Brand Identity

*   **Business Name:** Greenline Pest Control
*   **Tagline:** "Clean Homes, Healthy Living"
*   **Aesthetic Theme:** "Clinical Hygiene & Sterile Safety"
*   **Primary Palette:** Deep Green (`#0F5132`)
*   **Accent Palette:** Amber (`#F77F00`)
*   **Neutral Palette:** High-contrast White/Light-Gray backgrounds with rich Slate text (`#212529`)
*   **Typography:** Poppins (for elegant, confident display headings) and Inter (for ultra-legible, crisp body copy)

---

## File Structure

The project strictly follows the requested flat layout:

```text
/
├── index.html            # Homepage (Overview, core services, pricing, map)
├── about.html            # About Us (Company philosophy, core values, certification)
├── services.html         # Services (12 interactive, comprehensive service drawers)
├── pricing.html          # Pricing Tiers (12-service structural starting packages)
├── gallery.html          # Gallery (Filterable category portfolio, custom lightbox)
├── testimonials.html     # Testimonials (9 verified customer reviews, sliding carousel)
├── faq.html              # FAQ (15-question accordion with smooth CSS toggling)
├── contact.html          # Contact (Direct message offline form with success panel)
├── privacy.html          # Privacy Policy (Reassuring data transparency guidelines)
├── terms.html            # Terms of Service (AMC quarterly frameworks & preparation rules)
├── sitemap.xml           # SEO Sitemap listing all 10 pages
├── robots.txt            # Search engine crawler instructions
├── favicon.ico           # Application favicon
├── css/
│   └── style.css         # Central unified stylesheet
└── js/
    └── script.js         # Unified client-side interactive logic & modal engine
```

---

## Key Features

1.  **Unified Layout & Navigation:** Consistent, high-fidelity sticky navigation header and informative multi-column footer across all 10 pages. Includes mobile-responsive hamburger drawers, backdrop overlays, and scroll-to-top widgets.
2.  **Reusable WhatsApp Booking Modal:** Injected at the bottom of every page. Leverages a custom Vanilla JS state manager that compiles user-entered fields (Name, Mobile, Email, Service, Location, Date, Time, and Message) into a perfectly formatted, pre-filled WhatsApp text and opens `wa.me` for instant scheduling.
3.  **Filterable Gallery & Custom Lightbox:** Highly interactive image portfolio supporting smooth category sorting (Termite, Rodent, Fogging, On-Site) with a custom lightbox supporting inline keyboard/button pagination.
4.  **FAQ Accordion & Auto-Play Testimonials:** Fast-toggling animated sections for immediate client reassurance, utilizing advanced CSS transitions for smooth height expansions.
5.  **Offline Inquiry Form:** Lightweight alternative on the contact page, showing a visually pleasing checkmark confirmation panel on submit without routing to WhatsApp.
6.  **SEO & Performance Optimization:** Cleansemantic HTML, preloaded Font Awesome CDNs, Open Graph metadata configurations, custom meta descriptions, and absolute zero dependency weights.

---

## Deployment on GitHub Pages

Since the codebase contains only standard static assets, it can be deployed to GitHub Pages within minutes:

1.  Initialize a Git repository inside this root folder:
    ```bash
    git init
    ```
2.  Add all files and commit your changes:
    ```bash
    git add .
    git commit -m "Initial commit of Greenline Pest Control website"
    ```
3.  Create a new repository on your **GitHub account** (e.g., `greenline-pest-control`).
4.  Link your local repository to the remote and push your code:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
    git branch -M main
    git push -u origin main
    ```
5.  On GitHub, go to your repository's **Settings** tab.
6.  Select **Pages** from the sidebar menu.
7.  Under **Build and deployment**, select **Deploy from a branch**, choose `main` (and `/root` folder), and click **Save**.
8.  Your site will be live at `https://YOUR_USERNAME.github.io/REPOSITORY_NAME/` within seconds!

---

## Clinical Safety Disclaimer

All chemical treatments referenced throughout this portal adhere to the central regulatory guidelines of Maharashtra and the Central Insecticides Board. All active products applied on-site are child-safe, pet-safe, and odor-free biological formulations.
