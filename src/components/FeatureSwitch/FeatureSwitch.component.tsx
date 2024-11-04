import { useCallback, useMemo } from "react";
import styled from "styled-components";

import { Checkbox } from "../Checkbox";
import { SelectInput } from "../Input";
import { StaticIcon } from "../StaticIcon";
import { Switch } from "../Switch";
import { Text } from "../Text";
import { Tooltip } from "../Tooltip";
import {
  type FeatureSwitchProps,
  type FeatureSwitchDefaultProps,
  AnyFeatureSwitchVariant,
} from "./FeatureSwitch.types";
import {
  isFeatureSwitchCheckboxVariant,
  isFeatureSwitchOptionVariant,
  isFeatureSwitchSwitchVariant,
} from "./FeatureSwitch.utils";

import {
  FlexColumnLayout,
  FlexLayout,
  FlexRowLayout,
  type FlexAlignment,
  type FlexDirection,
} from "@layouts";
import { useTestId, useMergedProps, useUikitTranslation } from "@utils";

import type { ColorKey, TestIdProps } from "@types";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";

const defaultFeatureSwitchProps: FeatureSwitchDefaultProps = {
  icon: null,
  name: "[Feature]",
  description: null,
  compact: false,
  disabled: false,
  tooltip: null,
  variant: "switch",
};

/**
 *
 * Provides informations about a feature that the user can activate, deactivate or select an option from a list.
 *
 * @version 0.0.1
 *
 * @param {FeatureSwitchProps & TestIdProps} props - FeatureSwitch component props
 * @returns {JSX.Element}
 */
const FeatureSwitch = <TValue extends NullishPrimitives>(
  props: FeatureSwitchProps<TValue> & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultFeatureSwitchProps, props);
  const { icon, name, description, tooltip, compact, disabled, variant } =
    mergedProps;
  const testId = useTestId<TestIdProps>("feature-switch", props);

  const tl = useUikitTranslation();

  const isCompactLayout = useMemo(() => {
    const compactDirection = compact ? "row" : ("column" as FlexDirection);
    const compactAlign = compact ? "center" : ("start" as FlexAlignment);
    return { direction: compactDirection, align: compactAlign };
  }, [compact]);

  const disabledStaticIconColor = useMemo<ColorKey>(() => {
    return disabled ? "gray" : "primary";
  }, [disabled]);

  const propsWithVariant = useMemo<AnyFeatureSwitchVariant<TValue>>(() => {
    return { ...props, variant } as AnyFeatureSwitchVariant<TValue>;
  }, [props, variant]);

  const FeatureSwitchVariant = useCallback((): Nullable<JSX.Element> => {
    if (isFeatureSwitchOptionVariant(propsWithVariant)) {
      return <SelectInput {...propsWithVariant} />;
    }
    if (isFeatureSwitchCheckboxVariant(propsWithVariant)) {
      return <Checkbox {...propsWithVariant} />;
    }
    if (isFeatureSwitchSwitchVariant(propsWithVariant)) {
      return (
        <SwitchContainer>
          <Switch
            withHelper
            inactiveHelperText={tl.status.deactivated()}
            activeHelperText={tl.status.activated()}
            {...propsWithVariant}
          />
        </SwitchContainer>
      );
    }
    return null;
  }, [propsWithVariant, tl]);

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
        {tooltip && <Tooltip {...tooltip} />}
        <FeatureSwitchVariant />
      </FlexRowLayout>
    </FlexRowLayout>
  );
};
FeatureSwitch.defaultProps = defaultFeatureSwitchProps;

export { FeatureSwitch };

const SwitchContainer = styled.div`
  min-width: 8.25rem;
`;
