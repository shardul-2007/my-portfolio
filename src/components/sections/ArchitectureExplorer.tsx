'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, Activity, Cpu, Database, Server, Sparkles, CheckCircle2 } from 'lucide-react';
import { PROJECTS, ArchitectureLayer } from '@/data/projects';
import { labAudio } from '@/lib/audio';

export default function ArchitectureExplorer() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('civicos');
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);

  const activeProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];
  const activeNode = activeProject.architecture[selectedNodeIndex] || activeProject.architecture[0];

  return (
    <section id="architecture" className="py-28 relative border-b border-[var(--border)] overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={14} className="text-[var(--accent)]" />
            <span className="sys-label-accent">SYSTEM ARCHITECTURE // MULTI-LAYER TOPOLOGY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)] font-editorial">
            Project Architecture <span className="gradient-text">Explorer.</span>
          </h2>
          <p className="text-base text-[var(--text-muted)] font-light mt-3 leading-relaxed">
            Clickable multi-tier system specifications, data flows, and runtime responsibilities discovered directly from production source code.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-[var(--border)] mb-10">
          {PROJECTS.map(proj => {
            const isSelected = selectedProjectId === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  labAudio.playClick(900);
                  setSelectedProjectId(proj.id);
                  setSelectedNodeIndex(0);
                }}
                className={`mono text-xs px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 font-semibold ${
                  isSelected
                    ? 'bg-[var(--accent)] text-black font-bold shadow-[0_0_15px_var(--accent-glow)]'
                    : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                }`}
              >
                <span className="opacity-70">SYS_{proj.num}:</span>
                <span>{proj.name}</span>
              </button>
            );
          })}
        </div>

        {/* Multi-tier Node Diagram */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Horizontal Node Stack */}
          <div className="lg:col-span-5 space-y-3">
            <div className="mono text-xs text-[var(--text-sub)] uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>SYSTEM LAYERS: {activeProject.name}</span>
              <span>{activeProject.architecture.length} NODES</span>
            </div>

            {activeProject.architecture.map((layer, idx) => {
              const isSelected = selectedNodeIndex === idx;
              return (
                <button
                  key={layer.layer}
                  onClick={() => {
                    labAudio.playClick(950);
                    setSelectedNodeIndex(idx);
                  }}
                  onMouseEnter={() => labAudio.playHover()}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[var(--surface-2)] border-[var(--border-glow)] shadow-[0_6px_25px_rgba(0,245,200,0.12)]'
                      : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="mono text-[10px] text-[var(--accent-orange)] font-bold">
                      {`LAYER 0${idx + 1} // ${layer.tech}`}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  </div>
                  <div className="font-bold text-sm text-[var(--text)]">{layer.layer}</div>
                  <div className="text-xs text-[var(--text-muted)] truncate mt-0.5 font-light">
                    {layer.purpose}
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="activeArchPill"
                      className="absolute left-0 top-3 bottom-3 w-1 bg-[var(--accent)] rounded-r"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Architectural Node Inspector */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProject.id}-${selectedNodeIndex}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="p-8 rounded-3xl glass border border-[var(--border-strong)] space-y-6"
              >
                {/* Node Metadata Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] text-xs mono text-[var(--text-sub)]">
                  <span>LAYER TELEMETRY INSPECTION</span>
                  <span className="text-[var(--accent)] font-semibold">
                    {`${activeProject.name} // NODE_0${selectedNodeIndex + 1}`}
                  </span>
                </div>

                {/* Layer Heading & Tech Tag */}
                <div className="space-y-1">
                  <div className="mono text-xs text-[var(--accent-orange)] font-bold">
                    {activeNode.tech}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text)] font-editorial tracking-tight">
                    {activeNode.layer}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] font-light leading-relaxed pt-1">
                    {activeNode.purpose}
                  </p>
                </div>

                {/* Responsibilities Block */}
                <div className="p-5 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] space-y-2">
                  <div className="mono text-[10px] text-[var(--text-sub)] uppercase tracking-wider flex items-center gap-1.5">
                    <Activity size={12} className="text-[var(--accent)]" />
                    <span>ENGINEERING RESPONSIBILITIES &amp; SCOPE</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text)] font-light leading-relaxed">
                    {activeNode.responsibilities}
                  </p>
                </div>

                {/* Data Flow Pipeline */}
                <div className="p-5 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] space-y-2">
                  <div className="mono text-[10px] text-[var(--text-sub)] uppercase tracking-wider flex items-center gap-1.5">
                    <Server size={12} className="text-[var(--accent-orange)]" />
                    <span>RUNTIME DATA FLOW PIPELINE</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text)] font-light leading-relaxed mono">
                    {activeNode.dataFlow}
                  </p>
                </div>

                {/* Bottom Source Note */}
                <div className="pt-2 flex items-center justify-between text-[10px] mono text-[var(--text-sub)]">
                  <span>DEPLOYED TARGET: PRODUCTION</span>
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:underline flex items-center gap-1"
                  >
                    <span>View Repository Implementation</span>
                    <ArrowRight size={11} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
