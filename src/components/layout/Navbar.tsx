'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  UserCheck,
  Terminal,
} from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { NAV_LINKS } from '@/data/navigation';
import { labAudio } from '@/lib/audio';

interface NavbarProps {
  onOpenCommand: () => void;
  onOpenRecruiter: () => void;
  onToggleTheme: () => void;
  theme: 'dark' | 'yellow';
}

export default function Navbar({
  onOpenCommand,
  onOpenRecruiter,
  onToggleTheme,
  theme,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(labAudio.getMuted());

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Section observer
    const sectionIds = NAV_LINKS.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  function handleSoundToggle() {
    const nextMuted = labAudio.toggleMute();
    setIsMuted(nextMuted);
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)] py-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="section-container flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            onClick={() => labAudio.playClick(900)}
            className="flex items-center gap-3 group select-none flex-shrink-0"
          >
            <span className="status-dot status-dot-pulse" />
            <div>
              <div className="mono font-bold text-sm tracking-[0.16em] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                {PROFILE.brand}
              </div>
              <div className="mono text-[8px] tracking-[0.18em] text-[var(--text-sub)] hidden sm:block">
                INTERACTIVE ENGINEERING UNIVERSE
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] px-2 py-1 rounded-full backdrop-blur-md">
            {NAV_LINKS.slice(0, 10).map(link => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => labAudio.playClick(850)}
                  onMouseEnter={() => labAudio.playHover()}
                  className={`mono text-[11px] px-3 py-1.5 rounded-full transition-all duration-200 select-none flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[var(--accent)] text-[#000000] font-bold shadow-[0_0_12px_var(--accent-glow)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span
                      className={`text-[8px] px-1 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-black/20 text-black' : 'bg-[var(--surface-3)] text-[var(--accent)]'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Quick Command Palette Button */}
            <button
              onClick={() => {
                labAudio.playClick();
                onOpenCommand();
              }}
              className="hidden md:flex items-center gap-2 mono text-xs px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-pointer"
              title="Open Command Palette (Ctrl+K / Cmd+K)"
            >
              <Terminal size={13} className="text-[var(--accent)]" />
              <span>CMD</span>
              <kbd className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-sub)]">
                ⌘K
              </kbd>
            </button>

            {/* Recruiter Mode Button */}
            <button
              onClick={() => {
                labAudio.playClick(1000);
                onOpenRecruiter();
              }}
              className="flex items-center gap-1.5 mono text-[11px] px-3 py-1.5 rounded-full bg-[var(--accent-orange)] text-white hover:brightness-110 shadow-[0_0_15px_rgba(255,107,53,0.35)] transition-all cursor-pointer font-semibold"
              title="Launch 90-Second Recruiter Tour"
            >
              <UserCheck size={13} />
              <span className="hidden sm:inline">RECRUITER</span>
              <span className="sm:hidden">TOUR</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              className="glass p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all cursor-pointer"
              title={isMuted ? 'Unmute Audio Synthesis' : 'Mute Audio Synthesis'}
              aria-label="Toggle sound feedback"
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[var(--accent)]" />}
            </button>

            {/* Theme Toggle (Dark Lab vs Cyber Yellow) */}
            <button
              onClick={() => {
                labAudio.playClick();
                onToggleTheme();
              }}
              className="glass px-2.5 py-1.5 rounded-xl text-xs mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Cyber Yellow' : 'Dark Lab'} Theme`}
            >
              {theme === 'dark' ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFE500] shadow-[0_0_8px_#FFE500]" />
                  <span className="text-[10px] hidden lg:inline">YELLOW</span>
                </>
              ) : (
                <>
                  <Moon size={13} />
                  <span className="text-[10px] hidden lg:inline">DARK LAB</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                labAudio.playClick();
                setMenuOpen(!menuOpen);
              }}
              className="xl:hidden glass p-2 rounded-xl text-[var(--text)] transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
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
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-[70px] z-40 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl xl:hidden max-h-[82vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-2">
                <span className="sys-label-accent">SHARDUL.LAB DIRECTORY</span>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenCommand();
                  }}
                  className="mono text-xs text-[var(--accent)] flex items-center gap-1"
                >
                  <Terminal size={12} />
                  <span>Command Palette (⌘K)</span>
                </button>
              </div>

              {NAV_LINKS.map(link => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => {
                      labAudio.playClick(850);
                      setMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl mono text-xs transition-all ${
                      isActive
                        ? 'bg-[var(--accent)] text-[#000000] font-bold'
                        : 'text-[var(--text)] hover:bg-[var(--surface)]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--surface-3)]">
                        {link.badge}
                      </span>
                    )}
                  </a>
                );
              })}

              <div className="pt-3 border-t border-[var(--border)] mt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenRecruiter();
                  }}
                  className="glow-btn glow-btn-orange text-xs py-2 w-full justify-center"
                >
                  <UserCheck size={14} />
                  <span>Launch 90s Recruiter Tour</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
