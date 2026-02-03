import { PopoverArrow } from "@radix-ui/react-popover";
import { isFunction, isNumber, isObject, isString } from "@ubloimmo/front-util";
import { useMemo, useState } from "react";

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
};

/**
 * Text popup box that appears when the user hovers over an element
 *
 * @version 0.1.0
 *
 * @param {TooltipProps & TestIdProps} props - The tooltip's props
 * @returns {JSX.Element} The rendered tooltip
 */
const Tooltip = (props: TooltipProps & TestIdProps): JSX.Element => {
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
  const RenderedChildren = useMemo(() => {
    if (!children || (isString(children) && isEmptyString(children))) {
      return <Icon name={icon} size="s-4" color={iconColor} />;
    }
    return children;
  }, [children, icon, iconColor]);

  return (
    <div
      className={styles.trigger.className}
      style={styles.trigger.style}
      data-testid={`${testId}-wrapper`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
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

Tooltip.defaultProps = defaultTooltipProps;
export { Tooltip };
