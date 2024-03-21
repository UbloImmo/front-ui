import type { CommonInputStyleProps } from "./Input.types";
import { typographyWeightMap } from "../../typography";
import { css } from "styled-components";

export const commonInputContainerStyles = ({
  $error,
}: CommonInputStyleProps) => css`
  position: relative;
  height: max-content;
  width: max-content;

  --control-color: var(--${$error ? "error-dark" : "gray-600"});
  &:has(input:focus:not(:disabled)) {
    --control-color: var(--${$error ? "error-base" : "primary-base"});
  }
  &:has(input:disabled) {
    --control-color: var(--gray-400);
  }
`;

export const commonInputControlStyles = ({
  $disabled,
}: CommonInputStyleProps) => css`
  border: none;
  padding: 0;
  background: none;
  position: absolute;
  right: var(--s-2);
  // center vertically;
  top: 50%;
  transform: translateY(-50%);
  height: var(--s-4);
  width: var(--s-4);
  width: max-content;
  svg {
    fill: var(--control-color);
  }
  cursor: ${$disabled ? "not-allowed" : "pointer"};
`;

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
  color: var(--${$error ? "error-dark" : "gray-800"});
  box-shadow: var(--shadow-input-${$error ? "error" : "default"}-default);

  &:focus:not(:disabled) {
    outline: none;
    border: none;
    color: var(--gray-800);
    box-shadow: var(--shadow-input-${$error ? "error" : "default"}-focus);
  }

  &:hover:not(:disabled) {
    box-shadow: var(--shadow-input-${$error ? "error" : "default"}-focus);
  }

  &::placeholder {
    color: var(--gray-400);
  }

  &:disabled {
    background: var(--gray-50);
    color: var(--gray-600);
    box-shadow: var(--shadow-input-disabled);
  }

  &:disabled::placeholder {
    color: var(--gray-300);
  }
`;
