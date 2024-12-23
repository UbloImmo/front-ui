import type { FilterOption } from "@/components/List/modules";

export type ListFilterOptionChipProps<TItem extends object> = {
  /**
   * The filter option to render
   *
   * @type {FilterOption<TItem>}
   * @required
   */
  filterOption: FilterOption<TItem>;
  /**
   * Whether the parent filter is disabled
   *
   * @type {boolean}
   * @default false
   */
  filterDisabled?: boolean;
};

export type ListFilterOptionChipDefaultProps<TItem extends object> = Required<
  ListFilterOptionChipProps<TItem>
>;
