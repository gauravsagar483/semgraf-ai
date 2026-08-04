import { useState } from "react";

const FAQ = [
  {
    q: "What is a dual-plane runtime?",
    a: "A runtime that routes each ask to either a metric compile path or a relationship traverse path — then executes and returns a trace. Agents sit above it; warehouses sit below.",
  },
  {
    q: "Is Ask the product?",
    a: "Ask is one surface. Semgraf is the dual-plane runtime also exposed via MCP and SDKs. The homepage explains the product; Ask is the interactive console.",
  },
  {
    q: "Does the metric plane use LLM-written SQL?",
    a: "No on the happy path. The thin compiler emits SQL from declared metrics and joins. The LLM may help classify intent or fill slots — not invent joins.",
  },
  {
    q: "What warehouses work today?",
    a: "Phase 1 runs on DuckDB with toy ecommerce fixtures. Postgres and cloud warehouses follow the same compile contract.",
  },
  {
    q: "How do MCP hosts use Semgraf?",
    a: "Call list_metrics, compile_metric, ask_metric, and blast_radius against the shared API. Same definition version and error codes as the web console.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="shell faq-layout">
        <header className="section-head">
          <h2 className="section-title">Questions</h2>
          <p className="section-lead">
            Product answers for founders, platform eng, and design partners.
          </p>
        </header>
        <div className="faq">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {item.q}
                </button>
                {isOpen && <p>{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
