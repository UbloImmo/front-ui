import { css } from "styled-components";

import { breakpointsPx } from "@/sizes";

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

  &:hover input:not(:disabled) {
    box-shadow: var(--shadow-input-${$error ? "error" : "default"}-focus);
  }
`;

const commonInputControlStyles = () => css`
  border: none;
  padding: 0;
  background: none;
  right: var(--s-2);

  svg {
    fill: var(--control-color);
  }
`;

export const inputControlGroupStyles = () => css`
  ${commonInputControlStyles}
  position: absolute;
  top: var(--s-2);
  bottom: var(--s-2);
  width: var(--s-3);
  transform: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const inputControlStyles = ({
  onClick,
  ...props
}: InputControlStyleProps) => css`
  ${commonInputControlStyles}
  position: absolute;
  height: var(--s-4); // center vertically;
  top: 50%;
  transform: translateY(-50%);
  width: var(--s-4);
  min-width: max-content;
  pointer-events: ${!onClick ? "none" : "auto"};
  cursor: ${!onClick ? "default" : props.$disabled ? "not-allowed" : "pointer"};
`;

export const inputGroupedControlStyles = ({
  onClick,
  ...props
}: InputControlStyleProps) => css`
  ${commonInputControlStyles}
  width: var(--s-4);
  height: max-content;
  flex: 1;
  min-width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${!onClick ? "none" : "auto"};
  cursor: ${!onClick ? "default" : props.$disabled ? "not-allowed" : "pointer"};
`;

export const commonInputStyles = ({ $error }: CommonInputStyleProps) => css`
  max-height: var(--s-8);
  height: var(--s-8);
  min-height: var(--s-8);
  min-width: 12rem;
  padding: var(--s-2);
  border-radius: var(--s-1);
  border: none;
  outline: none;
  background: #fff;
  font-size: var(--text-m);
  font-weight: var(--text-weight-regular);
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

  @media screen and (max-width: ${breakpointsPx.XS}) {
    max-height: var(--s-10);
    height: var(--s-10);
    min-height: var(--s-10);
    font-weight: var(--text-weight-medium);
  }
`;
