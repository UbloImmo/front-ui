import { DetailedHTMLProps, InputHTMLAttributes, useCallback } from "react";
import { Enum, VoidFn } from "../../types";
import type {
  GenericFn,
  NonNullish,
  Nullable,
  Optional,
} from "@ubloimmo/front-util";
import { isString, isFunction } from "@ubloimmo/front-util";
import { mergeDefaultProps } from "src";

type CommonInputProps = {
  error?: boolean;
  errorMessage?: Nullable<string>;
  assistiveText?: Nullable<string>;
  disabled?: boolean;
  placeholder?: string;
};

const inputTypes = ["text", "password", "number"] as const;

type InputType = Enum<typeof inputTypes>;

type NativeInputProps = Required<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>;

type NativeInputValue = Parameters<
  NonNullish<NativeInputProps["onChange"]>
>[0]["target"]["value"];

type InputValue<TType extends InputType> = TType extends "text" | "password"
  ? string
  : TType extends "number"
  ? number
  : never;

type InputOnChangeFn<TType extends InputType> = VoidFn<
  [Nullable<InputValue<TType>>]
>;

type InputProps<TType extends InputType> = CommonInputProps & {
  value: InputValue<TType>;
  onChange?: InputOnChangeFn<TType>;
};

type DefaultInputProps<TType extends InputType> = Required<InputProps<TType>>;

const useInputOnChange = <TType extends InputType>(
  condition: GenericFn<[NativeInputValue], boolean>,
  valueTransformer: GenericFn<[NativeInputValue], Nullable<InputValue<TType>>>,
  onChange?: Optional<InputOnChangeFn<TType>>
) => {
  const callback = useCallback<NativeInputProps["onChange"]>(
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
  return callback;
};

const defaultCommonInputProps: Required<CommonInputProps> = {
  assistiveText: null,
  error: false,
  errorMessage: null,
  disabled: false,
  placeholder: "",
};

const defaultTextProps: DefaultInputProps<"text"> = {
  ...defaultCommonInputProps,
  value: "string",
  onChange: (_value) => {},
};

export const TextInput = (props: InputProps<"text"> = defaultTextProps) => {
  const { value, placeholder, onChange } = mergeDefaultProps(
    defaultTextProps,
    props
  );
  const onChangeCallback = useInputOnChange<"text">(
    (nativeValue) => isString(nativeValue),
    (nativeValue) => (nativeValue.length === 0 ? null : nativeValue),
    onChange
  );
  return (
    <input
      value={value}
      type="text"
      onChange={onChangeCallback}
      placeholder={placeholder}
    />
  );
};
