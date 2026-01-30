import {
  NullishPrimitives,
  isBoolean,
  isFunction,
  isNullish,
  isString,
} from "@ubloimmo/front-util";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SelectInputPopover } from "./components/SelectInputPopover.component";
import {
  useSelectInputButtonClassName,
  useSelectInputClearButtonClassName,
  useSelectInputContainerClassName,
  useSelectInputSelectedCustomOptionClassName,
  useSelectInputSelectedOptionClassName,
  useSelectInputWrapperClassName,
} from "./SelectInput.styles";
import {
  defaultSelectInputProps,
  isSelectOptionGroup,
  useSelectAutoCompleteQuery,
  useSelectInputKeyboardEvents,
  useSelectOptions,
  useSelectUnknownValueIngestion,
  useSelectValue,
} from "./SelectInput.utils";
import {
  StyledInput,
  StyledInputContainer,
  StyledInputControl,
} from "../Input.common";
import {
  useInputId,
  useInputOnChange,
  useInputRef,
  useInputStyles,
  useInputValue,
} from "../Input.utils";
import { SelectInputOptionsList } from "./components/SelectInputOptionsList.component";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Loading } from "@/components/Loading";
import { Text } from "@/components/Text";
import { FlexColumnLayout } from "@/layouts/Flex";
import {
  isNonEmptyString,
  useHtmlAttribute,
  useLogger,
  useStatic,
  useTestId,
  useUikitTranslation,
} from "@utils";

import type {
  SelectInputAllowCreationFn,
  SelectInputProps,
  SelectOption,
} from "./SelectInput.types";
import type { InputProps } from "../Input.types";
import type { PaletteColor, TestIdProps } from "@types";

/**
 * An input that displays a list of options, and allows the user to select one.
 *
 * @version 0.2.0
 *
 * @param {SelectInputProps & TestIdProps} props - SelectInput component props
 * @returns {JSX.Element}
 */
const SelectInput = <
  TValue extends NullishPrimitives = NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>(
  props: SelectInputProps<TValue, TExtraData> & TestIdProps
): JSX.Element => {
  const logger = useLogger("SelectInput");
  const [isOpen, setIsOpen] = useState(false);
  const { autoCompleteQuery, setAutoCompleteQuery } =
    useSelectAutoCompleteQuery(props?.searchable);
  const {
    options,
    flattenedOptions,
    mergedProps,
    refetchOptions,
    isLoading,
    getCreateButtonProps,
    createOption,
    ingestValue,
    createdOptions,
    loadedOptions,
  } = useSelectOptions<TValue, TExtraData>(props, autoCompleteQuery);

  const {
    displayOptions,
    setInternalValue,
    internalValue,
    clearInternalValue,
    activeOption,
  } = useSelectValue(
    mergedProps,
    options,
    flattenedOptions,
    refetchOptions,
    isOpen,
    autoCompleteQuery,
    setAutoCompleteQuery
  );

  useSelectUnknownValueIngestion(ingestValue, isLoading, internalValue);

  const inputStyles = useInputStyles(mergedProps);

  const { placeholder, disabled, searchable, creatable, clearable } =
    mergedProps;

  const inputId = useInputId(mergedProps);

  const testId = useTestId("input-select", props);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { inputRef, forwardRef } = useInputRef(mergedProps);

  const closeOptions = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setIsOpen(false);
    if (!activeOption && autoCompleteQuery) {
      setAutoCompleteQuery(null);
    }
  }, [inputRef, activeOption, autoCompleteQuery, setAutoCompleteQuery]);
  const openOptions = useCallback(() => {
    setIsOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    if (inputRef.current && searchable && isOpen) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, inputRef.current]);

  const toggleOptionList = useCallback(() => {
    if (isOpen) return closeOptions();
    openOptions();
  }, [closeOptions, openOptions, isOpen]);

  const selectOptionAndClose = useCallback(
    (option: SelectOption<TValue>) => {
      return () => {
        if (disabled || option.disabled) return;
        setInternalValue(option.value);
        closeOptions();
      };
    },
    [disabled, closeOptions, setInternalValue]
  );

  const onQueryChange = useInputOnChange<"text">(
    () => searchable && !disabled,
    (nativeValue) => (isString(nativeValue) ? nativeValue : null),
    setAutoCompleteQuery,
    mergedProps.onChangeNative
  );

  const query = useInputValue<"text">(
    autoCompleteQuery ?? null,
    props as unknown as InputProps<"text">,
    (rawQuery) => {
      if (!isOpen) {
        if (activeOption) return activeOption.label;
        return undefined;
      }
      if (isString(rawQuery)) return rawQuery;
      return undefined;
    }
  );

  const openOptionsOnFocus = useCallback(() => {
    if (disabled || !searchable) return;
    setIsOpen(true);
  }, [disabled, searchable]);

  const onBlur = useHtmlAttribute(mergedProps.onBlur);

  useSelectInputKeyboardEvents(wrapperRef, inputId, closeOptions);

  const OptionComponent = useMemo(
    () => mergedProps.Option ?? null,
    [mergedProps]
  );

  const SelectedOptionComponent = useMemo(
    () => mergedProps.SelectedOption ?? null,
    [mergedProps]
  );

  const valueTextColor = useMemo<PaletteColor>(() => {
    return disabled ? "gray-700" : "gray-800";
  }, [disabled]);

  const valueIconColor = useMemo<PaletteColor>(() => {
    return disabled ? "gray-700" : (activeOption?.iconColor ?? valueTextColor);
  }, [activeOption?.iconColor, disabled, valueTextColor]);

  const isEmptyResult = useMemo(() => {
    return !displayOptions.length;
  }, [displayOptions]);

  const tl = useUikitTranslation();

  const assistiveText = useMemo(() => {
    return isLoading
      ? tl.status.loadingResults()
      : searchable
        ? isString(query) && query.length
          ? tl.status.noResultFor(query)
          : tl.action.typeToSearch()
        : tl.status.noResult();
  }, [isLoading, query, searchable, tl]);

  const clearLabel = useStatic(tl.action.unselect);

  const clearSelectedOption = useCallback(() => {
    if (disabled || !activeOption || !clearable || isOpen) return;
    clearInternalValue();
  }, [activeOption, disabled, isOpen, clearable, clearInternalValue]);

  // const { isShifted } = useSelectInputIntersection(isOpen, wrapperRef);

  const createOptionAndClose = useCallback(
    async (query: string) => {
      if (disabled || !creatable) return;
      const option = await createOption(query);
      if (option) {
        setInternalValue(option.value);
      }
      closeOptions();
    },
    [closeOptions, creatable, createOption, disabled, setInternalValue]
  );

  /**
   * Determines whether to display the create button & what its appearance should be
   */
  const createOptionProps = useMemo(() => {
    if (
      !creatable ||
      disabled ||
      isLoading ||
      !isNonEmptyString(autoCompleteQuery)
    )
      return null;
    let { allowCreation = "not-registered" } = creatable;
    if (isNullish(allowCreation)) {
      allowCreation = "not-registered";
    }
    if (
      isFunction<SelectInputAllowCreationFn<TValue, TExtraData>>(allowCreation)
    ) {
      const result = allowCreation({
        query: autoCompleteQuery,
        isEmpty: isEmptyResult,
        value: internalValue,
        activeOption,
        displayedOptions: displayOptions,
        registeredOptions: flattenedOptions,
        loadedOptions,
        createdOptions,
      });
      allowCreation = isBoolean(result) && result ? "always" : "never";
    }
    if (allowCreation === "never") return null;
    const optionProps = getCreateButtonProps(
      autoCompleteQuery,
      createOptionAndClose
    );
    switch (allowCreation) {
      case "always":
        return optionProps;
      case "empty":
        return isEmptyResult ? optionProps : null;
      case "not-shown": {
        const optionLabels = new Set(
          displayOptions
            .map((option) =>
              isSelectOptionGroup<TValue, TExtraData>(option)
                ? option.options.map(({ label }) => label)
                : [option.label]
            )
            .flat()
        );
        if (optionLabels.has(autoCompleteQuery)) return null;
        return optionProps;
      }
      case "not-registered": {
        const optionLabels = new Set(
          flattenedOptions.map(({ label }) => label)
        );
        if (optionLabels.has(autoCompleteQuery)) return null;
        return optionProps;
      }
      default: {
        logger.warn(
          `Invalid value provided to creatable.allowCreation: ${allowCreation}`,
          "allowCreation"
        );
        return null;
      }
    }
  }, [
    activeOption,
    autoCompleteQuery,
    creatable,
    createOptionAndClose,
    createdOptions,
    disabled,
    displayOptions,
    flattenedOptions,
    getCreateButtonProps,
    internalValue,
    isEmptyResult,
    isLoading,
    loadedOptions,
    logger,
  ]);

  const OptionsList = (
    <SelectInputOptionsList
      open={isOpen}
      displayOptions={displayOptions}
      onSelectOption={selectOptionAndClose}
      Option={OptionComponent ?? undefined}
      createOptionProps={createOptionProps}
      isEmptyResult={isEmptyResult}
      assistiveText={assistiveText}
      testId={testId}
      key="select-input-options-list"
    />
  );

  const wrapper = useSelectInputWrapperClassName(inputStyles);
  const container = useSelectInputContainerClassName(inputStyles);
  const button = useSelectInputButtonClassName(inputStyles);
  const selected = useSelectInputSelectedOptionClassName(inputStyles);
  const selectedCustom =
    useSelectInputSelectedCustomOptionClassName(inputStyles);
  const clearButton = useSelectInputClearButtonClassName();

  return (
    <FlexColumnLayout
      className={wrapper}
      reverse
      ref={wrapperRef}
      testId={`${testId}-wrapper`}
      overrideTestId
    >
      <SelectInputPopover
        open={isOpen}
        onOpenChange={setIsOpen}
        content={OptionsList}
        testId={testId}
        wrapperRef={wrapperRef}
      >
        <StyledInputContainer
          {...inputStyles}
          className={container}
          data-testid={testId}
          aria-expanded={isOpen}
        >
          {mergedProps.searchable && isOpen ? (
            <StyledInput
              {...inputStyles}
              value={query}
              onChange={onQueryChange}
              data-testid={`${testId}-query`}
              placeholder={placeholder}
              disabled={disabled}
              onFocus={openOptionsOnFocus}
              onBlur={onBlur}
              id={inputId}
              ref={forwardRef}
              autoComplete="none"
              aria-expanded={isOpen}
              tabIndex={0}
            />
          ) : (
            <button
              className={button}
              disabled={disabled}
              onClick={toggleOptionList}
              id={inputId}
              data-testid={`${testId}-button`}
              aria-expanded={isOpen}
              type="button"
              tabIndex={0}
            >
              {activeOption ? (
                SelectedOptionComponent ? (
                  <div className={selectedCustom}>
                    <SelectedOptionComponent
                      {...activeOption}
                      disabled={disabled}
                    />
                  </div>
                ) : (
                  <div className={selected}>
                    {activeOption.icon && (
                      <Icon
                        name={activeOption.icon}
                        color={valueIconColor}
                        size="s-3"
                      />
                    )}
                    <Text weight="medium" color={valueTextColor} ellipsis fill>
                      {activeOption.label}
                    </Text>
                  </div>
                )
              ) : (
                <div className={selected}>
                  <Text
                    weight="medium"
                    color="gray-400"
                    testId={`${testId}-placeholder`}
                    aria-placeholder={placeholder}
                    overrideTestId
                    ellipsis
                  >
                    {placeholder}
                  </Text>
                </div>
              )}
            </button>
          )}
          <StyledInputControl
            {...inputStyles}
            data-testid={`${testId}-control`}
            onClick={activeOption ? clearSelectedOption : undefined}
          >
            {isOpen && isLoading ? (
              <Loading animation="BouncingBalls" size="s-4" />
            ) : !isOpen && clearable && activeOption && !disabled ? (
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
        </StyledInputContainer>
      </SelectInputPopover>
    </FlexColumnLayout>
  );
};

SelectInput.defaultProps = defaultSelectInputProps;

export { SelectInput };
