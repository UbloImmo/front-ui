import type {
  FormTableButtonFooter,
  BuiltFormTableCallbacks,
  FormTableSelectFooter,
  BuiltFormTableProps,
} from "@/components/Form/Form.types";

export type AnyTableRow = Record<string, unknown>;

export type FormTableFieldFooterProps = Pick<
  BuiltFormTableProps,
  "footer" | "appendRow" | "data"
>;

export type FormTableFieldFooterButtonProps = {
  /**
   * Button footer configuration
   */
  footer: FormTableButtonFooter<AnyTableRow>;
  /**
   * Whether the form is disabled
   */
  disabled?: boolean;
} & Pick<BuiltFormTableCallbacks, "appendRow">;

export type FormTableFieldFooterSelectProps = {
  /**
   * Select footer configuration
   */
  footer: FormTableSelectFooter<AnyTableRow>;
  /**
   * Parent table's data array
   */
  tableData: AnyTableRow[];
  /**
   * Whether the form is disabled
   */
  disabled?: boolean;
} & Pick<BuiltFormTableCallbacks, "appendRow">;
