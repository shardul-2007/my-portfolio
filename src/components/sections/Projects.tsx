'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Layers,
  ChevronRight,
  Terminal,
  Activity,
  Code2,
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCw,
  ShieldCheck,
  Globe,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { PROJECTS, ProjectItem } from '@/data/projects';
import { labAudio } from '@/lib/audio';

export default function Projects() {
  const [previewTab, setPreviewTab] = useState<Record<string, 'live' | 'architecture'>>({
    civicos: 'live',
    sentinelmesh: 'live',
    assemblyos: 'live',
    skillcert: 'live',
  });
  const [iframeKey, setIframeKey] = useState<Record<string, number>>({});
  const [fullscreenProject, setFullscreenProject] = useState<ProjectItem | null>(null);

  function scrollToArchitecture(projectId: string) {
    labAudio.playClick(950);
    const archSection = document.getElementById('architecture');
    if (archSection) {
      archSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleReloadIframe(id: string) {
    labAudio.playClick(900);
    setIframeKey(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  return (
    <section id="projects" className="py-24 sm:py-28 relative bg-[#F8F5F1] text-[#171416] border-b border-[#E5DDDA] overflow-hidden">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9363E] animate-pulse" />
            <span className="mono text-xs font-bold uppercase tracking-[0.18em] text-[#D9363E]">
              SELECTED ENGINEERING // 4 PRODUCTION SYSTEMS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416] font-editorial mt-1">
            FEATURED PRODUCTION PROJECTS
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-[#D9363E] mt-1">
            &ldquo;Real systems deployed. Live products running.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-[#81777A] mt-2 leading-relaxed">
            All 4 systems are live production websites hosted on Vercel with verified HTTP 200 telemetry. Interact with the live embedded previews or launch the live deployments directly.
          </p>
        </div>

        {/* Structured Editorial System Panels */}
        <div className="space-y-12 sm:space-y-16">
          {PROJECTS.map((project, idx) => {
            const activeTab = previewTab[project.id] || 'live';

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-3xl bg-white border border-[#E5DDDA] shadow-[0_8px_30px_rgba(23,20,22,0.04)] hover:shadow-[0_16px_40px_rgba(217,54,62,0.06)] hover:border-[#D9363E]/40 transition-all duration-300 overflow-hidden"
              >
                {/* Panel Header Bar */}
                <div className="flex flex-wrap items-center justify-between px-5 sm:px-8 py-3.5 border-b border-[#E5DDDA] bg-[#F1ECE8]/60 text-xs mono gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-white border border-[#E5DDDA] font-bold text-[#D9363E] shadow-xs">
                      SYS_{project.num}
                    </span>
                    <span className="text-[#81777A] font-semibold text-[11px] sm:text-xs">
                      {project.badge} · {project.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F8F0] border border-[#BDE8D2] text-[#10B981] font-bold text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span>LIVE PRODUCTION DEPLOYMENT</span>
                    </div>
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
                        <span>Core Engineering Architecture</span>
                      </div>
                      <p className="text-xs text-[#171416] leading-relaxed">
                        {project.caseStudy?.engineeringView?.architectureSummary || project.tagline}
                      </p>
                    </div>

                    {/* Action Links Suite */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-2">
                      {/* Prominent Real Live Website Action */}
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => labAudio.playClick(1000)}
                        className="flex items-center gap-1.5 mono text-xs px-4 py-2.5 rounded-full bg-[#D9363E] text-white hover:bg-[#A91F2C] font-bold transition-all shadow-md active:scale-95"
                      >
                        <span>OPEN LIVE PROJECT</span>
                        <ExternalLink size={13} />
                      </a>

                      {/* View Source on GitHub */}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => labAudio.playClick(950)}
                          className="flex items-center gap-1.5 mono text-xs px-3.5 py-2.5 rounded-full bg-white border border-[#E5DDDA] text-[#171416] hover:border-[#D9363E] hover:text-[#D9363E] font-medium transition-all shadow-xs"
                        >
                          <Github size={13} />
                          <span>VIEW SOURCE</span>
                        </a>
                      )}

                      {/* Explore Architecture */}
                      <button
                        type="button"
                        onClick={() => scrollToArchitecture(project.id)}
                        className="flex items-center gap-1 mono text-xs px-3.5 py-2.5 rounded-full bg-[#F1ECE8] text-[#711C27] hover:bg-[#E5D9D7] font-bold transition-all cursor-pointer"
                      >
                        <Layers size={13} />
                        <span>EXPLORE ARCHITECTURE</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Real Deployed Website Embedded Preview (7 Cols) */}
                  <div className="lg:col-span-7 bg-[#F8F5F1] rounded-2xl border border-[#E5DDDA] overflow-hidden shadow-sm flex flex-col">
                    {/* Browser Chrome Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-[#E5DDDA] text-xs">
                      {/* Window Controls */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80 inline-block" />
                      </div>

                      {/* Address Bar showing Real Deployed URL */}
                      <div className="flex-1 max-w-md mx-3 px-3 py-1 rounded-full bg-[#F8F5F1] border border-[#E5DDDA] text-[11px] mono text-[#81777A] truncate flex items-center justify-between">
                        <span className="truncate flex items-center gap-1.5 text-[#171416] font-medium">
                          <Globe size={11} className="text-[#D9363E] flex-shrink-0" />
                          <span className="truncate">{project.liveUrl}</span>
                        </span>
                        <span className="text-[9px] uppercase font-bold text-[#10B981] flex-shrink-0 ml-1">
                          HTTPS 200
                        </span>
                      </div>

                      {/* Controls: Reload & Fullscreen */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleReloadIframe(project.id)}
                          title="Reload live preview"
                          className="p-1 rounded text-[#81777A] hover:text-[#171416] transition-colors"
                        >
                          <RotateCw size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            labAudio.playClick(900);
                            setFullscreenProject(project);
                          }}
                          title="Expand to Fullscreen Preview"
                          className="p-1 rounded text-[#81777A] hover:text-[#D9363E] transition-colors"
                        >
                          <Maximize2 size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Mode Toggle Bar: Live Preview vs Architecture Spec */}
                    <div className="flex items-center justify-between px-4 py-1.5 bg-[#FAF7F4] border-b border-[#E5DDDA] text-[10px] mono">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            labAudio.playClick(900);
                            setPreviewTab(prev => ({ ...prev, [project.id]: 'live' }));
                          }}
                          className={`px-2.5 py-0.5 rounded font-bold transition-all ${
                            activeTab === 'live'
                              ? 'bg-[#171416] text-white'
                              : 'text-[#81777A] hover:text-[#171416]'
                          }`}
                        >
                          LIVE WEBSITE PREVIEW
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            labAudio.playClick(950);
                            setPreviewTab(prev => ({ ...prev, [project.id]: 'architecture' }));
                          }}
                          className={`px-2.5 py-0.5 rounded font-bold transition-all ${
                            activeTab === 'architecture'
                              ? 'bg-[#171416] text-white'
                              : 'text-[#81777A] hover:text-[#171416]'
                          }`}
                        >
                          SYSTEM ARCHITECTURE
                        </button>
                      </div>

                      <div className="text-[#81777A] hidden sm:block">
                        {activeTab === 'live' ? 'INTERACTIVE REAL DEPLOYMENT' : '4-TIER ARCHITECTURE SPEC'}
                      </div>
                    </div>

                    {/* Content Stage */}
                    <div className="relative h-[420px] sm:h-[480px] w-full bg-white overflow-hidden">
                      {activeTab === 'live' ? (
                        <div className="w-full h-full relative">
                          <iframe
                            key={iframeKey[project.id] || 0}
                            src={project.liveUrl}
                            title={`${project.name} Live Web App`}
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            loading="lazy"
                            className="w-full h-full border-none"
                          />

                          {/* Non-intrusive bottom banner with direct link */}
                          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mono text-[10px] px-3 py-1 rounded-full bg-[#171416]/90 backdrop-blur-sm text-white font-bold hover:bg-[#D9363E] transition-all flex items-center gap-1 shadow-md"
                            >
                              <span>LAUNCH IN NEW TAB</span>
                              <ExternalLink size={10} />
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 overflow-y-auto h-full space-y-4">
                          <div className="mono text-xs font-bold text-[#D9363E] uppercase">
                            4-TIER ENGINEERING STACK — {project.name.toUpperCase()}
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {project.architecture.map((layer, lIdx) => (
                              <div
                                key={lIdx}
                                className="p-3.5 rounded-xl bg-[#F8F5F1] border border-[#E5DDDA] space-y-1.5 text-xs"
                              >
                                <div className="flex items-center justify-between text-[10px] mono">
                                  <span className="font-bold text-[#171416]">{layer.layer}</span>
                                  <span className="text-[#D9363E] font-semibold">{layer.tech}</span>
                                </div>
                                <div className="text-[11px] text-[#81777A]">{layer.purpose}</div>
                                <div className="text-[10px] mono text-[#171416] pt-1 border-t border-[#E5DDDA]/50">
                                  <span className="text-[#81777A]">Data Flow: </span>
                                  {layer.dataFlow}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Status Ticker */}
                    <div className="px-4 py-2 border-t border-[#E5DDDA] bg-white flex flex-wrap items-center justify-between text-[10px] mono text-[#81777A]">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span>STATUS: 200 OK · VERCEL GLOBAL EDGE</span>
                      </div>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D9363E] hover:underline font-bold"
                      >
                        {project.liveUrl} ↗
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Interactive Modal Preview */}
      <AnimatePresence>
        {fullscreenProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex flex-col p-4 sm:p-6"
          >
            <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E5DDDA]">
              {/* Modal Browser Bar */}
              <div className="flex items-center justify-between px-6 py-3 bg-[#F8F5F1] border-b border-[#E5DDDA]">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D9363E]" />
                  <span className="mono font-bold text-xs text-[#171416]">
                    {fullscreenProject.name} — Full Interactive Preview
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={fullscreenProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 mono text-xs px-3 py-1.5 rounded-full bg-[#D9363E] text-white font-bold"
                  >
                    <span>OPEN EXTERNAL</span>
                    <ExternalLink size={12} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setFullscreenProject(null)}
                    className="p-1.5 rounded-full bg-white border border-[#E5DDDA] text-[#171416] hover:bg-[#F1ECE8]"
                  >
                    <Minimize2 size={14} />
                  </button>
                </div>
              </div>

              {/* Modal Iframe */}
              <div className="flex-1 w-full bg-white">
                <iframe
                  src={fullscreenProject.liveUrl}
                  title={`${fullscreenProject.name} Fullscreen Preview`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  className="w-full h-full border-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
