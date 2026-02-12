/* eslint-disable @typescript-eslint/no-empty-object-type */
import "bun:test";

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

type OmittedJestMatchers =
  | "toBeEmpty"
  | "toBeInTheDOM"
  | "toHaveDescription"
  | "toHaveErrorMessage";

declare module "bun:test" {
  interface Matchers<T>
    extends Omit<
      TestingLibraryMatchers<typeof expect.stringContaining, T>,
      OmittedJestMatchers
    > {}
  interface AsymmetricMatchers
    extends Omit<
      TestingLibraryMatchers<unknown, unknown>,
      OmittedJestMatchers
    > {}
}

declare module "@types/react" {
  /**
   * The type of the component returned from {@link forwardRef}.
   *
   * @template P The props the component accepts, if any.
   *
   * @see {@link ExoticComponent}
   */
  interface ForwardRefExoticComponent<P, D = P>
    extends NamedExoticComponent<P> {
    /**
     * @deprecated Use {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#default_value|default values for destructuring assignments instead}.
     */
    defaultProps?: Partial<P> | undefined;
    __DEFAULT_PROPS?: Required<D> | undefined;
    propTypes?: WeakValidationMap<P> | undefined;
  }

  function forwardRef<T, P = {}, D = P>(
    render: ForwardRefRenderFunction<T, PropsWithoutRef<P>>
  ): ForwardRefExoticComponent<
    PropsWithoutRef<P> & RefAttributes<T>,
    PropsWithoutRef<D>
  >;
}
