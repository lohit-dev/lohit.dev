/**
 * All the words on the site live here. Edit this file and nothing else
 * to change what the page says.
 */

export const site = {
  name: 'Dinavahi Lohith Sai',
  title: 'Backend Developer',
  email: 'lohitsaidev@gmail.com',
  location: 'Vijayawada, India',
  url: 'https://lohitdev.vercel.app',
  resume: '/lohit-sai-resume.pdf',
  github: 'https://github.com/lohit-dev',
  linkedin: 'https://www.linkedin.com/in/dinavahi-lohit-sai-192a382b1/',
  motto: 'Error 404: Perfection Not Found.',
  description:
    'Dinavahi Lohith Sai is a backend developer in Vijayawada working in Go, Rust and TypeScript, looking for an SDE-1 role.',
};

export const hero = {
  lead: 'Backend developer in Vijayawada, building fast, reliable services in Go, Rust and TypeScript.',
  tail: 'Looking for an SDE-1 role.',
};

export type Link = { label: string; href: string };

export type Project = {
  id: string;
  title: string;
  kind: string;
  lead?: string;
  text: string;
  stack: string;
  links: Link[];
  /** Faint decoration under the text: lines of a SHA-256 hash. */
  hash?: string[];
  /** Faint decoration under the text: a large glyph. */
  glyph?: string;
};

export const projects: Project[] = [
  {
    id: 'travelid',
    title: 'TravelID 2.0',
    kind: 'Backend',
    lead: '3rd place, Polkadot Cloud Hackathon, $1,000',
    text: 'Prove a document is authentic without exposing it. Files are hashed with SHA-256 and only the hash goes on-chain through Polkadot. I led the Rust backend and co-built the React frontend.',
    stack: 'Rust, Axum, Subxt, SQLx, PostgreSQL, React',
    links: [
      {
        label: 'Devpost',
        href: 'https://devpost.com/software/travelid-2-0-secure-travel-document-verification',
      },
      { label: 'GitHub', href: 'https://github.com/lohit-dev/polkadot-hackathon' },
    ],
    hash: ['9f86d081884c7d65', '9a2feaa0c55ad015', 'a3bf4f1b2b0b822c', 'd15d6c15b0f00a08'],
  },
  {
    id: 'thorchain',
    title: 'THORChain API',
    kind: 'Backend',
    text: "An hourly indexer and REST API for THORChain pool, earnings and swap history. It stays inside the Midgard API's rate limits and serves filtered, paginated data with Swagger docs.",
    stack: 'Rust, Axum, Tokio, SQLx, MySQL',
    links: [{ label: 'GitHub', href: 'https://github.com/lohit-dev/catalog-crypto-api' }],
  },
  {
    id: 'daichi',
    title: 'Daichi',
    kind: 'Mobile',
    text: 'A free, open-source anime app with search, a built-in video player, watch history and a library. It reads from AniList and falls back to Kitsu during outages.',
    stack: 'React Native, Expo, TypeScript, GraphQL, Zustand',
    links: [{ label: 'GitHub', href: 'https://github.com/lohit-dev/Daichi' }],
    glyph: '大智',
  },
  {
    id: 'poketto',
    title: 'Poketto',
    kind: 'Android',
    text: 'A privacy-focused expense tracker that works fully offline, with quick entry, categories and insights. An optional one-time Pro unlock adds exports and recurring expenses.',
    stack: 'Android, on Google Play',
    links: [
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.king_grey.pokit',
      },
    ],
  },
  {
    id: 'flow-notes',
    title: 'Flow Notes',
    kind: 'Android',
    text: 'An offline notes app with pinned notes, instant search with highlighted matches and folders. Designed in Material 3 Expressive with Material You colors.',
    stack: 'Android, on Google Play',
    links: [
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.king_grey.notes_app',
      },
    ],
  },
];

export const experience = {
  feature: {
    when: 'Dec 2024 – Apr 2026',
    duration: '16 months',
    company: 'Hashira.io',
    role: 'Software Development Intern, Hyderabad',
    text: 'Built Go and Rust services for Garden.Finance, a cross-chain trading protocol: watcher services, real-time data pipelines and Spark and Lightning integrations. Also built Garden Analyzer, an MCP analytics bot, and a TypeScript arbitrage bot.',
  },
  earlier: [
    {
      when: 'Mar – Apr 2024',
      company: 'InternIQ',
      role: 'Web Developer Intern',
      note: 'Built web features and fixed UI bugs.',
    },
    {
      when: 'Feb – Mar 2024',
      company: 'Navodita Infotech',
      role: 'Backend Developer Intern',
      note: 'Built a real-time chat app with Node.js and Socket.io.',
    },
    {
      when: 'May – Aug 2022',
      company: 'NRI Institute of Technology',
      role: 'Python Instructor',
      note: 'Taught Python to 3 engineering sections.',
    },
  ],
};

export const stack = {
  core: 'Go, Rust and TypeScript.',
  // Words in [brackets] light up one by one as the line scrolls into view.
  text: '[Node.js], [Axum] and [Chi] on the server. [PostgreSQL], [MySQL] and [MongoDB] for data. [Docker], [AWS], [Gitea] and [Coolify] to ship. [React], [Next.js] and [React Native] for screens. Also [Python], [Java] and [SQL].',
};

export const awards = [
  {
    title: '3rd place, Polkadot Cloud Hackathon',
    desc: 'TravelID 2.0',
    figure: '$1,000',
    count: true,
  },
  {
    title: 'Hackathon winner',
    desc: 'DawgCoin, an ERC-20 token on Ethereum',
    figure: '₹10,000',
    count: true,
  },
  {
    title: 'College-wide coding contest',
    desc: 'A SQL-based mobile app, built in a team of 4',
    figure: '1st place',
  },
  {
    title: 'B.Tech in Computer Science and Data Science',
    desc: 'NRI Institute of Technology, Agiripalli. Member of the Google Developers Club.',
    figure: '2022 – 2026',
  },
];

export const contact = {
  lede: "I'm looking for an SDE-1 backend role and I'm open to relocating.",
  spoken: "I speak English, Telugu and Hindi, and I'm learning Japanese.",
};

/** Small screens only: the quick facts under the opening statement. */
export const facts = [
  { label: 'Now', text: 'Open to SDE-1 backend roles, and to relocating' },
  { label: 'Before', text: '16 months at Hashira.io, building Go and Rust services' },
  { label: 'Won', text: '3rd place, Polkadot Cloud Hackathon, $1,000' },
  { label: 'Shipped', text: 'Two Android apps on Google Play' },
];

/** Small screens only: the stack as short labelled rows. */
export const stackGroups = [
  { label: 'Server', items: ['Node.js', 'Axum', 'Chi'] },
  { label: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { label: 'Ship', items: ['Docker', 'AWS', 'Gitea', 'Coolify'] },
  { label: 'Screens', items: ['React', 'Next.js', 'React Native'] },
  { label: 'Also', items: ['Python', 'Java', 'SQL'] },
];

/** Small screens only: the contact headline. */
export const contactSmall = {
  lead: 'Looking for an SDE-1 role, and free to start now.',
  tail: "Write to me, I'd like to hear about it.",
};
