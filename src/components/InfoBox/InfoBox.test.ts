import { expect } from "bun:test";

import { InfoBox } from "./InfoBox.component";

import { testComponentFactory } from "@/tests";

const testInfoBox = testComponentFactory("InfoBox", InfoBox);

testInfoBox({ ...InfoBox.defaultProps })(
  "should render",
  ({ queryByTestId }) => {
    expect(queryByTestId("info-box")).not.toBeNull();
  },
);

testInfoBox({ ...InfoBox.defaultProps, info: "Testing" })(
  "should render with info when property is provided",
  ({ queryByTestId }) => {
    expect(queryByTestId("info-box-text")).not.toBeNull();
    expect(queryByTestId("info-box-text")?.textContent).toBe("Testing");
  },
);
