'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, FileCheck, Layers, Sparkles } from 'lucide-react';
import { labAudio } from '@/lib/audio';

export default function Receipts() {
  const [counts, setCounts] = useState({
    programs: 0,
    credentials: 0,
    systems: 0,
    skills: 0,
    metrics: 0,
  });

  useEffect(() => {
    const duration = 1200;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        programs: Math.round(17 * progress),
        credentials: Math.round(16 * progress),
        systems: Math.round(4 * progress),
        skills: Math.round(23 * progress),
        metrics: Math.round(100 * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({
          programs: 17,
          credentials: 16,
          systems: 4,
          skills: 23,
          metrics: 100,
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const RECEIPT_ITEMS = [
    {
      num: `${counts.programs}+`,
      label: 'programs & campus roles',
      footnote: 'Google Student Ambassador, HackerRank Campus Crew, and open source',
      accent: 'var(--accent)',
    },
    {
      num: `${counts.credentials}`,
      label: 'documented credentials',
      footnote: 'verified proofs, certificate IDs, and zero fabricated claims',
      accent: '#FF6B35',
    },
    {
      num: `0${counts.systems}`,
      label: 'production systems shipped',
      footnote: 'CivicOS, AssemblyOS, SkillCert, and SHARDUL.LAB live in production',
      accent: '#38BDF8',
    },
    {
      num: `${counts.skills}`,
      label: 'validated tech stack capabilities',
      footnote: 'React, TypeScript, Three.js, Python, C++, AI APIs, and PostgreSQL',
      accent: '#A78BFA',
    },
    {
      num: `${counts.metrics}%`,
      label: 'genuine verified claims',
      footnote: 'no inflated statistics, verified against actual repositories and offer letters',
      accent: '#10B981',
    },
  ];

  return (
    <section id="receipts" className="py-20 relative border-b border-[var(--border)] overflow-hidden">
      <div className="section-container">
        {/* Head */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="eyebrow">receipts</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text)] font-editorial mt-1">
              verified <span className="font-serif-italic font-normal text-amber-500">proof</span>.
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] mono">
            because &ldquo;trust me bro&rdquo; isn&rsquo;t a metric.
          </p>
        </div>

        {/* 5 Receipts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {RECEIPT_ITEMS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onMouseEnter={() => labAudio.playHover()}
              className="p-6 rounded-2xl glass border border-[var(--border)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-2">
                <div
                  className="text-4xl sm:text-5xl font-black mono tracking-tight group-hover:scale-105 transition-transform"
                  style={{ color: item.accent }}
                >
                  {item.num}
                </div>
                <div className="text-xs font-bold text-[var(--text)] uppercase tracking-wider leading-snug">
                  {item.label}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border)] text-[11px] text-[var(--text-sub)] font-light leading-relaxed">
                {item.footnote}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
