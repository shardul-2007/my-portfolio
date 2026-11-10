'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sun,
  Moon,
  Terminal,
  CheckSquare,
  Square,
  Award,
  Sparkles,
  Smartphone,
  RotateCcw,
} from 'lucide-react';
import { labAudio } from '@/lib/audio';
import { PROFILE } from '@/data/profile';
import { assetPath } from '@/lib/basePath';

interface DeveloperDeskProps {
  onOpenRecruiter: () => void;
}

export default function DeveloperDesk({ onOpenRecruiter }: DeveloperDeskProps) {
  const [deskMode, setDeskMode] = useState<'designer' | 'developer'>('developer');
  const [typedOutput, setTypedOutput] = useState<string[]>([
    'shardul@pune:~$ help',
    'available commands: whoami, projects, skills, resume, contact, clear',
  ]);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Sticky TODO Items
  const [todos, setTodos] = useState([
    { id: 1, text: 'build CivicOS & AssemblyOS', done: true },
    { id: 2, text: '23 hackathon finals', done: true },
    { id: 3, text: 'center a div on purpose', done: true },
    { id: 4, text: 'ship autonomous rover', done: false },
    { id: 5, text: 'sleep 8 hours', done: false },
  ]);

  function toggleTodo(id: number) {
    labAudio.playClick(950);
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function handleKeyPress(char: string) {
    labAudio.playKey();
    setActiveKey(char);
    setTimeout(() => setActiveKey(null), 150);

    if (char === 'clear') {
      setTypedOutput(['shardul@pune:~$ clear']);
    } else {
      setTypedOutput(prev => [...prev.slice(-6), `> typed: ${char}`]);
    }
  }

  function handleCommand(cmd: string) {
    labAudio.playKey();
    if (cmd === 'whoami') {
      setTypedOutput(prev => [
        ...prev.slice(-5),
        'shardul@pune:~$ whoami',
        'Shardul Parihar · Computer Science (AIML) Engineer & Autonomous Systems Builder',
      ]);
    } else if (cmd === 'projects') {
      setTypedOutput(prev => [
        ...prev.slice(-5),
        'shardul@pune:~$ projects',
        'CivicOS (Autonomous Tech), AssemblyOS (3D WebGL), SkillCert (Credentials)',
      ]);
    } else if (cmd === 'resume') {
      setTypedOutput(prev => [
        ...prev.slice(-5),
        'shardul@pune:~$ resume',
        'launching 90-second recruiter brief...',
      ]);
      onOpenRecruiter();
    } else if (cmd === 'clear') {
      setTypedOutput(['shardul@pune:~$ ']);
    } else {
      setTypedOutput(prev => [
        ...prev.slice(-5),
        `shardul@pune:~$ ${cmd}`,
        `executed: ${cmd} with status code 0 OK`,
      ]);
    }
  }

  return (
    <section id="desk" className="py-24 relative border-b border-[var(--border)] overflow-hidden bg-[var(--paper)]">
      <div className="section-container">
        {/* Header Controls (Image 8 Parity) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="eyebrow">interactive workbench</span>
              <span className="mono text-[10px] text-[var(--text-sub)]">· draggable physical items</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1e1420]">
              developer <span className="font-serif-italic font-normal text-[#ff4f9a]">desk</span>.
            </h2>
          </div>

          {/* Mode Switcher: Designer Mode vs Developer Mode (Image 8 Parity) */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white border border-[var(--border)] shadow-sm self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                labAudio.playClick(900);
                setDeskMode('designer');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full mono text-xs font-bold transition-all cursor-pointer ${
                deskMode === 'designer'
                  ? 'bg-[#1e1420] text-white shadow-sm'
                  : 'text-[var(--text-sub)] hover:text-[#1e1420]'
              }`}
            >
              <Sun size={12} />
              <span>designer mode</span>
            </button>

            <button
              type="button"
              onClick={() => {
                labAudio.playClick(1050);
                setDeskMode('developer');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full mono text-xs font-bold transition-all cursor-pointer ${
                deskMode === 'developer'
                  ? 'bg-[#1e1420] text-white shadow-sm'
                  : 'text-[var(--text-sub)] hover:text-[#1e1420]'
              }`}
            >
              <Moon size={12} />
              <span>developer mode</span>
            </button>
          </div>
        </div>

        {/* ─── Physical Desk Mat (Wood Grain / Warm Tone Canvas) ─── */}
        <div className="relative w-full min-h-[640px] lg:min-h-[700px] rounded-3xl overflow-hidden p-6 sm:p-10 shadow-2xl border border-[var(--border)] bg-[#2a2530] text-white select-none">
          {/* Ambient Warm Desk Lamp Cone (Image 8 Parity) */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-b from-amber-300/30 via-amber-200/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Desk Lamp Hardware Fixture */}
          <div className="absolute top-4 right-1/4 w-12 h-12 rounded-full bg-[#ffe45c] shadow-[0_0_50px_rgba(255,228,92,0.8)] border-4 border-amber-600 hidden sm:block pointer-events-none" />

          {/* Header Time Banner (Image 8 Parity) */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 mono text-xs text-amber-200/80">
            <div>
              <span className="font-bold text-white">2:00 A.M.</span> · LAMP ON · CHAI #3 · IT COMPILES, SHIP IT
            </div>
            <div className="text-[10px] text-white/50">
              DRAG ANY ITEM TO REPOSITION ON DESK
            </div>
          </div>

          {/* ─── Draggable Items Canvas ─── */}
          <div className="relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Desk: Draggable iPad / Screen + Working Keyboard */}
            <motion.div
              drag
              dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
              className="lg:col-span-7 bg-[#16151c] rounded-2xl p-5 border border-white/15 shadow-2xl space-y-4 cursor-grab active:cursor-grabbing"
            >
              {/* Screen Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffcc00]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28cd41]" />
                  <span className="mono text-[10px] text-white/60 ml-2">shardul@pune: ~</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {['whoami', 'projects', 'resume', 'clear'].map(cmd => (
                    <button
                      key={cmd}
                      onClick={() => handleCommand(cmd)}
                      className="mono text-[9px] px-2 py-0.5 rounded bg-white/10 hover:bg-[#8b5cf6] text-white transition-colors cursor-pointer"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Screen Body */}
              <div className="h-44 overflow-y-auto font-mono text-xs text-emerald-400 space-y-1 bg-black/40 p-3 rounded-xl border border-white/5">
                {typedOutput.map((line, i) => (
                  <div key={i} className="leading-relaxed">
                    {line}
                  </div>
                ))}
              </div>

              {/* Working Mechanical Keyboard (Image 8 Parity) */}
              <div className="pt-2">
                <div className="mono text-[9px] text-white/40 uppercase mb-2">
                  WORKING MECHANICAL KEYBOARD · CLICK ANY KEY
                </div>
                <div className="grid grid-cols-10 gap-1 text-center font-mono text-xs">
                  {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(k => (
                    <button
                      key={k}
                      onClick={() => handleKeyPress(k)}
                      className={`h-8 rounded-md border font-bold transition-all cursor-pointer flex items-center justify-center ${
                        activeKey === k
                          ? 'bg-[#ff4f9a] text-white border-[#ff4f9a] translate-y-1'
                          : 'bg-[#25232d] text-white/90 border-white/15 hover:bg-white/20'
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-9 gap-1 text-center font-mono text-xs mt-1">
                  {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(k => (
                    <button
                      key={k}
                      onClick={() => handleKeyPress(k)}
                      className={`h-8 rounded-md border font-bold transition-all cursor-pointer flex items-center justify-center ${
                        activeKey === k
                          ? 'bg-[#ff4f9a] text-white border-[#ff4f9a] translate-y-1'
                          : 'bg-[#25232d] text-white/90 border-white/15 hover:bg-white/20'
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>

                <div className="flex gap-1 mt-1 font-mono text-xs">
                  <button
                    onClick={() => handleKeyPress('SPACE')}
                    className="flex-1 h-8 rounded-md bg-[#25232d] hover:bg-white/20 border border-white/15 text-white/70 font-bold transition-all cursor-pointer flex items-center justify-center text-[10px]"
                  >
                    SPACEBAR
                  </button>
                  <button
                    onClick={() => handleCommand('clear')}
                    className="px-3 h-8 rounded-md bg-[#ff4f9a] hover:bg-[#ff3377] text-white font-bold transition-all cursor-pointer flex items-center justify-center text-[10px]"
                  >
                    RETURN
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Desk: Sticky Note, iPhone & Polaroid (All Draggable!) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Draggable Yellow Sticky Note (Image 8 Parity) */}
              <motion.div
                drag
                dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
                className="bg-[#ffe45c] text-[#1e1420] p-5 rounded-2xl shadow-xl border border-amber-400 rotate-1 cursor-grab active:cursor-grabbing"
              >
                <div className="font-serif-italic text-lg font-bold pb-2 border-b border-black/10 flex items-center justify-between">
                  <span>TODO</span>
                  <span className="mono text-[10px]">STICKY NOTE</span>
                </div>

                <div className="mt-3 space-y-2 mono text-xs">
                  {todos.map(t => (
                    <div
                      key={t.id}
                      onClick={() => toggleTodo(t.id)}
                      className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                    >
                      {t.done ? (
                        <CheckSquare size={13} className="text-black" />
                      ) : (
                        <Square size={13} className="text-black/50" />
                      )}
                      <span className={t.done ? 'line-through opacity-60' : 'font-medium'}>
                        {t.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Draggable iPhone with Live Notifications (Image 8 Parity) */}
              <motion.div
                drag
                dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
                className="bg-[#0f0e14] border-2 border-white/20 rounded-[32px] p-4 text-white shadow-2xl -rotate-2 cursor-grab active:cursor-grabbing space-y-3"
              >
                {/* Dynamic Island & Time */}
                <div className="flex items-center justify-between px-2 pt-1 text-[10px] mono text-white/70">
                  <span>9:41</span>
                  <div className="w-12 h-3.5 rounded-full bg-black border border-white/10" />
                  <span>5G</span>
                </div>

                {/* Big Clock */}
                <div className="text-center py-2">
                  <div className="text-3xl font-bold tracking-tight">9:41</div>
                  <div className="text-[10px] text-white/50 mono">focus mode: off</div>
                </div>

                {/* Push Notifications (Image 8 Parity) */}
                <div className="space-y-1.5 text-left">
                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-[10px]">
                    <div className="font-bold text-amber-300">🏆 Hackathon</div>
                    <div className="text-white/80">you made the finals. again. that&apos;s 23.</div>
                  </div>

                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-[10px]">
                    <div className="font-bold text-emerald-300">🐙 GitHub</div>
                    <div className="text-white/80">Pull request merged into main ✓</div>
                  </div>

                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-[10px]">
                    <div className="font-bold text-pink-300">🐍 Python</div>
                    <div className="text-white/80">IndentationError: expected indented block</div>
                  </div>
                </div>
              </motion.div>

              {/* Draggable Polaroid Photo (Image 8 Parity) */}
              <motion.div
                drag
                dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
                className="bg-white text-[#1e1420] p-3 pb-5 rounded-xl shadow-2xl rotate-3 cursor-grab active:cursor-grabbing border border-black/10"
              >
                {/* Tape strip */}
                <div className="w-14 h-4 bg-amber-100/80 -top-2 left-1/2 -translate-x-1/2 absolute border border-amber-200/50" />

                <div className="w-full h-32 rounded-lg overflow-hidden bg-gradient-to-b from-purple-200 to-pink-200">
                  <img
                    src={assetPath('/imageshardul.png')}
                    alt="Shardul Parihar"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="font-serif-italic text-sm text-center mt-2.5 text-[#1e1420]">
                  me, debugging at 2 a.m.
                </div>
              </motion.div>

              {/* Draggable Medal (Image 8 Parity) */}
              <motion.div
                drag
                dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
                className="bg-gradient-to-br from-amber-400 to-yellow-600 text-black p-4 rounded-2xl shadow-xl flex items-center justify-between cursor-grab active:cursor-grabbing -rotate-1"
              >
                <div>
                  <div className="text-3xl font-black">16</div>
                  <div className="mono text-[10px] font-bold uppercase tracking-wider">
                    VERIFIED FINALS
                  </div>
                </div>
                <div className="p-2 rounded-full bg-black/15">
                  <Award size={24} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
