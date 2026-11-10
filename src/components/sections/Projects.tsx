'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Layers,
  ChevronDown,
  ChevronUp,
  Terminal,
  Eye,
  Radio,
  BookOpen,
  Scan,
} from 'lucide-react';
import { PROJECTS, ProjectItem } from '@/data/projects';
import CivicOSDemo from '@/components/ui/demos/CivicOSDemo';
import AssemblyOSDemo from '@/components/ui/demos/AssemblyOSDemo';
import SkillCertDemo from '@/components/ui/demos/SkillCertDemo';
import { labAudio } from '@/lib/audio';

export default function Projects() {
  const [activeSimulator, setActiveSimulator] = useState<string | null>('civicos');
  const [xrayView, setXrayView] = useState<Record<string, boolean>>({});

  function toggleSimulator(id: string) {
    labAudio.playClick(900);
    setActiveSimulator(prev => (prev === id ? null : id));
  }

  function toggleXray(id: string) {
    labAudio.playClick(1050);
    setXrayView(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section id="projects" className="py-28 relative border-b border-[var(--border)]">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
              <span className="mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-sub)]">
                SELECTED ENGINEERING
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#171416] font-editorial mt-1">
              Ideas built. <br />
              <span className="font-serif-italic font-normal text-[#D9363E]">Products shipped.</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal mt-3 leading-relaxed">
              A collection of projects where I explore software engineering, solve practical problems and experiment with modern technologies. Each card features an interactive live preview.
            </p>
          </div>

          {/* Work / Play Lever Toggle */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] self-start md:self-end">
            <a
              href="#projects"
              onClick={() => labAudio.playClick(900)}
              className="px-4 py-1.5 rounded-full text-xs mono font-bold bg-[#D9363E] text-white shadow-sm"
            >
              all work
            </a>
            <a
              href="#arcade"
              onClick={() => labAudio.playClick(1050)}
              className="px-4 py-1.5 rounded-full text-xs mono font-semibold text-[var(--text-muted)] hover:text-[#D9363E]"
            >
              some play →
            </a>
          </div>
        </div>

        {/* 4 Project Articles */}
        <div className="space-y-12">
          {PROJECTS.map((project, idx) => {
            const isSimulatorOpen = activeSimulator === project.id;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="rounded-3xl glass border border-[var(--border-strong)] overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.4)]"
              >
                {/* Window Top Bar */}
                <div className="flex flex-wrap items-center justify-between px-6 py-3.5 border-b border-[var(--border)] bg-[var(--surface-2)] text-xs mono">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                    </div>
                    <span className="text-[var(--text-sub)]">
                      SYS_ID://{project.num} · {project.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-pulse" />
                    <span className="font-bold text-[var(--text)]">
                      {project.status} (PROD)
                    </span>
                  </div>
                </div>

                {/* Main Article Body */}
                <div className="p-6 sm:p-10 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                      <div className="mono text-xs text-[var(--accent-orange)] font-semibold">
                        {project.category} · {project.year}
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-bold text-[var(--text)] font-editorial tracking-tight">
                        {project.name}
                      </h3>
                      <div className="mono text-sm sm:text-base text-[var(--accent)] font-medium">
                        {project.tagline}
                      </div>
                      <p className="text-sm sm:text-base text-[var(--text-muted)] font-light leading-relaxed pt-1">
                        {project.description}
                      </p>
                    </div>

                    {/* Quick Meta Badge */}
                    <div className="p-4 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] text-xs mono text-[var(--text-sub)] space-y-1.5 self-start md:min-w-[180px]">
                      <div className="flex justify-between">
                        <span>SYS ID:</span>
                        <span className="text-[var(--text)] font-bold">{project.num}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>RELEASE:</span>
                        <span className="text-[var(--text)]">{project.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DEPLOYMENT:</span>
                        <span className="text-[var(--accent-lime)] font-bold">VERIFIED</span>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.stack.map(tech => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Primary CTA Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[var(--border)]">
                    {/* Live Demo Link */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glow-btn glow-btn-primary"
                        onClick={() => labAudio.playClick(1000)}
                      >
                        <span>LAUNCH LIVE DEMO</span>
                        <ExternalLink size={13} />
                      </a>
                    )}

                    {/* Source Code Link */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glow-btn glow-btn-ghost"
                        onClick={() => labAudio.playClick(850)}
                      >
                        <Github size={14} />
                        <span>SOURCE CODE</span>
                      </a>
                    )}

                    {/* Interactive Simulator Toggle */}
                    {(project.id === 'civicos' || project.id === 'assemblyos' || project.id === 'skillcert') && (
                      <button
                        onClick={() => toggleSimulator(project.id)}
                        className={`glow-btn ${
                          isSimulatorOpen ? 'glow-btn-orange' : 'glow-btn-ghost'
                        }`}
                      >
                        <Eye size={14} />
                        <span>{isSimulatorOpen ? 'COLLAPSE SIMULATOR' : 'INTERACTIVE PREVIEW'}</span>
                        {isSimulatorOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}

                    {/* X-Ray Architecture Inspection Button */}
                    <button
                      onClick={() => toggleXray(project.id)}
                      className={`glow-btn ${
                        xrayView[project.id]
                          ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                          : 'glow-btn-ghost text-purple-400 hover:text-purple-300'
                      }`}
                    >
                      <Scan size={14} />
                      <span>{xrayView[project.id] ? 'CLOSE X-RAY' : 'X-RAY ARCHITECTURE'}</span>
                    </button>

                    {/* Jump to Architecture & Case Study */}
                    <a
                      href="#architecture"
                      className="mono text-xs text-[var(--text-sub)] hover:text-[var(--accent)] flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <Layers size={13} />
                      <span>Architecture Spec →</span>
                    </a>
                  </div>

                  {/* X-Ray Architecture Breakdown Drawer */}
                  <AnimatePresence>
                    {xrayView[project.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pt-4"
                      >
                        <div className="p-6 rounded-2xl bg-[#080914] border border-purple-500/50 blueprint-grid text-purple-200 mono text-xs space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-purple-500/30">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                              <span className="font-bold text-white tracking-widest uppercase">
                                X-RAY SYSTEM INSPECTOR // {project.name}
                              </span>
                            </div>
                            <span className="text-[10px] text-cyan-400 font-semibold">
                              {project.architecture.length} ACTIVE ARCHITECTURAL LAYERS
                            </span>
                          </div>

                          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {project.architecture.map((layer, lIdx) => (
                              <div
                                key={layer.layer}
                                className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800 space-y-1.5"
                              >
                                <div className="flex items-center justify-between text-[10px]">
                                  <span className="text-cyan-400 font-bold">LAYER 0{lIdx + 1}</span>
                                  <span className="text-purple-400">{layer.tech}</span>
                                </div>
                                <div className="font-bold text-white text-sm">{layer.layer}</div>
                                <p className="text-[11px] text-purple-300 font-light leading-relaxed">
                                  {layer.purpose}
                                </p>
                                <div className="pt-2 border-t border-purple-900/60 text-[10px] text-purple-400">
                                  <span className="font-semibold text-cyan-300">DATA FLOW: </span>
                                  <span>{layer.dataFlow}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Embedded Interactive Simulator Drawer */}
                  <AnimatePresence>
                    {isSimulatorOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pt-4"
                      >
                        {project.id === 'civicos' && <CivicOSDemo />}
                        {project.id === 'assemblyos' && <AssemblyOSDemo />}
                        {project.id === 'skillcert' && <SkillCertDemo />}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Secondary Works: The Bench matching Rishika Reference */}
        <div className="mt-20 pt-12 border-t border-[var(--border)]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="eyebrow">secondary prototypes</span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)] font-editorial mt-1">
                the <span className="font-serif-italic font-normal text-amber-500">bench</span>.
              </h3>
            </div>
            <p className="text-xs text-[var(--text-muted)] mono">
              experiments, utilities and tools deployed to production.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: 'Crucion',
                tag: 'COLLABORATIVE CODE',
                desc: 'Real-time collaborative code editor with live syntax highlighting and team presence.',
                url: 'https://crucion.vercel.app',
              },
              {
                name: 'SentinelMesh',
                tag: 'CYBERSECURITY MESH',
                desc: 'Distributed cybersecurity telemetry monitor with automated anomaly detection.',
                url: 'https://sentinelmesh-five.vercel.app',
              },
              {
                name: 'MetroMate GPT',
                tag: 'TRANSIT AI AGENT',
                desc: 'Intelligent urban commute planner with natural-language route synthesis.',
                url: 'https://metromate-gpt.vercel.app',
              },
              {
                name: 'CampusCrew OS',
                tag: 'COMMUNITY MANAGER',
                desc: 'Programming contest dispatcher & event tracking platform for HackerRank crew.',
                url: 'https://campus-crew-os.vercel.app',
              },
            ].map(benchItem => (
              <a
                key={benchItem.name}
                href={benchItem.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => labAudio.playClick(950)}
                onMouseEnter={() => labAudio.playHover()}
                className="p-5 rounded-2xl glass border border-[var(--border)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="mono text-[9px] font-bold text-amber-500 tracking-wider mb-2">
                    {benchItem.tag}
                  </div>
                  <div className="font-bold text-base text-[var(--text)] group-hover:text-[var(--accent)] transition-colors flex items-center justify-between">
                    <span>{benchItem.name}</span>
                    <ExternalLink size={13} className="opacity-60 group-hover:opacity-100" />
                  </div>
                  <p className="text-xs text-[var(--text-muted)] font-light mt-2 leading-relaxed">
                    {benchItem.desc}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[var(--border)] flex items-center justify-between text-[10px] mono text-[var(--text-sub)]">
                  <span>STATUS: LIVE</span>
                  <span className="text-[var(--accent)]">LAUNCH ↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
