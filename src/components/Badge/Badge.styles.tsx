import { css } from "styled-components";

import { BadgeShade, BadgeShadeStyle, DefaultBadgeProps } from "./Badge.types";

import { StyleProps, ValueMap } from "@types";
import { fromStyleProps } from "@utils";

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
  const { backgroundColor } =
    color === "gray"
      ? grayBadgeShadeStyleMap[shade]
      : badgeShadeStyleMap[shade];

  const borderColorShade = color === "gray" ? "300" : "medium";

  return css`
    border: 1px solid var(--${color}-${borderColorShade});
    background-color: var(--${color}-${backgroundColor});
    padding: 0 var(--s-2);
    border-radius: var(--s-1);
    gap: var(--s-1);
    display: flex;
    align-items: center;
    height: var(--s-5);
    max-height: var(--s-5);
    min-height: var(--s-5);
    max-width: max-content;
    user-select: none;
    overflow: hidden;

    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 16rem;
    }
  `;
};
