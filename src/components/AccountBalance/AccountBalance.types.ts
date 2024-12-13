import { Nullable } from "@ubloimmo/front-util";

export type AccountBalanceProps = {
  /**
   * The title of the account balance
   *
   * @type {string}
   * @required
   */
  title: string;

  /**
   * The amount of the account balance
   *
   * @type {number}
   * @default null
   */
  value?: Nullable<number>;
};

export type AccountBalanceDefaultProps = Required<AccountBalanceProps>;
