// ═══════════════════════════════════════════════════════════════
// SHARDUL.LAB — Navigation & Command Palette Specifications
// ═══════════════════════════════════════════════════════════════

export interface NavLink {
  id: string;
  label: string;
  href: string;
  badge?: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: 'hero',          label: 'LAB.01',          href: '#hero' },
  { id: 'command-center',label: 'COMMAND',         href: '#command-center' },
  { id: 'about',         label: 'ABOUT',           href: '#about' },
  { id: 'skills',        label: 'STACK',           href: '#skills' },
  { id: 'projects',      label: 'PROJECTS',        href: '#projects' },
  { id: 'architecture',  label: 'ARCHITECTURE',    href: '#architecture' },
  { id: 'contributions', label: 'OPEN SOURCE',     href: '#contributions' },
  { id: 'engagements',   label: 'ENGAGEMENTS',     href: '#engagements' },
  { id: 'credentials',   label: 'RECOGNITION',     href: '#credentials' },
  { id: 'playground',    label: 'PLAYGROUND',      href: '#playground' },
  { id: 'contact',       label: 'CONTACT',         href: '#contact' },
];

export interface PaletteCommand {
  id: string;
  label: string;
  shortcut?: string;
  category: 'Navigation' | 'Actions' | 'Explore' | 'Themes';
  description: string;
  action: () => void | string;
}

export interface DeskItemSpec {
  id: string;
  title: string;
  category: string;
  iconName: string;
  summary: string;
  detail: string;
  actionLabel: string;
  targetSection?: string;
}

export const DESK_ITEMS: DeskItemSpec[] = [
  {
    id: 'laptop',
    title: 'Workstation ThinkPad',
    category: 'HARDWARE / CODE',
    iconName: 'Laptop',
    summary: 'Dual-monitor setup running Linux / WSL & Next.js development environments.',
    detail: 'Primary engineering driver used to build CivicOS, AssemblyOS, and SkillCert. Configured with strict TypeScript, Neovim / VS Code keybindings, and automated local testing rigs.',
    actionLabel: 'Launch Featured Projects',
    targetSection: '#projects',
  },
  {
    id: 'terminal',
    title: 'Interactive CLI Terminal',
    category: 'SYSTEM / SHELL',
    iconName: 'Terminal',
    summary: 'Custom pseudo-terminal connected to portfolio subsystem utilities.',
    detail: 'Type standard commands (help, projects, whoami, neofetch, clear) to discover secret engineering flags, view environment variables, or trigger quick navigation.',
    actionLabel: 'Open Shell Prompt',
    targetSection: '#terminal',
  },
  {
    id: 'notebook',
    title: 'Engineering Lab Notebook',
    category: 'RESEARCH / NOTES',
    iconName: 'BookOpen',
    summary: 'Handwritten problem breakdowns, complexity analysis, and architectural sketches.',
    detail: 'Active research topics: KV Cache compression in LLMs (adaptq), distributed microservices, WebGL draw-call optimization in Three.js, and browser-tab anti-cheat proctoring.',
    actionLabel: 'Read About & Philosophy',
    targetSection: '#about',
  },
  {
    id: 'code-editor',
    title: 'Algorithm Workbench',
    category: 'DSA / EXPERIMENTS',
    iconName: 'Code',
    summary: 'Interactive algorithm visualizers (Sorting & Binary Search) with real-time telemetry.',
    detail: 'Watch Bubble Sort and Quick Sort compare and swap elements in step-by-step visual animation, or step through logarithmic binary search pointer convergence.',
    actionLabel: 'Open Playground',
    targetSection: '#playground',
  },
  {
    id: 'coffee',
    title: 'Espresso Energy Cell',
    category: 'VITAL / SUSTENANCE',
    iconName: 'Coffee',
    summary: 'Freshly brewed caffeine matrix sustaining late-night open-source merge sessions.',
    detail: 'Current status: 98% caffeinated. Optimal operating temperature for deep focus sprints and debugging complex race conditions.',
    actionLabel: 'Take a Sip (+1 Energy)',
  },
  {
    id: 'github-station',
    title: 'Live GitHub Feed',
    category: 'COMMUNITY / COMMITS',
    iconName: 'GitBranch',
    summary: 'Real-time telemetry connected to @shardul-2007 public repository endpoints.',
    detail: 'Tracks public stars, forks, active branches, and recent code contributions across open-source programs like GSSOC, NSOC, and OSC.',
    actionLabel: 'View GitHub Telemetry',
    targetSection: '#github',
  },
  {
    id: 'resume-dossier',
    title: 'Recruiter Briefing & Credentials',
    category: 'DOSSIER / CAREER',
    iconName: 'FileText',
    summary: '90-second executive summary with skill-to-project proof matrix and verified evidence.',
    detail: 'Direct access to full curriculum vitae, certified LinkedIn credentials, and contact channels for software engineering roles.',
    actionLabel: 'Launch Recruiter Mode',
  },
];
