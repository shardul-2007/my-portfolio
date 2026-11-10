'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Network,
  Award,
} from 'lucide-react';
import { EXPERIENCES, ExperienceItem } from '@/data/experience';
import { labAudio } from '@/lib/audio';

export default function CommunityEngagements() {
  const [viewMode, setViewMode] = useState<'network' | 'timeline'>('network');
  const [selectedRole, setSelectedRole] = useState<ExperienceItem>(EXPERIENCES[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Flagship campus ambassador & community leadership programs (Open Source kept separate in Sec 01)
  const communityOrgs = [
    { name: 'Google', role: 'Google Student Ambassador (Gemini)', tag: 'Campus Leadership', color: '#D9363E', expId: 'google' },
    { name: 'HackerRank', role: 'Campus Crew Member', tag: 'Coding Community', color: '#10B981', expId: 'hackerrank' },
    { name: 'RemoteRecruit', role: 'Campus Ambassador', tag: 'Career Outreach', color: '#00F5C8', expId: 'remoterecruit' },
    { name: 'MyGov India', role: 'Change Maker (Level 5)', tag: 'Citizen Engagement', color: '#F59E0B', expId: 'mygov-changemaker' },
    { name: 'GUESSS India', role: 'Campus Ambassador (CA-419)', tag: 'Entrepreneurship', color: '#8B5CF6', expId: 'guesss-india' },
    { name: 'Internshala', role: 'Student Partner (ISP)', tag: 'Student Outreach', color: '#12A150', expId: 'internshala' },
    { name: 'PhysicsWallah', role: 'Campus Ambassador', tag: 'EdTech Network', color: '#EC4899', expId: 'physicswallah' },
    { name: 'GUVI', role: 'Campus Ambassador', tag: 'Tech Learning', color: '#F97316', expId: 'guvi' },
    { name: 'Cognizance IIT Roorkee', role: 'Campus Ambassador', tag: 'Technical Fest', color: '#6366F1', expId: 'iit-roorkee' },
    { name: 'International MUN', role: 'Campus Ambassador', tag: 'Global Diplomacy', color: '#14B8A6', expId: 'imun' },
  ];

  const filteredExperiences = EXPERIENCES.filter(exp => {
    // Keep open-source records in Sec 01
    if (exp.category.toLowerCase().includes('open source')) return false;
    if (filterCategory === 'active') return exp.status === 'active';
    if (filterCategory === 'ambassador') return exp.category.toLowerCase().includes('ambassador');
    if (filterCategory === 'leadership') return exp.category.toLowerCase().includes('leadership') || exp.category.toLowerCase().includes('student program');
    return true;
  });

  return (
    <section id="engagements" className="relative py-28 bg-[#F8F5F1] text-[#171416] border-b border-[#E5DDDA] overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 mono text-xs font-bold text-[#D9363E] uppercase tracking-widest">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9363E] animate-pulse" />
              <span>02 · COMMUNITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171416] font-editorial">
              ENGAGEMENTS
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-[#D9363E]">
              &ldquo;Building connections beyond the code.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[#81777A] mt-2 leading-relaxed">
              Documented campus ambassador roles, competitive student selections, and leadership programs spanning pan-India universities and tech platforms.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#E5DDDA] shadow-xs mono text-xs self-start md:self-end">
            <button
              type="button"
              onClick={() => {
                labAudio.playClick(900);
                setViewMode('network');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                viewMode === 'network'
                  ? 'bg-[#D9363E] text-white shadow-xs'
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-[#D9363E] text-white shadow-xs'
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
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDDA] shadow-[0_8px_30px_rgba(23,20,22,0.04)] relative min-h-[480px] flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between mono text-xs text-[#81777A] pb-4 border-b border-[#E5DDDA]">
                <span>CONSTELLATION NODES // VERIFIED ORGANIZATIONS</span>
                <span className="text-[#D9363E] font-bold">CLICK TO INSPECT</span>
              </div>

              {/* Central Core Node */}
              <div className="my-auto py-6 relative flex flex-col items-center justify-center">
                <div className="relative z-10 p-4 sm:p-5 rounded-3xl bg-[#171416] text-white text-center shadow-md border-2 border-[#D9363E] max-w-[280px]">
                  <div className="mono text-[9px] uppercase tracking-widest text-[#D9363E] font-bold">COMMUNITY CORE</div>
                  <div className="text-base sm:text-lg font-bold">Shardul Parihar</div>
                  <div className="mono text-[10px] text-white/70 mt-0.5">LEADERSHIP &amp; ENGAGEMENT</div>
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
                            ? 'bg-[#FDF6F6] border-[#D9363E] shadow-sm'
                            : 'bg-white border-[#E5DDDA] hover:border-[#D9363E]/40 hover:bg-[#F8F5F1]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#171416]">{org.name}</span>
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: org.color }} />
                        </div>
                        <div className="text-[11px] text-[#81777A] line-clamp-1">{org.role}</div>
                        <div className="mono text-[9px] text-[#D9363E] mt-1 uppercase font-semibold">{org.tag}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mono text-[10px] text-[#81777A] flex items-center justify-between pt-3 border-t border-[#E5DDDA]">
                <span>CAMPUS: PCET NMIET PUNE</span>
                <span>VERIFIED DOCUMENTED ROLES</span>
              </div>
            </div>

            {/* Selected Organization Detail Card (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDDA] shadow-[0_8px_30px_rgba(23,20,22,0.04)] space-y-5">
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#E5DDDA]">
                <div>
                  <span className="mono text-[10px] uppercase font-bold text-[#D9363E] px-2.5 py-0.5 rounded-full bg-[#FDF6F6] border border-[#F2D2D4]">
                    {selectedRole.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#171416] mt-2 leading-tight">
                    {selectedRole.role}
                  </h3>
                  <div className="text-sm font-semibold text-[#81777A] mt-0.5">
                    {selectedRole.org}
                  </div>
                </div>

                <span
                  className={`mono text-[10px] px-2.5 py-1 rounded-full font-bold uppercase shrink-0 ${
                    selectedRole.status === 'active'
                      ? 'bg-[#12A150]/10 text-[#12A150] border border-[#12A150]/30'
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                >
                  {selectedRole.status}
                </span>
              </div>

              {/* Meta details */}
              <div className="grid grid-cols-2 gap-3 mono text-xs">
                <div className="p-3 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA]">
                  <div className="text-[10px] text-[#81777A] uppercase">Duration</div>
                  <div className="font-bold text-[#171416] mt-0.5">{selectedRole.startDate} – {selectedRole.endDate}</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#F8F5F1] border border-[#E5DDDA]">
                  <div className="text-[10px] text-[#81777A] uppercase">Type</div>
                  <div className="font-bold text-[#171416] mt-0.5">{selectedRole.type}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="mono text-xs uppercase font-bold text-[#171416] mb-1.5">Factual Scope &amp; Responsibilities</h4>
                <p className="text-xs sm:text-sm text-[#81777A] leading-relaxed">
                  {selectedRole.description}
                </p>
              </div>

              {/* Recognition */}
              {selectedRole.recognition && (
                <div className="p-3.5 rounded-2xl bg-[#FDF6F6] border border-[#F2D2D4] space-y-1">
                  <div className="mono text-[10px] uppercase font-bold text-[#D9363E] flex items-center gap-1.5">
                    <Award size={12} /> Official Recognition
                  </div>
                  <p className="text-xs text-[#711C27] font-medium leading-snug">
                    {selectedRole.recognition}
                  </p>
                </div>
              )}

              {/* Verification & Proof Type */}
              <div className="pt-2 flex items-center justify-between text-xs mono border-t border-[#E5DDDA]">
                <span className="text-[#81777A] flex items-center gap-1">
                  <ShieldCheck size={14} className="text-[#12A150]" />
                  <span>{selectedRole.proofType || 'Official Letter / Credential'}</span>
                </span>
                <span className="text-[#D9363E] font-bold">100% VERIFIED</span>
              </div>
            </div>
          </div>
        )}

        {/* View Mode: TIMELINE VIEW */}
        {viewMode === 'timeline' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDDA] shadow-[0_8px_30px_rgba(23,20,22,0.04)] space-y-6">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2 mono text-xs pb-4 border-b border-[#E5DDDA]">
              {['all', 'active', 'ambassador', 'leadership'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    labAudio.playClick(900);
                    setFilterCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-full font-bold uppercase transition-all cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-[#D9363E] text-white shadow-xs'
                      : 'bg-[#F8F5F1] text-[#171416] hover:bg-[#F1ECE8]'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="ml-auto text-[#81777A] text-[11px]">
                Showing {filteredExperiences.length} verified community programs
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
                  className="p-4 sm:p-5 rounded-2xl border border-[#E5DDDA] hover:border-[#D9363E]/60 bg-white hover:bg-[#FDF6F6]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-[#171416]">{exp.role}</span>
                      <span className="text-xs text-[#81777A]">· {exp.org}</span>
                    </div>
                    <p className="text-xs text-[#81777A] line-clamp-1">{exp.description}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 mono text-xs">
                    <span className="text-[#81777A]">{exp.startDate} – {exp.endDate}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        exp.status === 'active'
                          ? 'bg-[#12A150]/10 text-[#12A150]'
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
    </section>
  );
}
