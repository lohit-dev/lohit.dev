# lohit.dev

Personal portfolio of **Dinavahi Lohith Sai** — backend developer in Vijayawada.  
Built with Next.js 15, TypeScript and a lot of care.

→ **[lohitdev.vercel.app](https://lohitdev.vercel.app)**

---

## Stack

| Layer           | Choice                     |
| --------------- | -------------------------- |
| Framework       | Next.js 15 (App Router)    |
| Language        | TypeScript                 |
| Styling         | Vanilla CSS — no framework |
| Font            | Geist Sans                 |
| Package manager | Bun                        |
| Deploy          | Vercel                     |

---

## Run locally

```bash
bun install
bun dev          # → http://localhost:3000
bun run build
bun run typecheck
bun run format
```

---

## Editing content

Every word on the page lives in one file:

```
src/data/content.ts
```

Edit that file and nothing else to change what the page says — name, title, projects, experience, awards, contact.

### Assets

| File                          | Purpose                                     |
| ----------------------------- | ------------------------------------------- |
| `public/lohit-sai-resume.pdf` | Resume — replace the PDF, keep the filename |
| `public/images/og.png`        | Social preview card (1200 × 630)            |
| `public/icons/icon.svg`       | PWA / manifest icon                         |
| `public/icons/apple-icon.png` | Apple touch icon                            |
| `src/app/icon.svg`            | Adaptive favicon (Next.js auto-serves)      |
| `src/app/apple-icon.png`      | Apple icon meta (Next.js auto-serves)       |

---

## Project structure

```
src/
  app/
    layout.tsx        metadata, fonts, theme script
    page.tsx          page root + JSON-LD structured data
    globals.css       all styling — light and dark
    icon.svg          favicon (Next.js file convention)
    apple-icon.png    apple touch icon (Next.js file convention)
  components/
    Hero.tsx          hover glow, scroll fade
    Work.tsx          project picker — hover, click, arrow keys
    Motion.tsx        scroll-driven entrances and count-ups
    JourneyRail.tsx   phone: dot walks down the experience rail
    Scrub.tsx         phone: scroll-driven section transitions
    Stack.tsx         tech stack display
    Awards.tsx        awards ledger
    Contact.tsx       contact section
    Header.tsx        nav, logo, resume link
    Footer.tsx        footer
    MobileNav.tsx     phone: floating section pill
    ThemeToggle.tsx   light / dark toggle
  data/
    content.ts        ← all site content lives here
  lib/
    void.ts           utilities

public/
  images/og.png
  icons/icon.svg
  icons/apple-icon.png
  lohit-sai-resume.pdf
  manifest.webmanifest
  robots.txt
  sitemap.xml
```

---

## Design notes

- **Monochrome palette** — `#fcfcfb` light / `#0b0b0a` dark, two grey steps, one accent-free.
- **No animation library** — all motion is CSS + IntersectionObserver + scroll events.
- **Reduced motion** — hero effects and transitions are skipped for `prefers-reduced-motion`.
- **Dark mode** — follows system, overrideable via the toggle; choice saved in `localStorage` and restored before first paint.
- **Phone layout** — below 700 px the site switches to a separate editorial layout (same data file). Desktop is untouched.
- **View Transitions API** — theme switch grows from the toggle as a circle; falls back to instant switch.

---

## Deploy

1. Push to GitHub (`lohit-dev/lohit.dev`).
2. In Vercel, connect this repo to the `lohitdev` project.
3. Push — Vercel detects Next.js and builds. No settings to change.
4. Add the site in Google Search Console and submit `https://lohitdev.vercel.app/sitemap.xml`.

---

## License

Copyright © 2026 Dinavahi Lohith Sai. See [LICENSE](./LICENSE).  
This portfolio is **not open source**. Viewing the code for reference is fine; copying it is not.
