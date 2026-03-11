import { SortMap } from "../modules/Sort";

import type {
  FilterOptionData,
  FilterProperty,
  FilterSignature,
  SortData,
} from "../modules";
import type { ListContextValue } from "./ListContext.types";
import type { UseMapReturn } from "@types";

export const defaultListContextValue = <
  TItem extends object,
>(): ListContextValue<TItem> => ({
  data: [],
  dataProvider: {
    data: [],
    loading: true,
    error: false,
    refetch: async () => [],
    filter: () => {},
    fetchCount: () => 0,
    clear: () => {},
    type: "static",
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
  optionsMap: {
    ...new Map<FilterSignature, FilterOptionData<TItem>>(),
    commit: () => {},
    update: () => false,
  } as unknown as ListContextValue<TItem>["optionsMap"],
  selectedOptionSignatures: new Set(),
  getOptionBySignature: () => null,
  updateOptionSelection: () => {},
  query: "",
  queryFilters: [],
  changeQuery: () => {},
  applyOptions: () => {},
  hydratedSearchConfig: null,
  activeSorts: [],
  activeSortProperties: new Set(),
  invertedSortProperties: new Set(),
  sortMap: {
    ...new SortMap<TItem>(),
    update: () => false,
    commit: () => {},
  } as unknown as UseMapReturn<
    FilterProperty<TItem>,
    SortData<TItem, FilterProperty<TItem>>,
    SortMap<TItem>
  >,
  setInternalSortFlagRefs: () => {},
  activateSort: () => {},
  deactivateSort: () => {},
  toggleSort: () => {},
  invertSort: () => {},
  resetSort: () => {},
  getSort: () => null,
  prioritizeSort: () => {},
  highlightedSortProperty: null,
});
