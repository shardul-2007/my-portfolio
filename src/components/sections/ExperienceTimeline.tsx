'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  GitCommit,
  GitBranch,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { EXPERIENCES, ExperienceItem } from '@/data/experience';
import { ACHIEVEMENTS } from '@/data/achievements';
import { PROFILE } from '@/data/profile';
import { labAudio } from '@/lib/audio';

export default function ExperienceTimeline() {
  const [filter, setFilter] = useState<'all' | 'active' | 'opensource' | 'campus'>('all');
  const [activeCommitIndex, setActiveCommitIndex] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  // Map scroll progress to active commit index (0 to 16)
  useEffect(() => {
    return scrollYProgress.onChange(v => {
      const idx = Math.min(EXPERIENCES.length - 1, Math.floor(v * EXPERIENCES.length));
      setActiveCommitIndex(idx);
    });
  }, [scrollYProgress]);

  const filtered = EXPERIENCES.filter(exp => {
    if (filter === 'active') return exp.status === 'active';
    if (filter === 'opensource') return exp.category.toLowerCase().includes('open source');
    if (filter === 'campus') return exp.category.toLowerCase().includes('ambassador') || exp.category.toLowerCase().includes('campus');
    return true;
  });

  // Witty git commit release note points generator
  function getReleaseNoteBullets(item: ExperienceItem) {
    if (item.org.includes('RemoteRecruit')) {
      return [
        { type: '+', text: 'outreach engine: connected 100+ students to global internship pipelines' },
        { type: '-', text: 'deprecated: campus awareness bottlenecks' },
        { type: '!', text: 'breaking change: 0 to 1 community ambassador deployment' },
      ];
    }
    if (item.org.includes('Open Source Connect')) {
      return [
        { type: '+', text: 'full-stack: contributions across MERN repositories & documentation' },
        { type: '+', text: 'collaborative pull requests merged with verified contributor badge' },
        { type: '!', text: 'survived: merge conflicts on upstream production branches' },
      ];
    }
    if (item.org.includes('HackerRank')) {
      return [
        { type: '+', text: 'campus crew lead: representing HackerRank across PCET NMIET' },
        { type: '+', text: 'facilitated developer coding contests & algorithmic workshops' },
        { type: '!', text: 'competitive selection interview: passed' },
      ];
    }
    if (item.org.includes('GirlScript')) {
      return [
        { type: '+', text: 'open-source contributor: merged high-impact features in web repositories' },
        { type: '+', text: 'git workflow: branch hygiene, peer code review, issue triage' },
        { type: '-', text: 'fixed: responsive CSS overflows across mobile viewports' },
      ];
    }
    return [
      { type: '+', text: `${item.role} verified across production repositories` },
      { type: '+', text: `hands-on implementation of ${(item.skills || []).slice(0, 3).join(', ')}` },
      { type: '!', text: `milestone: verified credentials on official records` },
    ];
  }

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 relative border-b border-[var(--border)] overflow-hidden bg-[var(--paper)]"
    >
      <div className="section-container">
        {/* Editorial Section Header (Image 7 Parity) */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch size={14} className="text-[#8b5cf6]" />
            <span className="eyebrow">the journey · git log --graph</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1e1420]">
            release notes <span className="font-serif-italic font-normal text-[#ff4f9a]">for</span> shardul.
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-muted)] font-light mt-3 leading-relaxed">
            every career commit so far, tracked on a git branch graph. breaking changes documented, verified credentials linked, and zero versions skipped.
          </p>

          {/* Git Branch HUD Banner (Exact Parity with Image 7) */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 p-4 rounded-2xl bg-white border border-[var(--border)] shadow-sm mono text-xs">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-[#1e1420] text-white font-bold text-[11px]">
                HEAD →
              </span>
              <span className="text-xl font-black text-[#1e1420]">v1.0</span>
              <span className="text-[var(--text-sub)]">2026</span>
              <span className="px-2 py-0.5 rounded-full bg-[#ffb8dc] text-[#1e1420] font-bold text-[10px]">
                MAJOR
              </span>
            </div>

            {/* Branch Legend & Progress */}
            <div className="flex items-center gap-5 text-xs text-[var(--text-sub)]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1e1420]" /> — main
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff4f9a]" /> — work
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" /> — community
              </span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1e1420]">
                  commit {String(activeCommitIndex + 1).padStart(2, '0')}/{EXPERIENCES.length}
                </span>
                <div className="w-20 h-2 bg-[#f4eff1] rounded-full overflow-hidden border border-[var(--border)]">
                  <div
                    style={{ width: `${((activeCommitIndex + 1) / EXPERIENCES.length) * 100}%` }}
                    className="h-full bg-[#ff4f9a] transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: 'all', label: `ALL 17 COMMITS` },
            { id: 'active', label: 'ACTIVE' },
            { id: 'opensource', label: 'OPEN SOURCE' },
            { id: 'campus', label: 'AMBASSADOR & LEADERSHIP' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                labAudio.playClick(900);
                setFilter(tab.id as typeof filter);
              }}
              className={`mono text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-bold ${
                filter === tab.id
                  ? 'bg-[#1e1420] text-white shadow-sm'
                  : 'bg-white border border-[var(--border)] text-[var(--text-sub)] hover:text-[#1e1420]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── Git Branch Graph & Highlight-On-Scroll Cards (Image 7 Parity) ─── */}
        <div className="relative pl-8 sm:pl-12 space-y-8">
          {/* Main Stem Line */}
          <div className="absolute left-[15px] sm:left-[23px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#1e1420] via-[#ff4f9a] to-[#8b5cf6]" />

          {filtered.map((item, idx) => {
            const isHighlighted = idx <= activeCommitIndex;
            const bullets = getReleaseNoteBullets(item);
            const commitHash = (Math.abs(item.id.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)) % 10000000)
              .toString(16)
              .padStart(7, '0');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                className="relative group"
              >
                {/* Commit Dot Node with Pulse */}
                <div
                  className={`absolute -left-[27px] sm:-left-[35px] top-6 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 ${
                    isHighlighted
                      ? 'bg-[#ff4f9a] border-white text-white shadow-[0_0_12px_rgba(255,79,154,0.6)] scale-110'
                      : 'bg-white border-[var(--border)] text-[var(--text-sub)]'
                  }`}
                >
                  <GitCommit size={13} />
                </div>

                {/* Release Note Commit Card (Image 7 Parity) */}
                <div
                  className={`rounded-2xl p-6 transition-all duration-300 border ${
                    isHighlighted
                      ? 'bg-white border-[#ff4f9a] shadow-[0_12px_36px_rgba(255,79,154,0.12)]'
                      : 'bg-white/80 border-[var(--border)] hover:border-[#1e1420]'
                  }`}
                >
                  {/* Card Header Spec */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border)]/60">
                    <div className="flex items-center gap-2">
                      <span className="mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#f4eff1] text-[#1e1420]">
                        v0.{idx + 1}
                      </span>
                      <span className="mono text-[10px] uppercase font-bold text-[#ff4f9a]">
                        {item.status === 'active' ? 'ACTIVE COMMIT' : 'MERGED RELEASE'}
                      </span>
                      <span className="mono text-[10px] text-[var(--text-sub)]">
                        {commitHash}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mono text-xs text-[var(--text-sub)]">
                      <Calendar size={12} />
                      <span>{item.startDate} — {item.endDate}</span>
                    </div>
                  </div>

                  {/* Title & Role */}
                  <div className="mt-3">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1e1420]">
                      {item.role}
                    </h3>
                    <div className="mono text-xs font-bold text-[#8b5cf6] mt-0.5">
                      {item.org} · {item.category}
                    </div>
                  </div>

                  {/* Witty Git Diff Bullets (+ / - / !) */}
                  <div className="mt-4 space-y-1.5 font-mono text-xs">
                    {bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2">
                        <span
                          className={`font-bold px-1 rounded ${
                            b.type === '+'
                              ? 'text-[#12a150] bg-emerald-50'
                              : b.type === '-'
                              ? 'text-[#ff3b30] bg-red-50'
                              : 'text-[#ff6b1a] bg-orange-50'
                          }`}
                        >
                          {b.type}
                        </span>
                        <span className="text-[var(--text-muted)] leading-relaxed">
                          {b.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Verification & Location */}
                  <div className="mt-4 pt-3 border-t border-[var(--border)]/60 flex flex-wrap items-center justify-between gap-3 text-xs mono">
                    <div className="flex items-center gap-1.5 text-[var(--text-sub)]">
                      <MapPin size={11} />
                      <span>{item.location || 'Pune, India'}</span>
                    </div>

                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#8b5cf6] hover:underline font-bold"
                    >
                      <span>verify evidence</span>
                      <ExternalLink size={11} />
                    </a>
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
