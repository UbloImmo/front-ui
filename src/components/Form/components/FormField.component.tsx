import { isBoolean, isFunction, type Nullable } from "@ubloimmo/front-util";
import { useMemo } from "react";

import { FormFieldDisplay } from "./FormFieldDisplay.component";
import { useFormContext } from "../Form.context";

import { type GridEndPosition, GridItem } from "@layouts";

import { type InputType, Field } from "@components";

import type { BuiltFieldProps, FormFieldLayoutHiddenFn } from "../Form.types";

/**
 * Renders a form field based on the provided layout and props.
 *
 * @remarks will render the corresponding field or display field based on the form context.
 *
 * @param {BuiltFieldProps<InputType>} layout - The layout of the form field.
 * @return {Nullable<JSX.Element>} The rendered form field component.
 */
export const FormField = ({
  layout,
  ...props
}: BuiltFieldProps<InputType>): Nullable<JSX.Element> => {
  const { isEditing } = useFormContext();

  /**
   * Compute the field's containg grid item column end prop based on field size
   */
  const columnEnd = useMemo<GridEndPosition>(() => {
    return `span ${layout?.size ?? 1}`;
  }, [layout]);

  /**
   * Decide whether to display the field in edit or display mode
   *
   * @todo add individual field readonly prop to allow fields to stay in display mode even while editing
   */
  const FieldOrDisplayField = useMemo(() => {
    return isEditing && !layout?.readonly ? Field : FormFieldDisplay;
  }, [isEditing, layout]);

  const isHidden = useMemo(
    () =>
      isFunction<FormFieldLayoutHiddenFn>(layout?.hidden)
        ? layout.hidden()
        : isBoolean(layout?.hidden)
        ? layout.hidden
        : false,
    [layout]
  );

  if (isHidden) return null;

  return (
    <GridItem
      columnEnd={columnEnd}
      align="start"
      testId="form-field-container"
      overrideTestId
      fill
    >
      <FieldOrDisplayField {...props} testId="form-field" />
    </GridItem>
  );
};
