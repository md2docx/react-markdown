import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Md } from "./md";

describe.concurrent("md", () => {
	afterEach(cleanup);

	test("Dummy test - test if renders without errors", ({ expect }) => {
		const clx = "my-class";
		render(<Md className={clx} />);
		expect(screen.getByTestId("md").classList).toContain(clx);
	});
});
