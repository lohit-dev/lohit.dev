'use client';

import { useEffect, useRef } from 'react';
import { experience } from '@/data/content';
import { approaching, hole, leaving } from '@/lib/void';

type Props = { feature: typeof experience.feature; earlier: typeof experience.earlier };

/**
 * Phones: a black dot travels down the rail as you scroll, drawing the line behind it. Each stop
 * fades up as the dot reaches it. Everything is tied to the scroll position, so it keeps pace
 * however fast or slow you go. With reduced motion, or on a wide screen, nothing is hidden.
 */
export default function JourneyRail({ feature, earlier }: Props) {
  const list = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const walker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const small = window.matchMedia('(max-width: 700px)');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = Array.from(ol.querySelectorAll<HTMLElement>('.j-item'));
    let cur = 0;
    let target = 0;
    let raf = 0;

    const aim = () => {
      if (!small.matches) return;
      const r = ol.getBoundingClientRect();
      const last = items[items.length - 1];
      target = Math.min(last.offsetTop + 110, Math.max(0, window.innerHeight * 0.62 - r.top));
    };
    const paint = () => {
      raf = 0;
      if (!small.matches) return;
      cur += (target - cur) * 0.14;
      if (Math.abs(target - cur) < 0.4) cur = target;
      if (fill.current) fill.current.style.height = `${(cur + 2).toFixed(1)}px`;
      if (walker.current) walker.current.style.transform = `translateY(${cur.toFixed(1)}px)`;
      items.forEach((el) => {
        const y = el.offsetTop;
        const t = Math.min(1, Math.max(0, (cur - y + 24) / 120));
        const rect = el.getBoundingClientRect();
        const h = hole(leaving(rect, window.innerHeight), approaching(rect, window.innerHeight));
        el.style.opacity = ((0.12 + 0.88 * t) * h.opacity).toFixed(3);
        el.style.transform = `translateY(${((1 - t) * 16 + h.y).toFixed(1)}px)`;
        el.classList.toggle('past', cur >= y);
      });
      if (cur !== target) raf = requestAnimationFrame(paint);
    };
    const kick = () => {
      aim();
      if (!raf) raf = requestAnimationFrame(paint);
    };

    ol.classList.add('armed');
    aim();
    cur = target;
    paint();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      cancelAnimationFrame(raf);
      ol.classList.remove('armed');
      items.forEach((el) => {
        el.style.opacity = '';
        el.style.transform = '';
        el.classList.remove('past');
      });
    };
  }, []);

  return (
    <div className="journey m-only" ref={list}>
      <span className="j-fill" ref={fill} aria-hidden="true" />
      <span className="j-walker" ref={walker} aria-hidden="true" />
      <ol className="j-list">
        <li className="j-item j-now">
          <p className="j-meta">
            <span>{feature.when}</span>
            <span className="j-dur">{feature.duration}</span>
          </p>
          <h3 className="j-title">{feature.company}</h3>
          <p className="j-role">{feature.role}</p>
          <p className="j-text">{feature.text}</p>
        </li>
        {earlier.map((job) => (
          <li className="j-item" key={job.company}>
            <p className="j-meta">
              <span>{job.when}</span>
            </p>
            <h3 className="j-name">{job.company}</h3>
            <p className="j-role">{job.role}</p>
            {job.note ? <p className="j-note">{job.note}</p> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
