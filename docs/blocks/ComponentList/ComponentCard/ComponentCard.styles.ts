import { css, type RuleSet } from "styled-components";

import type { ComponentCardContainerProps } from "./ComponentCard.types";

export const componentCardStyle = ({
  $size,
}: ComponentCardContainerProps): RuleSet => {
  return css`
    --cell-size: var(--cell-size-${$size});
    padding: var(--s-2);
    background: var(--gray-50);
    border-radius: var(--s-3);
    display: flex;
    flex-direction: column;
    gap: var(--s-3);
    grid-column-end: span var(--cell-size);
    grid-row-end: span var(--cell-size);
    height: 100%;
    cursor: pointer;
    border: 1px solid var(--primary-light-00);
    transition: border-color 300ms ease-out 0s;

    h3 {
      cursor: pointer;
    }

    &:hover {
      border-color: var(--primary-light);
      transition-duration: 150ms;

      [data-testid="component-card-component-container"] {
        background: var(--primary-light-40);
      }
    }
  `;
};

export const componentCardContainerStyle = (): RuleSet => {
  return css`
    background: white;
    padding: var(--s-6) var(--s-3);
    border-radius: var(--s-1);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 300ms ease-out 0s;
    overflow: hidden;
  `;
};

export const componentCardInfoContainerStyle = (): RuleSet => {
  return css`
    padding-bottom: var(--s-3);
  `;
};
