import { Link } from "react-router-dom";

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="shell cta-inner">
        <h2>Stop guessing SQL. Start compiling and traversing.</h2>
        <p>
          Put a dual-plane runtime under your agents — governed metrics, verified lineage, traceable
          answers.
        </p>
        <div className="hero-cta">
          <Link className="btn btn-primary" to="/ask">
            Try the live demo
          </Link>
          <Link className="btn btn-ghost" to="/#how">
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div className="footer-brand">
          <img className="nav-mark" src="/brand/mark.svg" alt="" width={28} height={28} />
          <div>
            <strong>Semgraf</strong>
            <p>Metrics that compile. Relationships that verify.</p>
          </div>
        </div>
        <nav aria-label="Footer">
          <Link to="/#impact">Impact</Link>
          <Link to="/#product">Product</Link>
          <Link to="/#how">How it works</Link>
          <Link to="/#planes">Planes</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/ask">Ask</Link>
          <Link to="/#faq">FAQ</Link>
        </nav>
        <p className="copy">© {new Date().getFullYear()} Semgraf</p>
      </div>
    </footer>
  );
}
