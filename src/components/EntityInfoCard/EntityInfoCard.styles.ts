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
  background: var(--white);
  border-top: 1px solid var(--primary-light);

  &:last-child {
    border-bottom-left-radius: var(--s-2);
    border-bottom-right-radius: var(--s-2);
  }
`;

export const entityCardHeadingStyles = (): RuleSet => css`
  width: 100%;
  flex: 1;
  margin-bottom: var(--s-3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const entityCardStatusRowListStyles = (): RuleSet => css`
  &:not(:first-child) {
    margin-top: var(--s-2);
  }
  &:not(:last-child) {
    margin-bottom: var(--s-2);
  }
`;

export const entityCardActionsContainerStyles = (): RuleSet => css`
  background: var(--gray-50);
  padding: var(--s-1);
  border-top: 1px solid var(--primary-light);
  border-bottom-left-radius: var(--s-2);
  border-bottom-right-radius: var(--s-2);
`;
