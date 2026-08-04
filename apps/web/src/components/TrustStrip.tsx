const CHIPS = ["dbt", "DuckDB", "Postgres", "Snowflake", "MCP", "Cursor", "Claude", "Open lineage"];

export default function TrustStrip() {
  return (
    <section className="trust" aria-label="Stack fit">
      <div className="shell">
        <p>Works under the agents and stack you already run — no rip-and-replace</p>
        <ul className="chip-row">
          {CHIPS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
