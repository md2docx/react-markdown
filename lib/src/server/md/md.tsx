import { Fragment } from "react/jsx-runtime";
import { MarkdownRecursive, MdProps, uuid } from "../../utils";

/**
 * The Markdown renderer component.
 * Provides a safe, SSR-compatible way to render markdown with support for:
 * - Custom wrappers
 * - Plugin pipelines (remark + rehype)
 * - Component overrides
 * - Optional raw HTML stripping
 */
export const Md = ({
  children,
  wrapper,
  remarkPlugins,
  rehypePlugins,
  remarkRehypeOptions,
  astRef,
  components,
  skipHtml,
  ...props
}: MdProps) => {
  const Wrapper = wrapper ?? (Object.keys(props).length ? "div" : Fragment);

  return (
    // @ts-expect-error - props are valid for HTML elements but cannot be statically inferred on Fragment
    <Wrapper {...props}>
      <MarkdownRecursive
        key={uuid()}
        props={{
          remarkPlugins,
          rehypePlugins,
          remarkRehypeOptions,
          astRef,
          components,
          skipHtml,
        }}>
        {children}
      </MarkdownRecursive>
    </Wrapper>
  );
};
