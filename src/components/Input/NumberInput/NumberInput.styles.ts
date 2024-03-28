import styled from "styled-components";

import { StyledInput } from "../Input.common";

import type { CommonInputStyleProps } from "..";

export const StyledNumberInput = styled(StyledInput)<CommonInputStyleProps>`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
  appearance: textfield;
`;
