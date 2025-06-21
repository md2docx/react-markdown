import { FC, Fragment, HTMLProps, isValidElement, JSX, ReactNode } from "react";
import remarkParse from "remark-parse";
import remarkRehype, { type Options } from "remark-rehype";
import { PluggableList, unified } from "unified";
import { Root } from "mdast";
import { Element } from "hast";
import { handleAriaAndDataProps, uuid } from "./utils";

const emptyHtmlTags = ["br", "hr", "img", "input"];

type ComponentProps = JSX.IntrinsicElements[keyof JSX.IntrinsicElements] & {
  node: Element;
};

export interface MdProps extends HTMLProps<HTMLDivElement> {
  wrapper?: keyof JSX.IntrinsicElements;
  remarkPlugins?: PluggableList;
  rehypePlugins?: PluggableList;
  remarkRehypeOptions?: Options;
  mdastRef?: { current: Root };
  components?: Partial<Record<keyof JSX.IntrinsicElements, FC<ComponentProps>>>;
  skipHtml?: boolean;
}

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
  children: string;
}

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
    .use(remarkRehype, { ...remarkRehypeOptions, allowDangerousHtml: !skipHtml })
    .use(rehypePlugins);
  const mdast = processor.parse(children);
  if (mdastRef) mdastRef.current = mdast;
  const hast = processor.runSync(mdast);
  console.log({ hast });
  return (
    // @ts-expect-error -- unclean shortcut
    <El
      {...{ components, skipHtml, node: { children: Array.isArray(hast) ? hast : hast.children } }}
    />
  );
};

interface MarkdownRecursiveProps {
  children: ReactNode;
  props: Omit<MdProps, "wrapper">;
}
const MarkdownRecursive = ({ children, props }: MarkdownRecursiveProps) => {
  if (typeof children === "string") return <Markdown {...props}>{children}</Markdown>;
  if (isValidElement(children)) {
    let { type: Tag, props: props1 } = children;
    if (Tag instanceof Function) {
      // @ts-expect-error Tag has no call signature
      const jsx = Tag(props1);
      Tag = jsx.type;
      props1 = jsx.props;
    }
    return (
      <Tag {...(props1 as JSX.IntrinsicElements[keyof JSX.IntrinsicElements])} key={uuid()}>
        <MarkdownRecursive props={props}>
          {(props1 as JSX.IntrinsicElements[keyof JSX.IntrinsicElements]).children}
        </MarkdownRecursive>
      </Tag>
    );
  }
  /* v8 ignore next 2 should never reach here, but in case */
  return children;
};

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
    // @ts-expect-error -- complex props
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
