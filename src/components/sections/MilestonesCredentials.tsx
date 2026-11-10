'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Calendar,
  CheckCircle2,
  Flame,
  Layers,
} from 'lucide-react';
import { assetPath } from '@/lib/basePath';
import { labAudio } from '@/lib/audio';

export interface CredentialItem {
  id: string;
  title: string;
  role: string;
  org: string;
  year: string;
  category: 'OPEN SOURCE' | 'STUDENT PROGRAMS' | 'COMMUNITY' | 'RECOGNITION' | 'CAMPUS AMBASSADOR';
  description: string;
  proofType: string;
  imagePath: string;
  accent: string;
  badgeNumber?: string;
}

export const CREDENTIAL_VAULT: CredentialItem[] = [
  {
    id: 'google-sa',
    title: 'Google Student Ambassador (GSA 2026)',
    role: 'Face of Gemini on Campus',
    org: 'Google / The Gemini Program',
    year: '2026',
    category: 'STUDENT PROGRAMS',
    description: 'Officially selected into the nationwide community of student leaders representing Google Gemini on campus. Granted direct access to Google developer resources and ambassador platforms.',
    proofType: 'Official Selection Mail & GID Portal Access',
    imagePath: '/images/achievements/google-student-ambassador-gemini.jpg',
    accent: '#D9363E',
    badgeNumber: 'GSA-GEMINI-2026',
  },
  {
    id: 'osc-india',
    title: 'Open Source Connect India (OSCI)',
    role: 'Verified Contributor',
    org: 'Open Source Connect India / NexFellow',
    year: '2026',
    category: 'OPEN SOURCE',
    description: 'Awarded verified Contributor credential badge powered by NexFellow for high-impact contributions across open-source developer repositories and MERN stack systems.',
    proofType: 'Verified Contributor Badge #2026',
    imagePath: '/images/achievements/osc-india-contributor.jpg',
    accent: '#FF6B1A',
    badgeNumber: 'OSCI-CONTRIB-2026',
  },
  {
    id: 'gssoc-2026',
    title: 'GirlScript Summer of Code 2026',
    role: 'Open Source Contributor',
    org: 'GS LABS by GirlScript Foundation',
    year: '2026',
    category: 'OPEN SOURCE',
    description: 'Awarded official GSSoC 2026 Contributor rosette badge: BUILD · CONTRIBUTE · SHIP for successful pull requests merged across web software repositories.',
    proofType: 'GS LABS Official Contributor Rosette Badge',
    imagePath: '/images/achievements/gssoc-2026-badge.jpg',
    accent: '#3B82F6',
    badgeNumber: 'GSSOC-2026-ROSETTE',
  },
  {
    id: 'mygov-changemaker',
    title: 'MyGov Level 5 Change Maker',
    role: 'Change Maker (102,020 Points)',
    org: 'MyGov India (Government of India)',
    year: '2026',
    category: 'RECOGNITION',
    description: 'Earned the Level 5 Change Maker medallion badge with 102,020 points for outstanding digital citizen engagement and active platform participation on myGov.',
    proofType: 'Government of India Level 5 Medallion',
    imagePath: '/images/achievements/mygov-change-maker.jpg',
    accent: '#10B981',
    badgeNumber: 'MYGOV-LVL5-102020',
  },
  {
    id: 'guesss-india',
    title: 'GUESSS India Campus Ambassador 2025',
    role: 'Campus Ambassador (CA-419)',
    org: 'GUESSS India / REVA University',
    year: '2025–2026',
    category: 'CAMPUS AMBASSADOR',
    description: 'Awarded Certificate of Appreciation signed by Country Delegate Dr. Puran Singh for promoting the GUESSS 2025 Entrepreneurship Survey at PCET NMIET Pune.',
    proofType: 'Certificate of Appreciation #CA-419',
    imagePath: '/images/achievements/guesss-india-campus-ambassador-2025.jpg',
    accent: '#12A150',
    badgeNumber: 'CA-419-REVA-2025',
  },
  {
    id: 'osc-global',
    title: 'Open Source Connect Global',
    role: 'Global Contributor',
    org: 'Open Source Connect Global / NexFellow',
    year: '2026',
    category: 'OPEN SOURCE',
    description: 'Earned Open Source Connect Global Contributor credential badge powered by NexFellow for global software collaboration, components and bug fixes.',
    proofType: 'Verified Global Contributor Badge',
    imagePath: '/images/achievements/osc-global-contributor.jpg',
    accent: '#06B6D4',
    badgeNumber: 'OSCG-GLOBAL-2026',
  },
  {
    id: 'nsoc-2026',
    title: 'Nexus Spring of Code 2026',
    role: 'Pixel Tech Contributor',
    org: 'Nexus / NexFellow',
    year: '2026',
    category: 'COMMUNITY',
    description: 'Awarded Pixel Tech Contributor Medallion during Nexus Spring of Code for algorithmic modules, API handlers, and unit-tested feature branches.',
    proofType: 'Pixel Tech Contributor Medallion',
    imagePath: '/images/achievements/tech-contributor-pixel.jpg',
    accent: '#10B981',
    badgeNumber: 'NSOC-PIXEL-2026',
  },
];

const FILTER_CATEGORIES = [
  'ALL',
  'OPEN SOURCE',
  'STUDENT PROGRAMS',
  'COMMUNITY',
  'RECOGNITION',
  'CAMPUS AMBASSADOR',
] as const;

export default function MilestonesCredentials() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [fullscreenModal, setFullscreenModal] = useState<CredentialItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredItems = CREDENTIAL_VAULT.filter(item => {
    if (activeFilter === 'ALL') return true;
    return item.category === activeFilter;
  });

  const activeItem = filteredItems[selectedIndex] || filteredItems[0] || CREDENTIAL_VAULT[0];

  const handleSelect = (idx: number) => {
    labAudio.playClick(900);
    setSelectedIndex(idx);
    if (carouselRef.current) {
      const card = carouselRef.current.children[idx] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handleNext = useCallback(() => {
    labAudio.playClick(950);
    setSelectedIndex(prev => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  const handlePrev = useCallback(() => {
    labAudio.playClick(950);
    setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  // Keyboard Navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (fullscreenModal) {
        if (e.key === 'Escape') setFullscreenModal(null);
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [fullscreenModal, handleNext, handlePrev]);

  return (
    <section id="credentials" className="relative py-28 bg-[#121013] text-[#F1ECE8] overflow-hidden select-none">
      {/* Ambient Crimson Spotlight Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#D9363E]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#A91F2C]/15 blur-3xl pointer-events-none" />

      {/* Connected Storytelling Energy Line Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-b from-[#711C27] to-[#D9363E] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Flagship Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mono text-xs font-bold text-[#D9363E] uppercase tracking-widest">
              <Sparkles size={14} className="text-[#D9363E] animate-pulse" />
              <span>03 · RECOGNITION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              MILESTONES &amp; CREDENTIALS
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-[#D9363E]">
              &ldquo;Progress worth keeping.&rdquo;
            </p>
            <p className="text-sm sm:text-base text-white/60 max-w-xl">
              Progress worth keeping: 7 authentic, high-resolution credentials, badges, and certificates from Google, MyGov, GSSoC, and NexFellow.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous credential"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D9363E] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="mono text-xs text-white/60 px-2">
              {selectedIndex + 1} / {filteredItems.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next credential"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D9363E] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10">
          {FILTER_CATEGORIES.map(filter => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                labAudio.playClick(900);
                setActiveFilter(filter);
                setSelectedIndex(0);
              }}
              className={`mono text-xs px-3.5 py-1.5 rounded-full font-bold uppercase transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-[#D9363E] text-white shadow-[0_4px_16px_rgba(217,54,62,0.4)]'
                  : 'bg-white/5 text-white/70 hover:bg-white/15 hover:text-white border border-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Main Stage: Large Featured Spotlight (2-Column Hero Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          {/* Subtle Background Badge Number Watermark */}
          <div className="absolute right-6 bottom-4 mono text-[64px] font-bold text-white/[0.02] pointer-events-none select-none">
            {activeItem.badgeNumber}
          </div>

          {/* Left Column: Visual Credential Showcase with Click-to-Zoom */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div
              onClick={() => {
                labAudio.playClick(1000);
                setFullscreenModal(activeItem);
                setZoomLevel(1);
              }}
              className="relative w-full max-w-[380px] aspect-square rounded-2xl bg-black/40 border border-white/15 p-6 flex items-center justify-center cursor-pointer group shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:border-[#D9363E]/60 transition-all"
            >
              <img
                src={assetPath(activeItem.imagePath)}
                alt={activeItem.title}
                className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 mono text-[10px] bg-black/80 text-white/90 px-3 py-1.5 rounded-full border border-white/20 group-hover:bg-[#D9363E] transition-colors">
                <Maximize2 size={11} />
                <span>INSPECT PROOF</span>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Narrative & Authority Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mono text-xs text-[#D9363E] font-bold uppercase tracking-wider">
                <ShieldCheck size={14} className="text-[#D9363E]" />
                <span>{activeItem.category} · {activeItem.year}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {activeItem.title}
              </h3>
              <div className="text-base font-semibold text-white/80">
                {activeItem.role} · <span className="text-white/60">{activeItem.org}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              {activeItem.description}
            </p>

            {/* Credential Authority Box */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2 mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-white/50">Verification Mechanism:</span>
                <span className="font-bold text-[#10B981] flex items-center gap-1">
                  <CheckCircle2 size={12} /> {activeItem.proofType}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-white/50">Credential Identifier:</span>
                <span className="text-white/90 font-bold">{activeItem.badgeNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Physical Asset Status:</span>
                <span className="text-[#D9363E] font-bold">Verified Production Archive</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                labAudio.playClick(1000);
                setFullscreenModal(activeItem);
                setZoomLevel(1);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#D9363E] hover:bg-[#A91F2C] text-white font-bold mono text-xs flex items-center justify-center gap-2 transition-all shadow-[0_8px_24px_rgba(217,54,62,0.35)] cursor-pointer"
            >
              <Maximize2 size={14} />
              <span>FULL-SCREEN HIGH RESOLUTION VIEW</span>
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Thumbnails */}
        <div className="mt-8">
          <div className="mono text-xs text-white/50 mb-3 flex items-center justify-between">
            <span>VAULT REPOSITORY · SWIPE OR CLICK TO INSPECT</span>
            <span className="text-[#D9363E] font-bold">7 VERIFIED CERTIFICATIONS</span>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none"
          >
            {filteredItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(idx)}
                  className={`snap-center shrink-0 w-64 p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white/10 border-[#D9363E] shadow-[0_8px_24px_rgba(217,54,62,0.3)] scale-102'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="w-full h-32 rounded-xl bg-black/40 flex items-center justify-center p-3 mb-3 border border-white/10">
                    <img
                      src={assetPath(item.imagePath)}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="mono text-[10px] text-[#D9363E] uppercase font-bold">{item.category}</div>
                    <div className="text-xs font-bold text-white line-clamp-1 mt-0.5">{item.title}</div>
                    <div className="text-[11px] text-white/60 line-clamp-1">{item.org}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Special Feature: My Milestone Journey */}
        <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
          <div className="space-y-2 mb-8">
            <div className="mono text-xs font-bold text-[#D9363E] uppercase tracking-wider flex items-center gap-2">
              <Flame size={14} />
              <span>Chronological Continuum</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              My Milestone Journey (2024 – 2026)
            </h3>
            <p className="text-xs sm:text-sm text-white/60">
              Tracing the continuous trajectory of open-source contributions, competitive selections, and community leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {[
              { year: '2024', title: 'Foundations & Exploration', desc: 'Commenced Information Technology degree at PCET NMIET Pune; began active open-source contribution and full-stack development.' },
              { year: '2025', title: 'Campus Leadership', desc: 'Selected as GUESSS India Ambassador (CA-419) and promoted pan-India entrepreneurial surveys with certificates of appreciation.' },
              { year: '2026 H1', title: 'Nationwide Programs', desc: 'Selected into Google Student Ambassador (Gemini), HackerRank Campus Crew Lead, and Level 5 Change Maker with 102,020 points.' },
              { year: '2026 H2', title: 'Global Open Source', desc: 'Active contributor in OSC India, GSSoC 2026, Nexus Spring of Code, and OSC Global across production repositories.' },
            ].map((node, i) => (
              <div key={node.year} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 relative">
                <div className="mono text-lg font-bold text-[#D9363E]">{node.year}</div>
                <div className="text-sm font-bold text-white">{node.title}</div>
                <p className="text-xs text-white/60 leading-relaxed">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-Screen Credential Detail Viewer Modal */}
      <AnimatePresence>
        {fullscreenModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenModal(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-4 z-10">
              <div>
                <div className="mono text-xs text-[#D9363E] font-bold uppercase">
                  {fullscreenModal.category} · {fullscreenModal.year}
                </div>
                <h3 className="text-lg sm:text-xl font-bold">{fullscreenModal.title}</h3>
                <div className="text-xs text-white/70">{fullscreenModal.org}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setZoomLevel(z => Math.max(0.7, z - 0.2));
                  }}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                  aria-label="Zoom out"
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setZoomLevel(z => Math.min(2.5, z + 0.2));
                  }}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                  aria-label="Zoom in"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreenModal(null)}
                  className="w-9 h-9 rounded-full bg-[#D9363E] hover:bg-[#A91F2C] flex items-center justify-center text-white font-bold ml-2"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Image Area: strictly object-fit: contain (never cropped or stretched) */}
            <div
              onClick={e => e.stopPropagation()}
              className="flex-1 w-full flex items-center justify-center overflow-auto p-4"
            >
              <img
                src={assetPath(fullscreenModal.imagePath)}
                alt={fullscreenModal.title}
                style={{ transform: `scale(${zoomLevel})` }}
                className="max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl transition-transform duration-200"
              />
            </div>

            {/* Modal Bottom Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs mono text-white/70 border-t border-white/10 pt-4 z-10">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#10B981]" />
                <span>Verification: {fullscreenModal.proofType}</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    handlePrev();
                    const newIdx = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
                    setFullscreenModal(filteredItems[newIdx]);
                  }}
                  className="hover:text-white"
                >
                  ← PREVIOUS
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    handleNext();
                    const newIdx = (selectedIndex + 1) % filteredItems.length;
                    setFullscreenModal(filteredItems[newIdx]);
                  }}
                  className="hover:text-white"
                >
                  NEXT →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
