'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, RotateCcw, ChevronLeft, ChevronRight, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { labAudio } from '@/lib/audio';

export default function AssemblyOSDemo() {
  const [rotation, setRotation] = useState({ x: 25, y: 35 });
  const [exploded, setExploded] = useState(30); // 0% to 100%
  const [step, setStep] = useState(4); // Current step out of 18
  const [isWireframe, setIsWireframe] = useState(false);
  const [aiInspecting, setAiInspecting] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  const STEPS_DATA = [
    { num: 1, title: 'Main Carbon Fiber Chassis Core', component: 'CHASSIS_CORE_01', status: 'Locked' },
    { num: 2, title: 'Brushless DC Motor Mount Rear-Left', component: 'MOTOR_MOUNT_RL', status: 'Locked' },
    { num: 3, title: 'ESC Power Distribution Board Mount', component: 'ESC_POWER_HUB', status: 'Aligned' },
    { num: 4, title: 'Carbon Arm Standoffs & Flight Controller Stack', component: 'FC_STANDOFFS', status: 'Active Step' },
    { num: 5, title: 'Brushless Rotor Assembly Front-Right', component: 'ROTOR_FR', status: 'Pending' },
    { num: 6, title: 'Optical Flow Downward Sensor Matrix', component: 'SENSOR_OPTICAL_02', status: 'Pending' },
  ];

  const currentStepInfo = STEPS_DATA[step - 1] || STEPS_DATA[3];

  function runAiInspection() {
    labAudio.playClick(1000);
    setAiInspecting(true);
    setAiReport(null);

    setTimeout(() => {
      setAiInspecting(false);
      labAudio.playChime();
      setAiReport(
        `[Assembly Copilot]: Optical verification complete on component "${currentStepInfo.component}". Geometric alignment within ±0.2mm tolerance. Torque requirement: 1.8 N·m. Ready to proceed to Step ${step + 1}.`
      );
    }, 900);
  }

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-[#070A12] border border-[var(--border-strong)] text-[var(--text)] font-sans">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border)] mb-5">
        <div className="flex items-center gap-2.5">
          <Layers size={14} className="text-[#5B8DEF]" />
          <span className="mono font-bold text-xs tracking-wider text-[#5B8DEF]">
            ASSEMBLYOS 3D MODEL &amp; SPATIAL GUIDANCE SIMULATOR
          </span>
        </div>
        <span className="mono text-[10px] px-2.5 py-1 rounded-full bg-[rgba(91,141,239,0.12)] border border-[rgba(91,141,239,0.3)] text-[#5B8DEF]">
          INTERACTIVE 3D CAD ENGINE
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive 3D Model Canvas */}
        <div className="lg:col-span-8 space-y-4">
          {/* 3D Viewport */}
          <div
            className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0E1A] border border-[rgba(255,255,255,0.1)] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            onMouseMove={e => {
              if (e.buttons === 1) {
                setRotation(prev => ({
                  x: Math.max(-60, Math.min(60, prev.x - e.movementY * 0.4)),
                  y: prev.y + e.movementX * 0.4,
                }));
              }
            }}
          >
            {/* 3D Canvas Background Grid & Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,141,239,0.1)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-3 left-3 text-[9px] mono text-[var(--text-sub)]">
              ROTATION: [X: {Math.round(rotation.x)}°, Y: {Math.round(rotation.y)}°] // DRAG TO ORBIT
            </div>

            {/* Simulated 3D Drone Assembly Rig */}
            <div
              className="relative w-48 h-48 sm:w-60 sm:h-60 transition-transform duration-75"
              style={{
                transform: `perspective(600px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Drone Central Core */}
              <div
                className={`absolute inset-6 rounded-2xl flex items-center justify-center transition-all ${
                  isWireframe
                    ? 'border-2 border-dashed border-[#5B8DEF] bg-transparent'
                    : 'bg-[#18233C] border border-[#5B8DEF] shadow-[0_0_25px_rgba(91,141,239,0.25)]'
                }`}
                style={{
                  transform: 'translateZ(0px)',
                }}
              >
                <span className="mono text-[10px] text-[#5B8DEF] font-bold">DRONE-X1 CORE</span>
              </div>

              {/* Exploding Arms / Motors based on exploded slider */}
              {/* Front-Left Arm */}
              <div
                className="absolute w-14 h-14 rounded-full border border-[#00F5C8] bg-[rgba(0,245,200,0.15)] flex items-center justify-center text-[9px] mono text-[#00F5C8] transition-all"
                style={{
                  top: '-15%',
                  left: '-15%',
                  transform: `translate3d(-${exploded * 0.6}px, -${exploded * 0.6}px, ${exploded * 0.8}px)`,
                }}
              >
                M1
              </div>

              {/* Front-Right Arm */}
              <div
                className="absolute w-14 h-14 rounded-full border border-[#00F5C8] bg-[rgba(0,245,200,0.15)] flex items-center justify-center text-[9px] mono text-[#00F5C8] transition-all"
                style={{
                  top: '-15%',
                  right: '-15%',
                  transform: `translate3d(${exploded * 0.6}px, -${exploded * 0.6}px, ${exploded * 0.8}px)`,
                }}
              >
                M2
              </div>

              {/* Rear-Left Arm */}
              <div
                className="absolute w-14 h-14 rounded-full border border-[#FF6B35] bg-[rgba(255,107,53,0.15)] flex items-center justify-center text-[9px] mono text-[#FF6B35] transition-all"
                style={{
                  bottom: '-15%',
                  left: '-15%',
                  transform: `translate3d(-${exploded * 0.6}px, ${exploded * 0.6}px, -${exploded * 0.8}px)`,
                }}
              >
                M3
              </div>

              {/* Rear-Right Arm */}
              <div
                className="absolute w-14 h-14 rounded-full border border-[#FF6B35] bg-[rgba(255,107,53,0.15)] flex items-center justify-center text-[9px] mono text-[#FF6B35] transition-all"
                style={{
                  bottom: '-15%',
                  right: '-15%',
                  transform: `translate3d(${exploded * 0.6}px, ${exploded * 0.6}px, -${exploded * 0.8}px)`,
                }}
              >
                M4
              </div>

              {/* Flight Controller Stack / Standoff (Active Step) */}
              <div
                className="absolute inset-14 rounded-xl border-2 border-[#FFE500] bg-[rgba(255,229,0,0.2)] flex items-center justify-center text-[9px] mono text-[#FFE500] animate-pulse transition-all"
                style={{
                  transform: `translateZ(${exploded * 1.2 + 20}px)`,
                }}
              >
                STEP {step}: FC STACK
              </div>
            </div>

            {/* Exploded View Slider Overlay */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[rgba(8,11,18,0.92)] border border-[rgba(255,255,255,0.12)] backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="mono text-[10px] text-[var(--text-sub)]">EXPLODED VIEW:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={exploded}
                  onChange={e => setExploded(Number(e.target.value))}
                  className="w-32 accent-[#5B8DEF] cursor-pointer"
                />
                <span className="mono text-xs text-[#5B8DEF] font-bold">{exploded}%</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsWireframe(!isWireframe)}
                  className="mono text-[10px] px-2 py-1 rounded bg-[var(--surface-3)] hover:text-[#5B8DEF] cursor-pointer"
                >
                  {isWireframe ? 'SOLID VIEW' : 'WIREFRAME'}
                </button>
                <button
                  onClick={() => {
                    setRotation({ x: 25, y: 35 });
                    setExploded(30);
                  }}
                  className="mono text-[10px] px-2 py-1 rounded bg-[var(--surface-3)] flex items-center gap-1 hover:text-[#5B8DEF] cursor-pointer"
                  title="Reset 3D Camera"
                >
                  <RotateCcw size={11} />
                  <span>RESET</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Step Navigator & Copilot Guidance */}
        <div className="lg:col-span-4 space-y-4">
          {/* Step Sequence Controller */}
          <div className="p-4 rounded-xl bg-[#0E1320] border border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between text-xs mono text-[var(--text-sub)]">
              <span>ASSEMBLY STEP</span>
              <span className="text-[#5B8DEF] font-bold">STEP {step} OF 18</span>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-sm text-[var(--text)]">{currentStepInfo.title}</div>
              <div className="mono text-xs text-[var(--text-muted)]">
                COMPONENT: {currentStepInfo.component}
              </div>
            </div>

            {/* Prev / Next Step Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
              <button
                disabled={step <= 1}
                onClick={() => {
                  labAudio.playClick(900);
                  setStep(s => Math.max(1, s - 1));
                  setAiReport(null);
                }}
                className="glow-btn glow-btn-ghost text-[10px] py-1.5 px-3 flex-1 justify-center disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft size={12} />
                <span>PREV STEP</span>
              </button>
              <button
                disabled={step >= 6}
                onClick={() => {
                  labAudio.playClick(1000);
                  setStep(s => Math.min(6, s + 1));
                  setAiReport(null);
                }}
                className="glow-btn glow-btn-primary text-[10px] py-1.5 px-3 flex-1 justify-center disabled:opacity-40 cursor-pointer"
              >
                <span>NEXT STEP</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* AI Copilot Verification Check */}
          <div className="p-4 rounded-xl bg-[#0E1320] border border-[var(--border)] space-y-3">
            <div className="flex items-center gap-1.5 mono text-xs text-[#5B8DEF] font-semibold">
              <Sparkles size={14} />
              <span>AI COPILOT SPATIAL VERIFICATION</span>
            </div>

            <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
              Verify component alignment, clearance tolerances, and torque specifications before locking fasteners.
            </p>

            <button
              onClick={runAiInspection}
              disabled={aiInspecting}
              className="glow-btn glow-btn-ghost text-xs w-full justify-center py-2 border-[#5B8DEF]/40 hover:border-[#5B8DEF] text-[#5B8DEF]"
            >
              <Eye size={13} />
              <span>{aiInspecting ? 'ANALYZING GEOMETRY...' : 'RUN VISUAL VERIFICATION'}</span>
            </button>

            {aiReport && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-[rgba(91,141,239,0.08)] border border-[rgba(91,141,239,0.25)] text-xs text-[var(--text)] leading-relaxed font-light"
              >
                {aiReport}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
