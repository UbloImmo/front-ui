import { SelectInputOption } from "./SelectInputOption.component";
import { SelectInputOptionGroup } from "./SelectInputOptionGroup.component";
import { useSelectInputOptionListClassNames } from "../SelectInput.styles";
import { isSelectOptionGroup } from "../SelectInput.utils";

import { InputAssistiveText } from "@/components/InputAssistiveText";

import type { SelectInputOptionsListProps } from "../SelectInput.types";
import type { NullishPrimitives } from "@ubloimmo/front-util";

/**
 * A Popover wrapper for SelectInput options that handles positioning and collision detection
 *
 * @version 0.1.0
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
  const classNames = useSelectInputOptionListClassNames();
  return (
    <div
      className={classNames.list}
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
        <div className={classNames.assistive}>
          <InputAssistiveText assistiveText={assistiveText} />
        </div>
      )}
    </div>
  );
};

export { SelectInputOptionsList };
