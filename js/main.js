/* ============================================
   Tarra & Sura — JavaScript (Full Version)
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  const scrollBehavior = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

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
    mobileMenu.inert = true;
    const setMenuOpen = (open) => {
      hamburger.classList.toggle('active', open);
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileMenu.inert = !open;
      document.body.classList.toggle('is-menu-open', open);
      if (open) mobileMenu.scrollTop = 0;
      document.body.style.overflow = open ? 'hidden' : '';
    };
    hamburger.addEventListener('click', () => {
      setMenuOpen(!mobileMenu.classList.contains('open'));
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });
    document.addEventListener('keydown', (event) => {
      if (!mobileMenu.classList.contains('open')) return;
      if (event.key === 'Escape') {
        setMenuOpen(false);
        hamburger.focus();
      }
      if (event.key === 'Tab') {
        const links = Array.from(mobileMenu.querySelectorAll('a'));
        const first = links[0];
        const last = links[links.length - 1];
        if (!event.shiftKey && document.activeElement === hamburger) {
          event.preventDefault();
          first.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          hamburger.focus();
        } else if (event.shiftKey && document.activeElement === hamburger) {
          event.preventDefault();
          last.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          hamburger.focus();
        }
      }
    });
    window.matchMedia('(min-width: 1201px)').addEventListener('change', (event) => {
      if (event.matches) setMenuOpen(false);
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
        target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
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

  // ── Tarra menu: swipe between dinner / drinks on mobile ──
  const menuSplit = document.querySelector('.menu-stage__split');
  if (menuSplit && menuSplit.querySelectorAll('.menu-stage__sheet').length > 1) {
    const sheets = Array.from(menuSplit.querySelectorAll('.menu-stage__sheet'));
    const dots = Array.from(document.querySelectorAll('.menu-stage__dot'));
    const mobileMq = window.matchMedia('(max-width: 768px)');

    const sheetHeight = (sheet) => {
      const img = sheet.querySelector('img');
      return (img && img.offsetHeight) || sheet.offsetHeight;
    };

    const currentIndex = () => {
      const w = menuSplit.clientWidth || 1;
      return Math.max(0, Math.min(sheets.length - 1, Math.round(menuSplit.scrollLeft / w)));
    };

    const syncPager = () => {
      if (!mobileMq.matches) {
        menuSplit.style.height = '';
        return;
      }
      const w = menuSplit.clientWidth || 1;
      const t = Math.max(0, Math.min(1, menuSplit.scrollLeft / w));
      const h0 = sheetHeight(sheets[0]);
      const h1 = sheetHeight(sheets[1]);
      if (h0 && h1) menuSplit.style.height = `${h0 + (h1 - h0) * t}px`;
      const idx = currentIndex();
      dots.forEach((dot, n) => {
        dot.classList.toggle('is-active', n === idx);
        dot.setAttribute('aria-pressed', n === idx ? 'true' : 'false');
      });
    };

    menuSplit.addEventListener('scroll', syncPager, { passive: true });
    window.addEventListener('resize', syncPager);
    sheets.forEach((sheet) => {
      const img = sheet.querySelector('img');
      if (img) {
        if (img.complete) syncPager();
        else img.addEventListener('load', syncPager, { once: true });
      }
    });
    if (mobileMq.addEventListener) mobileMq.addEventListener('change', syncPager);
    else mobileMq.addListener(syncPager);

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const n = Number(dot.getAttribute('data-index')) || 0;
        const target = sheets[n];
        if (!target) return;
        menuSplit.scrollTo({ left: n * menuSplit.clientWidth, behavior: scrollBehavior() });
      });
    });

    // Don't open lightbox if the gesture was a swipe.
    menuSplit.querySelectorAll('img').forEach((img) => {
      let startX = 0;
      img.addEventListener('pointerdown', (e) => { startX = e.clientX; }, { passive: true });
      img.addEventListener('click', (e) => {
        if (mobileMq.matches && Math.abs(e.clientX - startX) > 12) {
          e.stopImmediatePropagation();
          e.preventDefault();
        }
      }, true);
    });
  }

  // ── Atmosphere carousel (swipe on touch, buttons on desktop) ──
  document.querySelectorAll('.atmosphere__carousel').forEach((carousel) => {
    const track = carousel.querySelector('.atmosphere__track');
    const prev = carousel.querySelector('.atmosphere__nav--prev');
    const next = carousel.querySelector('.atmosphere__nav--next');
    if (!track) return;

    const scrollByItem = (dir) => {
      const items = Array.from(track.querySelectorAll('.atmosphere__item'));
      if (!items.length) return;
      const current = track.scrollLeft;
      const firstOffset = items[0].offsetLeft - track.offsetLeft;
      const positions = items.map(item => item.offsetLeft - track.offsetLeft - firstOffset);
      const target = dir > 0
        ? positions.find(position => position > current + 2)
        : positions.slice().reverse().find(position => position < current - 2);
      track.scrollTo({ left: target ?? (dir > 0 ? track.scrollWidth : 0), behavior: scrollBehavior() });
    };

    if (prev) prev.addEventListener('click', () => scrollByItem(-1));
    if (next) next.addEventListener('click', () => scrollByItem(1));
  });

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
    filterBtns.forEach(btn => btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false'));
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

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

  // ── Google Ads: reservation clicks ──
  const trackLead = (label) => {
    if (typeof gtag !== 'function') return;
    gtag('event', 'generate_lead', {
      send_to: 'AW-18419124849',
      event_category: 'reservation',
      event_label: label
    });
  };
  document.querySelectorAll('a[href*="opentable.com"]').forEach((a) => {
    a.addEventListener('click', () => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      const text = (a.textContent || '').toLowerCase();
      const venue = (href.includes('sura') || href.includes('1519705') || text.includes('sura')) ? 'sura' : 'tarra';
      trackLead('reserve_' + venue);
    });
  });
  document.querySelectorAll('a[href*="forms.gle/FpJchGt4PNV8JtMm8"]').forEach((a) => {
    a.addEventListener('click', () => trackLead('join_the_team'));
  });

  // ── Cookie Consent ──
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');
  if (cookieBanner) {
    cookieBanner.inert = true;
    let consent;
    try { consent = localStorage.getItem('cookie_consent'); } catch { /* Storage can be unavailable in private browsing. */ }
    if (!consent) {
      setTimeout(() => {
        cookieBanner.classList.add('visible');
        cookieBanner.inert = false;
      }, 1500);
    }
    const dismissCookies = (choice) => {
      try { localStorage.setItem('cookie_consent', choice); } catch { /* Dismissing still works for this visit. */ }
      cookieBanner.classList.remove('visible');
      cookieBanner.inert = true;
    };
    if (cookieAccept) {
      cookieAccept.addEventListener('click', () => dismissCookies('all'));
    }
    if (cookieDecline) {
      cookieDecline.addEventListener('click', () => dismissCookies('essential'));
    }
  }

});
