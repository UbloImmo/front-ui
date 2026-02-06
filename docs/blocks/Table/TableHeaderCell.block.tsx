import styles from "./Table.block.module.scss";

import { useCssClasses } from "@utils";

import type { DetailedHTMLProps, ThHTMLAttributes } from "react";

type TableHeaderCellElementProps = DetailedHTMLProps<
  ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

export const TableHeaderCell = ({
  className: cn,
  ...props
}: TableHeaderCellElementProps) => {
  const className = useCssClasses(styles["table-header-cell"], cn);

  return <th className={className} {...props} />;
};
