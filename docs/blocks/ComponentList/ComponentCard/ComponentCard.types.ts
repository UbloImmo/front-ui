import type {
  AnyIndex,
  ComponentEntryItem,
  ComponentName,
} from "../ComponentList.types";
import type { Enum, StyleProps } from "@types";

const componentCardCellSizes = ["large", "small"] as const;

export type ComponentCardCellSize = Enum<typeof componentCardCellSizes>;

export type ComponentCardProps<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
> = ComponentEntryItem<TIndex, TName> & {
  randomSize?: boolean;
};

export type ComponentCardContainerProps = StyleProps<{
  size: ComponentCardCellSize;
}>;
