import { useMemo, type ReactNode } from "react";
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
  FormLayoutProps,
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
  shouldMergeQueryData: true,
  debug: false,
  asModal: null,
  columns: 2,
  submitLabel: "save",
  cancelLabel: "cancel",
  cancelButtonStyle: {},
  submitButtonStyle: {},
  bannerInfo: null,
  embedded: false,
};

/**
 * A flexible yet expressive form renderer.
 *
 * @version 0.0.20
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
      <InnerForm
        {...mergedProps}
        testId={props.testId}
        overrideTestId={props.overrideTestId}
      />
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
  const InnerContent = useMemo(
    (): JSX.Element => (
      <InnerFormContainer
        {...props}
        testId={props.testId}
        overrideTestId={props.overrideTestId}
      >
        <FormHeader {...props} />
        <FormFieldRenderer />
        <FormDebug />
        <FormEditBanner
          submitLabel={props.submitLabel}
          cancelLabel={props.cancelLabel}
          cancelButtonStyle={props.cancelButtonStyle}
          submitButtonStyle={props.submitButtonStyle}
          bannerInfo={props.bannerInfo}
          embedded={props.embedded}
        />
      </InnerFormContainer>
    ),
    [props]
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

/**
 * Renders the inner form container component.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child elements to render inside the container.
 * @param {boolean} props.embedded - Whether the form is embedded or not.
 * @param {FormLayoutProps & TestIdProps} props.props - Additional props for layout and testing.
 * @returns {JSX.Element} The rendered form container.
 */
const InnerFormContainer = ({
  children,
  embedded,
  ...props
}: FormLayoutProps & TestIdProps & { children: ReactNode }): JSX.Element => {
  const { isEditing, readonly, disabled, submitForm, asModal } =
    useFormContext();
  const testId = useTestId("form", props);

  const styleProps = useStyleProps({
    isEditing,
    readonly,
    disabled,
    asModal: !!asModal,
    size: asModal?.size ?? "m",
  });
  if (embedded) {
    return (
      <EmbeddedFormContainer data-testid={testId} {...styleProps}>
        {children}
      </EmbeddedFormContainer>
    );
  }

  return (
    <FormContainer data-testid={testId} onSubmit={submitForm} {...styleProps}>
      {children}
    </FormContainer>
  );
};

const FormContainer = styled.form<FormContainerStyleProps>`
  ${formContainerStyles}
`;

const EmbeddedFormContainer = styled.div<FormContainerStyleProps>`
  ${formContainerStyles}
`;
