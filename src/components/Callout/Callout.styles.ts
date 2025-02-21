import { css, RuleSet } from "styled-components";

import { IconName } from "../Icon";

import { cssVarUsage } from "@utils";

import type { CalloutColor, CalloutStyleProps } from "./Callout.types";

export const computeCalloutIconNames: Record<CalloutColor, IconName> = {
  primary: "InfoSquareFill",
  warning: "QuestionSquareFill",
  pending: "HourglassSplit",
  gray: "SlashSquareFill",
  error: "ExclamationSquareFill",
};

export const calloutStyle = ({ $color, $size }: CalloutStyleProps): RuleSet => {
  const background = cssVarUsage(
    $size === "l" ? "white" : $color === "gray" ? "gray-50" : `${$color}-light`
  );

  const borderColor = cssVarUsage(
    $color === "gray"
      ? "gray-600"
      : $size === "l"
        ? `${$color}-medium`
        : `${$color}-base`
  );

  const borderRadius = cssVarUsage(`s-${$size === "l" ? 2 : 1}`);

  const flexLayout =
    $size === "l"
      ? css`
          flex-direction: column;
          align-items: start;
          padding: var(--s-8);
          // account for left border
          /* padding-left: var(--s-6); */
        `
      : css`
          flex-direction: row;
          align-items: center;
          padding: var(--s-3) var(--s-4);
          // account for left border
          /* padding-left: var(--s-3); */
        `;

  return css`
    display: flex;
    ${flexLayout}
    gap: var(--s-3);
    min-height: var(--s-10);
    width: 100%;
    max-width: 100%;
    min-width: 0;
    border-radius: ${borderRadius};
    background-color: ${background};
    position: relative;
    overflow: hidden;

    ${$size === "l" &&
    css`
      outline: 1px solid ${borderColor};
      outline-offset: -1px;
    `}

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      right: unset;
      height: 100%;
      width: var(--s-1);
      background: ${borderColor};
    }
  `;
};
