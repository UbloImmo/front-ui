import type {
  FeatureSwitchCheckboxVariant,
  FeatureSwitchOptionsVariant,
  FeatureSwitchProps,
  FeatureSwitchSwitchVariant,
} from "./FeatureSwitch.types";
import type { NullishPrimitives } from "@ubloimmo/front-util";

/**
 * Type predicate to determine if the FeatureSwitch properties represent a `select` variant.
 *
 * @param {FeatureSwitchProps<TValue>} props - The props to check
 * @returns {boolean} True if the variant is "select", indicating props is of type FeatureSwitchOptionsVariant
 * @see {@link FeatureSwitchOptionsVariant<TValue>}
 *
 * @template TValue - The value type for the FeatureSwitch, must extend NullishPrimitives
 */
export const isFeatureSwitchOptionVariant = <TValue extends NullishPrimitives>(
  props: FeatureSwitchProps<TValue>,
): props is FeatureSwitchOptionsVariant<TValue> => {
  return props.variant === "select";
};

/**
 * Type predicate to determine if the FeatureSwitch properties represent a `switch` variant.
 *
 * @param {FeatureSwitchProps<NullishPrimitives>} props - The props to check
 * @returns {boolean} True if the variant is "switch", indicating props is of type FeatureSwitchSwitchVariant
 * @see {@link FeatureSwitchSwitchVariant}
 */
export const isFeatureSwitchSwitchVariant = (
  props: FeatureSwitchProps<NullishPrimitives>,
): props is FeatureSwitchSwitchVariant => {
  return props.variant === "switch";
};

/**
 * Type predicate to determine if the FeatureSwitch properties represent a `checkbox` variant.
 *
 * @param {FeatureSwitchProps<NullishPrimitives>} props - The props to check
 * @returns {boolean} True if the variant is "checkbox", indicating props is of type FeatureSwitchCheckboxVariant
 * @see {@link FeatureSwitchCheckboxVariant}
 */
export const isFeatureSwitchCheckboxVariant = (
  props: FeatureSwitchProps<NullishPrimitives>,
): props is FeatureSwitchCheckboxVariant => {
  return props.variant === "checkbox";
};
