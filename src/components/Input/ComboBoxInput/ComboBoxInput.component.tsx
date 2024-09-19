import { type NullishPrimitives } from "@ubloimmo/front-util";
import { useCallback } from "react";

import { defaultCommonInputProps } from "../Input.common";

import { ComboBox, type ComboBoxOnChangeFn } from "@/components/ComboBox";
import { useMergedProps, useTestId } from "@utils";

import type {
  ComboBoxInputDefaultProps,
  ComboBoxInputProps,
} from "./ComboBoxInput.types";
import type { TestIdProps } from "@types";
import { useInputId } from "../Input.utils";

const defaultComboBoxInputProps: ComboBoxInputDefaultProps<NullishPrimitives> =
  {
    ...defaultCommonInputProps,
    ...ComboBox.defaultProps,
    options: null,
    value: null,
    onChange: null,
    name: null,
    direction: "row",
  };

/**
 * An internal sub component that maps input props to a combobox
 *
 * @private
 *
 * @remarks Use {@link ComboBox} if you need a combobox, instead of this component.
 *
 * @version 0.0.2
 *
 * @param {ComboBoxInputProps & TestIdProps} props - ComboBoxInput component props
 * @returns {JSX.Element}
 */
const ComboBoxInput = <
  TOptionValue extends NullishPrimitives = NullishPrimitives
>(
  props: ComboBoxInputProps<TOptionValue> & TestIdProps
): JSX.Element => {
  const { onChange, multi, ...mergedProps } = useMergedProps(
    () => defaultComboBoxInputProps as ComboBoxInputDefaultProps<TOptionValue>,
    props
  );
  const testId = useTestId("input-combobox", props);

  const onComboBoxChange = useCallback<ComboBoxOnChangeFn<TOptionValue>>(
    (value) => {
      if (!onChange) return;
      if (multi) return onChange(value);
      return onChange(value[0] ?? null);
    },
    [multi, onChange]
  );

  const id = useInputId(mergedProps);

  return (
    <ComboBox
      {...mergedProps}
      multi={multi}
      onChange={onComboBoxChange}
      testId={testId}
      overrideTestId
      id={id}
    />
  );
};
ComboBoxInput.defaultProps = defaultComboBoxInputProps;

export { ComboBoxInput };
