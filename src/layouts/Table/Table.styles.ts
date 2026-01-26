import { css, type RuleSet } from "styled-components";

import styles from "./Table.module.scss";

import { useCssClasses, useCssStyles } from "@utils";

import type { TableDefaultProps, TableStyleProps } from "./Table.types";

export const tableLayoutStyles = ({ $layout }: TableStyleProps): RuleSet => {
  return css`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: none;
    color: var(--gray-900);
    table-layout: ${$layout};
  `;
};

export function useTableLayoutStyle(props: TableDefaultProps) {
  const className = useCssClasses(
    styles.table,
    [styles.fixed, props.layout === "fixed"],
    props.className
  );

  const style = useCssStyles(props.styleOverride);
  return {
    className,
    style,
  };
}
