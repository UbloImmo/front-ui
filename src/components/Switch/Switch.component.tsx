import { isBoolean } from "@ubloimmo/front-util";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { SwitchContainerStyles, SwitchHandleStyles } from "./Switch.styles";
import { Text } from "../Text";

import { FlexLayout } from "@/layouts/Flex";
import {
  useTestId,
  useMergedProps,
  useStyleProps,
  useStatic,
  useUikitTranslation,
} from "@utils";

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
  withHelper: false,
  activeHelperText: null,
  inactiveHelperText: null,
};

/**
 * A toggable component to use when we want the user to enable or disable an option or a feature
 *
 * @version 0.0.4
 *
 * @param {SwitchProps & TestIdProps} props - Switch component props
 * @returns {JSX.Element}
 */
const Switch = (props: SwitchProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultSwitchProps, props);
  const { disabled, active, withHelper } = mergedProps;
  const styleProps = useStyleProps(mergedProps);
  const testId = useTestId("switch", props);

  const [isActive, setIsActive] = useState(active ?? false);

  useEffect(() => {
    if (isBoolean(active) && active !== isActive) setIsActive(active);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

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

  const tl = useUikitTranslation();

  const activeHelperText = useStatic(
    () => mergedProps.activeHelperText ?? tl.global.yes().toUpperCase()
  );

  const inactiveHelperText = useStatic(
    () => mergedProps.inactiveHelperText ?? tl.global.no().toUpperCase()
  );

  const helperText = useMemo(
    () => (isActive ? activeHelperText : inactiveHelperText),
    [activeHelperText, inactiveHelperText, isActive]
  );

  const textColor = useMemo(() => {
    return isActive && !disabled ? "primary-base" : "gray-600";
  }, [isActive, disabled]);

  return (
    <FlexLayout testId={testId} gap="s-2" align="center" overrideTestId>
      <SwitchContainer
        onClick={propagateOnChange}
        disabled={disabled}
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

      {withHelper && (
        <Text weight="bold" color={textColor} uppercase>
          {helperText}
        </Text>
      )}
    </FlexLayout>
  );
};
Switch.defaultProps = defaultSwitchProps;

export { Switch };

const SwitchContainer = styled.button`
  ${SwitchContainerStyles}
`;

const SwitchHandle = styled.div<SwitchStyleProps>`
  ${SwitchHandleStyles}
`;
