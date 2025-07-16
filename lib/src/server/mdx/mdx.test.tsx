import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Mdx } from "./mdx";
import md from "../../../../sample.md?raw";
import { uuid } from "../../utils";

describe.concurrent("Md", () => {
  afterEach(cleanup);

  test("renders without errors and applies className", ({ expect }) => {
    const clx = "my-class";
    const testId = "md-root";
    render(
      <Mdx data-testid={testId} className={clx}>
        {md}
      </Mdx>,
    );
    expect(screen.getByTestId(testId).classList).toContain(clx);
  });

  test("renders markdown content as HTML", ({ expect }) => {
    const testId = "md-root-1";
    render(<Mdx data-testid={testId}>**bold** _italic_</Mdx>);
    const md = screen.getByTestId(testId);
    expect(md.innerHTML).toContain("<strong>");
    expect(md.innerHTML).toContain("<em>");
  });

  test("renders with custom wrapper", ({ expect }) => {
    const testId = "md-root-2";
    render(
      <Mdx data-testid={testId} wrapper="section">
        Hello
      </Mdx>,
    );
    const md = screen.getByTestId(testId);
    expect(md.tagName.toLowerCase()).toBe("section");
    expect(md.textContent).toBe("Hello");
  });

  test("renders with custom component for tag", ({ expect }) => {
    const testId = "md-root-3";
    const CustomP = ({ children }: any) => <p data-testid="custom-p">{children}</p>;
    render(<Mdx data-testid={testId} components={{ p: CustomP }}>{`Hello **World**`}</Mdx>);
    expect(screen.getByTestId("custom-p").textContent).toBe("Hello World");
  });

  test("skips HTML when skipHtml is true", ({ expect }) => {
    const testId = "md-root-4";
    render(<Mdx data-testid={testId} skipHtml>{`<b>raw</b> test`}</Mdx>);
    const md = screen.getByTestId(testId);
    expect(md.innerHTML).not.toContain("<b>");
    expect(md.textContent).toContain("raw test");
  });

  test("skipHtml", ({ expect }) => {
    const testId = "md-" + uuid();
    render(
      <Mdx data-testid={testId} skipHtml>{`Hello **world**\n\n<div>Something here</div>`}</Mdx>,
    );
    expect(screen.getByTestId(testId).textContent).toBe("Hello world");
  });

  test("passes mdastRef with parsed mdast", ({ expect }) => {
    const testId = "md-root-" + crypto.randomUUID();
    const ref = { current: null as any };
    render(
      <Mdx data-testid={testId} astRef={ref}>
        # Title
      </Mdx>,
    );
    expect(ref.current).toBeTruthy();
    expect(ref.current[0].mdast.type).toBe("root");
  });

  test("renders nested React elements with MarkdownRecursive", ({ expect }) => {
    const testId = "md-root-" + crypto.randomUUID();
    render(
      <Mdx data-testid={testId}>
        <div>
          <span>**Hare** </span>
        </div>
        <div>
          <span>**Krishna**</span>
        </div>
      </Mdx>,
    );
    const md = screen.getByTestId(testId);
    expect(md?.textContent).toBe("HareKrishna");
  });

  test("supports remarkPlugins and rehypePlugins", async ({ expect }) => {
    const testId = "md-root-" + crypto.randomUUID();
    const plugin = () => (tree: any) => {
      tree.children.push({
        type: "paragraph",
        children: [{ type: "text", value: "plugin!" }],
      });
    };
    render(
      <Mdx data-testid={testId} remarkPlugins={[plugin]}>
        test
      </Mdx>,
    );
    const md = screen.getByTestId(testId);
    expect(md.textContent).toContain("plugin!");
  });

  test("Handle children tree containing custom components", ({ expect }) => {
    const testId = "md-root-" + crypto.randomUUID();
    const CustomComponent = ({ children }: any) => <div>{children}</div>;
    render(
      <Mdx data-testid={testId}>
        <CustomComponent>
          <code>test</code>
        </CustomComponent>
      </Mdx>,
    );
    const md = screen.getByTestId(testId);
    expect(md.querySelector("code")?.textContent).toBe("test");
  });
});
