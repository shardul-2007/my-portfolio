'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin, ChevronDown } from 'lucide-react';
import { EXPERIENCE } from '@/data/portfolio';

const TYPE_COLOR: Record<string, string> = {
  'Open Source':  '#5B8DEF',
  'Internship':   '#00F5C8',
  'Part-time':    '#A78BFA',
  'Recognition':  '#F59E0B',
  'Program':      '#F59E0B',
  'Build':        '#00F5C8',
};

function typeColor(type: string): string {
  for (const [k, v] of Object.entries(TYPE_COLOR)) {
    if (type.toLowerCase().includes(k.toLowerCase())) return v;
  }
  return '#6B7280';
}

const CAT_COLOR: Record<string, string> = {
  'Open Source':  '#5B8DEF',
  'Internship':   '#00F5C8',
  'Community':    '#A78BFA',
  'Ambassador':   '#A78BFA',
  'Recognition':  '#F59E0B',
  'Campus':       '#A78BFA',
};

function catColor(cat: string): string {
  for (const [k, v] of Object.entries(CAT_COLOR)) {
    if (cat.toLowerCase().includes(k.toLowerCase())) return v;
  }
  return '#6B7280';
}

export default function Experience() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const current   = EXPERIENCE.filter(e => e.status === 'current');
  const completed = EXPERIENCE.filter(e => e.status === 'completed');

  const EntryCard = ({ exp, index }: { exp: typeof EXPERIENCE[0]; index: number }) => {
    const color   = typeColor(exp.type || exp.category);
    const isCur   = exp.status === 'current';
    const isOpen  = expanded === exp.id;

    return (
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.35) }}
        className="flex gap-5 group"
      >
        {/* Timeline dot */}
        <div className="hidden md:flex flex-col items-center flex-shrink-0 pt-4 z-10" style={{ width: 36 }}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              border: '1px solid ' + color + (isCur ? '55' : '28'),
              background: isCur ? color + '18' : 'transparent',
              boxShadow: isCur ? '0 0 16px ' + color + '22' : 'none',
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: isCur ? color : color + '60' }} />
          </div>
          {/* Connector */}
          <div className="w-px flex-1 mt-1" style={{ background: 'var(--border)', minHeight: 16 }} />
        </div>

        {/* Card */}
        <div
          className="flex-1 mb-4 rounded-2xl transition-all duration-200"
          style={{
            background: 'var(--surface)',
            border: '1px solid ' + (isOpen ? color + '35' : 'var(--border)'),
            boxShadow: isOpen ? '0 8px 32px ' + color + '12' : 'none',
            opacity: isCur ? 1 : 0.82,
          }}
        >
          {/* Header row */}
          <div className="p-5 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                {/* Role */}
                <div className="font-bold text-base md:text-lg leading-snug" style={{ color: 'var(--text)' }}>
                  {exp.role}
                </div>
                {/* Org */}
                <div className="font-semibold text-sm mt-0.5" style={{ color }}>
                  {exp.org}
                </div>
              </div>

              {/* Right meta */}
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0 text-right">
                {isCur && (
                  <span
                    className="flex items-center gap-1.5 mono text-[9px] tracking-widest px-2 py-1 rounded-full"
                    style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-glow)', color: 'var(--accent)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    PRESENT
                  </span>
                )}
                <span className="mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  {exp.startDate} — {exp.endDate}
                </span>
                {exp.type && (
                  <span
                    className="mono text-[9px] px-2 py-0.5 rounded-full tracking-widest"
                    style={{ background: color + '12', border: '1px solid ' + color + '28', color }}
                  >
                    {exp.type}
                  </span>
                )}
              </div>
            </div>

            {/* Location */}
            {exp.location && (
              <div className="flex items-center gap-1.5 mb-3">
                <MapPin size={10} style={{ color: 'var(--text-sub)' }} />
                <span className="mono text-[10px] tracking-wide" style={{ color: 'var(--text-sub)' }}>{exp.location}</span>
              </div>
            )}

            {/* Category badge */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span
                className="mono text-[9px] tracking-widest px-2 py-0.5 rounded"
                style={{ background: catColor(exp.category) + '12', color: catColor(exp.category), border: '1px solid ' + catColor(exp.category) + '25' }}
              >
                {exp.category}
              </span>
              {exp.recognition && (
                <span className="mono text-[9px] tracking-widest px-2 py-0.5 rounded text-[var(--accent)]"
                  style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-glow)' }}>
                  {exp.recognition}
                </span>
              )}
            </div>

            {/* Expand toggle if there's description/skills/proof */}
            {(exp.description || (exp.skills && exp.skills.length > 0) || exp.proof || exp.proofType || exp.link) && (
              <button
                onClick={() => setExpanded(isOpen ? null : exp.id)}
                className="flex items-center gap-1.5 mt-3 text-xs transition-colors hover:opacity-100"
                style={{ color: 'var(--text-sub)', opacity: 0.7 }}
                aria-expanded={isOpen}
              >
                <span className="mono text-[10px] tracking-widest">{isOpen ? 'LESS' : 'MORE'}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={12} />
                </motion.span>
              </button>
            )}
          </div>

          {/* Expanded detail */}
          {isOpen && (
            <div className="px-5 md:px-6 pb-5 border-t border-[var(--border)]">
              {exp.description && (
                <p className="text-sm leading-relaxed mt-4 mb-3" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
                  {exp.description}
                </p>
              )}
              {exp.skills && exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {exp.skills.map(s => (
                    <span key={s} className="mono text-[10px] px-2 py-1 rounded-lg"
                      style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {(exp.proof || exp.proofType) && (
                <div className="flex items-center gap-3 mt-3">
                  <span className="mono text-[9px] tracking-widest" style={{ color: 'var(--text-sub)' }}>PROOF</span>
                  {exp.proof ? (
                    <a
                      href={`https://www.linkedin.com/in/shardul-parihar/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 mono text-[10px] tracking-widest hover:text-[var(--accent)] transition-colors"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <ExternalLink size={10} />
                      View on LinkedIn
                    </a>
                  ) : (
                    <span className="mono text-[10px]" style={{ color: 'var(--text-sub)' }}>{exp.proofType}</span>
                  )}
                </div>
              )}
              {exp.link && (
                <a href={exp.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 mono text-[10px] tracking-widest hover:text-[var(--accent)] transition-colors"
                  style={{ color: 'var(--text-muted)' }}>
                  <ExternalLink size={10} /> View project
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="experience" className="py-28 relative" style={{ background: 'var(--bg)' }}>
      <div className="section-container">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 opacity-60" style={{ background: 'var(--accent)' }} />
            <span className="sys-label-accent">MY JOURNEY</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text)' }}>
            Experience &amp;<br /><span className="gradient-text">Contributions</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--text-muted)' }}>
            Open source, campus programs, and community roles across the developer ecosystem.
          </p>

          {/* Counts */}
          <div className="flex flex-wrap gap-6 mt-6">
            {[
              { val: current.length,   label: 'Active' },
              { val: completed.length, label: 'Completed' },
              { val: EXPERIENCE.length, label: 'Total' },
            ].map(s => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="mono text-2xl font-bold" style={{ color: 'var(--accent)' }}>{s.val}</span>
                <span className="mono text-xs" style={{ color: 'var(--text-sub)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CURRENT ─────────────────────────────────────── */}
        {current.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
              <span className="mono text-xs tracking-[0.18em]" style={{ color: 'var(--accent)' }}>CURRENT ROLES</span>
              <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
            </div>
            <div className="relative">
              <div className="absolute top-0 bottom-0 hidden md:block" style={{ left: 17, width: 1, background: 'linear-gradient(to bottom, var(--accent), rgba(0,245,200,0.15), transparent)' }} />
              {current.map((exp, i) => <EntryCard key={exp.id} exp={exp} index={i} />)}
            </div>
          </div>
        )}

        {/* ── COMPLETED ────────────────────────────────────── */}
        {completed.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--text-sub)' }} />
              <span className="mono text-xs tracking-[0.18em]" style={{ color: 'var(--text-sub)' }}>COMPLETED</span>
              <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
            </div>
            <div className="relative">
              <div className="absolute top-0 bottom-0 hidden md:block" style={{ left: 17, width: 1, background: 'var(--border)' }} />
              {completed.map((exp, i) => <EntryCard key={exp.id} exp={exp} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}