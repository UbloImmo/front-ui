import { css, type RuleSet } from "styled-components";

export const tableRowStyles = (): RuleSet => {
  return css`
    & > td {
      border-right: 1px solid var(--gray-200);
      border-bottom: 1px solid var(--gray-200);
    }

    & > td:first-child {
      border-left: 1px solid var(--gray-200);
    }

    &:first-child > td {
      border-top: 1px solid var(--gray-200);
    }

    // remove double border
    tfoot > &:first-child > td {
      border-top: none;
    }

    tbody > &:first-child > td:first-child {
      border-top-left-radius: var(--s-1);
    }

    tbody > &:first-child > td:last-of-type {
      border-top-right-radius: var(--s-1);
    }

    tbody:last-child > &:last-of-type > td:first-child,
    tfoot:last-child > &:last-of-type > td:first-child {
      border-bottom-left-radius: var(--s-1);
    }

    tbody:last-child > &:last-of-type > td:last-of-type,
    tfoot:last-child > &:last-of-type > td:last-of-type {
      border-bottom-right-radius: var(--s-1);
    }
  `;
};
