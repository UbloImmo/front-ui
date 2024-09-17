import { css, type RuleSet } from "styled-components";

import { breakpointsPx } from "@/sizes";

import type {
  CommonInputStyleProps,
  InputControlAnchorProps,
  InputControlStyleProps,
} from "./Input.types";

export const commonInputContainerStyles = ({
  $error,
}: CommonInputStyleProps): RuleSet => css`
  position: relative;
  height: max-content;
  width: 100%;
  max-width: 100%;

  --control-color: var(--${$error ? "error-dark" : "gray-600"});
  &:has(input:focus:not(:disabled)) {
    --control-color: var(--${$error ? "error-base" : "primary-base"});
  }
  &:has(input:disabled) {
    --control-color: var(--gray-400);
  }

  &:has(input:disabled) * {
    cursor: not-allowed;
  }

  &:hover input:not(:disabled) {
    box-shadow: var(--shadow-input-${$error ? "error" : "default"}-focus);
    transition-duration: 150ms;
  }
`;

const commonInputControlStyles = ({
  $anchor = "right",
}: InputControlAnchorProps): RuleSet => css`
  border: none;
  padding: 0;
  background: none;
  ${$anchor}: var(--s-2);

  svg {
    fill: var(--control-color);
    transition: fill 150ms ease-out 0s;
  }
`;

export const inputControlGroupStyles = (
  props: InputControlAnchorProps
): RuleSet => css`
  ${commonInputControlStyles(props)}
  position: absolute;
  top: var(--s-2);
  bottom: var(--s-2);
  width: var(--s-3);
  transform: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${props.$noFocus &&
  css`
    pointer-events: all;
  `}
`;

export const inputControlStyles = ({
  onClick,
  ...props
}: InputControlStyleProps): RuleSet => css`
  ${commonInputControlStyles(props)}
  position: absolute;
  height: var(--s-4); // center vertically;
  top: 50%;
  transform: translateY(-50%);
  width: var(--s-4);
  min-width: max-content;
  pointer-events: ${onClick ? "all" : "none"};
  cursor: ${!onClick ? "default" : props.$disabled ? "not-allowed" : "pointer"};
`;

export const inputGroupedControlStyles = ({
  onClick,
  ...props
}: InputControlStyleProps): RuleSet => css`
  ${commonInputControlStyles(props)}
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

export const commonInputStyles = ({
  $error,
  $table,
}: CommonInputStyleProps): RuleSet => css`
  max-height: var(--s-8);
  height: var(--s-8);
  min-height: var(--s-8);
  min-width: 6rem;
  width: 100%;
  max-width: 100%;
  padding: var(--s-2);
  border-radius: var(--s-1);
  border: none;
  outline: none;
  background: white;
  font-size: var(--text-m);
  font-weight: var(--text-weight-regular);
  color: var(--${$error ? "error-dark" : "gray-800"});
  box-shadow: var(--shadow-input-${$error ? "error" : "default"}-default);
  outline-offset: -2px;
  outline-width: 3px;
  outline: none;

  &,
  &::placeholder {
    transition-property: box-shadow, outline, background, color;
    transition-duration: 300ms;
    transition-timing-function: ease-out;
    transition-delay: 0s;
  }

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
    box-shadow: var(--shadow-input-${$error ? "error-default" : "disabled"});
  }

  &:disabled::placeholder {
    color: var(--gray-300);
  }

  &:hover,
  &:focus,
  &:disabled {
    &,
    &::placeholder {
      transition-duration: 150ms;
    }
  }

  ${$table &&
  css`
    border-radius: 0;
    box-shadow: ${$error ? "var(--shadow-input-error-default)" : "none"};
    outline: none;

    --cell-border-radius: calc(var(--s-1) - 1px);

    tr:first-child > td:has(&):first-child & {
      border-top-left-radius: var(--cell-border-radius);
    }

    tr:first-child > td:has(&):last-of-type & {
      border-top-right-radius: var(--cell-border-radius);
    }

    tbody:last-child > tr:last-of-type > td:has(&):first-child & {
      border-bottom-left-radius: var(--cell-border-radius);
    }

    tbody:last-child > tr:last-of-type > td:has(&):last-of-type & {
      border-bottom-right-radius: var(--cell-border-radius);
    }
  `}

  @media screen and (max-width: ${breakpointsPx.XS}) {
    &:not(textarea) {
      max-height: var(--s-10);
      height: var(--s-10);
    }
    min-height: var(--s-10);
    font-weight: var(--text-weight-medium);
  }
`;
