/**
 * Validation News Magzine Theme - Blogger JSON Feed API Loader
 * @package ValidationNewsMagzine
 * @version 1.0.0
 * @author Jaydatta Khodave
 * @license MIT
 */

(function() {
  'use strict';

  function initMagazineFeeds() {
    // 1. Dynamic Related Coverage Loader on Single Post
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
          // Keep static editorial dispatches as fallback on local preview or network disruption
        });
    }

    // 2. Optional Left Rail Dynamic Hydration via data-rail-label
    const leftRailFeed = document.querySelector('[data-rail-label]');
    if (leftRailFeed) {
      const railLabel = leftRailFeed.getAttribute('data-rail-label');
      if (railLabel) {
        const railFeedUrl = '/feeds/posts/default/-/' + encodeURIComponent(railLabel) + '?alt=json&max-results=5';
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

                railHtml += '<article class="brief-item">';
                if (idx === 0 && thumb) {
                  railHtml += '<div class="brief-thumb-wrap"><img src="' + thumb + '" alt="' + title.replace(/"/g, '&quot;') + '" loading="lazy"/></div>';
                }
                railHtml += '<span class="brief-kicker">' + railLabel + '</span>' +
                  '<h4 class="brief-headline"><a href="' + link + '">' + title + '</a></h4>' +
                  '</article>';
              });
              leftRailFeed.innerHTML = railHtml;
            }
          })
          .catch(function() {});
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMagazineFeeds);
  } else {
    initMagazineFeeds();
  }
})();
