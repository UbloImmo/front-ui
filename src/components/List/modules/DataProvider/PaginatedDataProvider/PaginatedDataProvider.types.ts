import type {
  DataProviderFilterFnConfig,
  DataProviderSetDataFn,
  IDataProvider,
} from "../DataProvider.types";
import type { MaybeAsyncFn, Nullable } from "@ubloimmo/front-util";

/**
 * The idenfitifer of the last item of the previous page
 */
export type PaginationAfter = Nullable<string | number>;

export type PaginatedDataProviderPageResponse<TItem extends object> = {
  /**
   * The idenfitifer of the last item of the previous page
   *
   * @type {Nullable<string | number>}
   */
  after: PaginationAfter;
  /**
   * The number of items per page
   *
   * @type {number}
   */
  pageSize: number;
  /**
   * The data for the current page
   *
   * @type {TItem[]}
   */
  pageData: TItem[];
};

export type PaginatedDataProviderFetchPageFnParams<TItem extends object> = [
  /**
   * The current page's filter config
   */
  config: DataProviderFilterFnConfig<TItem>,
  /**
   * The idenfitifer of the last item of the previous page
   */
  after: PaginationAfter,
  /**
   * The number of items per page
   */
  pageSize: number
];

export type PaginatedDataProviderFetchPageFn<TItem extends object> =
  MaybeAsyncFn<
    PaginatedDataProviderFetchPageFnParams<TItem>,
    PaginatedDataProviderPageResponse<TItem>
  >;

export type PaginatedDataProviderParams<TItem extends object> = [
  /**
   * A function that fetches the data for a given page
   *
   * @type {PaginatedDataProviderFetchPageFn<TItem>}
   *
   * @template {object} TItem - The type of the items in the list
   * @param {number} page - The page number to fetch
   * @param {number} [pageSize = 25] - The number of items to fetch per page
   * @returns {Promise<TItem[]>} The data for the given page
   */
  fetchPage: PaginatedDataProviderFetchPageFn<TItem>,
  /**
   * A callback function that sets the list's data
   *
   * @type {DataProviderSetDataFn<TItem>}
   *
   * @template {object} TItem - The type of the items in the list
   * @param {TItem[]} data - The data to set
   */
  setData: DataProviderSetDataFn<TItem>,
  /**
   * The number of items to fetch per page
   *
   * @type {number}
   * @default 25
   */
  pageSize?: number
];

/**
 * A hook that handles paginated data
 *
 * @template {object} TItem - The type of the items in the list
 * @param {PaginatedDataProviderParams<TItem>} params - The parameters for the hook
 * @returns {IDataProvider<TItem>} The data provider object
 */
export type UsePaginatedDataProviderFn = <TItem extends object>(
  ...params: PaginatedDataProviderParams<TItem>
) => IDataProvider<TItem, "paginated">;
