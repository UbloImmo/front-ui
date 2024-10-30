import { useMemo } from "react";

import { Checkbox, type CheckboxStatus } from "../Checkbox";
import { StaticIcon } from "../StaticIcon";
import { Switch } from "../Switch";
import { Text } from "../Text";
import { Tooltip } from "../Tooltip";

import {
  FlexColumnLayout,
  FlexLayout,
  FlexRowLayout,
  type FlexAlignment,
  type FlexDirection,
} from "@layouts";
import { useTestId, useMergedProps } from "@utils";

import type {
  FeatureSwitchProps,
  FeatureSwitchDefaultProps,
} from "./FeatureSwitch.types";
import type { ColorKey, TestIdProps } from "@types";
import type { NullishPrimitives } from "@ubloimmo/front-util";

const defaultFeatureSwitchProps: FeatureSwitchDefaultProps<NullishPrimitives> =
  {
    icon: "Square",
    name: "[Feature]",
    description: "[Feature description]",
    compact: false,
    disabled: false,
    tooltipText: null,
    variant: "switch",
    active: false,
    onChange: () => {},
  };

/**
 * FeatureSwitch component
 *
 * TODO description
 *
 * @version 0.0.1
 *
 * @param {FeatureSwitchProps & TestIdProps} props - FeatureSwitch component props
 * @returns {JSX.Element}
 */
const FeatureSwitch = (
  props: FeatureSwitchProps & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultFeatureSwitchProps, props);
  const {
    icon,
    name,
    description,
    tooltipText,
    compact,
    disabled,
    onChange,
    active,
    variant,
  } = mergedProps;
  const testId = useTestId("feature-switch", props);

  const isCompactLayout = useMemo(() => {
    const compactDirection = compact ? "row" : ("column" as FlexDirection);
    const compactAlign = compact ? "center" : ("start" as FlexAlignment);
    return { direction: compactDirection, align: compactAlign };
  }, [compact]);

  const disabledStaticIconColor = useMemo<ColorKey>(() => {
    return disabled ? "gray" : "primary";
  }, [disabled]);

  return (
    <FlexRowLayout
      data-testid={testId}
      align="center"
      justify="space-between"
      gap="s-2"
      fill
    >
      <FlexLayout gap="s-2" justify="start" {...isCompactLayout}>
        <StaticIcon name={icon} color={disabledStaticIconColor} />
        <FlexColumnLayout>
          <Text weight="medium" size="m">
            {name}
          </Text>
          <Text color="gray-600" size="s">
            {description}
          </Text>
        </FlexColumnLayout>
      </FlexLayout>
      <FlexRowLayout align="center" gap="s-2">
        {tooltipText && <Tooltip content={tooltipText} />}
        {variant === "switch" && (
          <Switch
            withHelper
            inactiveHelperText="Désactivé"
            activeHelperText="Activé"
            active={active}
            disabled={disabled}
            onChange={onChange}
          />
        )}
        {variant === "checkbox" && (
          <Checkbox
            active={active}
            disabled={disabled}
            onChange={(status: CheckboxStatus) => onChange?.(Boolean(status))}
          />
        )}
        {/* {variant === "select" && <SelectInput disabled={disabled} />} */}
      </FlexRowLayout>
    </FlexRowLayout>
  );
};
FeatureSwitch.defaultProps = defaultFeatureSwitchProps;

export { FeatureSwitch };
