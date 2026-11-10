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
      key: 'aiml',
      categoryTitle: 'ai / ml systems',
      skills: SKILLS.filter(s => s.category === 'AI / ML'),
    },
    {
      key: 'tools-cs',
      categoryTitle: 'tools & cs core',
      skills: SKILLS.filter(s => s.category === 'TOOLS' || s.category === 'CS'),
    },
  ];

  return (
    <section id="skills" className="py-24 relative border-b border-[var(--border)] overflow-hidden">
      {/* Background blueprint subtle texture */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="eyebrow">the stack</span>
            <span className="mono text-[10px] text-[var(--text-sub)]">· 23 validated capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[var(--text)] tracking-tight leading-[1.15]">
            things i&apos;ll happily talk about{' '}
            <span className="font-serif-italic text-[var(--accent)] font-normal">
              until you politely leave.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-muted)] font-light mt-4 leading-relaxed max-w-2xl">
            Verified across production platforms, algorithmic challenges, and open-source software repositories.
            No superficial buzzwords—only tools with commits to back them up.
          </p>
        </div>

        {/* 5-Column Editorial Stack Layout (Parity with Rishika's .skills grid) */}
        <div className="border-t border-[var(--border)] pt-8 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-0 lg:divide-x lg:divide-[var(--border)]">
            {columns.map(col => (
              <div key={col.key} className="lg:px-6 first:pl-0 last:pr-0">
                {/* Column Eyebrow Header */}
                <div className="mono text-xs uppercase tracking-[0.08em] text-[var(--text-sub)] pb-4 border-b border-[var(--border)]/50 flex items-center justify-between">
                  <span>{col.categoryTitle}</span>
                  <span className="text-[10px] opacity-60">[{col.skills.length}]</span>
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
                          className={`group w-full text-left py-1.5 px-2 rounded-lg transition-all duration-300 flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[var(--accent)] text-black font-semibold translate-x-2'
                              : 'text-[var(--text)] hover:text-[var(--accent)] hover:translate-x-2'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                isSelected
                                  ? 'bg-black'
                                  : isHovered
                                  ? 'bg-[var(--accent)] scale-125'
                                  : 'bg-[var(--text-sub)]/40 group-hover:bg-[var(--accent)]'
                              }`}
                            />
                            <span className="text-[16px] sm:text-[17px] tracking-tight font-medium">
                              {skill.name}
                            </span>
                          </div>

                          {skill.level === 'Daily' && (
                            <span
                              className={`mono text-[9px] px-1.5 py-0.5 rounded ${
                                isSelected
                                  ? 'bg-black/20 text-black'
                                  : 'bg-[var(--surface-2)] text-[var(--text-sub)] opacity-0 group-hover:opacity-100 transition-opacity'
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
              className="mt-6 p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-md"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <span className="font-serif-italic text-2xl text-[var(--text)]">
                    {selectedSkill.name}
                  </span>
                  <span className="mono text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] font-semibold uppercase">
                    {selectedSkill.category}
                  </span>
                  <span className="mono text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--text-sub)]">
                    Proficiency: {selectedSkill.level}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedSkill(null)}
                  className="mono text-xs text-[var(--text-sub)] hover:text-[var(--text)] transition-colors self-start md:self-auto cursor-pointer"
                >
                  [DISMISS ESC]
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <p className="text-sm text-[var(--text-muted)] font-light leading-relaxed">
                    {selectedSkill.description}
                  </p>
                </div>

                <div className="border-t md:border-t-0 md:border-l border-[var(--border)] pt-4 md:pt-0 md:pl-6">
                  <div className="mono text-[10px] text-[var(--text-sub)] uppercase tracking-wider mb-2">
                    Production Systems:
                  </div>
                  {selectedSkill.associatedProjects.length === 0 ? (
                    <span className="text-xs text-[var(--text-sub)] italic">
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
                            className="inline-flex items-center gap-1 mono text-xs px-2.5 py-1 rounded-md bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text)] hover:text-[var(--accent)] transition-all"
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
