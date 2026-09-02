import type { BuiltFieldProps } from "@/components/Form/Form.types";
import type { InputType } from "@/components/Input/Input.types";
import type { TableCellProps } from "@/layouts/Table/components/TableCell/TableCell.types";

export type FormTableFieldCellProps = BuiltFieldProps<InputType> &
  Pick<TableCellProps, "position" | "colSpan">;
