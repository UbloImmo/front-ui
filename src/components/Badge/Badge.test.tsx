import { describe, expect } from "bun:test";
import { testComponentFactory } from "src/tests";
import { Badge } from "./Badge.component";

describe("Badge", () => {
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
});
