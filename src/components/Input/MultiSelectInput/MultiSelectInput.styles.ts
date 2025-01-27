import { css, type RuleSet } from "styled-components";

import { commonInputStyles } from "../Input.styles";
import { selectInputWrapperStyles } from "../SelectInput/SelectInput.styles";

import type { CommonInputStyleProps } from "../Input.types";

export const multiSelectWrapperStyles = (): RuleSet => css`
  ${selectInputWrapperStyles}
  position: relative;
  width: 100%;

  &:has([aria-expanded="true"]) {
    &,
    & [aria-expanded="true"] {
      z-index: 2;
    }
  }
`;

export const multiSelectInputElementStyles = (
  props: CommonInputStyleProps,
): RuleSet => css`
  ${commonInputStyles(props)}
  // vertical padding (6px) equal to input height minus chip height
  padding: 0.375rem var(--s-2);
  padding-right: var(--s-8);
  display: flex;
  align-items: center;
  justify-content: start;
  height: fit-content !important;
  max-height: fit-content !important;
`;
