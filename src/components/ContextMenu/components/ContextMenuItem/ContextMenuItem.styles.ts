import styles from "./ContextMenuItem.module.scss";
import { ContextMenuItemDefaultProps } from "./ContextMenuItem.types";

import { useCssClasses, useCssStyles, useStatic } from "@utils";

export function useContextMenuItemStyles({
  styleOverride,
  className,
}: Pick<ContextMenuItemDefaultProps, "styleOverride" | "className">) {
  const s = useCssClasses(styles["context-menu-item"], styles.s, className);
  const m = useCssClasses(styles["context-menu-item"], styles.m, className);
  const label = useCssClasses(styles["context-menu-item-label"]);

  const classNames = useStatic({ s, m, label });

  const style = useCssStyles(styleOverride);

  return { classNames, style };
}
