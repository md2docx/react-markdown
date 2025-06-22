import { Fragment } from "react/jsx-runtime";
import { IntrinsicProps, Markdown, MdProps } from "../../utils";
import { isValidElement, memo, ReactNode } from "react";
import equal from "fast-deep-equal";

const OptimizedMarkdown = memo(Markdown, equal);

interface MarkdownRecursiveProps {
  children: ReactNode;
  markdownProps: Omit<MdProps, "wrapper">;
}

/**
 * Recursively traverses React children and injects markdown rendering
 * into string-based content, preserving JSX wrapper structure.
 */
const MarkdownRecursive = ({ children, markdownProps }: MarkdownRecursiveProps) => {
  if (typeof children === "string")
    return <OptimizedMarkdown {...markdownProps}>{children}</OptimizedMarkdown>;

  if (isValidElement(children)) {
    const { type: Tag, props: innerProps } = children;

    return (
      <Tag {...(innerProps as IntrinsicProps)}>
        <MarkdownRecursive {...{ markdownProps }}>
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
    // @ts-expect-error – dynamic wrapper ('div' | Fragment) is type-safe at runtime but not inferable statically
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
