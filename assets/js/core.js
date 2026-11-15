/**
 * Validation News Magzine Theme - Core UI & Interaction Controller
 * @package ValidationNewsMagzine
 * @version 1.2.0
 * @author Jaydatta Khodave
 * @license MIT
 */

(function() {
  'use strict';

  function initCore() {
    // 1. Live Date & Time Formatter
    const dateEl = document.getElementById('live-datetime');
    if (dateEl) {
      const now = new Date();
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('en-US', options) + ' | Updated Live';
    }

    const yearEl = document.getElementById('copyright-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // 2. Persistent Dark / Light Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const themeLabel = document.getElementById('theme-label');
    const STORAGE_KEY = 'validation_news_theme_mode';

    function applyTheme(isDark) {
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeLabel) themeLabel.textContent = 'Light Mode';
      } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeLabel) themeLabel.textContent = 'Dark Mode';
      }
    }

    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      applyTheme(true);
    } else {
      applyTheme(false);
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', function() {
        const isCurrentDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newDark = !isCurrentDark;
        applyTheme(newDark);
        localStorage.setItem(STORAGE_KEY, newDark ? 'dark' : 'light');
      });
    }

    // 3. Search Modal Overlay (Click + Ctrl/Cmd + K)
    const searchModal = document.getElementById('search-modal');
    const searchTrigger = document.getElementById('search-modal-trigger');
    const searchClose = document.getElementById('search-modal-close');
    const searchInput = document.getElementById('search-input');

    function openSearch() {
      if (searchModal) {
        searchModal.classList.add('is-open');
        if (searchInput) {
          setTimeout(function() { searchInput.focus(); }, 100);
        }
      }
    }

    function closeSearch() {
      if (searchModal) {
        searchModal.classList.remove('is-open');
      }
    }

    if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);

    if (searchModal) {
      searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) closeSearch();
      });
    }

    // 4. Mobile Slide-Over Navigation Drawer
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');
    const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');
    const drawerClose = document.getElementById('drawer-close-btn');

    function openDrawer() {
      if (drawer && drawerBackdrop) {
        drawer.classList.add('is-open');
        drawerBackdrop.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeDrawer() {
      if (drawer && drawerBackdrop) {
        drawer.classList.remove('is-open');
        drawerBackdrop.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }

    if (mobileBtn) mobileBtn.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    // Global Keyboard Shortcuts
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape') {
        closeSearch();
        closeDrawer();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCore);
  } else {
    initCore();
  }
})();
