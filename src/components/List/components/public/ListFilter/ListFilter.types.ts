import type { FilterSignature, Filter } from "@/components/List/modules";
import type { RequireAtLeastOne, VoidFn } from "@ubloimmo/front-util";

export type ListFilterProps<TItem extends object = object> = RequireAtLeastOne<{
  /**
   * Either a valid {@link FilterSignature} pointing to a filter as declared in the list's context
   * @type {FilterSignature}
   * @required
   */
  signature: FilterSignature;
  /**
   * Or a complete {@link Filter} object containing the filter's complete data.
   * @type {Filter}
   * @required
   */
  filter: Filter<TItem>;
}> & {
  /**
   * Whether the filter is open
   * @default false
   */
  open?: boolean;
  /**
   * Callback called when the filter was closed and is opened
   * @type {VoidFn}
   */
  onOpened?: VoidFn;
  /**
   * Callback called when the filter was opened and is closed
   * @type {VoidFn}
   */
  onClosed?: VoidFn;
};

export type ListFilterInternalState = {
  /**
   * Wheter the filter is currently open
   */
  open?: boolean;
};

export type ListFilterStyleProps = Pick<
  Filter<object>,
  "disabled" | "active" | "loading" | "multi"
> &
  ListFilterInternalState;
