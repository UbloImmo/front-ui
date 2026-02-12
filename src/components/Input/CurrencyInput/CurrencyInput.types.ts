import type {
  CommonInputStyleProps,
  InputProps,
  NativeInputOnChangeFn,
  NativeInputValue,
} from "../Input.types";
import type { IconName } from "@/components/Icon";
import type { NumberSign, StyleProps } from "@types";
import type { Enum, Nullable, VoidFn } from "@ubloimmo/front-util";

const _currencies = ["euro", "dollar", "pound", "yen"] as const;

export type Currency = Enum<typeof _currencies>;

export type CurrencyInputProps = InputProps<"currency"> & {
  /**
   * The input's minimum value.
   *
   * @default undefined
   */
  min?: Nullable<number>;
  /**
   * The input's maximum value.
   *
   * @default undefined
   */
  max?: Nullable<number>;
  /**
   * Controls which currency icon to show.
   *
   * @remarks Does not result in currency conversions.
   * @default: "euro"
   */
  currency?: Currency;
  /**
   * Whether to display and enable the sign (+/-) control before the value.
   *
   * @default false
   */
  showSign?: boolean;
  /**
   * The default sign to use if `showSign` is true.
   *
   * @type {"+" | "-"}
   * @default "+"
   */
  defaultSign?: NumberSign;
};

export type CurrencyInputDefaultProps = Required<CurrencyInputProps>;

/** @deprecated styled-components */
export type CurrencyInputStyleProps = CommonInputStyleProps &
  StyleProps<Pick<CurrencyInputProps, "showSign">>;

export type UseCurrencyInputReturn = {
  onChange: NativeInputOnChangeFn;
  inputValue: NativeInputValue;
  signIcon: IconName;
  toggleSign: VoidFn;
};
