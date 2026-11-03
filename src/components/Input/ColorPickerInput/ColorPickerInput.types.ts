import type { InputProps } from "../Input.types";
import type { ColorPickerProps } from "@/components/ColorPicker";
import type { NonNullish } from "@ubloimmo/front-util";

export type ColorPickerInputProps = ColorPickerProps &
  InputProps<"color-picker">;

export type ColorPickerInputDefaultProps = Required<ColorPickerInputProps>;

export type ColorPickerInputOnChangeFn = NonNullish<
  ColorPickerInputProps["onChange"]
>;
