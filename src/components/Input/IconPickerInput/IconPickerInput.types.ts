import { NonNullish } from "@ubloimmo/front-util";

import { IconPickerProps } from "@/components/IconPicker";

import type { InputProps } from "../Input.types";

export type IconPickerInputProps = IconPickerProps & InputProps<"icon-picker">;

export type IconPickerInputDefaultProps = Required<IconPickerInputProps>;

export type IconPickerInputOnChangeFn = NonNullish<
  IconPickerInputProps["onChange"]
>;
