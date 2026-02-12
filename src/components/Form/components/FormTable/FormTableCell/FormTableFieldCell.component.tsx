import { isFunction, isNull, isString } from "@ubloimmo/front-util";
import { useMemo, type FC, type ReactNode } from "react";

import {
  FormTableCellControls,
  type FormTableCellControlsProps,
} from "./FormTableCellControls.component";
import styles from "../../../Form.module.scss";

import { useFormContext } from "@/components/Form/Form.context";
import { computeFieldDisplayContent } from "@/components/Form/Form.format";
import { Input, useInputId, type InputType } from "@/components/Input";
import { Text } from "@/components/Text";
import { TableCell } from "@/layouts/Table";
import { useCssClasses, useCssVariables } from "@utils";

import type {
  BuiltFieldProps,
  BuiltFormFieldLayoutFixedWidthProp,
} from "@/components/Form/Form.types";

type FormTableFieldCellProps = BuiltFieldProps<InputType> &
  FormTableCellControlsProps & {
    colSpan: number;
  };

/**
 * Renders a form field inside a table cell, depending on the form mode.
 *
 * If the form is in editing mode, the component renders an `Input` component
 * with the provided props.
 *
 * If the form is in read mode, the component renders a `Text` component with
 * the content of the field computed by the `computeFieldDisplayContent` function.
 *
 * @param {BuiltFieldProps<InputType>} props - The props of the form field.
 * @returns {JSX.Element} The rendered component.
 */
export const FormTableFieldCell = ({
  layout,
  colSpan,
  controls,
  isFirst,
  isLast,
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

  return (
    <FormTableCell
      padded={isDisplay}
      colSpan={colSpan}
      fixedWidth={layout.fixedWidth}
    >
      <FormTableCellControls
        controls={controls}
        isFirst={isFirst}
        isLast={isLast}
      />
      {isDisplay ? (
        <div className={inner}>{displayContent}</div>
      ) : (
        <Input {...props} table id={inputId} />
      )}
    </FormTableCell>
  );
};

const FormTableCell = ({
  fixedWidth,
  children,
  ...props
}: BuiltFormFieldLayoutFixedWidthProp & Parameters<typeof TableCell>[0]) => {
  const className = useCssClasses(styles["form-field-grid-item"], [
    styles["fixed-width"],
    !isNull(fixedWidth),
  ]);
  const style = useCssVariables({
    "fixed-width": fixedWidth ?? undefined,
  });

  return (
    <TableCell className={className} styleOverride={style} {...props}>
      {children}
    </TableCell>
  );
};
