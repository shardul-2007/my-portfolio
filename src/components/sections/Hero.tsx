'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  Copy,
  Check,
  MapPin,
  Sparkles,
  Layers,
  Terminal,
  Download,
  FileText,
  Mail,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { assetPath } from '@/lib/basePath';
import { labAudio } from '@/lib/audio';

interface HeroProps {
  onOpenRecruiter: () => void;
  onOpenCommand: () => void;
}

export default function Hero({ onOpenRecruiter, onOpenCommand }: HeroProps) {
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 (all x-ray) to 100 (all reality)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [draftVer, setDraftVer] = useState<number>(7);

  const containerRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time IST clock
  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
      setCurrentTime(timeStr);
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pointer & Drag Tracking Engine
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawPos = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(10, Math.min(90, rawPos));

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
    setIsDragging(false);
    resetTimerRef.current = setTimeout(() => {
      setSliderPos(50);
    }, 2200);
  };

  function handleCopyEmail() {
    labAudio.playClick(1050);
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  }

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex flex-col justify-center pt-20 pb-8 overflow-hidden select-none bg-[var(--paper)]"
    >
      {/* ─── Dual-Layer Comparison Canvas ─── */}
      <div className="section-container relative z-10 w-full flex-1">
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative w-full min-h-[740px] sm:min-h-[800px] rounded-3xl overflow-hidden border border-[var(--border)] shadow-[0_12px_45px_rgba(30,20,32,0.08)] bg-[var(--paper)]"
        >
          {/* ══════════════════════════════════════════════════
              LAYER B: X-RAY / CODE (Underlying Blueprint Layer)
              Exact Parity with Image 2
              ══════════════════════════════════════════════════ */}
          <div className="absolute inset-0 w-full h-full bg-[#fbf5f6] text-[#1e1420] p-6 sm:p-10 flex flex-col justify-between overflow-hidden blueprint-grid">
            {/* Top Telemetry in Code/Blueprint */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs mono text-[#7c3aed]">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebe5ff] border border-[#d8ccff]">
                <span>~/ portfolio git:(<b>main</b>) ✓</span>
                <span className="text-[10px] text-[#7c3aed]/70">pushed on a friday</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebe5ff] border border-[#d8ccff]">
                <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
                <span className="font-bold">open to internships</span>
                <span className="text-[11px] opacity-80">python · web design · AI/ML</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span>PUNE, IN {currentTime}</span>
                <span className="text-[10px] opacity-70">Asia/Kolkata</span>
              </div>
            </div>

            {/* Wireframe Outline Hero Title with Calipers (Image 2) */}
            <div className="relative z-10 my-auto text-center py-4">
              <div className="relative inline-block max-w-full">
                {/* Measurement specs */}
                <div className="absolute -top-6 right-0 mono text-[10px] text-[#7c3aed]">
                  CAP HEIGHT 114PX · X-HEIGHT 86PX
                </div>

                <h1 className="text-[11vw] sm:text-[9vw] font-bold tracking-tight leading-none text-transparent border-t border-b border-[#7c3aed]/30 py-2"
                    style={{ WebkitTextStroke: '1.5px #7c3aed' }}>
                  shardul parihar
                </h1>

                <div className="absolute -bottom-6 left-0 mono text-[10px] text-[#7c3aed]">
                  BASELINE · DESCENDER 24PX
                </div>
              </div>

              {/* Anatomical Skeleton Schematic Graphic with Glowing Heart */}
              <div className="relative max-w-md mx-auto my-6 p-4 border border-dashed border-[#7c3aed]/40 rounded-2xl bg-[#ebe5ff]/40">
                <div className="flex items-center justify-center gap-6">
                  {/* Anatomical Schematic SVG */}
                  <div className="relative w-36 h-48 flex items-center justify-center">
                    <svg viewBox="0 0 100 140" className="w-full h-full text-[#7c3aed] stroke-current fill-none stroke-1">
                      {/* Skull */}
                      <circle cx="50" cy="22" r="14" strokeWidth="1.5" />
                      <circle cx="45" cy="20" r="2" fill="currentColor" />
                      <circle cx="55" cy="20" r="2" fill="currentColor" />
                      <path d="M44 28 Q50 32 56 28" strokeWidth="1.2" />

                      {/* Spine & Ribs */}
                      <line x1="50" y1="36" x2="50" y2="90" strokeWidth="2" strokeDasharray="2 2" />
                      <path d="M36 48 Q50 42 64 48" strokeWidth="1.2" />
                      <path d="M34 58 Q50 52 66 58" strokeWidth="1.2" />
                      <path d="M36 68 Q50 62 64 68" strokeWidth="1.2" />
                      <path d="M40 78 Q50 74 60 78" strokeWidth="1.2" />

                      {/* Arms */}
                      <path d="M36 48 L20 75 L30 100" strokeWidth="1.5" />
                      <path d="M64 48 L80 75 L70 100" strokeWidth="1.5" />

                      {/* Pelvis & Legs */}
                      <path d="M42 90 Q50 96 58 90" strokeWidth="1.8" />
                      <path d="M44 92 L38 135" strokeWidth="1.5" />
                      <path d="M56 92 L62 135" strokeWidth="1.5" />

                      {/* Pulsating Heart */}
                      <circle cx="47" cy="54" r="5" fill="#ff4f9a" className="animate-ping opacity-75" />
                      <circle cx="47" cy="54" r="4" fill="#ff4f9a" />
                    </svg>
                  </div>

                  {/* Anatomical Callouts (Image 2 Parity) */}
                  <div className="text-left mono text-[10px] space-y-2 text-[#7c3aed]">
                    <div>
                      <span className="font-bold uppercase text-[#ff4f9a]">FRONTAL LOBE:</span>
                      <p className="opacity-80">one more hackathon, at 2 a.m.</p>
                    </div>
                    <div>
                      <span className="font-bold uppercase text-[#7c3aed]">OCCIPITAL LOBE:</span>
                      <p className="opacity-80">spots 2px gaps from orbit</p>
                    </div>
                    <div>
                      <span className="font-bold uppercase text-[#7c3aed]">CEREBELLUM:</span>
                      <p className="opacity-80">muscle memory: git commit, ctrl+z</p>
                    </div>
                    <div>
                      <span className="font-bold uppercase text-[#ff4f9a]">HEART:</span>
                      <p className="opacity-80">runs on filter coffee, hackathons &amp; 2 a.m. ideas</p>
                    </div>
                  </div>
                </div>

                {/* Technical Calipers Spec Chips */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#7c3aed]/20 mono text-[9px] text-[#7c3aed]/70">
                  <span>p · Geist 500 · 40/1.02 · -0.045em</span>
                  <span>flex · gap 10px · h 80</span>
                </div>
              </div>
            </div>

            {/* Bottom Yellow Ticker Strip in X-Ray (Image 2) */}
            <div className="relative z-10 w-full bg-[#FFE500] text-[#1e1420] py-2 px-4 rounded-xl mono text-xs font-bold flex flex-wrap items-center justify-between gap-3 shadow-sm border border-black/10">
              <div className="flex items-center gap-3">
                <span>✈ BEEN AROUND</span>
                <span className="opacity-40">|</span>
                <span className="tracking-widest">P C E T &nbsp; N M I E T</span>
                <span className="opacity-40">|</span>
                <span>B.E. Computer Engineering, Pune</span>
              </div>
              <div className="flex items-center gap-2">
                <span>2024–2028</span>
                <span className="px-2 py-0.5 rounded-full bg-black text-white text-[10px]">● IN PROGRESS</span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              LAYER A: REALITY / DESIGN (Finished Master Layer)
              Exact Parity with Image 3 (and Image 1 Halftone effect)
              ══════════════════════════════════════════════════ */}
          <div
            style={{ clipPath: `polygon(0% 0%, ${sliderPos}% 0%, ${sliderPos}% 100%, 0% 100%)` }}
            className="absolute inset-0 w-full h-full bg-[#fbf5f6] text-[#1e1420] p-6 sm:p-10 flex flex-col justify-between overflow-hidden transition-none"
          >
            {/* Top Bar in Reality (Image 3) */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs mono">
              {/* Draft file indicator */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[var(--border)] shadow-sm">
                <span className="text-[var(--text-sub)]"># drafts /</span>
                <button
                  type="button"
                  onClick={() => {
                    labAudio.playClick(950);
                    setDraftVer(v => v + 1);
                  }}
                  className="font-bold text-[#1e1420] hover:text-[#8b5cf6] cursor-pointer"
                >
                  portfolio_final_FINAL_v{draftVer}.fig
                </button>
                <ChevronDown size={11} className="text-[var(--text-sub)]" />
              </div>

              {/* Status pill */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--border)] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#12a150] animate-pulse" />
                <span className="font-bold text-[#1e1420]">open to internships</span>
                <span className="text-[var(--text-sub)] hidden sm:inline">python · web design · AI/ML</span>
              </div>

              {/* Location & Time */}
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-sub)]">
                <span>PUNE, IN</span>
                <span className="font-bold text-[#1e1420]">{currentTime}</span>
              </div>
            </div>

            {/* Main Center Composition (Image 3 & Image 1) */}
            <div className="relative z-10 my-auto text-center py-2">
              {/* Giant Fit-to-Width Headline */}
              <h1 className="text-[11vw] sm:text-[9.2vw] font-bold tracking-tight leading-none text-[#1e1420] select-none">
                shardul parihar
              </h1>

              {/* Center Halftone / Real Photo with Sticky Notes & Speech Bubble */}
              <div className="relative max-w-lg mx-auto mt-4 sm:mt-6 mb-4 flex items-center justify-center">
                {/* Speech Bubble (Image 3) */}
                <div className="absolute -top-6 left-0 sm:-left-4 z-20 max-w-[200px] p-3 rounded-2xl bg-white border border-[var(--border)] shadow-md text-left text-xs font-medium leading-snug">
                  <span>rehearsal at 6, hackathon at 9. i&apos;m fine. totally fine.</span>
                  <div className="text-[10px] text-[var(--text-sub)] mono mt-1">9:41</div>
                </div>

                {/* Client Sticky Note (Image 3) */}
                <div className="absolute top-4 right-0 sm:right-2 z-20 p-2.5 rounded-xl bg-[#ff4f9a] text-white shadow-md text-left text-xs font-bold leading-tight rotate-3">
                  <div className="text-[9px] opacity-80 uppercase mono">client</div>
                  <span>can you make the name bigger?</span>
                </div>

                {/* Central Avatar with Halftone Texture (Image 1 & 3 Parity) */}
                <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-3xl overflow-hidden bg-gradient-to-b from-[#ffe1ef] to-[#ebe5ff] border-2 border-white shadow-xl flex items-center justify-center group">
                  <img
                    src={assetPath('/imageshardul.png')}
                    alt="Shardul Parihar"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Halftone Screen Overlay Layer */}
                  <div className="absolute inset-0 halftone-screen text-[#8b5cf6] opacity-35 mix-blend-multiply pointer-events-none" />
                </div>
              </div>

              {/* Subheading & Witty Copy (Image 3) */}
              <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                {/* Left Side: CS Student Who Performs */}
                <div className="text-left space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1e1420]">
                    CS (AIML) student <br />
                    who <span className="font-serif-italic font-normal text-[#ff4f9a]">performs</span>.
                  </h2>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => labAudio.playClick(1000)}
                      className="flex items-center gap-2 mono text-xs px-4 py-2 rounded-full bg-[#1e1420] text-white hover:bg-black font-bold transition-all shadow-sm"
                    >
                      <span>resume 1 page</span>
                      <Download size={12} />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="flex items-center gap-1.5 mono text-xs px-4 py-2 rounded-full bg-white border border-[var(--border)] text-[#1e1420] hover:bg-[#f4eff1] transition-all cursor-pointer font-medium shadow-sm"
                    >
                      <Copy size={12} />
                      <span>{copied ? 'copied!' : 'copy email'}</span>
                    </button>
                  </div>

                  <p className="mono text-[11px] text-[var(--text-sub)]">
                    or say hi on{' '}
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8b5cf6] underline font-bold"
                    >
                      LinkedIn
                    </a>{' '}
                    · i actually reply
                  </p>
                </div>

                {/* Right Side: Witty Engineering Statement (Image 3) */}
                <div className="text-left md:text-right max-w-xs space-y-2 text-xs text-[var(--text-muted)] font-normal leading-relaxed">
                  <p>
                    i build <b>autonomous AI agents</b>, responsive web platforms, and things with code. lately:
                    <b> CivicOS</b> and <b>AssemblyOS</b> that run, fast.
                  </p>
                  <p className="mono text-[10px] uppercase tracking-wider text-[#1e1420] font-bold pt-2">
                    I DEBUG WITH PRINT(). AND I&apos;M NOT ASHAMED OF IT.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Yellow Bar in Reality (Image 1 Parity) */}
            <div className="relative z-10 w-full bg-[#FFE500] text-[#1e1420] py-2 px-4 rounded-xl mono text-xs font-bold flex flex-wrap items-center justify-between gap-3 shadow-sm border border-black/10">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-black text-white text-[10px]">072 DPI</span>
                <span>that&apos;s an engineer. probably.</span>
              </div>
              <div className="flex items-center gap-2">
                <span>designs 12/12</span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              TACTILE WIPE DIVIDER & DRAG HANDLE
              ══════════════════════════════════════════════════ */}
          <div
            style={{ left: `${sliderPos}%` }}
            className="absolute top-0 bottom-0 w-[2px] bg-[#8b5cf6] z-30 pointer-events-none"
          >
            {/* Grab Handle (Image 2 Parity) */}
            <button
              type="button"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              aria-label="Drag to wipe between Design Reality and Code X-Ray"
              className="absolute top-1/2 -translate-y-1/2 -left-6 w-12 h-12 rounded-full bg-white dark:bg-[#1e1420] border-2 border-[#8b5cf6] text-[#8b5cf6] shadow-[0_8px_24px_rgba(139,92,246,0.35)] flex items-center justify-center mono text-[10px] font-bold cursor-ew-resize pointer-events-auto hover:scale-110 active:scale-95 transition-transform"
            >
              drag
            </button>
          </div>

          {/* Rotating Circular Stamp: Scroll for receipts (Images 2 & 3 Parity) */}
          <div className="absolute bottom-16 right-6 sm:right-10 z-20 pointer-events-none hidden sm:block">
            <div className="relative w-20 h-20 flex items-center justify-center animate-[spin_12s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#1e1420] fill-current">
                <path
                  id="circlePath"
                  d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                  fill="none"
                />
                <text className="mono text-[8.5px] uppercase tracking-[0.18em]">
                  <textPath href="#circlePath" startOffset="0%">
                    * SCROLL FOR RECEIPTS * IT GETS BETTER, PROBABLY.
                  </textPath>
                </text>
              </svg>
            </div>
            <ArrowDown size={14} className="absolute inset-0 m-auto text-[#1e1420] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
