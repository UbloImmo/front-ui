import styled from "styled-components";

import { tableRowStyles } from "./TableRow.styles";

import type { TableProps } from "../../Table.types";

/**
 * A table row component, to be used in `TableBody`.
 */
const TableRow = (props: TableProps) => {
  return (
    <StyledTableRow data-testid="table-row">{props.children}</StyledTableRow>
  );
};

export { TableRow };

const StyledTableRow = styled.tr`
  ${tableRowStyles}
`;
