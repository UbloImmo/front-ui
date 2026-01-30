import {
  type DetailedHTMLProps,
  forwardRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
} from "react";

import {
  useInputClassName,
  useInputContainerClassName,
  useInputControlClassName,
  useInputControlGroupClassName,
  useInputGroupedControlClassName,
} from "./Input.styles.ts";

import type {
  CommonInputStyleProps,
  DefaultCommonInputProps,
  InputControlAnchorProps,
  InputControlStyleProps,
} from "./Input.types.ts";

type DivElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type InputElementProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const defaultCommonInputProps: DefaultCommonInputProps = {
  error: false,
  disabled: false,
  required: false,
  table: false,
  uncontrolled: false,
  placeholder: "",
  inputRef: null,
  onChangeNative: null,
  onBlur: null,
  autoComplete: null,
  id: null,
} as const;

/**
 * Native input element styled with {@link useInputClassName}.
 */
export const StyledInput = forwardRef<
  HTMLInputElement,
  CommonInputStyleProps & InputElementProps
>(
  (
    {
      className: cn,
      $error,
      $disabled,
      $required,
      $table,
      $placeholder,
      ...props
    },
    ref
  ) => {
    const className = useInputClassName({
      $error,
      $disabled,
      $required,
      $table,
      $placeholder,
      className: cn,
    });
    return <input className={className} ref={ref} {...props} />;
  }
);

/**
 * Input container styled with {@link useInputContainerClassName}.
 *
 * Useful when creating stateful inputs with controls,
 * wrapping {@link StyledInput} and {@link StyledInputControl}
 */

export const StyledInputContainer = forwardRef<
  HTMLDivElement,
  CommonInputStyleProps & DivElementProps
>(
  (
    {
      className: cn,
      $error,
      $disabled,
      $required,
      $table,
      $placeholder,
      ...props
    },
    ref
  ) => {
    const className = useInputContainerClassName({
      $error,
      $disabled,
      $required,
      $table,
      $placeholder,
      className: cn,
    });
    return <div className={className} ref={ref} {...props} />;
  }
);

/**
 * Input control button styled with {@link useInputControlClassName}.
 *
 * Useful when creating stateful inputs with controls,
 * wrapping Icons
 */
export const StyledInputControl = forwardRef<
  HTMLDivElement,
  InputControlStyleProps & DivElementProps
>(
  (
    {
      className: cn,
      $error,
      $disabled,
      $required,
      $table,
      $placeholder,
      $anchor,
      $noFocus,
      onClick,
      ...props
    },
    ref
  ) => {
    const className = useInputControlClassName({
      className: cn,
      $error,
      $disabled,
      $required,
      $table,
      $placeholder,
      $anchor,
      $noFocus,
      onClick,
    });
    return <div className={className} ref={ref} onClick={onClick} {...props} />;
  }
);

/**
 * Input control group container styled with {@link useInputControlGroupClassName}.
 *
 * Useful when creating stateful inputs with multiple controls
 */
export const StyledInputControlGroup = forwardRef<
  HTMLDivElement,
  InputControlAnchorProps & DivElementProps
>(({ $anchor, $noFocus, className: cn, ...props }, ref) => {
  const className = useInputControlGroupClassName({
    $anchor,
    $noFocus,
    className: cn,
  });
  return <div className={className} ref={ref} {...props} />;
});

/**
 * Input grouped control container styled with {@link useInputGroupedControlClassName}.
 *
 * Useful when creating stateful inputs with multiple controls with multiple controls arranged vertically
 */
export const StyledInputGroupedControl = forwardRef<
  HTMLDivElement,
  InputControlStyleProps & DivElementProps
>(
  (
    {
      className: cn,
      $error,
      $disabled,
      $required,
      $table,
      $placeholder,
      $anchor,
      $noFocus,
      onClick,
      ...props
    },
    ref
  ) => {
    const className = useInputGroupedControlClassName({
      className: cn,
      $error,
      $disabled,
      $required,
      $table,
      $placeholder,
      $anchor,
      $noFocus,
      onClick,
    });
    return <div className={className} ref={ref} onClick={onClick} {...props} />;
  }
);
