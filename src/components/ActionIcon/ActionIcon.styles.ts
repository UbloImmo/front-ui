import { css } from "styled-components";

import { breakpointsPx } from "@/sizes";
import { cssDimensions } from "@/utils/styles.utils";
import { cssVarUsage } from "@utils";

import type {
  ActionIconColor,
  ActionIconSize,
  ActionIconStyleProps,
} from "./ActionIcon.types";
import type { ColorKey, PaletteColor, SpacingLabel } from "@types";
import type { ValueMap } from "@ubloimmo/front-util";

const sizeMap: ValueMap<ActionIconSize, SpacingLabel> = {
  s: "s-6",
  m: "s-8",
  l: "s-10",
};

export const actionIconIconColorMap: ValueMap<
  ActionIconSize,
  Record<ActionIconColor, PaletteColor>
> = {
  s: {
    white: "gray-600",
    error: "error-base",
    primary: "primary-base",
  },
  m: {
    white: "gray-600",
    error: "error-base",
    primary: "primary-base",
  },
  l: {
    white: "gray-800",
    error: "gray-800",
    primary: "primary-base",
  },
};

const actionIconBackgroundMap: ValueMap<
  ActionIconSize,
  Record<ActionIconColor, PaletteColor | "white">
> = {
  s: {
    white: "white",
    error: "error-light",
    primary: "primary-light",
  },
  m: {
    white: "white",
    error: "error-light",
    primary: "primary-light",
  },
  l: {
    white: "white",
    error: "white",
    primary: "primary-light",
  },
};

const actionIconPaddingMap: ValueMap<ActionIconSize, SpacingLabel> = {
  s: "s-05",
  m: "s-1",
  l: "s-2",
};

const actionIconBorderRadiusMap: ValueMap<ActionIconSize, SpacingLabel> = {
  s: "s-05",
  m: "s-1",
  l: "s-1",
};

export const actionIconContainerStyles = ({
  $color,
  $size,
}: ActionIconStyleProps) => {
  const isMedium = $size === "m";
  const normalizedColor: ColorKey = $color === "white" ? "primary" : $color;
  const iconHoverColor = cssVarUsage(`${normalizedColor}-base`);
  const borderColorTransparent = cssVarUsage(`${normalizedColor}-medium-00`);
  const borderColor =
    $size === "l"
      ? cssVarUsage(`${normalizedColor}-medium`)
      : borderColorTransparent;
  const backgroundColor = actionIconBackgroundMap[$size][$color];
  const background = cssVarUsage(backgroundColor);

  const padding = cssVarUsage(actionIconPaddingMap[$size]);
  const borderRadius = cssVarUsage(actionIconBorderRadiusMap[$size]);
  const size = sizeMap[$size];
  const responsiveSize = isMedium ? sizeMap.l : size;

  return css`
    background: ${background};
    border: 1px solid ${borderColorTransparent};
    padding: ${padding};
    ${cssDimensions(size, size, true)}
    border-radius: ${borderRadius};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: var(--shadow-button);
    transition:
      background 300ms ease-out 0s,
      border-color 300ms ease-out 0s,
      box-shadow 300ms ease-out 0s;

    &:hover {
      box-shadow: none;
    }

    &:disabled {
      cursor: not-allowed;
      box-shadow: none;
      background: var(--gray-50);
    }

    &:hover:not(:disabled) {
      transition-duration: 150ms;
      border-color: ${borderColor};

      svg {
        fill: ${iconHoverColor};
      }
    }

    @media only screen and (max-width: ${breakpointsPx.XS}) {
      ${cssDimensions(responsiveSize, responsiveSize, true)}
    }
  `;
};
