import { css, keyframes } from "styled-components";

import type {
  PopoverContentStyleProps,
  PopoverTriggerStyleProps,
} from "./Popover.types";
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

export const popoverInnerTriggerStyles = ({
  $fill,
}: PopoverTriggerStyleProps): RuleSet => {
  return css`
    width: fit-content;
    height: fit-content;
    ${$fill &&
    css`
      width: 100%;
    `}
  `;
};

const scaleIn = keyframes`
  from {
    opacity: 0;
    scale: 0.8;
  }
  to {
    opacity: 1;
    scale: 1;
  }
`;

export const popoverContentStyles = ({
  $fitTriggerWidth,
}: PopoverContentStyleProps): RuleSet => {
  return css`
    width: fit-content;
    height: fit-content;
    &:focus {
      outline: none;
    }

    &,
    & > *:first-child {
      z-index: 10;
    }

    transform-origin: var(--radix-popover-content-transform-origin);
    animation: ${scaleIn} 300ms var(--bezier);

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
    z-index: 1;
  `;
};
