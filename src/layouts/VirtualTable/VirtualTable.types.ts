import type { TableCellProps, TableLayout, TableStyle } from "../Table";
import type { EmptyStateCardProps } from "@/components/EmptyStateCard";
import type { TooltipProps } from "@/components/Tooltip";
import type {
  CssLength,
  CssLengthUsage,
  CssRem,
  FixedCssLength,
  StyleProps,
} from "@types";
import type {
  NonNullish,
  Nullable,
  Replace,
  VoidFn,
} from "@ubloimmo/front-util";
import type { FC, Ref, RefObject } from "react";
import type {
  ContextProp,
  ItemProps,
  TableComponents,
  TableProps,
  TableVirtuosoHandle,
  TableVirtuosoProps,
} from "react-virtuoso";

export type VirtualTableColumnStyleProps = {
  /**
   * The number of table columns this column should span.
   *
   * @type {number}
   * @default 1
   */
  colSpan?: number;
  /**
   * An optional  fixed width to apply to the column's cells and header.
   *
   * @type {Nullable<CssLength>}
   * @default null
   */
  fixedWidth?: Nullable<CssLength>;
  /**
   * Whether to apply padding to the column's cells.
   *
   * @remarks
   * Maps to `TableCell.padded` property.
   *
   * @type {boolean}
   * @default true
   */
  paddedCell?: boolean;
};

/**
 * Inner content to be rendered in a header.
 *
 * @remarks
 * If a `string`, gets rendered as
 * ```jsx
 * <TableHeaderCell>
 *   <Text ellipsis>{HeaderContent}</Text>
 * </TableHeaderCell>
 * ```
 *
 * If a `FC`, gets rendered as:
 * ```jsx
 * <TableHeaderCell>
 *   <HeaderContent />
 * </TableHeaderCell>
 * ```
 *
 * If an object with label (and tooltip), will be rendered as:
 * ```jsx
 * <TableHeaderCell>
 *  <FlexRowLayout fill="row" align="center" justify="space-between" gap="s-1">
 *    <Text ellipsis>{HeaderContent.label}</Text>
 *    {HeaderContent.tooltip && <Tooltip {...HeaderContent.tooltip} />}
 *  </FlexRowLayout>
 * </TableHeaderCell>
 * ```
 *
 * If an object with ReplacementCell, will be rendered as:
 * ```jsx
 * <ReplacementCell />
 * ```
 */
export type VirtualTableColumnHeaderContent =
  | string
  | FC
  | {
      /**
       * The label of the column. Gets displayed in the header.
       *
       * @remarks
       * Always gets rendered within a `Text` component
       *
       * @type {string};
       * @required
       */
      label: string;
      /**
       * An optional tooltip to be displayed within the header
       */
      tooltip?: TooltipProps;
    }
  | {
      /**
       * A custom cell component to be used in place of the default cell.
       *
       * @remarks
       * Gets rendered directly within the header, should render its only `TableHeaderCell`
       *
       * @type {FC<TableCellProps>}
       * @required
       */
      ReplacementCell: FC<TableCellProps>;
    };

/**
 * Props passed to a virtual table cell component.
 *
 * @template TItem - The type of items in the data array. Must be an object.
 */
export type VirtualTableColumnCellProps<TItem extends object> = {
  /**
   * The item to be displayed in the cell.
   *
   * @type {TItem}
   */
  item: TItem;
  /**
   * The index of the item in the data array.
   *
   * @type {number}
   */
  index: number;
};

/**
 * Inner content to be rendered in a cell.
 *
 * @template {object} TItem - The type of the item in the data array.
 *
 * @remarks
 * Gets rendered as:
 * ```jsx
 * <TableCell padded>
 *   <CellContent item={item} index={index} />
 * </TableCell>
 * ```
 * for each item in the data array.
 */
export type VirtualTableCellContent<TItem extends object> = FC<
  VirtualTableColumnCellProps<TItem>
>;

/**
 * Props for configuring a column in a virtual table.
 *
 * @template TItem - The type of items in the data array
 * @extends {VirtualTableColumnStyleProps}
 */
export type VirtualTableColumnProps<TItem extends object> =
  VirtualTableColumnStyleProps & {
    /**
     * The content to be displayed within each cell of the column.
     *
     * @type {VirtualTableCellContent<TItem>}
     * @required
     */
    CellContent: VirtualTableCellContent<TItem>;
    /**
     * The content to be displayed within the header of the column.
     *
     * @type {VirtualTableColumnHeaderContent}
     * @required
     */
    HeaderContent: VirtualTableColumnHeaderContent;
  };

/**
 * Props for rendering cell content in a virtual table.
 *
 * @template TItem - The type of items in the data array
 * @see {@link VirtualTableColumnProps}
 * @see {@link VirtualTableColumnCellProps}
 */
export type VirtualTableCellContentProps<TItem extends object> =
  VirtualTableColumnCellProps<TItem> & VirtualTableColumnProps<TItem>;

/**
 * Props for rendering header cell content in a virtual table.
 *
 * @template TItem - The type of items in the data array
 * @see {@link VirtualTableColumnProps}
 */
export type VirtualTableHeaderCellContentProps<TItem extends object> = Pick<
  VirtualTableColumnProps<TItem>,
  "HeaderContent" | "colSpan"
>;

/**
 * Configures the overscan behavior of the virtual table.
 * Overscan determines how many items outside the visible viewport should be rendered.
 *
 * @remarks
 * Can be specified either as a fixed CSS length that applies equally to top and bottom,
 * or as an object with separate top and bottom lengths.
 *
 * @see {@link FixedCssLength}
 */
export type VirtualTableOverscan =
  | FixedCssLength
  | {
      /**
       * Increases the viewport by the given length.
       *
       * @remarks
       * Items above the viewport limit will still be rendered
       * if their offset is wihin the provided bound.
       */
      top: FixedCssLength;
      /**
       * Increases the viewport by the given length.
       *
       * @remarks
       * Items below the viewport limit will still be rendered
       * if their offset is wihin the provided bound.
       */
      bottom: FixedCssLength;
    };

/**
 * Callback function type for handling item clicks in a virtual table.
 *
 * @template {object} TItem - The type of items in the data array
 * @param {TItem} item - The clicked item
 * @param {number} index - The index of the clicked item
 * @returns {void}
 */
export type VirtualTableOnItemClickFn<TItem extends object> = VoidFn<
  [item: TItem, index: number]
>;

/**
 * Props for configuring scroll behavior of a virtual table.
 * At least one of the scroll tracking options must be provided.
 *
 * @remarks
 * The virtual table can track scrolling in three ways:
 * - Using a provided scroll parent element ref
 * - Using the window scroll position
 * - Using a fixed height container
 *
 * Only one scroll tracking method should be used at a time.
 * If multiple are provided, they are prioritized in the order:
 * scrollParentRef > useWindowScroll > height
 */
export type VirtualTableScrollSetupProps = {
  /**
   * If provided, the table will track and react to the scroll position of the provided element.
   *
   * @type {Nullable<RefObject<HTMLElement>>}
   * @default null
   */
  scrollParentRef?: Nullable<RefObject<HTMLElement>>;
  /**
   * Whether to track the window's scroll position and react to it.
   *
   * @remarks
   * If `scrollParentRef` is provided, this will be ignored.
   *
   * @type {boolean}
   * @default false
   */
  useWindowScroll?: boolean;
  /**
   * A fixed css length to set the height of the table.
   *
   * @remarks
   * If provided, the table will not track the window's scroll position.
   *
   * @type {Nullable<CssLength>}
   * @default null
   */
  height?: Nullable<CssLength>;
};

/**
 * Props for the VirtualTable component.
 * Configures the behavior and appearance of a virtualized table.
 *
 * @template {object} TItem - The type of each item in the data array
 *
 * @remarks
 * The VirtualTable component provides efficient rendering of large datasets through virtualization.
 * Only the visible rows are rendered, with configurable overscan for smooth scrolling.
 *
 * Key features:
 * - Virtualized rendering of large datasets
 * - Configurable columns with custom cell content
 * - Click handling and hover styles
 * - Fixed or dynamic row heights
 * - Scroll position tracking
 * - Empty state handling
 * - Endless scrolling support via callbacks
 *
 * @example
 * ```tsx
 * <VirtualTable
 *   data={items}
 *   columns={columns}
 *   onItemClick={handleClick}
 *   fixedItemHeight={48}
 * />
 * ```
 */
export type VirtualTableProps<TItem extends object> = {
  /**
   * The data to be displayed in the virtualized table.
   *
   * @type {TItem[]}
   * @default []
   */
  data?: TItem[];
  /**
   * Whether the table's data is loading.
   *
   * @remarks
   * Displays a loading state in the header and footer if provided
   *
   * @type {boolean}
   * @default false
   */
  loading?: boolean;
  /**
   * The columns to be displayed for each item in the virtualized table.
   *
   * @type {VirtualTableColumnProps<TItem>[]}
   * @required
   * @default []
   */
  columns: VirtualTableColumnProps<TItem>[];
  /**
   * Whether to apply padding to **all** table cells.
   *
   * @remarks
   * If `false`, padding will only be applied to cells that have a `paddedCell` prop set to `true`.
   *
   * @type {boolean}
   * @default false
   */
  paddedCells?: boolean;
  /**
   * A callback to be called when an item is clicked.
   * Receives the item and its index as arguments.
   *
   * @remarks
   * Providing this callback also enables hover styling on rows
   *
   * @type {Nullable<VirtualTableOnItemClickFn<TItem>>}
   * @default null
   */
  onItemClick?: Nullable<VirtualTableOnItemClickFn<TItem>>;
  /**
   * Performance can be improved by setting a fixed height for each item.
   *
   * @remarks
   * Simplifies virtualization logic by hard-setting all rows to the same height.
   *
   * @type {Nullable<number>}
   * @default undefined
   */
  fixedItemHeight?: Nullable<FixedCssLength>;
  /**
   * Performance can be improved by setting a default height for each item.
   *
   * @remarks
   * This does not force all rows to have the same height,
   * but serves as a hint to the virtualization library in order to optimize performance.
   *
   * Dynamic height rows are supported.
   *
   * @type {Nullable<number>}
   * @default undefined
   */
  defaultItemHeight?: Nullable<FixedCssLength>;
  /**
   * A fixed css length to extend the viewport by.
   *
   * @remarks
   * This does not make the list's scroller element larger,
   * but increases the "visible" area within which items are rendered
   *
   * @type {VirtualTableOverscan}
   * @default 0
   */
  overscan?: VirtualTableOverscan;
  /**
   * A callback that gets called when the user scrolls to the end of the list.
   * Receives the last item index as an argument.
   *
   * @remarks
   * Can be used to implement endless scrolling.
   *
   * @type {Nullable<VoidFn<[lastIndex: number]>>}
   * @default null
   */
  onEndReached?: Nullable<VoidFn<[lastIndex: number]>>;
  /**
   * A callback that gets called when the user scrolls to the start of the list.
   * Receives the first item index as an argument.
   *
   * @remarks
   * Can be used to implement endless scrolling.
   *
   * @type {Nullable<VoidFn<[firstIndex: number]>>}
   * @default null
   */
  onStartReached?: Nullable<VoidFn<[firstIndex: number]>>;
  /**
   * Defines what gets displayed when the list is empty.
   * Either a custom component or a props object for the `EmptyStateCard` component.
   *
   * @type {Nullable<EmptyStateCardProps | FC>}
   * @default null
   *
   * @see {@link EmptyStateCardProps}
   */
  EmptyState?: Nullable<EmptyStateCardProps | FC>;
  /**
   * The style (css variant) to apply to the table's body, rows, and cells.
   *
   * @type {TableStyle}
   * @default "list"
   */
  style?: TableStyle;
  /**
   * Hoists a ref to the virtuoso table instance.
   *
   * @type {Nullable<Ref<TableVirtuosoHandle>>}
   * @default null
   */
  ref?: Ref<TableVirtuosoHandle>;
  /**
   * The layout of the table. Either `auto` or `fixed`.
   *
   * @type {TableLayout}
   * @default "auto"
   */
  layout?: TableLayout;
} & VirtualTableScrollSetupProps;

/**
 * The default props for the virtual table component, with all optional props set to their default values.
 *
 * @template {object} TItem - The type of items in the data array. Must be an object.
 *
 * @see {@link VirtualTableProps}
 */
export type VirtualTableDefaultProps<TItem extends object> = Required<
  VirtualTableProps<TItem>
>;

/**
 * Shared context for the virtual table, accessible to all sub-component overrides.
 *
 * @template {object} TItem - The type of the item in the data array.
 */
export type VirtualTableSharedContext<TItem extends object> = Replace<
  Pick<
    VirtualTableDefaultProps<TItem>,
    | "onItemClick"
    | "EmptyState"
    | "fixedItemHeight"
    | "style"
    | "layout"
    | "loading"
    | "paddedCells"
  >,
  "fixedItemHeight",
  {
    fixedItemHeight: Nullable<CssRem>;
  }
> & {
  /**
   * Computed number of columns in the table.
   *
   * @type {number}
   */
  columnsCount: number;
};

/**
 * Internal props for the content components of a virtual table.
 *
 * @template {object} TItem - The type of items in the data array. Must be an object.
 *
 * @see {@link TableVirtuosoProps}, {@link VirtualTableSharedContext}
 */
export type VirutalTableContentProps<TItem extends object> = Pick<
  TableVirtuosoProps<TItem, VirtualTableSharedContext<TItem>>,
  "itemContent" | "fixedFooterContent" | "fixedHeaderContent"
>;

/**
 * Typed map of all components that can be overridden in a virtual table.
 *
 * @template {object} TItem - The type of items in the data array
 * @see {@link TableComponents}
 */
export type VirtualTableComponentOverrides<TItem extends object> = NonNullish<
  TableComponents<TItem, VirtualTableSharedContext<TItem>>
>;

/**
 * Props passed to a custom Table component override in a virtual table.
 *
 * @template {object} TItem - The type of items in the data array
 * @see {@link VirtualTableComponentOverrides}, {@link VirtualTableSharedContext}
 */
export type VirtualTableOverrideProps<TItem extends object> = TableProps &
  ContextProp<VirtualTableSharedContext<TItem>>;

/**
 * Props passed to a custom TableRow component override in a virtual table.
 *
 * @template {object} TItem - The type of items in the data array
 * @see {@link VirtualTableRowOverride}
 * @see {@link TableComponents}
 */
export type VirtualTableRowOverrideProps<TItem extends object> =
  ItemProps<TItem> & ContextProp<VirtualTableSharedContext<TItem>>;

/**
 * Style props for a virtual table row component.
 *
 * @template {object} TItem - The type of items in the data array
 * @see {@link StyleProps}
 */
export type VirutalTableRowStyleProps = StyleProps<{
  /**
   * An optional fixed height to apply to the row.
   *
   * @type {Nullable<CssLengthUsage>}
   * @default undefined
   */
  fixedItemHeight?: Nullable<CssLengthUsage>;
  /**
   * Whether the row is clickable.
   *
   * @type {boolean}
   * @default false
   */
  clickable?: boolean;
  /**
   * The style of the table.
   *
   * @type {TableStyle}
   * @default "list"
   */
  style?: TableStyle;
}>;

/**
 * Style props for a virtual table cell component.
 *
 * @template {object} TItem - The type of items in the data array
 * @see {@link StyleProps}
 */
export type VirtualTableCellStyleProps = StyleProps<
  Pick<VirtualTableCellContentProps<object>, "fixedWidth">
>;
