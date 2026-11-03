import { useCallback, type ReactNode } from "react";

import { defaultCommonInputProps } from "../Input.common";
import { useInputId } from "../Input.utils";

import { ColorPicker } from "@/components/ColorPicker";
import { TestIdProps } from "@types";
import { useMergedProps, useTestId } from "@utils";

import type {
  ColorPickerInputDefaultProps,
  ColorPickerInputOnChangeFn,
  ColorPickerInputProps,
} from "./ColorPickerInput.types";

const defaultColorPickerInputProps: ColorPickerInputDefaultProps = {
  ...ColorPicker.__DEFAULT_PROPS,
  ...defaultCommonInputProps,
  name: null,
  value: null,
  onChange: null,
};

/**
 * An internal sub component that maps input props to a color picker
 *
 * @private
 *
 * @remarks Use {@link ColorPicker} if you need an color picker, instead of this component.
 *
 * @version 0.1.0
 *
 * @param {ColorPickerInputProps & TestIdProps} props - ColorPickerInput component props
 * @returns {ReactNode}
 */

const ColorPickerInput = (
  props: ColorPickerInputProps & TestIdProps
): ReactNode => {
  const mergedProps = useMergedProps(defaultColorPickerInputProps, props);
  const testId = useTestId("input-color-picker", props);

  const onColorPickerChange = useCallback<ColorPickerInputOnChangeFn>(
    (value) => {
      if (!mergedProps.onChange) return;
      return mergedProps.onChange(value);
    },
    [mergedProps]
  );

  const id = useInputId(mergedProps);

  return (
    <ColorPicker
      {...mergedProps}
      id={id}
      testId={testId}
      overrideTestId
      onChange={onColorPickerChange}
    />
  );
};

ColorPickerInput.__DEFAULT_PROPS = defaultColorPickerInputProps;

export { ColorPickerInput };
