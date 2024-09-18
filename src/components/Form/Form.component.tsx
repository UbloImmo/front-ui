import { useMemo } from "react";
import styled from "styled-components";

import {
  FormHeader,
  FormDebug,
  FormEditBanner,
  FormFieldRenderer,
} from "./components";
import { FormProvider, useFormContext } from "./Form.context";
import { formContainerStyles } from "./Form.styles";
import { Dialog } from "../Dialog";

import { useTestId, useMergedProps, useStyleProps } from "@utils";

import type {
  FormContainerStyleProps,
  FormDefaultProps,
  FormProps,
} from "./Form.types";
import type { TestIdProps } from "@types";

const defaultFormProps: FormDefaultProps<object> = {
  query: {},
  defaultValues: {},
  content: [],
  schema: null,
  onChange: null,
  onSubmit: null,
  onSubmitError: console.error,
  onCancelled: null,
  title: "Form",
  badge: null,
  icon: null,
  disabled: false,
  readonly: false,
  defaultEditing: false,
  validateOnBlur: false,
  validateOnChange: true,
  validateOnSubmit: true,
  debug: false,
  asModal: null,
  columns: 2,
  submitLabel: "save",
  cancelLabel: "cancel",
};

/**
 * A flexible yet expressive form renderer.
 *
 * @version 0.0.7
 *
 * @template {object} TData - The type of the form data
 *
 * @param {FormProps<TData> & TestIdProps} props - Form component props
 * @returns {JSX.Element}
 */
const Form = <TData extends object>(
  props: FormProps<TData> & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps<FormDefaultProps<TData>, FormProps<TData>>(
    defaultFormProps as unknown as FormDefaultProps<TData>,
    props
  );

  return (
    <FormProvider {...mergedProps}>
      <InnerForm {...mergedProps} />
    </FormProvider>
  );
};

Form.defaultProps = defaultFormProps;

export { Form };

/**
 * Renders the inner form component with specific elements.
 *
 * @template {object} TData - The type of the form data
 *
 * @param {FormDefaultProps<TData> & TestIdProps} props - The props for the inner form component.
 * @return {JSX.Element} The rendered inner form component.
 */
const InnerForm = <TData extends object>(
  props: FormDefaultProps<TData> & TestIdProps
): JSX.Element => {
  const { isEditing, readonly, disabled, submitForm, asModal } =
    useFormContext<TData>();
  const testId = useTestId("form", props);

  const styleProps = useStyleProps({ isEditing, readonly, disabled });

  const InnerContent = useMemo(
    (): JSX.Element => (
      <FormContainer
        data-testid={testId}
        onSubmit={submitForm}
        {...styleProps}
        $size={props.asModal?.size ?? "m"}
        $asModal={!!asModal}
      >
        <FormHeader {...props} />
        <FormFieldRenderer />
        <FormDebug />
        <FormEditBanner
          submitLabel={props.submitLabel}
          cancelLabel={props.cancelLabel}
        />
      </FormContainer>
    ),
    [asModal, props, styleProps, submitForm, testId]
  );

  if (props.asModal) {
    const { size: _s, reference, ...dialogProps } = props.asModal;
    return (
      <Dialog {...dialogProps} reference={reference ?? undefined}>
        {InnerContent}
      </Dialog>
    );
  }

  return InnerContent;
};

const FormContainer = styled.form<FormContainerStyleProps>`
  ${formContainerStyles}
`;
