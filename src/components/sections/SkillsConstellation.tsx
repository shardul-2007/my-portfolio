'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Search,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { SKILLS, SKILL_CATEGORIES, SkillCategory, SkillItem } from '@/data/skills';
import { PROJECTS } from '@/data/projects';
import { labAudio } from '@/lib/audio';

export default function SkillsConstellation() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const filteredSkills = SKILLS.filter(skill => {
    const matchesCategory = activeCategory === 'ALL' || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const LEVEL_COLORS: Record<string, { label: string; dotColor: string }> = {
    Daily: { label: 'Daily Core', dotColor: 'var(--accent)' },
    Proficient: { label: 'Proficient', dotColor: '#38BDF8' },
    Learning: { label: 'Active Exploration', dotColor: '#F59E0B' },
  };

  return (
    <section id="skills" className="py-28 relative border-b border-[var(--border)] overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-[var(--accent)]" />
            <span className="sys-label-accent">CONSTELLATION // 23 VALIDATED CAPABILITIES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)] font-editorial">
            What I <span className="gradient-text">Work With.</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] font-light mt-3 leading-relaxed">
            Exactly 23 technical capabilities honed across production platforms, algorithmic challenges, and open-source software repositories.
          </p>

          {/* Level Legend */}
          <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-[var(--border)] text-xs mono text-[var(--text-sub)]">
            <span className="font-semibold text-[var(--text)]">PROFICIENCY DEPTH:</span>
            {Object.entries(LEVEL_COLORS).map(([lvl, { label, dotColor }]) => (
              <div key={lvl} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: dotColor }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                labAudio.playClick(900);
                setActiveCategory('ALL');
              }}
              className={`mono text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                activeCategory === 'ALL'
                  ? 'bg-[var(--accent)] text-black font-bold shadow-[0_0_12px_var(--accent-glow)]'
                  : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
              }`}
            >
              ALL ({SKILLS.length})
            </button>
            {SKILL_CATEGORIES.map(cat => {
              const count = SKILLS.filter(s => s.category === cat.key).length;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    labAudio.playClick(950);
                    setActiveCategory(cat.key);
                  }}
                  className={`mono text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                    isActive
                      ? 'bg-[var(--text)] text-[var(--text-dark)] font-bold'
                      : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="ml-1 text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-sub)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search 23 skills..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs mono text-[var(--text)] placeholder-[var(--text-sub)] outline-none focus:border-[var(--accent)] transition-all"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredSkills.map(skill => {
            const isSelected = selectedSkill?.id === skill.id;
            const levelInfo = LEVEL_COLORS[skill.level] || LEVEL_COLORS.Daily;

            return (
              <motion.div
                key={skill.id}
                layout
                onClick={() => {
                  labAudio.playClick(1000);
                  setSelectedSkill(isSelected ? null : skill);
                }}
                onMouseEnter={() => labAudio.playHover()}
                className={`p-4 rounded-2xl glass transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-[var(--border-glow)] bg-[var(--surface-2)] shadow-[0_8px_30px_rgba(0,245,200,0.12)]'
                    : 'border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: levelInfo.dotColor }}
                    />
                    <span className="font-bold text-sm text-[var(--text)]">
                      {skill.name}
                    </span>
                  </div>
                  <span className="mono text-[9px] px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--text-sub)]">
                    {skill.category}
                  </span>
                </div>

                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed line-clamp-2">
                  {skill.description}
                </p>

                {/* Connected Projects Indicator */}
                {skill.associatedProjects.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[10px] mono text-[var(--text-sub)]">
                    <span>USED IN PROJECTS:</span>
                    <span className="text-[var(--accent)] font-semibold">
                      {skill.associatedProjects.length} System{skill.associatedProjects.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Deep Skill Inspector Drawer */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="mt-8 p-6 sm:p-8 rounded-3xl glass border border-[var(--border-strong)] bg-[var(--bg-elevated)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--border)] mb-4 gap-2">
                <div className="flex items-center gap-3">
                  <div className="text-xl font-bold text-[var(--text)]">
                    {selectedSkill.name}
                  </div>
                  <span className="mono text-xs px-2.5 py-1 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] font-semibold">
                    {selectedSkill.category}
                  </span>
                  <span className="mono text-xs px-2.5 py-1 rounded-full bg-[var(--surface-3)] text-[var(--text)]">
                    {selectedSkill.level}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="mono text-xs text-[var(--text-sub)] hover:text-[var(--text)] self-start sm:self-auto cursor-pointer"
                >
                  CLOSE INSPECTOR [×]
                </button>
              </div>

              <p className="text-sm sm:text-base text-[var(--text-muted)] font-light leading-relaxed max-w-2xl mb-6">
                {selectedSkill.description}
              </p>

              {/* Connected Production Systems */}
              <div>
                <div className="mono text-xs text-[var(--text-sub)] uppercase tracking-wider mb-3">
                  PRODUCTION SYSTEM PROOF:
                </div>
                {selectedSkill.associatedProjects.length === 0 ? (
                  <div className="text-xs mono text-[var(--text-sub)] italic">
                    Core computer science foundation / algorithm challenge applications.
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedSkill.associatedProjects.map(projId => {
                      const proj = PROJECTS.find(p => p.id === projId);
                      if (!proj) return null;
                      return (
                        <a
                          key={proj.id}
                          href="#projects"
                          className="p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent)] transition-all flex items-center justify-between group"
                        >
                          <div>
                            <div className="font-semibold text-xs text-[var(--text)] group-hover:text-[var(--accent)]">
                              {proj.name}
                            </div>
                            <div className="mono text-[10px] text-[var(--text-sub)]">
                              {proj.category}
                            </div>
                          </div>
                          <ArrowUpRight size={14} className="text-[var(--accent)]" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
