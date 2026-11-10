'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Users, Award, ChevronRight } from 'lucide-react';
import { labAudio } from '@/lib/audio';

const STAGES = [
  { id: 'contributions', num: '01', label: 'CONTRIBUTIONS', sub: 'Open Source', icon: GitBranch },
  { id: 'engagements',   num: '02', label: 'ENGAGEMENTS',   sub: 'Community',   icon: Users },
  { id: 'credentials',   num: '03', label: 'RECOGNITION',   sub: 'Milestones',  icon: Award },
];

export default function ThreeStageJourneyNav() {
  const [activeStage, setActiveStage] = useState<'contributions' | 'engagements' | 'credentials'>('contributions');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contributionsEl = document.getElementById('contributions');
      const engagementsEl = document.getElementById('engagements');
      const credentialsEl = document.getElementById('credentials');

      if (!contributionsEl || !credentialsEl) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const contributionsTop = contributionsEl.offsetTop - windowHeight * 0.4;
      const credentialsBottom = credentialsEl.offsetTop + credentialsEl.offsetHeight - windowHeight * 0.2;

      // Only visible when in the 3-section stretch
      if (scrollY >= contributionsTop && scrollY <= credentialsBottom) {
        setIsVisible(true);

        const currentPos = scrollY + windowHeight * 0.5;
        if (credentialsEl && currentPos >= credentialsEl.offsetTop) {
          setActiveStage('credentials');
        } else if (engagementsEl && currentPos >= engagementsEl.offsetTop) {
          setActiveStage('engagements');
        } else {
          setActiveStage('contributions');
        }
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStage = (id: string) => {
    labAudio.playClick(950);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, y: 30, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: 30, x: '-50%' }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        aria-label="3-Stage Living Canvas Journey"
        className="fixed bottom-6 left-1/2 z-40 bg-[#171416]/90 backdrop-blur-md text-white border border-white/15 px-3 py-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center gap-2 mono text-xs select-none max-w-[95vw] overflow-x-auto"
      >
        <span className="hidden sm:inline text-[9px] uppercase tracking-wider text-[#D9363E] font-bold px-2 border-r border-white/10">
          JOURNEY
        </span>

        <div className="flex items-center gap-1.5">
          {STAGES.map((stage, idx) => {
            const isActive = activeStage === stage.id;
            const Icon = stage.icon;
            return (
              <div key={stage.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => scrollToStage(stage.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#D9363E] text-white font-bold shadow-[0_4px_16px_rgba(217,54,62,0.4)]'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={12} className={isActive ? 'text-white' : 'text-white/60'} />
                  <span className="text-[10px] sm:text-xs">
                    {stage.num} · {stage.label}
                  </span>
                </button>

                {idx < STAGES.length - 1 && (
                  <ChevronRight size={12} className="text-white/20 mx-0.5 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
