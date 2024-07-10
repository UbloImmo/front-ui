import styled from "styled-components";

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
  top: var(--s-8);
  width: 100%;
  left: 0;
  z-index: -1;
  border-radius: var(--s-1);
  height: 7rem;
  background-color: white;
  overflow-y: scroll;
  box-shadow: var(--shadow-card-elevation-low);

  @media only screen and (max-width: ${breakpointsPx.XS}) {
    top: var(--s-9);
  }
`;
