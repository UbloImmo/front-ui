import type {
  AnyIndex,
  ComponentEntryItem,
  ComponentName,
} from "../ComponentList.types";
import type { StyleProps } from "@types";
import type { Enum } from "@ubloimmo/front-util";

const componentCardCellSizes = ["large", "small"] as const;

export type ComponentCardCellSize = Enum<typeof componentCardCellSizes>;

export type ComponentCardProps<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>,
> = ComponentEntryItem<TIndex, TName> & {
  randomSize?: boolean;
  parent?: string;
};

export type ComponentCardContainerProps = StyleProps<{
  size: ComponentCardCellSize;
}>;
