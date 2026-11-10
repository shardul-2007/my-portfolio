'use client';
import { useState, useEffect } from 'react';
import { ArrowUp, Download, Mail, ExternalLink, Sparkles } from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { labAudio } from '@/lib/audio';

interface Bug {
  id: number;
  x: number;
  y: number;
  angle: number;
  isSquashed: boolean;
}

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [squashedCount, setSquashedCount] = useState(0);
  const [duckWaddling, setDuckWaddling] = useState(false);

  // 6 interactive crawling ladybugs (Image 9 Parity)
  const [bugs, setBugs] = useState<Bug[]>([
    { id: 1, x: 20, y: 35, angle: 45, isSquashed: false },
    { id: 2, x: 62, y: 48, angle: -30, isSquashed: false },
    { id: 3, x: 42, y: 72, angle: 120, isSquashed: false },
    { id: 4, x: 78, y: 25, angle: -80, isSquashed: false },
    { id: 5, x: 88, y: 80, angle: 15, isSquashed: false },
    { id: 6, x: 50, y: 55, angle: 90, isSquashed: false },
  ]);

  // Bug gentle crawl simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBugs(prev =>
        prev.map(b => {
          if (b.isSquashed) return b;
          const deltaX = Math.cos(b.angle) * 1.5;
          const deltaY = Math.sin(b.angle) * 1.5;
          const newX = Math.max(8, Math.min(92, b.x + deltaX));
          const newY = Math.max(12, Math.min(88, b.y + deltaY));
          const newAngle = b.angle + (Math.random() - 0.5) * 0.4;
          return { ...b, x: newX, y: newY, angle: newAngle };
        })
      );
    }, 400);
    return () => clearInterval(interval);
  }, []);

  function handleSquashBug(id: number) {
    labAudio.playSquish();
    setBugs(prev =>
      prev.map(b => (b.id === id ? { ...b, isSquashed: true } : b))
    );
    setSquashedCount(c => c + 1);
  }

  function handleDuckClick() {
    labAudio.playQuack();
    setDuckWaddling(true);
    setTimeout(() => setDuckWaddling(false), 900);
  }

  function handleCopyEmail() {
    labAudio.playClick(1050);
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  }

  function scrollToTop() {
    labAudio.playClick(1000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="relative border-t border-[var(--border)] bg-[#fbf5f6] text-[#1e1420] pt-24 pb-20 overflow-hidden blueprint-grid select-none">
      {/* ─── Crawling / Squashable Ladybugs (Exact Parity with Image 9) ─── */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {bugs.map(bug => (
          <button
            key={bug.id}
            type="button"
            onClick={() => handleSquashBug(bug.id)}
            style={{
              left: `${bug.x}%`,
              top: `${bug.y}%`,
              transform: `translate(-50%, -50%) rotate(${bug.angle}rad)`,
            }}
            className={`absolute pointer-events-auto cursor-pointer transition-transform duration-300 ${
              bug.isSquashed ? 'bug-squashed' : 'hover:scale-125'
            }`}
            title="Squash bug!"
          >
            <svg viewBox="0 0 32 32" className="w-6 h-6">
              {/* Legs */}
              <line x1="16" y1="12" x2="6" y2="8" stroke="#1e1420" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="16" x2="4" y2="16" stroke="#1e1420" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="20" x2="6" y2="24" stroke="#1e1420" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="12" x2="26" y2="8" stroke="#1e1420" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="16" x2="28" y2="16" stroke="#1e1420" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="20" x2="26" y2="24" stroke="#1e1420" strokeWidth="2" strokeLinecap="round" />
              {/* Body */}
              <ellipse cx="16" cy="16" rx="9" ry="11" fill="#ff3b30" stroke="#1e1420" strokeWidth="1.5" />
              {/* Head */}
              <circle cx="16" cy="6" r="4" fill="#1e1420" />
              {/* Spots */}
              <circle cx="12" cy="13" r="2" fill="#1e1420" />
              <circle cx="20" cy="13" r="2" fill="#1e1420" />
              <circle cx="12" cy="19" r="2" fill="#1e1420" />
              <circle cx="20" cy="19" r="2" fill="#1e1420" />
              <line x1="16" y1="6" x2="16" y2="27" stroke="#1e1420" strokeWidth="1.5" />
            </svg>
          </button>
        ))}
      </div>

      <div className="section-container relative z-10 max-w-5xl">
        {/* Top Header & Sticky Sticker (Image 9 Parity) */}
        <div className="relative mb-12">
          {/* Sticky Note Badge */}
          <div className="absolute -top-12 right-4 sm:right-16 z-10 rotate-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#ffb8dc] text-[#1e1420] font-bold text-xs shadow-md border border-pink-300">
              <span>HIRE SHARDUL, MAYBE?</span>
              <span className="text-base">👀</span>
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1e1420] leading-[1.08]">
            let&apos;s make it work <br />
            on <span className="font-serif-italic font-normal text-[#ff4f9a]">everyone&apos;s</span> machine.
          </h2>

          {/* Giant Clickable Email (Image 9 Parity) */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#ff4f9a] hover:underline cursor-pointer flex items-center gap-3"
            >
              <span>{PROFILE.email}</span>
            </button>
            <span className="mono text-xs text-[var(--text-sub)] uppercase tracking-wider">
              {copied ? '✓ COPIED TO CLIPBOARD' : 'CLICK TO COPY'}
            </span>
          </div>
        </div>

        {/* 4-Column Directory Table (Image 9 Parity) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-[#e4e2da] text-xs font-mono">
          {/* Column 1: PEOPLE */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase font-bold text-[var(--text-sub)] tracking-widest">
              PEOPLE
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#1e1420] hover:text-[#8b5cf6] flex items-center justify-between"
                >
                  <span>LinkedIn</span>
                  <span>↗</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="font-bold text-[#1e1420] hover:text-[#8b5cf6] flex items-center justify-between"
                >
                  <span>Email</span>
                  <span>↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: WORK */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase font-bold text-[var(--text-sub)] tracking-widest">
              WORK
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#projects"
                  className="font-bold text-[#1e1420] hover:text-[#8b5cf6] flex items-center justify-between"
                >
                  <span>the projects</span>
                  <span>↑</span>
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="font-bold text-[#1e1420] hover:text-[#8b5cf6] flex items-center justify-between"
                >
                  <span>the journey</span>
                  <span>↑</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: VOICE */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase font-bold text-[var(--text-sub)] tracking-widest">
              VOICE
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#1e1420] hover:text-[#8b5cf6] flex items-center justify-between"
                >
                  <span>github</span>
                  <span>↗</span>
                </a>
              </li>
              <li>
                <a
                  href="#desk"
                  className="font-bold text-[#1e1420] hover:text-[#8b5cf6] flex items-center justify-between"
                >
                  <span>the desk</span>
                  <span>↑</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: PAPERWORK + SQUEAKY DUCK */}
          <div className="space-y-3 relative">
            <h3 className="text-[10px] uppercase font-bold text-[var(--text-sub)] tracking-widest">
              PAPERWORK
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#1e1420] hover:text-[#8b5cf6] flex items-center justify-between"
                >
                  <span>resume.pdf</span>
                  <span>↓</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="font-bold text-[#1e1420] hover:text-[#8b5cf6] flex items-center justify-between w-full cursor-pointer"
                >
                  <span>back to top</span>
                  <span>↑</span>
                </button>
              </li>
            </ul>

            {/* Squeaky Yellow Rubber Duck (Image 9 Parity) */}
            <div className="absolute right-0 bottom-0 pointer-events-auto">
              <button
                type="button"
                onClick={handleDuckClick}
                className={`transition-transform duration-200 cursor-pointer ${
                  duckWaddling ? 'scale-125 rotate-12' : 'hover:scale-110'
                }`}
                title="Squeak the debugging rubber duck!"
              >
                <span className="text-4xl select-none" role="img" aria-label="Rubber duck">
                  🐥
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar with Squash Counter (Image 9 Parity) */}
        <div className="mt-14 pt-6 border-t border-[#e4e2da] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs mono text-[var(--text-sub)]">
          <p>© 2026 shardul parihar · built from a blank file, mostly</p>

          <div className="flex items-center gap-3">
            <span>a few bugs got into the footer. click them.</span>
            <span className="px-3 py-1 rounded-full bg-[#1e1420] text-white font-bold text-[11px]">
              squashed {squashedCount}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
