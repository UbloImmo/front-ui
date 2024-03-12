import { DetailedHTMLProps, InputHTMLAttributes, useCallback } from "react";
import { Enum, VoidFn } from "../../types";
import {
  GenericFn,
  NonNullish,
  Nullable,
  Optional,
  isFunction,
  isNull,
  isString,
} from "@ubloimmo/front-util";

type CommonInputProps = {
  error?: boolean;
  errorMessage?: string;
  assistiveText?: string;
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

type LabeledInputProps<TType extends InputType> = InputProps<TType> & {
  label: string;
  required?: boolean;
};

const defaultTextProps: DefaultInputProps<"text"> = {
  value: "string",
  onChange: (value) => console.log(value),
};

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

const TextInput = ({
  value,
  placeholder,
  ...props
}: InputProps<"text"> = defaultTextProps) => {
  const onChange = useInputOnChange<"text">(
    (nativeValue) => isString(nativeValue),
    (nativeValue) => (nativeValue.length === 0 ? null : nativeValue),
    props.onChange
  );
  return (
    <input
      value={value}
      type="text"
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
