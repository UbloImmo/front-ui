import { expect, mock } from "bun:test";

import { Hypertext } from "./Hypertext.component";
import { HypertextProps } from "./Hypertext.types";

import { testComponentFactory } from "@/tests";

testComponentFactory<HypertextProps>("Hypertext", Hypertext, {
  props: Hypertext.defaultProps,
  tests: [
    {
      name: "should render",
      test: ({ queryByTestId }) => {
        expect(queryByTestId("hypertext")).toBeDefined();
      },
    },
  ],
});

const testHypertext = testComponentFactory<HypertextProps>(
  "Hypertext",
  Hypertext
);

// Test onClick functionality
const onClick = mock(() => {});

testHypertext({
  children: "Click me",
  href: "#",
  title: "Test link",
  onClick,
})(
  "should call onClick handler when clicked",
  async ({ getByTestId }, { click }) => {
    onClick.mockReset();
    const hypertext = getByTestId("hypertext");

    await click(hypertext);
    expect(onClick).toHaveBeenCalled();
  }
);
