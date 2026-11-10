'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  Copy,
  Check,
  ExternalLink,
  Github,
  Linkedin,
  Terminal,
  UserCheck,
  MapPin,
  Sparkles,
  Layers,
  Clock,
  Compass,
  Cpu,
  Zap,
  Sliders,
  FileText,
  Mail,
} from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { assetPath } from '@/lib/basePath';
import { labAudio } from '@/lib/audio';

interface HeroProps {
  onOpenRecruiter: () => void;
  onOpenCommand: () => void;
}

export default function Hero({ onOpenRecruiter, onOpenCommand }: HeroProps) {
  const [mode, setMode] = useState<'split' | 'design' | 'code'>('split');
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(`${timeStr} IST`);
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleCopyEmail() {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    labAudio.playChime();
    setTimeout(() => setCopied(false), 2400);
  }

  function handleModeChange(newMode: 'split' | 'design' | 'code') {
    labAudio.playClick(newMode === 'split' ? 950 : newMode === 'design' ? 1100 : 800);
    setMode(newMode);
  }

  return (
    <section id="hero" className="relative min-h-[95vh] flex flex-col justify-center pt-24 pb-12 overflow-hidden border-b border-[var(--border)]">
      {/* ─── Mode Switcher Pill (Tactile Center Toggle) ─── */}
      <div className="section-container relative z-30 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-ping" />
          <span className="mono text-[11px] font-bold tracking-widest uppercase text-[var(--text-sub)]">
            SHARDUL.LAB // DUAL PERSPECTIVE ENGINE
          </span>
        </div>

        {/* Tactile Toggle Button */}
        <div className="inline-flex items-center p-1 rounded-full bg-[var(--surface-2)] border border-[var(--border-strong)] shadow-lg backdrop-blur-xl">
          <button
            onClick={() => handleModeChange('design')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'design'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <span>✦</span>
            <span>DESIGN</span>
          </button>

          <button
            onClick={() => handleModeChange('split')}
            className={`hidden md:flex px-3 sm:px-4 py-1.5 rounded-full text-xs mono font-bold transition-all cursor-pointer items-center gap-1.5 ${
              mode === 'split'
                ? 'bg-[var(--accent)] text-black shadow-md'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <span>◈</span>
            <span>50/50 SPLIT</span>
          </button>

          <button
            onClick={() => handleModeChange('code')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'code'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <span>⚙</span>
            <span>CODE</span>
          </button>
        </div>
      </div>

      {/* ─── Dual World Canvas Container ─── */}
      <div className="section-container relative z-10 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch min-h-[720px]">
          {/* ══════════════════════════════════════════════════
              LEFT SIDE: EDITORIAL DESIGN CANVAS (WARM IVORY)
              ══════════════════════════════════════════════════ */}
          {(mode === 'split' || mode === 'design') && (
            <motion.div
              layout
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-3xl p-6 sm:p-10 border transition-all flex flex-col justify-between overflow-hidden shadow-2xl ${
                mode === 'design' ? 'md:col-span-12' : 'md:col-span-6'
              } bg-[#FAF7F2] text-[#141519] border-[#E8E2D8] dark:bg-[#12141C] dark:text-[#F3F4F6] dark:border-[#262A3B]`}
            >
              {/* Subtle Warm Paper Texture Accent */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-200/20 via-pink-200/10 to-transparent pointer-events-none rounded-full blur-2xl" />

              {/* Top Subheader & Floating Stickers */}
              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold tracking-wider text-emerald-700 dark:text-emerald-400">
                      AVAILABLE FOR WORK
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#71717A] dark:text-[#94A3B8]">
                    <MapPin size={12} className="text-amber-600 dark:text-amber-400" />
                    <span>Pune, India</span>
                  </div>
                </div>

                {/* Playful Floating Stickers */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="sticker-badge bg-white dark:bg-[#1E2235] text-[#18181B] dark:text-[#E2E8F0] border border-[#E4E4E7] dark:border-[#33384D] rotate-[-2deg]">
                    ✦ CREATIVE ENGINEER
                  </span>
                  <span className="sticker-badge bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 rotate-[1deg]">
                    ★ 2026 COHORT
                  </span>
                  <span className="sticker-badge bg-sky-100 dark:bg-sky-950/60 text-sky-900 dark:text-sky-200 border border-sky-300 dark:border-sky-800 rotate-[-1deg]">
                    ♥ OPEN SOURCE
                  </span>
                </div>
              </div>

              {/* Centerpiece: Giant Editorial Typography & Integrated Portrait */}
              <div className="relative z-10 my-8">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  {/* Big Name Typography */}
                  <div className="sm:col-span-7 space-y-2">
                    <div className="mono text-[11px] font-bold tracking-[0.25em] text-amber-600 dark:text-amber-400 uppercase">
                      [01] // PORTFOLIO ARCHIVE
                    </div>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] font-editorial">
                      SHARDUL <br />
                      <span className="italic font-serif font-normal text-amber-600 dark:text-amber-400">Parihar</span>.
                    </h1>
                    <div className="text-base sm:text-lg font-medium text-[#52525B] dark:text-[#94A3B8] pt-1">
                      Software Engineer · Builder · AI Enthusiast
                    </div>
                  </div>

                  {/* Cutout / Integrated Portrait with Floating Message */}
                  <div className="sm:col-span-5 relative flex justify-center">
                    <div className="relative w-44 sm:w-48 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 border-white dark:border-[#2D3349] group">
                      <img
                        src={assetPath('/imageshardul.png')}
                        alt="Shardul Parihar"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 right-2 text-center mono text-[10px] text-white/90 bg-black/60 backdrop-blur-md py-1 px-2 rounded-lg">
                        SHARDUL RAJENDRA PARIHAR
                      </div>
                    </div>

                    {/* Speech Bubble Floating Note */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute -top-4 -right-2 sm:-right-4 bg-white dark:bg-[#1E2235] text-[#18181B] dark:text-[#E2E8F0] text-[11px] font-medium py-1.5 px-3 rounded-2xl shadow-lg border border-[#E4E4E7] dark:border-[#33384D] max-w-[150px] leading-tight"
                    >
                      <span>Hi, I&apos;m Shardul! 👋 Let&apos;s build the future.</span>
                      {/* Bubble Arrow */}
                      <span className="absolute -bottom-1.5 left-4 w-3 h-3 bg-white dark:bg-[#1E2235] border-r border-b border-[#E4E4E7] dark:border-[#33384D] rotate-45" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Lower Section: Personal Introduction & Direct Action Buttons */}
              <div className="relative z-10 pt-4 border-t border-[#E8E2D8] dark:border-[#262A3B] space-y-4">
                <p className="text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#94A3B8] font-light max-w-lg">
                  Software engineering student building full-stack products, exploring AI, cybersecurity, web technologies, and open-source development.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <a
                    href="#projects"
                    onClick={() => labAudio.playClick(1000)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs mono font-bold bg-[#141519] text-white dark:bg-amber-400 dark:text-black shadow-md hover:scale-105 transition-transform"
                  >
                    <span>VIEW MY WORK</span>
                    <ArrowDown size={14} />
                  </a>

                  <button
                    onClick={() => {
                      labAudio.playClick(1100);
                      onOpenRecruiter();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs mono font-bold bg-white dark:bg-[#1E2235] text-[#18181B] dark:text-[#E2E8F0] border border-[#D4D4D8] dark:border-[#33384D] shadow-sm hover:border-amber-500 transition-colors"
                  >
                    <FileText size={13} className="text-amber-500" />
                    <span>RESUME / 90s</span>
                  </button>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs mono font-semibold bg-white dark:bg-[#1E2235] text-[#18181B] dark:text-[#E2E8F0] border border-[#D4D4D8] dark:border-[#33384D] shadow-sm hover:border-amber-500 transition-colors"
                    title="Copy Email Address"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>EMAIL</span>
                      </>
                    )}
                  </button>

                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white dark:bg-[#1E2235] text-[#18181B] dark:text-[#E2E8F0] border border-[#D4D4D8] dark:border-[#33384D] hover:text-amber-500 transition-colors"
                    title="GitHub @shardul-2007"
                  >
                    <Github size={15} />
                  </a>

                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white dark:bg-[#1E2235] text-[#18181B] dark:text-[#E2E8F0] border border-[#D4D4D8] dark:border-[#33384D] hover:text-amber-500 transition-colors"
                    title="LinkedIn /in/shardul-parihar"
                  >
                    <Linkedin size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════
              RIGHT SIDE: TECHNICAL CODE CANVAS (BLUEPRINT / PURPLE)
              ══════════════════════════════════════════════════ */}
          {(mode === 'split' || mode === 'code') && (
            <motion.div
              layout
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-3xl p-6 sm:p-10 border transition-all flex flex-col justify-between overflow-hidden shadow-2xl blueprint-grid ${
                mode === 'code' ? 'md:col-span-12' : 'md:col-span-6'
              } bg-[#F4F1FA] text-[#1A102F] border-[#DFD7EB] dark:bg-[#0B0C16] dark:text-[#E0E7FF] dark:border-[#22253E]`}
            >
              {/* Technical Ruler & Coordinate Crosshairs */}
              <div className="absolute top-4 right-4 mono text-[10px] text-purple-700 dark:text-purple-400 space-y-0.5 text-right opacity-80">
                <div>+ COORD: 18.5204° N // 73.8567° E</div>
                <div>+ NODE: SHARDUL.LAB.PROD</div>
                <div>+ CLK: {currentTime || 'SYNCING...'}</div>
              </div>

              {/* Top Telemetry Header */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="mono text-[10px] font-bold px-2 py-0.5 rounded bg-purple-200 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300 border border-purple-300 dark:border-purple-700">
                    SYS_SPEC // TECHNICAL DESIGN SYSTEM
                  </span>
                  <span className="mono text-[10px] text-[#6B7280] dark:text-[#9CA3AF]">
                    ver: 5.2.0-prod
                  </span>
                </div>

                {/* Typography Measurement Caliper Bar */}
                <div className="flex flex-wrap items-center gap-3 text-[10px] mono text-purple-800 dark:text-purple-300 pt-1">
                  <span className="px-2 py-0.5 rounded bg-white/70 dark:bg-black/40 border border-purple-200 dark:border-purple-800">
                    cap-height: 84px
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/70 dark:bg-black/40 border border-purple-200 dark:border-purple-800">
                    baseline: 18px
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/70 dark:bg-black/40 border border-purple-200 dark:border-purple-800">
                    tracking: -0.04em
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/70 dark:bg-black/40 border border-purple-200 dark:border-purple-800">
                    weight: 800
                  </span>
                </div>
              </div>

              {/* Centerpiece: Oversized Outlined Typography & Architecture Specs */}
              <div className="relative z-10 my-8 space-y-4">
                <div className="mono text-xs font-bold text-purple-600 dark:text-purple-400 tracking-[0.2em]">
                  {"// ARCHITECTURE & DEPLOYMENT UNIVERSE"}
                </div>

                <div className="space-y-1">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] outline-text text-purple-900 dark:text-purple-200">
                    SHARDUL.LAB
                  </h2>
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-purple-950 dark:text-purple-100">
                    BUILDING DIGITAL EXPERIENCES
                  </div>
                  <div className="mono text-xs tracking-wider font-semibold text-purple-700 dark:text-purple-300">
                    FULL STACK / AI / CYBERSECURITY / 3D WEBGL
                  </div>
                </div>

                {/* Developer Inline Comments */}
                <div className="p-4 rounded-xl bg-white/80 dark:bg-black/50 border border-purple-200 dark:border-purple-900/60 font-mono text-xs space-y-1 text-purple-900 dark:text-purple-200">
                  <div className="text-[#6B7280] dark:text-[#9CA3AF]">{'// System Telemetry & Shipped Metrics:'}</div>
                  <div className="flex items-center justify-between">
                    <span>const FEATURED_SYSTEMS = 4;</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400">{'/* CivicOS, AssemblyOS, SkillCert, Lab */'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>const PROGRAMS_ROLES = 17;</span>
                    <span className="text-[10px] text-sky-600 dark:text-sky-400">{'/* 6 Active, 11 Completed */'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>const CREDENTIALS = 16;</span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400">{'/* Verified Proofs */'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>const SKILLS_INVENTORY = 23;</span>
                    <span className="text-[10px] text-purple-600 dark:text-purple-400">{'/* 7 Categories */'}</span>
                  </div>
                </div>
              </div>

              {/* Lower Section: Technical Quick Triggers */}
              <div className="relative z-10 pt-4 border-t border-[#DFD7EB] dark:border-[#22253E] space-y-4">
                <div className="mono text-[11px] text-purple-800 dark:text-purple-300 flex items-center justify-between">
                  <span>{'INTERACTIVE LAUNCHPAD // TERMINAL + LABS'}</span>
                  <span>STATUS: READY</span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href="#terminal"
                    onClick={() => labAudio.playClick(1200)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs mono font-bold bg-purple-700 text-white hover:bg-purple-800 transition-colors shadow-sm"
                  >
                    <Terminal size={14} />
                    <span>LAUNCH CLI TERMINAL</span>
                  </a>

                  <a
                    href="#architecture"
                    onClick={() => labAudio.playClick(900)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs mono font-semibold bg-white/80 dark:bg-[#1E2235] text-purple-950 dark:text-purple-200 border border-purple-200 dark:border-purple-800 hover:border-purple-500 transition-colors"
                  >
                    <Layers size={13} />
                    <span>ARCHITECTURE</span>
                  </a>

                  <a
                    href="#arcade"
                    onClick={() => labAudio.playClick(1050)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs mono font-semibold bg-white/80 dark:bg-[#1E2235] text-purple-950 dark:text-purple-200 border border-purple-200 dark:border-purple-800 hover:border-purple-500 transition-colors"
                  >
                    <Zap size={13} className="text-amber-500" />
                    <span>ARCADE</span>
                  </a>

                  <button
                    onClick={() => {
                      labAudio.playClick(900);
                      onOpenCommand();
                    }}
                    className="inline-flex items-center gap-1 px-3 py-2.5 rounded-full text-xs mono font-semibold bg-white/80 dark:bg-[#1E2235] text-purple-950 dark:text-purple-200 border border-purple-200 dark:border-purple-800 hover:border-purple-500 transition-colors"
                    title="Command Palette"
                  >
                    <span>⌘K</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
