import type { IconName } from "@/components/Icon";
import type { FilterProperty } from "@/components/List/modules";
import type { Nullable } from "@ubloimmo/front-util";

export type ListFilterOptionBadgeProps<TItem extends object> = {
  /**
   * The filter option data to display.
   * @required
   */
  property: FilterProperty<TItem>;
  /**
   * The item to match against the filter option.
   *
   * @type {TItem}
   * @required
   */
  item: TItem;
  /**
   * The label to display when the item is not selected.
   *
   * @type {Nullable<string>}
   *
   * @default useUikitTranslation().status.unspecified
   */
  emptyLabel?: Nullable<string>;
  /**
   * The icon to display when the item is not selected.
   *
   * @type {Nullable<IconName>}
   * @default null
   */
  emptyIcon?: Nullable<IconName>;
};
