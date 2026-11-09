'use client';
import { motion } from 'framer-motion';
import {
  Activity,
  Cpu,
  Layers,
  Terminal,
  Compass,
  ArrowUpRight,
  GitBranch,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { PROJECTS } from '@/data/projects';
import { labAudio } from '@/lib/audio';

interface CommandCenterProps {
  onOpenCommand: () => void;
  onOpenRecruiter: () => void;
}

export default function CommandCenter({ onOpenCommand, onOpenRecruiter }: CommandCenterProps) {
  return (
    <section id="command-center" className="py-24 relative border-b border-[var(--border)]">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="sys-label-accent">COMMAND DECK // TELEMETRY &amp; STATUS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)] font-editorial">
              Engineering <span className="gradient-text">Command Center</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-xl mt-2 font-light">
              Real-time snapshot of active systems, technical focus vectors, learning goals, and project launchers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                labAudio.playClick(900);
                onOpenCommand();
              }}
              className="glow-btn glow-btn-ghost text-xs"
            >
              <Terminal size={14} className="text-[var(--accent)]" />
              <span>COMMAND PALETTE [⌘K]</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Panel 1: Live Status & Location */}
          <motion.div
            whileHover={{ y: -3 }}
            className="glass-card p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mono text-[var(--text-sub)] pb-4 border-b border-[var(--border)] mb-4">
                <span className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
                  <Activity size={14} /> LIVE STATUS
                </span>
                <span>PUNE, IN</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-lime)] animate-ping" />
                  <span className="text-base font-bold text-[var(--text)]">
                    AVAILABLE FOR WORK
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">
                  Open to software engineering internships, freelance technical architecture, open-source collaborations, and full-stack positions.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs mono text-[var(--text-sub)]">
              <span>Timezone: UTC+5:30 (IST)</span>
              <span className="text-[var(--accent-lime)]">● ONLINE</span>
            </div>
          </motion.div>

          {/* Panel 2: Current Engineering Focus */}
          <motion.div
            whileHover={{ y: -3 }}
            className="glass-card p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mono text-[var(--text-sub)] pb-4 border-b border-[var(--border)] mb-4">
                <span className="flex items-center gap-1.5 text-[var(--accent-orange)] font-semibold">
                  <Cpu size={14} /> ACTIVE FOCUS VECTORS
                </span>
                <span>PRIMARY STACK</span>
              </div>
              <div className="space-y-2">
                {PROFILE.focus.map((item, idx) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-2)] text-xs mono text-[var(--text)]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[var(--accent-orange)] font-bold">0{idx + 1}</span>
                      <span>{item}</span>
                    </span>
                    <span className="text-[9px] text-[var(--text-sub)]">ACTIVE</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[10px] mono text-[var(--text-sub)]">
              <span>First-Principles Engineering</span>
              <span className="text-[var(--accent-orange)]">HIGH PRIORITY</span>
            </div>
          </motion.div>

          {/* Panel 3: Active Learning Goals & Research */}
          <motion.div
            whileHover={{ y: -3 }}
            className="glass-card p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mono text-[var(--text-sub)] pb-4 border-b border-[var(--border)] mb-4">
                <span className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
                  <Compass size={14} /> ACTIVE LAB RESEARCH
                </span>
                <span>2026 ROADMAP</span>
              </div>
              <div className="space-y-2.5 text-xs text-[var(--text-muted)] font-light">
                <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                  <div className="font-semibold text-[var(--text)] mb-0.5">
                    KV Cache Compression (adaptq)
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Researching high-performance C++ inference caching algorithms for large language models.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                  <div className="font-semibold text-[var(--text)] mb-0.5">
                    Spatial WebGL &amp; WebXR
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Optimizing 3D interactive assembly pipelines in React Three Fiber with zero dropped frames.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[10px] mono text-[var(--text-sub)]">
              <span>Continuous Discovery</span>
              <span className="text-[var(--accent)]">PROGRESSING</span>
            </div>
          </motion.div>
        </div>

        {/* Featured Projects Fast Launcher Strip */}
        <div className="mt-8 p-6 rounded-2xl glass border border-[var(--border-strong)]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border)]">
            <div className="flex items-center gap-2 mono text-xs text-[var(--text-sub)]">
              <Layers size={14} className="text-[var(--accent)]" />
              <span className="font-semibold text-[var(--text)]">FEATURED PRODUCTION SYSTEMS</span>
              <span>(4 VERIFIED PROJECTS)</span>
            </div>
            <a
              href="#projects"
              className="mono text-xs text-[var(--accent)] hover:underline flex items-center gap-1"
            >
              <span>View All 4 In Depth</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROJECTS.map(proj => (
              <div
                key={proj.id}
                className="p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent)] transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="mono text-[10px] text-[var(--accent-orange)] font-bold">
                    SYS_{proj.num}
                  </span>
                  <span className="mono text-[9px] px-2 py-0.5 rounded-full bg-[var(--surface-3)] text-[var(--accent-lime)] font-semibold">
                    {proj.status}
                  </span>
                </div>
                <div className="font-bold text-base text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {proj.name}
                </div>
                <div className="mono text-[11px] text-[var(--text-muted)] truncate mt-0.5">
                  {proj.tagline}
                </div>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-[var(--border)] text-[11px] mono">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={11} />
                  </a>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-sub)] hover:text-[var(--text)] flex items-center gap-1"
                  >
                    <GitBranch size={11} />
                    <span>Repo</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
