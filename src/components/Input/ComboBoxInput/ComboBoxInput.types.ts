import type { InputProps } from "../Input.types";
import type { ComboBoxProps } from "@/components/ComboBox";
import type { NonNullish, NullishPrimitives } from "@ubloimmo/front-util";

export type ComboBoxInputProps<
  TOptionValue extends NullishPrimitives = NullishPrimitives,
> = ComboBoxProps<TOptionValue> & InputProps<"combobox", TOptionValue>;

export type ComboBoxInputDefaultProps<
  TOptionValue extends NullishPrimitives = NullishPrimitives,
> = Required<ComboBoxInputProps<TOptionValue>>;

export type ComboBoxInputOnChangeFn<
  TOptionValue extends NullishPrimitives = NullishPrimitives,
> = NonNullish<ComboBoxInputProps<TOptionValue>["onChange"]>;
