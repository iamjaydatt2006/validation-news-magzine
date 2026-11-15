# Validation News Magzine Theme

[![Version](https://img.shields.io/badge/version-v1.2.0-C90016.svg?style=flat-square)](https://github.com/iamjaydatt2006/validation-news-magzine/releases/tag/v1.2.0)
[![Blogger Engine](https://img.shields.io/badge/Blogger-Layout_v3_%7C_Widget_v2-111111.svg?style=flat-square&logo=blogger)](https://www.blogger.com)
[![XML Validation](https://img.shields.io/badge/XML%20Validation-15%2F15%20Passing%20(100%25)-22C55E.svg?style=flat-square)](https://github.com/iamjaydatt2006/validation-news-magzine/actions)
[![jsDelivr CDN](https://img.shields.io/badge/jsDelivr-v1.2.0%20CDN-E84393.svg?style=flat-square&logo=jsdelivr)](https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.2.0/)
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
<link href='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.2.0/assets/css/components.css' rel='stylesheet'/>
<link href='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.2.0/assets/css/post.css' rel='stylesheet'/>

<!-- Deferred Scripts -->
<script defer='defer' src='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.2.0/assets/js/core.js'></script>
<script defer='defer' src='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.2.0/assets/js/magazine-feeds.js'></script>
<script defer='defer' src='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.2.0/assets/js/article-tools.js'></script>
```

---

## Post-Upload Layout Configuration Checklist

Once you have uploaded `dist/validation-news-magzine.xml` via **Theme → Restore**, visit **Blogger → Layout** to configure your newspaper's gadgets:

1. **Category Navigation (`PageList1`):**
   - Click the pencil icon on **Category Navigation** to add your site's main news desks (e.g. `World`, `Business`, `Tech`, `Sports`, `Health`).
2. **Breaking News Marquee (`HTML0`):**
   - Set the gadget title or content to filter posts by a specific label (default: `breaking-news`).
3. **Left Rail Briefs (`HTML1`):**
   - By default loads fast news briefs from label `Briefs`. To customize, edit the widget content.
4. **Sidebar Top 300x250 Ad (`HTML2`):**
   - Paste your Google AdSense responsive snippet or sponsor banner HTML.
5. **Most Read Dispatches (`PopularPosts1`):**
   - Configured with official `ALL_TIME` setting and counter ranks (`01`–`05`).
6. **Homepage Modular Category Blocks (`HTML5`, `HTML6`):**
   - Configure category headlines like `World News` or `Technology` to load specific 4-card grids.
7. **Footer News Desks & Policies (`Label2`, `LinkList3`):**
   - Point your editorial links to your About, Privacy Policy, and Ethics pages.

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
The test runner executes 15 strict validation gates:
1. **W3C XML Parsing:** 100% well-formedness (0 syntax errors via Python ElementTree / xmllint).
2. **Blogger Layout Attributes:** Validates `b:layoutsVersion='3'`, `b:defaultwidgetversion='2'`, `b:css='false'`, and `b:responsive='true'`.
3. **Section Hierarchy:** Confirms all 13 `<b:section>` elements contain only valid `<b:widget>` children.
4. **PopularPosts Settings:** Enforces valid `timeRange: ALL_TIME` (guaranteeing zero Blogger parser rejections).
5. **PageList Schema:** Enforces valid PageList settings (`pageListJson`, `homeTitle`) with zero invalid setting keys.
6. **JSON-LD Syntax:** Parses all structured data blocks (`Organization`, `WebSite`, `NewsArticle`, `BreadcrumbList`) with zero trailing commas.
7. **Ampersand Escaping:** Ensures 100% of ampersands outside CDATA blocks are escaped as `&amp;`.
8. **XHTML Self-Closing Tags:** Verifies `<meta/>`, `<link/>`, `<img/>`, and `<input/>` self-close properly.
9. **jsDelivr CDN Integrity:** Verifies all referenced v1.2.0 CDN URLs map directly to existing files in `assets/`.
10. **Blogger Layout v3 `<b:defaultmarkups>`:** Verifies presence of the root blueprint container.
11. **Blog1 Modular Architecture:** Verifies presence of all 15 decoupled includables (`main`, `archiveHeader`, `featuredLeadPost`, `postCard`, `singlePost`, `staticPage`, `postBreadcrumbs`, `postMeta`, `postLabels`, `postShare`, `authorBox`, `postPagination`, `threadedComments`, `emptyState`, `error404`).
12. **Section showaddelement Permissions & Classes:** Verifies all 13 sections have `showaddelement="yes"` and semantic class attributes.
13. **Blogger Layout Wireframe (`<b:template-skin>`):** Verifies dedicated `body#layout` CSS wireframe for Blogger Theme Layout dashboard.
14. **Native v2 Widget Includables:** Verifies all 18 widgets implement valid `<b:includable id='main'>`.
15. **Schema.org Microdata & Theme Designer Variables:** Verifies `<Variable>` and `<Group>` definitions in `<b:skin>` and HTML5 Microdata landmarks (`WebPage`, `WPHeader`, `SiteNavigationElement`, `Blog`, `WPSideBar`, `WPFooter`).

---

## Documentation

- [Installation Walkthrough](docs/INSTALLATION.md)
- [Widget & Layout Configuration](docs/WIDGET-CONFIG.md)
- [SEO & Structured Data Guide](docs/SEO-SCHEMA.md)
- [Release Changelog](CHANGELOG.md)

---

## License

Created by **Jaydatta Khodave**. Released under the [MIT License](LICENSE).
