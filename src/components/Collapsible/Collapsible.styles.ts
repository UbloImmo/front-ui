import { css, type RuleSet } from "styled-components";

import type { CollapsibleContainerStyleProps } from "./Collapsible.types";

export const collapsibleContainerStyles = ({
  $compact,
  $disabled,
}: CollapsibleContainerStyleProps) => {
  return css`
    ${$compact
      ? css`
          padding: var(--s-1) 0;
        `
      : css`
          border-bottom: 1px solid var(--primary-light);
          padding: var(--s-2) 0;
        `}

    ${$disabled &&
    css`
      & *[data-testid="text"] {
        color: var(--gray-600);
      }
    `}
  `;
};

export const caretContainerStyles = (): RuleSet => {
  return css`
    // padding set to expand caret clickable area
    padding: var(--s-2) var(--s-2) var(--s-2) 0;
    border: none;
    background: none;
    cursor: pointer;

    &[aria-expanded] [data-testid="icon"] {
      transition: transform 150ms var(--bezier);
    }

    &[aria-expanded="true"] [data-testid="icon"] {
      transform: rotate(90deg);
    }

    &:disabled {
      cursor: not-allowed;
    }
  `;
};
