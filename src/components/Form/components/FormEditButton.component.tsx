import styled from "styled-components";

import { useFormContext } from "../Form.context";
import { formEditButtonStyles } from "../Form.styles";

import { Button } from "@/components/Button";
import { useStatic, useUikitTranslation } from "@utils";

import type { FormEditButtonStyleProps } from "../Form.types";

/**
 * Renders a form's edit button and hides it based on edit state.
 *
 * @version 0.0.5
 * @private
 *
 * @return {JSX.Element} The rendered form edit button component.
 */
export const FormEditButton = (): JSX.Element => {
  const {
    isEditing,
    startEditing,
    readonly,
    cancelEdition,
    asModal,
    isLoading,
  } = useFormContext();
  const tl = useUikitTranslation();

  const label = useStatic(tl.action.edit);
  const closeLabel = useStatic(tl.action.close);

  return (
    <>
      <EditButton
        $hidden={isEditing || readonly}
        onClick={startEditing}
        disabled={isLoading}
        icon="Pen"
        title={label}
        testId="form-edit"
        label={label}
        secondary
        expandOnHover
      />
      {asModal && !(!isEditing && !readonly) && (
        <CloseButtonContainer>
          <CloseButtonGhost
            $hidden
            icon="XLg"
            testId="form-modal-close-ghost"
            color="black"
          />
          <CloseButton
            onClick={cancelEdition}
            icon="XLg"
            title={closeLabel}
            label={closeLabel}
            testId="form-modal-close"
            color="black"
            expandOnHover
          />
        </CloseButtonContainer>
      )}
    </>
  );
};

const EditButton = styled(Button)<FormEditButtonStyleProps>`
  ${formEditButtonStyles}
`;

const CloseButtonContainer = styled.div`
  position: relative;
`;

const CloseButtonGhost = styled(EditButton)`
  opacity: 0;
  pointer-events: none;
`;

const CloseButton = styled(EditButton)`
  position: absolute;
  inset: 0;
  left: unset;
`;
