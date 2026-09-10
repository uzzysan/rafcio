"use client";

import { useEffect, useRef } from 'react';

export function CursorAtmosphere() {
  const auraRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;
    let frame: number | null = null;
    let x = window.innerWidth * 0.5;
    let y = window.innerHeight * 0.25;
    const paint = () => {
      auraRef.current?.style.setProperty('--cursor-x', x + 'px');
      auraRef.current?.style.setProperty('--cursor-y', y + 'px');
      frame = null;
    };
    const onPointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (frame === null) frame = window.requestAnimationFrame(paint);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);
  return <div className="site-atmosphere" aria-hidden="true"><div ref={auraRef} className="cursor-aura" /></div>;
}
