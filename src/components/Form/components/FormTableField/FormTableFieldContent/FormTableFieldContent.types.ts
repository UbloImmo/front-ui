import type { BuiltFormTableProps } from "@/components/Form/Form.types";
import type { Nullable } from "@ubloimmo/front-util";

export type FormTableFieldContentProps = BuiltFormTableProps & {
  /**
   * HTML id attribute to pass to the internal scroller grid element
   */
  scrollerId: string;
  /**
   * Whether the table is currently empty,
   * as in no rows are being displayed
   */
  isEmpty: boolean;
};

export interface FormTableFieldContentRefs {
  /**
   * Handle to the internal GridLayout element (scrollable container)
   */
  readonly gridRef: Nullable<HTMLDivElement>;
  /**
   * Handle to the internal Table element (scrolling content)
   */
  readonly tableRef: Nullable<HTMLTableElement>;
  /**
   * Handle to the internal TableBody element (scrolling content)
   */
  readonly tableBodyRef: Nullable<HTMLTableSectionElement>;
  /**
   * Handle to the internal TableHeader element (scrolling content)
   */
  readonly tableHeaderRef: Nullable<HTMLTableSectionElement>;
}
