'use client';

import { useEffect, useRef, useState } from 'react';
import { contact, contactSmall, site } from '@/data/content';

export default function Contact() {
  const [label, setLabel] = useState('Copy');
  const addr = useRef<HTMLParagraphElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const flash = (text: string) => {
    setLabel(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLabel('Copy'), 2200);
  };

  const selectAddress = () => {
    const node = addr.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      flash('Copied');
    } catch {
      selectAddress();
      flash('Selected');
    }
  };

  return (
    <section className="sec" id="contact">
      <h2>Contact</h2>
      <div className="m-contact m-only">
        <h3 className="mc-head">
          {contactSmall.lead} <span>{contactSmall.tail}</span>
        </h3>
        <svg className="mc-art" aria-hidden="true" viewBox="0 0 350 190" fill="none">
          <circle cx="175" cy="95" r="42" stroke="var(--line)" strokeWidth="1" />
          <circle cx="175" cy="95" r="70" stroke="var(--line)" strokeWidth="1" />
          <circle
            cx="175"
            cy="95"
            r="94"
            stroke="var(--line)"
            strokeWidth="1"
            strokeDasharray="2 5"
          />
          <g
            transform="rotate(-6 175 95)"
            stroke="var(--ink)"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <rect x="118" y="62" width="114" height="76" rx="8" fill="var(--bg)" />
            <path d="M118 72 L175 112 L232 72" />
            <path d="M118 130 L156 98" />
            <path d="M232 130 L194 98" />
          </g>
          <circle cx="287" cy="46" r="3" fill="var(--ink)" />
          <circle cx="62" cy="150" r="3" fill="var(--ink)" />
          <circle cx="318" cy="132" r="1.5" fill="var(--muted)" />
          <circle cx="34" cy="52" r="1.5" fill="var(--muted)" />
          <circle cx="236" cy="12" r="1.5" fill="var(--line)" />
          <circle cx="104" cy="178" r="1.5" fill="var(--line)" />
        </svg>
        <dl className="facts mc-rows">
          <div className="fact">
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
          <div className="fact">
            <dt>LinkedIn</dt>
            <dd>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                dinavahi-lohit-sai
              </a>
            </dd>
          </div>
          <div className="fact">
            <dt>GitHub</dt>
            <dd>
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                lohit-dev
              </a>
            </dd>
          </div>
          <div className="fact">
            <dt>Resume</dt>
            <dd>
              <a href={site.resume} target="_blank" rel="noopener noreferrer">
                Download the PDF
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <p className="c-lede d-only">{contact.lede}</p>
      <p className="mail-big d-only" ref={addr}>
        {site.email}
      </p>
      <div className="c-row d-only">
        <button
          className={label === 'Copy' ? 'copy' : 'copy is-done'}
          type="button"
          onClick={copy}
          aria-live="polite"
        >
          {label}
        </button>
        <a className="link" href={`mailto:${site.email}`}>
          Email me
        </a>
        <a className="link" href={site.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
      <p className="spoken d-only">{contact.spoken}</p>
    </section>
  );
}
