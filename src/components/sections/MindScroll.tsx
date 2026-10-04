'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EXPERIENCE, ACHIEVEMENTS, SKILLS, PERSONAL } from '@/data/portfolio';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

// Jagged tear polygon — top half keeps everything ABOVE the tear line
const TORN_TOP  = 'polygon(0% 0%, 100% 0%, 100% 48%, 97% 51%, 94% 47%, 91% 52%, 88% 47%, 85% 51%, 82% 46%, 79% 50%, 76% 45%, 73% 49%, 70% 44%, 67% 48%, 64% 43%, 61% 47%, 58% 42%, 55% 47%, 52% 42%, 49% 46%, 46% 41%, 43% 46%, 40% 41%, 37% 45%, 34% 40%, 31% 44%, 28% 39%, 25% 44%, 22% 39%, 19% 43%, 16% 38%, 13% 43%, 10% 38%, 7% 42%, 4% 37%, 1% 41%, 0% 38%)';
// Bottom half keeps everything BELOW the tear line
const TORN_BTM  = 'polygon(0% 38%, 1% 41%, 4% 37%, 7% 42%, 10% 38%, 13% 43%, 16% 38%, 19% 43%, 22% 39%, 25% 44%, 28% 39%, 31% 44%, 34% 40%, 37% 45%, 40% 41%, 43% 46%, 46% 41%, 49% 46%, 52% 42%, 55% 47%, 58% 42%, 61% 47%, 64% 43%, 67% 48%, 70% 44%, 73% 49%, 76% 45%, 79% 50%, 82% 46%, 85% 51%, 88% 47%, 91% 52%, 94% 47%, 97% 51%, 100% 48%, 100% 100%, 0% 100%)';

// Mind content nodes — positioned in mind space
const MIND_NODES = [
  // Row 1 — top
  { label: 'Google',       sub: 'Student Ambassador',    x: '8%',  y: '15%', color: '#4285F4', delay: 0.1 },
  { label: 'CivicOS',      sub: 'AI Civic Platform',    x: '35%', y: '10%', color: '#00F5C8', delay: 0.15 },
  { label: 'AssemblyOS',   sub: '3D AI Guidance',       x: '62%', y: '14%', color: '#00F5C8', delay: 0.2 },
  { label: 'GSSOC\'26',     sub: 'Open Source',     x: '82%', y: '18%', color: '#5B8DEF', delay: 0.25 },
  // Row 2 — middle-upper
  { label: 'HackerRank',   sub: 'Campus Crew',     x: '5%',  y: '38%', color: '#2EC866', delay: 0.3 },
  { label: 'Internshala',  sub: 'Campus Ambassador',    x: '26%', y: '35%', color: '#A78BFA', delay: 0.35 },
  { label: 'SkillCert',    sub: 'Cert Platform',        x: '50%', y: '40%', color: '#F59E0B', delay: 0.4 },
  { label: 'NSOC\'26',      sub: 'Open Source',     x: '72%', y: '38%', color: '#5B8DEF', delay: 0.45 },
  { label: 'Cybersecurity',sub: 'Web Security',         x: '90%', y: '40%', color: '#EF4444', delay: 0.5  },
  // Row 3 — middle-lower
  { label: 'GUVI',         sub: 'Campus Ambassador',    x: '10%', y: '60%', color: '#A78BFA', delay: 0.55 },
  { label: 'Physics Wallah',sub:'Campus Ambassador',    x: '30%', y: '62%', color: '#F59E0B', delay: 0.6  },
  { label: 'SHARDUL.OS',   sub: 'v5 · Next.js',        x: '55%', y: '63%', color: '#00F5C8', delay: 0.65 },
  { label: 'RemoteRecruit',sub: 'Campus Ambassador',   x: '78%', y: '60%', color: '#A78BFA', delay: 0.7  },
  // Row 4 — bottom
  { label: 'TypeScript',   sub: 'Languages',            x: '15%', y: '80%', color: '#3178C6', delay: 0.75 },
  { label: 'Python',       sub: 'Languages',            x: '38%', y: '82%', color: '#3776AB', delay: 0.8  },
  { label: 'DSA',          sub: 'Algorithms · CS',      x: '60%', y: '80%', color: '#00F5C8', delay: 0.85 },
  { label: 'Open Source',  sub: 'GSSoC · NSOC',         x: '82%', y: '82%', color: '#5B8DEF', delay: 0.9  },
];

// Star field positions
const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: (i * 47.3) % 100,
  y: (i * 31.7) % 100,
  size: (i % 3) + 1,
  delay: (i * 0.15) % 3,
}));

export default function MindScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Phase 1 (0 → 0.28): Photo is whole, tear line glows, then tears
  const tearOpacity  = useTransform(scrollYProgress, [0.05, 0.15, 0.28], [0, 1, 0]);
  const topY         = useTransform(scrollYProgress, [0.12, 0.38], ['0%', '-55%']);
  const botY         = useTransform(scrollYProgress, [0.12, 0.38], ['0%', '55%']);
  const photoOpacity = useTransform(scrollYProgress, [0.05, 0.35], [1, 0.15]);

  // Phase 2 (0.32 → 0.55): Mind space fades in
  const mindBg       = useTransform(scrollYProgress, [0.28, 0.50], [0, 1]);
  const mindContent  = useTransform(scrollYProgress, [0.38, 0.60], [0, 1]);

  // Phase 3 (0.55 → 1.0): Content slowly fades as section ends
  const mindFinalFade = useTransform(scrollYProgress, [0.85, 0.98], [1, 0]);

  return (
    <div ref={ref} style={{ height: '350vh', position: 'relative' }}>
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ background: 'var(--bg)' }}
      >

        {/* ── PHOTO — full screen, both halves ─────────────────────── */}
        <motion.div
          style={{ opacity: photoOpacity }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {/* TOP HALF — clips at the jagged tear line */}
          <motion.div style={{ y: topY }} className="absolute inset-0">
            <img
              src={BASE + '/imageshardul.png'}
              alt=""
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top',
                filter: 'brightness(0.5) contrast(1.1)',
                clipPath: TORN_TOP,
              }}
            />
          </motion.div>

          {/* BOTTOM HALF */}
          <motion.div style={{ y: botY }} className="absolute inset-0">
            <img
              src={BASE + '/imageshardul.png'}
              alt=""
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top',
                filter: 'brightness(0.5) contrast(1.1)',
                clipPath: TORN_BTM,
              }}
            />
          </motion.div>

          {/* Colour tint */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,8,16,0.45)', pointerEvents: 'none' }} />
        </motion.div>

        {/* ── TEAR GLOW LINE ─────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: tearOpacity }}
          className="absolute left-0 right-0 z-10 pointer-events-none"
          aria-hidden="true"
        >
          {/* Main glow bar */}
          <div style={{
            position: 'absolute', top: '48%', left: 0, right: 0, height: 3,
            background: 'linear-gradient(90deg, transparent, var(--accent), white, var(--accent), transparent)',
            boxShadow: '0 0 30px var(--accent), 0 0 60px rgba(0,245,200,0.4)',
            animation: 'tearGlow 0.8s ease-in-out infinite',
          }} />
          {/* Particles along tear */}
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: [-20, -60] }}
              transition={{ duration: 1.2, delay: i * 0.08, repeat: Infinity }}
              style={{
                position: 'absolute',
                left: `${8 + i * 7}%`,
                top: '47%',
                width: 3, height: 3,
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 8px var(--accent)',
              }}
            />
          ))}
        </motion.div>

        {/* ── MIND SPACE ─────────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: mindContent }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {/* Star field */}
          {STARS.map((star, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: star.x + '%',
                top: star.y + '%',
                width: star.size,
                height: star.size,
                borderRadius: '50%',
                background: 'var(--accent)',
                opacity: 0.25,
                animation: `starTwinkle ${2 + star.delay}s ease-in-out infinite`,
                animationDelay: star.delay + 's',
              }}
            />
          ))}

          {/* Radial mind glow from centre */}
          <motion.div
            style={{ opacity: mindBg }}
            className="absolute inset-0"
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,245,200,0.07) 0%, transparent 65%)',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 30% 30% at 50% 50%, rgba(0,245,200,0.12) 0%, transparent 50%)',
            }} />
          </motion.div>
        </motion.div>

        {/* ── MIND NODES — all experience / achievements / skills ─── */}
        <motion.div
          style={{ opacity: mindFinalFade }}
          className="absolute inset-0"
        >
          {MIND_NODES.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: node.delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute glass mind-float mind-pulse"
              style={{
                left: node.x, top: node.y,
                borderColor: node.color + '35',
                borderRadius: 12,
                padding: '8px 14px',
                animationDelay: `${i * 0.4}s`,
                boxShadow: '0 0 20px ' + node.color + '18',
                maxWidth: 160,
              }}
            >
              <div className="font-semibold" style={{ fontSize: '0.75rem', color: node.color, lineHeight: 1.2 }}>
                {node.label}
              </div>
              <div className="mono" style={{ fontSize: '0.58rem', color: 'var(--text-sub)', letterSpacing: '0.08em', marginTop: 2 }}>
                {node.sub}
              </div>
              {/* Glow dot */}
              <div style={{
                position: 'absolute', top: 6, right: 8,
                width: 5, height: 5, borderRadius: '50%',
                background: node.color,
                boxShadow: '0 0 8px ' + node.color,
              }} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── CENTRE LABEL ───────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: mindContent, scale: mindContent }}
          className="relative z-20 text-center pointer-events-none"
        >
          <div
            className="glass rounded-3xl px-10 py-8"
            style={{
              borderColor: 'rgba(0,245,200,0.3)',
              boxShadow: '0 0 60px rgba(0,245,200,0.15), 0 0 120px rgba(0,245,200,0.06)',
              backdropFilter: 'blur(32px)',
            }}
          >
            <div className="mono text-[10px] tracking-[0.3em] text-[var(--accent)] mb-3 uppercase">
              Inside the Mind of
            </div>
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
              {PERSONAL.name}
            </div>
            <div className="mono text-xs text-[var(--text-sub)] tracking-widest mb-5">
              {PERSONAL.subtitle}
            </div>
            {/* Live stats */}
            <div className="flex items-center justify-center gap-6 text-center">
              {[
                { val: EXPERIENCE.length + '+', label: 'Programs' },
                { val: ACHIEVEMENTS.length + '',label: 'Achievements' },
                { val: SKILLS.length + '',       label: 'Skills' },
                { val: '2',                      label: 'Projects' },
              ].map(s => (
                <div key={s.label}>
                  <div className="mono text-xl font-bold text-[var(--accent)]">{s.val}</div>
                  <div className="mono text-[9px] text-[var(--text-sub)] tracking-widest mt-0.5">{s.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint inside mind */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-6 mono text-[9px] tracking-[0.3em] text-[var(--accent)]"
          >
            ↓ &nbsp; SCROLL TO EXPLORE &nbsp; ↓
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}