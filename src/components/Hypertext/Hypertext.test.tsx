import { expect } from "bun:test";

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
