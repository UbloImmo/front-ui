import type { BuiltFormCustomFieldProps } from "@/components/Form/Form.types";
import type { TableCellProps } from "@/layouts/Table/components/TableCell/TableCell.types";
import type { DeepNonNullish } from "@ubloimmo/front-util";

export type FormTableFieldCustomCellProps = BuiltFormCustomFieldProps &
  DeepNonNullish<Pick<TableCellProps, "position" | "colSpan">>;
