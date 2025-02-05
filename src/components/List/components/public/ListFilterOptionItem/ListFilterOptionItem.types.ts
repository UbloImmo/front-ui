import type { FilterOption } from "@/components/List/modules";
import type { StyleProps } from "@types";
import type { VoidFn } from "@ubloimmo/front-util";

type ListFilterOptionItemHighlightProps = {
  /**
   * Whether the option item is highlighted by an external state
   * e.g. keyboard selection
   *
   * @type {boolean}
   * @default false
   */
  highlighted?: boolean;
};

export type ListFilterOptionItemProps<TItem extends object = object> = {
  /**
   * The option to display and interact with
   *
   * @type {FilterOption<TItem>}
   * @required
   */
  option: FilterOption<TItem>;
  /**
   * Whether the context the option item is displayed in
   * allows for multi selection
   *
   * @remarks Renders a checkbox
   *
   * @type {boolean}
   * @default false
   */
  multi?: boolean;
  /**
   * An optional callback to close the parent filter
   * Fired once the `option` has been toggled
   *
   * @remarks Will not fire when `multi` and the option has been toggled from the rendered checkbox to allow for easy multi-selection
   *
   * @type {VoidFn}
   */
  closeFilter?: VoidFn;
} & ListFilterOptionItemHighlightProps;

export type ListFilterOptionItemStyleProps =
  StyleProps<ListFilterOptionItemHighlightProps>;
