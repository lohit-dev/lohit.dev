import { site } from '@/data/content';

/** Shown for any address that does not exist. Uses the same quiet look as the site. */
export default function NotFound() {
  return (
    <div className="page">
      <header className="top">
        <a className="who" href="/" aria-label={site.name}>
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
          <span className="nm">Lohith Sai</span>
        </a>
      </header>
      <main className="nf">
        <p className="nf-code">404</p>
        <h1 className="nf-title">
          Nothing here. <span>{site.motto}</span>
        </h1>
        <a className="link" href="/">
          Back to the portfolio
        </a>
      </main>
    </div>
  );
}
