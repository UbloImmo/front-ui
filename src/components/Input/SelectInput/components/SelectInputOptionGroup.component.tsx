import { NullishPrimitives } from "@ubloimmo/front-util";
import styled from "styled-components";

import { SelectInputOption } from "./SelectInputOption.component";
import { groupOptionLabelStyles } from "../SelectInput.styles";
import { SelectInputOptionGroupProps } from "../SelectInput.types";

import { Text } from "@/components/Text";

/**
 * Renders a single select option group and its nested options
 * @template {NullishPrimitives} TValue - The option's value
 * @param {SelectInputOptionGroupProps<TValue>} props - The option group to render and its `onSelect` callback
 * @returns JSX.Element
 */
export const SelectInputOptionGroup = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>({
  label,
  options,
  onSelectOption,
  Option,
}: SelectInputOptionGroupProps<TValue, TExtraData>): JSX.Element => {
  return (
    <>
      <GroupOptionLabel
        tabIndex={-1}
        data-testid="input-select-option-group-label"
      >
        <Text color="gray-600" weight="bold" size="s" uppercase>
          {label}
        </Text>
      </GroupOptionLabel>
      {options.map((option, index) => (
        <SelectInputOption
          key={`${option.label}-${index}`}
          onSelect={onSelectOption(option)}
          Option={Option}
          {...option}
        />
      ))}
    </>
  );
};

const GroupOptionLabel = styled.div`
  ${groupOptionLabelStyles}
`;
