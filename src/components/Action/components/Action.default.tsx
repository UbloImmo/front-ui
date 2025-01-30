import { useMemo } from "react";

import { Badge } from "@/components/Badge";
import { StaticIcon } from "@/components/StaticIcon";
import { Text } from "@/components/Text";
import { Tooltip } from "@/components/Tooltip";
import { FlexLayout } from "@layouts";

import type { SizedActionProps } from "../Action.types";
import type { PaletteColor, TextProps } from "@types";

/**
 * Renders the contents of an Action in the `default` size.
 *
 * @param {SizedActionProps} props - Complete, sanitized and parsed Action properties.
 */
export const ActionDefault = ({
  isHovering,
  label,
  icon,
  disabled,
  testId,
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
      fill: true,
    };
  }, [disabled, isHovering, color]);

  return (
    <FlexLayout fill direction="row" align="center" gap="s-4">
      <StaticIcon
        name={icon}
        size="s"
        color={iconColor}
        indicator={indicator}
      />

      <FlexLayout
        fill
        direction="row"
        gap="s-2"
        align="center"
        justify="space-between"
      >
        <Text testId={`${testId}-label`} overrideTestId {...textProps}>
          {label}
        </Text>
        <FlexLayout direction="row" gap="s-2" align="center">
          {badgeProps && <Badge {...badgeProps} testId={`${testId}-badge`} />}
          {iconTooltipProps && <Tooltip {...iconTooltipProps} />}
        </FlexLayout>
      </FlexLayout>
    </FlexLayout>
  );
};
