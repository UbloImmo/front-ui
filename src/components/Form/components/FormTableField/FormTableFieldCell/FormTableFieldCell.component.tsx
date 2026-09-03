import { isFunction, isString } from "@ubloimmo/front-util";
import { useMemo, type FC, type ReactNode } from "react";

import { FormTableFieldCellProps } from "./FormTableFieldCell.types";
import styles from "../../../Form.module.scss";
import { useFormTableFieldCellClassName } from "../../FormTableField/FormTableField.styles";

import { useFormContext } from "@/components/Form/Form.context";
import { computeFieldDisplayContent } from "@/components/Form/Form.format";
import { Input, useInputId } from "@/components/Input";
import { Text } from "@/components/Text";
import { TableCell } from "@/layouts/Table";
import { useCssClasses } from "@utils";

/**
 * Renders a form field inside a table cell, depending on the form mode.
 *
 * If the form is in editing mode, the component renders an `Input` component
 * with the provided props.
 *
 * If the form is in read mode, the component renders a `Text` component with
 * the content of the field computed by the {@link computeFieldDisplayContent} function.
 *
 * @version 0.1.2
 *
 * @param {FormTableFieldCellProps} props - The props of the cell field.
 * @returns {JSX.Element} The rendered component.
 */
export const FormTableFieldCell = ({
  layout,
  colSpan,
  position,
  ...props
}: FormTableFieldCellProps): JSX.Element => {
  const { isEditing } = useFormContext();
  const displayContent = useMemo<ReactNode>(() => {
    const content = computeFieldDisplayContent(props.type, props);
    if (isString(content))
      return (
        <Text color="gray-800" weight="medium" fill ellipsis title={content}>
          {content}
        </Text>
      );
    if (isFunction<FC>(content)) {
      const DisplayContent = content;
      return <DisplayContent />;
    }
    return content;
  }, [props]);

  const isDisplay = useMemo(
    () => !isEditing || layout.readonly,
    [isEditing, layout.readonly]
  );

  const inputId = useInputId(props);

  const inner = useCssClasses(styles["form-field-display-cell-inner"]);
  const className = useFormTableFieldCellClassName(position ?? "middle");

  return (
    <TableCell
      className={className}
      padded={isDisplay}
      colSpan={colSpan}
      fixedWidth={layout.fixedWidth}
      position={position}
      testId="form-table-field-cell"
      overrideTestId
    >
      {isDisplay ? (
        <div className={inner}>{displayContent}</div>
      ) : (
        <Input {...props} table id={inputId} />
      )}
    </TableCell>
  );
};
