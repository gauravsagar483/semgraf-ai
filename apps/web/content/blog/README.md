# Blog posts

Add a Markdown file here for each post.

## Frontmatter

```yaml
---
title: Post title
description: One-line summary for the index card
date: YYYY-MM-DD
author: Semgraf
tags:
  - product
draft: false
---
```

- Filename becomes the URL slug: `my-post.md` → `/blog/my-post`
- Set `draft: true` to hide from the public index (still buildable if linked)
- Body = Markdown

Restart `pnpm dev` after adding files if glob cache is stale.
