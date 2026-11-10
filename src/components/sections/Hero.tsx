'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
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
  Eye,
  Maximize2,
  Scan,
  Minimize2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { assetPath } from '@/lib/basePath';
import { labAudio } from '@/lib/audio';

interface HeroProps {
  onOpenRecruiter: () => void;
  onOpenCommand: () => void;
}

export default function Hero({ onOpenRecruiter, onOpenCommand }: HeroProps) {
  // ── 1. Split-Screen Comparison State ─────────────────────────────
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(true);
  const [hoveredComponent, setHoveredComponent] = useState<string>('ROOT_HERO_CONTAINER');
  const [copied, setCopied] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ── 2. Real-Time IST Clock ────────────────────────────────────────
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

  // ── 3. Pointer & Drag Tracking Engine ─────────────────────────────
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const rawPos = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(12, Math.min(88, rawPos));

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    setSliderPos(clamped);
  }, []);

  const handlePointerDown = () => {
    setIsDragging(true);
    labAudio.playClick(900);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setIsDragging(false);
    setHoveredComponent('ROOT_HERO_CONTAINER');
    // Gently glide back to 50% after a short delay
    resetTimerRef.current = setTimeout(() => {
      setSliderPos(50);
    }, 1800);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos(prev => Math.max(12, prev - 5));
      labAudio.playClick(850);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos(prev => Math.min(88, prev + 5));
      labAudio.playClick(950);
    }
  };

  // Cycle states on center handle click
  const cycleStates = () => {
    labAudio.playClick(1000);
    if (sliderPos > 40 && sliderPos < 60) {
      setSliderPos(15); // Mostly X-Ray view
    } else if (sliderPos <= 40) {
      setSliderPos(85); // Mostly Reality view
    } else {
      setSliderPos(50); // Balanced 50/50 view
    }
  };

  function handleCopyEmail() {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    labAudio.playChime();
    setTimeout(() => setCopied(false), 2400);
  }

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex flex-col justify-center pt-24 pb-12 overflow-hidden border-b border-[var(--border)] select-none"
    >
      {/* ─── Top Telemetry & Instruction Bar ─── */}
      <div className="section-container relative z-30 mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border-strong)]">
            <Scan size={13} className="text-[var(--accent)] animate-pulse" />
            <span className="mono text-[11px] font-bold tracking-widest uppercase text-[var(--text)]">
              REALITY / X-RAY ENGINE
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 mono text-[10px] text-[var(--text-sub)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)]" />
            <span>MOVE CURSOR TO REVEAL · DRAG HANDLE TO INSPECT</span>
          </div>
        </div>

        {/* Quick Mode Presets */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)] backdrop-blur-md">
          <button
            onClick={() => {
              labAudio.playClick(850);
              setSliderPos(85);
            }}
            className={`px-3 py-1 rounded-full text-xs mono font-bold transition-all ${
              sliderPos >= 70
                ? 'bg-amber-400 text-black shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
            title="Focus on Finished Portfolio Reality"
          >
            REALITY (85%)
          </button>

          <button
            onClick={() => {
              labAudio.playClick(950);
              setSliderPos(50);
            }}
            className={`px-3 py-1 rounded-full text-xs mono font-bold transition-all ${
              sliderPos > 35 && sliderPos < 65
                ? 'bg-[var(--accent)] text-black shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
            title="50/50 Dual Synchronized Perspective"
          >
            50/50 SPLIT
          </button>

          <button
            onClick={() => {
              labAudio.playClick(1050);
              setSliderPos(15);
            }}
            className={`px-3 py-1 rounded-full text-xs mono font-bold transition-all ${
              sliderPos <= 35
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
            title="Focus on Architectural X-Ray Inspection"
          >
            X-RAY (85%)
          </button>
        </div>
      </div>

      {/* ─── Dual-Layer Comparison Canvas ─── */}
      <div className="section-container relative z-10 w-full flex-1">
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Interactive Reality and X-Ray engineering comparison view. Use Left and Right arrow keys to move the inspection divider."
          className="relative w-full min-h-[720px] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-strong)] cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          {/* ══════════════════════════════════════════════════
              LAYER A: REALITY (ORIGINAL POLISHED PORTFOLIO)
              ══════════════════════════════════════════════════ */}
          <div className="absolute inset-0 w-full h-full bg-[#FAF7F2] dark:bg-[#0D0F18] text-[#141519] dark:text-[#F3F4F6] p-6 sm:p-12 flex flex-col justify-between overflow-hidden">
            {/* Subtle Editorial Gradient Mesh */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-200/25 via-pink-200/10 to-transparent pointer-events-none rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-200/20 via-transparent to-transparent pointer-events-none rounded-full blur-2xl" />

            {/* Top Bar in Reality */}
            <div
              onMouseEnter={() => setHoveredComponent('TELEMETRY_STATUS_BAR')}
              className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs mono"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold tracking-wider text-emerald-700 dark:text-emerald-400">
                  AVAILABLE FOR WORK
                </span>
                <span className="text-[#A1A1AA] dark:text-[#64748B]">·</span>
                <span className="text-[#71717A] dark:text-[#94A3B8]">Full-Stack &amp; Applied AI</span>
              </div>

              <div className="flex items-center gap-2 text-[#71717A] dark:text-[#94A3B8]">
                <MapPin size={12} className="text-amber-600 dark:text-amber-400" />
                <span>Pune, India (UTC+5:30)</span>
                <span className="text-[#A1A1AA] dark:text-[#64748B]">·</span>
                <span className="mono font-semibold">{currentTime || '18:30 IST'}</span>
              </div>
            </div>

            {/* Centerpiece: Main Editorial Hero Typography & Integrated Portrait */}
            <div className="relative z-10 my-auto py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Giant Typography */}
                <div
                  onMouseEnter={() => setHoveredComponent('HERO_HEADLINE_TYPOGRAPHY')}
                  className="lg:col-span-7 space-y-4"
                >
                  <div className="mono text-[11px] font-bold tracking-[0.25em] text-amber-600 dark:text-amber-400 uppercase flex items-center gap-2">
                    <span className="w-5 h-px bg-amber-600 dark:bg-amber-400" />
                    <span>SHARDUL.LAB // ARCHITECTURAL DOSSIER</span>
                  </div>

                  {/* Rishika-Style Short Version Statement & Typography Caliper */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[10px] mono text-[#8B5CF6] font-bold">
                      <span>h1 · Space Grotesk · fit-to-width · -0.066em</span>
                      <span className="text-[#A1A1AA] dark:text-[#64748B]">SYS_CORE: #007</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#52525B] dark:text-[#CBD5E1] font-mono leading-relaxed">
                      they said pick one: <span className="font-bold text-[#FF6B35]">systems rigor</span> or <span className="font-bold text-[#8B5CF6]">product velocity</span>. i kept both, compiled with zero warnings, and shipped 4 production platforms.
                    </p>
                  </div>

                  <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.92] font-editorial">
                    SHARDUL <br />
                    <span className="italic font-serif font-normal text-amber-600 dark:text-amber-400">
                      Parihar
                    </span>
                    .
                  </h1>

                  <div className="text-lg sm:text-xl font-semibold text-[#52525B] dark:text-[#94A3B8]">
                    Software Engineer · Systems Builder · AI Enthusiast
                  </div>

                  <p
                    onMouseEnter={() => setHoveredComponent('BIOGRAPHY_PROSE_CONTAINER')}
                    className="text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#94A3B8] font-light max-w-xl"
                  >
                    Software engineering student building full-stack products, exploring AI, cybersecurity, web technologies, and open-source ecosystems. Dedicated to first-principles problem solving and high-impact digital products.
                  </p>

                  {/* Verified Metric Badges */}
                  <div
                    onMouseEnter={() => setHoveredComponent('VERIFIED_METRICS_CLUSTER')}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[#E8E2D8] dark:border-[#262A3B] max-w-xl"
                  >
                    {[
                      { val: '17+', label: 'Programs & Roles', sub: 'Campus & Open Source' },
                      { val: '16', label: 'Achievements', sub: 'Verified Credentials' },
                      { val: '23', label: 'Tech Stack Skills', sub: 'Daily & Proficient' },
                      { val: '04', label: 'Featured Systems', sub: 'Production Shipped' },
                    ].map(st => (
                      <div key={st.label} className="space-y-0.5">
                        <div className="text-2xl font-bold mono text-amber-600 dark:text-amber-400">
                          {st.val}
                        </div>
                        <div className="text-[11px] font-bold text-[#18181B] dark:text-white leading-tight">
                          {st.label}
                        </div>
                        <div className="text-[9px] text-[#71717A] dark:text-[#64748B]">{st.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Dispatch Buttons */}
                  <div
                    onMouseEnter={() => setHoveredComponent('ACTION_DISPATCH_BAR')}
                    className="flex flex-wrap items-center gap-3 pt-2"
                  >
                    <a
                      href="#projects"
                      onClick={() => labAudio.playClick(1000)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs mono font-bold bg-[#141519] text-white dark:bg-amber-400 dark:text-black shadow-lg hover:scale-105 transition-transform"
                    >
                      <span>VIEW MY WORK</span>
                      <ArrowDown size={14} />
                    </a>

                    <button
                      onClick={() => {
                        labAudio.playClick(1100);
                        onOpenRecruiter();
                      }}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs mono font-bold bg-white dark:bg-[#1E2235] text-[#18181B] dark:text-[#E2E8F0] border border-[#D4D4D8] dark:border-[#33384D] shadow-sm hover:border-amber-500 transition-colors"
                    >
                      <UserCheck size={14} className="text-amber-500" />
                      <span>90s RECRUITER TOUR</span>
                    </button>

                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs mono font-semibold bg-white dark:bg-[#1E2235] text-[#18181B] dark:text-[#E2E8F0] border border-[#D4D4D8] dark:border-[#33384D] shadow-sm hover:border-amber-500 transition-colors"
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
                  </div>
                </div>

                {/* Right Column: Layered Editorial Portrait */}
                <div
                  onMouseEnter={() => setHoveredComponent('PORTRAIT_HERO_VIEWPORT')}
                  className="lg:col-span-5 relative flex justify-center"
                >
                  <div className="relative w-56 sm:w-64 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#232738] group">
                    <img
                      src={assetPath('/imageshardul.png')}
                      alt="Shardul Parihar — Software Engineer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 text-center mono text-[10px] text-white/95 bg-black/60 backdrop-blur-md py-1.5 px-3 rounded-xl border border-white/10">
                      SHARDUL RAJENDRA PARIHAR
                    </div>
                  </div>

                  {/* Speech Bubble Floating Note */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -top-4 -right-2 sm:-right-4 bg-white dark:bg-[#1E2235] text-[#18181B] dark:text-[#E2E8F0] text-xs font-semibold py-2 px-3.5 rounded-2xl shadow-xl border border-[#E4E4E7] dark:border-[#33384D] max-w-[170px] leading-snug"
                  >
                    <span>Hi, I&apos;m Shardul! 👋 Let&apos;s build the future.</span>
                    <span className="absolute -bottom-1.5 left-4 w-3 h-3 bg-white dark:bg-[#1E2235] border-r border-b border-[#E4E4E7] dark:border-[#33384D] rotate-45" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom Reality Footer */}
            <div className="relative z-10 pt-4 border-t border-[#E8E2D8] dark:border-[#262A3B] flex flex-wrap items-center justify-between text-xs mono text-[#71717A] dark:text-[#94A3B8]">
              <div className="flex items-center gap-3">
                <span>© 2026 SHARDUL.LAB</span>
                <span>·</span>
                <span>PCET&apos;S NMIET PUNE</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-600 transition-colors"
                >
                  GITHUB
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-600 transition-colors"
                >
                  LINKEDIN
                </a>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              LAYER B: X-RAY (ENGINEERING ARCHITECTURE SCANNER)
              ══════════════════════════════════════════════════ */}
          <div
            style={{
              clipPath: `inset(0 0 0 ${sliderPos}%)`,
              WebkitClipPath: `inset(0 0 0 ${sliderPos}%)`,
            }}
            className="absolute inset-0 w-full h-full bg-[#080914] text-[#C4B5FD] p-6 sm:p-12 flex flex-col justify-between overflow-hidden blueprint-grid"
          >
            {/* Subtle Laser Scanner Sweep Beam */}
            <motion.div
              animate={{ y: ['0%', '100%', '0%'] }}
              transition={{ duration: 7, ease: 'linear', repeat: Infinity }}
              className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 blur-sm pointer-events-none"
            />

            {/* Top Bar in X-Ray (Component Wireframe) */}
            <div
              onMouseEnter={() => setHoveredComponent('TELEMETRY_STATUS_BAR')}
              className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs mono border border-purple-500/40 bg-purple-950/30 p-2.5 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                  [COMPONENT: STATUS_TELEMETRY]
                </span>
                <span className="text-cyan-400 font-bold">LATENCY: 18ms</span>
                <span className="text-purple-400">·</span>
                <span className="text-purple-300">HTTP_STATUS: 200_OK</span>
              </div>

              <div className="flex items-center gap-2 text-purple-300 text-[10px]">
                <span>LAT: 18.5204° N</span>
                <span>LON: 73.8567° E</span>
                <span>NODE: PROD_EDGE</span>
                <span className="text-cyan-400 font-bold">{currentTime || '18:30 IST'}</span>
              </div>
            </div>

            {/* Centerpiece: X-Ray Wireframe Layout Breakdown */}
            <div className="relative z-10 my-auto py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Outlined Typography & Caliper Measurements */}
                <div
                  onMouseEnter={() => setHoveredComponent('HERO_HEADLINE_TYPOGRAPHY')}
                  className="lg:col-span-7 space-y-4 border border-dashed border-purple-500/50 p-6 rounded-2xl relative bg-purple-950/10"
                >
                  {/* Caliper Measurement Tag */}
                  <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-[#080914] border border-purple-400 text-[10px] mono text-purple-300 font-bold">
                    BOX_SPEC // W: 58.3% · H: AUTO · DISPLAY: FLEX_COL
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[10px] mono text-cyan-400 font-bold border-b border-purple-500/30 pb-1">
                      <span>h1 · Space Grotesk · fit-to-width · -0.066em</span>
                      <span className="text-purple-400">LAYER_01: DOM_NODE</span>
                    </div>
                    <p className="text-xs text-purple-300 font-mono leading-relaxed">
                      {'// MANIFEST: ZERO COMPILER WARNINGS · 4 SYSTEMS DEPLOYED TO PRODUCTION'}
                    </p>
                  </div>

                  <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.92] outline-text text-purple-300">
                    SHARDUL <br />
                    <span className="outline-text-thick text-cyan-400">Parihar</span>.
                  </h1>

                  <div className="mono text-xs font-semibold text-purple-400 border-l-2 border-purple-500 pl-3">
                    ROLE_DESCRIPTOR: Full-Stack Architect / Applied AI Researcher / Security Systems
                  </div>

                  {/* Prose Wireframe */}
                  <div
                    onMouseEnter={() => setHoveredComponent('BIOGRAPHY_PROSE_CONTAINER')}
                    className="p-3 rounded-lg bg-black/40 border border-purple-900/60 mono text-xs text-purple-300 space-y-1"
                  >
                    <div className="text-[10px] text-purple-400 font-bold">
                      {'// ARCHITECTURAL CORE: FIRST-PRINCIPLES SYSTEMS REASONING'}
                    </div>
                    <div>
                      const FOCUS_DOMAINS = [&quot;FullStack&quot;, &quot;Applied_ML&quot;, &quot;WebGL_3D&quot;, &quot;AppSec&quot;];
                    </div>
                    <div className="text-cyan-300">
                      productionShipped: [&quot;CivicOS&quot;, &quot;AssemblyOS&quot;, &quot;SkillCert&quot;, &quot;SHARDUL.LAB&quot;];
                    </div>
                  </div>

                  {/* Metrics Wireframe Nodes */}
                  <div
                    onMouseEnter={() => setHoveredComponent('VERIFIED_METRICS_CLUSTER')}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-purple-500/40 text-xs mono"
                  >
                    {[
                      { num: 'NODE_01', val: '17', label: 'PROGRAMS', desc: '6 ACT / 11 CMP' },
                      { num: 'NODE_02', val: '16', label: 'AWARDS', desc: 'SHA-256 PROOFS' },
                      { num: 'NODE_03', val: '23', label: 'CAPABILITIES', desc: '7 CATEGORIES' },
                      { num: 'NODE_04', val: '04', label: 'SYSTEMS', desc: '100% PROD LIVE' },
                    ].map(node => (
                      <div key={node.num} className="p-2 rounded bg-purple-950/40 border border-purple-800">
                        <div className="text-[9px] text-purple-400 font-bold">{node.num}</div>
                        <div className="text-xl font-bold text-cyan-400">{node.val}</div>
                        <div className="text-[10px] font-semibold text-white">{node.label}</div>
                        <div className="text-[8px] text-purple-300">{node.desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* Actions Wireframe Bar */}
                  <div
                    onMouseEnter={() => setHoveredComponent('ACTION_DISPATCH_BAR')}
                    className="flex flex-wrap items-center gap-3 pt-2 text-xs mono"
                  >
                    <div className="px-4 py-2.5 rounded-full border border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold">
                      DISPATCH: ANCHOR(#projects)
                    </div>
                    <div className="px-4 py-2.5 rounded-full border border-purple-500 bg-purple-950/40 text-purple-200">
                      MODAL: TOUR_90S(recruiter)
                    </div>
                    <div className="px-3 py-2.5 rounded-full border border-purple-700 bg-black/40 text-purple-300">
                      EXEC: CLIPBOARD(email)
                    </div>
                  </div>
                </div>

                {/* Right Column: X-Ray Wireframe Silhouette of Portrait */}
                <div
                  onMouseEnter={() => setHoveredComponent('PORTRAIT_HERO_VIEWPORT')}
                  className="lg:col-span-5 relative flex justify-center"
                >
                  <div className="relative w-56 sm:w-64 aspect-[4/5] rounded-3xl overflow-hidden border-2 border-purple-400 bg-black/60 p-2 shadow-2xl flex flex-col justify-between">
                    {/* Bounding Box Corner Brackets */}
                    <div className="flex justify-between text-cyan-400 mono text-xs">
                      <span>┌ SPEC: 4/5</span>
                      <span>┐</span>
                    </div>

                    {/* Stylized Wireframe Silhouette Image */}
                    <div className="relative flex-1 my-2 rounded-xl overflow-hidden border border-purple-500/50 bg-purple-950/20">
                      <img
                        src={assetPath('/imageshardul.png')}
                        alt="Wireframe Silhouette"
                        className="w-full h-full object-cover object-top filter brightness-[0.7] contrast-[1.8] hue-rotate-[240deg] opacity-75"
                      />
                      {/* Target Reticle Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-24 h-24 rounded-full border border-cyan-400/60 border-dashed animate-spin" />
                      </div>
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] mono text-cyan-400 font-bold border border-cyan-500/50">
                        TARGET_IDENT: SHARDUL
                      </div>
                    </div>

                    <div className="flex justify-between text-cyan-400 mono text-xs">
                      <span>└ Z-INDEX: 10</span>
                      <span>HASH: 0x7E3F9A ┘</span>
                    </div>
                  </div>

                  {/* Speech Bubble Wireframe */}
                  <div className="absolute -top-4 -right-2 sm:-right-4 bg-purple-950/90 text-cyan-300 text-[10px] mono font-bold py-2 px-3 rounded-xl border border-cyan-400 shadow-xl max-w-[170px]">
                    <span>[SYS_MESSAGE: GREETING_DISPATCH]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom X-Ray Telemetry Footer */}
            <div className="relative z-10 pt-4 border-t border-purple-500/30 flex flex-wrap items-center justify-between text-xs mono text-purple-300">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">BUFFER: SYNCHRONIZED_DUAL_PASS</span>
                <span>·</span>
                <span>RENDERER: WEBGL_HTML5</span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span>DIVIDER_X: {Math.round(sliderPos)}%</span>
                <span className="text-emerald-400 font-bold">SYS_HEALTH: OPTIMAL</span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              TACTILE CENTER DIVIDER & GRAB HANDLE
              ══════════════════════════════════════════════════ */}
          <div
            style={{ left: `${sliderPos}%` }}
            className="absolute top-0 bottom-0 w-0.5 -ml-px z-30 pointer-events-none"
          >
            {/* Electric Vertical Divider Line */}
            <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(0,245,200,0.8)]" />

            {/* Central Circular Interactive Handle */}
            <div
              onPointerDown={handlePointerDown}
              onClick={cycleStates}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-ew-resize group"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-[#141519] border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,245,200,0.5)] flex items-center justify-center text-white backdrop-blur-xl relative"
              >
                <div className="flex items-center gap-0.5 text-cyan-300">
                  <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                  <div className="w-1 h-3 rounded-full bg-cyan-400" />
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>

                {/* Pulsing Scanner Ring */}
                <span className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-40 pointer-events-none" />
              </motion.div>

              {/* Tooltip Instruction Badge */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-black/80 border border-white/20 text-[9px] mono text-white shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                {isDragging ? 'DRAGGING...' : 'CLICK TO CYCLE · DRAG TO INSPECT'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Floating Engineering Inspector HUD Panel ─── */}
      <AnimatePresence>
        {inspectorOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl glass border border-purple-500/50 shadow-2xl backdrop-blur-2xl max-w-xs text-xs mono space-y-2 bg-[#0B0D19]/90 text-purple-200"
          >
            <div className="flex items-center justify-between pb-2 border-b border-purple-500/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold text-white tracking-wider">SHARDUL.LAB // INSPECTOR</span>
              </div>
              <button
                onClick={() => setInspectorOpen(false)}
                className="text-purple-400 hover:text-white transition-colors"
                title="Minimize Inspector"
              >
                <Minimize2 size={13} />
              </button>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-purple-400">ENGINE_MODE:</span>
                <span className="text-cyan-300 font-bold">REALITY / X-RAY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-400">DIVIDER_RATIO:</span>
                <span className="text-white font-bold">{Math.round(sliderPos)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-400">INSPECTED_NODE:</span>
                <span className="text-amber-400 font-bold truncate max-w-[140px] text-right">
                  {hoveredComponent}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-400">SYNCHRONIZATION:</span>
                <span className="text-emerald-400 font-bold">DUAL_BUFFER_1:1</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Re-open Inspector Floating Button */}
      {!inspectorOpen && (
        <button
          onClick={() => setInspectorOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#141519] border border-cyan-400 text-cyan-300 shadow-xl hover:scale-110 transition-transform"
          title="Open Engineering Inspector HUD"
        >
          <Scan size={16} />
        </button>
      )}
    </section>
  );
}
