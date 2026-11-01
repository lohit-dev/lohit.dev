import Header from './Header';
import Hero from './Hero';
import Work from './Work';
import Experience from './Experience';
import Stack from './Stack';
import Awards from './Awards';
import Contact from './Contact';
import Footer from './Footer';
import Motion from './Motion';
import MobileNav from './MobileNav';
import Scrub from './Scrub';

/** The whole page, in reading order. */
export default function Portfolio() {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <Awards />
        <Contact />
      </main>
      <Footer />
      <MobileNav />
      <Scrub />
      <Motion />
    </div>
  );
}
