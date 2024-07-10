import { useMemo, useState } from "react";
import styled from "styled-components";

import {
  SwitchContainer,
  SwitchToggleStyles,
  SwitchToggleCheckboxStyles,
} from "./Switch.styles";
import { Text } from "../Text";

import { useTestId, useMergedProps, useStyleProps } from "@utils";

import type {
  SwitchProps,
  SwitchDefaultProps,
  SwitchStyleProps,
} from "./Switch.types";
import type { TestIdProps } from "@types";

const defaultSwitchProps: SwitchDefaultProps = {
  disabled: false,
  active: false,
  onChange: null,
};

/**
 * A toggable component to use when we want the user to enable or disable an option or a feature
 *
 * @version 0.0.1
 *
 * @param {SwitchProps & TestIdProps} props - Switch component props
 * @returns {JSX.Element}
 */
const Switch = (props: SwitchProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultSwitchProps, props);
  const { disabled, active } = mergedProps;
  const styleProps = useStyleProps(mergedProps);
  const testId = useTestId("switch", props);

  const [isActive, setIsActive] = useState(active);

  const toggleSwitch = () => {
    if (disabled) return;
    setIsActive(!isActive);

    if (mergedProps.onChange) mergedProps.onChange();
  };

  const textColor = useMemo(() => {
    return isActive && !disabled ? "primary-base" : "gray-600";
  }, [isActive, disabled]);

  return (
    <SwitchContainer data-testid={testId}>
      <SwitchToggle
        onClick={toggleSwitch}
        onChange={mergedProps.onChange ?? undefined}
        {...styleProps}
        $disabled={disabled}
        $active={isActive}
        role="checkbox"
        aria-checked={isActive}
        aria-disabled={disabled}
        data-testid={`${testId}-toggle`}
      >
        <SwitchToggleCheckbox
          {...styleProps}
          $active={isActive}
          aria-checked={isActive}
          aria-disabled={disabled}
        />
      </SwitchToggle>

      <Text weight="bold" color={textColor} uppercase>
        {isActive ? "oui" : "non"}
      </Text>
    </SwitchContainer>
  );
};
Switch.defaultProps = defaultSwitchProps;

export { Switch };

const SwitchToggleCheckbox = styled.div<SwitchStyleProps>`
  ${SwitchToggleCheckboxStyles}
`;

const SwitchToggle = styled.div<SwitchStyleProps>`
  ${SwitchToggleStyles}
`;
