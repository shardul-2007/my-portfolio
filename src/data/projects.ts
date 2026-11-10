// ═══════════════════════════════════════════════════════════════
// SHARDUL.LAB — Featured Engineering Projects & Architecture Data
// ═══════════════════════════════════════════════════════════════

export interface ArchitectureLayer {
  layer: string;
  tech: string;
  purpose: string;
  responsibilities: string;
  dataFlow: string;
}

export interface ProjectCaseStudy {
  productView: {
    whatItDoes: string;
    whoItHelps: string;
    problem: string;
    solution: string;
    keyFeatures: string[];
  };
  engineeringView: {
    technicalDecisions: string[];
    architectureSummary: string;
    dataFlow: string;
    stateManagement: string;
    challengesAndTradeoffs: string[];
    futureRoadmap: string[];
  };
}

export interface ProjectItem {
  id: string;
  num: string;
  name: string;
  category: string;
  tagline: string;
  year: string;
  status: 'LIVE' | 'IN DEVELOPMENT' | 'OPEN SOURCE';
  badge: string;
  accentColor: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  architecture: ArchitectureLayer[];
  caseStudy: ProjectCaseStudy;
}

export const PROJECTS: ProjectItem[] = [
  // ── 001: CivicOS ─────────────────────────────────────────────
  {
    id: 'civicos',
    num: '001',
    name: 'CivicOS',
    category: 'FULL STACK / AI',
    tagline: 'AI-Powered Civic Intelligence Platform',
    year: '2025',
    status: 'LIVE',
    badge: 'MUNICIPAL INTELLIGENCE',
    accentColor: '#D9363E',
    description: 'A full-stack civic platform designed to bring municipal information, interactive mapping, analytics and intelligent assistance into one accessible experience. It explores how technology can help citizens understand civic information and interact with urban services.',
    stack: ['React', 'Vite', 'Leaflet', 'Recharts', 'AI APIs', 'REST APIs', 'JavaScript'],
    liveUrl: 'https://civicos-beta.vercel.app',
    githubUrl: 'https://github.com/shardul-2007/civicos',
    featured: true,
    architecture: [
      {
        layer: 'Frontend & UI',
        tech: 'React 18 + Vite',
        purpose: 'High-performance interactive user interface',
        responsibilities: 'Reusable modular component panels (maps, stats, issue reporting, query chat), optimized production bundling, fast HMR.',
        dataFlow: 'Receives user interactions, updates local UI state, dispatches async queries to API layer.',
      },
      {
        layer: 'Geospatial Mapping',
        tech: 'Leaflet 1.9.4',
        purpose: 'Lightweight client-side interactive map visualization',
        responsibilities: 'Renders municipal boundaries, coordinates, custom pins, status heatmaps without heavyweight vendor map SDK overhead.',
        dataFlow: 'Consumes geoJSON coordinate feeds; outputs interactive marker popups with live issue metadata.',
      },
      {
        layer: 'Analytics Engine',
        tech: 'Recharts',
        purpose: 'Dynamic visual metric telemetry',
        responsibilities: 'Composable SVG dashboards displaying resolution times, regional ticket volume, citizen satisfaction metrics.',
        dataFlow: 'Transforms raw municipal event arrays into formatted time-series and categorical datasets.',
      },
      {
        layer: 'AI Intelligence',
        tech: 'AI APIs',
        purpose: 'Natural language query resolution and automated issue classification',
        responsibilities: 'Categorizes citizen reports, drafts routing suggestions for public works departments, generates natural language summaries.',
        dataFlow: 'Receives raw incident text + location metadata; returns structured category, priority score, and resolution response.',
      },
    ],
    caseStudy: {
      productView: {
        whatItDoes: 'CivicOS aggregates fragmented municipal information, service requests, and geospatial infrastructure data into an intuitive single-pane-of-glass civic operating system.',
        whoItHelps: 'Urban citizens, civic leaders, community organizers, and municipal department heads navigating civic services.',
        problem: 'Municipal portals are notoriously siloed, antiquated, and difficult to navigate. Citizens lack visibility into local infrastructure issues, leading to duplicated reports and slow resolution cycles.',
        solution: 'A unified digital command center featuring interactive map exploration, AI-assisted natural language issue reporting, and public resolution dashboards.',
        keyFeatures: [
          'Interactive Geospatial Map with live status markers',
          'AI-powered natural language query and reporting interface',
          'Real-time municipal telemetry and analytics dashboards',
          'Transparent issue tracking pipeline from report to resolution',
          'Responsive design accessible on all desktop and mobile devices',
        ],
      },
      engineeringView: {
        technicalDecisions: [
          'Selected Vite over CRA for 10x faster HMR and zero-overhead modern ES build pipeline.',
          'Adopted Leaflet over Google Maps SDK to avoid heavy bundle payload (~42KB gzipped vs ~300KB) and retain open OpenStreetMap tile flexibility.',
          'Decoupled UI presentation from geospatial layers using custom state hooks for map sync.',
        ],
        architectureSummary: 'Client-first single page application powered by modular feature folders (maps, analytics, query AI). REST endpoints supply structured mock and live municipal feeds.',
        dataFlow: 'User reports issue -> AI categorization pipeline classifies category/severity -> Local state appends incident -> Leaflet marks pin on coordinate matrix -> Recharts metrics update in real time.',
        stateManagement: 'React hooks (useState, useReducer, custom hooks) with modular context for active map bounding boxes and selected issue layers.',
        challengesAndTradeoffs: [
          'Challenge: Smooth map marker re-rendering on high-frequency coordinate updates. Solved by debouncing bounding-box queries and clustering nearby pins.',
          'Challenge: Managing clean fallbacks for AI query latency. Solved by implementing optimistic UI states with animated loading skeletons.',
        ],
        futureRoadmap: [
          'Integration with live open civic data portals (CKAN/Socrata endpoints).',
          'Offline PWA caching for citizen reports in low-connectivity areas.',
        ],
      },
    },
  },

  // ── 002: AssemblyOS ──────────────────────────────────────────
  {
    id: 'assemblyos',
    num: '002',
    name: 'AssemblyOS',
    category: '3D GRAPHICS / AI',
    tagline: 'Interactive 3D Assembly & Guidance Platform',
    year: '2026',
    status: 'LIVE',
    badge: 'SPATIAL 3D & GUIDANCE',
    accentColor: '#EF493F',
    description: 'An interactive 3D assembly experience that combines spatial visualization, step-based guidance and AI-assisted interaction. Explore 3D models, assembly workflows and visual guidance through an interactive interface.',
    stack: ['Next.js 16', 'React Three Fiber', 'Three.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'AI Copilot'],
    liveUrl: 'https://assemblyos-sigma.vercel.app',
    githubUrl: 'https://github.com/shardul-2007/assemblyos',
    featured: true,
    architecture: [
      {
        layer: '3D WebGL Canvas',
        tech: 'React Three Fiber + Drei',
        purpose: 'Real-time interactive 3D rendering pipeline',
        responsibilities: 'Manages scene graph, PBR lighting, camera orbit controls, GLTF/GLB loading, and mesh highlight shaders.',
        dataFlow: 'Reads component coordinates and rotation matrices from state; renders GPU-accelerated 60fps view.',
      },
      {
        layer: 'Physics & Motion',
        tech: 'Zustand + Spring Physics',
        purpose: 'Component separation and sequential step animation',
        responsibilities: 'Calculates exploded-view directional vectors, smooth interpolation between assembly stages, and focus transitions.',
        dataFlow: 'Receives step/explode triggers; interpolates vector positions across 18 distinct assembly parts.',
      },
      {
        layer: 'AI Assembly Copilot',
        tech: 'Vercel AI SDK',
        purpose: 'Contextual technical guidance that controls the 3D scene',
        responsibilities: 'Parses natural language queries, emits structured tool actions to highlight parts, focus cameras, and advance assembly steps.',
        dataFlow: 'User query -> LLM intent parsing -> Structured JSON actions ({ focusComponent, highlightComponent }) -> Scene camera shift.',
      },
      {
        layer: 'CAD Asset Ingestion',
        tech: 'Three.js Loader Pipeline',
        purpose: 'Multi-format 3D geometry parser',
        responsibilities: 'Drag-and-drop parsing for GLB, GLTF, and OBJ formats, generating bounding-box scale normalization.',
        dataFlow: 'Raw file drag -> FileReader buffer -> GLTFLoader parses hierarchy -> Scene graph dynamically mounts nodes.',
      },
    ],
    caseStudy: {
      productView: {
        whatItDoes: 'AssemblyOS replaces flat paper instruction manuals with an intelligent spatial 3D experience where an AI assistant literally shows you how components fit together in real-time 3D space.',
        whoItHelps: 'Hardware engineers, technicians, makers, and students learning complex mechanical assembly.',
        problem: 'Traditional PDF/paper manuals are static, ambiguous, and cause costly assembly errors on complex multi-part hardware systems like drones and robotics.',
        solution: 'Interactive 3D exploded views, sequential 18-step interactive drone assembly, simulated camera checking, and an AI copilot that manipulates the camera and highlights components on command.',
        keyFeatures: [
          'Interactive WebGL 3D viewer with Orbit, Pan, and Zoom controls',
          'Spring-animated Exploded View separating all internal parts',
          '18-step structured DRONE-X1 interactive assembly progression',
          'AI Copilot capable of camera movements and component highlights',
          'Drag-and-drop custom 3D model import (GLTF/GLB/OBJ)',
          'Simulated optical verification and downloadable assembly report',
        ],
      },
      engineeringView: {
        technicalDecisions: [
          'Chose React Three Fiber over raw Three.js imperative code for declarative component-driven 3D lifecycle and seamless UI overlay coordination.',
          'Used Zustand for assembly state to avoid heavy React re-renders on the WebGL frame loop.',
          'Engineered a deterministic fallback demo assistant so the 3D copilot works 100% offline without mandatory API key configuration.',
        ],
        architectureSummary: 'Next.js App Router workspace hosting a full-screen canvas with floating glassmorphism control decks, copilot drawer, and step timeline.',
        dataFlow: 'Step change trigger -> Zustand updates activeStepIndex -> Scene meshes read spring offsets -> Camera smoothly lerps to target bounding sphere -> Copilot emits technical annotation.',
        stateManagement: 'Zustand store managing: activeStep, isExploded, highlightedParts, cameraTarget, inspectionStatus, and chat history.',
        challengesAndTradeoffs: [
          'Challenge: GPU memory leaks when importing new 3D assets. Solved by strictly traversing and disposing geometry buffers and material textures on unmount.',
          'Challenge: Keeping frame rates at 60fps on mobile. Solved by disabling high-cost postprocessing bloom on lower-tier devices.',
        ],
        futureRoadmap: [
          'WebXR integration for Apple Vision Pro and Meta Quest spatial computing walkthroughs.',
          'Real WebRTC camera feed computer vision verification via lightweight client-side TensorFlow.js.',
        ],
      },
    },
  },

  // ── 003: SkillCert ───────────────────────────────────────────
  {
    id: 'skillcert',
    num: '003',
    name: 'SkillCert',
    category: 'FULL STACK / SAAS',
    tagline: 'Online Assessment & Verifiable Certificate Platform',
    year: '2026',
    status: 'LIVE',
    badge: 'CREDENTIAL AUTOMATION',
    accentColor: '#A91F2C',
    description: 'A digital assessment and credential platform that explores secure examinations, automated evaluation and verifiable certificate generation.',
    stack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'pdf-lib', 'QR Code', 'Resend API', 'Tailwind CSS'],
    liveUrl: 'https://certify-testfdp.vercel.app',
    githubUrl: 'https://github.com/shardul-2007/Online-Test-And-Certification-Platform',
    featured: true,
    architecture: [
      {
        layer: 'Proctored Examination UI',
        tech: 'Next.js 14 App Router',
        purpose: 'Secure, distraction-free candidate test environment',
        responsibilities: 'Enforces countdown timer, monitors browser tab visibility changes, tracks question palette state, auto-submits on expiry.',
        dataFlow: 'Captures candidate answer selections; synchronizes state continuously; detects page blur events.',
      },
      {
        layer: 'Server-Side Evaluation',
        tech: 'Next.js Server Actions',
        purpose: 'Authoritative zero-leak scoring computation',
        responsibilities: 'Evaluates answers strictly in isolated server environment; answer keys and explanation hashes are never sent to client during exam.',
        dataFlow: 'Raw candidate answer hash -> Server validates against database key -> Computes score, percentage, passing threshold check.',
      },
      {
        layer: 'Certificate Generation Engine',
        tech: 'pdf-lib + QR Code Generator',
        purpose: 'Dynamic tamper-evident credential issuance',
        responsibilities: 'Constructs print-ready vector PDF certificates with institutional seals, unique CERT ID (CERT-YYYY-XXXXXX), and verifiable QR codes.',
        dataFlow: 'Passing exam record -> pdf-lib draws vector graphics & text -> Encodes public verification URL into scannable QR -> Emits binary buffer.',
      },
      {
        layer: 'Email Automation & Verification',
        tech: 'Resend API + Public Verification Portal',
        purpose: 'Automated delivery and public credential verification',
        responsibilities: 'Sends transactional congratulation emails with attached PDF certificate; hosts public /verify/[id] routes for third-party verification.',
        dataFlow: 'Generated PDF buffer -> Resend dispatches email to candidate -> External recruiter scans QR -> /verify route confirms authenticity.',
      },
    ],
    caseStudy: {
      productView: {
        whatItDoes: 'SkillCert enables institutions, bootcamps, and companies to conduct standardized technical exams and automatically issue cryptographically verifiable PDF certificates to qualifying candidates.',
        whoItHelps: 'Colleges, academies, tech educators, HR recruiters, and test takers seeking legitimate credentials.',
        problem: 'Manual grading, certificate PDF design, and email delivery take days. Fake, Photoshop-edited certificates are rampant because traditional paper or static PDF certificates lack verifiable provenance.',
        solution: 'Automated end-to-end pipeline: Candidate takes proctored exam -> Server scores instantly -> Vector PDF certificate generated on the fly -> Scannable QR code verifies on public URL -> Email dispatched in seconds.',
        keyFeatures: [
          'Proctored examination room with anti-cheat browser tab visibility tracking',
          'Real-time continuous answer persistence and auto-submission on timer expiry',
          'Strict server-side evaluation preventing inspect-element answer leakage',
          'Dynamic vector PDF certificate creation with pdf-lib and institutional seals',
          'Public /verify/[certId] route allowing instant credential verification',
          'Automated transactional email delivery with attached certificate via Resend',
          'Admin dashboard with question bank management, candidate filtering, and CSV export',
        ],
      },
      engineeringView: {
        technicalDecisions: [
          'Employed pdf-lib for pure JavaScript vector PDF generation rather than headless Chromium (Puppeteer), cutting cloud compute cost and serverless execution latency by 85%.',
          'Strictly executed evaluation logic via Next.js Server Actions to ensure answer keys are never delivered into client-side JavaScript bundles.',
          'Built a dual-layer data tier supporting relational PostgreSQL via Prisma ORM as well as an embedded zero-friction JSON engine for immediate local execution.',
        ],
        architectureSummary: 'Serverless Next.js architecture with Edge-ready API endpoints, transactional email hooks, and responsive proctoring UI.',
        dataFlow: 'Candidate registers -> Takes timed exam -> Submits -> Server Action checks answers against DB -> If score >= 60%, pdf-lib generates PDF buffer -> QR code generated -> Resend dispatches email -> Client renders result screen.',
        stateManagement: 'Local storage caching with optimistic sync to prevent data loss on network drops; server session cookies for admin authentication.',
        challengesAndTradeoffs: [
          'Challenge: Preventing candidate cheating without invasive desktop surveillance software. Solved by tracking window blur events, full-screen changes, and strict server timers.',
          'Challenge: Pixel-perfect PDF typography across varying candidate name lengths. Solved by dynamically measuring string width in pdf-lib and auto-scaling font size.',
        ],
        futureRoadmap: [
          'Blockchain timestamping of certificate hashes for permanent decentralized audit trails.',
          'Automated coding challenge execution sandbox for real-time code evaluation.',
        ],
      },
    },
  },

  // ── 004: SHARDUL.OS / SHARDUL.LAB ────────────────────────────
  {
    id: 'shardul-os',
    num: '004',
    name: 'SHARDUL.OS',
    category: 'FRONTEND / DESIGN',
    tagline: 'An Interactive Developer Portfolio',
    year: '2026',
    status: 'LIVE',
    badge: 'CREATIVE TECH & ARCHITECTURE',
    accentColor: '#711C27',
    description: 'A personal developer environment designed to bring my projects, skills, experience and experiments together through an interactive software-inspired interface.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GitHub API'],
    liveUrl: 'https://shardul-2007.github.io/my-portfolio/',
    githubUrl: 'https://github.com/shardul-2007/my-portfolio',
    featured: true,
    architecture: [
      {
        layer: 'Interactive Core & Shell',
        tech: 'Next.js 14 + Framer Motion',
        purpose: 'Fluid cinematic storytelling and section transitions',
        responsibilities: 'Controls boot sequence, custom cursor magnetics, command palette, audio synthesis bleeps, and editorial scroll reveals.',
        dataFlow: 'Scroll coordinates and user keyboard inputs trigger motion variants, camera lerps, and dynamic active section tracking.',
      },
      {
        layer: 'Design System & Theme Engine',
        tech: 'Tailwind CSS + CSS Custom Properties',
        purpose: 'Instant zero-flash dual theme switching',
        responsibilities: 'Manages deep charcoal Dark Lab environment vs high-contrast Cyber Yellow & Black environment with full accessibility contrast.',
        dataFlow: 'Navbar toggle updates data-theme attribute on root html; propagates token values to all glass panels.',
      },
      {
        layer: 'Interactive Labs & Simulators',
        tech: 'Custom React Engines',
        purpose: 'Real working client-side engineering demonstrations',
        responsibilities: 'Drives Bubble/Quick sort visualizer, binary search pointer stepping, interactive developer desk, and CLI terminal emulation.',
        dataFlow: 'User initiates interactive algorithm -> Engine executes step by step on timed loop -> Visual bar arrays update dynamically.',
      },
      {
        layer: 'Data & Telemetry Aggregation',
        tech: 'Public GitHub API + Centralized Data Schema',
        purpose: 'Real-time telemetry and strictly verified content single source of truth',
        responsibilities: 'Fetches live public repo statistics, follower counts, and commits with cached fallbacks; centralizes 17 experiences & 16 achievements.',
        dataFlow: 'Client async fetch -> GitHub REST API -> Validates payload -> Updates repository cards with fallback protection.',
      },
    ],
    caseStudy: {
      productView: {
        whatItDoes: 'SHARDUL.LAB is an interactive developer portfolio engineered as a digital laboratory where technical recruiters, engineers, and visitors explore projects through working simulations, live demos, and interactive tools.',
        whoItHelps: 'Hiring managers, engineering recruiters, developers, and collaborators seeking to evaluate technical depth, design craft, and product mindset.',
        problem: 'Most developer portfolios are generic, repetitive static resume templates filled with non-functional buttons, fake progress bars, and passive text that fails to show true engineering capability.',
        solution: 'An immersive engineering universe featuring live interactive demos of every project, working algorithm visualizers, a functioning developer terminal, and verifiable evidence.',
        keyFeatures: [
          'System boot sequence with terminal log and instant skip control',
          'Command Palette (Ctrl+K) for rapid keyboard-driven navigation',
          'Live interactive previews for CivicOS, AssemblyOS, and SkillCert',
          'Interactive Developer Desk with physics-inspired draggable stations',
          'Functioning CLI terminal with 15+ interactive commands and Easter eggs',
          'Algorithm Visualizers (Sorting & Binary Search) with step-by-step telemetry',
          'Dedicated 90-second Recruiter Mode with skill-to-project evidence matrix',
          'Dual theme engine (Deep Charcoal Dark Lab and Cyber Yellow & Black)',
        ],
      },
      engineeringView: {
        technicalDecisions: [
          'Engineered audio feedback using browser-native Web Audio API frequency synthesis (sine/triangle bleeps), avoiding any external MP3 asset downloads.',
          'Consolidated portfolio content into typed single-source-of-truth data models to guarantee consistency across numbers (17 programs, 16 achievements, 23 skills, 4 projects).',
          'Maintained 100% static export readiness (`output: export`) for multi-platform deployment on both Vercel and GitHub Pages.',
        ],
        architectureSummary: 'Modular Next.js App Router structure with distinct components for sections, interactive playground widgets, navigation, and stateful overlays.',
        dataFlow: 'Global state handles command palette, recruiter modal, theme, and sound settings -> Section components render lazily on viewport intersection.',
        stateManagement: 'Lightweight React state + localStorage persistence for theme preferences and audio toggles.',
        challengesAndTradeoffs: [
          'Challenge: Delivering high interaction density without degrading mobile scrolling performance. Solved by replacing complex drag physics with responsive grid cards on small touchscreens.',
          'Challenge: Keeping zero bundle overhead for custom animations by using Framer Motion primitives and GPU-accelerated CSS transforms.',
        ],
        futureRoadmap: [
          'WebGL particle fluid background option for high-end desktop graphics cards.',
          'Interactive WebAssembly C++ execution runner in the engineering playground.',
        ],
      },
    },
  },
];
