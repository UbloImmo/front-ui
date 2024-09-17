import { css } from "styled-components";

import type { TableCellStyleProps } from "./TableCell.types";

export const tableCellStyles = ({ $padded }: TableCellStyleProps) => {
  return css`
    ${$padded &&
    css`
      padding: var(--s-1) var(--s-2);
    `}
    white-space: nowrap;
  `;
};
