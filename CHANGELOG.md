# Changelog

All notable changes to the **Validation News Magzine Theme** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-15

### Added
- **Modern Blogger Layout v3 Engine:** Full migration to `b:layoutsVersion='3'`, `b:defaultwidgetversion='2'`, and `b:css='false'`.
- **4-Tier Header Architecture:**
  - Top utility bar with live JS date/time (`Sun, Nov 15, 2026 | Updated Live`), edition flag, quick links (`LinkList`), and persistent Dark/Light mode toggle.
  - Centered editorial masthead with `'Playfair Display'` serif typography.
  - Sticky primary navigation bar with `PageList` categories, pulsing red `LIVE` coverage indicator, search overlay trigger, and mobile drawer toggle.
  - Trending "In The News" sub-strip with rapid topic discovery links (`LinkList`).
- **Homepage 3-Column Asymmetric Magazine Grid (1280px max-width):**
  - Left Rail (25%): Fast breaking news & briefs stack with category kickers and hairline dividers.
  - Center Lead & Stream (50%): Lead cover story (`data:i == 0`) with `16:9` hero photo and subheadline deck, followed by horizontal split cards.
  - Right Sidebar (25%): Zero-CLS 300x250 advertisement box, Most Read dispatches with CSS counter ranks (`01`–`05`), featured video showcase with play badges, and morning newsletter subscription dispatch box.
- **Single Article View (`data:view.isPost`):**
  - High-authority typography (`17–18px`, `1.78` line-height).
  - Visible HTML breadcrumbs (`Home > Desk > Title`).
  - Auto-generated collapsible Table of Contents from H2/H3 headings.
  - Reading time estimator (`X min read`).
  - Social sharing triggers (X/Twitter, Facebook, WhatsApp, Copy Link).
  - Dynamic Related Coverage powered by Blogger JSON Feed API.
  - Styled native threaded Blogger comments.
- **Technical SEO & JSON-LD:**
  - `NewsMediaOrganization` and `WebSite` structured data with `SearchAction`.
  - `NewsArticle` schema on single post pages.
  - `BreadcrumbList` schema on articles and label archives.
  - Dynamic Open Graph `1200x630` tags with `resizeImage()` and Twitter `summary_large_image` cards.
  - Clean robots directives (`noindex,follow` on search and archive).
- **Hybrid Performance Delivery (jsDelivr CDN):**
  - Critical above-the-fold layout styles inlined inside `<b:skin>`.
  - Modular non-blocking CSS and deferred ES6+ scripts delivered via global jsDelivr CDN (`@v1.0.0` release).
  - Standalone inline fallback system ensuring 100% offline preview capability.
- **CI/CD Quality Control:**
  - Automated GitHub Actions workflow (`.github/workflows/validate-theme.yml`) verifying XML syntax via `xmllint`, Blogger engine linting, and JSON-LD schema parsing.
  - Comprehensive Node.js validator script (`scripts/validate-xml.js`).
