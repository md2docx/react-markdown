import { IntrinsicProps, Markdown, MdProps } from "../../utils";
import { isValidElement, ReactNode, Fragment, JSX } from "react";

interface MarkdownRecursiveProps {
  children: ReactNode;
  markdownProps: Omit<MdProps, "wrapper">;
}

/**
 * Recursively traverses React children and injects markdown rendering
 * into string-based content, preserving JSX wrapper structure.
 */
export const MarkdownRecursive = ({ children, markdownProps }: MarkdownRecursiveProps) => {
  if (typeof children === "string") return <Markdown {...markdownProps}>{children}</Markdown>;

  if (isValidElement(children)) {
    const Tag = children.type;
    const innerProps = children.props as IntrinsicProps;

    return (
      <Tag {...(innerProps as IntrinsicProps)}>
        <MarkdownRecursive markdownProps={markdownProps}>
          {(innerProps as IntrinsicProps).children}
        </MarkdownRecursive>
      </Tag>
    );
  }
  // Non-string, non-element nodes are returned as-is
  /* v8 ignore next 2 should never reach here, but in case */
  return children;
};

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
        markdownProps={{
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
