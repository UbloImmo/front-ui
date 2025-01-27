import type { CheckboxProps } from "../Checkbox";
import type { IconName } from "../Icon";
import type { SelectInputProps } from "../Input";
import type { SwitchProps } from "../Switch";
import type { TooltipProps } from "../Tooltip";
import type { Enum, Nullable, NullishPrimitives } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

const featureSwitchVariants = ["checkbox", "switch", "select"] as const;
export type FeatureSwitchVariant = Enum<typeof featureSwitchVariants>;

export type FeatureSwitchCommonProps = {
  /**
   * The icon to display in the FeatureSwitch
   *
   * @type {Nullable<IconName>}
   * @default {"Square"}
   */
  icon?: Nullable<IconName>;

  /**
   * The name to be displayed in the FeatureSwitch
   *
   * @type {string}
   */
  label: string;

  /**
   * The description to be displayed in the FeatureSwitch, can be a string or a custom component
   *
   * @type {Nullable<ReactNode>}
   * @default null
   */
  description?: Nullable<ReactNode>;

  /**
   * Whether the FeatureSwitch's layout is compact
   *
   * @type {boolean}
   * @default false
   */
  compact?: boolean;

  /**
   * Whether the FeatureSwitch is disabled
   *
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;

  /**
   * The optional tooltip of FeatureSwitch
   *
   * @type {Nullable<TooltipProps>}
   * @default null
   */
  tooltip?: Nullable<TooltipProps>;
};

/**
 * Properties related to the `checkbox` variant of FeatureSwitch
 *
 * @see {@link CheckboxProps}
 */
export type FeatureSwitchCheckboxVariant = FeatureSwitchCommonProps &
  CheckboxProps & {
    variant: "checkbox";
  };

/**
 * Properties related to the `switch` variant of FeatureSwitch
 *
 * @see {@link SwitchProps}
 */
export type FeatureSwitchSwitchVariant = FeatureSwitchCommonProps &
  SwitchProps & {
    variant: "switch";
  };

/**
 * Properties related to the `select` variant of FeatureSwitch
 *
 * @see {@link SelectInputProps}
 */
export type FeatureSwitchOptionsVariant<TValue extends NullishPrimitives> =
  FeatureSwitchCommonProps &
    SelectInputProps<TValue> & {
      variant: "select";
    };

export type FeatureSwitchProps<TValue extends NullishPrimitives> =
  | FeatureSwitchCheckboxVariant
  | FeatureSwitchSwitchVariant
  | FeatureSwitchOptionsVariant<TValue>;

/**
 * A more generic FeatureSwitch type that combines the common properties of all feature switch variants with a variant type
 *
 * @template TValue - The type of value that can be selected
 * @see {@link FeatureSwitchProps}
 */
export type AnyFeatureSwitchVariant<TValue extends NullishPrimitives> =
  FeatureSwitchProps<TValue> & {
    variant: FeatureSwitchVariant;
  };

export type FeatureSwitchDefaultProps = Required<FeatureSwitchCommonProps> & {
  /**
   * The variants of FeatureSwitch
   *
   * @type {FeatureSwitchVariant}
   */
  variant: FeatureSwitchVariant;
};
