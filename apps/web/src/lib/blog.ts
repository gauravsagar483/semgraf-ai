import { marked } from "marked";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  draft: boolean;
};

export type BlogPost = BlogPostMeta & {
  html: string;
  content: string;
};

const files = import.meta.glob("../../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function slugFromPath(path: string): string {
  const base = path.split("/").pop() ?? path;
  return base.replace(/\.md$/, "");
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }
  const block = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};
  let currentListKey: string | null = null;

  for (const line of block.split(/\r?\n/)) {
    if (/^\s*-\s+/.test(line) && currentListKey) {
      const item = line.replace(/^\s*-\s+/, "").trim();
      const arr = (data[currentListKey] as string[]) ?? [];
      arr.push(item.replace(/^["']|["']$/g, ""));
      data[currentListKey] = arr;
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    let value = kv[2].trim();
    currentListKey = null;
    if (value === "" || value === "[]") {
      data[key] = [];
      currentListKey = key;
      continue;
    }
    if (value === "true") {
      data[key] = true;
      continue;
    }
    if (value === "false") {
      data[key] = false;
      continue;
    }
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return { data, content };
}

function parsePost(path: string, raw: string): BlogPost | null {
  const slug = slugFromPath(path);
  if (slug.toLowerCase() === "readme") return null;

  const { data, content } = parseFrontmatter(raw);
  const title = String(data.title ?? slug);
  const description = String(data.description ?? "");
  const date = String(data.date ?? "");
  const author = String(data.author ?? "Semgraf");
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
  const draft = Boolean(data.draft);
  const html = marked.parse(content, { async: false }) as string;

  return {
    slug,
    title,
    description,
    date,
    author,
    tags,
    draft,
    content,
    html,
  };
}

function allPosts(): BlogPost[] {
  return Object.entries(files)
    .map(([path, raw]) => parsePost(path, raw))
    .filter((p): p is BlogPost => p != null)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Public index — excludes drafts. */
export function listPosts(): BlogPostMeta[] {
  return allPosts()
    .filter((p) => !p.draft)
    .map(({ html: _h, content: _c, ...meta }) => meta);
}

export function getPost(slug: string): BlogPost | undefined {
  return allPosts().find((p) => p.slug === slug && !p.draft);
}

export function formatPostDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
