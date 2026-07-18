(function () {
  // ------------------------------------------------------------------
  // CONFIG
  // ------------------------------------------------------------------
  var SCROLL_THRESHOLD_PERCENT = 15;
  var ORIGINAL_SELECTOR = 'button[name="getYourAdmission"]';
  var MOBILE_NAV_SELECTOR = 'nav.menu-mobile';
  // Selector genérico: cubre variantes mobile Y desktop del modal de compra
  var MODAL_SELECTOR = '[class*="bookingModal"]';
  var H1_SELECTOR = 'h1[itemprop="name"]';
  var STICKY_ID = 'sticky-cta-quote-parks';
  var MOBILE_BREAKPOINT = 1024;

  var originalBtn = document.querySelector(ORIGINAL_SELECTOR);
  if (!originalBtn) {
    console.warn('[Sticky CTA] Original button not found.');
    return;
  }
  if (document.getElementById(STICKY_ID)) return;

  // ------------------------------------------------------------------
  // DYNAMIC COPY (replicable across PDPs)
  // Takes the <h1 itemprop="name">, cuts any subtitle after ":" "-" "|"
  // and strips generic prefixes, keeping only the short product/park name.
  // e.g. "Tickets to Xel-Há: Dive Into a Natural Paradise" -> "Xel-Há"
  // ------------------------------------------------------------------
  function getDesktopCopy() {
    var FALLBACK_COPY = 'Ready for the experience?';
    var h1 = document.querySelector(H1_SELECTOR);
    if (!h1) return FALLBACK_COPY;

    var name = h1.textContent.trim();

    // Cut subtitle after ":" "-" "|" -> "Tickets to Xel-Há: Dive Into..." -> "Tickets to Xel-Há"
    name = name.split(/[:\-|]/)[0].trim();

    // Strip generic English prefixes
    name = name
      .replace(/^tickets?\s+(to|for)\s+/i, '')
      .replace(/^admission\s+(to|for)\s+/i, '')
      .replace(/^access\s+(to|for)\s+/i, '')
      .replace(/^entrance\s+(to|for)\s+/i, '')
      .trim();

    if (!name) return FALLBACK_COPY;
    return 'Ready to experience ' + name + '?';
  }

  // ------------------------------------------------------------------
  // STYLES
  // ------------------------------------------------------------------
  var style = document.createElement('style');
  style.innerHTML = `
    #${STICKY_ID} {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      z-index: 9999;
      background: #4CAF50; /* adjust to the exact hex of bg-booking-parks-quote-button */
      box-shadow: 0 -2px 10px rgba(0,0,0,0.15);
      transform: translateY(100%);
      transition: transform 0.3s ease-in-out, bottom 0.15s linear;
      box-sizing: border-box;
    }
    #${STICKY_ID}.is-visible {
      transform: translateY(0);
    }
    /* Hide the CTA when the booking modal is open (mobile or desktop) */
    #${STICKY_ID}.is-modal-open {
      transform: translateY(100%) !important;
    }

    #${STICKY_ID} button {
      background-color: #ffffff !important;
      color: #1a1a1a !important;
      margin: 0 !important;
    }
    #${STICKY_ID} button:hover {
      background-color: #f2f2f2 !important;
      color: #1a1a1a !important;
    }

    #${STICKY_ID} .sticky-cta-inner {
      padding: 10px 16px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
    }

    @media (max-width: ${MOBILE_BREAKPOINT - 1}px) {
      #${STICKY_ID} .sticky-cta-inner button {
        width: auto !important;
        min-width: 0 !important;
        max-width: 240px;
        flex: 0 0 auto;
        padding-left: 32px !important;
        padding-right: 32px !important;
      }
    }

    @media (min-width: ${MOBILE_BREAKPOINT}px) {
      #${STICKY_ID} .sticky-cta-inner {
        max-width: 1280px;
        margin: 0 auto;
        padding: 14px 24px;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
      }
      #${STICKY_ID} .sticky-cta-copy {
        color: #ffffff;
        font-size: 18px;
        font-weight: 600;
        margin: 0;
      }
      #${STICKY_ID} .sticky-cta-inner button {
        width: auto !important;
        min-width: 240px;
        flex: 0 0 auto;
      }
    }
  `;
  document.head.appendChild(style);

  var hideCopyMobile = document.createElement('style');
  hideCopyMobile.innerHTML = `
    @media (max-width: ${MOBILE_BREAKPOINT - 1}px) {
      #${STICKY_ID} .sticky-cta-copy { display: none; }
    }
  `;
  document.head.appendChild(hideCopyMobile);

  // ------------------------------------------------------------------
  // MARKUP
  // ------------------------------------------------------------------
  var wrapper = document.createElement('div');
  wrapper.id = STICKY_ID;

  var inner = document.createElement('div');
  inner.className = 'sticky-cta-inner';

  var copyEl = document.createElement('p');
  copyEl.className = 'sticky-cta-copy';
  copyEl.textContent = getDesktopCopy();

  var clone = originalBtn.cloneNode(true);
  clone.removeAttribute('id');
  clone.addEventListener('click', function (e) {
    e.preventDefault();
    originalBtn.click();
  });

  inner.appendChild(copyEl);
  inner.appendChild(clone);
  wrapper.appendChild(inner);
  document.body.appendChild(wrapper);

  // ------------------------------------------------------------------
  // SCROLL VISIBILITY
  // ------------------------------------------------------------------
  var originalIsVisible = true;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      originalIsVisible = entry.isIntersecting;
      updateStickyVisibility();
    });
  }, { threshold: 0 });
  observer.observe(originalBtn);

  function getScrollPercent() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return 0;
    return (scrollTop / docHeight) * 100;
  }

  var ticking = false;
  function updateStickyVisibility() {
    var scrollPercent = getScrollPercent();
    var shouldShow = scrollPercent >= SCROLL_THRESHOLD_PERCENT && !originalIsVisible;
    wrapper.classList.toggle('is-visible', shouldShow);
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateStickyVisibility();
        ticking = false;
      });
      ticking = true;
    }
  });

  // ------------------------------------------------------------------
  // HIDE CTA WHEN THE BOOKING MODAL IS OPEN (mobile or desktop)
  // ------------------------------------------------------------------
  function isBookingModalOpen() {
    var modals = document.querySelectorAll(MODAL_SELECTOR);
    for (var i = 0; i < modals.length; i++) {
      var modal = modals[i];
      var computed = window.getComputedStyle(modal);
      if (computed.display === 'none' || computed.visibility === 'hidden') continue;
      var rect = modal.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) return true;
    }
    return false;
  }

  // ------------------------------------------------------------------
  // SYNC WITH MOBILE NAV + MODAL CHECK (single loop)
  // ------------------------------------------------------------------
  var mobileNav = document.querySelector(MOBILE_NAV_SELECTOR);

  function syncLoop() {
    if (window.innerWidth < MOBILE_BREAKPOINT && mobileNav) {
      var rect = mobileNav.getBoundingClientRect();
      var navVisibleHeight = Math.max(
        0,
        Math.min(rect.height, window.innerHeight - rect.top)
      );
      wrapper.style.bottom = navVisibleHeight + 'px';
    } else {
      wrapper.style.bottom = '';
    }

    wrapper.classList.toggle('is-modal-open', isBookingModalOpen());

    requestAnimationFrame(syncLoop);
  }
  requestAnimationFrame(syncLoop);

  updateStickyVisibility();

  console.log('[Sticky CTA] Initialized. Desktop copy:', copyEl.textContent);
})();
