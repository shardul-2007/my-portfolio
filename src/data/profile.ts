// ═══════════════════════════════════════════════════════════════
// SHARDUL.LAB — Profile & Identity Data
// Red Engineering Identity · Information Technology Student
// ═══════════════════════════════════════════════════════════════

export interface Profile {
  name: string;
  fullName: string;
  brand: string;
  role: string;
  education: string;
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
  role: 'Software Developer · Builder · AI Enthusiast',
  education: 'Information Technology Student',
  headline: 'BUILDING DIGITAL\nPRODUCTS WITH PURPOSE.',
  subheadline: 'An Interactive Engineering Universe by Shardul Parihar.',
  bio: "I'm an Information Technology student passionate about software development, emerging technologies and solving problems through code. I enjoy working across the stack — from designing interfaces and building APIs to exploring AI-powered features and understanding how systems work behind the scenes. I also enjoy contributing to developer communities, participating in open-source programs and collaborating with people who love building things.",
  location: 'Pune, Maharashtra, India',
  locationShort: 'PUNE, IN',
  timezone: 'UTC+5:30 (IST)',
  email: 'shardulparihar2007@gmail.com',
  github: 'https://github.com/shardul-2007',
  githubUser: 'shardul-2007',
  linkedin: 'https://www.linkedin.com/in/shardul-parihar/',
  portfolio: 'https://shardul-parihar.vercel.app/',
  status: 'AVAILABLE FOR WORK',
  availabilityNote: 'Open to software development opportunities, internships, collaborative projects, hackathons and conversations about technology.',
  focus: [
    'FULL-STACK DEVELOPMENT',
    'WEB TECHNOLOGIES',
    'ARTIFICIAL INTELLIGENCE',
    'CYBERSECURITY',
    'DATA STRUCTURES & ALGORITHMS',
    'OPEN SOURCE',
  ],
  interests: [
    'Software Engineering',
    'Full-Stack Development',
    'Frontend Development',
    'Backend Development',
    'Web Technologies',
    'Artificial Intelligence',
    'Cybersecurity',
    'Data Structures and Algorithms',
    'Problem Solving',
    'Open-Source Development',
    'Hackathons',
    'Building innovative digital products',
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
      shortDesc: 'Understanding how software works beneath the interface from first principles.',
      fullDesc: 'I enjoy understanding how software works beneath the interface. From data structures and algorithms to APIs, databases and system design, I continuously strengthen my engineering fundamentals.',
      tags: ['DSA', 'Problem Solving', 'APIs & Databases', 'System Design'],
      accentColor: '#D9363E',
      quote: '"Strengthen engineering fundamentals beneath the interface."',
    },
    {
      id: 'builder',
      num: '02',
      label: 'BUILDER',
      title: 'Ideas Into Products',
      shortDesc: 'Building practical applications and transforming concepts into functional digital experiences.',
      fullDesc: 'I enjoy building practical applications, experimenting with modern frameworks and transforming concepts into functional digital experiences.',
      tags: ['CivicOS', 'AssemblyOS', 'SkillCert', 'SHARDUL.OS'],
      accentColor: '#EF493F',
      quote: '"Transform concepts into deployed, accessible digital experiences."',
    },
    {
      id: 'community',
      num: '03',
      label: 'COMMUNITY',
      title: 'Growing Together',
      shortDesc: 'Campus ambassador programs, student communities and open-source initiatives.',
      fullDesc: 'Through campus ambassador programs, student communities and open-source initiatives, I have developed communication, leadership, collaboration and networking experience.',
      tags: ['Google Student Ambassador', 'HackerRank Campus Crew', 'GSSoC', 'Open Source Connect'],
      accentColor: '#A91F2C',
      quote: '"Growing together accelerates the entire ecosystem."',
    },
    {
      id: 'creator',
      num: '04',
      label: 'CREATOR',
      title: 'Curiosity in Motion',
      shortDesc: 'Exploring new technologies, experimenting with ideas, and documenting learning.',
      fullDesc: 'I explore new technologies, experiment with ideas, document my learning and enjoy creating things that make technology more accessible and interesting.',
      tags: ['Tech Exploration', 'Interactive UI', 'Experimentation', 'Continuous Learning'],
      accentColor: '#711C27',
      quote: '"Curious by nature. Engineering by practice. Building with purpose."',
    },
  ],
};
