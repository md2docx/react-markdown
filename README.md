# MDX Renderer [`@m2d/react-markdown`] <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/md2docx/react-markdown/actions/workflows/test.yml/badge.svg)](https://github.com/md2docx/react-markdown/actions/workflows/test.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/aa896ec14c570f3bb274/maintainability)](https://codeclimate.com/github/md2docx/react-markdown/maintainability)
[![codecov](https://codecov.io/gh/md2docx/react-markdown/graph/badge.svg)](https://codecov.io/gh/md2docx/react-markdown)
[![Version](https://img.shields.io/npm/v/@m2d/react-markdown.svg?colorB=green)](https://www.npmjs.com/package/@m2d/react-markdown)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@m2d/react-markdown.svg)](https://www.npmjs.com/package/@m2d/react-markdown)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@m2d/react-markdown)

> ✨ A modern, SSR-compatible Markdown renderer for React with full MDAST/HAST access — built for **customization**, **performance**, and **document generation** - **docx/pdf**.

---

## 🔥 Why `@m2d/react-markdown`?

`@m2d/react-markdown` goes beyond traditional React Markdown libraries by focusing on:

- ✅ **Server-side rendering (SSR)** without hooks
- ✅ **Full JSX children support** (not just strings)
- ✅ **Access to raw MDAST & HAST trees**
- ✅ **Drop-in plugin support** via Unified (`remark`, `rehype`, etc.)
- ✅ **Custom component overrides** per tag
- ✅ **Integration with tools like [`mdast2docx`](https://github.com/md2docx/mdast2docx)**

Compared to `react-markdown`, this library offers:

| Feature                                | `@m2d/react-markdown` ✅ | `react-markdown` ❌ |
| -------------------------------------- | ------------------------ | ------------------- |
| Full JSX support (not just strings)    | ✅                       | ❌                  |
| SSR-safe (no hooks)                    | ✅                       | ✅                  |
| Client Side component with memoization | ✅                       | ❌                  |
| MDAST + HAST access via `astRef`       | ✅                       | ❌                  |
| Component-level overrides              | ✅                       | ✅                  |
| Unified plugin support                 | ✅                       | ✅                  |
| Tiny bundle (minzipped)                | **~35 kB**               | ~45 kB              |
| Built-in DOCX-friendly AST output      | ✅                       | ❌                  |

---

## 📦 Installation

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

## 🚀 Server vs Client

By default, this package is SSR-safe and has **no client-specific hooks**.

### ✅ Server (default):

```tsx
import { Md } from "@m2d/react-markdown";
```

### 🔁 Client (for dynamic reactivity/memoization):

```tsx
import { Md } from "@m2d/react-markdown/client";
```

This version supports client-side behavior with memoization and dynamic JSX rendering.

---

## ⚡ Example: Rendering + Exporting DOCX

```tsx
import { Md } from "@m2d/react-markdown/client";
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
          // Save or download doc
        }}>
        Export to DOCX
      </button>
    </>
  );
}
```

> Note for Server Component use you can replace useRef with custom ref object `const astRef = {current: undefined} as AstRef`

---

## 🧠 JSX-Aware Parsing

Unlike most markdown renderers, `@m2d/react-markdown` supports **arbitrary JSX as children**:

```tsx
<Md>
  <article>{"# Markdown Heading\n\nSome **rich** content."}</article>
</Md>
```

> `astRef.current` is an array — one per Markdown string — each with `{ mdast, hast }`.

---

## 🎨 Component Overrides

```tsx
import { Md } from "@m2d/react-markdown";
import { Unwrap, Omit } from "@m2d/react-markdown/server";

<Md
  components={{
    em: Unwrap,
    blockquote: Omit,
    code: props => <CodeBlock {...props} />,
  }}>
  {`*em is unwrapped*\n\n> blockquote is removed`}
</Md>;
```

Use the built-in helpers:

- `Unwrap` – renders only children
- `Omit` – removes element and content entirely
- `CodeBlock` - it is your custom component

---

## 🔌 Plugin Support (Unified)

Use any `remark` or `rehype` plugin:

```tsx
<Md remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}>
  {markdown}
</Md>
```

---

## 📂 Accessing MDAST + HAST

```ts
type astRef = {
  current: { mdast: Root; hast: HastRoot }[];
};
```

Useful for:

- 📄 DOCX export (`mdast2docx`)
- 🧪 AST testing or analysis
- 🛠️ Custom tree manipulation

---

## 🧭 Roadmap

- [ ] 🔄 Merge JSX + `<Md>` segments into unified AST
- [x] 🧪 Structural test utilities
- [x] 🧑‍🏫 Next.js + DOCX example

---

## 🌍 Related Projects

- [`mdast2docx`](https://github.com/md2docx/mdast2docx) – Convert MDAST → `.docx`
- [`unified`](https://unifiedjs.com/) – Syntax tree ecosystem
- [`react-markdown`](https://github.com/remarkjs/react-markdown) – Popular alternative (less customizable)

---

## 🙏 Acknowledgements

We are deeply grateful to the open-source community whose work made this project possible.

- 🌱 **[react-markdown](https://github.com/remarkjs/react-markdown)** – For pioneering a React-based Markdown renderer. This library builds on its ideas while extending flexibility and SSR-readiness.
- 🛠 **[unified](https://github.com/unifiedjs/unified)** – The brilliant engine powering our markdown-to-AST transformations.
- ✨ **[remark](https://github.com/remarkjs/remark)** and **[rehype](https://github.com/rehypejs/rehype)** – For their modular ecosystems that make parsing and rendering delightful.
- 🧾 **[mdast2docx](https://github.com/md2docx/mdast2docx)** – Our sister project that inspired the MDAST-first architecture of this library.

> 💖 To the maintainers, contributors, and communities behind these projects — thank you for your generosity, vision, and dedication to making the web better for everyone.

---

## 📘 License

Licensed under the [MPL-2.0](https://www.mozilla.org/en-US/MPL/2.0/).

> 💡 Want to support this project? [Sponsor](https://github.com/sponsors/mayank1513) or check out our [courses](https://mayank-chaudhari.vercel.app/courses)!

---

<p align="center" style="text-align:center">Built with ❤️ by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
