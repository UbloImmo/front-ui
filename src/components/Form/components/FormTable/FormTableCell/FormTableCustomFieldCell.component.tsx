import { useMemo } from "react";

import {
  FormTableCellControls,
  type FormTableCellControlsProps,
} from "./FormTableCellControls.component";
import { useFormContext } from "../../../Form.context";
import styles from "../FormTable.module.scss";

import { useInputId } from "@/components/Input";
import { TableCell } from "@/layouts/Table";
import { useCssClasses } from "@utils";

import type { BuiltFormCustomFieldProps } from "../../../Form.types";

type FormTableCustomFieldCellProps = BuiltFormCustomFieldProps &
  FormTableCellControlsProps & {
    rowIndex: number;
    colSpan: number;
  };

/**
 * Renders a custom form field inside a table cell, depending on the form mode.
 *
 * If the form is in editing mode, the component renders the provided `CustomInput`
 * component with the merged props from the form context and the provided props.
 *
 * The `disabled` property is automatically set to `true` if the form is not in
 * editing mode.
 *
 * The `rowIndex` property is also automatically set to the index of the row in
 * which the cell is currently rendered.
 *
 * @version 0.1.0
 *
 * @param {() => JSX.Element} CustomInput - The custom form field component.
 * @param {BuiltFormCustomFieldProps} props - The props to be passed to the custom form field component.
 * @param {number} props.rowIndex - The index of the row in which the cell is currently rendered.
 * @returns {JSX.Element} The rendered component.
 */
export const FormTableCustomFieldCell = ({
  CustomInput,
  rowIndex,
  colSpan,
  isLast,
  isFirst,
  controls,
  ...props
}: FormTableCustomFieldCellProps): JSX.Element => {
  const { isEditing } = useFormContext();

  const customFieldProps = useMemo(() => {
    const disabled = isEditing ? props.disabled : true;
    return {
      ...props,
      disabled,
    };
  }, [isEditing, props]);

  const inputId = useInputId(props);

  const className = useCssClasses(styles["form-table-cell"]);

  return (
    <TableCell colSpan={colSpan} className={className}>
      <FormTableCellControls
        controls={controls}
        isFirst={isFirst}
        isLast={isLast}
      />
      <CustomInput {...customFieldProps} id={inputId} rowIndex={rowIndex} />
    </TableCell>
  );
};
