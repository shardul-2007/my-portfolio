'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  ExternalLink,
  Code2,
  Layers,
  Terminal,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { assetPath } from '@/lib/basePath';
import { labAudio } from '@/lib/audio';

interface OSItem {
  id: string;
  name: string;
  org: string;
  program: string;
  year: string;
  statusLabel: 'CURRENT' | 'COMPLETED';
  badgeImage: string;
  badgeLabel: string;
  evidenceStatus: string;
  stack: string[];
  description: string;
  verifiedLink: string;
  accent: string;
}

const OS_RECORDS: OSItem[] = [
  {
    id: 'osci-2026',
    name: 'Open Source Connect India (OSCI)',
    org: 'Open Source Connect India / NexFellow',
    program: "OSCI'26",
    year: '2026',
    statusLabel: 'CURRENT',
    badgeImage: '/images/achievements/osc-india-contributor.jpg',
    badgeLabel: 'Verified Contributor Badge #2026',
    evidenceStatus: 'EVIDENCE AVAILABLE',
    stack: ['MERN Stack', 'React', 'Node.js', 'Git Collaboration'],
    description: 'Selected contributor participating in community-driven open-source development sprints, collaborating across web repositories and developer tooling.',
    verifiedLink: 'https://github.com/shardul-2007',
    accent: '#D9363E',
  },
  {
    id: 'gssoc-2026',
    name: 'GirlScript Summer of Code 2026',
    org: 'GS LABS by GirlScript Foundation',
    program: "GSSoC'26",
    year: '2026',
    statusLabel: 'CURRENT',
    badgeImage: '/images/achievements/gssoc-2026-badge.jpg',
    badgeLabel: 'Official Contributor Rosette Badge',
    evidenceStatus: 'EVIDENCE AVAILABLE',
    stack: ['Full-Stack Web', 'Peer Code Review', 'Issue Triage', 'Git Hygiene'],
    description: 'Active participant in GirlScript Summer of Code 2026 under the theme BUILD · CONTRIBUTE · SHIP, collaborating across open-source web ecosystems.',
    verifiedLink: 'https://github.com/shardul-2007',
    accent: '#D9363E',
  },
  {
    id: 'nsoc-2026',
    name: 'Nexus Spring of Code 2026',
    org: 'Nexus / NexFellow',
    program: "NSoC'26",
    year: '2026',
    statusLabel: 'CURRENT',
    badgeImage: '/images/achievements/tech-contributor-pixel.jpg',
    badgeLabel: 'Pixel Tech Contributor Medallion',
    evidenceStatus: 'EVIDENCE AVAILABLE',
    stack: ['Data Structures', 'Python', 'Web APIs', 'Optimization'],
    description: 'Contributing algorithmic modules, API handlers, and documentation during the nationwide spring open-source sprint.',
    verifiedLink: 'https://github.com/shardul-2007',
    accent: '#D9363E',
  },
  {
    id: 'oscg-2026',
    name: 'Open Source Connect Global',
    org: 'Open Source Connect Global / NexFellow',
    program: "OSCG'26",
    year: '2026',
    statusLabel: 'CURRENT',
    badgeImage: '/images/achievements/osc-global-contributor.jpg',
    badgeLabel: 'Global Contributor Badge',
    evidenceStatus: 'EVIDENCE AVAILABLE',
    stack: ['Open Source Standards', 'REST APIs', 'Full-Stack'],
    description: 'Engaging with international developer teams on shared software components and open-source documentation.',
    verifiedLink: 'https://github.com/shardul-2007',
    accent: '#D9363E',
  },
];

export default function OpenSourceContributions() {
  const [selectedItem, setSelectedItem] = useState<OSItem>(OS_RECORDS[0]);
  const [inspectModal, setInspectModal] = useState<OSItem | null>(null);

  return (
    <section id="contributions" className="relative py-28 bg-[#F8F5F1] text-[#171416] border-b border-[#E5DDDA] overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 mono text-xs font-bold text-[#D9363E] uppercase tracking-widest">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9363E] animate-pulse" />
              <span>01 · OPEN SOURCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416] font-editorial">
              CONTRIBUTIONS
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-[#D9363E]">
              &ldquo;Every contribution moves something forward.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[#81777A] mt-2 leading-relaxed">
              Nationwide and global open-source developer mentorship programs. All records supported by verified program credentials and public GitHub repositories.
            </p>
          </div>

          <a
            href="https://github.com/shardul-2007"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => labAudio.playClick(950)}
            className="flex items-center gap-1.5 mono text-xs px-4 py-2 rounded-full bg-white border border-[#E5DDDA] text-[#171416] hover:border-[#D9363E] hover:text-[#D9363E] font-semibold transition-all shadow-xs self-start md:self-end"
          >
            <span>GITHUB PROFILE</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Structured Contribution System Panels (2-Column Architecture Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contribution Program Cards (7 Cols) */}
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
                  className={`p-5 rounded-3xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-[#D9363E] shadow-sm -translate-y-0.5'
                      : 'bg-white/80 border-[#E5DDDA] hover:border-[#D9363E]/40 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#FDF6F6] text-[#D9363E] font-bold border border-[#F2D2D4]">
                      {item.program}
                    </span>
                    <span className="mono text-[10px] font-bold text-[#12A150] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#12A150]" />
                      {item.statusLabel}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#171416] mb-1 leading-snug">
                    {item.name}
                  </h3>
                  <p className="mono text-xs text-[#81777A] mb-4">{item.org}</p>

                  {/* Badge Preview */}
                  <div className="flex items-center gap-3 p-2 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] mb-4">
                    <img
                      src={assetPath(item.badgeImage)}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-[#E5DDDA]"
                    />
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-[#171416] truncate">{item.badgeLabel}</div>
                      <div className="mono text-[10px] text-[#D9363E] flex items-center gap-1 font-semibold">
                        <CheckCircle2 size={11} /> {item.evidenceStatus}
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-[#E5DDDA]">
                    {item.stack.slice(0, 3).map(st => (
                      <span key={st} className="mono text-[10px] px-2 py-0.5 rounded bg-[#F8F5F1] text-[#171416]">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Verification & Credential Details (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDDA] shadow-[0_8px_30px_rgba(23,20,22,0.04)] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DDDA]">
              <div>
                <div className="mono text-xs text-[#D9363E] font-bold uppercase">{selectedItem.program} · VERIFIED PROGRAM</div>
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
                EXPAND BADGE
              </button>
            </div>

            {/* High-Res Credential Preview */}
            <div
              onClick={() => setInspectModal(selectedItem)}
              className="relative rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA] p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#D9363E] transition-all group"
            >
              <img
                src={assetPath(selectedItem.badgeImage)}
                alt={selectedItem.name}
                className="w-40 h-40 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
              />
              <div className="mono text-xs text-[#D9363E] font-bold mt-3 flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E5DDDA] shadow-xs">
                <Sparkles size={12} />
                <span>Click to view credential in high-res</span>
              </div>
            </div>

            {/* Program Scope */}
            <div>
              <h4 className="mono text-xs uppercase font-bold text-[#171416] mb-1.5">Program Scope &amp; Activities</h4>
              <p className="text-xs sm:text-sm text-[#81777A] leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="mono text-xs uppercase font-bold text-[#171416] mb-2">Technologies &amp; Workflows</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedItem.stack.map(st => (
                  <span key={st} className="mono text-[11px] px-2.5 py-1 rounded-lg bg-[#F8F5F1] text-[#171416] font-medium border border-[#E5DDDA]">
                    {st}
                  </span>
                ))}
              </div>
            </div>

            {/* Verification Footer */}
            <div className="pt-2 flex items-center justify-between text-xs mono border-t border-[#E5DDDA]">
              <span className="text-[#81777A] flex items-center gap-1">
                <ShieldCheck size={14} className="text-[#12A150]" />
                <span>{selectedItem.evidenceStatus}</span>
              </span>
              <span className="text-[#D9363E] font-bold">AUTHENTIC RECORD</span>
            </div>
          </div>
        </div>
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
              className="bg-white text-[#171416] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E5DDDA] shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E5DDDA] pb-3">
                <div>
                  <div className="mono text-xs text-[#D9363E] font-bold uppercase">{inspectModal.program} · VERIFIED CREDENTIAL</div>
                  <h3 className="text-lg font-bold">{inspectModal.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectModal(null)}
                  className="w-8 h-8 rounded-full bg-[#F1ECE8] hover:bg-[#E5D9D7] flex items-center justify-center mono text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="w-full flex items-center justify-center p-4 bg-[#F8F5F1] rounded-2xl border border-[#E5DDDA]">
                <img
                  src={assetPath(inspectModal.badgeImage)}
                  alt={inspectModal.name}
                  className="max-h-72 object-contain rounded-xl"
                />
              </div>

              <div className="space-y-2 text-xs mono">
                <div className="flex justify-between border-b border-[#E5DDDA] pb-1">
                  <span className="text-[#81777A]">Issuing Organization:</span>
                  <span className="font-bold text-[#171416]">{inspectModal.org}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#81777A]">Verification Status:</span>
                  <span className="font-bold text-[#12A150]">Evidence On Record</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
