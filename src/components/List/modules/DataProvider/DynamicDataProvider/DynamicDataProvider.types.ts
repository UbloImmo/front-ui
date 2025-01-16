import type {
  DataProviderFilterFnConfig,
  DataProviderSetDataFn,
  IDataProvider,
} from "../DataProvider.types";
import type { MaybeAsyncFn } from "@ubloimmo/front-util";

export type DynamicDataProviderFetchFn<TItem extends object> = MaybeAsyncFn<
  [config: DataProviderFilterFnConfig<TItem>],
  TItem[]
>;

export type DynamicDataProviderParams<TItem extends object> = [
  fetchData: DynamicDataProviderFetchFn<TItem>,
  setData: DataProviderSetDataFn<TItem>
];

export type UseDynamicDataProviderFn = <TItem extends object>(
  ...[fetchData, setData]: DynamicDataProviderParams<TItem>
) => IDataProvider<TItem, "dynamic">;
