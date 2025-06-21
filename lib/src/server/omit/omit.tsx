import { ComponentProps } from "../md";

/**
 * Props for the `Omit` component.
 * - Inherits standard component props including the HAST `node`.
 * - `noWarning`: Optional flag to suppress the console warning.
 */
export type OmitProps = ComponentProps & {
  noWarning?: boolean;
};

/**
 * A utility component that completely omits a disallowed element and all its content.
 * Useful for sanitizing output or strictly removing specific tags like `<script>`, `<iframe>`, etc.
 *
 * Example usage:
 * ```tsx
 * components: { script: Omit }
 * ```
 *
 * @remarks
 * Acts like `disallowedElements` (fully stripped). Use `noWarning` to suppress dev-time messages.
 */
export const Omit = ({ noWarning, node: { tagName } }: OmitProps) => {
  if (!noWarning) {
    console.warn(
      `The <${tagName}> element has been omitted along with its content. ` +
        `Use 'noWarning' to suppress this message.`,
    );
  }
  return null;
};
