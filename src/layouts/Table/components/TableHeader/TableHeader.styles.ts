import styles from "../../Table.module.scss";

import { parseFixedLength } from "@/sizes/size.utils";
import { useCssClasses, useCssVariables } from "@utils";

import type { TableHeaderProps } from "./TableHeader.types";

export function useTableHeaderStyle(props: Required<TableHeaderProps>) {
  const className = useCssClasses(
    styles["table-header"],
    [styles.sticky, props.sticky],
    props.className
  );

  const style = useCssVariables(
    {
      "table-header-top": parseFixedLength(props.top),
    },
    props.styleOverride
  );

  return {
    className,
    style,
  };
}
