'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, Radio, Zap, Layers, Sparkles } from 'lucide-react';
import { PROJECTS } from '@/data/portfolio';

const STATUS_COLOR: Record<string, string> = {
  'LIVE': '#00F5C8',
  'IN DEVELOPMENT': '#F59E0B',
  'OPEN SOURCE': '#5B8DEF',
  'ARCHIVED': '#6B7280',
};

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>('civicos');

  return (
    <section id="projects" className="py-28 relative" style={{ background: 'var(--bg)' }}>
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 opacity-60" style={{ background: 'var(--accent)' }} />
            <span className="sys-label-accent">FEATURED ENGINEERING</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text)' }}>
            Projects &amp;<br />
            <span className="gradient-text">Shipped Systems</span>
          </h2>
          <p className="max-w-xl leading-relaxed text-sm" style={{ color: 'var(--text-muted)' }}>
            Real production platforms with interactive live demos, full architectures, and open repositories.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {PROJECTS.filter(p => p.featured).map((project, i) => {
            const isExpanded = expanded === project.id;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  border: isExpanded ? '1px solid var(--border-glow)' : '1px solid var(--border)',
                  boxShadow: isExpanded ? '0 12px 40px rgba(0,0,0,0.18)' : 'none',
                }}
              >
                {/* Window Top Bar */}
                <div
                  className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]"
                  style={{ background: 'var(--surface-2)' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                    <span className="mono text-[10px] ml-2 tracking-widest hidden sm:inline-block" style={{ color: 'var(--text-sub)' }}>
                      SYS_ID://{project.num}
                    </span>
                  </div>

                  <div className="mono text-[11px] font-semibold tracking-wider text-center" style={{ color: 'var(--text)' }}>
                    {project.name.toUpperCase()} · {project.category}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: STATUS_COLOR[project.status] || 'var(--accent)' }} />
                    <span className="mono text-[9px] tracking-widest font-semibold" style={{ color: STATUS_COLOR[project.status] || 'var(--accent)' }}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Main Card Body */}
                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="sys-label-accent text-[10px]">{project.category}</span>
                        <span className="mono text-[10px]" style={{ color: 'var(--text-sub)' }}>· {project.year}</span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2" style={{ color: 'var(--text)' }}>
                        {project.name}
                      </h3>

                      <div className="mono text-xs md:text-sm mb-4 font-medium" style={{ color: 'var(--accent)' }}>
                        {project.tagline}
                      </div>

                      <p className="leading-relaxed mb-6 text-sm max-w-2xl font-light" style={{ color: 'var(--text-muted)' }}>
                        {project.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.stack.map(s => (
                          <span key={s} className="tech-pill font-mono text-[10px]">
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* CTA Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glow-btn glow-btn-primary text-xs font-semibold flex items-center gap-2"
                          >
                            <ExternalLink size={13} />
                            <span>LAUNCH LIVE DEMO</span>
                          </a>
                        )}

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glow-btn glow-btn-ghost text-xs font-medium flex items-center gap-2"
                          >
                            <Github size={13} />
                            <span>SOURCE CODE</span>
                          </a>
                        )}

                        {project.architecture && (
                          <button
                            onClick={() => setExpanded(isExpanded ? null : project.id)}
                            className="glow-btn glow-btn-ghost text-xs font-medium flex items-center gap-2"
                          >
                            <Layers size={13} />
                            <span>ARCHITECTURE</span>
                            <motion.span
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="inline-flex"
                            >
                              <ChevronDown size={13} />
                            </motion.span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right Meta Column */}
                    <div className="hidden md:flex flex-col gap-2.5">
                      <div className="glass rounded-xl p-3 text-center min-w-[90px]">
                        <Radio size={16} className="mx-auto mb-1" style={{ color: STATUS_COLOR[project.status] }} />
                        <div className="mono text-[8px] tracking-wider uppercase" style={{ color: 'var(--text-sub)' }}>
                          STATUS
                        </div>
                        <div className="mono text-[10px] font-bold mt-0.5" style={{ color: STATUS_COLOR[project.status] }}>
                          {project.status}
                        </div>
                      </div>

                      <div className="glass rounded-xl p-3 text-center min-w-[90px]">
                        <Zap size={16} className="mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                        <div className="mono text-[8px] tracking-wider uppercase" style={{ color: 'var(--text-sub)' }}>
                          DEPLOYED
                        </div>
                        <div className="mono text-[10px] font-bold mt-0.5" style={{ color: 'var(--accent)' }}>
                          PROD
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Architecture Diagram Expansion */}
                  <AnimatePresence>
                    {isExpanded && project.architecture && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-7 pt-6 border-t border-[var(--border)]">
                          <div className="flex items-center gap-2 mb-4">
                            <Layers size={13} style={{ color: 'var(--accent)' }} />
                            <span className="sys-label text-[10px]">SYSTEM ARCHITECTURE SPECIFICATION</span>
                          </div>

                          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {project.architecture.map(node => (
                              <div
                                key={node.layer}
                                className="rounded-xl p-4 transition-all duration-200"
                                style={{
                                  background: 'var(--surface-2)',
                                  border: '1px solid var(--border)',
                                }}
                              >
                                <div className="sys-label-accent mb-1 text-[9px] font-bold">{node.layer}</div>
                                <div className="font-semibold text-xs mb-1.5" style={{ color: 'var(--text)' }}>
                                  {node.tech}
                                </div>
                                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                  {node.detail}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}