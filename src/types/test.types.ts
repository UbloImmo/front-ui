import type { GenericFn, VoidFn } from "@ubloimmo/front-util";

export type TestIdProps = {
  /**
   * A custom test id.
   *
   * Gets added to the `data-testid` attribute.
   *
   * @default undefined
   */
  testId?: string;
  /**
   * Whether to replace the default test id
   * instead of appending it at the end
   *
   * @default false
   */
  overrideTestId?: boolean;
};

export interface TestHookUtilsRerenderFn<THookParams extends unknown[]> {
  (...params: THookParams): void;
  (): void;
}

/**
 * Utils for testing hooks
 */
export type TestHookUtils<THookReturn, THookParams extends unknown[]> = {
  /**
   * Rerenders the hook
   */
  rerender: TestHookUtilsRerenderFn<THookParams>;
  /**
   * Unmounts the hook
   */
  unmount: VoidFn;
  /**
   * Gets the latest result of the hook
   */
  getResult: GenericFn<[], THookReturn>;
};

export type TestHookOptions = {
  /**
   * Whether to skip the test
   *
   * @default false
   */
  skip?: boolean;
  /**
   * Whether the test is a todo
   *
   * @default false
   */
  todo?: boolean;
};
