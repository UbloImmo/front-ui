import { css, type RuleSet } from "styled-components";

import styles from "./EmptyStateCard.module.scss";

import { useCssClasses, useCssStyles } from "@utils";

import type {
  EmptyStateCardDefaultProps,
  EmptyStateCardStyleProps,
} from "./EmptyStateCard.types";

export const emptyStateCardStyles = ({
  $transparent,
}: EmptyStateCardStyleProps): RuleSet => {
  if ($transparent)
    return css`
      padding: var(--s-6);
    `;
  return css`
    background: var(--white);
    border-radius: var(--s-2);
    padding: var(--s-6);
    box-shadow: var(--shadow-card-default);
  `;
};

export function useEmptyStateCardStyles({
  transparent,
  className: cn,
  styleOverride,
}: Pick<
  EmptyStateCardDefaultProps,
  "transparent" | "className" | "styleOverride"
>) {
  const className = useCssClasses(
    styles["empty-state-card"],
    [styles.transparent, transparent],
    cn
  );

  const style = useCssStyles(styleOverride);

  return { className, style };
}
