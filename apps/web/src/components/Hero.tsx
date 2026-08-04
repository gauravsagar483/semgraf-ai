import { Link } from "react-router-dom";
import AnalyticsStage from "./AnalyticsStage";

export default function Hero() {
  return (
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">AI agents are guessing your metrics</p>
          <h1 className="hero-title">
            <span className="hero-brand">Semgraf</span>
            <span className="hero-line">Metrics that compile. Relationships that verify.</span>
          </h1>
          <p className="hero-body">
            Chat-to-SQL invents joins. Catalogs don’t execute. Semgraf is the dual-plane runtime under
            your agents — compile governed metrics, traverse verified lineage, and ship numbers with a
            trace.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary" to="/ask">
              Try the live demo
            </Link>
            <Link className="btn btn-ghost" to="/#product">
              See the USP
            </Link>
          </div>
          <ul className="hero-promises">
            <li>Compile metrics</li>
            <li>Traverse lineage</li>
            <li>Trace every answer</li>
            <li>MCP + SDK</li>
          </ul>
        </div>
        <AnalyticsStage />
      </div>
    </section>
  );
}
