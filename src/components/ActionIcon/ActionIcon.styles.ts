import { css } from "styled-components";

import { cssVarUsage } from "@utils";

import type { ActionIconStyleProps } from "./ActionIcon.types";

export const actionIconContainerStyles = ({
  $color,
  $size,
}: ActionIconStyleProps) => {
  const isSmall = $size === "s";
  const lightColor = cssVarUsage(`${$color}-light`);
  const borderColor = cssVarUsage(`${$color}-medium`);
  const iconHoverColor = cssVarUsage(`${$color}-base`);
  const borderColorTransparent = cssVarUsage(`${$color}-medium-00`);
  const background = isSmall ? lightColor : "white";

  const padding = cssVarUsage(`s-${isSmall ? "05" : "2"}`);
  const borderRadius = cssVarUsage(`s-${isSmall ? "05" : "1"}`);
  const size = cssVarUsage(`s-${isSmall ? "4" : "10"}`);

  return css`
    background: ${background};
    border: none;
    outline: 1px solid ${borderColorTransparent};
    outline-offset: -1px;
    padding: ${padding};
    height: ${size};
    width: ${size};
    max-height: ${size};
    max-width: ${size};
    min-height: ${size};
    min-width: ${size};
    border-radius: ${borderRadius};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: var(--shadow-button);
    transition: background 300ms ease-out 0s, outline-color 300ms ease-out 0s,
      box-shadow 300ms ease-out 0s;

    svg[data-testid="icon"] {
      transition: fill 300ms ease-out 0s;
    }

    &:disabled {
      cursor: not-allowed;
      background: var(--gray-50);
    }

    &:hover:not(:disabled) {
      &,
      svg[data-testid="icon"] {
        transition-duration: 150ms;
      }
      outline-color: ${borderColor};
      box-shadow: var(--shadow-card-elevation-medium);

      svg[data-testid="icon"] {
        fill: ${iconHoverColor};
      }
    }
  `;
};
