import type {
  CommonInputStyleProps,
  DefaultCommonInputProps,
} from "./Input.types.ts";
import { commonInputStyles } from "./Input.styles.ts";
import styled from "styled-components";

export const defaultCommonInputProps: DefaultCommonInputProps = {
  error: false,
  disabled: false,
  placeholder: "",
} as const;

export const StyledInput = styled.input<CommonInputStyleProps>`
  ${commonInputStyles}
`;
