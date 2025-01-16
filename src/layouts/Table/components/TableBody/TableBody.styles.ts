import { css, type RuleSet } from "styled-components";

import type { TableBodyStyleProps } from "./TableBody.types";

export const tableBodyStyles = ({ $style }: TableBodyStyleProps): RuleSet => {
  if ($style === "form") return css``;
  return css`
    outline: 1px solid var(--primary-light);
    outline-offset: -1px;
    border-radius: var(--s-1);
    overflow: hidden;
  `;
};
