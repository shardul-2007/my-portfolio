'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, CheckCircle2, FastForward } from 'lucide-react';
import { labAudio } from '@/lib/audio';

const BOOT_LOGS = [
  'INITIALIZING SHARDUL.LAB SYSTEM KERNEL v6.0...',
  'MOUNTING CORE ENGINE: Next.js 14 + TypeScript Strict Mode',
  'INDEXING PRODUCTION ARCHITECTURE: CivicOS, AssemblyOS, SkillCert',
  'SYNCHRONIZING VERIFIED EXPERIENCES: 17 Programs (Google SA, HackerRank, GSSOC)',
  'VERIFYING CREDENTIAL REPOSITORY: 16 Documented Badges & Letters',
  'INITIALIZING CONSTELLATION: 23 Validated Skills Online',
  'CALIBRATING INTERACTIVE BENCH: Algorithm Visualizers & CLI Ready',
  'ALL SYSTEMS NOMINAL. LAUNCHING ENGINEERING UNIVERSE...',
];

export default function SystemBoot({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Check if user has already seen the boot sequence in this session
    const seen = sessionStorage.getItem('shardul_lab_booted');
    if (seen === 'true') {
      setDone(true);
      onComplete?.();
      return;
    }

    // Progress interval
    const progInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Step ticker
    const stepInterval = setInterval(() => {
      setStep(prev => {
        if (prev < BOOT_LOGS.length - 1) {
          labAudio.playKey();
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 280);

    // Completion timeout
    const finishTimer = setTimeout(() => {
      finishBoot();
    }, 2400);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        finishBoot();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      clearInterval(progInterval);
      clearInterval(stepInterval);
      clearTimeout(finishTimer);
      window.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finishBoot() {
    sessionStorage.setItem('shardul_lab_booted', 'true');
    labAudio.playChime();
    setDone(true);
    onComplete?.();
  }

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#05060A] text-[#F8FAFC] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="mono font-bold text-xs tracking-[0.2em] text-[var(--accent)]">
                SHARDUL.LAB // BOOT SEQUENCE
              </span>
            </div>
            <button
              onClick={finishBoot}
              className="mono text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.1)] text-[#94A3B8] hover:text-[#FFFFFF] transition-all cursor-pointer"
            >
              <span>SKIP INTRO [ESC]</span>
              <FastForward size={12} />
            </button>
          </div>

          {/* Center Terminal Box */}
          <div className="max-w-3xl w-full mx-auto my-auto py-8">
            <div className="flex items-center gap-2 mb-6">
              <Terminal size={18} className="text-[var(--accent)]" />
              <span className="mono text-xs text-[var(--text-sub)]">ENVIRONMENT INITIALIZATION PROTOCOL</span>
            </div>

            <div className="space-y-2 mono text-xs sm:text-sm min-h-[220px]">
              {BOOT_LOGS.slice(0, step + 1).map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-start gap-2.5"
                >
                  <span className="text-[var(--accent-lime)] text-xs mt-0.5">
                    <CheckCircle2 size={13} />
                  </span>
                  <span className={i === step ? 'text-[#FFFFFF] font-semibold' : 'text-[#64748B]'}>
                    {log}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-between items-center mono text-xs text-[var(--text-sub)]">
                <span>SYSTEM CALIBRATION</span>
                <span className="text-[var(--accent)] font-bold">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--accent)] via-[#10B981] to-[#FF6B35]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Footer Security Watermark */}
          <div className="flex items-center justify-between text-[10px] mono text-[var(--text-sub)] border-t border-[rgba(255,255,255,0.06)] pt-4">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-[var(--accent-lime)]" />
              <span>CRYPTOGRAPHIC TELEMETRY VERIFIED</span>
            </div>
            <span>PUNE, IN · 2026.11 PRODUCTION BUILD</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
