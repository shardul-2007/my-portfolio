'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpRight, CheckCircle2, Terminal } from 'lucide-react';
import { SKILLS, SkillItem } from '@/data/skills';
import { PROJECTS } from '@/data/projects';
import { labAudio } from '@/lib/audio';

interface SkillColumn {
  key: string;
  categoryTitle: string;
  skills: SkillItem[];
}

export default function SkillsConstellation() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  // Group the 23 skills into 5 editorial columns matching Rishika's "the stack" layout
  const columns: SkillColumn[] = [
    {
      key: 'languages',
      categoryTitle: 'languages',
      skills: SKILLS.filter(s => s.category === 'LANGUAGES'),
    },
    {
      key: 'frontend',
      categoryTitle: 'web / frontend',
      skills: SKILLS.filter(s => s.category === 'FRONTEND'),
    },
    {
      key: 'backend-security',
      categoryTitle: 'backend & api',
      skills: SKILLS.filter(s => s.category === 'BACKEND' || s.category === 'SECURITY'),
    },
    {
      key: 'ai-experiments',
      categoryTitle: 'ai experiments',
      skills: SKILLS.filter(s => s.category === 'AI / ML'),
    },
    {
      key: 'tools-cs',
      categoryTitle: 'tools & cs core',
      skills: SKILLS.filter(s => s.category === 'TOOLS' || s.category === 'CS'),
    },
  ];

  return (
    <section id="skills" className="py-24 relative bg-[#F8F5F1] text-[#171416] border-b border-[#E5DDDA] tech-grid overflow-hidden">
      <div className="section-container relative z-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
            <span className="mono text-xs font-bold uppercase tracking-[0.16em] text-[#D9363E]">
              WHAT I WORK WITH
            </span>
            <span className="mono text-[10px] text-[#81777A]">· 23 validated capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#171416] tracking-tight leading-[1.15]">
            TOOLS I USE. <br />
            <span className="font-serif italic text-[#D9363E] font-normal">
              Skills I keep sharpening.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#81777A] font-normal mt-4 leading-relaxed max-w-2xl">
            A growing toolkit built through projects, experimentation, problem-solving and continuous learning.
          </p>
        </div>

        {/* 5-Column Editorial Stack Layout (Parity with Rishika's .skills grid) */}
        <div className="border-t border-[#E5DDDA] pt-8 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-0 lg:divide-x lg:divide-[#E5DDDA]">
            {columns.map(col => (
              <div key={col.key} className="lg:px-6 first:pl-0 last:pr-0">
                {/* Column Eyebrow Header */}
                <div className="mono text-xs uppercase tracking-[0.08em] text-[#81777A] font-bold pb-4 border-b border-[#E5DDDA] flex items-center justify-between">
                  <span>{col.categoryTitle}</span>
                  <span className="text-[10px] text-[#D9363E]">[{col.skills.length}]</span>
                </div>

                {/* Skill List Items */}
                <ul className="mt-5 space-y-2.5">
                  {col.skills.map(skill => {
                    const isSelected = selectedSkill?.id === skill.id;
                    const isHovered = hoveredSkillId === skill.id;

                    return (
                      <li key={skill.id}>
                        <button
                          type="button"
                          onClick={() => {
                            labAudio.playClick(950);
                            setSelectedSkill(isSelected ? null : skill);
                          }}
                          onMouseEnter={() => {
                            setHoveredSkillId(skill.id);
                            labAudio.playHover();
                          }}
                          onMouseLeave={() => setHoveredSkillId(null)}
                          className={`group w-full text-left py-1.5 px-2.5 rounded-xl transition-all duration-300 flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[#D9363E] text-white font-bold translate-x-1.5 shadow-[0_4px_16px_rgba(217,54,62,0.25)]'
                              : 'text-[#171416] hover:text-[#D9363E] hover:bg-[#FDF6F6] hover:translate-x-1'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                isSelected
                                  ? 'bg-white'
                                  : isHovered
                                  ? 'bg-[#D9363E] scale-125'
                                  : 'bg-[#81777A]/40 group-hover:bg-[#D9363E]'
                              }`}
                            />
                            <span className="text-[15px] sm:text-[16px] tracking-tight font-medium">
                              {skill.name}
                            </span>
                          </div>

                          {skill.level === 'Daily' && (
                            <span
                              className={`mono text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${
                                isSelected
                                  ? 'bg-white/20 text-white'
                                  : 'bg-[#F1ECE8] text-[#81777A] group-hover:text-[#D9363E] transition-colors'
                              }`}
                            >
                              core
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Skill Telemetry Drawer (Minimal & Editorial) */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
              className="mt-6 p-6 sm:p-8 rounded-3xl border border-[#E5DDDA] bg-white shadow-[0_8px_30px_rgba(23,20,22,0.06)]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E5DDDA]">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-serif italic text-2xl font-bold text-[#171416]">
                    {selectedSkill.name}
                  </span>
                  <span className="mono text-[11px] px-3 py-1 rounded-full bg-[#FDF6F6] border border-[#F2D2D4] text-[#D9363E] font-bold uppercase">
                    {selectedSkill.category}
                  </span>
                  <span className="mono text-[11px] px-3 py-1 rounded-full bg-[#F8F5F1] border border-[#E5DDDA] text-[#81777A] font-semibold">
                    Proficiency: {selectedSkill.level}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedSkill(null)}
                  className="mono text-xs text-[#81777A] hover:text-[#D9363E] font-bold transition-colors self-start md:self-auto cursor-pointer"
                >
                  [DISMISS ESC]
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <p className="text-sm text-[#81777A] font-normal leading-relaxed">
                    {selectedSkill.description}
                  </p>
                </div>

                <div className="border-t md:border-t-0 md:border-l border-[#E5DDDA] pt-4 md:pt-0 md:pl-6">
                  <div className="mono text-[10px] text-[#81777A] uppercase font-bold tracking-wider mb-2">
                    Production Systems:
                  </div>
                  {selectedSkill.associatedProjects.length === 0 ? (
                    <span className="text-xs text-[#81777A] italic">
                      Algorithmic rigor & foundational CS problem solving.
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.associatedProjects.map(projId => {
                        const proj = PROJECTS.find(p => p.id === projId);
                        if (!proj) return null;
                        return (
                          <a
                            key={proj.id}
                            href="#projects"
                            className="inline-flex items-center gap-1 mono text-xs px-3 py-1 rounded-full bg-[#F8F5F1] border border-[#E5DDDA] hover:border-[#D9363E] text-[#171416] hover:text-[#D9363E] transition-all"
                          >
                            <span>{proj.name}</span>
                            <ArrowUpRight size={11} />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
