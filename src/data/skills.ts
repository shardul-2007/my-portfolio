// ═══════════════════════════════════════════════════════════════
// SHARDUL.LAB — Skills & Technology Constellation (23 Skills)
// ═══════════════════════════════════════════════════════════════

export type SkillCategory =
  | 'FRONTEND'
  | 'LANGUAGES'
  | 'BACKEND'
  | 'AI / ML'
  | 'TOOLS'
  | 'CS'
  | 'SECURITY';

export type SkillLevel = 'Daily' | 'Proficient' | 'Learning';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  experienceYears?: string;
  description: string;
  associatedProjects: string[]; // IDs of projects: 'civicos' | 'assemblyos' | 'skillcert' | 'shardul-os'
}

export interface SkillCategoryGroup {
  key: SkillCategory;
  label: string;
  color: string;
  description: string;
}

export const SKILL_CATEGORIES: SkillCategoryGroup[] = [
  { key: 'FRONTEND',   label: 'Frontend',    color: '#00F5C8', description: 'Modern reactive interfaces & component systems' },
  { key: 'LANGUAGES',  label: 'Languages',   color: '#5B8DEF', description: 'Core programming languages & type safety' },
  { key: 'BACKEND',    label: 'Backend',     color: '#A78BFA', description: 'Server architecture, REST endpoints & data flow' },
  { key: 'AI / ML',    label: 'AI / ML',     color: '#FF6B35', description: 'Applied AI pipelines, SDKs & prompt systems' },
  { key: 'TOOLS',      label: 'Tools',       color: '#34D399', description: 'Development workflows, build tooling & mapping' },
  { key: 'CS',         label: 'CS',          color: '#F59E0B', description: 'Data structures, algorithms & complexity analysis' },
  { key: 'SECURITY',   label: 'Security',    color: '#EF4444', description: 'Application defense, authentication & web protocols' },
];

export const SKILLS: SkillItem[] = [
  // ── FRONTEND (6) ──────────────────────────────────────────────
  {
    id: 'react',
    name: 'React',
    category: 'FRONTEND',
    level: 'Daily',
    description: 'Component architecture, custom hooks, context state, and performance profiling.',
    associatedProjects: ['civicos', 'assemblyos', 'skillcert', 'shardul-os'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'FRONTEND',
    level: 'Daily',
    description: 'App Router architecture, Server Components, API routes, SSR/SSG, and optimization.',
    associatedProjects: ['assemblyos', 'skillcert', 'shardul-os'],
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'FRONTEND',
    level: 'Daily',
    description: 'Semantic markup, accessible tree structure, metadata, and modern web APIs.',
    associatedProjects: ['civicos', 'assemblyos', 'skillcert', 'shardul-os'],
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'FRONTEND',
    level: 'Daily',
    description: 'CSS Grid, Flexbox, CSS Custom Properties, keyframe animations, and responsive media.',
    associatedProjects: ['civicos', 'assemblyos', 'skillcert', 'shardul-os'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'FRONTEND',
    level: 'Daily',
    description: 'Utility-first styling, design system tokens, responsive utilities, and custom themes.',
    associatedProjects: ['assemblyos', 'skillcert', 'shardul-os'],
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'FRONTEND',
    level: 'Proficient',
    description: 'Complex layout animations, gesture controls, scroll-linked physics, and transitions.',
    associatedProjects: ['assemblyos', 'shardul-os'],
  },

  // ── LANGUAGES (4) ─────────────────────────────────────────────
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'LANGUAGES',
    level: 'Daily',
    description: 'Modern ES6+ specification, event loop, asynchronous promises, and DOM manipulation.',
    associatedProjects: ['civicos', 'assemblyos', 'skillcert', 'shardul-os'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'LANGUAGES',
    level: 'Daily',
    description: 'Strict type modeling, generics, interfaces, union discriminators, and type guards.',
    associatedProjects: ['assemblyos', 'skillcert', 'shardul-os'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'LANGUAGES',
    level: 'Daily',
    description: 'Scripting, backend utilities, data manipulation, algorithm challenges, and AI integrations.',
    associatedProjects: ['civicos'],
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'LANGUAGES',
    level: 'Proficient',
    description: 'Object-oriented programming, memory management principles, STL data structures, and DSA.',
    associatedProjects: [],
  },

  // ── BACKEND (2) ───────────────────────────────────────────────
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'BACKEND',
    level: 'Daily',
    description: 'Designing and consuming HTTP RESTful endpoints with status codes and authentication.',
    associatedProjects: ['civicos', 'skillcert'],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'BACKEND',
    level: 'Proficient',
    description: 'Server-side runtime, npm tooling, filesystem streaming, and asynchronous event-driven I/O.',
    associatedProjects: ['skillcert'],
  },

  // ── AI / ML (2) ───────────────────────────────────────────────
  {
    id: 'ai-apis',
    name: 'AI APIs',
    category: 'AI / ML',
    level: 'Daily',
    description: 'Integrating LLMs, streaming completions, structured JSON output, and Vercel AI SDK.',
    associatedProjects: ['civicos', 'assemblyos'],
  },
  {
    id: 'prompt-eng',
    name: 'Prompt Engineering',
    category: 'AI / ML',
    level: 'Proficient',
    description: 'Recognized by Google as Top Prompt Creator. Zero-shot/few-shot framing and structured schema prompts.',
    associatedProjects: ['civicos', 'assemblyos'],
  },

  // ── TOOLS (6) ─────────────────────────────────────────────────
  {
    id: 'git',
    name: 'Git',
    category: 'TOOLS',
    level: 'Daily',
    description: 'Distributed version control, branching strategies, conflict resolution, and commit hygiene.',
    associatedProjects: ['civicos', 'assemblyos', 'skillcert', 'shardul-os'],
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'TOOLS',
    level: 'Daily',
    description: 'Repository hosting, collaborative pull requests, issue tracking, and GitHub Pages CI/CD.',
    associatedProjects: ['civicos', 'assemblyos', 'skillcert', 'shardul-os'],
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'TOOLS',
    level: 'Daily',
    description: 'Next-generation ES-module frontend tooling, lightning fast HMR, and Rollup bundler.',
    associatedProjects: ['civicos'],
  },
  {
    id: 'leaflet',
    name: 'Leaflet',
    category: 'TOOLS',
    level: 'Daily',
    description: 'Interactive open-source geospatial mapping, custom coordinate layers, and geoJSON rendering.',
    associatedProjects: ['civicos'],
  },
  {
    id: 'recharts',
    name: 'Recharts',
    category: 'TOOLS',
    level: 'Daily',
    description: 'Composable SVG charting and reactive data visualizations for analytical dashboards.',
    associatedProjects: ['civicos'],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'TOOLS',
    level: 'Proficient',
    description: 'Continuous cloud deployment, Edge network routing, serverless execution, and analytics.',
    associatedProjects: ['civicos', 'assemblyos', 'skillcert'],
  },

  // ── CS (2) ───────────────────────────────────────────────────
  {
    id: 'dsa',
    name: 'DSA',
    category: 'CS',
    level: 'Daily',
    description: 'Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Hash Maps, and Heaps.',
    associatedProjects: [],
  },
  {
    id: 'algorithms',
    name: 'Algorithms',
    category: 'CS',
    level: 'Daily',
    description: 'Sorting, Searching, Recursion, Dynamic Programming, Two Pointers, and Big-O Complexity.',
    associatedProjects: [],
  },

  // ── SECURITY (1) ─────────────────────────────────────────────
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    category: 'SECURITY',
    level: 'Learning',
    description: 'Foundations of web application security, OWASP Top 10 vulnerabilities, HTTPS, and auth hygiene.',
    associatedProjects: ['skillcert'],
  },
];
