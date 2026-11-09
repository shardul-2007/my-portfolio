'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, RotateCcw, Zap, Trophy, Timer, CheckCircle2 } from 'lucide-react';
import { labAudio } from '@/lib/audio';

export default function ArcadeSection() {
  const [activeGame, setActiveGame] = useState<'typing' | 'memory'>('typing');

  // ── 1. Typing Challenge State ──────────────────────────────────
  const SNIPPET = 'const civicOS = new MunicipalPlatform({ aiAssisted: true, liveTelemetry: true });';
  const [typed, setTyped] = useState('');
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);

  function handleTypingInput(val: string) {
    if (!typingStartTime) setTypingStartTime(Date.now());
    setTyped(val);
    labAudio.playKey();

    // Check accuracy
    let errors = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== SNIPPET[i]) errors++;
    }
    const acc = val.length === 0 ? 100 : Math.max(0, Math.round(((val.length - errors) / val.length) * 100));
    setAccuracy(acc);

    // Calculate WPM
    if (typingStartTime) {
      const minutes = (Date.now() - typingStartTime) / 60000;
      if (minutes > 0.01) {
        const words = val.length / 5;
        setWpm(Math.round(words / minutes));
      }
    }

    if (val === SNIPPET) {
      setIsCompleted(true);
      labAudio.playChime();
    }
  }

  function resetTyping() {
    labAudio.playClick(900);
    setTyped('');
    setTypingStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
  }

  // ── 2. Memory Matrix State ─────────────────────────────────────
  const [pattern, setPattern] = useState<number[]>([0, 4, 8, 2]);
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [userStep, setUserStep] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlayingPattern, setIsPlayingPattern] = useState(false);

  function startMemoryRound() {
    labAudio.playClick(1000);
    setUserStep(0);
    const newLength = 3 + score;
    const newPattern = Array.from({ length: newLength }, () => Math.floor(Math.random() * 9));
    setPattern(newPattern);
    playSequence(newPattern);
  }

  async function playSequence(seq: number[]) {
    setIsPlayingPattern(true);
    for (const cell of seq) {
      await new Promise(r => setTimeout(r, 450));
      setActiveCell(cell);
      labAudio.playClick(600 + cell * 50);
      await new Promise(r => setTimeout(r, 400));
      setActiveCell(null);
    }
    setIsPlayingPattern(false);
  }

  function handleCellClick(index: number) {
    if (isPlayingPattern) return;
    labAudio.playClick(600 + index * 50);

    if (pattern[userStep] === index) {
      const next = userStep + 1;
      setUserStep(next);

      if (next === pattern.length) {
        const nextScore = score + 1;
        setScore(nextScore);
        if (nextScore > highScore) setHighScore(nextScore);
        labAudio.playChime();
        setTimeout(() => startMemoryRound(), 800);
      }
    } else {
      // Failed pattern
      setScore(0);
      setUserStep(0);
      alert('Pattern mismatch! Restarting matrix test.');
    }
  }

  return (
    <section id="arcade" className="py-28 relative border-b border-[var(--border)] overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Gamepad2 size={14} className="text-[var(--accent-orange)]" />
            <span className="sys-label-orange">ENGINEERING ARCADE // COGNITIVE MINI EXPERIENCES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)] font-editorial">
            Arcade &amp; <span className="gradient-orange">Mini Labs.</span>
          </h2>
          <p className="text-base text-[var(--text-muted)] font-light mt-3 leading-relaxed">
            Lightweight interactive code typing challenges and memory matrix puzzles. Test typing speed and cognitive recall.
          </p>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-[var(--border)] mb-8">
          {[
            { id: 'typing', label: '01. SPEED CODE TYPING CHALLENGE' },
            { id: 'memory', label: '02. MATRIX RECALL PUZZLE' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                labAudio.playClick(900);
                setActiveGame(tab.id as typeof activeGame);
              }}
              className={`mono text-xs px-4 py-2 rounded-xl transition-all cursor-pointer font-semibold ${
                activeGame === tab.id
                  ? 'bg-[var(--accent-orange)] text-white shadow-[0_0_15px_rgba(255,107,53,0.35)]'
                  : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Game 1: Speed Typing Challenge */}
        {activeGame === 'typing' && (
          <div className="p-6 sm:p-8 rounded-3xl glass border border-[var(--border-strong)] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
              <div>
                <h3 className="font-bold text-lg text-[var(--text)]">TypeScript Speed Typing Test</h3>
                <div className="mono text-xs text-[var(--text-sub)]">
                  Snippet from CivicOS Municipal Platform
                </div>
              </div>

              <div className="flex items-center gap-6 mono text-xs">
                <div>
                  <span className="text-[var(--text-sub)]">SPEED:</span>
                  <span className="text-[var(--accent)] font-bold ml-1.5">{wpm} WPM</span>
                </div>
                <div>
                  <span className="text-[var(--text-sub)]">ACCURACY:</span>
                  <span className="text-[#10B981] font-bold ml-1.5">{accuracy}%</span>
                </div>
                <button
                  onClick={resetTyping}
                  className="p-1.5 rounded-lg bg-[var(--surface-2)] text-[var(--text-sub)] hover:text-white cursor-pointer"
                  title="Reset typing test"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* Target Snippet */}
            <div className="p-5 rounded-2xl bg-[#07090F] border border-[var(--border)] font-mono text-xs sm:text-sm text-[var(--text-sub)] leading-relaxed select-none">
              {SNIPPET.split('').map((char, i) => {
                const typedChar = typed[i];
                let color = 'text-[var(--text-sub)]';
                if (typedChar !== undefined) {
                  color = typedChar === char ? 'text-[#00F5C8] font-bold' : 'text-[#EF4444] bg-[#EF4444]/20';
                }
                return (
                  <span key={i} className={color}>
                    {char}
                  </span>
                );
              })}
            </div>

            {/* Typing Input */}
            <input
              type="text"
              value={typed}
              onChange={e => handleTypingInput(e.target.value)}
              placeholder="Start typing the snippet above..."
              className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs sm:text-sm mono text-[var(--text)] placeholder-[var(--text-sub)] outline-none focus:border-[var(--accent-orange)]"
              disabled={isCompleted}
            />

            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] text-xs mono text-[#10B981] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Challenge Complete! Result: {wpm} WPM with {accuracy}% accuracy.</span>
                </div>
                <button
                  onClick={resetTyping}
                  className="underline font-bold hover:text-white cursor-pointer"
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Game 2: Memory Matrix Recall Puzzle */}
        {activeGame === 'memory' && (
          <div className="p-6 sm:p-8 rounded-3xl glass border border-[var(--border-strong)] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
              <div>
                <h3 className="font-bold text-lg text-[var(--text)]">Memory Matrix Pattern Recall</h3>
                <div className="mono text-xs text-[var(--text-sub)]">
                  Watch the light sequence and replicate the pattern exactly.
                </div>
              </div>

              <div className="flex items-center gap-6 mono text-xs">
                <div>
                  <span className="text-[var(--text-sub)]">SCORE:</span>
                  <span className="text-[var(--accent-orange)] font-bold ml-1.5">{score}</span>
                </div>
                <div>
                  <span className="text-[var(--text-sub)]">HIGH SCORE:</span>
                  <span className="text-[var(--accent)] font-bold ml-1.5">{highScore}</span>
                </div>
                <button
                  onClick={startMemoryRound}
                  className="glow-btn glow-btn-orange text-xs py-1.5 px-3"
                >
                  <span>{isPlayingPattern ? 'WATCHING...' : 'PLAY SEQUENCE'}</span>
                </button>
              </div>
            </div>

            {/* 3x3 Grid Matrix */}
            <div className="max-w-[280px] mx-auto grid grid-cols-3 gap-3 p-4 bg-[#0A0D18] rounded-2xl border border-[var(--border)]">
              {Array.from({ length: 9 }).map((_, i) => {
                const isActive = activeCell === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleCellClick(i)}
                    className={`aspect-square rounded-xl transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#FF6B35] border-[#FF6B35] shadow-[0_0_20px_#FF6B35] scale-105'
                        : 'bg-[var(--surface-2)] border-[var(--border)] hover:border-[var(--border-strong)]'
                    }`}
                  />
                );
              })}
            </div>

            <div className="text-center mono text-xs text-[var(--text-sub)]">
              {isPlayingPattern ? 'Memorizing sequence...' : `Step ${userStep + 1} of ${pattern.length}`}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
