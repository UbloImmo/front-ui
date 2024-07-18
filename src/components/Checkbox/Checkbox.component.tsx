import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import {
  buildActiveIconContainerStyles,
  buildCheckboxContainerStyles,
} from "./Checkbox.styles";
import { Icon } from "../Icon";

import { StyleProps, type TestIdProps } from "@types";
import { useLogger, useTestId, useMergedProps, useStyleProps } from "@utils";

import type {
  CheckboxProps,
  CheckboxDefaultProps,
  CheckboxStatus,
} from "./Checkbox.types";

const defaultCheckboxProps: CheckboxDefaultProps = {
  active: false,
  disabled: false,
  onChange: () => {},
};

/**
 * A checkbox component for multiple choices.
 *
 * @version 0.0.1
 *
 * @param {CheckboxProps & TestIdProps} props - Checkbox component props
 * @returns {JSX.Element}
 */
const Checkbox = (props: CheckboxProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultCheckboxProps, props);
  const { active, disabled } = mergedProps;
  const styleProps = useStyleProps(mergedProps);
  const testId = useTestId("checkbox", props);

  const [isActive, setIsActive] = useState(props.active ?? false);

  useEffect(() => {
    if (active !== undefined && active !== props.active) {
      setIsActive(props.active as CheckboxStatus);
    }
  }, [active, props.active]);

  const iconColor = useMemo(() => {
    return disabled
      ? isActive
        ? "gray-500"
        : "gray-400"
      : isActive
      ? "primary-base"
      : "gray-800";
  }, [disabled, isActive]);

  const propagateOnChange = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (props.disabled) return;
      const newActive = !isActive;

      if (props.onChange) props.onChange(newActive);
      setIsActive(newActive);
    },
    [isActive, props]
  );

  return (
    <CheckboxContainer data-testid={testId} onClick={propagateOnChange}>
      {isActive && (
        <ActiveIconContainer {...styleProps} $active={isActive}>
          <Icon name="CheckSquareFill" color={iconColor} />
          <Icon name="DashSquareFill" color={iconColor} />
        </ActiveIconContainer>
      )}

      <input
        type="checkbox"
        aria-checked={active}
        aria-disabled={disabled}
        checked={active === true || active === "mixed"}
        disabled={disabled}
      />
      <Icon name="Square" color={iconColor} />
    </CheckboxContainer>
  );
};
Checkbox.defaultProps = defaultCheckboxProps;

export { Checkbox };

const CheckboxContainer = styled.div`
  ${buildCheckboxContainerStyles}
`;

const ActiveIconContainer = styled.div<StyleProps<CheckboxDefaultProps>>`
  ${buildActiveIconContainerStyles}
`;
