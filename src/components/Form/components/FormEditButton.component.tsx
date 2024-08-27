import styled from "styled-components";

import { useFormContext } from "../Form.context";
import { formEditButtonStyles } from "../Form.styles";

import { Button } from "@/components/Button";

import type { FormEditButtonStyleProps } from "../Form.types";

/**
 * Renders a form's edit button and hides it based on edit state.
 *
 * @return {JSX.Element} The rendered form edit button component.
 */
export const FormEditButton = (): JSX.Element => {
  const { isEditing, startEditing, readonly } = useFormContext();

  return (
    <EditButton
      $hidden={isEditing || readonly}
      onClick={startEditing}
      icon="Pen"
      title="Edit"
      testId="form-edit-button"
      overrideTestId
      label={"Edit"}
      secondary
      expandOnHover
    />
  );
};

const EditButton = styled(Button)<FormEditButtonStyleProps>`
  ${formEditButtonStyles}
`;
