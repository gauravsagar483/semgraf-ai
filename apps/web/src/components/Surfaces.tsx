import { useState } from "react";
import { Link } from "react-router-dom";

const TABS = [
  {
    id: "ask",
    label: "01 Ask console",
    title: "Ask in plain language — get a plane, an answer, and a trace",
    body: "Metric questions compile. Lineage questions traverse. Trace shows SQL or downstream nodes with a definition version.",
    cta: { to: "/ask", label: "Open Ask" },
  },
  {
    id: "mcp",
    label: "02 MCP tools",
    title: "Same core as tools inside Cursor and Claude",
    body: "list_metrics, compile_metric, ask_metric, blast_radius — hosts never invent joins when the metric plane wins.",
    cta: null,
  },
  {
    id: "sdk",
    label: "03 SDKs",
    title: "Embed the runtime in your agents",
    body: "Python and TypeScript clients wrap the HTTP API. Errors are machine-coded: out of scope, compile error, ambiguous route.",
    cta: null,
  },
] as const;

export default function Surfaces() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("ask");
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <section className="section" id="surfaces">
      <div className="shell">
        <header className="section-head">
          <h2 className="section-title">Every surface. Same runtime.</h2>
          <p className="section-lead">
            Ask is one product surface — not the whole product. MCP and SDKs share the identical
            dual-plane core.
          </p>
        </header>
        <div className="surfaces">
          <div className="surface-tabs" role="tablist" aria-label="Product surfaces">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active === t.id}
                className={active === t.id ? "active" : undefined}
                onClick={() => setActive(t.id)}
              >
                {t.label}
                <span>{t.title}</span>
              </button>
            ))}
          </div>
          <article className="card surface-panel" role="tabpanel">
            <h3>{tab.title}</h3>
            <p>{tab.body}</p>
            {tab.cta ? (
              <Link className="btn btn-primary" to={tab.cta.to}>
                {tab.cta.label}
              </Link>
            ) : (
              <p className="muted small">Shipping next on the dual-plane roadmap.</p>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
