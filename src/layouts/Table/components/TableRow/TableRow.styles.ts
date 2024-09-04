import { css, type RuleSet } from "styled-components";

export const tableRowStyles = (): RuleSet => {
  return css`
    td {
      border-right: 1px solid var(--gray-200);
      border-bottom: 1px solid var(--gray-200);
      padding: var(--s-2) var(--s-4);
    }

    td:first-child {
      border-left: 1px solid var(--gray-200);
    }

    &:first-child td {
      border-top: 1px solid var(--gray-200);
    }

    &:first-child td:first-child {
      border-top-left-radius: var(--s-2);
    }

    &:first-child td:last-child {
      border-top-right-radius: var(--s-2);
    }

    &:last-child td:first-child {
      border-bottom-left-radius: var(--s-2);
    }

    &:last-child td:last-child {
      border-bottom-right-radius: var(--s-2);
    }
  `;
};
