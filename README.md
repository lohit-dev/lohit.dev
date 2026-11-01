# Lohit's portfolio

Next.js (App Router) and TypeScript. It builds to a fully static site, so there is no server to run.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npm run typecheck
```

## Change what it says

Every word on the page lives in `src/data/content.ts`. Edit that file and nothing else.

- **Resume:** replace `public/lohit-sai-resume.pdf` with a newer PDF (keep the file name) and the "Resume" link in the header updates.
- **Share preview:** `public/og.png` (1200 x 630) is the card shown when the link is pasted into LinkedIn, WhatsApp or X.
- **Favicon:** `src/app/icon.svg` and `src/app/apple-icon.png` match the "L" tile in the header.
- **Projects, jobs, awards:** add, remove or reorder items in the arrays.

## Where things are

```
src/app/layout.tsx       fonts (Geist), page title, social preview, theme colour
src/app/page.tsx         the page, plus search-engine data about you
src/app/globals.css      all styling, light and dark
src/components/Hero.tsx  the hover glow and scroll fade
src/components/Motion.tsx entrances as each section scrolls into view, and count-ups
src/components/Work.tsx  the project picker (hover, click, arrow keys)
src/data/content.ts      all the content
```

## Deploy to lohitdev.vercel.app

1. Put this folder in a GitHub repo.
2. In Vercel, open the existing `lohitdev` project, go to Settings, then Git, and connect that repo.
   (Or import the repo as a new project and give it the same name.)
3. Push. Vercel detects Next.js and builds it. No settings to change.

## Notes

- Everything below the hero animates in as it scrolls into view, using IntersectionObserver (works in every browser). If it is unavailable, nothing is hidden.
- The hero effects switch off for visitors who prefer reduced motion, and the hover glow is skipped on touch screens.
- Dark mode follows the visitor's system setting.

## Phones

Below 700px wide the site switches to its own layout, with the same content and the same data file:
an editorial home with four ruled facts, the same Work picker stacked, Journey as a rail, Stack as grouped
chips with two award figures, and Contact as a headline, an envelope drawing and four rows. A floating pill
(`MobileNav.tsx`) jumps between sections and shows where you are. Desktop is unchanged: blocks marked
`m-only` show only on phones, blocks marked `d-only` only on larger screens. The phone-only words
(`facts`, `stackGroups`, `contactSmall`) are at the bottom of `src/data/content.ts`.

Phone motion is tied to scrolling, not to timers: `JourneyRail.tsx` (a dot walks down the rail and the stops
appear as it reaches them), `Scrub.tsx` (pieces fade up as they arrive and drift up and away as they leave),
and the pinned Work picker in `Work.tsx`. The first paint is ordered: header, opening statement, the facts,
the dock, and only then the rest as it scrolls into view (`pre` class from the script in `layout.tsx`).

## Theme, logo and search

- **Theme button** (`ThemeToggle.tsx`): top right on wide screens, a round button beside the pill on phones. The new theme grows out of the button as a circle (View Transitions API); browsers without it, and reduced motion, switch instantly. The choice is saved in `localStorage` and restored before first paint by the small script in `layout.tsx`. With no saved choice the site follows the system theme.
- **Logo**: an italic serif "l." drawn as paths (no font needed), in `Header.tsx`, `src/app/icon.svg` (adaptive favicon), `src/app/apple-icon.png` and `public/og.png`.
- **Search**: full metadata and Open Graph/Twitter cards in `layout.tsx`, a JSON-LD graph (WebSite, ProfilePage, Person) in `page.tsx`, plus `public/sitemap.xml`, `public/robots.txt` and `public/manifest.webmanifest` (plain files, served from the site root). After deploying, add the site in Google Search Console and submit `https://lohitdev.vercel.app/sitemap.xml`.
