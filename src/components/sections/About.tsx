'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Users, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { labAudio } from '@/lib/audio';

export default function About() {
  const [activeCard, setActiveCard] = useState<string>('engineer');

  const cards = [
    {
      id: 'engineer',
      num: '01',
      label: 'ENGINEER',
      title: 'Systems Thinker',
      icon: Cpu,
      accent: '#D9363E',
      desc: 'I enjoy understanding how software works beneath the interface. From data structures and algorithms to APIs, databases and system design, I continuously strengthen my engineering fundamentals.',
      tags: ['DSA', 'System Design', 'APIs & Databases', 'Problem Solving'],
    },
    {
      id: 'builder',
      num: '02',
      label: 'BUILDER',
      title: 'Ideas Into Products',
      icon: Code,
      accent: '#EF493F',
      desc: 'I enjoy building practical applications, experimenting with modern frameworks and transforming concepts into functional digital experiences.',
      tags: ['CivicOS', 'AssemblyOS', 'SkillCert', 'Full-Stack'],
    },
    {
      id: 'community',
      num: '03',
      label: 'COMMUNITY',
      title: 'Growing Together',
      icon: Users,
      accent: '#A91F2C',
      desc: 'Through campus ambassador programs, student communities and open-source initiatives, I have developed communication, leadership, collaboration and networking experience.',
      tags: ['Google Student Ambassador', 'HackerRank Campus Crew', 'GSSoC', 'OSC'],
    },
    {
      id: 'creator',
      num: '04',
      label: 'CREATOR',
      title: 'Curiosity in Motion',
      icon: Sparkles,
      accent: '#711C27',
      desc: 'I explore new technologies, experiment with ideas, document my learning and enjoy creating things that make technology more accessible and interesting.',
      tags: ['Creative Tech', 'Continuous Learning', 'Documentation', 'Rapid Iteration'],
    },
  ];

  return (
    <section id="about" className="py-28 relative border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
          <span className="mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-sub)]">
            A BIT ABOUT ME
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416] font-editorial leading-[1.1]">
              Not just learning. <br />
              <span className="text-[#D9363E]">Building along the way.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
              <p>
                I&apos;m an <strong className="text-[#171416] font-semibold">Information Technology student</strong> passionate about software development, emerging technologies and solving problems through code.
              </p>
              <p>
                I enjoy working across the stack — from designing interfaces and building APIs to exploring AI-powered features and understanding how systems work behind the scenes.
              </p>
              <p>
                I also enjoy contributing to developer communities, participating in open-source programs and collaborating with people who love building things.
              </p>
            </div>

            {/* Quick Profile Summary Badge */}
            <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs mono text-[var(--text-sub)] pb-2 border-b border-[var(--border)]">
                <span className="text-[#D9363E] font-bold">SHARDUL PARIHAR · WORKING PROFILE</span>
                <span>PUNE, MAHARASHTRA</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-xs mono">
                <div>
                  <span className="text-[var(--text-sub)] block">ACADEMIC DEGREE:</span>
                  <span className="font-bold text-[#171416]">Information Technology</span>
                </div>
                <div>
                  <span className="text-[var(--text-sub)] block">COLLEGE / CAMPUS:</span>
                  <span className="font-bold text-[#171416]">PCET&apos;s NMIET, Pune</span>
                </div>
                <div>
                  <span className="text-[var(--text-sub)] block">OPEN SOURCE:</span>
                  <span className="font-bold text-[#171416]">GSSoC · NSoC · OSC India</span>
                </div>
                <div>
                  <span className="text-[var(--text-sub)] block">CAMPUS AMBASSADOR:</span>
                  <span className="font-bold text-[#171416]">Google · HackerRank · PW</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Four Interactive Identity Cards */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            {cards.map(card => {
              const Icon = card.icon;
              const isSelected = activeCard === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => {
                    labAudio.playClick(950);
                    setActiveCard(card.id);
                  }}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#D9363E] shadow-[0_12px_30px_rgba(217,54,62,0.12)] -translate-y-1'
                      : 'bg-[var(--card)] border-[var(--border)] hover:border-[#D9363E]/50 hover:bg-white shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-white"
                        style={{ backgroundColor: card.accent }}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="mono text-xs font-bold text-[var(--text-sub)]">
                        {card.num}
                      </span>
                    </div>

                    <div>
                      <div className="mono text-[10px] uppercase font-bold tracking-wider" style={{ color: card.accent }}>
                        {card.label}
                      </div>
                      <h3 className="text-lg font-bold text-[#171416] tracking-tight">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border)] mt-4">
                    {card.tags.map(tag => (
                      <span
                        key={tag}
                        className="mono text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[#171416] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
