import { NullishPrimitives } from "@ubloimmo/front-util";
import styled from "styled-components";

import { SelectInputOption } from "./SelectInputOption.component";
import { groupOptionLabelStyles } from "../SelectInput.styles";
import { SelectInputOptionGroupProps } from "../SelectInput.types";

import { Text } from "@components";

/**
 * Renders a single select option group and its nested options
 * @template {NullishPrimitives} TValue - The option's value
 * @param {SelectInputOptionGroupProps<TValue>} props - The option group to render and its `onSelect` callback
 * @returns JSX.Element
 */
export const SelectInputOptionGroup = <TValue extends NullishPrimitives>(
  props: SelectInputOptionGroupProps<TValue>
): JSX.Element => {
  return (
    <>
      <GroupOptionLabel tabIndex={-1}>
        <Text color="gray-600" weight="bold" size="s" uppercase>
          {props.label}
        </Text>
      </GroupOptionLabel>
      {props.options.map((option, index) => (
        <SelectInputOption
          key={`${option.label}-${index}`}
          onSelect={props.onSelectOption(option)}
          {...option}
        />
      ))}
    </>
  );
};

const GroupOptionLabel = styled.div`
  ${groupOptionLabelStyles}
`;
