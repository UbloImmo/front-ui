import { useMemo } from "react";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { FlexLayout } from "@/layouts/Flex";

import type { SizedActionProps } from "../Action.types";
import type { PaletteColor, TextProps } from "@types";

/**
 * Renders the contents of an Action in the `centered` size.
 *
 * @param {SizedActionProps} props - Complete, sanitized and parsed Action properties.
 */
export const ActionCentered = ({
  isHovering,
  label,
  icon,
  disabled,
  testId,
  color,
}: SizedActionProps) => {
  const iconColor = useMemo<PaletteColor>(() => {
    if (disabled) return "gray-400";
    if (isHovering) return `${color}-base`;
    return `${color}-dark`;
  }, [disabled, isHovering, color]);

  const textProps = useMemo<TextProps>(() => {
    const color: PaletteColor = disabled ? "gray-600" : iconColor;
    const weight = isHovering ? "bold" : "medium";
    return {
      color,
      weight,
      size: "m",
    };
  }, [disabled, isHovering, iconColor]);

  return (
    <FlexLayout fill direction="row" align="center" justify="center" gap="s-2">
      <Icon name={icon} size="s-4" color={iconColor} />
      <Text testId={`${testId}-label`} overrideTestId {...textProps}>
        {label}
      </Text>
    </FlexLayout>
  );
};
