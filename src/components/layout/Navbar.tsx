'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  UserCheck,
  Terminal,
  Download,
  Sparkles,
  Command,
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
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  function handleNavClick(href: string) {
    labAudio.playClick(900);
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F8F5F1]/95 backdrop-blur-xl border-b border-[#E5DDDA] py-2.5 shadow-sm'
            : 'bg-[#F8F5F1]/80 backdrop-blur-md border-b border-[#E5DDDA]/50 py-3'
        }`}
      >
        <div className="section-container flex items-center justify-between gap-3">
          {/* Brand Wordmark (Left) */}
          <a
            href="#hero"
            onClick={() => labAudio.playClick(900)}
            className="flex items-center gap-2.5 group select-none flex-shrink-0"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9363E] animate-pulse" />
            <div>
              <div className="mono font-bold text-sm tracking-[0.16em] text-[#171416] group-hover:text-[#D9363E] transition-colors">
                {PROFILE.brand}
              </div>
              <div className="mono text-[8px] tracking-[0.18em] text-[#81777A] hidden sm:block">
                INTERACTIVE ENGINEERING UNIVERSE
              </div>
            </div>
          </a>

          {/* Centre Horizontal Navigation Rail (Desktop) */}
          <nav
            ref={navRailRef}
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-1 bg-white border border-[#E5DDDA] px-2 py-1 rounded-full shadow-xs overflow-x-auto scrollbar-none max-w-[680px]"
          >
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`mono text-[10px] px-2.5 py-1 rounded-full transition-all duration-200 select-none whitespace-nowrap ${
                    isActive
                      ? 'bg-[#D9363E] text-white font-bold shadow-xs'
                      : 'text-[#81777A] hover:text-[#171416] hover:bg-[#F1ECE8]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Suite */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={() => {
                labAudio.playClick(900);
                onOpenCommand();
              }}
              title="Open Command Palette (Ctrl+K or ⌘K)"
              className="hidden md:flex items-center gap-1.5 mono text-[10px] px-2.5 py-1 rounded-full bg-white border border-[#E5DDDA] text-[#171416] hover:border-[#D9363E] hover:text-[#D9363E] transition-all cursor-pointer font-medium shadow-xs"
            >
              <Command size={11} className="text-[#D9363E]" />
              <span>CMD</span>
              <kbd className="text-[9px] text-[#81777A] bg-[#F1ECE8] px-1 rounded">⌘K</kbd>
            </button>

            {/* Recruiter Mode Modal */}
            <button
              type="button"
              onClick={() => {
                labAudio.playClick(950);
                onOpenRecruiter();
              }}
              title="Open Recruiter Fast-Track"
              className="flex items-center gap-1 mono text-[10px] px-2.5 py-1 rounded-full bg-[#171416] text-white hover:bg-[#D9363E] transition-all cursor-pointer font-bold shadow-xs"
            >
              <UserCheck size={11} />
              <span className="hidden sm:inline">RECRUITER</span>
            </button>

            {/* Direct Resume Action */}
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => labAudio.playClick(1000)}
              title="Download Resume / Profile"
              className="hidden lg:flex items-center gap-1 mono text-[10px] px-2.5 py-1 rounded-full bg-white border border-[#E5DDDA] text-[#171416] hover:border-[#D9363E] hover:text-[#D9363E] transition-all font-semibold shadow-xs"
            >
              <Download size={11} />
              <span>RESUME</span>
            </a>

            {/* Sound Mute / Unmute Toggle */}
            <button
              type="button"
              onClick={handleSoundToggle}
              title={isMuted ? 'Enable Sound Effects' : 'Mute Sound Effects'}
              className="w-7 h-7 rounded-full bg-white border border-[#E5DDDA] text-[#81777A] hover:text-[#D9363E] hover:border-[#D9363E] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-[#D9363E]" />}
            </button>

            {/* Mobile Hamburger Drawer Button */}
            <button
              type="button"
              onClick={() => {
                labAudio.playClick(900);
                setMenuOpen(prev => !prev);
              }}
              aria-label="Toggle Navigation Menu"
              className="xl:hidden w-8 h-8 rounded-full bg-white border border-[#E5DDDA] text-[#171416] flex items-center justify-center hover:border-[#D9363E] transition-all cursor-pointer shadow-xs"
            >
              {menuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden border-t border-[#E5DDDA] bg-[#F8F5F1] px-4 py-4 space-y-3 shadow-lg"
            >
              <div className="grid grid-cols-2 gap-1.5">
                {NAV_LINKS.map(link => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`mono text-xs px-3 py-2 rounded-xl transition-all select-none ${
                        isActive
                          ? 'bg-[#D9363E] text-white font-bold'
                          : 'bg-white border border-[#E5DDDA] text-[#171416] hover:bg-[#F1ECE8]'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#E5DDDA] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenCommand();
                  }}
                  className="flex-1 py-2 rounded-xl bg-white border border-[#E5DDDA] mono text-xs font-bold text-[#171416] flex items-center justify-center gap-1.5"
                >
                  <Command size={12} className="text-[#D9363E]" />
                  <span>COMMAND PALETTE</span>
                </button>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#171416] text-white mono text-xs font-bold flex items-center gap-1"
                >
                  <Download size={12} />
                  <span>RESUME</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
