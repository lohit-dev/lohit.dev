import { experience } from '@/data/content';
import JourneyRail from './JourneyRail';

export default function Experience() {
  const { feature, earlier } = experience;
  return (
    <section className="sec" id="experience">
      <h2>
        <span className="d-only">Experience</span>
        <span className="m-only">Journey</span>
      </h2>
      <JourneyRail feature={feature} earlier={earlier} />
      <article className="feature d-only">
        <p className="meta meta-row">
          <span>{feature.when}</span>
          <span className="dur" data-count>
            {feature.duration}
          </span>
        </p>
        <h3 className="feature-title">{feature.company}</h3>
        <p className="feature-sub">{feature.role}</p>
        <p className="feature-text">{feature.text}</p>
      </article>
      <div className="trio d-only">
        {earlier.map((job) => (
          <div key={job.company}>
            <p className="meta">{job.when}</p>
            <h3 className="name">{job.company}</h3>
            <p className="role">{job.role}</p>
            <p className="note">{job.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
