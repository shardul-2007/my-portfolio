/* ============================================
   SHARDUL PORTFOLIO — PREMIUM JAVASCRIPT
   ============================================ */

'use strict';

// ============================================
// UTILITIES
// ============================================
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = () =>
  window.matchMedia('(hover: none)').matches;

// ============================================
// LOADER
// ============================================
(function initLoader() {
  const loader = $('#loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.remove();
        // Trigger reveal for items in viewport on load
        revealObserver.forEach(obs => obs._tick && obs._tick());
      }, 500);
    }, 900); // minimum loader display time
  });
})();

// ============================================
// SCROLL PROGRESS BAR
// ============================================
(function initScrollProgress() {
  const bar = $('#scroll-progress');
  if (!bar) return;

  const update = () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
  };

  window.addEventListener('scroll', update, { passive: true });
})();

// ============================================
// CUSTOM CURSOR (desktop only)
// ============================================
(function initCursor() {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const dot = $('#cursor-dot');
  const halo = $('#cursor-halo');
  if (!dot || !halo) return;

  let mx = -100, my = -100;
  let hx = -100, hy = -100;
  let raf;

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = () => {
    hx = lerp(hx, mx, 0.1);
    hy = lerp(hy, my, 0.1);

    dot.style.left = `${mx}px`;
    dot.style.top = `${my}px`;
    halo.style.left = `${hx}px`;
    halo.style.top = `${hy}px`;

    raf = requestAnimationFrame(animate);
  };

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  // Hover effect on interactive elements
  const interactiveSelectors = 'a, button, .cap-card, .project-card, .chip, .filter-btn, .tl-proof, .nav-link';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    halo.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    halo.style.opacity = '1';
  });

  animate();
})();

// ============================================
// MAGNETIC BUTTONS
// ============================================
(function initMagnetic() {
  if (prefersReducedMotion() || isTouchDevice()) return;

  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.3;
      const dy = (e.clientY - cy) * 0.3;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

// ============================================
// HEADER SCROLL BEHAVIOUR
// ============================================
(function initHeader() {
  const header = $('#header');
  if (!header) return;

  const update = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ============================================
// ACTIVE NAV + SECTION TRACKING
// ============================================
const revealObserver = [];

(function initNav() {
  const navLinks = $$('.nav-link');
  const sections = $$('section[id]');

  if (!sections.length || !navLinks.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(s => obs.observe(s));

  // Smooth scroll for nav links
  $$('.nav-link, .mobile-link, .footer-nav a, .hero-actions a, .about-link, #topBtn').forEach(link => {
    if (!link.getAttribute('href')?.startsWith('#')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = $(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        const menu = $('#mobileMenu');
        if (menu && !menu.hidden) closeMobileMenu();
      }
    });
  });
})();

// ============================================
// MOBILE MENU
// ============================================
function closeMobileMenu() {
  const menu = $('#mobileMenu');
  const toggle = $('#menuToggle');
  if (!menu) return;
  menu.hidden = true;
  toggle && toggle.classList.remove('open');
  toggle && toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

(function initMobileMenu() {
  const toggle = $('#menuToggle');
  const menu = $('#mobileMenu');
  const close = $('#mobileClose');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = !menu.hidden;
    if (isOpen) {
      closeMobileMenu();
    } else {
      menu.hidden = false;
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  close && close.addEventListener('click', closeMobileMenu);

  // Close on outside click
  menu.addEventListener('click', e => {
    if (e.target === menu) closeMobileMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) closeMobileMenu();
  });
})();

// ============================================
// HERO SPOTLIGHT (mouse follow)
// ============================================
(function initHeroSpotlight() {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const hero = $('.hero');
  const spotlight = $('#heroSpotlight');
  if (!hero || !spotlight) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.background =
      `radial-gradient(600px circle at ${x}% ${y}%, rgba(59,130,246,0.09), transparent 70%)`;
  });
})();

// ============================================
// AMBIENT DOT CANVAS
// ============================================
(function initDotCanvas() {
  if (prefersReducedMotion()) return;

  const canvas = $('#dotCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let dots = [];
  let raf;
  let w, h;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function createDots() {
    dots = [];
    const count = Math.floor((w * h) / 14000);
    for (let i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.4 + 0.1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    dots.forEach(d => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0) d.x = w;
      if (d.x > w) d.x = 0;
      if (d.y < 0) d.y = h;
      if (d.y > h) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96, 165, 250, ${d.alpha})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(() => {
    resize();
    createDots();
  });
  ro.observe(canvas);

  resize();
  createDots();
  draw();

  // Stop animation when hero not visible
  const heroEl = $('.hero');
  if (heroEl) {
    const heroObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!raf) draw();
      } else {
        cancelAnimationFrame(raf);
        raf = null;
      }
    });
    heroObs.observe(heroEl);
  }
})();

// ============================================
// ROLE ROTATOR (hero typing effect)
// ============================================
(function initRoleRotator() {
  const el = $('#roleText');
  if (!el) return;

  const roles = [
    'modern web apps.',
    'full-stack systems.',
    'AI-powered products.',
    'open source software.',
    'scalable backends.'
  ];

  let rIdx = 0, cIdx = 0, isDeleting = false;

  function type() {
    const current = roles[rIdx];
    if (isDeleting) {
      el.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) {
        isDeleting = false;
        rIdx = (rIdx + 1) % roles.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, prefersReducedMotion() ? 0 : 40);
    } else {
      el.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        isDeleting = true;
        setTimeout(type, prefersReducedMotion() ? 800 : 2000);
        return;
      }
      setTimeout(type, prefersReducedMotion() ? 0 : 70);
    }
  }

  setTimeout(type, 1200);
})();

// ============================================
// SCROLL REVEAL
// ============================================
(function initScrollReveal() {
  const items = $$('.reveal-item');
  const timeline = $$('.reveal-timeline');

  if (!items.length) return;

  function makeObserver(els, delay = 0) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const d = delay + i * 80;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, d);
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });

    els.forEach(el => obs.observe(el));
    revealObserver.push(obs);
    return obs;
  }

  // Group siblings for stagger
  const groups = new Map();
  items.forEach(item => {
    const parent = item.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(item);
  });

  groups.forEach(groupItems => {
    makeObserver(groupItems);
  });

  // Timeline items with stagger
  if (timeline.length) {
    const tlObs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, i * 120);
          tlObs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });
    timeline.forEach(el => tlObs.observe(el));
  }
})();

// ============================================
// PROJECT FILTERING
// ============================================
(function initFilters() {
  const filters = $$('.filter-btn');
  const grid = $('#projectsGrid');
  if (!filters.length || !grid) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards = $$('.project-card', grid);

      cards.forEach(card => {
        const cat = card.dataset.category || '';
        const show = filter === 'all' || cat === filter;
        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

// ============================================
// CASE STUDY TOGGLE
// ============================================
(function initCaseStudy() {
  $$('.case-study-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = $(`#${panelId}`);
      if (!panel) return;

      const isOpen = !panel.hidden;

      if (isOpen) {
        panel.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('span').textContent = 'Case Study';
      } else {
        panel.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('span').textContent = 'Close';
        // Smooth scroll to panel
        setTimeout(() => {
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      }
    });
  });
})();

// ============================================
// CONTACT FORM
// ============================================
(function initContactForm() {
  const form = $('#contactForm');
  const status = $('#formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = $('#contactName')?.value.trim();
    const email = $('#contactEmail')?.value.trim();
    const message = $('#contactMessage')?.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields.';
      status.className = 'form-status error';
      return;
    }

    // Mailto fallback — no backend token exposure
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailto = `mailto:shardulparihar2007@gmail.com?subject=${subject}&body=${body}`;

    // Open mailto
    window.location.href = mailto;

    status.textContent = 'Opening your email client… If it did not open, email shardulparihar2007@gmail.com directly.';
    status.className = 'form-status success';

    setTimeout(() => {
      status.textContent = '';
      status.className = 'form-status';
    }, 8000);
  });
})();

// ============================================
// BACK TO TOP
// ============================================
(function initTopBtn() {
  const btn = $('#topBtn');
  if (!btn) return;

  const update = () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', update, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  update();
})();

// ============================================
// 3D CARD TILT (desktop only, project cards)
// ============================================
(function initCardTilt() {
  if (prefersReducedMotion() || isTouchDevice()) return;

  $$('.project-card:not(.project-card-add)').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * -6;
      const ry = ((e.clientX - cx) / (rect.width / 2)) * 6;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ============================================
// FEATURED PROJECT HOVER (subtle tilt)
// ============================================
(function initFeaturedTilt() {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const fp = $('.featured-project');
  if (!fp) return;

  fp.addEventListener('mousemove', e => {
    const rect = fp.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -2;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 2;
    fp.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });

  fp.addEventListener('mouseleave', () => {
    fp.style.transform = '';
  });
})();

// ============================================
// SKILL CHIP INTERACTION
// ============================================
(function initChips() {
  if (prefersReducedMotion()) return;

  $$('.chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      chip.style.transition = 'all 0.2s ease';
    });
  });
})();
