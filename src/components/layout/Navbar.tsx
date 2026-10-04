'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, Sun, Moon, Zap } from 'lucide-react';
import { PERSONAL } from '@/data/portfolio';

const NAV_LINKS = [
  { label: 'HOME',         href: '#home'         },
  { label: 'ABOUT',        href: '#about'         },
  { label: 'PROJECTS',     href: '#projects'      },
  { label: 'EXPERIENCE',   href: '#experience'    },
  { label: 'SKILLS',       href: '#skills'        },
  { label: 'ACHIEVEMENTS', href: '#achievements'  },
  { label: 'CONTACT',      href: '#contact'       },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState('home');
  const [theme,     setTheme]     = useState<'dark'|'yellow'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('sp-theme') as 'dark'|'yellow' | null;
    const initial = saved === 'yellow' ? 'yellow' : 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'yellow' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('sp-theme', next);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href));
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach(s => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
        style={{ background: 'var(--accent)', scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0 }}
      />

      {/* Main Navbar */}
      <nav
        className="fixed top-3 left-3 right-3 z-50 rounded-2xl transition-all duration-300"
        style={{
          background: scrolled
            ? (theme === 'dark' ? 'rgba(5,8,16,0.95)' : 'rgba(255,229,0,0.92)')
            : (theme === 'dark' ? 'rgba(5,8,16,0.75)' : 'rgba(255,229,0,0.80)'),
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: scrolled ? '1px solid var(--border-glow)' : '1px solid var(--border)',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.25)' : '0 2px 16px rgba(0,0,0,0.12)',
        }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 max-w-7xl mx-auto gap-2">

          {/* Wordmark / Brand */}
          <a href="#home" className="flex items-center gap-2.5 group flex-shrink-0">
            <span className="status-dot status-dot-pulse" style={{ width: 7, height: 7 }} />
            <div>
              <div className="mono font-bold text-xs sm:text-sm tracking-widest group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text)' }}>
                {PERSONAL.shortName}
              </div>
              <div className="mono text-[8px] tracking-[0.16em] text-[var(--text-sub)] hidden xs:block">
                SOFTWARE ENGINEER / BUILDER
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5 flex-wrap justify-center">
            {NAV_LINKS.map(link => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="mono text-[10px] lg:text-[11px] tracking-wider px-2.5 lg:px-3 py-1.5 rounded-xl transition-all duration-200 select-none font-medium flex items-center gap-1.5"
                  style={{
                    color: isActive
                      ? (theme === 'yellow' ? '#000000' : 'var(--accent)')
                      : (theme === 'yellow' ? '#000000' : '#E2E8F0'),
                    background: isActive
                      ? (theme === 'yellow' ? 'rgba(0,0,0,0.14)' : 'var(--accent-dim)')
                      : 'transparent',
                    border: isActive
                      ? '1px solid var(--border-glow)'
                      : '1px solid transparent',
                    fontWeight: isActive ? 700 : 500,
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = theme === 'yellow' ? '#000000' : 'var(--accent)';
                      e.currentTarget.style.background = 'var(--surface-2)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = theme === 'yellow' ? '#000000' : '#E2E8F0';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse inline-block" />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="hidden lg:flex items-center gap-2 mono text-[10px] px-3 py-1.5 rounded-full flex-shrink-0 font-medium"
              style={{
                background: 'var(--accent-dim)',
                border: '1px solid var(--border-glow)',
                color: 'var(--accent)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              AVAILABLE
            </span>

            {/* 2-Theme Toggle Button: Major (Black & White) vs Yellow (Yellow & Black) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              className="glass rounded-xl px-2.5 py-1.5 text-xs transition-colors flex items-center gap-1.5 font-mono select-none"
              style={{
                borderColor: theme === 'yellow' ? 'rgba(0,0,0,0.3)' : 'var(--border-glow)',
                background: theme === 'yellow' ? 'rgba(0,0,0,0.08)' : 'var(--surface)',
                color: 'var(--text)',
              }}
              aria-label={theme === 'dark' ? 'Switch to Yellow & Black Theme' : 'Switch to Black & White Theme'}
              title={theme === 'dark' ? 'Switch to Yellow & Black Theme' : 'Switch to Black & White Theme'}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -20, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5"
              >
                {theme === 'dark' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#FFE500] inline-block shadow-[0_0_8px_#FFE500]" />
                    <span className="text-[10px] tracking-wider hidden sm:inline-block font-semibold">YELLOW</span>
                  </>
                ) : (
                  <>
                    <Moon size={13} className="text-black" />
                    <span className="text-[10px] tracking-wider hidden sm:inline-block font-bold">DARK (B&W)</span>
                  </>
                )}
              </motion.div>
            </motion.button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden glass rounded-xl p-2 transition-colors flex items-center justify-center"
              style={{ color: 'var(--text)' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-[62px] z-40 rounded-2xl overflow-hidden"
            style={{
              background: theme === 'dark' ? 'rgba(5,8,16,0.98)' : 'rgba(255,229,0,0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid var(--border-glow)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
            }}
          >
            <div className="p-4 flex flex-col gap-1.5">
              {NAV_LINKS.map((link, i) => {
                const isActive = active === link.href.slice(1);
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="mono text-xs tracking-wider px-4 py-2.5 rounded-xl transition-all flex items-center justify-between font-medium"
                    style={{
                      color: isActive
                        ? (theme === 'yellow' ? '#000000' : 'var(--accent)')
                        : (theme === 'yellow' ? '#000000' : '#F1F5F9'),
                      background: isActive
                        ? (theme === 'yellow' ? 'rgba(0,0,0,0.15)' : 'var(--accent-dim)')
                        : 'transparent',
                      border: '1px solid ' + (isActive ? 'var(--border-glow)' : 'transparent'),
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    )}
                  </motion.a>
                );
              })}
              <div className="pt-3 border-t border-[var(--border)] mt-1 flex items-center justify-between px-1">
                <span
                  className="flex items-center gap-2 mono text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--border-glow)',
                    color: 'var(--accent)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  AVAILABLE
                </span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 glass rounded-xl px-3 py-1.5 text-xs font-mono font-bold"
                  style={{ color: 'var(--text)' }}
                >
                  {theme === 'dark' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[#FFE500]" />
                      <span className="text-[10px]">YELLOW</span>
                    </>
                  ) : (
                    <>
                      <Moon size={12} />
                      <span className="text-[10px]">DARK (B&W)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}