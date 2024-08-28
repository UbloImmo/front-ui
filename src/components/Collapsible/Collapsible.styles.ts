import { css } from "styled-components";

import type {
  CollapsibleCaretStyleProps,
  CollapsibleContainerStyleProps,
} from "./Collapsible.types";

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

export const caretContainerStyles = ({
  $isOpen,
}: CollapsibleCaretStyleProps) => {
  return css`
    // padding set to expand caret clickable area
    padding: var(--s-2) var(--s-2) var(--s-2) 0;

    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    & > [data-testid="icon"] {
      transition: transform 150ms var(--bezier);
      ${$isOpen ? "transform: rotate(90deg);" : ""}
    }
  `;
};
