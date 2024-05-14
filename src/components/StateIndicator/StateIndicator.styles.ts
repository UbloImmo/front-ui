import { css, type RuleSet } from "styled-components";

import { cssVarUsage } from "@utils";

import type {
  StateIndicatorStyleColors,
  StateIndicatorStyleProps,
} from "./StateIndicator.types";
import type { ColorKeyOrWhite } from "@types";

export const computeStateIndicatorColors = (
  color: ColorKeyOrWhite
): StateIndicatorStyleColors => {
  if (color === "gray") {
    return {
      background: "gray-100",
      border: "gray-300",
      label: "gray-800",
      icon: "gray-800",
    };
  }

  if (color === "white")
    return {
      background: "white",
      border: "gray-200",
      label: "gray-600",
      icon: "gray-600",
    };

  return {
    background: `${color}-light`,
    border: `${color}-medium`,
    label: `${color}-dark`,
    icon: `${color}-base`,
  };
};

export const stateIndicatorStyle = ({
  $background,
  $border,
}: StateIndicatorStyleProps): RuleSet => {
  const background =
    $background === "white" ? "white" : cssVarUsage($background);
  const border = cssVarUsage($border);

  return css`
    background: ${background};
    border: 1px solid ${border};
    padding: var(--s-2) var(--s-4);
    width: 100%;
    max-width: 100%;
    min-width: 0;
    min-height: var(--s-10);
    border-radius: var(--s-1);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: var(--s-3);
    overflow-x: hidden;
    overflow-y: visible;

    svg {
      min-width: var(--s-3);
    }

    span {
      max-width: 100%;
      min-width: 0;
      overflow-y: visible;
    }

    ::-webkit-scrollbar {
      display: none;
    }
  `;
};
