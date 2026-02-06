import styles from "./Table.block.module.scss";

import { useCssClasses } from "@utils";

import type { DetailedHTMLProps, HTMLAttributes } from "react";

type TableHeaderElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const TableHeader = ({
  className: cn,
  ...props
}: TableHeaderElementProps) => {
  const className = useCssClasses(styles["table-header"], cn);

  return <thead className={className} {...props} />;
};
