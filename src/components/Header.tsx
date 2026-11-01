import { site } from '@/data/content';
import ThemeToggle from './ThemeToggle';

/**
 * Wordmark: a small monogram tile, then "Lohith Sai". On hover or focus
 * "Dinavahi" opens in front of it, so the full name appears.
 */
export default function Header() {
  return (
    <header className="top">
      <a className="who" href="#" aria-label={site.name}>
        <span className="mk" aria-hidden="true">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g transform="translate(-5 0)">
              <path d="M31.5 14.2 41 11.4" strokeWidth="3.6" />
              <path
                d="M38.6 14C35.6 25.5 31.8 36 28.4 44.6c-1 2.6.6 4.8 3.2 3.6 2.6-1.2 4.4-3.6 6-6.2"
                strokeWidth="5.4"
              />
              <circle cx="46.2" cy="46.4" r="3.9" fill="currentColor" stroke="none" />
            </g>
          </svg>
        </span>
        <span className="nm" aria-hidden="true">
          <span className="sur">
            <span>Dinavahi&nbsp;</span>
          </span>
          Lohith Sai
        </span>
      </a>
      <nav className="nav" aria-label="Links">
        <a href={site.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a className="nav-res" href={site.resume} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
        <a href="#contact">Email</a>
        <ThemeToggle className="theme-top" />
      </nav>
    </header>
  );
}
