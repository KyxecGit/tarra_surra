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

  // ── Custom Cursor ──
  const cursor = document.querySelector('.custom-cursor');
  if (cursor && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover states
    const hoverables = document.querySelectorAll('a, button, .split-panel, .dish-card, .cocktail-card, .gallery-page__item, .chef-gallery__item');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ── Navbar scroll ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile menu ──
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
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

  // ── Counter Animation ──
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(updateCounter);
          }
          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
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

  // ── Split screen interaction ──
  const splitPanels = document.querySelectorAll('.split-panel');
  splitPanels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
      splitPanels.forEach(p => {
        if (p !== panel) p.style.opacity = '0.6';
      });
    });
    panel.addEventListener('mouseleave', () => {
      splitPanels.forEach(p => p.style.opacity = '1');
    });
  });

  // ── Parallax on hero ──
  const heroVideo = document.querySelector('.hero__video-wrapper');
  if (heroVideo) {
    window.addEventListener('scroll', () => {
      const rate = window.scrollY * 0.25;
      heroVideo.style.transform = `translateY(${rate}px)`;
    }, { passive: true });
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

  // ── Form handling ──
  const reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = reservationForm.querySelector('.reservation-form__submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Reservation Confirmed ✓';
      submitBtn.style.background = '#2a5a2a';
      submitBtn.style.borderColor = '#3a7a3a';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        submitBtn.disabled = false;
        reservationForm.reset();
      }, 3000);
    });

    // Set min date to today
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }
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

  // ── Mobile menu aria-expanded ──
  const hamburgerAria = document.querySelector('.navbar__hamburger');
  if (hamburgerAria) {
    hamburgerAria.addEventListener('click', () => {
      const isExpanded = hamburgerAria.getAttribute('aria-expanded') === 'true';
      hamburgerAria.setAttribute('aria-expanded', String(!isExpanded));
    });
  }

});
