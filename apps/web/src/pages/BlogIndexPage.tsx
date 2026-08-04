import { Link } from "react-router-dom";
import { Footer } from "../components/CtaBand";
import Nav from "../components/Nav";
import { formatPostDate, listPosts } from "../lib/blog";

export default function BlogIndexPage() {
  const posts = listPosts();

  return (
    <div className="site">
      <Nav variant="app" />
      <main className="blog-page">
        <div className="shell">
          <header className="blog-hero">
            <p className="hero-kicker">Writing</p>
            <h1>Blog</h1>
            <p>
              Product notes, dual-plane patterns, and shipping updates for founders and platform
              teams.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="muted">No posts yet — check back soon.</p>
          ) : (
            <ul className="blog-list">
              {posts.map((post) => (
                <li key={post.slug}>
                  <article className="card blog-card">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <h2>
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p>{post.description}</p>
                    {post.tags.length > 0 && (
                      <ul className="chip-row tight">
                        {post.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                    <Link className="blog-read" to={`/blog/${post.slug}`}>
                      Read →
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
