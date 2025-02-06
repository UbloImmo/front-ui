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

  /**
   * Whether to use compact format (true by default)
   *
   * @type {boolean}
   * @default true
   */
  compact?: boolean;
};

export type AccountBalanceDefaultProps = Required<AccountBalanceProps>;
