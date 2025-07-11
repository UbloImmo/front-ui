/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as matchers from "@testing-library/jest-dom/matchers";
import { isFunction, transformObject } from "@ubloimmo/front-util";
import { expect } from "bun:test";
import * as matcherUtils from "jest-matcher-utils";

const {
  toBeEmpty,
  toBeInTheDOM,
  toHaveDescription,
  toHaveErrorMessage,
  ...jestMatchers
} = matchers;

/**
 * Patches jest's utils to jest matchers, ensuring interop with bun-test
 * @param fn - the jest matcher
 * @returns the patched matcher
 */
function patchInJestUtils(fn: any) {
  return function (...args: any[]) {
    for (const key in matcherUtils) {
      this.utils[key] = matcherUtils[key];
    }
    return fn.apply(this, args);
  };
}

const patchedMatchers = transformObject(
  jestMatchers,
  (matcher): typeof matcher =>
    isFunction(matcher) ? patchInJestUtils(matcher) : matcher
);

expect.extend(patchedMatchers);
