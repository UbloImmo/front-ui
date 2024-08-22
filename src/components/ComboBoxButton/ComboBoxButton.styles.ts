import { type RuleSet, css } from "styled-components";

import { breakpointsPx } from "@/sizes";
import { cssVarUsage } from "@utils";

import type {
  ComboBoxButtonDefaultProps,
  ComboButtonIconContainerStyleProps,
} from "./ComboBoxButton.types";
import type { StyleProps } from "@types";

export const ComboBoxButtonStyles = ({
  $active,
  $fill,
  $description,
}: StyleProps<ComboBoxButtonDefaultProps>): RuleSet => {
  const height = $description
    ? "fit-content"
    : cssVarUsage("combobox-button-height");
  return css`
    --combobox-button-height: var(--s-8);
    min-height: var(--combobox-button-height);
    height: ${height};
    max-height: ${height};
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--s-2);
    cursor: pointer;
    background: ${$active ? cssVarUsage("primary-light") : "white"};
    padding: var(--s-2) var(--s-4);
    border-radius: var(--s-1);
    border: 1px solid var(--primary-medium);
    transition: 300ms background ease-out 0s, 300ms border-color ease-out 0s;
    overflow: hidden;

    ${$fill &&
    css`
      flex: 1;
    `}

    span[data-testid="combo-box-button-label"] {
      overflow: hidden;
    }

    &:not(:disabled) {
      box-shadow: var(--shadow-button);
    }

    &:disabled {
      background: var(--gray-50);
      border-color: var(--gray-300);
    }

    &:hover:not(:disabled) {
      border-color: var(--primary-base);
    }

    div[data-testid="combo-box-button-content"] {
      flex: 1;
      overflow: hidden;
    }

    @media only screen and (max-width: ${breakpointsPx.XS}) {
      --combobox-button-height: var(--s-10);
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
