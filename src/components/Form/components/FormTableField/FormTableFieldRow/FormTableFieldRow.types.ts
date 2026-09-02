import type {
  BuiltFormTableCallbacks,
  BuiltFormTableProps,
  BuiltFormTableRow,
} from "@/components/Form/Form.types";
import type { GridTemplate } from "@layouts";
import type { RefObject } from "react";

export type FormTableFieldRowProps = {
  row: BuiltFormTableRow;
  containerRef: RefObject<HTMLElement>;
  gridColumns: GridTemplate;
} & Pick<BuiltFormTableCallbacks, "deleteRow" | "setRowSelection"> &
  Pick<BuiltFormTableProps, "colSpans">;
