import type { FC } from "react";
import { describe, it, expect, afterEach } from "bun:test";
import { render, cleanup, renderHook } from "@testing-library/react";
import {
  isArray,
  type GenericFn,
  type VoidFn,
  isFunction,
} from "@ubloimmo/front-util";

export const testComponentRender = <TProps extends Record<string, unknown>>(
  testId: string,
  Component: FC<TProps>,
  props: TProps,
  rendersNull?: boolean
) => {
  const propStr = JSON.stringify(props);
  it(`should render ${
    rendersNull ? "null" : "an element"
  } with props ${propStr}`, () => {
    const { getByTestId } = render(<Component {...props} />);
    if (rendersNull) {
      expect(getByTestId(testId)).toBeNull();
    } else {
      expect(getByTestId(testId)).toBeDefined();
    }
  });
};

export const componentTestFactory = <TProps extends Record<string, unknown>>(
  componentName: string,
  testId: string,
  Component: FC<TProps>,
  defaultProps: Required<TProps>
) => {
  describe(componentName, () => {
    it(`should be a component`, () => {
      expect(Component).toBeDefined();
      expect(Component).toBeFunction();
    });

    it("should render render when provided with default props", () => {
      const { getByTestId } = render(<Component {...defaultProps} />);
      expect(getByTestId(testId)).toBeDefined();
    });

    afterEach(cleanup);
  });
  return (props: TProps, rendersNull?: boolean) => {
    describe(componentName, () => {
      testComponentRender(testId, Component, props, rendersNull);
      afterEach(cleanup);
    });
  };
};

/**
 *
 * @template {unknown[]} THookParams - the parameters of the hook
 * @template {unknown} THookReturn - the return type of the hook
 * @template {GenericFn<THookParams, THookReturn>} THook - the hook itself
 *
 * @param {string} hookName - the name of the hook
 * @param {THook} hook - the hook to test
 * @param {{params: THookParams; tests: {name: string; test: VoidFn<[THookReturn]>}[]}} [staticTests] - static tests tests to run on the hook
 * @returns a meta function used to test the hook
 */
export const testHookFactory = <
  THookParams extends unknown[],
  THookReturn,
  THook extends GenericFn<THookParams, THookReturn>
>(
  hookName: string,
  hook: THook,
  staticTests?: {
    params: THookParams;
    tests: { name: string; test: VoidFn<[THookReturn]> }[];
  }
) => {
  describe(hookName, () => {
    it("should be a function", () => {
      expect(hook).toBeDefined();
      expect(hook).toBeFunction();
    });
    if (staticTests && staticTests.tests && staticTests.params) {
      const { result } = renderHook(() => hook(...(staticTests?.params ?? [])));
      staticTests.tests.forEach(({ name, test }) =>
        it(name, () => {
          test(result.current);
        })
      );
    }
  });

  return (...params: THookParams): VoidFn<[string, VoidFn<[THookReturn]>]> =>
    (testName: string, tests: VoidFn<[THookReturn]>) => {
      describe(hookName, () => {
        const paramsStr =
          params && params.length > 0
            ? params
                .map((param) =>
                  isFunction(param) ? "[Function]" : JSON.stringify(param)
                )
                .join(", ")
            : "no params";
        const testlabel = `${testName} with params ${paramsStr}"`;
        it(testlabel, () => {
          let hookReturn: THookReturn;
          if (isArray(params)) {
            const { result } = renderHook(() => hook(...params));
            hookReturn = result.current;
          } else {
            const { result } = renderHook(() => hook());
            hookReturn = result.current;
          }
          tests(hookReturn);
        });
      });
    };
};
