import { Nullable, isArray, isNumber } from "@ubloimmo/front-util";
import { expect, mock } from "bun:test";

import { Tooltip } from "./Tooltip.component";
import { TooltipProps } from "./Tooltip.types";

import { testComponentFactory } from "@/tests";

const testId = "tooltip-wrapper";

const testTooltip = testComponentFactory<TooltipProps>("Tooltip", Tooltip);

const fakeObserverCallbacks = {
  constructor: mock((..._args: unknown[]) => {}),
  observe: mock((..._args: unknown[]) => {}),
  unobserve: mock((..._args: unknown[]) => {}),
  disconnect: mock(() => {}),
  takeRecords: mock(() => []),
} as const;

const resetObserverCallbacks = () => {
  for (const method in fakeObserverCallbacks) {
    fakeObserverCallbacks[
      method as keyof typeof fakeObserverCallbacks
    ].mockReset();
  }
};

class FakeIntersectionObserver implements IntersectionObserver {
  public root: Nullable<Element | Document>;
  public rootMargin: string;
  public thresholds: readonly number[];
  constructor(
    callback: IntersectionObserverCallback,
    init?: IntersectionObserverInit
  ) {
    this.root = init?.root || null;
    this.rootMargin = init?.rootMargin ?? "0px";
    this.thresholds = isNumber(init?.threshold)
      ? [init.threshold]
      : isArray(init?.threshold)
      ? init.threshold
      : [];

    fakeObserverCallbacks.constructor(callback, init);
  }

  observe(...args: unknown[]) {
    fakeObserverCallbacks.observe(...args);
  }
  unobserve(...args: unknown[]) {
    fakeObserverCallbacks.unobserve(...args);
  }

  disconnect() {
    fakeObserverCallbacks.disconnect();
  }

  takeRecords() {
    return fakeObserverCallbacks.takeRecords();
  }
}

global.IntersectionObserver = FakeIntersectionObserver;

testTooltip({
  ...Tooltip.defaultProps,
})("should render with default props", ({ queryByTestId, debug }) => {
  debug();
  expect(fakeObserverCallbacks.constructor).toHaveBeenCalled();
  expect(fakeObserverCallbacks.observe).toHaveBeenCalled();
  expect(queryByTestId(testId)).not.toBeNull();

  resetObserverCallbacks();
});
