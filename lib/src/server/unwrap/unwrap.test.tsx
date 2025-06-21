import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Unwrap } from "./unwrap";
import { Element } from "hast";

const testNode = { tagName: "em", type: "element", children: [], properties: {} } as Element;

describe.concurrent("unwrap", () => {
  afterEach(cleanup);

  test("renders children without warning when noWarning is true", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <Unwrap node={testNode} noWarning>
        <span data-testid="child">Hello</span>
      </Unwrap>,
    );
    expect(screen.getByTestId("child").textContent).toBe("Hello");
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test("renders children and logs warning when noWarning is false", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <Unwrap node={testNode}>
        <span data-testid="child-1">World</span>
      </Unwrap>,
    );
    expect(screen.getByTestId("child-1").textContent).toBe("World");
    expect(warnSpy).toHaveBeenCalledWith("em is unwrapped. Ignoring related props as well.");
    warnSpy.mockRestore();
  });

  test("renders multiple children", () => {
    render(
      <Unwrap node={testNode} noWarning>
        <span data-testid="child1">A</span>
        <span data-testid="child2">B</span>
      </Unwrap>,
    );
    expect(screen.getByTestId("child1").textContent).toBe("A");
    expect(screen.getByTestId("child2").textContent).toBe("B");
  });
});
