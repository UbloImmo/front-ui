import styles from "./Collapsible.module.scss";

import { useCssClasses } from "@utils";

import type { CollapsibleDefaultProps } from "./Collapsible.types";

export function useCollapsibleLayoutStyle(props: CollapsibleDefaultProps) {
  const collapsible = useCssClasses(
    styles.collapsible,
    [styles.compact, props.compact],
    [styles.disabled, props.disabled]
  );

  const caret = useCssClasses(styles["collasible-caret"]);

  const subContainer = useCssClasses(styles["collasible-sub-container"]);

  return {
    collapsible,
    caret,
    subContainer,
  };
}
