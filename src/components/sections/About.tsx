'use client';
import { motion } from 'framer-motion';
import { User, MapPin, Terminal, Award, CheckCircle2, BookOpen } from 'lucide-react';
import { PROFILE } from '@/data/profile';

export default function About() {
  return (
    <section id="about" className="py-28 relative border-b border-[var(--border)]">
      <div className="section-container">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)]" />
          <span className="sys-label-orange">EDITORIAL DOSSIER // BIOGRAPHY</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)] font-editorial leading-[1.1]">
              Engineering with <br />
              <span className="gradient-orange">First Principles</span> &amp; Precision.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[var(--text-muted)] font-light leading-relaxed">
              <p>
                I am <strong className="font-semibold text-[var(--text)]">{PROFILE.fullName}</strong>, a software engineering student and builder based in <span className="text-[var(--text)] font-medium">Pune, Maharashtra, India</span> at PCET&apos;s Nutan Maharashtra Institute of Engineering and Technology (NMIET).
              </p>
              <p>
                My focus centers on the entire life cycle of software: from foundational data structures and algorithm analysis to high-concurrency backend services, interactive 3D WebGL interfaces, and applied AI systems.
              </p>
              <p>
                Rather than treating software as arbitrary syntax, I view engineering through a systems lens — understanding hardware constraints, memory models, network round-trips, and human cognitive patterns to ship digital products that operate reliably at scale.
              </p>
            </div>

            {/* Technical Annotations Box */}
            <div className="p-6 rounded-2xl glass border border-[var(--border-strong)] space-y-4">
              <div className="flex items-center justify-between text-xs mono text-[var(--text-sub)] pb-3 border-b border-[var(--border)]">
                <span className="text-[var(--accent)] font-semibold flex items-center gap-1.5">
                  <Terminal size={14} /> ENGINEERING PHILOSOPHY &amp; ETHICS
                </span>
                <span>DOC_ID: SHARDUL.SPEC</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-light text-[var(--text-muted)]">
                <div className="space-y-1">
                  <div className="font-bold text-[var(--text)] mono text-xs">
                    01. Zero Fake Metrics
                  </div>
                  <p className="leading-relaxed">
                    Every project claim, link, and experience listed is backed by real source repositories and verifiable credentials.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-[var(--text)] mono text-xs">
                    02. Product Utility Over Tutorials
                  </div>
                  <p className="leading-relaxed">
                    Building standalone tools (CivicOS, AssemblyOS, SkillCert) solving real municipal, spatial 3D, and SaaS credential problems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Technical Interests & Campus Evidence */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Profile Card */}
            <div className="p-6 rounded-2xl glass border border-[var(--border-strong)] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent-dim)] border border-[var(--border-glow)] flex items-center justify-center text-[var(--accent)] font-bold mono">
                  SP
                </div>
                <div>
                  <div className="font-bold text-base text-[var(--text)]">{PROFILE.fullName}</div>
                  <div className="mono text-xs text-[var(--accent-orange)]">PCET&apos;s NMIET · Pune, India</div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[var(--border)] text-xs mono text-[var(--text-muted)]">
                <div className="flex justify-between py-1">
                  <span className="text-[var(--text-sub)]">DEGREE FOCUS:</span>
                  <span className="text-[var(--text)] font-semibold">Computer Engineering</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[var(--text-sub)]">CAMPUS AMBASSADOR:</span>
                  <span className="text-[var(--text)] font-semibold">Google, HackerRank, PW</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[var(--text-sub)]">OPEN SOURCE:</span>
                  <span className="text-[var(--text)] font-semibold">GSSOC, NSOC, OSC</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[var(--text-sub)]">CURRENT FOCUS:</span>
                  <span className="text-[var(--accent)] font-semibold">Full Stack &amp; Applied AI</span>
                </div>
              </div>
            </div>

            {/* Core Pillars Grid */}
            <div className="p-6 rounded-2xl glass border border-[var(--border)]">
              <div className="mono text-xs font-semibold text-[var(--text-sub)] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <BookOpen size={14} className="text-[var(--accent)]" />
                <span>CORE ENGINEERING INTERESTS</span>
              </div>

              <div className="space-y-2">
                {PROFILE.interests.map(interest => (
                  <div
                    key={interest}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-[var(--surface-2)] text-xs text-[var(--text)] font-medium"
                  >
                    <CheckCircle2 size={13} className="text-[var(--accent-lime)] flex-shrink-0" />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
