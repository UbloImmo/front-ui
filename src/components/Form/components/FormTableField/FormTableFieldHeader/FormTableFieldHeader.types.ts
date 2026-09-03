import { BuiltFormTableProps } from "@/components/Form/Form.types";

export type FormTableFieldHeaderProps = Pick<
  BuiltFormTableProps,
  "headers" | "colSpans" | "modifiers" | "selected" | "setTableSelection"
>;
