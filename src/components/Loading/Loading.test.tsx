import { expect, mock, type Mock } from "bun:test";

import { Loading } from "./Loading.component";
import { LoadingProps } from "./Loading.types";

import { testComponentFactory } from "@/tests";

const testId = "loading-indicator";

const testLoading = testComponentFactory<LoadingProps>("Loading", Loading, {
  props: Loading.defaultProps,
  tests: [
    {
      name: "should render",
      test: ({ queryByTestId }) => {
        expect(queryByTestId(testId)).toBeDefined();
      },
    },
  ],
});

global.console.warn = mock((_msg: unknown) => {});

testLoading({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore need this to check for unhandled props
  animation: "UNKNOWN",
})("should warn if provided with an unknown animation", ({ queryByTestId }) => {
  expect(queryByTestId("loading")).toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
  (global.console.warn as Mock<(_msg: unknown) => void>).mockReset();
});

testLoading({})("should render without props", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

testLoading({ animation: "Ripple" })(
  "should render another animation",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
  }
);
