'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Cpu,
  Hammer,
  Users,
  Sparkles,
  ChevronRight,
  Quote,
  CheckCircle2,
  LucideIcon,
} from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { labAudio } from '@/lib/audio';

export default function InsideMind() {
  const [selectedPillar, setSelectedPillar] = useState<string>('engineer');

  const activePillar =
    PROFILE.identityPillars.find(p => p.id === selectedPillar) ||
    PROFILE.identityPillars[0];

  const PILLAR_ICONS: Record<string, LucideIcon> = {
    engineer: Cpu,
    builder: Hammer,
    community: Users,
    creator: Sparkles,
  };

  return (
    <section id="mind" className="py-28 relative border-b border-[var(--border)] overflow-hidden">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] mb-4">
            <Brain size={14} className="text-[var(--accent)]" />
            <span className="sys-label-accent">IDENTITY &amp; ENGINEERING COGNITION</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text)] font-editorial leading-tight">
            Inside the Mind of <br />
            <span className="gradient-text">Shardul Parihar.</span>
          </h2>
          <div className="mono text-xs sm:text-sm tracking-[0.2em] text-[var(--accent-orange)] font-semibold mt-2">
            SOFTWARE ENGINEER / BUILDER
          </div>

          {/* Verified Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 p-5 rounded-2xl glass border border-[var(--border-strong)]">
            {[
              { val: '17+', label: 'Verified Programs', sub: 'Campus & Open Source' },
              { val: '16', label: 'Achievements', sub: 'Documented Badges' },
              { val: '23', label: 'Technical Skills', sub: 'Languages & Tools' },
              { val: '04', label: 'Featured Systems', sub: 'Production Shipped' },
            ].map(s => (
              <div key={s.label} className="text-center space-y-1">
                <div className="text-3xl sm:text-4xl font-bold mono text-[var(--accent)]">
                  {s.val}
                </div>
                <div className="mono text-xs font-semibold text-[var(--text)]">
                  {s.label}
                </div>
                <div className="mono text-[10px] text-[var(--text-sub)]">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Interactive Identity Cards & Detailed Philosophy Inspector */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 4 Selectable Pillar Cards */}
          <div className="lg:col-span-5 space-y-3">
            {PROFILE.identityPillars.map(pillar => {
              const Icon = PILLAR_ICONS[pillar.id] || Sparkles;
              const isSelected = selectedPillar === pillar.id;

              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    labAudio.playClick(950);
                    setSelectedPillar(pillar.id);
                  }}
                  onMouseEnter={() => labAudio.playHover()}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-[var(--surface-2)] border-[var(--border-glow)] shadow-[0_10px_35px_rgba(0,245,200,0.1)]'
                      : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${pillar.accentColor}18`,
                          border: `1px solid ${pillar.accentColor}40`,
                          color: pillar.accentColor,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="mono text-[10px] text-[var(--text-sub)] font-semibold">
                            PILLAR_{pillar.num}
                          </span>
                          <span
                            className="mono text-[10px] font-bold tracking-wider"
                            style={{ color: pillar.accentColor }}
                          >
                            {pillar.label}
                          </span>
                        </div>
                        <div className="font-bold text-base text-[var(--text)] mt-0.5">
                          {pillar.title}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      size={18}
                      className={`transition-transform duration-300 mt-2 ${
                        isSelected
                          ? 'rotate-90 text-[var(--accent)]'
                          : 'text-[var(--text-sub)]'
                      }`}
                    />
                  </div>

                  <p className="text-xs text-[var(--text-muted)] font-light mt-3 leading-relaxed">
                    {pillar.shortDesc}
                  </p>

                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="activePillarBar"
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ background: pillar.accentColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Philosophy Viewport */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="p-8 sm:p-10 rounded-3xl glass border border-[var(--border-strong)] relative overflow-hidden"
              >
                {/* Accent Watermark */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
                  style={{ background: activePillar.accentColor }}
                />

                <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-6 text-xs mono text-[var(--text-sub)]">
                  <span>IDENTITY PERSPECTIVE // 0{activePillar.num}</span>
                  <span
                    className="font-bold tracking-wider"
                    style={{ color: activePillar.accentColor }}
                  >
                    {activePillar.label} MATRIX
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight font-editorial mb-4">
                  {activePillar.title}
                </h3>

                <p className="text-base sm:text-lg leading-relaxed text-[var(--text-muted)] font-light mb-8">
                  {activePillar.fullDesc}
                </p>

                {/* Quote Block */}
                <div className="p-5 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] mb-8 relative">
                  <Quote
                    size={24}
                    className="opacity-20 absolute top-4 right-4"
                    style={{ color: activePillar.accentColor }}
                  />
                  <div className="text-sm italic font-editorial text-[var(--text)] leading-relaxed">
                    {activePillar.quote}
                  </div>
                  <div className="mono text-[10px] text-[var(--text-sub)] mt-2">
                    — Shardul Parihar, Core Philosophy
                  </div>
                </div>

                {/* Associated Tags */}
                <div>
                  <div className="mono text-[11px] text-[var(--text-sub)] uppercase tracking-wider mb-3">
                    CORE ENGINEERING CORRELATES
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activePillar.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs mono font-medium bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)]"
                      >
                        <CheckCircle2 size={12} style={{ color: activePillar.accentColor }} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
