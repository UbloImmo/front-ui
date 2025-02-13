import styled from "styled-components";

type TableCellProps = {
  $center?: boolean;
};

export const TableCell = styled.td<TableCellProps>`
  background: var(--white-50);
  border-radius: var(--s-1);
  border: none !important;
  padding: var(--s-2) !important;
  display: table-cell;
  width: max-content;
  vertical-align: ${({ $center }) => ($center ? "center" : "top")};
  transition: background 300ms ease-out 0s;

  span:has(*) {
    margin: 0 !important;
  }
  // normalize stacked margins
  span:not(:has(*:not(code))) {
    margin: var(--s-1) 0 !important;
  }

  [data-testid="badge"] span {
    margin: 0 !important;
  }

  &:nth-child(3) code {
    background: none;
    border: none;
    white-space: nowrap;
  }

  &:last-child {
    min-width: 16rem;
  }
`;
