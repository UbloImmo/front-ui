import type { CommonInputStyleProps } from "./Input.types";
import { typographyWeightMap } from "../../typography";
import { css } from "styled-components";

export const commonInputStyles = ({ $error }: CommonInputStyleProps) => css`
  max-height: var(--s-10);
  min-width: 0;
  padding: var(--s-2);
  border-radius: var(--s-1);
  border: none;
  outline: none;
  background: #fff;
  font-size: var(--text-m);
  font-weight: ${typographyWeightMap.regular};
  --control-color: ${$error ? "error-dark" : "gray-600"};
  color: var(--${$error ? "error-dark" : "gray-800"});
  box-shadow: var(--shadow-input-${$error ? "error" : "default"}-default);

  &:focus:not(:disabled) {
    outline: none;
    border: none;
    --control-color: ${$error ? "error-base" : "primary-base"};
    color: var(--gray-800);
    box-shadow: var(--shadow-input-${$error ? "error" : "default"}-focus);
  }

  &::placeholder {
    color: var(--gray-400);
  }

  &:disabled {
    --control-color: var(--gray-400);
    background: var(--gray-50);
    color: var(--gray-600);
    box-shadow: var(--shadow-input-disabled);
  }

  &:disabled::placeholder {
    color: var(--gray-300);
  }
`;
