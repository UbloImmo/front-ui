import type {
  DataProviderBaseParams,
  IDataProvider,
} from "../DataProvider.types";

export type PaginatedDataProviderParams<TItem extends object> = [
  ...DataProviderBaseParams<TItem>,
  pageSize: number
];

export type UsePaginatedDataProviderFn = <TItem extends object>(
  ...params: PaginatedDataProviderParams<TItem>
) => IDataProvider<TItem>;
