import type { InputProps } from "../Input.types";
import type { IconPickerProps } from "@/components/IconPicker";
import type { NonNullish } from "@ubloimmo/front-util";

export type IconPickerInputProps = IconPickerProps & InputProps<"icon-picker">;

export type IconPickerInputDefaultProps = Required<IconPickerInputProps>;

export type IconPickerInputOnChangeFn = NonNullish<
  IconPickerInputProps["onChange"]
>;
