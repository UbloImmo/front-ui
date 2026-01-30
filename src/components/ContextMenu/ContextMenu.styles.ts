import { useMemo } from "react";
import { css, type RuleSet } from "styled-components";

import styles from "./ContextMenu.module.scss";

import { cssClasses, cssVarUsage } from "@utils";

import type {
  ContextMenuActionIconStyleProps,
  ContextMenuDefaultProps,
  ContextMenuStyleProps,
} from "./ContextMenu.types";

export const contextMenuStyles = ({
  $size,
}: ContextMenuStyleProps): RuleSet => {
  const padding = $size === "m" ? "var(--s-1)" : "0";
  const borderRadius = cssVarUsage($size === "m" ? "s-2" : "s-05");
  const shadow = cssVarUsage(
    `shadow-card-elevation-${$size === "m" ? "high" : "medium"}`
  );
  return css`
    position: relative;
    padding: ${padding};
    border-radius: ${borderRadius};
    box-shadow: ${shadow};
    background: var(--gray-50);
    border: 1px solid var(--primary-medium);
    // Max width of an EntityInfoCard in admin
    max-width: 25.625rem;
  `;
};

export const contextMenuActionIconStyles = ({
  $open,
}: ContextMenuActionIconStyleProps): RuleSet => css`
  ${$open &&
  css`
    background: var(--primary-light);
    border-color: var(--primary-medium);

    svg {
      fill: var(--primary-base);
    }
  `}
`;

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
