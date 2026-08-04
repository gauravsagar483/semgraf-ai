const PLANES = [
  {
    id: "metric",
    title: "Metric plane",
    tag: "compile",
    body: "OSI-derived YAML → thin metric compiler → DuckDB. LLM never writes joins when a metric is in scope.",
    points: ["Deterministic SQL", "Definition version hash", "Out-of-scope refuses"],
  },
  {
    id: "relationship",
    title: "Relationship plane",
    tag: "traverse",
    body: "Fixture lineage graph answers blast radius and dependency walks with fixed traversals — demo-reliable.",
    points: ["Blast radius", "Upstream / downstream", "Node-addressed asks"],
  },
  {
    id: "trace",
    title: "Trace & attest",
    tag: "prove",
    body: "Plane badge, latency, compiled SQL or graph path — audit-friendly without a separate ops console.",
    points: ["Plane badge", "SQL / path Trace", "Shared by web + API"],
  },
];

export default function DualPlanes() {
  return (
    <section className="section band" id="planes">
      <div className="shell">
        <header className="section-head wide">
          <p className="hero-kicker">How we’re different</p>
          <h2 className="section-title">Two planes. One runtime under your agents.</h2>
          <p className="section-lead">
            Meaning for metrics. Structure for relationships. Proof on every response. That’s the
            dual-plane USP — deterministic by construction.
          </p>
        </header>
        <div className="plane-grid">
          {PLANES.map((p) => (
            <article key={p.id} className={`card plane-card plane-${p.id}`}>
              <span className="plane-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <ul>
                {p.points.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
