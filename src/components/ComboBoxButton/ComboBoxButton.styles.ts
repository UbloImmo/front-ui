import { type RuleSet, css } from "styled-components";

import { cssVarUsage } from "@utils";

import type {
  ComboBoxButtonDefaultProps,
  ComboButtonIconContainerStyleProps,
} from "./ComboBoxButton.types";
import type { StyleProps } from "@types";

export const ComboBoxButtonStyles = ({
  $active,
  $fill,
}: StyleProps<ComboBoxButtonDefaultProps>): RuleSet => {
  return css`
    min-height: var(--s-8);
    height: var(--s-8);
    max-height: var(--s-8);
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--s-2);
    cursor: pointer;
    background-color: ${$active ? cssVarUsage("primary-light") : "white"};
    padding: var(--s-2) var(--s-4);
    border-radius: var(--s-1);
    border: 1px solid var(--primary-medium);
    overflow: hidden;

    ${$fill &&
    css`
      flex: 1;
    `}

    span[data-testid="text"] {
      color: ${$active ? cssVarUsage("primary-dark") : cssVarUsage("gray-800")};
      overflow: hidden;
    }

    &:not(:disabled) {
      box-shadow: var(--shadow-button);
    }

    &:disabled {
      background-color: var(--gray-50);
      border-color: var(--gray-300);

      span[data-testid="text"] {
        color: var(--gray-600);
      }

      svg[data-testid="icon"] {
        fill: var(--gray-400);
      }
    }
  `;
};

export const ComboBoxIconContainerStyle = ({
  $active,
}: ComboButtonIconContainerStyleProps) => {
  return css`
    position: relative;
    height: var(--s-4);
    min-height: var(--s-4);
    max-height: var(--s-4);
    width: var(--s-4);
    min-width: var(--s-4);
    max-width: var(--s-4);

    & > svg[data-testid="icon"] {
      position: absolute;
      inset: 0;

      &:first-child {
        opacity: ${$active ? 1 : 0};
        fill: ${$active
          ? cssVarUsage("primary-base")
          : cssVarUsage("gray-800")};
      }

      &:last-child {
        opacity: ${$active ? 0 : 1};
        fill: ${$active
          ? cssVarUsage("primary-base")
          : cssVarUsage("gray-800")};
      }
    }
  `;
};
