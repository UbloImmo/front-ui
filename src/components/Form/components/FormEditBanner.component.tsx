import { useMemo } from "react";
import styled from "styled-components";

import { useFormContext } from "../Form.context";
import { formEditBannerStyles } from "../Form.styles";

import { Button } from "@/components/Button";
import { FlexRowLayout } from "@layouts";
import {
  useMergedProps,
  useStatic,
  useStyleProps,
  useUikitTranslation,
} from "@utils";

import type {
  DefaultFormEditBannerProps,
  FormEditBannerProps,
  FormEditBannerStyleProps,
} from "../Form.types";

const defaultFormEditBannerProps: DefaultFormEditBannerProps = {
  submitLabel: "save",
  cancelLabel: "cancel",
};

/**
 * Renders the form's edit banner, hiding it if the form is not in edit mode.
 *
 * @version 0.0.2
 *
 * @return {JSX.Element} The rendered FormEditBanner component.
 */
export const FormEditBanner = (props: FormEditBannerProps): JSX.Element => {
  const {
    isEditing,
    isLoading,
    isSubmitting,
    cancelEdition,
    disabled,
    isValid,
  } = useFormContext();
  const styleProps = useStyleProps({ isEditing, isLoading, isSubmitting });

  const tl = useUikitTranslation();
  const mergedProps = useMergedProps(defaultFormEditBannerProps, props);

  const cancelLabel = useStatic(tl.action[mergedProps.cancelLabel]);
  const submitLabel = useStatic(tl.action[mergedProps.submitLabel]);

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
        label={cancelLabel}
        onClick={cancelEdition}
        icon="ArrowReturnLeft"
        secondary
        color="clear"
      />
      <Button
        label={submitLabel}
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
