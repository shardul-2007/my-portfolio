'use client';
import { useState, useEffect } from 'react';
import CustomCursor from '@/components/ui/CustomCursor';
import SystemBoot from '@/components/ui/SystemBoot';
import CommandPalette from '@/components/ui/CommandPalette';
import RecruiterModeModal from '@/components/ui/RecruiterModeModal';
import Navbar from '@/components/layout/Navbar';
import FloatingDock from '@/components/layout/FloatingDock';
import Footer from '@/components/layout/Footer';

// Sections
import Hero from '@/components/sections/Hero';
import Receipts from '@/components/sections/Receipts';
import ShortVersion from '@/components/sections/ShortVersion';
import CommandCenter from '@/components/sections/CommandCenter';
import InsideMind from '@/components/sections/InsideMind';
import About from '@/components/sections/About';
import SkillsConstellation from '@/components/sections/SkillsConstellation';
import Projects from '@/components/sections/Projects';
import ArchitectureExplorer from '@/components/sections/ArchitectureExplorer';
import CaseStudies from '@/components/sections/CaseStudies';
import OpenSourceContributions from '@/components/sections/OpenSourceContributions';
import CommunityEngagements from '@/components/sections/CommunityEngagements';
import MilestonesCredentials from '@/components/sections/MilestonesCredentials';
import DeveloperDesk from '@/components/sections/DeveloperDesk';
import TerminalSection from '@/components/sections/TerminalSection';
import Playground from '@/components/sections/Playground';
import ArcadeSection from '@/components/sections/ArcadeSection';
import GitHubSection from '@/components/sections/GitHubSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  const [theme, setTheme] = useState<'paper' | 'dark' | 'yellow'>('paper');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);

  useEffect(() => {
    // Theme initialization matching Image 1 Paper Palette
    const savedTheme = localStorage.getItem('shardul_lab_theme') as 'paper' | 'dark' | 'yellow' | null;
    const initialTheme = savedTheme || 'paper';
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
    const nextTheme = theme === 'paper' ? 'dark' : theme === 'dark' ? 'yellow' : 'paper';
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
        theme={theme === 'paper' ? 'dark' : 'yellow'}
      />

      {/* Floating Bottom Navigation Dock (Images 3, 4, 5, 6, 7, 8 Parity) */}
      <FloatingDock />

      {/* Main Connected Engineering Universe */}
      <main className="relative">
        {/* Section 02: Cinematic Hero with REALITY / X-RAY Split (Images 1, 2, 3) */}
        <Hero
          onOpenRecruiter={() => setIsRecruiterOpen(true)}
          onOpenCommand={() => setIsCommandOpen(true)}
        />

        {/* Section 02.5: Receipts & Verified Counters */}
        <Receipts />

        {/* Section 02.7: The Short Version — Scroll-Driven Highlighting (Image 4) */}
        <ShortVersion />

        {/* Section 03: Engineering Command Center */}
        <CommandCenter
          onOpenCommand={() => setIsCommandOpen(true)}
          onOpenRecruiter={() => setIsRecruiterOpen(true)}
        />

        {/* Section 04: Inside the Mind of Shardul */}
        <InsideMind />

        {/* Section 05: About Me */}
        <About />

        {/* Section 06: The Stack (5-Column Editorial Capabilities) */}
        <SkillsConstellation />

        {/* Section 07: Featured Engineering Projects (Image 5 Stacked Cards) */}
        <Projects />

        {/* Section 08: Project Architecture Explorer */}
        <ArchitectureExplorer />

        {/* Section 09: Engineering Case Studies */}
        <CaseStudies />

        {/* ══════════════════════════════════════════════════════════════
            THE 3 SIGNATURE MAIN ATTRACTION SECTIONS IN EXACT ORDER
            Connected by visual storytelling energy lines
            ══════════════════════════════════════════════════════════════ */}

        {/* Section 01: Open Source Contributions ("Every contribution moves something forward.") */}
        <OpenSourceContributions />

        {/* Section 02: Community Engagements ("Building connections beyond the code.") */}
        <CommunityEngagements />

        {/* Section 03: Recognition — Milestones & Credentials (The Luminous Credential Vault) */}
        <MilestonesCredentials />

        {/* Section 12: Developer Desk (Image 8 Draggable Physical Mat) */}
        <DeveloperDesk
          onOpenRecruiter={() => setIsRecruiterOpen(true)}
        />

        {/* Section 13: Interactive Developer Terminal */}
        <TerminalSection onToggleTheme={toggleTheme} />

        {/* Section 14: Engineering Playground */}
        <Playground />

        {/* Section 15: Arcade & Living Moving Experiences (Image 6) */}
        <ArcadeSection />

        {/* Section 16: Live GitHub Feed */}
        <GitHubSection />

        {/* Section 18: Contact / Connection Interface */}
        <ContactSection />
      </main>

      {/* Unique Footer Transmission with Squashable Bugs & Duck (Image 9) */}
      <Footer />
    </>
  );
}
