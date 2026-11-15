# Widget Configuration & Layout Customization Guide (v1.3.0)

The **Validation News Magzine Theme** exposes 13 distinct layout sections directly within the **Blogger → Layout** visual dashboard, styled into a clean wireframe via `<b:template-skin>`.

---

## 1. Multi-Tier Header Widgets

### A. Top Utility Quick Links (`LinkList1`)
- **Location:** `#top-bar-links` (`Top Bar Quick Links`)
- **Purpose:** Fast external or internal editorial links (e.g. Social handles, RSS syndication).
- **Setup:**
  1. Go to **Layout → Top Bar Quick Links**.
  2. Add items such as `X / Twitter` (`https://twitter.com/...`) and `RSS Feed` (`/feeds/posts/default`).

### B. Centered Masthead (`Header1`)
- **Location:** `#masthead-section` (`Masthead Header`)
- **Setup:**
  - Enter your publication name as the Blog Title (renders in `'Playfair Display'` serif).
  - Optionally upload a transparent PNG/SVG logo (recommended height: `60px–80px`).

### C. Primary Category Navigation (`PageList1`)
- **Location:** `#nav-section` (`Category Navigation`)
- **Setup:**
  - Click the pencil icon on **Category Navigation**.
  - Add your main news desks pointing to Blogger labels:
    - `World` ➔ `/search/label/World`
    - `Business` ➔ `/search/label/Business`
    - `Tech` ➔ `/search/label/Tech`
    - `Sports` ➔ `/search/label/Sports`
    - `Health` ➔ `/search/label/Health`
    - `Opinion` ➔ `/search/label/Opinion`

### D. Trending "In The News" Sub-Bar (`LinkList2`)
- **Location:** `#trending-section` (`Trending Bar Topics`)
- **Setup:**
  - Add currently trending keywords or event tags (e.g. `Global Economy`, `AI Revolution`, `Climate Summit`, `Elections`).
  - Set each target URL to `/search/label/<Tag>`.

### E. Breaking News Marquee Ticker (`HTML0`)
- **Location:** `#breaking-section` (`Breaking News Live Ticker`)
- **Setup:**
  - Displays an animated ticker with red live pulse dot and pause-on-hover.
  - To load dynamic breaking news, add `data-ticker-label="breaking-news"` (or any label) to the container. If no label matches, it automatically pulls the latest published posts.

---

## 2. Homepage 3-Column Magazine Layout

### A. Left Rail: Breaking News & Fast Briefs (`HTML1`)
- **Location:** `#left-rail` (`Left Rail Breaking Briefs`)
- **Setup:**
  - **Static Curation:** Edit `HTML1` to write custom newsroom dispatches with thumbnail and category kickers.
  - **Dynamic Feed Hydration:** Set `data-rail-label="Briefs"` (or any label name) to automatically stream the latest 5 dispatches tagged with that label via the Blogger JSON Feed API.

### B. Center Editorial Feed (`Blog1`)
- **Location:** `#main-editorial` (`Main Editorial Content`)
- **Lead Cover Story:** The first post (`i == 0`) automatically becomes the high-impact lead story with large serif headline, subheadline deck, and prominent `16:9` hero photo.
- **Horizontal Split Cards:** Posts `i > 0` render as split news cards with headline/snippet on the left and thumbnail on the right.
- **Single Article View:** Automatically handles Reading Progress Bar, Font Size switcher (`A- / A / A+`), Print button, Auto Table of Contents, Author Bio Card, Social Share bar (WhatsApp, X, FB, Telegram, Copy Link), and native threaded comments.

### C. Right Sidebar Widgets (`#right-sidebar`)
1. **300x250 CLS-Safe Ad Box (`HTML2`):**
   - Pre-styled with exact `300x250` dimensions. Replace the mock placeholder with your Google AdSense responsive snippet:
     ```html
     <ins class="adsbygoogle"
          style="display:inline-block;width:300px;height:250px"
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"></ins>
     <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
     ```
2. **Most Read / Trending Dispatches (`PopularPosts1`):**
   - Configured with `timeRange: ALL_TIME` and `numItemsToShow: 5`.
   - Uses pure CSS counters (`counter(popular-rank, decimal-leading-zero)`) to display `01`, `02`, `03`, `04`, `05` rankings.
3. **Explore Topics Cloud (`Label1`):**
   - Renders a clean cloud list of all publication tags with post counts.
4. **Featured Videos Showcase (`HTML3`):**
   - Features a video thumbnail with red play button overlay. Replace with embedded YouTube iframe or custom link.
5. **The Morning Dispatch Newsletter (`HTML4`):**
   - Ready to wire to Substack, Mailchimp, or Buttondown newsletter endpoints.

---

## 3. Below-the-Fold Modular Blocks (`HTML5`, `HTML6`)
- **Location:** `#category-blocks-section` (`Homepage Modular Category Blocks`)
- Renders full-width 4-card editorial sections (e.g. *World News*, *Business & Markets*).
- To hydrate dynamically from any label, set `data-block-label="World"` or `data-block-label="Business"` on the container.

---

## 4. 4-Column Editorial Footer Architecture
1. **Footer Brand & Mission (`Text1`):** Mission statement and editorial independence notice.
2. **Footer News Desks (`Label2`):** Complete directory of news desks and categories.
3. **Footer Editorial & Legal Policies (`LinkList3`):** Editorial standards, ethics policy, privacy policy, and terms.
4. **Footer Syndication & Feeds (`HTML7`):** Direct Atom/RSS syndication endpoints for wire services and aggregators.
