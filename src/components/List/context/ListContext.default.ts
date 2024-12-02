import type { ListContextValue } from "./ListContext.types";

export const defaultListContextValue = <
  TItem extends object
>(): ListContextValue<TItem> => ({
  data: [],
  dataProvider: {
    data: [],
    loading: true,
    refetch: async () => [],
    filter: () => {},
    fetchCount: () => 0,
  },
  filters: [],
  contextMissing: true,
  itemCount: 0,
  loading: true,
  getFilterById: () => null,
  getFilterBySignature: () => null,
  getOptionBySignature: () => null,
  clearAllFilters: () => {},
  filterPresets: [],
  updateFilterPresetSelection: () => {},
  getFilterPresetBySignature: () => null,
  options: [],
  updateOptionSelection: () => {},
});
