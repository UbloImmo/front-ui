import styled from "styled-components";

import { IconPickerItemStyles } from "./IconPickerItem.styles";
import {
  IconPickerItemDefaultProps,
  IconPickerItemStylePropsStyleProps,
} from "./IconPickerItem.types";

import { Icon } from "@/components/Icon/Icon.component";
import { useStyleProps } from "@utils";

export const IconPickerItem = (
  props: IconPickerItemDefaultProps
): JSX.Element => {
  const styleProps = useStyleProps(props);

  return (
    <IconPickerItemButton
      type="button"
      data-testid="icon-picker-item"
      disabled={props.disabled}
      onClick={props.onClick}
      {...styleProps}
    >
      <Icon name={props.name} size="s-4" />
    </IconPickerItemButton>
  );
};

const IconPickerItemButton = styled.button<IconPickerItemStylePropsStyleProps>`
  ${IconPickerItemStyles}
`;
