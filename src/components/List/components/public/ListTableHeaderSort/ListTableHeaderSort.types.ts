import type { FilterProperty } from "@/components/List/modules";
import type { TooltipProps } from "@/components/Tooltip";
import type { TableCellProps } from "@layouts";
import type { Nullable, RequireAtLeastOne } from "@ubloimmo/front-util";

export type ListTableHeaderSortProps<TItem extends object> = {
  /**
   * The property of Sort to interact with
   */
  property: FilterProperty<TItem>;
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
   * Fallback label to display in case no such Sort is declared in the parent List's configuration
   */
  fallbackLabel: string;
}> &
  TableCellProps;
