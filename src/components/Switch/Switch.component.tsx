import { isBoolean } from "@ubloimmo/front-util";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { SwitchContainerStyles, SwitchHandleStyles } from "./Switch.styles";
import { Text } from "../Text";

import { FlexLayout } from "@layouts";
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

  const [isActive, setIsActive] = useState(props.active ?? false);

  useEffect(() => {
    if (isBoolean(props.active) && active !== props.active) {
      setIsActive(props.active);
    }
  }, [active, props.active]);

  const propagateOnChange = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (props.disabled) return;
      const newActive = !isActive;

      if (props.onChange) props.onChange(newActive);
      setIsActive(newActive);
    },
    [isActive, props]
  );

  const textColor = useMemo(() => {
    return isActive && !disabled ? "primary-base" : "gray-600";
  }, [isActive, disabled]);

  return (
    <FlexLayout gap="s-2" testId={testId} align="center" overrideTestId>
      <SwitchContainer
        onClick={propagateOnChange}
        {...styleProps}
        disabled={disabled}
        $active={isActive}
        role="checkbox"
        type="button"
        aria-checked={isActive}
        aria-disabled={disabled}
        data-testid={`${testId}-container`}
        data-active={isActive}
        tabIndex={disabled ? -1 : 0}
      >
        <SwitchHandle
          {...styleProps}
          $active={isActive}
          aria-checked={isActive}
          aria-disabled={disabled}
          data-testid={`${testId}-handle`}
          data-active={isActive}
        />
      </SwitchContainer>

      <Text weight="bold" color={textColor} uppercase>
        {isActive ? "oui" : "non"}
      </Text>
    </FlexLayout>
  );
};
Switch.defaultProps = defaultSwitchProps;

export { Switch };

const SwitchContainer = styled.button<SwitchStyleProps>`
  ${SwitchContainerStyles}
`;

const SwitchHandle = styled.div<SwitchStyleProps>`
  ${SwitchHandleStyles}
`;
