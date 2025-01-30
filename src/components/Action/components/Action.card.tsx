import { useMemo } from "react";

import { Badge } from "@/components/Badge";
import { StaticIcon } from "@/components/StaticIcon";
import { Text } from "@/components/Text";
import { Tooltip } from "@/components/Tooltip";
import { FlexLayout } from "@layouts";

import type { SizedActionProps } from "../Action.types";
import type { PaletteColor, TextProps } from "@types";

/**
 * Renders the contents of an Action in the `card` size.
 *
 * @param {SizedActionProps} props - Complete, sanitized and parsed Action properties.
 */
export const ActionCard = ({
  isHovering,
  label,
  icon,
  disabled,
  testId,
  description,
  badgeProps,
  iconTooltipProps,
  indicator,
  color,
}: SizedActionProps) => {
  const iconColor = useMemo(() => {
    if (disabled) return "white";
    if (isHovering) return color;
    return "gray";
  }, [disabled, isHovering, color]);

  const textProps = useMemo<TextProps>(() => {
    const textColor: PaletteColor = disabled
      ? "gray-600"
      : isHovering
        ? `${color}-base`
        : "gray-800";
    return {
      color: textColor,
      weight: "bold",
      size: "m",
      ellipsis: true,
    };
  }, [disabled, isHovering, color]);

  return (
    <FlexLayout fill direction="column" align="start" gap="s-4">
      <StaticIcon
        name={icon}
        size="m"
        color={iconColor}
        indicator={indicator}
      />

      <FlexLayout
        direction="column"
        gap="s-1"
        fill="row"
        justify="center"
        align="start"
      >
        <FlexLayout
          fill="row"
          direction="row"
          gap="s-2"
          align="center"
          justify="start"
        >
          <FlexLayout direction="row" gap="s-1" align="center">
            <Text testId={`${testId}-label`} overrideTestId {...textProps}>
              {label}
            </Text>
            {iconTooltipProps && <Tooltip {...iconTooltipProps} />}
          </FlexLayout>
          {badgeProps && (
            <Badge {...badgeProps} testId={`${testId}-badge`} overrideTestId />
          )}
        </FlexLayout>
        {description && (
          <Text
            color="gray-600"
            fill
            size="s"
            testId={`${testId}-description`}
            overrideTestId
          >
            {description}
          </Text>
        )}
      </FlexLayout>
    </FlexLayout>
  );
};
