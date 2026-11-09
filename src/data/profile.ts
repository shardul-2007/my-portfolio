// ═══════════════════════════════════════════════════════════════
// SHARDUL.LAB — Profile & Identity Data
// ═══════════════════════════════════════════════════════════════

export interface Profile {
  name: string;
  fullName: string;
  brand: string;
  role: string;
  headline: string;
  subheadline: string;
  bio: string;
  location: string;
  locationShort: string;
  timezone: string;
  email: string;
  github: string;
  githubUser: string;
  linkedin: string;
  portfolio: string;
  status: 'AVAILABLE FOR WORK';
  availabilityNote: string;
  focus: string[];
  interests: string[];
  stats: {
    programs: number;
    achievements: number;
    skills: number;
    featuredProjects: number;
    activeRoles: number;
    completedRoles: number;
  };
  identityPillars: Array<{
    id: string;
    num: string;
    label: string;
    title: string;
    shortDesc: string;
    fullDesc: string;
    tags: string[];
    accentColor: string;
    quote: string;
  }>;
}

export const PROFILE: Profile = {
  name: 'Shardul Parihar',
  fullName: 'Shardul Rajendra Parihar',
  brand: 'SHARDUL.LAB',
  role: 'Software Engineer · Builder · AI Enthusiast',
  headline: 'BUILDING DIGITAL\nSYSTEMS THAT MATTER.',
  subheadline: 'An Interactive Engineering Universe by Shardul Parihar.',
  bio: 'Software engineering student focused on full-stack development, modern web technologies, AI systems, cybersecurity, and high-impact digital products. Passionate about first-principles problem solving, systems architecture, and shipping production applications.',
  location: 'Pune, Maharashtra, India',
  locationShort: 'PUNE, IN',
  timezone: 'UTC+5:30 (IST)',
  email: 'shardulparihar2007@gmail.com',
  github: 'https://github.com/shardul-2007',
  githubUser: 'shardul-2007',
  linkedin: 'https://www.linkedin.com/in/shardul-parihar/',
  portfolio: 'https://shardul-2007.github.io/my-portfolio/',
  status: 'AVAILABLE FOR WORK',
  availabilityNote: 'Open to software engineering internships, freelance projects, technical collaborations, and full-stack/AI roles.',
  focus: [
    'Full Stack Systems',
    'AI & Applied ML',
    '3D WebGL / Spatial UI',
    'Systems Design & DSA',
  ],
  interests: [
    'Full-stack development',
    'AI and machine learning applications',
    'Web technologies & modern frameworks',
    'Cybersecurity & application security',
    'Open-source ecosystems and community',
    'Data structures and algorithms (DSA)',
    'System design & scalable architecture',
    'Creative technology & interactive media',
  ],
  stats: {
    programs: 17,
    achievements: 16,
    skills: 23,
    featuredProjects: 4,
    activeRoles: 6,
    completedRoles: 11,
  },
  identityPillars: [
    {
      id: 'engineer',
      num: '01',
      label: 'ENGINEER',
      title: 'Systems Thinker',
      shortDesc: 'First-principles reasoning, data structures, and algorithmic rigor.',
      fullDesc: 'I focus on data structures, algorithms, problem-solving, and scalable system design. I approach engineering problems from first principles and prioritize understanding the deep "why" before selecting any architectural solution.',
      tags: ['DSA', 'Algorithms', 'Scalable Architecture', 'First Principles'],
      accentColor: '#00F5C8',
      quote: '"Understand the problem completely before writing a line of code."',
    },
    {
      id: 'builder',
      num: '02',
      label: 'BUILDER',
      title: 'Shipping Real Products',
      shortDesc: 'Turning complex ideas into high-performance, deployed production platforms.',
      fullDesc: 'I enjoy turning ideas into useful digital products through full-stack development, modern web technologies, and AI-powered experiences. Built CivicOS, AssemblyOS, and SkillCert from scratch to production deployments.',
      tags: ['CivicOS', 'AssemblyOS', 'SkillCert', 'Production Deployments'],
      accentColor: '#FF6B35',
      quote: '"Engineering is about delivering tangible utility that people can use."',
    },
    {
      id: 'community',
      num: '03',
      label: 'COMMUNITY',
      title: 'Building Together',
      shortDesc: 'Campus ambassador, student leader, and open-source contributor across 17 programs.',
      fullDesc: 'I have participated in campus ambassador, student programs, community initiatives, and open-source ecosystems. Active Google Student Ambassador, HackerRank Campus Crew, and contributor to GSSOC, NSOC, and OSC.',
      tags: ['Google Student Ambassador', 'HackerRank Campus Crew', 'GSSOC', 'Open Source'],
      accentColor: '#5B8DEF',
      quote: '"Knowledge shared accelerates the entire developer ecosystem."',
    },
    {
      id: 'creator',
      num: '04',
      label: 'CREATOR',
      title: 'Building in Public',
      shortDesc: 'Curious experimenter documenting the craft of software and UI engineering.',
      fullDesc: 'I treat each project as a cohesive software product — designed, engineered, and shipped. I document what I build, what I learn, and what comes next. The iterative process is part of the work.',
      tags: ['Creative Technology', 'Technical Writing', 'Interactive UI', 'Rapid Prototyping'],
      accentColor: '#A78BFA',
      quote: '"The intersection of engineering rigor and creative craft is where magic happens."',
    },
  ],
};
