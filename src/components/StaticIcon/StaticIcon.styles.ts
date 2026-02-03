import { useMemo } from "react";
import { css, type RuleSet } from "styled-components";

import styles from "./StaticIcon.module.scss";

import { cssDimensions } from "@/utils/styles.utils";
import {
  cssVarUsage,
  fromStyleProps,
  useCssClasses,
  useCssVariables,
} from "@utils";

import type {
  DefaultStaticIconProps,
  StaticIconColors,
  StaticIconContainerStyle,
  StaticIconSize,
} from "./StaticIcon.types";
import type { ColorKeyOrWhite, CssRem, StyleProps } from "@types";
import type { ValueMap } from "@ubloimmo/front-util";

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
      ? cssVarUsage("white")
      : cssVarUsage(`${color}-${backgroundColorShade}`);

  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
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

export function getStaticIconColors(color: ColorKeyOrWhite): StaticIconColors {
  if (color === "white")
    return {
      bg: "white",
      border: "gray-100",
      icon: "gray-500",
    };

  if (color === "gray")
    return {
      bg: "gray-50",
      border: "gray-300",
      icon: "gray-600",
    };

  return {
    bg: `${color}-light`,
    border: `${color}-medium`,
    icon: `${color}-base`,
  };
}

export function useStaticIconStyles(
  colors: StaticIconColors,
  props: DefaultStaticIconProps
) {
  const indicator = useCssClasses(styles["static-icon-indicator"]);
  const container = useCssClasses(
    styles["static-icon"],
    styles[`size-${props.size}`],
    [styles.stroke, props.stroke],
    props.className
  );
  const classNames = useMemo(
    () => ({ container, indicator }),
    [container, indicator]
  );

  const style = useCssVariables(
    {
      bg: cssVarUsage(colors.bg),
      "border-color": cssVarUsage(colors.border),
    },
    props.styleOverride
  );

  return {
    classNames,
    style,
  };
}

export const staticIconIndicatorContainerStyle = (): RuleSet => css`
  ${cssDimensions("10px", "10px", true)}
  position: absolute;
  top: calc(var(--s-3) * -0.5);
  right: calc(var(--s-3) * -0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
