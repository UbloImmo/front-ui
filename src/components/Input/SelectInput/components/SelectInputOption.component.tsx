import styled from "styled-components";

import { useInputValue } from "../../Input.utils";
import { SelectOption } from "../SelectInput.types";

import { Icon } from "@/components/Icon";

import type { NullishPrimitives } from "@ubloimmo/front-util";
import { Text } from "@/components/Text";
import { useMemo } from "react";

const SelectInputOption = <TValue extends NullishPrimitives>(
  props: SelectOption<TValue>
): JSX.Element => {
  const inputValue = useInputValue(props.value);

  const textColor = useMemo(() => {
    return props.disabled ? "gray-500" : "gray-800";
  }, []);

  return (
    <>
      <SelectOptionItem
        value={inputValue}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        <Text color={textColor}>{props.label}</Text>
        <Icon name="Check" color="gray-800" size="s-4" />
      </SelectOptionItem>
    </>
  );
};

export { SelectInputOption };

const SelectOptionItem = styled.div`
  padding: var(--s-2);
  transition: color 150ms ease-in-out, background-color 300ms ease-in-out 100ms;
  font-weight: var(--text-weight-medium);
  border-top: 1px solid var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:disabled {
    color: var(--gray-500);
    background-color: var(--gray-50);
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    color: var(--primary-base);
    background-color: var(--primary-light);
  }
`;
