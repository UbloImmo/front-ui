import type {
  BuiltFormTableCallbacks,
  BuiltFormTableProps,
  BuiltFormTableRow,
} from "@/components/Form/Form.types";
import type { GridTemplate } from "@/layouts/Grid";
import type { Nullable } from "@ubloimmo/front-util";
import type { RefObject } from "react";

export type FormTableFieldRowProps = {
  row: BuiltFormTableRow;
  containerRef: RefObject<Nullable<HTMLElement>>;
  gridColumns: GridTemplate;
} & Pick<BuiltFormTableCallbacks, "deleteRow" | "setRowSelection"> &
  Pick<BuiltFormTableProps, "colSpans">;
