import {
  GenericFn,
  Nullable,
  isObject,
  objectEntries,
} from "@ubloimmo/front-util";

import type { ToolipIntersection, TooltipDirection } from "./Tooltip.types";

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
export const computeTooltipIntersections =
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
    let prevPassDiffRatios: Nullable<ToolipIntersection> = null;

    entries.forEach(
      ({
        boundingClientRect: { top, bottom, left, right, height, width },
        rootBounds,
      }) => {
        const bounds: ToolipIntersection = {
          top: isObject(rootBounds) ? rootBounds.top : 0,
          bottom: isObject(rootBounds) ? rootBounds.bottom : window.innerHeight,
          left: isObject(rootBounds) ? rootBounds.left : 0,
          right: isObject(rootBounds) ? rootBounds.right : window.innerWidth,
        };

        const diffs = {
          top: top - bounds.top,
          bottom: bounds.bottom - bottom - (observer.root ? 0 : height),
          right: bounds.right - right,
          left: left - bounds.left,
        };
        const diffRatiosRaw = {
          top: diffs.top / (height || 1),
          bottom: diffs.bottom / (height || 1),
          left: diffs.left / (width || 1),
          right: diffs.right / (width || 1),
        };
        const diffRatios = {
          top: diffRatiosRaw.top < 0 ? Math.abs(diffRatiosRaw.top) : 0,
          bottom: diffRatiosRaw.bottom < 0 ? Math.abs(diffRatiosRaw.bottom) : 0,
          left: diffRatiosRaw.left < 0 ? Math.abs(diffRatiosRaw.left) : 0,
          right: diffRatiosRaw.right < 0 ? Math.abs(diffRatiosRaw.right) : 0,
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

        /**
         * Updates the clipping direction
         * with the direction that is clippin the most by comparing diffs
         */
        const currentClippingDirection =
          objectEntries(clippingMap).reduce(
            (
              prevClipDir: Nullable<TooltipDirection>,
              [clipDir, isClipping]
            ): Nullable<TooltipDirection> => {
              if (!isClipping) return prevClipDir;
              if (!prevClipDir) {
                return clipDir;
              }
              // get intersection ratio for currently evaluated clipping direction
              const currentDiffRatio = diffRatios[clipDir];
              const prevDiffRatio = diffRatios[prevClipDir];
              if (currentDiffRatio > prevDiffRatio) return clipDir;
              return prevClipDir;
            },
            clippingDirection
          ) ?? clippingDirection;

        if (currentClippingDirection) {
          if (
            clippingDirection &&
            prevPassDiffRatios &&
            clippingDirection !== currentClippingDirection
          ) {
            const currentDiffRatio = diffRatios[currentClippingDirection];
            const prevPassDiffRatio = prevPassDiffRatios[clippingDirection];
            if (currentDiffRatio > prevPassDiffRatio) {
              clippingDirection = currentClippingDirection;
            }
          } else {
            clippingDirection = currentClippingDirection;
          }
        }

        prevPassDiffRatios = diffRatios;
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
