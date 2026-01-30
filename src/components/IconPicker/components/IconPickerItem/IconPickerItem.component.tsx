import { useMemo } from "react";

import { useIconPickerItemStyles } from "./IconPickerItem.styles";
import {
  IconPickerItemDefaultProps,
  IconPickerItemProps,
} from "./IconPickerItem.types";

import { Icon } from "@/components/Icon/Icon.component";
import { TestIdProps } from "@types";
import { useMergedProps, useTestId } from "@utils";

const defaultIconPickerItemProps: IconPickerItemDefaultProps = {
  name: "Circle",
  disabled: false,
  active: false,
  onClick: () => {},
  readonly: false,
};

/**
 * Renders a single icon and its selection state in the context of an IconPicker.
 *
 * Propagates click event to parent.
 *
 * @version 0.1.0
 *
 * @param {IconPickerItemProps & TestIdProps} props - Component property
 * @returns Rendered property
 */
export const IconPickerItem = (
  props: IconPickerItemProps & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultIconPickerItemProps, props);

  const { disabled, active } = mergedProps;

  const testId = useTestId("icon-picker-item", props);
  const { className } = useIconPickerItemStyles(mergedProps);

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
    <button
      className={className}
      type="button"
      data-testid={testId}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <Icon name={props.name} size="s-4" color={iconColor} />
    </button>
  );
};
