'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitCommit,
  GitBranch,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { EXPERIENCES, ExperienceItem } from '@/data/experience';
import { PROFILE } from '@/data/profile';
import { labAudio } from '@/lib/audio';

export default function ExperienceTimeline() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'opensource' | 'campus'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = EXPERIENCES.filter(exp => {
    if (filter === 'active') return exp.status === 'active';
    if (filter === 'completed') return exp.status === 'completed';
    if (filter === 'opensource') return exp.category.toLowerCase().includes('open source');
    if (filter === 'campus') return exp.category.toLowerCase().includes('ambassador') || exp.category.toLowerCase().includes('campus');
    return true;
  });

  const activeCount = EXPERIENCES.filter(e => e.status === 'active').length;
  const completedCount = EXPERIENCES.filter(e => e.status === 'completed').length;

  return (
    <section id="experience" className="py-28 relative border-b border-[var(--border)] overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch size={14} className="text-[var(--accent)]" />
            <span className="eyebrow">the journey · git log --graph</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)] font-editorial">
            release notes <span className="font-serif-italic font-normal text-amber-500">for</span> shardul.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] font-light mt-3 leading-relaxed">
            every version so far, on one branch graph. breaking changes documented, known issues disclosed, and no version was skipped. unlike windows 9.
          </p>

          {/* Git HUD Banner matching Rishika Reference */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 p-4 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-amber-500 font-bold">HEAD →</span>
              <span className="px-2 py-0.5 rounded bg-[var(--accent)] text-black font-bold">v0.6-prod</span>
              <span className="text-[var(--text-sub)]">2026</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]">main-release</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[var(--accent)]" /> main</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> work</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> side-quests</span>
              <span className="text-[var(--text)] font-bold">commit 01/17</span>
            </div>
          </div>

          {/* Counts Bar */}
          <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-[var(--border)] text-xs mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-lime)] animate-pulse" />
              <span className="text-[var(--text)] font-bold">{activeCount} ACTIVE ROLES</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-sub)]" />
              <span className="text-[var(--text-muted)]">{completedCount} COMPLETED ROLES</span>
            </div>
            <div className="text-[var(--accent)] font-semibold">
              TOTAL: {EXPERIENCES.length} VERIFIED NODES
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {[
            { id: 'all', label: `ALL NODES (${EXPERIENCES.length})` },
            { id: 'active', label: `ACTIVE (${activeCount})` },
            { id: 'completed', label: `COMPLETED (${completedCount})` },
            { id: 'opensource', label: 'OPEN SOURCE' },
            { id: 'campus', label: 'CAMPUS & AMBASSADOR' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                labAudio.playClick(900);
                setFilter(tab.id as typeof filter);
              }}
              className={`mono text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                filter === tab.id
                  ? 'bg-[var(--accent)] text-black font-bold shadow-[0_0_12px_var(--accent-glow)]'
                  : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Git Tree Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-6">
          {/* Vertical Branch Stem Line */}
          <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[var(--accent-lime)] via-[var(--accent)] to-[var(--border)]" />

          {filtered.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            const isActive = item.status === 'active';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="relative group"
              >
                {/* Commit Dot Node */}
                <div
                  className={`absolute -left-[23px] sm:-left-[31px] top-5 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isActive
                      ? 'bg-[#080B12] border-[var(--accent-lime)] shadow-[0_0_10px_var(--accent-lime)] text-[var(--accent-lime)]'
                      : 'bg-[#080B12] border-[var(--border-strong)] text-[var(--text-sub)]'
                  }`}
                >
                  <GitCommit size={13} />
                </div>

                {/* Timeline Card */}
                <div
                  className={`rounded-2xl glass transition-all border ${
                    isExpanded
                      ? 'border-[var(--border-glow)] bg-[var(--surface-2)] shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
                      : 'border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full"
                            style={{
                              background: `${item.accentColor}18`,
                              color: item.accentColor,
                              border: `1px solid ${item.accentColor}35`,
                            }}
                          >
                            {item.category}
                          </span>
                          {isActive && (
                            <span className="mono text-[9px] px-2 py-0.5 rounded-full bg-[rgba(16,185,129,0.15)] text-[var(--accent-lime)] font-bold border border-[rgba(16,185,129,0.3)] flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)] animate-pulse" />
                              PRESENT ACTIVE
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-[var(--text)] font-editorial">
                          {item.role}
                        </h3>

                        <div className="text-sm font-semibold text-[var(--accent)]">
                          {item.org}
                        </div>
                      </div>

                      {/* Timeline & Location */}
                      <div className="sm:text-right space-y-1 flex-shrink-0">
                        <div className="flex items-center sm:justify-end gap-1.5 mono text-xs text-[var(--text)] font-semibold">
                          <Calendar size={12} className="text-[var(--text-sub)]" />
                          <span>{item.startDate} — {item.endDate}</span>
                        </div>
                        {item.location && (
                          <div className="flex items-center sm:justify-end gap-1.5 mono text-[10px] text-[var(--text-sub)]">
                            <MapPin size={11} />
                            <span>{item.location}</span>
                          </div>
                        )}
                        {item.type && (
                          <div className="mono text-[9px] text-[var(--text-sub)]">
                            TYPE: {item.type.toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light leading-relaxed mt-3 pt-3 border-t border-[var(--border)]">
                      {item.description}
                    </p>

                    {/* Expand Toggle */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        onClick={() => {
                          labAudio.playClick(900);
                          setExpandedId(isExpanded ? null : item.id);
                        }}
                        className="mono text-xs text-[var(--text-sub)] hover:text-[var(--text)] flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isExpanded ? 'LESS DETAILS' : 'VIEW VERIFIED DETAILS & SKILLS'}</span>
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* Direct LinkedIn Proof Link */}
                      <a
                        href={PROFILE.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono text-[11px] text-[var(--accent)] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Verify on LinkedIn</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>

                    {/* Expanded Drawer */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-4 pt-4 border-t border-[var(--border)] space-y-3 overflow-hidden text-xs"
                        >
                          {item.skills && item.skills.length > 0 && (
                            <div>
                              <div className="mono text-[10px] text-[var(--text-sub)] uppercase mb-1.5">
                                ASSOCIATED CAPABILITIES &amp; SKILLS:
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {item.skills.map(sk => (
                                  <span key={sk} className="tech-pill text-[10px] py-1">
                                    {sk}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {item.recognition && (
                            <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-[var(--accent)] mono text-[11px] font-semibold flex items-center gap-2">
                              <Sparkles size={13} />
                              <span>{item.recognition}</span>
                            </div>
                          )}

                          {item.proofType && (
                            <div className="flex items-center gap-2 text-[11px] mono text-[var(--text-sub)] pt-1">
                              <CheckCircle2 size={13} className="text-[var(--accent-lime)]" />
                              <span>Documented Verification: {item.proofType}</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
