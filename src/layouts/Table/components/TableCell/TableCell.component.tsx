import { useMergedProps } from "@utils";

import type { CellProps } from "../../Table.types";

const defaultTableCellProps: CellProps = {
  children: null,
  colSpan: 1,
};

/**
 * A table cell component. Used in `TableRow`.
 *
 * @param {CellProps} props - The props for the component.
 * @return {JSX.Element} The rendered table cell.
 */
const TableCell = (props: CellProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultTableCellProps, props);

  return <td colSpan={mergedProps.colSpan}>{props.children}</td>;
};

export { TableCell };
