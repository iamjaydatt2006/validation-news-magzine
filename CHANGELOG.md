# Changelog

All notable changes to the **Validation News Magzine Theme** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.2] - 2026-11-15

### Critical Fixes & Production Hardening
- **Resolved "Blank Widgets / `no-items section`" on Blogger Restore:**
  - **Added `<b:defaultmarkups>` Blueprint:** Injected the mandatory `<b:defaultmarkups>` block directly following `]]></b:skin>`. In Blogger Layout v3 (`b:layoutsVersion='3'`) and Widget v2 (`b:defaultwidgetversion='2'`), omitting `<b:defaultmarkups>` causes the template parser to reject v2 widgets, rendering sections as empty `<div class='no-items section'></div>`.
  - **Added `comments` Includable Contract in `Blog1`:** Created explicit `<b:includable id='comments' var='post'>` containing native Blogger comment thread rendering and comment count badge. Calling `<b:include data='post' name='comments'/>` without a defined includable previously triggered an unhandled compiler abort in the Blogger engine.
  - **Modular `post` Includable in `Blog1`:** Isolated single article rendering into `<b:includable id='post' var='post'>` and dispatched it via `<b:include data='post' name='post'/>` from `<b:includable id='main'>`, following official Blogger reference architecture.
- **Fixed Empty Category Tabs & Trending Links (Truthiness Modifier Fix):**
  - **`data:links.any` & `data:labels.any`:** In Blogger XML, an empty collection (`[]`) evaluates as truthy (`true`) in raw `<b:if cond='data:links'>`. This prevented fallback branches from ever rendering when no custom links were stored in the user's database. Replaced all raw checks with Blogger's native collection modifiers: `<b:if cond='data:links.any'>`, `<b:if cond='data:posts.any'>`, and `<b:if cond='data:labels.any'>`.
  - When `data:links` is unpopulated, navigation now reliably renders default category tabs (`Home`, `World`, `Business`, `Tech`, `Sports`, `Health`, `Opinion`) and trending topics (`Global Economy`, `AI Revolution`, `Climate Summit`, `General Elections`, `Cricket World Cup`).
- **Fixed Blank Masthead Title & Tagline:**
  - Replaced `<data:title/>` in `Header1` with `<b:if cond='data:title'><data:title/><b:else/><data:blog.title/></b:if>`. If the user's blog database has an empty custom title override, the masthead seamlessly falls back to the global publication title `<data:blog.title/>`.
  - Added fallback for tagline: `<b:if cond='data:description'><data:description/><b:elseif cond='data:blog.description'/><data:blog.description/></b:if>`.
- **Restored Section Permissions & Semantic Classes:**
  - Updated all 11 `<b:section>` tags from `showaddelement='no'` to `showaddelement='yes'` with generous `maxwidgets='5'` (and `maxwidgets='10'` for sidebar).
  - Assigned explicit semantic class names to every section (`class='header'`, `class='nav'`, `class='main'`, `class='sidebar'`, `class='footer-brand'`, etc.) so Blogger's Layout UI properly maps gadgets and preserves them across theme switching.
- **Robust Fallbacks for Database Gadgets:**
  - Added `<b:if cond='data:content'><data:content/><b:else/>[Default Markup]</b:if>` across `HTML1` (Left Rail Briefs), `HTML2` (Ad Slot), `HTML3` (Videos), `HTML4` (Newsletter Dispatch), and `HTML5` (Modular Blocks). This ensures that existing empty database gadgets never produce blank columns on the live blog.
  - Added `<b:if cond='data:posts.any'>` check with editorial fallbacks for `PopularPosts1`.
- **CI/CD & Validator Expansion:**
  - Upgraded test harness in `scripts/validate-xml.js` from 8 to 11 automated checks:
    - Check 9: Verifies `<b:defaultmarkups>` container exists.
    - Check 10: Verifies `Blog1` includable contract (`main`, `post`, `comments`).
    - Check 11: Verifies all 11 sections have `showaddelement='yes'` and semantic class attributes.
  - Bumped version to `1.0.2` across `package.json`, build scripts, and jsDelivr CDN endpoints.

---

## [1.0.1] - 2026-11-15

### Fixed
- **Blogger Theme Editor Validation Errors:**
  - Replaced array indexing `<data:post.labels[0].name/>` with Blogger XML `<b:loop values='data:post.labels' index='lblIdx'><b:if cond='data:lblIdx == 0'>`.
  - Corrected `PopularPosts1` setting from invalid `LAST_30_DAYS` to official `ALL_TIME`.
  - Replaced chained ternary expressions in `<title>` with native `<b:if>`, `<b:elseif/>`, `<b:else/>` constructs.
  - Fixed syntax error in `<b:elseif/>` tags to ensure self-closing XML conformance.
  - Fixed `PageList1` widget settings schema by removing non-existent `link-X` keys and utilizing `pageListJson` and `homeTitle`.

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
  - Modular non-blocking CSS and deferred ES6+ scripts delivered via global jsDelivr CDN.
  - Standalone inline fallback system ensuring 100% offline preview capability.
- **CI/CD Quality Control:**
  - Automated GitHub Actions workflow (`.github/workflows/validate-theme.yml`) verifying XML syntax via `xmllint`, Blogger engine linting, and JSON-LD schema parsing.
  - Comprehensive Node.js validator script (`scripts/validate-xml.js`).
