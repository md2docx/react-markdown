import { FC, Fragment, HTMLProps, isValidElement, ReactNode } from "react";
import remarkParse from "remark-parse";
import remarkRehype, { type Options } from "remark-rehype";
import { PluggableList, unified } from "unified";
import { Root } from "mdast";
import { Element, Properties } from "hast";

const uuid = () => crypto.randomUUID();

const emptyHtmlTags: (string | FC<ComponentProps>)[] = ["br", "hr", "img", "input"];

type ComponentProps = HTMLProps<HTMLElement> &
  Properties & {
    node: Element;
  };

export interface MdProps extends HTMLProps<HTMLDivElement> {
  wrapper?: keyof HTMLElementTagNameMap;
  remarkPlugins?: PluggableList;
  rehypePlugins?: PluggableList;
  remarkRehypeOptions?: Options;
  mdastRef?: { current: Root };
  components?: Partial<Record<keyof HTMLElementTagNameMap, FC<ComponentProps>>>;
  skipHtml?: boolean;
}

const El = ({
  node,
  components,
  skipHtml,
}: { node: Element } & Pick<MdProps, "components" | "skipHtml">) => {
  const { tagName, properties, children } = node;
  const Component = components?.[tagName as keyof HTMLElementTagNameMap] ?? tagName ?? Fragment;
  const props = tagName
    ? typeof Component === "string"
      ? properties
      : { ...properties, node }
    : {};
  // @ts-expect-error -- props
  if (emptyHtmlTags.includes(Component)) return <Component {...props} />;
  return (
    // @ts-expect-error -- props
    <Component {...props}>
      {children.map(node =>
        node.type === "text" || (node.type === "raw" && !skipHtml)
          ? node.value
          : node.type === "element" && <El key={uuid()} {...{ node, components }} />,
      )}
    </Component>
  );
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
      // @ts-expect-error props is unknown
      <Tag {...props1} key={uuid()}>
        {/* @ts-expect-error props is unknown */}
        <MarkdownRecursive props={props}>{props1.children}</MarkdownRecursive>
      </Tag>
    );
  }
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
    <Wrapper {...props} data-testid="md">
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
