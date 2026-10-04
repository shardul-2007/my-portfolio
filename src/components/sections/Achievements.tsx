'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { ACHIEVEMENTS } from '@/data/portfolio';

const CAT_COLOR: Record<string, string> = {
  'Student Program':    '#4285F4',
  'Open Source':        '#5B8DEF',
  'Community':          '#A78BFA',
  'Ambassador':         '#A78BFA',
  'Campus Ambassador':  '#A78BFA',
  'Recognition':        '#F59E0B',
  'Representation':     '#F59E0B',
  'Education':          '#2EC866',
  'Career':             '#00F5C8',
  'Event':              '#F59E0B',
  'Coding':             '#2EC866',
};

function catColor(cat: string) {
  for (const [k, v] of Object.entries(CAT_COLOR)) {
    if (cat.toLowerCase().includes(k.toLowerCase())) return v;
  }
  return '#6B7280';
}

export default function Achievements() {
  const [proofModal, setProofModal] = useState(false);
  const featured   = ACHIEVEMENTS.filter(a => a.featured);
  const supporting = ACHIEVEMENTS.filter(a => !a.featured);

  const Card = ({ ach, i }: { ach: typeof ACHIEVEMENTS[0]; i: number }) => {
    const color = catColor(ach.category);
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.45) }}
        whileHover={{ y: -3 }}
        className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Category pill */}
        <div className="flex items-start justify-between gap-2">
          <span
            className="mono text-[9px] tracking-[0.12em] px-2 py-1 rounded"
            style={{ background: color + '14', border: '1px solid ' + color + '28', color }}
          >
            {ach.category}
          </span>
          <span className="mono text-[10px]" style={{ color: 'var(--text-sub)' }}>{ach.year}</span>
        </div>

        {/* Role — always visible */}
        <div>
          <div className="font-bold text-sm leading-snug" style={{ color: 'var(--text)' }}>
            {ach.title}
          </div>
          <div className="font-medium text-xs mt-1" style={{ color }}>
            {ach.org}
          </div>
        </div>

        {ach.description && (
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
            {ach.description}
          </p>
        )}

        {/* Proof */}
        {ach.proofType && (
          <div className="flex items-center gap-2 mt-auto">
            <div className="w-1 h-1 rounded-full" style={{ background: color }} />
            <span className="mono text-[9px] tracking-widest" style={{ color: 'var(--text-sub)' }}>{ach.proofType}</span>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <section id="achievements" className="py-28 relative" style={{ background: 'var(--bg)' }}>
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 opacity-60" style={{ background: 'var(--accent)' }} />
            <span className="sys-label-accent">ACHIEVEMENTS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: 'var(--text)' }}>
            Credentials &amp;<br /><span className="gradient-text">Contributions</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--text-muted)' }}>
            Selected contributions, programs, community roles and documented credentials.
          </p>

          {/* Proof CTA */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <button
              onClick={() => setProofModal(true)}
              className="glow-btn glow-btn-ghost text-xs"
            >
              <ExternalLink size={12} /> View All Proofs &amp; Credentials on LinkedIn
            </button>
          </div>
        </motion.div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
              <span className="mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>FEATURED</span>
              <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((a, i) => <Card key={a.id} ach={a} i={i} />)}
            </div>
          </div>
        )}

        {/* Supporting */}
        {supporting.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--text-sub)' }} />
              <span className="mono text-xs tracking-widest" style={{ color: 'var(--text-sub)' }}>MORE</span>
              <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {supporting.map((a, i) => <Card key={a.id} ach={a} i={i} />)}
            </div>
          </div>
        )}
      </div>

      {/* Proof modal */}
      <AnimatePresence>
        {proofModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-end md:items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
            onClick={() => setProofModal(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="relative rounded-3xl p-7 w-full max-w-md max-h-[85vh] overflow-y-auto"
              style={{
                background: 'rgba(8,12,24,0.97)',
                border: '1px solid var(--border-glow)',
                boxShadow: '0 0 80px rgba(0,245,200,0.08)',
              }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setProofModal(false)}
                className="absolute top-4 right-4 glass rounded-lg p-1.5 hover:text-[var(--accent)] transition-colors"
                aria-label="Close">
                <X size={14} />
              </button>

              <div className="mono text-[10px] tracking-[0.2em] mb-1" style={{ color: 'var(--accent)' }}>CREDENTIALS</div>
              <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>Offer Letters, Badges &amp; Certificates</h3>
              <p className="text-xs mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                All proofs are documented on my LinkedIn profile — visit the Experience section to view them.
              </p>

              <div className="flex flex-col gap-2 mb-6">
                {ACHIEVEMENTS.filter(a => a.proofType).map(a => (
                  <div key={a.id} className="flex items-start gap-3 py-2 border-b border-[var(--border)]">
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: catColor(a.category) }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs leading-snug" style={{ color: 'var(--text)' }}>{a.title}</div>
                      <div className="mono text-[9px] mt-0.5" style={{ color: 'var(--text-sub)' }}>{a.org} · {a.proofType}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://www.linkedin.com/in/shardul-parihar/"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn glow-btn-primary w-full justify-center"
              >
                <ExternalLink size={13} /> View on LinkedIn
              </a>
              <p className="text-center text-xs mt-5 italic" style={{ color: 'var(--text-sub)' }}>
                Thank you for visiting SHARDUL.OS
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}