import {
  GenericFn,
  Nullable,
  isObject,
  objectEntries,
} from "@ubloimmo/front-util";

import type { TooltipDirection } from "./Tooltip.types";

const inverseDirectionMap: Record<TooltipDirection, TooltipDirection> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

/**
 * Returns an IntersectionObserverCallback that computes the intersection of a tooltip
 * with the viewport or other intersection root and updates its direction accordingly.
 *
 * @param {GenericFn<[], TooltipDirection>} getTooltipDirection - get the current direction of the tooltip.
 * @param {GenericFn<[TooltipDirection], void>} setTooltipDirection - sets the direction of the tooltip.
 * @return {IntersectionObserverCallback}.
 */
export const computedTooltipIntersections =
  (
    getTooltipDirection: GenericFn<[], TooltipDirection>,
    setTooltipDirection: GenericFn<[TooltipDirection]>
  ): IntersectionObserverCallback =>
  (entries, observer) => {
    /**
     * Gets current direction of the tooltip
     * initializes the clipping direction as null
     */
    let clippingDirection: Nullable<TooltipDirection> = null;

    entries.forEach(
      ({
        boundingClientRect: { top, bottom, left, right },
        rootBounds,
        target,
        intersectionRect,
      }) => {
        const bounds: Pick<
          DOMRectReadOnly,
          "top" | "bottom" | "left" | "right"
        > = {
          top: isObject(rootBounds) ? rootBounds.top : 0,
          bottom: isObject(rootBounds) ? rootBounds.bottom : window.innerHeight,
          left: isObject(rootBounds) ? rootBounds.left : 0,
          right: isObject(rootBounds) ? rootBounds.right : window.innerWidth,
        };

        const diffs = {
          top: top - bounds.top,
          bottom: bounds.bottom - bottom,
          right: bounds.right - right,
          left: left - bounds.left,
        };
        /**
         * Sets the conditions to activate the clipping
         * Checks if the tooltip is clipped
         * Updates the clipping direction when clipped
         */
        const clippingMap: Record<TooltipDirection, boolean> = {
          top: diffs.top < 0,
          bottom: diffs.bottom < 0,
          right: diffs.right < 0,
          left: diffs.left < 0,
        };

        if (
          (target as HTMLDivElement).dataset["testid"] === "tooltip-placeholder"
        ) {
          console.table({
            rootBounds,
            bounds: {
              top: bounds.top,
              bottom: bounds.bottom,
              left: bounds.left,
              right: bounds.right,
            },
            targetBounds: { top, bottom, left, right },
            diffs,
            intersectionRect,
            clippingMap,
          });
          console.log(
            window.innerHeight,
            bounds.bottom,
            observer.root,
            document.body.getBoundingClientRect().height
          );
        }

        /**
         * Updates the clipping direction
         * with the direction that is clippin the most by comparing diffs
         */
        clippingDirection =
          objectEntries(clippingMap).reduce(
            (
              prevClipDir: Nullable<TooltipDirection>,
              [clipDir, isClipping]
            ): Nullable<TooltipDirection> => {
              if (!isClipping) return prevClipDir;
              const currentDiff = Math.abs(diffs[clipDir]);
              if (!prevClipDir || currentDiff > Math.abs(diffs[prevClipDir]))
                return clipDir;
              return prevClipDir;
            },
            clippingDirection
          ) ?? clippingDirection;
      }
    );

    /**
     * Update tooltip direction when clipped to the opposite of the clipping direction
     */
    if (clippingDirection) {
      setTooltipDirection(inverseDirectionMap[clippingDirection]);
    } else {
      setTooltipDirection(getTooltipDirection());
    }
  };
