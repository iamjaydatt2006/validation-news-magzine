# Validation News Magzine Theme

[![Version](https://img.shields.io/badge/version-v1.0.0-D9232E.svg?style=flat-square)](https://github.com/iamjaydatt2006/validation-news-magzine/releases/tag/v1.0.0)
[![Blogger Engine](https://img.shields.io/badge/Blogger-Layout_v3_%7C_Widget_v2-111111.svg?style=flat-square&logo=blogger)](https://www.blogger.com)
[![XML Validation](https://img.shields.io/badge/XML%20Validation-100%25%20Passing-22C55E.svg?style=flat-square)](https://github.com/iamjaydatt2006/validation-news-magzine/actions)
[![jsDelivr CDN](https://img.shields.io/badge/jsDelivr-v1.0.0%20CDN-E84393.svg?style=flat-square&logo=jsdelivr)](https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.0.0/)
[![License: MIT](https://img.shields.io/badge/License-MIT-1D4ED8.svg?style=flat-square)](LICENSE)

> **Validation News Magzine Theme** is a high-authority, SEO-optimized, editorial digital newspaper template architected strictly for Google Blogger (Blogspot) using **Layout v3** (`b:layoutsVersion='3'`) and **Widget v2** (`b:defaultwidgetversion='2'`).

Modeled directly after the high-density editorial architecture of global publication portals (such as *The Times of India* and *The New York Times*), it features an authoritative 4-tier header, an asymmetric 3-column magazine grid, zero-CLS advertisement containers, dynamic JSON Feed API widgets, auto Table of Contents, and complete schema structured data.

---

## Architecture & Feature Highlights

| Domain | Architectural Features |
| :--- | :--- |
| **Editorial UI/UX** | High-contrast newsroom color tokens (`#111111` ink on `#FFFFFF`), red breaking news accent (`#D9232E`), `'Playfair Display'` serif masthead and headlines paired with clean `'Inter'` body copy. Built-in persistent Dark/Light mode (`localStorage` + system sync). |
| **Header System** | 4-tier header including Top Utility bar (live formatted date, edition flag, quick links, theme toggle), Centered Masthead, Sticky Primary Navigation (with pulsing red `LIVE` badge and search trigger), and "In The News" trending topics strip. |
| **Homepage Grid** | 12-column asymmetric grid (`1280px` max-width): Left Rail (25%) fast dispatches, Center Feed (50%) high-impact lead cover story + horizontal split cards, and Right Sidebar (25%) with 300x250 ad container, counter-ranked Most Read list (`01`–`05`), and featured videos. |
| **Article Experience** | Focused `740px` reading container, visible breadcrumbs, auto-generated collapsible Table of Contents, Reading Time calculation, inline social share strip, dynamic Related Coverage via Blogger JSON Feed API, and styled threaded comments. |
| **Technical SEO** | Omission of legacy `<b:include data='blog' name='all-head-content'/>` to eliminate duplicate OG tags. Dynamic canonical URLs, meta descriptions, robots control (`noindex,follow` on search/archive), Open Graph `1200x630` `resizeImage()`, and Twitter Large Image cards. |
| **JSON-LD Schema** | Comprehensive `.jsonEscaped` structured data: `NewsMediaOrganization` & `WebSite` with `SearchAction` on homepage, `NewsArticle` on post dispatches, and `BreadcrumbList` on taxonomies. |
| **Performance** | Hybrid delivery: inline critical above-the-fold layout styles inside `<b:skin>`, modular non-blocking CSS & deferred ES6+ scripts delivered globally via **jsDelivr CDN**, plus full offline preview fallback. |

---

## Quick-Start Installation

### Option 1: Instant 1-Click Upload (Recommended)
1. Download or clone this repository.
2. In your **[Blogger Dashboard](https://www.blogger.com)**, navigate to **Theme**.
3. Click the dropdown arrow next to **Customize** and select **Restore**.
4. Upload the compiled standalone theme file:
   ```text
   dist/validation-news-magzine.xml
   ```
5. In **Mobile settings**, choose **Desktop** to allow the modern CSS grid to serve all screen sizes natively.

### Option 2: jsDelivr CDN Modular Delivery
The template links production assets directly from jsDelivr's global multi-CDN network:

```html
<!-- Stylesheets -->
<link href='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.0.0/assets/css/components.css' rel='stylesheet'/>
<link href='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.0.0/assets/css/post.css' rel='stylesheet'/>

<!-- Deferred Scripts -->
<script defer='defer' src='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.0.0/assets/js/core.js'></script>
<script defer='defer' src='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.0.0/assets/js/magazine-feeds.js'></script>
<script defer='defer' src='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.0.0/assets/js/article-tools.js'></script>
```

---

## Repository Structure

```text
validation-news-magzine/
├── .github/
│   ├── workflows/
│   │   └── validate-theme.yml       # Automated GitHub Actions CI workflow
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
├── assets/
│   ├── css/
│   │   ├── core.css                 # Tokens, reset, typography, grid scaffolding
│   │   ├── components.css           # Header, masthead, 3-col grid, cards, sidebar
│   │   └── post.css                 # Single article view, TOC, comments, archives
│   ├── js/
│   │   ├── core.js                  # Sticky nav, drawer menu, search modal, dark mode
│   │   ├── magazine-feeds.js        # Blogger JSON Feed API loader (Left rail, related)
│   │   └── article-tools.js         # Auto TOC, reading time, clipboard share
│   └── img/
│       ├── fallback-thumb.svg       # Editorial visual dispatch placeholder
│       └── logo-default.svg         # Masthead SVG logo
├── dist/
│   └── validation-news-magzine.xml  # Standalone compiled Blogger XML template
├── scripts/
│   ├── build-xml.js                 # Compiler script
│   └── validate-xml.js              # Strict Blogger v3 XML, CDATA, and JSON-LD auditor
├── docs/
│   ├── INSTALLATION.md              # Detailed installation walkthrough
│   ├── WIDGET-CONFIG.md             # Layout tab widget configuration guide
│   └── SEO-SCHEMA.md                # Schema.org JSON-LD documentation
├── package.json
├── CHANGELOG.md                     # Semantic version history
├── LICENSE                          # MIT License
└── README.md
```

---

## Local Development & Validation

Verify all assets and XML rules locally using Node.js:

```bash
# Clone the repository
git clone https://github.com/iamjaydatt2006/validation-news-magzine.git
cd validation-news-magzine

# Lint JavaScript syntax
npm run lint

# Compile the standalone XML theme
npm run build

# Run the strict XML & schema validation suite
npm run validate

# Execute full test harness
npm test
```

### Validation Suite Checks
The test runner executes 8 strict validation gates:
1. **W3C XML Parsing:** 100% well-formedness.
2. **Blogger Layout Attributes:** Validates `b:layoutsVersion='3'`, `b:defaultwidgetversion='2'`, `b:css='false'`, and `b:responsive='true'`.
3. **Section Hierarchy:** Confirms all 11 `<b:section>` elements contain only valid `<b:widget>` children.
4. **PopularPosts Settings:** Enforces valid `timeRange: ALL_TIME` (guaranteeing zero Blogger parser rejections).
5. **JSON-LD Syntax:** Parses all structured data blocks to ensure zero trailing commas.
6. **Ampersand Escaping:** Ensures 100% of ampersands outside CDATA blocks are escaped as `&amp;`.
7. **XHTML Self-Closing Tags:** Verifies `<meta/>`, `<link/>`, `<img/>`, and `<input/>` self-close properly.
8. **jsDelivr CDN Integrity:** Verifies all referenced CDN URLs map directly to existing files in `assets/`.

---

## Documentation

- [Installation Walkthrough](docs/INSTALLATION.md)
- [Widget & Layout Configuration](docs/WIDGET-CONFIG.md)
- [SEO & Structured Data Guide](docs/SEO-SCHEMA.md)
- [Release Changelog](CHANGELOG.md)

---

## License

Created by **Jaydatta Khodave**. Released under the [MIT License](LICENSE).
