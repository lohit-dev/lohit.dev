'use client';

import { useEffect } from 'react';
import { approaching, hole, leaving } from '@/lib/void';

/**
 * The black hole. As a piece leaves through the top or the bottom of the screen it drifts away and fades,
 * and it comes back the same way when you scroll the other direction, like the opening statement does.
 * It follows the scroll position itself (not a timer), so it keeps pace however fast or slow you scroll.
 * Skipped for reduced motion.
 */
const SMALL = [
  '.sg',
  '.aw-card',
  '.aw-rows li',
  '.mc-head',
  '.mc-art',
  '.mc-rows .fact',
  '.sec:not(#work) > h2',
  '.core',
  '.kicker',
  '.home .facts .fact',
  '.work-stick',
].join(',');
const WIDE = [
  '.sec > h2',
  '.work',
  '.feature',
  '.trio > div',
  '.core',
  '.stack-text',
  '.lrow',
  '.c-lede',
  '.mail-big',
  '.c-row',
  '.spoken',
].join(',');

export default function Scrub() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const small = window.matchMedia('(max-width: 700px)');
    const smallEls = Array.from(document.querySelectorAll<HTMLElement>(SMALL));
    const wideEls = Array.from(document.querySelectorAll<HTMLElement>(WIDE));
    let queued = false;
    const reset = (el: HTMLElement) => {
      el.style.opacity = '';
      el.style.transform = '';
    };
    const apply = (el: HTMLElement, vh: number) => {
      if (el.classList.contains('rz')) return; // its entrance is still on its way
      const r = el.getBoundingClientRect();
      const x = leaving(r, vh);
      const b = approaching(r, vh);
      if (x === 0 && b === 0) return reset(el);
      const h = hole(x, b);
      el.style.opacity = h.opacity.toFixed(3);
      el.style.transform = `translateY(${h.y.toFixed(1)}px)`;
    };
    const paint = () => {
      queued = false;
      const vh = window.innerHeight;
      const on = small.matches ? smallEls : wideEls;
      const off = small.matches ? wideEls : smallEls;
      off.forEach((el) => {
        if (!on.includes(el)) reset(el);
      });
      on.forEach((el) => apply(el, vh));
    };
    const queue = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    };
    paint();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      [...smallEls, ...wideEls].forEach(reset);
    };
  }, []);
  return null;
}
