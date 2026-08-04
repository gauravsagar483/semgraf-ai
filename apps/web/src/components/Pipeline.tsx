const STEPS = [
  { n: "01", title: "Intent", detail: "Ask, MCP tool call, or SDK request" },
  { n: "02", title: "Route", detail: "Rules + hybrid classifier → metric or relationship plane" },
  { n: "03", title: "Compile / traverse", detail: "Metric SQL from definitions · graph blast radius from lineage" },
  { n: "04", title: "Execute + attest", detail: "Run on fixture warehouse · return rows, SQL, definition hash" },
];

export default function Pipeline() {
  return (
    <section className="section band" id="how">
      <div className="shell">
        <header className="section-head">
          <h2 className="section-title">From intent to a proven answer</h2>
          <p className="section-lead">
            Fixed path every time. Metric happy path never free-forms SQL — it compiles.
          </p>
        </header>
        <div className="split">
          <article className="card pipeline">
            <h3>Deterministic path</h3>
            <ol>
              {STEPS.map((s) => (
                <li key={s.n}>
                  <span className="step-n">{s.n}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <code>{s.detail}</code>
                  </div>
                </li>
              ))}
            </ol>
          </article>
          <div className="stack">
            <article className="card">
              <h3>Versioned. Typed. Scoped.</h3>
              <pre className="scope-tree">{`fixture
  → semantic model
      → metric definitions
  → relationship graph
      → lineage edges`}</pre>
            </article>
            <article className="card">
              <h3>Surfaces that share one core</h3>
              <p className="muted">
                Web, MCP, and SDKs call the same compile + traverse runtime — no divergent business
                logic.
              </p>
              <ul className="chip-row tight">
                {["Web Ask", "MCP", "Python SDK", "TypeScript SDK"].map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
