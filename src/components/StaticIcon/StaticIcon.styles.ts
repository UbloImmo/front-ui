import { css } from "styled-components";

import { cssVarUsage, fromStyleProps } from "@utils";

import type {
  DefaultStaticIconProps,
  StaticIconContainerStyle,
  StaticIconSize,
} from "./StaticIcon.types";
import type { CssRem, StyleProps, ValueMap } from "@types";

export const staticIconSizeToContainerStyleMap: ValueMap<
  StaticIconSize,
  StaticIconContainerStyle
> = {
  xs: {
    borderRadius: "s-1",
    size: "s-5",
  },
  s: {
    borderRadius: "s-1",
    size: "s-7",
  },
  m: {
    borderRadius: "s-2",
    size: "s-10",
  },
  l: {
    borderRadius: "s-4",
    size: "s-12",
  },
};

export const staticIconSizeToIconSizeMap: ValueMap<StaticIconSize, CssRem> = {
  xs: "0.75rem",
  s: "1rem",
  m: "1.5rem",
  l: "1.75rem",
};

export const staticIconStyle = (props: StyleProps<DefaultStaticIconProps>) => {
  const { size, color, stroke } = fromStyleProps(props);
  const { borderRadius, size: wrapperSize } =
    staticIconSizeToContainerStyleMap[size];

  const containerSize = cssVarUsage(wrapperSize);

  const borderColorShade = color === "gray" ? "300" : "medium";
  const borderColor = `${color}-${borderColorShade}` as const;

  const backgroundColorShade = color === "gray" ? "50" : "light";
  const backgroundColor =
    color === "white"
      ? "white"
      : cssVarUsage(`${color}-${backgroundColorShade}`);

  return css`
    border-radius: var(--${borderRadius});
    border: ${stroke
      ? `1px solid var(--${borderColor})`
      : "1px solid transparent"};
    background: ${backgroundColor};
    height: ${containerSize};
    min-height: ${containerSize};
    max-height: ${containerSize};
    width: ${containerSize};
    min-width: ${containerSize};
    max-width: ${containerSize};
    transition: background 150ms ease-out 0s;
  `;
};
