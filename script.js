/**
 * SHARDUL PORTFOLIO — PREMIUM JAVASCRIPT v2
 * 50-Phase Transformation
 * Organised into named init modules.
 */

'use strict';

/* ============================================================
   UTILITIES
   ============================================================ */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const touchDevice = () =>
  window.matchMedia('(hover: none)').matches;

/* ============================================================
   THEME TOGGLE — dark / light, saved to localStorage
   ============================================================ */
function initThemeToggle() {
  const html = document.documentElement;
  const btn  = qs('#themeToggle');

  // Apply saved preference immediately (before paint)
  const saved = localStorage.getItem('sp-theme');
  if (saved) html.dataset.theme = saved;

  if (!btn) return;

  btn.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    localStorage.setItem('sp-theme', next);
    btn.setAttribute('aria-label',
      next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });

  // Set initial aria-label
  btn.setAttribute('aria-label',
    html.dataset.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}


/* ============================================================
   LOADER
   ============================================================ */
function initLoader() {
  const loader = qs('#loader');
  if (!loader) return;

  const hide = () => {
    loader.classList.add('out');
    setTimeout(() => loader.remove(), 520);
  };

  if (document.readyState === 'complete') {
    setTimeout(hide, 600);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 600), { once: true });
  }
}

/* ============================================================
   SCROLL PROGRESS — GPU (transform: scaleX)
   ============================================================ */
function initScrollProgress() {
  const bar = qs('#scroll-progress');
  if (!bar) return;

  const update = () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${total > 0 ? scrolled / total : 0})`;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ============================================================
   CUSTOM CURSOR (desktop / non-touch only)
   ============================================================ */
function initCursor() {
  if (reducedMotion() || touchDevice()) return;

  const dot  = qs('#cursor-dot');
  const ring = qs('#cursor-ring');
  const glow = qs('#cursor-glow');
  if (!dot || !ring || !glow) return;

  let mx = -200, my = -200;
  let rx = -200, ry = -200;
  let gx = -200, gy = -200;

  const lerp = (a, b, t) => a + (b - a) * t;

  let raf;
  const tick = () => {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    gx = lerp(gx, mx, 0.07);
    gy = lerp(gy, my, 0.07);

    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';

    raf = requestAnimationFrame(tick);
  };

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  const INTERACTIVE = 'a, button, .cap-card, .proj-card, .filter-btn, .chip, .tl-proof-link, .nav-link, .social-btn';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(INTERACTIVE)) document.body.classList.add('c-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(INTERACTIVE)) document.body.classList.remove('c-hover');
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = ring.style.opacity = glow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = ring.style.opacity = '1';
  });

  tick();
}

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
function initMagnetic() {
  if (reducedMotion() || touchDevice()) return;

  qsa('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* ============================================================
   HEADER SCROLL BEHAVIOUR
   ============================================================ */
function initHeader() {
  const header = qs('#header');
  if (!header) return;

  const update = () =>
    header.classList.toggle('scrolled', window.scrollY > 60);

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ============================================================
   ACTIVE NAV — IntersectionObserver scrollspy
   ============================================================ */
function initScrollSpy() {
  const links    = qsa('.nav-link');
  const sections = qsa('section[id]');
  if (!links.length || !sections.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l =>
          l.classList.toggle('active', l.dataset.section === id)
        );
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => obs.observe(s));
}

/* ============================================================
   SMOOTH SCROLL — all hash links
   ============================================================ */
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = qs(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    // Close mobile menu if open
    const menu = qs('#mobileMenu');
    if (menu && !menu.hidden) closeMobileMenu();
  });
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function closeMobileMenu() {
  const menu   = qs('#mobileMenu');
  const toggle = qs('#menuToggle');
  if (!menu) return;
  menu.hidden = true;
  if (toggle) {
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
}

function initMobileMenu() {
  const toggle = qs('#menuToggle');
  const menu   = qs('#mobileMenu');
  const close  = qs('#mobileClose');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = !menu.hidden;
    if (open) {
      closeMobileMenu();
    } else {
      menu.hidden = false;
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  close && close.addEventListener('click', closeMobileMenu);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) closeMobileMenu();
  });
}

/* ============================================================
   GLOBAL BODY SPOTLIGHT — CSS custom props
   ============================================================ */
function initBodySpotlight() {
  if (reducedMotion() || touchDevice()) return;

  const update = e => {
    const x = ((e.clientX / window.innerWidth)  * 100).toFixed(1) + '%';
    const y = ((e.clientY / window.innerHeight) * 100).toFixed(1) + '%';
    document.body.style.setProperty('--mx', x);
    document.body.style.setProperty('--my', y);
  };

  document.addEventListener('mousemove', update, { passive: true });
}

/* ============================================================
   HERO SPOTLIGHT — localised radial gradient
   ============================================================ */
function initHeroSpotlight() {
  if (reducedMotion() || touchDevice()) return;

  const hero    = qs('.hero');
  const radial  = qs('.hero-radial');
  if (!hero || !radial) return;

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
    const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
    radial.style.background =
      `radial-gradient(ellipse 55% 50% at ${x}% ${y}%, rgba(59,130,246,.09), transparent 70%)`;
  });
}

/* ============================================================
   AMBIENT DOT CANVAS
   ============================================================ */
function initDotCanvas() {
  if (reducedMotion()) return;

  const canvas = qs('#dotCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let dots = [], w = 0, h = 0, raf;

  const resize = () => {
    w = canvas.width  = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    makeDots();
  };

  const makeDots = () => {
    const n = Math.floor((w * h) / 16000);
    dots = Array.from({ length: n }, () => ({
      x:  Math.random() * w,
      y:  Math.random() * h,
      r:  Math.random() * 1.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      a:  Math.random() * 0.35 + 0.08,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    dots.forEach(d => {
      d.x = (d.x + d.vx + w) % w;
      d.y = (d.y + d.vy + h) % h;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96,165,250,${d.a})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  };

  // Pause when hero not visible (perf)
  const heroEl = qs('.hero');
  if (heroEl) {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!raf) draw(); }
      else { cancelAnimationFrame(raf); raf = null; }
    }).observe(heroEl);
  }

  new ResizeObserver(resize).observe(canvas);
  resize();
  draw();
}

/* ============================================================
   ROLE ROTATOR — fade + blur word swap
   ============================================================ */
function initRoleRotator() {
  const words = qsa('.role-word');
  if (!words.length) return;

  let idx = 0;

  // If reduced motion: just show first word, no transitions
  if (reducedMotion()) {
    words[0].classList.add('active');
    return;
  }

  words[0].classList.add('active');

  const cycle = () => {
    const current = words[idx];
    current.classList.remove('active');
    current.classList.add('exit');

    setTimeout(() => current.classList.remove('exit'), 560);

    idx = (idx + 1) % words.length;
    words[idx].classList.add('active');
  };

  setInterval(cycle, 2600);
}

/* ============================================================
   SKILLS MARQUEE — pause on hover, reduced-motion safe
   ============================================================ */
function initMarquee() {
  const wrap  = qs('.marquee-wrap');
  const inner = qs('.marquee-inner');
  if (!wrap || !inner) return;

  if (reducedMotion()) {
    inner.style.animation = 'none';
    return;
  }
  // Pause/resume handled entirely by CSS :hover selector
}

/* ============================================================
   SCROLL REVEAL — directional (up / left / right / scale)
   ============================================================ */
function initScrollReveal() {
  const items    = qsa('.reveal-item');
  const timeline = qsa('.reveal-timeline');
  if (!items.length && !timeline.length) return;

  // Reveal items — grouped for stagger
  const groups = new Map();
  items.forEach(el => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });

  const itemObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const group = groups.get(el.parentElement) || [el];
      const i     = group.indexOf(el);
      setTimeout(() => el.classList.add('revealed'), i * 90);
      itemObs.unobserve(el);
    });
  }, { rootMargin: '0px 0px -72px 0px', threshold: 0.05 });

  items.forEach(el => itemObs.observe(el));

  // Timeline stagger
  if (timeline.length) {
    let idx = 0;
    const tlObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = idx++ * 110;
        setTimeout(() => entry.target.classList.add('revealed'), delay);
        tlObs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.05 });
    timeline.forEach(el => tlObs.observe(el));
  }
}

/* ============================================================
   PROJECT FILTERS
   ============================================================ */
function initProjectFilters() {
  const btns  = qsa('.filter-btn');
  const grid  = qs('#projectsGrid');
  if (!btns.length || !grid) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      qsa('.proj-card', grid).forEach(card => {
        const cat   = card.dataset.category || '';
        const match = filter === 'all' || cat === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
}

/* ============================================================
   CARD TILT — requestAnimationFrame, smooth reset
   ============================================================ */
function initCardTilt() {
  if (reducedMotion() || touchDevice()) return;

  qsa('.proj-card:not(.proj-card-soon)').forEach(card => {
    let raf, targetX = 0, targetY = 0, currX = 0, currY = 0;
    let active = false;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      currX = lerp(currX, targetX, 0.12);
      currY = lerp(currY, targetY, 0.12);
      card.style.transform =
        `perspective(700px) rotateX(${currX}deg) rotateY(${currY}deg) translateY(-4px)`;

      if (active || Math.abs(currX) > 0.01 || Math.abs(currY) > 0.01) {
        raf = requestAnimationFrame(animate);
      } else {
        card.style.transform = '';
        cancelAnimationFrame(raf);
      }
    };

    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      targetX = ((e.clientY - cy) / (r.height / 2)) * -4;
      targetY = ((e.clientX - cx) / (r.width  / 2)) *  4;
      if (!active) { active = true; animate(); }
    });

    card.addEventListener('mouseleave', () => {
      active = false;
      targetX = 0; targetY = 0;
    });
  });
}

/* ============================================================
   FEATURED PROJECT SUBTLE TILT
   ============================================================ */
function initFeaturedTilt() {
  if (reducedMotion() || touchDevice()) return;

  const fp = qs('.featured-project');
  if (!fp) return;

  fp.addEventListener('mousemove', e => {
    const r  = fp.getBoundingClientRect();
    const rx = ((e.clientY - (r.top  + r.height/2)) / (r.height/2)) * -1.5;
    const ry = ((e.clientX - (r.left + r.width /2)) / (r.width /2)) *  1.5;
    fp.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  fp.addEventListener('mouseleave', () => {
    fp.style.transform = '';
  });
}

/* ============================================================
   CASE STUDY TOGGLE
   ============================================================ */
function initCaseStudy() {
  qsa('.case-study-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panelId = btn.getAttribute('aria-controls');
      const panel   = qs(`#${panelId}`);
      if (!panel) return;

      const open = !panel.hidden;
      panel.hidden = open;
      btn.setAttribute('aria-expanded', String(!open));
      btn.querySelector('span').textContent = open ? 'Case Study' : 'Close';

      if (!open) {
        setTimeout(() =>
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
      }
    });
  });
}

/* ============================================================
   CONTACT FORM — mailto fallback
   ============================================================ */
function initContactForm() {
  const form   = qs('#contactForm');
  const status = qs('#formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name  = (qs('#cName',  form)?.value || '').trim();
    const email = (qs('#cEmail', form)?.value || '').trim();
    const msg   = (qs('#cMsg',   form)?.value || '').trim();

    if (!name || !email || !msg) {
      status.textContent = 'Please fill in all fields.';
      status.className   = 'form-status error';
      return;
    }

    const sub  = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
    window.location.href =
      `mailto:shardulparihar2007@gmail.com?subject=${sub}&body=${body}`;

    status.textContent = 'Opening your email client… If it didn\'t open, email shardulparihar2007@gmail.com directly.';
    status.className   = 'form-status success';
    form.reset();

    setTimeout(() => {
      status.textContent = '';
      status.className   = 'form-status';
    }, 9000);
  });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = qs('#topBtn');
  if (!btn) return;

  const update = () => btn.classList.toggle('visible', window.scrollY > 420);
  window.addEventListener('scroll', update, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  update();
}

/* ============================================================
   BOOT — run all modules
   ============================================================ */

// Apply saved theme IMMEDIATELY (avoids flash of wrong theme)
(function applyThemeEarly() {
  const saved = localStorage.getItem('sp-theme');
  if (saved) document.documentElement.dataset.theme = saved;
})();

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initLoader();
  initScrollProgress();
  initCursor();
  initMagnetic();
  initHeader();
  initScrollSpy();
  initSmoothScroll();
  initMobileMenu();
  initBodySpotlight();
  initHeroSpotlight();
  initDotCanvas();
  initRoleRotator();
  initMarquee();
  initScrollReveal();
  initProjectFilters();
  initCardTilt();
  initFeaturedTilt();
  initCaseStudy();
  initContactForm();
  initBackToTop();
});
