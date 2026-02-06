import { isFunction } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";

import { useFieldAssistiveText, useFieldValidity } from "./Field.utils";
import { NativeInputOnChangeFn, useInputId } from "../Input";
import { defaultCommonInputProps } from "../Input/Input.common";
import { Input } from "../Input/Input.component";
import { inputTypes } from "../Input/Input.data";
import { InputAssistiveText } from "../InputAssistiveText";
import { InputLabel } from "../InputLabel";
import { Text } from "../Text";
import styles from "./Field.module.scss";

import { FlexColumnLayout, FlexRowLayout } from "@/layouts/Flex";
import { useLogger, useTestId, useMergedProps, useCssClasses } from "@utils";

import type { FieldProps, FieldDefaultProps } from "./Field.types";
import type { InputType } from "../Input/Input.types";
import type { TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

const defaultFieldProps: FieldDefaultProps<InputType> = {
  type: "text",
  ...defaultCommonInputProps,
  ...InputLabel.defaultProps,
  ...InputAssistiveText.defaultProps,
  label: "[Field label]",
  placeholder: "[Field placeholder]",
  assistiveText: null,
  value: null,
  onChange: null,
  className: null,
  name: null,
  styleOverride: null,
  suffix: null,
};

/**
 * A grouping of InputLabel, Input and InputAssistiveText elements.
 *
 * @version 0.1.0
 *
 * @param {FieldProps<TType> & TestIdProps} props - Field component props
 * @returns {Nullable<JSX.Element>}
 */
const Field = <TType extends InputType>(
  props: FieldProps<TType> & TestIdProps
): Nullable<JSX.Element> => {
  const logger = useLogger("Field");

  const { styleOverride, ...mergedProps }: FieldDefaultProps<InputType> =
    useMergedProps<
      FieldDefaultProps<InputType>,
      Partial<FieldDefaultProps<InputType>>
    >(defaultFieldProps, props as Partial<FieldDefaultProps<InputType>>);

  const testId = useTestId("field", props);
  const className = useCssClasses(styles.field, mergedProps.className);

  const inputId = useInputId(props);
  const labelHtmlFor = useMemo(() => {
    if (["icon-picker", "combobox"].includes(mergedProps.type)) {
      return null;
    }
    return inputId;
  }, [mergedProps.type, inputId]);

  const { errorText, error, setValidityState } = useFieldValidity(mergedProps);

  /**
   * Native input on change middleware that updates the validity state
   */
  const updateValidityOnChange = useCallback<NativeInputOnChangeFn>(
    (event) => {
      setValidityState(event.target.validity);
      if (isFunction<NativeInputOnChangeFn>(mergedProps.onChangeNative)) {
        mergedProps.onChangeNative(event);
      }
    },
    [mergedProps, setValidityState]
  );

  const fieldAssistiveText = useFieldAssistiveText(
    mergedProps,
    mergedProps.value
  );

  if (!mergedProps.type || !inputTypes?.includes(mergedProps.type)) {
    logger.error(`Invalid type (${mergedProps.type}) provided.`);
    return null;
  }

  return (
    <FlexColumnLayout
      testId={testId}
      overrideTestId
      data-field-type={mergedProps.type}
      className={className}
      styleOverride={styleOverride}
      gap="s-1"
      fill
    >
      <InputLabel
        {...mergedProps}
        testId="field-label"
        overrideTestId
        htmlFor={labelHtmlFor}
      >
        {mergedProps.suffix ? (
          <FlexRowLayout align="center" gap={"s-2"} fill>
            <Input
              {...mergedProps}
              id={inputId}
              testId="field-input"
              onChangeNative={updateValidityOnChange}
              error={error}
            />
            <Text
              testId="field-suffix"
              overrideTestId
              color="gray-700"
              weight="medium"
            >
              {mergedProps.suffix}
            </Text>
          </FlexRowLayout>
        ) : (
          <Input
            {...mergedProps}
            id={inputId}
            testId="field-input"
            onChangeNative={updateValidityOnChange}
            error={error}
          />
        )}
      </InputLabel>
      {fieldAssistiveText.shouldDisplay && (
        <InputAssistiveText
          assistiveText={fieldAssistiveText.assistiveText}
          errorText={errorText}
          error={error}
          testId="field-assistive-text"
          overrideTestId
        />
      )}
    </FlexColumnLayout>
  );
};
Field.defaultProps = defaultFieldProps;

export { Field };
