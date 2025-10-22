import { type ReactNode, useMemo } from "react";
import styled from "styled-components";

import { SelectInputOption } from "./SelectInputOption.component";
import { SelectInputOptionGroup } from "./SelectInputOptionGroup.component";
import { selectOptionContainerStyles } from "../SelectInput.styles";
import { isSelectOptionGroup } from "../SelectInput.utils";

import { InputAssistiveText } from "@/components/InputAssistiveText";
import { Popover } from "@/layouts/Popover";
import { useTestId } from "@utils";

import type {
  SelectInputOptionsContainerStyleProps,
  SelectOption,
  SelectOptionGroup,
} from "../SelectInput.types";
import type { TestIdProps } from "@types";
import type { NullishPrimitives } from "@ubloimmo/front-util";

/**
 * Props for the SelectInputPopover component
 */
export interface SelectInputPopoverProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> extends TestIdProps {
  /**
   * Whether the popover is open
   */
  open: boolean;
  /**
   * Callback when the popover open state changes
   */
  onOpenChange: (open: boolean) => void;
  /**
   * The trigger element for the popover
   */
  children: ReactNode;
  /**
   * Array of options or option groups to display
   */
  displayOptions: (
    | SelectOption<TValue, TExtraData>
    | SelectOptionGroup<TValue, TExtraData>
  )[];
  /**
   * Function to handle option selection
   */
  onSelectOption: (option: SelectOption<TValue>) => () => void;
  /**
   * Custom option component
   */
  Option?: React.FunctionComponent<SelectOption<TValue, TExtraData>>;
  /**
   * Props for creating a new option
   */
  createOptionProps?: SelectOption<TValue> | null;
  /**
   * Whether there are no results to display
   */
  isEmptyResult: boolean;
  /**
   * Assistive text to show when there are no results
   */
  assistiveText: string;
  /**
   * Whether the options should be shifted (for collision detection)
   */
  isShifted?: boolean;
  /**
   * Whether to fit the popover width to the trigger width
   */
  fitTriggerWidth?: boolean;
  /**
   * Whether the popover trigger should take all available width
   */
  fill?: boolean;
  /**
   * Whether to allow the popover to grow wider than the trigger if content requires it
   */
  allowContentWidthOverride?: boolean;
}

/**
 * A Popover wrapper for SelectInput options that handles positioning and collision detection
 *
 * @version 0.0.1
 *
 * @template TValue - The option value type
 * @template TExtraData - The extra data type for option groups
 * @param {SelectInputPopoverProps<TValue, TExtraData>} props - The popover props
 * @returns {JSX.Element}
 */
const SelectInputPopover = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>({
  open,
  onOpenChange,
  children,
  displayOptions,
  onSelectOption,
  Option,
  createOptionProps,
  isEmptyResult,
  assistiveText,
  isShifted = false,
  fitTriggerWidth = true,
  fill = false,
  allowContentWidthOverride = false,
  testId,
  ...props
}: SelectInputPopoverProps<TValue, TExtraData>): JSX.Element => {
  const popoverTestId = useTestId("input-select-popover", { testId });

  const content = useMemo(
    () => (
      <SelectOptionsContainer
        role="listbox"
        data-testid={`${testId}-options`}
        aria-haspopup="listbox"
        aria-expanded={open}
        $reverse={isShifted}
      >
        {displayOptions.map((optionOrGroup, index) => {
          if (isSelectOptionGroup<TValue, TExtraData>(optionOrGroup)) {
            return (
              <SelectInputOptionGroup
                {...optionOrGroup}
                onSelectOption={onSelectOption}
                key={`${optionOrGroup.label}-${index}`}
                Option={Option}
              />
            );
          }
          return (
            <SelectInputOption
              key={`${optionOrGroup.value}-${index}`}
              onSelect={onSelectOption(optionOrGroup)}
              Option={Option}
              {...optionOrGroup}
            />
          );
        })}
        {createOptionProps && (
          <SelectInputOption
            {...createOptionProps}
            testId={`${testId}-create-button`}
            overrideTestId
          />
        )}
        {isEmptyResult && (
          <AssistiveTextWrapper>
            <InputAssistiveText assistiveText={assistiveText} />
          </AssistiveTextWrapper>
        )}
      </SelectOptionsContainer>
    ),
    [
      displayOptions,
      onSelectOption,
      Option,
      createOptionProps,
      isEmptyResult,
      assistiveText,
      isShifted,
      open,
      testId,
    ]
  );

  return (
    <Popover
      open={open}
      onOpenChange={onOpenChange}
      content={content}
      side={isShifted ? "top" : "bottom"}
      align="start"
      sideOffset="s-1"
      collisionPadding="s-2"
      sticky="always"
      fitTriggerWidth={fitTriggerWidth}
      fill={fill}
      allowContentWidthOverride={allowContentWidthOverride}
      testId={popoverTestId}
      overrideTestId
      {...props}
    >
      {children}
    </Popover>
  );
};

export { SelectInputPopover };

const SelectOptionsContainer = styled.div<SelectInputOptionsContainerStyleProps>`
  ${selectOptionContainerStyles}
`;

const AssistiveTextWrapper = styled.div`
  padding: var(--s-2);
`;
