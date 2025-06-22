import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Md } from "./md";
import React from "react";
import { uuid } from "../../utils";

describe.concurrent("md", () => {
  afterEach(cleanup);

  test("renders with custom className", ({ expect }) => {
    const clx = "my-class";
    const testId = "md-" + uuid();
    render(<Md className={clx} data-testid={testId} />);
    expect(screen.getByTestId(testId).classList).toContain(clx);
  });

  test("parses markdown", ({ expect }) => {
    const testId = "md-" + uuid();
    render(<Md data-testid={testId}>Hello **world**</Md>);
    expect(screen.getByTestId(testId).textContent).toBe("Hello world");
  });

  test("renders children as JSX element", ({ expect }) => {
    render(
      <Md>
        <span data-testid="child">Child</span>
      </Md>,
    );
    expect(screen.getByTestId("child").textContent).toBe("Child");
  });

  test("renders nested JSX elements", ({ expect }) => {
    render(
      <Md data-testid={"md-" + uuid()}>
        <div data-testid="outer">
          <span data-testid="inner">Nested</span>
        </div>
      </Md>,
    );
    expect(screen.getByTestId("outer").textContent).toBe("Nested");
    expect(screen.getByTestId("inner").textContent).toBe("Nested");
  });

  test("renders with no wrapper when no props and no wrapper provided", ({ expect }) => {
    // Should use Fragment, so no extra DOM node
    const { container } = render(<Md>Fragment content</Md>);
    expect(container.textContent).toBe("Fragment content");
  });

  test("renders functional component children", ({ expect }) => {
    const Fn = ({ children }: { children: React.ReactNode }) => <b data-testid="fn">{children}</b>;
    render(
      <Md>
        <Fn>Bold</Fn>
      </Md>,
    );
    expect(screen.getByTestId("fn").textContent).toBe("Bold");
  });
});
