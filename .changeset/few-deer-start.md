---
"@m2d/react-markdown": minor
---

---

## "@m2d/react-markdown": minor

Add client-side `<Md />` component and refactor core utilities.

- **Client-side `<Md />` component**:

  - New entrypoints `@m2d/react-markdown/client` and `@m2d/react-markdown/dist/client` for a memoized, client-optimized Markdown renderer.
  - Supports full JSX children, SSR-safe, and dynamic reactivity.

- **Refactor core utilities**:

  - Move all shared types and helpers (e.g., `ComponentProps`, `AstRef`, `Markdown`, `uuid`, etc.) to `lib/src/utils.tsx`.
  - Remove duplicated code and unify server/client logic.

- **Testing**:

  - Add comprehensive tests for the client `<Md />` component.

- **Package exports**:

  - Update `lib/package.json` to expose new client entrypoints and dependencies.

- **Other**:
  - Update coverage exclusions in `vitest.config.mts`.
  - Minor internal cleanups and improved type safety.

---

This release introduces a modern, SSR-safe, and client-optimized Markdown renderer with unified logic and improved maintainability.
