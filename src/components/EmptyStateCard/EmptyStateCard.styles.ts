import { css, type RuleSet } from "styled-components";

import type { EmptyStateCardStyleProps } from "./EmptyStateCard.types";

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
