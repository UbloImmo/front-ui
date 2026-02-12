import { useCallback, useMemo } from "react";

import { useFormContext } from "../Form.context";
import styles from "../Form.module.scss";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { FlexRowLayout } from "@/layouts/Flex";
import {
  useCssClasses,
  useMergedProps,
  useStatic,
  useUikitTranslation,
  type TranslationKey,
} from "@utils";

import type {
  DefaultFormEditBannerProps,
  FormEditBannerProps,
} from "../Form.types";

const defaultFormEditBannerProps: DefaultFormEditBannerProps = {
  submitLabel: "save",
  cancelLabel: "cancel",
  submitButtonStyle: {},
  cancelButtonStyle: {},
  bannerInfo: null,
  embedded: false,
};

/**
 * Renders the form's edit banner, hiding it if the form is not in edit mode.
 *
 * @version 0.1.0
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
    submitForm,
  } = useFormContext();

  const className = useCssClasses(styles["form-edit-banner"], [
    styles.editing,
    isEditing,
  ]);

  const tl = useUikitTranslation();
  const mergedProps = useMergedProps(defaultFormEditBannerProps, props);

  const cancelLabel = useStatic(() =>
    mergedProps.cancelLabel in tl.action
      ? tl.action[mergedProps.cancelLabel as TranslationKey<"action">]()
      : mergedProps.cancelLabel
  );
  const submitLabel = useStatic(() =>
    mergedProps.submitLabel in tl.action
      ? tl.action[mergedProps.submitLabel as TranslationKey<"action">]()
      : mergedProps.submitLabel
  );

  const submitDisabled = useMemo<boolean>(() => {
    return isLoading || !isEditing || !isValid || disabled;
  }, [isLoading, isEditing, isValid, disabled]);

  const submitButtonType = useMemo(
    () => (mergedProps.embedded ? "button" : "submit"),
    [mergedProps.embedded]
  );

  const submitOnClickIfEmbedded = useCallback(() => {
    if (submitDisabled) return;
    if (!mergedProps.embedded) return;
    submitForm();
  }, [submitDisabled, submitForm, mergedProps.embedded]);

  return (
    <FlexRowLayout
      className={className}
      align="center"
      gap="s-6"
      justify="space-between"
      testId="form-edit-banner"
      overrideTestId
    >
      {mergedProps.bannerInfo ? (
        <FlexRowLayout
          align="center"
          gap="s-2"
          justify="start"
          testId="form-edit-banner-info"
          overrideTestId
        >
          <Icon name="InfoCircle" color="gray-600" size="s-4" />
          <Text color="gray-800" weight="medium" size="s">
            {mergedProps.bannerInfo}
          </Text>
        </FlexRowLayout>
      ) : (
        <Button
          label={cancelLabel}
          onClick={cancelEdition}
          icon="ArrowReturnLeft"
          secondary
          color="clear"
          testId="form-cancel-button"
          overrideTestId
          {...mergedProps.cancelButtonStyle}
        />
      )}
      <Button
        label={submitLabel}
        type={submitButtonType}
        onClick={submitOnClickIfEmbedded}
        disabled={submitDisabled}
        testId="form-submit-button"
        overrideTestId
        loading={isSubmitting}
        {...mergedProps.submitButtonStyle}
      />
    </FlexRowLayout>
  );
};
