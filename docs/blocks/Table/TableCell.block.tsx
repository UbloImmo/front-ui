import styles from "./Table.block.module.scss";
import { Text } from "../Typography";

import { useCssClasses } from "@utils";

import type { DetailedHTMLProps, TdHTMLAttributes } from "react";

type TableCellStyleProps = {
  $center?: boolean;
  $raw?: boolean;
};

type TableCellElementProps = DetailedHTMLProps<
  TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

type TableCellProps = TableCellElementProps & TableCellStyleProps;

export const TableCell = ({
  $center,
  $raw,
  className: cn,
  children,
  ...props
}: TableCellProps) => {
  const className = useCssClasses(
    styles["table-cell"],
    [styles.center, $center],
    cn
  );

  return (
    <td className={className} {...props}>
      {$raw ? (
        children
      ) : (
        <Text size="m" color="gray-700" weight="medium">
          {children}
        </Text>
      )}
    </td>
  );
};
