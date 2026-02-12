import { useMemo } from "react";

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
} from "@/layouts/Flex";
import {
  useTestId,
  useMergedProps,
  useUikitTranslation,
  useLogger,
} from "@utils";

import type { ColorKey, TestIdProps } from "@types";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";

const defaultFeatureSwitchProps: FeatureSwitchDefaultProps = {
  icon: null,
  label: "[Feature]",
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
 * @version 0.0.4
 *
 * @param {FeatureSwitchProps & TestIdProps} props - FeatureSwitch component props
 * @returns {JSX.Element}
 */
const FeatureSwitch = <TValue extends NullishPrimitives>(
  props: FeatureSwitchProps<TValue> & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultFeatureSwitchProps, props);
  const { icon, label, description, tooltip, compact, disabled, variant } =
    mergedProps;
  const testId = useTestId<TestIdProps>("feature-switch", props);
  const { warn } = useLogger("FeatureSwitch");

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

  const FeatureSwitchVariant = useMemo<Nullable<JSX.Element>>(() => {
    if (isFeatureSwitchOptionVariant(propsWithVariant)) {
      return <SelectInput {...propsWithVariant} />;
    }
    if (isFeatureSwitchCheckboxVariant(propsWithVariant)) {
      return <Checkbox {...propsWithVariant} />;
    }
    if (isFeatureSwitchSwitchVariant(propsWithVariant)) {
      return (
        <Switch
          withHelper
          inactiveHelperText={tl.status.deactivated()}
          activeHelperText={tl.status.activated()}
          {...propsWithVariant}
        />
      );
    }
    return null;
  }, [propsWithVariant, tl]);

  if (!props.label) {
    warn(
      `Missing required label, defaulting to ${defaultFeatureSwitchProps.label}`
    );
  }

  if (!props.variant) {
    warn(
      `Missing required variant, defaulting to ${defaultFeatureSwitchProps.variant}`
    );
  }

  return (
    <FlexRowLayout
      testId={testId}
      align="center"
      justify="space-between"
      gap="s-10"
      fill
      overrideTestId
    >
      <FlexLayout gap="s-2" justify="start" {...isCompactLayout}>
        {icon && <StaticIcon name={icon} color={disabledStaticIconColor} />}
        <FlexColumnLayout>
          <Text weight="medium" size="m">
            {label}
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
        {FeatureSwitchVariant}
      </FlexRowLayout>
    </FlexRowLayout>
  );
};
FeatureSwitch.__DEFAULT_PROPS = defaultFeatureSwitchProps;

export { FeatureSwitch };
