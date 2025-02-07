import { css, type RuleSet } from "styled-components";

export const sumLineContainerStyles = (): RuleSet => css`
  padding: var(--s-3) 0;
  &:first-child {
    border-top: 1px solid var(--primary-base);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--primary-light);
  }
`;

export const sumLineHeadingStyles = (): RuleSet => css`
  font-size: var(--s-9); // 36 pixels
  letter-spacing: 0.03125rem; // 0.5 pixels
  line-height: 3.25rem; // 52 pixels
`;
