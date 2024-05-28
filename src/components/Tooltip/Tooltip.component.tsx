import {
  Nullable,
  isFunction,
  isNull,
  isObject,
  isString,
  objectEntries,
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

const inverseDirectionMap: Record<TooltipDirection, TooltipDirection> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

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
        (entries) => {
          /**
           * Gets current direction of the tooltip
           * initializes the clipping direction as null
           */
          const currentDirection = tooltipDirectionRef.current;
          let clippingDirection: Nullable<TooltipDirection> = null;

          entries.forEach(
            ({
              boundingClientRect: { top, bottom, left, right },
              rootBounds,
              target,
            }) => {
              const bounds: Omit<DOMRectReadOnly, "toJSON"> = rootBounds ?? {
                top: 0,
                bottom: window.innerHeight,
                left: 0,
                right: window.innerWidth,
                height: window.innerHeight,
                width: window.innerWidth,
                x: 0,
                y: 0,
              };

              const diffs = {
                top: top - bounds.top,
                bottom: bottom - bounds.bottom,
                right: right - bounds.right,
                left: left - bounds.left,
              };

              /**
               * Sets the conditions to activate the clipping
               * Checks if the tooltip is clipped
               * Updates the clipping direction when clipped
               */
              const clippingMap: Record<TooltipDirection, boolean> = {
                top: diffs.top < 0,
                bottom: diffs.bottom > bounds.bottom,
                right: diffs.right > window.innerWidth,
                left: diffs.left < 0,
              };

              const clippingEntry = objectEntries(clippingMap).find(
                ([_key, isClipping]) => isClipping
              );
              console.log({
                element: target,
                bounds,
                clippingMap,
                target: { top, bottom, left, right },
                diffs,
                clippingEntry,
              });
              clippingDirection = clippingEntry
                ? clippingEntry[0]
                : clippingDirection;
            }
          );

          console.log(clippingDirection);

          /**
           * Update tooltip direction when clipped to the opposite of the clipping direction
           */
          if (clippingDirection) {
            setTooltipDirection(inverseDirectionMap[clippingDirection]);
          } else {
            setTooltipDirection(currentDirection);
          }
        },
        {
          root: observerRoot,
          threshold: [0, 0.5, 1],
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
    if (isObject(content)) {
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
