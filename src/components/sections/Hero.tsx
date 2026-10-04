'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, MapPin, Zap } from 'lucide-react';
import { PERSONAL } from '@/data/portfolio';
import { useRef } from 'react';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

const CHIPS = [
  { label: 'Full Stack',    accent: true  },
  { label: 'AI / ML',       accent: false },
  { label: 'Web Dev',       accent: false },
  { label: 'Cybersecurity', accent: false },
  { label: 'Open Source',   accent: false },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY    = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const photoY   = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const photoOpa = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen overflow-hidden flex items-center">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Large background portrait — right side */}
      <motion.div
        style={{ y: photoY, opacity: photoOpa }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          className="absolute right-0 top-0 bottom-0"
          style={{ width: '58%' }}
          initial={{ clipPath: 'circle(0% at 50% 36%)' }}
          animate={{ clipPath: 'circle(130% at 50% 36%)' }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={BASE + '/imageshardul.png'}
            alt=""
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              filter: 'brightness(0.55) contrast(1.1) saturate(0.85)',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg) 0%, rgba(5,8,16,0.6) 22%, transparent 50%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 22%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 16%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)' }} />
        </motion.div>
        {/* Sweep on reveal */}
        <motion.div
          initial={{ top: '36%', opacity: 0 }}
          animate={{ top: ['-5%'], opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.6, delay: 0.2 }}
          style={{ position: 'absolute', right: 0, width: '58%', height: 2, background: 'linear-gradient(90deg, transparent, rgba(0,245,200,0.7), transparent)', boxShadow: '0 0 20px rgba(0,245,200,0.4)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 70% at 20% 50%, rgba(0,245,200,0.05) 0%, transparent 60%)' }} />
      </motion.div>

      {/* Hero text — left */}
      <motion.div style={{ y: textY }} className="section-container relative z-20 w-full py-28 pt-36">
        <div className="max-w-[480px]">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1.8 }}
            className="flex items-center gap-3 mb-7">
            <span className="status-dot status-dot-pulse" style={{ width: 7, height: 7 }} />
            <span className="mono text-[10px] tracking-[0.22em] text-[var(--accent)]">AVAILABLE FOR WORK</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.95, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold tracking-tight leading-none mb-5"
            style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', letterSpacing: '-0.025em' }}
          >
            <span className="block" style={{ color: 'var(--text)' }}>Shardul</span>
            <span className="block gradient-text">Parihar.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.1 }}
            className="mono text-xs tracking-[0.18em] mb-6 uppercase" style={{ color: 'var(--text-sub)' }}>
            Software Engineer &nbsp;·&nbsp; Builder &nbsp;·&nbsp; AI Enthusiast
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }} className="flex flex-wrap gap-2 mb-7">
            {CHIPS.map((c, i) => (
              <motion.span key={c.label} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.25 + i * 0.07 }}
                className="mono text-[11px] px-3 py-1.5 rounded-full select-none"
                style={{
                  background: c.accent ? 'var(--accent-dim)' : 'var(--surface)',
                  border: c.accent ? '1px solid var(--border-glow)' : '1px solid var(--border)',
                  color: c.accent ? 'var(--accent)' : 'var(--text-muted)',
                  letterSpacing: '0.1em',
                }}>
                {c.label}
              </motion.span>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.45 }}
            className="text-sm leading-relaxed mb-9" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
            {PERSONAL.bio}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6 }} className="flex flex-wrap gap-3">
            <a href="#projects" className="glow-btn glow-btn-primary">View My Work</a>
            <a href="#contact"  className="glow-btn glow-btn-ghost">Get In Touch</a>
            <a href="https://www.linkedin.com/in/shardul-parihar/" target="_blank" rel="noopener noreferrer" className="glow-btn glow-btn-ghost">LinkedIn ↗</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}
            className="flex items-center gap-4 mt-7 text-xs mono" style={{ color: 'var(--text-sub)' }}>
            <span className="flex items-center gap-1.5"><MapPin size={11} /> Pune, India</span>
            <span className="w-px h-3" style={{ background: 'var(--border)' }} />
            <span className="flex items-center gap-1.5"><Zap size={11} style={{ color: 'var(--accent)' }} /> Open to work</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="mono text-[9px] tracking-[0.25em]" style={{ color: 'var(--text-sub)' }}>SCROLL</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={13} style={{ color: 'var(--text-sub)' }} />
        </motion.div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />
    </section>
  );
}