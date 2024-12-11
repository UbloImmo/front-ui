import type { FilterOption } from "@/components/List/modules";

export type ListFilterOptionChipProps<TItem extends object> = {
  filterOption: FilterOption<TItem>;
  filterDisabled?: boolean;
};
