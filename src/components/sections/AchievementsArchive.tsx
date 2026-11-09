'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  X,
  FileText,
} from 'lucide-react';
import { ACHIEVEMENTS, AchievementItem } from '@/data/achievements';
import { PROFILE } from '@/data/profile';
import { labAudio } from '@/lib/audio';

export default function AchievementsArchive() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProofModal, setSelectedProofModal] = useState<boolean>(false);

  const CATEGORIES = ['ALL', 'Open Source', 'Community', 'Recognition', 'Student Program', 'Campus Ambassador'];

  const filtered = ACHIEVEMENTS.filter(item => {
    const matchesCat =
      activeCategory === 'ALL' ||
      item.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="achievements" className="py-28 relative border-b border-[var(--border)] overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Award size={14} className="text-[var(--accent-orange)]" />
              <span className="sys-label-orange">CREDENTIALS &amp; ARCHIVE // 16 DOCUMENTED RECORDS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)] font-editorial">
              Achievements &amp; <br />
              <span className="gradient-orange">Credentials.</span>
            </h2>
            <p className="text-base text-[var(--text-muted)] font-light mt-3 leading-relaxed">
              Selected student leadership programs, national recognitions, and open-source contributor credentials with verified documentation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                labAudio.playClick(1000);
                setSelectedProofModal(true);
              }}
              className="glow-btn glow-btn-primary text-xs"
            >
              <ShieldCheck size={14} />
              <span>VIEW ALL PROOFS &amp; CREDENTIALS</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(cat => {
              const count =
                cat === 'ALL'
                  ? ACHIEVEMENTS.length
                  : ACHIEVEMENTS.filter(a => a.category.toLowerCase().includes(cat.toLowerCase())).length;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    labAudio.playClick(900);
                    setActiveCategory(cat);
                  }}
                  className={`mono text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                    activeCategory === cat
                      ? 'bg-[var(--accent-orange)] text-white font-bold shadow-[0_0_12px_rgba(255,107,53,0.35)]'
                      : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[240px]">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-sub)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search 16 credentials..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs mono text-[var(--text)] placeholder-[var(--text-sub)] outline-none focus:border-[var(--accent-orange)] transition-all"
            />
          </div>
        </div>

        {/* 16 Achievement Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(item => (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl glass border border-[var(--border)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="mono text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: `${item.accentColor}18`,
                      color: item.accentColor,
                      border: `1px solid ${item.accentColor}35`,
                    }}
                  >
                    {item.category}
                  </span>
                  <span className="mono text-[10px] text-[var(--text-sub)]">{item.year}</span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-[var(--text)] leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold mt-1" style={{ color: item.accentColor }}>
                    {item.org}
                  </div>
                </div>

                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Proof Tag & Link */}
              <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[10px] mono text-[var(--text-sub)]">
                <span className="truncate pr-2">{item.proofType}</span>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline flex items-center gap-1 flex-shrink-0"
                  title="Verify on LinkedIn"
                >
                  <ExternalLink size={11} />
                  <span>Verify</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Proof & Credentials Modal */}
      <AnimatePresence>
        {selectedProofModal && (
          <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProofModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-3xl p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.8)] z-10 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProofModal(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-[var(--surface-2)] text-[var(--text-sub)] hover:text-[var(--text)] cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-2 text-xs mono text-[var(--accent)]">
                <ShieldCheck size={16} />
                <span>VERIFIED DOCUMENT REPOSITORY</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] font-editorial tracking-tight mb-2">
                Documented Proofs &amp; Credentials
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light leading-relaxed mb-6">
                All offer letters, program appointments, participant confirmations, and completion badges are permanently documented on my verified LinkedIn profile experience section.
              </p>

              {/* Proofs List */}
              <div className="space-y-2 mb-6 max-h-[300px] overflow-y-auto pr-1">
                {ACHIEVEMENTS.map(item => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-[var(--text)]">{item.title}</div>
                      <div className="mono text-[10px] text-[var(--text-sub)]">
                        {item.org} · {item.proofType}
                      </div>
                    </div>
                    <CheckCircle2 size={14} className="text-[var(--accent-lime)] flex-shrink-0 ml-2" />
                  </div>
                ))}
              </div>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn glow-btn-primary w-full justify-center py-2.5"
              >
                <ExternalLink size={14} />
                <span>VIEW VERIFIED CREDENTIALS ON LINKEDIN</span>
              </a>

              <div className="text-center mono text-[10px] text-[var(--text-sub)] mt-3">
                Thank you for reviewing the engineering credentials of Shardul Parihar.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
