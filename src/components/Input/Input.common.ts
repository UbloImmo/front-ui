import styled from "styled-components";

import {
  commonInputContainerStyles,
  inputControlStyles,
  commonInputStyles,
  inputControlGroupStyles,
  inputGroupedControlStyles,
} from "./Input.styles.ts";

import type {
  CommonInputStyleProps,
  DefaultCommonInputProps,
  InputControlAnchorProps,
  InputControlStyleProps,
} from "./Input.types.ts";

export const defaultCommonInputProps: DefaultCommonInputProps = {
  error: false,
  disabled: false,
  required: false,
  table: false,
  placeholder: "",
  inputRef: null,
  onChangeNative: null,
  onBlur: null,
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
export const StyledInputControl = styled.div<InputControlStyleProps>`
  ${inputControlStyles}
`;

/**
 * Input control group container styled with {@link inputControlGroupStyles}.
 *
 * Useful when creating stateful inputs with multiple controls,
 */
export const StyledInputControlGroup = styled.div<InputControlAnchorProps>`
  ${inputControlGroupStyles}
`;

export const StyledInputGroupedControl = styled.div<InputControlStyleProps>`
  ${inputGroupedControlStyles}
`;
