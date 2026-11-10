'use client';
import { useState, useEffect } from 'react';
import CustomCursor from '@/components/ui/CustomCursor';
import SystemBoot from '@/components/ui/SystemBoot';
import CommandPalette from '@/components/ui/CommandPalette';
import RecruiterModeModal from '@/components/ui/RecruiterModeModal';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Sections
import Hero from '@/components/sections/Hero';
import Receipts from '@/components/sections/Receipts';
import CommandCenter from '@/components/sections/CommandCenter';
import InsideMind from '@/components/sections/InsideMind';
import About from '@/components/sections/About';
import SkillsConstellation from '@/components/sections/SkillsConstellation';
import Projects from '@/components/sections/Projects';
import ArchitectureExplorer from '@/components/sections/ArchitectureExplorer';
import CaseStudies from '@/components/sections/CaseStudies';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import AchievementsArchive from '@/components/sections/AchievementsArchive';
import DeveloperDesk from '@/components/sections/DeveloperDesk';
import TerminalSection from '@/components/sections/TerminalSection';
import Playground from '@/components/sections/Playground';
import ArcadeSection from '@/components/sections/ArcadeSection';
import GitHubSection from '@/components/sections/GitHubSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'yellow'>('dark');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);

  useEffect(() => {
    // Theme initialization
    const savedTheme = localStorage.getItem('shardul_lab_theme') as 'dark' | 'yellow' | null;
    const initialTheme = savedTheme === 'yellow' ? 'yellow' : 'dark';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);

    // Global Command Palette Key Listener
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'yellow' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('shardul_lab_theme', nextTheme);
  }

  return (
    <>
      {/* Precision Custom Reticle Cursor */}
      <CustomCursor />

      {/* Section 01: Initializing System Boot Sequence */}
      <SystemBoot />

      {/* Global Interactive Overlays */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onToggleTheme={toggleTheme}
        onOpenRecruiter={() => {
          setIsCommandOpen(false);
          setIsRecruiterOpen(true);
        }}
      />

      <RecruiterModeModal
        isOpen={isRecruiterOpen}
        onClose={() => setIsRecruiterOpen(false)}
      />

      {/* Navigation Top Bar */}
      <Navbar
        onOpenCommand={() => setIsCommandOpen(true)}
        onOpenRecruiter={() => setIsRecruiterOpen(true)}
        onToggleTheme={toggleTheme}
        theme={theme}
      />

      {/* Main Connected Engineering Universe */}
      <main className="relative">
        {/* Section 02: Cinematic Hero with REALITY / X-RAY Split */}
        <Hero
          onOpenRecruiter={() => setIsRecruiterOpen(true)}
          onOpenCommand={() => setIsCommandOpen(true)}
        />

        {/* Section 02.5: Receipts & Verified Counters */}
        <Receipts />

        {/* Section 03: Engineering Command Center */}
        <CommandCenter
          onOpenCommand={() => setIsCommandOpen(true)}
          onOpenRecruiter={() => setIsRecruiterOpen(true)}
        />

        {/* Section 04: Inside the Mind of Shardul */}
        <InsideMind />

        {/* Section 05: About Me */}
        <About />

        {/* Section 06: Technology Constellation */}
        <SkillsConstellation />

        {/* Section 07: Featured Engineering Projects */}
        <Projects />

        {/* Section 08: Project Architecture Explorer */}
        <ArchitectureExplorer />

        {/* Section 09: Engineering Case Studies */}
        <CaseStudies />

        {/* Section 10: Experience and Contributions (Git Timeline) */}
        <ExperienceTimeline />

        {/* Section 11: Achievement Archive */}
        <AchievementsArchive />

        {/* Section 12: Developer Desk */}
        <DeveloperDesk
          onOpenRecruiter={() => setIsRecruiterOpen(true)}
        />

        {/* Section 13: Interactive Developer Terminal */}
        <TerminalSection onToggleTheme={toggleTheme} />

        {/* Section 14: Engineering Playground */}
        <Playground />

        {/* Section 15: Arcade & Mini Experiences */}
        <ArcadeSection />

        {/* Section 16: Live GitHub Feed */}
        <GitHubSection />

        {/* Section 18: Contact / Connection Interface */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
