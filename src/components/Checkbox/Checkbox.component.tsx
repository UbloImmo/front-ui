import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import {
  buildActiveIconContainerStyles,
  buildCheckboxContainerStyles,
} from "./Checkbox.styles";
import { Icon } from "../Icon";

import { StyleProps, type TestIdProps } from "@types";
import { useTestId, useMergedProps, useStyleProps } from "@utils";

import type {
  CheckboxProps,
  CheckboxDefaultProps,
  CheckboxStatus,
} from "./Checkbox.types";

const defaultCheckboxProps: CheckboxDefaultProps = {
  active: false,
  disabled: false,
  onChange: null,
};

/**
 * A simple checkbox that let users select multiple options from a set of items, or mark one individual item as selected
 *
 * @version 0.0.2
 *
 * @param {CheckboxProps & TestIdProps} props - Checkbox component props
 * @returns {JSX.Element}
 */
const Checkbox = (props: CheckboxProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultCheckboxProps, props);
  const { disabled, onChange } = mergedProps;
  const styleProps = useStyleProps(mergedProps);
  const testId = useTestId("checkbox", props);

  const [isActive, setIsActive] = useState<CheckboxStatus>(
    mergedProps.active ?? false
  );

  useEffect(() => {
    if (mergedProps.active !== isActive) {
      setIsActive(mergedProps.active ?? false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.active]);

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
      if (disabled) return;

      const newActive = !isActive;

      if (onChange) onChange(newActive);
      setIsActive(newActive);
    },
    [isActive, disabled, onChange]
  );

  return (
    <CheckboxContainer
      data-testid={testId}
      onClick={propagateOnChange}
      aria-checked={isActive}
      aria-disabled={disabled}
    >
      <ActiveIconContainer {...styleProps} $active={isActive}>
        <Icon name="CheckSquareFill" color={iconColor} />
        <Icon name="DashSquareFill" color={iconColor} />
      </ActiveIconContainer>

      <input
        type="checkbox"
        data-testid={`${testId}-input`}
        aria-checked={isActive}
        aria-disabled={disabled}
        checked={!!isActive}
        disabled={disabled}
        onChange={() => {}}
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
