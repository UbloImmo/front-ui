import { Mock, describe, expect, mock } from "bun:test";

import { InputLabel } from "./InputLabel.component";
import { InputLabelProps } from "./InputLabel.types";

import { testComponentFactory } from "@/tests";

const testId = "input-label";

describe("InputLabel", () => {
  const testInputLabel = testComponentFactory<InputLabelProps>(
    "InputLabel",
    InputLabel,
    {
      props: InputLabel.defaultProps,
      tests: [
        {
          name: "should render",
          test: async ({ findByTestId }) => {
            const label = await findByTestId(testId);
            expect(label).not.toBeNull();
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
    "should have required data attributte",
    async ({ findByTestId }) => {
      const label = (await findByTestId(testId)) as HTMLSpanElement;
      expect(label).not.toBeNull();
      expect(label.dataset.required).toBe("true");
    }
  );
});
