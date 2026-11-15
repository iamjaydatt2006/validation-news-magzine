/**
 * Validation News Magzine Theme - Build Script
 * Compiles the standalone Blogger XML theme with Critical CSS + jsDelivr CDN integration.
 * @package ValidationNewsMagzine
 * @version 1.0.0
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

const xmlTemplate = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsVersion='3' b:responsive='true' expr:dir='data:blog.languageDirection' expr:lang='data:blog.locale' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta charset='UTF-8'/>
  <meta content='width=device-width, initial-scale=1.0' name='viewport'/>
  <meta content='IE=edge' http-equiv='X-UA-Compatible'/>

  <!-- Preconnected High-Authority Typography Stack -->
  <link href='https://fonts.googleapis.com' rel='preconnect'/>
  <link crossorigin='anonymous' href='https://fonts.gstatic.com' rel='preconnect'/>
  <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400;1,700&amp;display=swap' rel='stylesheet'/>

  <!-- jsDelivr CDN Modular Non-Blocking Stylesheets (v1.0.0 Release) -->
  <link href='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.0.0/assets/css/components.css' rel='stylesheet'/>
  <link href='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.0.0/assets/css/post.css' rel='stylesheet'/>

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
${combinedCss}
  ]]></b:skin>

  <!-- jsDelivr CDN Deferred JavaScript Modules (v1.0.0 Release) -->
  <script defer='defer' src='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.0.0/assets/js/core.js'></script>
  <script defer='defer' src='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.0.0/assets/js/magazine-feeds.js'></script>
  <script defer='defer' src='https://cdn.jsdelivr.net/gh/iamjaydatt2006/validation-news-magzine@v1.0.0/assets/js/article-tools.js'></script>
</head>

<body expr:class='(data:view.isHomepage ? "is-homepage" : "") + (data:view.isPost ? " is-post" : "") + (data:view.isPage ? " is-page" : "") + (data:view.isMultipleItems and not data:view.isHomepage ? " is-archive" : "") + (data:view.isError ? " is-error" : "")'>

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
          <b:section id='top-bar-links' maxwidgets='1' name='Top Bar Quick Links' showaddelement='no'>
            <b:widget id='LinkList1' locked='false' title='Quick Links' type='LinkList' version='2'>
              <b:includable id='main'>
                <div class='top-quick-links' style='display:inline-flex; gap:12px;'>
                  <b:if cond='data:links'>
                    <b:loop values='data:links' var='link'>
                      <a expr:href='data:link.target' target='_blank'><data:link.name/></a>
                    </b:loop>
                  <b:else/>
                    <a href='https://twitter.com' target='_blank'>X / Twitter</a>
                    <a href='/feeds/posts/default'>RSS Feed</a>
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
  <div id='masthead'>
    <div class='site-wrapper'>
      <div class='masthead-inner'>
        <b:section id='masthead-section' maxwidgets='1' name='Masthead Header' showaddelement='no'>
          <b:widget id='Header1' locked='true' title='Site Header' type='Header' version='2'>
            <b:includable id='main'>
              <b:if cond='data:useImage'>
                <a expr:href='data:blog.homepageUrl.canonical'>
                  <img expr:alt='data:title' expr:src='data:image' style='max-height: 80px; margin: 0 auto;'/>
                </a>
              <b:else/>
                <h1 class='masthead-title'>
                  <a expr:href='data:blog.homepageUrl.canonical'><data:title/></a>
                </h1>
                <b:if cond='data:description'>
                  <div class='masthead-tagline'><data:description/></div>
                </b:if>
              </b:if>
            </b:includable>
          </b:widget>
        </b:section>
      </div>
    </div>
  </div>

  <!-- ==================================================================
       PRIMARY STICKY CATEGORY NAVIGATION BAR
       ================================================================== -->
  <nav id='primary-nav-sticky'>
    <div class='site-wrapper'>
      <div class='nav-bar-inner'>
        <!-- Mobile Drawer Toggle Button -->
        <button aria-label='Open Navigation Drawer' class='icon-btn' id='mobile-menu-btn'>
          <svg fill='none' height='20' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' width='20'><path d='M4 6h16M4 12h16M4 18h16'/></svg>
        </button>

        <!-- Category Links Scroll Area -->
        <div class='nav-links-scroll'>
          <b:section id='nav-section' maxwidgets='1' name='Category Navigation' showaddelement='no'>
            <b:widget id='PageList1' locked='false' title='Pages &amp; Categories' type='PageList' version='2'>
              <b:widget-settings>
                <b:widget-setting name='pageListJson'><![CDATA[{}]]></b:widget-setting>
                <b:widget-setting name='homeTitle'>Home</b:widget-setting>
              </b:widget-settings>
              <b:includable id='main'>
                <b:if cond='data:links'>
                  <b:loop values='data:links' var='link'>
                    <a expr:class='"nav-link-item" + (data:link.isCurrentPage ? " active" : "")' expr:href='data:link.href'><data:link.title/></a>
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
        <b:section id='trending-section' maxwidgets='1' name='Trending Bar Topics' showaddelement='no'>
          <b:widget id='LinkList2' locked='false' title='Trending Topics' type='LinkList' version='2'>
            <b:includable id='main'>
              <div class='trending-list'>
                <b:if cond='data:links'>
                  <b:loop values='data:links' var='link'>
                    <a class='trending-item' expr:href='data:link.target'><data:link.name/></a>
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
       ARCHIVE / SEARCH / LABEL HERO BANNER (When Not Homepage)
       ================================================================== -->
  <b:if cond='data:view.isMultipleItems and not data:view.isHomepage'>
    <div class='archive-header-banner'>
      <div class='site-wrapper'>
        <b:if cond='data:view.isLabelSearch'>
          <span class='archive-kicker'>News Desk Archive</span>
          <h1 class='archive-main-title'>Topic: <data:view.search.label/></h1>
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
        </b:if>
      </div>
    </div>
  </b:if>

  <!-- ==================================================================
       MAIN PORTAL AREA (3-COLUMN ON HOME, 2-COLUMN ON ARTICLE)
       ================================================================== -->
  <main class='portal-main-area'>
    <div class='site-wrapper'>
      <div class='portal-grid-layout'>

        <!-- ==========================================================
             LEFT RAIL: FAST BRIEFS and BREAKING STORIES (Homepage Only)
             ========================================================== -->
        <aside class='portal-left-rail'>
          <div class='rail-section-header'>
            <h3 class='rail-section-title'>Fast Dispatches</h3>
          </div>
          <b:section id='left-rail' maxwidgets='2' name='Left Rail Breaking Briefs' showaddelement='yes'>
            <b:widget id='HTML1' locked='false' title='Editor Briefs' type='HTML' version='2'>
              <b:includable id='main'>
                <div class='briefs-container'>
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
                </div>
              </b:includable>
            </b:widget>
          </b:section>
        </aside>

        <!-- ==========================================================
             CENTER COLUMN: BLOG1 (LEAD STORY + EDITORIAL STREAM)
             ========================================================== -->
        <section class='portal-center-feed'>
          <b:section id='main' maxwidgets='1' name='Main Editorial Content' showaddelement='no'>
            <b:widget id='Blog1' locked='true' title='News Posts' type='Blog' version='2'>
              <b:includable id='main'>

                <!-- VIEW 1: ERROR 404 VIEW -->
                <b:if cond='data:view.isError'>
                  <div class='error-notice-card'>
                    <div class='error-code'>404</div>
                    <h1 class='error-title'>Dispatch Not Found</h1>
                    <p class='error-desc'>The article, report, or page you requested could not be located in our editorial archives. It may have been archived under an updated headline or URL.</p>
                    <form class='search-refine-form' expr:action='data:blog.searchUrl' style='margin: 0 auto 20px;'>
                      <input class='search-refine-input' name='q' placeholder='Search archives for topic or name...' type='search'/>
                      <button class='search-refine-btn' type='submit'>Search</button>
                    </form>
                    <a expr:href='data:blog.homepageUrl.canonical' style='color: var(--accent-red); font-weight: 700;'>&#8592; Return to Front Page</a>
                  </div>

                <!-- VIEW 2: SINGLE POST / ARTICLE VIEW -->
                <b:elseif cond='data:view.isPost'/>
                  <b:loop values='data:posts' var='post'>
                    <article class='article-reading-col' expr:id='"post-" + data:post.id'>

                      <!-- Breadcrumbs -->
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

                      <!-- Article Header -->
                      <header class='article-header'>
                        <b:loop index='lblIdx' values='data:post.labels' var='label'>
                          <b:if cond='data:lblIdx == 0'>
                            <span class='article-kicker-desk'><data:label.name/> Desk</span>
                          </b:if>
                        </b:loop>
                        <h1 class='article-main-headline'><data:post.title/></h1>
                        <b:if cond='data:post.snippet'>
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
                            <time expr:datetime='data:post.date.iso8601'><data:post.date/></time>
                            <span>&#8226;</span>
                            <span id='reading-time'>3 min read</span>
                          </div>
                        </div>
                      </header>

                      <!-- Share Strip -->
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
                        <button aria-label='Copy Article Link' class='share-btn share-copy' expr:data-url='data:post.url.canonical' id='copy-link-btn'>
                          <svg fill='none' height='14' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' width='14'><path d='M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71'/><path d='M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71'/></svg>
                        </button>
                      </div>

                      <!-- Featured Hero Image -->
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

                      <!-- Labels / Tags Row -->
                      <b:if cond='data:post.labels'>
                        <div class='article-tags-section'>
                          <span class='tags-label'>Filed Under:</span>
                          <b:loop values='data:post.labels' var='label'>
                            <a class='tag-badge' expr:href='data:label.url'>#<data:label.name/></a>
                          </b:loop>
                        </div>
                      </b:if>

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
                        &quot;description&quot;: &quot;<b:if cond='data:post.snippet'><data:post.snippet.jsonEscaped/><b:else/><data:post.title.jsonEscaped/></b:if>&quot;,
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
                        <b:include data='post' name='comments'/>
                      </section>

                    </article>
                  </b:loop>

                <!-- VIEW 3: STATIC PAGE VIEW (isPage) -->
                <b:elseif cond='data:view.isPage'/>
                  <b:loop values='data:posts' var='post'>
                    <article class='article-reading-col' expr:id='"page-" + data:post.id'>
                      <header class='article-header'>
                        <h1 class='article-main-headline'><data:post.title/></h1>
                      </header>
                      <div class='article-body-content'>
                        <data:post.body/>
                      </div>
                    </article>
                  </b:loop>

                <!-- VIEW 4: HOMEPAGE (isHomepage) -->
                <b:elseif cond='data:view.isHomepage'/>
                  <!-- LEAD COVER STORY (i == 0) -->
                  <b:loop index='i' values='data:posts' var='post'>
                    <b:if cond='data:i == 0'>
                      <article class='lead-story-card' expr:id='"lead-" + data:post.id'>
                        <h2 class='lead-headline'>
                          <a expr:href='data:post.url'><data:post.title/></a>
                        </h2>
                        <div class='lead-media-wrap'>
                          <a expr:href='data:post.url'>
                            <b:if cond='data:post.featuredImage'>
                              <img expr:alt='data:post.title' expr:src='resizeImage(data:post.featuredImage, 1200, "16:9")' fetchpriority='high'/>
                            <b:else/>
                              <img alt='Newsroom Lead Story' fetchpriority='high' src='https://picsum.photos/seed/leadnews/1200/675'/>
                            </b:if>
                          </a>
                        </div>
                        <b:if cond='data:post.snippet'>
                          <p class='lead-deck'><data:post.snippet/></p>
                        </b:if>
                        <div class='lead-meta'>
                          <span class='meta-author'>By <data:post.author.name/></span>
                          <span>&#8226;</span>
                          <time expr:datetime='data:post.date.iso8601'><data:post.date/></time>
                        </div>
                      </article>
                    </b:if>
                  </b:loop>

                  <!-- EDITORIAL HORIZONTAL STREAM (i > 0) -->
                  <div class='editorial-stream-grid'>
                    <b:loop index='i' values='data:posts' var='post'>
                      <b:if cond='data:i &gt; 0'>
                        <article class='news-card-horizontal' expr:id='"stream-" + data:post.id'>
                          <div>
                            <b:loop index='lblIdx' values='data:post.labels' var='label'>
                              <b:if cond='data:lblIdx == 0'>
                                <span class='card-kicker'><data:label.name/></span>
                              </b:if>
                            </b:loop>
                            <h3 class='card-headline'>
                              <a expr:href='data:post.url'><data:post.title/></a>
                            </h3>
                            <b:if cond='data:post.snippet'>
                              <p class='card-snippet'><data:post.snippet/></p>
                            </b:if>
                            <div class='card-meta-line'>
                              <span><data:post.author.name/></span>
                              <span>&#8226;</span>
                              <time expr:datetime='data:post.date.iso8601'><data:post.date/></time>
                            </div>
                          </div>
                          <div class='card-thumb-wrap'>
                            <a expr:href='data:post.url'>
                              <b:if cond='data:post.featuredImage'>
                                <img expr:alt='data:post.title' expr:src='resizeImage(data:post.featuredImage, 400, "16:10")' loading='lazy'/>
                              <b:else/>
                                <img alt='Story' loading='lazy' src='https://picsum.photos/seed/newsstream/400/250'/>
                              </b:if>
                            </a>
                          </div>
                        </article>
                      </b:if>
                    </b:loop>
                  </div>

                  <!-- Homepage Pagination -->
                  <div class='blog-pager'>
                    <b:if cond='data:newerPageUrl'>
                      <a expr:href='data:newerPageUrl'>&#8592; Newer Dispatches</a>
                    </b:if>
                    <b:if cond='data:olderPageUrl'>
                      <a expr:href='data:olderPageUrl'>Older Dispatches &#8594;</a>
                    </b:if>
                  </div>

                <!-- VIEW 5: ARCHIVE / SEARCH / LABEL MULTIPLE ITEMS -->
                <b:else/>
                  <div class='archive-cards-grid'>
                    <b:loop values='data:posts' var='post'>
                      <article class='brief-item' style='padding: 16px; background: var(--bg-subtle); border-radius: var(--radius-xs);'>
                        <div class='brief-thumb-wrap'>
                          <a expr:href='data:post.url'>
                            <b:if cond='data:post.featuredImage'>
                              <img expr:alt='data:post.title' expr:src='resizeImage(data:post.featuredImage, 500, "16:9")' loading='lazy'/>
                            <b:else/>
                              <img alt='Archive Story' loading='lazy' src='https://picsum.photos/seed/arch/500/280'/>
                            </b:if>
                          </a>
                        </div>
                        <b:loop index='lblIdx' values='data:post.labels' var='label'>
                          <b:if cond='data:lblIdx == 0'>
                            <span class='brief-kicker'><data:label.name/></span>
                          </b:if>
                        </b:loop>
                        <h3 class='card-headline'>
                          <a expr:href='data:post.url'><data:post.title/></a>
                        </h3>
                        <b:if cond='data:post.snippet'>
                          <p class='card-snippet'><data:post.snippet/></p>
                        </b:if>
                        <div class='card-meta-line' style='margin-top: 8px;'>
                          <time expr:datetime='data:post.date.iso8601'><data:post.date/></time>
                        </div>
                      </article>
                    </b:loop>
                  </div>

                  <!-- Archive Pagination -->
                  <div class='blog-pager'>
                    <b:if cond='data:newerPageUrl'>
                      <a expr:href='data:newerPageUrl'>&#8592; Newer Coverage</a>
                    </b:if>
                    <b:if cond='data:olderPageUrl'>
                      <a expr:href='data:olderPageUrl'>Older Coverage &#8594;</a>
                    </b:if>
                  </div>
                </b:if>

              </b:includable>
            </b:widget>
          </b:section>
        </section>

        <!-- ==========================================================
             RIGHT SIDEBAR: AD CONTAINER + POPULAR POSTS + VIDEOS
             ========================================================== -->
        <aside class='portal-sidebar'>
          <b:section id='sidebar' maxwidgets='4' name='Right Editorial Sidebar' showaddelement='yes'>

            <!-- Widget 1: 300x250 Fixed Ad Slot (Zero CLS) -->
            <b:widget id='HTML2' locked='false' title='Sponsor Ad Slot' type='HTML' version='2'>
              <b:includable id='main'>
                <div class='news-ad-box'>
                  <span class='ad-disclaimer'>Advertisement</span>
                  <div class='ad-mock-content'>
                    <strong>300 &#215; 250 Premium Ad Slot</strong>
                    <p style='font-size:0.75rem; margin-top:4px;'>Google AdSense or Direct Sponsorship Partner</p>
                  </div>
                </div>
              </b:includable>
            </b:widget>

            <!-- Widget 2: Most Read / Trending (Valid ALL_TIME settings) -->
            <b:widget id='PopularPosts1' locked='false' title='Most Read Dispatches' type='PopularPosts' version='2'>
              <b:widget-settings>
                <b:widget-setting name='numItemsToShow'>5</b:widget-setting>
                <b:widget-setting name='showThumbnails'>false</b:widget-setting>
                <b:widget-setting name='showSnippets'>false</b:widget-setting>
                <b:widget-setting name='timeRange'>ALL_TIME</b:widget-setting>
              </b:widget-settings>
              <b:includable id='main'>
                <div>
                  <div class='sidebar-box-header'>
                    <h3 class='sidebar-box-title'>Most Read</h3>
                  </div>
                  <ol class='popular-posts-stack'>
                    <b:loop values='data:posts' var='post'>
                      <li class='popular-post-item'>
                        <h4 class='popular-post-title'>
                          <a expr:href='data:post.href'><data:post.title/></a>
                        </h4>
                      </li>
                    </b:loop>
                  </ol>
                </div>
              </b:includable>
            </b:widget>

            <!-- Widget 3: Featured Videos / Multimedia Showcase -->
            <b:widget id='HTML3' locked='false' title='Featured Videos' type='HTML' version='2'>
              <b:includable id='main'>
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
              </b:includable>
            </b:widget>

            <!-- Widget 4: Newsletter Morning Dispatch -->
            <b:widget id='HTML4' locked='false' title='Morning Dispatch' type='HTML' version='2'>
              <b:includable id='main'>
                <div class='dispatch-box'>
                  <h4 class='dispatch-title'>The Morning Edition</h4>
                  <p class='dispatch-desc'>Get essential investigative reporting and executive news briefs delivered to your inbox every morning at 7:00 AM.</p>
                  <form class='dispatch-form' onsubmit='event.preventDefault(); alert("Thank you for subscribing to the morning dispatch!");'>
                    <input class='dispatch-input' placeholder='name@company.com' required='required' type='email'/>
                    <button class='dispatch-btn' type='submit'>Join</button>
                  </form>
                </div>
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
      <b:section id='home-category-blocks' maxwidgets='2' name='Homepage Modular Category Blocks' showaddelement='yes'>
        <b:widget id='HTML5' locked='false' title='Business and Markets Desk' type='HTML' version='2'>
          <b:includable id='main'>
            <div class='modular-news-block'>
              <div class='sidebar-box-header'>
                <h3 class='sidebar-box-title'><data:title/></h3>
              </div>
              <div class='modular-block-grid'>
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
              </div>
            </div>
          </b:includable>
        </b:widget>
      </b:section>
    </section>
  </b:if>

  <!-- ==================================================================
       FOOTER ARCHITECTURE
       ================================================================== -->
  <footer id='site-footer'>
    <div class='site-wrapper'>
      <div class='footer-top-grid'>

        <!-- Col 1: Publication Info and Brand Section -->
        <b:section id='footer-brand' maxwidgets='1' name='Footer Brand &amp; Mission' showaddelement='no'>
          <b:widget id='Text1' locked='true' title='About Publication' type='Text' version='2'>
            <b:includable id='main'>
              <div>
                <div class='footer-brand-title'><data:blog.title/></div>
                <p class='footer-brand-desc'>Independent digital newspaper and editorial portal dedicated to fearless reporting, investigative journalism, and insightful analysis.</p>
              </div>
            </b:includable>
          </b:widget>
        </b:section>

        <!-- Col 2: Categories / News Desks Section -->
        <b:section id='footer-categories' maxwidgets='1' name='Footer News Desks' showaddelement='no'>
          <b:widget id='Label1' locked='true' title='News Desks' type='Label' version='2'>
            <b:includable id='main'>
              <div>
                <h4 class='footer-col-title'><data:title/></h4>
                <ul class='footer-links-list'>
                  <b:loop values='data:labels' var='label'>
                    <li><a expr:href='data:label.url'><data:label.name/></a></li>
                  </b:loop>
                </ul>
              </div>
            </b:includable>
          </b:widget>
        </b:section>

        <!-- Col 3: Legal and Newsroom Links Section -->
        <b:section id='footer-links' maxwidgets='1' name='Footer Editorial Links' showaddelement='no'>
          <b:widget id='LinkList3' locked='false' title='Newsroom &amp; Legal' type='LinkList' version='2'>
            <b:includable id='main'>
              <div>
                <h4 class='footer-col-title'>Editorial and Policies</h4>
                <ul class='footer-links-list'>
                  <b:if cond='data:links'>
                    <b:loop values='data:links' var='link'>
                      <li><a expr:href='data:link.target'><data:link.name/></a></li>
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
