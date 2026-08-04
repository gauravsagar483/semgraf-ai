const GROUPS = [
  {
    title: "Warehouses",
    items: ["DuckDB", "Postgres", "Snowflake", "BigQuery"],
  },
  {
    title: "Semantic",
    items: ["OSI-derived YAML", "MetricFlow later", "dbt models"],
  },
  {
    title: "Lineage",
    items: ["Fixture graph", "OpenLineage later", "Blast radius"],
  },
  {
    title: "Agents",
    items: ["MCP", "Cursor", "Claude", "Custom SDK"],
  },
];

export default function Integrations() {
  return (
    <section className="section">
      <div className="shell">
        <header className="section-head">
          <h2 className="section-title">Connect what you already have</h2>
          <p className="section-lead">
            Phase 1 ships ecommerce fixtures locally. Connectors expand without changing the
            dual-plane contract.
          </p>
        </header>
        <div className="integ-grid">
          {GROUPS.map((g) => (
            <article key={g.title} className="card integ">
              <h3>{g.title}</h3>
              <ul className="chip-row tight">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="sync-line">
          <span className="pulse" aria-hidden />
          Definitions versioned — answers cite the model that compiled them
        </p>
      </div>
    </section>
  );
}
