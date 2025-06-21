# MDX Renderer [@m2d/react-markdown] <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/md2docx/react-markdown/actions/workflows/test.yml/badge.svg)](https://github.com/md2docx/react-markdown/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/aa896ec14c570f3bb274/maintainability)](https://codeclimate.com/github/md2docx/react-markdown/maintainability) [![codecov](https://codecov.io/gh/md2docx/react-markdown/graph/badge.svg)](https://codecov.io/gh/md2docx/react-markdown) [![Version](https://img.shields.io/npm/v/@m2d/react-markdown.svg?colorB=green)](https://www.npmjs.com/package/@m2d/react-markdown) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@m2d/react-markdown.svg)](https://www.npmjs.com/package/@m2d/react-markdown) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@m2d/react-markdown) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

> ✨ A modern, JSX-compatible, SSR-ready Markdown renderer for React — with full access to MDAST & HAST trees for tools like `mdast2docx`.

---

## 🔥 Why mdx-render?

`mdx-render` goes beyond traditional React Markdown libraries by focusing on:

- ✅ **Server-side rendering (SSR)** without hooks
- ✅ **Full JSX children support** (not just strings)
- ✅ **Access to raw MDAST & HAST trees**
- ✅ **Drop-in plugin support** via Unified (`remark`, `rehype`, etc.)
- ✅ **Custom component overrides** per tag
- ✅ **Integration with tools like [`mdast2docx`](https://github.com/md2docx/mdast2docx)**

---

## 🚀 Installation

```bash
pnpm add @m2d/react-markdown
```

**_or_**

```bash
npm install @m2d/react-markdown
```

**_or_**

```bash
yarn add @m2d/react-markdown
```

---

## ⚡ Quick Example

```tsx
import { Md } from "mdx-render";
import { toDocx } from "mdast2docx";
import { useRef } from "react";

const astRef = useRef([]);

export default function Page() {
  return (
    <>
      <Md astRef={astRef}>{`# Hello\n\nThis is **Markdown**.`}</Md>
      <button
        onClick={() => {
          const doc = toDocx(astRef.current[0].mdast);
          // Export DOCX, or save
        }}>
        Export to DOCX
      </button>
    </>
  );
}
```

---

## 🧠 JSX-Aware Parsing

Unlike other libraries, this renderer supports **JSX as children**, which means you can nest Markdown inside arbitrary components:

```tsx
<Md>
  <section>{`# Title\n\nContent.`}</section>
</Md>
```

> Note: `astRef.current` is an array — one entry per Markdown segment.
> Each entry contains `{ mdast, hast }` for fine-grained control.

---

## ✨ Component Overrides

Override default HTML rendering with your own components:

```tsx
<Md
  components={{
		code: (props) => <CodeWithHighlights {...props} />
    em: Unwrap, // Renders <em> content without tags
    blockquote: Omit, // Removes <blockquote> completely
  }}>
  {`*This will be unwrapped*\n\n> This will be removed!`}
</Md>
```

Use the built-in helpers:

- `Unwrap` – renders children, ignores tag & props.
- `Omit` – removes the element and its content entirely.

---

## 🧩 Plugin Support

Use any `remark` or `rehype` plugins with full flexibility:

```tsx
<Md remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}>
  {markdown}
</Md>
```

---

## 📦 astRef: MDAST + HAST Access

```ts
type astRef = {
  current: { mdast: Root; hast: HastRoot }[];
};
```

Each markdown block is processed independently to allow full JSX flexibility.
You can access all parsed trees via `astRef.current`, ideal for:

- DOCX/PDF generation (`mdast2docx`)
- Markdown linting or analytics
- AST-aware transformations

---

## 🧭 Roadmap

- [ ] 🔄 Merge surrounding JSX + `<Md>` blocks into unified MDAST/HAST
- [ ] 🧪 Add test utilities for structural validation
- [x] 📚 Provide Next.js examples with DOCX export

---

## 📘 Related Projects

- [mdast2docx](https://github.com/md2docx/mdast2docx) – Convert MDAST to Word (.docx)
- [unifiedjs](https://unifiedjs.com/) – Syntax tree processing toolkit
- [react-markdown](https://github.com/remarkjs/react-markdown) – A simpler but less flexible Markdown renderer

---

## License

This library is licensed under the MPL-2.0 open-source license.

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Please enroll in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor](https://github.com/sponsors/mayank1513) our work.

---

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
