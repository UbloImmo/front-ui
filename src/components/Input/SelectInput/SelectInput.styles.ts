import styled, { css, RuleSet } from "styled-components";

import { commonInputContainerStyles, commonInputStyles } from "../Input.styles";
import { CommonInputStyleProps } from "../Input.types";

import { breakpointsPx } from "@/sizes";

export const SelectInputContainer = styled.div<CommonInputStyleProps>`
  ${commonInputContainerStyles}
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const StyledSelectInput = styled.button<CommonInputStyleProps>`
  ${commonInputStyles}
  cursor: pointer;
  text-align: left;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const SelectOptionsContainer = styled.div`
  position: absolute;
  top: var(--s-7);
  width: 100%;
  left: 0;
  z-index: -1;
  border-radius: 0 0 var(--s-1) var(--s-1);
  height: 7rem;
  background-color: white;
  overflow-y: scroll;
  box-shadow: var(--shadow-card-elevation-low);

  @media only screen and (max-width: ${breakpointsPx.XS}) {
    top: var(--s-9);
  }
`;

export const buildSelectOptionItemStyles = (): RuleSet => {
  return css`
    padding: var(--s-2);
    transition: color 150ms ease-in-out, background-color 300ms ease-in-out;
    border-top: 1px solid var(--primary-light);
    display: flex;
    align-items: center;
    justify-content: space-between;

    &[aria-disabled] {
      background-color: var(--gray-50);
      cursor: not-allowed;
    }

    &:not([aria-disabled]):hover {
      span[data-testid="text"] {
        color: var(--primary-base);
      }
      background-color: var(--primary-light);
    }
  `;
};
