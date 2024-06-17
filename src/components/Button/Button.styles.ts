import {
  objectEntries,
  objectFromEntries,
  transformObject,
} from "@ubloimmo/front-util";
import { css } from "styled-components";

import { breakpointsPx } from "@/sizes";
import { cssVarUsage, fromStyleProps, isValidRgbaStr } from "@utils";

import type {
  ButtonColor,
  ButtonStyle,
  ButtonStyleColors,
  DefaultButtonProps,
} from "./Button.types";
import type { ColorKey, CssVarUsage, RgbaColorStr, StyleProps } from "@types";
import type { Nullable, ValueMap } from "@ubloimmo/front-util";
import type { RuleSet } from "styled-components";

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
      content: "rgba(255, 255, 255, 1)",
      border: "rgba(255, 255, 255, 1)",
      background: "rgba(255, 255, 255, 0.05)",
    },
    hover: {
      background: "rgba(255, 255, 255, 0.05)",
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
      content: `${color}-base`,
      icon: `${color}-base`,
    },
    hover: {
      icon: `${color}-dark`,
      content: `${color}-dark`,
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

const computeButtonColor = ({
  color,
  secondary,
}: Pick<DefaultButtonProps, "color" | "secondary">) => {
  const rawButtonColors =
    buttonStyleMap[color][secondary ? "secondary" : "primary"];

  let defaultColors = transformObject(rawButtonColors.default, (color) =>
    color ? (isValidRgbaStr(color) ? color : cssVarUsage(color)) : null
  );
  defaultColors = {
    ...defaultColors,
    icon: defaultColors.icon ?? defaultColors.content,
  };
  const hoverColors = objectFromEntries(
    objectEntries({
      ...rawButtonColors.hover,
      icon: rawButtonColors.hover.icon ?? rawButtonColors.hover.content,
    }).map(
      ([key, color]): [
        keyof ButtonStyleColors,
        Nullable<CssVarUsage | RgbaColorStr>
      ] => [
        key,
        color
          ? isValidRgbaStr(color)
            ? color
            : cssVarUsage(color)
          : defaultColors[key] ?? null,
      ]
    )
  );

  return (key: keyof ButtonStyleColors, hovering?: boolean) => {
    const color = defaultColors[key] ?? "transparent";
    if (hovering) return hoverColors[key] ?? color;
    return color;
  };
};

const buttonColorStyles = (props: DefaultButtonProps): RuleSet => {
  const getColor = computeButtonColor(props);

  return css`
    background-color: ${getColor("background")};
    color: ${getColor("content")};
    border-color: ${getColor("border")};

    span {
      color: ${getColor("content")};
    }

    svg {
      fill: ${getColor("icon")};

      path {
        fill: inherit;
      }
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
  --button-size: var(--s-8);
  --padding-vertical: calc(var(--button-size) / 4);
  --padding-horizontal-label: calc(var(--button-size) / 2);
  --padding-horizontal: ${label
    ? cssVarUsage("padding-horizontal-label")
    : cssVarUsage("padding-vertical")};
  padding: var(--padding-vertical) var(--padding-horizontal);
  height: var(--button-size);
  max-height: var(--button-size);
  min-height: var(--button-size);
  font-size: var(--text-m);
  border-radius: calc(var(--button-size) / 2);
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

  & > span {
    transition: color 300ms ease-out 0s;
    width: max-content;
  }

  & > svg[data-testid="icon"] {
    transition: fill 300ms ease-out 0s;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    transition-duration: 150ms;

    & > svg[data-testid="icon"],
    & > span {
      transition-duration: 150ms;
    }
  }

  &:disabled,
  &:disabled:hover {
    cursor: not-allowed;
    opacity: 0.33;
    box-shadow: none;
  }

  // fix width if only icon
  &:has([data-testid="icon"]):not(:has(span[data-testid="text"])) {
    width: var(--button-size);
    max-width: var(--button-size);
    min-width: var(--button-size);
  }

  @media only screen and (max-width: ${breakpointsPx.XS}) {
    --button-size: var(--s-13);
    --padding-vertical: var(--s-4);
    --padding-horizontal-label: var(--s-6);
    gap: var(--s-3);
  }
`;

const buttonLoadingStyles = ({
  loading,
  color,
  secondary,
}: DefaultButtonProps): RuleSet => {
  const contentOpacity = loading ? 0 : 1;
  const getColor = computeButtonColor({ color, secondary });
  return css`
    position: relative;

    ${loading &&
    css`
      & > span,
      & > svg[data-testid="icon"] {
        transition: opacity 150ms ease-in-out 0s;
        opacity: ${contentOpacity};
      }
      cursor: progress;
      background: ${getColor("background", true)};
    `}
  `;
};

const buttonModifierStyles = ({
  reverse,
  fullWidth,
}: DefaultButtonProps): RuleSet => {
  const flexDirection = reverse ? "row-reverse" : "row";
  const width = fullWidth ? "100%" : "auto";
  return css`
    flex-direction: ${flexDirection};
    width: ${width};
  `;
};

export const buildButtonStyles = (
  styledProps: StyleProps<DefaultButtonProps>
): RuleSet => {
  const props = fromStyleProps(styledProps);

  return css`
    ${commonButtonStyles(props)}
    ${buttonColorStyles(props)}
    ${buttonLoadingStyles(props)}
    ${buttonModifierStyles(props)}
  `;
};

export const buildButtonLoadingContainerStyles = ({
  $loading,
}: StyleProps<Pick<DefaultButtonProps, "loading">>): RuleSet => {
  const loaderOpacity = $loading ? 1 : 0;
  const transitionDelay = $loading ? 150 : 0;
  const pointerEvents = $loading ? "all" : "none";
  return css`
    position: absolute;
    inset: 0;
    opacity: ${loaderOpacity};
    transition: opacity 150ms ease-out ${transitionDelay}ms;
    pointer-events: ${pointerEvents};
    display: flex;
    align-items: center;
    justify-content: center;
  `;
};
