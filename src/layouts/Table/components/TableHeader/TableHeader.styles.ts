import { css, type RuleSet } from "styled-components";

import styles from "../../Table.module.scss";

import { parseFixedLength } from "@/sizes/size.utils";

import type {
  TableHeaderProps,
  TableHeaderStyleProps,
} from "./TableHeader.types";
import { useCssClasses, useCssVariables } from "@utils";

export const tableHeaderStyles = ({
  $sticky,
  $top,
}: TableHeaderStyleProps): RuleSet => {
  if (!$sticky) return css``;
  const top = parseFixedLength($top);
  return css`
    position: sticky;
    top: ${top};
    z-index: 1;

    & > tr > th > div {
      box-shadow: var(--shadow-card-elevation-low);
    }
  `;
};

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
