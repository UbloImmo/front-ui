import { useCallback } from "react";

import { defaultCommonInputProps } from "../Input.common";
import { useInputId } from "../Input.utils";

import { IconPicker } from "@/components/IconPicker";
import { TestIdProps } from "@types";
import { useMergedProps, useTestId } from "@utils";

import type {
  IconPickerInputDefaultProps,
  IconPickerInputOnChangeFn,
  IconPickerInputProps,
} from "./IconPickerInput.types";

const defaultIconPickerInputProps: IconPickerInputDefaultProps = {
  ...IconPicker.defaultProps,
  ...defaultCommonInputProps,
  name: null,
  value: null,
  onChange: null,
};

/**
 * An internal sub component that maps input props to an icon picker
 *
 * @private
 *
 * @remarks Use {@link IconPicker} if you need an icon picker, instead of this component.
 *
 * @version 0.0.1
 *
 * @param {IconPickerInputProps & TestIdProps} props - IconPickerInput component props
 * @returns {JSX.Element}
 */

const IconPickerInput = (
  props: IconPickerInputProps & TestIdProps,
): JSX.Element => {
  const mergedProps = useMergedProps(defaultIconPickerInputProps, props);
  const testId = useTestId("input-icon-picker", props);

  const onIconPickerChange = useCallback<IconPickerInputOnChangeFn>(
    (value) => {
      if (!mergedProps.onChange) return;
      return mergedProps.onChange(value);
    },
    [mergedProps],
  );

  const id = useInputId(mergedProps);

  return (
    <IconPicker
      {...mergedProps}
      id={id}
      testId={testId}
      overrideTestId
      onChange={onIconPickerChange}
    />
  );
};

IconPickerInput.defaultProps = defaultIconPickerInputProps;

export { IconPickerInput };
