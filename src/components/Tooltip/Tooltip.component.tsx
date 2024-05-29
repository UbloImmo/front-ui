import {
  Nullable,
  isFunction,
  isNull,
  isObject,
  isString,
} from "@ubloimmo/front-util";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import {
  getTooltipStyles,
  tooltipPlaceholderStyles,
  tooltipWrapperStyles,
} from "./Tooltip.styles";
import { computedTooltipIntersections } from "./Tooltip.utils";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { isEmptyString, useLogger, useMergedProps } from "@utils";

import type {
  DefaultTooltipProps,
  TooltipContentFn,
  TooltipDirection,
  TooltipProps,
  TooltipStyleProps,
} from "./Tooltip.types";

const defaultTooltipProps: DefaultTooltipProps = {
  children: "",
  content: "[Tooltip content]",
  direction: "top",
  icon: "QuestionCircleFill",
  intersectionRoot: null,
};

const THRESHOLD_COUNT = 10;
const THRESHOLDS = Array(THRESHOLD_COUNT + 1)
  .fill(1)
  .map((_, i) => i / THRESHOLD_COUNT);

/**
 * Text popup box that appears when the user hovers over an element
 *
 * @version 0.0.1
 *
 * @param {TooltipProps} props - The tooltip's props
 * @returns {JSX.Element} The rendered tooltip
 */
const Tooltip = (props: TooltipProps): JSX.Element => {
  const { error } = useLogger("Tooltip");
  const mergedProps = useMergedProps(defaultTooltipProps, props);

  const { children, content, direction, icon, intersectionRoot } = mergedProps;

  const [tooltipDirection, setTooltipDirection] =
    useState<TooltipDirection>(direction);

  const tooltipDirectionRef = useRef<TooltipDirection>(direction);

  const tooltipRef = useRef<Nullable<HTMLDivElement>>(null);
  const tooltipWrapperRef = useRef<Nullable<HTMLDivElement>>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * Setting the current direction of the tooltip's placeholder
   */
  useEffect(() => {
    tooltipDirectionRef.current = direction;
  }, [direction]);

  /**
   * Detects when tooltip is clipped and changes its direction to the opposite
   */
  useLayoutEffect(() => {
    declareObserver: {
      if (!isNull(observerRef.current)) break declareObserver;

      const observerRoot = isString(intersectionRoot)
        ? document.querySelector<HTMLElement>(intersectionRoot)
        : intersectionRoot;

      observerRef.current = new IntersectionObserver(
        computedTooltipIntersections(
          () => tooltipDirectionRef.current,
          setTooltipDirection
        ),
        // (entries) => {
        //   /**
        //    * Gets current direction of the tooltip
        //    * initializes the clipping direction as null
        //    */
        //   const currentDirection = tooltipDirectionRef.current;
        //   let clippingDirection: Nullable<TooltipDirection> = null;

        //   entries.forEach(
        //     ({
        //       boundingClientRect: { top, bottom, left, right },
        //       rootBounds,
        //     }) => {
        //       const bounds: Pick<
        //         DOMRectReadOnly,
        //         "top" | "bottom" | "left" | "right"
        //       > = rootBounds ?? {
        //         top: 0,
        //         bottom: window.innerHeight,
        //         left: 0,
        //         right: window.innerWidth,
        //       };

        //       const diffs = {
        //         top: top - bounds.top,
        //         bottom: bounds.bottom - bottom,
        //         right: bounds.right - right,
        //         left: left - bounds.left,
        //       };
        //       /**
        //        * Sets the conditions to activate the clipping
        //        * Checks if the tooltip is clipped
        //        * Updates the clipping direction when clipped
        //        */
        //       const clippingMap: Record<TooltipDirection, boolean> = {
        //         top: diffs.top < 0,
        //         bottom: diffs.bottom < 0,
        //         right: diffs.right < 0,
        //         left: diffs.left < 0,
        //       };

        //       /**
        //        * Updates the clipping direction
        //        * with the direction that is clippin the most by comparing diffs
        //        */
        //       clippingDirection =
        //         objectEntries(clippingMap).reduce(
        //           (
        //             prevClipDir: Nullable<TooltipDirection>,
        //             [clipDir, isClipping]
        //           ): Nullable<TooltipDirection> => {
        //             if (!isClipping) return prevClipDir;
        //             const currentDiff = Math.abs(diffs[clipDir]);
        //             if (
        //               !prevClipDir ||
        //               currentDiff > Math.abs(diffs[prevClipDir])
        //             )
        //               return clipDir;
        //             return prevClipDir;
        //           },
        //           clippingDirection
        //         ) ?? clippingDirection;
        //     }
        //   );

        //   /**
        //    * Update tooltip direction when clipped to the opposite of the clipping direction
        //    */
        //   if (clippingDirection) {
        //     setTooltipDirection(inverseDirectionMap[clippingDirection]);
        //   } else {
        //     setTooltipDirection(currentDirection);
        //   }
        // },
        {
          root: observerRoot,
          threshold: THRESHOLDS,
        }
      );
    }

    const tooltipElement = tooltipRef.current;
    const tooltipWrapperElement = tooltipWrapperRef.current;

    /**
     * Checking if the tooltip elements are not null to observe them and enable clipping
     */
    observeTooltip: {
      if (isNull(tooltipElement) || isNull(tooltipWrapperElement))
        break observeTooltip;
      observerRef.current.observe(tooltipElement);
      observerRef.current.observe(tooltipWrapperElement);
    }

    return () => {
      if (observerRef.current && tooltipElement && tooltipWrapperElement) {
        observerRef.current.unobserve(tooltipElement);
        observerRef.current.unobserve(tooltipWrapperElement);
      }
    };
  }, [direction, intersectionRoot]);

  const tooltipContent = useMemo(() => {
    if (isFunction<TooltipContentFn>(content)) return content();

    /**
     * Accepts only JSX elements if content is an object
     */
    if (isObject(content)) {
      if (
        "$$typeof" in content &&
        typeof content.$$typeof === "symbol" &&
        String(content.$$typeof) === "Symbol(react.element)"
      ) {
        return content;
      }
      error("Objecs are not valid as tooltip content");
      return "";
    }
    if (isString(content)) {
      return (
        <Text color="gray-50" size="s">
          {content}
        </Text>
      );
    }
    return content;
  }, [content, error]);

  /**
   * Checks children props and if it is empty, renders a default questionmark icon in the children property
   */
  const RenderedChildren = useCallback(() => {
    if (!children || (isString(children) && isEmptyString(children))) {
      return <Icon name={icon} size="s-4" color="gray-700" />;
    }
    return children;
  }, [children, icon]);

  return (
    <TooltipWrapper
      aria-describedby="[data-testid='tooltip']"
      data-testid="tooltip-wrapper"
      ref={tooltipWrapperRef}
    >
      <ToolipPlaceholder
        data-testid="tooltip-placeholder"
        ref={tooltipRef}
        $direction={direction}
        aria-hidden
      >
        {tooltipContent}
      </ToolipPlaceholder>
      <TooltipContainer
        data-testid="tooltip"
        role="tooltip"
        $direction={tooltipDirection}
      >
        {tooltipContent}
      </TooltipContainer>
      <RenderedChildren />
    </TooltipWrapper>
  );
};

Tooltip.defaultProps = defaultTooltipProps;
export { Tooltip };

const ToolipPlaceholder = styled.div<TooltipStyleProps>`
  ${({ $direction }) => tooltipPlaceholderStyles($direction)}
`;

const TooltipContainer = styled.div<TooltipStyleProps>`
  ${({ $direction }) => getTooltipStyles($direction)}
`;

const TooltipWrapper = styled.div`
  ${tooltipWrapperStyles}
`;
