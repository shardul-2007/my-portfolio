'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Moon,
  Volume2,
  VolumeX,
  UserCheck,
  Terminal,
  ChevronDown,
  Layers,
  Sparkles,
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
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMuted, setIsMuted] = useState(true);
  const navRailRef = useRef<HTMLDivElement>(null);

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
            ? 'bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)] py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="section-container flex items-center justify-between gap-3">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            onClick={() => labAudio.playClick(900)}
            className="flex items-center gap-2.5 group select-none flex-shrink-0"
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

          {/* Desktop Navigation Links — All 15 Names Fully Rendered & Horizontally Scrollable */}
          <div className="hidden lg:flex items-center gap-1.5 flex-1 max-w-[720px] 2xl:max-w-none mx-2">
            <div
              ref={navRailRef}
              className="flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] px-2 py-1 rounded-full backdrop-blur-md overflow-x-auto scrollbar-none w-full"
            >
              {NAV_LINKS.map(link => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => labAudio.playClick(850)}
                    onMouseEnter={() => labAudio.playHover()}
                    className={`mono text-[10px] xl:text-[11px] px-2.5 xl:px-3 py-1 rounded-full transition-all duration-200 select-none flex items-center gap-1 flex-shrink-0 whitespace-nowrap ${
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

            {/* Quick Directory Popover Toggle Button */}
            <button
              onClick={() => {
                labAudio.playClick(920);
                setDirectoryOpen(!directoryOpen);
              }}
              className={`mono text-[10px] px-2.5 py-1.5 rounded-full border transition-all flex items-center gap-1 flex-shrink-0 cursor-pointer ${
                directoryOpen
                  ? 'bg-[var(--accent)] text-black border-[var(--accent)] font-bold'
                  : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--text)]'
              }`}
              title="View all 15 sections in directory grid"
            >
              <Layers size={11} />
              <span>ALL (15)</span>
              <ChevronDown size={10} className={directoryOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Quick Command Palette Button */}
            <button
              onClick={() => {
                labAudio.playClick();
                onOpenCommand();
              }}
              className="hidden md:flex items-center gap-1.5 mono text-xs px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-pointer"
              title="Open Command Palette (Ctrl+K / Cmd+K)"
            >
              <Terminal size={12} className="text-[var(--accent)]" />
              <span>CMD</span>
              <kbd className="text-[9px] px-1 py-0.2 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-sub)]">
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
              <UserCheck size={12} />
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
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[var(--accent)]" />}
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
                  <span className="w-2 h-2 rounded-full bg-[#FFE500] shadow-[0_0_8px_#FFE500]" />
                  <span className="text-[10px] hidden xl:inline">YELLOW</span>
                </>
              ) : (
                <>
                  <Moon size={12} />
                  <span className="text-[10px] hidden xl:inline">DARK</span>
                </>
              )}
            </button>

            {/* Mobile / Compact Hamburger Toggle */}
            <button
              onClick={() => {
                labAudio.playClick();
                setMenuOpen(!menuOpen);
              }}
              className="lg:hidden glass p-2 rounded-xl text-[var(--text)] transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Directory Grid Popover (All 15 Sections) */}
      <AnimatePresence>
        {directoryOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-4 top-[64px] max-w-4xl mx-auto z-40 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-[var(--accent)]" />
                <span className="mono text-xs font-bold uppercase tracking-wider text-[var(--text)]">
                  SHARDUL.LAB COMPLETE DIRECTORY (15 SECTIONS)
                </span>
              </div>
              <button
                onClick={() => setDirectoryOpen(false)}
                className="mono text-xs text-[var(--text-sub)] hover:text-[var(--text)] cursor-pointer"
              >
                [ESC CLOSE]
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {NAV_LINKS.map(link => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => {
                      labAudio.playClick(900);
                      setDirectoryOpen(false);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-[var(--accent)] text-black border-[var(--accent)] font-bold shadow-[0_0_12px_var(--accent-glow)]'
                        : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--accent)] text-[var(--text)]'
                    }`}
                  >
                    <div className="mono text-[10px] opacity-70 mb-0.5">
                      {link.id.toUpperCase()}
                    </div>
                    <div className="mono text-xs font-semibold flex items-center justify-between">
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className={`text-[9px] px-1 py-0.2 rounded ${isActive ? 'bg-black/20 text-black' : 'bg-[var(--surface-2)] text-[var(--accent)]'}`}>
                          {link.badge}
                        </span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile / Tablet Full Menu (All 15 Sections) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-[68px] z-40 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl lg:hidden max-h-[82vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-2">
                <span className="sys-label-accent">ALL 15 DIRECTORY SECTIONS</span>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenCommand();
                  }}
                  className="mono text-xs text-[var(--accent)] flex items-center gap-1"
                >
                  <Terminal size={12} />
                  <span>CMD (⌘K)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
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
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl mono text-xs transition-all ${
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
              </div>

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
