'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { assetPath } from '@/lib/basePath';
import { labAudio } from '@/lib/audio';
import { Cpu, Sparkles } from 'lucide-react';

interface TornPortraitProps {
  splitPercent: number; // 0 to 100 relative to the section/hero
  onDragStart?: () => void;
  isDragging?: boolean;
  pullSeparation?: number; // scroll-driven separation in px (0 to 40)
}

export default function TornPortrait({
  splitPercent,
  onDragStart,
  isDragging = false,
  pullSeparation = 0,
}: TornPortraitProps) {
  // Clamp split position for the portrait frame (safe range so face remains visible)
  const portraitSplit = Math.max(15, Math.min(85, splitPercent));

  return (
    <div className="relative w-44 h-60 sm:w-60 sm:h-80 md:w-68 md:h-92 mx-auto select-none">
      {/* Floating Status Pill — Top Right, avoids text collision */}
      <div className="absolute -top-8 -right-2 sm:-right-4 z-30 max-w-[180px] sm:max-w-[210px] p-2 sm:p-2.5 rounded-2xl bg-white border border-[var(--border)] shadow-md text-left text-[10px] sm:text-[11px] font-medium leading-snug">
        <div className="flex items-center gap-1 text-[#D9363E] font-bold">
          <Sparkles size={11} />
          <span>LIVING CANVAS</span>
        </div>
        <div className="text-[9px] text-[var(--text-sub)] mono mt-0.5">
          Torn-Portrait Engine · Pune, IN
        </div>
      </div>

      {/* Main Photographic Frame with Outer Paper Matte Border */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F1ECE8]">
        {/* ══════════════════════════════════════════════════════════════
            LAYER B: X-RAY / BLUEPRINT (Right Half of the Torn Seam)
            Biometric Scanner & Engineering Skeleton View
            ══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            clipPath: `polygon(${portraitSplit}% 0%, 100% 0%, 100% 100%, ${portraitSplit}% 100%)`,
            transform: `translateX(${pullSeparation}px)`,
          }}
          className="absolute inset-0 w-full h-full bg-[#FDF6F6] flex flex-col items-center justify-center p-3 blueprint-grid transition-none"
        >
          {/* Subtle Halftone Overlay in Blueprint */}
          <div className="absolute inset-0 halftone-screen text-[#D9363E] opacity-15 pointer-events-none" />

          {/* Biometric Skeleton & Technical Architecture */}
          <div className="relative w-full h-full flex items-center justify-center">
            <svg
              viewBox="0 0 100 130"
              className="w-full h-full text-[#D9363E] stroke-current fill-none stroke-1 drop-shadow-sm"
            >
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

              {/* Pulsating Crimson Heart */}
              <circle cx="47" cy="54" r="5" fill="#D9363E" className="animate-ping opacity-75" />
              <circle cx="47" cy="54" r="4" fill="#D9363E" />
            </svg>

            {/* Architectural Callouts */}
            <div className="absolute top-3 right-2 mono text-[8px] bg-white/95 px-1.5 py-0.5 rounded text-[#D9363E] font-bold border border-[#F2D2D4] shadow-xs">
              DSA &amp; LOGIC
            </div>
            <div className="absolute bottom-3 right-2 mono text-[8px] bg-white/95 px-1.5 py-0.5 rounded text-[#711C27] font-bold border border-[#F2D2D4] shadow-xs">
              OPEN SOURCE
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            LAYER A: REALITY / EDITORIAL (Left Half of the Torn Seam)
            Original Crisp Cutout Photograph of Shardul
            ══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            clipPath: `polygon(0% 0%, ${portraitSplit}% 0%, ${portraitSplit}% 100%, 0% 100%)`,
            transform: `translateX(-${pullSeparation}px)`,
          }}
          className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#F7EBEB] to-[#F1ECE8] overflow-hidden transition-none"
        >
          <img
            src={assetPath('/imageshardul.png')}
            alt="Shardul Parihar"
            className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.04]"
          />
          {/* Subtle Halftone Paper Texture */}
          <div className="absolute inset-0 halftone-screen text-[#D9363E] opacity-20 mix-blend-multiply pointer-events-none" />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            ORGANIC TORN-PAPER DECKLE SEAM (Traveling with portraitSplit)
            Fine paper fibers, depth shadow, and crimson laser thread
            ══════════════════════════════════════════════════════════════ */}
        <div
          style={{ left: `calc(${portraitSplit}% - 8px)` }}
          className="absolute top-0 bottom-0 w-4 pointer-events-none z-20 overflow-visible"
        >
          <svg
            viewBox="0 0 16 400"
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible drop-shadow-[2px_0_6px_rgba(23,20,22,0.22)]"
          >
            {/* Soft Paper Under-Shadow */}
            <path
              d="M 6 0 L 8 20 L 5 45 L 9 80 L 6 120 L 9 160 L 5 200 L 9 240 L 6 280 L 9 320 L 6 360 L 8 400 L 14 400 L 14 0 Z"
              fill="rgba(23,20,22,0.12)"
              filter="blur(2px)"
            />

            {/* White Deckle Paper Tear Edge */}
            <path
              d="M 6 0 L 8 20 L 5 45 L 9 80 L 6 120 L 9 160 L 5 200 L 9 240 L 6 280 L 9 320 L 6 360 L 8 400 L 0 400 L 0 0 Z"
              fill="#FFFFFF"
            />

            {/* Irregular Paper Fibers Seam */}
            <path
              d="M 6 0 L 8 20 L 5 45 L 9 80 L 6 120 L 9 160 L 5 200 L 9 240 L 6 280 L 9 320 L 6 360 L 8 400"
              stroke="#F1ECE8"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Subtle Crimson Laser Thread along Tear */}
            <path
              d="M 7 0 L 8.5 20 L 5.5 45 L 9.5 80 L 6.5 120 L 9.5 160 L 5.5 200 L 9.5 240 L 6.5 280 L 9.5 320 L 6.5 360 L 8.5 400"
              stroke="#D9363E"
              strokeWidth="0.8"
              strokeOpacity="0.8"
              fill="none"
            />
          </svg>
        </div>

        {/* Draggable Tactile Center Badge on the Torn Seam */}
        <div
          style={{ left: `${portraitSplit}%` }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 pointer-events-none"
        >
          <div className="w-7 h-7 rounded-full bg-white border-2 border-[#D9363E] text-[#D9363E] shadow-md flex items-center justify-center mono text-[8px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9363E] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
