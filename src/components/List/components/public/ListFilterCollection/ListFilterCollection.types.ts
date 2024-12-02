import type { FilterData, FilterSignature } from "../../../modules";
import type { Nullable } from "@ubloimmo/front-util";

export type ListFilterCollectionProps = {
  /**
   * The title of the filter collection
   *
   * @type {Nullable<string>}
   * @default "tl.action.filterBy"
   */
  title?: Nullable<string>;
  /**
   * The filters to display. Can be referenced by their signatures or by their filter data
   * Used to limit which filters are displayed.
   *
   * @remarks If omittted or nullish, all filters will be displayed
   */
  filters?: Nullable<(FilterSignature | FilterData)[]>;
};

export type ListFilterCollectionDefaultProps =
  Required<ListFilterCollectionProps>;
