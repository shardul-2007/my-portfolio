// ═══════════════════════════════════════════════════════════════
// SHARDUL.LAB — Featured Engineering Projects & Architecture Data
// Verified Production Deployments for Shardul Parihar
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
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  architecture: ArchitectureLayer[];
  caseStudy: ProjectCaseStudy;
}

export const PROJECTS: ProjectItem[] = [
  // ── 001: Interoperable Civic Infrastructure OS ─────────────────
  {
    id: 'civicos',
    num: '001',
    name: 'Interoperable Civic Infrastructure OS',
    category: 'FULL STACK / AI / GEOSPATIAL',
    tagline: 'Decentralized & AI-Assisted Civic Intelligence Infrastructure',
    year: '2025',
    status: 'LIVE',
    badge: 'CIVIC INFRASTRUCTURE',
    accentColor: '#D9363E',
    description: 'An interoperable, full-stack municipal operating platform bringing spatial infrastructure mapping, public telemetry analytics, and AI-assisted civic incident classification into a single unified dashboard.',
    stack: ['React', 'Vite', 'Leaflet', 'Recharts', 'AI APIs', 'REST APIs', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://civicos-beta.vercel.app/',
    githubUrl: 'https://github.com/shardul-2007/civicos',
    featured: true,
    architecture: [
      {
        layer: 'Frontend & UI Engine',
        tech: 'React 18 + Vite',
        purpose: 'High-performance interactive municipal user interface',
        responsibilities: 'Reusable modular component panels (maps, statistics, issue reporting, query chat), optimized production bundling, fast HMR.',
        dataFlow: 'Receives citizen and operator interactions, updates local UI state, dispatches async queries to API layer.',
      },
      {
        layer: 'Geospatial Mapping Matrix',
        tech: 'Leaflet 1.9.4',
        purpose: 'Lightweight client-side interactive map visualization',
        responsibilities: 'Renders municipal boundaries, coordinates, custom pins, status heatmaps without heavyweight vendor map SDK overhead.',
        dataFlow: 'Consumes geoJSON coordinate feeds; outputs interactive marker popups with live issue metadata.',
      },
      {
        layer: 'Analytics & Telemetry Engine',
        tech: 'Recharts',
        purpose: 'Dynamic visual metric telemetry',
        responsibilities: 'Composable SVG dashboards displaying resolution times, regional ticket volume, citizen satisfaction metrics.',
        dataFlow: 'Transforms raw municipal event arrays into formatted time-series and categorical datasets.',
      },
      {
        layer: 'AI Incident Intelligence',
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

  // ── 002: Sentinelmesh ─────────────────────────────────────────
  {
    id: 'sentinelmesh',
    num: '002',
    name: 'Sentinelmesh',
    category: 'AI GOVERNANCE / CYBERSECURITY / WEB3',
    tagline: 'Trust, Without Blind Faith — Enterprise AI Agent Governance',
    year: '2026',
    status: 'LIVE',
    badge: 'ENTERPRISE AI GOVERNANCE',
    accentColor: '#D9363E',
    description: 'Enterprise AI agent governance platform delivering deterministic policy enforcement, cryptographic canonical audit evidence, role-based access control (RBAC), and MST blockchain anchoring for autonomous AI systems.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Web3 / Blockchain', 'RBAC Security', 'Lucide React', 'Zustand'],
    liveUrl: 'https://sentinelmesh-five.vercel.app/',
    githubUrl: 'https://github.com/shardul-2007/SentinelMesh',
    featured: true,
    architecture: [
      {
        layer: 'Deterministic Policy Engine',
        tech: 'Pre-Execution Rules Compiler',
        purpose: 'Deterministic agent boundary and parameter validation',
        responsibilities: 'Evaluates autonomous AI agent actions against corporate security policies before external API calls are dispatched.',
        dataFlow: 'Agent action intent -> Policy engine evaluates allow/deny rules -> Decision emitted with cryptographic signature.',
      },
      {
        layer: 'Audit & Canonical Evidence',
        tech: 'Canonical JSON + SHA-256 Hashing',
        purpose: 'Tamper-evident agent execution records',
        responsibilities: 'Generates immutable audit trails of all tool calls, user queries, and policy decisions with deterministic timestamps.',
        dataFlow: 'Execution event -> Canonical JSON hashing -> Appended to local and distributed audit ledger.',
      },
      {
        layer: 'Blockchain Anchoring Matrix',
        tech: 'MST Blockchain Testnet',
        purpose: 'Decentralized verification and anchoring',
        responsibilities: 'Periodically anchors batch root hashes of agent logs to the MST blockchain for zero-knowledge external auditability.',
        dataFlow: 'Batch hashes -> Merkle tree root -> Anchor transaction broadcast to blockchain node.',
      },
      {
        layer: 'RBAC Security Cockpit',
        tech: 'Next.js App Shell + Web3 Wallet',
        purpose: 'Multi-role administrative governance console',
        responsibilities: 'Allows Chief Security Officers (CSO) and compliance auditors to inspect agent violations, adjust policy thresholds, and revoke credentials.',
        dataFlow: 'Admin session -> RBAC Provider verifies authorization -> Live audit stream updates in real-time.',
      },
    ],
    caseStudy: {
      productView: {
        whatItDoes: 'SentinelMesh establishes zero-trust governance for enterprise AI agents, preventing prompt injection, unauthorized data exfiltration, and out-of-policy tool invocations with cryptographic proofs.',
        whoItHelps: 'Chief Security Officers, enterprise AI engineers, compliance auditors, and organizations deploying autonomous AI workflows.',
        problem: 'Autonomous agents can hallucinate, be hijacked via prompt injections, or execute unauthorized external actions with zero accountability or audit trail.',
        solution: 'Deterministic policy proxy that intercepts every agent step, validates permissions, logs canonical hashes, and anchors proofs onto distributed ledgers.',
        keyFeatures: [
          'Deterministic policy enforcement intercepting agent actions',
          'Cryptographic audit trail with canonical event hashing',
          'MST blockchain anchoring for immutable proof of integrity',
          'Comprehensive RBAC session management (CSO, Auditor, Operator)',
          'Live agent event telemetry stream with decision rationales',
        ],
      },
      engineeringView: {
        technicalDecisions: [
          'Built zero-dependency client-side deterministic policy verification to prevent security check latency bottlenecks.',
          'Designed modular provider architecture separating Web3 wallet connection, RBAC role state, and telemetry feed.',
          'Adopted strict dark high-contrast cybersecurity aesthetics for critical security operations visibility.',
        ],
        architectureSummary: 'Next.js App Router governance cockpit with client-side state providers, cryptographic hashing utilities, and real-time audit visualization.',
        dataFlow: 'Agent initiates action -> SentinelMesh intercepts payload -> Policy rules evaluate against active RBAC policy -> Result logged to audit table -> Merkle proof calculated.',
        stateManagement: 'React Context & custom hooks for RBAC session and audit event pipelines.',
        challengesAndTradeoffs: [
          'Challenge: Microsecond latency overhead during policy interception. Solved by compiling rules into in-memory lookup trees.',
          'Challenge: Preventing state tampering in client browser. Solved by validating digital signatures against public key registry.',
        ],
        futureRoadmap: [
          'Hardware Security Module (HSM) key signing integration.',
          'Real-time automated killswitch integration for LLM agents.',
        ],
      },
    },
  },

  // ── 003: AssemblyOS ──────────────────────────────────────────
  {
    id: 'assemblyos',
    num: '003',
    name: 'AssemblyOS',
    category: '3D GRAPHICS / SPATIAL AI',
    tagline: 'Interactive 3D Assembly & Spatial Guidance Platform',
    year: '2026',
    status: 'LIVE',
    badge: 'SPATIAL 3D & GUIDANCE',
    accentColor: '#D9363E',
    description: 'An interactive 3D assembly and spatial engineering platform combining WebGL 3D exploded views, sequential step-by-step guidance, and AI-assisted hardware assembly workflows.',
    stack: ['Next.js 16', 'React Three Fiber', 'Three.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'AI Copilot'],
    liveUrl: 'https://assemblyos-sigma.vercel.app/',
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
        layer: 'Physics & Motion Engine',
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
        layer: 'CAD Asset Ingestion Pipeline',
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

  // ── 004: SkillCert ───────────────────────────────────────────
  {
    id: 'skillcert',
    num: '004',
    name: 'SkillCert',
    category: 'FULL STACK / CREDENTIAL AUTOMATION',
    tagline: 'Online Assessment & Verifiable Certificate Platform',
    year: '2026',
    status: 'LIVE',
    badge: 'CREDENTIAL AUTOMATION',
    accentColor: '#D9363E',
    description: 'A secure digital examination and credential platform featuring anti-cheat proctored testing, server-side grading, vector PDF certificate generation via pdf-lib, and instant public QR verification.',
    stack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'pdf-lib', 'QR Code', 'Resend API', 'Tailwind CSS'],
    liveUrl: 'https://certify-testfdp.vercel.app/',
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
];
