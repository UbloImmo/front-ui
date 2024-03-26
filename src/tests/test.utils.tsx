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
    const { queryByTestId } = render(<Component {...props} />);
    if (rendersNull) {
      expect(queryByTestId(testId)).toBeNull();
    } else {
      expect(queryByTestId(testId)).toBeDefined();
    }
    cleanup();
  });
};

/**
 * @deprecated use {@link testComponentFactory}
 *
 * Generates a test factory for a component.
 *
 * @template {Record<string, unknown>} TProps - The props for the component.
 *
 * @param {string} componentName - The name of the component.
 * @param {string} testId - The test ID for the component.
 * @param {FC<TProps>} Component - The component to be tested.
 * @param {Required<TProps>} defaultProps - The default props for the component.
 * @return {VoidFn<[TProps, Optional<boolean>, Optional<string>]>} A function that tests the component with given props.
 */
export const componentTestFactory = <TProps extends Record<string, unknown>>(
  componentName: string,
  testId: string,
  Component: FC<TProps>,
  defaultProps: Required<TProps>,
  rendersNull?: boolean
): VoidFn<[TProps, Optional<boolean>]> => {
  describe(componentName, () => {
    it(`should be a component`, () => {
      expect(Component).toBeDefined();
      expect(Component).toBeFunction();
    });

    testComponentRender(testId, Component, defaultProps, rendersNull);

    afterEach(cleanup);
  });
  return (props: TProps, rendersNull?: boolean, nestedTestId?: string) => {
    describe(componentName, () => {
      testComponentRender(
        nestedTestId ?? testId,
        Component,
        props,
        rendersNull
      );
      afterEach(cleanup);
    });
  };
};

/**
 *
 * Generates a test factory for a hook.
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
          cleanup();
        })
      );
    }
  });

  return (
      ...params: THookParams
    ): VoidFn<[string, VoidFn<[THookReturn, THookParams]>]> =>
    (testName: string, tests: VoidFn<[THookReturn, THookParams]>) => {
      describe(hookName, () => {
        const paramsStr =
          params && params.length > 0
            ? params
                .map((param) =>
                  isFunction(param) ? "() => {}" : JSON.stringify(param)
                )
                .join(", ")
            : "no params";
        const testlabel = `${testName} with params ${paramsStr}"`;
        it(testlabel, () => {
          const { result } = renderHook(() => hook(...(params ?? [])));
          tests(result.current, params ?? []);
          cleanup();
        });
      });
    };
};

type RenderResult = ReturnType<typeof render>;

/**
 * Generates a test factory for a component.
 *
 * @template {Record<string, unknown>} TProps - the props of the component
 *
 * @param {string} componentName - the name of the component
 * @param {FC<TProps>} Component - the component to test
 * @param {{props: TProps; tests: {name: string; test: VoidFn<[RenderResult]>}[]}} [staticTests] - optional static tests object containing props and tests
 * @return {Function} a meta function used to test the component further
 */
export const testComponentFactory = <TProps extends Record<string, unknown>>(
  componentName: string,
  Component: FC<TProps>,
  staticTests?: {
    props: TProps;
    tests: { name: string; test: VoidFn<[RenderResult]> }[];
  }
) => {
  describe(componentName, () => {
    it("should be a function", () => {
      expect(Component).toBeDefined();
      expect(Component).toBeFunction();
    });
    it("should not throw when no props are provided", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore needed to check unintended behavior with no props
      expect(() => render(<Component />)).not.toThrow();
      cleanup();
    });
    it("should throw if ran outside react", () => {
      expect(Component).toThrow();
    });
    if (staticTests && staticTests.tests && staticTests.props) {
      const renderResult = render(<Component {...staticTests.props} />);
      staticTests.tests.forEach(({ name, test }) =>
        it(name, () => {
          test(renderResult);
          cleanup();
        })
      );
    }
  });

  return (
      testProps: TProps
    ): VoidFn<[string, VoidFn<[RenderResult, TProps]>]> =>
    (testName: string, tests: VoidFn<[RenderResult, TProps]>) => {
      describe(componentName, () => {
        const paramsStr = JSON.stringify(testProps);
        const testlabel = `${testName} with params ${paramsStr}"`;
        it(testlabel, () => {
          const renderResult = render(<Component {...testProps} />);
          tests(renderResult, testProps);
          cleanup();
        });
      });
    };
};
