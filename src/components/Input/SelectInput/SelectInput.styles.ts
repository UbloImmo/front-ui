import { css, RuleSet } from "styled-components";

import { commonInputContainerStyles } from "../Input.styles";

import { breakpointsPx } from "@/sizes";

import type { CommonInputStyleProps } from "../Input.types";

export const selectInputStyles = (): RuleSet => {
  return css`
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
    gap: var(--s-1);

    &:disabled {
      cursor: not-allowed;
    }
  `;
};

export const selectInputWrapperStyles = (): RuleSet => css`
  position: relative;
  --input-height: var(--s-8);

  @media screen and (max-width: ${breakpointsPx.XS}) {
    --input-height: var(--s-10);
  }
`;

export const selectInputContainerStyles = (
  props: CommonInputStyleProps
): RuleSet => css`
  ${commonInputContainerStyles(props)}

  display: flex;
  align-items: center;
  cursor: pointer;

  &[aria-expanded] {
    z-index: 1;
  }
`;

export const selectOptionContainerStyles = (): RuleSet => {
  return css`
    position: absolute;
    top: calc(var(--input-height) - var(--s-1));
    padding-top: var(--s-1);
    width: 100%;
    border-radius: 0 0 var(--s-1) var(--s-1);
    min-height: var(--s-8);
    max-height: calc(var(--s-8) * 7 + var(--s-1));
    height: fit-content;
    background-color: white;
    overflow-y: scroll;
    box-shadow: var(--shadow-card-elevation-medium);

    &[aria-expanded] {
      z-index: 1;
    }
  `;
};

const beforeBackgroundColorStyle = (): RuleSet => {
  return css`
    &::before {
      content: "";
      position: absolute;
      background-color: var(--gray-50);
      inset: 0 1px;
    }
  `;
};

export const buildSelectOptionItemStyles = (): RuleSet => {
  return css`
    padding: var(--s-2);
    height: var(--s-8);
    min-height: var(--s-8);
    max-height: var(--s-8);
    transition: background-color 300ms ease-out;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    cursor: pointer;

    span[data-testid="input-select-option-label"] {
      transition: color 300ms ease-out;
    }

    &:not(:first-child) {
      border-top: 1px solid var(--primary-light);
    }

    span {
      overflow: hidden;
    }

    &[aria-disabled] {
      cursor: not-allowed;

      ${beforeBackgroundColorStyle}

      &:last-child::before {
        bottom: 1px;
      }
    }

    span[data-testid="input-select-option-label"],
    svg[data-testid="icon"] {
      position: relative;
    }

    &:not([aria-disabled]):hover {
      span[data-testid="input-select-option-label"] {
        transition-duration: 150ms;
        color: var(--primary-base);
      }
      svg[data-testid="icon"] {
        transition-duration: 150ms;
        fill: var(--primary-base);
      }
      transition-duration: 150ms;
      background-color: var(--primary-light);
    }

    &:last-child {
      &::before,
      & {
        border-radius: 0 0 var(--s-1) var(--s-1);
      }
    }
  `;
};

export const groupOptionLabelStyles = (): RuleSet => {
  return css`
    padding: var(--s-1) var(--s-2);
    height: var(--s-6);
    min-height: var(--s-6);
    max-height: var(--s-6);
    position: relative;
    display: flex;
    align-items: center;
    border-top: 1px solid var(--primary-light);

    span[data-testid="text"] {
      position: relative;
    }

    ${beforeBackgroundColorStyle}
  `;
};
