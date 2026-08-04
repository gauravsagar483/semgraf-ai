const ITEMS = [
  {
    title: "Compile",
    body: "Metric asks resolve through a governed model into deterministic SQL — same question, same joins. No LLM-written joins on the happy path.",
  },
  {
    title: "Traverse",
    body: "Structural asks walk a verified relationship graph: blast radius, lineage, downstream impact — not another catalog search.",
  },
  {
    title: "Trace",
    body: "Every answer carries plane, definition version, and the SQL or path that produced it. Audit without a second ops console.",
  },
];

export default function Pillars() {
  return (
    <section className="section" id="product">
      <div className="shell">
        <header className="section-head">
          <p className="hero-kicker">USP</p>
          <h2 className="section-title">Compile. Traverse. Trace.</h2>
          <p className="section-lead">
            Not another agent. Not a context layer. Semgraf is the dual-plane runtime under your
            agents — metrics that compile, relationships that verify, proof on every response.
          </p>
        </header>
        <div className="pillar-grid">
          {ITEMS.map((item) => (
            <article key={item.title} className="card pillar">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
