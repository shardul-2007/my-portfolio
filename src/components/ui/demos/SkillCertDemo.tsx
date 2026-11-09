'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileCheck2,
  Clock,
  ShieldAlert,
  QrCode,
  Award,
  CheckCircle2,
  AlertTriangle,
  Download,
  ExternalLink,
} from 'lucide-react';
import { labAudio } from '@/lib/audio';

export default function SkillCertDemo() {
  const [viewMode, setViewMode] = useState<'exam' | 'certificate'>('exam');
  const [selectedOption, setSelectedOption] = useState<number | null>(1);
  const [timeLeft, setTimeLeft] = useState(1185); // 19:45
  const [tabWarnings, setTabWarnings] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const onVisibilityChange = () => {
      if (document.hidden) {
        setTabWarnings(w => w + 1);
        setShowWarningModal(true);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-[#080B12] border border-[var(--border-strong)] text-[var(--text)] font-sans">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border)] mb-5">
        <div className="flex items-center gap-2.5">
          <FileCheck2 size={14} className="text-[#FF6B35]" />
          <span className="mono font-bold text-xs tracking-wider text-[#FF6B35]">
            SKILLCERT PROCTORED EXAM &amp; CREDENTIAL DEMO
          </span>
        </div>

        {/* View Switcher: Exam Room vs Certificate Preview */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)]">
          <button
            onClick={() => {
              labAudio.playClick(900);
              setViewMode('exam');
            }}
            className={`mono text-[10px] px-3 py-1 rounded-full cursor-pointer transition-all ${
              viewMode === 'exam'
                ? 'bg-[#FF6B35] text-white font-bold'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            PROCTORED EXAM ROOM
          </button>
          <button
            onClick={() => {
              labAudio.playClick(1000);
              setViewMode('certificate');
            }}
            className={`mono text-[10px] px-3 py-1 rounded-full cursor-pointer transition-all ${
              viewMode === 'certificate'
                ? 'bg-[#FF6B35] text-white font-bold'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            VERIFIABLE CERTIFICATE
          </button>
        </div>
      </div>

      {viewMode === 'exam' ? (
        /* ── VIEW 1: Proctored Exam Room ─────────────────────── */
        <div className="space-y-5">
          {/* Status Header: Timer & Proctoring Monitor */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#0E1320] border border-[var(--border)] flex items-center justify-between">
              <span className="mono text-xs text-[var(--text-sub)]">TIME REMAINING:</span>
              <span className="mono text-sm font-bold text-[#FF6B35] flex items-center gap-1.5">
                <Clock size={13} /> {formatTime(timeLeft)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0E1320] border border-[var(--border)] flex items-center justify-between">
              <span className="mono text-xs text-[var(--text-sub)]">PROCTORING SENSOR:</span>
              <span className="mono text-xs font-semibold text-[#10B981] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                ACTIVE
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0E1320] border border-[var(--border)] flex items-center justify-between">
              <span className="mono text-xs text-[var(--text-sub)]">TAB BLUR WARNINGS:</span>
              <span className={`mono text-xs font-bold ${tabWarnings > 0 ? 'text-[#EF4444]' : 'text-[var(--text-muted)]'}`}>
                {tabWarnings} / 3 Detected
              </span>
            </div>
          </div>

          {/* Interactive Question Card */}
          <div className="p-6 rounded-xl bg-[#0C101A] border border-[var(--border)] space-y-4">
            <div className="flex items-center justify-between text-xs mono text-[var(--text-sub)] pb-2 border-b border-[var(--border)]">
              <span>QUESTION 04 OF 25</span>
              <span>DOMAIN: FULL-STACK ARCHITECTURE &amp; SECURITY</span>
            </div>

            <h4 className="text-base font-semibold text-[var(--text)] leading-snug">
              Why must authoritative examination scoring and certificate cryptographic hash computation execute strictly in an isolated server-side environment?
            </h4>

            {/* Radio Options */}
            <div className="space-y-2.5 pt-2">
              {[
                'To improve client CSS animation frame rate in modern browsers.',
                'To prevent client-side answer key leakage, inspect-element tampering, and forged certificate issuance.',
                'To automatically send marketing analytics to third-party ad networks.',
                'Because WebGL renders faster when evaluation scripts are unloaded.',
              ].map((opt, i) => {
                const isSelected = selectedOption === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      labAudio.playClick(950);
                      setSelectedOption(i);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[rgba(255,107,53,0.12)] border-[#FF6B35] text-[var(--text)] font-medium shadow-[0_0_15px_rgba(255,107,53,0.15)]'
                        : 'bg-[#0E1320] border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] mono font-bold flex-shrink-0 ${
                        isSelected ? 'border-[#FF6B35] bg-[#FF6B35] text-white' : 'border-[var(--text-sub)]'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[var(--border)] text-xs mono">
              <span className="text-[#10B981] font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                <span>Response Saved (Continuous Real-Time Sync)</span>
              </span>

              <button
                onClick={() => {
                  labAudio.playClick(1000);
                  setViewMode('certificate');
                }}
                className="glow-btn glow-btn-orange text-xs py-1.5 px-3"
              >
                <span>SIMULATE PASSING &amp; VIEW CERTIFICATE</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ── VIEW 2: Verifiable Vector Certificate Preview ──── */
        <div className="space-y-5">
          <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-[#121626] to-[#0A0D18] border-2 border-[#FF6B35]/50 shadow-[0_12px_50px_rgba(255,107,53,0.15)] relative overflow-hidden">
            {/* Watermark Seal */}
            <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
              <Award size={140} className="text-[#FF6B35]" />
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.1)] mb-6 text-xs mono">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-[#FF6B35]" />
                <span className="font-bold text-white tracking-widest">SKILLCERT ACCREDITED CREDENTIAL</span>
              </div>
              <span className="text-[#00F5C8] font-bold">VERIFIED AUTHENTIC</span>
            </div>

            <div className="text-center space-y-3 py-4">
              <div className="mono text-xs uppercase tracking-[0.25em] text-[var(--text-sub)]">
                CERTIFICATE OF TECHNICAL PROFICIENCY
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-white tracking-tight">
                Shardul Rajendra Parihar
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto font-light leading-relaxed">
                Has successfully completed the standardized Full-Stack Engineering &amp; System Architecture Examination with an authoritative score of <strong className="text-[#00F5C8]">96.4%</strong>.
              </p>
            </div>

            {/* Certificate Metadata & QR Code Section */}
            <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.1)] flex flex-wrap items-end justify-between gap-4 text-xs mono">
              <div className="space-y-1">
                <div className="text-[10px] text-[var(--text-sub)]">UNIQUE CREDENTIAL ID:</div>
                <div className="font-bold text-white tracking-wider">CERT-2026-8F42K9</div>
                <div className="text-[10px] text-[var(--text-sub)] pt-1">
                  ISSUED: 2026.11 · VERIFY AT: certify-testfdp.vercel.app/verify
                </div>
              </div>

              {/* Scannable Dynamic QR Code Preview */}
              <div className="p-2.5 rounded-lg bg-white text-black flex items-center gap-2 shadow-lg">
                <QrCode size={40} />
                <div className="text-[9px] font-bold leading-tight uppercase">
                  <div>Scan QR</div>
                  <div>To Verify</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs mono text-[var(--text-sub)]">
            <span>Built with pdf-lib, Dynamic QR, and Resend Transactional Email</span>
            <button
              onClick={() => setViewMode('exam')}
              className="text-[#FF6B35] hover:underline cursor-pointer"
            >
              ← Return to Exam Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
