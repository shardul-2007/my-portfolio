// ═══════════════════════════════════════════════════════════════
// SHARDUL.LAB — Consolidated Portfolio Data Single-Source-Of-Truth
// ═══════════════════════════════════════════════════════════════

export * from './profile';
export * from './skills';
export * from './projects';
export * from './experience';
export * from './achievements';
export * from './navigation';

import { PROFILE } from './profile';
import { PROJECTS, ProjectItem } from './projects';
import { SKILLS, SkillItem } from './skills';
import { EXPERIENCES, ExperienceItem } from './experience';
import { ACHIEVEMENTS, AchievementItem } from './achievements';

// Backwards-compatible aliases for existing components
export const PERSONAL = {
  name: PROFILE.name,
  shortName: PROFILE.brand,
  role: PROFILE.role,
  subtitle: 'SOFTWARE ENGINEER / BUILDER',
  bio: PROFILE.bio,
  location: PROFILE.location,
  locationShort: PROFILE.locationShort,
  email: PROFILE.email,
  github: PROFILE.github,
  githubUser: PROFILE.githubUser,
  linkedin: PROFILE.linkedin,
  portfolio: PROFILE.portfolio,
  status: 'AVAILABLE',
  focus: PROFILE.focus,
  headline: PROFILE.headline,
  buildVersion: '2026.11',
  resumeUrl: PROFILE.linkedin,
};

export type Project = ProjectItem;
export type Skill = SkillItem;
export type Experience = ExperienceItem;
export type Achievement = AchievementItem;

export { PROJECTS, SKILLS };
export const EXPERIENCE = EXPERIENCES;
export const ACHIEVEMENTS_DATA = ACHIEVEMENTS;

export const ABOUT_PANELS = PROFILE.identityPillars;
export const CONTACT_CHANNELS = [
  { id: 'email',    label: 'EMAIL',    value: PROFILE.email,                   href: `mailto:${PROFILE.email}`, icon: 'Mail' },
  { id: 'linkedin', label: 'LINKEDIN', value: '/in/shardul-parihar/',          href: PROFILE.linkedin,          icon: 'Linkedin' },
  { id: 'github',   label: 'GITHUB',   value: `github.com/${PROFILE.githubUser}`, href: PROFILE.github,         icon: 'Github' },
];
