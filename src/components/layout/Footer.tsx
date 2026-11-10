'use client';
import { ArrowUp, Github, Linkedin, Mail, Terminal, Heart } from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { NAV_LINKS } from '@/data/navigation';
import { labAudio } from '@/lib/audio';

export default function Footer() {
  function scrollToTop() {
    labAudio.playClick(1000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-deep)] py-16 text-xs mono text-[var(--text-sub)]">
      <div className="section-container space-y-12">
        {/* Signature Header matching Rishika Reference */}
        <div className="pb-12 border-b border-[var(--border)]">
          <span className="eyebrow">transmission</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)] font-editorial mt-2">
            let&rsquo;s make it work <span className="font-serif-italic font-normal text-amber-500">on everyone&rsquo;s machine</span>.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 pt-6 border-t border-[var(--border)]">
            <div>
              <div className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-1">people</div>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                open for full-stack engineering, applied AI collaborations, and student programs.
              </p>
            </div>
            <div>
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1">work</div>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                inspect repositories at github.com/shardul-2007 with 100% verified source code.
              </p>
            </div>
            <div>
              <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1">voice</div>
              <a
                href={`mailto:${PROFILE.email}`}
                className="text-xs text-[var(--text)] hover:text-[var(--accent)] underline block leading-relaxed"
              >
                {PROFILE.email}
              </a>
            </div>
            <div>
              <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">paperwork</div>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--text)] hover:text-[var(--accent)] underline block leading-relaxed"
              >
                curriculum vitae / linkedin ↗
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--text)] tracking-[0.16em]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span>{PROFILE.brand}</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed max-w-sm">
              An Interactive Engineering Universe by Shardul Parihar. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Web Audio API.
            </p>
            <div className="text-[11px] text-[var(--text-sub)]">
              LOC: Pune, Maharashtra, India · 18.5204° N, 73.8567° E
            </div>
          </div>

          {/* Quick Sitemap Navigation */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-[11px] font-bold text-[var(--text)] tracking-wider">
              SYSTEM SITEMAP
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {NAV_LINKS.map(link => (
                <a
                  key={link.id}
                  href={link.href}
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 space-y-4 md:text-right">
            <div className="text-[11px] font-bold text-[var(--text)] tracking-wider">
              TELEMETRY &amp; CREDENTIALS
            </div>
            <div className="flex items-center md:justify-end gap-3 text-sm">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
                title="GitHub Profile"
              >
                <Github size={16} />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="hover:text-[var(--accent)] transition-colors"
                title="Direct Email"
              >
                <Mail size={16} />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="glow-btn glow-btn-ghost text-[10px] py-1.5 px-3 md:ml-auto cursor-pointer"
            >
              <ArrowUp size={12} />
              <span>TOP OF UNIVERSE</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px]">
          <div>
            © {new Date().getFullYear()} Shardul Rajendra Parihar. All rights reserved.
          </div>
          <div className="text-[var(--accent-lime)]">
            ● 17 PROGRAMS · 16 ACHIEVEMENTS · 23 SKILLS · 4 FEATURED SYSTEMS
          </div>
        </div>
      </div>
    </footer>
  );
}
