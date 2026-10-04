// ═══════════════════════════════════════════════════════════════
// SHARDUL.OS — Portfolio Data
// Single source of truth for ALL content.
// No invented data — everything here is real.
// ═══════════════════════════════════════════════════════════════

export const PERSONAL = {
  name: 'Shardul Parihar',
  shortName: 'SHARDUL.PARIHAR',
  role: 'Software Engineer',
  subtitle: 'SOFTWARE ENGINEER / BUILDER',
  bio: 'Software engineering student focused on full-stack development, web technologies, AI, cybersecurity and innovative digital products.',
  location: 'Pune, Maharashtra, India',
  locationShort: 'INDIA',
  email: 'shardulparihar2007@gmail.com',
  github: 'https://github.com/shardul-2007',
  githubUser: 'shardul-2007',
  linkedin: 'https://www.linkedin.com/in/shardul-parihar/',
  portfolio: 'https://shardul-2007.github.io/my-portfolio/',
  status: 'AVAILABLE',
  focus: ['Full Stack', 'AI / ML', 'Web Development', 'Cybersecurity'],
  headline: 'BUILDING DIGITAL\nSYSTEMS THAT MATTER.',
  buildVersion: '2026.10',
  resumeUrl: 'https://www.linkedin.com/in/shardul-parihar/',
};

export interface Project {
  id: string;
  num: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: 'LIVE' | 'IN DEVELOPMENT' | 'OPEN SOURCE' | 'ARCHIVED';
  github?: string;
  live?: string;
  featured: boolean;
  category: string;
  year: string;
  architecture?: ArchNode[];
}

interface ArchNode {
  layer: string;
  tech: string;
  detail: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'civicos',
    num: '001',
    name: 'CivicOS',
    tagline: 'AI-Powered Municipal Operating System',
    description: 'A full-stack civic intelligence platform combining interactive maps, real-time analytics, and AI-driven insights. Built to help citizens interact with municipal services and urban data. Features live issue tracking, analytics dashboards, and AI-powered query resolution.',
    stack: ['React', 'Vite', 'Leaflet', 'Recharts', 'AI APIs', 'REST APIs', 'JavaScript'],
    status: 'LIVE',
    github: 'https://github.com/shardul-2007',
    live: 'https://civicos-beta.vercel.app/',
    featured: true,
    category: 'FULL STACK / AI',
    year: '2025',
    architecture: [
      { layer: 'Frontend',  tech: 'React + Vite',   detail: 'Component-based UI with fast hot reload and production bundling' },
      { layer: 'Maps',      tech: 'Leaflet 1.9.4',  detail: 'Interactive geospatial map rendering with custom overlays and markers' },
      { layer: 'Analytics', tech: 'Recharts',        detail: 'Composable data visualization for civic metrics and dashboards' },
      { layer: 'AI Layer',  tech: 'AI APIs',         detail: 'Intelligent query resolution and data summarization' },
      { layer: 'Data',      tech: 'REST APIs',       detail: 'Structured municipal data endpoints with real-time updates' },
    ],
  },
  {
    id: 'shardul-os',
    num: '002',
    name: 'SHARDUL.OS',
    tagline: 'Personal Developer OS — This Portfolio',
    description: 'An experimental portfolio redesigned as a personal developer operating system. Features a futuristic glassmorphism UI, cinematic scroll effects, and a mind-space reveal. Originally built in plain HTML/CSS/JS, now rebuilt in Next.js with TypeScript and Framer Motion.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GitHub API'],
    status: 'LIVE',
    github: 'https://github.com/shardul-2007/my-portfolio',
    live: 'https://shardul-2007.github.io/my-portfolio/',
    featured: true,
    category: 'FRONTEND / DESIGN',
    year: '2026',
  },
];

export interface Skill {
  name: string;
  category: string;
  level: 'primary' | 'secondary' | 'learning';
}

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React',         category: 'Frontend',      level: 'primary'   },
  { name: 'Next.js',       category: 'Frontend',      level: 'primary'   },
  { name: 'HTML5',         category: 'Frontend',      level: 'primary'   },
  { name: 'CSS3',          category: 'Frontend',      level: 'primary'   },
  { name: 'Tailwind',      category: 'Frontend',      level: 'primary'   },
  { name: 'Framer Motion', category: 'Frontend',      level: 'secondary' },
  // Languages
  { name: 'JavaScript',    category: 'Languages',     level: 'primary'   },
  { name: 'TypeScript',    category: 'Languages',     level: 'primary'   },
  { name: 'Python',        category: 'Languages',     level: 'primary'   },
  { name: 'C++',           category: 'Languages',     level: 'secondary' },
  // Backend
  { name: 'REST APIs',     category: 'Backend',       level: 'primary'   },
  { name: 'Node.js',       category: 'Backend',       level: 'secondary' },
  // Tools
  { name: 'Git',           category: 'Tools',         level: 'primary'   },
  { name: 'GitHub',        category: 'Tools',         level: 'primary'   },
  { name: 'Vite',          category: 'Tools',         level: 'primary'   },
  { name: 'Leaflet',       category: 'Tools',         level: 'primary'   },
  { name: 'Recharts',      category: 'Tools',         level: 'primary'   },
  { name: 'Vercel',        category: 'Tools',         level: 'secondary' },
  // AI
  { name: 'AI APIs',       category: 'AI',            level: 'primary'   },
  { name: 'Prompt Eng.',   category: 'AI',            level: 'secondary' },
  // CS / DSA
  { name: 'DSA',           category: 'CS',            level: 'primary'   },
  { name: 'Algorithms',    category: 'CS',            level: 'primary'   },
  // Cybersecurity
  { name: 'Cybersecurity', category: 'Cybersecurity', level: 'learning'  },
];

// ── Experience ──────────────────────────────────────────────────────────────

export interface Experience {
  id: string;
  role: string;
  org: string;
  type: string;
  startDate: string;
  endDate: string;         // 'Present' for current roles
  location?: string;
  status: 'current' | 'completed';
  category: string;
  description?: string;
  skills?: string[];
  recognition?: string;
  proof?: string;
  proofType?: string;
  link?: string;
}

export const EXPERIENCE: Experience[] = [
  // ── Currently active roles (chronological by start, newest first) ──────────
  {
    id: 'remoterecruit',
    role: 'Campus Ambassador',
    org: 'RemoteRecruit',
    type: 'Internship',
    startDate: 'Aug 2026',
    endDate: 'Present',
    location: 'Remote',
    status: 'current',
    category: 'Community / Ambassador',
    description: 'Selected as a RemoteRecruit Campus Ambassador to represent and promote the organization within the student community. Engage with students, share opportunities, and support awareness of RemoteRecruit programs. Contribute to student networking, community engagement, and outreach initiatives.',
    proof: 'images/remote-recruit.jpg',
    proofType: 'Offer letter',
  },
  {
    id: 'osc-osci',
    role: 'Open Source Contributor (OSCI)',
    org: 'Open Source Connect',
    type: 'Open Source',
    startDate: 'Aug 2026',
    endDate: 'Present',
    location: 'Pune District, Maharashtra, India',
    status: 'current',
    category: 'Open Source',
    description: 'Contributing to open-source projects, collaborating with developers, and gaining hands-on experience with community-driven software development.',
    skills: ['MERN Stack', 'Full-Stack Development'],
    proofType: 'Contributor badge',
  },
  {
    id: 'hackerrank',
    role: 'HackerRank Campus Crew',
    org: 'HackerRank',
    type: 'Part-time',
    startDate: 'Jul 2026',
    endDate: 'Present',
    location: 'Pune District, Maharashtra, India · Remote',
    status: 'current',
    category: 'Community / Campus',
    description: 'Selected as a HackerRank Campus Crew member after a competitive interview process to represent HackerRank at PCET\'s Nutan Maharashtra Institute of Engineering and Technology (NMIET). Responsible for promoting coding culture, organising campus initiatives, engaging students with HackerRank challenges, and building a strong programming community through events, workshops, and peer learning.',
    skills: ['Programming', 'DSA', 'Coding Contests', 'Campus Community', 'Peer Learning'],
    proof: 'images/hackerrank.jpg',
    proofType: 'Offer letter',
  },
  {
    id: 'google',
    role: 'Google Student Ambassador',
    org: 'Google',
    type: 'Internship',
    startDate: 'Apr 2026',
    endDate: 'Present',
    status: 'current',
    category: 'Community / Student Program',
    proof: 'images/google-offer.jpg',
    proofType: 'Mail from Google',
    recognition: 'Top prompt creator recognition',
  },
  {
    id: 'mygov-changemaker',
    role: 'Changemaker',
    org: 'MyGov India',
    type: 'Part-time',
    startDate: 'Mar 2026',
    endDate: 'Present',
    status: 'current',
    category: 'Recognition / Community',
    description: 'Received the Changemaker Badge on MyGov.',
    proofType: 'Badge',
  },
  {
    id: 'pw',
    role: 'Campus Ambassador',
    org: 'PW (PhysicsWallah)',
    type: 'Part-time',
    startDate: 'Feb 2026',
    endDate: 'Present',
    status: 'current',
    category: 'Campus Ambassador',
    proof: 'images/physics-wallah.jpg',
  },
  // ── Completed roles (newest first) ────────────────────────────────────────
  {
    id: 'mygov-ambassador',
    role: 'MyGov Campus Ambassador',
    org: 'MyGov India',
    type: '',
    startDate: 'Dec 2025',
    endDate: 'Apr 2026',
    status: 'completed',
    category: 'Campus Ambassador',
    skills: ['English', 'Leadership'],
    proofType: 'Confirmation certificate',
  },
  {
    id: 'gssoc-contributor',
    role: 'Open Source Contributor | GSSOC\'26',
    org: 'GirlScript Summer of Code',
    type: 'Part-time',
    startDate: 'May 2026',
    endDate: 'Jun 2026',
    status: 'completed',
    category: 'Open Source',
    proof: 'images/gssoc.jpg',
    proofType: 'Contributor badge · Mail for verification',
  },
  {
    id: 'gssoc-ambassador',
    role: 'Ambassador',
    org: 'GirlScript Summer of Code',
    type: '',
    startDate: 'May 2026',
    endDate: 'Jun 2026',
    status: 'completed',
    category: 'Community / Ambassador',
    proofType: 'Ambassador badge',
  },
  {
    id: 'internshala',
    role: 'Internshala Student Partner (ISP)',
    org: 'Internshala',
    type: 'Internship',
    startDate: 'Feb 2026',
    endDate: 'Jun 2026',
    location: 'India',
    status: 'completed',
    category: 'Community / Career',
    skills: ['Communication', 'Leadership'],
    proof: 'images/internshala.jpg',
    proofType: 'Joining letter',
  },
  {
    id: 'nsoc',
    role: 'Open Source Contributor | NSOC\'26',
    org: 'Nexus Spring of Code',
    type: 'Part-time',
    startDate: 'Apr 2026',
    endDate: 'May 2026',
    location: 'India',
    status: 'completed',
    category: 'Open Source',
    skills: ['Version Control', 'HTML', 'CSS', 'JavaScript'],
    proof: 'images/nsoc.jpg',
    proofType: 'Tech contributor badge',
  },
  {
    id: 'osc-oscg',
    role: 'Open Source Contributor | OSCG\'26',
    org: 'Open Source Connect',
    type: 'Part-time',
    startDate: 'Apr 2026',
    endDate: 'May 2026',
    status: 'completed',
    category: 'Open Source',
    skills: ['Version Control', 'C++'],
    proofType: 'Contributor badge',
  },
  {
    id: 'international-mun',
    role: 'Campus Ambassador',
    org: 'International MUN',
    type: 'Internship',
    startDate: 'Jan 2026',
    endDate: 'Apr 2026',
    status: 'completed',
    category: 'Community / Ambassador',
    description: 'Represented my college PCET\'S NMIET on an international platform, acting as a bridge between the institution and global stakeholders.',
    recognition: 'International Representative, NMIET',
    skills: ['Public Speaking'],
    proofType: 'Offer letter',
  },
  {
    id: 'hcl-guvi',
    role: 'Campus Ambassador (AI Impact Summit)',
    org: 'HCL GUVI',
    type: 'Internship',
    startDate: 'Oct 2025',
    endDate: 'Mar 2026',
    status: 'completed',
    category: 'Campus Ambassador / Community',
    description: 'Coordinated and managed participation in a national-level AI event.',
    skills: ['Management', 'Communication'],
    proof: 'images/guvi.jpg',
    proofType: 'Certificate of recognition',
  },
  {
    id: 'cognizance-iit',
    role: 'Campus Ambassador',
    org: 'Cognizance, IIT Roorkee',
    type: '',
    startDate: 'Jan 2026',
    endDate: 'Feb 2026',
    status: 'completed',
    category: 'Campus Ambassador',
    description: 'Appointed as Campus Ambassador for Cognizance 2026, of IIT Roorkee.',
    skills: ['Management', 'Campus Ministry'],
    proofType: 'Offer letter',
  },
  {
    id: 'guesss-top30',
    role: 'Participant — National Immersion Program (Top 30)',
    org: 'GUESSS India',
    type: 'Part-time',
    startDate: 'Dec 2025',
    endDate: 'Jan 2026',
    status: 'completed',
    category: 'Recognition / Program',
    description: 'Selected among the top 30 campus ambassadors nationally representing my college at IIT Mandi.',
    proofType: 'Mail of confirmation',
  },
  {
    id: 'guesss-ambassador',
    role: 'Campus Ambassador',
    org: 'GUESSS India',
    type: 'Internship',
    startDate: 'Sep 2025',
    endDate: 'Jan 2026',
    location: 'Remote',
    status: 'completed',
    category: 'Campus Ambassador',
    proofType: 'Offer letter',
  },
];

// ── Achievements ─────────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  title: string;
  role: string;
  org: string;
  year: string;
  category: string;
  description?: string;
  proof?: string;
  proofType?: string;
  featured?: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'google-sa',
    title: 'Google Student Ambassador',
    role: 'Google Student Ambassador',
    org: 'Google',
    year: '2026',
    category: 'Student Program',
    proof: 'images/google-offer.jpg',
    proofType: 'Mail from Google',
    featured: true,
  },
  {
    id: 'hackerrank-crew',
    title: 'HackerRank Campus Crew',
    role: 'HackerRank Campus Crew',
    org: 'HackerRank',
    year: '2026',
    category: 'Community / Coding',
    proof: 'images/hackerrank.jpg',
    proofType: 'Offer letter',
    featured: true,
  },
  {
    id: 'rr-ambassador',
    title: 'Campus Ambassador',
    role: 'Campus Ambassador',
    org: 'RemoteRecruit',
    year: '2026',
    category: 'Community',
    proof: 'images/remote-recruit.jpg',
    proofType: 'Offer letter',
    featured: true,
  },
  {
    id: 'osc-osci-badge',
    title: 'Open Source Contributor',
    role: 'Open Source Contributor (OSCI)',
    org: 'Open Source Connect',
    year: '2026',
    category: 'Open Source',
    proofType: 'Contributor badge',
    featured: true,
  },
  {
    id: 'gssoc26-contributor',
    title: 'Open Source Contributor | GSSOC\'26',
    role: 'Open Source Contributor',
    org: 'GirlScript Summer of Code',
    year: '2026',
    category: 'Open Source',
    proof: 'images/gssoc.jpg',
    proofType: 'Contributor badge',
    featured: true,
  },
  {
    id: 'gssoc26-ambassador',
    title: 'Ambassador',
    role: 'Ambassador',
    org: 'GirlScript Summer of Code',
    year: '2026',
    category: 'Community',
    proofType: 'Ambassador badge',
    featured: true,
  },
  {
    id: 'nsoc26',
    title: 'Open Source Contributor | NSOC\'26',
    role: 'Open Source Contributor',
    org: 'Nexus Spring of Code',
    year: '2026',
    category: 'Open Source',
    proof: 'images/nsoc.jpg',
    proofType: 'Tech contributor badge',
  },
  {
    id: 'oscg26',
    title: 'Open Source Contributor | OSCG\'26',
    role: 'Open Source Contributor',
    org: 'Open Source Connect',
    year: '2026',
    category: 'Open Source',
    proofType: 'Contributor badge',
  },
  {
    id: 'mygov-changemaker-badge',
    title: 'Changemaker',
    role: 'Changemaker',
    org: 'MyGov India',
    year: '2026',
    category: 'Recognition',
    proofType: 'Badge',
  },
  {
    id: 'guesss-top30-badge',
    title: 'Top 30 National Immersion Program',
    role: 'Participant — National Immersion Program (Top 30)',
    org: 'GUESSS India',
    year: '2025–2026',
    category: 'Recognition / Program',
    description: 'Selected among the top 30 campus ambassadors nationally, representing college at IIT Mandi.',
    proofType: 'Mail of confirmation',
    featured: true,
  },
  {
    id: 'intl-mun',
    title: 'International Representative, NMIET',
    role: 'Campus Ambassador',
    org: 'International MUN',
    year: '2026',
    category: 'Representation',
    proofType: 'Offer letter',
  },
  {
    id: 'hcl-guvi-badge',
    title: 'Campus Ambassador — AI Impact Summit',
    role: 'Campus Ambassador',
    org: 'HCL GUVI',
    year: '2025–2026',
    category: 'Community / Event',
    proof: 'images/guvi.jpg',
    proofType: 'Certificate of recognition',
  },
  {
    id: 'cognizance-badge',
    title: 'Campus Ambassador',
    role: 'Campus Ambassador',
    org: 'Cognizance, IIT Roorkee',
    year: '2026',
    category: 'Campus Ambassador',
    proofType: 'Offer letter',
  },
  {
    id: 'internshala-badge',
    title: 'Internshala Student Partner',
    role: 'Internshala Student Partner (ISP)',
    org: 'Internshala',
    year: '2026',
    category: 'Community / Career',
    proof: 'images/internshala.jpg',
    proofType: 'Joining letter',
  },
  {
    id: 'mygov-campus',
    title: 'MyGov Campus Ambassador',
    role: 'MyGov Campus Ambassador',
    org: 'MyGov India',
    year: '2025–2026',
    category: 'Campus Ambassador',
    proofType: 'Confirmation certificate',
  },
  {
    id: 'pw-badge',
    title: 'Campus Ambassador',
    role: 'Campus Ambassador',
    org: 'PW (PhysicsWallah)',
    year: '2026',
    category: 'Education / Community',
    proof: 'images/physics-wallah.jpg',
  },
];

export const ABOUT_PANELS = [
  {
    num: '01',
    id: 'engineer',
    label: 'ENGINEER',
    title: 'Systems Thinker',
    body: 'Focused on DSA and scalable system design. I approach problems from first principles — understanding the "why" before the "how". Currently deepening expertise in algorithms, data structures, and computer science fundamentals.',
    tags: ['DSA', 'Algorithms', 'Systems Design'],
  },
  {
    num: '02',
    id: 'builder',
    label: 'BUILDER',
    title: 'Shipping Real Products',
    body: 'Built CivicOS — an AI-powered civic intelligence platform — from zero to deployed product. SHARDUL.OS is this portfolio, rebuilt multiple times in pursuit of a genuinely unique developer experience. I bias toward shipping.',
    tags: ['CivicOS', 'SHARDUL.OS', 'Full Stack'],
  },
  {
    num: '03',
    id: 'community',
    label: 'COMMUNITY',
    title: 'Building Together',
    body: 'Google Student Ambassador, HackerRank Campus Crew, and ambassador across 10+ campus programs. Contributor to open source programs including GSSOC\'26, NSOC\'26 and OSCG\'26. Community building and knowledge sharing are part of how I grow.',
    tags: ['Google', 'Open Source', 'Leadership'],
  },
  {
    num: '04',
    id: 'creator',
    label: 'CREATOR',
    title: 'Building in Public',
    body: 'I treat each project as a product — designed, engineered, and shipped. SHARDUL.OS evolved through five major versions. I document what I build, what I learn, and what comes next. The process is part of the work.',
    tags: ['Design', 'Portfolio', 'Writing'],
  },
];

export const CONTACT_CHANNELS = [
  { id: 'email',    label: 'EMAIL',    value: 'shardulparihar2007@gmail.com', href: 'mailto:shardulparihar2007@gmail.com', icon: 'Mail' },
  { id: 'linkedin', label: 'LINKEDIN', value: '/in/shardul-parihar/',          href: 'https://www.linkedin.com/in/shardul-parihar/', icon: 'Linkedin' },
  { id: 'github',   label: 'GITHUB',   value: 'github.com/shardul-2007',       href: 'https://github.com/shardul-2007', icon: 'Github' },
];