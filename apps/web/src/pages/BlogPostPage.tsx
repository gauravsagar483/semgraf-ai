import { Link, Navigate, useParams } from "react-router-dom";
import { Footer } from "../components/CtaBand";
import Nav from "../components/Nav";
import { formatPostDate, getPost } from "../lib/blog";

export default function BlogPostPage() {
  const { slug = "" } = useParams();
  const post = getPost(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="site">
      <Nav variant="app" />
      <main className="blog-page">
        <article className="shell blog-article">
          <p className="blog-back">
            <Link to="/blog">← Blog</Link>
          </p>
          <header className="blog-article-head">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <h1>{post.title}</h1>
            <p className="blog-byline">
              {post.author}
              {post.tags.length > 0 ? ` · ${post.tags.join(", ")}` : ""}
            </p>
            {post.description && <p className="blog-deck">{post.description}</p>}
          </header>
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
