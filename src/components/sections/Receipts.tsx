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
      accent: '#D9363E',
    },
    {
      num: `${counts.credentials}`,
      label: 'documented credentials',
      footnote: 'verified proofs, certificate IDs, and zero fabricated claims',
      accent: '#EF493F',
    },
    {
      num: `0${counts.systems}`,
      label: 'production systems shipped',
      footnote: 'CivicOS, AssemblyOS, SkillCert, and SHARDUL.LAB live in production',
      accent: '#A91F2C',
    },
    {
      num: `${counts.skills}`,
      label: 'validated tech stack capabilities',
      footnote: 'React, TypeScript, Three.js, Python, C++, AI APIs, and PostgreSQL',
      accent: '#711C27',
    },
    {
      num: `${counts.metrics}%`,
      label: 'genuine verified claims',
      footnote: 'no inflated statistics, verified against actual repositories and offer letters',
      accent: '#10B981',
    },
  ];

  return (
    <section id="receipts" className="py-20 relative bg-[#F8F5F1] text-[#171416] border-b border-[#E5DDDA] tech-grid overflow-hidden">
      <div className="section-container relative z-10">
        {/* Head */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
              <span className="mono text-xs font-bold uppercase tracking-[0.16em] text-[#D9363E]">
                RECEIPTS &amp; TELEMETRY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171416]">
              VERIFIED <span className="font-serif italic font-normal text-[#D9363E]">PROOF</span>.
            </h2>
          </div>
          <p className="text-sm text-[#81777A] mono">
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
              className="p-6 rounded-2xl bg-white border border-[#E5DDDA] hover:border-[#D9363E]/40 shadow-[0_4px_20px_rgba(23,20,22,0.03)] hover:shadow-[0_8px_30px_rgba(23,20,22,0.06)] transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-2">
                <div
                  className="text-4xl sm:text-5xl font-black mono tracking-tight group-hover:scale-105 transition-transform"
                  style={{ color: item.accent }}
                >
                  {item.num}
                </div>
                <div className="text-xs font-bold text-[#171416] uppercase tracking-wider leading-snug">
                  {item.label}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E5DDDA] text-[11px] text-[#81777A] font-normal leading-relaxed">
                {item.footnote}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
