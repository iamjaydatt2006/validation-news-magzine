/**
 * Validation News Magzine Theme - Build Script
 * Compiles the standalone Blogger XML theme with Critical CSS + Layout Wireframe + jsDelivr CDN integration.
 * Adheres strictly to Blogger Layout v3 and Widget v2 specifications.
 * @package ValidationNewsMagzine
 * @version 1.2.0
 * @author Jaydatta Khodave
 * @license MIT
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const OUTPUT_FILE = path.join(DIST_DIR, 'validation-news-magzine.xml');

// Read modular assets to verify they exist
const coreCss = fs.readFileSync(path.join(ROOT_DIR, 'assets/css/core.css'), 'utf-8');
const componentsCss = fs.readFileSync(path.join(ROOT_DIR, 'assets/css/components.css'), 'utf-8');
const postCss = fs.readFileSync(path.join(ROOT_DIR, 'assets/css/post.css'), 'utf-8');
const coreJs = fs.readFileSync(path.join(ROOT_DIR, 'assets/js/core.js'), 'utf-8');
const feedsJs = fs.readFileSync(path.join(ROOT_DIR, 'assets/js/magazine-feeds.js'), 'utf-8');
const toolsJs = fs.readFileSync(path.join(ROOT_DIR, 'assets/js/article-tools.js'), 'utf-8');

console.log('Read all modular assets successfully.');

// Complete unified CSS for standalone fallback inside <b:skin>
const combinedCss = `/* Core Tokens & Reset */\n${coreCss}\n\n/* Components & Grid System */\n${componentsCss}\n\n/* Post & Archive View */\n${postCss}`;

// Combined JS for standalone fallback inside //<![CDATA[
const combinedJs = `// Core Interactions\n${coreJs}\n\n// Magazine Feeds\n${feedsJs}\n\n// Article Tools\n${toolsJs}`;

const layoutSkinCss = `
/* ==================================================================
   BLOGGER LAYOUT DASHBOARD WIREFRAME STYLES (v1.2.0)
   Styles body#layout into a clean visual newspaper wireframe.
   ================================================================== */
body#layout {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #f1f3f5;
  color: #212529;
  margin: 0;
  padding: 24px;
  line-height: 1.5;
}

body#layout .site-wrapper {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0;
}

/* Hide interactive frontend overlays & buttons in layout editor */
body#layout .theme-toggle-btn,
body#layout #mobile-menu-btn,
body#layout #search-modal-trigger,
body#layout .live-pill-btn,
body#layout .search-modal-backdrop,
body#layout .mobile-drawer-backdrop,
body#layout .mobile-drawer-panel,
body#layout #live-datetime,
body#layout .edition-badge,
body#layout .trending-badge,
body#layout .breaking-badge,
body#layout .rail-section-header,
body#layout .footer-bottom-bar,
body#layout #reading-progress-bar,
body#layout .article-share-strip,
body#layout .article-reading-tools {
  display: none !important;
}

/* Layout Section Containers */
body#layout .section {
  background: #ffffff;
  border: 2px dashed #cbd5e1;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 18px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  position: relative;
  transition: border-color 0.15s ease;
}

body#layout .section:hover {
  border-color: #94a3b8;
}

body#layout .section::before {
  content: attr(name);
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid #f1f5f9;
}

/* Gadget Card Styling in Layout Editor */
body#layout .widget {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 12px 14px;
  margin-bottom: 10px;
  display: block;
}

body#layout .widget:hover {
  background: #ffffff;
  border-color: #cbd5e1;
}

/* Top Rows */
body#layout header#top-bar {
  display: block;
  width: 100%;
  margin-bottom: 16px;
}

body#layout div#masthead {
  display: block;
  width: 100%;
  margin-bottom: 16px;
}

body#layout nav#primary-nav-sticky {
  display: block;
  width: 100%;
  margin-bottom: 16px;
}

body#layout div#trending-bar {
  display: block;
  width: 100%;
  margin-bottom: 16px;
}

body#layout #breaking-news-bar {
  display: block !important;
  width: 100%;
  margin-bottom: 20px;
}

body#layout .portal-main-area {
  display: block;
  width: 100%;
  margin-bottom: 24px;
}

/* 3-Column Magazine Grid in Layout Editor */
body#layout .portal-grid-layout {
  display: grid !important;
  grid-template-columns: 280px minmax(0, 1fr) 300px !important;
  gap: 20px !important;
  width: 100% !important;
  align-items: start !important;
}

body#layout .portal-left-rail,
body#layout .portal-center-feed,
body#layout .portal-sidebar {
  display: block !important;
  width: 100% !important;
}

body#layout #home-sections {
  display: block;
  width: 100%;
  margin-bottom: 24px;
}

/* 4-Column Footer Architecture in Layout Editor */
body#layout #site-footer {
  display: block;
  width: 100%;
  padding-top: 24px;
  border-top: 2px solid #e2e8f0;
}

body#layout .footer-top-grid {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 18px !important;
  width: 100% !important;
}
`;

const xmlTemplate = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsVersion='3' b:responsive='true' expr:dir='data:blog.languageDirection' expr:lang='data:blog.locale' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr' xmlns:og='http://ogp.me/ns#'>
<head>
  <meta charset='UTF-8'/>
  <meta content='width=device-width, initial-scale=1.0' name='viewport'/>
  <meta content='IE=edge' http-equiv='X-UA-Compatible'/>

  <!-- Preconnected High-Authority Typography Stack -->
  <link href='https://fonts.googleapis.com' rel='preconnect'/>
  <link crossorigin='anonymous' href='https://fonts.gstatic.com' rel='preconnect'/>
  <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400;1,700&amp;display=swap' rel='stylesheet'/>

  <!-- jsDelivr CDN Modular Non-Blocking Stylesheets (v1.2.0 Release) -->
  <link href='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.2.0/assets/css/components.css' rel='stylesheet'/>
  <link href='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.2.0/assets/css/post.css' rel='stylesheet'/>

  <!-- Dynamic Document Title (Zero b:eval Chaining) -->
  <title>
    <b:if cond='data:view.isHomepage'>
      <data:blog.title/> &#8212; Breaking News, World and Local Newsroom
    <b:elseif cond='data:view.isError'/>
      404: Page Not Found &#8212; <data:blog.title/>
    <b:elseif cond='data:view.isLabelSearch'/>
      <data:view.search.label/> News &#8212; <data:blog.title/>
    <b:elseif cond='data:view.isSearch'/>
      Search: &quot;<data:view.search.query/>&quot; &#8212; <data:blog.title/>
    <b:elseif cond='data:view.isArchive'/>
      Archive: <data:view.archive.rangeMessage/> &#8212; <data:blog.title/>
    <b:else/>
      <data:view.title.escaped/> &#8212; <data:blog.title/>
    </b:if>
  </title>

  <!-- Canonical URL Directive -->
  <link expr:href='data:view.url.canonical' rel='canonical'/>

  <!-- Dynamic Meta Description -->
  <b:if cond='data:view.description'>
    <meta expr:content='data:view.description.escaped' name='description'/>
  <b:else/>
    <meta expr:content='data:blog.title + " &#8212; Comprehensive breaking news, analysis, politics, technology, business, and investigative journalism."' name='description'/>
  </b:if>

  <!-- Robots Crawl Directives -->
  <b:if cond='data:view.isSearch or data:view.isArchive'>
    <meta content='noindex,follow' name='robots'/>
  <b:else/>
    <meta content='index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' name='robots'/>
  </b:if>

  <!-- RSS and Atom Syndication Feeds -->
  <link expr:href='data:blog.homepageUrl.canonical path "feeds/posts/default"' expr:title='data:blog.title + " - Atom"' rel='alternate' type='application/atom+xml'/>
  <link expr:href='data:blog.homepageUrl.canonical path "feeds/posts/default?alt=rss"' expr:title='data:blog.title + " - RSS"' rel='alternate' type='application/rss+xml'/>

  <!-- Open Graph Protocol -->
  <meta expr:content='data:blog.title' property='og:site_name'/>
  <meta expr:content='data:view.url.canonical' property='og:url'/>
  <b:if cond='data:view.isSingleItem'>
    <meta content='article' property='og:type'/>
    <meta expr:content='data:view.title.escaped' property='og:title'/>
  <b:else/>
    <meta content='website' property='og:type'/>
    <meta expr:content='data:blog.title' property='og:title'/>
  </b:if>
  <b:if cond='data:view.description'>
    <meta expr:content='data:view.description.escaped' property='og:description'/>
  <b:else/>
    <meta expr:content='data:blog.title + " &#8212; Real-time news dispatches and editorial commentary."' property='og:description'/>
  </b:if>
  <b:if cond='data:view.featuredImage'>
    <meta expr:content='resizeImage(data:view.featuredImage, 1200, "1200:630")' property='og:image'/>
    <meta content='1200' property='og:image:width'/>
    <meta content='630' property='og:image:height'/>
  <b:else/>
    <meta content='https://resources.blogblog.com/img/blank.gif' property='og:image'/>
  </b:if>

  <!-- Twitter Card Data -->
  <meta content='summary_large_image' name='twitter:card'/>
  <meta expr:content='data:view.title.escaped' name='twitter:title'/>
  <b:if cond='data:view.description'>
    <meta expr:content='data:view.description.escaped' name='twitter:description'/>
  </b:if>
  <b:if cond='data:view.featuredImage'>
    <meta expr:content='resizeImage(data:view.featuredImage, 1200, "1200:630")' name='twitter:image'/>
  </b:if>

  <!-- JSON-LD: NewsMediaOrganization and WebSite Schema (Homepage) -->
  <b:if cond='data:view.isHomepage'>
    <script type='application/ld+json'>
    {
      &quot;@context&quot;: &quot;https://schema.org&quot;,
      &quot;@graph&quot;: [
        {
          &quot;@type&quot;: &quot;NewsMediaOrganization&quot;,
          &quot;@id&quot;: &quot;<data:blog.homepageUrl.canonical/>#organization&quot;,
          &quot;name&quot;: &quot;<data:blog.title.jsonEscaped/>&quot;,
          &quot;url&quot;: &quot;<data:blog.homepageUrl.canonical/>&quot;,
          &quot;logo&quot;: {
            &quot;@type&quot;: &quot;ImageObject&quot;,
            &quot;url&quot;: &quot;https://resources.blogblog.com/img/blank.gif&quot;
          }
        },
        {
          &quot;@type&quot;: &quot;WebSite&quot;,
          &quot;@id&quot;: &quot;<data:blog.homepageUrl.canonical/>#website&quot;,
          &quot;url&quot;: &quot;<data:blog.homepageUrl.canonical/>&quot;,
          &quot;name&quot;: &quot;<data:blog.title.jsonEscaped/>&quot;,
          &quot;publisher&quot;: {
            &quot;@id&quot;: &quot;<data:blog.homepageUrl.canonical/>#organization&quot;
          },
          &quot;potentialAction&quot;: {
            &quot;@type&quot;: &quot;SearchAction&quot;,
            &quot;target&quot;: {
              &quot;@type&quot;: &quot;EntryPoint&quot;,
              &quot;urlTemplate&quot;: &quot;<data:blog.searchUrl.canonical/>?q={search_term_string}&quot;
            },
            &quot;query-input&quot;: &quot;required name=search_term_string&quot;
          }
        }
      ]
    }
    </script>
  </b:if>

  <!-- JSON-LD: BreadcrumbList Schema (Label Archive and Static Pages) -->
  <b:if cond='data:view.isLabelSearch'>
    <script type='application/ld+json'>
    {
      &quot;@context&quot;: &quot;https://schema.org&quot;,
      &quot;@type&quot;: &quot;BreadcrumbList&quot;,
      &quot;itemListElement&quot;: [
        {
          &quot;@type&quot;: &quot;ListItem&quot;,
          &quot;position&quot;: 1,
          &quot;name&quot;: &quot;Home&quot;,
          &quot;item&quot;: &quot;<data:blog.homepageUrl.canonical/>&quot;
        },
        {
          &quot;@type&quot;: &quot;ListItem&quot;,
          &quot;position&quot;: 2,
          &quot;name&quot;: &quot;<data:view.search.label.jsonEscaped/>&quot;,
          &quot;item&quot;: &quot;<data:view.url.canonical/>&quot;
        }
      ]
    }
    </script>
  </b:if>

  <!-- Inline Critical Above-the-Fold Layout CSS with Standalone Fallback -->
  <b:skin><![CDATA[
/* ==========================================================================
   Blogger Theme Designer Variable Definitions
   ==========================================================================
   <Variable name="keycolor" description="Main Theme Color" type="color" default="#C90016" value="#C90016"/>

   <Group description="Theme Colors" selector="body">
     <Variable name="bg.page" description="Page Background" type="color" default="#FFFFFF" value="#FFFFFF"/>
     <Variable name="bg.subtle" description="Subtle Surface Color" type="color" default="#F7F7F7" value="#F7F7F7"/>
     <Variable name="bg.ad" description="Advertisement Background" type="color" default="#F2F3F5" value="#F2F3F5"/>
     <Variable name="text.ink" description="Headlines and Ink Text" type="color" default="#171717" value="#171717"/>
     <Variable name="text.body" description="Article Paragraph Text" type="color" default="#333333" value="#333333"/>
     <Variable name="text.muted" description="Muted Metadata Color" type="color" default="#666666" value="#666666"/>
     <Variable name="border.hairline" description="Border Hairline Color" type="color" default="#E5E5E5" value="#E5E5E5"/>
     <Variable name="border.strong" description="Strong Headline Border" type="color" default="#111111" value="#111111"/>
     <Variable name="accent.red" description="Editorial Red Accent" type="color" default="#C90016" value="#C90016"/>
     <Variable name="accent.blue" description="Interactive Link Color" type="color" default="#1D4ED8" value="#1D4ED8"/>
   </Group>

   <Group description="Typography" selector="body">
     <Variable name="font.body" description="Body Typography" type="font" default="normal 400 16px Inter, system-ui, -apple-system, sans-serif" value="normal 400 16px Inter, system-ui, -apple-system, sans-serif"/>
     <Variable name="font.headline" description="Editorial Serif Headlines" type="font" default="normal 700 32px 'Playfair Display', Merriweather, Georgia, serif" value="normal 700 32px 'Playfair Display', Merriweather, Georgia, serif"/>
   </Group>
   ========================================================================== */

${combinedCss}
  ]]></b:skin>

  <!-- ==================================================================
       BLOGGER LAYOUT DASHBOARD WIREFRAME STYLES
       Provides dedicated styling for Blogger Theme Designer and Layout editor.
       ================================================================== -->
  <b:template-skin><![CDATA[
${layoutSkinCss}
  ]]></b:template-skin>

  <!-- ==================================================================
       DEFAULT WIDGET MARKUPS (Required by Blogger Layout v3 and Widget v2)
       ================================================================== -->
  <b:defaultmarkups>
    <b:defaultmarkup type='Common'>
      <b:includable id='body'>
        <b:comment>Common global default body blueprint</b:comment>
      </b:includable>
    </b:defaultmarkup>
  </b:defaultmarkups>

  <!-- jsDelivr CDN Deferred JavaScript Modules (v1.2.0 Release) -->
  <script defer='defer' src='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.2.0/assets/js/core.js'></script>
  <script defer='defer' src='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.2.0/assets/js/magazine-feeds.js'></script>
  <script defer='defer' src='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.2.0/assets/js/article-tools.js'></script>
</head>

<body expr:class='(data:view.isHomepage ? "is-homepage" : "") + (data:view.isPost ? " is-post" : "") + (data:view.isPage ? " is-page" : "") + (data:view.isMultipleItems and not data:view.isHomepage ? " is-archive" : "") + (data:view.isError ? " is-error" : "")' itemscope='itemscope' itemtype='http://schema.org/WebPage'>

  <!-- Reading Progress Bar (Fixed Top on Post View) -->
  <b:if cond='data:view.isPost'>
    <div id='reading-progress-bar'></div>
  </b:if>

  <!-- ==================================================================
       TOP UTILITY BAR
       ================================================================== -->
  <header id='top-bar'>
    <div class='site-wrapper'>
      <div class='top-bar-inner'>
        <div class='top-bar-left'>
          <span class='edition-badge'><span class='edition-flag'></span> Edition: IN / Global</span>
          <span class='top-bar-date' id='live-datetime'>Sun, Nov 15, 2026 | Updated Live</span>
        </div>
        <div class='top-bar-right'>
          <b:section class='top-bar-links' id='top-bar-links' maxwidgets='5' name='Top Bar Quick Links' showaddelement='yes'>
            <b:widget id='LinkList1' locked='false' title='Quick Links' type='LinkList' version='2'>
              <b:includable id='main'>
                <div class='top-quick-links' style='display:inline-flex; gap:12px;'>
                  <b:if cond='data:links.any'>
                    <b:loop values='data:links' var='link'>
                      <a class='top-bar-link' expr:href='data:link.target' target='_blank'>
                        <b:class cond='data:link.isCurrentPage' name='active'/>
                        <data:link.name/>
                      </a>
                    </b:loop>
                  <b:else/>
                    <a class='top-bar-link' href='https://twitter.com' target='_blank'>X / Twitter</a>
                    <a class='top-bar-link' href='/feeds/posts/default'>RSS Feed</a>
                  </b:if>
                </div>
              </b:includable>
            </b:widget>
          </b:section>
          <button aria-label='Toggle Dark / Light Theme' class='theme-toggle-btn' id='theme-toggle'>
            <svg fill='none' height='14' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' width='14'><circle cx='12' cy='12' r='5'/><path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'/></svg>
            <span id='theme-label'>Dark Mode</span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- ==================================================================
       EDITORIAL MASTHEAD
       ================================================================== -->
  <header id='masthead' itemscope='itemscope' itemtype='http://schema.org/WPHeader'>
    <div class='site-wrapper'>
      <div class='masthead-inner'>
        <b:section class='header' id='masthead-section' maxwidgets='5' name='Masthead Header' showaddelement='yes'>
          <b:widget id='Header1' locked='true' title='Site Header' type='Header' version='2'>
            <b:includable id='main'>
              <b:if cond='data:useImage'>
                <a expr:href='data:blog.homepageUrl.canonical'>
                  <img expr:alt='data:title' expr:src='data:image' style='max-height: 80px; margin: 0 auto;'/>
                </a>
              <b:else/>
                <h1 class='masthead-title'>
                  <a expr:href='data:blog.homepageUrl.canonical'>
                    <b:if cond='data:title'>
                      <data:title/>
                    <b:else/>
                      <data:blog.title/>
                    </b:if>
                  </a>
                </h1>
                <b:if cond='data:description'>
                  <div class='masthead-tagline'><data:description/></div>
                <b:elseif cond='data:blog.description'/>
                  <div class='masthead-tagline'><data:blog.description/></div>
                </b:if>
              </b:if>
            </b:includable>
          </b:widget>
        </b:section>
      </div>
    </div>
  </header>

  <!-- ==================================================================
       PRIMARY STICKY CATEGORY NAVIGATION BAR
       ================================================================== -->
  <nav id='primary-nav-sticky' itemscope='itemscope' itemtype='http://schema.org/SiteNavigationElement' role='navigation'>
    <div class='site-wrapper'>
      <div class='nav-bar-inner'>
        <!-- Mobile Drawer Toggle Button -->
        <button aria-label='Open Navigation Drawer' class='icon-btn' id='mobile-menu-btn'>
          <svg fill='none' height='20' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' width='20'><path d='M4 6h16M4 12h16M4 18h16'/></svg>
        </button>

        <!-- Category Links Scroll Area -->
        <div class='nav-links-scroll'>
          <b:section class='nav' id='nav-section' maxwidgets='5' name='Category Navigation' showaddelement='yes'>
            <b:widget id='PageList1' locked='false' title='Pages &amp; Categories' type='PageList' version='2'>
              <b:widget-settings>
                <b:widget-setting name='pageListJson'><![CDATA[{}]]></b:widget-setting>
                <b:widget-setting name='homeTitle'>Home</b:widget-setting>
              </b:widget-settings>
              <b:includable id='main'>
                <b:if cond='data:links.any'>
                  <b:loop values='data:links' var='link'>
                    <a class='nav-link-item' expr:href='data:link.href'>
                      <b:class cond='data:link.isCurrentPage' name='active'/>
                      <data:link.title/>
                    </a>
                  </b:loop>
                <b:else/>
                  <a class='nav-link-item active' expr:href='data:blog.homepageUrl.canonical'>Home</a>
                  <a class='nav-link-item' href='/search/label/World'>World</a>
                  <a class='nav-link-item' href='/search/label/Business'>Business</a>
                  <a class='nav-link-item' href='/search/label/Tech'>Tech</a>
                  <a class='nav-link-item' href='/search/label/Sports'>Sports</a>
                  <a class='nav-link-item' href='/search/label/Health'>Health</a>
                  <a class='nav-link-item' href='/search/label/Opinion'>Opinion</a>
                </b:if>
              </b:includable>
            </b:widget>
          </b:section>
        </div>

        <!-- Right Side Nav Controls -->
        <div class='nav-controls-right'>
          <a class='live-pill-btn' href='/search/label/Live'>
            <span class='live-dot'></span>
            <span>Live</span>
          </a>
          <button aria-label='Open Global Search' class='icon-btn' id='search-modal-trigger'>
            <svg fill='none' height='18' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' width='18'><circle cx='11' cy='11' r='8'/><path d='M21 21l-4.35-4.35'/></svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- ==================================================================
       TRENDING "IN THE NEWS" STRIP
       ================================================================== -->
  <div id='trending-bar'>
    <div class='site-wrapper'>
      <div class='trending-inner'>
        <span class='trending-badge'>
          <svg fill='currentColor' height='12' viewBox='0 0 24 24' width='12'><path d='M17.5 12a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0zm1.5 0c0-3.866-3.134-7-7-7a6.97 6.97 0 00-4.95 2.05l-1.414-1.414A8.96 8.96 0 0112 3c4.97 0 9 4.03 9 9s-4.03 9-9 9a8.96 8.96 0 01-6.364-2.636l1.414-1.414A6.97 6.97 0 0012 19c3.866 0 7-3.134 7-7z'/></svg>
          In The News
        </span>
        <b:section class='trending' id='trending-section' maxwidgets='5' name='Trending Bar Topics' showaddelement='yes'>
          <b:widget id='LinkList2' locked='false' title='Trending Topics' type='LinkList' version='2'>
            <b:includable id='main'>
              <div class='trending-list'>
                <b:if cond='data:links.any'>
                  <b:loop values='data:links' var='link'>
                    <a class='trending-item' expr:href='data:link.target'>
                      <b:class cond='data:link.isCurrentPage' name='active'/>
                      <data:link.name/>
                    </a>
                  </b:loop>
                <b:else/>
                  <a class='trending-item' href='/search/label/Economy'>Global Economy</a>
                  <a class='trending-item' href='/search/label/AI'>AI Revolution</a>
                  <a class='trending-item' href='/search/label/Climate'>Climate Summit</a>
                  <a class='trending-item' href='/search/label/Elections'>General Elections</a>
                  <a class='trending-item' href='/search/label/Cricket'>Cricket World Cup</a>
                </b:if>
              </div>
            </b:includable>
          </b:widget>
        </b:section>
      </div>
    </div>
  </div>

  <!-- ==================================================================
       BREAKING NEWS LIVE TICKER STRIP
       ================================================================== -->
  <div data-label='breaking-news' data-ticker-label='breaking-news' id='breaking-news-bar'>
    <div class='site-wrapper'>
      <div class='breaking-news-inner'>
        <span class='breaking-badge'>
          <span class='breaking-pulse'></span>
          Breaking News
        </span>
        <div class='breaking-ticker-track'>
          <b:section class='breaking-news' id='breaking-news-section' maxwidgets='2' name='Breaking News Live Ticker' showaddelement='yes'>
            <b:widget id='HTML0' locked='false' title='Breaking News Ticker' type='HTML' version='2'>
              <b:includable id='main'>
                <div class='breaking-ticker-content' id='breaking-ticker-content'>
                  <b:if cond='data:content'>
                    <data:content/>
                  <b:else/>
                    <a class='breaking-ticker-item' href='/search/label/Live'>
                      <span>High-level multilateral security talks resume as global trade corridors open</span>
                      <span class='breaking-ticker-sep'>&#9670;</span>
                    </a>
                    <a class='breaking-ticker-item' href='/search/label/Economy'>
                      <span>Benchmark rates stabilize across major sovereign debt auctions</span>
                      <span class='breaking-ticker-sep'>&#9670;</span>
                    </a>
                  </b:if>
                </div>
              </b:includable>
            </b:widget>
          </b:section>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================================================================
       ARCHIVE / SEARCH / LABEL HERO BANNER (When Not Homepage)
       ================================================================== -->
  <b:if cond='data:view.isMultipleItems and not data:view.isHomepage'>
    <div class='archive-header-banner'>
      <div class='site-wrapper'>
        <b:if cond='data:view.isLabelSearch'>
          <span class='archive-kicker'>News Desk Archive</span>
          <h1 class='archive-main-title'>Category / Tag: <data:view.search.label/></h1>
          <p class='archive-subtext'>All reporting, investigative pieces, and editorial dispatches filed under #<data:view.search.label/></p>
        <b:elseif cond='data:view.isSearch'/>
          <span class='archive-kicker'>Search Archives</span>
          <h1 class='archive-main-title'>Search Results for: &quot;<data:view.search.query/>&quot;</h1>
          <form class='search-refine-form' expr:action='data:blog.searchUrl'>
            <input class='search-refine-input' expr:value='data:view.search.query' name='q' placeholder='Refine your news search...' type='search'/>
            <button class='search-refine-btn' type='submit'>Search</button>
          </form>
        <b:elseif cond='data:view.isArchive'/>
          <span class='archive-kicker'>Historical Dispatches</span>
          <h1 class='archive-main-title'>Newsroom Archive: <data:view.archive.rangeMessage/></h1>
          <p class='archive-subtext'>Chronological dispatches published during <data:view.archive.rangeMessage/></p>
        </b:if>
      </div>
    </div>
  </b:if>

  <!-- ==================================================================
       MAIN PORTAL AREA (3-COLUMN ON HOME, 2-COLUMN ON ARTICLE)
       ================================================================== -->
  <main class='portal-main-area' id='main-content' itemscope='itemscope' itemtype='http://schema.org/Blog' role='main'>
    <div class='site-wrapper'>
      <div class='portal-grid-layout'>

        <!-- ==========================================================
             LEFT RAIL: FAST BRIEFS and BREAKING STORIES (Homepage Only)
             ========================================================== -->
        <aside class='portal-left-rail'>
          <div class='rail-section-header'>
            <h3 class='rail-section-title'>Fast Dispatches</h3>
          </div>
          <b:section class='left-rail' id='left-rail' maxwidgets='5' name='Left Rail Breaking Briefs' showaddelement='yes'>
            <b:widget id='HTML1' locked='false' title='Editor Briefs' type='HTML' version='2'>
              <b:includable id='main'>
                <div class='briefs-container' data-label='Briefs' data-rail-label='Briefs' id='rail-briefs-stream'>
                  <b:if cond='data:content'>
                    <data:content/>
                  <b:else/>
                    <article class='brief-item'>
                      <div class='brief-thumb-wrap'>
                        <img alt='Wildlife conservation report' loading='lazy' src='https://picsum.photos/seed/brief1/400/225'/>
                      </div>
                      <span class='brief-kicker'>Environment</span>
                      <h4 class='brief-headline'><a href='#'>Endangered coastal species reintroduced into native wildlife sanctuary after intensive care</a></h4>
                    </article>
                    <article class='brief-item'>
                      <span class='brief-kicker'>Technology</span>
                      <h4 class='brief-headline'><a href='#'>Micro-inverter efficiency surges as photovoltaic engineering teams adopt biomimetic structures</a></h4>
                    </article>
                    <article class='brief-item'>
                      <span class='brief-kicker'>Global Health</span>
                      <h4 class='brief-headline'><a href='#'>Clinical trials validate preventative care protocol reducing metabolic risks in urban centers</a></h4>
                    </article>
                    <article class='brief-item'>
                      <span class='brief-kicker'>Markets</span>
                      <h4 class='brief-headline'><a href='#'>Central reserves expand liquidity buffer as sovereign bond yields stabilize across major bourses</a></h4>
                    </article>
                    <article class='brief-item'>
                      <span class='brief-kicker'>Space &amp; Defense</span>
                      <h4 class='brief-headline'><a href='#'>Next-generation optical telemetry satellite prepares for equatorial launch countdown</a></h4>
                    </article>
                  </b:if>
                </div>
              </b:includable>
            </b:widget>
          </b:section>
        </aside>

        <!-- ==========================================================
             CENTER COLUMN: BLOG1 (LEAD STORY + EDITORIAL STREAM)
             ========================================================== -->
        <section class='portal-center-feed'>
          <b:section class='main' id='main' maxwidgets='5' name='Main Editorial Content' showaddelement='yes'>
            <b:widget id='Blog1' locked='true' title='News Posts' type='Blog' version='2'>

              <!-- ==========================================================
                   MODULAR BLOG1 ARCHITECTURE (15+ INCLUDABLES)
                   ========================================================== -->

              <!-- Includable 1: main (View Dispatcher) -->
              <b:includable id='main'>
                <!-- VIEW 1: ERROR 404 VIEW -->
                <b:if cond='data:view.isError'>
                  <b:include name='error404'/>

                <!-- VIEW 2: SINGLE POST / ARTICLE VIEW -->
                <b:elseif cond='data:view.isPost'/>
                  <b:loop values='data:posts' var='post'>
                    <b:include data='post' name='singlePost'/>
                  </b:loop>

                <!-- VIEW 3: STATIC PAGE VIEW (isPage) -->
                <b:elseif cond='data:view.isPage'/>
                  <b:loop values='data:posts' var='post'>
                    <b:include data='post' name='staticPage'/>
                  </b:loop>

                <!-- VIEW 4: HOMEPAGE (isHomepage) -->
                <b:elseif cond='data:view.isHomepage'/>
                  <b:if cond='data:posts.any'>
                    <!-- Lead Cover Story (i == 0) -->
                    <b:loop index='i' values='data:posts' var='post'>
                      <b:if cond='data:i == 0'>
                        <b:include data='post' name='featuredLeadPost'/>
                      </b:if>
                    </b:loop>

                    <!-- Editorial Horizontal Stream (i > 0) -->
                    <div class='editorial-stream-grid'>
                      <b:loop index='i' values='data:posts' var='post'>
                        <b:if cond='data:i &gt; 0'>
                          <b:include data='post' name='postCard'/>
                        </b:if>
                      </b:loop>
                    </div>

                    <b:include name='postPagination'/>
                  <b:else/>
                    <b:include name='emptyState'/>
                  </b:if>

                <!-- VIEW 5: ARCHIVE / SEARCH / LABEL MULTIPLE ITEMS -->
                <b:else/>
                  <b:include name='archiveHeader'/>
                  <b:if cond='data:posts.any'>
                    <div class='archive-cards-grid'>
                      <b:loop values='data:posts' var='post'>
                        <b:include data='post' name='postCard'/>
                      </b:loop>
                    </div>
                    <b:include name='postPagination'/>
                  <b:else/>
                    <b:include name='emptyState'/>
                  </b:if>
                </b:if>
              </b:includable>

              <!-- Includable 2: archiveHeader -->
              <b:includable id='archiveHeader'>
                <div class='archive-header-banner'>
                  <b:if cond='data:view.isLabelSearch'>
                    <span class='archive-kicker'>Topic Desk</span>
                    <h1 class='archive-main-title'>#<data:view.search.label/></h1>
                    <p class='archive-subtext'>Latest dispatches, investigative reports, and verified updates tagged under <data:view.search.label/>.</p>
                  <b:elseif cond='data:view.isSearch'/>
                    <span class='archive-kicker'>Search Archives</span>
                    <h1 class='archive-main-title'>&quot;<data:view.search.query/>&quot;</h1>
                    <p class='archive-subtext'>Articles and newsroom dispatches matching query &quot;<data:view.search.query/>&quot;.</p>
                    <form class='search-refine-form' expr:action='data:blog.searchUrl'>
                      <input class='search-refine-input' expr:value='data:view.search.query' name='q' placeholder='Refine your search...' type='search'/>
                      <button class='search-refine-btn' type='submit'>Search</button>
                    </form>
                  <b:elseif cond='data:view.isArchive'/>
                    <span class='archive-kicker'>Chronological Archive</span>
                    <h1 class='archive-main-title'><data:view.archive.rangeMessage/></h1>
                    <p class='archive-subtext'>Historical dispatches published during <data:view.archive.rangeMessage/>.</p>
                  <b:else/>
                    <h1 class='archive-main-title'>Newsroom Archives</h1>
                  </b:if>
                </div>
              </b:includable>

              <!-- Includable 3: featuredLeadPost (Homepage i == 0) -->
              <b:includable id='featuredLeadPost' var='post'>
                <article class='lead-story-card' expr:id='"lead-" + data:post.id'>
                  <b:loop index='j' values='data:post.labels' var='label'>
                    <b:if cond='data:j == 0'>
                      <a class='lead-category-kicker' expr:href='data:label.url'><data:label.name/></a>
                    </b:if>
                  </b:loop>
                  <h2 class='lead-headline'>
                    <a expr:href='data:post.url'><data:post.title/></a>
                  </h2>
                  <div class='lead-media-wrap'>
                    <a expr:href='data:post.url'>
                      <b:if cond='data:post.featuredImage'>
                        <img expr:alt='data:post.title' expr:src='resizeImage(data:post.featuredImage, 900, "16:9")' fetchpriority='high'/>
                      <b:else/>
                        <div class='media-fallback-svg' style='aspect-ratio:16/9;background:var(--bg-subtle);display:flex;align-items:center;justify-content:center;'>
                          <svg fill='none' height='48' stroke='var(--border-hairline)' stroke-width='1.5' viewBox='0 0 24 24' width='48'><path d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'/></svg>
                        </div>
                      </b:if>
                    </a>
                  </div>
                  <b:if cond='data:post.snippets.long'>
                    <p class='lead-deck'><data:post.snippets.long/></p>
                  <b:elseif cond='data:post.snippet'/>
                    <p class='lead-deck'><data:post.snippet/></p>
                  </b:if>
                  <b:include data='post' name='postMeta'/>
                </article>
              </b:includable>

              <!-- Includable 4: postCard (Horizontal Stream and Archive Card) -->
              <b:includable id='postCard' var='post'>
                <article class='news-card-horizontal' expr:id='"stream-" + data:post.id'>
                  <div class='card-content-wrap'>
                    <b:loop index='lblIdx' values='data:post.labels' var='label'>
                      <b:if cond='data:lblIdx == 0'>
                        <a class='card-kicker' expr:href='data:label.url'><data:label.name/></a>
                      </b:if>
                    </b:loop>
                    <h3 class='card-headline'>
                      <a expr:href='data:post.url'><data:post.title/></a>
                    </h3>
                    <b:if cond='data:post.snippets.short'>
                      <p class='card-snippet'><data:post.snippets.short/></p>
                    <b:elseif cond='data:post.snippet'/>
                      <p class='card-snippet'><data:post.snippet/></p>
                    </b:if>
                    <b:include data='post' name='postMeta'/>
                  </div>
                  <div class='card-thumb-wrap'>
                    <a expr:href='data:post.url'>
                      <b:if cond='data:post.featuredImage'>
                        <img expr:alt='data:post.title' expr:src='resizeImage(data:post.featuredImage, 360, "3:2")' loading='lazy'/>
                      <b:else/>
                        <div class='thumb-fallback-svg' style='aspect-ratio:3/2;background:var(--bg-subtle);display:flex;align-items:center;justify-content:center;border-radius:var(--radius-xs);'>
                          <svg fill='none' height='28' stroke='var(--border-hairline)' stroke-width='1.5' viewBox='0 0 24 24' width='28'><path d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'/></svg>
                        </div>
                      </b:if>
                    </a>
                  </div>
                </article>
              </b:includable>

              <!-- Includable 5: singlePost (Editorial Article Detail View) -->
              <b:includable id='singlePost' var='post'>
                <article class='article-reading-col' expr:id='"post-" + data:post.id'>
                  <b:include data='post' name='postBreadcrumbs'/>

                  <header class='article-header'>
                    <b:loop index='lblIdx' values='data:post.labels' var='label'>
                      <b:if cond='data:lblIdx == 0'>
                        <a class='article-kicker-desk' expr:href='data:label.url'><data:label.name/> Desk</a>
                      </b:if>
                    </b:loop>
                    <h1 class='article-main-headline'><data:post.title/></h1>
                    <b:if cond='data:post.snippets.long'>
                      <p class='article-subheadline'><data:post.snippets.long/></p>
                    <b:elseif cond='data:post.snippet'/>
                      <p class='article-subheadline'><data:post.snippet/></p>
                    </b:if>

                    <div class='article-byline-bar'>
                      <div class='byline-author-group'>
                        <b:if cond='data:post.author.authorPhoto.image'>
                          <img alt='Author' class='byline-avatar' expr:src='data:post.author.authorPhoto.image'/>
                        <b:else/>
                          <div class='byline-avatar' style='display:flex;align-items:center;justify-content:center;font-weight:700;'>N</div>
                        </b:if>
                        <div>
                          <span>By </span>
                          <span class='author-name-bold'><data:post.author.name/></span>
                        </div>
                      </div>
                      <div class='byline-timestamps'>
                        <time expr:datetime='data:post.date.iso8601'>Published: <data:post.date/></time>
                        <b:if cond='data:post.lastUpdated'>
                          <span>&#8226;</span>
                          <time expr:datetime='data:post.lastUpdated.iso8601'>Updated: <data:post.lastUpdated/></time>
                        </b:if>
                      </div>
                      <div class='article-reading-tools'>
                        <span id='reading-time'>1 min read</span>
                        <div class='font-size-adjuster'>
                          <button aria-label='Decrease font size' class='font-size-btn' id='font-size-dec'>A-</button>
                          <button aria-label='Reset font size' class='font-size-btn' id='font-size-reset'>A</button>
                          <button aria-label='Increase font size' class='font-size-btn' id='font-size-inc'>A+</button>
                        </div>
                        <button aria-label='Print Dispatch' class='print-article-btn' id='print-article-btn'>
                          <svg fill='none' height='12' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' width='12'><path d='M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2'/><path d='M6 14h12v8H6z'/></svg>
                          <span>Print</span>
                        </button>
                      </div>
                    </div>
                  </header>

                  <b:include data='post' name='postShare'/>

                  <b:if cond='data:post.featuredImage'>
                    <figure class='article-hero-media'>
                      <img expr:alt='data:post.title' expr:src='resizeImage(data:post.featuredImage, 1200, "16:9")' fetchpriority='high'/>
                      <figcaption class='media-caption'>Image: Newsroom Visual Desk / Editorial Archives</figcaption>
                    </figure>
                  </b:if>

                  <!-- Auto Table of Contents Container -->
                  <div id='toc-container'>
                    <div class='toc-header-toggle' id='toc-toggle'>
                      <span>Inside This Dispatch</span>
                      <span id='toc-icon'>&#9660;</span>
                    </div>
                    <ul class='toc-list' id='toc-list'></ul>
                  </div>

                  <!-- Article Content Body -->
                  <div class='article-body-content' id='article-content'>
                    <data:post.body/>
                  </div>

                  <b:include data='post' name='postLabels'/>
                  <b:include data='post' name='authorBox'/>

                  <!-- Previous / Next Navigation Split -->
                  <div class='post-navigation-split'>
                    <div>
                      <b:if cond='data:newerPageUrl'>
                        <span class='nav-direction-label'>&#8592; Previous Dispatch</span>
                        <a class='nav-post-title' expr:href='data:newerPageUrl'>Return to latest coverage</a>
                      </b:if>
                    </div>
                    <div class='post-nav-next'>
                      <b:if cond='data:olderPageUrl'>
                        <span class='nav-direction-label'>Next Story &#8594;</span>
                        <a class='nav-post-title' expr:href='data:olderPageUrl'>Continue reading archives</a>
                      </b:if>
                    </div>
                  </div>

                  <!-- Related Coverage Grid -->
                  <div class='related-coverage-block' id='related-coverage'>
                    <h3 class='related-block-title'>Related Dispatches</h3>
                    <div class='related-grid' id='related-posts-grid'>
                      <div class='related-card'>
                        <div class='related-thumb-box'><img alt='Related Story' loading='lazy' src='https://picsum.photos/seed/rel1/400/250'/></div>
                        <h4 class='related-card-title'><a href='#'>Diplomatic envoys convene for multilateral regional security dialogue</a></h4>
                      </div>
                      <div class='related-card'>
                        <div class='related-thumb-box'><img alt='Related Story' loading='lazy' src='https://picsum.photos/seed/rel2/400/250'/></div>
                        <h4 class='related-card-title'><a href='#'>Infrastructure bill allocates strategic capital for transit corridor expansion</a></h4>
                      </div>
                      <div class='related-card'>
                        <div class='related-thumb-box'><img alt='Related Story' loading='lazy' src='https://picsum.photos/seed/rel3/400/250'/></div>
                        <h4 class='related-card-title'><a href='#'>Quantum computing laboratory demonstrates fault-tolerant qubit coherence</a></h4>
                      </div>
                    </div>
                  </div>

                  <!-- JSON-LD NewsArticle Structured Data for Post -->
                  <script type='application/ld+json'>
                  {
                    &quot;@context&quot;: &quot;https://schema.org&quot;,
                    &quot;@type&quot;: &quot;NewsArticle&quot;,
                    &quot;mainEntityOfPage&quot;: {
                      &quot;@type&quot;: &quot;WebPage&quot;,
                      &quot;@id&quot;: &quot;<data:post.url.canonical/>&quot;
                    },
                    &quot;headline&quot;: &quot;<data:post.title.jsonEscaped/>&quot;,
                    &quot;description&quot;: &quot;<b:if cond='data:post.snippets.long'><data:post.snippets.long.jsonEscaped/><b:elseif cond='data:post.snippet'/><data:post.snippet.jsonEscaped/><b:else/><data:post.title.jsonEscaped/></b:if>&quot;,
                    <b:if cond='data:post.featuredImage'>
                    &quot;image&quot;: [
                      &quot;<data:post.featuredImage/>&quot;
                    ],
                    </b:if>
                    &quot;datePublished&quot;: &quot;<data:post.date.iso8601/>&quot;,
                    &quot;dateModified&quot;: &quot;<b:if cond='data:post.lastUpdated'><data:post.lastUpdated.iso8601/><b:else/><data:post.date.iso8601/></b:if>&quot;,
                    &quot;author&quot;: {
                      &quot;@type&quot;: &quot;Person&quot;,
                      &quot;name&quot;: &quot;<data:post.author.name.jsonEscaped/>&quot;
                    },
                    &quot;publisher&quot;: {
                      &quot;@type&quot;: &quot;NewsMediaOrganization&quot;,
                      &quot;name&quot;: &quot;<data:blog.title.jsonEscaped/>&quot;,
                      &quot;logo&quot;: {
                        &quot;@type&quot;: &quot;ImageObject&quot;,
                        &quot;url&quot;: &quot;https://resources.blogblog.com/img/blank.gif&quot;
                      }
                    }
                  }
                  </script>

                  <!-- Native Threaded Comments -->
                  <section class='comments-container'>
                    <h3 class='comments-header-title'>Reader Editorial Commentary</h3>
                    <b:include data='post' name='threadedComments'/>
                  </section>
                </article>
              </b:includable>

              <!-- Includable 6: post (Compatibility Alias) -->
              <b:includable id='post' var='post'>
                <b:include data='post' name='singlePost'/>
              </b:includable>

              <!-- Includable 7: staticPage (Distraction-Free Static Page) -->
              <b:includable id='staticPage' var='post'>
                <article class='article-reading-col' expr:id='"page-" + data:post.id'>
                  <header class='article-header'>
                    <h1 class='article-main-headline'><data:post.title/></h1>
                  </header>
                  <div class='article-body-content'>
                    <data:post.body/>
                  </div>
                </article>
              </b:includable>

              <!-- Includable 8: postBreadcrumbs -->
              <b:includable id='postBreadcrumbs' var='post'>
                <nav aria-label='Breadcrumb' class='editorial-breadcrumbs'>
                  <a expr:href='data:blog.homepageUrl.canonical'>Home</a>
                  <span class='breadcrumb-sep'>/</span>
                  <b:loop index='lblIdx' values='data:post.labels' var='label'>
                    <b:if cond='data:lblIdx == 0'>
                      <a expr:href='data:label.url'><data:label.name/></a>
                      <span class='breadcrumb-sep'>/</span>
                    </b:if>
                  </b:loop>
                  <span class='breadcrumb-current'><data:post.title/></span>
                </nav>
              </b:includable>

              <!-- Includable 9: postMeta -->
              <b:includable id='postMeta' var='post'>
                <div class='card-meta-line'>
                  <span class='meta-author'>By <data:post.author.name/></span>
                  <span>&#8226;</span>
                  <time expr:datetime='data:post.date.iso8601'><data:post.date/></time>
                  <b:if cond='data:post.lastUpdated'>
                    <span>&#8226;</span>
                    <time expr:datetime='data:post.lastUpdated.iso8601'>Updated: <data:post.lastUpdated/></time>
                  </b:if>
                </div>
              </b:includable>

              <!-- Includable 10: postLabels -->
              <b:includable id='postLabels' var='post'>
                <b:if cond='data:post.labels.any'>
                  <div class='article-tags-section'>
                    <span class='tags-label'>Filed Under:</span>
                    <b:loop values='data:post.labels' var='label'>
                      <a class='tag-badge' expr:href='data:label.url' rel='tag'>#<data:label.name/></a>
                    </b:loop>
                  </div>
                </b:if>
              </b:includable>

              <!-- Includable 11: postShare -->
              <b:includable id='postShare' var='post'>
                <div class='article-share-strip'>
                  <span class='share-label'>Share:</span>
                  <button aria-label='Share on Twitter' class='share-btn share-tw' expr:data-title='data:post.title' expr:data-url='data:post.url.canonical'>
                    <svg fill='currentColor' height='14' viewBox='0 0 24 24' width='14'><path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'/></svg>
                  </button>
                  <button aria-label='Share on Facebook' class='share-btn share-fb' expr:data-url='data:post.url.canonical'>
                    <svg fill='currentColor' height='14' viewBox='0 0 24 24' width='14'><path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/></svg>
                  </button>
                  <button aria-label='Share on WhatsApp' class='share-btn share-wa' expr:data-title='data:post.title' expr:data-url='data:post.url.canonical'>
                    <svg fill='currentColor' height='14' viewBox='0 0 24 24' width='14'><path d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z'/></svg>
                  </button>
                  <button aria-label='Share on Telegram' class='share-btn share-tg' expr:data-title='data:post.title' expr:data-url='data:post.url.canonical'>
                    <svg fill='currentColor' height='14' viewBox='0 0 24 24' width='14'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z'/></svg>
                  </button>
                  <button aria-label='Copy Article Link' class='share-btn share-copy' expr:data-url='data:post.url.canonical' id='copy-link-btn'>
                    <svg fill='none' height='14' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' width='14'><path d='M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71'/><path d='M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71'/></svg>
                  </button>
                </div>
              </b:includable>

              <!-- Includable 12: authorBox -->
              <b:includable id='authorBox' var='post'>
                <div class='author-bio-box'>
                  <b:if cond='data:post.author.authorPhoto.image'>
                    <img alt='Author' class='author-bio-avatar' expr:src='data:post.author.authorPhoto.image'/>
                  <b:else/>
                    <div class='author-bio-avatar' style='display:flex;align-items:center;justify-content:center;font-weight:700;background:var(--accent-red);color:#fff;font-size:1.25rem;'>N</div>
                  </b:if>
                  <div>
                    <h4 class='author-bio-name'>
                      <b:if cond='data:post.author.profileUrl'>
                        <a expr:href='data:post.author.profileUrl' rel='author'><data:post.author.name/></a>
                      <b:else/>
                        <data:post.author.name/>
                      </b:if>
                    </h4>
                    <p class='author-bio-desc'>
                      <b:if cond='data:post.author.aboutMe'>
                        <data:post.author.aboutMe/>
                      <b:else/>
                        Contributing journalist and editorial correspondent for <data:blog.title/> covering breaking reports, policy analysis, and verified investigations.
                      </b:if>
                    </p>
                  </div>
                </div>
              </b:includable>

              <!-- Includable 13: postPagination -->
              <b:includable id='postPagination'>
                <div class='blog-pager'>
                  <b:if cond='data:newerPageUrl'>
                    <a expr:href='data:newerPageUrl'>&#8592; Newer Dispatches</a>
                  </b:if>
                  <b:if cond='data:olderPageUrl'>
                    <a expr:href='data:olderPageUrl'>Older Dispatches &#8594;</a>
                  </b:if>
                </div>
              </b:includable>

              <!-- Includable 14: threadedComments -->
              <b:includable id='threadedComments' var='post'>
                <b:if cond='data:post.allowComments'>
                  <div class='comments' id='comments'>
                    <b:if cond='data:post.numberOfComments &gt; 0'>
                      <h4 class='comments-title'><data:post.numberOfComments/> Reader Comments</h4>
                    <b:else/>
                      <h4 class='comments-title'>Responses &amp; Editorial Commentary</h4>
                    </b:if>
                    <b:if cond='data:post.commentHtml'>
                      <div class='comment-thread'>
                        <data:post.commentHtml/>
                      </div>
                    </b:if>
                    <b:include data='post' name='commentPicker'/>
                  </div>
                </b:if>
              </b:includable>

              <!-- Includable 15: comments (Compatibility Alias) -->
              <b:includable id='comments' var='post'>
                <b:include data='post' name='threadedComments'/>
              </b:includable>

              <!-- Includable 16: commentPicker (Compatibility) -->
              <b:includable id='commentPicker' var='post'>
                <b:comment>Blogger native threaded comment picker form</b:comment>
              </b:includable>

              <!-- Includable 17: emptyState -->
              <b:includable id='emptyState'>
                <div class='no-posts-card'>
                  <div class='no-posts-icon'>
                    <svg fill='none' height='48' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24' width='48'><path d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'/></svg>
                  </div>
                  <h3 class='no-posts-title'>No Dispatches Filed Yet</h3>
                  <p class='no-posts-desc'>There are currently no published reports in this section. Our editorial correspondents are preparing coverage.</p>
                  <form class='search-refine-form' expr:action='data:blog.searchUrl' style='margin: 0 auto 20px;'>
                    <input class='search-refine-input' name='q' placeholder='Search archives for topic or name...' type='search'/>
                    <button class='search-refine-btn' type='submit'>Search</button>
                  </form>
                  <a class='return-home-link' expr:href='data:blog.homepageUrl.canonical'>&#8592; Return to Front Page</a>
                </div>
              </b:includable>

              <!-- Includable 18: error404 -->
              <b:includable id='error404'>
                <div class='error-notice-card'>
                  <div class='error-code'>404</div>
                  <h1 class='error-title'>Dispatch Not Found</h1>
                  <p class='error-desc'>The article, report, or page you requested could not be located in our editorial archives. It may have been archived under an updated headline or URL.</p>
                  <form class='search-refine-form' expr:action='data:blog.searchUrl' style='margin: 0 auto 20px;'>
                    <input class='search-refine-input' name='q' placeholder='Search archives for topic or name...' type='search'/>
                    <button class='search-refine-btn' type='submit'>Search</button>
                  </form>
                  <a class='return-home-link' expr:href='data:blog.homepageUrl.canonical'>&#8592; Return to Front Page</a>
                </div>
              </b:includable>

            </b:widget>
          </b:section>
        </section>

        <!-- ==========================================================
             RIGHT SIDEBAR: AD CONTAINER + POPULAR POSTS + EXPLORE + VIDEOS
             ========================================================== -->
        <aside class='portal-sidebar' id='site-sidebar' itemscope='itemscope' itemtype='http://schema.org/WPSideBar' role='complementary'>
          <b:section class='sidebar' id='sidebar' maxwidgets='10' name='Right Editorial Sidebar' showaddelement='yes'>

            <!-- Widget 1: 300x250 Fixed Ad Slot (Zero CLS) -->
            <b:widget id='HTML2' locked='false' title='Sponsor Ad Slot' type='HTML' version='2'>
              <b:includable id='main'>
                <b:if cond='data:content'>
                  <data:content/>
                <b:else/>
                  <div class='news-ad-box'>
                    <span class='ad-disclaimer'>Advertisement</span>
                    <div class='ad-mock-content'>
                      <strong>300 &#215; 250 Premium Ad Slot</strong>
                      <p style='font-size:0.75rem; margin-top:4px;'>Google AdSense or Direct Sponsorship Partner</p>
                    </div>
                  </div>
                </b:if>
              </b:includable>
            </b:widget>

            <!-- Widget 2: Most Read Ranked Dispatches -->
            <b:widget id='PopularPosts1' locked='false' title='Most Read Dispatches' type='PopularPosts' version='2'>
              <b:widget-settings>
                <b:widget-setting name='numItemsToShow'>5</b:widget-setting>
                <b:widget-setting name='showThumbnails'>true</b:widget-setting>
                <b:widget-setting name='showSnippets'>false</b:widget-setting>
                <b:widget-setting name='timeRange'>ALL_TIME</b:widget-setting>
              </b:widget-settings>
              <b:includable id='main'>
                <div>
                  <div class='sidebar-box-header'>
                    <h3 class='sidebar-box-title'>Most Read</h3>
                  </div>
                  <ol class='popular-posts-stack'>
                    <b:if cond='data:posts.any'>
                      <b:loop index='idx' values='data:posts' var='post'>
                        <li class='popular-post-item'>
                          <b:if cond='data:post.thumbnail'>
                            <img alt='Thumbnail' class='popular-post-thumb' expr:src='resizeImage(data:post.thumbnail, 72, "1:1")' loading='lazy'/>
                          </b:if>
                          <h4 class='popular-post-title'>
                            <a expr:href='data:post.href'><data:post.title/></a>
                          </h4>
                        </li>
                      </b:loop>
                    <b:else/>
                      <li class='popular-post-item'><h4 class='popular-post-title'><a href='#'>Global markets digest monetary policy updates</a></h4></li>
                      <li class='popular-post-item'><h4 class='popular-post-title'><a href='#'>Next-generation clean energy grid breaks transmission records</a></h4></li>
                      <li class='popular-post-item'><h4 class='popular-post-title'><a href='#'>Breakthrough in synthetic biology unveils climate-resilient agriculture</a></h4></li>
                    </b:if>
                  </ol>
                </div>
              </b:includable>
            </b:widget>

            <!-- Widget 3: Explore Topics / Categories Tag Cloud -->
            <b:widget id='Label1' locked='false' title='Explore Desks' type='Label' version='2'>
              <b:includable id='main'>
                <div>
                  <div class='sidebar-box-header'>
                    <h3 class='sidebar-box-title'><data:title/></h3>
                  </div>
                  <ul class='label-cloud-list'>
                    <b:if cond='data:labels.any'>
                      <b:loop values='data:labels' var='label'>
                        <li class='label-cloud-item'>
                          <a expr:href='data:label.url'>
                            <span><data:label.name/></span>
                            <span class='label-count-badge'>(<data:label.count/>)</span>
                          </a>
                        </li>
                      </b:loop>
                    <b:else/>
                      <li class='label-cloud-item'><a href='/search/label/World'><span>World</span> <span class='label-count-badge'>(12)</span></a></li>
                      <li class='label-cloud-item'><a href='/search/label/Business'><span>Business</span> <span class='label-count-badge'>(18)</span></a></li>
                      <li class='label-cloud-item'><a href='/search/label/Tech'><span>Tech</span> <span class='label-count-badge'>(24)</span></a></li>
                      <li class='label-cloud-item'><a href='/search/label/Sports'><span>Sports</span> <span class='label-count-badge'>(9)</span></a></li>
                      <li class='label-cloud-item'><a href='/search/label/Health'><span>Health</span> <span class='label-count-badge'>(7)</span></a></li>
                    </b:if>
                  </ul>
                </div>
              </b:includable>
            </b:widget>

            <!-- Widget 4: Featured Videos / Multimedia Showcase -->
            <b:widget id='HTML3' locked='false' title='Featured Videos' type='HTML' version='2'>
              <b:includable id='main'>
                <b:if cond='data:content'>
                  <data:content/>
                <b:else/>
                  <div>
                    <div class='sidebar-box-header'>
                      <h3 class='sidebar-box-title' style='color: var(--accent-red);'>Featured Videos &#9656;</h3>
                    </div>
                    <div class='video-feature-card'>
                      <img alt='Video cover' loading='lazy' src='https://picsum.photos/seed/video1/400/225'/>
                      <div class='video-play-badge'>
                        <svg fill='currentColor' viewBox='0 0 24 24'><path d='M8 5v14l11-7z'/></svg>
                      </div>
                    </div>
                    <h4 style='font-size: 0.875rem; font-weight: 700; line-height: 1.35; margin-bottom: 12px;'>
                      <a href='#'>Special Report: Autonomous transport tests expand to metropolitan freight arteries</a>
                    </h4>
                  </div>
                </b:if>
              </b:includable>
            </b:widget>

            <!-- Widget 5: Newsletter Morning Dispatch -->
            <b:widget id='HTML4' locked='false' title='Morning Dispatch' type='HTML' version='2'>
              <b:includable id='main'>
                <b:if cond='data:content'>
                  <data:content/>
                <b:else/>
                  <div class='dispatch-box'>
                    <h4 class='dispatch-title'>The Morning Edition</h4>
                    <p class='dispatch-desc'>Get essential investigative reporting and executive news briefs delivered to your inbox every morning at 7:00 AM.</p>
                    <form class='dispatch-form' onsubmit='event.preventDefault(); alert("Thank you for subscribing to the morning dispatch!");'>
                      <input class='dispatch-input' placeholder='name@company.com' required='required' type='email'/>
                      <button class='dispatch-btn' type='submit'>Join</button>
                    </form>
                  </div>
                </b:if>
              </b:includable>
            </b:widget>

          </b:section>
        </aside>

      </div>
    </div>
  </main>

  <!-- ==================================================================
       MODULAR HOMEPAGE CATEGORY BLOCKS (Below The Fold)
       ================================================================== -->
  <b:if cond='data:view.isHomepage'>
    <section class='site-wrapper' id='home-sections'>
      <b:section class='home-sections' id='home-category-blocks' maxwidgets='5' name='Homepage Modular Category Blocks' showaddelement='yes'>
        
        <b:widget id='HTML5' locked='false' title='Business and Markets Desk' type='HTML' version='2'>
          <b:includable id='main'>
            <div class='modular-news-block' data-block-label='Business' data-label='Business'>
              <div class='sidebar-box-header'>
                <h3 class='sidebar-box-title'><data:title/></h3>
              </div>
              <div class='modular-block-grid'>
                <b:if cond='data:content'>
                  <data:content/>
                <b:else/>
                  <article class='modular-card'>
                    <div class='brief-thumb-wrap'><img alt='Market news' loading='lazy' src='https://picsum.photos/seed/biz1/400/225'/></div>
                    <span class='brief-kicker'>Central Banking</span>
                    <h4 class='brief-headline'><a href='#'>Global monetary authorities signal coordinated benchmark interest adjustments</a></h4>
                  </article>
                  <article class='modular-card'>
                    <div class='brief-thumb-wrap'><img alt='Energy news' loading='lazy' src='https://picsum.photos/seed/biz2/400/225'/></div>
                    <span class='brief-kicker'>Energy Transition</span>
                    <h4 class='brief-headline'><a href='#'>Offshore wind farms surpass projected generation milestones for consecutive quarters</a></h4>
                  </article>
                  <article class='modular-card'>
                    <div class='brief-thumb-wrap'><img alt='Tech news' loading='lazy' src='https://picsum.photos/seed/biz3/400/225'/></div>
                    <span class='brief-kicker'>Venture Ecosystem</span>
                    <h4 class='brief-headline'><a href='#'>Early-stage deeptech funding rebounds with focus on silicon manufacturing</a></h4>
                  </article>
                </b:if>
              </div>
            </div>
          </b:includable>
        </b:widget>

        <b:widget id='HTML6' locked='false' title='Technology and Innovation Desk' type='HTML' version='2'>
          <b:includable id='main'>
            <div class='modular-news-block' data-block-label='Technology' data-label='Technology'>
              <div class='sidebar-box-header'>
                <h3 class='sidebar-box-title'><data:title/></h3>
              </div>
              <div class='modular-block-grid'>
                <b:if cond='data:content'>
                  <data:content/>
                <b:else/>
                  <article class='modular-card'>
                    <div class='brief-thumb-wrap'><img alt='AI research' loading='lazy' src='https://picsum.photos/seed/tech1/400/225'/></div>
                    <span class='brief-kicker'>Artificial Intelligence</span>
                    <h4 class='brief-headline'><a href='#'>Neural architecture benchmarks demonstrate reasoning efficiency gains</a></h4>
                  </article>
                  <article class='modular-card'>
                    <div class='brief-thumb-wrap'><img alt='Semiconductor' loading='lazy' src='https://picsum.photos/seed/tech2/400/225'/></div>
                    <span class='brief-kicker'>Semiconductors</span>
                    <h4 class='brief-headline'><a href='#'>Next-generation lithography pilot delivers sub-nanometer node test yields</a></h4>
                  </article>
                  <article class='modular-card'>
                    <div class='brief-thumb-wrap'><img alt='Cybersecurity' loading='lazy' src='https://picsum.photos/seed/tech3/400/225'/></div>
                    <span class='brief-kicker'>Cyber Defense</span>
                    <h4 class='brief-headline'><a href='#'>Quantum-resistant encryption mandates roll out across financial institutions</a></h4>
                  </article>
                </b:if>
              </div>
            </div>
          </b:includable>
        </b:widget>

      </b:section>
    </section>
  </b:if>

  <!-- ==================================================================
       FOOTER ARCHITECTURE (4-COLUMN EDITORIAL DESKS and POLICIES)
       ================================================================== -->
  <footer id='site-footer' itemscope='itemscope' itemtype='http://schema.org/WPFooter'>
    <div class='site-wrapper'>
      <div class='footer-top-grid'>

        <!-- Col 1: Publication Info and Brand Section -->
        <b:section class='footer-brand' id='footer-brand' maxwidgets='5' name='Footer Brand &amp; Mission' showaddelement='yes'>
          <b:widget id='Text1' locked='true' title='About Publication' type='Text' version='2'>
            <b:includable id='main'>
              <div>
                <div class='footer-brand-title'><data:blog.title/></div>
                <p class='footer-brand-desc'>
                  <b:if cond='data:text'>
                    <data:text/>
                  <b:elseif cond='data:blog.description'/>
                    <data:blog.description/>
                  <b:else/>
                    Independent digital newspaper and editorial portal dedicated to fearless reporting, investigative journalism, and insightful analysis.
                  </b:if>
                </p>
              </div>
            </b:includable>
          </b:widget>
        </b:section>

        <!-- Col 2: Categories / News Desks Section -->
        <b:section class='footer-categories' id='footer-categories' maxwidgets='5' name='Footer News Desks' showaddelement='yes'>
          <b:widget id='Label2' locked='true' title='News Desks' type='Label' version='2'>
            <b:includable id='main'>
              <div>
                <h4 class='footer-col-title'><data:title/></h4>
                <ul class='footer-links-list'>
                  <b:if cond='data:labels.any'>
                    <b:loop values='data:labels' var='label'>
                      <li>
                        <a expr:href='data:label.url'>
                          <span><data:label.name/></span>
                          <span style='font-size:0.75rem; opacity:0.7;'> (<data:label.count/>)</span>
                        </a>
                      </li>
                    </b:loop>
                  <b:else/>
                    <li><a href='/search/label/World'>World News</a></li>
                    <li><a href='/search/label/Business'>Business &amp; Finance</a></li>
                    <li><a href='/search/label/Tech'>Technology &amp; AI</a></li>
                    <li><a href='/search/label/Sports'>Sports &amp; Athletics</a></li>
                    <li><a href='/search/label/Health'>Global Health</a></li>
                  </b:if>
                </ul>
              </div>
            </b:includable>
          </b:widget>
        </b:section>

        <!-- Col 3: Legal and Newsroom Links Section -->
        <b:section class='footer-links' id='footer-links' maxwidgets='5' name='Footer Editorial Links' showaddelement='yes'>
          <b:widget id='LinkList3' locked='false' title='Newsroom &amp; Legal' type='LinkList' version='2'>
            <b:includable id='main'>
              <div>
                <h4 class='footer-col-title'>Editorial and Policies</h4>
                <ul class='footer-links-list'>
                  <b:if cond='data:links.any'>
                    <b:loop values='data:links' var='link'>
                      <li>
                        <a expr:href='data:link.target'>
                          <b:class cond='data:link.isCurrentPage' name='active'/>
                          <data:link.name/>
                        </a>
                      </li>
                    </b:loop>
                  <b:else/>
                    <li><a href='/p/about.html'>About Our Newsroom</a></li>
                    <li><a href='/p/standards.html'>Standards and Ethics</a></li>
                    <li><a href='/p/privacy.html'>Privacy Policy</a></li>
                    <li><a href='/p/terms.html'>Terms of Service</a></li>
                  </b:if>
                </ul>
              </div>
            </b:includable>
          </b:widget>
        </b:section>

        <!-- Col 4: Newsletter and Syndication Section -->
        <b:section class='footer-newsletter' id='footer-newsletter' maxwidgets='5' name='Footer Newsletter &amp; Legal' showaddelement='yes'>
          <b:widget id='HTML7' locked='false' title='Syndication &amp; Feeds' type='HTML' version='2'>
            <b:includable id='main'>
              <div>
                <h4 class='footer-col-title'>Syndication &amp; Feeds</h4>
                <p style='font-size: 0.8125rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;'>
                  Subscribe to verified XML syndication feeds for news aggregators and institutional wire services.
                </p>
                <div style='display:flex; flex-direction:column; gap:6px;'>
                  <a expr:href='data:blog.homepageUrl.canonical path "feeds/posts/default"' style='font-size:0.8125rem; font-weight:700; color:var(--accent-red);'>&#9656; Atom Syndication Feed</a>
                  <a expr:href='data:blog.homepageUrl.canonical path "feeds/posts/default?alt=rss"' style='font-size:0.8125rem; font-weight:700; color:var(--text-ink);'>&#9656; RSS 2.0 Newsfeed</a>
                </div>
              </div>
            </b:includable>
          </b:widget>
        </b:section>

      </div>

      <div class='footer-bottom-bar'>
        <div>
          &amp;copy; <span id='copyright-year'>2026</span> <data:blog.title/>. All rights reserved.
        </div>
        <div>
          Published on Google Blogger (Layout v3 / Widget v2) &#8212; High-Performance News Theme
        </div>
      </div>
    </div>
  </footer>

  <!-- ==================================================================
       GLOBAL SEARCH MODAL OVERLAY
       ================================================================== -->
  <div class='search-modal-backdrop' id='search-modal'>
    <div class='search-modal-box'>
      <div class='search-box-header'>
        <span class='search-box-title'>Search Newsroom Archives</span>
        <button aria-label='Close search' class='icon-btn' id='search-modal-close'>
          <svg fill='none' height='18' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' width='18'><path d='M18 6L6 18M6 6l12 12'/></svg>
        </button>
      </div>
      <form expr:action='data:blog.searchUrl' method='get'>
        <input autocomplete='off' class='search-input-field' id='search-input' name='q' placeholder='Type search terms and hit Enter (e.g. Economy, AI, Space)...' type='search'/>
      </form>
    </div>
  </div>

  <!-- ==================================================================
       MOBILE SLIDE-OVER DRAWER
       ================================================================== -->
  <div class='mobile-drawer-backdrop' id='mobile-drawer-backdrop'></div>
  <aside class='mobile-drawer-panel' id='mobile-drawer'>
    <div class='drawer-header'>
      <span style='font-family: var(--font-serif); font-size: 1.25rem; font-weight: 900;'><data:blog.title/></span>
      <button aria-label='Close drawer' class='icon-btn' id='drawer-close-btn'>
        <svg fill='none' height='20' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' width='20'><path d='M18 6L6 18M6 6l12 12'/></svg>
      </button>
    </div>
    <ul class='drawer-links-stack'>
      <li><a href='/'>Home</a></li>
      <li><a href='/search/label/World'>World News</a></li>
      <li><a href='/search/label/Business'>Business and Finance</a></li>
      <li><a href='/search/label/Tech'>Technology</a></li>
      <li><a href='/search/label/Sports'>Sports</a></li>
      <li><a href='/search/label/Health'>Health and Wellness</a></li>
      <li><a href='/search/label/Opinion'>Opinion and Columns</a></li>
      <li><a href='/search/label/Live' style='color: var(--accent-red);'>Live Coverage</a></li>
    </ul>
    <div style='margin-top: auto; padding-top: 24px; border-top: 1px solid var(--border-hairline);'>
      <p style='font-size: 0.75rem; color: var(--text-muted);'>Independent News Portal &#8212; Real-Time Dispatches</p>
    </div>
  </aside>

  <!-- ==================================================================
       INLINE STANDALONE FALLBACK JAVASCRIPT SYSTEM
       ================================================================== -->
  <script type='text/javascript'>
  //<![CDATA[
${combinedJs}
  //]]>
  </script>

</body>
</html>`;

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, xmlTemplate, 'utf-8');
const stats = fs.statSync(OUTPUT_FILE);

console.log(`Successfully compiled standalone theme: ${OUTPUT_FILE}`);
console.log(`Theme XML File Size: ${(stats.size / 1024).toFixed(2)} KB (${stats.size} bytes)`);
