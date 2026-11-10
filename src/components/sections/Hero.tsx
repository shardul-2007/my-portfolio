'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowDown,
  Copy,
  Download,
  ChevronDown,
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
    }, 2400);
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
      className="relative min-h-[90vh] flex flex-col justify-center pt-16 sm:pt-20 pb-16 overflow-hidden select-none bg-[var(--paper)]"
    >
      <div className="section-container relative z-10 w-full flex-1">
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative w-full min-h-[720px] sm:min-h-[780px] md:h-[820px] rounded-3xl overflow-hidden border border-[var(--border)] shadow-[0_12px_45px_rgba(30,20,32,0.08)] bg-[var(--paper)]"
        >
          {/* ══════════════════════════════════════════════════════════════
              LAYER B: X-RAY / CODE (Blueprint Technical View)
              Exact synchronized coordinates with Layer A
              ══════════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 w-full h-full bg-[#fbf5f6] text-[#7c3aed] flex flex-col justify-between p-4 sm:p-8 md:p-10 overflow-hidden blueprint-grid">
            {/* Top Bar (Code / Blueprint) */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs mono">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebe5ff] border border-[#d8ccff]">
                <span>~/ portfolio git:(<b>main</b>) ✓</span>
                <span className="text-[10px] text-[#7c3aed]/70 hidden sm:inline">pushed on a friday</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebe5ff] border border-[#d8ccff]">
                <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
                <span className="font-bold">open to internships</span>
                <span className="text-[11px] opacity-80 hidden md:inline">python · web design · AI/ML</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span>PUNE, IN {currentTime}</span>
                <span className="text-[10px] opacity-70 hidden sm:inline">Asia/Kolkata</span>
              </div>
            </div>

            {/* Synchronized Stage Canvas */}
            <div className="relative flex-1 w-full my-auto flex flex-col justify-between py-4">
              {/* Fit-to-Width Hollow Outlined Headline with Measurement Calipers */}
              <div className="relative text-center pt-1 sm:pt-2">
                <div className="inline-block relative">
                  <div className="absolute -top-4 sm:-top-5 right-0 mono text-[8px] sm:text-[9px] text-[#7c3aed] uppercase font-bold">
                    CAP HEIGHT 114PX · X-HEIGHT 86PX
                  </div>

                  <h1
                    className="text-[clamp(28px,7.2vw,96px)] font-bold tracking-tight leading-none uppercase text-transparent whitespace-nowrap"
                    style={{ WebkitTextStroke: '1.5px #7c3aed' }}
                  >
                    shardul parihar
                  </h1>

                  <div className="absolute -bottom-4 sm:-bottom-5 left-0 mono text-[8px] sm:text-[9px] text-[#7c3aed] uppercase font-bold">
                    BASELINE · DESCENDER 24PX
                  </div>
                </div>
              </div>

              {/* Middle 3-Column Split Stage */}
              <div className="relative flex-1 w-full flex items-center justify-between gap-3 sm:gap-6 mt-4 sm:mt-6">
                {/* Left Wireframe Column */}
                <div className="w-1/2 md:w-[30%] max-w-[280px] z-10 space-y-2 sm:space-y-3">
                  <div className="p-2 sm:p-3 rounded-2xl border border-dashed border-[#7c3aed]/50 bg-[#ebe5ff]/40 space-y-1">
                    <div className="mono text-[8px] sm:text-[9px] text-[#7c3aed] uppercase font-bold">p · Geist 500 · 40/1.02</div>
                    <div className="text-base sm:text-xl md:text-2xl font-bold text-[#7c3aed] leading-snug">
                      CS (AIML) student <br />
                      who <span className="font-serif-italic font-normal text-[#ff4f9a]">performs</span>.
                    </div>
                  </div>

                  <div className="p-2 sm:p-2.5 rounded-xl border border-[#7c3aed]/30 mono text-[9px] sm:text-[10px] text-[#7c3aed] space-y-1">
                    <div className="text-[8px] sm:text-[9px] opacity-70 uppercase font-bold">flex · gap 10px</div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#ebe5ff] font-bold">btn: resume 1 page ↓</span>
                      <span className="px-2 py-0.5 rounded bg-[#ebe5ff]">btn: copy ❐</span>
                    </div>
                  </div>
                </div>

                {/* Center Wireframe Silhouette (Aligned Perfectly with Center Photo!) */}
                <div className="relative w-36 h-48 sm:w-56 sm:h-72 md:w-60 md:h-80 mx-auto flex items-center justify-center">
                  {/* Wireframe Speech Bubble */}
                  <div className="absolute -top-6 -left-2 sm:-left-6 z-20 max-w-[170px] sm:max-w-[200px] p-2 sm:p-2.5 rounded-2xl border border-dashed border-[#7c3aed] bg-[#ebe5ff] text-[#7c3aed] mono text-left text-[11px] sm:text-xs leading-snug shadow-sm">
                    <div className="text-[8px] sm:text-[9px] opacity-70 uppercase font-bold">chat bubble · back.out(1.7)</div>
                    <span className="font-sans">selfie taken mid-debug. the bug won.</span>
                    <div className="text-[9px] sm:text-[10px] opacity-70 mt-0.5 sm:mt-1">9:41</div>
                  </div>

                  <div className="relative w-full h-full rounded-3xl border-2 border-dashed border-[#7c3aed] bg-[#ebe5ff]/50 flex items-center justify-center p-3">
                    <svg viewBox="0 0 100 130" className="w-full h-full text-[#7c3aed] stroke-current fill-none stroke-1">
                      {/* Skull */}
                      <circle cx="50" cy="22" r="14" strokeWidth="1.5" />
                      <circle cx="45" cy="20" r="2" fill="currentColor" />
                      <circle cx="55" cy="20" r="2" fill="currentColor" />
                      <path d="M44 28 Q50 32 56 28" strokeWidth="1.2" />

                      {/* Spine & Ribs */}
                      <line x1="50" y1="36" x2="50" y2="85" strokeWidth="2" strokeDasharray="2 2" />
                      <path d="M36 48 Q50 42 64 48" strokeWidth="1.2" />
                      <path d="M34 58 Q50 52 66 58" strokeWidth="1.2" />
                      <path d="M36 68 Q50 62 64 68" strokeWidth="1.2" />

                      {/* Arms */}
                      <path d="M36 48 L22 75 L30 95" strokeWidth="1.5" />
                      <path d="M64 48 L78 75 L70 95" strokeWidth="1.5" />

                      {/* Pelvis & Legs */}
                      <path d="M42 85 Q50 92 58 85" strokeWidth="1.8" />
                      <path d="M44 88 L38 125" strokeWidth="1.5" />
                      <path d="M56 88 L62 125" strokeWidth="1.5" />

                      {/* Pulsating Heart */}
                      <circle cx="47" cy="54" r="5" fill="#ff4f9a" className="animate-ping opacity-75" />
                      <circle cx="47" cy="54" r="4" fill="#ff4f9a" />
                    </svg>

                    {/* Spec tags over skeleton */}
                    <div className="absolute top-2 right-2 mono text-[8px] bg-white/90 px-1.5 py-0.5 rounded text-[#7c3aed] font-bold">
                      FRONTAL LOBE
                    </div>
                    <div className="absolute bottom-2 left-2 mono text-[8px] bg-white/90 px-1.5 py-0.5 rounded text-[#ff4f9a] font-bold">
                      HEART: 2 AM
                    </div>
                  </div>
                </div>

                {/* Right Wireframe Column */}
                <div className="hidden md:block md:w-[30%] max-w-[280px] z-10 text-right space-y-2">
                  <div className="p-3 rounded-2xl border border-dashed border-[#7c3aed]/50 bg-[#ebe5ff]/40 space-y-1">
                    <div className="mono text-[9px] text-[#7c3aed] uppercase font-bold">p · Geist 400 · 19/1.58</div>
                    <p className="text-xs text-[#7c3aed] leading-relaxed">
                      i build autonomous AI agents, responsive web platforms, and things with code. lately: CivicOS and AssemblyOS.
                    </p>
                  </div>

                  <div className="mono text-[9px] bg-[#ebe5ff] p-2 rounded-xl text-[#7c3aed] font-bold uppercase text-right">
                    I DEBUG WITH PRINT(). AND I&apos;M NOT ASHAMED OF IT.
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Yellow Ticker Strip in X-Ray */}
            <div className="relative z-10 w-full bg-[#FFE500] text-[#1e1420] py-2 px-3 sm:px-4 rounded-xl mono text-[11px] sm:text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-sm border border-black/10">
              <div className="flex items-center gap-2 sm:gap-3">
                <span>✈ BEEN AROUND</span>
                <span className="opacity-40">|</span>
                <span className="tracking-widest">P C E T &nbsp; N M I E T</span>
                <span className="opacity-40 hidden sm:inline">|</span>
                <span className="hidden sm:inline">B.E. Computer Engineering, Pune</span>
              </div>
              <div className="flex items-center gap-2">
                <span>2024–2028</span>
                <span className="px-2 py-0.5 rounded-full bg-black text-white text-[10px]">● IN PROGRESS</span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              LAYER A: REALITY / DESIGN (Finished Master Layer)
              Clipped dynamically by the draggable divider line
              ══════════════════════════════════════════════════════════════ */}
          <div
            style={{ clipPath: `polygon(0% 0%, ${sliderPos}% 0%, ${sliderPos}% 100%, 0% 100%)` }}
            className="absolute inset-0 w-full h-full bg-[#fbf5f6] text-[#1e1420] flex flex-col justify-between p-4 sm:p-8 md:p-10 overflow-hidden transition-none"
          >
            {/* Top Bar (Reality / Design) */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs mono">
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

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--border)] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#12a150] animate-pulse" />
                <span className="font-bold text-[#1e1420]">open to internships</span>
                <span className="text-[var(--text-sub)] hidden md:inline">python · web design · AI/ML</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-sub)]">
                <span>PUNE, IN</span>
                <span className="font-bold text-[#1e1420]">{currentTime}</span>
              </div>
            </div>

            {/* Synchronized Stage Canvas */}
            <div className="relative flex-1 w-full my-auto flex flex-col justify-between py-4">
              {/* Fit-to-Width Solid Headline */}
              <div className="relative text-center pt-1 sm:pt-2">
                <div className="inline-block relative">
                  {/* Playful client comment cursor badge from Rishika's Image 3 */}
                  <div className="absolute -top-3 left-[28%] sm:left-[32%] z-20 hidden sm:flex items-center gap-1 bg-[#ff4f9a] text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md animate-bounce">
                    <span className="text-[8px]">client:</span>
                    <span>can you make the name bigger?</span>
                  </div>

                  <h1 className="text-[clamp(28px,7.2vw,96px)] font-bold tracking-tight leading-none uppercase text-[#1e1420] whitespace-nowrap">
                    shardul parihar
                  </h1>
                </div>
              </div>

              {/* Middle 3-Column Split Stage */}
              <div className="relative flex-1 w-full flex items-center justify-between gap-3 sm:gap-6 mt-4 sm:mt-6">
                {/* Left Reality Column */}
                <div className="w-1/2 md:w-[30%] max-w-[280px] z-10 space-y-2 sm:space-y-3">
                  <h2 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-[#1e1420] leading-snug">
                    CS (AIML) student <br />
                    who <span className="font-serif-italic font-normal text-[#ff4f9a]">performs</span>.
                  </h2>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => labAudio.playClick(1000)}
                      className="flex items-center gap-1.5 mono text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full bg-[#1e1420] text-white hover:bg-black font-bold transition-all shadow-sm"
                    >
                      <span>resume 1 page</span>
                      <Download size={11} />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="flex items-center gap-1.5 mono text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full bg-white border border-[var(--border)] text-[#1e1420] hover:bg-[#f4eff1] transition-all cursor-pointer font-medium shadow-sm"
                    >
                      <Copy size={11} />
                      <span>{copied ? 'copied!' : 'copy email'}</span>
                    </button>
                  </div>

                  <p className="mono text-[10px] sm:text-[11px] text-[var(--text-sub)]">
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

                {/* Center Photo (Aligned Exactly at Same Coordinates as Skeleton Silhouette!) */}
                <div className="relative w-36 h-48 sm:w-56 sm:h-72 md:w-60 md:h-80 mx-auto flex items-center justify-center">
                  {/* Speech Bubble */}
                  <div className="absolute -top-6 -left-2 sm:-left-6 z-20 max-w-[170px] sm:max-w-[200px] p-2 sm:p-2.5 rounded-2xl bg-white border border-[var(--border)] shadow-md text-left text-[11px] sm:text-xs font-medium leading-snug">
                    <span>rehearsal at 6, hackathon at 9. i&apos;m fine. totally fine.</span>
                    <div className="text-[9px] sm:text-[10px] text-[var(--text-sub)] mono mt-0.5 sm:mt-1">9:41</div>
                  </div>

                  {/* Cutout Photo */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#ffe1ef] to-[#ebe5ff] border-2 border-white shadow-xl flex items-center justify-center">
                    <img
                      src={assetPath('/imageshardul.png')}
                      alt="Shardul Parihar"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 halftone-screen text-[#8b5cf6] opacity-35 mix-blend-multiply pointer-events-none" />
                  </div>
                </div>

                {/* Right Reality Column */}
                <div className="hidden md:block md:w-[30%] max-w-[280px] z-10 text-right space-y-3">
                  <p className="text-xs text-[var(--text-muted)] font-normal leading-relaxed">
                    i build <b>autonomous AI agents</b>, responsive web platforms, and things with code. lately:
                    <b> CivicOS</b> and <b>AssemblyOS</b> that run, fast.
                  </p>

                  <p className="mono text-[10px] uppercase tracking-wider text-[#1e1420] font-bold">
                    I DEBUG WITH PRINT(). AND I&apos;M NOT ASHAMED OF IT.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Yellow Bar in Reality */}
            <div className="relative z-10 w-full bg-[#FFE500] text-[#1e1420] py-2 px-3 sm:px-4 rounded-xl mono text-[11px] sm:text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-sm border border-black/10">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-2 py-0.5 rounded bg-black text-white text-[10px]">072 DPI</span>
                <span>that&apos;s an engineer. probably.</span>
              </div>
              <div className="flex items-center gap-2">
                <span>designs 12/12</span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              TACTILE WIPE DIVIDER & DRAG HANDLE
              ══════════════════════════════════════════════════════════════ */}
          <div
            style={{ left: `${sliderPos}%` }}
            className="absolute top-0 bottom-0 w-[2px] bg-[#8b5cf6] z-30 pointer-events-none"
          >
            <button
              type="button"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              aria-label="Drag to wipe between Design Reality and Code X-Ray"
              className="absolute top-1/2 -translate-y-1/2 -left-6 w-12 h-12 rounded-full bg-white border-2 border-[#8b5cf6] text-[#8b5cf6] shadow-[0_8px_24px_rgba(139,92,246,0.35)] flex items-center justify-center mono text-[10px] font-bold cursor-ew-resize pointer-events-auto hover:scale-110 active:scale-95 transition-transform"
            >
              drag
            </button>
          </div>

          {/* Rotating Circular Stamp */}
          <div className="absolute bottom-16 right-6 sm:right-10 z-20 pointer-events-none hidden sm:block">
            <div className="relative w-16 h-16 flex items-center justify-center animate-[spin_12s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#1e1420] fill-current">
                <path
                  id="heroCirclePath"
                  d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                  fill="none"
                />
                <text className="mono text-[8px] uppercase tracking-[0.16em]">
                  <textPath href="#heroCirclePath" startOffset="0%">
                    * SCROLL FOR RECEIPTS * IT GETS BETTER *
                  </textPath>
                </text>
              </svg>
            </div>
            <ArrowDown size={13} className="absolute inset-0 m-auto text-[#1e1420] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
