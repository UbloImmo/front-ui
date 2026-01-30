import { isBoolean } from "@ubloimmo/front-util";
import { css } from "styled-components";

import styles from "./ContextLine.module.scss";

import { cssVarUsage, useCssClasses, useCssStyles } from "@utils";

import type {
  ContextLineDefaultProps,
  ContextLineProps,
} from "./ContextLine.types";
import type { StyleProps } from "@types";

export const contextLineStyles = ({
  $borderBottom,
  $paddingHorizontal,
  $compact,
}: StyleProps<ContextLineProps>) => {
  const paddingHorizontal = $paddingHorizontal ? cssVarUsage("s-3") : 0;
  const paddingVertical = cssVarUsage($compact ? "s-2" : "s-3");
  const displayBorder = !(isBoolean($borderBottom) && !$borderBottom);

  return css`
    background: var(--white);
    flex: 1;
    padding: ${paddingVertical} ${paddingHorizontal};
    ${displayBorder &&
    css`
      box-shadow: var(--border-bottom);
    `}

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      box-shadow: none;
    }
  `;
};

export function useContextLineStyles(props: ContextLineDefaultProps) {
  const className = useCssClasses(
    styles["context-line"],
    [styles["padding-horizontal"], props.paddingHorizontal],
    [styles.compact, props.compact],
    [styles["border-bottom"], props.borderBottom],
    props.className
  );

  const style = useCssStyles(props.styleOverride);

  return { className, style };
}
