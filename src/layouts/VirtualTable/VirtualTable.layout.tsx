import { TableVirtuoso } from "react-virtuoso";

import { defaultVirtualTableProps } from "./VirtualTable.defaults";
import {
  useVariableItemHeight,
  useVirtualTableContent,
  useVirtualTableContext,
  useVirtualTableOverrides,
  useVirtualTableOverscan,
  useVirtualTableScrollSetup,
} from "./VirtualTable.utils";

import {
  useClassName,
  useHtmlAttribute,
  useLogger,
  useMergedProps,
  useTestId,
} from "@utils";

import type {
  VirtualTableDefaultProps,
  VirtualTableProps,
  VirtualTableSharedContext,
} from "./VirtualTable.types";
import type { StyleOverrideProps, TestIdProps } from "@types";

/**
 * A virtualized table component that efficiently renders large datasets.
 *
 * @version 0.0.1
 *
 * @template {object} TItem - The type of items in the data array
 * @param {VirtualTableProps<TItem> & Omit<StyleOverrideProps, "as"> & TestIdProps} props - Component props
 * @returns {JSX.Element} The rendered virtual table
 *
 * @remarks
 * Uses react-virtuoso under the hood to handle virtualization.
 * Only renders items that are currently visible in the viewport.
 */
const VirtualTable = <TItem extends object>({
  testId: givenTestId,
  overrideTestId,
  ...props
}: VirtualTableProps<TItem> & Omit<StyleOverrideProps, "as"> & TestIdProps) => {
  const { warn } = useLogger("VirtualTable");
  const mergedProps = useMergedProps<
    VirtualTableDefaultProps<TItem>,
    VirtualTableProps<TItem>
  >(
    defaultVirtualTableProps as unknown as VirtualTableDefaultProps<TItem>,
    props
  );

  const testId = useTestId("virtual-table", {
    testId: givenTestId,
    overrideTestId,
  });
  const className = useClassName(props);

  const context = useVirtualTableContext(mergedProps);
  const componentOverrides = useVirtualTableOverrides<TItem>();

  const defaultItemHeight = useVariableItemHeight(
    mergedProps.defaultItemHeight
  );
  const fixedItemHeight = useVariableItemHeight(mergedProps.fixedItemHeight);
  const contentProps = useVirtualTableContent(mergedProps, context);
  const scrollSetupProps = useVirtualTableScrollSetup(mergedProps);
  const overscan = useVirtualTableOverscan(mergedProps);

  const endReached = useHtmlAttribute(mergedProps.endReached);
  const startReached = useHtmlAttribute(mergedProps.startReached);

  if (!context.columnsCount) {
    warn("No columns provided to VirtualTable");
  }

  return (
    <TableVirtuoso<TItem, VirtualTableSharedContext<TItem>>
      data={mergedProps.data}
      context={context}
      components={componentOverrides}
      className={className}
      data-testid={testId}
      fixedItemHeight={fixedItemHeight}
      defaultItemHeight={defaultItemHeight}
      endReached={endReached}
      startReached={startReached}
      increaseViewportBy={overscan}
      ref={mergedProps.ref}
      {...scrollSetupProps}
      {...contentProps}
    />
  );
};

export { VirtualTable };
