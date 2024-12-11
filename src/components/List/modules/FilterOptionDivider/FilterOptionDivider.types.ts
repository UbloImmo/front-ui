import type { FilterSignature } from "../shared.types";

export type FilterOptionDividerData = {
  /**
   * The kind of the filter option divider
   * Used to identify a filter option divider when comparing them
   *
   * @type {"group"}
   * @required
   */
  kind: "divider";
  /**
   * The label of the filter option divider
   *
   * @type {string}
   * @required
   */
  label: string;
};

/**
 * A complete filter option divider
 *
 * @see {@link FilterOptionDividerData}
 */
export type FilterOptionDivider = Required<FilterOptionDividerData> & {
  beforeSignature: FilterSignature;
};

export type FilterOptionGroupDataFn = (
  label: string,
  index?: number
) => FilterOptionDividerData;
