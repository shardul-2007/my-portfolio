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
  Sparkles,
  Maximize2,
  Eye,
} from 'lucide-react';
import { ACHIEVEMENTS, AchievementItem } from '@/data/achievements';
import { PROFILE } from '@/data/profile';
import { assetPath } from '@/lib/basePath';
import { labAudio } from '@/lib/audio';

export default function AchievementsArchive() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProofItem, setActiveProofItem] = useState<AchievementItem | null>(null);

  const CATEGORIES = ['ALL', 'Open Source', 'Leadership / AI', 'Civic & Government', 'Community'];

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
    <section id="achievements" className="py-24 relative border-b border-[var(--border)] overflow-hidden bg-[var(--paper)]">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
              <span className="mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-sub)]">
                PROOF OF PROGRESS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416]">
              Every milestone <br />
              <span className="font-serif-italic font-normal text-[#D9363E]">has a story.</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal mt-3 leading-relaxed">
              A growing collection of programs, contributions, certificates, recognitions and experiences from my learning journey.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mono text-xs px-4 py-2 rounded-full bg-[#171416] text-white hover:bg-[#D9363E] font-bold transition-all shadow-sm"
            >
              <ShieldCheck size={13} className="text-[#D9363E]" />
              <span>Verify on LinkedIn</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
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
                  className={`mono text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-bold ${
                    activeCategory === cat
                      ? 'bg-[#1e1420] text-white shadow-sm'
                      : 'bg-white border border-[var(--border)] text-[var(--text-sub)] hover:text-[#1e1420]'
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
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-[var(--border)] text-xs mono text-[#171416] placeholder-[var(--text-sub)] outline-none focus:border-[#D9363E] transition-all shadow-sm"
            />
          </div>
        </div>

        {/* ─── Living Cards Grid (Image 6 Style with Actual Badges & Certificates) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => {
            return (
              <motion.div
                key={item.id}
                layout
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                  labAudio.playClick(950);
                  if (item.imagePath) setActiveProofItem(item);
                }}
                style={{
                  borderTop: `4px solid ${item.accentColor}`,
                }}
                className={`relative rounded-3xl p-6 bg-white border border-[var(--border)] shadow-md hover:shadow-2xl transition-all flex flex-col justify-between group overflow-hidden ${
                  item.imagePath ? 'cursor-pointer' : ''
                }`}
              >
                {/* Header Tag & Year */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]/60 text-xs mono">
                    <span
                      className="px-2 py-0.5 rounded-full font-bold text-[10px] uppercase"
                      style={{
                        background: `${item.accentColor}18`,
                        color: item.accentColor,
                      }}
                    >
                      {item.category}
                    </span>
                    <span className="font-bold text-[var(--text-sub)]">{item.year}</span>
                  </div>

                  {/* Real Badge / Certificate Preview Graphic (if available) */}
                  {item.imagePath ? (
                    <div className="my-4 relative h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#fbf5f6] to-[#f4eff1] border border-[var(--border)] flex items-center justify-center p-2 group-hover:scale-[1.02] transition-transform duration-300">
                      <img
                        src={assetPath(item.imagePath)}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain drop-shadow-md rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="mono text-xs px-3 py-1.5 rounded-full bg-black/85 text-white font-bold flex items-center gap-1.5 shadow-lg">
                          <Eye size={12} />
                          <span>INSPECT PROOF</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="my-4 h-24 flex items-center justify-center rounded-2xl bg-[var(--surface-2)] border border-[var(--border)]">
                      <Award size={36} style={{ color: item.accentColor }} />
                    </div>
                  )}

                  {/* Title & Organization */}
                  <h3 className="text-lg font-bold text-[#171416] tracking-tight group-hover:text-[#D9363E] transition-colors">
                    {item.title}
                  </h3>

                  <div className="mono text-xs font-semibold text-[var(--text-sub)] mt-1">
                    {item.org}
                  </div>

                  <p className="text-xs text-[var(--text-muted)] font-normal leading-relaxed mt-2.5">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Proof Tag */}
                <div className="mt-5 pt-3 border-t border-[var(--border)]/60 flex items-center justify-between text-xs mono">
                  <div className="flex items-center gap-1.5 text-[var(--text-sub)]">
                    <CheckCircle2 size={12} className="text-[#12a150]" />
                    <span className="text-[10px] truncate max-w-[180px]">{item.proofType}</span>
                  </div>

                  {item.imagePath ? (
                    <span className="text-[10px] font-bold text-[#D9363E] flex items-center gap-1">
                      <span>VIEW</span>
                      <Maximize2 size={10} />
                    </span>
                  ) : (
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-[var(--text-sub)] hover:text-[#D9363E] flex items-center gap-1"
                    >
                      <span>RECORD</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ─── High-Resolution Proof Inspection Modal ─── */}
      <AnimatePresence>
        {activeProofItem && activeProofItem.imagePath && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveProofItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/20"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[#fbf5f6]">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#12a150]" />
                  <span className="mono text-xs font-bold uppercase tracking-wider text-[#1e1420]">
                    AUTHENTIC CREDENTIAL VERIFICATION
                  </span>
                </div>

                <button
                  onClick={() => setActiveProofItem(null)}
                  className="p-1.5 rounded-full hover:bg-black/10 text-[#1e1420] transition-colors cursor-pointer"
                  title="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* High-Res Image View */}
              <div className="p-6 overflow-y-auto flex-1 flex items-center justify-center bg-[#f7f5f6]">
                <img
                  src={assetPath(activeProofItem.imagePath)}
                  alt={activeProofItem.title}
                  className="max-h-[60vh] max-w-full object-contain rounded-2xl shadow-xl border border-[var(--border)]"
                />
              </div>

              {/* Modal Details Footer */}
              <div className="p-6 border-t border-[var(--border)] bg-white space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#171416]">
                      {activeProofItem.title}
                    </h3>
                    <div className="mono text-xs font-semibold text-[#D9363E]">
                      {activeProofItem.org} · {activeProofItem.year}
                    </div>
                  </div>

                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mono text-xs px-4 py-2 rounded-full bg-[#171416] text-white hover:bg-[#D9363E] font-bold transition-all shadow-sm"
                  >
                    <span>Verify on LinkedIn</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                  {activeProofItem.description}
                </p>
                <div className="mono text-[10px] text-[var(--text-sub)]">
                  VERIFIED DOCUMENTATION: {activeProofItem.proofType}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
