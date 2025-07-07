import { cleanup, render, renderHook } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { isFunction, isObject, transformObject } from "@ubloimmo/front-util";
import { describe, expect, it } from "bun:test";
import { useRef, type FC, type ReactNode } from "react";

import type { TestHookOptions, TestHookUtils } from "@types";
import type { GenericFn, MaybeAsyncFn, VoidFn } from "@ubloimmo/front-util";

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
  THook extends GenericFn<THookParams, THookReturn>,
>(
  hookName: string,
  hook: THook,
  staticTests?: {
    params: THookParams;
    tests: {
      name: string;
      test: VoidFn<[THookReturn]>;
      options?: TestHookOptions;
    }[];
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

  return (...params: THookParams) =>
    (
      testName: string,
      tests: MaybeAsyncFn<
        [
          result: THookReturn,
          params: THookParams,
          utils: TestHookUtils<THookReturn, THookParams>,
        ]
      >,
      options?: TestHookOptions
    ) => {
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
        const testFn = options?.skip ? it.skip : options?.todo ? it.todo : it;
        testFn(testlabel, async () => {
          const { result, unmount, rerender } = renderHook(
            (initialProps?: THookParams | []) =>
              hook(...(initialProps ?? params ?? []))
          );
          const utils: TestHookUtils<THookReturn, THookParams> = {
            rerender: (...newParams: THookParams | []) => {
              const rerenderParams = newParams.length ? newParams : params;
              rerender(rerenderParams);
            },
            unmount,
            getResult: () => result.current,
          };
          await tests(result.current, params ?? [], utils);
          cleanup();
        });
      });
    };
};

type RerenderWithPropsFn<TProps extends Record<string, unknown>> = VoidFn<
  [TProps]
>;

type RenderResultStatic = ReturnType<typeof render>;
type RenderResult<TProps extends Record<string, unknown>> =
  RenderResultStatic & {
    rerenderWithProps: RerenderWithPropsFn<TProps>;
  };

/**
 * Generates a test factory for a component.
 *
 * @template {Record<string, unknown>} TProps - the props of the component
 *
 * @param {string} componentName - the name of the component
 * @param {FC<TProps>} Component - the component to test
 * @param {{props: TProps; tests: {name: string; test: VoidFn<[RenderResult]>}[]}} [staticTests] - optional static tests object containing props and tests
 * @return a meta function used to test the component further
 */
export const testComponentFactory = <TProps extends Record<string, unknown>>(
  componentName: string,
  Component: FC<TProps>,
  staticTests?: {
    props: TProps;
    tests: { name: string; test: VoidFn<[RenderResultStatic]> }[];
  },
  Wrapper?: ({ children }: { children?: ReactNode }) => JSX.Element
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
    // it.if(!isObject(Component))("should throw if ran outside react", () => {
    //   expect(Component).toThrow();
    //   cleanup();
    // });
    if (staticTests && staticTests.tests && staticTests.props) {
      const renderFn = (testProps?: TProps) =>
        Wrapper
          ? render(
              <Wrapper>
                <Component {...(testProps ?? staticTests.props)} />
              </Wrapper>
            )
          : render(<Component {...(testProps ?? staticTests.props)} />);
      const renderResult = renderFn();
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
    ): VoidFn<
      [string, MaybeAsyncFn<[RenderResult<TProps>, UserEvent, TProps]>]
    > =>
    (
      testName: string,
      tests: MaybeAsyncFn<[RenderResult<TProps>, UserEvent, TProps]>
    ) => {
      describe(componentName, () => {
        const paramsStr = JSON.stringify(
          transformObject(testProps, (value) =>
            isFunction(value) ? "() => {}" : value
          )
        );
        const testlabel = `${testName} with params ${paramsStr}"`;

        let instanceId = 1;

        const InstanceWrapper = ({ children }: { children?: ReactNode }) => {
          const id = useRef(instanceId++);
          return (
            <div>
              <span data-testid="instance-id">{id.current}</span>
              {children}
            </div>
          );
        };

        it(testlabel, async () => {
          cleanup();
          const user = userEvent.setup();
          const renderFn = () =>
            render(
              <InstanceWrapper>
                {Wrapper ? (
                  <Wrapper>
                    <Component {...testProps} />
                  </Wrapper>
                ) : (
                  <Component {...testProps} />
                )}
              </InstanceWrapper>
            );
          const renderResult = renderFn();
          const rerenderWithProps: RerenderWithPropsFn<TProps> = (
            rerenderProps: TProps
          ) => {
            return renderResult.rerender(
              <InstanceWrapper>
                {Wrapper ? (
                  <Wrapper>
                    <Component {...rerenderProps} />
                  </Wrapper>
                ) : (
                  <Component {...rerenderProps} />
                )}
              </InstanceWrapper>
            );
          };
          await tests({ ...renderResult, rerenderWithProps }, user, testProps);
          cleanup();
        });
        cleanup();
      });
    };
};
