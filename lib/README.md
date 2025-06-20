# React Markdown <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/md2docx/react-markdown/actions/workflows/test.yml/badge.svg)](https://github.com/md2docx/react-markdown/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/aa896ec14c570f3bb274/maintainability)](https://codeclimate.com/github/md2docx/react-markdown/maintainability) [![codecov](https://codecov.io/gh/md2docx/react-markdown/graph/badge.svg)](https://codecov.io/gh/md2docx/react-markdown) [![Version](https://img.shields.io/npm/v/@m2d/react-markdown.svg?colorB=green)](https://www.npmjs.com/package/@m2d/react-markdown) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@m2d/react-markdown.svg)](https://www.npmjs.com/package/@m2d/react-markdown) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@m2d/react-markdown) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

React Markdown is a comprehensive library designed to unlock the full potential of React 18 server components. It provides customizable loading animation components and a fullscreen loader container, seamlessly integrating with React and Next.js.

✅ Fully Treeshakable (import from `@m2d/react-markdown/client/loader-container`)

✅ Fully TypeScript Supported

✅ Leverages the power of React 18 Server components

✅ Compatible with all React 18 build systems/tools/frameworks

✅ Documented with [Typedoc](https://md2docx.github.io/react-markdown) ([Docs](https://md2docx.github.io/react-markdown))

✅ Examples for Next.js, and Vite

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Star [this repository](https://github.com/md2docx/react-markdown) and share it with your friends.

## Getting Started

### Installation

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

## Want Lite Version? [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@m2d/react-markdown-lite)](https://www.npmjs.com/package/@m2d/react-markdown-lite) [![Version](https://img.shields.io/npm/v/@m2d/react-markdown-lite.svg?colorB=green)](https://www.npmjs.com/package/@m2d/react-markdown-lite) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@m2d/react-markdown-lite.svg)](https://www.npmjs.com/package/@m2d/react-markdown-lite)

```bash
pnpm add @m2d/react-markdown-lite
```

**or**

```bash
npm install @m2d/react-markdown-lite
```

**or**

```bash
yarn add @m2d/react-markdown-lite
```

> You need `r18gs` as a peer-dependency

### Import Styles

You can import styles globally or within specific components.

```css
/* globals.css */
@import "@m2d/react-markdown/dist";
```

```tsx
// layout.tsx
import "@m2d/react-markdown/dist/index.css";
```

For selective imports:

```css
/* globals.css */
@import "@m2d/react-markdown/dist/client"; /** required if you are using LoaderContainer */
@import "@m2d/react-markdown/dist/server/bars/bars1";
```

### Usage

Using loaders is straightforward.

```tsx
import { Bars1 } from "@m2d/react-markdown/dist/server/bars/bars1";

export default function MyComponent() {
  return someCondition ? <Bars1 /> : <>Something else...</>;
}
```

For detailed API and options, refer to [the API documentation](https://md2docx.github.io/react-markdown).

**Using LoaderContainer**

`LoaderContainer` is a fullscreen component. You can add this component directly in your layout and then use `useLoader` hook to toggle its visibility.

```tsx
// layout.tsx
<LoaderContainer />
	 ...
```

```tsx
// some other page or component
import { useLoader } from "@m2d/react-markdown/dist/hooks";

export default MyComponent() {
	const { setLoading } = useLoader();
	useCallback(()=>{
		setLoading(true);
		...do some work
		setLoading(false);
	}, [])
	...
}
```

## License

This library is licensed under the MPL-2.0 open-source license.



> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Please enroll in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
