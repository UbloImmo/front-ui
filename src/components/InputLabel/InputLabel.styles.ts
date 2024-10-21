import { css, type RuleSet } from "styled-components";

import type { InputLabelTextStyleProps } from "./InputLabel.types";

export const inputLabelStyles = (): RuleSet => css`
  display: flex;
  flex-direction: column;
  gap: var(--s-2);

  & span[data-testid="text input-label-text"] {
    transition: color 150ms ease-out 0s;
  }

  &:has(input:focus, textarea:focus, select:focus)
    span[data-testid="text input-label-text"] {
    color: var(--gray-800);
  }
`;

export const inputLabelTextStyles = ({
  $required,
}: InputLabelTextStyleProps): RuleSet => css`
  ${$required &&
  css`
    &::after {
      content: " *";
      color: var(--warning-base);
    }
  `}
`;
