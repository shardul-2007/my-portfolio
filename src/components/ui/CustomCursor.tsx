'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on devices that support hover (non-touch desktop)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.dataset.interactive === 'true'
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99999] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0) scale(${clicked ? 0.7 : 1})`,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
      </div>

      {/* Trailing Reticle Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99998] transition-all duration-200 ease-out"
        style={{
          transform: `translate3d(${pos.x - (hovered ? 20 : 14)}px, ${pos.y - (hovered ? 20 : 14)}px, 0) scale(${clicked ? 0.85 : 1})`,
          width: hovered ? 40 : 28,
          height: hovered ? 40 : 28,
          borderRadius: '50%',
          border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border-strong)'}`,
          background: hovered ? 'var(--accent-dim)' : 'transparent',
          boxShadow: hovered ? '0 0 16px var(--accent-dim)' : 'none',
        }}
      />
    </>
  );
}
