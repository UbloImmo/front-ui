import styled from "styled-components";

import { SelectInputOption } from "./SelectInputOption.component";
import { SelectInputOptionGroup } from "./SelectInputOptionGroup.component";
import { selectOptionContainerStyles } from "../SelectInput.styles";
import { isSelectOptionGroup } from "../SelectInput.utils";

import { InputAssistiveText } from "@/components/InputAssistiveText";

import type { SelectOption, SelectOptionOrGroup } from "../SelectInput.types";
import type { TestIdProps } from "@types";
import type { NullishPrimitives } from "@ubloimmo/front-util";

/**
 * Props for the SelectInputPopover component
 */
export interface SelectInputOptionsListProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> extends TestIdProps {
  /**
   * Whether the options list is open
   */
  open: boolean;
  /**
   * Array of options or option groups to display
   */
  displayOptions: SelectOptionOrGroup<TValue, TExtraData>[];
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
}

/**
 * A Popover wrapper for SelectInput options that handles positioning and collision detection
 *
 * @version 0.0.1
 *
 * @template TValue - The option value type
 * @template TExtraData - The extra data type for option groups
 * @param {SelectInputOptionsListProps<TValue, TExtraData>} props - The popover props
 * @returns {JSX.Element}
 */
const SelectInputOptionsList = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>({
  open,
  displayOptions,
  onSelectOption,
  Option,
  createOptionProps,
  isEmptyResult,
  assistiveText,
  testId,
}: SelectInputOptionsListProps<TValue, TExtraData>): JSX.Element => {
  return (
    <SelectOptionsContainer
      role="listbox"
      data-testid={`${testId}-options`}
      aria-haspopup="listbox"
      aria-expanded={open}
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
  );
};

export { SelectInputOptionsList };

const SelectOptionsContainer = styled.div`
  ${selectOptionContainerStyles}
`;

const AssistiveTextWrapper = styled.div`
  padding: var(--s-2);
`;
