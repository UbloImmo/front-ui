import type { IFilterOption } from "@/components/List/modules";

export type ListFilterOptionChipProps<TItem extends object> = {
  filterOption: IFilterOption<TItem>;
  filterDisabled?: boolean;
};
