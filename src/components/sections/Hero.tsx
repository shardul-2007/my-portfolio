'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Mail,
  ChevronDown,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  FolderGit2,
  Users,
  Compass,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { assetPath } from '@/lib/basePath';
import { labAudio } from '@/lib/audio';

interface HeroProps {
  onOpenRecruiter: () => void;
  onOpenCommand: () => void;
}

interface ConstellationNode {
  id: string;
  label: string;
  category: 'PROJECT' | 'TECH' | 'CONTRIBUTION' | 'COMMUNITY';
  tag: string;
  detail: string;
  target?: string;
  color: string;
}

const CONSTELLATION_NODES: ConstellationNode[] = [
  { id: 'civicos', label: 'CivicOS', category: 'PROJECT', tag: 'Web3 & Governance', detail: 'Decentralized civic governance & transparency protocol', target: '#projects', color: '#D9363E' },
  { id: 'assemblyos', label: 'AssemblyOS', category: 'PROJECT', tag: 'Simulated CPU', detail: '8-bit educational CPU simulator with live register visualizer', target: '#projects', color: '#EF493F' },
  { id: 'skillcert', label: 'SkillCert', category: 'PROJECT', tag: 'Credentials Engine', detail: 'Cryptographic skills verification & proof issuance', target: '#projects', color: '#A91F2C' },
  { id: 'shardulos', label: 'SHARDUL.OS', category: 'PROJECT', tag: 'Interactive Universe', detail: 'Award-grade interactive engineering universe', target: '#hero', color: '#D9363E' },
  { id: 'fullstack', label: 'Full Stack', category: 'TECH', tag: 'MERN & Next.js', detail: 'Production architectures, server actions & real-time sockets', target: '#skills', color: '#171416' },
  { id: 'java', label: 'Java', category: 'TECH', tag: 'OOP & Systems', detail: 'Object-oriented architecture & algorithmic problem solving', target: '#skills', color: '#711C27' },
  { id: 'typescript', label: 'TypeScript', category: 'TECH', tag: 'Type-Safe Web', detail: 'Strict static typing & resilient frontend systems', target: '#skills', color: '#3178C6' },
  { id: 'python', label: 'Python', category: 'TECH', tag: 'AI & Scripting', detail: 'Data manipulation, automation & neural APIs', target: '#skills', color: '#4B8BBE' },
  { id: 'dsa', label: 'DSA & Algorithms', category: 'TECH', tag: 'Problem Solving', detail: 'Competitive programming & algorithmic efficiency', target: '#skills', color: '#10B981' },
  { id: 'osci', label: 'OSCI 2026', category: 'CONTRIBUTION', tag: 'Open Source', detail: 'Open Source Connect India active contributor badge', target: '#contributions', color: '#FF6B1A' },
  { id: 'gssoc', label: 'GSSoC 2026', category: 'CONTRIBUTION', tag: 'Open Source', detail: 'GirlScript Summer of Code official contributor rosette', target: '#contributions', color: '#3B82F6' },
  { id: 'nsoc', label: 'NSoC 2026', category: 'CONTRIBUTION', tag: 'Open Source', detail: 'Nexus Spring of Code tech contributor medallion', target: '#contributions', color: '#10B981' },
  { id: 'google', label: 'Google SA', category: 'COMMUNITY', tag: 'Gemini Ambassador', detail: 'Selected Google Student Ambassador for campus outreach', target: '#engagements', color: '#4285F4' },
  { id: 'hackerrank', label: 'HackerRank', category: 'COMMUNITY', tag: 'Campus Crew', detail: 'PCET NMIET campus crew lead & contest facilitator', target: '#engagements', color: '#10B981' },
  { id: 'mygov', label: 'MyGov India', category: 'COMMUNITY', tag: 'Level 5 Change Maker', detail: '102,020 points for digital civic engagement', target: '#engagements', color: '#F59E0B' },
  { id: 'guesss', label: 'GUESSS India', category: 'COMMUNITY', tag: 'CA-419 Ambassador', detail: 'REVA University entrepreneurship survey outreach', target: '#engagements', color: '#8B5CF6' },
];

export default function Hero({ onOpenRecruiter, onOpenCommand }: HeroProps) {
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 (all systems) to 100 (all reality)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mobileMode, setMobileMode] = useState<'reality' | 'systems'>('reality');
  const [activeNode, setActiveNode] = useState<ConstellationNode | null>(null);

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
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawPos = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(10, Math.min(90, rawPos));
    setSliderPos(clamped);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    labAudio.playClick(900);
  };

  useEffect(() => {
    const handleGlobalPointerUp = () => setIsDragging(false);
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        updatePosition(e.clientX);
      }
    };
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointermove', handleGlobalPointerMove);
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointermove', handleGlobalPointerMove);
    };
  }, [isDragging, updatePosition]);

  const handlePointerLeave = () => {
    if (isDragging) return;
    resetTimerRef.current = setTimeout(() => {
      setSliderPos(50);
    }, 3000);
  };

  function handleCopyEmail() {
    labAudio.playClick(1050);
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  }

  function handleNodeClick(node: ConstellationNode) {
    labAudio.playClick(950);
    setActiveNode(node);
    if (node.target) {
      const targetEl = document.querySelector(node.target);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // Active split percentage used across desktop & mobile
  const activeSplit = typeof window !== 'undefined' && window.innerWidth < 768
    ? (mobileMode === 'reality' ? 100 : 0)
    : sliderPos;

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-16 sm:pt-20 pb-16 overflow-hidden select-none bg-[#F8F5F1]"
    >
      <div className="section-container relative z-10 w-full flex-1">
        {/* Mobile View Toggle (Accessible Buttons for Touch Viewports) */}
        <div className="flex md:hidden items-center justify-between mb-3 px-1">
          <div className="mono text-[10px] text-[var(--text-sub)] font-bold">
            VIEWPORT: {mobileMode.toUpperCase()}
          </div>
          <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[var(--border)] shadow-sm mono text-[10px]">
            <button
              type="button"
              onClick={() => {
                labAudio.playClick(900);
                setMobileMode('reality');
              }}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                mobileMode === 'reality'
                  ? 'bg-[#171416] text-white'
                  : 'text-[#171416]'
              }`}
            >
              HUMAN
            </button>
            <button
              type="button"
              onClick={() => {
                labAudio.playClick(950);
                setMobileMode('systems');
              }}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                mobileMode === 'systems'
                  ? 'bg-[#D9363E] text-white'
                  : 'text-[#171416]'
              }`}
            >
              ENGINEERING
            </button>
          </div>
        </div>

        {/* Master Asymmetric Canvas with 50/50 Dual Synchronized Systems */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative w-full min-h-[760px] sm:min-h-[800px] md:h-[840px] rounded-3xl overflow-hidden border border-[#E7DEDA] shadow-[0_16px_50px_rgba(23,20,22,0.08)] bg-[#F8F5F1]"
        >
          {/* ══════════════════════════════════════════════════════════════
              LAYER B: ENGINEERING / SYSTEMS (Right Reveal)
              The same original portrait, surrounded by technical calipers,
              precision guides, active metadata, and the constellation.
              ══════════════════════════════════════════════════════════════ */}
          <div
            style={{ clipPath: `polygon(${activeSplit}% 0%, 100% 0%, 100% 100%, ${activeSplit}% 100%)` }}
            className="absolute inset-0 w-full h-full bg-[#F1ECE8] text-[#171416] flex flex-col justify-between p-4 sm:p-8 md:p-10 overflow-hidden blueprint-grid transition-none"
          >
            {/* Top Bar (Engineering / Systems) */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs mono">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF6F6] border border-[#F2D2D4] text-[#D9363E]">
                <span>SHARDUL.LAB // ARCHITECTURE · ~/ git:(<b>main</b>)</span>
                <span className="text-[10px] text-[#A91F2C] hidden sm:inline">SYS_VER: 9.0</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF6F6] border border-[#F2D2D4]">
                <span className="w-2 h-2 rounded-full bg-[#D9363E] animate-pulse" />
                <span className="font-bold text-[#D9363E]">ENGINEERING STACK ACTIVE</span>
                <span className="text-[11px] text-[#711C27] hidden md:inline">INFORMATION TECHNOLOGY</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#81777A]">
                <span>PUNE, IN {currentTime}</span>
                <span className="text-[10px] opacity-70 hidden sm:inline">COORD: 18.5204° N, 73.8567° E</span>
              </div>
            </div>

            {/* Synchronized Stage Canvas */}
            <div className="relative flex-1 w-full my-auto flex flex-col justify-between py-2 sm:py-4">
              {/* Fit-to-Width Hollow Outlined Headline with Measurement Calipers */}
              <div className="relative text-center pt-2 sm:pt-4">
                <div className="inline-block relative">
                  <div className="absolute -top-4 sm:-top-5 right-0 mono text-[8px] sm:text-[9px] text-[#D9363E] uppercase font-bold tracking-wider">
                    MODULE: HERO_ARCHITECTURE · GRID_UNIT: 8PX · HYDRATED
                  </div>

                  <h1
                    className="text-[clamp(28px,7.2vw,96px)] font-bold tracking-tight leading-none uppercase text-transparent whitespace-nowrap"
                    style={{ WebkitTextStroke: '1.5px #D9363E' }}
                  >
                    shardul.parihar
                  </h1>

                  <div className="absolute -bottom-4 sm:-bottom-5 left-0 mono text-[8px] sm:text-[9px] text-[#D9363E] uppercase font-bold tracking-wider">
                    SYSTEMS ARCHITECTURE · RED ENGINEERING MATRIX
                  </div>
                </div>
              </div>

              {/* Middle 3-Column Split Stage */}
              <div className="relative flex-1 w-full flex items-center justify-between gap-3 sm:gap-6 mt-4 sm:mt-6">
                {/* Left Systems Diagnostic Column */}
                <div className="w-1/2 md:w-[32%] max-w-[320px] z-10 space-y-2 sm:space-y-3">
                  <div className="p-3 sm:p-3.5 rounded-2xl border border-dashed border-[#D9363E]/60 bg-[#FDF6F6]/90 space-y-2">
                    <div className="flex items-center justify-between text-[9px] mono uppercase font-bold text-[#D9363E]">
                      <span>&lt;SystemProfile /&gt;</span>
                      <span className="text-[8px] bg-[#D9363E]/10 px-1.5 py-0.5 rounded text-[#D9363E]">
                        VERIFIED 100%
                      </span>
                    </div>

                    <div className="mono text-[10px] sm:text-[11px] text-[#A91F2C] space-y-1">
                      <div className="flex justify-between border-b border-[#D9363E]/20 pb-0.5">
                        <span className="text-[#81777A]">academics:</span>
                        <span className="font-bold">Information Technology</span>
                      </div>
                      <div className="flex justify-between border-b border-[#D9363E]/20 pb-0.5">
                        <span className="text-[#81777A]">campus:</span>
                        <span className="font-bold">PCET NMIET Pune</span>
                      </div>
                      <div className="flex justify-between border-b border-[#D9363E]/20 pb-0.5">
                        <span className="text-[#81777A]">focus:</span>
                        <span className="font-bold">Full-Stack · AI · Systems</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#81777A]">status:</span>
                        <span className="font-bold text-[#10B981]">Open to Internships</span>
                      </div>
                    </div>
                  </div>

                  {/* Systems Hooks */}
                  <div className="p-2 sm:p-2.5 rounded-xl border border-[#D9363E]/40 bg-[#FDF6F6]/80 mono text-[9px] sm:text-[10px] text-[#D9363E] space-y-1">
                    <div className="text-[8px] opacity-70 uppercase font-bold">SYSTEM ANNOTATIONS</div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-white border border-[#F2D2D4]">DOM: 64 nodes</span>
                      <span className="px-2 py-0.5 rounded bg-white border border-[#F2D2D4]">LATENCY: &lt;16ms</span>
                      <span className="px-2 py-0.5 rounded bg-white border border-[#F2D2D4]">60 FPS</span>
                    </div>
                  </div>
                </div>

                {/* Center Real Portrait with Engineering Calipers Framing */}
                <div className="relative w-44 h-60 sm:w-60 sm:h-80 md:w-68 md:h-92 mx-auto flex items-center justify-center">
                  {/* Caliper Dimensions Annotation — Top Right */}
                  <div className="absolute -top-7 -right-2 sm:-right-4 z-20 max-w-[190px] sm:max-w-[220px] p-2 sm:p-2.5 rounded-2xl bg-[#FDF6F6] border border-dashed border-[#D9363E] shadow-sm text-left mono text-[9px] sm:text-[10px] text-[#D9363E] leading-snug">
                    <div className="flex items-center gap-1 font-bold text-[#A91F2C] uppercase">
                      <Cpu size={11} />
                      <span>OPTICAL SENSOR // 50MM</span>
                    </div>
                    <div className="text-[8px] text-[#81777A] mt-0.5">
                      FRAME: 280×360 · ASPECT: 3:4 · PUNE
                    </div>
                  </div>

                  {/* Clean Natural Photograph with Engineering Technical Bounding Frame */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#F7EBEB] to-[#F1ECE8] border-2 border-[#D9363E] shadow-xl flex items-center justify-center">
                    <img
                      src={assetPath('/imageshardul.png')}
                      alt="Shardul Parihar — Software Engineer"
                      className="w-full h-full object-cover object-top filter contrast-[1.03]"
                    />
                    {/* Architectural Grid Tint around image */}
                    <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

                    {/* Corner Caliper Reticle Accents */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D9363E] pointer-events-none" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D9363E] pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D9363E] pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D9363E] pointer-events-none" />
                  </div>

                  {/* Coordinate Tag Underneath */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 px-2.5 py-0.5 rounded-full bg-white border border-[#D9363E]/40 mono text-[8px] text-[#D9363E] font-bold shadow-xs whitespace-nowrap">
                    IDENTIFIER: SHARDUL_PARIHAR · AUTH: VERIFIED
                  </div>
                </div>

                {/* Right Interactive Constellation Grid (Systems) */}
                <div className="hidden md:block md:w-[32%] max-w-[320px] z-10 text-right space-y-2">
                  <div className="p-3 rounded-2xl border border-dashed border-[#D9363E]/50 bg-[#FDF6F6]/80 space-y-1.5">
                    <div className="mono text-[9px] text-[#D9363E] uppercase font-bold flex items-center justify-between">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9363E] animate-pulse" />
                      <span>ENGINEERING CONSTELLATION</span>
                    </div>

                    <div className="flex flex-wrap justify-end gap-1.5 pt-1">
                      {CONSTELLATION_NODES.slice(0, 8).map(node => (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => handleNodeClick(node)}
                          className="px-2 py-0.5 rounded-md bg-white border border-[#F2D2D4] text-[10px] mono font-bold text-[#171416] hover:bg-[#D9363E] hover:text-white transition-all cursor-pointer"
                        >
                          {node.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mono text-[9px] bg-[#FDF6F6] p-2.5 rounded-xl text-[#711C27] font-bold uppercase text-right border border-[#F2D2D4]">
                    CLICK ANY NODE TO INSPECT OR NAVIGATE
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Yellow Ticker Strip in Systems */}
            <div className="relative z-10 w-full bg-[#FFE500] text-[#171416] py-2 px-3 sm:px-4 rounded-xl mono text-[11px] sm:text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-sm border border-black/10">
              <div className="flex items-center gap-2 sm:gap-3">
                <span>✈ ACADEMIC CONTINUUM</span>
                <span className="opacity-40">|</span>
                <span className="tracking-widest">P C E T &nbsp; N M I E T</span>
                <span className="opacity-40 hidden sm:inline">|</span>
                <span className="hidden sm:inline">Information Technology, Pune</span>
              </div>
              <div className="flex items-center gap-2">
                <span>2024–2028</span>
                <span className="px-2 py-0.5 rounded-full bg-black text-white text-[10px]">● IN PROGRESS</span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              LAYER A: HUMAN / REALITY (Left Reveal)
              The same original natural portrait in an editorial art-directed
              frame, warm ivory aesthetic, and clean typography.
              ══════════════════════════════════════════════════════════════ */}
          <div
            style={{ clipPath: `polygon(0% 0%, ${activeSplit}% 0%, ${activeSplit}% 100%, 0% 100%)` }}
            className="absolute inset-0 w-full h-full bg-[#F8F5F1] text-[#171416] flex flex-col justify-between p-4 sm:p-8 md:p-10 overflow-hidden transition-none"
          >
            {/* Top Bar (Human / Reality) */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs mono">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[var(--border)] shadow-sm">
                <span className="text-[var(--text-sub)]"># identity /</span>
                <span className="font-bold text-[#171416]">SHARDUL.LAB</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9363E]" />
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--border)] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#12a150] animate-pulse" />
                <span className="font-bold text-[#171416]">AVAILABLE FOR WORK</span>
                <span className="text-[var(--text-sub)] hidden md:inline">Information Technology</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-sub)]">
                <span>PUNE, INDIA</span>
                <span className="font-bold text-[#171416]">{currentTime}</span>
              </div>
            </div>

            {/* Synchronized Stage Canvas */}
            <div className="relative flex-1 w-full my-auto flex flex-col justify-between py-2 sm:py-4">
              {/* Fit-to-Width Solid Headline */}
              <div className="relative text-center pt-2 sm:pt-4">
                <div className="inline-block relative">
                  {/* Floating Identity Annotation */}
                  <div className="absolute -top-3 left-[26%] sm:left-[30%] z-20 hidden sm:flex items-center gap-1 bg-[#D9363E] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                    <span>ALWAYS LEARNING</span>
                  </div>

                  <h1 className="text-[clamp(28px,7.2vw,96px)] font-bold tracking-tight leading-none uppercase text-[#171416] whitespace-nowrap">
                    shardul.parihar
                  </h1>
                </div>
              </div>

              {/* Middle 3-Column Split Stage */}
              <div className="relative flex-1 w-full flex items-center justify-between gap-3 sm:gap-6 mt-4 sm:mt-6">
                {/* Left Reality Column */}
                <div className="w-1/2 md:w-[32%] max-w-[320px] z-10 space-y-2 sm:space-y-3">
                  <div>
                    <div className="mono text-[10px] uppercase font-bold text-[#D9363E] tracking-wider mb-1">
                      Information Technology Student
                    </div>
                    <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#171416] leading-tight">
                      Software Engineer · Builder · AI Enthusiast
                    </h2>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] font-normal leading-relaxed">
                    &ldquo;Building useful digital products through engineering, experimentation and continuous learning.&rdquo;
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
                    <a
                      href="#projects"
                      onClick={() => labAudio.playClick(900)}
                      className="flex items-center gap-1 mono text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full bg-[#D9363E] text-white hover:bg-[#A91F2C] font-bold transition-all shadow-sm"
                    >
                      <span>EXPLORE PROJECTS</span>
                    </a>

                    <a
                      href="#contact"
                      onClick={() => labAudio.playClick(950)}
                      className="flex items-center gap-1 mono text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full bg-white border border-[var(--border)] text-[#171416] hover:border-[#D9363E] hover:text-[#D9363E] transition-all cursor-pointer font-medium shadow-sm"
                    >
                      <span>LET&apos;S CONNECT</span>
                    </a>

                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => labAudio.playClick(1000)}
                      className="flex items-center gap-1 mono text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full bg-[#171416] text-white hover:bg-black font-bold transition-all shadow-sm"
                    >
                      <Download size={11} />
                      <span className="hidden sm:inline">RESUME</span>
                    </a>
                  </div>

                  {/* Social Quick Links */}
                  <div className="flex items-center gap-3 pt-1 mono text-[11px] text-[var(--text-sub)]">
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#171416] hover:text-[#D9363E] font-bold flex items-center gap-0.5"
                    >
                      LINKEDIN <ArrowUpRight size={11} />
                    </a>
                    <span>·</span>
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#171416] hover:text-[#D9363E] font-bold flex items-center gap-0.5"
                    >
                      GITHUB <ArrowUpRight size={11} />
                    </a>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="text-[#171416] hover:text-[#D9363E] font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      {copied ? 'COPIED!' : 'EMAIL'} <ArrowUpRight size={11} />
                    </button>
                  </div>
                </div>

                {/* Center Real Portrait with Editorial Framing */}
                <div className="relative w-44 h-60 sm:w-60 sm:h-80 md:w-68 md:h-92 mx-auto flex items-center justify-center">
                  {/* Floating Annotation Pill — Top Right */}
                  <div className="absolute -top-7 -right-2 sm:-right-4 z-20 max-w-[190px] sm:max-w-[220px] p-2 sm:p-2.5 rounded-2xl bg-white border border-[var(--border)] shadow-md text-left text-[10px] sm:text-[11px] font-medium leading-snug">
                    <span className="text-[#D9363E] font-bold">CURRENTLY BUILDING DIGITAL PRODUCTS</span>
                    <div className="text-[9px] text-[var(--text-sub)] mono mt-0.5">Pune, India.</div>
                  </div>

                  {/* Clean Natural Photograph with Editorial Border & Soft Natural Shadow */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#F7EBEB] to-[#F1ECE8] border-2 border-white shadow-xl flex items-center justify-center">
                    <img
                      src={assetPath('/imageshardul.png')}
                      alt="Shardul Parihar — Real Portrait"
                      className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.03]"
                    />
                    <div className="absolute inset-0 halftone-screen text-[#D9363E] opacity-15 mix-blend-multiply pointer-events-none" />
                  </div>

                  {/* Bottom Editorial Pill */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 rounded-full bg-white border border-[var(--border)] shadow-sm mono text-[9px] text-[#171416] font-semibold whitespace-nowrap">
                    PUNE, MAHARASHTRA · PCET NMIET
                  </div>
                </div>

                {/* Right Reality Constellation / Highlights */}
                <div className="hidden md:block md:w-[32%] max-w-[320px] z-10 text-right space-y-3">
                  <div className="space-y-1.5">
                    <div className="mono text-[10px] uppercase font-bold text-[#D9363E] tracking-wider flex items-center justify-end gap-1.5">
                      <Sparkles size={11} />
                      <span>FEATURED ECOSYSTEM</span>
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {CONSTELLATION_NODES.slice(0, 8).map(node => (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => handleNodeClick(node)}
                          className="px-2.5 py-1 rounded-full bg-white border border-[var(--border)] text-[11px] font-semibold text-[#171416] shadow-xs hover:border-[#D9363E] hover:text-[#D9363E] transition-all cursor-pointer"
                        >
                          {node.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="mono text-[10px] uppercase tracking-wider text-[#711C27] font-bold pt-2">
                    CURIOUS BY NATURE · ENGINEERING BY PRACTICE
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Yellow Bar in Reality */}
            <div className="relative z-10 w-full bg-[#FFE500] text-[#171416] py-2 px-3 sm:px-4 rounded-xl mono text-[11px] sm:text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-sm border border-black/10">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-2 py-0.5 rounded bg-black text-white text-[10px]">072 DPI</span>
                <span>that&apos;s an engineer. probably.</span>
                <span className="opacity-40 hidden sm:inline">|</span>
                <span className="hidden sm:inline">BUILDING IN PUBLIC</span>
              </div>
              <div className="flex items-center gap-2">
                <span>PUNE, INDIA</span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              TACTILE WIPE DIVIDER & DRAG HANDLE (Red Engineering Accent)
              Smooth cursor reveal between Reality and Systems
              ══════════════════════════════════════════════════════════════ */}
          <div
            style={{ left: `${activeSplit}%` }}
            className="absolute top-0 bottom-0 w-[2px] bg-[#D9363E] z-30 pointer-events-none hidden md:block"
          >
            <button
              type="button"
              onPointerDown={handlePointerDown}
              aria-label="Drag to reveal Reality and Systems"
              className="absolute top-1/2 -translate-y-1/2 -left-6 w-12 h-12 rounded-full bg-white border-2 border-[#D9363E] text-[#D9363E] shadow-[0_8px_24px_rgba(217,54,62,0.35)] flex items-center justify-center mono text-[10px] font-bold cursor-ew-resize pointer-events-auto hover:scale-110 active:scale-95 transition-transform"
            >
              drag
            </button>
          </div>

          {/* Active Constellation Node Inspector Modal / Toast */}
          <AnimatePresence>
            {activeNode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-16 left-6 sm:left-10 z-40 bg-white/95 backdrop-blur-md border border-[#D9363E]/40 rounded-2xl p-4 shadow-xl max-w-xs text-left select-text"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="mono text-[9px] uppercase font-bold text-[#D9363E] bg-[#FDF6F6] px-2 py-0.5 rounded border border-[#F2D2D4]">
                    {activeNode.category} · {activeNode.tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveNode(null)}
                    className="w-5 h-5 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center mono text-[10px]"
                  >
                    ✕
                  </button>
                </div>
                <h4 className="text-sm font-bold text-[#171416]">{activeNode.label}</h4>
                <p className="text-xs text-[var(--text-muted)] mt-1">{activeNode.detail}</p>
                {activeNode.target && (
                  <a
                    href={activeNode.target}
                    className="mono text-[10px] text-[#D9363E] font-bold flex items-center gap-1 mt-2 hover:underline"
                  >
                    Navigate to section <ArrowUpRight size={11} />
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rotating Circular Stamp */}
          <div className="absolute bottom-16 right-6 sm:right-10 z-20 pointer-events-none hidden sm:block">
            <div className="relative w-16 h-16 flex items-center justify-center animate-[spin_12s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#171416] fill-current">
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
            <ArrowDown size={13} className="absolute inset-0 m-auto text-[#D9363E] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
