import {
  isObject,
  isString,
  objectValues,
  type Nullable,
  type NullishPrimitives,
} from "@ubloimmo/front-util";
import {
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import { defaultCommonInputProps, StyledInputControl } from "../Input.common";
import { useInputId, useInputRef, useInputStyles } from "../Input.utils";
import {
  multiSelectInputElementStyles,
  multiSelectWrapperStyles,
} from "./MultiSelectInput.styles";
import { useMultiSelectValue } from "./MultiSelectInput.utils";
import { SelectInputOption } from "../SelectInput/components/SelectInputOption.component";
import { SelectInputOptionGroup } from "../SelectInput/components/SelectInputOptionGroup.component";
import {
  selectInputContainerStyles,
  selectOptionContainerStyles,
} from "../SelectInput/SelectInput.styles";
import {
  isSelectOptionGroup,
  useSelectInputIntersection,
  useSelectInputKeyboardEvents,
  useSelectOptions,
} from "../SelectInput/SelectInput.utils";

import { Chip } from "@/components/Chip";
import { Icon } from "@/components/Icon";
import { InputAssistiveText } from "@/components/InputAssistiveText";
import { Loading } from "@/components/Loading";
import { Text } from "@/components/Text";
import { FlexColumnLayout, FlexRowLayout } from "@/layouts/Flex";
import {
  useTestId,
  useMergedProps,
  useUikitTranslation,
  normalizeToColorKey,
} from "@utils";

import type {
  DefaultMultiSelectInputProps,
  MultiSelectInputProps,
} from "./MultiSelectInput.types";
import type { CommonInputStyleProps } from "../Input.types";
import type {
  SelectInputOptionsContainerStyleProps,
  SelectInputProps,
  SelectOption,
} from "../SelectInput/SelectInput.types";
import type { TestIdProps } from "@types";

const defaultMultiSelectInputProps: DefaultMultiSelectInputProps<NullishPrimitives> =
  {
    ...defaultCommonInputProps,
    value: null,
    onChange: null,
    name: null,
    options: [],
    placeholder: "",
    filterOption: null,
    controlIcon: "CaretDownFill",
    Option: null,
  };

/**
 * Allows the user to select multiple values from a list of options.
 *
 * @version 0.0.8
 *
 * @param {MultiSelectInputProps & TestIdProps} props - The props for the MultiSelectInput component
 *
 * @returns {JSX.Element} The MultiSelectInput component
 */
const MultiSelectInput = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>(
  props: MultiSelectInputProps<TValue, TExtraData> & TestIdProps
): JSX.Element => {
  const testId = useTestId("input-multi-select", props);
  const wrapperRef = useRef<Nullable<HTMLDivElement>>(null);
  const [isOpen, setIsOpen] = useState(false);

  const mergedProps = useMergedProps<
    DefaultMultiSelectInputProps<TValue, TExtraData>,
    MultiSelectInputProps<TValue, TExtraData>
  >(
    defaultMultiSelectInputProps as DefaultMultiSelectInputProps<
      TValue,
      TExtraData
    >,
    props
  );

  const { inputRef } = useInputRef(mergedProps);

  const { options, flattenedOptions, isLoading } = useSelectOptions(
    props as unknown as SelectInputProps<TValue, TExtraData>,
    null
  );
  const { displayOptions, activeOptions, selectOption, unselectOption } =
    useMultiSelectValue(mergedProps, options, flattenedOptions);

  const inputStyles = useInputStyles(mergedProps);
  const inputId = useInputId(mergedProps);

  const { placeholder, disabled, error, required } = mergedProps;

  /**
   * Closes the options dropdown and blurs the input.
   */
  const closeOptions = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setIsOpen(false);
  }, [inputRef]);

  /**
   * Opens the options dropdown and focuses the input.
   */
  const openOptions = useCallback(() => {
    setIsOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  /**
   * Toggles the options dropdown open or closed.
   */
  const toggleOptions = useCallback(() => {
    if (isOpen || disabled) return closeOptions();
    openOptions();
  }, [closeOptions, openOptions, isOpen, disabled]);

  /**
   * Selects an option and closes the dropdown.
   * @param {SelectOption<TValue>} option - The option to select.
   * @returns {() => void} A function that selects the option and closes the dropdown.
   */
  const selectOptionAndClose = useCallback(
    (option: SelectOption<TValue>) => () => {
      if (disabled || option.disabled) return;
      selectOption(option.value);
      closeOptions();
    },
    [disabled, closeOptions, selectOption]
  );

  /**
   * Removes an option from the selected options.
   * @param {SelectOption<TValue>} option - The option to remove.
   * @returns {() => void} A function that removes the option and closes the dropdown.
   */
  const deleteOptionFromChip = useCallback(
    (option: SelectOption<TValue>) => () => {
      if (disabled || option.disabled) return;
      if (required && activeOptions.length <= 1) return;
      unselectOption(option.value);
      closeOptions();
    },
    [disabled, required, activeOptions.length, unselectOption, closeOptions]
  );

  const testIds = useMemo(
    () => ({
      placeholder: `${testId}-placeholder`,
      root: testId,
      element: `${testId}-element`,
      chips: `${testId}-chips`,
      wrapper: `${testId}-wrapper`,
      options: `${testId}-options`,
      chip: `${testId}-chip`,
      control: `${testId}-control`,
      container: `${testId}-container`,
    }),
    [testId]
  );

  /**
   * Handles clicks on the container to toggle the options dropdown.
   * @param {React.MouseEvent<HTMLDivElement>} event - The click event.
   */
  const toggleOptionsOnContainerClick = useCallback<
    MouseEventHandler<HTMLDivElement>
  >(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (
        !("dataset" in event.target) ||
        !isObject(event.target.dataset) ||
        !("testid" in event.target.dataset) ||
        !isString(event.target.dataset.testid)
      )
        return;

      if (
        !objectValues(testIds).includes(event.target.dataset.testid) ||
        [testIds.chip, testIds.options].includes(event.target.dataset.testid)
      )
        return;
      toggleOptions();
    },
    [toggleOptions, testIds]
  );

  const tl = useUikitTranslation();

  const assistiveText = useMemo(() => {
    if (isLoading) return tl.status.loading();
    return tl.status.empty();
  }, [isLoading, tl]);

  const noOptions = useMemo(() => {
    return !displayOptions.length;
  }, [displayOptions]);

  const noValue = useMemo(() => {
    return !activeOptions.length;
  }, [activeOptions]);

  useSelectInputKeyboardEvents(wrapperRef, inputId, closeOptions);

  const { isShifted, optionsContainerRef } = useSelectInputIntersection(
    isOpen,
    wrapperRef
  );

  return (
    <MultiSelectInputWrapper
      reverse
      ref={wrapperRef}
      testId={testIds.root}
      overrideTestId
      {...inputStyles}
    >
      {isOpen && (
        <MultiSelectOptionsContainer
          role="listbox"
          testId={testIds.options}
          overrideTestId
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          ref={optionsContainerRef}
          $reverse={isShifted}
        >
          {displayOptions.map((optionOrGroup, index) =>
            isSelectOptionGroup<TValue, TExtraData>(optionOrGroup) ? (
              <SelectInputOptionGroup<TValue, TExtraData>
                {...optionOrGroup}
                onSelectOption={selectOptionAndClose}
                key={`${optionOrGroup.label}-${index}`}
                Option={mergedProps.Option}
              />
            ) : (
              <SelectInputOption<TValue, TExtraData>
                key={`${optionOrGroup.value}-${index}`}
                onSelect={selectOptionAndClose(optionOrGroup)}
                Option={mergedProps.Option}
                {...optionOrGroup}
              />
            )
          )}
          {noOptions && (
            <AssistiveTextWrapper>
              <InputAssistiveText assistiveText={assistiveText} />
            </AssistiveTextWrapper>
          )}
        </MultiSelectOptionsContainer>
      )}
      <MultiSelectInputContainer
        {...inputStyles}
        aria-expanded={isOpen}
        data-testid={testIds.container}
      >
        <MultiSelectInputElement
          {...inputStyles}
          onClick={toggleOptionsOnContainerClick}
          data-testid={testIds.element}
          id={inputId}
          aria-expanded={isOpen}
        >
          {noValue ? (
            <Text
              weight="medium"
              color="gray-400"
              testId={testIds.placeholder}
              overrideTestId
              aria-placeholder={placeholder}
              ellipsis
            >
              {placeholder}
            </Text>
          ) : (
            <FlexRowLayout
              fill
              wrap
              align="center"
              gap="s-1"
              testId={testIds.chips}
              overrideTestId
            >
              {activeOptions.map((option, index) => (
                <Chip
                  key={`${option.value}-${index}`}
                  label={option.label}
                  icon={option.icon}
                  color={
                    error
                      ? "error"
                      : option.disabled || disabled
                        ? "gray"
                        : normalizeToColorKey(
                            option.iconColor ?? "primary",
                            "primary"
                          )
                  }
                  disabled={
                    (required && activeOptions.length <= 1) ||
                    option.disabled ||
                    disabled
                  }
                  testId={testIds.chip}
                  overrideTestId
                  deleteButtonTitle={tl.action.remove(option.label)}
                  onDelete={deleteOptionFromChip(option)}
                />
              ))}
            </FlexRowLayout>
          )}
        </MultiSelectInputElement>
        <StyledInputControl {...inputStyles} data-testid={`${testId}-control`}>
          {isOpen && isLoading ? (
            <Loading animation="BouncingBalls" size="s-4" />
          ) : (
            <Icon name={mergedProps.controlIcon} />
          )}
        </StyledInputControl>
      </MultiSelectInputContainer>
    </MultiSelectInputWrapper>
  );
};

MultiSelectInput.defaultProps = defaultMultiSelectInputProps;

export { MultiSelectInput };

const MultiSelectInputWrapper = styled(FlexColumnLayout)<CommonInputStyleProps>`
  ${multiSelectWrapperStyles}
`;

const MultiSelectOptionsContainer = styled(
  FlexColumnLayout
)<SelectInputOptionsContainerStyleProps>`
  ${selectOptionContainerStyles}
`;

const MultiSelectInputContainer = styled.div<CommonInputStyleProps>`
  ${selectInputContainerStyles}
`;

const AssistiveTextWrapper = styled.div`
  padding: var(--s-2);
`;

const MultiSelectInputElement = styled.div<CommonInputStyleProps>`
  ${multiSelectInputElementStyles}
`;
