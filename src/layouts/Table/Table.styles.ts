import { css, type RuleSet } from "styled-components";

export const tableLayoutStyles = (): RuleSet => {
  return css`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: none;
    color: var(--gray-900);
  `;
};
