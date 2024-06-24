import { expect } from "bun:test";

import { InfoBox } from "./InfoBox.component";

import { testComponentFactory } from "@/tests";

const testInfoBox = testComponentFactory("InfoBox", InfoBox);

testInfoBox({ ...InfoBox.defaultProps })(
  "should render",
  ({ queryByTestId }) => {
    expect(queryByTestId("info-box")).not.toBeNull();
  }
);
