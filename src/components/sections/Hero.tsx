'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Mail,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Crosshair,
  Move,
  RotateCcw,
  ShieldCheck,
  Globe,
  Terminal,
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
  { id: 'sentinelmesh', label: 'Sentinelmesh', category: 'PROJECT', tag: 'AI Governance', detail: 'Enterprise AI agent governance & policy enforcement', target: '#projects', color: '#D9363E' },
  { id: 'assemblyos', label: 'AssemblyOS', category: 'PROJECT', tag: '3D & Spatial AI', detail: 'Interactive 3D assembly platform with exploded views', target: '#projects', color: '#EF493F' },
  { id: 'skillcert', label: 'SkillCert', category: 'PROJECT', tag: 'Credentials Engine', detail: 'Cryptographic skills verification & proof issuance', target: '#projects', color: '#A91F2C' },
  { id: 'fullstack', label: 'Full Stack', category: 'TECH', tag: 'MERN & Next.js', detail: 'Production architectures, server actions & real-time sockets', target: '#skills', color: '#171416' },
  { id: 'typescript', label: 'TypeScript', category: 'TECH', tag: 'Type-Safe Web', detail: 'Strict static typing & resilient frontend systems', target: '#skills', color: '#3178C6' },
  { id: 'python', label: 'Python', category: 'TECH', tag: 'AI & Scripting', detail: 'Data manipulation, automation & neural APIs', target: '#skills', color: '#4B8BBE' },
  { id: 'dsa', label: 'DSA & Algorithms', category: 'TECH', tag: 'Problem Solving', detail: 'Competitive programming & algorithmic efficiency', target: '#skills', color: '#10B981' },
  { id: 'osci', label: 'OSCI 2026', category: 'CONTRIBUTION', tag: 'Open Source', detail: 'Open Source Connect India active contributor badge', target: '#opensource', color: '#FF6B1A' },
  { id: 'gssoc', label: 'GSSoC 2026', category: 'CONTRIBUTION', tag: 'Open Source', detail: 'GirlScript Summer of Code official contributor rosette', target: '#opensource', color: '#3B82F6' },
  { id: 'nsoc', label: 'NSoC 2026', category: 'CONTRIBUTION', tag: 'Open Source', detail: 'Nexus Spring of Code tech contributor medallion', target: '#opensource', color: '#10B981' },
  { id: 'google', label: 'Google SA', category: 'COMMUNITY', tag: 'Gemini Ambassador', detail: 'Selected Google Student Ambassador for campus outreach', target: '#engagements', color: '#4285F4' },
  { id: 'hackerrank', label: 'HackerRank', category: 'COMMUNITY', tag: 'Campus Crew', detail: 'PCET NMIET campus crew lead & contest facilitator', target: '#engagements', color: '#10B981' },
  { id: 'mygov', label: 'MyGov India', category: 'COMMUNITY', tag: 'Level 5 Change Maker', detail: '102,020 points for digital civic engagement', target: '#engagements', color: '#F59E0B' },
  { id: 'guesss', label: 'GUESSS India', category: 'COMMUNITY', tag: 'CA-419 Ambassador', detail: 'REVA University entrepreneurship survey outreach', target: '#engagements', color: '#8B5CF6' },
];

export default function Hero({ onOpenRecruiter, onOpenCommand }: HeroProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Localized X-Ray Spotlight State
  const [isInspecting, setIsInspecting] = useState<boolean>(false);
  const [lensPos, setLensPos] = useState<{ x: number; y: number }>({ x: 150, y: 180 });
  const [desktopMode, setDesktopMode] = useState<'hover' | 'drag'>('hover');
  const [mobileMode, setMobileMode] = useState<'normal' | 'inspect'>('normal');
  const [isDraggingLens, setIsDraggingLens] = useState<boolean>(false);
  const [activeNode, setActiveNode] = useState<ConstellationNode | null>(null);

  const portraitRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Spotlight radius: responsive based on viewport
  const lensRadius = typeof window !== 'undefined' && window.innerWidth < 640 ? 75 : 95;

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

  // Update lens position relative to portrait container
  const updateLensCoordinates = useCallback((clientX: number, clientY: number) => {
    if (!portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    setLensPos({ x, y });
  }, []);

  // Desktop Pointer Handlers (Hover Mode)
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    if (desktopMode === 'hover') {
      setIsInspecting(true);
      updateLensCoordinates(e.clientX, e.clientY);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (desktopMode === 'hover') {
      setIsInspecting(true);
      updateLensCoordinates(e.clientX, e.clientY);
    }
  };

  const handlePointerLeave = () => {
    if (desktopMode === 'hover') {
      leaveTimeoutRef.current = setTimeout(() => {
        setIsInspecting(false);
      }, 150);
    }
  };

  // Drag Mode Handlers (Desktop & Mobile)
  const handleLensDragStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDraggingLens(true);
    setIsInspecting(true);
    labAudio.playClick(900);
  };

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (isDraggingLens) {
        updateLensCoordinates(e.clientX, e.clientY);
      }
    };
    const handleGlobalPointerUp = () => {
      if (isDraggingLens) {
        setIsDraggingLens(false);
      }
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, [isDraggingLens, updateLensCoordinates]);

  // Mobile Touch Drag on Lens Handle
  const handleTouchMoveLens = (e: React.TouchEvent) => {
    if (mobileMode !== 'inspect') return;
    const touch = e.touches[0];
    if (touch) {
      updateLensCoordinates(touch.clientX, touch.clientY);
    }
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

  // Active state for mobile vs desktop
  const isLensVisible = typeof window !== 'undefined' && window.innerWidth < 768
    ? mobileMode === 'inspect'
    : (desktopMode === 'drag' || isInspecting);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-20 sm:pt-24 pb-16 overflow-hidden select-none bg-[#F8F5F1]"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 tech-grid opacity-35 pointer-events-none" />

      <div className="section-container relative z-10 w-full flex-1 flex flex-col justify-between">
        {/* Top Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 sm:pb-6 border-b border-[#E5DDDA] text-xs mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9363E] animate-pulse" />
            <span className="font-bold text-[#171416] tracking-wider uppercase">
              SHARDUL.LAB // HUMAN × ENGINEERING INTERFACE
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#81777A]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="font-semibold text-[#171416] text-[11px] sm:text-xs">
              OPEN TO INTERNSHIPS
            </span>
            <span className="hidden md:inline text-[#E5DDDA]">|</span>
            <span className="hidden md:inline text-[11px]">PUNE, IN ({currentTime} IST)</span>
          </div>
        </div>

        {/* Master Editorial Headline */}
        <div className="text-center pt-6 sm:pt-10 pb-6 sm:pb-8">
          <div className="inline-block relative">
            <div className="mono text-[10px] sm:text-[11px] text-[#D9363E] uppercase font-bold tracking-[0.2em] mb-1">
              PORTFOLIO // DEPARTMENT OF INFORMATION TECHNOLOGY
            </div>
            <h1 className="text-[clamp(32px,7.5vw,94px)] font-bold tracking-tight leading-none text-[#171416] font-editorial uppercase">
              shardul parihar
            </h1>
            <p className="mono text-[11px] sm:text-xs text-[#81777A] font-medium tracking-wide mt-2 max-w-xl mx-auto">
              INFORMATION TECHNOLOGY STUDENT · SOFTWARE DEVELOPER · FULL-STACK BUILDER
            </p>
          </div>
        </div>

        {/* Main 3-Column Editorial Stage (Stacked on Mobile, 3-Cols on Large Screens) */}
        <div className="grid lg:grid-cols-12 gap-8 items-center py-4 sm:py-6">
          {/* ══════════════════════════════════════════════════════════════
              LEFT COLUMN: Narrative & Verified Academic Credentials (4 Cols)
              ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-5 order-2 lg:order-1">
            {/* Academic Credential Spec Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DDDA] shadow-xs space-y-3">
              <div className="flex items-center justify-between mono text-[10px] pb-2 border-b border-[#E5DDDA]">
                <span className="font-bold text-[#D9363E] uppercase">ACADEMIC &amp; PROFILE SPEC</span>
                <span className="px-1.5 py-0.5 rounded bg-[#E8F8F0] text-[#10B981] font-bold">100% FACTUAL</span>
              </div>

              <div className="mono text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#81777A]">Degree:</span>
                  <span className="font-bold text-[#171416] text-right">B.E. Information Technology</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#81777A]">College:</span>
                  <span className="font-bold text-[#171416] text-right">PCET NMIET, Pune</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#81777A]">Period:</span>
                  <span className="font-bold text-[#171416]">2024–2028</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#81777A]">Location:</span>
                  <span className="font-bold text-[#171416]">Pune, Maharashtra, India</span>
                </div>
              </div>
            </div>

            {/* Narrative Editorial Statement */}
            <p className="text-xs sm:text-sm text-[#81777A] leading-relaxed">
              Engineering full-stack architectures, AI agent governance, and interactive 3D web systems. Grounded in information technology fundamentals, systems design, and open-source contribution.
            </p>

            {/* Primary Action Buttons Suite */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  labAudio.playClick(950);
                  onOpenRecruiter();
                }}
                className="mono text-xs px-4 py-2.5 rounded-full bg-[#D9363E] text-white hover:bg-[#A91F2C] font-bold transition-all shadow-sm active:scale-95"
              >
                RECRUITER DOSSIER
              </button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 mono text-xs px-3.5 py-2.5 rounded-full bg-white border border-[#E5DDDA] text-[#171416] hover:border-[#D9363E] hover:text-[#D9363E] font-medium transition-all shadow-xs"
              >
                <Mail size={12} />
                <span>{copied ? 'EMAIL COPIED!' : 'COPY EMAIL'}</span>
              </button>

              <a
                href="#projects"
                onClick={() => labAudio.playClick(900)}
                className="mono text-xs px-3.5 py-2.5 rounded-full bg-[#F1ECE8] text-[#711C27] hover:bg-[#E5D9D7] font-bold transition-all flex items-center gap-1"
              >
                <span>PROJECTS</span>
                <ArrowDown size={11} />
              </a>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              CENTER COLUMN: The Living Portrait with Localized X-Ray Lens (4 Cols)
              Natural photograph by default. Localized inspection lens reveals
              engineering blueprint ONLY under cursor or draggable lens.
              ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
            {/* Desktop / Mobile Mode Controls */}
            <div className="w-full max-w-[340px] flex items-center justify-between mb-3 px-1">
              {/* Desktop View Modes */}
              <div className="hidden sm:flex items-center gap-1 bg-white p-1 rounded-full border border-[#E5DDDA] shadow-xs mono text-[10px]">
                <button
                  type="button"
                  onClick={() => {
                    labAudio.playClick(900);
                    setDesktopMode('hover');
                    setIsInspecting(false);
                  }}
                  className={`px-3 py-1 rounded-full font-bold transition-all ${
                    desktopMode === 'hover'
                      ? 'bg-[#171416] text-white'
                      : 'text-[#81777A] hover:text-[#171416]'
                  }`}
                >
                  HOVER LENS
                </button>
                <button
                  type="button"
                  onClick={() => {
                    labAudio.playClick(950);
                    setDesktopMode('drag');
                    setIsInspecting(true);
                  }}
                  className={`px-3 py-1 rounded-full font-bold transition-all ${
                    desktopMode === 'drag'
                      ? 'bg-[#D9363E] text-white'
                      : 'text-[#81777A] hover:text-[#171416]'
                  }`}
                >
                  DRAG LENS
                </button>
              </div>

              {/* Mobile Dedicated Controls [ NORMAL ] [ INSPECT ] */}
              <div className="flex sm:hidden items-center gap-1 bg-white p-1 rounded-full border border-[#E5DDDA] shadow-xs mono text-[10px] mx-auto">
                <button
                  type="button"
                  onClick={() => {
                    labAudio.playClick(900);
                    setMobileMode('normal');
                    setIsInspecting(false);
                  }}
                  className={`px-4 py-1.5 rounded-full font-bold transition-all ${
                    mobileMode === 'normal'
                      ? 'bg-[#171416] text-white'
                      : 'text-[#81777A]'
                  }`}
                >
                  NORMAL PHOTO
                </button>
                <button
                  type="button"
                  onClick={() => {
                    labAudio.playClick(950);
                    setMobileMode('inspect');
                    setIsInspecting(true);
                  }}
                  className={`px-4 py-1.5 rounded-full font-bold transition-all ${
                    mobileMode === 'inspect'
                      ? 'bg-[#D9363E] text-white'
                      : 'text-[#81777A]'
                  }`}
                >
                  INSPECT LENS
                </button>
              </div>

              <div className="hidden sm:block mono text-[10px] text-[#81777A]">
                {desktopMode === 'hover' ? 'MOVE TO INSPECT' : 'DRAG TO EXPLORE'}
              </div>
            </div>

            {/* The Master Portrait Canvas */}
            <div
              ref={portraitRef}
              onPointerEnter={handlePointerEnter}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="relative w-[280px] sm:w-[320px] md:w-[340px] h-[370px] sm:h-[420px] md:h-[450px] rounded-3xl overflow-hidden border-2 border-[#E5DDDA] shadow-[0_16px_50px_rgba(23,20,22,0.08)] bg-[#F1ECE8] select-none touch-none cursor-crosshair"
            >
              {/* ──────────────────────────────────────────────────────────
                  LAYER 1: Pristine Original Photographic Portrait (Base)
                  100% natural, sharp, unaffected by any distortion.
                  ────────────────────────────────────────────────────────── */}
              <img
                src={assetPath('/imageshardul.png')}
                alt="Shardul Parihar — Software Engineer"
                className="absolute inset-0 w-full h-full object-cover object-top filter contrast-[1.03] select-none pointer-events-none"
                draggable={false}
              />

              {/* ──────────────────────────────────────────────────────────
                  LAYER 2: Engineering Blueprint Diagnostic Layer
                  Revealed ONLY within the circular localized spotlight!
                  Alignd 1:1 with the photograph.
                  ────────────────────────────────────────────────────────── */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-200"
                style={{
                  opacity: isLensVisible ? 1 : 0,
                  maskImage: isLensVisible
                    ? `radial-gradient(circle ${lensRadius}px at ${lensPos.x}px ${lensPos.y}px, black 72%, transparent 100%)`
                    : 'none',
                  WebkitMaskImage: isLensVisible
                    ? `radial-gradient(circle ${lensRadius}px at ${lensPos.x}px ${lensPos.y}px, black 72%, transparent 100%)`
                    : 'none',
                }}
              >
                {/* Same image aligned 1:1 with subtle blueprint treatment */}
                <img
                  src={assetPath('/imageshardul.png')}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-top filter grayscale contrast-125 brightness-95"
                  draggable={false}
                />

                {/* Crimson tint and fine technical grid inside lens */}
                <div className="absolute inset-0 bg-[#D9363E]/20 mix-blend-multiply" />
                <div className="absolute inset-0 tech-grid opacity-60" />

                {/* Blueprint Measurement Crosshairs & Annotation Calipers */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#D9363E]/80" fill="none">
                  <line x1="0" y1="28%" x2="100%" y2="28%" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="0" y1="52%" x2="100%" y2="52%" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="50%" y1="0" x2="50%" y2="100%" strokeDasharray="3 3" strokeWidth="1" />
                  <circle cx="50%" cy="36%" r="48" stroke="#D9363E" strokeWidth="1" strokeDasharray="2 4" />
                  <circle cx="50%" cy="36%" r="2.5" fill="#D9363E" />
                </svg>
              </div>

              {/* ──────────────────────────────────────────────────────────
                  LAYER 3: Interactive Inspection Reticle & Lens Ring
                  Follows pointer or acts as touch-draggable lens.
                  ────────────────────────────────────────────────────────── */}
              {isLensVisible && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${lensPos.x}px`,
                    top: `${lensPos.y}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="rounded-full border-2 border-[#D9363E] shadow-[0_0_24px_rgba(217,54,62,0.35)] flex items-center justify-center relative pointer-events-auto"
                    style={{
                      width: lensRadius * 2,
                      height: lensRadius * 2,
                    }}
                    onPointerDown={handleLensDragStart}
                    onTouchMove={handleTouchMoveLens}
                  >
                    {/* Cardinal Crosshair Ticks */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#D9363E]" />
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#D9363E]" />
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-[#D9363E]" />
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-[#D9363E]" />

                    {/* Central Target Reticle */}
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D9363E] shadow-sm animate-ping" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D9363E] absolute" />

                    {/* Drag Handle Icon for Touch & Drag Modes */}
                    {(desktopMode === 'drag' || mobileMode === 'inspect') && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#D9363E] text-white p-1 rounded-full shadow-md cursor-grab active:cursor-grabbing">
                        <Move size={10} />
                      </div>
                    )}

                    {/* Telemetry Coordinate Label attached to lens */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#171416] text-white mono text-[9px] px-2 py-0.5 rounded-md font-bold tracking-wider shadow-md whitespace-nowrap flex items-center gap-1.5 border border-[#D9363E]/40 pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9363E] animate-pulse" />
                      <span>INSPECT // X:{Math.round(lensPos.x)} Y:{Math.round(lensPos.y)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Corner Caliper Framing Reticles */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D9363E] pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D9363E] pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D9363E] pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D9363E] pointer-events-none" />

              {/* Optical Framing Tag */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#E5DDDA] mono text-[8px] text-[#171416] font-bold shadow-xs whitespace-nowrap pointer-events-none">
                OPTICAL SENSOR // 50MM · ASPECT 3:4
              </div>
            </div>

            {/* Instruction Caption */}
            <p className="mono text-[10px] text-[#81777A] mt-2.5 text-center">
              {desktopMode === 'hover'
                ? 'HOVER OVER PORTRAIT TO REVEAL ENGINEERING BLUEPRINT'
                : 'DRAG LENS TO INSPECT TECHNICAL BLUEPRINT DETAILS'}
            </p>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT COLUMN: Production Systems & Active Constellation (4 Cols)
              ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-5 order-3">
            {/* 4 Production Systems Quick Overview */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DDDA] shadow-xs space-y-3">
              <div className="flex items-center justify-between mono text-[10px] pb-2 border-b border-[#E5DDDA]">
                <span className="font-bold text-[#D9363E] uppercase">4 PRODUCTION SYSTEMS</span>
                <span className="text-[#81777A] font-semibold">ALL LIVE ON VERCEL</span>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'CivicOS', desc: 'Civic Infrastructure OS', href: '#projects', status: 'LIVE' },
                  { name: 'Sentinelmesh', desc: 'Enterprise AI Governance', href: '#projects', status: 'LIVE' },
                  { name: 'AssemblyOS', desc: 'Interactive 3D Assembly', href: '#projects', status: 'LIVE' },
                  { name: 'SkillCert', desc: 'Credential Certification', href: '#projects', status: 'LIVE' },
                ].map(proj => (
                  <a
                    key={proj.name}
                    href={proj.href}
                    onClick={() => labAudio.playClick(900)}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#F8F5F1] hover:bg-[#F1ECE8] border border-[#E5DDDA] transition-all group"
                  >
                    <div>
                      <div className="mono text-xs font-bold text-[#171416] group-hover:text-[#D9363E] transition-colors">
                        {proj.name}
                      </div>
                      <div className="text-[10px] text-[#81777A]">{proj.desc}</div>
                    </div>
                    <span className="mono text-[9px] font-bold text-[#10B981] px-1.5 py-0.5 rounded bg-white border border-[#E5DDDA]">
                      {proj.status}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Constellation Node Tags */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5DDDA] shadow-xs space-y-2">
              <div className="mono text-[10px] text-[#81777A] uppercase font-bold flex items-center justify-between">
                <span>ENGINEERING CONSTELLATION</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9363E] animate-pulse" />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {CONSTELLATION_NODES.slice(0, 8).map(node => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => handleNodeClick(node)}
                    className="px-2 py-1 rounded-md bg-[#F8F5F1] border border-[#E5DDDA] text-[10px] mono font-bold text-[#171416] hover:bg-[#D9363E] hover:text-white transition-all cursor-pointer"
                  >
                    {node.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Academic Continuum Ticker Bar */}
        <div className="mt-6 sm:mt-8 w-full bg-[#FFE500] text-[#171416] py-2 px-4 rounded-xl mono text-[11px] sm:text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-xs border border-black/10">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span>✈ ACADEMIC CONTINUUM</span>
            <span className="opacity-40">|</span>
            <span className="tracking-wider">PCET NMIET, PUNE</span>
            <span className="opacity-40 hidden sm:inline">|</span>
            <span className="hidden sm:inline">Department of Information Technology</span>
          </div>
          <div className="flex items-center gap-2">
            <span>2024–2028</span>
            <span className="px-2 py-0.5 rounded-full bg-black text-white text-[10px]">● IN PROGRESS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
