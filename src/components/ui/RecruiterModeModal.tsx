'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  X,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Download,
  Mail,
  MapPin,
  Layers,
  Award,
} from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { PROJECTS } from '@/data/projects';
import { labAudio } from '@/lib/audio';

interface RecruiterModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruiterModeModal({ isOpen, onClose }: RecruiterModeModalProps) {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    labAudio.playChime();
    setTimeout(() => setCopied(false), 2000);
  }

  // Skill-to-Project Proof Matrix
  const PROOF_MATRIX = [
    {
      skill: 'Full-Stack Web (React, Next.js 14/16, TypeScript)',
      proof: 'CivicOS & SkillCert',
      evidenceUrl: 'https://civicos-beta.vercel.app',
      detail: 'Architected production App Router applications with Server Actions, complex state, and component systems.',
    },
    {
      skill: '3D Spatial WebGL & Interactive Graphics',
      proof: 'AssemblyOS',
      evidenceUrl: 'https://assemblyos-sigma.vercel.app',
      detail: 'Built real-time Three.js / R3F exploded-view drone assembly platform with 60fps GPU rendering and CAD import.',
    },
    {
      skill: 'Applied AI & Copilot Integrations',
      proof: 'CivicOS & AssemblyOS',
      evidenceUrl: 'https://civicos-beta.vercel.app',
      detail: 'Recognized by Google as Top Prompt Creator. Implemented natural language municipal query resolution and 3D copilot actions.',
    },
    {
      skill: 'SaaS Architecture & Automated PDF Credentialing',
      proof: 'SkillCert',
      evidenceUrl: 'https://certify-testfdp.vercel.app',
      detail: 'Server-side exam evaluation, anti-cheat tab sensor, pdf-lib vector certificate generation, and Resend transactional email.',
    },
    {
      skill: 'Data Structures, Algorithms & Systems Rigor',
      proof: 'HackerRank Campus Crew & C++ Engine',
      evidenceUrl: 'https://github.com/shardul-2007',
      detail: 'Competitive interview selection for HackerRank Campus Crew; research on KV Cache compression in LLMs (adaptq).',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99995] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-3xl p-6 sm:p-9 shadow-[0_30px_100px_rgba(0,0,0,0.85)] z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-[var(--surface-2)] text-[var(--text-sub)] hover:text-[var(--text)] cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)] animate-pulse" />
              <span className="mono text-xs font-bold text-[var(--accent-orange)] tracking-wider">
                90-SECOND RECRUITER &amp; HIRING BRIEFING
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] font-editorial tracking-tight">
              Shardul Parihar — Engineering Dossier
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs mono text-[var(--text-sub)] mt-2">
              <span className="flex items-center gap-1 text-[var(--accent-lime)] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)]" />
                AVAILABLE FOR HIRE
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin size={11} /> Pune, India
              </span>
              <span>·</span>
              <span>PCET&apos;s NMIET</span>
            </div>

            {/* Candidate Summary */}
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light leading-relaxed mt-4 pt-4 border-t border-[var(--border)]">
              Software engineering student with deep competence across full-stack TypeScript/Next.js architectures, 3D WebGL rendering, applied AI integrations, and algorithms. Demonstrates a strong track record of shipping complex systems (CivicOS, AssemblyOS, SkillCert) and holding technical leadership roles as a <strong>Google Student Ambassador</strong> and <strong>HackerRank Campus Crew</strong> lead.
            </p>

            {/* Metric Snapshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 my-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-center mono">
              <div>
                <div className="text-xl font-bold text-[var(--accent)]">17+</div>
                <div className="text-[10px] text-[var(--text-sub)]">PROGRAMS / ROLES</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[var(--text)]">16</div>
                <div className="text-[10px] text-[var(--text-sub)]">CREDENTIALS</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[var(--accent-orange)]">04</div>
                <div className="text-[10px] text-[var(--text-sub)]">PRODUCTION SYSTEMS</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[var(--accent-lime)]">100%</div>
                <div className="text-[10px] text-[var(--text-sub)]">VERIFIED CLAIMS</div>
              </div>
            </div>

            {/* Skill-to-Project Evidence Matrix */}
            <div className="space-y-3 mt-6">
              <div className="mono text-xs font-bold text-[var(--text)] flex items-center justify-between">
                <span>SKILL-TO-PROJECT PROOF MATRIX:</span>
                <span className="text-[var(--accent)] text-[10px]">ZERO UNSUPPORTED CLAIMS</span>
              </div>

              <div className="space-y-2.5">
                {PROOF_MATRIX.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs space-y-1"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-semibold text-[var(--text)]">{item.skill}</div>
                      <a
                        href={item.evidenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono text-[10px] text-[var(--accent)] hover:underline flex items-center gap-1 font-bold"
                      >
                        <span>Proof: {item.proof}</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] font-light leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fast Recruiter Action Buttons */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-wrap items-center gap-3">
              <button
                onClick={copyEmail}
                className="glow-btn glow-btn-primary text-xs py-2 px-4 flex-1 justify-center"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'EMAIL COPIED TO CLIPBOARD!' : 'COPY DIRECT EMAIL'}</span>
              </button>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn glow-btn-orange text-xs py-2 px-4 flex-1 justify-center"
              >
                <ExternalLink size={14} />
                <span>LINKEDIN PROFILE &amp; CV</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
