import { VoidFn } from "@ubloimmo/front-util";

import { IconName } from "@/components/Icon/Icon.types";
import { StyleProps } from "@types";

export type IconPickerItemProps = {
  name: IconName;
  disabled?: boolean;
  active?: boolean;
  onClick?: VoidFn;
};

export type IconPickerItemDefaultProps = Required<IconPickerItemProps>;

export type IconPickerItemStyleProps = StyleProps<IconPickerItemProps>;

export type IconPickerItemStylePropsStyleProps = Pick<
  IconPickerItemStyleProps,
  "$active"
>;
