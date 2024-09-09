import { css } from "styled-components";

import type { TableCellStyleProps } from "../../Table.types";

export const tableCellStyles = ({ $padded }: TableCellStyleProps) => {
  return css`
    ${$padded && `padding: var(--s-2) var(--s-4);`}
    white-space: nowrap;
  `;
};
