import { useMemo, type ReactNode } from "react";

import { getBadgeStyleMap } from "../../../Badge/Badge.styles";
import { Text } from "../../../Text/Text.component";
import styles from "../../ColorPicker.module.scss";

import { cssVariables, cssVarUsage, isGrayColor, useCssClasses } from "@utils";

import type { ColorPickerItemProps } from "./ColorPickerItem.types";
import type { PaletteColor } from "@types";

export const ColorPickerItem = ({
  color,
  label,
  active,
  disabled,
  onClick,
}: ColorPickerItemProps): ReactNode => {
  const className = useCssClasses(styles["color-picker-item"], [
    styles.active,
    active,
  ]);

  const { style, textColor } = useMemo(() => {
    const { backgroundColor, textColor: textShade } = getBadgeStyleMap(
      color,
      "light"
    );
    const borderShade = isGrayColor(color) ? "300" : "medium";
    return {
      style: cssVariables({
        "swatch-background": cssVarUsage(`${color}-${backgroundColor}`),
        "swatch-border": cssVarUsage(`${color}-${borderShade}`),
      }),
      textColor: `${color}-${textShade}` as PaletteColor,
    };
  }, [color]);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      aria-label={label}
      className={className}
      style={style}
      disabled={disabled}
      onClick={onClick}
      data-testid="color-picker-item"
    >
      <span className={styles["color-picker-swatch"]}>
        <Text size="m" weight="bold" color={textColor}>
          Aa
        </Text>
      </span>
      <Text size="xs" color="gray-700" align="center">
        {label}
      </Text>
    </button>
  );
};
