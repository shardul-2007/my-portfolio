'use client';

interface TornPaperEdgeProps {
  className?: string;
  height?: number | string;
  crimsonAccent?: boolean;
}

/**
 * High-craft organic torn-paper deckle edge.
 * Features irregular micro-jags, fine paper fibers, and layered depth shadow.
 */
export default function TornPaperEdge({
  className = '',
  height = '100%',
  crimsonAccent = true,
}: TornPaperEdgeProps) {
  return (
    <div
      className={`relative h-full pointer-events-none select-none flex items-stretch ${className}`}
      style={{ height }}
    >
      <svg
        viewBox="0 0 24 800"
        preserveAspectRatio="none"
        className="h-full w-6 overflow-visible"
      >
        <defs>
          {/* Paper fiber texture filter */}
          <filter id="tornPaperRoughness" x="-20%" y="0%" width="140%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.95" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Soft paper drop shadow */}
          <filter id="paperShadow" x="-50%" y="-10%" width="200%" height="120%">
            <feDropShadow dx="3" dy="0" stdDeviation="4" floodColor="#171416" floodOpacity="0.22" />
            {crimsonAccent && (
              <feDropShadow dx="-1" dy="0" stdDeviation="3" floodColor="#D9363E" floodOpacity="0.35" />
            )}
          </filter>
        </defs>

        {/* Shadow Underlay */}
        <path
          d="M 12 0 
             Q 10 50 14 100 
             Q 9 150 13 200 
             Q 11 250 15 300 
             Q 10 350 14 400 
             Q 8 450 13 500 
             Q 11 550 15 600 
             Q 9 650 14 700 
             Q 12 750 13 800
             L 20 800 L 20 0 Z"
          fill="rgba(23,20,22,0.14)"
          filter="blur(3px)"
        />

        {/* The Torn Paper White Deckle Edge with Fine Paper Roughness */}
        <path
          d="M 10 0 
             L 12 30 L 9 65 L 13 110 L 10 155 L 14 200 L 9 245 L 13 290 L 10 335 L 14 380 
             L 9 425 L 13 470 L 10 515 L 14 560 L 9 605 L 13 650 L 10 695 L 14 740 L 11 775 L 12 800
             L 0 800 L 0 0 Z"
          fill="#FFFFFF"
          filter="url(#paperShadow)"
        />

        {/* Micro Paper Fibers (Jagged Rip Seam) */}
        <path
          d="M 10 0 
             L 12 30 L 9 65 L 13 110 L 10 155 L 14 200 L 9 245 L 13 290 L 10 335 L 14 380 
             L 9 425 L 13 470 L 10 515 L 14 560 L 9 605 L 13 650 L 10 695 L 14 740 L 11 775 L 12 800"
          stroke="#F1ECE8"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Subtle Crimson Laser Backlight Thread */}
        {crimsonAccent && (
          <path
            d="M 11 0 
               L 12.5 30 L 9.5 65 L 13.5 110 L 10.5 155 L 14.5 200 L 9.5 245 L 13.5 290 L 10.5 335 L 14.5 380 
               L 9.5 425 L 13.5 470 L 10.5 515 L 14.5 560 L 9.5 605 L 13.5 650 L 10.5 695 L 14.5 740 L 11.5 775 L 12.5 800"
            stroke="#D9363E"
            strokeWidth="0.8"
            strokeOpacity="0.75"
            fill="none"
          />
        )}
      </svg>
    </div>
  );
}
