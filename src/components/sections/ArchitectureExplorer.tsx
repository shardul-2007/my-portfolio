'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, Activity, Server, Sparkles, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { labAudio } from '@/lib/audio';

export default function ArchitectureExplorer() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('civicos');
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);

  const activeProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];
  const activeNode = activeProject.architecture[selectedNodeIndex] || activeProject.architecture[0];

  return (
    <section id="architecture" className="py-28 relative bg-[#F8F5F1] text-[#171416] border-b border-[#E5DDDA] overflow-hidden">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9363E] animate-pulse" />
            <span className="mono text-xs font-bold uppercase tracking-[0.18em] text-[#D9363E]">
              SYSTEM ARCHITECTURE // MULTI-LAYER TOPOLOGY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416] font-editorial mt-1">
            PROJECT ARCHITECTURE EXPLORER
          </h2>
          <p className="text-xs sm:text-sm text-[#81777A] mt-2 leading-relaxed">
            Multi-tier system specifications, data flows, and runtime responsibilities verified directly from codebase structure.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-[#E5DDDA] mb-10">
          {PROJECTS.map(proj => {
            const isSelected = selectedProjectId === proj.id;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => {
                  labAudio.playClick(900);
                  setSelectedProjectId(proj.id);
                  setSelectedNodeIndex(0);
                }}
                className={`mono text-xs px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 font-semibold ${
                  isSelected
                    ? 'bg-[#D9363E] text-white font-bold shadow-xs'
                    : 'bg-white border border-[#E5DDDA] text-[#81777A] hover:text-[#171416] hover:bg-[#F1ECE8]'
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
          {/* Left Column: Horizontal Node Stack (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="mono text-xs text-[#81777A] uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>SYSTEM LAYERS: {activeProject.name}</span>
              <span className="text-[#D9363E] font-bold">{activeProject.architecture.length} VERIFIED NODES</span>
            </div>

            {activeProject.architecture.map((layer, idx) => {
              const isSelected = selectedNodeIndex === idx;
              return (
                <button
                  key={layer.layer}
                  type="button"
                  onClick={() => {
                    labAudio.playClick(950);
                    setSelectedNodeIndex(idx);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-white border-[#D9363E] shadow-sm'
                      : 'bg-white/80 border-[#E5DDDA] hover:border-[#D9363E]/40 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="mono text-[10px] text-[#D9363E] font-bold">
                      {`LAYER 0${idx + 1} // ${layer.tech}`}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#D9363E]' : 'bg-[#12A150]'}`} />
                  </div>
                  <div className="font-bold text-sm text-[#171416]">{layer.layer}</div>
                  <div className="text-xs text-[#81777A] truncate mt-0.5">
                    {layer.purpose}
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="activeArchPill"
                      className="absolute left-0 top-3 bottom-3 w-1 bg-[#D9363E] rounded-r"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Architectural Node Inspector (7 Cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProject.id}-${selectedNodeIndex}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DDDA] shadow-[0_8px_30px_rgba(23,20,22,0.04)] space-y-6"
              >
                {/* Node Metadata Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E5DDDA] text-xs mono text-[#81777A]">
                  <span>LAYER TELEMETRY INSPECTION</span>
                  <span className="text-[#D9363E] font-bold">
                    {`${activeProject.name} // NODE_0${selectedNodeIndex + 1}`}
                  </span>
                </div>

                {/* Layer Heading & Tech Tag */}
                <div className="space-y-1">
                  <div className="mono text-xs text-[#D9363E] font-bold uppercase">
                    {activeNode.tech}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#171416] tracking-tight">
                    {activeNode.layer}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#81777A] leading-relaxed pt-1">
                    {activeNode.purpose}
                  </p>
                </div>

                {/* Responsibilities Block */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] space-y-2">
                  <div className="mono text-[10px] text-[#D9363E] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Activity size={12} />
                    <span>ENGINEERING RESPONSIBILITIES &amp; SCOPE</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#171416] leading-relaxed">
                    {activeNode.responsibilities}
                  </p>
                </div>

                {/* Data Flow Pipeline */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] space-y-2">
                  <div className="mono text-[10px] text-[#171416] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Server size={12} className="text-[#D9363E]" />
                    <span>RUNTIME DATA FLOW PIPELINE</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#171416] leading-relaxed mono">
                    {activeNode.dataFlow}
                  </p>
                </div>

                {/* Bottom Source Note */}
                <div className="pt-2 flex items-center justify-between text-[10px] mono text-[#81777A]">
                  <span className="flex items-center gap-1 text-[#12A150] font-bold">
                    <CheckCircle2 size={12} /> VERIFIED FROM SOURCE
                  </span>
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D9363E] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>View Implementation</span>
                      <ArrowRight size={11} />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
