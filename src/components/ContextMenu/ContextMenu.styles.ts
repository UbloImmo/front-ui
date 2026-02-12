import { useMemo } from "react";

import styles from "./ContextMenu.module.scss";

import { cssClasses } from "@utils";

import type { ContextMenuDefaultProps } from "./ContextMenu.types";

export function useContextMenuStyles(
  { size }: Pick<ContextMenuDefaultProps, "size">,
  open: boolean
) {
  const classNames = useMemo(
    () => ({
      menu: cssClasses(styles["context-menu"], styles[size]),
      action: cssClasses(styles["context-menu-action"], [styles.open, open]),
    }),
    [open, size]
  );

  return {
    classNames,
  };
}
