import { useMemo } from "react";
import styled from "styled-components";

import { Checkbox, type CheckboxStatus } from "../Checkbox";
import { SelectInput } from "../Input";
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
import { useTestId, useMergedProps, useUikitTranslation } from "@utils";

import type {
  FeatureSwitchProps,
  FeatureSwitchDefaultProps,
  FeatureSwitchVariant,
} from "./FeatureSwitch.types";
import type { ColorKey, TestIdProps } from "@types";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";

const defaultFeatureSwitchProps: FeatureSwitchDefaultProps<NullishPrimitives> =
  {
    icon: null,
    name: "[Feature]",
    description: null,
    compact: false,
    disabled: false,
    tooltipText: null,
    variant: "switch",
    active: false,
    onChange: () => {},
  };

/**
 *
 * Provides informations about a feature and user can enable or disable it.
 *
 * @version 0.0.1
 *
 * @param {FeatureSwitchProps & TestIdProps} props - FeatureSwitch component props
 * @returns {JSX.Element}
 */
const FeatureSwitch = <TValue extends NullishPrimitives>(
  props: FeatureSwitchProps<TValue> & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(
    defaultFeatureSwitchProps,
    props as unknown as typeof defaultFeatureSwitchProps
  );
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
    ...selectProps
  } = mergedProps;
  const testId = useTestId<FeatureSwitchProps<TValue>>("feature-switch", props);

  const tl = useUikitTranslation();

  const isCompactLayout = useMemo(() => {
    const compactDirection = compact ? "row" : ("column" as FlexDirection);
    const compactAlign = compact ? "center" : ("start" as FlexAlignment);
    return { direction: compactDirection, align: compactAlign };
  }, [compact]);

  const disabledStaticIconColor = useMemo<ColorKey>(() => {
    return disabled ? "gray" : "primary";
  }, [disabled]);

  const FeatureSwitchVariant = useMemo<Nullable<JSX.Element>>(() => {
    if (variant === ("select" as FeatureSwitchVariant)) {
      return <SelectInput disabled={disabled} {...selectProps} />;
    }
    if (variant === "checkbox") {
      return (
        <Checkbox
          active={active}
          disabled={disabled}
          onChange={(status: CheckboxStatus) => onChange?.(Boolean(status))}
        />
      );
    }
    if (variant === "switch") {
      return (
        <SwitchContainer>
          <Switch
            withHelper
            inactiveHelperText={tl.status.inactive()}
            activeHelperText={tl.status.active()}
            active={active}
            disabled={disabled}
            onChange={onChange}
          />
        </SwitchContainer>
      );
    }
    return null;
  }, [variant, disabled, active, onChange, selectProps, tl]);

  return (
    <FlexRowLayout
      data-testid={testId}
      align="center"
      justify="space-between"
      gap="s-10"
      fill
    >
      <FlexLayout gap="s-2" justify="start" {...isCompactLayout}>
        {icon && <StaticIcon name={icon} color={disabledStaticIconColor} />}
        <FlexColumnLayout>
          <Text weight="medium" size="m">
            {name}
          </Text>
          {description && (
            <Text color="gray-600" size="s">
              {description}
            </Text>
          )}
        </FlexColumnLayout>
      </FlexLayout>
      <FlexRowLayout align="center" gap="s-2">
        {tooltipText && <Tooltip content={tooltipText} />}
        {FeatureSwitchVariant}
      </FlexRowLayout>
    </FlexRowLayout>
  );
};
FeatureSwitch.defaultProps = defaultFeatureSwitchProps;

export { FeatureSwitch };

const SwitchContainer = styled.div`
  min-width: 8.25rem;
`;
