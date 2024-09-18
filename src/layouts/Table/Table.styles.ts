import { css, type RuleSet } from "styled-components";

import type { TableStyleProps } from "./Table.types";

export const tableLayoutStyles = ({ $layout }: TableStyleProps): RuleSet => {
  return css`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: none;
    color: var(--gray-900);
    table-layout: ${$layout};
  `;
};
