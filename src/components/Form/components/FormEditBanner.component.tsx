import { useMemo } from "react";
import styled from "styled-components";

import { useFormContext } from "../Form.context";
import { formEditBannerStyles } from "../Form.styles";

import { FlexRowLayout } from "@layouts";
import { useStyleProps } from "@utils";

import { Button } from "@components";

import type { FormEditBannerStyleProps } from "../Form.types";

/**
 * Renders the form's edit banner, hiding it if the form is not in edit mode.
 *
 * @return {JSX.Element} The rendered FormEditBanner component.
 */
export const FormEditBanner = (): JSX.Element => {
  const {
    isEditing,
    isLoading,
    isSubmitting,
    cancelEdition,
    disabled,
    isValid,
  } = useFormContext();
  const styleProps = useStyleProps({ isEditing, isLoading, isSubmitting });

  const submitDisabled = useMemo<boolean>(() => {
    return isLoading || !isEditing || !isValid || disabled;
  }, [isLoading, isEditing, isValid, disabled]);

  return (
    <Banner
      align="center"
      gap="s-6"
      justify="space-between"
      testId="form-edit-banner"
      overrideTestId
      {...styleProps}
    >
      <Button
        label="Cancel"
        onClick={cancelEdition}
        icon="ArrowReturnLeft"
        secondary
        color="clear"
      />
      <Button
        label="Save"
        type="submit"
        disabled={submitDisabled}
        loading={isSubmitting}
      />
    </Banner>
  );
};

const Banner = styled(FlexRowLayout)<FormEditBannerStyleProps>`
  ${formEditBannerStyles}
`;
