# Changelog

All notable changes to the **Validation News Magzine Theme** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.4.0] - 2026-11-16

### 100% Standalone Zero-CDN Architecture & "no-items" Widget Rendering Resolution
- **100% Standalone Zero-CDN Architecture (Zero External Network Dependencies):**
  - Completely stripped all external jsDelivr CDN stylesheet `<link>` and script `<script>` tags from the template.
  - All CSS stylesheets (`core.css`, `components.css`, `post.css`) are 100% inlined directly into `<b:skin><![CDATA[ ... ]]></b:skin>`.
  - All JavaScript controllers (`core.js`, `magazine-feeds.js`, `article-tools.js`) are 100% inlined directly into `<script type='text/javascript'>//<![CDATA[ ... //]]></script>` at the base of `<body>`.
  - The theme XML file (`validation-news-magzine.xml` and `news-magazine-theme.xml`) is now completely self-contained, working instantly offline or behind restrictive firewalls/adblockers with zero external asset latency.

- **Root Cause Fix for Empty Content & "no-items section" in Blogger Layout & Live Views:**
  - **Raw Comments Stripped from `<b:section>`:** Removed all raw HTML comments (`<!-- Widget 1... -->`, etc.) placed directly inside `<b:section id='sidebar'>`. In Blogger Layout v3 DTD schema, raw comment nodes between widgets inside `<b:section>` cause the parser to drop child `<b:widget>` elements, leading to empty sections.
  - **Restored Widget `<b:includable id='body'>`:** Replaced the global `<b:includable id='body'>` override in `<b:defaultmarkups>` with `<b:includable id='globalNewsHelper'>`. Overriding `id='body'` in `<b:defaultmarkup type='Common'>` had previously replaced native widget bodies with empty comments across Blogger's runtime.
  - **Eliminated Duplicate HTML/XML IDs:** Resolved duplicate identifiers where `<header id='masthead'>` collided with `<b:section id='masthead'>`, `<div id='trending-bar'>` collided with `<b:section id='trending-bar'>`, and `<div id='comments'>` collided with `<b:includable id='comments'>`. Renamed wrappers to `#site-masthead`, `#site-trending-bar`, and `#comments-section`.
  - **Standardized Section Permissions:** Updated `showaddelement` from `'yes'` to `'true'` (standard boolean literal in Blogger Layout v3 specification).
  - **Removed Restrictive Widget Caps:** Removed `maxwidgets='1'` from `masthead` and `main` sections, preventing Blogger's Layout engine from locking or hiding gadgets.

- **Defensive Image Resizing & Post Dispatcher Hardening:**
  - Hardened thumbnail rendering in `featuredLeadPost`, `postCard`, and `singlePost` with safe `data:post.featuredImage.isResizable ? resizeImage(...) : data:post.featuredImage` guards, preventing template evaluation failures on external or non-resizable images.
  - Streamlined `Blog1`'s `main` view dispatcher into clear `data:view.isSingleItem` (Post/Page) vs `b:else` (Multiple items: Homepage, Archive, Search, Label, Index) so posts render unconditionally under all views and mobile redirects.
  - Hardened pre-rendered editorial fallback content in Left Rail (`HTML1`), Breaking News (`HTML0`), Sidebar (`PopularPosts1`, `Label2`, `HTML3`, `HTML4`), Category Blocks (`HTML5`, `HTML6`), and Footer to ensure rich visual rendering immediately even without client-side JavaScript execution.

---

## [1.3.0] - 2026-11-16

### Reference Engine Integration & Native Widget Pattern Hardening
- **Reference Template Architecture Adoption (`reference-templates/1.xml`):**
  - Aligned root `<html>` attributes with production specifications: added `b:templateUrl='indie.xml'`, `b:templateVersion='1.3.0'`, and `expr:lang='data:blog.locale.language'`.
  - Injected complete native `<b:widget-settings>` across all 18 widgets including `Label1`, `Label2`, `Label3` (`sorting: ALPHA`, `display: LIST`, `showType: ALL`), `HTML0`, `HTML1`, `HTML3`, `HTML4`, `HTML5`, `HTML6`, `HTML7` (`content`), `Header1` (`sectionWidth: 1200`), `PageList1` (`pageListJson`, `homeTitle`), `Blog1`, and `PopularPosts1` (`numItemsToShow: 5`, `timeRange: ALL_TIME`).
  - Strengthened `<b:template-skin>` wireframe for `body#layout` to mirror the verified layout container styles in `reference-templates/1.xml`, ensuring active Edit pencil icons and "+ Add a Gadget" buttons across all 13 sections.

- **Primary Navigation & Desk Expansion:**
  - Expanded `PageList1` fallback navigation links to 10 canonical editorial desks: Home, India, World, Politics, Business, Technology, Education, Entertainment, Sports, and Maharashtra.
  - Mirrored full 10-desk directory inside mobile slide-over navigation drawer alongside red Live coverage beacon.

- **Ranked Most Read Dispatches (`01`, `02`, `03`...):**
  - Formatted popular posts ranking with CSS counter decimal-leading-zero and `<b:eval>` formatting, styling numerals in prominent bold editorial red.

- **Comprehensive Social Sharing & Post Enhancements:**
  - Verified dynamic share bar (WhatsApp, X, Facebook, Telegram, Copy Link) with clean SVG iconography.
  - Verified `rel='tag'` on post label links and Schema.org `BreadcrumbList` breadcrumbs.
  - Implemented responsive Blogger comment form iframe within `commentPicker`.

---

## [1.2.1] - 2026-11-16

### Critical Bug Fixes & Native Widget Restoration
- **Resolved Theme Restore Widget Stripping (All 18 Widgets Restored):**
  - Explicitly added `version='2' visible='true'` to all `<b:widget>` definitions across the theme (`LinkList1`, `Header1`, `PageList1`, `Label1`, `HTML0`, `HTML1`, `Blog1`, `HTML2`, `PopularPosts1`, `Label2`, `HTML3`, `HTML4`, `HTML5`, `HTML6`, `Text1`, `Label3`, `LinkList3`, `HTML7`).
  - Added complete, official `<b:widget-settings>` to `Header1`, `PageList1`, `Blog1`, `PopularPosts1`, and `HTML` widgets, preventing Blogger's Layout engine from dropping gadgets during **Theme → Restore**.
  - Aligned section IDs with standard Blogger conventions (`id='masthead'`, `id='primary-nav'`, `id='trending-bar'`, `id='breaking-bar'`, `id='left-rail'`, `id='main'`, `id='sidebar'`, `id='home-category-blocks'`, `id='footer-brand'`, `id='footer-categories'`, `id='footer-links'`, `id='footer-newsletter'`).

- **Blogger Expression Syntax Fix (`.any` Property Removal):**
  - Replaced invalid `.any` property checks (`data:posts.any`, `data:links.any`, `data:labels.any`, `data:post.labels.any`) with canonical Blogger boolean conditions (`!data:posts.empty`, `data:links`, `data:labels`, `data:post.labels`). This resolves the blank page issue where posts, links, and tags failed to evaluate and render.

- **Blogger Layout Wireframe Grid (`<b:template-skin>` Upgrade):**
  - Upgraded `body#layout` CSS in `<b:template-skin>` to strictly enforce the newsroom layout: full-width Top Bar, Masthead, Nav, Trending Strip, and Breaking News Bar; 3-column asymmetric layout (`[Left Rail 25% | Center Main 50% | Right Sidebar 25%]`); and 4-column footer (`25%` each), ensuring gadget cards render clearly with functional Edit controls.

- **Resilient Multi-Tier Feed Fallback in `magazine-feeds.js`:**
  - Fixed JavaScript syntax error (unexpected token `}`) at the end of `magazine-feeds.js`.
  - Implemented automatic two-tier fallback: Breaking News ticker, Left Rail ("Fast Dispatches"), Related Posts, and Category Blocks now query the primary label first; if empty or failing, they immediately query `/feeds/posts/default?alt=json&max-results=6` so fresh blogs populate with real posts out of the box.
  - Inlined critical fallback CSS and JS directly in `dist/validation-news-magzine.xml` to eliminate reliance on external CDN cache delays.

---

## [1.2.0] - 2026-11-15

### Architectural Standards & Official Documentation Compliance
- **Strict Compliance with Official `basic-blogger-template.readthedocs.io`:**
  - **Open Graph Protocol Namespace:** Added `xmlns:og='http://ogp.me/ns#'` to the root `<html>` element alongside official Blogger namespaces (`xmlns:b`, `xmlns:data`, `xmlns:expr`).
  - **Blogger Theme Designer `<Variable>` Definitions:** Injected complete `<Variable>` and `<Group>` definitions inside `<b:skin><![CDATA[ ... ]]></b:skin>`. Enables real-time visual color and typography customization in **Blogger → Theme → Customize** (Key Color, Page Background, Subtle Gray, Ad Background, Ink Headlines, Body Text, Muted Metadata, Hairlines, Red Accent, Blue Links, and Typography font stacks).
  - **HTML5 Microdata Schema on Structural Landmarks:** Implemented semantic Microdata schema attributes across page landmarks (complementing JSON-LD schema):
    - `<body itemscope='itemscope' itemtype='http://schema.org/WebPage'>`
    - `<header id='masthead' itemscope='itemscope' itemtype='http://schema.org/WPHeader'>`
    - `<nav id='primary-nav-sticky' itemscope='itemscope' itemtype='http://schema.org/SiteNavigationElement' role='navigation'>`
    - `<main id='main-content' itemscope='itemscope' itemtype='http://schema.org/Blog' role='main'>`
    - `<aside id='site-sidebar' itemscope='itemscope' itemtype='http://schema.org/WPSideBar' role='complementary'>`
    - `<footer id='site-footer' itemscope='itemscope' itemtype='http://schema.org/WPFooter'>`

- **Full Multi-Context Architecture in `Blog1` (15 Modular Includables):**
  - Refactored `Blog1` into 15 cleanly decoupled, self-contained `<b:includable>` blocks:
    1. `main`: Root view dispatcher routing to specific contexts based on `data:view` properties.
    2. `archiveHeader`: Dedicated hero banner for topic desks (`<data:view.search.label/>`), search queries (`<data:view.search.query/>`), and chronological archives (`<data:view.archive.rangeMessage/>`).
    3. `featuredLeadPost`: Homepage lead cover story (`i == 0`) with prominent serif headline, 16:9 hero photo (`resizeImage(data:post.featuredImage, 900, "16:9")`), and metadata.
    4. `postCard`: Standard horizontal news card for editorial streams and archive grids with 3:2 lazy-loaded thumbnails (`resizeImage(data:post.featuredImage, 360, "3:2")`).
    5. `singlePost`: Full newspaper article reader with breadcrumbs, byline bar, reading tools, social share strip, hero figure, auto-generated Table of Contents, formatted body, author bio, related dispatches, and threaded comments.
    6. `staticPage`: Clean distraction-free static page layout.
    7. `postBreadcrumbs`: Visible hierarchical breadcrumbs (`Home > Desk > Title`).
    8. `postMeta`: Standardized byline author name and published/updated ISO-8601 timestamps.
    9. `postLabels`: Clickable category and tag badges with `rel='tag'`.
    10. `postShare`: Social sharing strip (WhatsApp, X, Facebook, Telegram, and Copy Link).
    11. `authorBox`: Author biography box with photo avatar, author name, profile URL, and bio description.
    12. `postPagination`: Newer and Older dispatches navigation buttons.
    13. `threadedComments`: Native Blogger threaded comments with comment count badge.
    14. `emptyState`: Newsroom empty-state card with search form and return home link.
    15. `error404`: 404 Page Not Found error card with search refine form.
    - Added compatibility aliases `post`, `comments`, and `commentPicker` to prevent unresolvable include warnings in third-party Blogger tools.

- **Native `<b:class>` for Active Navigation States:**
  - Implemented `<b:class cond='data:link.isCurrentPage' name='active'/>` across `PageList1` (Category Navigation), `LinkList1` (Top Bar Quick Links), `LinkList2` (Trending Topics Bar), and `LinkList3` (Footer Editorial Policies).

- **Dynamic Feed Loader Enhancements (`assets/js/magazine-feeds.js`):**
  - Updated Breaking News Ticker selector to support both `breaking-ticker-track` and `breaking-ticker-content`.
  - Added dual support for `data-label` and `data-ticker-label` / `data-rail-label` / `data-block-label` so users can configure feeds using simple `data-label` in the Layout editor.

- **Expanded 15-Gate Automated XML & Blogger Audit Suite (`scripts/validate-xml.js`):**
  - Upgraded test harness from 13 to 15 strict checks:
    - **Check 10:** Validates presence of all 15 modular includables in `Blog1`.
    - **Check 14:** Validates Blogger Theme Designer `<Variable>` and `<Group>` definitions in `<b:skin>`.
    - **Check 15:** Validates HTML5 Microdata Schema markup across all structural landmarks.
  - Bumped version to `1.2.0` across `package.json`, build scripts, test suites, and jsDelivr CDN endpoints.

---

## [1.1.0] - 2026-11-15

### Major Architectural Upgrades & Full Production Readiness
- **Blogger Layout Editor Wireframe (`<b:template-skin>`):**
  - **Dedicated `body#layout` CSS Wireframe:** Injected a comprehensive `<b:template-skin>` block directly following `<b:skin>`. Because `b:css='false'` strips default Blogger wireframe CSS bundles, the Blogger Layout canvas (`body#layout`) previously rendered sections squished side-by-side with no structural boundaries.
  - **Exact Visual Blueprint:** Styled `body#layout` to mirror the actual live newspaper grid:
    - Row 1: Full-width Top Bar (`#top-bar-section`)
    - Row 2: Centered Masthead Header (`#header-section`)
    - Row 3: Navigation Bar (`#nav-section`)
    - Row 4: Trending and Breaking News Bars (`#trending-section`, `#breaking-section`)
    - Row 5: 3-Column Magazine Grid (`[Left Rail 25% | Main Editorial 50% | Right Sidebar 25%]`)
    - Row 6: Homepage Modular Category Blocks (`#category-blocks-section`)
    - Row 7: 4-Column Footer Grid (`#footer-brand`, `#footer-categories`, `#footer-links`, `#footer-newsletter`)
  - **Section Badging & Edit Controls:** Added distinct dashed boundaries, uppercase section headers (`::before` with `content: attr(name)`), gadget card container styling, and hover states.
  - **Suppressed Frontend Overlays in Editor:** Hidden interactive runtime elements (`.theme-toggle-btn`, `#reading-progress-bar`, `.search-modal-backdrop`, `.mobile-drawer-backdrop`, etc.) in the layout dashboard so the drag-and-drop canvas is clean and functional.

- **Native v2 `<b:includable id='main'>` for All 18 Widgets:**
  - Standardized every widget across all 13 sections to implement an explicit, valid `<b:includable id='main'>` using official Blogger v2 expressions:
    - `LinkList1` (Top Bar Quick Links)
    - `Header1` (Newspaper Masthead)
    - `PageList1` (Category Navigation)
    - `LinkList2` (Trending Topics Bar)
    - `HTML0` (Breaking News Bar)
    - `HTML1` (Left Rail Fast Dispatches & Briefs)
    - `Blog1` (Main Editorial Feed, Archives, Single Post & Comments)
    - `HTML2` (Top Sidebar Zero-CLS Ad Unit)
    - `PopularPosts1` (Most Read Dispatches with Counter Ranks)
    - `Label1` (Topic Exploration Cloud)
    - `HTML3` (Video & Multimedia Showcase)
    - `HTML4` (Morning Newsletter Dispatch Box)
    - `HTML5` (Homepage Modular Category Block A)
    - `HTML6` (Homepage Modular Category Block B)
    - `Text1` (Footer About & Mission)
    - `Label2` (Footer News Desks)
    - `LinkList3` (Footer Editorial & Legal Policies)
    - `HTML7` (Footer RSS/Atom Syndication Links)
  - Every widget now displays full Edit controls (pencil icons) in **Blogger → Layout**, and widgets display gracefully with real blog data or robust editorial fallbacks.

- **High-Authority Editorial Upgrade (Times of India / NYT Inspiration):**
  - **Refined Color Palette:** High-contrast ink typography (`--text-ink: #171717;`), pure white surface (`--bg-page: #FFFFFF;`), editorial crimson accent (`--accent-red: #C90016;`), subtle gray background (`--bg-subtle: #F7F7F7;`), and crisp hairline borders (`--border-hairline: #E5E5E5;`).
  - **Breaking News Marquee Ticker:** Added `#breaking-news-bar` with CSS-powered horizontal marquee animation, pulsing live red indicator dot, pause-on-hover, and auto-hide if feed has no items.
  - **Left Rail Dynamic Briefs:** Implemented dynamic feed loader for the left column (`data-rail-label='Briefs'`) with automatic fallback to latest posts, kicker tags, and timestamp badges.
  - **Homepage Category Blocks:** Implemented modular full-width category sections (`data-block-label`) below the main grid.
  - **Single Post Reading Suite:**
    - Real-time Reading Progress Bar fixed to the top of the viewport (`#reading-progress-bar`).
    - Font size switcher (`A- / A / A+`) dynamically adjusting article base font size (`16px`, `18px`, `20px`).
    - Dedicated print button triggering `window.print()` with a complete print stylesheet (`@media print`) hiding header, navigation, ads, sidebars, and footer.
    - Collapsible Table of Contents automatically indexed from article `h2` and `h3` tags.
    - Author Bio Card with author photo avatar, display name, profile link, and editorial biography.
    - Complete social share suite: WhatsApp, X (Twitter), Facebook, Telegram, and Copy Link with notification tooltip.

- **Automated Validation Suite Expansion (13 Strict Checks):**
  - Upgraded test harness in `scripts/validate-xml.js` from 11 to 13 automated checks:
    - **Check 12:** Verifies `<b:template-skin>` presence and `body#layout` wireframe styling.
    - **Check 13:** Verifies all 18 widgets implement native `<b:includable id='main'>`.
  - Bumped version to `1.1.0` across `package.json`, build scripts, test suites, and jsDelivr CDN endpoints.

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
