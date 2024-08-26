import { css, RuleSet } from "styled-components";

import { IconName } from "../Icon";

import type {
  CalloutColor,
  CalloutStyleColors,
  CalloutStyleProps,
} from "./Callout.types";

export const computeCalloutIconNames: Record<CalloutColor, IconName> = {
  primary: "InfoSquareFill",
  warning: "QuestionSquareFill",
  pending: "HourglassSplit",
  gray: "SlashSquareFill",
  error: "ExclamationSquareFill",
};

export const computeCalloutColors = (
  color: CalloutColor
): CalloutStyleColors => {
  if (color === "gray") {
    return {
      background: "gray-50",
      borderLeft: "gray-600",
      icon: "gray-600",
      text: "gray-700",
    };
  }

  return {
    background: `${color}-light`,
    borderLeft: `${color}-base`,
    icon: `${color}-base`,
    text: `${color}-dark`,
  };
};

export const calloutStyle = ({
  $background,
  $borderLeft,
}: CalloutStyleProps): RuleSet => {
  return css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--s-3);
    padding: var(--s-3) var(--s-4);
    min-height: var(--s-10);
    width: 100%;
    max-width: 100%;
    min-width: 0;
    border-radius: var(--s-1);
    background-color: var(--${$background});
    border-left: var(--s-1) solid var(--${$borderLeft});

    svg {
      min-width: var(--s-4);
    }
  `;
};
