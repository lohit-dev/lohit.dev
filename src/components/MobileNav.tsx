'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const items = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Journey' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

/** Small screens only: a floating pill that jumps between sections and shows where you are. */
export default function MobileNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let queued = false;
    const update = () => {
      queued = false;
      const line = window.innerHeight * 0.4;
      let now: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) now = it.id;
      }
      const atEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atEnd) now = items[items.length - 1].id;
      setActive(now);
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="dock-row m-only">
      <nav className="dock" aria-label="Sections">
        {items.map((it) => (
          <a key={it.id} href={`#${it.id}`} aria-current={active === it.id ? 'true' : undefined}>
            {it.label}
          </a>
        ))}
      </nav>
      <ThemeToggle className="theme-dock" />
    </div>
  );
}
