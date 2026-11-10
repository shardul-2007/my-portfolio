'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowDown, GitBranch, Cpu } from 'lucide-react';
import { assetPath } from '@/lib/basePath';

export default function TornCanvasTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Controlled outward paper separation (0 to 28px)
  const leftX = useTransform(scrollYProgress, [0.15, 0.65], ['0px', '-26px']);
  const rightX = useTransform(scrollYProgress, [0.15, 0.65], ['0px', '26px']);
  const leftRotate = useTransform(scrollYProgress, [0.15, 0.65], ['0deg', '-1.5deg']);
  const rightRotate = useTransform(scrollYProgress, [0.15, 0.65], ['0deg', '1.5deg']);

  // Beam energy intensity & height
  const beamOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.85], [0, 1, 0.9]);
  const beamScaleY = useTransform(scrollYProgress, [0.2, 0.7], [0.2, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0.4, 1]);

  return (
    <div
      ref={containerRef}
      className="relative py-16 sm:py-24 bg-[#F1ECE8] text-[#171416] overflow-hidden select-none"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      <div className="section-container relative z-10 flex flex-col items-center text-center">
        {/* Narrative Micro-Header */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="space-y-2 max-w-xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-2 mono text-xs font-bold text-[#D9363E] uppercase tracking-widest bg-white px-3.5 py-1 rounded-full border border-[var(--border)] shadow-sm">
            <Sparkles size={12} className="animate-pulse" />
            <span>THE LIVING CANVAS · SCROLL TRANSFORMATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#171416]">
            One portrait. <span className="font-serif italic font-normal text-[#D9363E]">An unfolding universe.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            As the paper edges separate, the underlying engineering architecture surfaces—connecting raw code contributions to campus leadership and verified credentials.
          </p>
        </motion.div>

        {/* The Two Unfolding Torn Paper Layers */}
        <div className="relative w-56 h-72 sm:w-64 sm:h-84 my-4 flex items-center justify-center">
          {/* Glowing Crimson Energy Line Igniting Between the Seam */}
          <motion.div
            style={{
              opacity: beamOpacity,
              scaleY: beamScaleY,
              transformOrigin: 'top center',
            }}
            className="absolute top-0 bottom-[-80px] w-1 bg-gradient-to-b from-[#D9363E] via-[#EF493F] to-[#711C27] shadow-[0_0_20px_#D9363E] z-20"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D9363E] animate-ping opacity-75" />
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#D9363E]" />
          </motion.div>

          {/* Left Photographic Layer (Reality) */}
          <motion.div
            style={{ x: leftX, rotate: leftRotate }}
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-gradient-to-b from-[#F7EBEB] to-[#F1ECE8]"
            style-clipPath="polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)"
          >
            <div
              style={{ clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' }}
              className="w-full h-full relative"
            >
              <img
                src={assetPath('/imageshardul.png')}
                alt="Shardul Parihar"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 halftone-screen text-[#D9363E] opacity-20 pointer-events-none" />
              {/* Torn Edge Deckle on Right Seam */}
              <div className="absolute top-0 bottom-0 right-[50%] w-3 translate-x-1/2 bg-white/90 shadow-sm border-r border-[#D9363E]/40" />
            </div>
          </motion.div>

          {/* Right Blueprint Layer (X-Ray) */}
          <motion.div
            style={{ x: rightX, rotate: rightRotate }}
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-[#FDF6F6] blueprint-grid"
          >
            <div
              style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}
              className="w-full h-full relative flex items-center justify-center p-3"
            >
              <svg viewBox="0 0 100 130" className="w-full h-full text-[#D9363E] stroke-current fill-none stroke-1">
                <circle cx="50" cy="22" r="14" strokeWidth="1.5" />
                <line x1="50" y1="36" x2="50" y2="85" strokeWidth="2" strokeDasharray="2 2" />
                <path d="M36 48 Q50 42 64 48" strokeWidth="1.2" />
                <circle cx="47" cy="54" r="5" fill="#D9363E" className="animate-ping opacity-75" />
                <circle cx="47" cy="54" r="4" fill="#D9363E" />
              </svg>
              {/* Torn Edge Deckle on Left Seam */}
              <div className="absolute top-0 bottom-0 left-[50%] w-3 -translate-x-1/2 bg-white/90 shadow-sm border-l border-[#D9363E]/40" />
            </div>
          </motion.div>
        </div>

        {/* Transition Anchor Indicator to Section 01 */}
        <div className="mt-8 flex flex-col items-center gap-2 mono text-xs text-[#D9363E] font-bold">
          <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#F2D2D4] shadow-xs">
            <GitBranch size={12} />
            <span>PATH LEADS TO SECTION 01: CONTRIBUTIONS</span>
          </span>
          <ArrowDown size={14} className="animate-bounce mt-1 text-[#D9363E]" />
        </div>
      </div>
    </div>
  );
}
