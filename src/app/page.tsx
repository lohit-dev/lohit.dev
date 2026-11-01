import Portfolio from '@/components/Portfolio';
import { site } from '@/data/content';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: 'en',
      publisher: { '@id': `${site.url}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${site.url}/#profile`,
      url: site.url,
      name: `${site.name} | ${site.title}`,
      isPartOf: { '@id': `${site.url}/#website` },
      mainEntity: { '@id': `${site.url}/#person` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${site.url}/images/og.png`,
        width: 1200,
        height: 630,
      },
    },
    {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      alternateName: ['Lohith Sai', 'Lohit Sai Dinavahi'],
      jobTitle: site.title,
      description: site.description,
      url: site.url,
      image: `${site.url}/images/og.png`,
      email: `mailto:${site.email}`,
      knowsLanguage: ['en', 'te', 'hi'],
      knowsAbout: [
        'Backend development',
        'Go',
        'Rust',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'Docker',
        'React',
        'React Native',
        'Android',
      ],
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'NRI Institute of Technology, Agiripalli' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Vijayawada',
        addressRegion: 'Andhra Pradesh',
        addressCountry: 'IN',
      },
      sameAs: [site.github, site.linkedin],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Portfolio />
    </>
  );
}
