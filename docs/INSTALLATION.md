# Installation Guide: Validation News Magzine Theme

Step-by-step instructions for uploading and deploying the **Validation News Magzine Theme** to your Google Blogger (Blogspot) site.

---

## 1. Prerequisites

Before installing, back up your current theme:
1. Log in to your **[Blogger Dashboard](https://www.blogger.com/)**.
2. Navigate to **Theme** in the left sidebar.
3. Click the dropdown arrow next to the orange **Customize** button and select **Backup**.
4. Click **Download** to save your current theme `.xml` file locally.

---

## 2. Uploading the Standalone XML Theme

1. In the **Theme** section, click the dropdown arrow next to **Customize** again.
2. Select **Restore**.
3. Click **Upload** and choose the compiled theme file:
   ```text
   dist/validation-news-magzine.xml
   ```
4. Wait 5–10 seconds for Blogger to process and confirm: *"Theme restored"*.

---

## 3. Disabling Default Mobile Overrides

To ensure the modern Layout v3 responsive grid is served to mobile readers:
1. Under **Theme**, click the dropdown arrow next to **Customize**.
2. Select **Mobile settings**.
3. Choose **Desktop** (or *"No, show desktop theme on mobile devices"*).
4. Click **Save**.

The theme contains a fluid CSS grid that natively adapts from 320px phones to 4K monitors without legacy Blogger mobile redirections.

---

## 4. Verifying Front-Page Rendering

Visit your blog URL:
- **Top Utility Bar:** Shows your edition flag and today's live date (`Sun, Nov 15, 2026 | Updated Live`).
- **Centered Masthead:** Displays your publication title in bold serif typography.
- **Primary Sticky Bar:** Highlights top category desks with the red pulsing `LIVE` indicator.
- **3-Column Grid:** Displays the left rail briefs, center lead story with `16:9` hero photo, and the right sidebar widgets.

For customizing widgets, feeds, and ad placements, proceed to [WIDGET-CONFIG.md](WIDGET-CONFIG.md).
