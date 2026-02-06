import styles from "./Table.block.module.scss";

import { useCssClasses } from "@utils";

import type { DetailedHTMLProps, HTMLAttributes } from "react";

type TableElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

export const Table = ({ className: cn, ...props }: TableElementProps) => {
  const className = useCssClasses(styles["table"], cn);

  return <table className={className} {...props} />;
};
