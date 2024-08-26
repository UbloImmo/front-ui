import { css, RuleSet } from "styled-components";

import { IconPickerItemStyleProps } from "./IconPickerItem.types";

import { cssVarUsage } from "@utils";

export const IconPickerItemStyles = ({
  $active,
  $readonly,
}: IconPickerItemStyleProps): RuleSet => {
  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--s-8);
    height: var(--s-8);
    min-width: var(--s-8);
    min-height: var(--s-8);
    max-width: var(--s-8);
    max-height: var(--s-8);
    border-radius: var(--s-05);

    background-color: ${$active ? cssVarUsage("primary-light") : "white"};
    border: 1px solid
      ${$active ? cssVarUsage("primary-medium") : cssVarUsage("primary-light")};
    box-shadow: var(--shadow-button);
    transition: 300ms background-color ease-out 0s,
      300ms border-color ease-out 0s;

    svg[data-testid="icon"] {
      fill: ${$active ? cssVarUsage("primary-base") : cssVarUsage("gray-700")};
    }

    ${!$readonly &&
    css`
      cursor: pointer;

      &:hover:not(:disabled) {
        border: 1px solid
          ${$active
            ? cssVarUsage("primary-base")
            : cssVarUsage("primary-medium")};

        svg[data-testid="icon"] {
          fill: var(--primary-dark);
        }
      }
    `}

    &:disabled {
      border: 1px solid ${$active ? cssVarUsage("gray-300") : "transparent"};
      background-color: ${$active
        ? cssVarUsage("gray-100")
        : cssVarUsage("gray-50")};
      box-shadow: none;
      cursor: not-allowed;

      svg[data-testid="icon"] {
        fill: ${$active
          ? cssVarUsage("primary-dark")
          : cssVarUsage("gray-400")};
      }
    }
  `;
};
