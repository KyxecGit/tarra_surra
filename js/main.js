/* ============================================
   Tarra & Sura — JavaScript (Full Version)
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

  // ── Preloader ──
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 800);
    });
    // Fallback
    setTimeout(() => preloader.classList.add('hidden'), 3000);
  }

  // ── Navbar scroll ──
  const navbar = document.querySelector('.navbar');
  if (navbar && !document.body.classList.contains('page-gate')) {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      navbar.classList.toggle('scrolled', y > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile menu ──
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');
  if (hamburger && mobileMenu) {
    const setMenuOpen = (open) => {
      hamburger.classList.toggle('active', open);
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    hamburger.addEventListener('click', () => {
      setMenuOpen(!mobileMenu.classList.contains('open'));
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });
  }

  // ── Scroll Reveal ──
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  // ── Smooth anchor scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Brand lockup: tagline flush with optical letters, never wider, never clipped ──
  const fitLockups = () => {
    document.querySelectorAll('.brand-lockup').forEach((box) => {
      const img = box.querySelector('.brand-lockup__logo');
      const line = box.querySelector('.brand-lockup__tagline');
      if (!img || !line) return;
      const apply = () => {
        const imgH = img.getBoundingClientRect().height;
        const imgW = img.naturalHeight
          ? imgH * (img.naturalWidth / img.naturalHeight)
          : img.getBoundingClientRect().width;
        if (imgW < 40) return;
        box.style.width = `${imgW}px`;

        const isSura = img.classList.contains('brand-lockup__logo--sura');
        // Tarra T-swash is ink (~11.2% of PNG). Tagline matches the letter block, not the swash.
        const leftFrac = isSura ? 0 : 0.112;
        const rightFrac = 0;
        const target = imgW * (1 - leftFrac - rightFrac);
        box.style.setProperty('--optical-shift', `${((leftFrac - rightFrac) / 2) * imgW}px`);

        let inner = line.querySelector('.brand-lockup__fit');
        if (!inner) {
          inner = document.createElement('span');
          inner.className = 'brand-lockup__fit';
          while (line.firstChild) inner.appendChild(line.firstChild);
          line.appendChild(inner);
        }

        const fontPx = Math.min(12.5, Math.max(9, imgW * 0.058));
        const track = 0.14;
        line.style.fontSize = `${fontPx}px`;
        line.style.letterSpacing = `${track}em`;
        line.style.wordSpacing = '0px';
        line.style.textIndent = '0px';
        line.style.padding = '0';
        line.style.boxSizing = 'border-box';
        line.style.whiteSpace = 'nowrap';
        line.style.textAlign = 'left';
        line.style.overflow = 'hidden';
        line.style.display = 'block';
        line.style.width = `${target}px`;
        line.style.marginLeft = `${imgW * leftFrac}px`;
        line.style.marginRight = `${imgW * rightFrac}px`;

        inner.style.display = 'block';
        inner.style.width = 'max-content';
        inner.style.whiteSpace = 'nowrap';
        inner.style.letterSpacing = `${track}em`;
        inner.style.transformOrigin = 'left top';
        inner.style.transform = 'none';

        const glyphWidth = () => inner.getBoundingClientRect().width - parseFloat(getComputedStyle(inner).letterSpacing || '0');
        const natural = glyphWidth();
        if (natural < target) {
          const chars = Math.max(2, (inner.textContent || '').trim().length);
          const extra = (target - natural) / (chars - 1);
          inner.style.letterSpacing = `${track + extra / fontPx}em`;
          inner.style.transform = 'none';
          line.style.height = `${fontPx * 1.2}px`;
        } else {
          const scale = target / Math.max(1, natural);
          inner.style.transform = `scale(${scale})`;
          line.style.height = `${fontPx * 1.2 * scale}px`;
        }
      };
      if (img.complete && img.naturalWidth) apply();
      else img.addEventListener('load', apply, { once: true });
    });
  };
  const scheduleFit = () => requestAnimationFrame(() => requestAnimationFrame(fitLockups));
  scheduleFit();
  window.addEventListener('resize', scheduleFit);
  window.addEventListener('load', scheduleFit);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', scheduleFit);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleFit);
  }

  // ── Split screen interaction (desktop hover only) ──
  const splitPanels = document.querySelectorAll('.split-panel');
  if (splitPanels.length && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    splitPanels.forEach(panel => {
      panel.addEventListener('mouseenter', () => {
        splitPanels.forEach(p => {
          if (p !== panel) p.style.opacity = '0.55';
        });
      });
      panel.addEventListener('mouseleave', () => {
        splitPanels.forEach(p => p.style.opacity = '1');
      });
    });
  }

  // ── Lightbox ──
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const galleryItems = document.querySelectorAll('.gallery-page__item img, .chef-gallery__item img, .chef-gallery__mosaic img');

  if (lightbox && lightboxImg) {
    galleryItems.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });

    const closeBtn = lightbox.querySelector('.lightbox__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  // ── Create lightbox dynamically if not present ──
  if (!lightbox) {
    const galleryPageItems = document.querySelectorAll('.gallery-page__item img, .chef-gallery__item img, .chef-gallery__mosaic img');
    if (galleryPageItems.length > 0) {
      const lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = '<button class="lightbox__close">&times;</button><img src="" alt="Lightbox">';
      document.body.appendChild(lb);
      const lbImg = lb.querySelector('img');

      galleryPageItems.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
          lbImg.src = img.src;
          lb.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      });

      lb.addEventListener('click', () => {
        lb.classList.remove('active');
        document.body.style.overflow = '';
      });
      lb.querySelector('.lightbox__close').addEventListener('click', (e) => {
        e.stopPropagation();
        lb.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  // ── Marquee duplicate for infinite scroll ──
  const marquee = document.querySelector('.atmosphere__marquee');
  if (marquee) {
    const items = marquee.innerHTML;
    marquee.innerHTML = items + items;
  }

  // ── Parallax on image breaks ──
  const imageBreaks = document.querySelectorAll('.image-break__bg');
  if (imageBreaks.length > 0) {
    window.addEventListener('scroll', () => {
      imageBreaks.forEach(bg => {
        const rect = bg.parentElement.getBoundingClientRect();
        const speed = 0.3;
        const yPos = -(rect.top * speed);
        bg.style.transform = `translateY(${yPos}px)`;
      });
    }, { passive: true });
  }

  // ── Text reveal on scroll (letter by letter) — optional enhancement ──
  const splitTextElements = document.querySelectorAll('.hero__logo-text, .sura-hero .hero__logo-text');
  // Subtle opacity animation already handled by CSS

  // ── Gallery Filter ──
  const filterBtns = document.querySelectorAll('.gallery-page__filter');
  const galleryGridItems = document.querySelectorAll('.gallery-page__item');

  if (filterBtns.length > 0 && galleryGridItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        galleryGridItems.forEach(item => {
          const cat = item.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            item.classList.remove('hidden');
            item.style.display = '';
          } else {
            item.classList.add('hidden');
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ── Cookie Consent ──
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');
  if (cookieBanner) {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setTimeout(() => cookieBanner.classList.add('visible'), 1500);
    }
    if (cookieAccept) {
      cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'all');
        cookieBanner.classList.remove('visible');
      });
    }
    if (cookieDecline) {
      cookieDecline.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'essential');
        cookieBanner.classList.remove('visible');
      });
    }
  }

});
