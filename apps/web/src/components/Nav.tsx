import { Link, NavLink } from "react-router-dom";

const MARKETING_ANCHORS = [
  { href: "/#impact", label: "Impact" },
  { href: "/#product", label: "Product" },
  { href: "/#how", label: "How it works" },
  { href: "/#planes", label: "Planes" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav({ variant = "marketing" }: { variant?: "marketing" | "app" }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-brand" aria-label="Semgraf home">
          <img className="nav-mark" src="/brand/mark.svg" alt="" width={28} height={28} />
          <span className="nav-word">
            Sem<span>graf</span>
          </span>
        </Link>

        {variant === "marketing" ? (
          <nav className="nav-links" aria-label="Primary">
            {MARKETING_ANCHORS.map((l) => (
              <Link key={l.href} to={l.href}>
                {l.label}
              </Link>
            ))}
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/ask">Ask</NavLink>
          </nav>
        ) : (
          <nav className="nav-links" aria-label="Primary">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/ask">Ask</NavLink>
          </nav>
        )}

        <div className="nav-actions">
          <Link className="link-quiet" to="/blog">
            Blog
          </Link>
          <Link className="btn btn-primary" to="/ask">
            Try Ask
          </Link>
        </div>
      </div>
    </header>
  );
}
