import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Md } from "./md";
import md from "../../../../sample.md?raw";
import { uuid } from "../../utils";

describe.concurrent("Md", () => {
  afterEach(cleanup);

  test("renders without errors and applies className", ({ expect }) => {
    const clx = "my-class";
    const testId = "md-root";
    render(
      <Md data-testid={testId} className={clx}>
        {md}
      </Md>,
    );
    expect(screen.getByTestId(testId).classList).toContain(clx);
  });

  test("renders markdown content as HTML", ({ expect }) => {
    const testId = "md-root-1";
    render(<Md data-testid={testId}>**bold** _italic_</Md>);
    const md = screen.getByTestId(testId);
    expect(md.innerHTML).toContain("<strong>");
    expect(md.innerHTML).toContain("<em>");
  });

  test("renders with custom wrapper", ({ expect }) => {
    const testId = "md-root-2";
    render(
      <Md data-testid={testId} wrapper="section">
        Hello
      </Md>,
    );
    const md = screen.getByTestId(testId);
    expect(md.tagName.toLowerCase()).toBe("section");
    expect(md.textContent).toBe("Hello");
  });

  test("renders with custom component for tag", ({ expect }) => {
    const testId = "md-root-3";
    const CustomP = ({ children }: any) => <p data-testid="custom-p">{children}</p>;
    render(<Md data-testid={testId} components={{ p: CustomP }}>{`Hello **World**`}</Md>);
    expect(screen.getByTestId("custom-p").textContent).toBe("Hello World");
  });

  test("skips HTML when skipHtml is true", ({ expect }) => {
    const testId = "md-root-4";
    render(<Md data-testid={testId} skipHtml>{`<b>raw</b> test`}</Md>);
    const md = screen.getByTestId(testId);
    expect(md.innerHTML).not.toContain("<b>");
    expect(md.textContent).toContain("raw test");
  });

  test("skipHtml", ({ expect }) => {
    const testId = "md-" + uuid();
    render(<Md data-testid={testId} skipHtml>{`Hello **world**\n\n<div>Something here</div>`}</Md>);
    expect(screen.getByTestId(testId).textContent).toBe("Hello world");
  });

  test("passes mdastRef with parsed mdast", ({ expect }) => {
    const testId = "md-root-" + crypto.randomUUID();
    const ref = { current: null as any };
    render(
      <Md data-testid={testId} astRef={ref}>
        # Title
      </Md>,
    );
    expect(ref.current).toBeTruthy();
    expect(ref.current[0].mdast.type).toBe("root");
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
      <Md data-testid={testId} remarkPlugins={[plugin]}>
        test
      </Md>,
    );
    const md = screen.getByTestId(testId);
    expect(md.textContent).toContain("plugin!");
  });
});
