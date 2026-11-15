# Widget Configuration & Layout Customization Guide

The **Validation News Magzine Theme** exposes 11 distinct layout sections directly within the **Blogger → Layout** visual dashboard.

---

## 1. Multi-Tier Header Widgets

### A. Top Utility Quick Links (`LinkList1`)
- **Location:** `#top-bar-links`
- **Purpose:** Fast external or internal editorial links (e.g. Social handles, RSS syndication).
- **Setup:**
  1. Go to **Layout → Top Bar Quick Links**.
  2. Add items such as `X / Twitter` (`https://twitter.com/...`) and `RSS Feed` (`/feeds/posts/default`).

### B. Centered Masthead (`Header1`)
- **Location:** `#masthead-section`
- **Setup:**
  - Enter your publication name as the Blog Title (renders in `'Playfair Display'` serif).
  - Optionally upload a transparent PNG/SVG logo (recommended height: `60px–80px`).

### C. Primary Category Navigation (`PageList1`)
- **Location:** `#nav-section`
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
- **Location:** `#trending-section`
- **Setup:**
  - Add currently trending keywords or event tags (e.g. `Global Economy`, `AI Revolution`, `Climate Summit`, `Elections`).
  - Set each target URL to `/search/label/<Tag>`.

---

## 2. Homepage 3-Column Magazine Layout

### A. Left Rail: Breaking News & Fast Briefs (`HTML1`)
- **Location:** `#left-rail`
- **Setup:**
  - **Static Curation:** Edit `HTML1` to write custom newsroom dispatches with thumbnail and category kickers.
  - **Automated Label Hydration:** Add `data-rail-label="Briefs"` to the root container inside the widget to automatically query your latest posts tagged with `Briefs`.

### B. Center Feed (`Blog1`)
- **Lead Cover Story:** The first post (`i == 0`) automatically becomes the high-impact lead story with large serif headline, subheadline deck, and prominent `16:9` hero photo.
- **Horizontal Split Cards:** Posts `i > 0` render as split news cards with headline/snippet on the left and thumbnail on the right.

### C. Right Sidebar Widgets
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
3. **Featured Videos Showcase (`HTML3`):**
   - Features a video thumbnail with red play button overlay. Replace with embedded YouTube iframe or custom link.
4. **The Morning Dispatch Newsletter (`HTML4`):**
   - Ready to wire to Substack, Mailchimp, or Buttondown newsletter endpoints.

---

## 3. Below-the-Fold Modular Blocks (`HTML5`)
- **Location:** `#home-category-blocks`
- Renders a 3-column curated desk block (e.g. *Business & Markets*). Additional `HTML` widgets can be dragged here in the Layout tab.

---

## 4. Multi-Column Footer
- **Footer Brand (`Text1`):** Mission statement and editorial independence notice.
- **Footer Categories (`Label1`):** Automatic list of all publication tags.
- **Footer Links (`LinkList3`):** Editorial standards, ethics policy, privacy policy, and terms.
