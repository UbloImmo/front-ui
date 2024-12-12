import type { Filter } from "../Filter/Filter.types";
import type { FilterOptionData } from "../FilterOption/FilterOption.types";
import type { FilterPreset } from "../FilterPreset/FilterPreset.types";
import type { FilterBooleanOperator } from "../shared.types";
import type {
  GenericFn,
  MaybeAsyncFn,
  Replace,
  RequireAtLeastOne,
  VoidFn,
} from "@ubloimmo/front-util";

export type DataProviderSetDataFn<TItem extends object> = VoidFn<[TItem[]]>;

export type DataProviderFilterParam<TItem extends object> = Replace<
  Pick<Filter<TItem>, "selectedOptions" | "operator">,
  "selectedOptions",
  {
    selectedOptions: FilterOptionData<TItem>[];
  }
>;

export type DataProviderFilterFnConfig<TItem extends object> =
  RequireAtLeastOne<{
    filter: DataProviderFilterParam<TItem>;
    filters: DataProviderFilterParam<TItem>[];
    filterPresets: Pick<FilterPreset<TItem>, "options" | "operator">[];
    filterPreset: Pick<FilterPreset<TItem>, "options" | "operator">;
    options: FilterOptionData<TItem>[];
  }> & {
    operator: FilterBooleanOperator;
  };

export type DataProviderFilterFn<TItem extends object> = VoidFn<
  [config: DataProviderFilterFnConfig<TItem>]
>;

export type DataProviderFetchCountFn<TItem extends object> = MaybeAsyncFn<
  [config: DataProviderFilterFnConfig<TItem>],
  number
>;

export type DataProviderParams<TItem extends object> = [
  /**
   * The initial data or a function that fetches it
   */
  initialData: TItem[] | MaybeAsyncFn<[], TItem[]>,
  /**
   * A callback function that sets the list's data
   */
  setData: DataProviderSetDataFn<TItem>
];

export interface IDataProvider<TItem extends object> {
  /**
   * The provider's data, initial or filtered
   *
   * Gets directly rendered in the list
   */
  data: TItem[];
  /**
   * Indicates if the data is being loaded
   */
  loading: boolean;
  /**
   * A function that refetches the data
   * updates data, filteredData and calls the `setData` callback
   */
  refetch: () => Promise<TItem[]>;
  /**
   * A function that filters the data,
   * updates the filteredData and calls the `setData` callback
   */
  filter: DataProviderFilterFn<TItem>;
  /**
   * A function that prefetches the counts of the data
   */
  fetchCount: DataProviderFetchCountFn<TItem>;
}

export type UseStaticDataProviderFn = <TItem extends object>(
  ...params: DataProviderParams<TItem>
) => IDataProvider<TItem>;

/**
 * A hook that returns an object implementing the IDataProvider interface
 */
export type UseDataProviderFn<TItem extends object> = GenericFn<
  [setData: DataProviderSetDataFn<TItem>],
  IDataProvider<TItem>
>;
