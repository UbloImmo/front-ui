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

import { defaultCommonInputProps, StyledInputControl } from "../Input.common";
import { useInputId, useInputRef, useInputStyles } from "../Input.utils";
import {
  useMultiSelectInputContainerClassName,
  useMultiSelectInputElementClassName,
  useMultiSelectWrapperClassName,
} from "./MultiSelectInput.styles";
import { useMultiSelectValue } from "./MultiSelectInput.utils";
import { SelectInputOptionsList } from "../SelectInput/components/SelectInputOptionsList.component";
import { SelectInputPopover } from "../SelectInput/components/SelectInputPopover.component";
import { useSelectInputClearButtonClassName } from "../SelectInput/SelectInput.styles";
import {
  useSelectInputKeyboardEvents,
  useSelectOptions,
} from "../SelectInput/SelectInput.utils";

import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Icon } from "@/components/Icon";
import { Loading } from "@/components/Loading";
import { Text } from "@/components/Text";
import { FlexColumnLayout, FlexRowLayout } from "@/layouts/Flex";
import {
  useTestId,
  useMergedProps,
  useUikitTranslation,
  normalizeToColorKey,
  useStatic,
} from "@utils";

import type {
  DefaultMultiSelectInputProps,
  MultiSelectInputProps,
} from "./MultiSelectInput.types";
import type {
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
    clearable: false,
  };

/**
 * Allows the user to select multiple values from a list of options.
 *
 * @version 0.1.0
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
  const {
    displayOptions,
    activeOptions,
    selectOption,
    unselectOption,
    clearInternalValue,
  } = useMultiSelectValue(mergedProps, options, flattenedOptions);

  const inputStyles = useInputStyles(mergedProps);
  const inputId = useInputId(mergedProps);

  const { placeholder, disabled, error, required, clearable } = mergedProps;

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

  const clearLabel = useStatic(tl.action.unselectAll);

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

  /**
   * Clears all selected options.
   */
  const clearAllOptions = useCallback(() => {
    if (disabled || !activeOptions.length || !clearable || isOpen) return;
    clearInternalValue();
  }, [activeOptions.length, disabled, isOpen, clearable, clearInternalValue]);

  useSelectInputKeyboardEvents(wrapperRef, inputId, closeOptions);

  const OptionsList = (
    <SelectInputOptionsList
      open={isOpen}
      displayOptions={displayOptions}
      onSelectOption={selectOptionAndClose}
      Option={mergedProps.Option ?? undefined}
      isEmptyResult={noOptions}
      assistiveText={assistiveText}
      testId={testId}
      key="multi-select-input-options-list"
    />
  );

  const wrapper = useMultiSelectWrapperClassName(inputStyles);
  const element = useMultiSelectInputElementClassName(inputStyles);
  const container = useMultiSelectInputContainerClassName(inputStyles);
  const clearButton = useSelectInputClearButtonClassName();

  return (
    <FlexColumnLayout
      className={wrapper}
      reverse
      ref={wrapperRef}
      testId={testIds.root}
      overrideTestId
    >
      <SelectInputPopover
        open={isOpen}
        onOpenChange={setIsOpen}
        testId={testId}
        content={OptionsList}
        wrapperRef={wrapperRef}
      >
        <div
          className={container}
          {...inputStyles}
          aria-expanded={isOpen}
          data-testid={testIds.container}
        >
          <div
            className={element}
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
          </div>
          <StyledInputControl
            {...inputStyles}
            data-testid={`${testId}-control`}
            onClick={activeOptions.length ? clearAllOptions : undefined}
          >
            {isOpen && isLoading ? (
              <Loading animation="BouncingBalls" size="s-4" />
            ) : !isOpen && clearable && !!activeOptions.length && !disabled ? (
              <Button
                className={clearButton}
                color="clear"
                secondary
                icon="XLg"
                embedded
                title={clearLabel}
                testId={`${testId}-clear`}
                overrideTestId
              />
            ) : (
              <Icon name={mergedProps.controlIcon} />
            )}
          </StyledInputControl>
        </div>
      </SelectInputPopover>
    </FlexColumnLayout>
  );
};

MultiSelectInput.__DEFAULT_PROPS = defaultMultiSelectInputProps;

export { MultiSelectInput };
