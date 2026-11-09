'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Sparkles, CheckCircle2, CornerDownLeft } from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { PROJECTS } from '@/data/projects';
import { SKILLS } from '@/data/skills';
import { EXPERIENCES } from '@/data/experience';
import { labAudio } from '@/lib/audio';

interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
}

export default function TerminalSection({ onToggleTheme }: { onToggleTheme?: () => void }) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', text: 'SHARDUL.LAB POSIX ENVIRONMENT v6.0.4 (x86_64-shardul-linux)' },
    { type: 'system', text: 'Type "help" to inspect available subsystem commands. Tab to autocomplete.' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const VALID_COMMANDS = [
    'help',
    'about',
    'whoami',
    'projects',
    'skills',
    'experience',
    'achievements',
    'github',
    'contact',
    'resume',
    'clear',
    'neofetch',
    'theme',
    'sudo',
    'matrix',
    'stats',
    'date',
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  function handleCommand(cmdRaw: string) {
    const trimmed = cmdRaw.trim();
    if (!trimmed) return;

    labAudio.playClick(950);
    setHistory(prev => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const newLines: TerminalLine[] = [...lines, { type: 'input', text: `shardul@lab:~$ ${trimmed}` }];
    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();

    switch (cmd) {
      case 'help':
        newLines.push({
          type: 'output',
          text: `AVAILABLE SUBSYSTEM COMMANDS:
  help          - Display this command dictionary
  about         - Biographical summary and research philosophy
  whoami        - Print verified identity and credentials
  projects      - List all 4 featured production engineering systems
  skills        - Enumerate 23 technical capabilities across 7 tiers
  experience    - Summarize 17 verified programs and active roles
  achievements  - Display 16 verified awards and credentials
  stats         - Show verified metric totals across the portfolio
  github        - View GitHub telemetry for @shardul-2007
  contact       - Print direct communication channels
  resume        - Direct access to verified curriculum vitae
  neofetch      - Render ASCII system diagnostics
  theme         - Toggle Dark Lab / Cyber Yellow visual environment
  clear         - Wipe the current terminal scrollback buffer
  date          - Print current local time in Pune, India (IST)`,
        });
        break;

      case 'about':
        newLines.push({
          type: 'output',
          text: `${PROFILE.fullName} — Software Engineer & Builder based in ${PROFILE.location}. Focusing on full-stack development, applied AI systems, 3D WebGL interfaces, and high-performance system design.`,
        });
        break;

      case 'whoami':
        newLines.push({
          type: 'output',
          text: `USER: shardul_parihar | ROLE: Software Engineer & Builder | COLLEGE: PCET's NMIET, Pune | STATUS: AVAILABLE FOR WORK`,
        });
        break;

      case 'projects':
        newLines.push({
          type: 'output',
          text: PROJECTS.map(
            p => `[SYS_${p.num}] ${p.name.padEnd(12)} | ${p.category.padEnd(18)} | ${p.liveUrl || 'Local'}`
          ).join('\n'),
        });
        break;

      case 'skills':
        newLines.push({
          type: 'output',
          text: `CONSTELLATION: 23 Skills across 7 Categories:
  • Frontend: React, Next.js, HTML5, CSS3, Tailwind CSS, Framer Motion
  • Languages: JavaScript, TypeScript, Python, C++
  • Backend: REST APIs, Node.js
  • AI / ML: AI APIs, Prompt Engineering
  • Tools: Git, GitHub, Vite, Leaflet, Recharts, Vercel
  • CS: DSA, Algorithms
  • Security: Cybersecurity`,
        });
        break;

      case 'experience':
        newLines.push({
          type: 'output',
          text: `VERIFIED ROLES (17 Total: 6 Active, 11 Completed):
  [ACTIVE]    Google Student Ambassador (Apr 2026 – Present)
  [ACTIVE]    HackerRank Campus Crew (Jul 2026 – Present)
  [ACTIVE]    RemoteRecruit Campus Ambassador (Aug 2026 – Present)
  [ACTIVE]    Open Source Connect Contributor [OSCI] (Aug 2026 – Present)
  [ACTIVE]    MyGov Changemaker (Mar 2026 – Present)
  [ACTIVE]    PhysicsWallah Campus Ambassador (Feb 2026 – Present)
  [COMPLETED] GSSOC'26 Contributor & Ambassador (May 2026 – Jun 2026)
  [COMPLETED] Internshala Student Partner [ISP] (Feb 2026 – Jun 2026)
  [COMPLETED] GUESSS India Top 30 National Immersion (Dec 2025 – Jan 2026)
  [COMPLETED] NSOC'26 & OSCG'26 Open Source Contributor
  [COMPLETED] International MUN, HCL GUVI, Cognizance IIT Roorkee`,
        });
        break;

      case 'achievements':
        newLines.push({
          type: 'output',
          text: `16 DOCUMENTED CREDENTIALS:
  01. Google Student Ambassador (Top Prompt Creator Recognition)
  02. HackerRank Campus Crew (Competitive Interview Selection)
  03. RemoteRecruit Campus Ambassador
  04. Open Source Connect Contributor (OSCI)
  05. GirlScript Summer of Code (GSSOC'26 Contributor)
  06. GSSOC'26 Official Ambassador
  07. GUESSS India Top 30 National Immersion (IIT Mandi)
  08. MyGov India Changemaker Badge
  ...All proofs verified on LinkedIn.`,
        });
        break;

      case 'stats':
        newLines.push({
          type: 'output',
          text: `PORTFOLIO VERIFIED TELEMETRY:
  Programs:           17 (6 Active, 11 Completed)
  Achievements:       16 (Documented Badges)
  Technical Skills:   23 (Across 7 Categories)
  Featured Systems:   04 (CivicOS, AssemblyOS, SkillCert, SHARDUL.LAB)`,
        });
        break;

      case 'github':
        newLines.push({
          type: 'output',
          text: `GitHub: https://github.com/shardul-2007 (User: @shardul-2007)\nTracking public repositories: CivicOS, AssemblyOS, SkillCert, adaptq, Dockfleet, my-portfolio.`,
        });
        break;

      case 'contact':
        newLines.push({
          type: 'output',
          text: `Direct Contact Channels:
  Email:    shardulparihar2007@gmail.com
  LinkedIn: https://www.linkedin.com/in/shardul-parihar/
  GitHub:   https://github.com/shardul-2007
  Location: Pune, Maharashtra, India`,
        });
        break;

      case 'resume':
        window.open('https://www.linkedin.com/in/shardul-parihar/', '_blank');
        newLines.push({
          type: 'output',
          text: `Opening verified LinkedIn resume dossier in new tab...`,
        });
        break;

      case 'clear':
        setLines([]);
        setCurrentInput('');
        return;

      case 'date':
        newLines.push({
          type: 'output',
          text: `Current local time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST - Pune, India)`,
        });
        break;

      case 'theme':
        onToggleTheme?.();
        newLines.push({
          type: 'output',
          text: `Toggled visual theme environment.`,
        });
        break;

      case 'sudo':
        newLines.push({
          type: 'error',
          text: `Permission denied: Visitor is not in the sudoers file. This incident will be reported to Shardul. ;)`,
        });
        break;

      case 'matrix':
        newLines.push({
          type: 'output',
          text: `Wake up, Neo... Follow the white rabbit... 01010011 01001000 01000001 01010010 01000100 01010101 01001100`,
        });
        break;

      case 'neofetch':
        newLines.push({
          type: 'output',
          text: `
     ███████╗██╗  ██╗ █████╗ ██████╗ ██████╗ ██╗   ██╗██╗     
     ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔══██╗██║   ██║██║     
     ███████╗███████║███████║██████╔╝██║  ██║██║   ██║██║     
     ╚════██║██╔══██║██╔══██║██╔══██╗██║  ██║██║   ██║██║     
     ███████║██║  ██║██║  ██║██║  ██║██████╔╝╚██████╔╝███████╗
     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚══════╝
     OS: SHARDUL.LAB POSIX Environment v6.0
     Host: WebGL / Next.js 14.2.15 Production Architecture
     Kernel: TypeScript 5.5 Strict Mode
     Uptime: Active 2026.11 Session
     Packages: 23 Skills, 17 Programs, 16 Credentials, 4 Systems
     Shell: shardul-lab-zsh 5.9
     Resolution: 360px - 4K Adaptive Responsive
     CPU: Systems Thinker @ First-Principles
     Memory: 100% Caffeinated
`,
        });
        break;

      default:
        newLines.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" to view valid commands.`,
        });
        break;
    }

    setLines(newLines);
    setCurrentInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(nextIndex);
        setCurrentInput(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setCurrentInput(history[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = VALID_COMMANDS.find(c => c.startsWith(currentInput.toLowerCase()));
      if (match) {
        setCurrentInput(match);
      }
    }
  }

  return (
    <section id="terminal" className="py-28 relative border-b border-[var(--border)] overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <TerminalIcon size={14} className="text-[var(--accent)]" />
            <span className="sys-label-accent">INTERACTIVE CLI SHELL // POSIX TERMINAL</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)] font-editorial">
            Developer <span className="gradient-text">Terminal.</span>
          </h2>
          <p className="text-base text-[var(--text-muted)] font-light mt-3 leading-relaxed">
            A functioning portfolio command-line interface. Type <code className="mono text-[var(--accent)]">help</code>, explore project data, or execute commands.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="rounded-3xl bg-[#07090F] border border-[var(--border-strong)] shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden cursor-text"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(255,255,255,0.08)] bg-[#0C101A] text-xs mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="text-[var(--text-sub)] ml-2 hidden sm:inline">shardul@lab:~ (zsh)</span>
            </div>
            <div className="text-[var(--text-sub)] text-[10px]">
              Type &apos;help&apos; for commands · Tab to autocomplete
            </div>
          </div>

          {/* Terminal Output Stream */}
          <div className="p-5 sm:p-7 max-h-[440px] overflow-y-auto space-y-2 mono text-xs sm:text-sm">
            {lines.map((line, i) => (
              <div
                key={i}
                className={
                  line.type === 'input'
                    ? 'text-[var(--text)] font-semibold'
                    : line.type === 'system'
                    ? 'text-[var(--text-sub)]'
                    : line.type === 'error'
                    ? 'text-[#EF4444]'
                    : 'text-[var(--accent)] whitespace-pre-wrap font-light'
                }
              >
                {line.text}
              </div>
            ))}

            {/* Current Input Row */}
            <div className="flex items-center gap-2 pt-1 text-[var(--text)]">
              <span className="text-[var(--accent-lime)] font-bold flex-shrink-0">
                shardul@lab:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={e => {
                  labAudio.playKey();
                  setCurrentInput(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm mono text-[var(--text)] placeholder-[var(--text-sub)]"
                placeholder="type command (help, projects, skills, neofetch)..."
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div ref={bottomRef} />
          </div>

          {/* Quick Command Suggestion Bar */}
          <div className="px-5 py-3 border-t border-[rgba(255,255,255,0.06)] bg-[#0C101A] flex flex-wrap items-center gap-2 text-[10px] mono text-[var(--text-sub)]">
            <span>QUICK SHORTCUTS:</span>
            {['help', 'neofetch', 'projects', 'skills', 'experience', 'clear'].map(q => (
              <button
                key={q}
                onClick={e => {
                  e.stopPropagation();
                  handleCommand(q);
                }}
                className="px-2 py-0.5 rounded bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.1)] text-[var(--accent)] hover:text-white cursor-pointer transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
