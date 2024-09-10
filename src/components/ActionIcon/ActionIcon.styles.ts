import { css } from "styled-components";

import { breakpointsPx } from "@/sizes";
import { cssDimensions } from "@/utils/styles.utils";
import { cssVarUsage } from "@utils";

import type { ActionIconSize, ActionIconStyleProps } from "./ActionIcon.types";
import type { SpacingLabel } from "@types";
import type { ValueMap } from "@ubloimmo/front-util";

const sizeMap: ValueMap<ActionIconSize, SpacingLabel> = {
  s: "s-4",
  m: "s-8",
  l: "s-10",
};

export const actionIconContainerStyles = ({
  $color,
  $size,
}: ActionIconStyleProps) => {
  const isSmall = $size === "s";
  const isMedium = $size === "m";
  const lightColor = cssVarUsage(`${$color}-light`);
  const borderColor = cssVarUsage(`${$color}-medium`);
  const iconHoverColor = cssVarUsage(`${$color}-base`);
  const borderColorTransparent = cssVarUsage(`${$color}-medium-00`);
  const background = isSmall ? lightColor : "white";

  const padding = cssVarUsage(`s-${isSmall ? "05" : isMedium ? "1" : "2"}`);
  const borderRadius = cssVarUsage(`s-${isSmall ? "05" : "1"}`);
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
    transition: background 300ms ease-out 0s, border-color 300ms ease-out 0s,
      box-shadow 300ms ease-out 0s;

    &:disabled {
      cursor: not-allowed;
      background: var(--gray-50);
    }

    &:hover:not(:disabled) {
      transition-duration: 150ms;
      border-color: ${borderColor};
      box-shadow: var(--shadow-card-elevation-medium);

      svg {
        fill: ${iconHoverColor};
      }
    }

    @media only screen and (max-width: ${breakpointsPx.XS}) {
      ${cssDimensions(responsiveSize, responsiveSize, true)}
    }
  `;
};
