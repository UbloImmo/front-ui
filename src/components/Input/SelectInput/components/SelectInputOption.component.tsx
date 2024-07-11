import { useMemo } from "react";
import styled from "styled-components";

import { useInputValue } from "../../Input.utils";
import { buildSelectOptionItemStyles } from "../SelectInput.styles";
import { SelectOption, SelectOptionItemStyleProps } from "../SelectInput.types";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useStyleProps } from "@utils";

import type { NullishPrimitives } from "@ubloimmo/front-util";

const SelectInputOption = <TValue extends NullishPrimitives>(
  props: SelectOption<TValue>
): JSX.Element => {
  const inputValue = useInputValue(props.label);

  const styleProps = useStyleProps(props);

  const textColor = useMemo(() => {
    return props.disabled ? "gray-500" : "gray-800";
  }, [props.disabled]);

  return (
    <SelectOptionItem
      role="option"
      onClick={props.onSelect ?? undefined}
      {...styleProps}
    >
      <Text color={textColor} size="m">
        {inputValue}
      </Text>
      {props.active && <Icon name="Check" color="gray-800" size="s-4" />}
    </SelectOptionItem>
  );
};

export { SelectInputOption };

const SelectOptionItem = styled.div<SelectOptionItemStyleProps>`
  ${buildSelectOptionItemStyles}
`;
