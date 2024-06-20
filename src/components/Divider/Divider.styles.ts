import { css, type RuleSet } from "styled-components";

export const dividerLineStyles = (): RuleSet => {
  return css`
    height: 1px;
    flex: 1;
    width: max-content;
    min-width: 0;
    background: var(--primary-light);
  `;
};
