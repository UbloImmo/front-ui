import { css } from "styled-components";

import type { ListFilterOptionItemStyleProps } from "./ListFilterOptionItem.types";

export const listFilterOptionItemStyles = (
  props: ListFilterOptionItemStyleProps
) => {
  return css`
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: var(--input-height);
    min-height: fit-content;
    padding: var(--s-2) var(--s-3);
    border-radius: var(--s-1);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: var(--s-2);
    background: var(--gray-50-00);
    cursor: pointer;
    outline: 1px solid var(--primary-medium-00);
    margin: 0;

    transition:
      background 150ms var(--bezier),
      outline 50ms var(--bezier);

    &[aria-disabled="true"] {
      cursor: not-allowed;
    }

    &:hover:not([aria-disabled="true"]) {
      background: var(--primary-light-50);
    }

    &[aria-disabled="true"]:hover {
      background: var(--gray-50);
    }

    ${props.$highlighted &&
    css`
      background: var(--primary-light-25);
      outline: 1px solid var(--primary-medium);
    `}
  `;
};
