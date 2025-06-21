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
}

const El = ({ node, components }: { node: Element } & Pick<MdProps, "components">) => {
  const { tagName, properties, children } = node;
  const Component = components?.[tagName as keyof HTMLElementTagNameMap] ?? tagName;
  const props = typeof Component === "string" ? properties : { ...properties, node };
  // @ts-expect-error -- props
  if (emptyHtmlTags.includes(Component)) return <Component {...props} />;
  return (
    // @ts-expect-error -- props
    <Component {...props}>
      {children.map(node =>
        node.type === "text"
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
}: MarkdownProps) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkPlugins)
    .use(remarkRehype, remarkRehypeOptions)
    .use(rehypePlugins);
  const mdast = processor.parse(children);
  if (mdastRef) mdastRef.current = mdast;
  const hast = processor.runSync(mdast);
  return (Array.isArray(hast) ? hast : hast.children).map(node =>
    node.type === "text" ? node.value : <El key={uuid()} {...{ node, components }} />,
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
  remarkRehypeOptions: rehypeOptions,
  mdastRef,
  components,
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
          remarkRehypeOptions: rehypeOptions,
          mdastRef,
          components,
        }}>
        {children}
      </MarkdownRecursive>
    </Wrapper>
  );
};
