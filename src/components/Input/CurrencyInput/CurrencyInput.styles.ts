import { css, type RuleSet } from "styled-components";

import type { CurrencyInputStyleProps } from "./CurrencyInput.types";

export const currencyInputStyles = (
  props: CurrencyInputStyleProps
): RuleSet => {
  if (!props.$showSign) return css``;
  return css`
    padding-left: var(--s-8);
  `;
};
