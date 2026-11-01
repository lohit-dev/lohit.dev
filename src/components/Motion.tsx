'use client';

import { useEffect } from 'react';

/**
 * Entrances for everything below the hero. Each piece rises, wipes in, draws its
 * rules or lights up as it scrolls into view, including whatever is already on
 * screen at load. Amounts count up once.
 *
 * Safety rules, so motion can never hide content:
 *  - the `fx` switch on <html> is only turned on after setup has succeeded;
 *  - nothing runs for visitors who prefer reduced motion, or without IntersectionObserver;
 *  - anything above the first screen is left alone;
 *  - helper classes are removed once an entrance has played.
 */

// [selector, classes, base delay (ms), delay step between siblings (ms)]
const GROUPS: Array<[string, string, number, number]> = [
  ['.sec > h2', 'rz', 0, 0],
  ['.wtab', 'rz', 0, 70],
  ['.wpanels', 'rz', 150, 0],
  ['.feature > *:not(.feature-title)', 'rz', 0, 80],
  ['.feature-title', 'wp', 60, 0],
  ['.trio > div', 'rz dl', 0, 130],
  ['.core .cw', 'rz', 0, 90],
  ['.stack-text', 'rz', 250, 0],
  ['.t', 'lt', 250, 30],
  ['.lrow', 'rz dl', 0, 110],
  ['.c-lede', 'rz', 0, 0],
  ['.mail-big', 'wp', 100, 0],
  ['.c-row', 'rz', 300, 0],
  ['.spoken', 'rz', 420, 0],
  ['.wprog', 'rz', 0, 80],
  ['.foot', 'rz', 0, 0],
];

type Fx = { cls: string[]; wait: number };
/** What is already on screen at load waits for the opening statement to land first. */
const AFTER_HERO = 1000;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function countUp(el: HTMLElement) {
  const m = (el.textContent ?? '').trim().match(/^([^\d]*)([\d,]+)(\D*)$/);
  if (!m) return;
  const end = parseInt(m[2].replace(/,/g, ''), 10);
  const [pre, suf, finalText] = [m[1], m[3], el.textContent ?? ''];
  let t0: number | null = null;
  el.style.minWidth = `${el.offsetWidth}px`;
  el.classList.add('is-counting');
  const frame = (ts: number) => {
    if (t0 === null) t0 = ts;
    const p = Math.min(1, (ts - t0) / 1100);
    if (p >= 1) {
      el.textContent = finalText;
      el.classList.remove('is-counting');
      return;
    }
    const n = Math.round(end * easeOut(p));
    el.textContent =
      pre + n.toLocaleString('en-US') + (n === 1 ? suf.replace('months', 'month') : suf);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

export default function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const timers: number[] = [];
    const marked: Array<HTMLElement & { _fx?: Fx }> = [];
    const wrapped: HTMLElement[] = [];
    let reveal: IntersectionObserver | undefined;
    let seen: IntersectionObserver | undefined;
    const root = document.documentElement;

    const unmark = (el: HTMLElement & { _fx?: Fx }) => {
      el._fx?.cls.concat('in').forEach((c) => el.classList.remove(c));
      el.style.removeProperty('--d');
    };

    try {
      const fold = window.innerHeight * 0.92;
      GROUPS.forEach(([selector, classes, base, step]) => {
        document
          .querySelectorAll<HTMLElement>(selector)
          .forEach((el: HTMLElement & { _fx?: Fx }, i) => {
            const r = el.getBoundingClientRect();
            if (r.bottom < 0) return;
            const delay = base + i * step + (r.top < fold ? AFTER_HERO : 0);
            const cls = classes.split(' ');
            if (cls[0] === 'wp') {
              // The wipe clips an inner wrapper: an element clipped to nothing never counts as on screen.
              const wi = document.createElement('span');
              wi.className = 'wi';
              while (el.firstChild) wi.appendChild(el.firstChild);
              el.appendChild(wi);
              wrapped.push(el);
            }
            cls.forEach((c) => el.classList.add(c));
            el.style.setProperty('--d', `${delay}ms`);
            el._fx = { cls, wait: delay };
            marked.push(el);
          });
      });

      if (marked.length) {
        reveal = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (!en.isIntersecting) return;
              const el = en.target as HTMLElement & { _fx?: Fx };
              reveal?.unobserve(el);
              el.classList.add('in');
              timers.push(window.setTimeout(() => unmark(el), (el._fx?.wait ?? 0) + 1500));
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
        );
        marked.forEach((el) => reveal?.observe(el));
        root.classList.add('fx');
      }
      root.classList.remove('pre');

      seen = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            seen?.unobserve(en.target);
            countUp(en.target as HTMLElement);
          });
        },
        { threshold: 0.25, rootMargin: '0px 0px -12% 0px' },
      );
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => seen?.observe(el));
    } catch {
      root.classList.remove('fx');
      root.classList.remove('pre');
    }

    return () => {
      reveal?.disconnect();
      seen?.disconnect();
      timers.forEach((t) => clearTimeout(t));
      root.classList.remove('fx');
      marked.forEach(unmark);
      wrapped.forEach((el) => {
        const wi = el.querySelector(':scope > .wi');
        if (!wi) return;
        while (wi.firstChild) el.insertBefore(wi.firstChild, wi);
        wi.remove();
      });
    };
  }, []);

  return null;
}
