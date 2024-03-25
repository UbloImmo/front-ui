import type { ColorKey, CssVarUsage, StyleProps, ValueMap } from "@types";
import type {
  ButtonColor,
  ButtonStyle,
  ButtonStyleColors,
  DefaultButtonProps,
} from "./Button.types";
import type { RuleSet } from "styled-components";
import type { Nullable } from "@ubloimmo/front-util";
import { cssVarUsage, fromStyleProps } from "@utils";
import {
  objectEntries,
  objectFromEntries,
  transformObject,
} from "@ubloimmo/front-util";
import { css } from "styled-components";
import { breakpointsPx } from "@/sizes";

const blackButtonStyle: ButtonStyle = {
  primary: {
    default: {
      background: "gray-900",
      content: "gray-100",
    },
    hover: {
      background: "gray-800",
    },
  },
  secondary: {
    default: {
      content: "gray-900",
      border: "gray-900",
    },
    hover: {
      background: "gray-100",
    },
  },
};

const whiteButtonStyle: ButtonStyle = {
  primary: {
    default: {
      background: "gray-50",
      content: "gray-900",
    },
    hover: {
      background: "primary-light",
    },
  },
  secondary: {
    default: {
      content: "gray-900",
      border: "gray-50",
    },
    hover: {
      background: "primary-light",
    },
  },
};

const clearButtonStyle: ButtonStyle = {
  primary: {
    default: {
      content: "primary-base",
    },
    hover: {
      content: "primary-dark",
    },
  },
  secondary: {
    default: {
      content: "gray-600",
    },
    hover: {
      content: "gray-800",
    },
  },
};

const colorButtonStyle = (color: Exclude<ColorKey, "gray">): ButtonStyle => ({
  primary: {
    default: {
      background: `${color}-base`,
      content: "gray-50",
    },
    hover: {
      background: `${color}-dark`,
    },
  },
  secondary: {
    default: {
      border: `${color}-base`,
      content: `${color}-dark`,
      icon: `${color}-base`,
    },
    hover: {
      icon: `${color}-dark`,
      background: `${color}-light`,
      border: `${color}-dark`,
    },
  },
});

const buttonStyleMap: ValueMap<ButtonColor, ButtonStyle> = {
  black: blackButtonStyle,
  white: whiteButtonStyle,
  clear: clearButtonStyle,
  primary: colorButtonStyle("primary"),
  red: colorButtonStyle("error"),
};

const buttonColorStyles = ({
  color,
  secondary,
}: DefaultButtonProps): RuleSet => {
  const rawButtonColors =
    buttonStyleMap[color][secondary ? "secondary" : "primary"];

  let defaultColors = transformObject(rawButtonColors.default, (color) =>
    color ? cssVarUsage(color) : null
  );
  defaultColors = {
    ...defaultColors,
    icon: defaultColors.icon ?? defaultColors.content,
  };
  const hoverColors = objectFromEntries(
    objectEntries({
      ...rawButtonColors.hover,
      icon: rawButtonColors.hover.icon ?? rawButtonColors.hover.content,
    }).map(([key, color]): [keyof ButtonStyleColors, Nullable<CssVarUsage>] => [
      key,
      color ? cssVarUsage(color) : defaultColors[key] ?? null,
    ])
  );

  const getColor = (key: keyof ButtonStyleColors, hovering?: boolean) => {
    const color = defaultColors[key] ?? "transparent";
    if (hovering) return hoverColors[key] ?? color;
    return color;
  };

  return css`
    background-color: ${getColor("background")};
    color: ${getColor("content")};
    border-color: ${getColor("border")};

    span {
      color: ${getColor("content")};
    }

    svg {
      fill: ${getColor("icon")};
    }

    &:hover:not(:disabled) {
      background-color: ${getColor("background", true)};
      color: ${getColor("content", true)};
      border-color: ${getColor("border", true)};

      span {
        color: ${getColor("content", true)};
      }

      svg {
        fill: ${getColor("icon", true)};
      }
    }
  `;
};

const commonButtonStyles = ({
  iconPlacement,
  label,
  color,
}: DefaultButtonProps): RuleSet => css`
  padding: var(--s-3) var(--s-${label ? 4 : 3});
  height: var(--s-10);
  max-height: var(--s-10);
  min-height: var(--s-10);
  font-size: var(--text-m);
  font-weight: var(--text-weight-bold);
  border-radius: var(--s-5);
  cursor: pointer;
  display: flex;
  flex-direction: ${iconPlacement === "right" ? "row-reverse" : "row"};
  align-items: center;
  justify-content: center;
  gap: var(--s-2);
  border-width: 1px;
  border-style: solid;
  box-shadow: ${color === "clear" ? "none" : "var(--shadow-button)"};
  transition: color 300ms ease-out 0s, background-color 300ms ease-out 0s,
    border-color 300ms ease-out 0s;

  span {
    transition: color 300ms ease-out 0s;
  }

  svg {
    transition: fill 300ms ease-out 0s;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    transition-duration: 150ms;

    svg,
    span {
      transition-duration: 150ms;
    }
  }

  &:disabled,
  &:disabled:hover {
    cursor: not-allowed;
    opacity: 0.33;
  }

  @media screen and (max-width: ${breakpointsPx.SM}) {
    gap: var(--s-3);
    padding: var(--s-4) var(--s-${label ? 6 : 4});
    height: var(--s-14);
    border-radius: var(--s-7);
    min-height: var(--s-14);
    max-height: var(--s-14);
  }
`;

export const buildButtonStyles = (
  styledProps: StyleProps<DefaultButtonProps>
): RuleSet => {
  const props = fromStyleProps(styledProps);

  return css`
    ${commonButtonStyles(props)}
    ${buttonColorStyles(props)}
  `;
};
