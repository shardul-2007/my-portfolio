'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import { labAudio } from '@/lib/audio';
import { PROFILE } from '@/data/profile';

export default function FloatingDock() {
  const [activeTab, setActiveTab] = useState<'work' | 'play' | 'journey' | 'about'>('work');
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show dock only after scrolling past the hero (exact parity with Rishika reference)
      setIsVisible(scrollY > 280);

      const scrollPos = scrollY + 350;
      const workEl = document.getElementById('projects');
      const playEl = document.getElementById('play') || document.getElementById('arcade');
      const journeyEl = document.getElementById('experience');
      const aboutEl = document.getElementById('about') || document.getElementById('desk');

      if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveTab('about');
      } else if (journeyEl && scrollPos >= journeyEl.offsetTop) {
        setActiveTab('journey');
      } else if (playEl && scrollPos >= playEl.offsetTop) {
        setActiveTab('play');
      } else if (workEl && scrollPos >= workEl.offsetTop) {
        setActiveTab('work');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleCopyEmail() {
    labAudio.playClick(1050);
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: 50, x: '-50%' }}
        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
        className="floating-bottom-dock"
      >
        {/* Tab links */}
        <nav className="flex items-center gap-1" aria-label="Quick Dock Navigation">
          <a
            href="#projects"
            onClick={() => {
              labAudio.playClick(900);
              setActiveTab('work');
            }}
            className={`mono text-xs px-3 py-1.5 rounded-full transition-all duration-200 select-none ${
              activeTab === 'work'
                ? 'bg-[#1e1420] text-white font-bold dark:bg-white dark:text-black shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            work
          </a>

          <a
            href="#arcade"
            onClick={() => {
              labAudio.playClick(950);
              setActiveTab('play');
            }}
            className={`mono text-xs px-3 py-1.5 rounded-full transition-all duration-200 select-none ${
              activeTab === 'play'
                ? 'bg-[#1e1420] text-white font-bold dark:bg-white dark:text-black shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            play
          </a>

          <a
            href="#experience"
            onClick={() => {
              labAudio.playClick(920);
              setActiveTab('journey');
            }}
            className={`mono text-xs px-3 py-1.5 rounded-full transition-all duration-200 select-none ${
              activeTab === 'journey'
                ? 'bg-[#1e1420] text-white font-bold dark:bg-white dark:text-black shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            journey
          </a>

          <a
            href="#about"
            onClick={() => {
              labAudio.playClick(890);
              setActiveTab('about');
            }}
            className={`mono text-xs px-3 py-1.5 rounded-full transition-all duration-200 select-none ${
              activeTab === 'about'
                ? 'bg-[#1e1420] text-white font-bold dark:bg-white dark:text-black shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            about
          </a>
        </nav>

        <span className="w-px h-4 bg-[var(--border)] mx-1" />

        {/* Signature Red Resume Action */}
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => labAudio.playClick(1100)}
          className="flex items-center gap-1.5 mono text-xs px-3.5 py-1.5 rounded-full bg-[#D9363E] text-white hover:bg-[#A91F2C] font-bold transition-all shadow-sm select-none"
        >
          <span>resume</span>
          <Download size={11} />
        </a>

        {/* Say Hi / Email Trigger */}
        <button
          onClick={handleCopyEmail}
          className="flex items-center gap-1.5 mono text-xs px-3 py-1.5 rounded-full text-[var(--text)] hover:bg-[var(--surface-2)] transition-all cursor-pointer select-none"
        >
          <Mail size={12} className="text-[#D9363E]" />
          <span>{copied ? 'copied!' : 'say hi'}</span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
