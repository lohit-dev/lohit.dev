import { site } from '@/data/content';

export default function Footer() {
  return (
    <footer className="foot">
      <p>{site.location}</p>
      <p>{site.motto}</p>
    </footer>
  );
}
