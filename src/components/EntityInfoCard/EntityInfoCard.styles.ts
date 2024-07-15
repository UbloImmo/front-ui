import { css, type RuleSet } from "styled-components";

export const entityCardContainerStyles = (): RuleSet => css`
  border-radius: var(--s-2);
  border: 1px solid var(--primary-light);
`;

export const entityCardHeaderStyles = (): RuleSet => css`
  background: var(--gray-50);
  padding: var(--s-1);
  border-top-left-radius: var(--s-2);
  border-top-right-radius: var(--s-2);
`;

export const entityCardContentStyles = (): RuleSet => css`
  padding: var(--s-4);
  background: white;
  border-bottom-left-radius: var(--s-2);
  border-bottom-right-radius: var(--s-2);
  border-top: 1px solid var(--primary-light);
`;

export const entityCardHeadingStyles = (): RuleSet => css`
  width: 100%;
  flex: 1;
  padding-bottom: var(--s-3);
`;
