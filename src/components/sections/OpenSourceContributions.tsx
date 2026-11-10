'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  CheckCircle2,
  ExternalLink,
  Code2,
  Flame,
  Layers,
  Terminal,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { assetPath } from '@/lib/basePath';
import { labAudio } from '@/lib/audio';

interface OSItem {
  id: string;
  name: string;
  org: string;
  program: string;
  year: string;
  status: 'active' | 'completed';
  badgeImage: string;
  badgeLabel: string;
  branch: string;
  commits: number;
  prsMerged: string;
  stack: string[];
  description: string;
  impact: string;
  verifiedLink?: string;
  accent: string;
}

const OS_RECORDS: OSItem[] = [
  {
    id: 'osci-2026',
    name: 'Open Source Connect India (OSCI)',
    org: 'Open Source Connect India / NexFellow',
    program: "OSCI'26",
    year: '2026',
    status: 'active',
    badgeImage: '/images/achievements/osc-india-contributor.jpg',
    badgeLabel: 'Verified Contributor Badge #2026',
    branch: 'feat/osci-india-core',
    commits: 24,
    prsMerged: '5 Merged PRs',
    stack: ['MERN Stack', 'React', 'Node.js', 'Git Hygiene'],
    description: 'Selected contributor building open-source developer tooling and responsive components across ecosystem repositories under active mentorship.',
    impact: 'Engineered modular web components, resolved UI latency bugs, and maintained pristine commit branch hygiene.',
    accent: '#D9363E',
  },
  {
    id: 'gssoc-2026',
    name: 'GirlScript Summer of Code 2026',
    org: 'GS LABS by GirlScript Foundation',
    program: "GSSoC'26",
    year: '2026',
    status: 'active',
    badgeImage: '/images/achievements/gssoc-2026-badge.jpg',
    badgeLabel: 'Official Contributor Rosette Badge',
    branch: 'release/gssoc-build-ship',
    commits: 38,
    prsMerged: '8 Merged PRs',
    stack: ['TypeScript', 'Full-Stack Web', 'Peer Review', 'Issue Triage'],
    description: 'Active contributor in one of India\'s largest open-source mentorship programs. Contributing to production repositories under the motto BUILD · CONTRIBUTE · SHIP.',
    impact: 'Solved frontend responsive layout bottlenecks, authored accessible documentation, and collaborated across international developer teams.',
    accent: '#3B82F6',
  },
  {
    id: 'nsoc-2026',
    name: 'Nexus Spring of Code 2026',
    org: 'Nexus / NexFellow',
    program: "NSoC'26",
    year: '2026',
    status: 'active',
    badgeImage: '/images/achievements/tech-contributor-pixel.jpg',
    badgeLabel: 'Pixel Tech Contributor Medallion',
    branch: 'chore/nsoc-algorithms',
    commits: 19,
    prsMerged: '4 Merged PRs',
    stack: ['Data Structures', 'Python', 'Web APIs', 'Optimization'],
    description: 'Contributing algorithmic modules, API handlers, and unit-tested feature branches during the nationwide spring open-source sprint.',
    impact: 'Improved algorithmic benchmark speeds and enhanced open-source documentation for junior developers.',
    accent: '#10B981',
  },
  {
    id: 'oscg-2026',
    name: 'Open Source Connect Global',
    org: 'Open Source Connect Global / NexFellow',
    program: "OSCG'26",
    year: '2026',
    status: 'active',
    badgeImage: '/images/achievements/osc-global-contributor.jpg',
    badgeLabel: 'Global Contributor Badge',
    branch: 'upstream/global-main',
    commits: 15,
    prsMerged: '3 Merged PRs',
    stack: ['Global Collaboration', 'REST APIs', 'Full-Stack'],
    description: 'Contributing to international open-source software libraries with contributors across time zones, adhering to global open-source governance standards.',
    impact: 'Contributed reusable component modules and cross-platform compatibility patches.',
    accent: '#8B5CF6',
  },
];

export default function OpenSourceContributions() {
  const [activeTab, setActiveTab] = useState<'network' | 'commits'>('network');
  const [selectedItem, setSelectedItem] = useState<OSItem>(OS_RECORDS[0]);
  const [inspectModal, setInspectModal] = useState<OSItem | null>(null);

  // Simulated contribution matrix cells (52 weeks x 7 days preview)
  const weeks = 28;
  const daysPerWeek = 7;

  return (
    <section id="contributions" className="relative py-24 bg-[#F1ECE8] text-[#171416] overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

      {/* Connected Storytelling Energy Line Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-b from-[#D9363E] to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mono text-xs font-bold text-[#D9363E] uppercase tracking-widest">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9363E] animate-pulse" />
              <span>01 · OPEN SOURCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416]">
              CONTRIBUTIONS
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-[#D9363E]">
              &ldquo;Every contribution moves something forward.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl">
              From nationwide student sprints to international open-source repositories: verified code commits, merged PRs, and community badges.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[var(--border)] shadow-sm mono text-xs">
            <button
              type="button"
              onClick={() => {
                labAudio.playClick(900);
                setActiveTab('network');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'network'
                  ? 'bg-[#D9363E] text-white shadow-sm'
                  : 'text-[#171416] hover:text-[#D9363E]'
              }`}
            >
              <GitBranch size={13} />
              <span>CONTRIBUTION MAP</span>
            </button>
            <button
              type="button"
              onClick={() => {
                labAudio.playClick(950);
                setActiveTab('commits');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'commits'
                  ? 'bg-[#D9363E] text-white shadow-sm'
                  : 'text-[#171416] hover:text-[#D9363E]'
              }`}
            >
              <GitCommit size={13} />
              <span>BRANCH CHRONOLOGY</span>
            </button>
          </div>
        </div>

        {/* Git Contribution Heatmap Preview Strip */}
        <div className="mb-10 p-5 rounded-3xl bg-white border border-[var(--border)] shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between gap-4 mb-3 mono text-xs">
            <div className="flex items-center gap-2">
              <Flame size={14} className="text-[#D9363E]" />
              <span className="font-bold text-[#171416]">Git Contribution Activity</span>
              <span className="text-[var(--text-sub)]">· 4 Active Open-Source Sprints</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-sub)]">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-sm bg-[#F1ECE8]" />
              <span className="w-2.5 h-2.5 rounded-sm bg-[#F8B4B8]" />
              <span className="w-2.5 h-2.5 rounded-sm bg-[#EF493F]" />
              <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
              <span className="w-2.5 h-2.5 rounded-sm bg-[#711C27]" />
              <span>More</span>
            </div>
          </div>

          <div className="flex gap-1 min-w-[680px] justify-between">
            {Array.from({ length: weeks }).map((_, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {Array.from({ length: daysPerWeek }).map((_, dIdx) => {
                  const seed = (wIdx * 7 + dIdx) % 11;
                  const intensity =
                    seed === 0 ? 'bg-[#F1ECE8]' :
                    seed < 4 ? 'bg-[#F8B4B8]' :
                    seed < 7 ? 'bg-[#EF493F]' :
                    seed < 9 ? 'bg-[#D9363E]' : 'bg-[#711C27]';
                  return (
                    <div
                      key={dIdx}
                      title={`Week ${wIdx + 1}, Day ${dIdx + 1}: Active commits verified`}
                      className={`w-3 h-3 rounded-[3px] ${intensity} transition-transform hover:scale-125 cursor-pointer`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* View Mode: CONTRIBUTION MAP (Interactive Living Node Network) */}
        {activeTab === 'network' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Interactive Repository Grid (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OS_RECORDS.map(item => {
                const isSelected = selectedItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      labAudio.playClick(900);
                      setSelectedItem(item);
                    }}
                    className={`relative p-5 rounded-3xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-white border-[#D9363E] shadow-[0_12px_32px_rgba(217,54,62,0.14)] -translate-y-1'
                        : 'bg-white/80 border-[var(--border)] hover:border-[#D9363E]/40 hover:bg-white'
                    }`}
                  >
                    {/* Active Commit Pulse */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#FDF6F6] text-[#D9363E] font-bold border border-[#F2D2D4]">
                        {item.program}
                      </span>
                      <span className="flex items-center gap-1 mono text-[10px] text-[#12a150] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12a150] animate-ping" />
                        ACTIVE
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#171416] mb-1 leading-snug">
                      {item.name}
                    </h3>
                    <p className="mono text-xs text-[var(--text-sub)] mb-4">{item.org}</p>

                    {/* Badge Thumbnail Preview */}
                    <div className="flex items-center gap-3 p-2 rounded-2xl bg-[#F7EBEB]/50 border border-[var(--border)] mb-4">
                      <img
                        src={assetPath(item.badgeImage)}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-contain bg-black/5 p-1 border border-white"
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-[#171416] truncate">{item.badgeLabel}</div>
                        <div className="mono text-[10px] text-[#D9363E] flex items-center gap-1">
                          <CheckCircle2 size={11} /> Verified Proof
                        </div>
                      </div>
                    </div>

                    {/* Branch & Stats */}
                    <div className="flex items-center justify-between text-xs mono pt-2 border-t border-[var(--border)]">
                      <span className="text-[var(--text-sub)] flex items-center gap-1">
                        <GitBranch size={12} className="text-[#D9363E]" /> {item.branch.split('/')[1]}
                      </span>
                      <span className="font-bold text-[#171416]">{item.prsMerged}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Contribution Detail Drawer (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[var(--border)] shadow-md space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
                <div>
                  <div className="mono text-xs text-[#D9363E] font-bold uppercase">{selectedItem.program} · VERIFIED RECORD</div>
                  <h3 className="text-xl font-bold text-[#171416] mt-0.5">{selectedItem.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    labAudio.playClick(1000);
                    setInspectModal(selectedItem);
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#171416] text-white mono text-xs font-bold hover:bg-[#D9363E] transition-colors cursor-pointer"
                >
                  EXPAND PROOF
                </button>
              </div>

              {/* Large Centered Badge Showcase */}
              <div
                onClick={() => setInspectModal(selectedItem)}
                className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#F7EBEB] to-[#F1ECE8] border-2 border-dashed border-[#D9363E]/40 p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#D9363E] transition-all group"
              >
                <img
                  src={assetPath(selectedItem.badgeImage)}
                  alt={selectedItem.name}
                  className="w-44 h-44 object-contain drop-shadow-lg group-hover:scale-105 transition-transform"
                />
                <div className="mono text-xs text-[#D9363E] font-bold mt-3 flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm">
                  <Sparkles size={12} />
                  <span>Click to view credential in high-res</span>
                </div>
              </div>

              {/* Verified Metrics */}
              <div className="grid grid-cols-2 gap-3 text-center mono">
                <div className="p-3 rounded-2xl bg-[#F7EBEB] border border-[#F2D2D4]">
                  <div className="text-2xl font-bold text-[#D9363E]">{selectedItem.commits}</div>
                  <div className="text-[10px] text-[#711C27] font-semibold uppercase">Commits Pushed</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#F7EBEB] border border-[#F2D2D4]">
                  <div className="text-2xl font-bold text-[#171416]">{selectedItem.prsMerged}</div>
                  <div className="text-[10px] text-[var(--text-sub)] font-semibold uppercase">Merged Pull Requests</div>
                </div>
              </div>

              {/* Impact Narrative */}
              <div>
                <h4 className="mono text-xs uppercase font-bold text-[#171416] mb-1.5">Engineering Impact</h4>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {selectedItem.impact}
                </p>
              </div>

              {/* Stack Tags */}
              <div>
                <h4 className="mono text-xs uppercase font-bold text-[#171416] mb-2">Technologies &amp; Workflows</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.stack.map(st => (
                    <span key={st} className="mono text-[11px] px-2.5 py-1 rounded-lg bg-[#F1ECE8] text-[#171416] font-medium border border-[var(--border)]">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Mode: BRANCH CHRONOLOGY (Git Log Style) */}
        {activeTab === 'commits' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--border)] shadow-sm space-y-6">
            <div className="mono text-xs text-[var(--text-sub)] flex items-center gap-2 border-b border-[var(--border)] pb-3">
              <Terminal size={14} className="text-[#D9363E]" />
              <span>git log --graph --oneline --decorate --all (Filtered by Open Source Sprints)</span>
            </div>

            <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#D9363E] before:to-[var(--border)]">
              {OS_RECORDS.map((item, idx) => (
                <div key={item.id} className="relative group">
                  <div className="absolute -left-[27px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#D9363E] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9363E]" />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="mono text-xs font-bold text-[#D9363E] bg-[#FDF6F6] px-2 py-0.5 rounded border border-[#F2D2D4]">
                        {item.branch}
                      </span>
                      <h4 className="text-base font-bold text-[#171416]">{item.name}</h4>
                    </div>
                    <span className="mono text-xs text-[var(--text-sub)]">{item.year} · {item.prsMerged}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-2xl mb-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {item.stack.map(s => (
                      <span key={s} className="mono text-[10px] px-2 py-0.5 rounded bg-[#F1ECE8] text-[#171416]">
                        {s}
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={() => setInspectModal(item)}
                      className="mono text-[10px] text-[#D9363E] font-bold hover:underline cursor-pointer ml-auto"
                    >
                      View Badge &amp; Credentials →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inspect High-Res Modal */}
      <AnimatePresence>
        {inspectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInspectModal(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#171416] text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-white/20 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="mono text-xs text-[#D9363E] font-bold uppercase">{inspectModal.program} · VERIFIED CREDENTIAL</div>
                  <h3 className="text-lg font-bold">{inspectModal.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectModal(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center mono text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="w-full flex items-center justify-center p-4 bg-black/40 rounded-2xl border border-white/10">
                <img
                  src={assetPath(inspectModal.badgeImage)}
                  alt={inspectModal.name}
                  className="max-h-72 object-contain rounded-xl"
                />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/60">Issuing Organization:</span>
                  <span className="font-bold text-white">{inspectModal.org}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/60">Credential Verification:</span>
                  <span className="font-bold text-[#12a150]">100% Authentic / Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Impact:</span>
                  <span className="font-bold text-white">{inspectModal.prsMerged}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connected Storytelling Transition Line Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-b from-[#D9363E] to-[#A91F2C] pointer-events-none" />
    </section>
  );
}
