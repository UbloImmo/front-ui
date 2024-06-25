/**
 * A very basic email string type alias
 * Used to differentiate between emails and regular strings
 */
export type Email = string;

/**
 * Basic type alias for currency (int)
 *
 * @example
 * 1000 // (10.00 €)
 */
export type CurrencyInt = number;
/**
 * Basic type alias for currency (float)
 *
 *
 * @example
 * 10.00 // (10.00 €)
 */
export type CurrencyFloat = number;

/**
 * Basic currency string regex
 */
export type CurrencyStr = `${number},${number}` | `${number},00`;

export type CurrencyStrWithSymbol = `${CurrencyStr} €`;

export type NumberSign = "+" | "-";

export type FormattedCurrencyStr =
  | CurrencyStr
  | `${string},${number}`
  | `${string},00`;

export type FormattedCurrencyStrWithSymbol = `${FormattedCurrencyStr} €`;
