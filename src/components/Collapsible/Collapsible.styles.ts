import { css, type RuleSet } from "styled-components";

export const collapsibleContainerStyles = (): RuleSet => {
  return css`
    padding: var(--s-2) 0;
    border-bottom: 1px solid var(--primary-light);
  `;
};

export const caretContainerStyles = (): RuleSet => {
  return css`
    cursor: pointer;
    padding: var(--s-2) var(--s-2) var(--s-2) 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
};
