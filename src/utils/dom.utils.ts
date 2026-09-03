import { isFunction, type Optional, type VoidFn } from "@ubloimmo/front-util";
import { debounce } from "lodash";
import { type RefObject, useEffect, useRef, useState } from "react";

import type { DOMRectValues } from "@types";

/**
 * Uses the ResizeObserver API to observe changes within the given HTML Element DOM Rect.
 *
 * Based on https://github.com/antonioru/beautiful-react-hooks/blob/master/src/useResizeObserver.ts
 *
 * @param elementRef
 * @param debounceTimeout
 * @param onResize
 * @returns {Optional<DOMRectValues>} The observed element's DOM Rect values
 */
export function useResizeObserver<TElement extends Element>(
  elementRef: RefObject<TElement>,
  debounceTimeout: number = 100,
  onResize?: VoidFn<[rect: DOMRectValues]>
): Optional<DOMRectValues> {
  const observerRef = useRef<ResizeObserver | null>(null);
  const [DOMRect, setDOMRect] = useState<DOMRectValues>();

  // creates the observer reference on mount
  useEffect(() => {
    const fn = debounce(
      (entries) => {
        const { bottom, height, left, right, top, width } =
          entries[0].contentRect;

        const domRect: DOMRectValues = {
          bottom,
          height,
          left,
          right,
          top,
          width,
        };
        setDOMRect(domRect);
        if (onResize) onResize(domRect);
      },
      debounceTimeout,
      { leading: true }
    );

    observerRef.current = new ResizeObserver(fn);

    return () => {
      fn.cancel();
      if (observerRef.current && isFunction(observerRef?.current?.disconnect)) {
        observerRef.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // observes on the provided element ref
  useEffect(() => {
    if (elementRef.current) {
      if (observerRef.current && isFunction(observerRef?.current?.observe)) {
        observerRef.current.observe(elementRef.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef.current]);

  return DOMRect;
}
