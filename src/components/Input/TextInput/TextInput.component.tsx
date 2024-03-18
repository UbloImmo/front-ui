import type { DefaultInputProps, InputProps, InputValue } from "../Input.types";
import { isString } from "@ubloimmo/front-util";
import { mergeDefaultProps } from "../../../utils";
import { defaultCommonInputProps } from "../Input.common";
import { useInputOnChange, useInputValue } from "../Input.utils";

const defaultTextProps: DefaultInputProps<"text"> = {
  ...defaultCommonInputProps,
  value: null,
  onChange: (_value) => {},
};

/**
 * Renders a text input component.
 *
 * @param {InputProps<"text">} props - The input props.
 * @return {JSX.Element} The rendered text input component.
 */
export const TextInput = (props: InputProps<"text">) => {
  const mergedProps = mergeDefaultProps(defaultTextProps, props);
  const onChangeCallback = useInputOnChange<"text">(
    (nativeValue): nativeValue is InputValue<"text"> => isString(nativeValue),
    (nativeValue) =>
      isString(nativeValue) && nativeValue.length > 0 ? nativeValue : null,
    mergedProps.onChange
  );
  const nativeValue = useInputValue(mergedProps.value);
  return (
    <input
      value={nativeValue}
      type="text"
      onChange={onChangeCallback}
      placeholder={mergedProps.placeholder}
    />
  );
};
