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
    transition: 150ms background-color var(--bezier) 0s,
      150ms border-color var(--bezier) 0s;

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
    }
  `;
};
