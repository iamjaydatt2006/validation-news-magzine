/**
 * Validation News Magzine Theme - Article Editorial Tools (TOC, Reading Time, Share, Font Size, Progress)
 * @package ValidationNewsMagzine
 * @version 1.2.0
 * @author Jaydatta Khodave
 * @license MIT
 */

(function() {
  'use strict';

  function initArticleTools() {
    const articleBody = document.getElementById('article-content');

    // 1. Reading Progress Bar (Fixed Viewport Top)
    const progressBar = document.getElementById('reading-progress-bar');
    if (progressBar && articleBody) {
      window.addEventListener('scroll', function() {
        const rect = articleBody.getBoundingClientRect();
        const winHeight = window.innerHeight;
        const totalHeight = articleBody.offsetHeight;
        const scrolled = Math.max(0, -rect.top);
        const progress = Math.min(100, Math.max(0, (scrolled / (totalHeight - winHeight + 100)) * 100));
        progressBar.style.width = progress + '%';
      }, { passive: true });
    }

    // 2. Estimated Reading Time Calculator
    const readingTimeEl = document.getElementById('reading-time');
    if (articleBody && readingTimeEl) {
      const words = articleBody.innerText.trim().split(/\s+/).filter(Boolean).length;
      const readMinutes = Math.max(1, Math.ceil(words / 200));
      readingTimeEl.textContent = readMinutes + ' min read';
    }

    // 3. Font Size Adjuster Controls (A- / A / A+)
    const btnDec = document.getElementById('font-size-dec');
    const btnReset = document.getElementById('font-size-reset');
    const btnInc = document.getElementById('font-size-inc');
    const fontSizes = ['15px', '17.5px', '20px'];
    let currentIdx = 1;

    function applyFontSize(idx) {
      if (articleBody) {
        articleBody.style.fontSize = fontSizes[idx];
      }
    }

    if (btnDec) {
      btnDec.addEventListener('click', function() {
        currentIdx = Math.max(0, currentIdx - 1);
        applyFontSize(currentIdx);
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', function() {
        currentIdx = 1;
        applyFontSize(currentIdx);
      });
    }

    if (btnInc) {
      btnInc.addEventListener('click', function() {
        currentIdx = Math.min(fontSizes.length - 1, currentIdx + 1);
        applyFontSize(currentIdx);
      });
    }

    // 4. Print Article Handler
    const printBtn = document.getElementById('print-article-btn');
    if (printBtn) {
      printBtn.addEventListener('click', function() {
        window.print();
      });
    }

    // 5. Auto Table of Contents Generator
    const tocContainer = document.getElementById('toc-container');
    const tocList = document.getElementById('toc-list');
    const tocToggle = document.getElementById('toc-toggle');
    const tocIcon = document.getElementById('toc-icon');

    if (articleBody && tocContainer && tocList) {
      const headings = articleBody.querySelectorAll('h2, h3');
      if (headings.length >= 2) {
        tocContainer.style.display = 'block';
        headings.forEach(function(h, idx) {
          if (!h.id) {
            h.id = 'section-node-' + idx;
          }
          const li = document.createElement('li');
          if (h.tagName.toLowerCase() === 'h3') {
            li.className = 'toc-h3';
          }
          const a = document.createElement('a');
          a.href = '#' + h.id;
          a.textContent = h.textContent.trim();
          li.appendChild(a);
          tocList.appendChild(li);
        });

        if (tocToggle && tocIcon) {
          tocToggle.addEventListener('click', function() {
            if (tocList.style.display === 'none') {
              tocList.style.display = 'flex';
              tocIcon.innerHTML = '&#9660;';
            } else {
              tocList.style.display = 'none';
              tocIcon.innerHTML = '&#9654;';
            }
          });
        }
      }
    }

    // 6. Social Share Actions & Clipboard Copy
    const copyBtn = document.getElementById('copy-link-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function() {
        const url = copyBtn.getAttribute('data-url') || window.location.href;
        navigator.clipboard.writeText(url).then(function() {
          const original = copyBtn.innerHTML;
          copyBtn.innerHTML = '<span style="font-size:11px;font-weight:700;">OK!</span>';
          setTimeout(function() { copyBtn.innerHTML = original; }, 2000);
        });
      });
    }

    document.querySelectorAll('.share-tw').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const u = encodeURIComponent(btn.getAttribute('data-url') || window.location.href);
        const t = encodeURIComponent(btn.getAttribute('data-title') || document.title);
        window.open('https://twitter.com/intent/tweet?url=' + u + '&text=' + t, '_blank', 'width=600,height=400');
      });
    });

    document.querySelectorAll('.share-fb').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const u = encodeURIComponent(btn.getAttribute('data-url') || window.location.href);
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + u, '_blank', 'width=600,height=400');
      });
    });

    document.querySelectorAll('.share-wa').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const u = encodeURIComponent(btn.getAttribute('data-url') || window.location.href);
        const t = encodeURIComponent(btn.getAttribute('data-title') || document.title);
        window.open('https://api.whatsapp.com/send?text=' + t + '%20' + u, '_blank');
      });
    });

    document.querySelectorAll('.share-tg').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const u = encodeURIComponent(btn.getAttribute('data-url') || window.location.href);
        const t = encodeURIComponent(btn.getAttribute('data-title') || document.title);
        window.open('https://t.me/share/url?url=' + u + '&text=' + t, '_blank');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArticleTools);
  } else {
    initArticleTools();
  }
})();
