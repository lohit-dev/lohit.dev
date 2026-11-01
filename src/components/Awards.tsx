import { awards } from '@/data/content';

export default function Awards() {
  return (
    <section className="sec" id="education">
      <h2>
        <span className="d-only">Education and awards</span>
        <span className="m-only">Awards</span>
      </h2>
      <div className="m-only awm">
        <div className="aw-cards">
          {awards.slice(0, 2).map((a) => (
            <div className="aw-card" key={a.title}>
              <p className="aw-fig">{a.figure}</p>
              <p className="aw-title">{a.title}</p>
              <p className="aw-desc">{a.desc}</p>
            </div>
          ))}
        </div>
        <ul className="aw-rows">
          {awards.slice(2).map((a) => (
            <li key={a.title}>
              <span className="aw-rt">{a.title}</span>
              <span className="aw-rf">{a.figure}</span>
            </li>
          ))}
        </ul>
      </div>
      <ul className="ledger d-only">
        {awards.map((a) => (
          <li className="lrow" key={a.title}>
            <div>
              <p className="l-title">{a.title}</p>
              <p className="l-desc">{a.desc}</p>
            </div>
            <p className="l-fig" data-count={'count' in a && a.count ? '' : undefined}>
              {a.figure}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
