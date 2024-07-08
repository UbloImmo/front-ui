import styled from "styled-components";

import { commonInputStyles } from "../Input.styles";

import { breakpointsPx } from "@/sizes";

import type { TextAreaInputStyleProps } from "./TextAreaInput.types";

export const StyledTextArea = styled.textarea<TextAreaInputStyleProps>`
  ${commonInputStyles}
  resize: ${({ $resize }) => ($resize ? "vertical" : "none")};
  max-height: unset;
  height: var(--s-16);
  min-height: var(--s-16);

  @media screen and (max-width: ${breakpointsPx.XS}) {
    min-height: var(--s-20);
  }
`;
