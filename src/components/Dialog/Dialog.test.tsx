import { act } from "@testing-library/react";
import { objectValues, type VoidFn } from "@ubloimmo/front-util";
import { describe, expect, mock, type Mock } from "bun:test";

import { Dialog } from "./Dialog.component";

import { testComponentFactory, testHookFactory } from "@/tests";

import { DialogProvider, useGlobalDialogContext } from ".";

import type { DialogProps } from "./Dialog.types";
import type { ReactNode } from "react";

const testIds = {
  overlay: "dialog-overlay",
  wrapper: "dialog-wrapper",
  content: "dialog-content",
  child: "dialog-child",
};

const props: DialogProps = {
  ...Dialog.defaultProps,
  children: <div data-testid={testIds.child}>test portal child</div>,
};

const Wrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <div id="dialog-root"></div>
      <DialogProvider portalRoot="#dialog-root">{children}</DialogProvider>
    </>
  );
};

const testDialog = testComponentFactory<DialogProps>(
  "Dialog",
  Dialog,
  {
    props,
    tests: [
      {
        name: "should not render its child by default",
        test: ({ queryByTestId }) => {
          objectValues(testIds).forEach((testId) => {
            expect(queryByTestId(testId)).toBeNull();
          });
        },
      },
    ],
  },
  Wrapper
);

testDialog({ ...props, open: true })(
  "should render its child when open",
  ({ queryByTestId }) => {
    objectValues(testIds).forEach((testId) => {
      expect(queryByTestId(testId)).not.toBeNull();
    });
  }
);

global.console.error = mock(() => {});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore need this to check for unhandled props
testDialog({ ...props, reference: null })(
  "should not render its child when reference is null",
  ({ queryByTestId }) => {
    objectValues(testIds).forEach((testId) => {
      expect(queryByTestId(testId)).toBeNull();
    });
    expect(global.console.error).toHaveBeenCalled();
    (global.console.error as Mock<VoidFn>).mockReset();
  }
);

const testUseGlobalDialogContext = () => {
  type Hook = typeof useGlobalDialogContext;
  const testContext = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
    "Context",
    useGlobalDialogContext
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore need this to check for unhandled props
  testContext()("should not throw if no arguments are provided", (result) => {
    expect(result).toBeObject();
    expect(result).toContainKeys([
      "portalRoot",
      "registerDialog",
      "unregisterDialog",
      "isDialogRegistered",
      "openDialog",
      "closeDialog",
      "toggleDialog",
      "setDialogState",
      "isDialogOpen",
    ]);
  });

  testContext({ portalRoot: undefined })(
    "should have a default portal root",
    (result) => {
      expect(result).toContainKey("portalRoot");
      expect(result.portalRoot).toBe("#dialog-root");
    }
  );

  testContext({ portalRoot: "#root" })(
    "should accept a custom portal root",
    (result) => {
      expect(result).toContainKey("portalRoot");
      expect(result.portalRoot).toBe("#root");
    }
  );

  global.console.error = mock(() => {});
  global.console.warn = mock(() => {});

  testContext({ portalRoot: 12 as unknown as string })(
    "should not accept a non-string portal root",
    (result) => {
      expect(result.portalRoot).toBe("#dialog-root");
      expect(global.console.error).toHaveBeenCalled();
      (global.console.error as Mock<VoidFn>).mockReset();
    }
  );
  (global.console.error as Mock<VoidFn>).mockReset();
  const testDefaultContext = testContext({ portalRoot: "#dialog-root" });
  (global.console.error as Mock<VoidFn>).mockReset();

  testDefaultContext("should register a dialog", ({ registerDialog }) => {
    expect(registerDialog).toBeFunction();
    expect(registerDialog).not.toThrow();
    (global.console.error as Mock<VoidFn>).mockReset();
    act(() => registerDialog("test", false));
    expect(global.console.error).not.toHaveBeenCalled();
    (global.console.error as Mock<VoidFn>).mockReset();
  });

  // testDefaultContext(
  //   "should error when registering multiple times",
  //   ({ registerDialog }) => {
  //     (global.console.error as Mock<VoidFn>).mockReset();
  //     act(() => registerDialog("duplicate", false));
  //     act(() => registerDialog("duplicate", false));
  //     expect(global.console.error).toHaveBeenCalled();
  //     (global.console.error as Mock<VoidFn>).mockReset();
  //   }
  // );

  testDefaultContext(
    "should error when registering an invalid reference",
    ({ registerDialog }) => {
      act(() => registerDialog("", false));
      expect(global.console.error).toHaveBeenCalled();

      (global.console.error as Mock<VoidFn>).mockReset();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore need this to check for unhandled props
      act(() => registerDialog(null, false));
      expect(global.console.error).toHaveBeenCalled();

      (global.console.error as Mock<VoidFn>).mockReset();
    }
  );

  testDefaultContext(
    "should unregister a dialog",
    ({ registerDialog, unregisterDialog }) => {
      expect(unregisterDialog).toBeFunction();
      expect(unregisterDialog).not.toThrow();
      (global.console.error as Mock<VoidFn>).mockReset();
      act(() => registerDialog("test", false));
      expect(global.console.error).not.toHaveBeenCalled();
      act(() => unregisterDialog("test"));
      expect(global.console.error).not.toHaveBeenCalled();
      (global.console.error as Mock<VoidFn>).mockReset();
    }
  );

  (global.console.warn as Mock<VoidFn>).mockReset();

  testDefaultContext(
    "should open a registered dialog",
    ({ registerDialog, openDialog }) => {
      expect(openDialog).toBeFunction();
      expect(openDialog).not.toThrow();
      (global.console.warn as Mock<VoidFn>).mockReset();
      act(() => registerDialog("test", false));
      expect(global.console.error).not.toHaveBeenCalled();
      act(() => openDialog("test"));
      // expect(global.console.warn).not.toHaveBeenCalled();
      (global.console.error as Mock<VoidFn>).mockReset();
      (global.console.warn as Mock<VoidFn>).mockReset();
    }
  );
};
describe("Dialog", () => {
  testUseGlobalDialogContext();
});
