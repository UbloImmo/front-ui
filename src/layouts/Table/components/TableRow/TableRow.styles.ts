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

const tableRowListStyles = ({ $clickable }: TableRowStyleProps) => css`
  & > td {
    padding-top: var(--s-2);
    padding-bottom: var(--s-2);
    min-height: var(--s-12);
    height: var(--s-12);
    vertical-align: middle;
    background: white;
    transition: background 150ms var(--bezier);
  }

  &:nth-child(even) > td {
    background: var(--gray-50);
  }

  &:not(:last-child) > td {
    border-bottom: 1px solid var(--primary-light);
  }

  ${$clickable &&
  css`
    cursor: pointer;
    &:hover > td {
      background: var(--primary-light);
    }
  `}
`;

export const tableRowStyles = (props: TableRowStyleProps): RuleSet => {
  const baseStyle =
    props.$style === "list" ? tableRowListStyles : tableRowFormStyles;

  return css`
    ${baseStyle(props)}

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
