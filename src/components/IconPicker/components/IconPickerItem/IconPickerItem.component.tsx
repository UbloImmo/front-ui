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

  const testId = useTestId("icon-picker-item", props);

  return (
    <IconPickerItemButton
      type="button"
      data-testid={testId}
      disabled={props.disabled}
      onClick={props.onClick}
      {...styleProps}
    >
      <Icon name={props.name} size="s-4" />
    </IconPickerItemButton>
  );
};

const IconPickerItemButton = styled.button<IconPickerItemStyleProps>`
  ${IconPickerItemStyles}
`;
