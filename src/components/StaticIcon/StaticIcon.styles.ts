import type {
  StaticIconSize,
  DefaultStaticIconProps,
  StaticIconContainerStyle,
} from "./StaticIcon.types";
import { css } from "styled-components";
import type { ValueMap, CssRem } from "../../types";

export const staticIconSizeToContainerStyleMap: ValueMap<
  StaticIconSize,
  StaticIconContainerStyle
> = {
  xs: {
    padding: "s-1",
    borderRadius: "s-1",
  },
  s: {
    padding: "s-2",
    borderRadius: "s-1",
  },
  m: {
    padding: "s-2",
    borderRadius: "s-2",
  },
  l: {
    padding: "s-3",
    borderRadius: "s-4",
  },
};

export const staticIconSizeToIconSizeMap: ValueMap<StaticIconSize, CssRem> = {
  xs: "0.75rem",
  s: "1rem",
  m: "1.5rem",
  l: "1.75rem",
};

export const staticIconStyle = ({
  color,
  stroke,
  size,
}: DefaultStaticIconProps) => {
  const { padding, borderRadius } = staticIconSizeToContainerStyleMap[size];

  const borderColorShade = color === "gray" ? "300" : "medium";
  const borderColor = `${color}-${borderColorShade}` as const;

  const backgroundColorShade = color === "gray" ? "50" : "light";
  const backgroundColor = `${color}-${backgroundColorShade}` as const;

  return css`
    padding: var(--${padding});
    border-radius: var(--${borderRadius});
    border: ${stroke
      ? `1px solid var(--${borderColor})`
      : "1px solid transparent"};
    background-color: var(--${backgroundColor});
  `;
};
