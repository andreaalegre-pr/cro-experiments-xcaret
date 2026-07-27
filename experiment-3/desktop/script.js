(function () {
  const BRAND_BLUE = '#0095D9';

  function applyChanges() {
    // Contenedor exclusivo de desktop (tiene la clase "items-end", no tiene "flex-col")
    const outer = Array.from(document.querySelectorAll('div.border-t-2.border-grey-700'))
      .find(el => el.classList.contains('items-end') && !el.classList.contains('flex-col'));

    if (!outer) return false;

    const buttonWrapper = outer.querySelector('div.flex.justify-end');

    if (!buttonWrapper) return false;

    const cartBtn = buttonWrapper.children[0];
    const payBtn = buttonWrapper.querySelector('button[name="pay"]') || buttonWrapper.children[1];

    if (!cartBtn || !payBtn) return false;

    payBtn.style.setProperty('background-color', BRAND_BLUE, 'important');

    cartBtn.style.setProperty('background-color', 'transparent', 'important');
    cartBtn.style.setProperty('background-image', 'none', 'important');
    cartBtn.style.setProperty('border', '2px solid #FF9313', 'important');
    cartBtn.style.setProperty('color', '#FF9313', 'important');

    console.log('✅ Cambios aplicados (desktop).');
    return true;
  }

  if (applyChanges()) return;

  console.log('⏳ Modal no detectado aún, esperando a que se abra...');
  const observer = new MutationObserver(() => {
    if (applyChanges()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
