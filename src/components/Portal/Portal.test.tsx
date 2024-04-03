import { expect, mock, type Mock } from "bun:test";

import { Portal } from "./Portal.component";

import { testComponentFactory } from "@/tests";

import type { PortalProps } from "./Portal.types";
import type { ReactNode } from "react";

const testId = "portal-child";

const props: PortalProps = {
  ...Portal.defaultProps,
  children: <div data-testid={testId}>test portal child</div>,
};

const Wrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <div id="dialog-root"></div>
      {children}
    </>
  );
};

const testPortal = testComponentFactory<PortalProps>(
  "Portal",
  Portal,
  {
    props,
    tests: [
      {
        name: "should render a child",
        test: ({ queryByTestId }) => {
          expect(queryByTestId(testId)).toBeDefined();
        },
      },
    ],
  },
  Wrapper
);

global.console.error = mock(() => {});
testPortal({ ...props, rootSelector: "nowhere" })(
  "should error and not render if the root selector targets nothing",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).toBeNull();
    expect(global.console.error).toHaveBeenCalled();
    (global.console.error as Mock<(_msg: unknown) => void>).mockReset();
  }
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore need to ignore in order to trigger error
testPortal({ ...props, rootSelector: null })(
  "should error and not render if no root selector is provided",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).toBeNull();
    expect(global.console.error).toHaveBeenCalled();
    (global.console.error as Mock<(_msg: unknown) => void>).mockReset();
  }
);
