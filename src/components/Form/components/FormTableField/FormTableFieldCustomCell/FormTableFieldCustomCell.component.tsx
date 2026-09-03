import { type ReactNode, useMemo } from "react";

import { useFormTableFieldCellClassName } from "../FormTableField.styles";

import { useFormContext } from "@/components/Form/Form.context";
import { useInputId } from "@/components/Input/Input.utils";
import { TableCell } from "@/layouts/Table";

import type { FormTableFieldCustomCellProps } from "./FormTableFieldCustomCell.types";

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
 * @version 0.1.2
 *
 * @param {FormTableFieldCustomCellProps} props - The props to be passed to the custom form field component.
 * @returns {ReactNode} The rendered component.
 */
export const FormTableFieldCustomCell = ({
  CustomInput,
  rowIndex,
  rowDisplayIndex,
  colSpan,
  position,
  ...props
}: FormTableFieldCustomCellProps): ReactNode => {
  const { isEditing } = useFormContext();

  const customFieldProps = useMemo(() => {
    const disabled = isEditing ? props.disabled : true;
    return {
      ...props,
      disabled,
    };
  }, [isEditing, props]);

  const inputId = useInputId(props);

  const className = useFormTableFieldCellClassName(position);

  return (
    <TableCell
      colSpan={colSpan}
      className={className}
      fixedWidth={props.layout.fixedWidth}
      position={position}
      testId="form-table-field-custom-cell"
      overrideTestId
    >
      <CustomInput
        {...customFieldProps}
        id={inputId}
        rowIndex={rowIndex}
        rowDisplayIndex={rowDisplayIndex}
      />
    </TableCell>
  );
};
