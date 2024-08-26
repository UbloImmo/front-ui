import { NonNullish } from "@ubloimmo/front-util";

import { InputProps } from "../Input.types";

import { IconPickerProps } from "@/components/IconPicker";

export type IconPickerInputProps = IconPickerProps & InputProps<"icon-picker">;

export type IconPickerInputDefaultProps = Required<IconPickerInputProps>;

export type IconPickerInputOnChangeFn = NonNullish<
  IconPickerInputProps["onChange"]
>;
