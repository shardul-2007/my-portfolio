'use client';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ExternalLink,
  Github,
  Linkedin,
  Terminal,
  UserCheck,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { assetPath } from '@/lib/basePath';
import { labAudio } from '@/lib/audio';

interface HeroProps {
  onOpenRecruiter: () => void;
  onOpenCommand: () => void;
}

export default function Hero({ onOpenRecruiter, onOpenCommand }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden border-b border-[var(--border)]"
    >
      {/* Background Ambience & Engineering Coordinates */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(0,245,200,0.07)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-1/3 left-10 w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.06)_0%,transparent_70%)] blur-2xl" />

        {/* Technical Coordinate Annotations */}
        <div className="hidden lg:block absolute top-28 right-12 mono text-[10px] text-[var(--text-sub)] tracking-widest text-right">
          <div>LAT: 18.5204° N // LON: 73.8567° E</div>
          <div>LOC: PUNE, MAHARASHTRA, IN</div>
          <div>SYS_NODE: SHARDUL.LAB.PROD</div>
        </div>
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Identity */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status & Availability Tag */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border-strong)]">
                <span className="status-dot status-dot-pulse" />
                <span className="mono text-xs font-semibold tracking-wider text-[var(--accent-lime)]">
                  AVAILABLE FOR WORK
                </span>
              </div>
              <div className="flex items-center gap-1.5 mono text-xs text-[var(--text-sub)]">
                <MapPin size={12} className="text-[var(--accent)]" />
                <span>Pune, India (UTC+5:30)</span>
              </div>
            </motion.div>

            {/* Giant Editorial Title */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <div className="mono text-xs uppercase tracking-[0.22em] text-[var(--accent-orange)] font-semibold flex items-center gap-2">
                <span className="w-6 h-px bg-[var(--accent-orange)]" />
                <span>PERSONAL ENGINEERING UNIVERSE</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--text)] font-editorial leading-[1.05]">
                Shardul <br />
                <span className="gradient-text">Parihar.</span>
              </h1>
              <div className="text-xl sm:text-2xl font-medium text-[var(--accent)] tracking-tight">
                {PROFILE.role}
              </div>
            </motion.div>

            {/* Bio Prose */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed text-[var(--text-muted)] max-w-xl font-light"
            >
              {PROFILE.bio}
            </motion.p>

            {/* Verified Statistics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[var(--border)] max-w-xl"
            >
              {[
                { val: '17+', label: 'Programs & Roles', sub: 'Campus & Open Source' },
                { val: '16', label: 'Achievements', sub: 'Verified Credentials' },
                { val: '23', label: 'Tech Stack Skills', sub: 'Daily & Proficient' },
                { val: '04', label: 'Featured Systems', sub: 'Shipped to Prod' },
              ].map(stat => (
                <div key={stat.label} className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-bold mono text-[var(--accent)] tracking-tight">
                    {stat.val}
                  </div>
                  <div className="mono text-[11px] font-semibold text-[var(--text)] leading-tight">
                    {stat.label}
                  </div>
                  <div className="mono text-[9px] text-[var(--text-sub)]">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#projects"
                onClick={() => labAudio.playClick(1000)}
                className="glow-btn glow-btn-primary"
              >
                <span>EXPLORE SHIPPED SYSTEMS</span>
                <ArrowDown size={14} />
              </a>

              <button
                onClick={() => {
                  labAudio.playClick(1100);
                  onOpenRecruiter();
                }}
                className="glow-btn glow-btn-orange"
              >
                <UserCheck size={14} />
                <span>90s RECRUITER TOUR</span>
              </button>

              <button
                onClick={() => {
                  labAudio.playClick(900);
                  onOpenCommand();
                }}
                className="glow-btn glow-btn-ghost hidden sm:inline-flex"
                title="Command Palette"
              >
                <Terminal size={14} />
                <span>CTRL+K</span>
              </button>
            </motion.div>

            {/* Social / Evidence Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 pt-2 text-xs mono text-[var(--text-sub)]"
            >
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
              >
                <Github size={14} />
                <span>@shardul-2007</span>
              </a>
              <span>·</span>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
              >
                <Linkedin size={14} />
                <span>/in/shardul-parihar</span>
              </a>
              <span>·</span>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors"
              >
                <ExternalLink size={12} />
                <span>Resume Credentials</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Engineering Visual & Shardul Portrait Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-md"
            >
              {/* Outer Technical Frame */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-b from-[rgba(255,255,255,0.12)] via-[rgba(255,255,255,0.03)] to-transparent border border-[var(--border-strong)] shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                {/* Status Bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)] mb-3 text-[10px] mono text-[var(--text-sub)]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    <span>ENGINEER_PORTRAIT.RAW</span>
                  </div>
                  <span>PROD_IDENT: #007</span>
                </div>

                {/* Portrait Image with Vignette & Subtle Technical Mesh */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#0A0D14]">
                  <img
                    src={assetPath('/imageshardul.png')}
                    alt="Shardul Parihar — Software Engineer"
                    className="w-full h-full object-cover object-top filter brightness-[0.92] contrast-[1.08] hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Technical Scanline & Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-transparent to-transparent opacity-80 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,10,15,0.7)_100%)] pointer-events-none" />

                  {/* Floating Identity Overlay Badge */}
                  <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-[rgba(8,10,15,0.85)] border border-[rgba(255,255,255,0.12)] backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs font-semibold text-[var(--text)]">
                      <span>Shardul Parihar</span>
                      <span className="mono text-[10px] text-[var(--accent)] font-bold">SHARDUL.LAB</span>
                    </div>
                    <div className="mono text-[10px] text-[var(--text-muted)] mt-0.5">
                      PCET&apos;s NMIET · Pune, India
                    </div>
                  </div>
                </div>

                {/* Technical Bottom Tickers */}
                <div className="mt-3 px-2 py-1 flex items-center justify-between text-[9px] mono text-[var(--text-sub)]">
                  <span>HASH: e7f8b92c4d</span>
                  <span className="text-[var(--accent-lime)]">● 100% VERIFIED CLAIMS</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
