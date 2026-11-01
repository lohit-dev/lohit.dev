import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { site } from '@/data/content';
import './globals.css';

const title = `${site.name} | ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    'Dinavahi Lohith Sai',
    'Lohith Sai',
    'backend developer',
    'iOS developer',
    'React Native developer',
    'SDE-1',
    'software engineer',
    'Go developer',
    'Rust developer',
    'TypeScript developer',
    'Vijayawada',
    'India',
    'portfolio',
  ],
  category: 'technology',
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'profile',
    url: site.url,
    siteName: site.name,
    locale: 'en_IN',
    title,
    description: site.description,
    firstName: 'Lohith Sai',
    lastName: 'Dinavahi',
    images: [
      { url: '/images/og.png', width: 1200, height: 630, alt: `${site.name}, ${site.title}` },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: site.description,
    images: [{ url: '/images/og.png', alt: `${site.name}, ${site.title}` }],
  },
  verification: { google: 'yiNZ4AE1FYKMFP8uIKUr-PS34X7PZlYt-40VEBdcaAU' },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfcfb' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0a' },
  ],
};

const PRE =
  "(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){d.dataset.theme=t;var c=t==='dark'?'#0b0b0a':'#fcfcfb';document.querySelectorAll('meta[name=\"theme-color\"]').forEach(function(m){m.setAttribute('content',c)})}}catch(e){}try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){d.classList.add('pre');setTimeout(function(){d.classList.remove('pre')},4000)}}catch(e){}})()";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        {/* Hides everything below the opening statement until the page is ready, so things are painted in order:
            header, statement, then the rest as it scrolls into view. It lifts itself after 4 seconds at the latest. */}
        <script dangerouslySetInnerHTML={{ __html: PRE }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
