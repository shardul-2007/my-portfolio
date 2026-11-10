'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Gamepad2,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Flame,
  Award,
} from 'lucide-react';
import { labAudio } from '@/lib/audio';

export default function ArcadeSection() {
  const [filter, setFilter] = useState<'all' | 'stage' | 'builds' | 'hackathons'>('all');

  // Interactive Card States
  // 1. Spotlight mask tracking
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  // 2. RC Car Driving state
  const [carDriving, setCarDriving] = useState(false);

  // 3. Audio Equalizer beat state
  const [isPlayingBeat, setIsPlayingBeat] = useState(true);

  // 4. Paper plane swoop
  const [planeLoop, setPlaneLoop] = useState(0);

  // 5. Bug hunt score
  const [bugScore, setBugScore] = useState(0);

  function handleSpotlightMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  }

  function handleCarClick() {
    labAudio.playClick(1200);
    setCarDriving(true);
    setTimeout(() => setCarDriving(false), 2400);
  }

  function handleBeatToggle() {
    const next = !isPlayingBeat;
    setIsPlayingBeat(next);
    if (next) labAudio.playChime();
  }

  function handlePlaneClick() {
    labAudio.playClick(900);
    setPlaneLoop(p => p + 1);
  }

  function handleWhackBug() {
    labAudio.playSquish();
    setBugScore(s => s + 1);
  }

  return (
    <section id="arcade" className="py-24 relative border-b border-[var(--border)] overflow-hidden bg-[var(--paper)]">
      <div className="section-container">
        {/* Continuous Marquee Ticker */}
        <div className="overflow-hidden py-3 mb-10 border-y border-[var(--border)] relative bg-[var(--surface-2)]">
          <div className="marquee-track flex gap-8 items-center text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#171416] select-none">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-8 items-center">
                <span>build</span>
                <span className="text-[#D9363E] text-2xl font-serif">✦</span>
                <span className="font-serif-italic font-normal text-[#EF493F] lowercase">engineer</span>
                <span className="text-[#A91F2C] text-2xl font-serif">✦</span>
                <span className="font-serif-italic font-normal text-[#D9363E] lowercase">iterate</span>
                <span className="text-[#12a150] text-2xl font-serif">✦</span>
                <span>ship</span>
                <span className="text-[#D9363E] text-2xl font-serif">✦</span>
                <span>solve</span>
                <span className="text-[#A91F2C] text-2xl font-serif">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Heading & Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
              <span className="mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-sub)]">
                ENGINEERING PLAYGROUND
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416]">
                engineering in <span className="font-serif-italic font-normal text-[#D9363E]">motion</span>
              </h2>
            </div>
            <p className="text-xs text-[#81777A] mono mt-1">curious experiments, interactive builds &amp; micro-demos</p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'ALL 6 EXPERIMENTS' },
              { id: 'stage', label: 'INTERACTION' },
              { id: 'builds', label: 'HARDWARE & LAB' },
              { id: 'hackathons', label: 'HACKATHONS' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  labAudio.playClick(900);
                  setFilter(tab.id as typeof filter);
                }}
                className={`mono text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-bold ${
                  filter === tab.id
                    ? 'bg-[#171416] text-white shadow-sm'
                    : 'bg-white border border-[var(--border)] text-[var(--text-sub)] hover:text-[#171416]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── All Moving / Responsive Interactive Cards Grid (Image 6 Parity) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: ACT I (Spotlight Mask) */}
          {(filter === 'all' || filter === 'stage') && (
            <motion.div
              layout
              onMouseMove={handleSpotlightMove}
              className="relative h-80 rounded-3xl p-6 bg-[#1e1420] text-white overflow-hidden shadow-lg flex flex-col justify-between group cursor-pointer"
            >
              {/* Dynamic Interactive Spotlight */}
              <div
                style={{
                  background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255, 228, 92, 0.45) 0%, rgba(255, 228, 92, 0.08) 45%, transparent 70%)`,
                }}
                className="absolute inset-0 pointer-events-none transition-all duration-75"
              />

              <div className="relative z-10">
                <span className="mono text-[10px] tracking-widest uppercase text-amber-300">
                  ACT I
                </span>
                <h3 className="text-xl font-bold mt-1">national stage, take one</h3>
              </div>

              {/* Animated Mask Face */}
              <div className="relative z-10 my-auto flex justify-center">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-full bg-[#ffe45c] flex items-center justify-center text-black shadow-xl"
                >
                  <svg viewBox="0 0 100 100" className="w-16 h-16 fill-current">
                    <circle cx="35" cy="40" r="5" />
                    <circle cx="65" cy="40" r="5" />
                    <path d="M30 60 Q50 82 70 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
                  </svg>
                </motion.div>
              </div>

              <div className="relative z-10 mono text-[10px] text-[#9e9c95] uppercase">
                TWO-TIME NATIONAL LEVEL · ACTING &amp; PITCH
              </div>
            </motion.div>
          )}

          {/* Card 2: 23 Hackathon Finals (Animated Stream) */}
          {(filter === 'all' || filter === 'hackathons') && (
            <motion.div
              layout
              className="relative h-80 rounded-3xl p-6 bg-[#A91F2C] text-white overflow-hidden shadow-lg flex flex-col justify-between group"
            >
              {/* Blueprint Grid on Crimson */}
              <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

              <div className="relative z-10">
                <span className="mono text-[10px] tracking-widest uppercase text-red-200">
                  SPRINTS
                </span>
                <h3 className="text-xl font-bold mt-1">hackathon finals</h3>
              </div>

              {/* Big Animated 23 Counter */}
              <div className="relative z-10 my-auto text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="text-7xl font-black tracking-tighter text-[#FFE500]"
                >
                  23
                </motion.div>
                <div className="mono text-xs font-semibold text-red-100 mt-1">
                  finalist podiums &amp; overnight builds
                </div>
              </div>

              {/* Animated Commit Ticker */}
              <div className="relative z-10 mono text-[10px] bg-black/25 px-3 py-1.5 rounded-lg flex items-center justify-between text-red-200">
                <span className="truncate">git commit -m &quot;ship product&quot;</span>
                <span className="text-emerald-300 font-bold ml-2">✓</span>
              </div>
            </motion.div>
          )}

          {/* Card 3: VROOM RC Car (Driving Animation) */}
          {(filter === 'all' || filter === 'builds') && (
            <motion.div
              layout
              onClick={handleCarClick}
              className="relative h-80 rounded-3xl p-6 bg-[#ff6b1a] text-white overflow-hidden shadow-lg flex flex-col justify-between cursor-pointer group"
            >
              <div className="relative z-10">
                <span className="mono text-[10px] tracking-widest uppercase text-orange-200">
                  FIRST SEMESTER PROJECT
                </span>
                <h3 className="text-4xl font-black tracking-tight mt-0.5">VROOM</h3>
              </div>

              {/* Animated Driving Car */}
              <div className="relative z-10 my-auto w-full overflow-hidden py-4">
                <motion.div
                  animate={carDriving ? { x: ['-20%', '120%'] } : { x: ['0%', '8%', '0%'] }}
                  transition={carDriving ? { duration: 1.8, ease: 'easeInOut' } : { duration: 2.5, repeat: Infinity }}
                  className="w-36 h-20 relative mx-auto"
                >
                  {/* Car Body */}
                  <div className="w-28 h-12 rounded-2xl bg-black relative mx-auto shadow-md">
                    <div className="absolute top-1 left-2 w-8 h-5 rounded-lg bg-yellow-300" />
                    {/* Headlight beam */}
                    <div className="absolute top-3 right-0 w-8 h-3 bg-yellow-200/50 blur-[2px] rounded-r-full" />
                  </div>
                  {/* Spinning Wheels */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                    className="absolute -bottom-2 left-6 w-6 h-6 rounded-full bg-white border-4 border-black"
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                    className="absolute -bottom-2 right-6 w-6 h-6 rounded-full bg-white border-4 border-black"
                  />
                </motion.div>
              </div>

              <div className="relative z-10 flex items-center justify-between mono text-[10px] text-orange-100">
                <span>CLICK TO ACCELERATE</span>
                <span className="px-2 py-0.5 rounded-full bg-black text-white font-bold">● IT DRIVES</span>
              </div>
            </motion.div>
          )}

          {/* Card 4: Audio Synth / Deep Focus Mode (Animated Equalizer Bars) */}
          {(filter === 'all' || filter === 'stage') && (
            <motion.div
              layout
              onClick={handleBeatToggle}
              className="relative h-80 rounded-3xl p-6 bg-[#D9363E] text-white overflow-hidden shadow-lg flex flex-col justify-between cursor-pointer group"
            >
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <span className="mono text-[10px] tracking-widest uppercase text-red-100">
                    FLOW STATE
                  </span>
                  <h3 className="text-xl font-bold mt-1">code rhythm synth</h3>
                </div>
                <div className="p-2 rounded-full bg-white/20">
                  {isPlayingBeat ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </div>
              </div>

              {/* Real-time Bouncing Equalizer Bars */}
              <div className="relative z-10 my-auto flex items-end justify-center gap-2 h-24">
                {[12, 28, 42, 60, 85, 48, 70, 95, 55, 34, 68, 20].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={
                      isPlayingBeat
                        ? { height: [`${h * 0.3}px`, `${h}px`, `${h * 0.4}px`] }
                        : { height: '8px' }
                    }
                    transition={{
                      duration: 0.4 + (i % 4) * 0.15,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    className="w-2.5 rounded-full bg-white shadow-sm"
                  />
                ))}
              </div>

              <div className="relative z-10 mono text-[10px] text-red-100 flex items-center justify-between">
                <span>AUDIO FREQUENCY SYNTH</span>
                <span className="font-bold">{isPlayingBeat ? 'SYNTHESIZING' : 'PAUSED'}</span>
              </div>
            </motion.div>
          )}

          {/* Card 5: Aerodynamics / Model Plane */}
          {(filter === 'all' || filter === 'builds') && (
            <motion.div
              layout
              onClick={handlePlaneClick}
              className="relative h-80 rounded-3xl p-6 bg-white border border-[var(--border)] text-[#171416] overflow-hidden shadow-lg flex flex-col justify-between cursor-pointer group"
            >
              <div className="relative z-10">
                <span className="mono text-[10px] tracking-widest uppercase text-[var(--text-sub)]">
                  PHYSICAL LAB
                </span>
                <h3 className="text-xl font-bold mt-1">aerodynamics plane</h3>
              </div>

              {/* Animated Swooping Paper Plane */}
              <div className="relative z-10 my-auto h-32 flex items-center justify-center">
                <motion.div
                  key={planeLoop}
                  animate={{
                    x: [-40, 40, -10],
                    y: [10, -25, 0],
                    rotate: [-10, 20, 5],
                  }}
                  transition={{ duration: 2.2, ease: 'easeInOut' }}
                  className="w-20 h-20 text-[#D9363E]"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <polygon points="10,50 90,15 50,85 45,55" />
                  </svg>
                </motion.div>
              </div>

              <div className="relative z-10 mono text-[10px] text-[var(--text-sub)] flex items-center justify-between">
                <span>CLICK TO LAUNCH</span>
                <span className="font-bold text-[#D9363E]">it&apos;ll fly. probably.</span>
              </div>
            </motion.div>
          )}

          {/* Card 6: Playable Bug Hunt Game */}
          {(filter === 'all' || filter === 'hackathons') && (
            <motion.div
              layout
              onClick={handleWhackBug}
              className="relative h-80 rounded-3xl p-6 bg-[#ffe45c] text-[#1e1420] overflow-hidden shadow-lg flex flex-col justify-between cursor-pointer group"
            >
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <span className="mono text-[10px] tracking-widest uppercase text-black/60">
                    DEBUGGER MINI-GAME
                  </span>
                  <h3 className="text-xl font-bold mt-1">whack-a-bug</h3>
                </div>
                <div className="mono text-xs font-bold px-2.5 py-1 rounded-full bg-black text-white">
                  SQUASHED: {bugScore}
                </div>
              </div>

              {/* Playable Bug Target */}
              <div className="relative z-10 my-auto flex justify-center">
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  animate={{
                    rotate: [0, 10, -10, 0],
                    x: [0, 15, -15, 0],
                  }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center shadow-xl"
                >
                  <svg viewBox="0 0 32 32" className="w-12 h-12 fill-red-500">
                    <circle cx="16" cy="18" r="8" />
                    <circle cx="16" cy="10" r="4" fill="white" />
                    <circle cx="13" cy="16" r="1.5" fill="black" />
                    <circle cx="19" cy="16" r="1.5" fill="black" />
                    <circle cx="16" cy="21" r="1.5" fill="black" />
                  </svg>
                </motion.div>
              </div>

              <div className="relative z-10 mono text-[10px] text-black/70 flex items-center justify-between font-bold">
                <span>CLICK TO SQUASH BUG</span>
                <span>+10 PTS</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
