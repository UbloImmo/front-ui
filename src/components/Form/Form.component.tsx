import styled from "styled-components";

import {
  FormHeader,
  FormDebug,
  FormEditBanner,
  FormFieldRenderer,
} from "./components";
import { FormProvider, useFormContext } from "./Form.context";
import { formContainerStyles } from "./Form.styles";

import { useTestId, useMergedProps, useStyleProps } from "@utils";

import type {
  FormContainerStyleProps,
  FormDefaultProps,
  FormProps,
} from "./Form.types";
import type { TestIdProps } from "@types";

const defaultFormProps: FormDefaultProps<object> = {
  query: () => ({}),
  defaultValues: {},
  content: [],
  schema: null,
  onChange: null,
  onSubmit: null,
  onSubmitError: console.error,
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
};

/**
 * A flexible yet expressive form renderer.
 *
 * @version 0.0.3
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
  const { isEditing, readonly, disabled, submitForm } = useFormContext<TData>();
  const testId = useTestId("form", props);

  const styleProps = useStyleProps({ isEditing, readonly, disabled });
  return (
    <FormContainer data-testid={testId} {...styleProps} onSubmit={submitForm}>
      <FormHeader {...props} />
      <FormFieldRenderer />
      <FormDebug />
      <FormEditBanner />
    </FormContainer>
  );
};

const FormContainer = styled.form<FormContainerStyleProps>`
  ${formContainerStyles}
`;
Form.defaultProps = defaultFormProps;

export { Form };
