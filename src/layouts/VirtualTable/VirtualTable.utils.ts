import {
  isNullish,
  isObject,
  transformObject,
  type Nullable,
  type Optional,
} from "@ubloimmo/front-util";
import { useMemo } from "react";
import { CSSProperties } from "styled-components";

import {
  VirtualTableFooterContent,
  VirtualTableHeaderContent,
} from "./contents";
import {
  VirtualTableBody,
  VirtualTableHeader,
  VirtualTableTable,
  VirtualTableRow,
  VirtualTableFooter,
  VirtualTableEmpty,
} from "./overrides";

import { parseFixedLength } from "@/sizes/size.utils";
import {
  cssLengthUsage,
  extractRem,
  isCssLength,
  remToPx,
  useHtmlAttribute,
  useLogger,
  useStatic,
} from "@utils";

import type {
  VirtualTableDefaultProps,
  VirtualTableScrollSetupProps,
  VirtualTableSharedContext,
  VirutalTableContentProps,
} from "./VirtualTable.types";
import type { FixedCssLength, StyleOverrideProps } from "@types";
import type { TableComponents, TableVirtuosoProps } from "react-virtuoso";

/**
 * Creates a typed object containing component overrides for a virtual table.
 *
 * @template {object} TItem - The type of items in the data array
 * @returns {TableComponents<TItem, VirtualTableSharedContext<TItem>>} An object containing component overrides for:
 *   - TableBody: The table body component
 *   - TableHead: The table header component
 *   - Table: The main table component
 *   - TableRow: The table row component
 *   - TableFoot: The table footer component
 *   - EmptyPlaceholder: Component shown when table is empty
 */
const getTypedOverrides = <TItem extends object>() =>
  ({
    TableBody: VirtualTableBody,
    TableHead: VirtualTableHeader,
    Table: VirtualTableTable,
    TableRow: VirtualTableRow,
    TableFoot: VirtualTableFooter,
    EmptyPlaceholder: VirtualTableEmpty,
  }) as TableComponents<TItem, VirtualTableSharedContext<TItem>>;

/**
 * Hook that returns component overrides for a virtual table.
 *
 * @template {object} TItem - The type of items in the data array
 * @returns {TableComponents<TItem, VirtualTableSharedContext<TItem>>} An object containing component overrides for the virtual table
 */
export const useVirtualTableOverrides = <
  TItem extends object,
>(): TableComponents<TItem, VirtualTableSharedContext<TItem>> => {
  return useStatic(getTypedOverrides<TItem>);
};

/**
 * Converts a fixed CSS length value to pixels.
 *
 * @param {FixedCssLength} length - The CSS length value to convert (e.g. '1rem', '16px')
 * @returns {number} The length value in pixels
 *
 * @example
 * ```ts
 * const px = fixedCssLengthToPx('1rem'); // Returns 16 if base font size is 16px
 * ```
 */
const fixedCssLengthToPx = (length: FixedCssLength): number => {
  return remToPx(extractRem(parseFixedLength(length)));
};

/**
 * Hook that creates the shared context object for a virtual table.
 *
 * @template {object} TItem - The type of items in the table
 * @param {VirtualTableDefaultProps<TItem>} mergedProps - The virtual table's merged props
 * @returns {VirtualTableSharedContext<TItem>} The shared context object containing:
 *   - fixedItemHeight: Parsed fixed height for rows
 *   - columnsCount: Number of columns
 *   - onItemClick: Click handler
 *   - EmptyState: Empty state component/props
 *   - tableStyle: Table style (`list` or `form`)
 *   - loading: Whether the table's data is loading
 */
export const useVirtualTableContext = <TItem extends object>({
  columns,
  onItemClick,
  EmptyState,
  fixedItemHeight: itemHeight,
  style,
  loading,
  paddedCells,
  layout,
}: VirtualTableDefaultProps<TItem>): VirtualTableSharedContext<TItem> => {
  const columnsCount = useMemo(
    () =>
      columns.reduce(
        (acc: number, { colSpan }) => acc + Math.max(1, colSpan ?? 1),
        0
      ),
    [columns]
  );
  const { warn } = useLogger("VirtualTable:context");
  const fixedItemHeight = useMemo(() => {
    if (!isCssLength(itemHeight)) return null;
    return parseFixedLength(itemHeight, warn);
  }, [itemHeight, warn]);

  return useMemo<VirtualTableSharedContext<TItem>>(
    () => ({
      fixedItemHeight,
      columnsCount,
      onItemClick,
      EmptyState,
      style,
      loading,
      paddedCells,
      layout,
      columns,
    }),
    [
      fixedItemHeight,
      columnsCount,
      onItemClick,
      EmptyState,
      style,
      loading,
      paddedCells,
      layout,
      columns,
    ]
  );
};

/**
 * Hook that processes the overscan prop for a virtual table.
 *
 * @param {Object} params - The params object
 * @param {VirtualTableOverscan} params.overscan - The overscan value to process, can be a fixed CSS length or an object with top/bottom values
 * @returns {number | { top: number; bottom: number }} The processed overscan value:
 *   - If no overscan provided, returns 0
 *   - If object provided, returns object with top/bottom values converted to pixels
 *   - If single value provided, returns pixel value
 */
export const useVirtualTableOverscan = ({
  overscan,
}: Pick<VirtualTableDefaultProps<object>, "overscan">):
  | number
  | { top: number; bottom: number } => {
  return useMemo<number | { top: number; bottom: number }>(() => {
    if (!overscan) return 0;
    if (isObject(overscan)) {
      return transformObject(overscan, fixedCssLengthToPx);
    }
    return fixedCssLengthToPx(overscan);
  }, [overscan]);
};

/**
 * Hook that processes a virtual table's item height value.
 *
 * @param {Nullable<FixedCssLength>} height - The height value to process, can be a fixed CSS length or null
 * @returns {Optional<number>} The processed height value in pixels, or undefined if no height provided
 */
export const useVirtualTableItemHeight = (
  height: Nullable<FixedCssLength>
): Optional<number> => {
  return useMemo<Optional<number>>(() => {
    if (!height) return undefined;
    return fixedCssLengthToPx(height);
  }, [height]);
};

/**
 * Hook that generates memoized content components for a virtual table.
 *
 * @param {VirtualTableDefaultProps<TItem>} mergedProps - The merged props containing table configuration
 * @param {VirtualTableSharedContext<TItem>} context - The shared context containing table configuration
 * @returns {VirutalTableContentProps<TItem>} Object containing:
 *   - itemContent: Memoized row content component
 *   - fixedHeaderContent: Memoized header content component
 *   - fixedFooterContent: Memoized footer content component
 * @template TItem - The type of items in the table data
 */
export const useVirtualTableContent = <TItem extends object>(
  mergedProps: VirtualTableDefaultProps<TItem>,
  context: VirtualTableSharedContext<TItem>
): VirutalTableContentProps<TItem> => {
  const fixedHeaderContent = useMemo(
    () => VirtualTableHeaderContent(mergedProps.columns),
    [mergedProps.columns]
  );

  const fixedFooterContent = useMemo(
    () => VirtualTableFooterContent(context.columnsCount, context.loading),
    [context.columnsCount, context.loading]
  );

  return { fixedHeaderContent, fixedFooterContent };
};

/**
 * Hook that configures scroll behavior for a virtual table based on provided setup options.
 *
 * @template {object} TItem - The type of items in the table data
 * @param {VirtualTableScrollSetupProps & Pick<StyleOverrideProps, "styleOverride">} setup - Configuration object containing:
 *   - useWindowScroll: Whether to use window scrolling
 *   - scrollParentRef: Optional ref to custom scroll parent element
 *   - height: Optional fixed height for the table
 *   - styleOverride: Optional style overrides
 * @returns {Object} Object containing:
 *   - style: Computed CSS styles including height if specified
 *   - useWindowScroll: Whether window scrolling is enabled
 *   - customScrollParent: Reference to custom scroll parent element if provided
 */
export const useVirtualTableScrollSetup = <TItem extends object>(
  setup: VirtualTableScrollSetupProps &
    Pick<StyleOverrideProps, "styleOverride">
): Pick<
  TableVirtuosoProps<TItem, VirtualTableSharedContext<TItem>>,
  "style" | "useWindowScroll" | "customScrollParent"
> => {
  const style = useMemo<Optional<CSSProperties>>(() => {
    const { useWindowScroll, height, scrollParentRef, styleOverride } = setup;
    const override = styleOverride ?? undefined;
    if (useWindowScroll || scrollParentRef || isNullish(height))
      return override;
    const heightUsage = cssLengthUsage(height);
    return {
      ...(override ?? {}),
      height: heightUsage,
    };
  }, [setup]);

  const useWindowScroll = useHtmlAttribute(setup.useWindowScroll);
  const customScrollParent = useHtmlAttribute(setup.scrollParentRef?.current);

  return {
    style,
    useWindowScroll,
    customScrollParent,
  };
};
