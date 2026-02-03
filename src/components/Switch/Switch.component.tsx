import { isBoolean } from "@ubloimmo/front-util";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";

import { useSwitchClassNames } from "./Switch.styles";
import { Text } from "../Text";

import { FlexLayout } from "@/layouts/Flex";
import {
  useTestId,
  useMergedProps,
  useStatic,
  useUikitTranslation,
} from "@utils";

import type { SwitchProps, SwitchDefaultProps } from "./Switch.types";
import type { TestIdProps } from "@types";

const defaultSwitchProps: SwitchDefaultProps = {
  disabled: false,
  active: false,
  onChange: null,
  withHelper: false,
  activeHelperText: null,
  inactiveHelperText: null,
  helperPosition: "start",
};

/**
 * A toggable component to use when we want the user to enable or disable an option or a feature
 *
 * @version 0.1.0
 *
 * @param {SwitchProps & TestIdProps} props - Switch component props
 * @returns {JSX.Element}
 */
const Switch = (props: SwitchProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultSwitchProps, props);
  const { disabled, active, withHelper, helperPosition } = mergedProps;
  const classNames = useSwitchClassNames();
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

  const Helper = useCallback(() => {
    if (!withHelper || !helperText) return null;
    return (
      <Text weight="bold" color={textColor} uppercase>
        {helperText}
      </Text>
    );
  }, [withHelper, helperText, textColor]);

  return (
    <FlexLayout testId={testId} gap="s-2" align="center" overrideTestId>
      {helperPosition === "start" && <Helper />}
      <button
        className={classNames.container}
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
        <div
          className={classNames.handle}
          aria-checked={isActive}
          aria-disabled={disabled}
          data-testid={`${testId}-handle`}
          data-active={isActive}
        />
      </button>
      {helperPosition === "end" && <Helper />}
    </FlexLayout>
  );
};
Switch.defaultProps = defaultSwitchProps;

export { Switch };
