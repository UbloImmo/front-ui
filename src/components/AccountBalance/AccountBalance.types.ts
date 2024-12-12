import { Nullable } from "@ubloimmo/front-util";

export type AccountBalanceProps = {
  /**
   * The title of the account balance
   *
   * @type {string}
   * @default null
   */
  title: Nullable<string>;

  /**
   * The amount of the account balance
   *
   * @type {number}
   * @default null
   */
  value: Nullable<number | undefined>;
};

export type AccountBalanceDefaultProps = Required<AccountBalanceProps>;
