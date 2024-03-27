import { css } from "styled-components";
import { typographyWeightMap } from "../../typography";
import type {
  CommonInputStyleProps,
  InputControlStyleProps,
} from "./Input.types";

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
  onClick,
}: InputControlStyleProps) => css`
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
  pointer-events: ${!onClick ? "none" : "auto"};
  cursor: ${!onClick ? "default" : $disabled ? "not-allowed" : "pointer"};
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
  outline-offset: -2px;
  outline-width: 3px;
  outline: none;

  &:focus:not(:disabled) {
    color: var(--gray-800);
    box-shadow: var(--shadow-input-${$error ? "error" : "default"}-focus);
    outline: 1px solid var(--${$error ? "error" : "primary"}-base-25);
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
    box-shadow: var(--shadow-input ${$error ? "error-default" : "disabled"});
  }

  &:disabled::placeholder {
    color: var(--gray-300);
  }
`;
