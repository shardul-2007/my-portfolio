'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Compass,
  Calendar,
  MapPin,
  ExternalLink,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Network,
} from 'lucide-react';
import { EXPERIENCES, ExperienceItem } from '@/data/experience';
import { assetPath } from '@/lib/basePath';
import { labAudio } from '@/lib/audio';

export default function CommunityEngagements() {
  const [viewMode, setViewMode] = useState<'network' | 'timeline'>('network');
  const [selectedRole, setSelectedRole] = useState<ExperienceItem>(EXPERIENCES[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Key flagship community organizations
  const communityOrgs = [
    { name: 'Google', role: 'Google Student Ambassador', tag: 'AI & Community', color: '#4285F4', expId: 'google' },
    { name: 'HackerRank', role: 'Campus Crew Lead', tag: 'Coding & Contests', color: '#10B981', expId: 'hackerrank' },
    { name: 'RemoteRecruit', role: 'Campus Ambassador', tag: 'Internships & Careers', color: '#00F5C8', expId: 'remoterecruit' },
    { name: 'MyGov India', role: 'Change Maker (Level 5)', tag: 'Civic Engagement', color: '#F59E0B', expId: 'mygov-changemaker' },
    { name: 'GUESSS India', role: 'Campus Ambassador CA-419', tag: 'Entrepreneurship', color: '#8B5CF6', expId: 'guesss-india' },
    { name: 'GirlScript GSSoC', role: 'Open Source Contributor', tag: 'Mentorship', color: '#3B82F6', expId: 'gssoc' },
    { name: 'Internshala', role: 'Student Partner (ISP)', tag: 'Student Outreach', color: '#12A150', expId: 'internshala' },
    { name: 'PhysicsWallah', role: 'Campus Ambassador', tag: 'EdTech', color: '#EC4899', expId: 'physicswallah' },
    { name: 'GUVI', role: 'Campus Ambassador', tag: 'Developer Education', color: '#F97316', expId: 'guvi' },
    { name: 'Cognizance IIT Roorkee', role: 'Campus Ambassador', tag: 'Technical Fest', color: '#6366F1', expId: 'iit-roorkee' },
    { name: 'International MUN', role: 'Campus Ambassador', tag: 'Global Diplomacy', color: '#14B8A6', expId: 'imun' },
  ];

  const filteredExperiences = EXPERIENCES.filter(exp => {
    if (filterCategory === 'active') return exp.status === 'active';
    if (filterCategory === 'ambassador') return exp.category.toLowerCase().includes('ambassador');
    if (filterCategory === 'programs') return exp.category.toLowerCase().includes('student program');
    return true;
  });

  return (
    <section id="engagements" className="relative py-24 bg-[#F1ECE8] text-[#171416] overflow-hidden">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

      {/* Connected Storytelling Energy Line Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-b from-[#A91F2C] to-[#D9363E] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mono text-xs font-bold text-[#D9363E] uppercase tracking-widest">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9363E] animate-pulse" />
              <span>02 · COMMUNITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416]">
              ENGAGEMENTS
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-[#D9363E]">
              &ldquo;Building connections beyond the code.&rdquo;
            </p>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl">
              17 verified programs spanning nationwide student networks, tech communities, and campus leadership roles across India.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[var(--border)] shadow-sm mono text-xs">
            <button
              type="button"
              onClick={() => {
                labAudio.playClick(900);
                setViewMode('network');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                viewMode === 'network'
                  ? 'bg-[#D9363E] text-white shadow-sm'
                  : 'text-[#171416] hover:text-[#D9363E]'
              }`}
            >
              <Network size={13} />
              <span>CONSTELLATION VIEW</span>
            </button>
            <button
              type="button"
              onClick={() => {
                labAudio.playClick(950);
                setViewMode('timeline');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                viewMode === 'timeline'
                  ? 'bg-[#D9363E] text-white shadow-sm'
                  : 'text-[#171416] hover:text-[#D9363E]'
              }`}
            >
              <Calendar size={13} />
              <span>TIMELINE VIEW</span>
            </button>
          </div>
        </div>

        {/* View Mode: CONSTELLATION VIEW */}
        {viewMode === 'network' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Orbit Constellation (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[var(--border)] shadow-md relative min-h-[500px] flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between mono text-xs text-[var(--text-sub)] pb-4 border-b border-[var(--border)]">
                <span>CONSTELLATION CORE · 17 VERIFIED ORGS</span>
                <span className="text-[#D9363E] font-bold">CLICK ANY SATELLITE TO INSPECT</span>
              </div>

              {/* Central Core Node */}
              <div className="my-auto py-8 relative flex flex-col items-center justify-center">
                <div className="relative z-10 p-4 sm:p-5 rounded-3xl bg-[#171416] text-white text-center shadow-xl border-2 border-[#D9363E] max-w-[280px]">
                  <div className="mono text-[9px] uppercase tracking-widest text-[#D9363E] font-bold">CORE NODE</div>
                  <div className="text-base sm:text-lg font-bold">Shardul Parihar</div>
                  <div className="mono text-[10px] text-white/70 mt-0.5">COMMUNITY &amp; COLLABORATION</div>
                </div>

                {/* Surrounding Interactive Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-6">
                  {communityOrgs.map(org => {
                    const expMatch = EXPERIENCES.find(e => e.id === org.expId) || EXPERIENCES[0];
                    const isSelected = selectedRole.id === expMatch.id;
                    return (
                      <button
                        key={org.name}
                        type="button"
                        onClick={() => {
                          labAudio.playClick(900);
                          setSelectedRole(expMatch);
                        }}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FDF6F6] border-[#D9363E] shadow-md scale-102'
                            : 'bg-white border-[var(--border)] hover:border-[#D9363E]/40 hover:bg-[#FDF6F6]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#171416]">{org.name}</span>
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: org.color }} />
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)] line-clamp-1">{org.role}</div>
                        <div className="mono text-[9px] text-[#D9363E] mt-1 uppercase font-semibold">{org.tag}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mono text-[10px] text-[var(--text-sub)] flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <span>STATUS: 6 ACTIVE ENGAGEMENTS</span>
                <span>GEOGRAPHY: PUNE &amp; REMOTE PAN-INDIA</span>
              </div>
            </div>

            {/* Selected Organization Detail Card (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[var(--border)] shadow-md space-y-5">
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-[var(--border)]">
                <div>
                  <span className="mono text-[10px] uppercase font-bold text-[#D9363E] px-2.5 py-0.5 rounded-full bg-[#FDF6F6] border border-[#F2D2D4]">
                    {selectedRole.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#171416] mt-2 leading-tight">
                    {selectedRole.role}
                  </h3>
                  <div className="text-sm font-semibold text-[var(--text-sub)] mt-0.5">
                    {selectedRole.org}
                  </div>
                </div>

                <span
                  className={`mono text-[10px] px-2.5 py-1 rounded-full font-bold uppercase shrink-0 ${
                    selectedRole.status === 'active'
                      ? 'bg-[#12a150]/10 text-[#12a150] border border-[#12a150]/30'
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                >
                  {selectedRole.status}
                </span>
              </div>

              {/* Meta details */}
              <div className="grid grid-cols-2 gap-3 mono text-xs">
                <div className="p-3 rounded-2xl bg-[#F1ECE8]/60 border border-[var(--border)]">
                  <div className="text-[10px] text-[var(--text-sub)] uppercase">Duration</div>
                  <div className="font-bold text-[#171416] mt-0.5">{selectedRole.startDate} – {selectedRole.endDate}</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#F1ECE8]/60 border border-[var(--border)]">
                  <div className="text-[10px] text-[var(--text-sub)] uppercase">Type</div>
                  <div className="font-bold text-[#171416] mt-0.5">{selectedRole.type}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="mono text-xs uppercase font-bold text-[#171416] mb-1.5">Responsibilities &amp; Scope</h4>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {selectedRole.description}
                </p>
              </div>

              {/* Recognition & Proof */}
              {selectedRole.recognition && (
                <div className="p-3.5 rounded-2xl bg-[#FDF6F6] border border-[#F2D2D4] space-y-1">
                  <div className="mono text-[10px] uppercase font-bold text-[#D9363E] flex items-center gap-1.5">
                    <Award size={12} /> Recognition
                  </div>
                  <p className="text-xs text-[#711C27] font-medium leading-snug">
                    {selectedRole.recognition}
                  </p>
                </div>
              )}

              {/* Verification & Proof Type */}
              <div className="pt-2 flex items-center justify-between text-xs mono">
                <span className="text-[var(--text-sub)] flex items-center gap-1">
                  <ShieldCheck size={14} className="text-[#12a150]" />
                  <span>{selectedRole.proofType || 'Official Letter / Credential'}</span>
                </span>
                <span className="text-[#D9363E] font-bold">100% VERIFIED</span>
              </div>
            </div>
          </div>
        )}

        {/* View Mode: TIMELINE VIEW */}
        {viewMode === 'timeline' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--border)] shadow-sm space-y-6">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2 mono text-xs pb-4 border-b border-[var(--border)]">
              {['all', 'active', 'ambassador', 'programs'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    labAudio.playClick(900);
                    setFilterCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-full font-bold uppercase transition-all ${
                    filterCategory === cat
                      ? 'bg-[#D9363E] text-white shadow-sm'
                      : 'bg-[#F1ECE8] text-[#171416] hover:bg-[#E5D9D7]'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="ml-auto text-[var(--text-sub)] text-[11px]">
                Showing {filteredExperiences.length} of {EXPERIENCES.length} documented engagements
              </span>
            </div>

            {/* Timeline Stream */}
            <div className="space-y-4">
              {filteredExperiences.map(exp => (
                <div
                  key={exp.id}
                  onClick={() => {
                    labAudio.playClick(900);
                    setSelectedRole(exp);
                  }}
                  className="p-4 sm:p-5 rounded-2xl border border-[var(--border)] hover:border-[#D9363E]/60 bg-white hover:bg-[#FDF6F6]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-[#171416]">{exp.role}</span>
                      <span className="text-xs text-[var(--text-sub)]">· {exp.org}</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-1">{exp.description}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 mono text-xs">
                    <span className="text-[var(--text-sub)]">{exp.startDate} – {exp.endDate}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        exp.status === 'active'
                          ? 'bg-[#12a150]/10 text-[#12a150]'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {exp.status}
                    </span>
                    <ChevronRight size={14} className="text-[#D9363E]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Connected Storytelling Transition Line Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-b from-[#D9363E] to-[#711C27] pointer-events-none" />
    </section>
  );
}
