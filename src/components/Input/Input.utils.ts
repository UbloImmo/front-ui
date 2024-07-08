import { isArray, isFunction, isNull } from "@ubloimmo/front-util";
import { useCallback, useMemo, useRef } from "react";

import { toStyleProps } from "@utils";

import type {
  CommonInputStyleProps,
  DefaultCommonInputProps,
  InputOnChangeConditionFn,
  InputOnChangeFn,
  InputOnChangeValueTransformerFn,
  InputType,
  InputValue,
  NativeInputOnChangeFn,
  NativeInputValue,
  UseInputRefReturn,
} from "./Input.types";
import type {
  GenericFn,
  Nullable,
  Nullish,
  VoidFn,
} from "@ubloimmo/front-util";
import type { MutableRefObject, RefCallback } from "react";

/**
 * A hook to handle native inputs' onChange events and transform their value if needed.
 *
 * @template {InputType} TType
 * @param {InputOnChangeConditionFn} condition - function that dictates whether to trigger the onChange event
 * @param {InputOnChangeValueTransformerFn<TType>} valueTransformer - function to transform the input value
 * @param {Nullish<InputOnChangeFn<TType>>} onChange - callback function for onChange event
 * @param {Nullish<NativeInputOnChangeFn | Nullable<NativeInputOnChangeFn>[]>} onChangeNative - native callback function for onChange event, or an array of them
 * @return {VoidFn<NativeInputProps["onChange"]>} the generated callback function for input onChange event, to be used as the native input's onChange prop
 */
export const useInputOnChange = <TType extends InputType>(
  condition: InputOnChangeConditionFn,
  valueTransformer: InputOnChangeValueTransformerFn<TType>,
  onChange: Nullish<InputOnChangeFn<TType>>,
  onChangeNative: Nullish<
    NativeInputOnChangeFn | Nullable<NativeInputOnChangeFn>[]
  >
) => {
  return useCallback<NativeInputOnChangeFn>(
    (e) => {
      if (isFunction<NativeInputOnChangeFn>(onChangeNative)) onChangeNative(e);
      if (isArray(onChangeNative) && onChangeNative.length > 0) {
        onChangeNative
          .filter(isFunction<NativeInputOnChangeFn>)
          .forEach((listener) => listener(e));
      }
      if (
        condition(e.target.value) &&
        isFunction<InputOnChangeFn<TType>>(onChange)
      ) {
        onChange(valueTransformer(e.target.value));
      }
    },
    [onChange, onChangeNative, condition, valueTransformer]
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

type InputValueFallbackTransformerFn = GenericFn<[], NativeInputValue>;

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
  valueTransformer?: InputValueTransformerFn<TType>,
  fallback?: InputValueFallbackTransformerFn,
  uncontrolled?: boolean
): NativeInputValue => {
  return useMemo(() => {
    if (isNull(value)) {
      if (isFunction<InputValueFallbackTransformerFn>(fallback))
        return fallback();

      if (uncontrolled) return undefined;
      return "";
    }
    if (isFunction<InputValueTransformerFn<TType>>(valueTransformer)) {
      return valueTransformer(value);
    }
    return value;
  }, [value, valueTransformer, fallback, uncontrolled]);
};

/**
 * Generates the input style props based on the merged input properties.
 *
 * @param {DefaultCommonInputProps} mergedProps - The merged input properties
 * @return {CommonInputStyleProps} The style props for the input
 */
export const useInputStyles = (
  mergedProps: DefaultCommonInputProps
): CommonInputStyleProps => {
  return useMemo(() => {
    const { error, disabled, placeholder, required, table } = mergedProps;
    return toStyleProps({ error, disabled, placeholder, required, table });
  }, [mergedProps]);
};

/**
 * Returns a memoized callback function that focuses the input element and calls the provided callback function.
 *
 * @param {MutableRefObject<Nullable<HTMLInputElement>>} inputRef - The reference to the input element.
 * @param {DefaultCommonInputProps} mergedProps - The merged props object containing the disabled property.
 * @param {VoidFn} callback - The callback function to be called.
 * @return {VoidFn} The memoized callback function.
 */
export const useInputControlCallback = (
  inputRef: MutableRefObject<Nullable<HTMLInputElement>>,
  mergedProps: DefaultCommonInputProps,
  callback: VoidFn
) => {
  return useCallback(() => {
    // abort if disabled
    if (mergedProps.disabled) return;
    // focus input on click,
    if (inputRef.current) inputRef.current.focus();
    // call callback
    callback();
  }, [inputRef, mergedProps, callback]);
};

/**
 * Declared and exposes an input element to both parent and inner ref.
 *
 * @template {Element} TElement: The type of the HTML element to be assigned to both parent and inner refs.
 *
 * @param {DefaultCommonInputProps} mergedProps: The merged props object containing the `disabled` and parent `inputRef` properties.
 * @returns {UseInputRefReturn<TElement>}: An object containing the `inputRef` and `forwardRef` properties.
 */
export const useInputRef = <TElement extends Element = HTMLInputElement>(
  mergedProps: DefaultCommonInputProps
): UseInputRefReturn<TElement> => {
  // declare & expose inner input ref for components that need it
  const inputRef = useRef<Nullable<TElement>>(null);
  /**
   * callback passed to input elements's `ref` property that assigns the element to both parent and inner refs
   *
   * @param {Nullable<TElement>} inputElement: The element or null to be assigned to both parent and inner refs
   *
   */
  const forwardRef = useCallback<RefCallback<Nullable<TElement>>>(
    (inputElement) => {
      inputRef.current = inputElement;
      if (!mergedProps.inputRef) return;
      if (isFunction<VoidFn<[Nullable<TElement>]>>(mergedProps.inputRef)) {
        mergedProps.inputRef(inputElement);
      } else {
        (mergedProps.inputRef as MutableRefObject<Nullable<TElement>>).current =
          inputElement;
      }
    },
    [mergedProps]
  );

  return { inputRef, forwardRef };
};
