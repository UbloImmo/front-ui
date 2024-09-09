import styled from "styled-components";

import { tableScrollViewStyles } from "./TableScrollView.styles";

import type { TableProps } from "../../Table.types";

const TableScrollView = (props: TableProps) => {
  return <StyledTableScrollView>{props.children}</StyledTableScrollView>;
};

export { TableScrollView };

const StyledTableScrollView = styled.div`
  ${tableScrollViewStyles}
`;
