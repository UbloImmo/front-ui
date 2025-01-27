import {
  Nullable,
  isFunction,
  isNull,
  isNumber,
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
  tooltipPlaceholderStyles,
  tooltipStyles,
  tooltipWrapperStyles,
} from "./Tooltip.styles";
import {
  computeTooltipIntersections,
  generateThresholds,
} from "./Tooltip.utils";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { isEmptyString, useLogger, useMergedProps, useTestId } from "@utils";

import type {
  DefaultTooltipProps,
  TooltipContentFn,
  TooltipProps,
  TooltipStyleProps,
  TooltipWrapperStyleProps,
} from "./Tooltip.types";
import type { Direction, TestIdProps } from "@types";

const defaultTooltipProps: DefaultTooltipProps = {
  children: "",
  content: "[Tooltip content]",
  direction: "top",
  icon: "QuestionCircleFill",
  iconColor: "gray-700",
  intersectionRoot: null,
  cursor: "help",
};

const THRESHOLD_COUNT = 15;
const THRESHOLDS = generateThresholds(THRESHOLD_COUNT);
/**
 * Text popup box that appears when the user hovers over an element
 *
 * @version 0.0.6
 *
 * @param {TooltipProps & TestIdProps} props - The tooltip's props
 * @returns {JSX.Element} The rendered tooltip
 */
const Tooltip = (props: TooltipProps & TestIdProps): JSX.Element => {
  const { error, warn } = useLogger("Tooltip");
  const mergedProps = useMergedProps(defaultTooltipProps, props);
  const testId = useTestId("tooltip", props);

  const { children, content, direction, icon, intersectionRoot, iconColor } =
    mergedProps;

  const [tooltipDirection, setTooltipDirection] =
    useState<Direction>(direction);

  const tooltipDirectionRef = useRef<Direction>(direction);

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

      const IO = window.IntersectionObserver ?? null;

      if (isNull(IO)) break declareObserver;

      const observerRoot = isString(intersectionRoot)
        ? document.querySelector<HTMLElement>(intersectionRoot)
        : intersectionRoot;

      observerRef.current = new IO(
        computeTooltipIntersections(
          () => tooltipDirectionRef.current,
          setTooltipDirection,
        ),
        {
          root: observerRoot,
          threshold: THRESHOLDS,
        },
      );
    }

    const tooltipElement = tooltipRef.current;
    const tooltipWrapperElement = tooltipWrapperRef.current;

    /**
     * Checking if the tooltip elements are not null to observe them and enable clipping
     */
    observeTooltip: {
      if (
        isNull(tooltipElement) ||
        isNull(tooltipWrapperElement) ||
        isNull(observerRef.current)
      )
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
      return null;
    }
    if (isString(content) || isNumber(content)) {
      return (
        <Text color="gray-50" size="s" fill>
          {content}
        </Text>
      );
    }
    warn(`Empty tooltip content provided: ${content}`);
    return content;
  }, [content, error, warn]);

  /**
   * Checks children props and if it is empty, renders a default questionmark icon in the children property
   */
  const RenderedChildren = useCallback(() => {
    if (!children || (isString(children) && isEmptyString(children))) {
      return <Icon name={icon} size="s-4" color={iconColor} />;
    }
    return children;
  }, [children, icon, iconColor]);

  return (
    <TooltipWrapper
      aria-describedby={`[data-testid="${testId}"]`}
      data-testid={`${testId}-wrapper`}
      ref={tooltipWrapperRef}
      $cursor={mergedProps.cursor}
      $innerTestId={testId}
    >
      {tooltipContent && (
        <>
          <ToolipPlaceholder
            data-testid={`${testId}-placeholder`}
            ref={tooltipRef}
            $direction={direction}
            aria-hidden
          >
            {tooltipContent}
          </ToolipPlaceholder>
          <TooltipContainer
            data-testid={testId}
            role="tooltip"
            $direction={tooltipDirection}
          >
            {tooltipContent}
          </TooltipContainer>
        </>
      )}
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
  ${({ $direction }) => tooltipStyles($direction)}
`;

const TooltipWrapper = styled.div<TooltipWrapperStyleProps>`
  ${tooltipWrapperStyles}
`;
