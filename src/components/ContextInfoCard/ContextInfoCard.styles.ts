import { css, RuleSet } from "styled-components";

export const contextInfoCardContainerStyles = (): RuleSet => css`
  border-radius: var(--s-2);
  padding: var(--s-4);
  background: var(--gray-50);
  width: 100%;
`;

export const contextInfoCardContainerLinkStyles = (): RuleSet => css`
  ${contextInfoCardContainerStyles}
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--s-5);
  position: relative;
  border: 1px solid var(--primary-medium-00);
  transition-property: border-color;
  transition-duration: 300ms;
  transition-timing-function: var(--bezier);
  text-decoration: none;

  &,
  & * {
    cursor: pointer;
  }

  [data-testid="context-info-card-icon-container"] svg,
  [data-testid="context-info-card-icon-container"] svg path {
    transition: fill 150ms var(--bezier);
  }

  &:hover {
    transition-duration: 150ms;
    border-color: var(--primary-medium);

    [data-testid="context-info-card-icon-container"] svg,
    [data-testid="context-info-card-icon-container"] svg path {
      fill: var(--primary-base);
    }
  }
`;

export const contextInfoCardIconContainerStyles = (): RuleSet => css`
  position: absolute;
  right: var(--s-3);
  top: var(--s-3);
  pointer-events: none;
`;
