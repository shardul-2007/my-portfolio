'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  GitFork,
  Star,
  Users,
  BookOpen,
  ArrowUpRight,
  ExternalLink,
  Activity,
} from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { labAudio } from '@/lib/audio';

interface GHUser {
  name: string;
  login: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GHRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage?: string;
}

const STATIC_FALLBACK_REPOS: GHRepo[] = [
  {
    id: 1,
    name: 'civicos',
    description: 'AI-Powered Municipal Operating System combining interactive maps, analytics dashboards, and AI query resolution.',
    language: 'JavaScript',
    stargazers_count: 3,
    forks_count: 1,
    html_url: 'https://github.com/shardul-2007/civicos',
    homepage: 'https://civicos-beta.vercel.app',
  },
  {
    id: 2,
    name: 'assemblyos',
    description: 'AI-Powered 3D Model Assembly & Spatial Guidance Platform with React Three Fiber, exploded view, and copilot.',
    language: 'TypeScript',
    stargazers_count: 4,
    forks_count: 0,
    html_url: 'https://github.com/shardul-2007/assemblyos',
    homepage: 'https://assemblyos-sigma.vercel.app',
  },
  {
    id: 3,
    name: 'Online-Test-And-Certification-Platform',
    description: 'Proctored examination SaaS with server-side evaluation, automated vector PDF certificate generation, and QR verification.',
    language: 'TypeScript',
    stargazers_count: 2,
    forks_count: 0,
    html_url: 'https://github.com/shardul-2007/Online-Test-And-Certification-Platform',
    homepage: 'https://certify-testfdp.vercel.app',
  },
  {
    id: 4,
    name: 'adaptq',
    description: 'High-performance C++17 KV cache compression engine for LLM inference with Python bindings and SIMD acceleration.',
    language: 'C++',
    stargazers_count: 2,
    forks_count: 0,
    html_url: 'https://github.com/shardul-2007/adaptq',
  },
  {
    id: 5,
    name: 'Dockfleet',
    description: 'Local-first orchestration tool that helps developers manage multiple projects on a single VPS using Docker.',
    language: 'TypeScript',
    stargazers_count: 1,
    forks_count: 0,
    html_url: 'https://github.com/shardul-2007/Dockfleet',
  },
  {
    id: 6,
    name: 'my-portfolio',
    description: 'SHARDUL.LAB interactive engineering universe built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.',
    language: 'TypeScript',
    stargazers_count: 3,
    forks_count: 0,
    html_url: 'https://github.com/shardul-2007/my-portfolio',
    homepage: 'https://shardul-2007.github.io/my-portfolio/',
  },
];

export default function GitHubSection() {
  const [user, setUser] = useState<GHUser | null>({
    name: PROFILE.name,
    login: PROFILE.githubUser,
    bio: PROFILE.bio,
    avatar_url: 'https://avatars.githubusercontent.com/u/152914757?v=4',
    public_repos: 12,
    followers: 14,
    following: 18,
  });
  const [repos, setRepos] = useState<GHRepo[]>(STATIC_FALLBACK_REPOS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const gh = PROFILE.githubUser;
    const userUrl = `https://api.github.com/users/${gh}`;
    const repoUrl = `https://api.github.com/users/${gh}/repos?sort=updated&per_page=6`;

    Promise.all([
      fetch(userUrl).then(r => (r.ok ? r.json() : null)),
      fetch(repoUrl).then(r => (r.ok ? r.json() : null)),
    ])
      .then(([u, r]) => {
        if (u) setUser(u);
        if (Array.isArray(r) && r.length > 0) {
          setRepos(r);
          setIsLive(true);
        }
      })
      .catch(() => {
        // Keeps verified fallback
      });
  }, []);

  return (
    <section id="github" className="py-28 relative border-b border-[var(--border)] overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
              <span className="mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-sub)]">
                BUILD IN PUBLIC
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#171416] font-editorial">
              Code, commits <br />
              <span className="font-serif-italic font-normal text-[#D9363E]">and curiosity.</span>
            </h2>
            <p className="text-base text-[var(--text-muted)] font-normal mt-3 leading-relaxed">
              My GitHub is where experiments, projects and learning come together.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => labAudio.playClick(900)}
              className="inline-flex items-center gap-1.5 mono text-xs px-4 py-2 rounded-full bg-[#171416] text-white hover:bg-[#D9363E] font-bold transition-all shadow-sm"
            >
              <Github size={14} />
              <span>EXPLORE @SHARDUL-2007</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* User Stats Card */}
        {user && (
          <div className="p-6 rounded-2xl glass border border-[var(--border-strong)] mb-8 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-14 h-14 rounded-2xl border border-[var(--border)] object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-[var(--text)]">{user.name}</h3>
                  <span className="mono text-xs text-[var(--text-sub)]">@{user.login}</span>
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1 max-w-md font-light">
                  {user.bio}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mono text-xs text-[var(--text-sub)]">
              <div className="text-center">
                <div className="text-lg font-bold text-[var(--accent)]">{user.public_repos}</div>
                <div className="text-[10px]">REPOSITORIES</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[var(--text)]">{user.followers}</div>
                <div className="text-[10px]">FOLLOWERS</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[var(--text)]">{user.following}</div>
                <div className="text-[10px]">FOLLOWING</div>
              </div>
            </div>
          </div>
        )}

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map(repo => (
            <motion.div
              key={repo.id}
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl glass border border-[var(--border)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[var(--text)] truncate">
                    <BookOpen size={14} className="text-[var(--accent)] flex-shrink-0" />
                    <span className="truncate">{repo.name}</span>
                  </div>
                  {repo.language && (
                    <span className="mono text-[9px] px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--accent-orange)] font-semibold flex-shrink-0">
                      {repo.language}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed line-clamp-2">
                  {repo.description || 'Public engineering repository.'}
                </p>
              </div>

              {/* Repo Stats & Actions */}
              <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs mono text-[var(--text-sub)]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-[#FFE500]" />
                    <span>{repo.stargazers_count}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} />
                    <span>{repo.forks_count}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:underline text-[10px]"
                    >
                      Demo
                    </a>
                  )}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text)] hover:text-[var(--accent)]"
                    title="View on GitHub"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
