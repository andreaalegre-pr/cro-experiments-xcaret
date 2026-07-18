(function () {
  // ------------------------------------------------------------------
  // CONFIG
  // ------------------------------------------------------------------
  var SCROLL_THRESHOLD_PERCENT = 15;
  var ORIGINAL_SELECTOR = 'button[name="getYourAdmission"]';
  var MOBILE_NAV_SELECTOR = 'nav.menu-mobile';
  var MODAL_SELECTOR = '[class*="bookingModal-template_contentMobile"]';
  var H1_SELECTOR = 'h1[itemprop="name"]';
  var STICKY_ID = 'sticky-cta-quote-parks';
  var MOBILE_BREAKPOINT = 1024;

  var originalBtn = document.querySelector(ORIGINAL_SELECTOR);
  if (!originalBtn) {
    console.warn('[Sticky CTA] No se encontró el botón original.');
    return;
  }
  if (document.getElementById(STICKY_ID)) return;

  // ------------------------------------------------------------------
  // COPY DINÁMICO (replicable en cualquier PDP)
  // Toma el <h1 itemprop="name"> de la página, limpia prefijos genéricos
  // ("Entrada a", "Boleto a", etc.) y arma un copy corto para el CTA de
  // desktop. Si no encuentra H1, usa un copy genérico de respaldo.
  // ------------------------------------------------------------------
  function getDesktopCopy() {
    var FALLBACK_COPY = '¿Listo para vivir la experiencia?';
    var h1 = document.querySelector(H1_SELECTOR);
    if (!h1) return FALLBACK_COPY;

    var name = h1.textContent.trim();
    // Limpia prefijos comunes para quedarnos solo con el nombre del producto/parque
    name = name
      .replace(/^entradas?\s+a(l)?\s+/i, '')
      .replace(/^boletos?\s+a(l)?\s+/i, '')
      .replace(/^acceso\s+a(l)?\s+/i, '')
      .trim();

    if (!name) return FALLBACK_COPY;
    return '¿Listo para vivir ' + name + '?';
  }

  // ------------------------------------------------------------------
  // ESTILOS
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
      background: #4CAF50; /* ajustar al hex exacto de bg-booking-parks-quote-button */
      box-shadow: 0 -2px 10px rgba(0,0,0,0.15);
      transform: translateY(100%);
      transition: transform 0.3s ease-in-out, bottom 0.15s linear;
      box-sizing: border-box;
    }
    #${STICKY_ID}.is-visible {
      transform: translateY(0);
    }
    /* Oculta el CTA cuando el modal de compra está abierto (mobile) */
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

    /* Mobile: botón más angosto, centrado, ya no 100% de ancho */
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

    /* Desktop: copy a la izquierda + CTA a la derecha */
    @media (min-width: ${MOBILE_BREAKPOINT}px) {
      #${STICKY_ID} .sticky-cta-inner {
        max-width: 1280px; /* ajustar al max-width real del layout del sitio */
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

  // ------------------------------------------------------------------
  // MARKUP: copy (solo desktop, vía CSS se oculta en mobile) + botón
  // ------------------------------------------------------------------
  var wrapper = document.createElement('div');
  wrapper.id = STICKY_ID;

  var inner = document.createElement('div');
  inner.className = 'sticky-cta-inner';

  var copyEl = document.createElement('p');
  copyEl.className = 'sticky-cta-copy';
  copyEl.textContent = getDesktopCopy();
  // Se oculta en mobile vía media query (display none) para no afectar el layout angosto
  var hideCopyMobile = document.createElement('style');
  hideCopyMobile.innerHTML = `
    @media (max-width: ${MOBILE_BREAKPOINT - 1}px) {
      #${STICKY_ID} .sticky-cta-copy { display: none; }
    }
  `;
  document.head.appendChild(hideCopyMobile);

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
  // VISIBILIDAD POR SCROLL
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
  // OCULTAR CTA CUANDO EL MODAL DE COMPRA ESTÁ ABIERTO (mobile)
  // ------------------------------------------------------------------
  function isBookingModalOpen() {
    var modal = document.querySelector(MODAL_SELECTOR);
    if (!modal) return false;
    var computed = window.getComputedStyle(modal);
    if (computed.display === 'none' || computed.visibility === 'hidden') return false;
    var rect = modal.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  // ------------------------------------------------------------------
  // SINCRONIZACIÓN CON EL MENÚ MÓVIL INFERIOR + CHEQUEO DE MODAL
  // Un solo loop de rAF que ajusta la posición sobre el nav inferior y,
  // en paralelo, oculta el CTA si el modal de compra está abierto.
  // ------------------------------------------------------------------
  var mobileNav = document.querySelector(MOBILE_NAV_SELECTOR);

  function syncLoop() {
    // Offset sobre el menú móvil
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

    // Ocultar si el modal de compra está abierto
    wrapper.classList.toggle('is-modal-open', isBookingModalOpen());

    requestAnimationFrame(syncLoop);
  }
  requestAnimationFrame(syncLoop);

  updateStickyVisibility();

  console.log('[Sticky CTA] Inicializado correctamente. Copy desktop:', copyEl.textContent);
})();
