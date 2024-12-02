import type { FilterSignature, IFilter } from "@/components/List/modules";
import type { StyleProps } from "@types";
import type { RequireAtLeastOne, VoidFn } from "@ubloimmo/front-util";

export type ListFilterProps<TItem extends object = object> = RequireAtLeastOne<{
  signature: FilterSignature;
  filter: IFilter<TItem>;
}> & {
  open?: boolean;
  onOpened?: VoidFn;
  onClosed?: VoidFn;
};

export type ListFilterInternalState = {
  open?: boolean;
};

export type ListFilterStyleProps = StyleProps<
  Pick<IFilter<object>, "disabled" | "active" | "loading" | "multi"> &
    ListFilterInternalState
>;
