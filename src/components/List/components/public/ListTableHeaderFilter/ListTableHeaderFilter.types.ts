import type { FilterData, FilterSignature } from "@/components/List/modules";
import type { TooltipProps } from "@/components/Tooltip";
import type { TableCellProps } from "@/layouts/Table";
import type { StyleProps } from "@types";
import type { Nullable, RequireAtLeastOne } from "@ubloimmo/front-util";

export type ListTableHeaderFilterProps = {
  /**
   * The filter to interact with
   *
   * @remarks If missing, will render a simple TableHeaderCell
   *
   * @type {Nullable<FilterData | FilterSignature>}
   * @default null
   */
  filter?: Nullable<FilterData | FilterSignature>;
  /**
   * An optional tooltip to display inside the cell
   *
   * @type {Nullable<Omit<TooltipProps, "iconColor">>}
   * @default null
   */
  tooltip?: Nullable<Omit<TooltipProps, "iconColor" | "children">>;
} & RequireAtLeastOne<{
  /**
   * Whether to hide the label
   *
   * @type {boolean}
   * @default false
   */
  hideLabel?: boolean;
  /**
   * The label to display if the filter is not found
   *
   * @type {string}
   * @default undefined
   */
  fallbackLabel?: string;
}> &
  TableCellProps;

export type ListTableHeaderFilterStyleProps = StyleProps<{
  hideLabel?: boolean;
}>;
