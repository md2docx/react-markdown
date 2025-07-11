---
title: Transform Markdown to DOCX
author: Mayank Chaudhari
---

# mdast2docx Tutorial

Welcome to the full guide. We’ll walk through:

- 📦 Installing `@m2d/core`
- 🔌 Using `remark` and `rehype` plugins
- 🧠 Exporting structured MDAST/HAST
- 📄 Generating `.docx` from markdown

## Step 1: Install Dependencies

```bash
npm i @m2d/core remark remark-gfm remark-math
```

## Step 2: Setup Processor

```ts
import { unified } from "unified";
import parse from "remark-parse";
import remark2rehype from "remark-rehype";
import stringify from "rehype-stringify";

const processor = unified()
  .use(parse)
  .use(remark2rehype)
  .use(stringify);
```

## Example Table

| Feature    | Status |
|------------|--------|
| DOCX       | ✅     |
| Math       | ✅     |
| Mermaid    | 🧪     |

> Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare  
> Hare Rama, Hare Rama, Rama Rama, Hare Hare

### Deep Nesting

> A quote  
> > Nested quote  
> > > Even deeper

## Conclusion

Join [dev.to/mayank1513](https://dev.to/mayank1513) for more tutorials.
