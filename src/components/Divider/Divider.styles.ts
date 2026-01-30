import { useMemo } from "react";
import { css, type RuleSet } from "styled-components";

import styles from "./Divider.module.scss";
import { DividerDefaultProps } from "./Divider.types";

import { useCssClasses, useCssStyles } from "@utils";

export const dividerLineStyles = (): RuleSet => {
  return css`
    height: 1px;
    flex: 1;
    width: max-content;
    min-width: 0;
    background: var(--primary-light);
  `;
};

export function useDividerStyles(
  props: Pick<DividerDefaultProps, "className" | "styleOverride">
) {
  const line = useCssClasses(styles["divider-line"], props.className);
  const wrapper = useCssClasses(props.className);

  const classNames = useMemo(() => ({ line, wrapper }), [line, wrapper]);

  const style = useCssStyles(props.styleOverride);

  return { classNames, style };
}
