'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Terminal,
  Layers,
  Sparkles,
  ExternalLink,
  Code,
  FolderGit2,
  Award,
  Briefcase,
  Mail,
  Sun,
  Moon,
  Laptop,
  Gamepad2,
  FileText,
  UserCheck,
} from 'lucide-react';
import { labAudio } from '@/lib/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  onOpenRecruiter: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onToggleTheme,
  onOpenRecruiter,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const COMMANDS = [
    {
      id: 'home',
      name: '/home',
      label: 'Home & Cinematic Hero',
      category: 'Navigation',
      icon: Terminal,
      action: () => {
        window.location.hash = '#hero';
      },
    },
    {
      id: 'command',
      name: '/command',
      label: 'Engineering Command Center',
      category: 'Navigation',
      icon: Layers,
      action: () => {
        window.location.hash = '#command-center';
      },
    },
    {
      id: 'projects',
      name: '/projects',
      label: 'Featured Projects (CivicOS, AssemblyOS, SkillCert)',
      category: 'Navigation',
      icon: Code,
      action: () => {
        window.location.hash = '#projects';
      },
    },
    {
      id: 'architecture',
      name: '/architecture',
      label: 'Project Architecture Explorer',
      category: 'Explore',
      icon: Layers,
      action: () => {
        window.location.hash = '#architecture';
      },
    },
    {
      id: 'casestudies',
      name: '/case-studies',
      label: 'Engineering Case Studies (Product & Engineering Views)',
      category: 'Explore',
      icon: FileText,
      action: () => {
        window.location.hash = '#case-studies';
      },
    },
    {
      id: 'experience',
      name: '/experience',
      label: 'Git Journey & Experience (17 Programs)',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => {
        window.location.hash = '#experience';
      },
    },
    {
      id: 'achievements',
      name: '/achievements',
      label: 'Credentials & Achievements Archive (16 Records)',
      category: 'Navigation',
      icon: Award,
      action: () => {
        window.location.hash = '#achievements';
      },
    },
    {
      id: 'skills',
      name: '/skills',
      label: 'Technology Constellation (23 Skills)',
      category: 'Navigation',
      icon: Sparkles,
      action: () => {
        window.location.hash = '#skills';
      },
    },
    {
      id: 'desk',
      name: '/desk',
      label: 'Interactive Developer Desk',
      category: 'Explore',
      icon: Laptop,
      action: () => {
        window.location.hash = '#desk';
      },
    },
    {
      id: 'terminal',
      name: '/terminal',
      label: 'Interactive CLI Shell',
      category: 'Explore',
      icon: Terminal,
      action: () => {
        window.location.hash = '#terminal';
      },
    },
    {
      id: 'playground',
      name: '/playground',
      label: 'Algorithm Visualizers (Sorting & Binary Search)',
      category: 'Explore',
      icon: Code,
      action: () => {
        window.location.hash = '#playground';
      },
    },
    {
      id: 'arcade',
      name: '/arcade',
      label: 'Speed Typing & Memory Games',
      category: 'Explore',
      icon: Gamepad2,
      action: () => {
        window.location.hash = '#arcade';
      },
    },
    {
      id: 'github',
      name: '/github',
      label: 'Live GitHub Activity Feed',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => {
        window.location.hash = '#github';
      },
    },
    {
      id: 'recruiter',
      name: '/recruiter',
      label: 'Launch 90-Second Recruiter Tour',
      category: 'Actions',
      icon: UserCheck,
      action: () => {
        onOpenRecruiter();
      },
    },
    {
      id: 'theme',
      name: '/theme',
      label: 'Toggle Theme (Dark Lab ↔ Cyber Yellow)',
      category: 'Actions',
      icon: Sun,
      action: () => {
        onToggleTheme();
      },
    },
    {
      id: 'resume',
      name: '/resume',
      label: 'Open LinkedIn Profile & Credentials',
      category: 'Actions',
      icon: ExternalLink,
      action: () => {
        window.open('https://www.linkedin.com/in/shardul-parihar/', '_blank');
      },
    },
    {
      id: 'contact',
      name: '/contact',
      label: 'Get in Touch / Contact Interface',
      category: 'Navigation',
      icon: Mail,
      action: () => {
        window.location.hash = '#contact';
      },
    },
  ];

  const filtered = COMMANDS.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      labAudio.playClick(900);
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or custom event
        }
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
        labAudio.playKey();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
        labAudio.playKey();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          labAudio.playClick(1000);
          filtered[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99990] flex items-start justify-center pt-16 sm:pt-24 p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)] bg-[var(--surface)]">
              <Search size={18} className="text-[var(--accent)] flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search section (e.g. /projects, /recruiter)..."
                className="w-full bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder-[var(--text-sub)] mono"
              />
              <span className="mono text-[10px] px-2 py-1 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-sub)]">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-[var(--text-sub)] mono text-xs">
                  No matching commands found for &quot;{query}&quot;.
                </div>
              ) : (
                filtered.map((cmd, i) => {
                  const Icon = cmd.icon;
                  const isSelected = i === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        labAudio.playClick(1000);
                        cmd.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition-all mono text-xs cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--accent-dim)] text-[var(--text)] border border-[var(--border-glow)]'
                          : 'text-[var(--text-muted)] hover:bg-[var(--surface)] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          size={16}
                          className={isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-sub)]'}
                        />
                        <span className="font-bold text-[var(--accent)] flex-shrink-0">
                          {cmd.name}
                        </span>
                        <span className="truncate text-[var(--text)]">
                          {cmd.label}
                        </span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--text-sub)] uppercase tracking-wider flex-shrink-0">
                        {cmd.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Keyboard Shortcuts Footer */}
            <div className="flex items-center justify-between px-5 py-2.5 border-t border-[var(--border)] bg-[var(--surface-2)] text-[10px] mono text-[var(--text-sub)]">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-[var(--accent)] font-semibold">SHARDUL.LAB COMMAND PALETTE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
