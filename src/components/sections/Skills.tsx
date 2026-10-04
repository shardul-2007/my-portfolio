'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '@/data/portfolio';

const GROUPS = [
  { key: 'Frontend',      label: 'Frontend',    color: '#00F5C8', desc: 'UI & interfaces' },
  { key: 'Languages',     label: 'Languages',   color: '#5B8DEF', desc: 'Core programming' },
  { key: 'Backend',       label: 'Backend',     color: '#A78BFA', desc: 'Server & APIs' },
  { key: 'AI',            label: 'AI / ML',     color: '#F59E0B', desc: 'Intelligent systems' },
  { key: 'Tools',         label: 'Tools',       color: '#6B7280', desc: 'Dev workflow' },
  { key: 'CS',            label: 'CS',          color: '#00F5C8', desc: 'Fundamentals' },
  { key: 'Cybersecurity', label: 'Security',    color: '#EF4444', desc: 'Cyber & infosec' },
];

const LEVEL: Record<string, { dot: string; label: string }> = {
  primary:   { dot: 'var(--accent)',             label: 'Daily'      },
  secondary: { dot: 'rgba(255,255,255,0.35)',     label: 'Proficient' },
  learning:  { dot: 'rgba(255,255,255,0.14)',     label: 'Learning'   },
};

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const visibleGroups = activeGroup
    ? GROUPS.filter(g => g.key === activeGroup)
    : GROUPS;

  return (
    <section id="skills" className="py-28 relative" style={{ background: 'var(--bg)' }}>
      <div className="section-container">

        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 opacity-60" style={{ background: 'var(--accent)' }} />
            <span className="sys-label-accent">WHAT I WORK WITH</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Tech Stack &amp;<br /><span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: 'var(--text-muted)' }}>
            Built through real projects. Dot colour shows depth of use.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-5 mb-8">
            {Object.entries(LEVEL).map(([, { dot, label }]) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
                <span className="mono text-[10px]" style={{ color: 'var(--text-sub)' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveGroup(null)}
              className="mono text-[10px] tracking-widest px-3 py-1.5 rounded-full transition-all"
              style={{
                background: !activeGroup ? 'var(--accent-dim)' : 'var(--surface)',
                border: !activeGroup ? '1px solid var(--border-glow)' : '1px solid var(--border)',
                color: !activeGroup ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              ALL
            </button>
            {GROUPS.map(g => (
              <button
                key={g.key}
                onClick={() => setActiveGroup(activeGroup === g.key ? null : g.key)}
                className="mono text-[10px] tracking-widest px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: activeGroup === g.key ? g.color + '18' : 'var(--surface)',
                  border: activeGroup === g.key ? '1px solid ' + g.color + '40' : '1px solid var(--border)',
                  color: activeGroup === g.key ? g.color : 'var(--text-muted)',
                }}
              >
                {g.label.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Skill rows ─────────────────────────────────────────── */}
        <div className="flex flex-col" style={{ gap: '1px', background: 'var(--border)' }}>
          {visibleGroups.map((group, gi) => {
            const groupSkills = SKILLS.filter(s => s.category === group.key);
            if (!groupSkills.length) return null;
            return (
              <motion.div
                key={group.key}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.05 }}
                className="flex flex-col sm:flex-row sm:items-start gap-4 py-5 px-5"
                style={{ background: 'var(--bg)' }}
              >
                {/* Left: category label */}
                <div className="flex-shrink-0 sm:w-36 flex sm:flex-col gap-2 sm:gap-1 items-start pt-0.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: group.color }} />
                    <span className="mono font-semibold text-[11px] tracking-[0.12em]" style={{ color: group.color }}>
                      {group.label.toUpperCase()}
                    </span>
                  </div>
                  <span className="mono text-[9px] tracking-wide sm:pl-4" style={{ color: 'var(--text-sub)' }}>
                    {group.desc}
                  </span>
                </div>

                {/* Right: inline skill chips */}
                <div className="flex flex-wrap gap-2 flex-1">
                  {groupSkills.map((skill, si) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: si * 0.04 }}
                      whileHover={{ y: -1 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-150 cursor-default"
                      style={{
                        background: skill.level === 'primary' ? group.color + '12' : 'var(--surface)',
                        border: skill.level === 'primary'
                          ? '1px solid ' + group.color + '30'
                          : '1px solid var(--border)',
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: LEVEL[skill.level].dot }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: skill.level === 'primary' ? 'var(--text)' : 'var(--text-muted)' }}
                      >
                        {skill.name}
                      </span>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer count */}
        <div className="flex justify-end mt-4">
          <span className="mono text-[9px] tracking-widest" style={{ color: 'var(--text-sub)' }}>
            {SKILLS.length} SKILLS ACROSS {GROUPS.length} CATEGORIES
          </span>
        </div>
      </div>
    </section>
  );
}