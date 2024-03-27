import { expect } from "bun:test";

import { Badge } from "./Badge.component";

import { testComponentFactory } from "@/tests";

testComponentFactory("Badge", Badge, {
  props: Badge.defaultProps,
  tests: [
    {
      name: "should render",
      test: ({ queryByTestId }) => {
        expect(queryByTestId("badge")).toBeDefined();
      },
    },
  ],
});
