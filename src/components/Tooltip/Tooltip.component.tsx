import { PopoverArrow } from "@radix-ui/react-popover";
import { isFunction, isNumber, isObject, isString } from "@ubloimmo/front-util";
import { ReactNode, useCallback, useMemo, useState } from "react";

import { useTooltipStyles } from "./Tooltip.styles";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { FlexColumnLayout } from "@/layouts/Flex";
import { Popover } from "@/layouts/Popover";
import { isEmptyString, useLogger, useMergedProps, useTestId } from "@utils";

import type {
  DefaultTooltipProps,
  TooltipContentFn,
  TooltipProps,
} from "./Tooltip.types";
import type { TestIdProps } from "@types";

const defaultTooltipProps: DefaultTooltipProps = {
  children: "",
  content: "[Tooltip content]",
  direction: "top",
  icon: "QuestionCircleFill",
  iconColor: "gray-700",
  intersectionRoot: null,
  cursor: "help",
  disabled: false,
};

/**
 * Text popup box that appears when the user hovers over an element
 *
 * @version 0.1.1
 *
 * @param {TooltipProps & TestIdProps} props - The tooltip's props
 * @returns {ReactNode} The rendered tooltip
 */
const Tooltip = (props: TooltipProps & TestIdProps): ReactNode => {
  const { error, warn } = useLogger("Tooltip");
  const mergedProps = useMergedProps(defaultTooltipProps, props);
  const testId = useTestId("tooltip", props);

  const {
    children,
    content,
    direction,
    icon,
    intersectionRoot,
    iconColor,
    cursor,
    disabled,
  } = mergedProps;
  const styles = useTooltipStyles(cursor);

  const [isOpen, setIsOpen] = useState(false);

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
      error("Objects are not valid as tooltip content");
      return null;
    }
    if (isString(content) || isNumber(content)) {
      return (
        <FlexColumnLayout fill>
          <Text color="gray-50" size="s" fill>
            {content}
          </Text>
        </FlexColumnLayout>
      );
    }
    warn(`Empty tooltip content provided: ${content}`);
    return content;
  }, [content, error, warn]);

  /**
   * Checks children props and if it is empty, renders a default questionmark icon in the children property
   */
  const RenderedChildren = useMemo<ReactNode>(() => {
    if (!children || (isString(children) && isEmptyString(children))) {
      return <Icon name={icon} size="s-4" color={iconColor} />;
    }
    return children;
  }, [children, icon, iconColor]);

  const onPointerEnter = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
  }, [disabled]);

  const onPointerLeave = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (disabled) return RenderedChildren;

  return (
    <div
      className={styles.trigger.className}
      style={styles.trigger.style}
      data-testid={`${testId}-wrapper`}
      onPointerEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
    >
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        content={
          <>
            <div className={styles.tooltip} data-testid={testId} role="tooltip">
              {tooltipContent}
            </div>
            <PopoverArrow className={styles.arrow} />
          </>
        }
        side={direction}
        sideOffset="s-1"
        collisionBoundary={
          isString(intersectionRoot)
            ? document.querySelector(intersectionRoot)
            : intersectionRoot
        }
        sticky="always"
      >
        {RenderedChildren}
      </Popover>
    </div>
  );
};

Tooltip.__DEFAULT_PROPS = defaultTooltipProps;
export { Tooltip };
