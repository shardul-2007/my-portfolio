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
    <section id="command-center" className="py-24 relative bg-[#F8F5F1] text-[#171416] border-b border-[#E5DDDA] tech-grid overflow-hidden">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
              <span className="mono text-xs font-bold uppercase tracking-[0.16em] text-[#D9363E]">
                COMMAND DECK // TELEMETRY &amp; STATUS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416]">
              ENGINEERING <span className="text-[#D9363E]">COMMAND CENTER</span>
            </h2>
            <p className="text-sm text-[#81777A] max-w-xl mt-2 font-normal leading-relaxed">
              Real-time snapshot of active systems, technical focus vectors, learning goals, and project launchers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                labAudio.playClick(900);
                onOpenCommand();
              }}
              className="inline-flex items-center gap-2 mono text-xs px-4 py-2 rounded-full bg-white border border-[#E5DDDA] text-[#171416] hover:border-[#D9363E] hover:text-[#D9363E] font-bold transition-all shadow-xs cursor-pointer"
            >
              <Terminal size={14} className="text-[#D9363E]" />
              <span>COMMAND PALETTE [⌘K]</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Panel 1: Live Status & Location */}
          <motion.div
            whileHover={{ y: -3 }}
            className="p-6 rounded-3xl bg-white border border-[#E5DDDA] shadow-[0_4px_20px_rgba(23,20,22,0.03)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mono text-[#81777A] pb-4 border-b border-[#E5DDDA] mb-4">
                <span className="flex items-center gap-1.5 text-[#D9363E] font-bold">
                  <Activity size={14} /> LIVE STATUS
                </span>
                <span>PUNE, IN</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                  <span className="text-base font-bold text-[#171416]">
                    AVAILABLE FOR WORK
                  </span>
                </div>
                <p className="text-xs text-[#81777A] leading-relaxed font-normal">
                  Open to software engineering internships, open-source collaborations, and full-stack positions starting immediately.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5DDDA] flex items-center justify-between text-xs mono text-[#81777A]">
              <span>Timezone: UTC+5:30 (IST)</span>
              <span className="text-[#10B981] font-bold">● ONLINE</span>
            </div>
          </motion.div>

          {/* Panel 2: Current Engineering Focus */}
          <motion.div
            whileHover={{ y: -3 }}
            className="p-6 rounded-3xl bg-white border border-[#E5DDDA] shadow-[0_4px_20px_rgba(23,20,22,0.03)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mono text-[#81777A] pb-4 border-b border-[#E5DDDA] mb-4">
                <span className="flex items-center gap-1.5 text-[#D9363E] font-bold">
                  <Cpu size={14} /> ACTIVE FOCUS VECTORS
                </span>
                <span>PRIMARY STACK</span>
              </div>
              <div className="space-y-2">
                {PROFILE.focus.map((item, idx) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8F5F1] border border-[#E5DDDA] text-xs mono text-[#171416]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[#D9363E] font-bold">0{idx + 1}</span>
                      <span className="font-semibold">{item}</span>
                    </span>
                    <span className="text-[10px] text-[#81777A] font-bold">ACTIVE</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E5DDDA] flex items-center justify-between text-[10px] mono text-[#81777A]">
              <span>First-Principles Engineering</span>
              <span className="text-[#D9363E] font-bold">HIGH PRIORITY</span>
            </div>
          </motion.div>

          {/* Panel 3: Active Learning Goals & Research */}
          <motion.div
            whileHover={{ y: -3 }}
            className="p-6 rounded-3xl bg-white border border-[#E5DDDA] shadow-[0_4px_20px_rgba(23,20,22,0.03)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mono text-[#81777A] pb-4 border-b border-[#E5DDDA] mb-4">
                <span className="flex items-center gap-1.5 text-[#D9363E] font-bold">
                  <Compass size={14} /> ACTIVE LAB RESEARCH
                </span>
                <span>2026 ROADMAP</span>
              </div>
              <div className="space-y-2.5 text-xs text-[#81777A]">
                <div className="p-3.5 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA]">
                  <div className="font-bold text-[#171416] mb-0.5">
                    KV Cache Compression (adaptq)
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Researching high-performance C++ inference caching algorithms for large language models.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA]">
                  <div className="font-bold text-[#171416] mb-0.5">
                    Spatial WebGL &amp; WebXR
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Optimizing 3D interactive assembly pipelines in React Three Fiber with zero dropped frames.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E5DDDA] flex items-center justify-between text-[10px] mono text-[#81777A]">
              <span>Continuous Discovery</span>
              <span className="text-[#D9363E] font-bold">PROGRESSING</span>
            </div>
          </motion.div>
        </div>

        {/* Featured Projects Fast Launcher Strip */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DDDA] shadow-[0_4px_20px_rgba(23,20,22,0.03)]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5DDDA]">
            <div className="flex items-center gap-2 mono text-xs text-[#81777A]">
              <Layers size={14} className="text-[#D9363E]" />
              <span className="font-bold text-[#171416]">FEATURED PRODUCTION SYSTEMS</span>
              <span>(4 VERIFIED PROJECTS)</span>
            </div>
            <a
              href="#projects"
              className="mono text-xs text-[#D9363E] hover:underline font-bold flex items-center gap-1"
            >
              <span>View All 4 In Depth</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROJECTS.map(proj => (
              <div
                key={proj.id}
                className="p-4 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] hover:border-[#D9363E] transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="mono text-[10px] text-[#D9363E] font-bold">
                    SYS_{proj.num}
                  </span>
                  <span className="mono text-[9px] px-2 py-0.5 rounded-full bg-white text-[#10B981] font-bold border border-[#E5DDDA]">
                    {proj.status}
                  </span>
                </div>
                <div className="font-bold text-base text-[#171416] group-hover:text-[#D9363E] transition-colors">
                  {proj.name}
                </div>
                <div className="mono text-[11px] text-[#81777A] truncate mt-0.5">
                  {proj.tagline}
                </div>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#E5DDDA] text-[11px] mono">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D9363E] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={11} />
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#81777A] hover:text-[#171416] flex items-center gap-1 font-semibold"
                    >
                      <GitBranch size={11} />
                      <span>Repo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
