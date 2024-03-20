import type { FC } from "react";
import { describe, it, expect, afterEach } from "bun:test";
import { render, cleanup, renderHook } from "@testing-library/react";
import type { GenericFn, VoidFn, Optional } from "@ubloimmo/front-util";
import { isFunction } from "@ubloimmo/front-util";

/**
 * Generates a test case to verify the rendering behavior of a component.
 *
 * @template {Record<string, unknown>} TProps - The props for the component.
 *
 * @param {string} testId - The test ID used to locate the rendered component.
 * @param {FC<TProps>} Component - The component to be rendered.
 * @param {TProps} props - The props to be passed to the component.
 * @param {boolean} [rendersNull] - Indicates whether the component is expected to render null or an element. Defaults to false.
 */
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

/**
 * Generates a test factory for a component.
 *
 * @template {Record<string, unknown>} TProps - The props for the component.
 *
 * @param {string} componentName - The name of the component.
 * @param {string} testId - The test ID for the component.
 * @param {FC<TProps>} Component - The component to be tested.
 * @param {Required<TProps>} defaultProps - The default props for the component.
 * @return {VoidFn<[TProps, Optional<boolean>]>} A function that tests the component with given props.
 */
export const componentTestFactory = <TProps extends Record<string, unknown>>(
  componentName: string,
  testId: string,
  Component: FC<TProps>,
  defaultProps: Required<TProps>
): VoidFn<[TProps, Optional<boolean>]> => {
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
          const { result } = renderHook(() => hook(...(params ?? [])));
          tests(result.current);
        });
      });
    };
};
