import styles from "./Action.module.scss";

import { useCssClasses, useCssStyles } from "@utils";

import type { DefaultActionProps } from "./Action.types";

/**
 * Generates the CSS styles for the action component container button.
 *
 * @param {DefaultActionProps} props - Action component's props.
 * @return  The generated CSS styles & classname for the action container.
 */
export function useActionStyles(props: DefaultActionProps) {
  const className = useCssClasses(
    styles.action,
    [styles.error, props.color === "error"],
    styles[props.size],
    props.className
  );

  const style = useCssStyles(props.styleOverride);

  return {
    className,
    style,
  };
}
