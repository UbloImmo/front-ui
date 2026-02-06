import styles from "./Table.block.module.scss";

import { useCssClasses } from "@utils";

import type { ParsedPropInfo } from "@docs/docs.types";
import type { StyleProps } from "@types";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type TableRowElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;

type TableRowProps = TableRowElementProps &
  Partial<StyleProps<Pick<ParsedPropInfo, "todo" | "required">>>;

export const TableRow = ({
  className: cn,
  $todo,
  $required,
  ...props
}: TableRowProps) => {
  const className = useCssClasses(
    styles["table-row"],
    [styles.todo, $todo],
    [styles.required, $required],
    cn
  );

  return <tr className={className} {...props} />;
};
