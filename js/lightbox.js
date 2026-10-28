document.addEventListener('DOMContentLoaded', () => {
  const images = [...new Set(document.querySelectorAll('.gallery-page__item img, .chef-gallery__item img, .chef-gallery__mosaic img, .menu-stage img'))];
  if (!images.length) return;

  const viewer = document.createElement('dialog');
  viewer.className = 'lightbox';
  viewer.setAttribute('aria-label', 'Image viewer');
  viewer.innerHTML = `
    <header class="lightbox__toolbar">
      <p class="lightbox__caption"></p>
      <div class="lightbox__controls">
        <a class="lightbox__original" target="_blank" rel="noopener noreferrer">Original ↗</a>
        <button type="button" data-zoom="out" aria-label="Zoom out">−</button>
        <button type="button" data-zoom="in" aria-label="Zoom in">+</button>
        <button type="button" data-zoom="fit" aria-label="Fit to screen">Fit</button>
        <button type="button" class="lightbox__close" aria-label="Close image viewer" autofocus>×</button>
      </div>
    </header>
    <div class="lightbox__viewport" tabindex="0" aria-label="Image — use zoom controls and scroll to explore">
      <div class="lightbox__canvas"><img alt=""></div>
    </div>
    <div class="lightbox__navigation">
      <button type="button" data-photo="previous" aria-label="Previous image">←</button>
      <span class="lightbox__counter" aria-live="polite"></span>
      <button type="button" data-photo="next" aria-label="Next image">→</button>
    </div>`;
  document.body.appendChild(viewer);

  const viewport = viewer.querySelector('.lightbox__viewport');
  const canvas = viewer.querySelector('.lightbox__canvas');
  const photo = canvas.querySelector('img');
  const zoomIn = viewer.querySelector('[data-zoom="in"]');
  const zoomOut = viewer.querySelector('[data-zoom="out"]');
  const fit = viewer.querySelector('[data-zoom="fit"]');
  const previous = viewer.querySelector('[data-photo="previous"]');
  const next = viewer.querySelector('[data-photo="next"]');
  const close = viewer.querySelector('.lightbox__close');
  let zoom = 1;
  let current = 0;
  let visibleImages = [];
  let opener;
  let loadId = 0;

  const setZoom = (value) => {
    const focused = document.activeElement;
    const centerX = (viewport.scrollLeft + viewport.clientWidth / 2) / Math.max(canvas.clientWidth, 1);
    const centerY = (viewport.scrollTop + viewport.clientHeight / 2) / Math.max(canvas.clientHeight, 1);
    zoom = Math.max(1, Math.min(6, value));
    const scale = Math.min(viewport.clientWidth / Math.max(photo.naturalWidth, 1), viewport.clientHeight / Math.max(photo.naturalHeight, 1), 1);
    const width = photo.naturalWidth * scale * zoom;
    const height = photo.naturalHeight * scale * zoom;
    photo.style.width = `${width}px`;
    photo.style.height = `${height}px`;
    canvas.style.width = `${Math.max(viewport.clientWidth, width)}px`;
    canvas.style.height = `${Math.max(viewport.clientHeight, height)}px`;
    viewport.scrollLeft = centerX * canvas.clientWidth - viewport.clientWidth / 2;
    viewport.scrollTop = centerY * canvas.clientHeight - viewport.clientHeight / 2;
    zoomOut.disabled = fit.disabled = zoom === 1;
    zoomIn.disabled = zoom === 6;
    if ([zoomOut, zoomIn, fit].includes(focused) && focused.disabled) viewport.focus({ preventScroll: true });
  };

  const showPhoto = async (index) => {
    current = Math.max(0, Math.min(visibleImages.length - 1, index));
    const source = visibleImages[current];
    const requestId = ++loadId;
    photo.alt = source.alt;
    photo.src = source.currentSrc || source.src;
    viewer.querySelector('.lightbox__original').href = photo.src;
    viewer.querySelector('.lightbox__caption').textContent = source.alt;
    viewer.querySelector('.lightbox__counter').textContent = `${current + 1} / ${visibleImages.length}`;
    previous.disabled = current === 0;
    next.disabled = current === visibleImages.length - 1;
    if (document.activeElement === previous && previous.disabled) (next.disabled ? close : next).focus();
    if (document.activeElement === next && next.disabled) (previous.disabled ? close : previous).focus();
    await photo.decode().catch(() => {});
    if (viewer.open && requestId === loadId) setZoom(1);
  };

  images.forEach((image) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'media-zoom';
    button.setAttribute('aria-label', `Open ${image.alt || 'photo'}`);
    image.before(button);
    button.appendChild(image);
    button.addEventListener('click', () => {
      visibleImages = images.filter(img => img.closest('.media-zoom').getClientRects().length > 0);
      opener = button;
      viewer.showModal();
      document.body.classList.add('is-lightbox-open');
      close.focus();
      showPhoto(visibleImages.indexOf(image));
    });
  });

  zoomIn.addEventListener('click', () => setZoom(zoom * 1.5));
  zoomOut.addEventListener('click', () => setZoom(zoom / 1.5));
  fit.addEventListener('click', () => setZoom(1));
  previous.addEventListener('click', () => showPhoto(current - 1));
  next.addEventListener('click', () => showPhoto(current + 1));
  close.addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => {
    loadId++;
    document.body.classList.remove('is-lightbox-open');
    opener?.focus({ preventScroll: true });
  });
  viewer.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      const controls = [...viewer.querySelectorAll('a[href], button:not(:disabled), [tabindex="0"]')].filter(el => el.getClientRects().length);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    } else if (zoom > 1 && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      viewport.scrollBy({ left: event.key === 'ArrowLeft' ? -100 : event.key === 'ArrowRight' ? 100 : 0,
        top: event.key === 'ArrowUp' ? -100 : event.key === 'ArrowDown' ? 100 : 0, behavior: 'instant' });
    } else if (event.key === '+' || event.key === '=') setZoom(zoom * 1.5);
    else if (event.key === '-') setZoom(zoom / 1.5);
    else if (zoom === 1 && event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(current - 1); }
    else if (zoom === 1 && event.key === 'ArrowRight') { event.preventDefault(); showPhoto(current + 1); }
  });
  window.addEventListener('resize', () => { if (viewer.open) setZoom(1); });
});
