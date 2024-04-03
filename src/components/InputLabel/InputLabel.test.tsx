import { Mock, describe, expect, mock } from "bun:test";

import { InputLabel } from "./InputLabel.component";
import { InputLabelProps } from "./InputLabel.types";

import { testComponentFactory } from "@/tests";

describe("InputLabel", () => {
  const testInputLabel = testComponentFactory<InputLabelProps>(
    "InputLabel",
    InputLabel,
    {
      props: InputLabel.defaultProps,
      tests: [
        {
          name: "should render",
          test: ({ queryByTestId }) => {
            expect(queryByTestId("input-label")).toBeDefined();
          },
        },
      ],
    }
  );

  global.console.warn = mock(() => {});

  testInputLabel({ label: null, required: false })(
    "should warn if label is null",
    () => {
      expect(global.console.warn).toHaveBeenCalled();
      (global.console.warn as Mock<(_msg: unknown) => void>).mockReset();
    }
  );

  testInputLabel({ label: "test input", required: true })(
    "should render with symbol '*'",
    ({ queryByTestId }) => {
      const label = queryByTestId("input-label") as HTMLSpanElement;
      expect(label).toBeDefined();
      expect(label.textContent).toInclude("*");
    }
  );
});
