# @m2d/react-markdown

## 1.0.0

### Major Changes

- 344c4d2: Default Md now accepts only string children. For Mdx we are exposing another component from server/mdx.

## 0.3.0

### Minor Changes

- fbc66a3: refactor: update imports and enhance Markdown component for faster JSX runtime support

### Patch Changes

- 160322a: enhance MarkdownRecursive to handle array of children with unique keys

## 0.2.1

### Patch Changes

- 6fa6b46: fix: Add ./utils to exports.

## 0.2.0

### Minor Changes

- e1d4106: Add client-side `<Md />` component and refactor core utilities.

  - **Client-side `<Md />` component**:

    - New entrypoints `@m2d/react-markdown/client` and `@m2d/react-markdown/dist/client` for a memoized, client-optimized Markdown renderer.
    - uses memoization for client side optimizations
    - Supports full JSX children, SSR-safe, and dynamic and optimized reactivity.

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

  ***

  This release introduces a modern, SSR-safe, and client-optimized Markdown renderer with unified logic and improved maintainability.

## 0.1.1

### Patch Changes

- a196614: Update readme

## 0.1.0

### Minor Changes

- 689e225: 🧪 Add test utilities for structural validation
