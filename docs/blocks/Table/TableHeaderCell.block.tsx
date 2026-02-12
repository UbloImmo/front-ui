import styles from "./Table.block.module.scss";
import { Text } from "../Typography";

import { useCssClasses } from "@utils";

import type { DetailedHTMLProps, ThHTMLAttributes } from "react";

type TableHeaderCellElementProps = DetailedHTMLProps<
  ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

export const TableHeaderCell = ({
  className: cn,
  children,
  ...props
}: TableHeaderCellElementProps) => {
  const className = useCssClasses(styles["table-header-cell"], cn);

  return (
    <th className={className} {...props}>
      <Text size="s" weight="medium" color="gray-800">
        {children}
      </Text>
    </th>
  );
};
