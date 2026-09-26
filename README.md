# The Reflection — static website

A mobile-first, high-performance HTML/CSS/JavaScript website for The Reflection, visually inspired by the supplied editorial wedding reference and re-themed in a deep maroon / antique-gold palette.

## Pages

- `index.html`
- `wedding-photography.html`
- `portfolio-shoot.html`
- `commercial-photography.html`
- `graphics-design.html`
- `event-planning.html`

## Architecture

- `assets/css/styles.css` — shared responsive design system
- `assets/js/config.js` — business/contact configuration
- `assets/js/app.js` — navigation, scroll reveal, FAQ accordion and WhatsApp enquiry logic
- `assets/brand/` — supplied logo and mark source files + optimized web assets
- `assets/images/` — optimized WebP photo variants at 720w and 1400w
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` — crawl / machine-readable discovery
- `site.webmanifest`, `favicon.png` — install / browser branding
- `netlify.toml` — optional static hosting headers for Netlify
- `404.html` — fallback page

## Important domain setting

The final production domain was not supplied in the brief. The package currently uses `https://thereflection.me` as the canonical / sitemap base because it is the domain suggested by the supplied brand/handle. Before production, confirm the real domain and update:

1. `assets/js/config.js`
2. canonical, Open Graph and JSON-LD URLs in the HTML pages
3. `robots.txt`
4. `sitemap.xml`
5. `llms.txt` / `llms-full.txt`
6. `humans.txt`
7. `site.webmanifest`

A simple search-and-replace of `https://thereflection.me` is sufficient.

## WhatsApp enquiry flow

Every quote form validates required fields and opens:

`https://wa.me/919733996764`

with a pre-filled message containing the customer's name, phone, date, city / venue, selected service and enquiry text.

## SEO / GEO / AEO

Each page includes:
- semantic title + description
- canonical URL
- Open Graph + Twitter metadata
- geographic metadata for Debra Bazar / Paschim Medinipur
- JSON-LD business, website, webpage and service data
- FAQPage + BreadcrumbList on service pages
- `robots.txt` + XML sitemap
- `llms.txt` + `llms-full.txt` for machine-readable discovery
- descriptive image `alt` text and responsive WebP assets

The geo coordinates in structured data use publicly listed Debra locality coordinates and should be refined to the business's exact Google Maps pin after the final listing is confirmed.

## Local test

Run:

```bash
python -m http.server 8080
```

Then open:

`http://localhost:8080/`

No build step is required.

## Production note

The content is static by design for speed and crawlability. The enquiry flow deliberately opens WhatsApp instead of posting to a backend.

## Latest responsive QA pass

The latest revision includes responsive layout hardening:

- Removed literal `\\n` tokens from visible HTML copy and restored intentional heading line breaks with `<br>`.
- Fixed the homepage selected-work grid nesting that allowed three cards to escape the grid and become full-width, excessively tall cards.
- Reworked responsive image boxes with stable aspect ratios to prevent oversized cards and height jumps.
- Compact service-card layouts for tablet widths (2 columns at 720–899px, 3 columns at 900–1199px, 5 columns from 1200px).
- Added zero-min grid tracks and overflow wrapping so long headings and labels cannot force layout expansion.
- Corrected hero image sizing to avoid percentage-height sizing cycles inside auto-sized grids.
- Constrained work captions so metadata cannot escape narrow cards.
- Standardized 404 hero sizing with classes instead of inline layout rules.

Automated QA covered all 7 HTML pages at 320×568, 390×844, 768×1024, 1024×768 and 1440×900, including document-width checks, visible-element overflow checks, menu-open containment checks and literal `\\n` scans. All 35 layout cases passed. JavaScript syntax and core navigation/FAQ/WhatsApp form smoke tests also passed.
