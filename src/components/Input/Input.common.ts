import type {
  CommonInputStyleProps,
  DefaultCommonInputProps,
} from "./Input.types.ts";
import {
  commonInputContainerStyles,
  commonInputControlStyles,
  commonInputStyles,
} from "./Input.styles.ts";
import styled from "styled-components";

export const defaultCommonInputProps: DefaultCommonInputProps = {
  error: false,
  disabled: false,
  placeholder: "",
} as const;

/**
 * Native input element styled with {@link commonInputStyles}.
 */
export const StyledInput = styled.input<CommonInputStyleProps>`
  ${commonInputStyles}
`;

/**
 * Input container styled with {@link commonInputContainerStyles}.
 *
 * Useful when creating stateful inputs with controls,
 * wrapping {@link StyledInput} and {@link StyledInputControl}
 */
export const StyledInputContainer = styled.div<CommonInputStyleProps>`
  ${commonInputContainerStyles}
`;

/**
 * Input control button styled with {@link commonInputControlStyles}.
 *
 * Useful when creating stateful inputs with controls,
 * wrapping Icons
 */
export const SyledInputControl = styled.button<CommonInputStyleProps>`
  ${commonInputControlStyles}
`;
