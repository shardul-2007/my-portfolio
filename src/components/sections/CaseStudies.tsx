'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { labAudio } from '@/lib/audio';

export default function CaseStudies() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('civicos');
  const [viewTab, setViewTab] = useState<'product' | 'engineering'>('product');

  const activeProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];
  const { productView, engineeringView } = activeProject.caseStudy;

  return (
    <section id="case-studies" className="py-28 relative border-b border-[var(--border)] overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={14} className="text-[var(--accent-orange)]" />
            <span className="sys-label-orange">ENGINEERING CASE STUDIES // 04 PRODUCTION REPORTS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)] font-editorial">
            Technical Case <span className="gradient-orange">Studies.</span>
          </h2>
          <p className="text-base text-[var(--text-muted)] font-light mt-3 leading-relaxed">
            In-depth breakdowns examining problem framing, architectural decisions, trade-offs, and technical solutions for every major platform.
          </p>
        </div>

        {/* Project Selector Bar */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-[var(--border)] mb-8">
          {PROJECTS.map(proj => {
            const isSelected = selectedProjectId === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  labAudio.playClick(900);
                  setSelectedProjectId(proj.id);
                }}
                className={`mono text-xs px-4 py-2 rounded-xl transition-all cursor-pointer font-semibold ${
                  isSelected
                    ? 'bg-[var(--accent-orange)] text-white shadow-[0_0_15px_rgba(255,107,53,0.35)]'
                    : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                }`}
              >
                <span>SYS_{proj.num}: {proj.name}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: Product View vs Engineering View */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => {
              labAudio.playClick(950);
              setViewTab('product');
            }}
            className={`mono text-xs px-4 py-2 rounded-full cursor-pointer font-bold transition-all ${
              viewTab === 'product'
                ? 'bg-[var(--text)] text-[var(--text-dark)] shadow-md'
                : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            [PRODUCT VIEW] — Utility &amp; Features
          </button>

          <button
            onClick={() => {
              labAudio.playClick(1000);
              setViewTab('engineering');
            }}
            className={`mono text-xs px-4 py-2 rounded-full cursor-pointer font-bold transition-all ${
              viewTab === 'engineering'
                ? 'bg-[var(--accent)] text-black shadow-[0_0_15px_var(--accent-glow)]'
                : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            [ENGINEERING VIEW] — Architecture &amp; Decisions
          </button>
        </div>

        {/* Case Study Content Box */}
        <AnimatePresence mode="wait">
          {viewTab === 'product' ? (
            /* ── PRODUCT VIEW ───────────────────────────────── */
            <motion.div
              key={`product-${activeProject.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="p-8 sm:p-10 rounded-3xl glass border border-[var(--border-strong)] space-y-8"
            >
              <div>
                <div className="mono text-xs text-[var(--accent-orange)] font-bold mb-1">
                  CASE STUDY: {activeProject.name.toUpperCase()} · PRODUCT PERSPECTIVE
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text)] font-editorial tracking-tight">
                  {productView.whatItDoes}
                </h3>
                <div className="mono text-xs text-[var(--text-sub)] mt-2">
                  TARGET AUDIENCE: {productView.whoItHelps}
                </div>
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] space-y-2">
                  <div className="mono text-xs text-[#EF4444] font-bold flex items-center gap-1.5">
                    <AlertTriangle size={14} />
                    <span>THE PROBLEM BEING SOLVED</span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] font-light leading-relaxed">
                    {productView.problem}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] space-y-2">
                  <div className="mono text-xs text-[#10B981] font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>THE ENGINEERED SOLUTION</span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] font-light leading-relaxed">
                    {productView.solution}
                  </p>
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div className="space-y-3">
                <div className="mono text-xs text-[var(--text-sub)] uppercase tracking-wider">
                  KEY DELIVERED FEATURES:
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {productView.keyFeatures.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--surface-2)] text-xs text-[var(--text)] font-medium"
                    >
                      <CheckCircle2 size={13} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── ENGINEERING VIEW ───────────────────────────── */
            <motion.div
              key={`engineering-${activeProject.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="p-8 sm:p-10 rounded-3xl glass border border-[var(--border-strong)] space-y-8"
            >
              <div>
                <div className="mono text-xs text-[var(--accent)] font-bold mb-1">
                  CASE STUDY: {activeProject.name.toUpperCase()} · TECHNICAL ARCHITECTURE DEEP-DIVE
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text)] font-editorial tracking-tight">
                  Architecture &amp; Technical Implementation
                </h3>
                <p className="text-sm text-[var(--text-muted)] font-light leading-relaxed mt-2 max-w-3xl">
                  {engineeringView.architectureSummary}
                </p>
              </div>

              {/* Technical Decisions */}
              <div className="space-y-3">
                <div className="mono text-xs text-[var(--text-sub)] uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu size={14} className="text-[var(--accent)]" />
                  <span>KEY TECHNICAL DECISIONS &amp; RATIONALE:</span>
                </div>
                <div className="space-y-2">
                  {engineeringView.technicalDecisions.map((dec, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs text-[var(--text)] font-light leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="mono font-bold text-[var(--accent)] text-xs mt-0.5">
                        0{i + 1}.
                      </span>
                      <span>{dec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* State Management & Data Flow */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] space-y-2">
                  <div className="mono text-xs text-[var(--text-sub)] uppercase">
                    DATA FLOW SPECIFICATION
                  </div>
                  <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed mono">
                    {engineeringView.dataFlow}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] space-y-2">
                  <div className="mono text-xs text-[var(--text-sub)] uppercase">
                    STATE MANAGEMENT PATTERNS
                  </div>
                  <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                    {engineeringView.stateManagement}
                  </p>
                </div>
              </div>

              {/* Challenges & Tradeoffs */}
              <div className="space-y-3">
                <div className="mono text-xs text-[var(--text-sub)] uppercase tracking-wider flex items-center gap-1.5">
                  <Compass size={14} className="text-[var(--accent-orange)]" />
                  <span>CHALLENGES ENCOUNTERED &amp; TRADE-OFFS:</span>
                </div>
                <div className="space-y-2">
                  {engineeringView.challengesAndTradeoffs.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs text-[var(--text-muted)] font-light leading-relaxed"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
