import { css } from "styled-components";

import { fromStyleProps, isGrayColor } from "@utils";

import type {
  BadgeShade,
  BadgeShadeStyle,
  DefaultBadgeProps,
} from "./Badge.types";
import type { PaletteColor, StyleProps } from "@types";
import type { ValueMap } from "@ubloimmo/front-util";

export const badgeShadeStyleMap: ValueMap<BadgeShade, BadgeShadeStyle> = {
  light: {
    textColor: "dark",
    backgroundColor: "light",
    iconColor: "base",
  },
  dark: {
    textColor: "light",
    backgroundColor: "dark",
    iconColor: "medium",
  },
};

export const grayBadgeShadeStyleMap: ValueMap<BadgeShade, BadgeShadeStyle> = {
  light: {
    textColor: "800",
    backgroundColor: "50",
    iconColor: "800",
  },
  dark: {
    textColor: "50",
    backgroundColor: "700",
    iconColor: "100",
  },
};

export const badgeStyle = (props: StyleProps<DefaultBadgeProps>) => {
  const { color, shade } = fromStyleProps(props);

  const { backgroundColor } = isGrayColor(color)
    ? grayBadgeShadeStyleMap[shade]
    : badgeShadeStyleMap[shade];

  const borderColorShade = isGrayColor(color) ? "300" : "medium";
  const borderColor = `${color}-${borderColorShade}` as PaletteColor;
  const background = `${color}-${backgroundColor}` as PaletteColor;

  return css`
    border: 1px solid var(--${borderColor});
    background: var(--${background});
    ${commonBadgeStyles}
  `;
};

export const commonBadgeStyles = () => {
  return css`
    padding: 0 var(--s-2);
    border-radius: var(--s-3);
    gap: var(--s-1);
    display: flex;
    align-items: center;
    height: var(--s-5);
    max-height: var(--s-5);
    min-height: var(--s-5);
    max-width: max-content;
    user-select: none;
    overflow: hidden;

    transition-property: background, border;
    transition-duration: 300ms;
    transition-timing-function: var(--bezier);

    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 16rem;
      overflow-y: hidden;
    }
  `;
};
