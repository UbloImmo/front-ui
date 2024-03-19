import type { GenericFn, Nullable, Optional } from "@ubloimmo/front-util";
import type {
  InputType,
  InputValue,
  InputOnChangeFn,
  DefaultCommonInputProps,
  CommonInputStyleProps,
} from "./Input.types";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { isFunction, isNull } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";
import { toStyleProps } from "../../utils";

/**
 * All props exposed by a native input
 */
type NativeInputProps = Required<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>;

/**
 * The value returned by a {@link NativeInputProps} `onChange` callback
 */
type NativeInputValue = number | string | undefined;

/**
 * Callback function used by the {@link useInputOnChange} hook
 * to transform an input's native value into an {@link InputValue}.
 *
 * @template {InputType} TType - The input's type
 * @param {NativeInputValue} value - The input's native value
 * @return {Nullable<InputValue<TType>>} The input's transformed value
 */
type InputOnChangeValueTransformerFn<TType extends InputType> = GenericFn<
  [NativeInputValue],
  Nullable<InputValue<TType>>
>;

/**
 * Callback function used by the {@link useInputOnChange} hook
 * if the native input value should be passed to the {@link InputOnChangeValueTransformerFn}.
 */
type InputOnChangeConditionFn = GenericFn<[NativeInputValue], boolean>;

/**
 * A hook to handle native inputs' onChange events and transform their value if needed.
 *
 * @template {InputType} TType
 * @param {InputOnChangeConditionFn} condition - function to check the input value condition
 * @param {InputOnChangeValueTransformerFn<TType>} valueTransformer - function to transform the input value
 * @param {Optional<InputOnChangeFn<TType>>} onChange - optional callback function for onChange event
 * @return {VoidFn<NativeInputProps["onChange"]>} the generated callback function for input onChange event, to be used as the native input's onChange prop
 */
export const useInputOnChange = <TType extends InputType>(
  condition: InputOnChangeConditionFn,
  valueTransformer: InputOnChangeValueTransformerFn<TType>,
  onChange?: Optional<InputOnChangeFn<TType>>
) => {
  return useCallback<NativeInputProps["onChange"]>(
    (e) => {
      if (
        condition(e.target.value) &&
        isFunction<InputOnChangeFn<TType>>(onChange)
      ) {
        onChange(valueTransformer(e.target.value));
      }
    },
    [onChange, condition, valueTransformer]
  );
};

/**
 * A function that transforms an input component's given nullable {@link InputValue}
 * into a {@link NativeInputValue}
 *
 * @template {InputType} TType
 * @param {InputValue<TType>} value - The input value to be transformed
 * @return {NativeInputValue} The transformed input value
 */
type InputValueTransformerFn<TType extends InputType> = GenericFn<
  [InputValue<TType>],
  NativeInputValue
>;

/**
 * A hook that processes and returns a memoized {@link NativeInputValue}
 * based on the provided {@link InputValue}.
 *
 * @template {InputType} TType
 * @param {InputValue<TType>} value - The input value to be processed.
 * @return {NativeInputValue} The processed input value.
 */
export const useInputValue = <TType extends InputType>(
  value: Nullable<InputValue<TType>>,
  valueTransformer?: InputValueTransformerFn<TType>
): NativeInputValue => {
  return useMemo(() => {
    if (isNull(value)) return undefined;
    if (isFunction<InputValueTransformerFn<TType>>(valueTransformer)) {
      return valueTransformer(value);
    }
    return value;
  }, [value, valueTransformer]);
};

export const useInputStyles = (
  mergedProps: DefaultCommonInputProps
): CommonInputStyleProps => {
  return useMemo(() => {
    const { error, disabled, placeholder } = mergedProps;
    return toStyleProps({ error, disabled, placeholder });
  }, [mergedProps]);
};
