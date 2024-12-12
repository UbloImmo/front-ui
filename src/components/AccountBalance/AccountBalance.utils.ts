import { isNullish, Nullish } from "@ubloimmo/front-util";

import { isNegative, toFixed } from "@utils";

/**
 * Format the amount with the correct currency and format.
 *
 * @param value - The amount to format
 * @returns The formatted amount
 */
export const formatAmount = (value: Nullish<number>) => {
  if (isNullish(value)) return "— €";

  const formatter = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const normalizeSpaces = (str: string) => str.replace(/\u202F/g, " ");

  const absAmount = Math.abs(value / 100);
  const sign = isNegative(value) ? "- " : "";

  // Milliards (1,00 G€ à 999,99 G€)
  if (absAmount >= 1_000_000_000) {
    const formatted = formatter.format(toFixed(absAmount / 1_000_000_000, 2));
    return normalizeSpaces(`${sign}${formatted} G€`);
  }

  // Millions (1,00 M€ à 999,99 M€)
  if (absAmount >= 1_000_000) {
    const formatted = formatter.format(toFixed(absAmount / 1_000_000, 2));
    return normalizeSpaces(`${sign}${formatted} M€`);
  }

  // Milliers (100,00 k€ à 999,99 k€)
  if (absAmount >= 100_000) {
    const formatted = formatter.format(toFixed(absAmount / 1_000, 2));
    return normalizeSpaces(`${sign}${formatted} k€`);
  }

  // Euros (0,00 € à 99 999,99 €)
  return normalizeSpaces(`${sign}${formatter.format(absAmount)} €`);
};
