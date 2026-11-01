'use client';

import { Fragment, useEffect, useRef, type CSSProperties } from 'react';
import { facts, hero } from '@/data/content';

const segments = [
  { className: 's1', text: hero.lead, base: 1 },
  { className: 's2', text: hero.tail, base: 0 },
];

/**
 * The opening statement. Two quiet effects, neither of which moves the layout
 * or covers anything:
 *  - hover: words near the pointer light up, the rest settle back
 *  - scroll: the words fade out one after another as you scroll past
 * Both are skipped when the visitor prefers reduced motion, and the hover
 * effect is skipped on touch screens.
 */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const area = heroRef.current;
    const intro = introRef.current;
    if (!area || !intro) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const words = Array.from(intro.querySelectorAll<HTMLElement>('.w'));
    const bases = words.map((w) => Number(w.dataset.base ?? 0));

    let hovering = false;
    let mx = 0;
    let my = 0;
    let pointerQueued = false;
    let scrollQueued = false;

    const radius = () => Math.max(170, Math.min(300, area.clientWidth * 0.36));

    const paintPointer = () => {
      pointerQueued = false;
      if (!hovering) return;
      const reach = radius();
      words.forEach((el, i) => {
        const b = el.getBoundingClientRect();
        const d = Math.hypot(mx - (b.left + b.width / 2), (my - (b.top + b.height / 2)) * 1.3);
        let t = Math.max(0, 1 - d / reach);
        t = t * t * (3 - 2 * t);
        const floor = bases[i] ? 0.4 : 0;
        el.style.setProperty('--l', (floor + (1 - floor) * t).toFixed(3));
      });
    };
    const queuePointer = () => {
      if (!pointerQueued) {
        pointerQueued = true;
        requestAnimationFrame(paintPointer);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      hovering = true;
      mx = e.clientX;
      my = e.clientY;
      queuePointer();
    };
    const onLeave = () => {
      hovering = false;
      words.forEach((el) => el.style.removeProperty('--l'));
    };

    const paintScroll = () => {
      scrollQueued = false;
      const h = area.offsetHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / h));
      intro.style.transform = p ? `translateY(${(-p * 18).toFixed(1)}px)` : '';
      const n = words.length || 1;
      words.forEach((el, i) => {
        const start = (i / n) * 0.45;
        const local = Math.min(1, Math.max(0, (p - start) / 0.55));
        el.style.opacity = local ? (1 - 0.7 * local).toFixed(3) : '';
      });
      if (hovering) queuePointer();
    };
    const onScroll = () => {
      if (!scrollQueued) {
        scrollQueued = true;
        requestAnimationFrame(paintScroll);
      }
    };

    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    paintScroll();

    return () => {
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      intro.style.transform = '';
      words.forEach((el) => {
        el.style.removeProperty('--l');
        el.style.opacity = '';
      });
    };
  }, []);

  let index = 0;
  return (
    <div className="home">
      <div className="hero" id="hero" ref={heroRef}>
        <p className="kicker m-only" aria-hidden="true">
          Portfolio, 2026
        </p>
        <h1 className="intro" ref={introRef} aria-label={`${hero.lead} ${hero.tail}`}>
          {segments.map((seg, si) => {
            const words = seg.text.split(' ');
            return (
              <Fragment key={seg.className}>
                <span className={seg.className} aria-hidden="true">
                  {words.map((word, i) => (
                    <Fragment key={i}>
                      <span
                        className="w"
                        data-base={seg.base}
                        style={{ '--i': index++ } as CSSProperties}
                      >
                        {word}
                      </span>
                      {i < words.length - 1 ? ' ' : null}
                    </Fragment>
                  ))}
                </span>
                {si < segments.length - 1 ? ' ' : null}
              </Fragment>
            );
          })}
        </h1>
      </div>
      <dl className="facts m-only">
        {facts.map((f, i) => (
          <div className="fact" key={f.label} style={{ '--fi': i } as CSSProperties}>
            <dt>{f.label}</dt>
            <dd>{f.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
