import { isArray, isFunction, isNull, isUndefined } from "@ubloimmo/front-util";
import { useCallback, useId, useMemo, useRef } from "react";

import { toStyleProps } from "@utils";

import type {
  CommonInputProps,
  CommonInputStyleProps,
  DefaultCommonInputProps,
  InputOnChangeConditionFn,
  InputOnChangeFn,
  InputOnChangeValueTransformerFn,
  InputProps,
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
  NullishPrimitives,
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
      console.log({
        ariaText: e.target.ariaValueText,
        value: e.target.value,
        asNumber: e.target.valueAsNumber,
        ariaNow: e.target.ariaValueNow,
        nodeValue: e.target.nodeValue,
      });
      if (isFunction<NativeInputOnChangeFn>(onChangeNative)) onChangeNative(e);
      if (isArray(onChangeNative) && onChangeNative.length > 0) {
        onChangeNative
          .filter(isFunction<NativeInputOnChangeFn>)
          .forEach((listener) => listener(e));
      }
      if (
        condition(e.target.value, e.target.validity) &&
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
 * @param {InputProps<TType>} rawProps - The input props, not merged.
 * @param {InputValueTransformerFn<TType>?} valueTransformer - Optional value transformer function.
 * @param {InputValueFallbackTransformerFn?} fallback - Optional fallback function.
 * @param {boolean?} uncontrolled - Optional flag to indicate when uncontrolled input.
 * @return {NativeInputValue} The processed input value.
 */
export const useInputValue = <
  TType extends InputType,
  TGenericValue extends NullishPrimitives = NullishPrimitives
>(
  value: Nullable<InputValue<TType, TGenericValue>>,
  rawProps: InputProps<TType, TGenericValue>,
  valueTransformer?: InputValueTransformerFn<TType>,
  fallback?: InputValueFallbackTransformerFn
): NativeInputValue => {
  return useMemo(() => {
    if (isNull(value)) {
      if (isFunction<InputValueFallbackTransformerFn>(fallback))
        return fallback();
      // detect uncontrolled inputs
      if (rawProps.uncontrolled || isUndefined(rawProps.value))
        return undefined;
      return "";
    }
    if (isFunction<InputValueTransformerFn<TType>>(valueTransformer)) {
      return valueTransformer(value);
    }
    return value as NativeInputValue;
  }, [value, valueTransformer, fallback, rawProps]);
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

/**
 * Generates a unique id for the input element, if the `id` prop is not provided.
 *
 * @param {Pick<CommonInputProps, "id">} props: The props object containing the `id` property.
 * @returns {string}: The unique id for the input element.
 */
export const useInputId = ({ id }: Pick<CommonInputProps, "id">) => {
  const defaultId = useId();
  return useMemo(() => id ?? defaultId, [id, defaultId]);
};
