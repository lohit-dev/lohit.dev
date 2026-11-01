'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { projects } from '@/data/content';

const k = (n: number) => ({ '--k': n }) as CSSProperties;

/** Project picker: hover, focus, tap or use the arrow keys to switch projects. */
export default function Work() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stick = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const run = useRef(0);
  const seen = useRef(false);

  /* The TravelID hash scrambles and settles when that project opens. Only the text moves. */
  const settle = useCallback(() => {
    run.current++;
    const el = document.querySelector<HTMLElement>('.d-hash');
    const lines = el?.dataset.lines;
    if (el && lines) el.innerHTML = lines.split('|').join('<br>');
  }, []);
  const scramble = useCallback(() => {
    const el = document.querySelector<HTMLElement>('.d-hash');
    const lines = el?.dataset.lines?.split('|');
    if (!el || !lines) return;
    const id = ++run.current;
    const hex = '0123456789abcdef';
    let t0: number | null = null;
    const frame = (ts: number) => {
      if (id !== run.current) return;
      if (t0 === null) t0 = ts;
      const p = Math.min(1, (ts - t0) / 900);
      if (p >= 1) {
        el.innerHTML = lines.join('<br>');
        return;
      }
      el.innerHTML = lines
        .map((line, li) => {
          let out = '';
          for (let j = 0; j < line.length; j++) {
            const at = 0.15 + (j / line.length) * 0.7 + li * 0.03;
            out += p >= at ? line.charAt(j) : hex.charAt(Math.floor(Math.random() * 16));
          }
          return out;
        })
        .join('<br>');
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, []);

  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (active === 0) scramble();
    else settle();
  }, [active, scramble, settle]);

  /* Also play it once when the section first scrolls into view. */
  useEffect(() => {
    const el = section.current;
    if (!el || seen.current || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || seen.current) return;
        seen.current = true;
        io.disconnect();
        scramble();
      },
      { threshold: 0.25, rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      run.current++;
    };
  }, [scramble]);

  /* On phones the section pins to the screen and scrolling steps through the projects.
     Each project gets 40% of a screen of scrolling; the last one is released after a short hold. */
  const pinned = () => window.matchMedia('(max-width: 700px)').matches;
  const STICK_TOP = 52;
  const STEP = 0.4;
  const HOLD = 0.16;
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    let queued = false;
    let setH = '';
    const n = projects.length;
    const update = () => {
      queued = false;
      if (!pinned()) {
        if (setH) t.style.height = '';
        setH = '';
        return;
      }
      const vh = window.innerHeight;
      const h = `${Math.round((stick.current?.offsetHeight ?? 0) + (n - 1) * STEP * vh + HOLD * vh)}px`;
      if (h !== setH) {
        t.style.height = h;
        setH = h;
      }
      const scrolled = STICK_TOP - t.getBoundingClientRect().top;
      setActive(Math.min(n - 1, Math.max(0, Math.floor(scrolled / (STEP * vh)))));
      if (bar.current)
        bar.current.style.transform = `scaleX(${Math.min(1, Math.max(0, scrolled / ((n - 1) * STEP * vh))).toFixed(3)})`;
    };
    const on = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      t.style.height = '';
    };
  }, []);

  const select = (i: number, focus = false) => {
    const t = track.current;
    if (pinned() && t) {
      const vh = window.innerHeight;
      const top =
        t.getBoundingClientRect().top + window.scrollY - STICK_TOP + i * STEP * vh + 0.15 * vh;
      window.scrollTo({ top, behavior: 'smooth' });
      if (focus) tabs.current[i]?.focus({ preventScroll: true });
      return;
    }
    setActive(i);
    if (focus) tabs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = projects.length;
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % n;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    if (next !== null) {
      e.preventDefault();
      select(next, true);
    }
  };

  const onEnter = (i: number) => {
    if (window.matchMedia('(hover: hover)').matches) select(i);
  };

  return (
    <section className="sec" id="work" ref={section}>
      <h2>Work</h2>
      <div className="work-track" ref={track} style={{ '--n': projects.length } as CSSProperties}>
        <div className="work-stick" ref={stick}>
          <div className="wprog m-only" aria-hidden="true">
            <i ref={bar} />
          </div>
          <div className="work">
            <div className="wlist" role="tablist" aria-label="Projects" aria-orientation="vertical">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  className="wtab"
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-controls={`panel-${p.id}`}
                  aria-selected={active === i}
                  tabIndex={active === i ? 0 : -1}
                  type="button"
                  onClick={() => select(i)}
                  onMouseEnter={() => onEnter(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  <span className="wtab-title">{p.title}</span>
                  <span className="wtab-kind">{p.kind}</span>
                </button>
              ))}
            </div>

            <div className="wpanels">
              {projects.map((p, i) => (
                <article
                  key={p.id}
                  className={active === i ? 'wpanel is-on' : 'wpanel'}
                  role="tabpanel"
                  id={`panel-${p.id}`}
                  aria-labelledby={`tab-${p.id}`}
                  aria-hidden={active !== i}
                >
                  {p.lead ? (
                    <p className="d-lead" style={k(0)}>
                      {p.lead}
                    </p>
                  ) : null}
                  <p className="d-text" style={k(p.lead ? 1 : 0)}>
                    {p.text}
                  </p>
                  <p className="d-stack" style={k(p.lead ? 2 : 1)}>
                    {p.stack}
                  </p>
                  {p.links.length > 0 ? (
                    <p className="d-links" style={k(p.lead ? 3 : 2)}>
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          className="link"
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {l.label}
                        </a>
                      ))}
                    </p>
                  ) : null}
                  {p.hash ? (
                    <p
                      className="d-hash"
                      aria-hidden="true"
                      data-lines={p.hash.join('|')}
                      style={k(p.links.length > 0 ? (p.lead ? 4 : 3) : p.lead ? 3 : 2)}
                    >
                      {p.hash.map((line, k) => (
                        <span key={line}>
                          {k > 0 ? <br /> : null}
                          {line}
                        </span>
                      ))}
                    </p>
                  ) : null}
                  {p.glyph ? (
                    <p className="d-glyph" aria-hidden="true" style={k(p.links.length > 0 ? 3 : 2)}>
                      {p.glyph}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
