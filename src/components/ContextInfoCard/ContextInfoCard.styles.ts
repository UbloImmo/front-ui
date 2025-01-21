import { css, RuleSet } from "styled-components";

export const contextInfoCardContainerStyles = (): RuleSet => css`
  border-radius: var(--s-2);
  border: 1px solid var(--primary-light);
  padding: var(--s-4);
  background: var(--gray-50);
  width: 100%;
`;
