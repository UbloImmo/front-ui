import type { FilterSignature, IFilterOption } from "@/components/List/modules";
import type { StyleProps } from "@types";
import type { VoidFn } from "@ubloimmo/front-util";

type HighlightProps = {
  highlighted?: boolean;
};

export type ListFilterOptionItemProps<TItem extends object = object> = {
  option: IFilterOption<TItem>;
  filterSignature: FilterSignature;
  multi?: boolean;
  closeFilter?: VoidFn;
} & HighlightProps;

export type ListFilterOptionItemStyleProps = StyleProps<HighlightProps>;
