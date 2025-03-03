import { css, type RuleSet } from "styled-components";

export const emptyStateCardStyles = (): RuleSet => {
  return css`
    background: var(--white);
    border-radius: var(--s-2);
    padding: var(--s-6);
    box-shadow: var(--shadow-card-default);
  `;
};
