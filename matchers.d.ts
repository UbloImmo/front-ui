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
