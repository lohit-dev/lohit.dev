import { Fragment, type CSSProperties } from 'react';
import { stack, stackGroups } from '@/data/content';

/** Splits "[Node.js], [Axum] and ..." into plain text and highlighted technologies. */
function parts(text: string) {
  return text.split(/(\[[^\]]+\])/).filter(Boolean);
}

export default function Stack() {
  let n = 0;
  return (
    <section className="sec" id="stack">
      <h2>Stack</h2>
      <p className="core">
        {stack.core.split(/(\s+)/).map((w, i) =>
          /^\s+$/.test(w) ? (
            <Fragment key={i}>{w}</Fragment>
          ) : (
            <span className="cw" key={i}>
              {w}
            </span>
          ),
        )}
      </p>
      <p className="stack-text d-only">
        {parts(stack.text).map((part, i) =>
          part.startsWith('[') ? (
            <span className="t" style={{ '--n': n++ } as CSSProperties} key={i}>
              {part.slice(1, -1)}
            </span>
          ) : (
            <Fragment key={i}>{part}</Fragment>
          ),
        )}
      </p>
      <div className="sgroups m-only">
        {stackGroups.map((g) => (
          <div className="sg" key={g.label}>
            <span className="sg-label">{g.label}</span>
            <div className="chips">
              {g.items.map((t) => (
                <span className="chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
