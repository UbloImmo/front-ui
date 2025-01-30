import { isArray, isNumber } from "@ubloimmo/front-util";
import { describe, expect, it, mock } from "bun:test";

import { Tooltip } from "./Tooltip.component";
import {
  computeTooltipIntersections,
  generateThresholds,
} from "./Tooltip.utils";
import { Badge } from "../Badge";

import { testComponentFactory } from "@/tests";

import type { TooltipProps } from "./Tooltip.types";
import type { Direction } from "@types";
import type { DeepPartial, Nullable } from "@ubloimmo/front-util";

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
})("should render with default props", ({ queryByTestId }) => {
  expect(fakeObserverCallbacks.constructor).toHaveBeenCalled();
  expect(fakeObserverCallbacks.observe).toHaveBeenCalled();
  expect(queryByTestId(testId)).not.toBeNull();

  resetObserverCallbacks();
});

global.console.error = mock(() => {});
global.console.warn = mock(() => {});

testTooltip({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore needed to check error detection
  content: { foo: "bar" },
})(
  "should warn if regular object is passed in content props",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(global.console.error).toHaveBeenCalled();
  }
);

testTooltip({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore needed to check error detection
  content: null,
})("should warn if null is passed in content props", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
});

testTooltip({
  ...Tooltip.defaultProps,
  content: <Badge label="test" />,
})("should render with JSX in content props", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

const FAKE_DIRECTION: Direction = "top";

const createFakeIntersectionObserverEntry = (
  intersection?: DeepPartial<Omit<IntersectionObserverEntry, "target">> & {
    target?: Element;
  }
): IntersectionObserverEntry => {
  const initFakeDomRect = (
    extension?: DeepPartial<DOMRectReadOnly>
  ): DOMRectReadOnly => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    ...(extension ?? {}),
    toJSON: mock(() => {}),
  });
  return {
    boundingClientRect: initFakeDomRect(intersection?.boundingClientRect),
    intersectionRatio: intersection?.intersectionRatio ?? 0,
    isIntersecting: intersection?.isIntersecting ?? false,
    target: (intersection?.target ?? document.createElement("div")) as Element,
    intersectionRect: initFakeDomRect(intersection?.intersectionRect),
    rootBounds: initFakeDomRect(intersection?.rootBounds ?? {}),
    time: intersection?.time ?? 0,
  };
};

const getDirection = mock(() => FAKE_DIRECTION);
const setDirection = mock((_direction: Direction) => {});

describe("Tooltip", () => {
  describe("computeTooltipIntersections", () => {
    it("should be and return a function", () => {
      expect(computeTooltipIntersections).toBeDefined();
      expect(computeTooltipIntersections).toBeFunction();
      expect(
        computeTooltipIntersections(getDirection, setDirection)
      ).toBeFunction();
    });

    it("should return a valid direction from an intersection", () => {
      setDirection.mockReset();
      const observer = new FakeIntersectionObserver(
        computeTooltipIntersections(getDirection, setDirection)
      );
      computeTooltipIntersections(getDirection, setDirection)(
        [
          createFakeIntersectionObserverEntry({
            isIntersecting: true,
          }),
        ],
        observer
      );

      expect(setDirection).toHaveBeenCalledWith(FAKE_DIRECTION);
      setDirection.mockReset();
    });

    it("should update clipping direction correctly when clipped", () => {
      setDirection.mockReset();
      const observer = new FakeIntersectionObserver(
        computeTooltipIntersections(getDirection, setDirection)
      );
      computeTooltipIntersections(getDirection, setDirection)(
        [
          createFakeIntersectionObserverEntry({
            isIntersecting: true,
            boundingClientRect: {
              top: -10,
            },
          }),
        ],
        observer
      );
      expect(setDirection).toHaveBeenCalledWith("bottom");
      setDirection.mockReset();
    });

    it("should update clipping direction correctly when multiple clipping directions detected", () => {
      setDirection.mockReset();
      const observer = new FakeIntersectionObserver(
        computeTooltipIntersections(getDirection, setDirection)
      );
      computeTooltipIntersections(getDirection, setDirection)(
        [
          createFakeIntersectionObserverEntry({
            isIntersecting: true,
            boundingClientRect: {
              top: -10,
            },
          }),
          createFakeIntersectionObserverEntry({
            isIntersecting: true,
            boundingClientRect: {
              left: -1,
            },
          }),
        ],
        observer
      );
      expect(setDirection).toHaveBeenCalledWith("bottom");
      setDirection.mockReset();
    });
  });
});

describe("Tooltip", () => {
  describe("generateThresholds", () => {
    it("should be and return a function", () => {
      expect(generateThresholds).toBeDefined();
      expect(generateThresholds).toBeFunction();
    });

    it("should return an array of thresholds", () => {
      expect(generateThresholds(0)).toEqual([]);
      expect(generateThresholds(2)).toEqual([0, 0.5, 1]);
    });
  });
});
