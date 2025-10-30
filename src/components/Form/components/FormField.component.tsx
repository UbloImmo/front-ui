import { useMemo } from "react";

import { FormFieldDisplay } from "./FormFieldDisplay.component";
import { FormFieldGridItem } from "./FormFieldGridItem.component";
import { useFormContext } from "../Form.context";

import { Field } from "@/components/Field";
import { TestIdProps } from "@/types/test.types";
import { useTestId } from "@utils";

import type { BuiltFieldProps } from "../Form.types";
import type { InputType } from "@/components/Input";
import type { Nullable } from "@ubloimmo/front-util";

/**
 * Renders a form field based on the provided layout and props.
 *
 * @version 0.0.5
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
   * Decide whether to display the field in edit or display mode
   *
   * @todo add individual field readonly prop to allow fields to stay in display mode even while editing
   */
  const FieldOrDisplayField = useMemo(() => {
    return isEditing && !layout.readonly ? Field : FormFieldDisplay;
  }, [isEditing, layout]);

  const testId = useTestId("form-field", props as TestIdProps);

  if (layout.hidden) return null;

  return (
    <FormFieldGridItem
      $fixedWidth={layout.fixedWidth}
      columnEnd={layout.columnEnd}
      align="start"
      testId="form-field-container"
      overrideTestId
      fill
    >
      <FieldOrDisplayField {...props} layout={layout} testId={testId} />
    </FormFieldGridItem>
  );
};
