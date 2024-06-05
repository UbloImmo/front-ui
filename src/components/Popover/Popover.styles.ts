import { css } from "styled-components";

import type { PopoverContentStyleProps } from "./Popover.types";
import type { RuleSet } from "styled-components";

export const popoverRootStyles = (): RuleSet => {
  return css`
    // TODO: Add styles
  `;
};

export const popoverTriggerStyles = (): RuleSet => {
  return css`
    background: none;
    border: none;
    border-radius: unset;
    padding: 0;
    margin: 0;
  `;
};

export const popoverInnerTriggerStyles = (): RuleSet => {
  return css`
    width: fit-content;
    height: fit-content;
  `;
};

export const popoverContentStyles = ({
  $fitTriggerWidth,
}: PopoverContentStyleProps): RuleSet => {
  return css`
    width: fit-content;
    height: fit-content;
    &:focus {
      outline: none;
    }

    ${$fitTriggerWidth &&
    css`
      & > *:first-child {
        min-width: var(--radix-tooltip-trigger-width);
        max-width: var(--radix-tooltip-trigger-width);
        width: var(--radix-tooltip-trigger-width);
      }
    `};
  `;
};

export const popoverContentWrapperStyles = (): RuleSet => {
  return css`
    background: white;
    padding: var(--s-3) var(--s-4);
    border-radius: var(--s-2);
    box-shadow: var(--shadow-card-elevation-medium);
    width: fit-content;
  `;
};
