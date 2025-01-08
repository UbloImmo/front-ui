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
  filtersLoading: true,
  contextMissing: true,
  itemCount: 0,
  configLoading: true,
  loading: true,
  getFilterById: () => null,
  getFilterBySignature: () => null,
  getFilterByLabel: () => null,
  clearAllFilters: () => {},
  filterPresets: [],
  filterPresetsLoading: true,
  updateFilterPresetSelection: () => {},
  getFilterPresetBySignature: () => null,
  options: [],
  getOptionBySignature: () => null,
  updateOptionSelection: () => {},
  query: "",
  queryFilters: [],
  changeQuery: () => {},
  applyOptions: () => {},
});
