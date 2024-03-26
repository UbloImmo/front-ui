import type { FC } from "react";
import { describe, it, expect } from "bun:test";
import { render, cleanup, renderHook } from "@testing-library/react";
import type { GenericFn, VoidFn, MaybeAsyncFn } from "@ubloimmo/front-util";
import { isFunction, isObject, transformObject } from "@ubloimmo/front-util";
import userEvent, { type UserEvent } from "@testing-library/user-event";

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
    it.if(!isObject(Component))("should be a function", () => {
      expect(Component).toBeDefined();
      expect(Component).toBeFunction();
    });
    it("should not throw when no props are provided", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore needed to check unintended behavior with no props
      expect(() => render(<Component />)).not.toThrow();
      cleanup();
    });
    it.if(!isObject(Component))("should throw if ran outside react", () => {
      expect(Component).toThrow();
      cleanup();
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
    ): VoidFn<[string, MaybeAsyncFn<[RenderResult, UserEvent, TProps]>]> =>
    (
      testName: string,
      tests: MaybeAsyncFn<[RenderResult, UserEvent, TProps]>
    ) => {
      describe(componentName, () => {
        const paramsStr = JSON.stringify(
          transformObject(testProps, (value) =>
            isFunction(value) ? "() => {}" : value
          )
        );
        const testlabel = `${testName} with params ${paramsStr}"`;
        it(testlabel, async () => {
          cleanup();
          const user = userEvent.setup();
          const renderResult = render(<Component {...testProps} />);
          await tests(renderResult, user, testProps);
          cleanup();
        });
        cleanup();
      });
    };
};
