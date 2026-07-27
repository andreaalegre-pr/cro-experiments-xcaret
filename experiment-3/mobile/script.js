(function () {
  const BRAND_BLUE = '#0095D9';

  function isVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function applyChanges() {
    const payButtons = Array.from(document.querySelectorAll('button[name="pay"]'));
    const payBtn = payButtons.find(isVisible);
    if (!payBtn) return;

    const buttonWrapper = payBtn.parentElement;
    const cartBtn = Array.from(buttonWrapper.children).find(
      el => el !== payBtn && el.tagName === 'BUTTON'
    );
    if (!cartBtn) return;

    // Layout vertical
    buttonWrapper.style.setProperty('display', 'flex', 'important');
    buttonWrapper.style.setProperty('flex-direction', 'column', 'important');
    buttonWrapper.style.setProperty('gap', '10px', 'important');
    buttonWrapper.style.setProperty('width', '100%', 'important');

    payBtn.style.setProperty('background-color', BRAND_BLUE, 'important');
    payBtn.style.setProperty('background-image', 'none', 'important');
    payBtn.style.setProperty('width', '100%', 'important');
    payBtn.style.setProperty('margin', '0', 'important');
    payBtn.style.setProperty('order', '1', 'important');

    cartBtn.style.setProperty('background-color', 'transparent', 'important');
    cartBtn.style.setProperty('background-image', 'none', 'important');
    cartBtn.style.setProperty('border', '2px solid #FF9313', 'important');
    cartBtn.style.setProperty('color', '#FF9313', 'important');
    cartBtn.style.setProperty('width', '100%', 'important');
    cartBtn.style.setProperty('margin', '0', 'important');
    cartBtn.style.setProperty('order', '2', 'important');

    // Ocultar el botón "Cerrar" duplicado
    document.querySelectorAll('.off-canvas_buttonBottom__IiwD4').forEach(el => {
      el.style.setProperty('display', 'none', 'important');
    });
  }

  applyChanges();

  const observer = new MutationObserver(() => {
    applyChanges();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  console.log('✅ Script activo: los cambios se reaplicarán automáticamente ante cualquier interacción en el modal.');
})();
