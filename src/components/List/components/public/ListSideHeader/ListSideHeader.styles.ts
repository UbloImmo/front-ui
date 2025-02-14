import { css, type RuleSet } from "styled-components";

export const headerContainerStyles = (): RuleSet => css`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--white);
  box-shadow: var(--shadow-card-default);
  border-radius: var(--s-2);
  overflow: hidden;
`;

export const headerTitleContainerStyles = (): RuleSet => css`
  padding: var(--s-4) var(--s-4) var(--s-3);

  &:last-child {
    padding-bottom: var(--s-4);
  }
`;
