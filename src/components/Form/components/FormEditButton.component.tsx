import styled from "styled-components";

import { useFormContext } from "../Form.context";
import { formEditButtonStyles } from "../Form.styles";

import { Button } from "@/components/Button";
import { useStatic, useUikitTranslation } from "@utils";

import type { FormEditButtonStyleProps } from "../Form.types";

/**
 * Renders a form's edit button and hides it based on edit state.
 *
 * @version 0.0.2
 * @private
 *
 * @return {JSX.Element} The rendered form edit button component.
 */
export const FormEditButton = (): JSX.Element => {
  const { isEditing, startEditing, readonly } = useFormContext();
  const tl = useUikitTranslation();

  const label = useStatic(tl.action.edit);

  return (
    <EditButton
      $hidden={isEditing || readonly}
      onClick={startEditing}
      icon="Pen"
      title={label}
      testId="form-edit-button"
      overrideTestId
      label={label}
      secondary
      expandOnHover
    />
  );
};

const EditButton = styled(Button)<FormEditButtonStyleProps>`
  ${formEditButtonStyles}
`;
