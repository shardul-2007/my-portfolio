'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Layers,
  ChevronRight,
  Terminal,
  Activity,
  Code2,
  Sparkles,
} from 'lucide-react';
import { PROJECTS, ProjectItem } from '@/data/projects';
import CivicOSDemo from '@/components/ui/demos/CivicOSDemo';
import AssemblyOSDemo from '@/components/ui/demos/AssemblyOSDemo';
import SkillCertDemo from '@/components/ui/demos/SkillCertDemo';
import { labAudio } from '@/lib/audio';

export default function Projects() {
  const [activeSimulator, setActiveSimulator] = useState<string>('civicos');

  function scrollToArchitecture(projectId: string) {
    labAudio.playClick(950);
    const archSection = document.getElementById('architecture');
    if (archSection) {
      archSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section id="projects" className="py-28 relative bg-[#F8F5F1] text-[#171416] border-b border-[#E5DDDA] overflow-hidden">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9363E] animate-pulse" />
            <span className="mono text-xs font-bold uppercase tracking-[0.18em] text-[#D9363E]">
              SELECTED ENGINEERING
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416] font-editorial mt-1">
            PROJECTS &amp; SYSTEMS
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-[#D9363E] mt-1">
            &ldquo;Ideas designed. Systems built.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-[#81777A] mt-2 leading-relaxed">
            Engineered systems solving practical problems across web architectures, simulated hardware, and verifiable credentials.
          </p>
        </div>

        {/* Structured Editorial System Panels */}
        <div className="space-y-10">
          {PROJECTS.map((project, idx) => {
            const isSimulatorOpen = activeSimulator === project.id;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-3xl bg-white border border-[#E5DDDA] shadow-[0_8px_30px_rgba(23,20,22,0.04)] overflow-hidden"
              >
                {/* Panel Header Bar */}
                <div className="flex flex-wrap items-center justify-between px-6 py-3.5 border-b border-[#E5DDDA] bg-[#F1ECE8]/60 text-xs mono">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5DDDA] font-bold text-[#D9363E]">
                      SYS_{project.num}
                    </span>
                    <span className="text-[#81777A] font-semibold">
                      {project.badge} · {project.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#12A150]" />
                    <span className="font-bold text-[#171416] uppercase text-[10px]">
                      {project.status === 'LIVE' ? 'ACTIVE PROTOTYPE' : project.status}
                    </span>
                  </div>
                </div>

                {/* Panel Body (2-Column Architecture Explorer Layout) */}
                <div className="grid lg:grid-cols-12 gap-8 p-6 sm:p-8 md:p-10 items-start">
                  {/* Left Column: Project Overview & Metadata (5 Cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="space-y-1.5">
                      <div className="mono text-xs text-[#D9363E] font-bold uppercase tracking-wider">
                        {project.category}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#171416] tracking-tight">
                        {project.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#81777A] leading-relaxed pt-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Technology Stack Tags */}
                    <div className="space-y-2">
                      <div className="mono text-[10px] text-[#81777A] uppercase font-bold tracking-wider">
                        TECHNOLOGY STACK
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map(t => (
                          <span
                            key={t}
                            className="mono text-[11px] px-2.5 py-1 rounded-lg bg-[#F8F5F1] text-[#171416] font-medium border border-[#E5DDDA]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Technical Highlights */}
                    <div className="p-4 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] space-y-2 text-xs">
                      <div className="mono text-[10px] text-[#D9363E] uppercase font-bold flex items-center gap-1.5">
                        <Activity size={12} />
                        <span>Core Engineering Feature</span>
                      </div>
                      <p className="text-xs text-[#171416] leading-relaxed">
                        {project.caseStudy?.engineeringView?.architectureSummary || project.tagline || 'Engineered with clean architectural separation and verifiable telemetry.'}
                      </p>
                    </div>

                    {/* Action Links Suite */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => labAudio.playClick(1000)}
                          className="flex items-center gap-1.5 mono text-xs px-4 py-2 rounded-full bg-[#D9363E] text-white hover:bg-[#A91F2C] font-bold transition-all shadow-xs"
                        >
                          <span>LIVE DEMO</span>
                          <ExternalLink size={12} />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => labAudio.playClick(950)}
                          className="flex items-center gap-1.5 mono text-xs px-4 py-2 rounded-full bg-white border border-[#E5DDDA] text-[#171416] hover:border-[#D9363E] hover:text-[#D9363E] font-medium transition-all shadow-xs"
                        >
                          <Github size={12} />
                          <span>SOURCE CODE</span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => scrollToArchitecture(project.id)}
                        className="flex items-center gap-1 mono text-xs px-3.5 py-2 rounded-full bg-[#F1ECE8] text-[#711C27] hover:bg-[#E5D9D7] font-bold transition-all cursor-pointer"
                      >
                        <Layers size={12} />
                        <span>VIEW ARCHITECTURE</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Interactive Simulator or Live System Preview (7 Cols) */}
                  <div className="lg:col-span-7 bg-[#F8F5F1] rounded-2xl border border-[#E5DDDA] p-4 sm:p-6 shadow-inner relative min-h-[360px] flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5DDDA] mono text-[11px] text-[#81777A]">
                      <span>INTERACTIVE RUNTIME PREVIEW</span>
                      <span className="text-[#D9363E] font-bold flex items-center gap-1">
                        <Sparkles size={11} /> LIVE SIMULATION
                      </span>
                    </div>

                    {/* Live Project Interactive Sandbox */}
                    <div className="my-auto py-4">
                      {project.id === 'civicos' && <CivicOSDemo />}
                      {project.id === 'assemblyos' && <AssemblyOSDemo />}
                      {project.id === 'skillcert' && <SkillCertDemo />}
                      {project.id === 'shardulos' && (
                        <div className="p-6 rounded-2xl bg-white border border-[#E5DDDA] space-y-4 text-center">
                          <div className="w-12 h-12 rounded-2xl bg-[#D9363E]/10 border border-[#D9363E]/30 text-[#D9363E] flex items-center justify-center mx-auto">
                            <Code2 size={24} />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-[#171416]">SHARDUL.LAB — Active Runtime</h4>
                            <p className="text-xs text-[#81777A] mt-1 max-w-sm mx-auto">
                              You are currently exploring this system: interactive 50/50 Human × Engineering interface, custom audio engine, and live architecture inspection.
                            </p>
                          </div>
                          <div className="inline-flex items-center gap-2 mono text-xs px-3 py-1 rounded-full bg-[#F8F5F1] text-[#D9363E] font-bold border border-[#F2D2D4]">
                            <span>STATUS: ACTIVE RUNTIME</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#E5DDDA] flex items-center justify-between mono text-[10px] text-[#81777A]">
                      <span>VERIFIED LOCAL SOURCE</span>
                      <span>Next.js 14 · TypeScript · Tailwind CSS</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
