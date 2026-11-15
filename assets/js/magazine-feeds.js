/**
 * Validation News Magzine Theme - Blogger JSON Feed API Loader
 * Handles dynamic Breaking News Ticker, Related Posts, Left Rail Briefs & Category Blocks.
 * @package ValidationNewsMagzine
 * @version 1.2.0
 * @author Jaydatta Khodave
 * @license MIT
 */

(function() {
  'use strict';

  function initMagazineFeeds() {
    // 1. Dynamic Breaking News Live Ticker Loader
    const tickerBar = document.getElementById('breaking-news-bar');
    const tickerTrack = document.getElementById('breaking-ticker-track') || document.getElementById('breaking-ticker-content');
    if (tickerBar && tickerTrack) {
      const tickerLabel = tickerBar.getAttribute('data-label') || tickerBar.getAttribute('data-ticker-label') || 'breaking-news';
      const tickerFeedUrl = '/feeds/posts/default/-/' + encodeURIComponent(tickerLabel) + '?alt=json&max-results=6';

      fetch(tickerFeedUrl)
        .then(function(res) {
          if (!res.ok) throw new Error('No breaking news feed');
          return res.json();
        })
        .then(function(data) {
          if (data && data.feed && data.feed.entry && data.feed.entry.length > 0) {
            const entries = data.feed.entry;
            let html = '';
            for (let i = 0; i < entries.length; i++) {
              const entry = entries[i];
              let href = '';
              if (entry.link) {
                for (let j = 0; j < entry.link.length; j++) {
                  if (entry.link[j].rel === 'alternate') {
                    href = entry.link[j].href;
                    break;
                  }
                }
              }
              const title = (entry.title && entry.title.$t) ? entry.title.$t : 'Breaking Dispatch';
              html += '<span class="ticker-item"><a href="' + href + '">' + title.replace(/"/g, '&quot;') + '</a></span><span class="ticker-divider">&#8226;</span>';
            }
            // Duplicate for smooth seamless infinite marquee loop
            tickerTrack.innerHTML = html + html;
            tickerBar.style.display = 'block';
          }
        })
        .catch(function() {
          // If no posts tagged breaking-news, fallback ticker items are preserved
        });
    }

    // 2. Dynamic Related Coverage Loader on Single Post
    const relatedGrid = document.getElementById('related-posts-grid');
    const firstTagLink = document.querySelector('.article-tags-section .tag-badge');

    if (relatedGrid && firstTagLink) {
      const label = firstTagLink.textContent.replace('#', '').trim();
      const currentUrl = window.location.pathname;
      const feedUrl = '/feeds/posts/default/-/' + encodeURIComponent(label) + '?alt=json&max-results=4';

      fetch(feedUrl)
        .then(function(res) {
          if (!res.ok) throw new Error('Network response not ok');
          return res.json();
        })
        .then(function(data) {
          if (data && data.feed && data.feed.entry && data.feed.entry.length > 0) {
            const entries = data.feed.entry;
            let count = 0;
            let html = '';

            for (let i = 0; i < entries.length; i++) {
              const entry = entries[i];
              let postHref = '';
              for (let j = 0; j < entry.link.length; j++) {
                if (entry.link[j].rel === 'alternate') {
                  postHref = entry.link[j].href;
                  break;
                }
              }

              if (postHref && postHref.indexOf(currentUrl) === -1 && count < 3) {
                const title = entry.title.$t;
                let thumb = 'https://picsum.photos/seed/' + i + '/400/250';
                if (entry.media$thumbnail) {
                  thumb = entry.media$thumbnail.url.replace('/s72-c/', '/w400-h250-c/');
                }

                html += '<div class="related-card">' +
                  '<div class="related-thumb-box"><a href="' + postHref + '"><img src="' + thumb + '" alt="' + title.replace(/"/g, '&quot;') + '" loading="lazy"/></a></div>' +
                  '<h4 class="related-card-title"><a href="' + postHref + '">' + title + '</a></h4>' +
                  '</div>';
                count++;
              }
            }

            if (count > 0) {
              relatedGrid.innerHTML = html;
            }
          }
        })
        .catch(function() {
          // Fallback static cards preserved
        });
    }

    // 3. Dynamic Left Rail Hydration via data-label or data-rail-label
    const leftRailFeed = document.querySelector('[data-rail-label]') || document.querySelector('[data-label="Briefs"]') || document.getElementById('rail-briefs-stream');
    if (leftRailFeed) {
      const railLabel = leftRailFeed.getAttribute('data-rail-label') || leftRailFeed.getAttribute('data-label') || 'Briefs';
      const railFeedUrl = railLabel ?
        ('/feeds/posts/default/-/' + encodeURIComponent(railLabel) + '?alt=json&max-results=5') :
        '/feeds/posts/default?alt=json&max-results=5';

      fetch(railFeedUrl)
        .then(function(res) { return res.json(); })
        .then(function(data) {
          if (data && data.feed && data.feed.entry && data.feed.entry.length > 0) {
            const entries = data.feed.entry;
            let railHtml = '';
            entries.forEach(function(entry, idx) {
              let link = '';
              for (let k = 0; k < entry.link.length; k++) {
                if (entry.link[k].rel === 'alternate') {
                  link = entry.link[k].href;
                  break;
                }
              }
              const title = entry.title.$t;
              let thumb = '';
              if (entry.media$thumbnail) {
                thumb = entry.media$thumbnail.url.replace('/s72-c/', '/w400-h225-c/');
              }
              const displayLabel = railLabel || 'Dispatch';

              railHtml += '<article class="brief-item">';
              if (idx === 0 && thumb) {
                railHtml += '<div class="brief-thumb-wrap"><a href="' + link + '"><img src="' + thumb + '" alt="' + title.replace(/"/g, '&quot;') + '" loading="lazy"/></a></div>';
              }
              railHtml += '<span class="brief-kicker">' + displayLabel + '</span>' +
                '<h4 class="brief-headline"><a href="' + link + '">' + title + '</a></h4>' +
                '</article>';
            });
            leftRailFeed.innerHTML = railHtml;
          }
        })
        .catch(function() {});
    }

    // 4. Dynamic Category Blocks Hydration via data-block-label or data-label
    document.querySelectorAll('[data-block-label], [data-label]').forEach(function(blockEl) {
      const blockLabel = blockEl.getAttribute('data-block-label') || blockEl.getAttribute('data-label');
      const gridContainer = blockEl.querySelector('.modular-block-grid');
      if (blockLabel && gridContainer && blockLabel !== 'Briefs' && blockLabel !== 'breaking-news') {
        const blockFeedUrl = '/feeds/posts/default/-/' + encodeURIComponent(blockLabel) + '?alt=json&max-results=3';
        fetch(blockFeedUrl)
          .then(function(res) { return res.json(); })
          .then(function(data) {
            if (data && data.feed && data.feed.entry && data.feed.entry.length > 0) {
              const entries = data.feed.entry;
              let blockHtml = '';
              entries.forEach(function(entry) {
                let link = '';
                for (let m = 0; m < entry.link.length; m++) {
                  if (entry.link[m].rel === 'alternate') {
                    link = entry.link[m].href;
                    break;
                  }
                }
                const title = entry.title.$t;
                let thumb = 'https://picsum.photos/seed/' + encodeURIComponent(title.slice(0, 5)) + '/400/225';
                if (entry.media$thumbnail) {
                  thumb = entry.media$thumbnail.url.replace('/s72-c/', '/w400-h225-c/');
                }

                blockHtml += '<article class="modular-card">' +
                  '<div class="brief-thumb-wrap"><a href="' + link + '"><img src="' + thumb + '" alt="' + title.replace(/"/g, '&quot;') + '" loading="lazy"/></a></div>' +
                  '<span class="brief-kicker">' + blockLabel + '</span>' +
                  '<h4 class="brief-headline"><a href="' + link + '">' + title + '</a></h4>' +
                  '</article>';
              });
              gridContainer.innerHTML = blockHtml;
            }
          })
          .catch(function() {});
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMagazineFeeds);
  } else {
    initMagazineFeeds();
  }
})();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMagazineFeeds);
  } else {
    initMagazineFeeds();
  }
})();
