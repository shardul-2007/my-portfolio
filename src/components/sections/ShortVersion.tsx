'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ShortVersion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 40%'],
  });

  // Words breakdown for progressive scroll highlighting (Shardul Identity)
  const words = [
    { text: 'they', type: 'normal' },
    { text: 'said', type: 'normal' },
    { text: 'pick', type: 'normal' },
    { text: 'one:', type: 'normal' },
    { text: 'creative', type: 'normal' },
    { text: 'vision', type: 'italic-red' },
    { text: 'or', type: 'normal' },
    { text: 'deep engineering fundamentals', type: 'red-box' },
    { text: '.', type: 'normal' },
    { text: 'i', type: 'normal' },
    { text: 'kept', type: 'normal' },
    { text: 'both,', type: 'normal' },
    { text: 'merged', type: 'normal' },
    { text: 'them', type: 'normal' },
    { text: 'with', type: 'normal' },
    { text: 'zero', type: 'normal' },
    { text: 'conflicts,', type: 'normal' },
    { text: 'and', type: 'normal' },
    { text: 'shipped', type: 'normal' },
    { text: 'with', type: 'normal' },
    { text: 'purpose.', type: 'italic-red' },
  ];

  return (
    <section
      ref={containerRef}
      className="py-32 relative border-b border-[#E5DDDA] overflow-hidden bg-[#F8F5F1] tech-grid"
    >
      <div className="section-container max-w-5xl relative z-10">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#D9363E]" />
          <span className="mono text-xs font-bold uppercase tracking-[0.16em] text-[#D9363E]">
            THE SHORT VERSION
          </span>
        </div>

        {/* Scroll-Driven Highlighted Typography */}
        <div className="relative">
          <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] select-none text-[#171416]">
            {words.map((item, idx) => {
              const start = idx / words.length;
              const end = (idx + 1) / words.length;

              return (
                <WordSpan
                  key={idx}
                  word={item}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </p>

          {/* Git Diff Pill (Image 4 Parity) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 mono text-xs px-3 py-1.5 rounded-full border border-[#E5DDDA] bg-white text-[#81777A] shadow-sm mt-8"
          >
            <span className="text-[#12a150] font-bold">+2</span>
            <span className="text-[#D9363E] font-bold">-0</span>
            <span className="text-[10px] ml-1 opacity-70">git merge clean · Shardul.Lab</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WordSpan({
  word,
  progress,
  range,
}: {
  word: { text: string; type: string };
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const color = useTransform(progress, range, ['#81777A', '#171416']);

  if (word.type === 'italic-red') {
    return (
      <motion.span
        style={{ opacity }}
        className="font-serif-italic text-[#D9363E] font-normal inline-block mx-1.5 transition-colors"
      >
        {word.text}{' '}
      </motion.span>
    );
  }

  if (word.type === 'red-box') {
    return (
      <motion.span
        style={{ opacity }}
        className="inline-block mx-1.5"
      >
        <span className="marker-red font-bold">
          {word.text}
        </span>{' '}
      </motion.span>
    );
  }

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-2.5 transition-colors"
    >
      {word.text}
    </motion.span>
  );
}
