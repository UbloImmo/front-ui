import { css, RuleSet } from "styled-components";

import { CheckboxDefaultProps } from "./Checkbox.types";

import { StyleProps } from "@types";

export const buildCheckboxContainerStyles = (): RuleSet => {
  return css`
    position: relative;
    height: var(--s-4);
    min-height: var(--s-4);
    max-height: var(--s-4);
    width: var(--s-4);
    min-width: var(--s-4);
    max-width: var(--s-4);
    cursor: pointer;

    svg[data-testid="icon"] {
      overflow: visible;
    }

    & > svg[data-testid="icon"] {
      position: absolute;
      inset: 0;
    }

    input[type="checkbox"] {
      appearance: none;
      height: 0;
      width: 0;
    }

    &[aria-disabled="true"] {
      cursor: not-allowed;
    }
  `;
};

export const buildActiveIconContainerStyles = ({
  $active,
}: StyleProps<CheckboxDefaultProps>): RuleSet => {
  return css`
    height: var(--s-4);
    width: var(--s-4);
    position: relative;

    svg[data-testid="icon"] {
      overflow: visible;
      position: absolute;
      inset: 0;

      &:first-child {
        opacity: ${$active === true ? 1 : 0};
      }

      &:nth-child(2) {
        opacity: ${$active === "mixed" ? 1 : 0};
      }
    }
  `;
};
