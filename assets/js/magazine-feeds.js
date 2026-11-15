/**
 * Validation News Magzine Theme - Blogger JSON Feed API Loader
 * Handles dynamic Breaking News Ticker, Related Posts, Left Rail Briefs & Category Blocks.
 * Features automatic fallback to default feed whenever label queries return empty or fail.
 * @package ValidationNewsMagzine
 * @version 1.2.1
 * @author Jaydatta Khodave
 * @license MIT
 */

(function() {
  'use strict';

  function fetchFeedJson(feedUrl, callback, errorCallback) {
    fetch(feedUrl)
      .then(function(res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function(data) {
        if (data && data.feed && data.feed.entry && data.feed.entry.length > 0) {
          callback(data.feed.entry);
        } else {
          if (errorCallback) errorCallback();
        }
      })
      .catch(function(err) {
        if (errorCallback) errorCallback(err);
      });
  }

  function getEntryLink(entry) {
    if (!entry || !entry.link) return '#';
    for (var i = 0; i < entry.link.length; i++) {
      if (entry.link[i].rel === 'alternate') {
        return entry.link[i].href;
      }
    }
    return entry.link[0] ? entry.link[0].href : '#';
  }

  function getEntryThumbnail(entry, size) {
    var s = size || 'w400-h250-c';
    if (entry.media$thumbnail && entry.media$thumbnail.url) {
      return entry.media$thumbnail.url.replace(/\/s[0-9]+(-c)?\//, '/' + s + '/');
    }
    return '';
  }

  function initMagazineFeeds() {
    // 1. Dynamic Breaking News Live Ticker Loader
    var tickerBar = document.getElementById('breaking-news-bar');
    var tickerTrack = document.getElementById('breaking-ticker-track') || document.getElementById('breaking-ticker-content');

    if (tickerBar && tickerTrack) {
      var tickerLabel = tickerBar.getAttribute('data-label') || tickerBar.getAttribute('data-ticker-label') || 'breaking-news';
      var primaryTickerUrl = '/feeds/posts/default/-/' + encodeURIComponent(tickerLabel) + '?alt=json&max-results=6';
      var fallbackTickerUrl = '/feeds/posts/default?alt=json&max-results=6';

      function renderTicker(entries) {
        var html = '';
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          var href = getEntryLink(entry);
          var title = (entry.title && entry.title.$t) ? entry.title.$t : 'Breaking Dispatch';
          html += '<span class="ticker-item"><a href="' + href + '">' + title.replace(/"/g, '&quot;') + '</a></span><span class="ticker-divider">&#8226;</span>';
        }
        tickerTrack.innerHTML = html + html;
        tickerBar.style.display = 'block';
      }

      fetchFeedJson(primaryTickerUrl, renderTicker, function() {
        // Fallback to latest posts regardless of label
        fetchFeedJson(fallbackTickerUrl, renderTicker, function() {
          // Pre-rendered ticker items in HTML remain visible
        });
      });
    }

    // 2. Dynamic Related Coverage Loader on Single Post View
    var relatedGrid = document.getElementById('related-posts-grid');
    var firstTagLink = document.querySelector('.article-tags-section .tag-badge');

    if (relatedGrid) {
      var currentPath = window.location.pathname;
      var tagLabel = firstTagLink ? firstTagLink.textContent.replace('#', '').trim() : '';
      var primaryRelatedUrl = tagLabel ? ('/feeds/posts/default/-/' + encodeURIComponent(tagLabel) + '?alt=json&max-results=5') : '/feeds/posts/default?alt=json&max-results=5';
      var fallbackRelatedUrl = '/feeds/posts/default?alt=json&max-results=5';

      function renderRelated(entries) {
        var count = 0;
        var html = '';
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          var postHref = getEntryLink(entry);
          if (postHref && postHref.indexOf(currentPath) === -1 && count < 3) {
            var title = (entry.title && entry.title.$t) ? entry.title.$t : 'Related Dispatch';
            var thumb = getEntryThumbnail(entry, 'w400-h250-c');
            var imgHtml = thumb ?
              '<img src="' + thumb + '" alt="' + title.replace(/"/g, '&quot;') + '" loading="lazy"/>' :
              '<div style="aspect-ratio:16/10;background:var(--bg-subtle,#f1f5f9);display:flex;align-items:center;justify-content:center;color:var(--text-muted,#64748b);font-size:11px;font-weight:700;">EDITORIAL</div>';

            html += '<div class="related-card">' +
              '<div class="related-thumb-box"><a href="' + postHref + '">' + imgHtml + '</a></div>' +
              '<h4 class="related-card-title"><a href="' + postHref + '">' + title + '</a></h4>' +
              '</div>';
            count++;
          }
        }
        if (count > 0) {
          relatedGrid.innerHTML = html;
        }
      }

      fetchFeedJson(primaryRelatedUrl, renderRelated, function() {
        fetchFeedJson(fallbackRelatedUrl, renderRelated);
      });
    }

    // 3. Dynamic Left Rail Hydration ("Fast Dispatches")
    var leftRailFeed = document.querySelector('[data-rail-label]') || document.querySelector('[data-label="latest"]') || document.getElementById('rail-briefs-stream');
    if (leftRailFeed) {
      var railLabel = leftRailFeed.getAttribute('data-rail-label') || leftRailFeed.getAttribute('data-label');
      var primaryRailUrl = (railLabel && railLabel !== 'latest') ?
        ('/feeds/posts/default/-/' + encodeURIComponent(railLabel) + '?alt=json&max-results=6') :
        '/feeds/posts/default?alt=json&max-results=6';
      var fallbackRailUrl = '/feeds/posts/default?alt=json&max-results=6';

      function renderLeftRail(entries) {
        var railHtml = '';
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          var link = getEntryLink(entry);
          var title = (entry.title && entry.title.$t) ? entry.title.$t : 'Editorial Dispatch';
          var thumb = getEntryThumbnail(entry, 'w400-h225-c');
          var displayKicker = (railLabel && railLabel !== 'latest') ? railLabel : 'Dispatch';

          railHtml += '<article class="brief-item">';
          if (i === 0 && thumb) {
            railHtml += '<div class="brief-thumb-wrap"><a href="' + link + '"><img src="' + thumb + '" alt="' + title.replace(/"/g, '&quot;') + '" loading="lazy"/></a></div>';
          }
          railHtml += '<span class="brief-kicker">' + displayKicker + '</span>' +
            '<h4 class="brief-headline"><a href="' + link + '">' + title + '</a></h4>' +
            '</article>';
        }
        if (railHtml) {
          leftRailFeed.innerHTML = railHtml;
        }
      }

      fetchFeedJson(primaryRailUrl, renderLeftRail, function() {
        fetchFeedJson(fallbackRailUrl, renderLeftRail);
      });
    }

    // 4. Dynamic Category Blocks Hydration
    var categoryBlocks = document.querySelectorAll('[data-block-label], [data-label]');
    for (var b = 0; b < categoryBlocks.length; b++) {
      (function(blockEl) {
        var blockLabel = blockEl.getAttribute('data-block-label') || blockEl.getAttribute('data-label');
        var gridContainer = blockEl.querySelector('.modular-block-grid');
        if (blockLabel && gridContainer && blockLabel !== 'latest' && blockLabel !== 'Briefs' && blockLabel !== 'breaking-news') {
          var primaryBlockUrl = '/feeds/posts/default/-/' + encodeURIComponent(blockLabel) + '?alt=json&max-results=4';
          var fallbackBlockUrl = '/feeds/posts/default?alt=json&max-results=4';

          function renderBlock(entries) {
            var blockHtml = '';
            for (var k = 0; k < entries.length; k++) {
              var entry = entries[k];
              var link = getEntryLink(entry);
              var title = (entry.title && entry.title.$t) ? entry.title.$t : 'Desk Report';
              var thumb = getEntryThumbnail(entry, 'w400-h225-c');
              var imgMarkup = thumb ?
                '<img src="' + thumb + '" alt="' + title.replace(/"/g, '&quot;') + '" loading="lazy"/>' :
                '<div style="aspect-ratio:16/9;background:var(--bg-subtle,#f1f5f9);display:flex;align-items:center;justify-content:center;color:var(--text-muted,#64748b);font-size:10px;font-weight:700;">NEWSROOM</div>';

              blockHtml += '<article class="modular-card">' +
                '<div class="brief-thumb-wrap"><a href="' + link + '">' + imgMarkup + '</a></div>' +
                '<span class="brief-kicker">' + blockLabel + '</span>' +
                '<h4 class="brief-headline"><a href="' + link + '">' + title + '</a></h4>' +
                '</article>';
            }
            if (blockHtml) {
              gridContainer.innerHTML = blockHtml;
            }
          }

          fetchFeedJson(primaryBlockUrl, renderBlock, function() {
            fetchFeedJson(fallbackBlockUrl, renderBlock);
          });
        }
      })(categoryBlocks[b]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMagazineFeeds);
  } else {
    initMagazineFeeds();
  }
})();
