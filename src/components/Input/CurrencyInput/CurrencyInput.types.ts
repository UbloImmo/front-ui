import type { CommonInputStyleProps, InputProps } from "../Input.types";
import type { NumberSign, StyleProps } from "@types";
import type { Enum, Nullable } from "@ubloimmo/front-util";

const currencies = ["euro", "dollar", "pound", "yen"] as const;

export type Currency = Enum<typeof currencies>;

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

export type CurrencyInputStyleProps = CommonInputStyleProps &
  StyleProps<Pick<CurrencyInputProps, "showSign">>;
