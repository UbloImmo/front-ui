import { useMemo } from "react";
import styled from "styled-components";

import { IconPickerItemStyles } from "./IconPickerItem.styles";
import {
  IconPickerItemProps,
  IconPickerItemStyleProps,
} from "./IconPickerItem.types";

import { Icon } from "@/components/Icon/Icon.component";
import { TestIdProps } from "@types";
import { useStyleProps, useTestId } from "@utils";

export const IconPickerItem = (
  props: IconPickerItemProps & TestIdProps
): JSX.Element => {
  const styleProps = useStyleProps(props);

  const { disabled, active } = props;

  const testId = useTestId("icon-picker-item", props);

  const iconColor = useMemo(() => {
    return active
      ? disabled
        ? "primary-dark"
        : "primary-base"
      : disabled
      ? "gray-400"
      : "gray-700";
  }, [active, disabled]);

  return (
    <IconPickerItemButton
      type="button"
      data-testid={testId}
      disabled={props.disabled}
      onClick={props.onClick}
      {...styleProps}
    >
      <Icon name={props.name} size="s-4" color={iconColor} />
    </IconPickerItemButton>
  );
};

const IconPickerItemButton = styled.button<IconPickerItemStyleProps>`
  ${IconPickerItemStyles}
`;
