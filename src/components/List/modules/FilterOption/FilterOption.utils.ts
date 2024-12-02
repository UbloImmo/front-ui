import type { IFilterOption } from "./FilterOption.types";
import type { FilterSignature } from "../shared.types";

/**
 * Computes a unique signature for a filter option based on its matches, operator and label
 *
 * @param {IFilterOption} option - The filter option to compute the signature for
 * @returns {FilterSignature} The computed signature
 */
export const computeFilterOptionSignature = <TItem extends object>({
  matches,
  operator,
  label,
}: Pick<
  IFilterOption<TItem>,
  "matches" | "operator" | "label"
>): FilterSignature => {
  const matchesSignature = matches
    .map(({ value, property, comparison }) =>
      [value, comparison, property].join("_")
    )
    .join(operator);

  return [matchesSignature, label].join("-");
};
