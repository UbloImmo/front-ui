import { css, RuleSet } from "styled-components";

import { IconName } from "../Icon";

import { cssVarUsage, isGrayColor } from "@utils";

import type { CalloutColor, CalloutStyleProps } from "./Callout.types";

export const computeCalloutIconNames: Record<CalloutColor, IconName> = {
  primary: "InfoSquareFill",
  warning: "QuestionSquareFill",
  pending: "HourglassSplit",
  gray: "SlashSquareFill",
  error: "ExclamationSquareFill",
};

const calloutIconStyle = ({
  $color,
  $size,
}: Pick<CalloutStyleProps, "$color" | "$size">): RuleSet => {
  const iconSize = cssVarUsage($size === "l" ? "s-6" : "s-4");

  return css`
    fill: ${cssVarUsage(isGrayColor($color) ? "gray-600" : `${$color}-base`)};
    min-width: ${iconSize};
    width: ${iconSize};
    max-width: ${iconSize};
    min-height: ${iconSize};
    height: ${iconSize};
    max-height: ${iconSize};
  `;
};

export const calloutStyle = ({ $color, $size }: CalloutStyleProps): RuleSet => {
  const background =
    $size === "l"
      ? "white"
      : cssVarUsage($color === "gray" ? "gray-50" : `${$color}-light`);

  const borderColor = cssVarUsage(
    $color === "gray"
      ? "gray-600"
      : $size === "l"
      ? `${$color}-medium`
      : `${$color}-base`
  );

  const flexLayout =
    $size === "l"
      ? css`
          flex-direction: column;
          align-items: start;
          padding: var(--s-8) var(--s-7);
        `
      : css`
          flex-direction: row;
          align-items: center;
          padding: var(--s-3) var(--s-4);
        `;

  return css`
    display: flex;
    ${flexLayout}
    gap: var(--s-3);
    min-height: var(--s-10);
    width: 100%;
    max-width: 100%;
    min-width: 0;
    border-radius: var(--s-1);
    background-color: ${background};

    ${$size === "l" &&
    css`
      border: 1px solid ${borderColor};
    `}
    border-left: var(--s-1) solid ${borderColor};

    & > svg[data-testid="icon"] {
      ${calloutIconStyle({ $color, $size })}
    }
  `;
};

export const calloutTitleStyle = ({
  $color,
  $size,
}: CalloutStyleProps): RuleSet => {
  return css`
    color: ${cssVarUsage(
      isGrayColor($color)
        ? "gray-700"
        : $size === "l"
        ? `${$color}-base`
        : `${$color}-dark`
    )};
    font-weight: var(--text-weight-${$size === "l" ? "bold" : "medium"});
  `;
};
