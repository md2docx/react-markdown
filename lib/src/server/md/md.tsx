import { FC, Fragment, HTMLProps, isValidElement, JSX, ReactNode } from "react";
import remarkParse from "remark-parse";
import remarkRehype, { type Options } from "remark-rehype";
import { PluggableList, unified } from "unified";
import { Root } from "mdast";
import { Element } from "hast";
import { handleAriaAndDataProps, uuid } from "./utils";

/**
 * Tags that are self-closing and must not contain children.
 */
const emptyHtmlTags = ["br", "hr", "img", "input"];

/**
 * Extended component props to support custom HTML components
 * and HAST Element reference.
 */
type ComponentProps = JSX.IntrinsicElements[keyof JSX.IntrinsicElements] & {
  node: Element;
};

/**
 * Props accepted by the main `<Md />` component for rendering Markdown.
 */
export interface MdProps extends HTMLProps<HTMLDivElement> {
  /**
   * Optional wrapper element. Defaults to `<div>` if additional props are passed, otherwise uses `Fragment`.
   */
  wrapper?: keyof JSX.IntrinsicElements;

  /**
   * Optional `remark` plugins used during markdown parsing.
   */
  remarkPlugins?: PluggableList;

  /**
   * Optional `rehype` plugins used during markdown-to-HTML conversion.
   */
  rehypePlugins?: PluggableList;

  /**
   * Options passed to `remark-rehype` for controlling transformation.
   */
  remarkRehypeOptions?: Options;

  /**
   * Optional reference to access the parsed MDAST tree.
   */
  mdastRef?: { current: Root };

  /**
   * Custom React components to override specific HTML tags.
   */
  components?: Partial<Record<keyof JSX.IntrinsicElements, FC<ComponentProps>>>;

  /**
   * If true, skips raw HTML rendering in markdown content.
   */
  skipHtml?: boolean;
}

/**
 * Renders a single HAST Element recursively as a React element,
 * supporting string HTML tags and optional component overrides.
 */
const El = ({
  node,
  components,
  skipHtml,
}: { node: Element } & Pick<MdProps, "components" | "skipHtml">) => {
  const { tagName, properties, children } = node;
  const cleanedProps = handleAriaAndDataProps(
    properties ?? {},
  ) as JSX.IntrinsicElements[keyof JSX.IntrinsicElements];

  const child = children.map(node =>
    node.type === "text" || (node.type === "raw" && !skipHtml)
      ? node.value.replace(/\n/g, "") || null
      : node.type === "element" && <El key={uuid()} {...{ node, components }} />,
  );

  if (!tagName) return child;

  const Component = components?.[tagName as keyof JSX.IntrinsicElements] ?? tagName;

  if (typeof Component === "string") {
    return emptyHtmlTags.includes(Component) ? (
      <Component {...cleanedProps} />
    ) : (
      <Component {...cleanedProps}>{child}</Component>
    );
  }

  return <Component {...{ ...cleanedProps, node }}>{child}</Component>;
};

interface MarkdownProps extends MdProps {
  /**
   * Raw markdown string to be parsed and rendered.
   */
  children: string;
}

/**
 * Internal component that parses markdown string into MDAST and HAST,
 * and renders it using the `El` recursive renderer.
 */
const Markdown = ({
  children,
  remarkPlugins = [],
  rehypePlugins = [],
  remarkRehypeOptions,
  mdastRef,
  components,
  skipHtml,
}: MarkdownProps) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkPlugins)
    .use(remarkRehype, {
      ...remarkRehypeOptions,
      allowDangerousHtml: !skipHtml,
    })
    .use(rehypePlugins);

  const mdast = processor.parse(children);
  if (mdastRef) mdastRef.current = mdast;
  const hast = processor.runSync(mdast);

  return (
    <El
      {...{
        components,
        skipHtml,
        node: {
          children: Array.isArray(hast) ? hast : hast.children,
        } as Element,
      }}
    />
  );
};

interface MarkdownRecursiveProps {
  children: ReactNode;
  props: Omit<MdProps, "wrapper">;
}

/**
 * Recursively traverses React children and injects markdown rendering
 * into string-based content, preserving JSX wrapper structure.
 */
const MarkdownRecursive = ({ children, props }: MarkdownRecursiveProps) => {
  if (typeof children === "string") return <Markdown {...props}>{children}</Markdown>;

  if (isValidElement(children)) {
    let { type: Tag, props: innerProps } = children;

    if (typeof Tag === "function") {
      // Evaluate factory-style functional components to unwrap structure
      // @ts-expect-error call signature not always inferable
      const jsx = Tag(innerProps);
      Tag = jsx.type;
      innerProps = jsx.props;
    }

    return (
      <Tag {...(innerProps as JSX.IntrinsicElements[keyof JSX.IntrinsicElements])} key={uuid()}>
        <MarkdownRecursive props={props}>
          {(innerProps as JSX.IntrinsicElements[keyof JSX.IntrinsicElements]).children}
        </MarkdownRecursive>
      </Tag>
    );
  }
  /* v8 ignore next 2 should never reach here, but in case */
  // Non-string, non-element nodes are returned as-is
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
  mdastRef,
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
          mdastRef,
          components,
          skipHtml,
        }}>
        {children}
      </MarkdownRecursive>
    </Wrapper>
  );
};
