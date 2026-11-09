import type { Metadata } from 'next';
import './globals.css';
import { PROFILE } from '@/data/profile';

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.brand} | Interactive Engineering Universe`,
  description: `${PROFILE.bio} Builder of CivicOS, AssemblyOS, SkillCert, and SHARDUL.LAB. 17 Programs, 16 Achievements, 23 Skills.`,
  keywords: [
    'Shardul Parihar',
    'SHARDUL.LAB',
    'Software Engineer',
    'Full Stack Engineer',
    'CivicOS',
    'AssemblyOS',
    'SkillCert',
    'AI Engineer',
    'React Three Fiber',
    'Next.js 14',
    'Pune India Developer',
    'Google Student Ambassador',
    'HackerRank Campus Crew',
  ],
  authors: [{ name: PROFILE.name }],
  creator: PROFILE.name,
  openGraph: {
    title: `${PROFILE.brand} — An Interactive Engineering Universe by ${PROFILE.name}`,
    description: 'Explore the interactive software engineering universe of Shardul Parihar. CivicOS, AssemblyOS, SkillCert, live developer terminal, and engineering laboratory.',
    url: PROFILE.portfolio,
    siteName: PROFILE.brand,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.brand} — ${PROFILE.name}`,
    description: 'Interactive engineering universe, production platforms, and verified credentials.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: PROFILE.name,
              alternateName: PROFILE.brand,
              url: PROFILE.portfolio,
              sameAs: [
                PROFILE.github,
                PROFILE.linkedin,
              ],
              jobTitle: 'Software Engineer',
              description: PROFILE.bio,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Pune',
                addressRegion: 'Maharashtra',
                addressCountry: 'India',
              },
            }),
          }}
        />
      </head>
      <body className="antialiased engineering-grid min-h-screen">
        {children}
      </body>
    </html>
  );
}
