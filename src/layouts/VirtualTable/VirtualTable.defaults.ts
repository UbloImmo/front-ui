import type { VirtualTableDefaultProps } from "./VirtualTable.types";

export const defaultVirtualTableProps: VirtualTableDefaultProps<object> = {
  data: [],
  columns: [],
  paddedCells: false,
  loading: false,
  onItemClick: null,
  fixedItemHeight: null,
  defaultItemHeight: null,
  scrollParentRef: null,
  useWindowScroll: false,
  overscan: 0,
  endReached: null,
  startReached: null,
  EmptyState: null,
  style: "list",
  layout: "auto",
  ref: null,
  height: null,
};
