import { describe, expect, it } from "vitest";
import { handleAriaAndDataProps, uuid } from "./utils";

describe.concurrent("handleAriaAndDataProps", () => {
  it("converts camelCase data props to kebab-case", () => {
    const input = { dataTestId: "foo", dataFooBar: "bar" };
    const output = handleAriaAndDataProps(input);
    expect(output).toEqual({ "data-test-id": "foo", "data-foo-bar": "bar" });
  });

  it("converts aria props to aria-*", () => {
    const input = { ariaLabel: "label", ariaHidden: true };
    const output = handleAriaAndDataProps(input);
    expect(output).toEqual({ "aria-label": "label", "aria-hidden": true });
  });

  it("leaves unrelated props unchanged", () => {
    const input = { className: "foo", id: "bar" };
    const output = handleAriaAndDataProps(input);
    expect(output).toEqual({ className: "foo", id: "bar" });
  });

  it("handles mixed props", () => {
    const input = {
      dataTestId: "foo",
      ariaLabel: "label",
      className: "bar",
    };
    const output = handleAriaAndDataProps(input);
    expect(output).toEqual({
      "data-test-id": "foo",
      "aria-label": "label",
      className: "bar",
    });
  });
});

describe.concurrent("uuid", () => {
  it("returns a string", () => {
    const id = uuid();
    expect(typeof id).toBe("string");
  });

  it("returns a unique value each time", () => {
    const id1 = uuid();
    const id2 = uuid();
    expect(id1).not.toBe(id2);
  });
});
