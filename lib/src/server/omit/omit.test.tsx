import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Omit } from "./omit";
import { Element } from "hast";

const testNode = { tagName: "em", type: "element", children: [], properties: {} } as Element;

describe.concurrent("unwrap", () => {
  afterEach(cleanup);

  test("renders children without warning when noWarning is true", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <Omit node={testNode} noWarning>
        <span data-testid="child">Hello</span>
      </Omit>,
    );
    expect(screen.queryByTestId("child")).toBeFalsy();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test("renders children and logs warning when noWarning is false", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <Omit node={testNode}>
        <span data-testid="child-1">World</span>
      </Omit>,
    );
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
