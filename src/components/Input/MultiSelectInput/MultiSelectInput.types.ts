import type { InputProps } from "../Input.types";
import type {
  CustomOptionComponent,
  FilterSelectOptionFn,
  SelectOptionsQuery,
} from "../SelectInput";
import type { IconName } from "@/components/Icon";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";

export type MultiSelectInputProps<
  TValue extends NullishPrimitives | NullishPrimitives[],
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = InputProps<"multi-select", TValue> & {
  /**
   * The options data to be displayed in the dropdown
   *
   * @remarks No extra data is supported
   *
   * @type {SelectOptionsQuery<TValue, null>}
   * @default null
   */
  options?: SelectOptionsQuery<
    TValue extends NullishPrimitives[] ? TValue[number] : TValue,
    TExtraData
  >;
  /**
   * The icon that gets displayed right of the control
   *
   * @type {IconName}
   * @default "CaretDownFill"
   */
  controlIcon?: IconName;
  /**
   * A function used to filter options based on external creteria
   *
   * @default null
   *
   * @type {Nullable<FilterSelectOptionFn<TValue, TExtraData>>}
   */
  filterOption?: Nullable<FilterSelectOptionFn<TValue, TExtraData>>;
  /**
   * An optional custom Option component that gets rendered for each option
   *
   * @type {Nullable<CustomOptionComponent<TValue, TExtraData>>}
   */
  Option?: Nullable<CustomOptionComponent<TValue, TExtraData>>;
};

export type DefaultMultiSelectInputProps<
  TValue extends NullishPrimitives | NullishPrimitives[],
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = Required<MultiSelectInputProps<TValue, TExtraData>>;
