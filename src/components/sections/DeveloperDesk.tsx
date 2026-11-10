'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Laptop,
  Terminal,
  BookOpen,
  Code,
  Coffee,
  GitBranch,
  FileText,
  Sparkles,
  ArrowUpRight,
  Zap,
  LucideIcon,
} from 'lucide-react';
import { DESK_ITEMS, DeskItemSpec } from '@/data/navigation';
import { labAudio } from '@/lib/audio';

interface DeveloperDeskProps {
  onOpenRecruiter: () => void;
}

export default function DeveloperDesk({ onOpenRecruiter }: DeveloperDeskProps) {
  const [selectedItem, setSelectedItem] = useState<DeskItemSpec>(DESK_ITEMS[0]);
  const [coffeeSips, setCoffeeSips] = useState(3);
  const [deskMode, setDeskMode] = useState<'knolled' | 'chaos'>('knolled');

  const ICONS: Record<string, LucideIcon> = {
    Laptop,
    Terminal,
    BookOpen,
    Code,
    Coffee,
    GitBranch,
    FileText,
  };

  function handleItemClick(item: DeskItemSpec) {
    labAudio.playClick(900);
    setSelectedItem(item);

    if (item.id === 'coffee') {
      setCoffeeSips(s => s + 1);
      labAudio.playChime();
    } else if (item.id === 'resume-dossier') {
      onOpenRecruiter();
    } else if (item.targetSection) {
      window.location.hash = item.targetSection;
    }
  }

  return (
    <section id="desk" className="py-28 relative border-b border-[var(--border)] overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Laptop size={14} className="text-[var(--accent)]" />
            <span className="sys-label-accent">INTERACTIVE WORKBENCH // PHYSICAL DESK ENGINE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)] font-editorial">
            Developer <span className="gradient-text">Desk.</span>
          </h2>
          <p className="text-sm text-[var(--text-muted)] font-mono mt-3 leading-relaxed">
            my desk, live. type <code className="text-[var(--accent)] font-bold">help</code> on the screen, or go straight for <code className="text-amber-500 font-bold">sudo hire shardul</code>.<br className="hidden sm:inline" />
            designer mode is 10 a.m. and knolled. developer mode is 2 a.m. and isn&apos;t. pick a side →
          </p>

          {/* Desk Mode Toggle */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)] mt-6">
            <button
              onClick={() => {
                labAudio.playClick(900);
                setDeskMode('knolled');
              }}
              className={`px-4 py-1.5 rounded-full text-xs mono font-bold transition-all cursor-pointer ${
                deskMode === 'knolled'
                  ? 'bg-[var(--accent)] text-black shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              ☀ designer mode (10 a.m. knolled)
            </button>
            <button
              onClick={() => {
                labAudio.playClick(1050);
                setDeskMode('chaos');
              }}
              className={`px-4 py-1.5 rounded-full text-xs mono font-bold transition-all cursor-pointer ${
                deskMode === 'chaos'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              🌙 developer mode (2 a.m. chaos)
            </button>
          </div>
        </div>

        {/* Workbench Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Grid: 7 Interactive Desk Stations */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {DESK_ITEMS.map((item, idx) => {
              const Icon = ICONS[item.iconName] || Sparkles;
              const isSelected = selectedItem.id === item.id;

              return (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -3, scale: 1.02 }}
                  style={{
                    transform: deskMode === 'chaos' ? `rotate(${((idx % 4) - 1.5) * 2.2}deg)` : 'none',
                    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => labAudio.playHover()}
                  className={`text-left p-5 rounded-2xl glass border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[140px] ${
                    isSelected
                      ? 'border-[var(--border-glow)] bg-[var(--surface-2)] shadow-[0_8px_30px_rgba(0,245,200,0.15)]'
                      : 'border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent)]">
                        <Icon size={16} />
                      </div>
                      <span className="mono text-[9px] text-[var(--text-sub)]">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="font-bold text-sm text-[var(--text)]">{item.title}</div>
                    <div className="mono text-[10px] text-[var(--accent-orange)] mt-0.5">
                      {item.category}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[var(--border)] flex items-center justify-between text-[10px] mono text-[var(--text-sub)]">
                    <span>{item.id === 'coffee' ? `Sips: ${coffeeSips}` : 'INSPECT'}</span>
                    <ArrowUpRight size={12} className="text-[var(--accent)]" />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: Active Station Telemetry Inspector */}
          <div className="lg:col-span-5">
            <div className="p-7 sm:p-8 rounded-3xl glass border border-[var(--border-strong)] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] text-xs mono text-[var(--text-sub)]">
                <span>STATION TELEMETRY</span>
                <span className="text-[var(--accent)] font-semibold">
                  {selectedItem.category}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[var(--text)] font-editorial tracking-tight">
                  {selectedItem.title}
                </h3>
                <div className="mono text-xs text-[var(--accent-orange)]">
                  {selectedItem.summary}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light leading-relaxed">
                {selectedItem.detail}
              </p>

              {/* Action Trigger */}
              <div className="pt-4 border-t border-[var(--border)]">
                <button
                  onClick={() => handleItemClick(selectedItem)}
                  className="glow-btn glow-btn-primary text-xs w-full justify-center"
                >
                  <span>{selectedItem.actionLabel}</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
