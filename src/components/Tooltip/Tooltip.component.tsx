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
  children: "<span>The children</span>",
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

const Tooltip = (props: TooltipProps) => {
  const { error } = useLogger("Tooltip");
  const mergedProps = useMergedProps(defaultTooltipProps, props);

  const { children, content, direction, icon, intersectionRoot } = mergedProps;

  const [tooltipDirection, setTooltipDirection] =
    useState<TooltipDirection>(direction);

  const tooltipDirectionRef = useRef<TooltipDirection>(direction);

  const tooltipRef = useRef<Nullable<HTMLDivElement>>(null);
  const tooltipWrapperRef = useRef<Nullable<HTMLDivElement>>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    tooltipDirectionRef.current = direction;
  }, [direction]);

  useLayoutEffect(() => {
    declareObserver: {
      if (!isNull(observerRef.current)) break declareObserver;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const currentDirection = tooltipDirectionRef.current;
          let clippingDirection: Nullable<TooltipDirection> = null;
          entries.forEach(
            ({ boundingClientRect: { top, bottom, left, right } }) => {
              const clippingMap: Record<TooltipDirection, boolean> = {
                top: top < 0,
                bottom: bottom > window.innerHeight,
                right: right > window.innerWidth,
                left: left < 0,
              };
              const clippingEntry = objectEntries(clippingMap).find(
                ([_key, isClipping]) => isClipping
              );
              clippingDirection = clippingEntry
                ? clippingEntry[0]
                : clippingDirection;
            }
          );

          if (clippingDirection) {
            setTooltipDirection(inverseDirectionMap[clippingDirection]);
          } else {
            setTooltipDirection(currentDirection);
          }
        },
        {
          root: intersectionRoot,
          threshold: [0, 0.5, 1],
        }
      );
    }

    const tooltipElement = tooltipRef.current;
    const tooltipWrapperElement = tooltipWrapperRef.current;

    // observer le toolip SI tooltipRef.current n'est pas null
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

  const RenderedChildren = useCallback(() => {
    if (!children || (isString(children) && isEmptyString(children))) {
      return <Icon name={icon} size="s-4" color="gray-700" />;
    }
    return children;
  }, [children, icon]);

  return (
    <TooltipWrapper
      aria-describedby="[data-testid='tooltip']"
      data-testid="toolip-wrapper"
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
