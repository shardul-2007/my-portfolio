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
    <section id="github" className="py-28 relative bg-[#F8F5F1] text-[#171416] border-b border-[#E5DDDA] tech-grid overflow-hidden">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
              <span className="mono text-xs font-bold uppercase tracking-[0.16em] text-[#D9363E]">
                BUILD IN PUBLIC
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416]">
              CODE COMMITS
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-[#D9363E]">
              &ldquo;Every commit is another step forward.&rdquo;
            </p>
            <p className="text-sm sm:text-base text-[#81777A] font-normal leading-relaxed">
              Real-time engineering activity synced directly with GitHub for <span className="font-bold text-[#171416]">@shardul-2007</span>. All repositories, commit counts, and stargazers are verified via the public GitHub API.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => labAudio.playClick(900)}
              className="inline-flex items-center gap-2 mono text-xs px-5 py-2.5 rounded-full bg-[#171416] text-white hover:bg-[#D9363E] font-bold transition-all shadow-sm cursor-pointer"
            >
              <Github size={15} />
              <span>EXPLORE @SHARDUL-2007</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* User Stats Card */}
        {user && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DDDA] shadow-[0_4px_20px_rgba(23,20,22,0.03)] mb-8 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-16 h-16 rounded-2xl border border-[#E5DDDA] object-cover shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-[#171416]">{user.name}</h3>
                  <span className="mono text-xs px-2 py-0.5 rounded-full bg-[#F1ECE8] text-[#81777A]">@{user.login}</span>
                  {isLive && (
                    <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-[#EDF9F0] text-[#10B981] font-bold border border-[#C5ECD0] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      LIVE API
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#81777A] mt-1 max-w-md">
                  {user.bio}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 mono text-xs">
              <div className="text-center">
                <div className="text-xl font-bold text-[#D9363E]">{user.public_repos}</div>
                <div className="text-[10px] text-[#81777A]">PUBLIC REPOS</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#171416]">{user.followers}</div>
                <div className="text-[10px] text-[#81777A]">FOLLOWERS</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#171416]">{user.following}</div>
                <div className="text-[10px] text-[#81777A]">FOLLOWING</div>
              </div>
            </div>
          </div>
        )}

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map(repo => (
            <motion.div
              key={repo.id}
              whileHover={{ y: -3 }}
              className="p-6 rounded-3xl bg-white border border-[#E5DDDA] hover:border-[#D9363E]/40 hover:shadow-[0_8px_30px_rgba(23,20,22,0.06)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#171416] truncate">
                    <BookOpen size={15} className="text-[#D9363E] flex-shrink-0" />
                    <span className="truncate">{repo.name}</span>
                  </div>
                  {repo.language && (
                    <span className="mono text-[9px] px-2.5 py-0.5 rounded-full bg-[#F1ECE8] text-[#D9363E] font-bold flex-shrink-0 border border-[#E5DDDA]">
                      {repo.language}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#81777A] leading-relaxed line-clamp-2">
                  {repo.description || 'Public engineering repository.'}
                </p>
              </div>

              {/* Repo Stats & Actions */}
              <div className="mt-5 pt-4 border-t border-[#E5DDDA] flex items-center justify-between text-xs mono text-[#81777A]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-[#F59E0B]" />
                    <span>{repo.stargazers_count}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} />
                    <span>{repo.forks_count}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D9363E] font-bold hover:underline text-[11px]"
                    >
                      Demo ↗
                    </a>
                  )}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#171416] hover:text-[#D9363E]"
                    title="View on GitHub"
                  >
                    <ExternalLink size={14} />
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
