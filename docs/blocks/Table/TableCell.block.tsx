import styles from "./Table.block.module.scss";

import { useCssClasses } from "@utils";

import type { DetailedHTMLProps, TdHTMLAttributes } from "react";

type TableCellStyleProps = {
  $center?: boolean;
};

type TableCellElementProps = DetailedHTMLProps<
  TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

type TableCellProps = TableCellElementProps & TableCellStyleProps;

export const TableCell = ({
  $center,
  className: cn,
  ...props
}: TableCellProps) => {
  const className = useCssClasses(
    styles["table-cell"],
    [styles.center, $center],
    cn
  );

  return <td className={className} {...props} />;
};
