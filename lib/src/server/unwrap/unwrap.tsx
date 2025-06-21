import { ComponentProps } from "../md";

/**
 * Props for the `Unwrap` component.
 * - Inherits standard component props including the HAST `node`.
 * - `noWarning`: Optional flag to suppress console warnings.
 */
export type UnwrapProps = ComponentProps & {
  noWarning?: boolean;
};

/**
 * A utility component that unwraps and renders children without their HTML tag.
 * Useful for excluding specific tags like `<em>`, `<u>`, etc., while preserving content.
 *
 * Example usage:
 * ```tsx
 * components: { em: Unwrap }
 * ```
 *
 * @remarks
 * Acts like `disallowedElements + unwrapDisallowed` in other libraries.
 * Use `noWarning` to suppress dev-time warnings for expected unwrapping.
 */
export const Unwrap = ({ children, noWarning, node: { tagName } }: UnwrapProps) => {
  if (!noWarning) {
    console.warn(
      `The <${tagName}> element has been unwrapped. Only its children will be rendered; all attributes are ignored. ` +
        `Use 'noWarning' to suppress this message.`,
    );
  }
  return children;
};
