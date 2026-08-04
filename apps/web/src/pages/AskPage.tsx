import { FormEvent, useState } from "react";
import Nav from "../components/Nav";

type Plane = "metric" | "relationship";

type AskResponse = {
  question: string;
  plane: Plane;
  metric?: string | null;
  sql?: string | null;
  rows?: Record<string, unknown>[];
  columns?: string[];
  definition_version?: string | null;
  graph_nodes?: { id: string; label?: string; kind?: string; via?: string }[];
  message?: string | null;
  latency_ms?: number;
  error_code?: string | null;
};

const HINTS = [
  "total revenue",
  "revenue by segment",
  "order count",
  "blast radius of raw.orders",
  "what breaks if metric.total_revenue changes",
];

export default function AskPage() {
  const [question, setQuestion] = useState("total revenue");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AskResponse | null>(null);

  async function runAsk(q: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      setResult((await res.json()) as AskResponse);
    } catch (err) {
      setResult({
        question: q,
        plane: "metric",
        message: err instanceof Error ? err.message : "Request failed",
        error_code: "COMPILE_ERROR",
      });
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void runAsk(question.trim());
  }

  return (
    <div className="site ask-site">
      <Nav variant="app" />
      <main className="ask-page">
        <div className="ask-narrow">
        <header className="ask-header">
          <p className="hero-kicker">Product surface</p>
          <h1>Ask console</h1>
          <p>
            Sub-feature of the dual-plane runtime — compile a metric or traverse relationships on
            the ecommerce fixture.
          </p>
        </header>

        <form className="ask-form" onSubmit={onSubmit}>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a metric or blast radius…"
            aria-label="Ask"
          />
          <button className="btn btn-primary" type="submit" disabled={loading || !question.trim()}>
            {loading ? "…" : "Ask"}
          </button>
        </form>

        <div className="hints">
          {HINTS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => {
                setQuestion(h);
                void runAsk(h);
              }}
            >
              {h}
            </button>
          ))}
        </div>

        {result && (
          <section className="result card">
            <div className={`plane-badge ${result.plane}`}>{result.plane} plane</div>
            <h2>
              {result.metric
                ? result.metric.replaceAll("_", " ")
                : result.plane === "relationship"
                  ? "Blast radius"
                  : "Answer"}
            </h2>
            <div className="meta">
              {result.latency_ms != null && <span>{result.latency_ms} ms</span>}
              {result.definition_version && <span> · def {result.definition_version}</span>}
            </div>

            {result.error_code ? (
              <p className="error">{result.message}</p>
            ) : (
              <>
                {result.message && <p>{result.message}</p>}
                {result.rows && result.rows.length > 0 && (
                  <table className="data">
                    <thead>
                      <tr>
                        {(result.columns ?? Object.keys(result.rows[0])).map((c) => (
                          <th key={c}>{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.map((row, i) => (
                        <tr key={i}>
                          {(result.columns ?? Object.keys(row)).map((c) => (
                            <td key={c}>{String(row[c])}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {result.graph_nodes && result.graph_nodes.length > 0 && (
                  <ul className="nodes">
                    {result.graph_nodes.map((n) => (
                      <li key={n.id}>
                        {n.id}
                        {n.via ? ` ← ${n.via}` : ""}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {(result.sql || result.definition_version) && (
              <details className="trace">
                <summary>Trace</summary>
                {result.sql && <pre className="sql">{result.sql}</pre>}
              </details>
            )}
          </section>
        )}
        </div>
      </main>
    </div>
  );
}
