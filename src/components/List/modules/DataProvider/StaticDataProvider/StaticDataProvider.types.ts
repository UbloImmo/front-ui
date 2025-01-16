import type {
  DataProviderBaseParams,
  IDataProvider,
} from "../DataProvider.types";

export type StaticDataProviderParams<TItem extends object> =
  DataProviderBaseParams<TItem>;

export type UseStaticDataProviderFn = <TItem extends object>(
  ...params: StaticDataProviderParams<TItem>
) => IDataProvider<TItem, "static">;
