import { css, type RuleSet } from "styled-components";

import type { TableRowStyleProps } from "./TableRow.types";

const tableRowFormStyles = () => css`
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
`;

const tableRowListStyles = () => css`
  padding: var(--s-2) 0;
  background: white;

  &:nth-child(even) {
    background: var(--gray-50);
  }

  &:not(:last-child) {
    box-shadow: var(--border-bottom);
  }
`;

export const tableRowStyles = ({ $style }: TableRowStyleProps): RuleSet => {
  const baseStyle = $style === "list" ? tableRowListStyles : tableRowFormStyles;

  return css`
    ${baseStyle}

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
