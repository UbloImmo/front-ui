import type { InputProps } from "../Input.types";
import type { ColorPickerProps } from "@/components/ColorPicker";
import type { NonNullish, Nullable } from "@ubloimmo/front-util";

export type ColorPickerInputProps = ColorPickerProps &
  InputProps<"color-picker"> & {
    /**
     * The field's label, forwarded by Field and used as the radio group's accessible name
     * @default null
     */
    label?: Nullable<string>;
  };

export type ColorPickerInputDefaultProps = Required<ColorPickerInputProps>;

export type ColorPickerInputOnChangeFn = NonNullish<
  ColorPickerInputProps["onChange"]
>;
