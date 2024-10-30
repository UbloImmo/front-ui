import type { IconName } from "../Icon";
import type { SelectInputProps } from "../Input";
import type {
  Enum,
  Nullable,
  NullishPrimitives,
  VoidFn,
} from "@ubloimmo/front-util";

const featureSwitchVariants = ["checkbox", "switch", "select"] as const;
export type FeatureSwitchVariant = Enum<typeof featureSwitchVariants>;

/**
 * Props related to the togglable variants, like `switch` and `checkbox`
 */
type TogglableVariants = {
  /**
   * Whether the switch/checkbox is active or not
   *
   * @type {boolean}
   * @default false
   */
  active?: boolean;
  /**
   * Optional callback called when the switch/checkbox is toggled
   *
   * @type {VoidFn<[boolean]>}
   * @default () => {}
   */
  onChange?: VoidFn<[boolean]>;
};

/**
 * Properties related to the `select` variant
 *
 * @see {@link SelectInputProps}
 */
type OptionsVariant<TValue extends NullishPrimitives> =
  SelectInputProps<TValue>;

export type FeatureSwitchProps = {
  icon: IconName;
  name: string;
  description: string;
  compact?: boolean;
  disabled?: boolean;
  tooltipText?: Nullable<string>;
  variant: FeatureSwitchVariant;
};

type FeatureSwitchVariantType<TValue extends NullishPrimitives> =
  FeatureSwitchProps["variant"] extends "select"
    ? OptionsVariant<TValue>
    : TogglableVariants;

export type FeatureSwitchDefaultProps<TValue extends NullishPrimitives> =
  Required<FeatureSwitchProps> & FeatureSwitchVariantType<TValue>;
