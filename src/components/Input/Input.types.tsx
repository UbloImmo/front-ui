import { inputTypes } from "./Input.data";

import type { DirectionHorizontal } from "@/types/global/direction.types";
import type { CurrencyInt, Email, StyleProps } from "@types";
import type {
  Enum,
  GenericFn,
  Nullable,
  NullishPrimitives,
  VoidFn,
} from "@ubloimmo/front-util";
import type {
  DetailedHTMLProps,
  HTMLInputAutoCompleteAttribute,
  InputHTMLAttributes,
  MutableRefObject,
  Ref,
  RefCallback,
} from "react";

/**
 * All props exposed by a native input
 */
export type NativeInputProps = Required<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>;

/**
 * `onChange` property of a native input
 */
export type NativeInputOnChangeFn = NativeInputProps["onChange"];

/**
 * `onBlur` property of a native input
 */
export type NativeInputOnBlurFn = NativeInputProps["onBlur"];

/**
 * The value returned by a {@link NativeInputOnChangeFn} callback
 */
export type NativeInputValue = number | string | undefined;

/**
 * Callback function used by the {@link useInputOnChange} hook
 * to transform an input's native value into an {@link InputValue}.
 *
 * @template {InputType} TType - The input's type
 * @param {NativeInputValue} value - The input's native value
 * @return {Nullable<InputValue<TType>>} The input's transformed value
 */
export type InputOnChangeValueTransformerFn<TType extends InputType> =
  GenericFn<[NativeInputValue], Nullable<InputValue<TType>>>;

/**
 * Callback function used by the {@link useInputOnChange} hook
 * if the native input value should be passed to the {@link InputOnChangeValueTransformerFn}.
 */
export type InputOnChangeConditionFn = GenericFn<[NativeInputValue], boolean>;

/**
 * Common props shared by all Input components
 */
export type CommonInputProps = {
  /**
   * Whether to display an error state (red border)
   *
   * @default false
   */
  error?: boolean;
  /**
   * Whether the input is disabled (grayed out and read-only)
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the input is required. Useful for native form validation.
   *
   * @default false
   */
  required?: boolean;
  /**
   * Whether the input rendered inside a table.
   * Affects styling.
   *
   * @default false
   */
  table?: boolean;
  /**
   * Whether the input is uncontrolled (no value)
   */
  uncontrolled?: boolean;
  /**
   * The text to display when the input has no value
   *
   * @default ""
   */
  placeholder?: string;
  /**
   * The input's `autoComplete` hint attribute
   */
  autoComplete?: Nullable<HTMLInputAutoCompleteAttribute>;
  /**
   * The input's ref
   *
   * @default null
   */
  inputRef?: Ref<Nullable<HTMLInputElement>>;
  /**
   * The input's native `onChange` callback
   *
   * @remarks is called before `props.onChange`, regardless of its call condition
   *
   * @type {Nullable<NativeInputOnChangeFn>}
   * @default null
   */
  onChangeNative?: Nullable<NativeInputOnChangeFn>;
  /**
   * The input's native `onBlur` callback
   *
   * @remarks Stricty declared for compatibility with react-hook-form
   *
   * @type {Nullable<NativeInputOnBlurFn>}
   * @default null
   */
  onBlur?: Nullable<NativeInputOnBlurFn>;
};

export type DefaultCommonInputProps = Required<CommonInputProps>;

/**
 * Custom Input types
 * Used to determine the shape of {@link InputValue},
 * {@link InputOnChangeFn} and {@link InputProps}
 */
export type InputType = Enum<typeof inputTypes>;

/**
 * The value returned and taken by an input component.
 * Varies based on the component's {@link InputType}.
 *
 * @template {InputType} TType - The input's type
 *
 * @see {@link InputOnChangeFn}, {@link InputProps}
 */
export type InputValue<TType extends InputType> = TType extends
  | "text"
  | "password"
  | "phone"
  | "textarea"
  ? string
  : TType extends "number"
  ? number
  : TType extends "currency"
  ? CurrencyInt
  : TType extends "email"
  ? Email
  : TType extends "select"
  ? NullishPrimitives
  : never;

/**
 * An input components `onChange` callback function.
 * Its only argument is the input's new value,
 * which type depends on the input's {@link InputType}.
 *
 * @template {InputType} TType - The input's type
 * @param {Nullable<InputValue<TType>>} value - The input's updated value. Either {@link InputValue<TType>} or null
 */
export type InputOnChangeFn<TType extends InputType> = VoidFn<
  [Nullable<InputValue<TType>>]
>;

/**
 * @extends {CommonInputProps}
 * Genric props used by all Input components.
 * `value` & `onChange` type signatures depend on the input's {@link InputType}
 * @template {InputType} TType - The input's type
 *
 * @see {@link InputValue}, {@link InputOnChangeFn}
 */
export type InputProps<TType extends InputType> = CommonInputProps & {
  /**
   * The input's value or null if empty
   *
   * @default null
   *
   * @type {InputValue | null}
   *
   */
  value?: Nullable<InputValue<TType>>;
  /**
   * The input's onChange callback. Optional.
   *
   * @default null
   *
   * @type {InputOnChangeFn | null}
   */
  onChange?: Nullable<InputOnChangeFn<TType>>;

  /**
   * The name of the input
   *
   * @default null
   */
  name?: Nullable<string>;
};

export type DefaultInputProps<TType extends InputType> = Required<
  InputProps<TType>
>;

export type CommonInputStyleProps = StyleProps<
  Omit<
    DefaultCommonInputProps,
    "inputRef" | "onChangeNative" | "onBlur" | "autoComplete" | "uncontrolled"
  >
>;

export type InputControlStyleProps = CommonInputStyleProps & {
  onClick?: VoidFn;
  $anchor?: DirectionHorizontal;
};

export type InputControlAnchorProps = Pick<InputControlStyleProps, "$anchor">;

export type UseInputRefReturn<TElement extends Element> = {
  inputRef: MutableRefObject<Nullable<TElement>>;
  forwardRef: RefCallback<Nullable<TElement>>;
};
